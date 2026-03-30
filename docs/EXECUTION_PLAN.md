# Execution Plan

Date: 2026-03-30

## Lanes

Codex (PM/Systemizer)
- Maintains repo truth and documentation.
- Defines issue readiness, dependencies, and sequencing.
- Maintains Linear hygiene and PR discipline.

Symphony (Executor)
- Executes ready issues end-to-end.
- Carries work to In Review unless blocked.
- Updates issue status with clear summaries and evidence.

## Workstreams
1. Audit and truth reconstruction
2. Design alignment and route mapping
3. Frontend marketing and entry flows
4. Frontend AI drafting flow
5. Frontend structured drafting flow
6. Frontend result and output flow
7. Frontend support and recovery pages
8. Backend core API and engines
9. Backend persistence, retrieval, and leads
10. AI orchestration and boundaries
11. Content, legal validity, and trust
12. QA, analytics, and launch readiness
13. Documentation and delivery system

## Recommended Sequence
Phase 1: Documentation and truth baseline (Codex)
- Repo scan, design alignment, and system maps.
- Establish source-of-truth docs.

Phase 2: Route and UX alignment (Symphony)
- Close gaps between design frames and routes.
- Decide on AI and structured step coverage.

Phase 3: Backend MVP reliability (Symphony)
- Harden generate flow, add save/resume, add analytics endpoints.
- Formalize API contracts and draft data model.

Phase 4: AI orchestration (Symphony)
- Implement extraction and summary with strict boundaries.
- Connect AI to structured confirmation pipeline.

Phase 5: QA and readiness (Symphony)
- E2E flow validation across core paths.
- Legal copy review and trust boundary verification.

## Dependencies
- Backend API contracts must be finalized before frontend data wiring.
- AI orchestration must be gated behind legal boundary policies.
- Mobile design frames must exist for pages that claim mobile parity.

## Readiness Criteria
Ready for Symphony:
- Issue has clear scope and acceptance criteria.
- Dependencies are identified and resolved.
- Design and doc references are linked.
- No architecture ambiguity remains.

Not ready:
- Missing design frames or API contract.
- Open product decision blocks execution.
- Acceptance criteria are vague or untestable.

## Linear Status Names (Lexsgo)
- Backlog
- Todo
- In Progress
- In Review
- Done

## Blockers (Current)
- AI steps beyond summary are undefined in code.
- Structured steps (personal details, family/household, beneficiaries, special wishes) are missing in active routes.
- No authenticated save/retrieve strategy.

## Validation Phases
- Route validation: map every route to a design frame and source file.
- Draft generation: confirm API accepts data from frontend and returns draft.
- Export: confirm PDF generation and storage.
- Lead capture: verify advocate review requests are stored.
- Mobile: verify responsive and match design acceptance criteria.

## Review Handoff
- Symphony provides a short summary, risks, and doc updates.
- Codex verifies alignment and updates Linear readiness.
