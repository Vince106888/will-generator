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
- Phase 3: complete (AI Drafting Workspace + AI Extraction Summary)
- Phase 4: complete (Structured Flow Shell + Assets & Beneficiaries Mapping + Executors + Guardianship)
- Phase 5: complete (Review + Result, Export Options, Signing Instructions, Advocate Review)
- Phase 6: complete (FAQ, Privacy + Trust, Error + Empty States)

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
- Mobile Review frame is missing in Pencil source; desktop review is implemented and mobile adapts from desktop until frame is provided.

## Validation
- Pending: tests and route verification will be run per phase.

## Latest Page Mappings (Pencil -> Code)
### AI Extraction Summary
- Pencil Frame ID: `9MjGI`
- Code Page: `apps/web/src/pages/drafting/AiExtractionSummary.tsx`
- Section mapping: `summaryIntro` -> title/description block
- Section mapping: `statusBanner` -> success `Card` with summary text
- Section mapping: `Extraction Cards` -> two `Card` rows (`lg:grid-cols-2`)
- Section mapping: `missingBanner` -> warning banner with icon + text
- Section mapping: `Summary Actions` -> action copy + buttons + helper callout
- Layout mapping: vertical stack uses `space-y-6`
- Layout mapping: `rowA`/`rowB` use `grid gap-4 lg:grid-cols-2`
- Layout mapping: banner uses `flex gap-3` with border + background

### Structured Flow Shell
- Pencil Frame ID: `fF89o`
- Code Page: `apps/web/src/pages/drafting/StructuredFlowShell.tsx`
- Section mapping: `flowHeader` -> title/description + progress block
- Section mapping: `mainCol` -> overview `Card`, required/optional helper, CTA row
- Section mapping: `sideCol` -> progress list `Card`
- Layout mapping: `grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]`
- Layout mapping: progress bar uses `h-2` wrapper + full-width fill

### Assets + Beneficiaries Mapping
- Pencil Frame ID: `nFFsn`
- Code Page: `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx`
- Section mapping: `mapHeader` -> title/description block
- Section mapping: `assetsCol` -> assets `Card`, mapping `Card`, asset tips callout
- Section mapping: `benefCol` -> beneficiaries `Card`, allocation summary callout, missing banner, actions
- Layout mapping: `grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]`
- Layout mapping: `Card` blocks use `space-y-3` vertical flow

### Executors
- Pencil Frame ID: `yb4Yk`
- Code Page: `apps/web/src/pages/drafting/StructuredExecutors.tsx`
- Section mapping: `execHeader` -> title/description block
- Section mapping: `primaryCard` -> primary executor `Card` with three input fields
- Section mapping: `backupCard` -> backup executor `Card` with two inputs + ghost action
- Section mapping: `execActions` -> primary + secondary actions
- Section mapping: `execSide` -> three helper callouts
- Layout mapping: `grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]`

### Guardianship
- Pencil Frame ID: `aSEwT`
- Code Page: `apps/web/src/pages/drafting/StructuredGuardianship.tsx`
- Section mapping: `guardHeader` -> title/description block
- Section mapping: `guardMain` -> context callout + minor children card + guardian cards + legal note + actions
- Layout mapping: vertical stack with `space-y-6` and `space-y-4`

### Review + Result
- Pencil Frame ID: `0gbAz`
- Code Page: `apps/web/src/pages/drafting/Review.tsx`
- Section mapping: `revHeader` -> title/description block
- Section mapping: `readyBanner` -> success panel
- Section mapping: `revMain` -> three section cards + warning banner + actions
- Section mapping: `revSide` -> summary card, checklist, preview, helper callout
- Layout mapping: `grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]`

### Export Options
- Pencil Frame ID: `xUIiv`
- Code Page: `apps/web/src/pages/post/ExportOptions.tsx`
- Section mapping: `expHeader` -> title/description block
- Section mapping: `pricingRow` -> three section cards with tier CTAs
- Section mapping: `exportNotes` -> two helper callouts
- Section mapping: `expActions` -> back + continue buttons
- Layout mapping: `grid gap-4 lg:grid-cols-3` + `grid gap-4 lg:grid-cols-2`

### Signing Instructions
- Pencil Frame ID: `JXSDZ`
- Code Page: `apps/web/src/pages/post/SigningGuide.tsx`
- Section mapping: `signHeader` -> title/description block
- Section mapping: `steps` -> four section cards with bullet lists
- Section mapping: `warning` -> warning banner
- Section mapping: `postActions` -> back + finish buttons

### Advocate Review
- Pencil Frame ID: `K02wp`
- Code Page: `apps/web/src/pages/post/AdvocateReview.tsx`
- Section mapping: `advHeader` -> title/description block
- Section mapping: `advGrid` -> three section cards
- Section mapping: `advForm` -> form card with inputs and CTA

### FAQ
- Pencil Frame ID: `puMDs`
- Code Page: `apps/web/src/pages/marketing/FaqPage.tsx`
- Section mapping: `faqHeader` -> title/description block
- Section mapping: `faqList` -> list of FAQ cards
- Section mapping: `faqFooter` -> footer base

### Privacy + Trust
- Pencil Frame ID: `Scsqx`
- Code Page: `apps/web/src/pages/marketing/PrivacyTrust.tsx`
- Section mapping: `privHeader` -> title/description block
- Section mapping: `privGrid` -> three helper callouts
- Section mapping: `legalBlock` -> section card + bullet list
- Section mapping: `privFooter` -> footer base

### Error + Empty States
- Pencil Frame ID: `IRKLg`
- Code Page: `apps/web/src/pages/post/ErrorStates.tsx`
- Section mapping: `errHeader` -> title/description block
- Section mapping: `stateRow` -> error banner, empty state card, success panel
- Section mapping: `emptyDetail` -> helper callout
