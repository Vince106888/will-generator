# Commit Map

This repo was initialized with a small, intentional set of commits to reflect a realistic checkpointed history while preserving the existing product work.

## Commit Sequence

1. `chore(repo): bootstrap workspace and ignore rules`
   - Adds pnpm workspace files, lint/prettier config, and baseline repo hygiene.

2. `feat(api): add will API and data model`
   - Introduces the Express API, engines, tests, and Prisma schema.

3. `feat(web): add drafting UI and marketing flow`
   - Adds the Vite/React UI, drafting flow pages, and design exports.

4. `docs(readme): add comprehensive project overview`
   - Provides a senior-level README describing product purpose and architecture.

5. `docs(project): add audits and product documentation`
   - Adds repo audit, product state, roadmap, devops plan, and deployment notes.

6. `ci(github): refine CI and add repo templates`
   - Updates CI workflow and adds PR/issue templates.

7. `docs(eng): add commit map and bootstrap summary`
   - Records the commit rationale and bootstrap summary.

## Why This Split

- Separate commits for API and web clarify ownership and allow isolated rollbacks.
- Repo hygiene and CI are tracked independently to keep ops changes clean.
- Documentation is grouped by intent: product + engineering vs. bootstrap summary.