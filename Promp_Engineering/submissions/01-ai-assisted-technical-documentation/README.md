# AI-assisted Technical Documentation — TaskFlow

## Contents

- [`sample-project/`](./sample-project) — minimal, **working** reference implementation of the TaskFlow API (Express + in-memory store + smoke tests). This is the fact-checking source of truth for the docs below — every endpoint, status code, and example in the documentation was verified against this code (`npm test` passes).
- [`TaskFlow-Documentation.md`](./TaskFlow-Documentation.md) — the final deliverable: Getting Started guide, API reference, troubleshooting section, prompt history, and reflection, all in one file (Google Docs-ready).
- [`prompt-history.md`](./prompt-history.md) — the full, unabridged log of prompts used across first-pass, refinement, and chaining, kept separately for readability (a condensed version is also embedded in the final deliverable, per the lab's submission format).

## How to verify the sample project

```bash
cd sample-project
npm install
npm test
```

All requests/responses documented in `TaskFlow-Documentation.md` match this code exactly.
