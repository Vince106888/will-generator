# Deployment Notes

## Current State

- No automated deployment workflows.
- Web app is Vite-based and can be built as static assets.
- API is a Node/Express service with Prisma/PostgreSQL.

## Suggested Deployment Shape (When Ready)

- Web: static hosting (Vercel, Netlify, or CDN-backed host).
- API: Node service (Render, Railway, Fly.io, or containerized VM).
- Database: Managed PostgreSQL.

## Alternate Deployment Shape (Single Service)

- API serves the built web assets when `apps/web/dist` is present.
- Use this only when deploying both packages together (monorepo build).

## Required Environment Variables

- `DATABASE_URL` (API)
- `API_PORT` (API)
- `PORT` (API, Railway-injected; API uses this when present)
- `OUTPUT_DIR` (API)
- `VITE_API_BASE_URL` (Web)
 - `AI_ASSIST_ENABLED` (API)
 - `AI_PROVIDER` (API, must be `azure`)
 - `AZURE_MODEL_CONFIG` (API, required when AI assist is enabled)
 - `AI_ALLOW_LOCAL_STUB` (API, keep `false` in hosted environments)
 - `SERVE_WEB` (API, set `true` to serve web build from API)
 - `WEB_DIST_DIR` (API, optional override for web build path)

## Next Steps

- Decide hosting providers.
- Add staging deploy pipeline and secrets.
- Add migration/seed workflow for Prisma.

## Railway Notes

- Build commands
  - API: `pnpm -C apps/api build`
  - API (serve web from API): `pnpm -C apps/api build && pnpm -C apps/web build`
  - Web: `pnpm -C apps/web build`
- Start commands
  - API: `pnpm -C apps/api start` (serves web if `SERVE_WEB=true`)
  - Web: `pnpm -C apps/web preview --host`
- Migrations (release phase)
  - `pnpm -C apps/api db:migrate`
- Storage
  - `OUTPUT_DIR` must point to a writable location. Railway ephemeral storage is acceptable for MVP PDF outputs; document persistence expectations for production.

## Staging Hosting Readiness (post AI routing fix)

- **Required env vars**
  - API: `DATABASE_URL`, `API_PORT`, `OUTPUT_DIR`, `AI_ASSIST_ENABLED`, `AI_PROVIDER`, `AZURE_MODEL_CONFIG`
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
