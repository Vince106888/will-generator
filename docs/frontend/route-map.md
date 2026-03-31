# Frontend Route Map (Active Only)

Date: 2026-03-31  
Design source: `design/pencil-implementation.pen`

This map is the authoritative route list for implementation. Legacy pages are not mapped.
Entry sequence: `/` -> `/entry-choice` -> `/existing-will` -> drafting paths.
Drafting mode must be explicitly confirmed on `/entry-choice` before drafting continues.

| Route | Page | Frame ID | File | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Landing Page v2 | `DhkvM` | `apps/web/src/pages/marketing/Landing.tsx` | complete | Implemented from clean Pencil source |
| `/entry-choice` | Entry Choice | `V6ysS` | `apps/web/src/pages/marketing/EntryChoice.tsx` | complete | Implemented from clean Pencil source |
| `/existing-will` | Existing Will Gate | `Fd207` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | complete | Drafting mode confirmed before proceed |
| `/drafting/ai/personal-details` | AI Personal Details | `0T4RE` | `apps/web/src/pages/drafting/AiPersonalDetails.tsx` | in-progress | Step 1 of 6 |
| `/drafting/ai/input` | AI Drafting Workspace | `iVFMi` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | refine | Step 2 of 6 |
| `/drafting/ai/processing` | AI Processing | `0ianx` | `apps/web/src/pages/drafting/AiProcessing.tsx` | in-progress | Step 3 of 6 |
| `/drafting/ai/summary` | AI Summary | `9MjGI` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | refine | Step 4 of 6 |
| `/drafting/ai/corrections` | AI Corrections | `fuTos` | `apps/web/src/pages/drafting/AiCorrections.tsx` | in-progress | Step 5 of 6 |
| `/drafting/ai/review` | AI Review | `WlRtD` | `apps/web/src/pages/drafting/AiReview.tsx` | in-progress | Step 6 of 6 |
| `/drafting/structured-flow` | Structured Flow Shell | `fF89o` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | refine | Overview |
| `/drafting/structured/personal-details` | Structured Personal Details | `74ORj` | `apps/web/src/pages/drafting/StructuredPersonalDetails.tsx` | in-progress | Step 1 of 8 |
| `/drafting/structured/family` | Structured Family and Household | `EjguX` | `apps/web/src/pages/drafting/StructuredFamilyHousehold.tsx` | in-progress | Step 2 of 8 |
| `/drafting/structured/executors` | Structured Executors | `yb4Yk` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | refine | Step 3 of 8 |
| `/drafting/structured/guardians` | Structured Guardians | `aSEwT` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | refine | Step 4 of 8 |
| `/drafting/structured/assets` | Structured Assets | `nFFsn` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | refine | Step 5 of 8 |
| `/drafting/structured/beneficiaries` | Structured Beneficiaries | `zXzDB` | `apps/web/src/pages/drafting/StructuredBeneficiaries.tsx` | in-progress | Step 6 of 8 |
| `/drafting/structured/wishes` | Structured Special Wishes | `CVyk3` | `apps/web/src/pages/drafting/StructuredSpecialWishes.tsx` | in-progress | Step 7 of 8 |
| `/drafting/review-result` | Review + Result | `0gbAz` | `apps/web/src/pages/drafting/Review.tsx` | refine | Step 8 of 8 |
| `/drafting/export-options` | Export Options | `xUIiv` | `apps/web/src/pages/post/ExportOptions.tsx` | refine | Post result |
| `/drafting/signing-guide` | Signing Instructions | `JXSDZ` | `apps/web/src/pages/post/SigningGuide.tsx` | refine | Post result |
| `/drafting/advocate-review` | Advocate Review | `K02wp` | `apps/web/src/pages/post/AdvocateReview.tsx` | refine | Post result |
| `/drafting/error` | Error + Empty States | `IRKLg` | `apps/web/src/pages/post/ErrorStates.tsx` | refine | Recovery |
| `/faq` | FAQ | `puMDs` | `apps/web/src/pages/marketing/FaqPage.tsx` | complete | Support realm |
| `/privacy` | Privacy + Trust | `Scsqx` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | complete | Support realm |

## Realm Continuity Rules
- AI path stays in AI realm until explicit handoff.
- Structured path stays in structured realm until explicit handoff.
- Do not allow implicit defaults to override explicit choices.
