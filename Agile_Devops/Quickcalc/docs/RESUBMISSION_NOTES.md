# Resubmission Notes

This lab was reviewed by Abdul-Rashid Issah and returned with **Redo Lab: YES**. This document
records what the review found, what was actually done in response, and — honestly — what the
original Git history does and doesn't demonstrate.

## What the review got right

The reviewer's critical findings were all verified as accurate before making any changes:

- The GitHub Actions workflow lived at `Agile_Devops/Quickcalc/.github/workflows/ci.yml`, inside
  a monorepo. GitHub Actions only discovers `.github/workflows/` at the **repository root**, so
  it never ran from the submitted repository. Confirmed by inspecting the actual repo structure.
- No `vercel.json` or deploy job existed anywhere in the project.
- All 11 original QuickCalc commits are timestamped between `2026-07-07T15:03:37Z` and
  `2026-07-07T15:06:54Z` — a 3-minute, 17-second window. This does not demonstrate incremental,
  Agile-style delivery, regardless of what the sprint documents describe.
- Only 3 of 8 user stories (US-1, US-4, US-7) had Given/When/Then acceptance criteria.
- `percent()` used `String(parseFloat(x) / 100)`, which can surface raw binary floating-point
  error (confirmed: `1.1 / 100` evaluates to `0.011000000000000001` in Node).

## On the original commit history — what we will not do

**We will not rewrite the original 11 commits' timestamps, squash them into a fake multi-day
history, or otherwise alter the historical record.** Doing so would fabricate evidence of
incremental delivery that did not occur, which is a worse problem than the one being fixed. The
original commits remain exactly as they are: `0ade090` through `a79b8cb`, all dated
`2026-07-07`, all within the same few minutes.

That history is a genuine, acknowledged limitation of the original submission. What follows is
not an attempt to hide it, but to demonstrate real delivery discipline **from this point
forward**, which is the only thing actually within control during a resubmission.

## What was done during this resubmission

Every fix below was committed separately, with its own descriptive message, at its own real
timestamp — run `git log --oneline --decorate` in the repo root to see them (they follow the 11
original QuickCalc commits and precede/follow other, unrelated lab commits in this monorepo,
since this repository holds multiple independent labs). In order:

1. Relocated the GitHub Actions workflow to the repository root, scoped to this project.
2. Fixed `server.js` so `app.listen()` only runs when the file is executed directly, not when
   imported by tests or by a serverless platform — this also resolves the "split app
   construction from server startup" tech debt item explicitly called out in
   `docs/SPRINT2_RETRO.md`.
3. Added `vercel.json` for deployment.
4. Fixed the `percent()` floating-point artifact and added a regression test.
5. Added acceptance criteria for all 8 user stories in `docs/SPRINT0_PLANNING.md`, explicitly
   marking US-6 as descoped rather than giving it criteria the app doesn't meet.
6. Rewrote the README's testing section for reproducibility (`npm ci`, real captured test
   output) and documented the corrected CI/deployment setup.
7. Added `docs/EVIDENCE.md`, an honest evidence checklist distinguishing what's verified
   locally from what's still pending a manual step (pushing to trigger CI, deploying to
   Vercel) — see that file for exactly what still needs to happen and why it can't be done from
   here.
8. Added `docs/EVIDENCE.md` and this file.
9. Pushed `main` to `origin`, which triggered **GitHub Actions → "QuickCalc CI" → run #1** —
   completed successfully in 16 seconds, all 8 steps green. Screenshot captured:
   `docs/evidence/ci-run.png`.
10. Deployed the application to Vercel: **https://hope-calculator.vercel.app**. Verified
    independently (not just from a screenshot) with `curl` against the live URL and `/health`
    endpoint — see `docs/EVIDENCE.md`. Screenshots captured: `docs/evidence/app-running.png`,
    `docs/evidence/app-calculation.png`, `docs/evidence/health-browser.png`,
    `docs/evidence/health-curl.png`.

Each commit was tested before being committed — see `docs/EVIDENCE.md` for the actual local
test output, live CI result, and live deployment verification.

## Status

Both critical gaps identified by the review are now closed with real, independently-checkable
evidence rather than placeholders or unverified claims:

- **Critical Gap #1 (CI never ran from the submitted repository):** resolved. The workflow now
  lives at the repo root, is correctly scoped for the monorepo, and has a real, green run
  against the pushed commits.
- **Critical Gap #2 (unverifiable Vercel deployment):** resolved. The application is deployed
  and live at https://hope-calculator.vercel.app, with its `/health` endpoint independently
  re-checked during this session (`uptimeSeconds` was non-zero and increasing across separate
  checks — proof of a real running process, not a static mock).

**US-6 remains undelivered by design.** This is not being treated as a gap to silently close;
it's a documented, intentional scope decision preserved from Sprint 2, and is marked
"Descoped — not delivered" throughout the documentation rather than implied as complete.

**Delivery Discipline** is the one category where the resubmission can improve the *process*
demonstrated from here forward, but cannot repair the original record: the original 11 commits
remain a 3-minute, undifferentiated dump. What can honestly be said is that every fix in this
cycle was implemented, tested, and committed as its own reviewable unit, and that the final two
commits (push-and-verify-CI, deploy-and-verify-Vercel) reflect real operational follow-through,
not just documentation claims.
