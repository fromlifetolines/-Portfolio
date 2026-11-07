import pkg from '/Users/howard/Desktop/_patch_review/FLTL_CASE12_13_14_EMERGENCY_REMEDIATION_V1/SCRIPTS/node_modules/playwright/index.js';
const { chromium } = pkg;
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const TARGET_DIR = '/Users/howard/Desktop/Portfolio/brand/object01/assets/case14';
const EVIDENCE_DIR = '/Users/howard/Desktop/Portfolio/brand/object01/presentation/evidence-p0-refinement';
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function getSha256(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function main() {
  console.log('=== Starting P0 Master Asset Generation ===');
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  // -------------------------------------------------------------
  // 1. SHOT 01: Master Hero Studio Render (100% V3 GLB Geometry)
  // -------------------------------------------------------------
  console.log('\n[1/3] Rendering SHOT 01 Master Hero View...');
  const heroPage = await browser.newPage({ viewport: { width: 2560, height: 1440 } });
  await heroPage.goto('http://127.0.0.1:8199/scratch/render_p0_hero_studio.html', { waitUntil: 'domcontentloaded' });
  await heroPage.waitForTimeout(600);
  await heroPage.evaluate(async () => {
    await window.p0HeroRenderer.init(2560, 1440);
  });
  await heroPage.waitForTimeout(1200);

  const shot01Png = path.join(TARGET_DIR, 'shot-01.png');
  const shot01Jpg = path.join(TARGET_DIR, 'shot-01.jpg');
  const coverJpg = path.join(TARGET_DIR, 'cover-original-20261107.jpg');

  await heroPage.locator('#canvas').screenshot({ path: shot01Png });
  console.log(`Saved: ${shot01Png}`);
  await heroPage.close();

  // -------------------------------------------------------------
  // 2. SHOT 08: Exploded Assembly Studio View (16 BOM Parts)
  // -------------------------------------------------------------
  console.log('\n[2/3] Rendering SHOT 08 Exploded Assembly Plate...');
  const expPage = await browser.newPage({ viewport: { width: 2560, height: 1440 } });
  await expPage.goto('http://127.0.0.1:8199/scratch/render_p0_exploded_studio.html', { waitUntil: 'domcontentloaded' });
  await expPage.waitForTimeout(600);
  await expPage.evaluate(async () => {
    await window.p0ExplodedRenderer.init(2560, 1440);
  });
  await expPage.waitForTimeout(1200);

  const shot08Png = path.join(TARGET_DIR, 'shot-08.png');
  const shot08Jpg = path.join(TARGET_DIR, 'shot-08.jpg');

  await expPage.locator('#container').screenshot({ path: shot08Png });
  console.log(`Saved: ${shot08Png}`);
  await expPage.close();

  // -------------------------------------------------------------
  // 3. SHOT 14: Physical Packaging & Volumetric Fit Plate
  // -------------------------------------------------------------
  console.log('\n[3/3] Rendering SHOT 14 Packaging Architecture Plate...');
  const packPage = await browser.newPage({ viewport: { width: 2560, height: 1440 } });
  await packPage.goto('http://127.0.0.1:8199/scratch/render_p0_packaging_studio.html', { waitUntil: 'domcontentloaded' });
  await packPage.waitForTimeout(600);
  await packPage.evaluate(async () => {
    await window.p0PackagingRenderer.init(2560, 1440);
  });
  await packPage.waitForTimeout(1200);

  const shot14Png = path.join(TARGET_DIR, 'shot-14.png');
  const shot14Jpg = path.join(TARGET_DIR, 'shot-14.jpg');

  await packPage.locator('#container').screenshot({ path: shot14Png });
  console.log(`Saved: ${shot14Png}`);
  await packPage.close();

  await browser.close();

  // -------------------------------------------------------------
  // 4. Resample 2560x1440 PNG -> 1920x1080 JPG via high-quality PIL
  // -------------------------------------------------------------
  console.log('\n--- Resampling to 1920x1080 Web JPGs ---');
  execSync(`python3 -c "
from PIL import Image

def resample(src, dst):
    img = Image.open(src)
    res = img.resize((1920, 1080), Image.Resampling.LANCZOS)
    res.convert('RGB').save(dst, 'JPEG', quality=95, subsampling=0)
    print(f'Resampled {src} -> {dst}')

resample('${shot01Png}', '${shot01Jpg}')
resample('${shot01Png}', '${coverJpg}')
resample('${shot08Png}', '${shot08Jpg}')
resample('${shot14Png}', '${shot14Jpg}')
"`, { stdio: 'inherit' });

  // -------------------------------------------------------------
  // 5. Verification & SHA-256 Manifest
  // -------------------------------------------------------------
  const manifest = {
    updated_at: new Date().toISOString(),
    files: [
      { file: 'shot-01.png', sha256: getSha256(shot01Png), size: fs.statSync(shot01Png).size, dimensions: '2560x1440' },
      { file: 'shot-01.jpg', sha256: getSha256(shot01Jpg), size: fs.statSync(shot01Jpg).size, dimensions: '1920x1080' },
      { file: 'cover-original-20261107.jpg', sha256: getSha256(coverJpg), size: fs.statSync(coverJpg).size, dimensions: '1920x1080' },
      { file: 'shot-08.png', sha256: getSha256(shot08Png), size: fs.statSync(shot08Png).size, dimensions: '2560x1440' },
      { file: 'shot-08.jpg', sha256: getSha256(shot08Jpg), size: fs.statSync(shot08Jpg).size, dimensions: '1920x1080' },
      { file: 'shot-14.png', sha256: getSha256(shot14Png), size: fs.statSync(shot14Png).size, dimensions: '2560x1440' },
      { file: 'shot-14.jpg', sha256: getSha256(shot14Jpg), size: fs.statSync(shot14Jpg).size, dimensions: '1920x1080' },
      { file: 'shot-13.jpg (UNTOUCHED)', sha256: getSha256(path.join(TARGET_DIR, 'shot-13.jpg')), size: fs.statSync(path.join(TARGET_DIR, 'shot-13.jpg')).size, dimensions: '1920x1080' },
      { file: 'shot-13.png (UNTOUCHED)', sha256: getSha256(path.join(TARGET_DIR, 'shot-13.png')), size: fs.statSync(path.join(TARGET_DIR, 'shot-13.png')).size, dimensions: '2560x1440' }
    ]
  };

  fs.writeFileSync(path.join(EVIDENCE_DIR, 'ASSET_MANIFEST.json'), JSON.stringify(manifest, null, 2));
  console.log('\n=== Generation Complete! Manifest: ===\n', manifest);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

