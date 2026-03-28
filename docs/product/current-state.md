# Current Product State

Date: 2026-03-28  
Design source of truth: `docs/design/design-source-of-truth.md`

## Current Direction (Approved)
- Dual-path drafting: AI-first primary, structured form secondary.
- Existing will / codicil gate before drafting.
- Assets and beneficiaries are captured and linked as a core step.
- Trust, privacy, and plain-English legal guidance are front-and-center.
- Mobile is first-class, not a resized desktop.

## Current Implementation Reality
- Frontend contains legacy pages and prior implementations that are no longer trusted.
- Implementation is restarting from `design/pencil-implementation.pen` only.
- Phase 1 Landing Page v2 has been rebuilt from the clean Pencil source.
- Phase 2 Entry Choice + Existing Will Gate implemented from clean Pencil source.
- Route map is locked to active routes; remaining pages still need rebuild.

## Known Gaps
- Mobile Review frame is missing from the Pencil source (listed as `qSIY6` in docs).
- End-to-end persistence between UI and API is not wired.
- Legal copy requires expert review (guardianship, witnesses, codicils).
- Mobile coverage for AI summary, export, and signing flows needs design coverage.

## Immediate Priorities
1. Begin Phase 3 (AI Drafting Workspace + AI Extraction Summary) from clean Pencil frames.
2. Preserve realm continuity and prevent silent fallback between AI and structured flows.
3. Confirm Mobile Review frame availability before Phase 5.
