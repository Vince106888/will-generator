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
