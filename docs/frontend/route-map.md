# Frontend Route Map (Active Only)

Date: 2026-03-28  
Design source: `design/pencil-implementation.pen`

This map is the authoritative route list for implementation. Legacy pages are not mapped.
Entry sequence: `/` -> `/entry-choice` -> `/existing-will` -> drafting paths.
Drafting mode must be explicitly confirmed on `/entry-choice` before `/existing-will` continues.

| Route | Page | Frame ID | File | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Landing Page v2 | `DhkvM` | `apps/web/src/pages/marketing/Landing.tsx` | complete | Implemented from clean Pencil source |
| `/entry-choice` | Entry Choice | `V6ysS` | `apps/web/src/pages/marketing/EntryChoice.tsx` | complete | Implemented from clean Pencil source |
| `/existing-will` | Existing Will Gate | `Fd207` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | complete | Drafting mode confirmed before proceed |
| `/drafting/ai-workspace` | AI Drafting Workspace | `iVFMi` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | complete | AI realm start |
| `/drafting/ai-summary` | AI Extraction Summary | `9MjGI` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | refine | Awaiting final design pass |
| `/drafting/structured-flow` | Structured Flow Shell | `fF89o` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | pending | Structured realm start |
| `/drafting/mapping` | Assets + Beneficiaries Mapping | `nFFsn` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | pending | Structured realm |
| `/drafting/structured-executors` | Executors | `yb4Yk` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | pending | Structured realm |
| `/drafting/guardianship` | Guardianship | `aSEwT` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | pending | Structured realm |
| `/drafting/review-result` | Review + Result | `0gbAz` | `apps/web/src/pages/drafting/Review.tsx` | pending | Review/output realm |
| `/drafting/export-options` | Export Options | `xUIiv` | `apps/web/src/pages/post/ExportOptions.tsx` | pending | Review/output realm |
| `/drafting/signing-guide` | Signing Instructions | `JXSDZ` | `apps/web/src/pages/post/SigningGuide.tsx` | pending | Review/output realm |
| `/drafting/advocate-review` | Advocate Review | `K02wp` | `apps/web/src/pages/post/AdvocateReview.tsx` | pending | Review/output realm |
| `/drafting/error` | Error + Empty States | `IRKLg` | `apps/web/src/pages/post/ErrorStates.tsx` | pending | Support realm |
| `/faq` | FAQ | `puMDs` | `apps/web/src/pages/marketing/FaqPage.tsx` | pending | Support realm |
| `/privacy` | Privacy + Trust | `Scsqx` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | pending | Support realm |

## Realm Continuity Rules
- AI path stays in AI realm until explicit handoff.
- Structured path stays in structured realm until explicit handoff.
- Do not allow implicit defaults to override explicit choices.
