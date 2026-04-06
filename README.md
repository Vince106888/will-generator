# Esheria Wills

Esheria Wills is a Kenya-first estate planning platform for guided will creation, complexity detection, validity guidance, and advocate escalation. It is the first consumer-facing product in the Esheria ecosystem and is positioned as structured legal data capture and legal intelligence infrastructure, not just a document generator.

This repository is a pnpm monorepo with a Vite/React web app and an Express/TypeScript API. The current state focuses on the will drafting flow, a draft generation engine, PDF output, and a foundational data model.

## Operating Model (Codex + Symphony)

This project uses a two-lane execution model:

- Codex (PM/Systemizer): owns repo truth, documentation, issue quality, sequencing, and PR hygiene.
- Symphony (Executor): implements validated issues from Linear, carries work to In Review, and summarizes progress.

Rules:
- No direct work on `main`.
- Every change happens on a branch and ends in a PR.
- Issues are only moved to In Progress when they are ready for execution.
- Source-of-truth docs must be updated whenever routes, APIs, or design alignment change.

Symphony setup references:
- `WORKFLOW.symphony.md`
- `WORKFLOW.md` (policy-only)
- `docs/SYMPHONY_SETUP.md`

## Source-of-Truth Docs

All new work starts with these docs:

- `docs/PRODUCT_SYSTEM_OVERVIEW.md`
- `docs/REPO_SYSTEM_MAP.md`
- `docs/FRONTEND_IMPLEMENTATION_MAP.md`
- `docs/BACKEND_ARCHITECTURE_PLAN.md`
- `docs/AI_BOUNDARIES_AND_ORCHESTRATION.md`
- `docs/DESIGN_TO_CODE_ALIGNMENT.md`
- `docs/EXECUTION_PLAN.md`
- `docs/AGENT_OPERATING_GUIDE.md`
- `docs/LINEAR_BREAKDOWN.md`
- `docs/RISKS_AND_DECISIONS.md`

## Product Purpose

Kenya's estate planning workflows are often paper-heavy, inconsistent, and hard to access. Esheria Wills is designed to make structured, legally aware data capture accessible while still respecting Kenyan legal requirements and the need for professional escalation.

## Core User Journey (Current)

1. Marketing entry and eligibility guidance.
2. Guided drafting flow for personal details, family, executors, beneficiaries, assets, distribution, guardianship, and special wishes.
3. Review and generate a will draft from backend truth.
4. Download PDF output and signing guidance.
5. Optional advocate review request (first-class handoff).
6. Save/resume via secure resume links.

## Current Implementation Status (Truthful Snapshot)

Implemented:
- Web UI with core drafting flow, review, result, export, and advocate request flows.
- Draft sessions with persisted input snapshots, resume tokens, and resume links.
- Review/finalize flows tied to backend truth and stored draft versions.
- PDF output generated from canonical stored drafts.
- Draft, complexity, and validity engines (baseline logic).
- Analytics ingestion and health/readiness endpoints.
- Prisma data model for will profiles, sessions, versions, leads, and analytics events.
- Jest tests for API services/routes and Vitest tests for web UI components.

Partially implemented / early-stage:
- Complexity and validity logic is rule-based and minimal.
- PDF styling and output are foundational but not production-polished.
- Email delivery is SMTP-ready but depends on environment configuration.

Planned / not yet implemented:
- Authentication, user accounts, and secure drafts.
- Payment or premium tiers.
- Staging and production deployment automation.

## Architecture Overview

- `apps/web`: Vite + React + Tailwind UI for the drafting experience and marketing pages.
- `apps/api`: Express + TypeScript API with Prisma for persistence.
- `prisma/`: Data model for will profiles, leads, users, and analytics events.
- `design/`: Visual assets and design references.

Data flow (current):
- Web captures structured input and syncs it to a draft session.
- API stores session snapshots, finalizes into draft versions, and persists the generated output.
- Result and PDF export are served from the latest generated version.

## Tech Stack

- Web: React 18, Vite 5, TypeScript, Tailwind CSS
- API: Node.js, Express, TypeScript, Zod, Pino
- Data: Prisma ORM + PostgreSQL
- PDF: PDFKit
- Tests: Jest (API), Vitest + Testing Library (Web)
- Tooling: pnpm workspaces, ESLint, Prettier

## Repository Structure

```
apps/
  api/          # Express API
  web/          # Vite + React UI
docs/           # Source-of-truth docs (see list above)
prisma/         # Prisma schema
tests/          # Test entry point notes
design/         # Design artifacts (source of truth)
```

## Workflow and Branching

- Work is tracked in Linear under the Lexsgo team.
- Codex maintains issue readiness and documentation accuracy.
- Symphony executes issues that are Ready and moves them to In Review when complete.
- No direct work on `main`.
- One branch per workstream or issue, ending in a PR.
- Use the pre-created workstream branches as the base for execution:
  - `workstream/audit-architecture-reset`
  - `workstream/design-alignment-route-mapping`
  - `workstream/frontend-marketing-entry`
  - `workstream/frontend-ai-drafting`
  - `workstream/frontend-structured-drafting`
  - `workstream/frontend-result-output`
  - `workstream/frontend-support-recovery`
  - `workstream/backend-core-api-engines`
  - `workstream/backend-persistence-retrieval-leads`
  - `workstream/ai-orchestration-boundaries`
  - `workstream/content-legal-trust`
  - `workstream/qa-analytics-launch`
  - `workstream/docs-delivery-system`
- Issue branches should be created off the matching workstream branch and named `task/<issue-key>-short-description`.

Symphony launcher (Windows):

```bash
corepack pnpm symphony:start
```

## Local Development

### Prerequisites

- Node.js 20+ recommended
- pnpm 9+
- PostgreSQL (local or Docker)

### Setup

```bash
pnpm install
```

### Docker (Optional)

Use Docker to run Postgres and optionally the full stack:

```bash
docker compose up -d db
```

Run migrations after the database is up:

```bash
pnpm -C apps/api db:migrate
```

### Environment Variables

Copy and update env files as needed:

- Root: `.env.example` -> `.env`
- Web: `apps/web/.env.example` -> `apps/web/.env`

Required variables (API):
- `DATABASE_URL`
- `API_PORT` (optional, defaults to 4000)
- `OUTPUT_DIR` (optional, defaults to `./storage`)
- `WEB_BASE_URL` (optional, defaults to `http://localhost:5173`)

Email variables (resume links):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE` (optional, defaults based on port 465)
- `EMAIL_FROM`
- `EMAIL_FROM_NAME` (optional)
- `EMAIL_REPLY_TO` (optional)

Web variables:
- `VITE_API_BASE_URL` (optional; defaults to `http://localhost:4000` in dev)

### Run in Development

```bash
pnpm dev
```

### Validation (Clean Sequence)

```bash
pnpm -C apps/api db:generate
pnpm -C apps/api db:migrate
pnpm lint
pnpm test
pnpm build
```

Or run the full sequence in one command:

```bash
pnpm validate
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Test

```bash
pnpm test
```

## API Surface (Current)

Base URL: `http://localhost:4000`

- `POST /api/v1/draft-sessions` - create a draft session.
- `GET /api/v1/draft-sessions/:id` - fetch a session snapshot (requires token).
- `PATCH /api/v1/draft-sessions/:id` - update session snapshot (requires token).
- `POST /api/v1/draft-sessions/:id/finalize` - generate and persist a draft version.
- `POST /api/v1/draft-sessions/:id/resume-link` - rotate token and send resume link.
- `GET /api/v1/wills/session/:id` - fetch the latest generated output for a session.
- `GET /api/v1/wills/session/:id/pdf` - download the generated PDF for a session.
- `POST /api/v1/wills/session/:id/advocate-review-requests` - request advocate review.
- `POST /api/v1/analytics/events` - ingest analytics events.
- `GET /health/live` and `GET /health/ready` - health checks.

Schemas and validation live in `apps/api/src/utils/validators.ts`.

## Deployment (Current + Intended)

There is no automated deployment pipeline yet. The intended approach is:

- Web app served as a static build (e.g., Vercel, Netlify, or a CDN-backed host).
- API deployed as a Node service (e.g., Render, Railway, or a containerized service).
- PostgreSQL as the backing database.

See `docs/deployment/README.md` for the current state and next steps.

## CI/CD (Current + Next Steps)

- GitHub Actions runs lint, test, and build on push and pull request.
- No deployment workflows are configured yet.

See `docs/devops/ci-cd-plan.md` for planned maturation.

## Product Constraints / Legal Notes

Esheria Wills is a legal-data capture product. The platform must not provide unqualified legal advice. Output must respect Kenyan legal requirements (e.g., witnesses, capacity, and validity checks). Any escalation flow should route users to licensed advocates when complexity or risk is detected.

## Roadmap (Near-Term)

- Complete will drafting flow coverage and data persistence.
- Improve complexity and validity engines.
- Harden PDF output and signing guidance.
- Add authentication and secure draft storage.
- Establish staging deployment and data retention practices.

See `docs/roadmap/next-steps.md` for a structured sequence.

## Contributing

See `CONTRIBUTING.md` for branching, code style, and contribution guidance.

## Documentation Map

- `docs/PRODUCT_SYSTEM_OVERVIEW.md`
- `docs/REPO_SYSTEM_MAP.md`
- `docs/FRONTEND_IMPLEMENTATION_MAP.md`
- `docs/BACKEND_ARCHITECTURE_PLAN.md`
- `docs/AI_BOUNDARIES_AND_ORCHESTRATION.md`
- `docs/DESIGN_TO_CODE_ALIGNMENT.md`
- `docs/EXECUTION_PLAN.md`
- `docs/AGENT_OPERATING_GUIDE.md`
- `docs/LINEAR_BREAKDOWN.md`
- `docs/RISKS_AND_DECISIONS.md`
- `docs/design/design-source-of-truth.md`

## MVP vs In-Progress vs Deferred

MVP (current):
- Guided will drafting UI
- Draft session persistence + resume links
- Review/finalize with backend truth
- PDF output from canonical stored drafts
- Advocate review request flow
- Analytics ingestion and health checks

In progress:
- Complexity/validity logic expansion
- PDF styling and signing guidance polish
- Email delivery configuration for production

Deferred:
- Authenticated accounts
- Payments and premium tiers
- Production-grade CI/CD and monitoring
