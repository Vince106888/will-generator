# Symphony Setup

Date: 2026-03-30

This document explains how Symphony should be configured to pick up Linear
issues for Esheria Wills.

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

## Startup (Generic)

Symphony is run by the orchestration layer outside this repo. Configure your
runner to:

1. Load `WORKFLOW.md` from the repo root.
2. Authenticate with Linear using `LINEAR_API_KEY`.
3. Poll for issues in project `esheria-wills` with status `Todo`.

If your runner exposes a CLI, use the equivalent of:

```bash
symphony run --workflow WORKFLOW.md
```

If your runner instead reads environment variables, set:

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
