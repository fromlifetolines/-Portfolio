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

// 2. High-Precision Realistic Solar System Engine (Vibrant, Clear, HD Textures)
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 50, 95);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  // --- 1. 高擬真 Canvas Procedural 貼圖生成器 (高彩度與細緻細節) ---
  function generateTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (type === 'sun') {
      const grad = ctx.createLinearGradient(0, 0, 1024, 512);
      grad.addColorStop(0, '#ffbb00');
      grad.addColorStop(0.5, '#ff5500');
      grad.addColorStop(1, '#ff2200');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 800; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,200,0.6)' : 'rgba(255,80,0,0.4)';
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 6 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'mercury') {
      ctx.fillStyle = '#9e9e9e';
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = '#616161';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 20 + 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'venus') {
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#e5c185');
      grad.addColorStop(0.5, '#c69255');
      grad.addColorStop(1, '#e5c185');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = 'rgba(255, 235, 180, 0.4)';
      for (let i = 0; i < 40; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 512, Math.random() * 120 + 20, Math.random() * 15 + 4);
      }
    } else if (type === 'earth') {
      // 鮮明深藍海洋
      ctx.fillStyle = '#154c8a';
      ctx.fillRect(0, 0, 1024, 512);
      // 綠色大陸地塊
      ctx.fillStyle = '#2e8b57';
      for (let i = 0; i < 45; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 60 + 25, 0, Math.PI * 2);
        ctx.fill();
      }
      // 大氣白雲層
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let i = 0; i < 80; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 512, Math.random() * 140 + 30, Math.random() * 14 + 3);
      }
    } else if (type === 'mars') {
      ctx.fillStyle = '#c8441b';
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = '#7a2208';
      for (let i = 0; i < 60; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 512, Math.random() * 60 + 10, Math.random() * 20 + 5);
      }
      // 極冠白冰
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(0, 0, 1024, 25);
      ctx.fillRect(0, 487, 1024, 25);
    } else if (type === 'jupiter') {
      for (let y = 0; y < 512; y += 4) {
        const sinVal = Math.sin(y * 0.06);
        const r = Math.floor(210 + sinVal * 35);
        const g = Math.floor(150 + sinVal * 30);
        const b = Math.floor(100 + sinVal * 25);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, 1024, 4);
      }
      // 木星大紅斑
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.ellipse(650, 320, 75, 38, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'saturn') {
      for (let y = 0; y < 512; y += 4) {
        const shade = Math.floor(220 + Math.sin(y * 0.08) * 25);
        ctx.fillStyle = `rgb(${shade}, ${shade - 25}, ${shade - 65})`;
        ctx.fillRect(0, y, 1024, 4);
      }
    } else if (type === 'uranus') {
      ctx.fillStyle = '#7de3f4';
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 15 + 5);
      }
    } else if (type === 'neptune') {
      ctx.fillStyle = '#2747d8';
      ctx.fillRect(0, 0, 1024, 512);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < 25; i++) {
        ctx.fillRect(0, Math.random() * 512, 1024, Math.random() * 12 + 4);
      }
    } else {
      ctx.fillStyle = '#9e978e';
      ctx.fillRect(0, 0, 1024, 512);
    }
    return new THREE.CanvasTexture(canvas);
  }

  // --- 2. 空間光照與主系容器 ---
  const universe = new THREE.Group();
  scene.add(universe);

  // 全域均勻環境光 (確保星球清晰明亮)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  // 太陽中心點光源
  const sunLight = new THREE.PointLight(0xffeedd, 3.5, 600, 0.4);
  sunLight.position.set(0, 0, 0);
  universe.add(sunLight);

  // --- 3. 發光太陽核心與日冕 ---
  const sunGeo = new THREE.SphereGeometry(6.2, 48, 48);
  const sunMat = new THREE.MeshBasicMaterial({ map: generateTexture('sun') });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  universe.add(sunMesh);

  // 日冕微光層
  const coronaGeo = new THREE.SphereGeometry(7.6, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  universe.add(coronaMesh);

  // --- 4. 小行星帶 (Asteroid Belt: 火星與木星之間 1,500 顆立體微粒) ---
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidCount = 1500;
  const asteroidPos = new Float32Array(asteroidCount * 3);

  for (let i = 0; i < asteroidCount; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 7 + 43;
    const angle = Math.random() * Math.PI * 2;
    asteroidPos[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
    asteroidPos[i3 + 1] = (Math.random() - 0.5) * 2;
    asteroidPos[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({ color: 0xb09880, size: 0.55, transparent: true, opacity: 0.75 });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  universe.add(asteroidBelt);

  // --- 5. 8 大行星與冥王星實體配置 (尺寸比例調整，確保全覽清晰) ---
  const planetsConfig = [
    { name: 'Mercury', size: 1.1, dist: 13, speed: 0.026, type: 'mercury' },
    { name: 'Venus',   size: 1.7, dist: 20, speed: 0.019, type: 'venus' },
    { name: 'Earth',   size: 2.0, dist: 28, speed: 0.014, type: 'earth', hasMoon: true },
    { name: 'Mars',    size: 1.4, dist: 37, speed: 0.011, type: 'mars' },
    { name: 'Jupiter', size: 4.8, dist: 56, speed: 0.007, type: 'jupiter' },
    { name: 'Saturn',  size: 3.8, dist: 72, speed: 0.005, type: 'saturn', hasRings: true },
    { name: 'Uranus',  size: 2.6, dist: 86, speed: 0.0035, type: 'uranus' },
    { name: 'Neptune', size: 2.5, dist: 98, speed: 0.0025, type: 'neptune' },
    { name: 'Pluto',   size: 0.9, dist: 108, speed: 0.0018, type: 'pluto' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    universe.add(orbitGroup);

    // 發光半透明圓形軌道
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.15 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    universe.add(orbitLine);

    // 行星 3D 實體球
    const pGeo = new THREE.SphereGeometry(p.size, 32, 32);
    const pMat = new THREE.MeshStandardMaterial({
      map: generateTexture(p.type),
      roughness: 0.5,
      metalness: 0.15
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitGroup.add(pMesh);

    // 土星光環 (Saturn Rings)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 2.5, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xd4be88,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      pMesh.add(ringMesh);
    }

    // 地球月球公轉系統 (Moon)
    if (p.hasMoon) {
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.8 });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 3.6;
      moonPivot.add(moonMesh);
      p.moonPivot = moonPivot;
    }

    planetNodes.push({
      orbit: orbitGroup,
      mesh: pMesh,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
      moonPivot: p.moonPivot
    });
  });

  // --- 6. 深空背景星辰 (2,000 顆宇宙微塵) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 500;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.5 });
  const bgStars = new THREE.Points(starGeo, starMat);
  universe.add(bgStars);

  // --- 7. 動畫渲染循環與滑鼠視差 ---
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

    universe.rotation.y = targetX * 0.35;
    universe.rotation.x = 0.55 + (targetY * 0.2);

    // 太陽與日冕自轉
    sunMesh.rotation.y += 0.002;
    coronaMesh.rotation.y -= 0.003;

    // 小行星帶自轉
    asteroidBelt.rotation.y += 0.0008;

    // 行星公轉與自轉
    planetNodes.forEach(node => {
      node.angle += node.speed * 0.4;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.035;
      }
    });

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
