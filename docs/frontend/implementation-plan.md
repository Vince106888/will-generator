# Frontend Implementation Plan

Date: 2026-03-27  
Design source of truth: `docs/design/design-source-of-truth.md`  
Route map: `docs/frontend/route-map.md`  
Route migration plan: `docs/frontend/route-migration-plan.md`

## Goals
- Implement only the active frames listed in `00 Canvas Index`.
- Preserve premium, calm, trust-heavy tone with deep explanatory content.
- Ensure mobile is a first-class layout, not a compressed desktop.

## Batch Order (Approved)
Batch 1
- Landing Page v2
- Entry Choice
- Existing Will Gate

Batch 2
- AI Drafting Workspace
- AI Extraction Summary

Batch 3
- Structured Flow Shell
- Assets + Beneficiaries Mapping
- Executors
- Guardianship

Batch 4
- Review + Result
- Export Options
- Signing Instructions
- Advocate Review

Batch 5
- FAQ
- Privacy + Trust
- Error / Empty States
- Mobile refinements

## Status (Completed)
Batch 1
- Landing Page v2
- Entry Choice
- Existing Will Gate

Batch 2
- AI Drafting Workspace
- AI Extraction Summary

Batch 3
- Structured Flow Shell
- Assets + Beneficiaries Mapping
- Executors
- Guardianship

Batch 4
- Review + Result
- Export Options
- Signing Instructions
- Advocate Review

Batch 5
- FAQ
- Privacy + Trust
- Error / Empty States
- Mobile refinements

## Route Map (Active Only)
- `/` ? Landing Page v2
- `/entry-choice` ? Entry Choice
- `/existing-will` ? Existing Will Gate
- `/drafting/ai-workspace` ? AI Drafting Workspace
- `/drafting/ai-summary` ? AI Extraction Summary
- `/drafting/structured-flow` ? Structured Flow Shell
- `/drafting/mapping` ? Assets + Beneficiaries Mapping
- `/drafting/structured-executors` ? Executors
- `/drafting/guardianship` ? Guardianship
- `/drafting/review-result` ? Review + Result
- `/drafting/export-options` ? Export Options
- `/drafting/signing-guide` ? Signing Instructions
- `/drafting/advocate-review` ? Advocate Review
- `/faq` ? FAQ
- `/privacy` ? Privacy + Trust
- `/drafting/error` ? Error + Empty States

## Shared Layout + UI Primitives
Existing layout components to reuse and harden:
- `apps/web/src/components/layout/MarketingShell.tsx`
- `apps/web/src/components/layout/MarketingNav.tsx`
- `apps/web/src/components/layout/MarketingFooter.tsx`
- `apps/web/src/components/layout/WorkspaceShell.tsx`
- `apps/web/src/components/layout/Container.tsx`
- `apps/web/src/components/layout/Section.tsx`
- `apps/web/src/components/layout/PageHeader.tsx`

Existing UI atoms to standardize:
- `apps/web/src/components/ui/Button.tsx`
- `apps/web/src/components/ui/Card.tsx`
- `apps/web/src/components/ui/Callout.tsx`
- `apps/web/src/components/ui/Input.tsx`
- `apps/web/src/components/ui/Textarea.tsx`
- `apps/web/src/components/ui/Select.tsx`
- `apps/web/src/components/ui/Badge.tsx`
- `apps/web/src/components/ui/Modal.tsx`
- `apps/web/src/components/ui/TrustPanel.tsx`

## Critical Implementation Notes
- AI Drafting Workspace redesigned for wider conversation area and better column balance.
- Major pages include richer explanations, definitions, and why-this-matters copy.
- Guardianship phrased conditionally for minors.
- Trust and privacy messaging reinforced on entry, AI workspace, and export/signing.
- Mobile layouts verified to maintain hierarchy and trust content.

## Validation
- `pnpm.cmd -C apps/web test` (pass on 2026-03-26)
 - Landing v2 CTA routing checked on 2026-03-27 (manual navigation sanity).

## Immediate Engineering Tasks (Pre-Batch 1)
1. Lock routing map in `apps/web/src/App.tsx` to active-only routes. (done)
2. Add a route-to-frame mapping reference in each page header comment (frame name + id). (done for active frames)
3. Normalize spacing tokens and typography across marketing vs drafting surfaces. (done)
