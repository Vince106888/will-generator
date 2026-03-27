# Esheria Wills Redesign Build Brief (Pencil-First)

Date: 2026-03-25
Owner: Product + Design
Source of truth: `design/pencil-new.pen`

## Executive Summary
We are shifting Esheria Wills from a linear, form-first drafting experience to a dual-path, intelligent drafting system. The primary path is AI-first (conversational, guided, auditable). The secondary path is a reduced, structured form flow. Both paths are gated by an existing-will check and converge at review, export, and signing. This brief formalizes the approved redesign and becomes the canonical build document for the next phase.

## Product Shift (Approved Direction)
- From: linear form-first drafting
- To: dual-path drafting (AI-first primary, structured form secondary)
- Mandatory existing will / codicil gate before drafting
- Assets and beneficiaries are captured and linked as a core step
- Stronger privacy and trust system across key moments
- Reduced structured step model (fewer, more connected steps)
- Review + Result are merged into one core review stage
- Export options are explicit and separated from signing instructions
- Mobile-first coverage is expanded and explicit

## New Information Architecture (Target Page/Frame Inventory)
Each item lists purpose, status, and flow placement.

1. Landing (MODIFY)
- Purpose: trust, value, legal scope, CTA
- Flow: start

2. Entry Choice: AI vs Structured (NEW)
- Purpose: explicit path selection
- Flow: after Landing/Pre-start

3. Pre-start Orientation (MODIFY)
- Purpose: expectations, requirements
- Flow: pre-entry or post-landing

4. Existing Will Gate (NEW, split from Eligibility Gate)
- Purpose: detect existing will/codicil
- Flow: before drafting

5. Codicil Upload (NEW)
- Purpose: upload existing will, validate amendment scope
- Flow: after gate if “Yes, I have a will”

6. AI Drafting Workspace (NEW)
- Purpose: conversational intake + live extraction summary
- Flow: AI path

7. AI Extraction Summary (NEW)
- Purpose: structured summary and edit surface
- Flow: AI path, pre-review

8. Structured Flow Shell (MODIFY Drafting Shell)
- Purpose: step navigation container
- Flow: structured path

9. Personal Details (MODIFY)
- Purpose: identity
- Flow: structured step 1

10. Assets + Beneficiaries Mapping (NEW, merged)
- Purpose: capture and link assets/beneficiaries
- Flow: structured core step; AI summary

11. Executors (MODIFY)
- Purpose: executor and backup
- Flow: structured step

12. Guardianship (MODIFY, conditional)
- Purpose: minor children only
- Flow: structured conditional step

13. Special Wishes (MODIFY)
- Purpose: optional notes
- Flow: late structured step

14. Review / Result (MERGE Review & Confirm + Draft Generated)
- Purpose: review + preview + warning
- Flow: pre-export

15. Export Options (NEW)
- Purpose: export tiers, format
- Flow: after review

16. Signing Instructions (MODIFY)
- Purpose: legal validity steps
- Flow: after export

17. FAQ (MODIFY)
- Purpose: legal scope and answers
- Flow: landing support

18. Privacy / Trust (NEW)
- Purpose: detailed privacy layer
- Flow: landing support and in-flow modal

19. Advocate Review (MODIFY)
- Purpose: legal review CTA
- Flow: landing and review

20. Error & Recovery States (MODIFY)
- Purpose: failure handling
- Flow: global

21. Save & Continue Later (MODIFY)
- Purpose: pause/return
- Flow: global

22. Mobile Landing (MODIFY)
23. Mobile Entry Choice (NEW)
24. Mobile Existing Will Gate (NEW)
25. Mobile AI Drafting (NEW)
26. Mobile AI Summary (NEW)
27. Mobile Assets + Mapping (NEW)
28. Mobile Review (MODIFY)
29. Mobile Export (NEW)
30. Mobile Signing (NEW)

## Current to Future Frame Mapping (Pencil)
Source file: `design/pencil-new.pen`

- Frame (bi8Au): deprecate
- Esheria Wills Design System (zIP3o): keep, add new components
- Landing Page (Ci7r7): modify heavily
- Pre-start Orientation (90eE8): modify
- Eligibility Gate (fKoxn): split and repurpose
- Drafting Shell (UiN29): modify into Structured Flow Shell + AI workspace container
- Personal Details (yE87L): modify lightly
- Family & Dependants (CbCLT): modify heavily (reduced, conditional guardianship trigger)
- Executors (k8CZ8): modify lightly
- Beneficiaries (91bhP): merge into Assets + Beneficiaries Mapping
- Assets (LaGOp): merge into Assets + Beneficiaries Mapping
- Distribution Wishes (DAL6T): merge into Assets + Beneficiaries Mapping
- Guardians (tFx2u): modify heavily, conditional
- Special Wishes (JvmbN): modify lightly
- Review & Confirm (7Dxo2): merge into Review/Result
- Draft Generated (C5na0): merge into Review/Result + Export Options
- Signing Guide (kYmnG): modify
- Save & Continue Later (Pf4ry): modify
- Error & Recovery States (TklsW): modify
- Mobile Landing (iL7aE): modify
- Mobile Drafting (qlvIS): split into AI + Structured shells
- Mobile Assets (poUGQ): modify into Assets + Mapping
- Mobile Distribution (i9aoX): deprecate
- Mobile Review (qSIY6): modify

## Screen-by-Screen Requirements (Summary)
The full screen spec is tracked in `docs/product/redesign-ux-architecture.md` with headlines, CTAs, components, trust/legal copy, and mobile considerations.

## Step Model Refactor (Structured Form)
- Personal Details
- Assets + Beneficiaries Mapping
- Executors
- Guardianship (conditional)
- Special Wishes (optional)
- Review & Confirm

## Trust / Privacy / Legal Messaging Layer
- Persistent trust banner at entry, AI workspace, export
- Inline legal tooltips at guardianship, executor, witnesses
- Review/export disclaimers (signing + witness requirements)
- Cross-border disclaimer on assets
- AI scope: “AI structures your instructions; it does not replace legal execution”

## Mobile-First Coverage
Dedicated mobile frames for entry choice, gate, AI workspace, AI summary, asset mapping, review, export, signing.

## Implementation Sequence (High-Level)
1. Pencil refactor (P0 ? P1 ? P2)
2. Design review + legal sign-off
3. Frontend route/component mapping
4. Backend contracts
5. Implementation

## Risks and Open Questions
Tracked in `docs/product/redesign-legal-open-questions.md`.
