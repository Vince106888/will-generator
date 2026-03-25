# Redesign Implementation Plan (Pencil-First)

Date: 2026-03-25
Scope: Planning only. No code or Pencil changes executed yet.

## Phase A: Documentation (Complete)
- Build brief and UX architecture documented in `docs/product`.
- Open questions documented separately.

## Phase B: Implementation Planning (This doc)
This plan maps the redesign to the current repo structure and prepares a Pencil-first execution path.

### Frontend Impact (Vite React)
Current routes/pages:
- Marketing: `apps/web/src/pages/marketing/Landing.tsx`, `PreStart.tsx`, `Eligibility.tsx`
- Drafting: `DraftingHome.tsx`, `PersonalDetails.tsx`, `FamilyDependants.tsx`, `Executors.tsx`, `Beneficiaries.tsx`, `Assets.tsx`, `Distribution.tsx`, `Guardians.tsx`, `SpecialWishes.tsx`, `Review.tsx`, `MobileDrafting.tsx`
- Post: `SaveContinue.tsx`, `ErrorStates.tsx`, `SigningGuide.tsx`
- Result: `apps/web/src/pages/Result.tsx`

Expected reuse:
- Marketing shells and layout components (Container, Section, Nav, Footer)
- Drafting shell component (to be reworked)
- UI atoms (Button, Card, Input, Select, Textarea, Callout)

Rewrites/new additions:
- New Entry Choice page
- Existing Will Gate (split from Eligibility)
- AI Drafting Workspace + AI Summary
- Assets + Beneficiaries Mapping page (merge Assets + Beneficiaries + Distribution)
- Review/Result merge + new Export Options page
- Codicil path pages
- Mobile-specific pages for AI, mapping, export, signing

Components to introduce:
- Trust/Privacy banner
- Legal helper tooltip
- Glossary drawer/modal
- Progress bar + stepper (clickable)
- AI conversation bubble system
- AI extraction summary card
- Asset card / Beneficiary card / Mapping UI
- Upload block
- Voice input affordance
- Advocate CTA panel
- Signing checklist block
- Export tier/pricing cards

### Backend Impact (Express + Prisma)
Current APIs:
- POST `/wills/generate`
- GET `/wills/:id`
- GET `/wills/:id/pdf`
- POST `/wills/:id/lead`

Likely to remain valid:
- `generate` for baseline draft creation
- `pdf` generation for export

New backend contracts required:
- AI drafting intake and extraction summary endpoints
- Codicil flow endpoints (upload + amendment draft)
- Asset-beneficiary mapping model submission
- Export options selection and download variants
- Save/resume flow (draft state persisted in steps)

### Data Model Impact
Current Prisma: WillProfile stores JSON blobs for personal/family/assets/distribution/roles/instructions + draft text.
Needs refactor or extension:
- Asset/beneficiary mapping structure (not a flat list)
- AI extraction summary state
- Codicil data model (linked to original will)
- Structured step state for save/resume
- Export metadata (format, tier)

### Legal/Content Dependencies
- Guardianship wording under Kenyan law
- Codicil structure and required language
- Privacy claims vs actual storage/security
- Witness requirements and signing instructions
- Cross-border disclaimer

## Phase C: Pencil-First Execution Plan
We will update `design/pencil-new.pen` in controlled batches.

Batch 1
- Landing updates
- Entry Choice
- Existing Will Gate

Batch 2
- AI Drafting Workspace
- AI Extraction Summary

Batch 3
- Structured Flow Shell
- Assets + Beneficiaries Mapping

Batch 4
- Review/Result merge
- Export Options
- Signing Instructions

Batch 5
- Privacy / Trust
- Codicil path
- Mobile support
- Error states

## Phase D: Implementation Readiness Gate
After Pencil edits and review:
1. Confirm flows against legal guidance
2. Map final routes/components in frontend
3. Lock backend contracts
4. Begin implementation
