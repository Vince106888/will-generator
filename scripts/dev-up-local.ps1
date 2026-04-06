$ErrorActionPreference = "Stop"

Write-Host "Starting Esheria Wills (local Postgres)..."

Write-Host "Installing dependencies..."
pnpm install

Write-Host "Generating Prisma client..."
pnpm -C apps/api db:generate

Write-Host "Running migrations..."
pnpm -C apps/api db:migrate

Write-Host "Starting API + Web..."
pnpm dev
