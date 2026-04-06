# Implementation Readiness Checklist

Date: 2026-03-28
Source of truth: `design/pencil-implementation.pen`

## What Is Ready
- Clean Pencil source with active index and realm grouping.
- Route map updated to active-only routes.
- Documentation aligned to the clean design source.

## What Is Not Ready
- Mobile Review frame is missing from the Pencil source.
- Legacy pages still exist in code and must not be used as implementation references.

## Required Validation (Before and During Coding)
1. Legal review
   - Witness rules and beneficiary restrictions
   - Codicil wording and replacement guidance
   - Kenya-specific disclaimers and guardian guidance
2. Product review
   - Pricing tier copy and witness service claims
   - Privacy claims vs actual storage/security practices
3. Engineering review
   - Final route map
   - Realm continuity enforcement
   - API contract ownership and response shapes

## How To Run Tests (Local)
This repo uses `pnpm`. On Windows, you may need Corepack enabled:

1. Enable Corepack
   - `corepack enable`
2. Install dependencies
   - `pnpm install`
3. Generate Prisma client
   - `pnpm -C apps/api db:generate`
4. Run migrations (requires DATABASE_URL)
   - `pnpm -C apps/api db:migrate`
5. Run checks
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build`

If your shell blocks scripts, use `cmd` or adjust your PowerShell execution policy.

## Next Implementation Step
Complete final hardening and release readiness verification.
