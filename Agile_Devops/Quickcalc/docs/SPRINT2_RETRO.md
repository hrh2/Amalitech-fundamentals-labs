# Sprint 2 — Retrospective

## What went well
- Acting on the Sprint 1 retro directly (error handling first, then keyboard support, then
  server/health/logging) meant Sprint 2 had no surprises — every item was already anticipated.
- Reusing the same `handle()` dispatch function for both mouse clicks and keyboard input meant
  US-5 added almost no new logic or new bug surface — just a second input source.
- Structured JSON logging paid off immediately: while testing `/health` manually, the request
  log line made it trivial to see the exact status code and latency without extra tooling.

## What was harder than expected
- Deciding *what* an "error" should reset to took a couple of iterations — first pass required
  pressing `AC` to escape an error state, which felt like a dead end. Settled on: any new
  digit press after an error starts fresh automatically.
- `server.js` calling `app.listen()` at import time makes it slightly awkward to unit test
  with supertest (the real server actually starts listening during tests). It works for a
  project this size, but a larger app should split "build the app" from "start listening".

## Lessons learned / improvements for next time
1. **Split app construction from server startup** (`createApp()` vs `app.listen()`) so tests
   never bind a real port — noted as tech debt rather than blocking this delivery.
2. **Decide error-recovery UX before implementing it**, not during — it would have saved a
   redo cycle here.
3. **US-6 (calculation history) was deliberately descoped** rather than rushed in at the end,
   to protect the quality of what shipped — a conscious prioritization call, not a miss.

## Overall
Two sprints, 7 of 8 backlog stories delivered, 14 automated tests, a green CI pipeline with a
live smoke test, and basic operational visibility (health + logs). The one descoped story
(US-6) is a clean, well-understood candidate for a Sprint 3.
