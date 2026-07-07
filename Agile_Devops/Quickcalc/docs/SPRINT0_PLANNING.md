# Sprint 0 — Planning

## Product Vision
QuickCalc is a fast, dependable browser calculator that handles everyday arithmetic
without errors, crashes, or confusing UI — usable entirely from the keyboard or mouse.

## Product Backlog

| ID | User Story | Priority | Estimate (pts) |
|----|------------|----------|-----------------|
| US-1 | As a user, I can perform basic arithmetic (+, −, ×, ÷) so I can do everyday calculations. | Must | 3 |
| US-2 | As a user, I can see my current input and running result on a display so I always know what's happening. | Must | 2 |
| US-3 | As a user, I can clear the current entry or the whole calculation so I can recover from mistakes. | Must | 2 |
| US-4 | As a user, I get a clear error state (not a crash) when I do something invalid, like divide by zero. | Must | 2 |
| US-5 | As a user, I can use my keyboard (numbers, operators, Enter, Escape) so I don't have to click. | Should | 3 |
| US-6 | As a user, I can see my last few calculations in a history so I can refer back to them. | Should | 3 |
| US-7 | As an operator, the app exposes a health endpoint so uptime/monitoring tools can check it's alive. | Could | 1 |
| US-8 | As an operator, the server logs requests and errors so issues can be diagnosed after the fact. | Could | 2 |

Estimation method: Planning-poker-style relative sizing (Fibonacci-ish: 1, 2, 3, 5), done solo by
reasoning about complexity + uncertainty for each story.

## Acceptance Criteria (examples)

**US-1 — Basic arithmetic**
- Given two numbers and an operator, when I press "=", then the correct result is displayed.
- Chained operations (e.g. 2 + 3 × 4) evaluate left-to-right as entered (calculator-style, not
  full math order-of-operations), matching standard four-function calculator behavior.

**US-4 — Error handling**
- Given a divide-by-zero input, when I press "=", then the display shows "Error" and the app
  does not crash or freeze.
- Pressing any key after an error clears the error state and starts a new entry.

**US-7 — Health endpoint**
- Given the server is running, when I GET `/health`, then I receive HTTP 200 and a JSON body
  containing `status: "ok"` and an uptime figure.

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
