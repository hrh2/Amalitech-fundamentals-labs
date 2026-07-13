# Stage 1 — Chat-based AI (Extractor)

**UX type:** Chat-based AI tool (e.g. Claude.ai, ChatGPT). A human pastes the
raw report into the chat window, reviews the answer, and manually saves the
JSON into `extracted-report.json` for Stage 2 to consume. This is the
"human-in-the-loop" handoff point between the two UX types.

## Input

Raw, unstructured text forwarded by a non-technical user (`raw-bug-report.txt`):

> The user (john.doe@client.com) reported that the login page (prod-server-1)
> is down as of 10:30 AM GMT... [see raw-bug-report.txt for the full text]

## Prompt used (Extractor)

```
Act as a support triage assistant. I will paste an unstructured bug report
below. Extract only the following fields and return valid JSON with no
commentary, no markdown fences, and no extra keys:

- reporter_email (string)
- affected_system (string)
- reported_at (ISO 8601 string, assume today's date if only a time is given)
- summary (one sentence, plain English)
- symptoms (array of short strings)
- corroborating_reports (integer — how many other people confirmed it)
- urgency ("low" | "medium" | "high" | "critical")
- deadline (string or null — any explicit deadline mentioned)

Report:
"""
<raw-bug-report.txt pasted here>
"""
```

## Why this prompt (design reasoning)

- **Role framing** ("support triage assistant") anchors the model's tone and
  the kind of fields it expects to find.
- **Explicit schema with types** removes ambiguity about what "extract the key
  info" means — this is the fix for the anti-pattern of vague prompts.
- **"No commentary / no markdown fences"** matters because Stage 2 parses the
  output with `JSON.parse`; free text or ``` fences would break the chain.
- **Enumerated `urgency` values** constrain the model to a closed set instead
  of inventing new labels, which keeps Stage 2's formatting logic simple and
  predictable.

## Output (saved as `extracted-report.json`)

```json
{
  "reporter_email": "john.doe@client.com",
  "affected_system": "prod-server-1 (login page)",
  "reported_at": "2026-07-14T10:30:00Z",
  "summary": "The login page is returning a 502 error and a blank screen for multiple users.",
  "symptoms": ["blank white screen", "502 error in browser console"],
  "corroborating_reports": 2,
  "urgency": "critical",
  "deadline": "2026-07-14T14:00:00Z (2 PM client demo)"
}
```

This output becomes the **input** to Stage 2, the CLI-based AI tool.
