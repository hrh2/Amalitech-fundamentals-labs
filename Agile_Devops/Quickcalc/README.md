# QuickCalc

A small, dependable browser calculator built to practice Agile + DevOps delivery over two
simulated sprints.

**Live:** https://hope-calculator.vercel.app (deployed via Vercel; `/health` is live too)

## Run it locally

```bash
npm install
npm start        # serves the app + /health endpoint on http://localhost:3000
```

Open http://localhost:3000 in a browser.

## Run tests

`node_modules/` is intentionally not committed (see `.gitignore`) — this is standard practice
for a Node project, since dependencies are fully reproducible from `package.json` +
`package-lock.json`. To get an identical, reproducible install (what CI also runs), use `npm ci`
rather than `npm install`:

```bash
npm ci      # clean, deterministic install from package-lock.json
npm test    # runs the full unit + integration suite (vitest run)
```

Real output from the last local run (15 tests: 13 in `calc-engine.test.js`, 2 in
`server.test.js`):

```
 ✓ tests/calc-engine.test.js  (13 tests) 14ms
 ✓ tests/server.test.js  (2 tests) 157ms

 Test Files  2 passed (2)
      Tests  15 passed (15)
```

See `docs/EVIDENCE.md` for the full evidence checklist (CI run, health endpoint, deployment).

## Continuous Integration

This project lives inside a monorepo (`Agile_Devops/Quickcalc/` within the submitter's labs
repository). GitHub Actions only discovers workflows under a **repository-root**
`.github/workflows/`, so the workflow lives at the repo root, not inside this folder:

```
<repo root>/.github/workflows/ci.yml
```

It's scoped to this project with `paths: ["Agile_Devops/Quickcalc/**"]` and a
`working-directory: Agile_Devops/Quickcalc` default, so it only runs when QuickCalc changes, and
runs `npm ci`, `npm test`, then boots the server and smoke-tests `/health` with `curl --fail`.

## Deployment (Vercel)

`vercel.json` (in this folder) configures `server.js` as a single `@vercel/node` serverless
function that handles both static hosting and `/health`, with `public/` bundled alongside it —
identical behavior to running the app locally. Deployed and live at
**https://hope-calculator.vercel.app**; see `docs/EVIDENCE.md` for independent verification
(`curl` output against the live URL, screenshots) rather than just the link.

## What's not covered by the automated tests

The test suite (`vitest` + `supertest`) runs in Node, without a browser/DOM. It fully covers
`public/calc-engine.js` (pure logic) and `server.js` (HTTP behavior), but **cannot** exercise
`public/script.js` directly, since that module reads/writes the DOM and listens for real
keyboard/click events. Behavior that depends on `script.js` (e.g. the display rendering, or
keyboard shortcuts triggering the right action) is verified manually in the browser instead —
see the acceptance criteria in `docs/SPRINT0_PLANNING.md` for which stories rely on manual
verification vs. automated tests.

## Project docs
- [`docs/SPRINT0_PLANNING.md`](docs/SPRINT0_PLANNING.md) — vision, backlog, DoD, acceptance
  criteria, sprint plans
- [`docs/SPRINT1_REVIEW.md`](docs/SPRINT1_REVIEW.md)
- [`docs/SPRINT1_RETRO.md`](docs/SPRINT1_RETRO.md)
- [`docs/SPRINT2_REVIEW.md`](docs/SPRINT2_REVIEW.md)
- [`docs/SPRINT2_RETRO.md`](docs/SPRINT2_RETRO.md)
- [`docs/RESUBMISSION_NOTES.md`](docs/RESUBMISSION_NOTES.md) — reviewer feedback response and
  resubmission retrospective
- [`docs/EVIDENCE.md`](docs/EVIDENCE.md) — evidence checklist for every verifiable claim

## Stack
Vanilla HTML/CSS/JS on the front end, a tiny Express server for static hosting + `/health` +
logging, Vitest for unit/integration tests, GitHub Actions for CI, Vercel for deployment.
