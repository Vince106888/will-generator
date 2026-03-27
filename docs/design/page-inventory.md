# Page Inventory (Implementation-Ready)

Date: 2026-03-27  
Source: `design/pencil-implementation.pen` -> `INDEX 00 Implement From These Screens Only` (id: `iUMph`)

## Active Pages
Status meanings:
- `implemented`: matches approved design
- `partial`: page exists but needs alignment with active frame
- `pending`: page not implemented yet
- `refine`: design exists but needs final design pass before implementation

| Page | Frame ID | Route | File | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Landing Page v2 | `DhkvM` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | implemented | ACTIVE 01 copy + CTA wiring restored |
| Entry Choice | `V6ysS` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | implemented | Matches ACTIVE 02 copy + CTA structure |
| Existing Will Gate | `Fd207` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | implemented | Matches ACTIVE 03 with codicil upload + warnings |
| AI Drafting Workspace | `iVFMi` | `/drafting/ai-workspace` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | implemented | Wide drafting workspace |
| AI Extraction Summary | `9MjGI` | `/drafting/ai-summary` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | refine | UI strengthened; design still needs final pass |
| Structured Flow Shell | `fF89o` | `/drafting/structured-flow` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | implemented | Primary structured entry |
| Assets + Beneficiaries Mapping | `nFFsn` | `/drafting/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | implemented | Asset-beneficiary linkage |
| Executors | `yb4Yk` | `/drafting/structured-executors` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | implemented | Executor guidance included |
| Guardianship | `aSEwT` | `/drafting/guardianship` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | implemented | Conditional guardian language |
| Review + Result | `0gbAz` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | implemented | Combined review + result |
| Export Options | `xUIiv` | `/drafting/export-options` | `apps/web/src/pages/post/ExportOptions.tsx` | implemented | Export and share actions |
| Signing Instructions | `JXSDZ` | `/drafting/signing-guide` | `apps/web/src/pages/post/SigningGuide.tsx` | implemented | Witness rules highlighted |
| Advocate Review | `K02wp` | `/drafting/advocate-review` | `apps/web/src/pages/post/AdvocateReview.tsx` | implemented | Advocate review CTA |
| FAQ | `puMDs` | `/faq` | `apps/web/src/pages/marketing/FaqPage.tsx` | implemented | Kenya-specific FAQ coverage |
| Privacy + Trust | `Scsqx` | `/privacy` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | implemented | Security and retention detail |
| Error + Empty States | `IRKLg` | `/drafting/error` | `apps/web/src/pages/post/ErrorStates.tsx` | implemented | Recovery guidance |
| Mobile Landing v2 | `tNapD` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | implemented | Mobile layout handled in page |
| Mobile Entry Choice | `ny4DT` | `/entry-choice` | `apps/web/src/pages/marketing/EntryChoice.tsx` | implemented | Mobile layout aligned to ACTIVE M2 |
| Mobile Existing Will Gate | `boVDU` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | implemented | Mobile layout aligned to ACTIVE M3 |
| Mobile AI Drafting | `jdj6J` | `/drafting/ai-workspace` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | implemented | Mobile stack in workspace |
| Mobile Assets Mapping | `ui2iU` | `/drafting/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | implemented | Mobile mapping layout |
| Mobile Review | `qSIY6` | `/drafting/review-result` | `apps/web/src/pages/drafting/Review.tsx` | implemented | Mobile review summary |

## Archive / Reference Pages
Legacy pages are preserved in `design/pencil-new.pen` only and should not drive implementation.
