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
  "SYMPHONY_SOURCE_REPO_URL",
  "SYMPHONY_CODEX_COMMAND",
];

const envOptional = [
  "SYMPHONY_WORKSPACE_ROOT",
  "SYMPHONY_RUNTIME_ROOT",
];

const expectedProjectSlug = "esheria-wills-cf36a69caf55";

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

const workflowPath = "WORKFLOW.symphony.md";
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
