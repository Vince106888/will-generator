# Design Source of Truth

Date: 2026-03-26  
Primary file: `design/pencil-new.pen`  
Active index frame: `00 Canvas Index` (id: `iUMph`)

## Decision
The only implementation-approved design source is the active list inside `00 Canvas Index` in `design/pencil-new.pen`. Any frame not listed there is **archive/reference only** unless explicitly promoted in writing.

## Active Frames (Implementation Approved)
These are the frames listed in `00 Canvas Index` and are the only ones eligible for implementation.

- Design System: `Esheria Wills Design System` (id: `zIP3o`)
- Landing Page v2: `Landing Page v2` (id: `DhkvM`)
- Entry Choice: `Entry Choice` (id: `V6ysS`)
- Existing Will Gate: `Existing Will Gate` (id: `Fd207`)
- AI Drafting Workspace: `AI Drafting Workspace` (id: `iVFMi`)
- AI Extraction Summary: `AI Extraction Summary` (id: `9MjGI`)
- Structured Flow Shell: `Structured Flow Shell` (id: `fF89o`)
- Assets + Beneficiaries Mapping: `Assets + Beneficiaries Mapping` (id: `nFFsn`)
- Executors: `Executors` (id: `yb4Yk`)
- Guardianship: `Guardianship` (id: `aSEwT`)
- Review + Result: `Review + Result` (id: `0gbAz`)
- Export Options: `Export Options` (id: `xUIiv`)
- Signing Instructions: `Signing Instructions` (id: `JXSDZ`)
- Advocate Review: `Advocate Review` (id: `K02wp`)
- FAQ: `FAQ Page` (id: `puMDs`)
- Privacy + Trust: `Privacy + Trust` (id: `Scsqx`)
- Error + Empty States: `Error + Empty States` (id: `IRKLg`)
- Mobile Landing v2: `Mobile Landing v2` (id: `tNapD`)
- Mobile Entry Choice: `Mobile Entry Choice` (id: `ny4DT`)
- Mobile Existing Will Gate: `Mobile Existing Will Gate` (id: `boVDU`)
- Mobile AI Drafting: `Mobile AI Drafting` (id: `jdj6J`)
- Mobile Assets Mapping: `Mobile Assets Mapping` (id: `ui2iU`)
- Mobile Review: `Mobile Review` (id: `qSIY6`)

## Archive / Reference Frames (Do Not Implement)
These frames exist only for comparison or legacy reference and should not drive implementation:

- `Landing Page` (id: `Ci7r7`)
- `Entry Choice` (id: `grSlG`)
- `Existing Will Gate` (id: `OJ284`)
- `AI Drafting Workspace` (id: `OJYGF`)
- `AI Extraction Summary` (id: `Nw0R2`)
- `Drafting Shell` (id: `UiN29`)
- `Eligibility Gate` (id: `fKoxn`)
- `Pre-start Orientation` (id: `90eE8`) — not in active index; keep as reference only unless promoted
- Legacy structured steps: `Personal Details` (`yE87L`), `Family & Dependants` (`CbCLT`), `Executors` (`k8CZ8`), `Beneficiaries` (`91bhP`), `Assets` (`LaGOp`), `Distribution Wishes` (`DAL6T`), `Guardians` (`tFx2u`), `Special Wishes` (`JvmbN`), `Review & Confirm` (`7Dxo2`), `Draft Generated` (`C5na0`)
- Legacy support screens: `Save & Continue Later` (`Pf4ry`), `Signing Guide` (`kYmnG`), `Error & Recovery States` (`TklsW`)
- Legacy mobile frames: `Mobile Landing` (`iL7aE`), `Mobile Drafting` (`qlvIS`), `Mobile Assets` (`poUGQ`), `Mobile Distribution` (`i9aoX`)

## Route + Component Mapping (Active)
This maps approved frames to current frontend routes and files. If a route is missing, it must be created before implementation.

- `/` → `Landing` → `apps/web/src/pages/marketing/Landing.tsx`
- `/entry-choice` → `EntryChoice` → `apps/web/src/pages/marketing/EntryChoice.tsx`
- `/existing-will` → `ExistingWillGate` → `apps/web/src/pages/marketing/ExistingWillGate.tsx`
- `/drafting/ai-workspace` → `AiDraftingWorkspace` → `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx`
- `/drafting/ai-summary` → `AiExtractionSummary` → `apps/web/src/pages/drafting/AiExtractionSummary.tsx`
- `/drafting/structured-flow` → `StructuredFlowShell` → `apps/web/src/pages/drafting/StructuredFlowShell.tsx`
- `/drafting/mapping` → `AssetsBeneficiariesMapping` → `apps/web/src/pages/drafting/AssetsBeneficiariesMapping.tsx`
- `/drafting/structured-executors` → `StructuredExecutors` → `apps/web/src/pages/drafting/StructuredExecutors.tsx`
- `/drafting/guardianship` → `StructuredGuardianship` → `apps/web/src/pages/drafting/StructuredGuardianship.tsx`
- `/drafting/review-result` → `Review + Result` → `apps/web/src/pages/drafting/Review.tsx`
- `/drafting/export-options` → `ExportOptions` → `apps/web/src/pages/post/ExportOptions.tsx`
- `/drafting/signing-guide` → `Signing Instructions` → `apps/web/src/pages/post/SigningGuide.tsx`
- `/drafting/advocate-review` → `AdvocateReview` → `apps/web/src/pages/post/AdvocateReview.tsx`
- `/faq` → `FaqPage` → `apps/web/src/pages/marketing/FaqPage.tsx`
- `/privacy` → `PrivacyTrust` → `apps/web/src/pages/marketing/PrivacyTrust.tsx`
- `/drafting/error` → `ErrorStates` → `apps/web/src/pages/post/ErrorStates.tsx`

## Design Governance Rules
- Only implement from the **Active Frames** list above.
- If a frame is not listed in `00 Canvas Index`, it is **archive/reference**.
- Any promotion of a frame must update `00 Canvas Index` and this document.
- When creating new frames, add them to `00 Canvas Index` with a clear label.
- Use the design system components and tokens in `Esheria Wills Design System` (`zIP3o`).

## Known Design Risks (Must Be Addressed Before Implementation)
- AI Drafting Workspace: conversation area too narrow, width balance off, not premium enough, and privacy/trust guidance is under-emphasized.
- Content depth: several pages still feel too short. Add more plain-English explanations and “why this matters” guidance.
- Mobile: mobile frames exist but do not cover all critical states (AI summary, export, signing). Mobile cannot be a resized desktop.

