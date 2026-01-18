const MANIFEST_URL = "../cypress/reports/index.json";
const MERGED_URL = "../cypress/reports/mochawesome.json";
// If you move the dashboard or reports folder, update the relative paths above.
const REPORT_BASE = "../cypress/reports/";
const AUTO_REFRESH_MS = 15000;

const STATUS_META = {
  passed: { label: "PASS", color: "#53D479" },
  failed: { label: "FAIL", color: "#ED1111" },
  skipped: { label: "SKIP", color: "#B3BDB9" },
  pending: { label: "PENDING", color: "#F5BE47" },
};

const state = {
  mode: "interactive",
  reportUrl: "",
  reportSignature: "",
  stats: null,
  reportData: null,
  tests: [],
  suites: [],
  filter: "all",
  search: "",
  donutLocked: false,
  autoMode: true,
};

const isStatic = new URLSearchParams(window.location.search).get("mode") === "static";
state.mode = isStatic ? "static" : "interactive";

const ui = {
  app: document.querySelector(".app"),
  lastUpdated: document.getElementById("last-updated"),
  statusChip: document.getElementById("status-chip"),
  modeChip: document.getElementById("mode-chip"),
  errorCard: document.getElementById("error-card"),
  errorList: document.getElementById("error-list"),
  donutGroup: document.getElementById("donut-group"),
  totalTests: document.getElementById("total-tests"),
  centerLabel: document.getElementById("center-label"),
  centerSub: document.getElementById("center-sub"),
  runtimeFill: document.getElementById("runtime-fill"),
  runtimeText: document.getElementById("runtime-text"),
  metrics: {
    tests: document.getElementById("metric-tests"),
    pass: document.getElementById("metric-pass"),
    fail: document.getElementById("metric-fail"),
    skipped: document.getElementById("metric-skipped"),
    passRate: document.getElementById("metric-passrate"),
    runtime: document.getElementById("metric-runtime"),
  },
  suiteList: document.getElementById("suite-list"),
  testsBody: document.getElementById("tests-body"),
  searchInput: document.getElementById("search-input"),
  filterButtons: Array.from(document.querySelectorAll(".pill")),
  sourceInput: document.getElementById("source-input"),
  loadBtn: document.getElementById("load-btn"),
  fileInput: document.getElementById("file-input"),
  fileName: document.getElementById("file-name"),
  refreshBtn: document.getElementById("refresh-btn"),
  downloadBtn: document.getElementById("download-btn"),
  tooltip: document.getElementById("tooltip"),
};

ui.modeChip.textContent = state.mode.toUpperCase();

function setLastUpdated() {
  ui.lastUpdated.textContent = `Last updated: ${new Date().toLocaleString()}`;
}

function showError(attempts) {
  ui.errorList.innerHTML = "";
  attempts.forEach((attempt) => {
    const li = document.createElement("li");
    li.textContent = `${attempt.url} (${attempt.status})`;
    ui.errorList.appendChild(li);
  });
  ui.errorCard.classList.remove("hidden");
  if (ui.app) ui.app.classList.add("loaded");
}

function hideError() {
  ui.errorCard.classList.add("hidden");
}

async function fetchJson(url) {
  const attempt = { url, status: "NETWORK_ERROR", ok: false };
  try {
    const res = await fetch(url, { cache: "no-store" });
    attempt.status = res.status;
    if (!res.ok) {
      return { attempt, data: null };
    }
    const data = await res.json();
    attempt.ok = true;
    return { attempt, data };
  } catch (err) {
    return { attempt, data: null };
  }
}

function normalizeReportPath(input) {
  if (!input) return "";
  const trimmed = input.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const normalized = trimmed.replace(/\\/g, "/");
  if (normalized.startsWith("../") || normalized.startsWith("./") || normalized.startsWith("/")) {
    return normalized;
  }
  if (normalized.includes("/")) {
    return `../${normalized}`;
  }
  return `${REPORT_BASE}${normalized}`;
}

function loadFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      handleReport(data, file.name);
      hideError();
    } catch (err) {
      showError([{ url: file.name, status: "INVALID_JSON" }]);
    }
  };
  reader.readAsText(file);
}

function normalizeStatus(test) {
  if (test.skipped) return "skipped";
  if (test.pending) return "pending";
  if (test.state === "failed" || test.fail) return "failed";
  if (test.state === "passed" || test.pass) return "passed";
  return "pending";
}

function extractTags(title) {
  const tags = [];
  const regex = /\[([^\]]+)\]/g;
  let match = regex.exec(title);
  while (match) {
    tags.push(match[1]);
    match = regex.exec(title);
  }
  return tags;
}

function extractScreenshot(context) {
  if (!context || typeof context !== "string") return "";
  const quoted = context.match(/["']([^"']+\.(png|jpg|jpeg|gif))["']/i);
  if (quoted && quoted[1]) return normalizeScreenshotPath(quoted[1]);
  const raw = context.match(/(\.\.?\/[^\s]+\.(png|jpg|jpeg|gif))/i);
  if (raw && raw[1]) return normalizeScreenshotPath(raw[1]);
  return "";
}

function normalizeScreenshotPath(rawPath) {
  if (!rawPath) return "";
  const trimmed = rawPath.replace(/\\/g, "/");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  let normalized = trimmed.replace(/^(\.\.\/)+/, "");
  if (normalized.startsWith("cypress/reports/")) return `../${normalized}`;
  if (normalized.startsWith("cypress/screenshots/")) {
    normalized = normalized.replace(/^cypress\//, "");
  }
  if (normalized.startsWith("screenshots/")) {
    return `${REPORT_BASE}${normalized}`;
  }
  const idx = normalized.indexOf("screenshots/");
  if (idx !== -1) {
    return `${REPORT_BASE}${normalized.slice(idx)}`;
  }
  return `${REPORT_BASE}${normalized}`;
}

function collectTests(report) {
  const results = Array.isArray(report?.results) ? report.results : [];
  const tests = [];
  const suites = new Set();

  function walkSuite(suite) {
    if (!suite) return;
    if (suite.title) suites.add(suite.title);
    (suite.tests || []).forEach((test) => {
      const status = normalizeStatus(test);
      const duration = Number(test.duration || 0);
      const tags = extractTags(test.title || "");
      const errorMessage = test.err?.message || test.err?.estack || "";
      tests.push({
        status,
        title: test.title || "(untitled)",
        duration,
        tags,
        errorMessage,
        screenshot: extractScreenshot(test.context),
      });
    });
    (suite.suites || []).forEach(walkSuite);
  }

  results.forEach((result) => {
    (result.suites || []).forEach(walkSuite);
  });

  return { tests, suites: Array.from(suites) };
}

function computeStats(stats, tests) {
  const fallback = {
    tests: tests.length,
    passes: tests.filter((t) => t.status === "passed").length,
    failures: tests.filter((t) => t.status === "failed").length,
    skipped: tests.filter((t) => t.status === "skipped").length,
    pending: tests.filter((t) => t.status === "pending").length,
    duration: tests.reduce((acc, t) => acc + (t.duration || 0), 0),
    passPercent: tests.length ? (tests.filter((t) => t.status === "passed").length / tests.length) * 100 : 0,
  };

  return {
    tests: stats?.tests ?? fallback.tests,
    passes: stats?.passes ?? fallback.passes,
    failures: stats?.failures ?? fallback.failures,
    skipped: stats?.skipped ?? fallback.skipped,
    pending: stats?.pending ?? fallback.pending,
    duration: stats?.duration ?? fallback.duration,
    passPercent: stats?.passPercent ?? fallback.passPercent,
  };
}

function buildSignature(stats, tests) {
  const end = stats?.end || "";
  const duration = stats?.duration || 0;
  const total = stats?.tests || tests.length;
  return `${end}|${duration}|${total}`;
}

function animateValue(el, from, to, formatter, duration = 900) {
  if (isStatic) {
    el.textContent = formatter(to);
    return;
  }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = from + (to - from) * eased;
    el.textContent = formatter(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function animateWidth(el, toPercent, duration = 800) {
  if (isStatic) {
    el.style.width = `${toPercent}%`;
    return;
  }
  const start = performance.now();
  const fromPercent = 0;
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = fromPercent + (toPercent - fromPercent) * eased;
    el.style.width = `${value}%`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function renderDonut(counts, total, progress = 1) {
  ui.donutGroup.innerHTML = "";
  if (!total) return;

  const ordered = ["passed", "failed", "skipped", "pending"];
  const sweep = 360 * progress;
  let startAngle = 0;

  ordered.forEach((status) => {
    const value = counts[status] || 0;
    const share = total ? value / total : 0;
    const angle = sweep * share;
    if (angle <= 0.2) {
      startAngle += angle;
      return;
    }
    const endAngle = startAngle + angle;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", describeArc(130, 130, 88, startAngle, endAngle));
    path.setAttribute("stroke", STATUS_META[status].color);
    path.setAttribute("class", "donut-segment");
    path.dataset.status = status;
    path.dataset.count = value;
    path.dataset.total = total;
    ui.donutGroup.appendChild(path);
    startAngle = endAngle;
  });

  bindDonutEvents();
  applyDonutSelection();
}

function animateDonut(counts, total) {
  if (isStatic) {
    renderDonut(counts, total, 1);
    return;
  }
  const start = performance.now();
  const duration = 900;
  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    renderDonut(counts, total, eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

let tooltipTarget = null;
let tooltipRaf = null;
let tooltipPos = { x: 0, y: 0 };

function bindDonutEvents() {
  const segments = Array.from(ui.donutGroup.querySelectorAll(".donut-segment"));
  segments.forEach((segment) => {
    segment.addEventListener("mouseenter", () => {
      tooltipTarget = segment;
      updateTooltip();
      ui.tooltip.classList.remove("hidden");
    });
    segment.addEventListener("mousemove", (event) => {
      tooltipPos = { x: event.clientX, y: event.clientY };
      scheduleTooltip();
    });
    segment.addEventListener("mouseleave", () => {
      tooltipTarget = null;
      ui.tooltip.classList.add("hidden");
    });
    segment.addEventListener("click", () => {
      const status = segment.dataset.status;
      setFilter(state.filter === status ? "all" : status);
    });
  });
}

function scheduleTooltip() {
  if (tooltipRaf) return;
  tooltipRaf = requestAnimationFrame(() => {
    updateTooltip();
    tooltipRaf = null;
  });
}

function updateTooltip() {
  if (!tooltipTarget) return;
  const count = Number(tooltipTarget.dataset.count || 0);
  const total = Number(tooltipTarget.dataset.total || 0);
  const status = tooltipTarget.dataset.status;
  const percent = total ? (count / total) * 100 : 0;
  ui.tooltip.textContent = `${STATUS_META[status].label}: ${count} (${percent.toFixed(1)}%)`;
  ui.tooltip.style.left = `${tooltipPos.x}px`;
  ui.tooltip.style.top = `${tooltipPos.y - 12}px`;
}

function applyDonutSelection() {
  const segments = Array.from(ui.donutGroup.querySelectorAll(".donut-segment"));
  segments.forEach((segment) => {
    const status = segment.dataset.status;
    if (state.filter !== "all" && state.filter === status) {
      segment.classList.add("active");
    } else {
      segment.classList.remove("active");
    }
  });
}

function setFilter(filter) {
  state.filter = filter;
  ui.filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  applyDonutSelection();
  renderTable();
  updateCenterDisplay(filter);
}

function setSearch(value) {
  state.search = value.toLowerCase();
  renderTable();
}

function renderSuites(suites) {
  if (!suites.length) {
    ui.suiteList.textContent = "No suites detected yet.";
    return;
  }
  ui.suiteList.innerHTML = "";
  suites.forEach((suite) => {
    const div = document.createElement("div");
    div.textContent = suite;
    ui.suiteList.appendChild(div);
  });
}

function renderMetrics(stats) {
  animateValue(ui.metrics.tests, 0, stats.tests, (v) => Math.round(v).toLocaleString());
  animateValue(ui.metrics.pass, 0, stats.passes, (v) => Math.round(v).toLocaleString());
  animateValue(ui.metrics.fail, 0, stats.failures, (v) => Math.round(v).toLocaleString());
  animateValue(ui.metrics.skipped, 0, stats.skipped, (v) => Math.round(v).toLocaleString());
  animateValue(ui.metrics.passRate, 0, stats.passPercent, (v) => `${Number(v).toFixed(1)}%`);

  const runtimeSeconds = stats.duration / 1000;
  const runtimeMinutes = runtimeSeconds / 60;
  animateValue(ui.metrics.runtime, 0, runtimeMinutes, (v) => `${Number(v).toFixed(1)}m`);

  const runtimePercent = Math.min(100, (runtimeMinutes / 60) * 100);
  animateWidth(ui.runtimeFill, runtimePercent);
  ui.runtimeText.textContent = `${runtimeMinutes.toFixed(1)}m`;
}

function updateCenterDisplay(filter) {
  const stats = state.stats;
  if (!stats) return;
  ui.totalTests.classList.remove("pass", "fail", "skipped", "pending");

  if (filter === "all") {
    ui.centerLabel.textContent = "Total Tests";
    ui.totalTests.textContent = stats.tests.toLocaleString();
    ui.centerSub.textContent = "Tap a segment to filter";
    return;
  }

  const keyMap = {
    passed: "passes",
    failed: "failures",
    skipped: "skipped",
    pending: "pending",
  };
  const key = keyMap[filter] || filter;
  const count = stats[key] || 0;
  ui.centerLabel.textContent = `${STATUS_META[filter].label} Tests`;
  ui.totalTests.textContent = count.toLocaleString();
  ui.totalTests.classList.add(filter === "failed" ? "fail" : filter);
  ui.centerSub.textContent = "Click again to clear filter";
}

function renderHeader(stats) {
  const hasFailures = stats.failures > 0;
  ui.statusChip.textContent = hasFailures ? `${stats.failures} FAILING` : "ALL PASSED";
  ui.statusChip.classList.toggle("ok", !hasFailures);
  ui.statusChip.classList.toggle("bad", hasFailures);
  setLastUpdated();
}

function getFilteredTests() {
  let filtered = [...state.tests];
  if (state.filter !== "all") {
    filtered = filtered.filter((test) => test.status === state.filter);
  }
  if (state.search) {
    filtered = filtered.filter((test) => {
      const text = `${test.title} ${test.tags.join(" ")}`.toLowerCase();
      return text.includes(state.search);
    });
  }

  const order = { failed: 0, passed: 1, skipped: 2, pending: 3 };
  filtered.sort((a, b) => {
    const statusDiff = (order[a.status] ?? 9) - (order[b.status] ?? 9);
    if (statusDiff !== 0) return statusDiff;
    return (b.duration || 0) - (a.duration || 0);
  });

  return filtered;
}

function renderTable() {
  const tests = getFilteredTests();
  ui.testsBody.innerHTML = "";
  if (!tests.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No tests match the current filters.";
    row.appendChild(cell);
    ui.testsBody.appendChild(row);
    return;
  }

  tests.forEach((test) => {
    const row = document.createElement("tr");
    row.className = `row-${test.status}`;

    const statusCell = document.createElement("td");
    const statusWrap = document.createElement("span");
    const statusClassMap = {
      passed: "status-pass",
      failed: "status-fail",
      skipped: "status-skipped",
      pending: "status-pending",
    };
    statusWrap.className = `status-pill ${statusClassMap[test.status] || ""}`.trim();
    const statusDot = document.createElement("span");
    statusDot.className = "status-dot";
    statusWrap.appendChild(statusDot);
    statusWrap.appendChild(
      document.createTextNode(STATUS_META[test.status]?.label || test.status.toUpperCase())
    );
    statusCell.appendChild(statusWrap);

    const titleCell = document.createElement("td");
    titleCell.textContent = test.title;
    titleCell.className = "title-cell";

    const tagsCell = document.createElement("td");
    const tagWrap = document.createElement("div");
    tagWrap.className = "tag-list";
    if (test.tags.length) {
      test.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagWrap.appendChild(span);
      });
    } else {
      const span = document.createElement("span");
      span.textContent = "-";
      tagWrap.appendChild(span);
    }
    tagsCell.appendChild(tagWrap);

    const durationCell = document.createElement("td");
    const seconds = (test.duration / 1000).toFixed(1);
    durationCell.textContent = `${test.duration} ms (${seconds}s)`;

    row.appendChild(statusCell);
    row.appendChild(titleCell);
    row.appendChild(tagsCell);
    row.appendChild(durationCell);

    ui.testsBody.appendChild(row);

    const hasDetails = test.status === "failed" && (test.errorMessage || test.screenshot);
    if (hasDetails) {
      row.classList.add("row-clickable");
      const detailRow = document.createElement("tr");
      detailRow.className = "details-row hidden";
      const detailCell = document.createElement("td");
      detailCell.colSpan = 4;
      const panel = document.createElement("div");
      panel.className = "detail-panel";
      if (test.errorMessage) {
        const errorText = document.createElement("div");
        errorText.className = "error-text";
        errorText.textContent = test.errorMessage;
        panel.appendChild(errorText);
      }
      if (test.screenshot) {
        const actions = document.createElement("div");
        actions.className = "detail-actions";
        const link = document.createElement("a");
        link.href = test.screenshot;
        link.textContent = "Open screenshot";
        link.target = "_blank";
        link.rel = "noopener";
        actions.appendChild(link);
        panel.appendChild(actions);
      }
      detailCell.appendChild(panel);
      detailRow.appendChild(detailCell);
      ui.testsBody.appendChild(detailRow);
      row.addEventListener("click", () => {
        detailRow.classList.toggle("hidden");
      });
    }
  });
}

function updateSourceInput(url) {
  ui.sourceInput.value = url;
}

async function loadReport(overrideUrl = "") {
  const attempts = [];
  if (overrideUrl) {
    state.autoMode = false;
    const url = normalizeReportPath(overrideUrl);
    const { attempt, data } = await fetchJson(url);
    attempts.push(attempt);
    if (data) {
      handleReport(data, url);
      hideError();
      return;
    }
    showError(attempts);
    return;
  }

  state.autoMode = true;
  const manifest = await fetchJson(MANIFEST_URL);
  attempts.push(manifest.attempt);

  if (manifest.data?.latest) {
    const latest = manifest.data.latest;
    const reportUrl = latest.includes("/") ? latest : `${REPORT_BASE}${latest}`;
    const report = await fetchJson(reportUrl);
    attempts.push(report.attempt);
    if (report.data) {
      handleReport(report.data, reportUrl);
      hideError();
      return;
    }
  }

  const merged = await fetchJson(MERGED_URL);
  attempts.push(merged.attempt);
  if (merged.data) {
    handleReport(merged.data, MERGED_URL);
    hideError();
    return;
  }

  showError(attempts);
}

function handleReport(report, sourceUrl) {
  const { tests, suites } = collectTests(report);
  const stats = computeStats(report.stats || {}, tests);
  const signature = buildSignature(stats, tests);
  if (state.reportSignature === signature && state.reportUrl === sourceUrl) {
    setLastUpdated();
    return;
  }
  state.reportData = report;
  state.reportUrl = sourceUrl;
  state.tests = tests;
  state.suites = suites;
  state.reportSignature = signature;
  state.stats = stats;
  state.search = "";
  ui.searchInput.value = "";

  renderHeader(stats);
  renderMetrics(stats);
  renderSuites(suites);
  animateDonut(
    {
      passed: stats.passes,
      failed: stats.failures,
      skipped: stats.skipped,
      pending: stats.pending,
    },
    stats.tests
  );
  updateSourceInput(sourceUrl);
  setFilter("all");
  updateCenterDisplay("all");
  if (ui.app) ui.app.classList.add("loaded");
}

function handleDownload() {
  if (!state.reportUrl) return;
  fetch(state.reportUrl, { cache: "no-store" })
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      const filename = state.reportUrl.split("/").pop() || "mochawesome.json";
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(() => {});
}

ui.filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

ui.searchInput.addEventListener("input", (event) => setSearch(event.target.value));

ui.loadBtn.addEventListener("click", () => {
  const value = ui.sourceInput.value.trim();
  loadReport(value);
});

ui.refreshBtn.addEventListener("click", () => {
  const value = ui.sourceInput.value.trim();
  loadReport(value);
});

ui.downloadBtn.addEventListener("click", handleDownload);
ui.fileInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    state.autoMode = false;
    ui.fileName.textContent = file.name;
    loadFromFile(file);
  } else {
    ui.fileName.textContent = "No file selected";
  }
});

setFilter("all");
loadReport("");

setInterval(() => {
  if (state.autoMode) loadReport("");
}, AUTO_REFRESH_MS);
