# QuickCalc

A small, dependable browser calculator built to practice Agile + DevOps delivery over two
simulated sprints.

## Run it locally

```bash
npm install
npm start        # serves the app + /health endpoint on http://localhost:3000
```

Open http://localhost:3000 in a browser.

## Run tests

```bash
npm test
```

## Project docs
- [`docs/SPRINT0_PLANNING.md`](docs/SPRINT0_PLANNING.md) — vision, backlog, DoD, sprint plans
- [`docs/SPRINT1_REVIEW.md`](docs/SPRINT1_REVIEW.md)
- [`docs/SPRINT1_RETRO.md`](docs/SPRINT1_RETRO.md)
- [`docs/SPRINT2_REVIEW.md`](docs/SPRINT2_REVIEW.md)
- [`docs/SPRINT2_RETRO.md`](docs/SPRINT2_RETRO.md)

## Stack
Vanilla HTML/CSS/JS on the front end, a tiny Express server for static hosting + `/health` +
logging, Vitest for unit/integration tests, GitHub Actions for CI.
