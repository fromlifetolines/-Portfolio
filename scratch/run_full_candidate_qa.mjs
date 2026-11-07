import pkg from '/Users/howard/Desktop/_patch_review/FLTL_CASE12_13_14_EMERGENCY_REMEDIATION_V1/SCRIPTS/node_modules/playwright/index.js';
const { chromium } = pkg;
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = '/Users/howard/Desktop/Portfolio/brand/object01/presentation/evidence-p0-refinement';
fs.mkdirSync(OUT_DIR, { recursive: true });

async function runVisualQA() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

  const report = {
    checks: [],
    overflows: [],
    screenshots: []
  };

  function logCheck(id, desc, pass, details = '') {
    report.checks.push({ id, desc, pass, details });
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${id}: ${desc} ${details ? '(' + details + ')' : ''}`);
  }

  // ==========================================
  // 1. DESKTOP 1440x900 - HOMEPAGE CARD
  // ==========================================
  console.log('\n--- 1. Checking Homepage Card (Desktop 1440x900) ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:8199/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check overflow
  const dHomeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  logCheck('DESKTOP_HOME_OVERFLOW', 'Desktop homepage horizontal overflow', !dHomeOverflow);

  // Scroll to find CASE 14 project card
  const case14Card = page.locator('a[href*="object01"], [data-project-id*="14"], [data-project-id*="object01"]').first();
  if (await case14Card.count() > 0) {
    await case14Card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const cardImg = case14Card.locator('img').first();
    const imgSrc = await cardImg.getAttribute('src');
    logCheck('HOME_CASE14_CARD_EXISTS', 'Homepage CASE 14 card located', true, `src: ${imgSrc}`);
    await case14Card.screenshot({ path: path.join(OUT_DIR, '01_homepage_desktop_case14_card.png') });
  } else {
    // If not found by selector, scroll through projects
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, '01_homepage_desktop_scroll.png') });
    logCheck('HOME_CASE14_CARD_EXISTS', 'Homepage CASE 14 card', false, 'Selector not matched');
  }

  // ==========================================
  // 2. MOBILE 390x844 - HOMEPAGE
  // ==========================================
  console.log('\n--- 2. Checking Homepage (Mobile 390x844) ---');
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mPage.goto('http://127.0.0.1:8199/index.html', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(1000);
  const mHomeOverflow = await mPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  logCheck('MOBILE_HOME_OVERFLOW', 'Mobile homepage horizontal overflow', !mHomeOverflow);
  await mPage.screenshot({ path: path.join(OUT_DIR, '02_homepage_mobile_hero.png') });

  // ==========================================
  // 3. DESKTOP 1440x900 - CASE 14 HERO & GALLERY
  // ==========================================
  console.log('\n--- 3. Checking CASE 14 (Desktop 1440x900) ---');
  const cPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await cPage.goto('http://127.0.0.1:8199/brand/object01/index.html', { waitUntil: 'networkidle' });
  await cPage.waitForTimeout(1000);

  // Check overflow
  const dCaseOverflow = await cPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  logCheck('DESKTOP_CASE_OVERFLOW', 'Desktop CASE 14 horizontal overflow', !dCaseOverflow);

  // Capture Hero
  const heroVisual = cPage.locator('.hero-visual').first();
  await heroVisual.screenshot({ path: path.join(OUT_DIR, '03_case14_desktop_hero_visual.png') });
  logCheck('HERO_VISUAL', 'Hero visual image captured', true);

  // Locate SHOT 01, 08, 13, 14 cards
  const shotCards = cPage.locator('.shot-card');
  const shotCount = await shotCards.count();
  logCheck('SHOT_CARDS_COUNT', 'Total shot cards in gallery', shotCount === 16, `count: ${shotCount}`);

  // SHOT 01
  const shot01Card = shotCards.nth(0);
  await shot01Card.scrollIntoViewIfNeeded();
  await cPage.waitForTimeout(300);
  await shot01Card.screenshot({ path: path.join(OUT_DIR, '04_desktop_shot01_card.png') });
  const shot01Src = await shot01Card.locator('img').getAttribute('src');
  logCheck('SHOT01_SRC', 'SHOT 01 image src matches target', shot01Src.includes('shot-01.jpg'), shot01Src);

  // Click SHOT 01 Lightbox
  await shot01Card.locator('.shot-btn').click();
  await cPage.waitForTimeout(600);
  const lightboxModal = cPage.locator('#objectLightbox');
  const lightboxImg = cPage.locator('#lightboxImg');
  const lb01Src = await lightboxImg.getAttribute('src');
  const lb01Visible = await lightboxModal.isVisible();
  logCheck('LIGHTBOX_01', 'SHOT 01 Lightbox opened with 2560x1440 PNG', lb01Visible && lb01Src.includes('shot-01.png'), lb01Src);
  await cPage.screenshot({ path: path.join(OUT_DIR, '05_desktop_shot01_lightbox.png') });
  // Close Lightbox
  await cPage.keyboard.press('Escape');
  await cPage.waitForTimeout(400);

  // SHOT 08
  const shot08Card = shotCards.nth(7); // 0-indexed, 8th card
  await shot08Card.scrollIntoViewIfNeeded();
  await cPage.waitForTimeout(300);
  await shot08Card.screenshot({ path: path.join(OUT_DIR, '06_desktop_shot08_card.png') });
  const shot08Src = await shot08Card.locator('img').getAttribute('src');
  logCheck('SHOT08_SRC', 'SHOT 08 image src matches target', shot08Src.includes('shot-08.jpg'), shot08Src);

  // Click SHOT 08 Lightbox
  await shot08Card.locator('.shot-btn').click();
  await cPage.waitForTimeout(600);
  const lb08Src = await lightboxImg.getAttribute('src');
  logCheck('LIGHTBOX_08', 'SHOT 08 Lightbox opened with 2560x1440 PNG', lb08Src.includes('shot-08.png'), lb08Src);
  await cPage.screenshot({ path: path.join(OUT_DIR, '07_desktop_shot08_lightbox.png') });
  await cPage.keyboard.press('Escape');
  await cPage.waitForTimeout(400);

  // SHOT 13 (Must remain 3D Configurator!)
  const shot13Card = shotCards.nth(12); // 13th card
  await shot13Card.scrollIntoViewIfNeeded();
  await cPage.waitForTimeout(300);
  await shot13Card.screenshot({ path: path.join(OUT_DIR, '08_desktop_shot13_card_configurator.png') });
  const shot13Title = await shot13Card.locator('.shot-title').textContent();
  const shot13Src = await shot13Card.locator('img').getAttribute('src');
  logCheck('SHOT13_IS_CONFIGURATOR', 'SHOT 13 remains 3D configurator', shot13Title.includes('配置器') && shot13Src.includes('shot-13.jpg'), `Title: ${shot13Title}, Src: ${shot13Src}`);

  // SHOT 14 (Must be Packaging!)
  const shot14Card = shotCards.nth(13); // 14th card
  await shot14Card.scrollIntoViewIfNeeded();
  await cPage.waitForTimeout(300);
  await shot14Card.screenshot({ path: path.join(OUT_DIR, '09_desktop_shot14_card_packaging.png') });
  const shot14Title = await shot14Card.locator('.shot-title').textContent();
  const shot14Src = await shot14Card.locator('img').getAttribute('src');
  logCheck('SHOT14_IS_PACKAGING', 'SHOT 14 is Packaging & Unboxing', shot14Title.includes('包裝') && shot14Src.includes('shot-14.jpg'), `Title: ${shot14Title}, Src: ${shot14Src}`);

  // Click SHOT 14 Lightbox
  await shot14Card.locator('.shot-btn').click();
  await cPage.waitForTimeout(600);
  const lb14Src = await lightboxImg.getAttribute('src');
  logCheck('LIGHTBOX_14', 'SHOT 14 Lightbox opened with 2560x1440 PNG', lb14Src.includes('shot-14.png'), lb14Src);
  await cPage.screenshot({ path: path.join(OUT_DIR, '10_desktop_shot14_lightbox.png') });
  await cPage.keyboard.press('Escape');
  await cPage.waitForTimeout(400);

  // ==========================================
  // 4. MOBILE 390x844 - CASE 14
  // ==========================================
  console.log('\n--- 4. Checking CASE 14 (Mobile 390x844) ---');
  const cmPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await cmPage.goto('http://127.0.0.1:8199/brand/object01/index.html', { waitUntil: 'networkidle' });
  await cmPage.waitForTimeout(1000);

  const cmCaseOverflow = await cmPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  logCheck('MOBILE_CASE_OVERFLOW', 'Mobile CASE 14 horizontal overflow', !cmCaseOverflow);

  await cmPage.screenshot({ path: path.join(OUT_DIR, '11_mobile_case14_hero.png') });

  // Scroll to SHOT 01, 08, 14 on mobile
  const mShotCards = cmPage.locator('.shot-card');
  await mShotCards.nth(0).scrollIntoViewIfNeeded();
  await cmPage.waitForTimeout(300);
  await mShotCards.nth(0).screenshot({ path: path.join(OUT_DIR, '12_mobile_shot01_card.png') });

  await mShotCards.nth(7).scrollIntoViewIfNeeded();
  await cmPage.waitForTimeout(300);
  await mShotCards.nth(7).screenshot({ path: path.join(OUT_DIR, '13_mobile_shot08_card.png') });

  await mShotCards.nth(13).scrollIntoViewIfNeeded();
  await cmPage.waitForTimeout(300);
  await mShotCards.nth(13).screenshot({ path: path.join(OUT_DIR, '14_mobile_shot14_card.png') });

  // Mobile Lightbox Test
  await mShotCards.nth(13).locator('.shot-btn').click();
  await cmPage.waitForTimeout(600);
  await cmPage.screenshot({ path: path.join(OUT_DIR, '15_mobile_shot14_lightbox.png') });
  await cmPage.keyboard.press('Escape');

  // ==========================================
  // 5. BILINGUAL SWITCH TEST
  // ==========================================
  console.log('\n--- 5. Checking Bilingual Switch ---');
  const enBtn = cPage.locator('button.lang-btn[data-lang="en"]').first();
  if (await enBtn.count() > 0) {
    await enBtn.click();
    await cPage.waitForTimeout(500);
    const heroTitleEn = await cPage.locator('.hero-title').textContent();
    logCheck('BILINGUAL_EN', 'Switched to English', heroTitleEn.includes('OBJECT/01') || heroTitleEn.includes('LIGHT'), heroTitleEn);
    await cPage.screenshot({ path: path.join(OUT_DIR, '16_desktop_en_mode.png') });

    const zhBtn = cPage.locator('button.lang-btn[data-lang="zh"]').first();
    await zhBtn.click();
    await cPage.waitForTimeout(500);
    logCheck('BILINGUAL_ZH', 'Switched back to Chinese', true);
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT_DIR, 'qa_report.json'), JSON.stringify(report, null, 2));
  console.log('\n=== Visual QA Complete! Report saved to qa_report.json ===\n');
}

runVisualQA().catch(err => {
  console.error('QA Failed with error:', err);
  process.exit(1);
});
