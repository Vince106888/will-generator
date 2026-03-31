---
tracker:
  kind: linear
  project_slug: "esheria-wills-cf36a69caf55"
  api_key: "$LINEAR_API_KEY"
  active_states:
    - Todo
    - In Progress
  terminal_states:
    - In Review
    - Done
    - Canceled
    - Cancelled
    - Duplicate
    - Closed
polling:
  interval_ms: 10000
workspace:
  root: "$SYMPHONY_WORKSPACE_ROOT"
hooks:
  after_create: |
    git clone --depth 1 "$SYMPHONY_SOURCE_REPO_URL" .
    # Skip dependency install for doc-only tasks; run manually if required by the issue.
  before_remove: |
    echo "Workspace cleanup complete."
agent:
  max_concurrent_agents: 2
  max_turns: 10
codex:
  command: "$SYMPHONY_CODEX_COMMAND"
  read_timeout_ms: 20000
  approval_policy: never
  thread_sandbox: workspace-write
  turn_sandbox_policy:
    type: workspaceWrite
---

You are working on a Linear issue in the Esheria Wills repository.

Repository policy and expectations:

- Branch naming: `task/<linear-issue-key>-short-description`.
- One issue per branch and per PR.
- Do not push directly to `main`.
- Keep changes minimal and scoped to the issue.
- Prefer doc-only changes for the first live run.
- PR link is mandatory on the Linear issue.
- Move the issue to `In Review` when done and stop execution (hard stop).
- If any required env var is missing, stop and report the blocker.

Repo validation commands (pilot):

- Skip lint/build for the pilot issue unless explicitly required by the ticket.

Workspace/bootstrap notes:

- If a command or config is missing, report it as a blocker rather than guessing.

Issue context:

Identifier: {{ issue.identifier }}
Title: {{ issue.title }}
Current status: {{ issue.state }}
Labels: {{ issue.labels }}
URL: {{ issue.url }}

Description:
{% if issue.description %}
{{ issue.description }}
{% else %}
No description provided.
{% endif %}

First live workflow (doc-only):

- Trigger: Linear issue in `Todo` with title "Symphony Pilot: verify runner and PR workflow".
- Expected state path: `Todo` -> `In Progress` -> `In Review`.
- Change scope: single doc-only edit related to Symphony or operator workflow clarity.
- Branch name: `task/<issue-key>-symphony-pilot`.
- Validations: run lint and build.
- PR: open against `main`, branch name matches policy, no auto-merge.
- Success criteria: PR linked on issue, issue moved to `In Review`, and Symphony stops because `In Review` is not an active execution state.
- Failure criteria: missing env vars, missing Codex app-server, or validations failing.

Execution requirements:
- On pickup, move the issue to `In Progress` via Linear.
- If Linear update fails, stop and report the blocker.
- For the pilot issue, do not run lint/build unless explicitly required by the ticket.
- Use `gh` to open a PR; if GitHub auth is missing, report and stop.

Status enforcement (hard rules):
- Only claim new work from `Todo`.
- If an issue is already `In Progress`, proceed only if it was previously claimed by Symphony.
  - Evidence: a prior "Symphony claimed" comment or the assignee is the Symphony operator.
  - If evidence is missing, stop and report the blocker (do not silently continue).
- Move to `In Review` immediately after the PR is open/updated and linked in Linear.
- Once in `In Review`, stop all work on that issue.
- If an issue is moved back to `Todo` or `In Progress`, it becomes eligible again.

Required visibility:
- Add a "Symphony claimed" comment when you move the issue to `In Progress`.
- Add a "PR ready" comment with the PR link before moving to `In Review`.
- If blocked, leave a `[BLOCKED]` comment with the reason and required dependency.
