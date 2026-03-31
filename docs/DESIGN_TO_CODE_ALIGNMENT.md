# Design to Code Alignment

Date: 2026-03-31
Design Source: `design/pencil-implementation.pen` (see `docs/design/design-source-of-truth.md`)

## Frame Group Alignment (Active Frames)
| Frame Group | Frame ID | Route | Code File | Status |
| --- | --- | --- | --- | --- |
| ACTIVE 01 Landing | `DhkvM` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | Implemented
| ACTIVE 02 Entry Decision | `V6ysS` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | Implemented
| ACTIVE 03 Existing Will Gate | `Fd207` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | Implemented
| ACTIVE 04 AI Drafting Workspace | `iVFMi` | `/drafting/ai-workspace` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | UI-only
| REFINE 05 AI Extraction Summary | `9MjGI` | `/drafting/ai-summary` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | UI-only
| ACTIVE 06 Structured Flow Shell | `fF89o` | `/drafting/structured-flow` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | UI-only
| ACTIVE 07 Assets + Beneficiaries Mapping | `nFFsn` | `/drafting/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | UI-only
| ACTIVE 08 Executors | `yb4Yk` | `/drafting/structured-executors` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | UI-only
| ACTIVE 09 Guardianship | `aSEwT` | `/drafting/guardianship` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | UI-only
| ACTIVE 10 Review + Result | `0gbAz` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | API generate wired
| ACTIVE 11 Export Options | `xUIiv` | `/drafting/export-options` | `apps/web/src/pages/post/ExportOptions.tsx` | PDF + lead capture
| ACTIVE 12 Signing Instructions | `JXSDZ` | `/drafting/signing-guide` | `apps/web/src/pages/post/SigningGuide.tsx` | UI-only
| ACTIVE 13 Advocate Review | `K02wp` | `/drafting/advocate-review` | `apps/web/src/pages/post/AdvocateReview.tsx` | Lead capture
| ACTIVE 14 FAQ | `puMDs` | `/faq` | `apps/web/src/pages/marketing/FaqPage.tsx` | Implemented
| ACTIVE 15 Privacy + Trust | `Scsqx` | `/privacy` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | Implemented
| ACTIVE 16 Error + Empty States | `IRKLg` | `/drafting/error` | `apps/web/src/pages/post/ErrorStates.tsx` | Implemented

## Mobile Frame Alignment
- Implemented as responsive layouts, not separate routes.
- Mobile frames exist for M1, M2, M3, M4, M5 in design source; M6 (Mobile Review) is noted as missing from file.
- No mobile frames exist for AI summary, export options, signing guide, advocate review.

## Drafting Mode Guard Contract (Routing Layer 1)
- Guard module: `apps/web/src/lib/draftingGuard.ts`.
- Guard is invoked by `apps/web/src/App.tsx` before route render and by `apps/web/src/lib/navigation.ts` for programmatic navigation.
- Guard applies only to AI + Structured drafting routes, not post-result routes.
- Guard uses explicit route list plus `/drafting/ai/*` and `/drafting/structured/*` prefix matching.
- Access requires `draftingModeConfirmed=true` and mode match; otherwise guard redirects to `/entry-choice`.
- On redirect, guard keeps `draftingMode`, sets `draftingModeConfirmed=false`, and stores the originally requested route (`sessionStorage` key `esheriaDraftingReturnPath`).
- Guard never changes `draftingMode`; only Entry Choice confirmation updates it.
- Entry Choice confirmation sets `draftingMode` + `draftingModeConfirmed=true`, then returns to the stored route if it matches the selected mode.

## Expected Product Structure vs Code Reality
### Expected (from product intent)
- AI Flow: A1-A6
- Structured Flow: S0-S7 + Structured Review
- Result / Post-Result: R1-R4
- Support: X1-X3
- Mobile: M1-M7

### Actual (from repo)
- AI Flow: only AI Drafting Workspace + AI Extraction Summary
- Structured Flow: Structured Flow Shell + Assets Mapping + Executors + Guardianship
- Result / Post-Result: Review/Result combined, Export, Signing, Advocate Review
- Support: FAQ, Privacy + Trust, Error/Recovery
- Mobile: responsive only; missing Mobile Review frame in design

## Mismatches and Gaps
- Missing AI steps (personal details, processing, corrections, review step beyond summary).
- Missing structured steps (personal details, family/household, beneficiaries, special wishes).
- No explicit structured review step prior to Review + Result.
- Legacy stepper pages exist but are not part of the active design system.
- Mobile design coverage is incomplete for post-result and AI summary pages.

## Priority Alignment Fixes
1. Decide whether to restore structured personal/family steps from legacy or design new frames.
2. Define AI step sequence beyond summary (A1-A6) and implement routing.
3. Add Mobile Review frame to design source or define responsive acceptance criteria.
