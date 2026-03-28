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
- Phase 3 AI Drafting Workspace + AI Extraction Summary implemented from clean Pencil frames; realignment to 2026-03-28 refinements in progress.
- Structured realm entry shell, assets/beneficiaries mapping, executors, and guardianship implemented from clean Pencil frames; realignment to 2026-03-28 refinements in progress.
- Review/output realm (Review + Result, Export Options, Signing Instructions, Advocate Review) implemented from Pencil; realignment to 2026-03-28 refinements in progress.
- Route map is locked to active routes; support realm pages now implemented; Error/Empty States refined with recovery row.

## Known Gaps
- Mobile Review frame is missing from the Pencil source (listed as `qSIY6` in docs); mobile review adapts from desktop layout for now.
- End-to-end persistence between UI and API is not wired.
- Legal copy requires expert review (guardianship, witnesses, codicils).
- Mobile coverage for AI summary, export, and signing flows needs design coverage.

## Immediate Priorities
1. Preserve realm continuity and prevent silent fallback between AI and structured flows.
2. Realign refined desktop frames in code to updated Pencil source.
3. Confirm Mobile Review frame availability and add mobile export/signing frames.
