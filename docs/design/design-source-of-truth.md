# Design Source of Truth

Date: 2026-03-31  
Primary file: `design/pencil-implementation.pen`  
Archive file: `design/pencil-new.pen` (history only)  
Active index frame: `IMPLEMENT FROM THESE ONLY — Source of Truth` (id: `iUMph`)

## Decision
The only implementation-approved design source is `design/pencil-implementation.pen`. The only valid frames are those listed inside the `IMPLEMENT FROM THESE ONLY — Source of Truth` frame. Any frame not listed there is **not** approved for implementation.

## Active Frames (Implementation Approved)
These are the only frames eligible for implementation:

- Design System: `ACTIVE 00 Design System` (id: `zIP3o`)
- Landing Page v2: `ACTIVE 01 Landing` (id: `DhkvM`)
- Entry Choice: `ACTIVE 02 Entry Decision` (id: `V6ysS`)
- Existing Will Gate: `ACTIVE 03 Existing Will Review Gate` (id: `Fd207`)
- AI Personal Details: `ACTIVE A1 AI Personal Details` (id: `0T4RE`)
- AI Drafting Workspace: `ACTIVE A2 AI Input` (id: `iVFMi`)
- AI Processing: `ACTIVE A3 AI Processing` (id: `0ianx`)
- AI Extraction Summary: `ACTIVE A4 AI Summary` (id: `9MjGI`)
- AI Corrections: `ACTIVE A5 AI Corrections` (id: `fuTos`)
- AI Review: `ACTIVE A6 AI Review` (id: `WlRtD`)
- Structured Flow Shell: `ACTIVE S0 Structured Flow Shell` (id: `fF89o`)
- Structured Personal Details: `ACTIVE S1 Structured Personal Details` (id: `74ORj`)
- Structured Family and Household: `ACTIVE S2 Structured Family and Household` (id: `EjguX`)
- Executors: `ACTIVE S3 Structured Executors` (id: `yb4Yk`)
- Guardianship: `ACTIVE S4 Structured Guardians` (id: `aSEwT`)
- Structured Assets: `ACTIVE S5 Structured Assets` (id: `nFFsn`)
- Structured Beneficiaries: `ACTIVE S6 Structured Beneficiaries` (id: `zXzDB`)
- Structured Special Wishes: `ACTIVE S7 Structured Special Wishes` (id: `CVyk3`)
- Review + Result: `ACTIVE R1 Result / Draft Preview` (id: `0gbAz`)
- Export Options: `ACTIVE R2 Result / Export Options` (id: `xUIiv`)
- Signing Instructions: `ACTIVE R3 Result / Signing Guide` (id: `JXSDZ`)
- Advocate Review: `ACTIVE R4 Result / Advocate Review` (id: `K02wp`)
- FAQ: `ACTIVE X1 FAQ` (id: `puMDs`)
- Privacy + Trust: `ACTIVE X2 Privacy and Trust` (id: `Scsqx`)
- Error + Empty States: `ACTIVE X3 Error and Recovery` (id: `IRKLg`)
- Mobile Landing v2: `ACTIVE M1 Mobile Landing` (id: `tNapD`)
- Mobile Entry Choice: `ACTIVE M2 Mobile Entry Decision` (id: `ny4DT`)
- Mobile Existing Will Gate: `ACTIVE M3 Mobile Existing Will Gate` (id: `boVDU`)
- Mobile AI Personal Details: `ACTIVE M4 Mobile AI Personal Details` (id: `HRgBn`)
- Mobile AI Drafting: `ACTIVE M5 Mobile AI Drafting` (id: `jdj6J`)
- Mobile Structured Assets: `ACTIVE M6 Mobile Structured Assets` (id: `ui2iU`)
- Mobile Review: `ACTIVE M7 Mobile Review` (id: `KU8Wf`)

## Recent Updates
- 2026-03-31: Synced doc to `IMPLEMENT FROM THESE ONLY — Source of Truth` frame list, including full AI and structured flows.

## Archive / Reference Frames (Do Not Implement)
Legacy designs remain only in `design/pencil-new.pen` for reference.

## Route + Component Mapping (Active)
Proposed routes and current intended files (update during implementation if needed):

- `/` -> `Landing` -> `apps/web/src/pages/marketing/Landing.tsx`
- `/entry-choice` -> `EntryChoice` -> `apps/web/src/pages/marketing/EntryChoice.tsx`
- `/existing-will` -> `ExistingWillGate` -> `apps/web/src/pages/marketing/ExistingWillGate.tsx`
- `/drafting/ai/personal-details` -> `AiPersonalDetails` -> `apps/web/src/pages/drafting/AiPersonalDetails.tsx`
- `/drafting/ai/input` -> `AiDraftingWorkspace` -> `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx`
- `/drafting/ai/processing` -> `AiProcessing` -> `apps/web/src/pages/drafting/AiProcessing.tsx`
- `/drafting/ai/summary` -> `AiExtractionSummary` -> `apps/web/src/pages/drafting/AiExtractionSummary.tsx`
- `/drafting/ai/corrections` -> `AiCorrections` -> `apps/web/src/pages/drafting/AiCorrections.tsx`
- `/drafting/ai/review` -> `AiReview` -> `apps/web/src/pages/drafting/AiReview.tsx`
- `/drafting/structured-flow` -> `StructuredFlowShell` -> `apps/web/src/pages/drafting/StructuredFlowShell.tsx`
- `/drafting/structured/personal-details` -> `StructuredPersonalDetails` -> `apps/web/src/pages/drafting/StructuredPersonalDetails.tsx`
- `/drafting/structured/family` -> `StructuredFamilyHousehold` -> `apps/web/src/pages/drafting/StructuredFamilyHousehold.tsx`
- `/drafting/structured/executors` -> `StructuredExecutors` -> `apps/web/src/pages/drafting/StructuredExecutors.tsx`
- `/drafting/structured/guardians` -> `StructuredGuardianship` -> `apps/web/src/pages/drafting/StructuredGuardianship.tsx`
- `/drafting/structured/assets` -> `AssetsBeneficiariesMapping` -> `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx`
- `/drafting/structured/beneficiaries` -> `StructuredBeneficiaries` -> `apps/web/src/pages/drafting/StructuredBeneficiaries.tsx`
- `/drafting/structured/wishes` -> `StructuredSpecialWishes` -> `apps/web/src/pages/drafting/StructuredSpecialWishes.tsx`
- `/drafting/review-result` -> `Review + Result` -> `apps/web/src/pages/drafting/Review.tsx`
- `/drafting/export-options` -> `ExportOptions` -> `apps/web/src/pages/post/ExportOptions.tsx`
- `/drafting/signing-guide` -> `Signing Instructions` -> `apps/web/src/pages/post/SigningGuide.tsx`
- `/drafting/advocate-review` -> `AdvocateReview` -> `apps/web/src/pages/post/AdvocateReview.tsx`
- `/drafting/error` -> `ErrorStates` -> `apps/web/src/pages/post/ErrorStates.tsx`
- `/faq` -> `FaqPage` -> `apps/web/src/pages/marketing/FaqPage.tsx`
- `/privacy` -> `PrivacyTrust` -> `apps/web/src/pages/marketing/PrivacyTrust.tsx`

## Design Governance Rules
- Implement only from `design/pencil-implementation.pen`.
- The `IMPLEMENT FROM THESE ONLY — Source of Truth` frame is the authoritative list; if it is not listed there, it is not active.
- Any promotion must update the index frame and this document in the same change.
