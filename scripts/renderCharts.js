/**
 * renderCharts.js
 * - Reads dashboard/data/runs.json
 * - Generates styled SVG charts into dashboard/charts/
 * - Generates dashboard/index.html (simple UI)
 */

const fs = require("fs");
const path = require("path");

const dataFile = path.join("dashboard", "data", "runs.json");
const outChartsDir = path.join("dashboard", "charts");
const outIndex = path.join("dashboard", "index.html");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readRuns() {
  if (!fs.existsSync(dataFile)) return [];
  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatDateShort(iso) {
  try {
    const d = new Date(iso);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}/${dd}`;
  } catch {
    return "";
  }
}

function svgLineChart({
  title,
  subtitle,
  values,
  valueLabel,
  yMinOverride,
  yMaxOverride,
  color,
  accent,
  fileName,
}) {
  const width = 980;
  const height = 360;

  // generous padding for readability
  const padLeft = 68;
  const padRight = 26;
  const padTop = 72;
  const padBottom = 56;

  const bg = "#0b1220";
  const panel = "#0f1a2e";
  const grid = "#22314a";
  const text = "#e5e7eb";
  const muted = "#9ca3af";

  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  const safeValues = values.map((v) => (Number.isFinite(v) ? v : 0));

  const minV = Number.isFinite(yMinOverride)
    ? yMinOverride
    : Math.min(...safeValues, 0);
  const maxV = Number.isFinite(yMaxOverride)
    ? yMaxOverride
    : Math.max(...safeValues, 1);

  // Avoid flatline division by zero
  const span = maxV - minV || 1;

  const xFor = (i) =>
    padLeft + (safeValues.length <= 1 ? 0 : (i / (safeValues.length - 1)) * innerW);
  const yFor = (v) => padTop + (1 - (v - minV) / span) * innerH;

  // Build path + points
  let d = "";
  const points = safeValues.map((v, i) => {
    const x = xFor(i);
    const y = yFor(v);
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    return { x, y, v };
  });

  // Grid lines
  const gridLines = 5;
  let gridSvg = "";
  for (let i = 0; i <= gridLines; i++) {
    const y = padTop + (i / gridLines) * innerH;
    gridSvg += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + innerW}" y2="${y}" stroke="${grid}" stroke-dasharray="5 6" stroke-width="1" />`;
  }

  // Y labels
  let yLabels = "";
  for (let i = 0; i <= gridLines; i++) {
    const value = maxV - (i / gridLines) * span;
    const y = padTop + (i / gridLines) * innerH;
    yLabels += `
      <text x="${padLeft - 12}" y="${y + 5}" text-anchor="end" fill="${muted}" font-size="12">
        ${Math.round(value)}
      </text>`;
  }

  // X labels (first, mid, last)
  const xLabels = [];
  if (safeValues.length > 0) {
    xLabels.push({ i: 0, label: "Run 1" });
    if (safeValues.length > 2) xLabels.push({ i: Math.floor((safeValues.length - 1) / 2), label: "Mid" });
    if (safeValues.length > 1) xLabels.push({ i: safeValues.length - 1, label: `Run ${safeValues.length}` });
  }

  let xLabelSvg = "";
  xLabels.forEach(({ i, label }) => {
    const x = xFor(i);
    xLabelSvg += `<text x="${x}" y="${padTop + innerH + 28}" text-anchor="middle" fill="${muted}" font-size="12">${label}</text>`;
  });

  // Header badges
  const last = safeValues.length ? safeValues[safeValues.length - 1] : 0;

  const badge = `
    <g>
      <rect x="${padLeft}" y="22" rx="12" ry="12" width="210" height="30" fill="${panel}" stroke="${grid}" />
      <circle cx="${padLeft + 18}" cy="37" r="6" fill="${color}" />
      <text x="${padLeft + 34}" y="42" fill="${text}" font-size="12" font-weight="700">
        Latest: ${last} ${valueLabel}
      </text>
    </g>
  `;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${color}" stop-opacity="0.15"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0.45"/>
      </linearGradient>

      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.45" />
      </filter>
    </defs>

    <rect x="0" y="0" width="${width}" height="${height}" fill="${bg}"/>
    <rect x="18" y="14" width="${width - 36}" height="${height - 28}" rx="18" fill="${panel}" filter="url(#softShadow)"/>

    <!-- Title -->
    <text x="${padLeft}" y="52" fill="${text}" font-size="20" font-weight="800">${title}</text>
    <text x="${padLeft}" y="68" fill="${muted}" font-size="12">${subtitle}</text>

    ${badge}

    <!-- Grid -->
    ${gridSvg}

    <!-- Axes -->
    <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + innerH}" stroke="${grid}" stroke-width="1.5"/>
    <line x1="${padLeft}" y1="${padTop + innerH}" x2="${padLeft + innerW}" y2="${padTop + innerH}" stroke="${grid}" stroke-width="1.5"/>

    <!-- Axis labels -->
    ${yLabels}
    ${xLabelSvg}

    <!-- Line glow -->
    <path d="${d}" fill="none" stroke="url(#lineGlow)" stroke-width="10" stroke-linecap="round" opacity="0.65"/>

    <!-- Line -->
    <path d="${d}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>

    <!-- Points -->
    ${points
      .map(
        (p) => `
      <g>
        <circle cx="${p.x}" cy="${p.y}" r="5.5" fill="${bg}" stroke="${color}" stroke-width="2"/>
      </g>`
      )
      .join("")}

    <!-- Footer -->
    <text x="${width - padRight}" y="${height - 18}" text-anchor="end" fill="${muted}" font-size="11">
      Opex QA Dashboard • generated by GitHub Actions
    </text>
  </svg>`;

  fs.writeFileSync(path.join(outChartsDir, fileName), svg.trim(), "utf8");
}

function writeDashboardIndex(runs) {
  const latest = runs.length ? runs[runs.length - 1] : null;

  const latestSummary = latest
    ? `
      <div class="grid">
        <div class="card green">
          <div class="label">Pass Rate</div>
          <div class="value">${latest.passRate}%</div>
          <div class="meta">${latest.passes}/${latest.tests} passed</div>
        </div>

        <div class="card yellow">
          <div class="label">Duration</div>
          <div class="value">${latest.durationSec}s</div>
          <div class="meta">Latest run</div>
        </div>

        <div class="card red">
          <div class="label">Failures</div>
          <div class="value">${latest.failures}</div>
          <div class="meta">Latest run</div>
        </div>
      </div>
    `
    : `<div class="empty">No run data yet. Push a commit to trigger CI.</div>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Opex QA Dashboard</title>
  <style>
    :root{
      --bg:#0b1220;
      --panel:#0f1a2e;
      --muted:#9ca3af;
      --text:#e5e7eb;
      --border:#22314a;
      --green:#22c55e;
      --yellow:#facc15;
      --red:#ef4444;
    }
    body{
      margin:0;
      background: radial-gradient(1200px 600px at 15% 15%, #132445 0%, var(--bg) 55%);
      color:var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Helvetica Neue";
    }
    .wrap{max-width:1100px;margin:0 auto;padding:28px 16px 48px;}
    .header{
      background: linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5);
      border-radius:18px;
      padding:22px 22px;
      box-shadow:0 18px 50px rgba(0,0,0,.45);
      border:1px solid rgba(255,255,255,.08);
    }
    .header h1{margin:0;font-size:22px;letter-spacing:.3px}
    .header p{margin:6px 0 0;color:#e3f2fd;font-size:13px}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0 10px;}
    .card{
      background: rgba(15,26,46,.85);
      border:1px solid var(--border);
      border-radius:16px;
      padding:14px 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
    }
    .label{color:var(--muted);font-size:12px}
    .value{font-size:28px;font-weight:800;margin-top:6px}
    .meta{color:var(--muted);font-size:12px;margin-top:2px}
    .green .value{color:var(--green)}
    .yellow .value{color:var(--yellow)}
    .red .value{color:var(--red)}
    .charts{display:flex;flex-direction:column;gap:14px;margin-top:14px}
    .charts img{width:100%;border-radius:18px;border:1px solid rgba(255,255,255,.08)}
    .links{margin-top:14px;color:var(--muted);font-size:13px}
    .links a{color:#7dd3fc;text-decoration:none}
    .links a:hover{text-decoration:underline}
    .empty{margin:18px 0;color:var(--muted)}
    @media (max-width: 900px){ .grid{grid-template-columns:1fr} }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>📊 Opex QA Automation Dashboard</h1>
      <p>Updated automatically by GitHub Actions after each run (last 30 runs).</p>
    </div>

    ${latestSummary}

    <div class="charts">
      <img src="charts/pass_rate.svg" alt="Pass rate trend"/>
      <img src="charts/duration.svg" alt="Duration trend"/>
      <img src="charts/failures.svg" alt="Failures trend"/>
    </div>

    <div class="links">
      Data file: <a href="data/runs.json">runs.json</a>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(outIndex, html, "utf8");
}

function main() {
  ensureDir(outChartsDir);

  const runs = readRuns();

  // Values
  const passRates = runs.map((r) => Number(r.passRate) || 0);
  const durations = runs.map((r) => Number(r.durationSec) || 0);
  const failures = runs.map((r) => Number(r.failures) || 0);

  const firstTs = runs.length ? formatDateShort(runs[0].ts) : "";
  const lastTs = runs.length ? formatDateShort(runs[runs.length - 1].ts) : "";
  const range = firstTs && lastTs ? `${firstTs} → ${lastTs}` : "No data yet";

  // 1) Pass rate chart
  svgLineChart({
    title: "Pass Rate Trend",
    subtitle: `Last ${runs.length} runs • ${range}`,
    values: passRates,
    valueLabel: "%",
    yMinOverride: 0,
    yMaxOverride: 100,
    color: "#22c55e", // green
    accent: "#16a34a",
    fileName: "pass_rate.svg",
  });

  // 2) Duration chart
  const maxDur = Math.max(...durations, 1);
  svgLineChart({
    title: "Duration Trend (seconds)",
    subtitle: `Last ${runs.length} runs • ${range}`,
    values: durations,
    valueLabel: "s",
    yMinOverride: 0,
    yMaxOverride: Math.ceil(maxDur * 1.15),
    color: "#facc15", // yellow
    accent: "#eab308",
    fileName: "duration.svg",
  });

  // 3) Failures chart
  const maxFail = Math.max(...failures, 1);
  svgLineChart({
    title: "Failures Trend",
    subtitle: `Last ${runs.length} runs • ${range}`,
    values: failures,
    valueLabel: "",
    yMinOverride: 0,
    yMaxOverride: Math.ceil(maxFail * 1.25),
    color: "#ef4444", // red
    accent: "#dc2626",
    fileName: "failures.svg",
  });

  // Index page
  writeDashboardIndex(runs);

  console.log("✅ Charts + dashboard generated:");
  console.log(`   ${path.join(outChartsDir, "pass_rate.svg")}`);
  console.log(`   ${path.join(outChartsDir, "duration.svg")}`);
  console.log(`   ${path.join(outChartsDir, "failures.svg")}`);
  console.log(`   ${outIndex}`);
}

main();
