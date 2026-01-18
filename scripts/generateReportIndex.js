const fs = require("fs");
const path = require("path");

const reportsDir = path.join(__dirname, "..", "cypress", "reports");
const reportPattern = /^mochawesome_.*\.json$/i;

async function main() {
  await fs.promises.mkdir(reportsDir, { recursive: true });
  const entries = await fs.promises.readdir(reportsDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!reportPattern.test(entry.name)) continue;
    const fullPath = path.join(reportsDir, entry.name);
    const stat = await fs.promises.stat(fullPath);
    files.push({ name: entry.name, mtimeMs: stat.mtimeMs });
  }

  files.sort((a, b) => b.mtimeMs - a.mtimeMs);
  const latest = files.length ? files[0].name : "";

  const payload = {
    latest,
    files: files.map((file) => file.name),
    generatedAt: new Date().toISOString(),
  };

  const outPath = path.join(reportsDir, "index.json");
  await fs.promises.writeFile(outPath, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error("Failed to generate report index:", err);
  process.exit(1);
});
