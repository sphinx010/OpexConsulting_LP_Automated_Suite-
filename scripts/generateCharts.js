const fs = require("fs");
const path = require("path");

const reportPath = path.join(__dirname, "..", "cypress", "reports", "mochawesome.json");
const chartsDir = path.join(__dirname, "..", "dashboard", "charts");

const COLORS = {
  pass: "#53D479",
  fail: "#ED1111",
  skipped: "#B3BDB9",
  runtime: "#F5BE47",
  text: "#E7E9FF",
  muted: "#A9B2D4",
  card: "#0D1123",
  border: "rgba(130,150,255,0.2)",
};

function formatMinutes(ms) {
  const minutes = ms / 1000 / 60;
  return Number(minutes).toFixed(1);
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function writeFile(name, content) {
  const outPath = path.join(chartsDir, name);
  fs.writeFileSync(outPath, content);
  console.log(`Wrote ${outPath}`);
}

function buildPassrateSvg(stats) {
  const width = 520;
  const height = 240;
  const cx = 130;
  const cy = 130;
  const r = 72;
  const total = stats.tests || 1;
  const segments = [
    { key: "passes", color: COLORS.pass, label: "Pass" },
    { key: "failures", color: COLORS.fail, label: "Fail" },
    { key: "skipped", color: COLORS.skipped, label: "Skipped" },
    { key: "pending", color: COLORS.runtime, label: "Pending" },
  ];

  let startAngle = 0;
  const arcs = segments
    .map((segment) => {
      const value = stats[segment.key] || 0;
      const share = value / total;
      const angle = 360 * share;
      if (angle <= 0) return "";
      const endAngle = startAngle + angle;
      const path = describeArc(cx, cy, r, startAngle, endAngle);
      startAngle = endAngle;
      return `<path d="${path}" stroke="${segment.color}" stroke-width="18" fill="none" stroke-linecap="round" />`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#11162A"/>
      <stop offset="100%" stop-color="#0B0F1E"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="18" fill="url(#bg)" stroke="${COLORS.border}" />
  <text x="30" y="48" font-family="Trebuchet MS, sans-serif" font-size="18" fill="${COLORS.text}">Pass Rate</text>
  <g transform="translate(0 0)" filter="url(#glow)">
    <circle cx="${cx}" cy="${cy}" r="${r}" stroke="rgba(255,255,255,0.08)" stroke-width="18" fill="none"/>
    <g transform="rotate(-90 ${cx} ${cy})">${arcs}</g>
  </g>
  <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.muted}">Total Tests</text>
  <text x="${cx}" y="${cy + 22}" text-anchor="middle" font-family="Trebuchet MS, sans-serif" font-size="26" fill="${COLORS.text}">${stats.tests}</text>
  <text x="250" y="90" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.pass}">Pass: ${stats.passes}</text>
  <text x="250" y="112" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.fail}">Fail: ${stats.failures}</text>
  <text x="250" y="134" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.skipped}">Skipped: ${stats.skipped}</text>
  <text x="250" y="156" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.runtime}">Pending: ${stats.pending}</text>
</svg>`;
}

function buildDurationSvg(stats) {
  const width = 520;
  const height = 180;
  const runtimeMinutes = Number(formatMinutes(stats.duration));
  const percent = Math.min(100, (runtimeMinutes / 60) * 100);
  const barWidth = Math.round((width - 80) * (percent / 100));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(245,190,71,0.3)"/>
      <stop offset="100%" stop-color="${COLORS.runtime}"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="18" fill="${COLORS.card}" stroke="${COLORS.border}" />
  <text x="30" y="50" font-family="Trebuchet MS, sans-serif" font-size="18" fill="${COLORS.text}">Runtime</text>
  <text x="30" y="78" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.muted}">${runtimeMinutes} minutes</text>
  <rect x="30" y="110" width="${width - 80}" height="12" rx="999" fill="rgba(255,255,255,0.08)" />
  <rect x="30" y="110" width="${barWidth}" height="12" rx="999" fill="url(#bar)" />
</svg>`;
}

function buildFailuresSvg(stats) {
  const width = 520;
  const height = 180;
  const total = stats.tests || 1;
  const failPercent = Math.round((stats.failures / total) * 100);
  const barWidth = Math.round((width - 80) * (failPercent / 100));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="18" fill="${COLORS.card}" stroke="${COLORS.border}" />
  <text x="30" y="50" font-family="Trebuchet MS, sans-serif" font-size="18" fill="${COLORS.text}">Failures</text>
  <text x="30" y="78" font-family="Trebuchet MS, sans-serif" font-size="12" fill="${COLORS.muted}">${stats.failures} of ${total} (${failPercent}%)</text>
  <rect x="30" y="110" width="${width - 80}" height="12" rx="999" fill="rgba(255,255,255,0.08)" />
  <rect x="30" y="110" width="${barWidth}" height="12" rx="999" fill="${COLORS.fail}" />
</svg>`;
}

function buildSummaryMd(stats) {
  const runtimeMinutes = formatMinutes(stats.duration);
  return [
    `Tests: ${stats.tests}`,
    `Passes: ${stats.passes}`,
    `Failures: ${stats.failures}`,
    `Pass Rate: ${Number(stats.passPercent).toFixed(1)}%`,
    `Runtime: ${runtimeMinutes}m`,
  ].join("\n");
}

function loadReport() {
  const raw = fs.readFileSync(reportPath, "utf-8");
  const data = JSON.parse(raw);
  const stats = data.stats || {};
  return {
    tests: stats.tests || 0,
    passes: stats.passes || 0,
    failures: stats.failures || 0,
    skipped: stats.skipped || 0,
    pending: stats.pending || 0,
    duration: stats.duration || 0,
    passPercent: stats.passPercent || 0,
  };
}

function main() {
  if (!fs.existsSync(reportPath)) {
    console.error(`Missing report JSON at ${reportPath}`);
    process.exit(1);
  }
  fs.mkdirSync(chartsDir, { recursive: true });
  const stats = loadReport();

  writeFile("passrate.svg", buildPassrateSvg(stats));
  writeFile("duration.svg", buildDurationSvg(stats));
  writeFile("failures.svg", buildFailuresSvg(stats));
  writeFile("summary.md", buildSummaryMd(stats));
}

main();
