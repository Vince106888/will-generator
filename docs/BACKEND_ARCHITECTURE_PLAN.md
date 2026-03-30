# Backend Architecture Plan

Date: 2026-03-30
Source: `apps/api/src` and `prisma/schema.prisma`

## Actual Backend State (Current)
- Framework: Express + TypeScript
- Validation: Zod (`src/utils/validators.ts`)
- Database: Prisma (Postgres), JSON-heavy data model
- PDF output: pdfkit (`src/engines/outputEngine.ts`)
- Health: root GET `/` returns `{ status: "ok", service: "esheria-wills-api" }`

## Current Routes
Base: `/api/v1/wills`
- `POST /generate`: create draft, complexity, validity checklist, and WillProfile record
- `GET /:id`: fetch WillProfile by id
- `GET /:id/pdf`: generate or return PDF for WillProfile
- `POST /:id/lead`: capture lead for a will

## Current Engines (Existing)
- Draft engine: `generateDraft` builds a plain-text will (minimal, template-based)
- Complexity engine: score based on minors, multiple households, asset count
- Validity engine: static checklist (Kenyan witness/signing reminders)
- Output engine: PDF generation and storage under `storage/wills`

## Storage Model
- `WillProfile` stores most domain data as JSON blobs (personal, family, assets, distribution, roles, instructions)
- `Lead` and `AnalyticsEvent` models exist, but only lead capture is wired
- No migrations directory exists; schema is present only in `prisma/schema.prisma`

## Missing or Incomplete Capabilities
- No authenticated user identity or save/resume for a user session
- No update endpoint for drafts; only generate and get-by-id
- No list or search endpoints
- No analytics/event ingestion endpoints (model exists only)
- No AI orchestration endpoints
- Validity checklist is non-exhaustive and not Kenya-law complete
- No explicit complexity triage output to advocate review routing
- No storage layer for draft sessions beyond WillProfile record

## Deterministic vs AI Boundary (Backend)
- Deterministic: validity checklist, complexity scoring, signing rules
- AI: should only generate summaries or structured extraction and must not change legal rules

## MVP Direction (Recommended)
1. Define canonical API contracts for structured draft data
2. Add save/update endpoints for draft sessions (pre-finalize)
3. Add explicit advocate triage response (complexity thresholds and flags)
4. Add analytics/event endpoint for funnel tracking
5. Add health/readiness endpoints for deployment checks

## Next-Phase Direction
- Auth or token-based save/retrieve
- Full legal validation ruleset with Kenyan counsel input
- Separate engines for distribution logic, beneficiary constraints, and witness checks
- Versioned draft output formats (PDF, DOCX)
