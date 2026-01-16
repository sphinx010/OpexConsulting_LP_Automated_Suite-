const fs = require('fs');
const path = require('path');

function findFirstHtml(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const found = findFirstHtml(fullPath);
      if (found) return found;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      return fullPath;
    }
  }

  return null;
}

const reportsRoot = path.join('cypress', 'reports');
if (!fs.existsSync(reportsRoot)) {
  console.error(`❌ Reports folder not found: ${reportsRoot}`);
  process.exit(1);
}

const reportPath = path.join('cypress', 'reports', 'html', 'cypress', 'reports', 'mochawesome.html');


if (!reportPath) {
  console.error(`❌ No HTML report found anywhere under: ${reportsRoot}`);
  process.exit(1);
}

let html = fs.readFileSync(reportPath, 'utf8');

const customBanner = `
<div style="
  background: linear-gradient(135deg, #0d47a1, #1976d2);
  color: white;
  padding: 25px 40px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  border-bottom: 4px solid #ffca28;
  position: sticky;
  top: 0;
  z-index: 9999;
">
  🚀 Opex Landing Page QA Automation Report
  <div style="margin-top:8px; font-size:14px; font-weight:400;">
    Executed by: <b>Ayooluwa Paul Obembe</b> | Environment: <b>Staging</b>
  </div>
</div>
`;


const bodyTagRegex = /<body[^>]*>/i;

if (!bodyTagRegex.test(html)) {
  console.error('❌ Could not find <body> tag in the report HTML. Injection skipped.');
  process.exit(1);
}

html = html.replace(bodyTagRegex, (match) => `${match}${customBanner}`);

fs.writeFileSync(reportPath, html, 'utf8');

console.log(`✅ Custom text injected into: ${reportPath}`);
