# Frontend Implementation Plan

Date: 2026-03-28  
Design source of truth: `docs/design/design-source-of-truth.md`  
Route map: `docs/frontend/route-map.md`

## Goals
- Implement only the active frames listed in the Pencil index.
- Preserve premium, calm, trust-heavy tone with deep explanatory content.
- Ensure mobile is first-class, not a compressed desktop.
- Preserve realm continuity (AI vs Structured) end to end.

## Phased Order (Approved)
Phase 0  Final Pencil arrangement + frontend governance
- Arrange `design/pencil-implementation.pen` for implementation order
- Inspect current frontend route/page structure
- Identify legacy interference
- Update route map and implementation docs

Phase 1  Landing foundation
- Landing Page v2 + Mobile Landing v2

Phase 2  Entry foundation
- Entry Choice + Existing Will Gate + Mobile Entry/Mobile Existing Will

Phase 3  AI realm
- AI Drafting Workspace + AI Extraction Summary + Mobile AI Drafting

Phase 4  Structured realm
- Structured Flow Shell + Assets + Beneficiaries Mapping + Executors + Guardianship + Mobile Assets Mapping

Phase 5  Review / output realm
- Review + Result + Export Options + Signing Instructions + Advocate Review + Mobile Review

Phase 6  Support / trust realm
- FAQ + Privacy + Trust + Error + Empty States

Phase 7  Mobile completion pass
- Revisit all pages with mobile references

Phase 8  Legacy cleanup / finalization
- Remove/lock legacy routes and ambiguous surfaces

## Status
- Phase 0: complete (Pencil arrangement + route/doc updates done)
- Phase 1: complete (Landing Page v2)
- Phase 2: complete (Entry Choice + Existing Will Gate)
- Phase 3+: pending

## Shared Layout + UI Primitives (Likely Reusable)
Layout:
- `apps/web/src/components/layout/MarketingShell.tsx`
- `apps/web/src/components/layout/WorkspaceShell.tsx`
- `apps/web/src/components/layout/Container.tsx`
- `apps/web/src/components/layout/Section.tsx`
- `apps/web/src/components/layout/PageHeader.tsx`

UI:
- `apps/web/src/components/ui/Button.tsx`
- `apps/web/src/components/ui/Card.tsx`
- `apps/web/src/components/ui/Callout.tsx`
- `apps/web/src/components/ui/Input.tsx`
- `apps/web/src/components/ui/Textarea.tsx`
- `apps/web/src/components/ui/Select.tsx`
- `apps/web/src/components/ui/Badge.tsx`
- `apps/web/src/components/ui/TrustPanel.tsx`

## Critical Implementation Notes
- Do not reuse legacy pages as sources of truth.
- Confirm drafting mode on Entry Choice before Existing Will Gate.
- Keep AI/Structured realm boundaries intact; no silent fallback.
- Mobile Review frame is missing in Pencil source and must be added before Phase 5.

## Validation
- Pending: tests and route verification will be run per phase.
