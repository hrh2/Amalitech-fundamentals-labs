# Sprint 0 — Planning

## Product Vision
QuickCalc is a fast, dependable browser calculator that handles everyday arithmetic
without errors, crashes, or confusing UI — usable entirely from the keyboard or mouse.

## Product Backlog

| ID | User Story | Priority | Estimate (pts) | Status |
|----|------------|----------|-----------------|--------|
| US-1 | As a user, I can perform basic arithmetic (+, −, ×, ÷) so I can do everyday calculations. | Must | 3 | Done (Sprint 1) |
| US-2 | As a user, I can see my current input and running result on a display so I always know what's happening. | Must | 2 | Done (Sprint 1) |
| US-3 | As a user, I can clear the current entry or the whole calculation so I can recover from mistakes. | Must | 2 | Done (Sprint 1) |
| US-4 | As a user, I get a clear error state (not a crash) when I do something invalid, like divide by zero. | Must | 2 | Done (Sprint 2) |
| US-5 | As a user, I can use my keyboard (numbers, operators, Enter, Escape) so I don't have to click. | Should | 3 | Done (Sprint 2) |
| US-6 | As a user, I can see my last few calculations in a history so I can refer back to them. | Should | 3 | **Descoped — not delivered** (see Sprint 2 retro) |
| US-7 | As an operator, the app exposes a health endpoint so uptime/monitoring tools can check it's alive. | Could | 1 | Done (Sprint 2) |
| US-8 | As an operator, the server logs requests and errors so issues can be diagnosed after the fact. | Could | 2 | Done (Sprint 2) |

Estimation method: Planning-poker-style relative sizing (Fibonacci-ish: 1, 2, 3, 5), done solo by
reasoning about complexity + uncertainty for each story.

## Acceptance Criteria

Every story below has testable, Given/When/Then acceptance criteria, matched to what the
shipped implementation actually does (verified against `public/calc-engine.js`,
`public/script.js`, `server.js`, and their test suites — see `tests/`).

**US-1 — Basic arithmetic** *(Done — Sprint 1)*
- Given two numbers and an operator, when I press "=", then the correct result is displayed.
- Given a chained expression (e.g. `2 + 3 × 4`), when I press "=", then it evaluates
  left-to-right as entered (calculator-style, not full math order-of-operations), matching
  standard four-function calculator behavior — result `20`, not `14`.
- Covered by: `tests/calc-engine.test.js` ("US-1: basic arithmetic", 6 tests).

**US-2 — Display** *(Done — Sprint 1)*
- Given the calculator has just loaded, when no input has been entered, then the main display
  shows `0`.
- Given a digit or decimal point is entered, when the state updates, then the main display line
  reflects the current entry exactly as typed (e.g. typing `1`, `.`, `5` shows `1.5`).
- Given an operator has been chosen and a first operand is pending, when the state updates,
  then the history line shows the pending value and operator (e.g. `5 +`) until "=" is pressed,
  at which point the history line clears.
- Covered by: manual verification in the browser (DOM rendering is not exercised by the
  Node-based unit tests — see "What's not covered" in the Testing section of the README).

**US-3 — Clear** *(Done — Sprint 1)*
- Given the calculator is in any state (mid-entry, mid-chained-operation, or showing an error),
  when "AC" is clicked or pressed, then the calculator returns exactly to its initial state
  (display `0`, no pending operator, no stored previous value, no error).
- Given the calculator is in an error state, when the keyboard "Escape" key is pressed, then the
  same reset occurs as clicking "AC" (both route through `engine.clear()`).
- Covered by: `tests/calc-engine.test.js` ("US-3: clear", 1 test) plus manual keyboard check.

**US-4 — Error handling** *(Done — Sprint 2)*
- Given a divide-by-zero input, when I press "=", then the display shows `Error` and the app
  does not crash, freeze, or display `Infinity`/`NaN`.
- Given the calculator is showing an error, when any digit key is pressed, then the error state
  clears and a fresh entry begins with that digit.
- Covered by: `tests/calc-engine.test.js` ("US-4: error handling", 2 tests).

**US-5 — Keyboard support** *(Done — Sprint 2)*
- Given the calculator page has focus, when a digit key (`0`–`9`), an operator key
  (`+ - * /`), `.`, `%`, `Enter`/`=`, or `Escape` is pressed, then the calculator responds
  identically to the matching on-screen button, because both input paths route through the
  same `handle()` dispatch in `public/script.js`.
- Given `Enter` is pressed to submit a calculation, when the keydown handler runs, then the
  browser's default action is suppressed (`e.preventDefault()`) so the page does not
  scroll/submit unexpectedly.
- Covered by: manual verification in the browser (keyboard events require DOM/`window`, which
  the current Node-based test suite does not simulate — see README "What's not covered").

**US-6 — Calculation history** *(Descoped — not delivered; see Sprint 2 Retrospective)*
- **Status: intentionally not implemented.** No acceptance criteria are claimed as met for this
  story in the current release, and no code path for a history feature exists in
  `public/calc-engine.js` or `public/script.js`.
- This was a conscious Sprint 2 scope decision, not an oversight: implementing it properly
  (state, UI, and tests) was judged lower priority than hardening error handling, keyboard
  support, and operational visibility (US-4/5/7/8) within the sprint. See
  `docs/SPRINT2_RETRO.md` for the reasoning.
- If picked up in a future sprint, the acceptance criteria would be: *given at least one
  completed calculation, when the user opens the history view, then the last N results are
  listed most-recent-first.* This is a forecast, not a claim of current behavior.

**US-7 — Health endpoint** *(Done — Sprint 2)*
- Given the server is running, when I GET `/health`, then I receive HTTP 200 and a JSON body
  containing `status: "ok"` and a numeric `uptimeSeconds`.
- Covered by: `tests/server.test.js` ("US-7: health endpoint", 1 test).

**US-8 — Structured logging** *(Done — Sprint 2)*
- Given any HTTP request completes, when the response finishes, then one structured JSON log
  line is written to stdout containing `method`, `path`, `status`, and `durationMs`.
- Given an unhandled error occurs in a request handler, when the centralized error middleware
  runs, then a structured JSON error line is logged and the client receives a generic `500`
  JSON response with no stack trace or internal detail leaked.
- Covered by: request logging is exercised indirectly by every `tests/server.test.js` request
  (log lines are visible in the test run's stdout); the error-logging branch itself has no
  dedicated automated test — see the evidence checklist in `docs/EVIDENCE.md` for the honest
  status of this claim.

## Definition of Done (DoD)
A backlog item is "Done" when:
1. Code is committed to version control with a descriptive message (no big-bang commits).
2. Acceptance criteria are met and manually verified in the browser.
3. Unit tests exist for any new logic and pass locally.
4. The CI pipeline is green on the branch.
5. No console errors during normal use.
6. Relevant docs (backlog/README) are updated if behavior changed.

## Sprint 1 Plan
Selected stories: **US-1, US-2, US-3** (core calculator engine + display + clear).
Goal: "A user can open the app and complete a full basic calculation from a clean UI."

## Sprint 2 Plan (initial forecast, refined after Sprint 1 retro)
Candidate stories: **US-4, US-5, US-7, US-8** (error handling, keyboard support, health +
logging), adjusted based on Sprint 1 retrospective.
