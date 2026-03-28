# Page Inventory (Implementation-Ready)

Date: 2026-03-28  
Source: `design/pencil-implementation.pen` -> `IMPLEMENT FROM THESE ONLY - Index` (id: `iUMph`)

## Active Pages
Status meanings:
- `pending`: not implemented from the clean source yet
- `in-progress`: currently being implemented from the clean source
- `complete`: implemented from the clean source and validated
- `refine`: design exists but needs final design pass before implementation
- `missing`: frame referenced in docs but not present in the Pencil source

| Page | Frame ID | Route | File | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Landing Page v2 | `DhkvM` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | complete | Implemented from clean Pencil source |
| Entry Choice | `V6ysS` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | complete | Implemented from clean Pencil source |
| Existing Will Gate | `Fd207` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | complete | Implemented from clean Pencil source |
| AI Drafting Workspace | `iVFMi` | `/drafting/ai-workspace` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | complete | Implemented from corrected frame |
| AI Extraction Summary | `9MjGI` | `/drafting/ai-summary` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | complete | Implemented from clean Pencil frame |
| Structured Flow Shell | `fF89o` | `/drafting/structured-flow` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | complete | Structured entry shell (Save and exit returns to `/`) |
| Assets + Beneficiaries Mapping | `nFFsn` | `/drafting/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | complete | Core asset-beneficiary linkage (Save and return later -> `/drafting/structured-flow`) |
| Executors | `yb4Yk` | `/drafting/structured-executors` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | complete | Executor guidance (Save and exit -> `/`) |
| Guardianship | `aSEwT` | `/drafting/guardianship` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | complete | Guardians for minors (Save and return later -> `/drafting/structured-flow`) |
| Review + Result | `0gbAz` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | pending | Review and result combined |
| Export Options | `xUIiv` | `/drafting/export-options` | `apps/web/src/pages/post/ExportOptions.tsx` | pending | Export CTA |
| Signing Instructions | `JXSDZ` | `/drafting/signing-guide` | `apps/web/src/pages/post/SigningGuide.tsx` | pending | Witness rules and steps |
| Advocate Review | `K02wp` | `/drafting/advocate-review` | `apps/web/src/pages/post/AdvocateReview.tsx` | pending | Advocate escalation |
| FAQ | `puMDs` | `/faq` | `apps/web/src/pages/marketing/FaqPage.tsx` | pending | Kenya-specific FAQ |
| Privacy + Trust | `Scsqx` | `/privacy` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | pending | Security and retention |
| Error + Empty States | `IRKLg` | `/drafting/error` | `apps/web/src/pages/post/ErrorStates.tsx` | pending | Recovery guidance |
| Mobile Landing v2 | `tNapD` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | complete | Mobile layout follows M1 |
| Mobile Entry Choice | `ny4DT` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | complete | Mobile layout follows M2 |
| Mobile Existing Will Gate | `boVDU` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | complete | Mobile layout follows M3 |
| Mobile AI Drafting | `jdj6J` | `/drafting/ai-workspace` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | complete | Mobile layout aligned to M4 (chat + privacy reminder) |
| Mobile Assets Mapping | `ui2iU` | `/drafting/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | in-progress | Desktop layout updated; mobile layout needs pass |
| Mobile Review | `qSIY6` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | missing | Frame not found in Pencil source |

## Archive / Reference Pages
Legacy pages are preserved in `design/pencil-new.pen` only and should not drive implementation.
