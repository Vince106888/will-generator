# Backend / Full-Stack Master Plan (Authoritative)

Date: 2026-04-06  
Owner: Backend + Full-stack implementation  
Scope: Move Esheria Wills from frontend-complete prototype to production-grade end-to-end system.

---

## 1) Full Audit Summary

### What exists and is real today
- Monorepo with:
  - `apps/web` (React + Vite)
  - `apps/api` (Express + TypeScript + Prisma)
  - `prisma/schema.prisma` (data model)
- Real backend endpoints:
  - `POST /api/v1/wills/generate`
  - `GET /api/v1/wills/:id`
  - `GET /api/v1/wills/:id/pdf`
  - `POST /api/v1/wills/:id/lead`
  - `POST /api/v1/draft-sessions`
  - `GET /api/v1/draft-sessions/:id`
  - `PATCH /api/v1/draft-sessions/:id`
  - `POST /api/v1/draft-sessions/:id/finalize`
- Real persistence exists for:
  - `WillProfile` records (JSON-heavy fields)
  - `Lead` records
  - `DraftSession` records
  - `WillDraftVersion` records
  - `AnalyticsEvent` model defined (not wired)
- Real PDF generation exists (`pdfkit`, local filesystem output).
- Real client-server call exists only at final review and lead actions.

### What is implemented but partial
- Complexity engine is deterministic but minimal (`hasMinors`, `multipleHouseholds`, asset count threshold).
- Validity engine is deterministic but static and non-exhaustive for Kenya legal edge cases.
- Draft engine is deterministic but template-simple (not structured clause assembly).
- Frontend form capture is comprehensive, but only partially mapped into backend payload.
- CI exists (lint/test/build) but no deployment workflows, migration lifecycle, or runtime observability.

### What is fake / placeholder / prototype mode
- AI flow is UI-only; no model integration, no AI orchestration service, no extraction API.
- Multiple AI screens contain static/fallback content (demo conversation, fallback assets/beneficiaries).
- Review page contains hardcoded fallback summary lines when capture is incomplete.
- "Save and resume" promise exists in copy, but implementation is browser-local only (localStorage/sessionStorage).
- Advocate handoff is modeled as generic lead capture metadata, not true review-request domain workflow.
- Export tiering (Basic/Premium) is UI/lead event behavior only; no productized fulfillment workflow.
- Legacy pages/components remain in repo and can be misused as active references.

### Key blockers to production readiness
- No canonical draft-session lifecycle (create/update/finalize/resume).
- No authenticated or signed-anonymous resume strategy.
- No full schema normalization for structured legal capture and auditability.
- No robust error model/idempotency semantics.
- No analytics ingestion path despite model existence.
- No email delivery workflow (resume links, export fulfillment, advocate notifications).
- No security posture for PII beyond baseline transport/storage assumptions.

---

## 2) Repo Map (Implementation-Relevant)

### Frontend
- App routing: `apps/web/src/App.tsx` (manual route map).
- Drafting state: `apps/web/src/lib/drafting.ts` (localStorage-backed source-of-truth in UI).
- API client: `apps/web/src/lib/api.ts`.
- Final generation trigger: `apps/web/src/pages/drafting/Review.tsx`.
- Post-generation actions:
  - Export: `apps/web/src/pages/post/ExportOptions.tsx`
  - Advocate review: `apps/web/src/pages/post/AdvocateReview.tsx`
  - Signing guide: `apps/web/src/pages/post/SigningGuide.tsx`

### Backend
- App bootstrap: `apps/api/src/app.ts`, `apps/api/src/index.ts`
- Routes: `apps/api/src/routes/wills.ts`
- Services:
  - `apps/api/src/services/willService.ts`
  - `apps/api/src/services/leadService.ts`
- Engines:
  - `apps/api/src/engines/draftEngine.ts`
  - `apps/api/src/engines/complexityEngine.ts`
  - `apps/api/src/engines/validityEngine.ts`
  - `apps/api/src/engines/outputEngine.ts`
- Validation: `apps/api/src/utils/validators.ts`

### Data / infra / config
- Prisma schema: `prisma/schema.prisma`
- API env sample currently only local: `apps/api/.env`
- Web env sample: `apps/web/.env.example`
- CI only: `.github/workflows/ci.yml`

---

## 3) Real vs Placeholder Matrix

| Area | Real | Partial | Placeholder / Fake |
|---|---|---|---|
| Route handlers | Generate/get/pdf/lead are real | No update/session endpoints | No analytics/advocate workflow routes |
| Persistence | Prisma create/find for wills and leads | JSON blob model limits queryability | No migration history in repo |
| Frontend->API wiring | Review generate call + lead calls real | Most steps not server-synced | Save/resume is local-only |
| Complexity scoring | Deterministic function exists | Sparse rules and thresholds | No legal validation of thresholds |
| Validity checklist | Deterministic static checklist exists | Non-exhaustive | Not law-versioned, not scenario-aware |
| Draft generation | Deterministic text output exists | Clause structure is basic | Not production-quality legal assembly |
| AI flow | UI journey exists | Tracks local aiDraftSession metadata | No model invocation/extraction API |
| Export flow | PDF download endpoint exists | Basic/premium only lead metadata | No tier fulfillment pipeline |
| Advocate handoff | Lead row can be captured | Metadata-based only | No case/request state machine |
| Analytics | DB model exists | None wired | No ingestion/event forwarding |

---

## 4) Backend / Full-Stack Target Architecture

### Web responsibilities
- Capture structured legal data with strong client-side validation UX.
- Persist draft progress incrementally via API (not just at generation).
- Render backend-truth status (loading/error/saved timestamps/last synced version).
- Keep AI-assisted UX as optional frontend interaction, but never as legal source-of-truth without user confirmation.

### API responsibilities
- Own canonical draft session lifecycle.
- Validate all incoming payloads against versioned schemas.
- Run deterministic engines for complexity + validity + draft generation.
- Persist structured domain records and event trail.
- Provide retrieval/resume endpoints, output generation endpoints, escalation endpoints, and analytics ingestion.

### Engine/module boundaries (target)
- `flowEngine`: completeness + next required fields.
- `draftEngine`: deterministic clause assembly from structured data.
- `complexityEngine`: weighted rules + explainable flags + escalation recommendation.
- `validityEngine`: Kenya-first checklist and warnings by scenario.
- `outputEngine`: PDF/DOCX rendering via finalized draft versions.
- `lead/escalationEngine`: advocate request creation + routing metadata.

### Persistence/retrieval model
- Draft session as first-class aggregate with versioning and status transitions.
- Structured child entities (or structured JSON with indexed projections) for assets/beneficiaries/executors/guardians.
- Retrieval by secure resume token and/or authenticated user.

### Analytics model
- Event ingestion endpoint with allowlisted event names.
- Server-side enrichment (timestamp, session, source route, will/draft linkage).
- Optional forwarding sink (e.g., PostHog/Segment) behind env flags.

### Email/save flow
- Save draft endpoint generates or reuses resume token.
- Resume email job dispatch (transactional provider integration).
- Delivery/failure state persisted for retries/audit.

### Advocate escalation flow
- Explicit `AdvocateReviewRequest` domain object.
- Submit endpoint validates contact + reason + linked draft version.
- Status lifecycle: `SUBMITTED -> ACKNOWLEDGED -> ASSIGNED -> COMPLETED/CANCELLED`.

### Export/output flow
- Explicit export request endpoint with plan/tier/options.
- Free tier immediate signed URL/download.
- Paid tiers create fulfillment jobs (not fake lead capture).

### Security/privacy boundaries
- Separate PII-bearing fields, minimize what is stored in analytics.
- Encrypted transport (TLS) and encrypted-at-rest in managed DB/storage.
- Signed, expiring resume tokens.
- Access control on all retrieval endpoints.

### Deployment architecture
- Web static host + API service + managed PostgreSQL + object storage.
- Migration pipeline (`prisma migrate deploy`) in staging/prod workflows.
- Centralized logs, error tracking, health/readiness checks.

---

## 5) Backend Domain Model Proposal

Minimum target entities:

1. `DraftSession`
   - `id`, `sessionTokenHash`, `userId?`, `status` (`IN_PROGRESS|READY|FINALIZED|ARCHIVED`), `sourceMode` (`AI|STRUCTURED`), timestamps.

2. `WillDraftVersion`
   - `id`, `draftSessionId`, `version`, `inputSnapshot`, `generatedDraft`, `complexityResult`, `validityResult`, `isCurrent`, timestamps.

3. `PersonProfile`
   - Canonical testator fields: legal names, IDs, contact, county, marital context.

4. `FamilyDependant`
   - dependants/minors relationships and guardian-needs signals.

5. `ExecutorAssignment`
   - primary/backup executor, relationship, contact, notes.

6. `GuardianAssignment`
   - primary/backup guardian, conditions, notes.

7. `AssetItem`
   - category, label, location/descriptor, notes.

8. `Beneficiary`
   - identity details and relationship.

9. `AssetAllocation`
   - asset-to-beneficiary mappings (share, notes).

10. `ResidueInstruction`
    - remainder clause and special wishes.

11. `ComplexityAssessment`
    - score, level, flags, explainability payload.

12. `ValidityChecklistResult`
    - checklist items, warnings, unresolved blockers.

13. `GeneratedOutput`
    - output type (`PDF|DOCX`), storage key, checksum, createdFromVersion.

14. `LeadCapture`
    - generalized lead entries (source, metadata, linked session/will).

15. `AdvocateReviewRequest`
    - explicit handoff object and status lifecycle.

16. `AnalyticsEvent`
    - eventName, payload (sanitized), session linkage.

17. `AuditLog`
    - immutable trail for state changes and sensitive operations.

Implementation note: can begin with hybrid approach (retain JSON snapshots while introducing typed tables incrementally), but `DraftSession`, `WillDraftVersion`, and `AdvocateReviewRequest` must become first-class immediately.

---

## 6) Final API Contract Proposal (Authoritative)

Base: `/api/v1`

### Draft session lifecycle
- `POST /draft-sessions`
  - Creates session, returns `sessionId`, `resumeToken`, initial status.
- `GET /draft-sessions/:sessionId`
  - Retrieves canonical draft state (requires auth or valid token).
- `PATCH /draft-sessions/:sessionId`
  - Partial updates for structured capture blocks; optimistic concurrency via `version`.
- `POST /draft-sessions/:sessionId/finalize`
  - Freezes inputs and creates new `WillDraftVersion` with deterministic outputs.

### Generation and outputs
- `POST /wills/:sessionId/generate`
  - Deterministic generation from latest confirmed structured data.
- `GET /wills/:sessionId`
  - Read latest generated result.
- `POST /wills/:sessionId/exports`
  - Request export (`pdf|docx`, tier metadata).
- `GET /wills/:sessionId/exports/:exportId`
  - Export status + download URL/stream details.

### Complexity + validity transparency
- `GET /wills/:sessionId/complexity`
- `GET /wills/:sessionId/validity`

### Advocate flow
- `POST /wills/:sessionId/advocate-review-requests`
- `GET /wills/:sessionId/advocate-review-requests/:requestId`

### Leads + analytics
- `POST /leads`
  - Explicit lead capture endpoint (not overloaded with advocate workflow).
- `POST /analytics/events`
  - Allowlisted event ingestion.

### Save/resume/email
- `POST /draft-sessions/:sessionId/resume-link`
  - Sends or queues resume link email.

### Health/readiness
- `GET /health/live`
- `GET /health/ready`

### Validation/auth/error/idempotency standards
- Validation: Zod schemas per route, shared contract package (future).
- Auth strategy:
  - Phase 1: signed anonymous resume token.
  - Phase 2: optional user auth/account linkage.
- Error model:
  - `{ error: { code, message, details?, requestId } }`
- Idempotency:
  - Required on mutating endpoints that may be retried (`Idempotency-Key` header).

---

## 7) Placeholder Elimination Plan (File-Level)

| File | Placeholder behavior | Why unsafe | Replacement direction |
|---|---|---|---|
| `apps/web/src/pages/drafting/AiDraftingWorkspace.tsx` | Static conversation + faux send | Misleads as real AI flow | Wire to AI intake API or mark as manual notes capture with explicit non-AI label until integrated |
| `apps/web/src/pages/drafting/AiProcessing.tsx` | Informational screen only, no processing | Fake system behavior | Trigger real extraction job/status polling |
| `apps/web/src/pages/drafting/AiExtractionSummary.tsx` | Fallback demo assets/beneficiaries | Non-user truth shown as extracted truth | Populate strictly from extraction output or confirmed structured state only |
| `apps/web/src/pages/drafting/AiCorrections.tsx` | Duplicate/fallback summary behavior | Can propagate fake data confidence | Bind to correction patch endpoint against session |
| `apps/web/src/pages/drafting/Review.tsx` | Hardcoded fallback summary lines and always navigate on failure | Silent failure can lose trust and state | Remove fake fallback lines; block continue on generation failure with actionable error |
| `apps/web/src/pages/post/SaveContinue.tsx` | Legacy fake "email resume link" success | Promises non-existent backend feature | Replace with real save/resume endpoint flow or remove route from active surface |
| `apps/web/src/pages/post/ErrorStates.tsx` | Static examples imply restore support | Unsupported recovery promise | Bind to real error codes and support correlation IDs |
| `apps/web/src/pages/post/ExportOptions.tsx` | Basic/Premium call `/lead` only | No true fulfillment pipeline | Replace with export request API and fulfillment status |
| `apps/web/src/pages/post/AdvocateReview.tsx` | Uses generic lead endpoint | No advocate case lifecycle | Replace with advocate-review-request endpoint + status |
| `apps/web/src/lib/drafting.ts` | localStorage as primary persistence | No durable cross-device resume | Shift to server-first draft session sync with local cache fallback only |
| `apps/api/src/engines/draftEngine.ts` | Minimal plain-text template | Not production-grade legal drafting | Build clause-oriented deterministic engine with structured inputs |
| `apps/api/src/engines/validityEngine.ts` | Static list independent of scenario | Under-warns and over-warns | Scenario-aware Kenya validity rule engine |
| `apps/api/src/engines/complexityEngine.ts` | 3-factor score only | Weak triage quality | Expand weighted factors + explainable outcomes + calibration tests |
| `apps/api/src/routes/wills.ts` | Limited endpoint surface | Cannot support save/resume lifecycle | Introduce draft-session, export, analytics, advocate routes |
| `prisma/schema.prisma` | JSON-heavy single-record modeling | Poor traceability/queryability/versioning | Introduce first-class session/version/escalation/output tables |

---

## 8) Ordered Implementation Phases

### Phase 0 — Foundation hardening
1. Freeze active contracts and deprecate legacy routes/pages from active docs.
2. Add request ID middleware, structured error model, health/live/ready endpoints.
3. Add migration workflow and first baseline migration set.

### Phase 1 — Schema + persistence core
1. Introduce `DraftSession`, `WillDraftVersion`, `AdvocateReviewRequest`, `GeneratedOutput`.
2. Add backward-compatible adapters to current `WillProfile` where needed.
3. Add repository/service layer tests against real Prisma test DB.

### Phase 2 — API completion
1. Implement draft session create/get/patch/finalize endpoints.
2. Implement resume-token strategy + validation.
3. Implement analytics ingestion endpoint.

### Phase 3 — Engine hardening
1. Replace minimal draft engine with clause-based deterministic assembly.
2. Expand complexity model and explainable triage outputs.
3. Expand validity engine into scenario-aware Kenya checklist output.

### Phase 4 — Frontend-to-backend sync
1. Move from localStorage-primary to server-primary sync.
2. Replace fake AI processing/extraction screens with real API-backed states.
3. Add resilient loading/error/empty states tied to API truth.

### Phase 5 — Save/retrieve/email
1. Resume-link endpoint + email provider integration.
2. Retry/delivery state tracking and user-safe error UX.

### Phase 6 — Advocate handoff + exports
1. Implement advocate request domain workflow.
2. Implement export request + status endpoints and free/premium branching.

### Phase 7 — Analytics + observability + deploy readiness
1. Ship analytics events pipeline.
2. Add production logging/error tracking/uptime.
3. Add staging/prod deployment workflows and runbooks.

---

## 9) Risks and Blockers Register

1. **Legal correctness risk**: incomplete Kenya-specific rules in validity/draft engine.
2. **Complexity misclassification risk**: over/under-escalation without calibrated model.
3. **PII/privacy risk**: localStorage/session storage and broad metadata capture.
4. **Broken save/resume risk**: no server-owned draft lifecycle today.
5. **Invalid draft output risk**: minimal template may miss critical legal clauses.
6. **Non-deterministic generation risk**: future AI bleed into legal logic if boundaries not enforced.
7. **Email delivery failure risk**: no provider integration/retry/audit today.
8. **Auditability gap**: no immutable event trail for critical state changes.
9. **Deployment misconfiguration risk**: no deploy workflows, no migration gates.
10. **Contract drift risk**: frontend richer model than backend schema currently accepts.

---

## 10) Concrete Backlog (Dependency Order)

1. **BFS-001**: Add API error contract, request IDs, liveness/readiness routes.
2. **BFS-002**: Add Prisma migrations baseline and migration CI gate.
3. **BFS-003**: Introduce `DraftSession` + `WillDraftVersion` models + repositories.
4. **BFS-004**: Implement `POST/GET/PATCH /draft-sessions` endpoints with Zod contracts.
5. **BFS-005**: Implement resume token issuance/verification and secure retrieval.
6. **BFS-006**: Refactor frontend drafting state to sync with draft-session API.
7. **BFS-007**: Replace Review generate flow with finalize endpoint + proper failure handling.
8. **BFS-008**: Replace fake AI processing/summary with extraction status endpoints (or relabel as manual notes mode until AI exists).
9. **BFS-009**: Expand complexity engine + unit calibration fixtures.
10. **BFS-010**: Expand validity engine with scenario-based Kenyan checks.
11. **BFS-011**: Implement advocate review request domain + routes + UI wiring.
12. **BFS-012**: Implement export request/status pipeline and remove lead-overload behavior.
13. **BFS-013**: Implement analytics ingestion endpoint + frontend event adapter.
14. **BFS-014**: Implement resume email workflow + provider adapter + retry jobs.
15. **BFS-015**: Add staging deploy workflow + observability integrations.

---

## 11) Recommended First Execution Slice (Unambiguous)

**Slice name:** Draft Session Foundation + Review Truth Wiring

### Scope
- Add `DraftSession` + `WillDraftVersion` schema and migrations.
- Implement:
  - `POST /api/v1/draft-sessions`
  - `GET /api/v1/draft-sessions/:id`
  - `PATCH /api/v1/draft-sessions/:id`
  - `POST /api/v1/draft-sessions/:id/finalize`
- Update frontend Review flow to:
  - consume finalized response from the new endpoint,
  - stop navigating on generation failure,
  - remove hardcoded demo fallback summary lines.

### Why first
- Removes the highest-risk fake behavior (local-only + silent success).
- Establishes canonical server truth for all later work (AI, exports, advocate, analytics, email).

### Acceptance criteria
- User can start, update, refresh, and resume a draft from server data only.
- Finalize produces persisted deterministic draft + complexity + validity bound to version.
- Review UI reflects backend truth and handles error/loading/success explicitly.

---

## 12) Files Updated in This Planning Pass

- **Created:** `docs/BACKEND_FULLSTACK_MASTER_PLAN.md`

This document is now the execution source-of-truth for backend/full-stack completion and placeholder elimination.
