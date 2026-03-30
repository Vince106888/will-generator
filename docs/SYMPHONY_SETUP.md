# Symphony Setup

Date: 2026-03-30

This document explains how Symphony should be configured to pick up Linear
issues for Esheria Wills and how to run the Symphony Elixir runner against this
repo.

## Required Inputs

- Linear API key in environment: `LINEAR_API_KEY`
- Repository root available on disk.
- `WORKFLOW.md` present at repo root.

## Project Targets

- Team: Lexsgo (`LEX`)
- Project slug: `esheria-wills`
- Ready status: `Todo` (exact spelling matters)
- In-progress status: `In Progress`
- Review status: `In Review`
- Done status: `Done`

## Startup (Symphony Elixir)

Symphony Elixir is prototype/evaluation software. Run it from the repo root
and point it to the local `WORKFLOW.md`:

```bash
./bin/symphony ./WORKFLOW.md
```

Runner expectations:
1. Load `WORKFLOW.md` from the repo root (YAML front matter + prompt body).
2. Authenticate with Linear using `LINEAR_API_KEY`.
3. Poll for issues in project `esheria-wills` with status `Todo`.
4. Create a per-issue workspace and launch Codex in app-server mode.

The workflow sets:
- `codex_command: codex app-server`
- `workspace_root: .`

If your runner uses environment variables instead of CLI args, set:

```bash
setx LINEAR_API_KEY "<token>"
setx SYMPHONY_WORKFLOW "WORKFLOW.md"
```

## Verification Signals

Symphony should log:
- Successful authentication against Linear.
- The project slug and status filter it is polling.
- Issue IDs when it claims work (e.g., `LEX-257`).

If no issues are claimed, re-check:
- Status spelling (Todo vs To Do).
- Project slug correctness (`esheria-wills`).
- Issue readiness (acceptance criteria and dependencies present).

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
