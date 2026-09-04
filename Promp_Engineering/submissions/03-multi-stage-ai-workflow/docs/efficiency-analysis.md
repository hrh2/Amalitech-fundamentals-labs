# Efficiency Analysis

## What's real vs. estimated here

The reviewer's complaint was "no quantitative evidence" — not "the numbers were wrong," but that
none existed. Below, every number is labeled as either **measured** (from an actual timed run in
this session) or **estimated** (with the reasoning shown), per the constraint not to invent figures.

## Measured: Stage 2 (AI CLI generation + local validation)

From `docs/run-log.md` Run 1, timed with the shell `time` builtin around the full
`scripts/run-stage2-cli.mjs` invocation:

| Step | Time (measured) |
|---|---|
| Attempt 1: `claude -p` generation + syntax check + npm test (failed) | ~72.6s (derived: total 173.7s − attempt 2's 101.1s) |
| Attempt 2: `claude -p` generation (fix) | 101.1s |
| Validation (syntax + npm install + npm test), both attempts combined | included above (validation itself is sub-second; npm install/test dominate) |
| **Total wall time (2 attempts)** | **173.7s (2m53.7s)** |

This includes one real failure and one real retry — not a cherry-picked clean run.

## Estimated: manual baseline

**Labeled as an estimate.** I did not perform this task manually end-to-end to time it (doing so
just to produce a number would itself risk being a low-effort, non-representative measurement). The
estimate below is derived from typical timings for a task of this size (a small CLI tool + validator
+ 3 tests, ~130 lines across 8 files, no external dependencies) based on the actual scope of what was
generated in Run 1 — i.e., it's scoped to the real deliverable, not a generic guess:

| Step | Estimate | Basis |
|---|---|---|
| Read/understand task, design approach | 5–8 min | Small, well-specified task; no research needed |
| Write CLI entrypoint + validator + example fixtures | 15–20 min | ~90 lines of implementation code across 4 files |
| Write tests | 8–12 min | 3 test cases, no test framework setup (uses built-in `node:test`) |
| Manual syntax/test debugging | 5–10 min | Roughly matches the one real failure the AI also hit |
| Git staging, commit message, push | 2–3 min | Standard git workflow |
| **Total (estimate)** | **35–53 min (midpoint ~44 min)** | |

## Comparison

| | Manual (estimated) | Automated (measured, Stage 2 only) |
|---|---|---|
| Total | ~44 min (midpoint) | 2m54s |
| Reduction | — | ~93% vs. the midpoint estimate |

This comparison is **partial by design**: it covers Stage 2 (generation + validation) only, because
that's the only stage measured for real in this session. It excludes:
- **Stage 1 time** (the WebStorm AI Assistant session) — not yet performed for a real task; a
  manual equivalent (reading the task, designing the approach without AI help) would still take
  time, so Stage 1 doesn't erase all planning effort, it just moves it into a faster, structured
  form. Add your own measured Stage 1 duration once you complete it.
- **n8n orchestration time** (webhook round-trip, GitHub API commit) — typically sub-few-seconds for
  a workflow this size, but should be read from your n8n Executions panel for a real figure rather
  than assumed.
- **Human review time** of the generated diff before merging, which exists in both the manual and
  automated case and so mostly cancels out of the comparison — not counted either side.

## MANUAL ACTION REQUIRED

Once you complete a real Stage 1 → Stage 2 → n8n → GitHub run (see main README), fill in:

```
Automated approach (real run):
  Stage 1 (WebStorm AI Assistant session):  ___ min   [time it yourself]
  Stage 2 (CLI generation + validation):     ___ (from scripts/run-stage2-cli.mjs output or evidence log)
  n8n Stage 1 execution:                     ___ (from n8n Executions panel)
  n8n Stage 2 execution (validate + commit): ___ (from n8n Executions panel)
  Total:                                     ___

Time saved vs. manual estimate above:        ___
Reduction:                                   ___%
```
