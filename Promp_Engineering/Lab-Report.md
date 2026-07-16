# Prompt Engineering Lab Report

**Labs completed:** AI-assisted Technical Documentation (Topic 2 choice) and
Multi-Stage AI Workflow (Capstone, Topic 7)
**Author:** Hirwa Rukundo Hope
**Repository path:** `Promp_Engineering/submissions/`

*(This document is formatted for a direct copy-paste into Google Docs —
plain headings and lists, no embedded code execution.)*

---

## Introduction

This report covers two labs from the Prompt Engineering module: producing a
complete, fact-checked technical documentation set for a fictional web app
(TaskFlow) using AI, and designing/implementing a working multi-stage AI
workflow that chains a chat-based AI tool with a CLI-based AI tool. Both
labs emphasize the same underlying skill: getting reliable, accurate output
from an LLM through iterative prompting, prompt chaining, and deliberate
fact-checking, rather than trusting a single "one-shot" prompt.

## Objectives

- Practice iterative prompt refinement: starting from a vague, generic
  prompt, identifying its gaps, and adding constraints (role, context,
  format) to close them.
- Practice prompt chaining: breaking a large task into smaller prompts whose
  outputs feed into each other, rather than one large, error-prone
  "mega-prompt."
- Produce documentation and a workflow that are technically accurate against
  a real, checkable source of truth (actual code), not just plausible-sounding.
- Design a workflow that spans two different AI UX types (chat and CLI) and
  is reasonably tool-agnostic.

## Implementation Process

**TaskFlow documentation:**
1. Built a small, working reference implementation of the TaskFlow API
   (Express, in-memory store, JWT-free token sessions) under
   `submissions/01-ai-assisted-technical-documentation/sample-project/`, with
   a smoke-test suite (`npm test`) — this is the ground truth used to
   fact-check every AI-generated claim.
2. Ran first-pass, generic prompts for the Getting Started guide, API
   reference, and Troubleshooting section, and recorded their (inaccurate)
   output.
3. Refined each prompt by pasting the actual route code and specifying role,
   audience, and format, then fact-checked the output line-by-line against
   the code and re-ran the test suite.
4. Chained a final prompt to standardize tone and heading levels across all
   three sections without altering any technical facts.
5. Assembled the final `TaskFlow-Documentation.md`, including the prompt
   history log and a reflection.

**Multi-Stage AI Workflow:**
1. Chose the "unstructured bug report → JSON → formatted ticket" scenario
   from the course's practice tasks and implemented it for real instead of
   as a diagram-only exercise.
2. Stage 1 (chat-based AI): designed an "Extractor" prompt with an explicit
   JSON schema, ran it against a sample raw bug report, and saved its output.
3. Stage 2 (CLI-based AI): wrote a Node.js CLI tool
   (`ticket-formatter.js`) that validates the Stage 1 JSON, renders a
   Markdown ticket, integrates it into the repo under `tickets/`, and
   optionally calls the Claude API to draft a short response paragraph if
   `ANTHROPIC_API_KEY` is set — falling back to a local template otherwise.
4. Wrote an architecture diagram (SVG) and full written documentation
   covering the design reasoning and how to run it, plus a smoke test.

## Prompt Design and Reasoning

The single biggest lesson across both labs: **pasting real artifacts (source
code, raw text) into the prompt beats describing them in prose.** A prompt
like *"Write an API reference"* invites the model to invent a plausible but
fictional API. A prompt that pastes the actual route handlers and asks for
a reference *"including the path, method, expected JSON body, and 200/401
response examples"* keeps the model anchored to what's actually true.

For the workflow's Extractor prompt, constraining the output to a strict
JSON schema with an enumerated `urgency` field wasn't just about accuracy —
it was necessary for the pipeline to function at all, since Stage 2 parses
the output programmatically. This is prompt chaining's key requirement:
each stage's prompt must specify an output contract precise enough for the
next stage (AI or code) to consume reliably.

The chaining prompt used to standardize tone across the TaskFlow docs
initially reworded a status code's meaning slightly — which led to adding an
explicit "do not change technical facts" constraint. This reinforced that
style-chaining prompts need the same accuracy guardrails as content-generating
ones.

## Challenges Encountered

- **Hallucinated fields that survived a first refinement.** Even after
  pasting real code, one draft of the API reference still invented a
  `priority` field on tasks that doesn't exist. Generic accuracy instructions
  ("be accurate") were not enough on their own — the fix was verifying every
  documented field against the code directly, not just supplying the code as
  context.
- **Keeping the workflow provider-agnostic.** It would have been easy to
  hard-code a specific AI provider's SDK throughout the CLI tool. Isolating
  the optional AI call into a single function kept the rest of the pipeline
  independent of any one vendor.
- **Making the workflow actually runnable without secrets.** A workflow that
  only works with a live API key isn't very demonstrable in a shared
  repository. The CLI tool was designed to run completely offline by
  default, with the AI call as a pure enhancement.

## Solutions

- Adopted a strict rule: every factual claim in the documentation must be
  traceable to a specific line in `sample-project/`, verified by re-running
  the test suite after each documentation pass.
- Isolated all provider-specific logic behind one function
  (`draftSuggestedResponse`) with a documented, graceful fallback path.
- Used an explicit, typed JSON schema as the contract between the chat stage
  and the CLI stage, so the two tools could be developed and tested
  independently.

## Results

- A complete, accurate TaskFlow documentation set (Getting Started, API
  reference, Troubleshooting, prompt history, reflection) that matches a
  working, tested reference implementation.
- A working, tested, end-to-end multi-stage AI workflow: raw text in,
  version-controlled Markdown ticket out, spanning a chat-based UX and a
  CLI-based UX, with an architecture diagram and full write-up.
- A documented, repeatable prompting process (first pass → refine →
  fact-check → chain → assemble) that generalizes beyond this specific lab.

## Conclusion

Both labs reinforced that the quality gap between "generic AI output" and
"production-ready documentation/tooling" is closed almost entirely by two
habits: grounding every prompt in real, pasted artifacts instead of prose
descriptions, and treating fact-checking as a mandatory step rather than an
afterthought. Prompt chaining additionally requires designing an explicit
output contract between stages — whether the next consumer is another
prompt or, as in the CLI stage here, real code.

## Demonstration

*(Screenshots to be inserted here as proof of completion — e.g. terminal
output of `npm test` passing in `sample-project/`, the rendered
`TaskFlow-Documentation.md`, the chat UI showing the Extractor prompt/response,
and the terminal output of `node ticket-formatter.js` producing a ticket
file.)*

- [ ] Screenshot: TaskFlow sample project test suite passing
- [ ] Screenshot: TaskFlow-Documentation.md rendered
- [ ] Screenshot: Stage 1 chat session (Extractor prompt + JSON output)
- [ ] Screenshot: Stage 2 CLI run producing a ticket file
- [ ] Screenshot: resulting `tickets/*.md` and `tickets/INDEX.md`
