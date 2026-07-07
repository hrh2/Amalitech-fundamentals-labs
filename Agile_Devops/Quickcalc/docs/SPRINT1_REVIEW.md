# Sprint 1 — Review

## Sprint Goal
"A user can open the app and complete a full basic calculation from a clean UI."

## Delivered
- **US-1 — Basic arithmetic**: `calc-engine.js` supports +, −, ×, ÷, including chained,
  calculator-style left-to-right evaluation (e.g. `2 + 3 × 4` = `20`).
- **US-2 — Display**: two-line display shows the running expression (history line) and the
  current entry (main line), styled per the calculator UI shell.
- **US-3 — Clear**: `AC` resets the calculator to a clean initial state.
- Bonus groundwork: `negate` and `percent` were implemented early since they were cheap
  additions to the same engine module.

## Demo notes
Open `public/index.html` (or `npm start` once the server exists) and:
1. Click `5`, `+`, `3`, `=` → display shows `8`.
2. Click `AC` → display resets to `0`.
3. Click `2`, `+`, `3`, `×`, `4`, `=` → display shows `20`, demonstrating chained input.

## Test evidence
`npm test` → 12/12 tests passing (see `tests/calc-engine.test.js`), covering the four
operators, decimals, chaining, and clear.

## CI evidence
`.github/workflows/ci.yml` runs `npm ci` + `npm test` on every push/PR to `main`.

## Backlog status
| Story | Status |
|-------|--------|
| US-1 | Done |
| US-2 | Done |
| US-3 | Done |
| US-4, US-5, US-6, US-7, US-8 | Not started — forecast for Sprint 2 |
