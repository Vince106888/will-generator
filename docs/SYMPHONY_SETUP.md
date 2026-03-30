# Symphony Setup

Date: 2026-03-30

This document explains how Symphony should be configured to pick up Linear
issues for Esheria Wills and how to run the Symphony Elixir runner against this
repo.

## Required Inputs

- Linear API key in environment: `LINEAR_API_KEY`
- Repository root available on disk.
- `WORKFLOW.symphony.md` present at repo root (executable workflow).
- `WORKFLOW.md` present at repo root (policy).

## Project Targets

- Team: Lexsgo (`LEX`)
- Project slug: `esheria-wills`
- Ready status: `Todo` (exact spelling matters)
- In-progress status: `In Progress`
- Review status: `In Review`
- Done status: `Done`

## Shared Runtime (OpsSec Reference)

This repo reuses the shared Symphony Elixir runtime located in:
`C:\Users\HP\work\esherialabs\esheria-opssec\tooling\symphony\elixir`.

Override with `SYMPHONY_RUNTIME_ROOT` if the runtime lives elsewhere.

## Startup (Symphony Elixir)

Symphony Elixir is prototype/evaluation software. Run it from the repo root
and point it to the local `WORKFLOW.symphony.md`:

```bash
corepack pnpm symphony:start
```

Runner expectations:
1. Load `WORKFLOW.symphony.md` from the repo root (YAML front matter + prompt body).
2. Authenticate with Linear using `LINEAR_API_KEY`.
3. Poll for issues in project `esheria-wills` with status `Todo`.
4. Create a per-issue workspace and launch Codex in app-server mode.

The workflow sets:
- `codex` command via `SYMPHONY_CODEX_COMMAND` (defaults to `codex app-server`)
- `workspace` root via `SYMPHONY_WORKSPACE_ROOT`
- `SYMPHONY_SOURCE_REPO_URL` for cloning

If you run Symphony directly without the wrapper script, use:

```bash
setx LINEAR_API_KEY "<token>"
setx SYMPHONY_WORKSPACE_ROOT "C:\\symphony-workspaces"
setx SYMPHONY_SOURCE_REPO_URL "https://github.com/esherialabs/esheria-wills.git"
setx SYMPHONY_CODEX_COMMAND "codex app-server"
setx SYMPHONY_RUNTIME_ROOT "C:\\Users\\HP\\work\\esherialabs\\esheria-opssec\\tooling\\symphony\\elixir"
```

## Verification Signals

Symphony should log:
- Successful authentication against Linear.
- The project slug and status filter it is polling.
- Issue IDs when it claims work (e.g., `LEX-257`).
- Workspace root + runtime path.

If no issues are claimed, re-check:
- Status spelling (Todo vs To Do).
- Project slug correctness (`esheria-wills`).
- Issue readiness (acceptance criteria and dependencies present).
- That `WORKFLOW.symphony.md` is used, not `WORKFLOW.md`.

## Symphony Run Verification Checklist

Use this checklist for the pilot run to confirm Symphony picked up a Todo issue
and executed the full lifecycle.

Steps to run Symphony:
- [ ] Ensure `LINEAR_API_KEY` is available and points to Lexsgo (`LEX`).
- [ ] Confirm `SYMPHONY_WORKSPACE_ROOT` and `SYMPHONY_SOURCE_REPO_URL` resolve to the correct workspace and repo.
- [ ] From repo root, run `corepack pnpm symphony:start`.
- [ ] Keep the runner terminal open to observe logs and issue pickup.
- [ ] Confirm `WORKFLOW.symphony.md` is the workflow being loaded (not `WORKFLOW.md`).

Expected logs (examples):
- [ ] Log line indicating Linear authentication success.
- [ ] Log line showing workflow load from repo root (mentions `WORKFLOW.symphony.md`).
- [ ] Log line showing polling project `esheria-wills` with status `Todo` (and team `LEX`).
- [ ] Log line showing claimed issue ID (for this pilot, `LEX-277`).
- [ ] Log line showing workspace creation path and `codex app-server` launch.
- [ ] Log line indicating validations kicked off (lint/build) and their outcome.

Confirm issue pickup:
- [ ] Verify the Linear issue moved to `In Progress`.
- [ ] Verify a branch exists locally matching `task/<issue-key>-symphony-pilot`.
- [ ] Verify a PR is opened against `main` and linked to the Linear issue.
- [ ] Verify the issue is moved to `In Review` once the PR is open and checks pass.

## One-Line Launcher

Use the repo wrapper (Windows):

```bash
corepack pnpm symphony:start
```

This script:
- Loads `.env`
- Verifies required env keys
- Uses the shared Symphony runtime from OpsSec by default
- Runs `scripts/symphony-readiness.mjs`
- Starts Symphony with logs in the runtime folder

## Pilot Issue Template (Ready-For-Symphony)

Use this structure for the first validation run:

- **Purpose / Context:** one paragraph.
- **Why this matters:** 2-3 bullets.
- **Scope:** explicit, small, testable.
- **Out of scope:** explicitly excluded work.
- **Dependencies:** “none” or list.
- **Acceptance criteria:** 3-6 verifiable checks.
- **Doc references:** link to source-of-truth docs.
- **Execution notes:** any repo constraints or commands.
- **Review trigger:** what must be true to move to `In Review`.

Example pilot shape:
“Update a single doc table or add a small non-functional README tweak with
clear acceptance criteria and no code changes.” The goal is to validate
pickup → branch → PR → In Review without product risk.
