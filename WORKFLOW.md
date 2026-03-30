---
tracker:
  kind: linear
  team_name: Lexsgo
  team_key: LEX
  project_name: Esheria Wills
  project_slug: esheria-wills

workspace_root: .

status_map:
  backlog: Backlog
  ready: Todo
  in_progress: In Progress
  review: In Review
  done: Done

approval_policy: never
sandbox_mode: danger-full-access

hooks:
  after_create:
    - git checkout -b "<issue.gitBranchName>"

# Launch Codex in app-server mode inside the issue workspace.
codex_command: codex app-server
---

# Symphony Workflow (Esheria Wills)

This file is the operational entrypoint for Symphony. It defines the Linear
project to watch, the statuses that are eligible for pickup, and the execution
contract for Codex vs Symphony.

## Pickup Rules (Executable)

Symphony should claim issues only when all are true:
1. Issue is in project `Esheria Wills` (slug `esheria-wills`).
2. Issue status is `Todo` (exact spelling matters).
3. Issue description includes purpose, scope, dependencies, and acceptance criteria.
4. Design/API/doc references are linked where required.

## Execution Rules (Executor)

- Start work only after pickup and branch creation.
- Keep changes scoped to the issue and avoid unrelated edits.
- Update source-of-truth docs when routes/APIs/flows change.
- Open a PR and move the issue to `In Review` when implementation is complete.

## Blocked Work

If blocked:
- Keep status in `Todo`.
- Add a `[BLOCKED]` note in the issue body or a comment with the dependency.
- Do not move to `In Progress` unless work is actively underway.
