# Contributing

Thank you for helping move Esheria Wills forward. This repo is a product codebase and should remain high-signal.

## Ground Rules

- Keep changes scoped and intentional.
- Do not introduce fake features or placeholder claims in docs.
- Prefer small, reviewable pull requests.
- Follow existing architecture and product framing.

## Development Workflow

1. Create a feature branch from `main`.
2. Install dependencies with `pnpm install`.
3. Use `pnpm dev` for local development.
4. Run `pnpm lint` and `pnpm test` before opening a PR.

## Code Style

- TypeScript preferred.
- ESLint + Prettier for formatting.
- Keep domain logic in `apps/api/src/engines` and `apps/api/src/services`.

## Testing Expectations

- API: Jest tests live in `apps/api/tests`.
- Web: Vitest tests live in `apps/web/src/test`.

## Commit Style

Use clear, conventional-style commit prefixes:
- `feat:` new functionality
- `fix:` bug fix
- `docs:` documentation
- `chore:` tooling/repo hygiene
- `ci:` workflows

## Documentation

Update `docs/` for any changes that impact architecture, operations, or product behavior.