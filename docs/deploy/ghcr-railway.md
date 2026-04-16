# GHCR -> Railway Deploys

## Deployable services
- `api` (Node/Express, Prisma) -> container `ghcr.io/Vince106888/will-generator/api`
- `web` (Vite SPA) -> container `ghcr.io/Vince106888/will-generator/web`

## Image tags
- `latest`
- `sha-<commit>` (full commit SHA)

## GitHub Actions
Workflow: `.github/workflows/ghcr-images.yml`
- Builds on pushes to `main` and on manual dispatch.
- Pushes both images to GHCR with `latest` and `sha-<commit>` tags.
- Permissions: `packages:write` (already set in the workflow).

## GitHub secrets / vars
No custom secrets are required for GHCR pushes.
- Uses built-in `GITHUB_TOKEN` with `packages:write`.

## Railway setup (per service)
1. Create a Railway service from a container image.
2. Image: `ghcr.io/Vince106888/will-generator/api` or `ghcr.io/Vince106888/will-generator/web`.
3. Tag: `latest` or a specific `sha-<commit>`.
4. Configure environment variables (see below).

## Railway Postgres
1. Add a Railway Postgres plugin to the project.
2. Copy the generated connection string as `DATABASE_URL` for the API service.

## Migrations (production)
Run this once per deploy on the API service:
`pnpm -C apps/api db:migrate`

## Railway deploy order (exact)
1. Create Railway Postgres.
2. Set `DATABASE_URL` on the API service.
3. Configure API service from GHCR image:
   - `ghcr.io/Vince106888/will-generator/api:latest` or `ghcr.io/Vince106888/will-generator/api:sha-<commit>`
4. Set API env vars (see below).
5. Run migration command: `pnpm -C apps/api db:migrate`
6. Configure web service from GHCR image:
   - `ghcr.io/Vince106888/will-generator/web:latest` or `ghcr.io/Vince106888/will-generator/web:sha-<commit>`
7. Set web env vars (see below).
8. Verify health: API `/health`, web loads and can call API.

## Health verification
- API: `GET /health` returns 200 and `db: ok`.
- Web: loads at the Railway URL and can call the API (check browser network for 200s).

## Rollback (safe)
1. Re-deploy the previous known-good `sha-<commit>` image tag in Railway.
2. If a migration introduced incompatibility, roll back the app first, then assess schema changes.
3. Avoid down-migrations in production unless explicitly planned.

## Required secrets / env vars
GitHub Actions (GHCR push):
- None (uses `GITHUB_TOKEN`).

GHCR pull (Railway):
- `GHCR_USERNAME` (GitHub username or org)
- `GHCR_TOKEN` (GitHub PAT with `read:packages`)

Railway shared / platform:
- `PORT` (Railway sets automatically; do not override)
- `RAILWAY_*` (managed by Railway)

API required:
- `DATABASE_URL`
- `WEB_BASE_URL` (public web URL)
- AI (required):
  - AI is required for production; do not disable.
  - `AI_ASSIST_ENABLED=true`
  - `AI_PROVIDER=azure`
  - `AZURE_MODEL_CONFIG` (JSON string)
  - `AI_CONFIDENCE_THRESHOLD`
- SMTP (pending real provider setup; placeholders until ready):
  - `SMTP_HOST=smtp.example.com`
  - `SMTP_PORT=587`
  - `SMTP_USER=change-me`
  - `SMTP_PASS=change-me`
  - `SMTP_SECURE=false`
  - `EMAIL_FROM=no-reply@example.com`
  - `EMAIL_FROM_NAME=Esheria Wills`
  - `EMAIL_REPLY_TO=support@example.com`

Web required:
- `VITE_API_BASE_URL` (set to the public API URL, e.g. `https://api.<railway-domain>`)
  - Note: if unset, the app uses same-origin in production, which is incorrect when web/API are separate Railway services.

## Env alignment note
Use `.env.example` as the canonical list for API env vars; this doc only highlights required production keys.

## Already handled (GitHub)
- GHCR image build/push workflow configured.
- GHCR pushes use the built-in `GITHUB_TOKEN`.

## Manual follow-ups (cannot be auto-created safely)
- Set `GHCR_USERNAME` and `GHCR_TOKEN` in Railway for private image pulls.
- Attach Railway Postgres and set `DATABASE_URL` on API service.
- Replace SMTP placeholders with real provider credentials.
- Confirm public API URL and set `VITE_API_BASE_URL` on the web service.
