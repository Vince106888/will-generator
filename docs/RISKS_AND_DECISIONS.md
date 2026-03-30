# Risks and Decisions

Date: 2026-03-30

## Product Risks
- AI flow is incomplete; users may not understand where AI ends and structured data begins.
- Structured flow is missing key steps (personal details, family/household, beneficiaries, special wishes).
- Users can reach review without completing required legal data.

## UX Risks
- Lack of route guards allows jumping between AI and structured paths without confirmation.
- Mobile parity depends on responsive behavior without explicit mobile frames for key screens.
- Legacy pages still exist and could be reintroduced unintentionally.

## Legal and Trust Risks
- Validity checklist is minimal and not a full Kenyan legal checklist.
- No explicit capture of witness eligibility or signing location details.
- Current copy may imply legal assurance beyond the platform's role.

## Architecture Risks
- No authenticated save/retrieve; drafts are stored only by generated id and localStorage.
- Data model is JSON-heavy and lacks versioning.
- No analytics or event logging, limiting visibility into drop-off and errors.

## Operating Model Risks
- Underdefined issues could be picked up and partially executed.
- Incomplete documentation could cause drift between design, routes, and backend.

## Open Questions
- Are structured personal details and family steps to be revived from legacy pages or redesigned?
- What is the official AI prompt and boundary policy for Kenyan legal context?
- Is there a required data retention policy for drafts and leads?

## Decisions Made (Current)
- Design source of truth is `design/pencil-implementation.pen`.
- Active route map is defined in `App.tsx` and in docs; legacy pages are not active.
- AI is restricted to extraction and summarization only.
- Codex is PM/systemizer; Symphony is executor.
- No direct work on `main`. Every change is a branch + PR.

## Decisions Still Needed
- Final list of required structured steps for MVP.
- Legal checklist coverage and advocate escalation thresholds.
- Mobile frame completion for missing flows.
- Required acceptance tests for MVP exit.
