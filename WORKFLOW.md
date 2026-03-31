# WORKFLOW.md (Process Policy)

## Purpose
Define process expectations for Symphony-driven work. This file is policy only.

For the executable Symphony workflow file (YAML front matter), use:
- `WORKFLOW.symphony.md`

## Tracker
- Source of truth: Linear issue
- One issue per branch per PR
- No direct pushes to `main`
- CI must pass before requesting review

## Symphony Mode (First Live Run)
- Single agent only (no concurrency)
- No auto-merge
- Use small, reversible doc-only changes

## Symphony Mode (Post-Validation)
- Allow limited concurrency when multiple issues are in `Todo`.
- Max 2 concurrent agents until further notice.
- Still one issue per branch/PR; no cross-issue batching.

## Expected Linear States
These are the expected states for Symphony-driven work:
- Todo
- In Progress
- In Review
- Done

If your Linear workspace uses different names, map them to the states above and keep the sequence unchanged.

## Branch Naming
`task/<linear-issue-key>-short-description`
Example: `task/LEX-277-symphony-pilot`

## Bootstrap (Workspace)
```
corepack pnpm install
```

## App-Server Mode (Codex)
Run Codex in app-server mode for this repo. Use the executable referenced by `SYMPHONY_CODEX_COMMAND`.

## Validation (Required Before Review)
```
corepack pnpm lint
corepack pnpm build
```

## Scope Discipline
- Do not implement product features unless explicitly required for the issue.
- Keep changes minimal and focused.

## Symphony Execution Discipline (Hard Requirements)
- Create a branch per issue (`task/<linear-issue-key>-short-description`).
- Make small, focused commits (mini commits) tied to the issue.
- Push the branch to origin.
- Open or update a PR against `main`.
- Attach the PR link to the Linear issue (mandatory).
- Move the Linear issue to `In Review` when implementation is complete.
- Stop execution when the issue reaches `In Review` (hard stop).

## Symphony Lifecycle Enforcement (Required)
- Symphony only claims work from `Todo`.
- Symphony must move claimed work to `In Progress`.
- Symphony must move completed work to `In Review` and stop there.
- `In Review` is a terminal execution state for Symphony (even though Linear may move to `Done` later).
- If work is moved back to `Todo` or `In Progress`, it becomes eligible again.
- If blocked, Symphony must leave a visible `[BLOCKED]` comment and stop.
