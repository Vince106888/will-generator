# Page Inventory (Implementation-Ready)

Date: 2026-03-31  
Source: `design/pencil-implementation.pen` → `IMPLEMENT FROM THESE ONLY — Source of Truth` (id: `iUMph`)

## Active Pages
Status meanings:
- `pending`: not implemented from the clean source yet
- `in-progress`: currently being implemented from the clean source
- `complete`: implemented from the clean source and validated
- `refine`: design exists but needs final design pass before implementation
- `missing`: frame referenced in docs but not present in the Pencil source

| Flow | Page | Frame ID | Route | File | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Core | Landing Page v2 | `DhkvM` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | complete | Implemented from clean Pencil source |
| Core | Entry Choice | `V6ysS` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | complete | Implemented from clean Pencil source |
| Core | Existing Will Gate | `Fd207` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | complete | Implemented from clean Pencil source |
| AI | AI Personal Details | `0T4RE` | `/drafting/ai/personal-details` | `apps/web/src/pages/drafting/AiPersonalDetails.tsx` | refine | Step 1 of 6 |
| AI | AI Drafting Workspace | `iVFMi` | `/drafting/ai/input` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | refine | Step 2 of 6 |
| AI | AI Processing | `0ianx` | `/drafting/ai/processing` | `apps/web/src/pages/drafting/AiProcessing.tsx` | refine | Step 3 of 6 |
| AI | AI Extraction Summary | `9MjGI` | `/drafting/ai/summary` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | refine | Step 4 of 6 |
| AI | AI Corrections | `fuTos` | `/drafting/ai/corrections` | `apps/web/src/pages/drafting/AiCorrections.tsx` | refine | Step 5 of 6 |
| AI | Review | `WlRtD` | `/drafting/ai/review` | `apps/web/src/pages/drafting/Review.tsx` | refine | Step 6 of 6 |
| Structured | Structured Flow Shell | `fF89o` | `/drafting/structured-flow` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | refine | Overview |
| Structured | Structured Personal Details | `74ORj` | `/drafting/structured/personal-details` | `apps/web/src/pages/drafting/StructuredPersonalDetails.tsx` | refine | Step 1 of 8 |
| Structured | Structured Family and Household | `EjguX` | `/drafting/structured/family` | `apps/web/src/pages/drafting/StructuredFamilyHousehold.tsx` | refine | Step 2 of 8 |
| Structured | Structured Executors | `yb4Yk` | `/drafting/structured/executors` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | refine | Step 3 of 8 |
| Structured | Structured Guardians | `aSEwT` | `/drafting/structured/guardians` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | refine | Step 4 of 8 |
| Structured | Structured Assets | `nFFsn` | `/drafting/structured/assets` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | refine | Step 5 of 8 |
| Structured | Structured Beneficiaries | `zXzDB` | `/drafting/structured/beneficiaries` | `apps/web/src/pages/drafting/StructuredBeneficiaries.tsx` | refine | Step 6 of 8 |
| Structured | Structured Special Wishes | `CVyk3` | `/drafting/structured/wishes` | `apps/web/src/pages/drafting/StructuredSpecialWishes.tsx` | refine | Step 7 of 8 |
| Result | Review + Result | `0gbAz` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | refine | Step 6 of 6 |
| Result | Export Options | `xUIiv` | `/drafting/export-options` | `apps/web/src/pages/post/ExportOptions.tsx` | refine | Post result |
| Result | Signing Instructions | `JXSDZ` | `/drafting/signing-guide` | `apps/web/src/pages/post/SigningGuide.tsx` | refine | Post result |
| Result | Advocate Review | `K02wp` | `/drafting/advocate-review` | `apps/web/src/pages/post/AdvocateReview.tsx` | refine | Post result |
| Support | FAQ | `puMDs` | `/faq` | `apps/web/src/pages/marketing/FaqPage.tsx` | complete | Kenya-specific FAQ |
| Support | Privacy + Trust | `Scsqx` | `/privacy` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | complete | Security and retention |
| Support | Error + Recovery | `IRKLg` | `/drafting/error` | `apps/web/src/pages/post/ErrorStates.tsx` | refine | Recovery actions |

## Mobile Frames
- ACTIVE M1 Mobile Landing (tNapD)
- ACTIVE M2 Mobile Entry Decision (ny4DT)
- ACTIVE M3 Mobile Existing Will Gate (boVDU)
- ACTIVE M4 Mobile AI Personal Details (HRgBn)
- ACTIVE M5 Mobile AI Drafting (jdj6J)
- ACTIVE M6 Mobile Structured Assets (ui2iU)
- ACTIVE M7 Mobile Review (KU8Wf)
