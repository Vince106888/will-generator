# Deployment Notes

## Current State

- No automated deployment workflows.
- Web app is Vite-based and can be built as static assets.
- API is a Node/Express service with Prisma/PostgreSQL.

## Suggested Deployment Shape (When Ready)

- Web: static hosting (Vercel, Netlify, or CDN-backed host).
- API: Node service (Render, Railway, Fly.io, or containerized VM).
- Database: Managed PostgreSQL.

## Required Environment Variables

- `DATABASE_URL` (API)
- `API_PORT` (API)
- `OUTPUT_DIR` (API)
- `VITE_API_BASE_URL` (Web)

## Next Steps

- Decide hosting providers.
- Add staging deploy pipeline and secrets.
- Add migration/seed workflow for Prisma.

## Staging Hosting Readiness (post AI routing fix)

- **Required env vars**
  - API: `DATABASE_URL`, `API_PORT`, `OUTPUT_DIR`, `AI_PROVIDER`, `AZURE_MODEL_CONFIG`
  - Web: `VITE_API_BASE_URL`
- **DB requirement**
  - PostgreSQL reachable from API runtime (draft sessions + AI interaction persistence depend on DB connectivity).
- **Bootstrap / migration commands**
  - `pnpm -C apps/api db:generate`
  - `pnpm -C apps/api db:migrate`
- **Start commands (test hosting parity)**
  - API: `pnpm -C apps/api dev` (or `pnpm -C apps/api start` after build)
  - Web: `pnpm -C apps/web dev` (or static build/preview via `pnpm -C apps/web build && pnpm -C apps/web preview`)
- **Readiness status**
  - AI flow routing guard regression fixed and locally verified.
  - Ready for staging/test-hosting pass once environment + DB are healthy.