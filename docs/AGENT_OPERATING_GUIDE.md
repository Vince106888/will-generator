# Agent Operating Guide

Date: 2026-03-30

## Source of Truth
- Design: `design/pencil-implementation.pen` and `docs/design/design-source-of-truth.md`
- System maps and architecture: this `docs/` set
- Route map: `docs/FRONTEND_IMPLEMENTATION_MAP.md`
- Backend plan: `docs/BACKEND_ARCHITECTURE_PLAN.md`
- AI boundaries: `docs/AI_BOUNDARIES_AND_ORCHESTRATION.md`
- Symphony runtime: `WORKFLOW.symphony.md`, `WORKFLOW.md`, and `docs/SYMPHONY_SETUP.md`

## Roles and Responsibilities

Codex (PM/Systemizer)
- Owns repo truth and documentation accuracy.
- Owns issue quality, sequencing, and readiness criteria.
- Owns PR hygiene and branch discipline.
- Updates docs when the system truth changes.
- Does not execute implementation by default.

Symphony (Executor)
- Executes ready issues from Linear.
- Works an issue to completion or marks it Blocked with explicit reasons.
- Moves work to In Review when implementation is complete.
- Updates issue progress with clear summaries and remaining risks.

## Readiness Rules (Before Symphony Starts)
An issue is READY only if:
- Scope and acceptance criteria are written and testable.
- Dependencies are resolved or explicitly listed.
- Design references are linked (if frontend).
- API contracts are referenced (if backend).
- Data model expectations are stated (if persistence).

An issue is NOT READY if:
- It depends on missing decisions, missing frames, or undefined APIs.
- It lacks acceptance criteria or has ambiguous scope.
- It conflicts with documented AI or legal boundaries.

## Implementation Discipline
- No silent route additions. Every new route must be documented.
- AI output must never override user-confirmed structured data.
- Deterministic legal logic stays in backend engines, not AI.
- All changes that affect flow must update the alignment docs.
- No direct work on `main`.

## Commit and PR Discipline
- Small, focused commits per workstream.
- Update docs in the same PR when a truth changes.
- PRs must include: what changed, why, what did not change, risks/follow-ups.
- Do not amend commits unless explicitly instructed.

## Validation Rules
- Route/page validation: every route maps to a design frame and code file.
- Backend validation: API input/output types are documented and tested.
- Design alignment: use `design-source-of-truth.md` as gate.

## When to Update Docs
- New route, new page, or a removed page.
- Design frame changes.
- Backend API or data model changes.
- AI boundary changes.
- Any shift in execution sequencing or dependencies.

## Linear Hygiene
- Move issues to In Progress only when work is active and ready.
- Move to In Review only when implementation is complete and tests (if any) pass.
- Keep audit issues separate from implementation tasks.
- Never start vague work; request clarification instead.

## Linear Status Names (Lexsgo)
- Backlog
- Todo
- In Progress
- In Review
- Done

If blocked, keep in `Todo` and add a `[BLOCKED]` note with the dependency.

## Symphony Runtime Notes
- Symphony Elixir reads `WORKFLOW.symphony.md` (YAML front matter + prompt body).
- Start with `corepack pnpm symphony:start` from the repo root.
- `WORKFLOW.symphony.md` launches Codex in app-server mode (`codex app-server`).

## Review Handoff Expectations
- Provide a succinct implementation summary.
- Call out known gaps or risks.
- Link updated docs or frames if relevant.
- Leave next steps for PM/Systemizer.
