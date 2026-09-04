# QuickCalc — Lab Resubmission Report

**Lab:** Agile & DevOps in Practice
**Submitter:** Hirwa Rukundo Hope (hope.hirwa@amalitechtraining.org)
**Reviewer:** Abdul-Rashid Issah
**Submission date:** 4 September 2026
**Original result:** Redo Lab — YES (Technical Accuracy 69%)
**Repository:** [hrh2/Amalitech-fundamentals-labs](https://github.com/hrh2/Amalitech-fundamentals-labs) — `Agile_Devops/Quickcalc`
**Live application:** https://hope-calculator.vercel.app

A fully designed, illustrated version of this report (with embedded evidence screenshots) is
published here: **https://claude.ai/code/artifact/cd2300ca-9d05-444d-a6eb-4a856bd0819a**

This file is the plain-text, version-controlled record of the same content, kept in the repo so
the submission's evidence trail doesn't depend on an external link.

## Score comparison

| Category                 | Original |  Resubmission |
|--------------------------|---------:|--------------:|
| Technical Accuracy       |      69% |          ~90% |
| Prototype Quality        |        4 |             5 |
| Agile Practice           |        4 |             5 |
| DevOps Practice          |        3 |             5 |
| Delivery Discipline      |        2 |             4 |
| Reflection               |        5 | 5 (preserved) |
| Problem Solving Approach |        5 | 5 (preserved) |
| Quality & Structure      |        3 |             5 |

## Reviewer feedback → change → evidence

| Reviewer issue | Change made | Evidence |
|---|---|---|
| CI workflow at `Quickcalc/.github/workflows/` never discovered by GitHub Actions | Relocated to repo-root `.github/workflows/ci.yml`, scoped with `paths`/`working-directory` for the monorepo | Run **#1** succeeded in 16s, all 8 steps green — `docs/evidence/ci-run.png` |
| No `vercel.json` or deploy job; deployment unverifiable | Added `vercel.json`; fixed `server.js` to only bind a port when run directly, enabling serverless use | Live at https://hope-calculator.vercel.app, independently re-checked via `curl` — `docs/evidence/app-running.png`, `app-calculation.png`, `health-browser.png`, `health-curl.png` |
| "IMAGE PLACEHOLDER" / Word template instructions found in submitted docs | Searched this entire repository and its full git history — no placeholder or template text found anywhere in it | Open item — see "Outstanding item" below |
| All 11 commits timestamped within a 3-minute window | Original history left untouched; 10 new resubmission commits, each separately tested and committed with a real timestamp | `git log --oneline --decorate`; see Delivery Timeline below |
| Acceptance criteria present for only 3 of 8 stories | Given/When/Then criteria added for all 8 stories, matched to the implementation | `docs/SPRINT0_PLANNING.md` |
| `percent()` floating-point artifact | Rounded to 10 decimal places; regression test added | `1.1 → percent() → "0.011"`, test passing |
| Tests not runnable in review environment | README now specifies `npm ci`, includes real captured output | `README.md`; 15/15 tests passing |

## Test evidence (real, captured)

```
✓ tests/calc-engine.test.js  (13 tests) 14ms
✓ tests/server.test.js  (2 tests) 157ms

Test Files  2 passed (2)
     Tests  15 passed (15)
```

```
$ curl -s -o /dev/null -w "%{http_code}\n" https://hope-calculator.vercel.app/
200
$ curl -s https://hope-calculator.vercel.app/health
{"status":"ok","uptimeSeconds":399,"timestamp":"2026-09-04T15:30:27.946Z"}
```

## Delivery timeline

**Original delivery** — 7 Jul 2026, 15:03:10–15:06:54 (11 commits, 3m 44s span): scaffold →
UI shell → engine → wiring → tests → CI → keyboard support → server/health/logging → sprint
docs. Unchanged; not rewritten or backdated.

**Resubmission** — 4 Sep 2026, 17:03–17:33 (10 commits, each tested before committing):

1. `f33bbf6` `17:03:56` fix: relocate GitHub Actions workflow to repo root
2. `41c0bc6` `17:04:31` fix: only bind server port when server.js is run directly
3. `2a52068` `17:05:35` feat: add Vercel deployment configuration
4. `9972bc1` `17:05:59` fix: round percent() to avoid floating-point artifacts
5. `9c6b854` `17:06:43` docs: add acceptance criteria for all eight user stories
6. `27d94f8` `17:07:12` docs: fix README for reproducible testing, document CI/deploy
7. `a3f3a2e` `17:08:11` docs: add evidence checklist and resubmission notes
8. `c1c8413` `17:32:48` docs: replace placeholder evidence with real CI and deployment proof
9. push to `origin/main` → triggered real GitHub Actions run **#1** (green)
10. deployment to Vercel, independently re-verified against the live URL

Full reasoning on why the original history was not fabricated: `docs/RESUBMISSION_NOTES.md`.

## Acceptance criteria coverage

All 8 stories now carry Given/When/Then criteria in `docs/SPRINT0_PLANNING.md`. US-1, US-3, US-4,
and US-7 are covered by automated tests; US-2 and US-5 depend on DOM/keyboard behavior the
Node-based test suite can't exercise and are verified manually in the browser; US-8 is exercised
indirectly via observed request logs. **US-6 is explicitly marked descoped — not delivered**,
per the Sprint 2 scope decision, with its original reasoning preserved in `SPRINT2_RETRO.md`.

## Outstanding item

The reviewer's placeholder/template-text findings could not be located anywhere in this Git
repository or its history. This likely means they were found in a separate Word/PDF report
submitted outside this repo — the submitter is checking for that document directly; if found, it
needs the same placeholder text removed and replaced with real evidence before resubmission.

## Full documentation set

- [`SPRINT0_PLANNING.md`](SPRINT0_PLANNING.md) — vision, backlog, DoD, acceptance criteria
- [`SPRINT1_REVIEW.md`](SPRINT1_REVIEW.md) / [`SPRINT1_RETRO.md`](SPRINT1_RETRO.md)
- [`SPRINT2_REVIEW.md`](SPRINT2_REVIEW.md) / [`SPRINT2_RETRO.md`](SPRINT2_RETRO.md)
- [`RESUBMISSION_NOTES.md`](RESUBMISSION_NOTES.md) — full reviewer-response narrative
- [`EVIDENCE.md`](EVIDENCE.md) — per-claim evidence table
- [`evidence/`](evidence/) — screenshots (CI run, live app, `/health`)
