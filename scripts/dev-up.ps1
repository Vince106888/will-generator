$ErrorActionPreference = "Stop"

Write-Host "Starting Esheria Wills (Docker-first)..."

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker is not available. Use: pnpm dev:up:local"
  exit 1
}

Write-Host "Bringing up database container..."
docker compose up -d db

Write-Host "Generating Prisma client..."
pnpm -C apps/api db:generate

Write-Host "Running migrations..."
pnpm -C apps/api db:migrate

Write-Host "Starting API + Web..."
docker compose up api web
