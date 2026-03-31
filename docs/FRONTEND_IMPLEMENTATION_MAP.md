# Frontend Implementation Map

Date: 2026-03-31  
Source: `apps/web/src` and `docs/design/design-source-of-truth.md`

## Active Route Map (App.tsx)
These routes are the only ones currently wired in `apps/web/src/App.tsx`.

| Route | Page | File | Design Frame | Status |
| --- | --- | --- | --- | --- |
| `/` | Landing | `apps/web/src/pages/marketing/Landing.tsx` | `DhkvM` | Implemented |
| `/entry-choice` | Entry Choice | `apps/web/src/pages/marketing/EntryChoice.tsx` | `V6ysS` | Implemented |
| `/existing-will` | Existing Will Gate | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | `Fd207` | Implemented |
| `/drafting/ai/personal-details` | AI Personal Details | `apps/web/src/pages/drafting/AiPersonalDetails.tsx` | `0T4RE` | Implemented |
| `/drafting/ai/input` | AI Drafting Workspace | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | `iVFMi` | Implemented |
| `/drafting/ai/processing` | AI Processing | `apps/web/src/pages/drafting/AiProcessing.tsx` | `0ianx` | Implemented |
| `/drafting/ai/summary` | AI Extraction Summary | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | `9MjGI` | Implemented |
| `/drafting/ai/corrections` | AI Corrections | `apps/web/src/pages/drafting/AiCorrections.tsx` | `fuTos` | Implemented |
| `/drafting/ai/review` | AI Review | `apps/web/src/pages/drafting/AiReview.tsx` | `WlRtD` | Implemented |
| `/drafting/ai-workspace` | AI Drafting Workspace (legacy alias) | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | `iVFMi` | Alias |
| `/drafting/ai-summary` | AI Extraction Summary (legacy alias) | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | `9MjGI` | Alias |
| `/drafting/structured-flow` | Structured Flow Shell | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | `fF89o` | Implemented |
| `/drafting/structured/personal-details` | Structured Personal Details | `apps/web/src/pages/drafting/StructuredPersonalDetails.tsx` | `74ORj` | Implemented |
| `/drafting/structured/family` | Structured Family & Household | `apps/web/src/pages/drafting/StructuredFamilyHousehold.tsx` | `EjguX` | Implemented |
| `/drafting/structured/executors` | Executors | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | `yb4Yk` | Implemented |
| `/drafting/structured/guardians` | Guardianship | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | `aSEwT` | Implemented |
| `/drafting/structured/assets` | Assets | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | `nFFsn` | Implemented |
| `/drafting/structured/beneficiaries` | Beneficiaries | `apps/web/src/pages/drafting/StructuredBeneficiaries.tsx` | `zXzDB` | Implemented |
| `/drafting/structured/wishes` | Special Wishes | `apps/web/src/pages/drafting/StructuredSpecialWishes.tsx` | `CVyk3` | Implemented |
| `/drafting/mapping` | Assets + Beneficiaries Mapping (legacy alias) | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | `nFFsn` | Alias |
| `/drafting/structured-executors` | Executors (legacy alias) | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | `yb4Yk` | Alias |
| `/drafting/guardianship` | Guardianship (legacy alias) | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | `aSEwT` | Alias |
| `/drafting/review-result` | Review + Result | `apps/web/src/pages/drafting/Review.tsx` | `0gbAz` | Implemented |
| `/drafting/export-options` | Export Options | `apps/web/src/pages/post/ExportOptions.tsx` | `xUIiv` | Implemented |
| `/drafting/signing-guide` | Signing Guide | `apps/web/src/pages/post/SigningGuide.tsx` | `JXSDZ` | Implemented |
| `/drafting/advocate-review` | Advocate Review | `apps/web/src/pages/post/AdvocateReview.tsx` | `K02wp` | Implemented |
| `/drafting/error` | Error + Empty States | `apps/web/src/pages/post/ErrorStates.tsx` | `IRKLg` | Implemented |
| `/faq` | FAQ | `apps/web/src/pages/marketing/FaqPage.tsx` | `puMDs` | Implemented |
| `/privacy` | Privacy + Trust | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | `Scsqx` | Implemented |

## Implemented vs Partial vs Missing (Design Alignment)
- Implemented: full AI flow (A1–A6), structured steps (S0–S7), result, support.
- Alias routes remain for backward compatibility.

## Shared Layout / Components
- Layout shells: `MarketingShell`, `WorkspaceShell`, `Container`, `Section`, `PageHeader`
- UI primitives: `Button`, `Card`, `Callout`, `Input`, `Textarea`, `Select`, `Badge`, `TrustPanel`
- Pencil-specific UI: `PencilPanels` (review checklist, helper callouts, summary cards)

## State and Store Architecture
- Local state + `useDraftingData` hook backed by `localStorage` (`STORAGE_KEYS.draftingData`).
- Draft generation results stored in `localStorage` under `STORAGE_KEYS.willResult`.

## Navigation and Routing
- Custom route switch in `App.tsx` based on `window.location.pathname`.
- Drafting routes are gated by `apps/web/src/lib/draftingGuard.ts` before render and on `navigate()` calls.
- AI routes under `/drafting/ai/*` and structured routes under `/drafting/structured/*` are auto-guarded by prefix.
