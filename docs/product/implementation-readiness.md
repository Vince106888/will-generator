# Implementation Readiness Checklist

Date: 2026-03-25
Source of truth: `design/pencil-new.pen`

## What Is Ready
- Final Pencil canvas with AI drafting, structured flow, review/output, support/trust, and mobile
- Implementation parity pages created under `apps/web/src/pages`
- Product docs updated in `docs/product`
 - Design governance docs in `docs/design`

## Design Governance (Must Follow)
- `docs/design/design-source-of-truth.md`
- `docs/design/page-inventory.md`

## Required Validation (Before Coding)
1. Legal review
   - Witness rules and beneficiary restrictions
   - Codicil wording and replacement guidance
   - Kenya-specific disclaimers and guardian guidance
2. Product review
   - Pricing tier copy and witness service claims
   - Privacy claims vs actual storage/security practices
3. Engineering review
   - Final route map
   - API contract ownership and response shapes

## How To Run Tests (Local)
This repo uses `pnpm`. On Windows, you may need Corepack enabled:

1. Enable Corepack
   - `corepack enable`
2. Install dependencies
   - `pnpm install`
3. Run checks
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build`

If your shell blocks scripts, use `cmd` or adjust your PowerShell execution policy.

## Known Environment Issue (This Machine)
`pnpm` and `corepack` were not available via PowerShell or `cmd` in this environment, so lint/test/build were not executed here. Please run the steps above locally to verify.

## Next Implementation Step
Start the frontend build with routing + layout shells, then add page content section-by-section from the Pencil design.
