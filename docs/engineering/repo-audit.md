# Repository Audit

Date: 2026-03-19

## Current Architecture (As Found)

- Monorepo managed by pnpm workspaces (`pnpm-workspace.yaml`).
- `apps/web`: Vite + React + Tailwind single-page UI for marketing and drafting flow.
- `apps/api`: Express + TypeScript API with Prisma ORM and PDF generation.
- `prisma/`: PostgreSQL schema for will profiles, leads, users, and analytics events.
- `design/`: UI/UX artifacts and design iteration outputs.

Routing in the web app is a lightweight manual router in `apps/web/src/App.tsx` using history state. The API exposes a `/api/v1/wills` surface with draft generation, retrieval, PDF download, and lead capture.

## Scripts and Tooling

Root scripts (pnpm):
- `dev`: run all apps in parallel.
- `lint`: lint web + api.
- `test`: run API and web tests.
- `build`: build both apps.

Tooling:
- pnpm workspaces
- ESLint + Prettier
- Jest (API) + Vitest (Web)
- Prisma ORM + PostgreSQL

## Production-Leaning Elements

- API input validation via Zod.
- Prisma data model for core domain objects.
- PDF generation pipeline with deterministic output.
- API tests and route coverage in Jest.
- Web UI has consistent layout/branding and a full drafting flow shell.

## Prototype / Early-Stage Elements

- Web routing is custom (no React Router), so deep linking is limited and not yet robust.
- Persistence is only partially wired; UI mostly operates on client-side state.
- Complexity/validity engines are baseline logic only.
- No auth or user lifecycle flows.
- Deployment is manual; CI does not deploy.

## Risks / Inconsistencies

- `apps/api/.env` exists locally and must remain untracked to avoid secrets leakage.
- `node_modules/` and dev logs are present locally and must be ignored by Git.
- There is no migration history in `prisma/migrations`, so schema evolution is not tracked yet.
- Mixed env loading in API entrypoint makes runtime behavior sensitive to where the service is started.

## Immediate Cleanup Opportunities

- Add repo hygiene files: `.gitignore`, `.editorconfig`, `.gitattributes`.
- Add documentation for current state and next steps.
- Make CI explicitly run both API and web test suites.
- Standardize environment variable documentation.

## Recommended Near-Term Repo Strategy

- Keep monorepo structure with `apps/web` and `apps/api`.
- Add docs and CI foundations without refactoring application logic.
- Start tracking Prisma migrations once schema changes are needed.
- Add a lightweight staging deployment plan once hosting targets are chosen.