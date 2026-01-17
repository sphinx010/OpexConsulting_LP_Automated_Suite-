const fs = require("fs");
const path = require("path");

const mochawesomePath = path.join("cypress", "reports", "mochawesome.json");
const outDir = path.join("dashboard", "data");
const outFile = path.join(outDir, "runs.json");

fs.mkdirSync(outDir, { recursive: true });

function safeReadJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return null;
  }
}

const report = safeReadJSON(mochawesomePath);

const now = new Date().toISOString();
const sha = process.env.GITHUB_SHA || "local";
const runId = process.env.GITHUB_RUN_ID || "local";
const repo = process.env.GITHUB_REPOSITORY || "local";

const runUrl =
  repo !== "local" && runId !== "local"
    ? `https://github.com/${repo}/actions/runs/${runId}`
    : null;

let stats = {
  tests: 0,
  passes: 0,
  failures: 0,
  pending: 0,
  skipped: 0,
  duration: 0,
};

if (report && report.stats) {
  stats = {
    tests: report.stats.tests ?? 0,
    passes: report.stats.passes ?? 0,
    failures: report.stats.failures ?? 0,
    pending: report.stats.pending ?? 0,
    skipped: report.stats.skipped ?? 0,
    duration: report.stats.duration ?? 0,
  };
}

const passRate = stats.tests > 0 ? Math.round((stats.passes / stats.tests) * 1000) / 10 : 0;

const entry = {
  ts: now,
  sha,
  runId,
  runUrl,
  ...stats,
  passRate,
};

let history = [];
if (fs.existsSync(outFile)) {
  const existing = safeReadJSON(outFile);
  if (Array.isArray(existing)) history = existing;
}

history.push(entry);

// keep last 60 runs (enough for trends)
history = history.slice(-60);

fs.writeFileSync(outFile, JSON.stringify(history, null, 2), "utf8");

console.log("✅ Metrics appended:", entry);
console.log("✅ History written to:", outFile);
