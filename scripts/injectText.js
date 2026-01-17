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
<style>
  /* Keep banner nicely centered + consistent with report width */
  #qaBannerWrap{
    margin: 18px auto 0;
    padding: 0 18px;
    max-width: 1180px;
  }

  #qaBanner{
    background: linear-gradient(135deg,#0d47a1,#1976d2,#42a5f5);
    color:#fff;
    padding: 26px 34px;
    border-radius: 14px;
    font-family: 'Segoe UI', system-ui, sans-serif;
    box-shadow: 0 10px 30px rgba(13,71,161,0.45), inset 0 0 12px rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }

  #qaBannerTopLine{
    position:absolute;
    top:0; left:0;
    width:100%;
    height:3px;
    background: linear-gradient(90deg,#00e5ff,#ffffff,#00e5ff);
  }

  #qaBannerTitle{
    font-size: 22px;
    font-weight: 800;
    letter-spacing: .5px;
    text-transform: uppercase;
    display:flex;
    align-items:center;
    gap:10px;
    flex-wrap: wrap;
    line-height: 1.2;
  }

  #qaBannerPill{
    background:#fff;
    color:#0d47a1;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    white-space: nowrap;
  }

  #qaBannerMeta{
    margin-top: 10px;
    font-size: 14px;
    color: #e3f2fd;
    display:flex;
    justify-content:space-between;
    gap: 10px 24px;
    flex-wrap:wrap;
  }

  #qaBannerControls{
    margin-top: 12px;
  }

  #toggleBannerBtn{
    background:#0d47a1;
    color:white;
    border:none;
    padding:10px 18px;
    border-radius: 999px;
    font-weight:600;
    cursor:pointer;
    box-shadow:0 4px 10px rgba(0,0,0,0.3);
  }

  /* ✅ Key: ensure the report content never “rides up” into the banner area */
  #report, .report, .container{
    scroll-margin-top: 20px;
  }

  /* If the first suite block has tight/negative spacing, this offsets it safely */
  #qaBannerSpacer{
    height: 28px; /* increase to 36/44 if you want more breathing room */
  }
</style>

<div id="qaBannerWrap">
  <div id="qaBanner">
    <div id="qaBannerTopLine"></div>

    <div id="qaBannerTitle">
      🌍 Opex Consulting Landing Page Test Report
      <span id="qaBannerPill">QA AUTOMATION</span>
    </div>

    <div id="qaBannerMeta">
      <span>Test Agent: <b style="color:#ffffff;">Ayooluwa</b></span>
      <span>Environment: <b style="color:#ffffff;">Staging</b></span>
    </div>

    <div id="qaBannerControls">
      <button id="toggleBannerBtn">Hide Banner</button>
    </div>
  </div>

  <!-- ✅ This is the “hard separation” that prevents the peeking/overlap look -->
  <div id="qaBannerSpacer"></div>
</div>

<script>
  const bannerWrap = document.getElementById('qaBannerWrap');
  const banner = document.getElementById('qaBanner');
  const spacer = document.getElementById('qaBannerSpacer');
  const btn = document.getElementById('toggleBannerBtn');

  btn.onclick = () => {
    const hidden = banner.style.display === 'none';
    banner.style.display = hidden ? 'block' : 'none';
    spacer.style.display = hidden ? 'block' : 'none';
    btn.textContent = hidden ? 'Hide Banner' : 'Show Banner';
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
