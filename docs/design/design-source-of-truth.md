# Design Source of Truth

Date: 2026-03-28  
Primary file: `design/pencil-implementation.pen`  
Archive file: `design/pencil-new.pen` (history only)  
Active index frame: `IMPLEMENT FROM THESE ONLY — Index` (id: `iUMph`)

## Decision
The only implementation-approved design source is `design/pencil-implementation.pen`. Any frame not listed in the index frame is **not** approved for implementation.

## Active Frames (Implementation Approved)
These are the only frames eligible for implementation:

- Design System: `ACTIVE 00 Design System` (id: `zIP3o`)
- Landing Page v2: `ACTIVE 01 Landing Page v2` (id: `DhkvM`)
- Entry Choice: `ACTIVE 02 Entry Choice` (id: `V6ysS`)
- Existing Will Gate: `ACTIVE 03 Existing Will Gate` (id: `Fd207`)
- AI Drafting Workspace: `ACTIVE 04 AI Drafting Workspace` (id: `iVFMi`)
- AI Extraction Summary: `REFINE 05 AI Extraction Summary` (id: `9MjGI`)
- Structured Flow Shell: `ACTIVE 06 Structured Flow Shell` (id: `fF89o`)
- Assets + Beneficiaries Mapping: `ACTIVE 07 Assets + Beneficiaries Mapping` (id: `nFFsn`)
- Executors: `ACTIVE 08 Executors` (id: `yb4Yk`)
- Guardianship: `ACTIVE 09 Guardianship` (id: `aSEwT`)
- Review + Result: `ACTIVE 10 Review + Result` (id: `0gbAz`)
- Export Options: `ACTIVE 11 Export Options` (id: `xUIiv`)
- Signing Instructions: `ACTIVE 12 Signing Instructions` (id: `JXSDZ`)
- Advocate Review: `ACTIVE 13 Advocate Review` (id: `K02wp`)
- FAQ: `ACTIVE 14 FAQ` (id: `puMDs`)
- Privacy + Trust: `ACTIVE 15 Privacy + Trust` (id: `Scsqx`)
- Error + Empty States: `ACTIVE 16 Error + Empty States` (id: `IRKLg`)
- Mobile Landing v2: `ACTIVE M1 Mobile Landing v2` (id: `tNapD`)
- Mobile Entry Choice: `ACTIVE M2 Mobile Entry Choice` (id: `ny4DT`)
- Mobile Existing Will Gate: `ACTIVE M3 Mobile Existing Will Gate` (id: `boVDU`)
- Mobile AI Drafting: `ACTIVE M4 Mobile AI Drafting` (id: `jdj6J`)
- Mobile Assets Mapping: `ACTIVE M5 Mobile Assets Mapping` (id: `ui2iU`)
- Mobile Review: `ACTIVE M6 Mobile Review` (id: `qSIY6`) (missing from file)

## Recent Updates
- 2026-03-28: Canvas index updated with implementation-order grouping and explicit missing Mobile Review note.
- 2026-03-27: `ACTIVE 04 AI Drafting Workspace` (id: `iVFMi`) corrected in `design/pencil-implementation.pen` to fix chat bubble width/wrapping and restore the main conversation column. Implementation must use the corrected frame only.
- 2026-03-27: `ACTIVE M4 Mobile AI Drafting` (id: `jdj6J`) corrected in `design/pencil-implementation.pen` to fix mobile chat bubble width/wrapping. Implementation must use the corrected frame only.

## Archive / Reference Frames (Do Not Implement)
Legacy designs remain only in `design/pencil-new.pen` for reference.

## Route + Component Mapping (Active)
Proposed routes and current intended files (update during implementation if needed):

- `/` -> `Landing` -> `apps/web/src/pages/marketing/Landing.tsx`
- `/entry-choice` -> `EntryChoice` -> `apps/web/src/pages/marketing/EntryChoice.tsx`
- `/existing-will` -> `ExistingWillGate` -> `apps/web/src/pages/marketing/ExistingWillGate.tsx`
- `/drafting/ai-workspace` -> `AiDraftingWorkspace` -> `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx`
- `/drafting/ai-summary` -> `AiExtractionSummary` -> `apps/web/src/pages/drafting/AiExtractionSummary.tsx`
- `/drafting/structured-flow` -> `StructuredFlowShell` -> `apps/web/src/pages/drafting/StructuredFlowShell.tsx`
- `/drafting/mapping` -> `AssetsBeneficiariesMapping` -> `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx`
- `/drafting/structured-executors` -> `StructuredExecutors` -> `apps/web/src/pages/drafting/StructuredExecutors.tsx`
- `/drafting/guardianship` -> `StructuredGuardianship` -> `apps/web/src/pages/drafting/StructuredGuardianship.tsx`
- `/drafting/review-result` -> `Review + Result` -> `apps/web/src/pages/drafting/Review.tsx`
- `/drafting/export-options` -> `ExportOptions` -> `apps/web/src/pages/post/ExportOptions.tsx`
- `/drafting/signing-guide` -> `Signing Instructions` -> `apps/web/src/pages/post/SigningGuide.tsx`
- `/drafting/advocate-review` -> `AdvocateReview` -> `apps/web/src/pages/post/AdvocateReview.tsx`
- `/drafting/error` -> `ErrorStates` -> `apps/web/src/pages/post/ErrorStates.tsx`
- `/faq` -> `FaqPage` -> `apps/web/src/pages/marketing/FaqPage.tsx`
- `/privacy` -> `PrivacyTrust` -> `apps/web/src/pages/marketing/PrivacyTrust.tsx`

## Design Governance Rules
- Implement only from `design/pencil-implementation.pen`.
- The index frame is the authoritative list; if it is not listed there, it is not active.
- Any promotion must update the index frame and this document in the same change.

## Known Design Risks (Must Be Addressed Before Implementation)
- AI Extraction Summary: needs denser content and clearer edit affordances.
- Content depth: several pages still feel too short; add more plain-English explanations and "why this matters".
- Mobile Review frame is missing from `design/pencil-implementation.pen` (listed as `qSIY6` in docs).
- Mobile: mobile frames exist but do not cover AI summary, export, signing. These remain future work.
