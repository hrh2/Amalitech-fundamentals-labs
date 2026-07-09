# Prompt History — AI-assisted Technical Documentation (TaskFlow)

This is the running log of prompts used to generate and refine the TaskFlow
documentation, kept in the order they were actually run.

---

## Getting Started guide

### First pass (generic template)

**Prompt:**
> Write a getting started guide for a task management app called TaskFlow.

**Result (summary):** A generic, plausible-sounding guide — "Sign up, create
your first task, organize with boards" — with a "Projects" and "Teams"
section. Neither of these exist in TaskFlow's actual API (see
`sample-project/routes/`). This is exactly the "generic template" the lab
warns about.

---

## API reference

### First pass (generic template)

**Prompt:**
> Write an API reference.

**Result:** A boilerplate reference with placeholder endpoints like
`GET /api/users/{id}` and `POST /api/items` — none of which exist in
TaskFlow. This is the "Bad prompt" example from the lab brief, reproduced
deliberately to show the before/after.

---

## Troubleshooting section

### First pass (generic template)

**Prompt:**
> Write a troubleshooting section for a web app.

**Result:** Generic entries like "Clear your browser cache" and "Check your
internet connection" with no TaskFlow-specific error codes.
