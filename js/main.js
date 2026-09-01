/**
 * Pioneer 2026 Interactive OS Desktop Controller
 * Zero-dependency WebGL + GSAP + Native Web Audio Synthesizer
 */

// 1. Procedural Web Audio Synthesizer (Zero MP3 404s)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }
  
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playBlip(freq = 600, duration = 0.05, type = 'sine') {
    if (this.isMuted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playOpen() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.12);
  }
}

const audio = new SoundEngine();

// 2. High-Fidelity Photorealistic 3D Solar System Engine (Zero-404 Procedural Canvas Shaders)
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 52, 85);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  container.appendChild(renderer.domElement);

  // --- 1. 高擬真 Canvas Procedural 貼圖生成器 (保證 100% 渲染、絕無 CORS/404 斷圖) ---
  function generateProceduralTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (type === 'sun') {
      const grad = ctx.createRadialGradient(512, 256, 20, 512, 256, 512);
      grad.addColorStop(0, '#FFF5C0');
      grad.addColorStop(0.2, '#FFA500');
      grad.addColorStop(0.6, '#FF4500');
      grad.addColorStop(1, '#8B0000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // 動態日冕擾動斑紋
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = `rgba(255, ${Math.floor(160 + Math.random() * 95)}, 0, ${0.15 + Math.random() * 0.25})`;
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 45 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'mercury') {
      ctx.fillStyle = '#8B8884';
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 600; i++) {
        const v = Math.floor(70 + Math.random() * 90);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 6 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'venus') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#E3BB7B');
      grad.addColorStop(0.3, '#C89449');
      grad.addColorStop(0.7, '#DFAC6C');
      grad.addColorStop(1, '#B07830');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = 'rgba(255, 235, 180, 0.18)';
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 20 + 5);
      }
    } else if (type === 'earth') {
      // 湛藍海洋底色
      ctx.fillStyle = '#0F2C59';
      ctx.fillRect(0, 0, 1024, 512);

      // 大陸地塊 (綠/褐/黃)
      for (let i = 0; i < 90; i++) {
        const cx = Math.random() * 1024;
        const cy = 100 + Math.random() * 312;
        ctx.fillStyle = Math.random() > 0.4 ? '#2E6F40' : '#8D7B48';
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.random() * 90 + 30, Math.random() * 60 + 20, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      // 南北極白色冰帽
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 42);
      ctx.fillRect(0, 470, 1024, 42);
    } else if (type === 'earth_clouds') {
      ctx.clearRect(0, 0, 1024, 512);
      for (let i = 0; i < 180; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.25 + Math.random() * 0.55})`;
        ctx.beginPath();
        ctx.ellipse(Math.random() * 1024, 40 + Math.random() * 432, Math.random() * 70 + 20, Math.random() * 25 + 8, Math.random() * 0.6 - 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'moon') {
      ctx.fillStyle = '#A0A0A5';
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 300; i++) {
        ctx.fillStyle = 'rgba(60, 60, 65, 0.4)';
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 12 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'mars') {
      ctx.fillStyle = '#C1440E';
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = 'rgba(80, 20, 5, 0.25)';
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 16 + 4);
      }
      // 極冠
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 25);
      ctx.fillRect(0, 487, 1024, 25);
    } else if (type === 'jupiter') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#C9903E');
      grad.addColorStop(0.2, '#E0AE6A');
      grad.addColorStop(0.4, '#995B24');
      grad.addColorStop(0.6, '#D8A05E');
      grad.addColorStop(0.8, '#7D471C');
      grad.addColorStop(1, '#C9903E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(70,30,10,0.2)';
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 15 + 3);
      }

      // 木星大紅斑 (Great Red Spot)
      ctx.fillStyle = '#B22222';
      ctx.beginPath();
      ctx.ellipse(650, 320, 60, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FF7F50';
      ctx.beginPath();
      ctx.ellipse(650, 320, 35, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'saturn') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#E2BF7D');
      grad.addColorStop(0.3, '#C5A358');
      grad.addColorStop(0.6, '#DFC287');
      grad.addColorStop(1, '#B99344');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 10 + 2);
      }
    } else if (type === 'uranus') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#70D6D9');
      grad.addColorStop(0.5, '#4EA8DE');
      grad.addColorStop(1, '#64C4C7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
    } else if (type === 'neptune') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#274690');
      grad.addColorStop(0.4, '#1B3B6F');
      grad.addColorStop(0.7, '#2176FF');
      grad.addColorStop(1, '#0F2042');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 6 + 1);
      }
    } else if (type === 'pluto') {
      ctx.fillStyle = '#A0826C';
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = '#E8DCC4';
      ctx.beginPath();
      ctx.ellipse(450, 260, 100, 75, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // 生成土星卡西尼環縫透明光環貼圖
  function generateSaturnRingsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.15, 'rgba(200,165,110,0.65)');
    grad.addColorStop(0.48, 'rgba(230,195,140,0.85)');
    grad.addColorStop(0.53, 'rgba(0,0,0,0.05)'); // 卡西尼環縫 (Cassini Division)
    grad.addColorStop(0.58, 'rgba(215,180,125,0.8)');
    grad.addColorStop(0.85, 'rgba(160,130,85,0.45)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);
    return new THREE.CanvasTexture(canvas);
  }

  // 1. 太陽系主體容器與宇宙光照
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // 環境光提升以確保所有星球立體可見
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambientLight);

  // 太陽中心點光源
  const sunLight = new THREE.PointLight(0xffeedd, 3.5, 400);
  sunLight.position.set(0, 0, 0);
  solarSystem.add(sunLight);

  // 補光方向燈
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(0, 60, 40);
  scene.add(dirLight);

  // --- 2. 太陽本體與大氣等離子耀斑光暈 (The Sun) ---
  const sunGeo = new THREE.SphereGeometry(6.2, 64, 64);
  const sunMat = new THREE.MeshBasicMaterial({
    map: generateProceduralTexture('sun')
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  solarSystem.add(sunMesh);

  // 太陽發光耀斑 (真實發光 Sprite Halo - 無任何網格線)
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 256;
  haloCanvas.height = 256;
  const haloCtx = haloCanvas.getContext('2d');
  const haloGrad = haloCtx.createRadialGradient(128, 128, 10, 128, 128, 128);
  haloGrad.addColorStop(0, 'rgba(255, 230, 120, 0.95)');
  haloGrad.addColorStop(0.25, 'rgba(255, 120, 20, 0.55)');
  haloGrad.addColorStop(0.6, 'rgba(255, 60, 0, 0.18)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  haloCtx.fillStyle = haloGrad;
  haloCtx.fillRect(0, 0, 256, 256);

  const haloMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(haloCanvas),
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  const sunHalo = new THREE.Sprite(haloMat);
  sunHalo.scale.set(28, 28, 1);
  solarSystem.add(sunHalo);

  // --- 3. 完整 9 大天體 (視角距離精準配置，全數納入可視範圍) ---
  const planetsConfig = [
    { name: 'Mercury', size: 0.9, dist: 11, speed: 0.024, type: 'mercury' },
    { name: 'Venus',   size: 1.4, dist: 16, speed: 0.017, type: 'venus' },
    { name: 'Earth',   size: 1.6, dist: 22, speed: 0.012, type: 'earth', isEarth: true },
    { name: 'Mars',    size: 1.1, dist: 28, speed: 0.009, type: 'mars' },
    { name: 'Jupiter', size: 3.6, dist: 38, speed: 0.006, type: 'jupiter' },
    { name: 'Saturn',  size: 2.9, dist: 49, speed: 0.004, type: 'saturn', hasRings: true },
    { name: 'Uranus',  size: 2.1, dist: 59, speed: 0.003, type: 'uranus' },
    { name: 'Neptune', size: 2.0, dist: 68, speed: 0.002, type: 'neptune' },
    { name: 'Pluto',   size: 0.7, dist: 76, speed: 0.0015, type: 'pluto' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    solarSystem.add(orbitGroup);

    // 半透明優雅軌道線
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    solarSystem.add(orbitLine);

    // 行星本體
    const pGeo = new THREE.SphereGeometry(p.size, 64, 64);
    const pMat = new THREE.MeshStandardMaterial({
      map: generateProceduralTexture(p.type),
      roughness: 0.65,
      metalness: 0.1
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitGroup.add(pMesh);

    // 地球專屬：動態半透明雲層與月球
    if (p.isEarth) {
      const cloudGeo = new THREE.SphereGeometry(p.size + 0.04, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: generateProceduralTexture('earth_clouds'),
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      pMesh.add(cloudMesh);
      p.cloudMesh = cloudMesh;

      // 月球
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
      const moonMat = new THREE.MeshStandardMaterial({
        map: generateProceduralTexture('moon'),
        roughness: 0.8
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 2.8;
      moonPivot.add(moonMesh);
      p.moonPivot = moonPivot;
    }

    // 土星專屬：卡西尼環縫雙面光環 (Saturn Rings)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 2.4, 64);
      // 調整 UV 讓漸變沿半徑展開
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const dist = Math.sqrt(vx * vx + vy * vy);
        const u = (dist - p.size * 1.3) / (p.size * 1.1);
        uvs.setXY(i, u, 0.5);
      }
      const ringMat = new THREE.MeshBasicMaterial({
        map: generateSaturnRingsTexture(),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      pMesh.add(ringMesh);
    }

    planetNodes.push({
      orbit: orbitGroup,
      mesh: pMesh,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
      cloudMesh: p.cloudMesh,
      moonPivot: p.moonPivot
    });
  });

  // --- 4. 小行星帶 (Asteroids - 火星與木星之間) ---
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidCount = 1600;
  const asteroidPos = new Float32Array(asteroidCount * 3);
  for (let i = 0; i < asteroidCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 6 + 32;
    const angle = Math.random() * Math.PI * 2;
    asteroidPos[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 2;
    asteroidPos[i3 + 1] = (Math.random() - 0.5) * 1.8;
    asteroidPos[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 2;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({ color: 0xBAA082, size: 0.45, transparent: true, opacity: 0.75 });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  solarSystem.add(asteroidBelt);

  // --- 5. 宇宙深空背景 (4,000 顆彩色星光) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 3500;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 700;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.5, transparent: true, opacity: 0.85 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // --- 6. 滑鼠物理視差與動畫循環 ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    solarSystem.rotation.y = targetX * 0.25;
    solarSystem.rotation.x = 0.55 + (targetY * 0.15);

    sunMesh.rotation.y += 0.003;
    asteroidBelt.rotation.y += 0.0008;

    planetNodes.forEach(node => {
      node.angle += node.speed * 0.3;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;

      // 地球雙層動態：雲層比地表轉得更快
      if (node.cloudMesh) {
        node.cloudMesh.rotation.y += 0.02;
      }
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.03;
      }
    });

    stars.rotation.y -= 0.0001;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// 3. Multi-Window Management Engine
let topZ = 100;
function focusWindow(el) {
  topZ += 1;
  el.style.zIndex = topZ;
  document.querySelectorAll('.os-window').forEach(w => w.classList.remove('active-window'));
  el.classList.add('active-window');
}

function openWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  audio.playOpen();
  win.classList.remove('hidden');
  focusWindow(win);

  gsap.fromTo(win, 
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.5)' }
  );
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  audio.playBlip(300, 0.08, 'square');
  gsap.to(win, {
    scale: 0.85,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => win.classList.add('hidden')
  });
}

// 4. Initialization & Telemetry
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  init3D();

  // Clock Telemetry
  function updateTime() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const now = new Date();
    const tpe = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
    clockEl.innerText = `TPE ${tpe} (UTC+8)`;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Audio Toggle Button
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audio.isMuted = !audio.isMuted;
      audioBtn.innerHTML = audio.isMuted ? '<i data-lucide="volume-x" class="w-3.5 h-3.5 text-red-400"></i>' : '<i data-lucide="volume-2" class="w-3.5 h-3.5 text-green-400"></i>';
      lucide.createIcons();
      if (!audio.isMuted) audio.playBlip(700, 0.05);
    });
  }

  // Setup GSAP Draggables for Windows
  document.querySelectorAll('.os-window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
    if (window.Draggable) {
      Draggable.create(win, {
        handle: win.querySelector('.window-header'),
        bounds: window,
        edgeResistance: 0.65,
        onPress: () => {
          focusWindow(win);
          audio.playBlip(480, 0.03);
        }
      });
    }
  });

  // macOS Dock Hover Scale Physics
  const dock = document.getElementById('main-dock');
  if (dock) {
    const items = dock.querySelectorAll('.dock-item');
    dock.addEventListener('mousemove', (e) => {
      const rect = dock.getBoundingClientRect();
      const mouseX = e.clientX;

      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(mouseX - itemCenter);
        const maxDist = 120;

        if (distance < maxDist) {
          const scale = 1 + (0.45 * (1 - distance / maxDist));
          gsap.to(item, { scale: scale, y: -(scale - 1) * 16, duration: 0.15 });
        } else {
          gsap.to(item, { scale: 1, y: 0, duration: 0.15 });
        }
      });
    });

    dock.addEventListener('mouseleave', () => {
      items.forEach(item => gsap.to(item, { scale: 1, y: 0, duration: 0.25 }));
    });
  }

  // Showreel Mock Timeline Scrubber
  const playBtn = document.getElementById('reel-play-btn');
  const progressBar = document.getElementById('reel-progress');
  let isPlaying = false;
  let progressTween = null;

  if (playBtn && progressBar) {
    playBtn.addEventListener('click', () => {
      audio.playBlip(550, 0.06);
      isPlaying = !isPlaying;
      playBtn.innerHTML = isPlaying ? '<i data-lucide="pause" class="w-4 h-4"></i>' : '<i data-lucide="play" class="w-4 h-4"></i>';
      lucide.createIcons();

      if (isPlaying) {
        progressTween = gsap.fromTo(progressBar, { width: '0%' }, {
          width: '100%',
          duration: 42,
          ease: 'none',
          onComplete: () => {
            isPlaying = false;
            playBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i>';
            lucide.createIcons();
          }
        });
      } else if (progressTween) {
        progressTween.pause();
      }
    });
  }
});
