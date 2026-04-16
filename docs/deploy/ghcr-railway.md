# GHCR -> Railway Deploys

## Deployable services
- `api` (Node/Express, Prisma) -> container `ghcr.io/<owner>/<repo>/api`
- `web` (Vite SPA) -> container `ghcr.io/<owner>/<repo>/web`

## Image tags
- `latest`
- `sha-<commit>` (full commit SHA)

## GitHub Actions
Workflow: `.github/workflows/ghcr-images.yml`
- Builds on pushes to `main` and on manual dispatch.
- Pushes both images to GHCR with `latest` and `sha-<commit>` tags.

## Railway setup (per service)
1. Create a Railway service from a container image.
2. Image: `ghcr.io/<owner>/<repo>/api` or `ghcr.io/<owner>/<repo>/web`.
3. Tag: `latest` or a specific `sha-<commit>`.
4. Configure environment variables (see below).

## Railway Postgres
1. Add a Railway Postgres plugin to the project.
2. Copy the generated connection string as `DATABASE_URL` for the API service.

## Migrations (production)
Run this once per deploy on the API service:
`pnpm -C apps/api db:migrate`

Recommended deploy order:
1. API: run migration command against the target database.
2. API: deploy container (or set start command to `pnpm -C apps/api start:prod`).
3. Web: deploy container.

## Required secrets / env vars
GHCR pull (Railway):
- `GHCR_USERNAME` (GitHub username or org)
- `GHCR_TOKEN` (GitHub PAT with `read:packages`)

API service:
- `DATABASE_URL`
- `PORT` (Railway sets this automatically; fallback is 4000)
- `WEB_BASE_URL` (public web URL)
- Email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`, `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`
- Optional AI assist (see `.env.example`): `AI_ASSIST_ENABLED`, `AI_PROVIDER`, `AZURE_MODEL_CONFIG`, `AI_CONFIDENCE_THRESHOLD`

Web service:
- `VITE_API_BASE_URL` (public API base URL; if unset the app uses its own origin in production)
