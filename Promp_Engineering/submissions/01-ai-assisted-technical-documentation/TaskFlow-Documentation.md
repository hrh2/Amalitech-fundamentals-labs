# TaskFlow Documentation

*A single, well-organized documentation set for the TaskFlow task management
app, produced with AI assistance and fact-checked against the reference
implementation in [`sample-project/`](./sample-project).*

---

## Getting Started

TaskFlow is a simple task manager. This guide covers everything you can do
with it today: creating an account, logging in, and managing your tasks.

### Create an account

1. Go to the sign-up screen and enter your name, email, and a password.
2. TaskFlow creates your account and takes you to the login screen.

If you see an error saying an account already exists, you've probably signed
up with that email before — try logging in instead.

### Log in

1. Enter the email and password you signed up with.
2. On success, TaskFlow keeps you signed in for your session.

If your email or password is wrong, TaskFlow will tell you your login
details are incorrect. Double-check for typos, especially in your email.

### Create a task

1. Click **New Task** and give it a title (required). You can optionally add
   a description and a due date.
2. Every new task starts in the **To Do** column.

### Update a task

- Move a task between **To Do**, **In Progress**, and **Done** as you work on
  it.
- Edit its title, description, or due date at any time.

### Delete a task

Open a task and choose **Delete**. This can't be undone.

---

## API Reference

All endpoints are prefixed with `/api`. All request and response bodies are
JSON. Endpoints under `/api/tasks` require a valid session token.

### Authentication

#### `POST /api/auth/register`

Creates a new user account.

**Request body**
```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "secret123" }
```

**200/201 response** — `201 Created`
```json
{ "id": "b6e2...", "name": "Ada Lovelace", "email": "ada@example.com" }
```

**Error responses**
- `400 Bad Request` — `{ "error": "name, email and password are required" }`
- `400 Bad Request` — `{ "error": "An account with this email already exists" }`

#### `POST /api/auth/login`

Logs a user in and returns a session token.

**Request body**
```json
{ "email": "ada@example.com", "password": "secret123" }
```

**200 response**
```json
{
  "token": "9f2a...",
  "user": { "id": "b6e2...", "name": "Ada Lovelace", "email": "ada@example.com" }
}
```

**Error responses**
- `400 Bad Request` — `{ "error": "email and password are required" }`
- `401 Unauthorized` — `{ "error": "Invalid email or password" }`

Include the returned token on every subsequent request as:
`Authorization: Bearer <token>`

### Tasks

All `/api/tasks` routes require the `Authorization` header above.

- `401 Unauthorized` — `{ "error": "Missing or malformed Authorization header" }` if the header is absent or malformed.
- `401 Unauthorized` — `{ "error": "Invalid or expired token" }` if the token isn't recognized.

#### `GET /api/tasks`

Lists all tasks belonging to the signed-in user.

**200 response**
```json
{ "tasks": [ { "id": "...", "title": "Write docs", "status": "todo", "description": "", "dueDate": null, "createdAt": "...", "updatedAt": "..." } ] }
```

#### `POST /api/tasks`

Creates a task. New tasks always start with `"status": "todo"`.

**Request body**
```json
{ "title": "Write docs", "description": "Optional", "dueDate": "2026-08-01" }
```

**201 response**
```json
{ "task": { "id": "...", "title": "Write docs", "status": "todo", "description": "Optional", "dueDate": "2026-08-01", "createdAt": "...", "updatedAt": "..." } }
```

**Error response**
- `400 Bad Request` — `{ "error": "title is required" }`

#### `GET /api/tasks/:id`

Returns a single task.

**200 response** — `{ "task": { ...same shape as above } }`
**Error response** — `404 Not Found` — `{ "error": "Task not found" }`

#### `PUT /api/tasks/:id`

Updates a task. All fields are optional; only `status` is validated against
a fixed set of values.

**Request body**
```json
{ "status": "in-progress" }
```

**200 response** — `{ "task": { ...updated task } }`

**Error responses**
- `400 Bad Request` — `{ "error": "status must be one of: todo, in-progress, done" }`
- `404 Not Found` — `{ "error": "Task not found" }`

#### `DELETE /api/tasks/:id`

Deletes a task.

**204 response** — empty body
**Error response** — `404 Not Found` — `{ "error": "Task not found" }`

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `401 Invalid email or password` on login | Wrong password, or you haven't registered with that email yet | Re-check your credentials; if you've never registered, sign up first |
| `400 An account with this email already exists` on sign-up | You already have an account | Log in instead of registering again |
| `401 Missing or malformed Authorization header` on any `/api/tasks` call | You forgot to send the token, or sent it without the `Bearer ` prefix | Send `Authorization: Bearer <token>` on every task request |
| `401 Invalid or expired token` | Your session token is wrong or you're using an old one from a previous login | Log in again to get a fresh token |
| `400 title is required` when creating a task | The `title` field was empty or missing | Provide a non-empty `title` |
| `400 status must be one of: todo, in-progress, done` | You tried to set an unsupported status (e.g. `"archived"`) | Use one of the three supported status values |
| `404 Task not found` | The task ID doesn't exist, or it belongs to a different user | Double-check the ID; TaskFlow only lets you see your own tasks |

---

## Prompt History (condensed)

The full, unabridged log is in [`prompt-history.md`](./prompt-history.md).
Summary of the process actually followed:

1. **First pass** — generic prompts ("Write a getting started guide", "Write
   an API reference", "Write a troubleshooting section") produced plausible
   but inaccurate, generic-template content (invented features like
   "projects/boards", placeholder endpoints, generic advice).
2. **Refine** — each section was regenerated with the actual source code
   from `sample-project/` pasted into the prompt, plus an explicit role,
   audience, and output format. This is what fixed the inaccuracies.
3. **Fact-check correction** — a second refinement pass removed one
   hallucinated field (`priority` on tasks) that the AI invented even with
   code pasted in, caught by comparing the draft line-by-line against
   `routes/tasks.js` and re-running the test suite.
4. **Chain** — a final prompt asked the AI to standardize tone and heading
   levels (H2 main / H3 sub) across all three sections *without* changing
   any technical facts, endpoints, or status codes.
5. **Assemble** — the three fact-checked, style-matched sections were
   combined into this single document.

---

## Reflection

The hardest part wasn't generating content — it was fact-checking it. The
first API reference draft looked completely convincing, including a
`priority` field that simply doesn't exist in the code; only a line-by-line
comparison against `routes/tasks.js` caught it. That's the core risk with
AI-generated docs: fluent, well-formatted text reads as trustworthy even
when it's wrong.

Iterative prompting made the biggest difference once I stopped describing
the app in prose and started pasting the actual source code into each
prompt. The first-pass, code-free prompts produced generic, occasionally
fabricated content; refined prompts grounded in real endpoints eliminated
almost all inaccuracies immediately. Chaining a final "standardize tone and
headings, don't change facts" prompt kept the three sections consistent
without reopening the accuracy problem — though it needed that explicit
guardrail to avoid quietly rewording a status code's meaning.
