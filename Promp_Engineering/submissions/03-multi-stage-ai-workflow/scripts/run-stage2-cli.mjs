#!/usr/bin/env node
// Stage 2 of the Multi-Stage AI Pipeline: invokes the REAL Claude Code CLI headlessly
// to generate files, validates/tests them locally, then POSTs the result to the
// n8n "Stage 2 CLI Result" webhook (workflow/multi-stage-ai-workflow.json).
//
// Usage:
//   node scripts/run-stage2-cli.mjs \
//     --task-id task-abc123 \
//     --task-description "Add a Node.js CLI that validates a JSON file against a JSON schema" \
//     --target-runtime "Node.js" \
//     --plan-file path/to/plan.json \
//     --out-dir generated-output/sample-project \
//     [--webhook-url https://<your-n8n>/webhook/stage2-cli-result] \
//     [--max-attempts 2]
//
// Without --webhook-url the payload is written to evidence/stage-2-cli/webhook-payload.json
// (dry run) instead of being POSTed.

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = { maxAttempts: 2 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}

function listFilesRecursive(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...listFilesRecursive(full, base));
    } else {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

function syntaxCheck(outDir, relPath) {
  const full = path.join(outDir, relPath);
  const ext = path.extname(relPath);
  try {
    if (ext === ".js" || ext === ".mjs" || ext === ".cjs") {
      const r = spawnSync("node", ["--check", full], { encoding: "utf8" });
      return { checked: true, ok: r.status === 0, output: r.stderr || r.stdout };
    }
    if (ext === ".sh") {
      const r = spawnSync("bash", ["-n", full], { encoding: "utf8" });
      return { checked: true, ok: r.status === 0, output: r.stderr || r.stdout };
    }
    if (ext === ".py") {
      const r = spawnSync("python3", ["-m", "py_compile", full], { encoding: "utf8" });
      if (r.error) return { checked: false, ok: true, output: "python3 not available, skipped" };
      return { checked: true, ok: r.status === 0, output: r.stderr || r.stdout };
    }
    if (ext === ".json") {
      JSON.parse(readFileSync(full, "utf8"));
      return { checked: true, ok: true, output: "" };
    }
    return { checked: false, ok: true, output: "no syntax checker for " + ext + ", skipped" };
  } catch (e) {
    return { checked: true, ok: false, output: String(e.message || e) };
  }
}

function runValidation(outDir) {
  const files = listFilesRecursive(outDir);
  const checkResults = files.map((f) => ({ file: f, ...syntaxCheck(outDir, f) }));
  const syntaxOk = checkResults.every((r) => r.ok);
  const syntaxSummary = checkResults
    .map((r) => `${r.file}: ${r.checked ? (r.ok ? "OK" : "FAIL") : "SKIPPED"}${r.output ? " - " + r.output.trim() : ""}`)
    .join("\n");

  let testsRun = false;
  let testsPassed = true;
  let testOutput = "No package.json with a test script found - only syntax checks were performed (see above).";

  const pkgPath = path.join(outDir, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      if (pkg.scripts && pkg.scripts.test && pkg.scripts.test !== 'echo "Error: no test specified" && exit 1') {
        testsRun = true;
        const install = spawnSync("npm", ["install", "--no-audit", "--no-fund"], { cwd: outDir, encoding: "utf8" });
        const test = spawnSync("npm", ["test", "--silent"], { cwd: outDir, encoding: "utf8" });
        testsPassed = test.status === 0;
        testOutput = "npm install:\n" + (install.stdout + install.stderr).slice(-2000) +
          "\n\nnpm test:\n" + (test.stdout + test.stderr).slice(-4000);
      }
    } catch (e) {
      testsRun = true;
      testsPassed = false;
      testOutput = "Failed to parse/run package.json test script: " + e.message;
    }
  }

  return {
    syntaxOk,
    testsRun,
    testsPassed,
    testOutput: "Syntax checks:\n" + syntaxSummary + "\n\nTests:\n" + testOutput,
    files,
  };
}

function generateOnce(prompt, outDir) {
  mkdirSync(outDir, { recursive: true });
  const start = Date.now();
  const result = spawnSync(
    "claude",
    ["-p", prompt, "--permission-mode", "acceptEdits", "--output-format", "text"],
    { cwd: outDir, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  const durationMs = Date.now() - start;
  return {
    durationMs,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    status: result.status,
    error: result.error ? String(result.error.message || result.error) : null,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const outDir = path.resolve(repoRoot, args.outDir || "generated-output/sample-project");
  const evidenceDir = path.resolve(repoRoot, "evidence/stage-2-cli");
  mkdirSync(evidenceDir, { recursive: true });

  const taskId = args.taskId || "task-" + Date.now().toString(36);
  const taskDescription = args.taskDescription || "";
  const targetRuntime = args.targetRuntime || "";
  let plan = {};
  if (args.planFile) {
    plan = JSON.parse(readFileSync(path.resolve(args.planFile), "utf8"));
  }

  const basePrompt = [
    "You are acting as Stage 2 of a two-stage AI pipeline: a CLI-based code generator.",
    "Stage 1 (a real AI-enabled IDE session) already produced the integration plan below.",
    "Write complete, runnable files directly into the current working directory that implement this plan.",
    "",
    `Task: ${taskDescription}`,
    `Target runtime: ${targetRuntime}`,
    `Integration plan (JSON from Stage 1): ${JSON.stringify(plan)}`,
    "",
    "Requirements:",
    "- Create real files on disk (do not just print code).",
    "- Include a minimal but real automated test if the target runtime supports one cheaply (e.g. a package.json with a \"test\" script for Node.js).",
    "- Keep the implementation small and focused on the task - do not scaffold unrelated infrastructure.",
    "- When you are done, print exactly one line of the form:",
    "  RESULT_JSON:{\"commitMessage\":\"<short commit message>\"}",
  ].join("\n");

  const maxAttempts = Number(args.maxAttempts) || 2;
  let attempt = 0;
  let generation, validation;
  let failureNote = "";

  while (attempt < maxAttempts) {
    attempt++;
    const prompt = failureNote ? basePrompt + "\n\nPrevious attempt failed validation:\n" + failureNote + "\nFix the issue and regenerate the files." : basePrompt;
    generation = generateOnce(prompt, outDir);
    validation = runValidation(outDir);
    if (validation.syntaxOk && validation.testsPassed) break;
    failureNote = validation.testOutput;
  }

  const commitMatch = (generation.stdout || "").match(/RESULT_JSON:(\{.*\})/);
  let commitMessage = `Add generated files for ${taskId}`;
  if (commitMatch) {
    try {
      commitMessage = JSON.parse(commitMatch[1]).commitMessage || commitMessage;
    } catch { /* keep default */ }
  }

  const files = validation.files.map((relPath) => ({
    path: relPath,
    content: readFileSync(path.join(outDir, relPath), "utf8"),
    description: "",
  }));

  const payload = {
    taskId,
    taskDescription,
    targetRuntime,
    files,
    commitMessage,
    validation: {
      syntaxOk: validation.syntaxOk,
      testsRun: validation.testsRun,
      testsPassed: validation.testsPassed,
      testOutput: validation.testOutput,
      attempts: attempt,
      cliTool: "claude-code-cli",
      cliDurationMs: generation.durationMs,
    },
  };

  const logPath = path.join(evidenceDir, `run-${taskId}.log`);
  writeFileSync(
    logPath,
    [
      `Task ID: ${taskId}`,
      `Attempts: ${attempt}`,
      `CLI duration (last attempt, ms): ${generation.durationMs}`,
      `CLI exit status: ${generation.status}`,
      generation.error ? `CLI spawn error: ${generation.error}` : "",
      "",
      "--- claude stdout ---",
      generation.stdout,
      "--- claude stderr ---",
      generation.stderr,
      "",
      "--- validation ---",
      validation.testOutput,
    ].join("\n")
  );

  const payloadPath = path.join(evidenceDir, `webhook-payload-${taskId}.json`);
  writeFileSync(payloadPath, JSON.stringify(payload, null, 2));

  console.log(`Stage 2 CLI run complete for ${taskId}`);
  console.log(`  attempts: ${attempt}, syntaxOk: ${validation.syntaxOk}, testsRun: ${validation.testsRun}, testsPassed: ${validation.testsPassed}`);
  console.log(`  generated files: ${files.map((f) => f.path).join(", ") || "(none)"}`);
  console.log(`  log: ${path.relative(repoRoot, logPath)}`);
  console.log(`  payload: ${path.relative(repoRoot, payloadPath)}`);

  if (args.webhookUrl && typeof args.webhookUrl === "string") {
    const res = await fetch(args.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    console.log(`  POSTed to webhook, status ${res.status}: ${text}`);
  } else {
    console.log("  --webhook-url not provided: dry run only, payload was NOT sent to n8n.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
