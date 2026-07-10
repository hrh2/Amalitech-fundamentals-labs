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

---

## Refinement pass (Phase 3)

### Getting Started guide — refine

**Prompt:**
> Act as a technical writer for TaskFlow, a task manager whose only backend
> features right now are user registration/login and CRUD on individual
> tasks (title, description, status, due date — no projects, boards, or
> teams). Here are the actual endpoints: [pasted `routes/auth.js` and
> `routes/tasks.js`]. Rewrite the Getting Started guide for a non-technical
> end user, using only features that actually exist. Use H2 for main steps.

**Result:** Guide now correctly covers: creating an account, logging in,
creating a task, checking it off / moving it to "in progress" or "done",
editing and deleting a task — and drops the fictional "boards/teams"
content entirely.

### API reference — refine

**Prompt:**
> Act as a technical writer. Here is the JavaScript code for TaskFlow's
> auth and tasks routes: [pasted `routes/auth.js`, `routes/tasks.js`,
> `middleware/auth.js`]. Write an API reference covering every route,
> including the HTTP method, path, required headers, the exact JSON request
> body, and a realistic success and error response example for each
> (matching the actual status codes returned in the code, e.g. 201 vs 200,
> 401 vs 400).

**Result:** First accurate draft, but it initially claimed `PUT
/api/tasks/:id` accepts a `priority` field, which does not exist in
`routes/tasks.js`. Caught during fact-checking (see Reflection).

### API reference — second refine (fact-check correction)

**Prompt:**
> Remove the `priority` field from the PUT /api/tasks/:id example — it is
> not implemented in the code. The only updatable fields are title,
> description, status, and dueDate. Also add the exact error message the
> code returns when `status` is invalid.

**Result:** Corrected reference, now matching `sample-project/routes/tasks.js`
exactly (verified again with `npm test`).
