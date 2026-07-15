# Multi-Stage AI Workflow — Written Documentation

## Problem chosen

Turning a messy, unstructured bug report email into a properly formatted,
triaged ticket that lives in version control. This is the exact scenario used
in the course's practice tasks ("Prompt Chain Implementation" and "Workflow
Design"), implemented here as real, runnable code instead of a whiteboard
sketch.

## Why two different UX types

A single mega-prompt that both *extracts* fields from free text **and**
*formats/integrates* them into the codebase is fragile: if the model gets the
Markdown formatting wrong, you've also lost the extraction; if you want to
swap in a different formatting template, you have to re-run the whole thing
against the AI again. Splitting the work across two UX types keeps each stage
small, inspectable, and independently replaceable:

| Stage | UX type | Responsibility |
| --- | --- | --- |
| 1 — Extractor | **Chat-based** (Claude.ai / ChatGPT) | Read free text, pull out a fixed set of fields, return strict JSON |
| 2 — Formatter/Integrator | **CLI-based** (Node.js script, optionally calling the Claude API) | Validate the JSON, render a Markdown ticket, write it into the repo, update an index |

This mirrors the real-world pattern of "Chat -> IDE/CLI" named in the lab
brief: a human uses a conversational tool to think through unstructured input,
then a scriptable, automatable tool takes over for the mechanical,
repeatable part.

## Step-by-step

1. **Input:** `stage1-chat/raw-bug-report.txt` — the raw email text.
2. **Stage 1 (chat):** The Extractor prompt in
   `stage1-chat/prompts-and-outputs.md` is run in a chat-based AI tool. The
   JSON response is saved as `stage1-chat/extracted-report.json`. This is the
   manual handoff point between the two UX types — a human reviews the JSON
   before it moves on, which is also where fact-checking happens (rubric:
   "Accuracy").
3. **Stage 2 (CLI):** `stage2-cli/ticket-formatter.js` reads
   `extracted-report.json`, validates required fields and the `urgency`
   enum, computes a deterministic ticket ID, and renders a Markdown ticket.
   If `ANTHROPIC_API_KEY` is set in the environment, it makes one additional,
   optional call to the Claude API to draft a short "suggested first
   response" paragraph; otherwise it uses a local template. Either way the
   run always succeeds — the AI call is an enhancement, not a dependency.
4. **Output:** The ticket is written to `stage2-cli/tickets/<ticket-id>.md`
   and indexed in `stage2-cli/tickets/INDEX.md`, i.e. it is *integrated into
   the codebase*, not just printed to a terminal.

## Running it yourself

```bash
cd Promp_Engineering/submissions/02-multi-stage-ai-workflow/stage2-cli
node ticket-formatter.js ../stage1-chat/extracted-report.json
node ticket-formatter.test.js   # smoke test
```

Optional — enable the live Stage-2 AI call:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node ticket-formatter.js ../stage1-chat/extracted-report.json
```

## Adaptability (tool-agnostic design)

- Stage 1's prompt is plain text; it works unmodified in any chat-based tool.
- Stage 2's only provider-specific code is the small `callClaude()`-style
  block inside `draftSuggestedResponse()` — swapping providers means editing
  one function, not the pipeline.
- The JSON contract between stages (fixed field names and an enum for
  `urgency`) is the real "interface" of this workflow, not any particular
  vendor's API.

## Efficiency

Manually formatting and filing a ticket like this takes a few minutes of
copy-pasting per report. The CLI stage does it in under a second and never
forgets to update the index, which is the "meaningfully reduces manual
effort" criterion in the rubric.
