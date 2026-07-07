# Sprint 1 — Retrospective

## What went well
- Keeping arithmetic logic in a pure, DOM-free module (`calc-engine.js`) made unit testing
  fast and straightforward — no browser/DOM mocking needed.
- Small, frequent commits (scaffold → UI shell → engine → wiring → tests → CI) kept each
  change reviewable and made it easy to bisect if something broke.
- CI was set up early (Sprint 1, not deferred to Sprint 2), so every commit from here on is
  verified automatically.

## What was harder than expected
- Manually clicking through the UI to verify behavior was slow — every regression check
  meant re-clicking full sequences by hand.
- Division by zero was initially left unhandled; `20 ÷ 0` silently produced `Infinity` in an
  early draft before it was caught and fixed, which is exactly the kind of bug a real user
  would hit immediately.
- There is currently zero visibility into the app once it's "shipped" — no way to know if it's
  even running, beyond opening it in a browser.

## Improvements to apply in Sprint 2
1. **Add explicit, tested error handling (US-4) before adding new features** — divide-by-zero
   and similar edge cases should be caught by tests, not discovered by clicking around.
2. **Add keyboard support (US-5)** — partly for the user-facing benefit, and partly because
   it will make manual verification of long calculations much faster during development.
3. **Add a minimal server with a `/health` endpoint and request/error logging (US-7, US-8)**
   so the app has basic operational visibility, and extend CI with a smoke test that hits
   `/health` after boot — closing the "we can't tell if it's alive" gap.
