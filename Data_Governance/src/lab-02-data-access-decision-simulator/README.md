# Case File 02 — EduConnect Data Access Decision Simulator

**Format:** Interactive HTML/CSS/JS system (no build step, no dependencies to install)

## What this is

A click-through simulator of the three Monday-morning access-request tickets: a marketing
data request, a cross-border analytics partnership, and a right-to-be-forgotten deletion.
For each ticket you pick Approve / Deny / Conditional, then the tool reveals the reference
decision, the data-lifecycle stage, and the least-privilege / Ghana DPA reasoning behind it,
and finally a decision report scoring your choices against the reference answers.

## Source material

Built from [`Data Access Decision Simulator.md`](../../tasks/Data%20Access%20Decision%20Simulator.md), applying the classification tiers
(PUBLIC / INTERNAL / CONFIDENTIAL), data lifecycle stages, least-privilege principle, and
Ghana DPA (Act 843) obligations from the course notes.

## Run it

Open `index.html` directly in any browser. All logic is vanilla JS; no server or build step
required.
