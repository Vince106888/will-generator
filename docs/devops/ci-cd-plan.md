# CI/CD Plan

## Current Workflows

- `ci.yml`
  - Runs on pull requests and pushes.
  - Installs dependencies with pnpm.
  - Runs lint, test, and build.

## What It Validates Today

- Code quality via ESLint for both apps.
- API tests via Jest.
- Web tests via Vitest.
- Build readiness for API and web.

## Secrets Needed Later

- `DATABASE_URL` for staging/production environments.
- Any hosting provider tokens (e.g., Vercel, Render, Railway) once chosen.
- Optional: `SENTRY_DSN`, email provider keys, or audit logging credentials.

## Manual Steps Still Required

- Provision PostgreSQL for staging/production.
- Decide hosting targets for API and web.
- Configure domain + TLS.
- Decide data retention and backup policy.

## Maturation Path

1. Add a staging deploy workflow once hosting is selected.
2. Introduce a production deploy workflow with approval gates.
3. Add database migration steps for Prisma.
4. Add smoke tests against staging before production deploy.
5. Add observability (logging, error tracking, uptime checks).