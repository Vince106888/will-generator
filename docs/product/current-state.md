# Current Product State

Date: 2026-03-26  
Design source of truth: `docs/design/design-source-of-truth.md`

## Current Direction (Approved)
- Dual-path drafting: AI-first primary, structured form secondary.
- Existing will / codicil gate before drafting.
- Assets and beneficiaries are captured and linked as a core step.
- Trust, privacy, and plain-English legal guidance are front-and-center.
- Mobile is first-class, not a resized desktop.

## What Exists in Repo
- Active Pencil source (`design/pencil-new.pen`) with a clear implementation index.
- Parity pages in `apps/web/src/pages` for all major flows.
- API endpoints for will draft generation, retrieval, PDF download, and lead capture.
- Baseline draft, complexity, and validity engines.

## Implementation Status
- Most active pages exist but are **partial** and need alignment to the active Pencil frames.
- AI Drafting Workspace and mobile views require deeper layout and content work.
- Review/Result is still split across `Review.tsx` and `Result.tsx`.

## Known Gaps
- End-to-end persistence between UI and API (UI state is local; API integration not wired).
- Complexity/validity engines need expanded Kenya-specific guardrails.
- Legal copy requires expert review (guardianship, witnesses, codicils).
- Mobile coverage is missing for AI summary, export, and signing flows.

## Immediate Priorities (Implementation Readiness)
1. Lock design governance to active frames only.
2. Update page copy for depth, reassurance, and “why this matters.”
3. Fix AI Drafting Workspace layout (wider conversation, better balance).
4. Build mobile-specific layouts for entry, AI drafting, mapping, review.
5. Clarify routing + component ownership before implementation.

