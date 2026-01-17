const fs = require("fs");
const path = require("path");

const dataFile = path.join("dashboard", "data", "runs.json");
const chartsDir = path.join("dashboard", "charts");
const indexFile = path.join("dashboard", "index.html");

fs.mkdirSync(chartsDir, { recursive: true });

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function lineChartSVG({ title, points, minY, maxY, width = 900, height = 220 }) {
  const padding = 30;
  const w = width - padding * 2;
  const h = height - padding * 2;

  const safeMaxY = maxY === minY ? maxY + 1 : maxY;

  const toX = (i) => padding + (points.length === 1 ? w / 2 : (i / (points.length - 1)) * w);
  const toY = (v) => padding + (1 - (v - minY) / (safeMaxY - minY)) * h;

  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(" ");

  const last = points[points.length - 1] ?? 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="${title}">
  <rect width="100%" height="100%" fill="#0b1220"/>
  <text x="${padding}" y="22" fill="#e5e7eb" font-size="14" font-family="Segoe UI, system-ui, sans-serif">${title}</text>
  <text x="${width - padding}" y="22" fill="#93c5fd" font-size="13" text-anchor="end" font-family="Segoe UI, system-ui, sans-serif">Latest: ${last}</text>

  <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#22304a" />
  <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#22304a" />

  <path d="${d}" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
</svg>`;
}

function barChartFailuresSVG({ title, points, width = 900, height = 220 }) {
  const padding = 30;
  const w = width - padding * 2;
  const h = height - padding * 2;

  const max = Math.max(...points, 1);

  const barW = points.length ? w / points.length : w;

  const rects = points
    .map((v, i) => {
      const barH = (v / max) * h;
      const x = padding + i * barW + barW * 0.15;
      const y = padding + (h - barH);
      const bw = barW * 0.7;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${barH.toFixed(1)}" fill="#fb7185"/>`;
    })
    .join("\n");

  const last = points[points.length - 1] ?? 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="${title}">
  <rect width="100%" height="100%" fill="#0b1220"/>
  <text x="${padding}" y="22" fill="#e5e7eb" font-size="14" font-family="Segoe UI, system-ui, sans-serif">${title}</text>
  <text x="${width - padding}" y="22" fill="#fecaca" font-size="13" text-anchor="end" font-family="Segoe UI, system-ui, sans-serif">Latest: ${last}</text>

  <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#22304a" />
  <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#22304a" />

  ${rects}
</svg>`;
}

if (!fs.existsSync(dataFile)) {
  console.error("❌ runs.json not found. Did generateMetrics.js run?");
  process.exit(1);
}

const runs = readJSON(dataFile);
const lastN = runs.slice(-30);

const passRates = lastN.map((r) => clamp(r.passRate ?? 0, 0, 100));
const durations = lastN.map((r) => Math.round((r.duration ?? 0) / 1000)); // seconds
const failures = lastN.map((r) => r.failures ?? 0);

const passSvg = lineChartSVG({
  title: "Pass rate (last 30 runs) (%)",
  points: passRates,
  minY: 0,
  maxY: 100,
});

const durMin = Math.min(...durations, 0);
const durMax = Math.max(...durations, 1);
const durationSvg = lineChartSVG({
  title: "Duration (last 30 runs) (seconds)",
  points: durations,
  minY: durMin,
  maxY: durMax,
});

const failSvg = barChartFailuresSVG({
  title: "Failures (last 30 runs)",
  points: failures,
});

fs.writeFileSync(path.join(chartsDir, "pass_rate.svg"), passSvg, "utf8");
fs.writeFileSync(path.join(chartsDir, "duration.svg"), durationSvg, "utf8");
fs.writeFileSync(path.join(chartsDir, "failures.svg"), failSvg, "utf8");

const latest = runs[runs.length - 1] || {};
const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Opex Test Analytics Dashboard</title>
  <style>
    body{background:#050a14;color:#e5e7eb;font-family:Segoe UI,system-ui,sans-serif;margin:0;padding:22px}
    .wrap{max-width:980px;margin:0 auto}
    .card{background:#0b1220;border:1px solid #22304a;border-radius:14px;padding:18px;margin:14px 0}
    a{color:#93c5fd}
    .grid{display:grid;grid-template-columns:1fr;gap:14px}
    @media (min-width: 900px){.grid{grid-template-columns:1fr 1fr}}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>📊 Opex Automation Analytics</h1>
    <div class="card">
      <div><b>Latest run</b></div>
      <div>Timestamp: ${latest.ts || "-"}</div>
      <div>Tests: ${latest.tests ?? "-"} | Passes: ${latest.passes ?? "-"} | Failures: ${latest.failures ?? "-"}</div>
      <div>Pass rate: ${latest.passRate ?? "-"}% | Duration: ${Math.round((latest.duration || 0)/1000)}s</div>
      ${latest.runUrl ? `<div>Run: <a href="${latest.runUrl}">${latest.runUrl}</a></div>` : ""}
      <div>SHA: ${latest.sha || "-"}</div>
    </div>

    <div class="grid">
      <div class="card"><img src="charts/pass_rate.svg" style="width:100%"/></div>
      <div class="card"><img src="charts/duration.svg" style="width:100%"/></div>
    </div>

    <div class="card"><img src="charts/failures.svg" style="width:100%"/></div>

    <div class="card">
      <div><b>Raw data</b></div>
      <div><a href="data/runs.json">runs.json</a></div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(indexFile, html, "utf8");

console.log("✅ Charts written to:", chartsDir);
console.log("✅ Dashboard written to:", indexFile);
