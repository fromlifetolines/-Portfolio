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

// 2. Three.js 實體 3D 銀河系與九大行星引擎 (無任何方塊)
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;

  // 清空畫布容器避免重複疊加
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 40, 70);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 1. 光源配置 (讓實體星球有立體光影)
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xffffff, 3, 200);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // 2. 太陽系主體容器
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // --- 太陽核心 (發光球體) ---
  const sunGeo = new THREE.SphereGeometry(4.2, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  solarSystem.add(sunMesh);

  // 太陽外層光暈
  const glowGeo = new THREE.SphereGeometry(4.8, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xff4500,
    transparent: true,
    opacity: 0.3
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  solarSystem.add(glowMesh);

  // --- 圓形星空星辰 (使用圓形紋理，告別方形粒子) ---
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  const starGeo = new THREE.BufferGeometry();
  const starCount = 800;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 250;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.8,
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.7
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // --- 九大行星配置 (全為真實 3D 球體) ---
  const planetsConfig = [
    { name: '水星 Mercury', size: 0.6, dist: 7, speed: 0.030, color: 0xaaaaaa },
    { name: '金星 Venus',   size: 1.0, dist: 11, speed: 0.022, color: 0xe3bb7b },
    { name: '地球 Earth',   size: 1.1, dist: 16, speed: 0.016, color: 0x2277ff, hasMoon: true },
    { name: '火星 Mars',    size: 0.8, dist: 21, speed: 0.013, color: 0xcc4422 },
    { name: '木星 Jupiter', size: 2.6, dist: 28, speed: 0.008, color: 0xddaa77 },
    { name: '土星 Saturn',  size: 2.2, dist: 37, speed: 0.006, color: 0xe2bf7d, hasRings: true },
    { name: '天王星 Uranus', size: 1.6, dist: 45, speed: 0.004, color: 0x70d6ff },
    { name: '海王星 Neptune',size: 1.5, dist: 52, speed: 0.003, color: 0x3344ff },
    { name: '冥王星 Pluto',  size: 0.5, dist: 58, speed: 0.002, color: 0x998877 }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitPivot = new THREE.Group();
    solarSystem.add(orbitPivot);

    // 繪製細緻圓形公轉軌道
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const points = orbitCurve.getPoints(100);
    const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(points.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
    solarSystem.add(orbitLine);

    // 行星 3D 圓球本體
    const pGeo = new THREE.SphereGeometry(p.size, 32, 32);
    const pMat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.6 });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitPivot.add(pMesh);

    // 土星環 (Saturn Rings)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xcbb68a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.4;
      pMesh.add(ringMesh);
    }

    // 地球月球 (Moon)
    if (p.hasMoon) {
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xdddddd });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 2.0;
      moonPivot.add(moonMesh);
      p.moonPivot = moonPivot;
    }

    planetNodes.push({
      orbit: orbitPivot,
      mesh: pMesh,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
      moonPivot: p.moonPivot
    });
  });

  // 游標互動
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // 視差俯仰角
    solarSystem.rotation.y = targetX * 0.4;
    solarSystem.rotation.x = 0.5 + (targetY * 0.25);

    // 太陽與光暈自轉
    sunMesh.rotation.y += 0.004;
    glowMesh.rotation.y -= 0.002;

    // 行星公轉與自轉
    planetNodes.forEach(node => {
      node.angle += node.speed * 0.5;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.02;
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.05;
      }
    });

    starField.rotation.y -= 0.0002;
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
