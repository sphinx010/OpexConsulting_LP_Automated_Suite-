const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "cypress", "screenshots");
const destDir = path.join(__dirname, "..", "cypress", "reports", "screenshots");

async function pathExists(target) {
  try {
    await fs.promises.access(target);
    return true;
  } catch (err) {
    return false;
  }
}

async function main() {
  const hasSource = await pathExists(sourceDir);
  if (!hasSource) {
    console.log("No screenshots to copy.");
    return;
  }

  await fs.promises.mkdir(destDir, { recursive: true });
  await fs.promises.cp(sourceDir, destDir, { recursive: true });
  console.log(`Copied screenshots to ${destDir}`);
}

main().catch((err) => {
  console.error("Failed to copy screenshots:", err);
  process.exit(1);
});
