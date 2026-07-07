# Sprint 2 — Review

## Sprint Goal
Apply Sprint 1 retro improvements; harden error handling; add keyboard support and basic
operational visibility.

## Delivered
- **US-4 — Error handling**: divide-by-zero and similar invalid operations now resolve to a
  visible `Error` state instead of `Infinity`/`NaN` or a crash; any key press after an error
  starts a clean new entry. Covered by dedicated unit tests.
- **US-5 — Keyboard support**: digits, `+ - * /`, `Enter`/`=`, `Escape`, `.` and `%` are all
  wired to the same `handle()` path the on-screen buttons use, so behavior is identical
  either way.
- **US-7 — Health endpoint**: `GET /health` returns `200` with `{ status: "ok", uptimeSeconds }`.
- **US-8 — Logging**: every request is logged as structured JSON (method, path, status,
  duration); errors are logged separately with a safe, non-leaking response to the client.
- **Retro follow-through**: CI now boots the server and curls `/health` as a smoke test, so a
  broken server fails the pipeline, not just a broken unit test.

## Demo notes
1. `npm start`, open `http://localhost:3000`.
2. Type `20 / 0 Enter` on the keyboard → display shows `Error`, app stays responsive.
3. Press any digit → error clears, new entry begins.
4. `curl http://localhost:3000/health` → `{"status":"ok","uptimeSeconds":...}`.
5. Watch the terminal while using the app → structured JSON request logs stream per action.

## Test evidence
`npm test` → 14/14 tests passing:
- `tests/calc-engine.test.js` (12) — arithmetic, clear, error handling, edge cases
- `tests/server.test.js` (2) — health endpoint, static hosting

## CI evidence
`.github/workflows/ci.yml` — installs deps, runs the full test suite, then boots the server
and smoke-tests `/health` with `curl --fail`, failing the build if the server doesn't come up
healthy.

## Backlog status
| Story | Status |
|-------|--------|
| US-1, US-2, US-3 | Done (Sprint 1) |
| US-4, US-5, US-7, US-8 | Done (Sprint 2) |
| US-6 (calculation history list) | Not started — descoped, see retro |
