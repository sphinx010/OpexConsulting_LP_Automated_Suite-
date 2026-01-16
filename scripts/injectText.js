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
<div id="qaBanner" style="
  background:linear-gradient(135deg,#0d47a1,#1976d2,#42a5f5);
  color:#ffffff;
  padding:26px 34px;
  margin:20px;
  border-radius:14px;
  font-family:'Segoe UI',system-ui,sans-serif;
  box-shadow:
    0 10px 30px rgba(13,71,161,0.45),
    inset 0 0 12px rgba(255,255,255,0.15);
  position:relative;
  overflow:hidden;
">

  <!-- Glow line -->
  <div style="
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:3px;
    background:linear-gradient(90deg,#00e5ff,#ffffff,#00e5ff);
  "></div>

  <div style="
    font-size:22px;
    font-weight:800;
    letter-spacing:0.5px;
    text-transform:uppercase;
    display:flex;
    align-items:center;
    gap:10px;
  ">
    🌍 Opex consulting Landing Page Test Report
    <span style="
      background:#ffffff;
      color:#0d47a1;
      padding:3px 10px;
      border-radius:20px;
      font-size:12px;
      font-weight:700;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
    ">
      QA AUTOMATION
    </span>
  </div>

  <div style="
    margin-top:10px;
    font-size:14px;
    color:#e3f2fd;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
  ">
    <span> Test Agent: <b style="color:#ffffff;">Ayooluwa </b></span>
    <span>🌍 Environment: <b style="color:#ffffff;">Staging</b></span>
  </div>
</div>

<!-- Toggle Button -->
<div style="margin:10px 20px;">
  <button id="toggleBannerBtn" style="
    background:#0d47a1;
    color:white;
    border:none;
    padding:10px 18px;
    border-radius:20px;
    font-weight:600;
    cursor:pointer;
    box-shadow:0 4px 10px rgba(0,0,0,0.3);
  ">
    Hide Banner
  </button>
</div>

<script>
  const banner = document.getElementById('qaBanner');
  const btn = document.getElementById('toggleBannerBtn');

  btn.onclick = () => {
    if (banner.style.display === 'none') {
      banner.style.display = 'block';
      btn.textContent = 'Hide Banner';
    } else {
      banner.style.display = 'none';
      btn.textContent = 'Show Banner';
    }
  };
</script>
`;



const bodyTagRegex = /<body[^>]*>/i;

if (!bodyTagRegex.test(html)) {
  console.error('❌ Could not find <body> tag in the report HTML. Injection skipped.');
  process.exit(1);
}

html = html.replace(bodyTagRegex, (match) => `${match}${customBanner}`);

fs.writeFileSync(reportPath, html, 'utf8');

console.log(`✅ Custom text injected into: ${reportPath}`);
