# Frontend Implementation Map

Date: 2026-03-31
Source: `apps/web/src` and `docs/design/design-source-of-truth.md`

## Active Route Map (App.tsx)
These routes are the only ones currently wired in `apps/web/src/App.tsx`.

| Route | Page | File | Design Frame | Status |
| --- | --- | --- | --- | --- |
| `/` | Landing | `apps/web/src/pages/marketing/Landing.tsx` | `DhkvM` | Implemented (desktop + responsive)
| `/entry-choice` | Entry Choice | `apps/web/src/pages/marketing/EntryChoice.tsx` | `V6ysS` | Implemented
| `/existing-will` | Existing Will Gate | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | `Fd207` | Implemented
| `/drafting/ai-workspace` | AI Drafting Workspace | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | `iVFMi` | UI-only, no AI logic
| `/drafting/ai-summary` | AI Extraction Summary | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | `9MjGI` | UI-only, no AI logic
| `/drafting/structured-flow` | Structured Flow Shell | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | `fF89o` | UI-only
| `/drafting/mapping` | Assets + Beneficiaries Mapping | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | `nFFsn` | UI-only
| `/drafting/structured-executors` | Executors | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | `yb4Yk` | UI-only
| `/drafting/guardianship` | Guardianship | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | `aSEwT` | UI-only
| `/drafting/review-result` | Review + Result | `apps/web/src/pages/drafting/Review.tsx` | `0gbAz` | Generates draft via API
| `/drafting/export-options` | Export Options | `apps/web/src/pages/post/ExportOptions.tsx` | `xUIiv` | PDF download + lead capture
| `/drafting/signing-guide` | Signing Guide | `apps/web/src/pages/post/SigningGuide.tsx` | `JXSDZ` | UI-only
| `/drafting/advocate-review` | Advocate Review | `apps/web/src/pages/post/AdvocateReview.tsx` | `K02wp` | Lead capture
| `/drafting/error` | Error + Empty States | `apps/web/src/pages/post/ErrorStates.tsx` | `IRKLg` | UI-only
| `/faq` | FAQ | `apps/web/src/pages/marketing/FaqPage.tsx` | `puMDs` | Implemented
| `/privacy` | Privacy + Trust | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | `Scsqx` | Implemented

## Implemented vs Partial vs Missing (Design Alignment)
- Implemented (UI present): Landing, Entry Choice, Existing Will Gate, FAQ, Privacy + Trust, Error states.
- Partial (UI only, no workflow data): AI workspace, AI summary, structured flow shell, assets mapping, executors, guardianship, signing guide.
- Mixed (UI + API wiring): Review (generate draft), Export Options (PDF + lead), Advocate Review (lead).
- Missing vs expected product structure:
  - AI flow A1-A6: only AI workspace + AI summary exist.
  - Structured flow S1-S7: only assets/beneficiaries, executors, guardianship exist; no structured personal details, family/household, beneficiaries, special wishes, or explicit structured review step.
  - Result / post-result: preview is bundled into Review; no dedicated Result screen beyond the legacy page.
  - Mobile: relies on responsive layouts; missing design coverage for AI summary, export options, signing guide, advocate review, and mobile review frame.

## Legacy / Unrouted Pages (Present in repo, not wired in App.tsx)
These pages are not reachable from the active route map and should be treated as legacy until explicitly restored:
- `apps/web/src/pages/marketing/Eligibility.tsx`
- `apps/web/src/pages/marketing/PreStart.tsx`
- `apps/web/src/pages/drafting/DraftingHome.tsx`
- `apps/web/src/pages/drafting/PersonalDetails.tsx`
- `apps/web/src/pages/drafting/FamilyDependants.tsx`
- `apps/web/src/pages/drafting/Executors.tsx`
- `apps/web/src/pages/drafting/Guardians.tsx`
- `apps/web/src/pages/drafting/Assets.tsx`
- `apps/web/src/pages/drafting/Beneficiaries.tsx`
- `apps/web/src/pages/drafting/Distribution.tsx`
- `apps/web/src/pages/drafting/SpecialWishes.tsx`
- `apps/web/src/pages/drafting/MobileDrafting.tsx`
- `apps/web/src/pages/post/SaveContinue.tsx`
- `apps/web/src/pages/Result.tsx` (explicitly marked legacy in copy)

## Shared Layout / Components
- Layout shells: `MarketingShell`, `WorkspaceShell`, `Container`, `Section`, `PageHeader`
- UI primitives: `Button`, `Card`, `Callout`, `Input`, `Textarea`, `Select`, `Badge`, `TrustPanel`
- Pencil-specific UI: `PencilPanels` (review checklist, helper callouts, summary cards)

## State and Store Architecture
- Local state + `useDraftingData` hook backed by `localStorage` (`STORAGE_KEYS.draftingData`).
- No global state library (Redux/Zustand) is used.
- Draft generation results stored in `localStorage` under `STORAGE_KEYS.willResult`.

## Navigation and Routing
- Custom route switch in `App.tsx` based on `window.location.pathname`.
- No 404 route; unknown routes redirect to `/`.
- Query param step logic exists in `lib/navigation.ts` but is unused in active routes.
- Drafting routes are gated by `apps/web/src/lib/draftingGuard.ts` before render and on `navigate()` calls.
  - Guard is evaluated in `apps/web/src/App.tsx` route resolution and inside `apps/web/src/lib/navigation.ts`.
  - Guarded routes: `/drafting/ai-workspace`, `/drafting/ai-summary`, `/drafting/structured-flow`, `/drafting/mapping`, `/drafting/structured-executors`, `/drafting/guardianship`.
  - Post-result routes are not guarded (`/drafting/review-result`, `/drafting/export-options`, `/drafting/signing-guide`, `/drafting/advocate-review`, `/drafting/error`).
  - Guard also applies to future `/drafting/ai/*` and `/drafting/structured/*` paths (prefix match).
  - On mismatch or unconfirmed state, guard keeps `draftingMode`, sets `draftingModeConfirmed=false`, stores the requested route, and redirects to `/entry-choice`.
  - Entry Choice confirmation sets `draftingMode` + `draftingModeConfirmed=true`, then returns to the stored route (if it matches the selected mode).

## Mobile Parity Summary
- Current mobile behavior is responsive CSS within the same pages.
- Mobile design frames exist for Landing, Entry Choice, Existing Will Gate, AI Drafting, and Assets Mapping.
- Mobile Review frame is missing in Pencil source (not in `design/pencil-implementation.pen`).
- Mobile variants for AI summary, export options, signing guide, and advocate review are not defined in design sources.

## Known Route Issues / Alignment Gaps
- Structured flow steps do not exist for personal details and family data in active routes.
- Legacy stepper routes exist but are not in the current active route map.
