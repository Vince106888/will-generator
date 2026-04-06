$ErrorActionPreference = "Stop"

Write-Host "Resetting Esheria Wills local containers and volumes..."
docker compose down -v

Write-Host "Clearing local API output directory..."
if (Test-Path "storage") {
  Remove-Item -Recurse -Force "storage"
}
