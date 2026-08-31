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

// 2. Three.js Interactive 3D Solar System & Galaxy Engine
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 32, 65);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // --- 1. 深度銀河星空背景 (Galaxy Starfield) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1200;
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 220;
    starPos[i + 1] = (Math.random() - 0.5) * 220;
    starPos[i + 2] = (Math.random() - 0.5) * 220;

    // 銀河冷白、淡藍與金黃混色星光
    const shade = Math.random();
    starColors[i] = shade > 0.8 ? 1 : 0.6;
    starColors[i + 1] = shade > 0.5 ? 0.8 : 0.7;
    starColors[i + 2] = 1;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // --- 2. 太陽系主體容器 (Solar System Pivot) ---
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // 太陽中心 (The Sun)
  const sunGeo = new THREE.SphereGeometry(3.6, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xFFAA00 });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  solarSystem.add(sun);

  // 太陽大氣發光光暈 (Sun Glow Halo)
  const glowGeo = new THREE.SphereGeometry(4.4, 24, 24);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xFF4500,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const sunGlow = new THREE.Mesh(glowGeo, glowMat);
  solarSystem.add(sunGlow);

  // --- 3. 行星數據配置 (Planets Registry) ---
  const planetsConfig = [
    { name: 'Mercury', size: 0.45, dist: 6.5, speed: 0.035, color: 0xA5A5A5 },
    { name: 'Venus',   size: 0.85, dist: 9.5, speed: 0.024, color: 0xE3BB7B },
    { name: 'Earth',   size: 0.95, dist: 13.5, speed: 0.018, color: 0x2277FF, hasMoon: true },
    { name: 'Mars',    size: 0.60, dist: 17.5, speed: 0.014, color: 0xCC4422 },
    { name: 'Jupiter', size: 2.20, dist: 23.5, speed: 0.009, color: 0xDDAA77 },
    { name: 'Saturn',  size: 1.80, dist: 31.0, speed: 0.007, color: 0xE2BF7D, hasRings: true },
    { name: 'Uranus',  size: 1.30, dist: 38.0, speed: 0.005, color: 0x70D6FF },
    { name: 'Neptune', size: 1.25, dist: 44.0, speed: 0.004, color: 0x3344FF },
    { name: 'Pluto',   size: 0.35, dist: 49.0, speed: 0.003, color: 0x998877 }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    // 公轉軌道空物件
    const orbitPivot = new THREE.Group();
    solarSystem.add(orbitPivot);

    // 繪製軌道線 (Orbit Path Line)
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const points = orbitCurve.getPoints(64);
    const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(points.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitLineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 });
    const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
    solarSystem.add(orbitLine);

    // 行星本體
    const pGeo = new THREE.SphereGeometry(p.size, 24, 24);
    const pMat = new THREE.MeshBasicMaterial({ color: p.color });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitPivot.add(pMesh);

    // 土星光環 (Saturn Rings)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.3, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xCBB68A,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      pMesh.add(ringMesh);
    }

    // 地球月球 (Earth Moon)
    if (p.hasMoon) {
      const moonGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const moonMat = new THREE.MeshBasicMaterial({ color: 0xDDDDDD });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 1.6;
      pMesh.add(moonMesh);
    }

    planetNodes.push({
      orbit: orbitPivot,
      mesh: pMesh,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2
    });
  });

  // --- 4. 游標互動與動畫渲染循環 ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    // 滑鼠平滑慣性跟隨
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    solarSystem.rotation.y = targetX * 0.35;
    solarSystem.rotation.x = 0.45 + (targetY * 0.25);

    // 太陽旋轉與呼吸動效
    sun.rotation.y += 0.003;
    sunGlow.rotation.y -= 0.002;
    sunGlow.rotation.z += 0.001;

    // 行星公轉與自轉
    planetNodes.forEach(node => {
      node.angle += node.speed * 0.6;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.02;
    });

    // 銀河背景微動
    starField.rotation.y -= 0.0003;

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
