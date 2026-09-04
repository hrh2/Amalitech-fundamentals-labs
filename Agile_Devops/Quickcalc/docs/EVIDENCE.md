# Evidence Checklist

Every important claim in this submission should be independently verifiable. This table is
honest about what is verified right now vs. what is still pending a manual step outside this
repository (GitHub Actions running from the pushed repo, and the Vercel deployment itself both
require actions only the repository/account owner can perform — see the "Pending" rows).

| # | Claim | Evidence | Status |
|---|-------|----------|--------|
| 1 | Unit + integration tests pass | Local run, `npm ci && npm test`: **15/15 tests passed** (13 in `tests/calc-engine.test.js`, 2 in `tests/server.test.js`). Full output captured in `README.md`. | ✅ Verified locally |
| 2 | Health endpoint works | `node server.js` boots and logs `{"level":"info","msg":"server_started","port":3000}`; `curl http://localhost:3000/health` returned `{"status":"ok","uptimeSeconds":1,"timestamp":"..."}` (HTTP 200). Captured during this revision. | ✅ Verified locally |
| 3 | Structured logging works | Same run: every request produced a JSON log line, e.g. `{"level":"info","msg":"request","method":"GET","path":"/health","status":200,"durationMs":13,...}`. | ✅ Verified locally |
| 4 | Error handling works | `tests/calc-engine.test.js` "US-4: error handling" (divide-by-zero → `Error` state, not a crash; next digit clears it) — 2 passing tests. Server-side centralized error handler (`server.js`) has no dedicated automated test exercising a thrown error. | ✅ Calculator error handling verified by test. ⚠️ Server error-handler branch not test-covered (documented, not claimed as tested) |
| 5 | `percent()` no longer exposes float artifacts | New regression test `"percent does not expose floating-point artifacts"` — `1.1` → `percent()` → `"0.011"` (raw JS would give `0.011000000000000001`). Passing. | ✅ Verified locally |
| 6 | GitHub Actions CI runs from the submitted repository | Workflow relocated to `<repo root>/.github/workflows/ci.yml`, scoped to `Agile_Devops/Quickcalc/**`. **Not yet run against a real push** — requires pushing this branch to GitHub. | ⏳ Pending — see MANUAL ACTION REQUIRED below |
| 7 | Application is deployed | `vercel.json` added, configured to serve the app as a `@vercel/node` function. **Not yet deployed** — requires the account owner to run `vercel` (or connect the repo in the Vercel dashboard). | ⏳ Pending — see MANUAL ACTION REQUIRED below |
| 8 | Acceptance criteria are satisfied | `docs/SPRINT0_PLANNING.md` now has Given/When/Then criteria for all 8 stories, each tagged with whether it's covered by an automated test or by manual browser verification. | ✅ Documented; automated portions verified by test run above |
| 9 | Agile iteration occurred | Original delivery: 11 commits, all within a 3-minute window (`2026-07-07T15:03:37Z`–`15:06:54Z`) — **does not demonstrate incremental delivery**, acknowledged rather than hidden. Resubmission: each fix above is its own commit with its own message and its own real timestamp — see `docs/RESUBMISSION_NOTES.md`. | ⚠️ Original history does not support this claim; resubmission history does (verifiable via `git log`) |
| 10 | Scope was managed responsibly | US-6 descoped in Sprint 2, reasoning preserved in `docs/SPRINT2_RETRO.md`; `docs/SPRINT0_PLANNING.md` backlog now explicitly marks US-6 "Descoped — not delivered" rather than leaving its status ambiguous. | ✅ Verified by reading the docs directly |

## MANUAL ACTION REQUIRED — GitHub Actions

1. **What to do:** Push the `main` branch (containing this resubmission's commits) to the
   `origin` remote (`hrh2/Amalitech-fundamentals-labs`).
2. **Where:** From the repo root: `git push origin main`.
3. **What you should see:** On GitHub, under the repository's **Actions** tab, a workflow run
   named **QuickCalc CI** triggered by the push, showing steps for checkout, Node setup,
   `npm ci`, `npm test`, and the `/health` smoke test.
4. **Evidence to capture:** A screenshot of the completed (green, "All checks passed") workflow
   run, including the expanded log output of the test step and the health-check step.
5. **Where to save it:** `Agile_Devops/Quickcalc/docs/evidence/ci-run.png` (create the
   `docs/evidence/` folder), and update `docs/EVIDENCE.md` row 6 to link to it and note the run
   URL (e.g. `https://github.com/hrh2/Amalitech-fundamentals-labs/actions/runs/<id>`).

## MANUAL ACTION REQUIRED — Vercel Deployment

1. **What to do:** Deploy this project to Vercel using your own account (the CLI needs your
   login; I cannot authenticate as you).
2. **Where:** From `Agile_Devops/Quickcalc/`, either:
   - CLI: `npx vercel login`, then `npx vercel --prod` (when prompted for the project root,
     confirm `Agile_Devops/Quickcalc`), **or**
   - Dashboard: [vercel.com/new](https://vercel.com/new) → import the GitHub repository → set
     **Root Directory** to `Agile_Devops/Quickcalc` → Deploy.
3. **What you should see:** A live URL (e.g. `https://quickcalc-xxxx.vercel.app`) serving the
   calculator UI, and `https://<your-url>/health` returning `{"status":"ok",...}`.
4. **Evidence to capture:** (a) the deployment URL itself, (b) a screenshot or `curl` output of
   `GET /health` against the **live** URL, (c) a screenshot of the calculator working in a
   browser at the live URL.
5. **Where to save it:** Add the live URL and the `/health` output to `docs/EVIDENCE.md` row 7,
   and save any screenshot(s) to `Agile_Devops/Quickcalc/docs/evidence/`.

Do not report either of these as "done" until you've actually performed the step and captured
the real result — a claimed-but-unverified CI/deploy status is exactly what triggered the
original "Redo Lab" result.
