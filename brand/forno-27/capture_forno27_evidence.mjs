import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223;
const BASE_DIR = '/Users/howard/Desktop/Portfolio/brand/forno-27';
const EVIDENCE_DIR = path.join(BASE_DIR, 'presentation/live-evidence');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await sleep(1500);

  try {
    const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const versionData = await versionRes.json();
    console.log('Chrome CDP ready:', versionData.Browser);

    const targetUrl = `file://${BASE_DIR}/index.html`;
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${targetUrl}`, { method: 'PUT' });
    const targetData = await newTargetRes.json();
    const wsUrl = targetData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await new Promise(resolve => { ws.onopen = resolve; });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    async function setViewport(width, height, isMobile = false) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: isMobile
      });
      await sleep(500);
    }

    async function capture(filename, fullPage = false) {
      const params = { format: 'png' };
      if (fullPage) {
        params.captureBeyondViewport = true;
      }
      const res = await send('Page.captureScreenshot', params);
      const buffer = Buffer.from(res.data, 'base64');
      const outPath = path.join(EVIDENCE_DIR, filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Saved screenshot: ${filename} (${buffer.length} bytes)`);
      return outPath;
    }

    // 1. Desktop 1440x900
    console.log('Capturing Desktop Evidence (1440x900)...');
    await setViewport(1440, 900, false);
    await sleep(1000);
    await capture('forno27_desktop_1440.png', false);
    await capture('forno27_desktop_fullpage.png', true);

    // 2. Mobile 390x844
    console.log('Capturing Mobile Evidence (390x844)...');
    await setViewport(390, 844, true);
    await sleep(1000);
    await capture('forno27_mobile_390.png', false);
    await capture('forno27_mobile_fullpage.png', true);

    // 3. Digital Ordering Mobile Test (SHOT 17)
    console.log('Capturing SHOT 17 Digital Ordering Mobile Test...');
    await send('Page.navigate', { url: `file://${BASE_DIR}/assets/commerce/shot-17-digital-ordering.html` });
    await sleep(1500);
    await setViewport(390, 844, true);
    await sleep(800);
    await capture('forno27_shot17_mobile_test.png', false);

    ws.close();
  } catch (err) {
    console.error('Error during evidence capture:', err);
  } finally {
    chromeProcess.kill('SIGTERM');
  }
}

main();
