# Local Test Readiness (April 2026)

This guide is the fastest way to run Esheria Wills locally for pilot-style testing.

## Required Environment Variables

Root `.env` (API + services):
- `DATABASE_URL` (required)
  - Local default: `postgresql://postgres:postgres@localhost:5432/esheria_wills`
- `API_PORT` (default `4000`)
- `OUTPUT_DIR` (default `./storage`)
- `WEB_BASE_URL` (default `http://localhost:5173`)
- Docker compose pins `OUTPUT_DIR=/app/storage` to keep PDF output in the named volume.
- `AI_ASSIST_ENABLED` (keep `false` for local testing)
- `AI_ALLOW_LOCAL_STUB` (keep `false` unless explicitly testing local stub paths)
- `AZURE_MODEL_CONFIG` (required only if AI assist is enabled)

Web `apps/web/.env`:
- `VITE_API_BASE_URL` (default `http://localhost:4000`)

Email configuration is optional for local testing. If email is not configured, resume link requests still return a usable link in the API response.

Note: if `apps/api/.env` exists, it is loaded first when running `pnpm -C apps/api ...`. Keep it aligned with the root `.env` or remove it to avoid port mismatches.

## AI Assist Local Verification (Optional)

To exercise the AI extraction UI locally:

- Set `AI_ASSIST_ENABLED=true`
- Use one of:
  - `AI_PROVIDER=local_stub` + `AI_ALLOW_LOCAL_STUB=true` for deterministic local output, or
  - `AI_PROVIDER=azure` with a valid `AZURE_MODEL_CONFIG`

## Docker Path (Fastest)

1. Copy envs
   - `.env.example` -> `.env`
   - `apps/web/.env.example` -> `apps/web/.env`
2. Start stack
   - `pnpm dev:up`
   - This runs the Docker compose stack with a one-shot `migrate` service (non-interactive).
3. Open
   - Web: `http://localhost:5173`
   - API: `http://localhost:4000`

## Non-Docker Path (Local Postgres)

1. Start Postgres locally and set `DATABASE_URL` in `.env`.
   - Ensure the database exists (example: `createdb esheria_wills`).
2. Install dependencies
   - `pnpm dev:up:local`
5. Open
   - Web: `http://localhost:5173`
   - API: `http://localhost:4000`

## Stop/Reset Helpers

- Stop containers: `pnpm dev:down`
- Reset containers + volumes: `pnpm dev:reset`

## Validation Command

- `pnpm dev:check`

## Migration Notes

- `pnpm -C apps/api db:migrate` runs `prisma migrate deploy` (non-interactive, deterministic).
- Docker compose already runs migrations via the `migrate` service; only run the command manually for non-Docker workflows.
- Use `pnpm -C apps/api db:migrate:dev` only when creating new migrations.

## Sample Scenarios (Run First)

- Simple will flow: one executor, two beneficiaries, no minors, 2-3 assets.
- Minors flow: has minors with a guardian and backup guardian.
- Complex flow: multiple households, foreign asset, special wishes, multiple assets with allocations.
- Resume flow: save, request resume link, reopen link to verify session restore.
- Finalize/PDF flow: generate draft, download PDF, review output structure.
- Advocate request flow: submit advocate review request after draft generation.
- Email-missing-config behavior: request resume link without SMTP; verify link is returned in API response.
- Invalid/missing session behavior: clear localStorage and reopen review to confirm new session is created.
