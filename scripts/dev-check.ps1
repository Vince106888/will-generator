$ErrorActionPreference = "Stop"

Write-Host "Running local validation..."

Write-Host "Generating Prisma client..."
pnpm -C apps/api db:generate

Write-Host "Running migrations..."
pnpm -C apps/api db:migrate

Write-Host "Linting..."
pnpm lint

Write-Host "Testing..."
pnpm test

Write-Host "Building..."
pnpm build

Write-Host "Validation complete."
