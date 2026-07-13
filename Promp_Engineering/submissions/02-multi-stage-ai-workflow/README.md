# Capstone: Multi-Stage AI Workflow

Chains a **chat-based AI tool** (Stage 1, extraction) with a **CLI-based AI
tool** (Stage 2, formatting + integration) to turn a messy bug report email
into a version-controlled ticket, end-to-end.

## Contents

- [`docs/WORKFLOW.md`](./docs/WORKFLOW.md) — full written documentation (problem, design reasoning, steps, adaptability, efficiency)
- [`docs/workflow-diagram.svg`](./docs/workflow-diagram.svg) — architecture diagram
- [`stage1-chat/`](./stage1-chat) — raw input, the extractor prompt, and its JSON output
- [`stage2-cli/`](./stage2-cli) — the working Node.js CLI tool, its test, and generated output under `tickets/`

## Quick start

```bash
cd stage2-cli
node ticket-formatter.js ../stage1-chat/extracted-report.json
node ticket-formatter.test.js
```

See `docs/WORKFLOW.md` for the full write-up and evaluation-criteria mapping.
