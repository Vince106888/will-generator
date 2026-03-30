# Esheria Wills

Esheria Wills is a Kenya-first estate planning platform for guided will creation, complexity detection, validity guidance, and advocate escalation. It is the first consumer-facing product in the Esheria ecosystem and is positioned as structured legal data capture and legal intelligence infrastructure, not just a document generator.

This repository is a pnpm monorepo with a Vite/React web app and an Express/TypeScript API. The current state focuses on the will drafting flow, a draft generation engine, PDF output, and a foundational data model.

## Operating Model (Codex + Symphony)

This project uses a two-lane execution model:

- Codex (PM/Systemizer): owns repo truth, documentation, issue quality, sequencing, and PR hygiene.
- Symphony (Executor): implements validated issues from Linear, carries work to Review, and summarizes progress.

Rules:
- No direct work on `main`.
- Every change happens on a branch and ends in a PR.
- Issues are only moved to In Progress when they are ready for execution.
- Source-of-truth docs must be updated whenever routes, APIs, or design alignment change.

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
3. Review and generate a will draft.
4. Download PDF output and signing guidance.
5. Optional lead capture for follow-up and advocate escalation.

## Current Implementation Status (Truthful Snapshot)

Implemented:
- Web UI with core drafting flow and marketing pages.
- Simple routing and step-based navigation in the web app.
- API endpoints for draft generation, retrieval, PDF output, and lead capture.
- Draft, complexity, and validity engines (baseline logic).
- Prisma data model for will profiles, leads, and analytics events.
- Jest tests for API services and routes.
- Vitest tests for web UI components.

Partially implemented / early-stage:
- Persistence and full data capture (schema is present, UI is still mostly client-side state).
- Complexity and validity logic is rule-based and minimal.
- PDF styling and output are foundational but not production-polished.

Planned / not yet implemented:
- Authentication, user accounts, and secure drafts.
- Advocate escalation workflows and scheduling.
- Payment or premium tiers.
- Staging and production deployment automation.

## Architecture Overview

- `apps/web`: Vite + React + Tailwind UI for the drafting experience and marketing pages.
- `apps/api`: Express + TypeScript API with Prisma for persistence.
- `prisma/`: Data model for will profiles, leads, users, and analytics events.
- `design/`: Visual assets and design references.

Data flow (current):
- Web captures will input in UI state.
- API generates draft text, computes complexity/validity, stores a will profile, and optionally captures a lead.
- PDF output is generated on demand from the stored draft.

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
- Symphony executes issues that are Ready and moves them to Review when complete.
- No direct work on `main`.
- One branch per workstream or issue, ending in a PR.

## Local Development

### Prerequisites

- Node.js 20+ recommended
- pnpm 9+
- PostgreSQL (local or Docker)

### Setup

```bash
pnpm install
```

### Environment Variables

Copy and update env files as needed:

- Root: `.env.example` -> `.env`
- Web: `apps/web/.env.example` -> `apps/web/.env`

Required variables (API):
- `DATABASE_URL`
- `API_PORT` (optional, defaults to 4000)
- `OUTPUT_DIR` (optional, defaults to `./storage`)

Web variables:
- `VITE_API_BASE_URL` (optional; defaults to `http://localhost:4000` in dev)

### Run in Development

```bash
pnpm dev
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

- `POST /api/v1/wills/generate` - generate a draft, compute complexity, store a will profile.
- `GET /api/v1/wills/:id` - fetch a will profile.
- `GET /api/v1/wills/:id/pdf` - download the generated PDF.
- `POST /api/v1/wills/:id/lead` - capture a lead for follow-up.

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
- Draft generation + PDF output
- Lead capture

In progress:
- Data persistence and end-to-end API wiring
- Complexity/validity logic expansion

Deferred:
- Authenticated accounts
- Advocate escalation workflows
- Payments and premium tiers
- Production-grade CI/CD and monitoring
