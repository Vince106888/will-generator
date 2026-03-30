# Repo System Map

Date: 2026-03-30
Source: Repository scan (apps, docs, design, prisma)

## Top-Level Structure
- `apps/`
  - `api/`: Express + Prisma backend
  - `web/`: React + Vite frontend
- `docs/`: Existing documentation (design, frontend, product, engineering, devops)
- `design/`: Pencil sources and exported images/PDFs
- `prisma/`: Prisma schema (no migrations directory)
- `tests/`: Repo-level tests (currently minimal)

## Backend (apps/api)
- `src/app.ts`: Express app setup, root health, router mount
- `src/routes/wills.ts`: API routes for will generation, retrieval, PDF output, and lead capture
- `src/engines/`: Draft, complexity, validity, and PDF output engines
- `src/services/`: Will and lead services
- `src/utils/validators.ts`: Zod request validation
- `src/types.ts`: API types
- `src/db.ts`: Prisma client
- `tests/`: Route and engine tests

## Frontend (apps/web)
- `src/App.tsx`: Client-side route table and navigation
- `src/pages/`: Marketing, drafting, and post-result pages
- `src/components/`: Layout, UI primitives, and legacy drafting shell
- `src/lib/`: Drafting data store, API client, navigation helpers
- `src/assets/`: Images and illustrations

## Design Sources
- `design/pencil-implementation.pen`: Primary implementation source
- `design/pencil-new.pen`: Archive only
- `docs/design/design-source-of-truth.md`: Active frame list and governance
- `design/exports/`: Exported PNG/PDF assets

## Docs (Existing)
- `docs/design/`: Design governance and page inventory
- `docs/frontend/`: Route map and implementation plan
- `docs/product/`: Product state and redesign docs
- `docs/engineering/`: Repo audit and bootstrap summaries

## Critical Boundaries
- Active UI must map to `design/pencil-implementation.pen` only.
- API is the sole backend; no separate services or serverless functions in repo.
- Persistence is Prisma/Postgres with JSON-heavy models.
