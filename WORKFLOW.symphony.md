---
tracker:
  kind: linear
  project_slug: "esheria-wills"
  api_key: "$LINEAR_API_KEY"
  active_states:
    - Todo
    - In Progress
  terminal_states:
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
    corepack pnpm install
  before_remove: |
    echo "Workspace cleanup complete."
agent:
  max_concurrent_agents: 1
  max_turns: 6
codex:
  command: "$SYMPHONY_CODEX_COMMAND"
---

You are working on a Linear issue in the Esheria Wills repository.

Repository policy and expectations:

- Branch naming: `task/<linear-issue-key>-short-description`.
- One issue per branch and per PR.
- Do not push directly to `main`.
- Keep changes minimal and scoped to the issue.
- Prefer doc-only changes for the first live run.
- If any required env var is missing, stop and report the blocker.

Repo validation commands:

- `corepack pnpm lint`
- `corepack pnpm build`

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
