Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $repoRoot ".env"
$workflowPath = Join-Path $repoRoot "WORKFLOW.symphony.md"
$defaultRuntimeRoot = "C:\\Users\\HP\\work\\esherialabs\\esheria-opssec\\tooling\\symphony\\elixir"
$defaultWorkspaceRoot = "C:\\symphony-workspaces"
$defaultCodexCommand = "codex app-server"
$defaultLogRoot = Join-Path $repoRoot "logs\\symphony"
$requiredEnvKeys = @(
  "LINEAR_API_KEY",
  "GITHUB_TOKEN",
  "SYMPHONY_SOURCE_REPO_URL"
)
$gitUsrBin = "C:\\Program Files\\Git\\usr\\bin"

function Write-Step {
  param([string]$Message)
  Write-Host "[symphony:start] $Message"
}

function Get-WorkflowSummary {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    return $null
  }

  $content = Get-Content $Path -Raw
  if (-not $content.StartsWith("---")) {
    return $null
  }

  $endIndex = $content.IndexOf("`n---", 3)
  if ($endIndex -lt 0) {
    return $null
  }

  $frontMatter = $content.Substring(3, $endIndex - 3)
  $lines = $frontMatter -split "`r?`n"
  $summary = [ordered]@{
    ProjectSlug = $null
    ActiveStates = @()
    TerminalStates = @()
    MaxConcurrentAgents = $null
    PollIntervalMs = $null
  }

  for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i].Trim()
    if ($line -like "project_slug:*") {
      $summary.ProjectSlug = ($line -split ":", 2)[1].Trim().Trim('"')
    }
    if ($line -like "active_states:*") {
      $items = @()
      for ($j = $i + 1; $j -lt $lines.Count; $j++) {
        $candidate = $lines[$j]
        if ($candidate -notmatch "^\s*-\s+") {
          if ($candidate.Trim() -eq "") { continue }
          break
        }
        $items += ($candidate -replace "^\s*-\s+", "").Trim()
      }
      $summary.ActiveStates = $items
    }
    if ($line -like "terminal_states:*") {
      $items = @()
      for ($j = $i + 1; $j -lt $lines.Count; $j++) {
        $candidate = $lines[$j]
        if ($candidate -notmatch "^\s*-\s+") {
          if ($candidate.Trim() -eq "") { continue }
          break
        }
        $items += ($candidate -replace "^\s*-\s+", "").Trim()
      }
      $summary.TerminalStates = $items
    }
    if ($line -like "max_concurrent_agents:*") {
      $value = ($line -split ":", 2)[1].Trim()
      if ($value -match "^\d+$") {
        $summary.MaxConcurrentAgents = [int]$value
      }
    }
    if ($line -like "interval_ms:*") {
      $value = ($line -split ":", 2)[1].Trim()
      if ($value -match "^\d+$") {
        $summary.PollIntervalMs = [int]$value
      }
    }
  }

  return $summary
}

function Get-CommandPath {
  param([string]$Name)

  $command = Get-Command $Name -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($null -ne $command -and -not [string]::IsNullOrWhiteSpace($command.Source)) {
    return $command.Source
  }

  return $null
}

function Add-PathEntry {
  param([string]$PathEntry)

  if ([string]::IsNullOrWhiteSpace($PathEntry) -or -not (Test-Path $PathEntry)) {
    return
  }

  $pathEntries = ($env:PATH -split ';') | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  if ($pathEntries -contains $PathEntry) {
    return
  }

  $env:PATH = "$PathEntry;$env:PATH"
}

function Import-DotEnv {
  param([string]$Path)

  $loaded = @{}

  foreach ($line in Get-Content $Path) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("#")) {
      continue
    }

    $separatorIndex = $trimmed.IndexOf("=")
    if ($separatorIndex -lt 1) {
      continue
    }

    $key = $trimmed.Substring(0, $separatorIndex).Trim()
    $value = $trimmed.Substring($separatorIndex + 1).Trim()

    if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
      $value = $value.Substring(1, $value.Length - 2)
    }

    [Environment]::SetEnvironmentVariable($key, $value, "Process")
    $loaded[$key] = $value
  }

  return $loaded
}

if (-not (Test-Path $envPath)) {
  throw ".env not found at $envPath. Copy .env.example to .env and fill in the required values first."
}

if (-not (Test-Path $workflowPath)) {
  throw "WORKFLOW.symphony.md not found at $workflowPath."
}

$runtimeRoot = [Environment]::GetEnvironmentVariable("SYMPHONY_RUNTIME_ROOT", "Process")
if ([string]::IsNullOrWhiteSpace($runtimeRoot)) {
  $runtimeRoot = $defaultRuntimeRoot
  [Environment]::SetEnvironmentVariable("SYMPHONY_RUNTIME_ROOT", $runtimeRoot, "Process")
  Write-Step "SYMPHONY_RUNTIME_ROOT not set; defaulting to $runtimeRoot"
}

$launcherPath = Join-Path $runtimeRoot "bin\\symphony"
$logsRoot = $runtimeRoot

if (-not (Test-Path $launcherPath)) {
  throw "Symphony launcher not found at $launcherPath. Ensure the shared runtime is installed."
}

Set-Location $repoRoot
Write-Step "Loading environment from .env"
$loadedEnv = Import-DotEnv -Path $envPath

$missingKeys = @()
foreach ($key in $requiredEnvKeys) {
  $value = [Environment]::GetEnvironmentVariable($key, "Process")
  if ([string]::IsNullOrWhiteSpace($value) -or $value -match "^replace_with_" -or $value -eq "change_me_generate_a_real_secret_here") {
    $missingKeys += $key
  }
}

if ($missingKeys.Count -gt 0) {
  throw "Missing required .env values: $($missingKeys -join ', '). Update .env and rerun."
}

$workspaceRoot = [Environment]::GetEnvironmentVariable("SYMPHONY_WORKSPACE_ROOT", "Process")
if ([string]::IsNullOrWhiteSpace($workspaceRoot)) {
  $workspaceRoot = $defaultWorkspaceRoot
  [Environment]::SetEnvironmentVariable("SYMPHONY_WORKSPACE_ROOT", $workspaceRoot, "Process")
  Write-Step "SYMPHONY_WORKSPACE_ROOT not set; defaulting to $workspaceRoot"
}

if (-not (Test-Path $workspaceRoot)) {
  New-Item -ItemType Directory -Path $workspaceRoot -Force | Out-Null
  Write-Step "Created workspace root at $workspaceRoot"
}

$codexCommand = [Environment]::GetEnvironmentVariable("SYMPHONY_CODEX_COMMAND", "Process")
if ([string]::IsNullOrWhiteSpace($codexCommand) -or $codexCommand -match "^replace_with_") {
  $codexCommand = $defaultCodexCommand
  [Environment]::SetEnvironmentVariable("SYMPHONY_CODEX_COMMAND", $codexCommand, "Process")
  Write-Step "SYMPHONY_CODEX_COMMAND not set; defaulting to '$codexCommand'"
}

if ($codexCommand -eq "cmd /c codex.cmd app-server") {
  Write-Step "Overriding PowerShell-only Codex command with '$defaultCodexCommand' because Symphony launches Codex via bash -lc."
  $codexCommand = $defaultCodexCommand
  [Environment]::SetEnvironmentVariable("SYMPHONY_CODEX_COMMAND", $codexCommand, "Process")
}

if (-not (Get-CommandPath -Name "sh.exe") -or -not (Get-CommandPath -Name "bash.exe")) {
  Add-PathEntry -PathEntry $gitUsrBin
}

$shPath = Get-CommandPath -Name "sh.exe"
$bashPath = Get-CommandPath -Name "bash.exe"

if ([string]::IsNullOrWhiteSpace($shPath)) {
  throw "sh.exe is not available on PATH. Install Git for Windows or add its usr\\bin directory to PATH before starting Symphony."
}

if ([string]::IsNullOrWhiteSpace($bashPath)) {
  throw "bash.exe is not available on PATH. Install Git for Windows or add its usr\\bin directory to PATH before starting Symphony."
}

Write-Step "Using sh from $shPath"
Write-Step "Using bash from $bashPath"

Write-Step "Running readiness check"
& node (Join-Path $repoRoot "scripts\\symphony-readiness.mjs")

if (-not (Test-Path $defaultLogRoot)) {
  New-Item -ItemType Directory -Path $defaultLogRoot -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logFile = Join-Path $defaultLogRoot "symphony-start-$timestamp.log"

$workflowSummary = Get-WorkflowSummary -Path $workflowPath
if ($null -ne $workflowSummary) {
  Write-Step "Workflow summary:"
  Write-Step "  project_slug: $($workflowSummary.ProjectSlug)"
  Write-Step "  active_states: $([string]::Join(', ', $workflowSummary.ActiveStates))"
  Write-Step "  terminal_states: $([string]::Join(', ', $workflowSummary.TerminalStates))"
  Write-Step "  max_concurrent_agents: $($workflowSummary.MaxConcurrentAgents)"
  Write-Step "  polling.interval_ms: $($workflowSummary.PollIntervalMs)"
} else {
  Write-Step "Workflow summary: unable to parse front matter."
}

Write-Step "Starting Symphony"
Write-Step "Workflow: $workflowPath"
Write-Step "Runtime: $runtimeRoot"
Write-Step "Logs: $logsRoot"
Write-Step "Workspace root: $workspaceRoot"
Write-Step "Codex command: $codexCommand"
Write-Step "Session log: $logFile"
Write-Step "Press Ctrl+C to stop Symphony"

try {
  Start-Transcript -Path $logFile -Force | Out-Null
  & escript $launcherPath --i-understand-that-this-will-be-running-without-the-usual-guardrails --logs-root $logsRoot $workflowPath
} finally {
  Stop-Transcript | Out-Null
}
