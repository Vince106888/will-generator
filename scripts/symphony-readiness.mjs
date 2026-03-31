import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const rootChecks = [
  { path: "WORKFLOW.symphony.md", description: "Repo-specific Symphony workflow file" },
  { path: "WORKFLOW.md", description: "Process policy workflow file" },
  { path: "docs/SYMPHONY_SETUP.md", description: "Operator setup guide" },
  { path: "scripts/start-symphony.ps1", description: "Windows Symphony launcher" },
];

const envRequired = [
  "LINEAR_API_KEY",
  "GITHUB_TOKEN",
  "SYMPHONY_SOURCE_REPO_URL",
  "SYMPHONY_CODEX_COMMAND",
];

const envOptional = [
  "SYMPHONY_WORKSPACE_ROOT",
  "SYMPHONY_RUNTIME_ROOT",
];

const expectedProjectSlug = "esheria-wills-cf36a69caf55";
const workflowPath = "WORKFLOW.symphony.md";

const extractFrontMatter = (text) => {
  if (!text.startsWith("---")) return null;
  const endIndex = text.indexOf("\n---", 3);
  if (endIndex === -1) return null;
  return text.slice(3, endIndex).trim();
};

const parseListAfterKey = (lines, startIndex) => {
  const items = [];
  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.startsWith("    - ") && !line.startsWith("  - ")) {
      if (line.trim() === "") continue;
      break;
    }
    items.push(line.replace(/^\s*-\s*/, "").trim());
  }
  return items;
};

const parseWorkflowConfig = (text) => {
  const frontMatter = extractFrontMatter(text);
  if (!frontMatter) return null;
  const lines = frontMatter.split(/\r?\n/);
  const config = {
    projectSlug: null,
    activeStates: [],
    terminalStates: [],
    maxConcurrentAgents: null,
    pollIntervalMs: null,
    codexReadTimeoutMs: null
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();
    if (trimmed.startsWith("project_slug:")) {
      config.projectSlug = trimmed.split(":").slice(1).join(":").trim().replace(/"/g, "");
    }
    if (trimmed.startsWith("active_states:")) {
      config.activeStates = parseListAfterKey(lines, i);
    }
    if (trimmed.startsWith("terminal_states:")) {
      config.terminalStates = parseListAfterKey(lines, i);
    }
    if (trimmed.startsWith("max_concurrent_agents:")) {
      const raw = trimmed.split(":").slice(1).join(":").trim();
      config.maxConcurrentAgents = Number(raw);
    }
    if (trimmed.startsWith("interval_ms:")) {
      const raw = trimmed.split(":").slice(1).join(":").trim();
      config.pollIntervalMs = Number(raw);
    }
    if (trimmed.startsWith("read_timeout_ms:")) {
      const raw = trimmed.split(":").slice(1).join(":").trim();
      config.codexReadTimeoutMs = Number(raw);
    }
  }

  return config;
};

const checkCommand = (cmd) => {
  try {
    execSync(cmd, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const commandExists = (name) => {
  const probe = process.platform === "win32" ? `where.exe ${name}` : `which ${name}`;
  return checkCommand(probe);
};

const runCommand = (cmd) => {
  try {
    return {
      ok: true,
      output: execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim()
    };
  } catch (error) {
    return {
      ok: false,
      output: error?.stderr?.toString().trim() || error?.stdout?.toString().trim() || ""
    };
  }
};

let ok = true;

console.log("Symphony readiness check");
console.log("");

for (const check of rootChecks) {
  const exists = existsSync(check.path);
  console.log(`${exists ? "OK" : "MISSING"} ${check.path} - ${check.description}`);
  if (!exists) ok = false;
}

const envExample = ".env.example";
if (existsSync(envExample)) {
  const envText = readFileSync(envExample, "utf8");
  const missingRequired = envRequired.filter((key) => !envText.includes(key));
  const missingOptional = envOptional.filter((key) => !envText.includes(key));

  if (missingRequired.length === 0) {
    console.log("OK .env.example includes required Symphony/Linear placeholders");
  } else {
    console.log(`MISSING .env.example placeholders: ${missingRequired.join(", ")}`);
    ok = false;
  }

  if (missingOptional.length > 0) {
    console.log(`WARN .env.example missing optional placeholders: ${missingOptional.join(", ")}`);
  }

  if (envText.includes(`SYMPHONY_LINEAR_PROJECT_SLUG=${expectedProjectSlug}`)) {
    console.log(`OK .env.example uses current Linear project slug (${expectedProjectSlug})`);
  } else {
    console.log(`WARN .env.example should include SYMPHONY_LINEAR_PROJECT_SLUG=${expectedProjectSlug}`);
  }
} else {
  console.log("MISSING .env.example");
  ok = false;
}

if (existsSync(workflowPath)) {
  const workflowText = readFileSync(workflowPath, "utf8");
  const hasFrontMatter = workflowText.startsWith("---");
  const hasTracker = workflowText.includes("tracker:");
  const hasCodex = workflowText.includes("codex:");
  const hasHooks = workflowText.includes("hooks:");
  const hasPrompt = workflowText.includes("Issue context:");

  if (!hasFrontMatter || !hasTracker || !hasCodex || !hasHooks) {
    console.log("MISSING WORKFLOW.symphony.md sections: verify YAML front matter and required keys.");
    ok = false;
  }

  if (!hasPrompt) {
    console.log("WARN WORKFLOW.symphony.md missing prompt section label (Issue context)");
  }

  const workflowConfig = parseWorkflowConfig(workflowText);
  if (workflowConfig) {
    console.log("");
    console.log("Workflow config summary");
    console.log(`- project_slug: ${workflowConfig.projectSlug || "UNKNOWN"}`);
    console.log(`- active_states: ${workflowConfig.activeStates.join(", ") || "UNKNOWN"}`);
    console.log(`- terminal_states: ${workflowConfig.terminalStates.join(", ") || "UNKNOWN"}`);
    console.log(`- max_concurrent_agents: ${Number.isFinite(workflowConfig.maxConcurrentAgents) ? workflowConfig.maxConcurrentAgents : "UNKNOWN"}`);
    console.log(`- polling.interval_ms: ${Number.isFinite(workflowConfig.pollIntervalMs) ? workflowConfig.pollIntervalMs : "UNKNOWN"}`);
    console.log(`- codex.read_timeout_ms: ${Number.isFinite(workflowConfig.codexReadTimeoutMs) ? workflowConfig.codexReadTimeoutMs : "UNKNOWN"}`);

    if (workflowConfig.projectSlug && workflowConfig.projectSlug !== expectedProjectSlug) {
      console.log(`WARN workflow project slug differs from expected (${expectedProjectSlug}).`);
    }
    if (!workflowConfig.activeStates.includes("Todo")) {
      console.log("WARN workflow active_states does not include Todo.");
    }
    if (!workflowConfig.terminalStates.includes("In Review")) {
      console.log("WARN workflow terminal_states does not include In Review.");
    }
  } else {
    console.log("WARN unable to parse WORKFLOW.symphony.md front matter for config summary.");
  }
}

const codexOk = commandExists("codex");
console.log(`${codexOk ? "OK" : "WARN"} codex executable in PATH`);

if (process.platform === "win32") {
  const shOk = commandExists("sh");
  const bashOk = commandExists("bash");
  const escriptOk = commandExists("escript");
  console.log(`${shOk ? "OK" : "WARN"} sh in PATH`);
  console.log(`${bashOk ? "OK" : "WARN"} bash in PATH`);
  console.log(`${escriptOk ? "OK" : "WARN"} escript in PATH`);

  const codexBash = runCommand("bash -lc \"codex app-server --help\"");
  if (codexBash.ok) {
    console.log("OK codex app-server runnable through bash");
  } else if (codexOk) {
    console.log("WARN codex found, but codex app-server did not run successfully through bash");
  }
}

const elixirOk = commandExists("elixir");
const mixOk = commandExists("mix");
const miseOk = commandExists("mise");
console.log(`${elixirOk ? "OK" : "WARN"} elixir in PATH`);
console.log(`${mixOk ? "OK" : "WARN"} mix in PATH`);
console.log(`${miseOk ? "OK" : "WARN"} mise in PATH`);

console.log("");
if (ok) {
  console.log("Readiness: repo-side scaffolding looks complete.");
  console.log("Next: install runtime prerequisites and configure Linear creds.");
} else {
  console.log("Readiness: repo-side scaffolding is incomplete.");
  process.exit(1);
}
