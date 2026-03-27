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
| Landing Page v2 | `DhkvM` | `/` | `apps/web/src/pages/marketing/Landing.tsx` | partial | Needs tighter trust/legal depth and premium polish |
| Entry Choice | `V6ysS` | `/start` | `apps/web/src/pages/marketing/EntryChoice.tsx` | partial | Must emphasize AI-first path and privacy |
| Existing Will Gate | `Fd207` | `/existing-will` | `apps/web/src/pages/marketing/ExistingWillGate.tsx` | partial | Ensure codicil framing + legal clarity |
| AI Drafting Workspace | `iVFMi` | `/ai` | `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | refine | Fix width balance, deepen guidance, add trust layer |
| AI Extraction Summary | `9MjGI` | `/ai/summary` | `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | refine | Needs mapping UI depth and edit affordances |
| Structured Flow Shell | `fF89o` | `/structured` | `apps/web/src/pages/drafting/StructuredFlowShell.tsx` | partial | Should be the only structured shell |
| Assets + Beneficiaries Mapping | `nFFsn` | `/structured/mapping` | `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx` | partial | Core step; ensure asset-beneficiary linking |
| Executors | `yb4Yk` | `/executors` | `apps/web/src/pages/drafting/StructuredExecutors.tsx` | partial | Ensure legal guidance + backup executor |
| Guardianship | `aSEwT` | `/guardianship` | `apps/web/src/pages/drafting/StructuredGuardianship.tsx` | partial | Conditional logic only; avoid overemphasis |
| Review + Result | `0gbAz` | `/review` | `apps/web/src/pages/drafting/Review.tsx` | partial | Current UI split with `Result.tsx` |
| Export Options | `xUIiv` | `/export` | `apps/web/src/pages/post/ExportOptions.tsx` | partial | Pricing/tier clarity + advocate CTA |
| Signing Instructions | `JXSDZ` | `/signing` | `apps/web/src/pages/post/SigningGuide.tsx` | partial | Must emphasize witness rules |
| Advocate Review | `K02wp` | `/advocate` | `apps/web/src/pages/post/AdvocateReview.tsx` | partial | Ensure trust + what review includes |
| FAQ | `puMDs` | `/faq` | `apps/web/src/pages/marketing/FaqPage.tsx` | partial | Expand Kenya-specific legal answers |
| Privacy + Trust | `Scsqx` | `/privacy` | `apps/web/src/pages/marketing/PrivacyTrust.tsx` | partial | Needs security + data retention specifics |
| Error + Empty States | `IRKLg` | `/errors` | `apps/web/src/pages/post/ErrorStates.tsx` | partial | Ensure recovery messaging + save fallback |
| Mobile Landing v2 | `tNapD` | N/A | N/A | pending | Implement mobile-specific layout |
| Mobile Entry Choice | `ny4DT` | N/A | N/A | pending | Implement mobile-specific layout |
| Mobile Existing Will Gate | `boVDU` | N/A | N/A | pending | Implement mobile-specific layout |
| Mobile AI Drafting | `jdj6J` | N/A | N/A | pending | Implement mobile chat + privacy cues |
| Mobile Assets Mapping | `ui2iU` | N/A | N/A | pending | Per-asset selection (no drag/drop) |
| Mobile Review | `qSIY6` | N/A | N/A | pending | Build mobile review flow |

## Archive / Reference Pages
Legacy pages are preserved in `design/pencil-new.pen` only and should not drive implementation.
