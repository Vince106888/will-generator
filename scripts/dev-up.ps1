$ErrorActionPreference = "Stop"

Write-Host "Starting Esheria Wills (Docker-first)..."

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker is not available. Use: pnpm dev:up:local"
  exit 1
}

Write-Host "Starting container stack (db, migrate, api, web)..."
docker compose up --build
