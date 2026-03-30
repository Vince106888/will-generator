# Symphony Workflow

This file is the operational entrypoint for Symphony. It defines the Linear
project to watch, the statuses that are eligible for pickup, and the execution
contract for Codex vs Symphony.

## Tracker Configuration (Linear)

```yaml
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

# Optional: if your Symphony runner supports post-issue hooks, use the
# Linear-provided branch name.
hooks:
  after_create:
    - git checkout -b "<issue.gitBranchName>"

# Codex command used by Symphony for execution.
codex_command: codex
```

## Symphony Pickup Rules (Executable)

Symphony should claim issues only when all are true:
1. Issue is in project `Esheria Wills`.
2. Issue status is `Todo` (not `Backlog`).
3. Issue description contains: purpose, scope, dependencies, acceptance criteria.
4. Design/API/doc references are linked where required.

When Symphony completes work:
- Move issue to `In Review`.
- Open a PR and include the required summary.
- Update source-of-truth docs when routes/APIs/flows change.

If blocked:
- Keep status in `Todo`.
- Add a `[BLOCKED]` note in the issue body or a comment with the blocker.
- Do not move to `In Progress` unless work is actively underway.
