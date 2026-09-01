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

// 2. NASA-Grade Photorealistic 3D Solar System & Deep Space Engine (Ref: maoxin1234/solar-system-3d)
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(0, 60, 110);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  container.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  // 開源高解析度 NASA 天文貼圖 CDN (Solar System Scope / Rawgit Mirrors)
  const NASA_CDN = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/';
  const NASA_EXT = 'https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/images/';

  // 1. 太陽系主體容器與宇宙光照
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambientLight);

  // 太陽中心真實強光
  const sunLight = new THREE.PointLight(0xffffff, 4.0, 800, 0.6);
  sunLight.position.set(0, 0, 0);
  solarSystem.add(sunLight);

  // --- 2. 太陽本體與大氣等離子輝光 (The Sun) ---
  const sunTexture = textureLoader.load(NASA_EXT + 'sun.jpg');
  const sunGeo = new THREE.SphereGeometry(7.5, 64, 64);
  const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  solarSystem.add(sunMesh);

  // 太陽日冕光暈
  const coronaGeo = new THREE.SphereGeometry(8.5, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xff7700,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  solarSystem.add(coronaMesh);

  // --- 3. NASA 9 大天體配置清單 ---
  const planetsConfig = [
    { name: 'Mercury', size: 1.1, dist: 14, speed: 0.024, texture: 'moon_1024.jpg' },
    { name: 'Venus',   size: 1.8, dist: 22, speed: 0.017, texture: 'venus_atmosphere.jpg' },
    { name: 'Earth',   size: 2.2, dist: 33, speed: 0.012, texture: 'earth_atmos_2048.jpg', isEarth: true },
    { name: 'Mars',    size: 1.4, dist: 44, speed: 0.009, texture: 'mars_1k_color.jpg' },
    { name: 'Jupiter', size: 5.5, dist: 66, speed: 0.006, texture: 'jupiter2_1k.jpg' },
    { name: 'Saturn',  size: 4.4, dist: 86, speed: 0.004, texture: 'saturnmap.jpg', hasRings: true },
    { name: 'Uranus',  size: 2.8, dist: 104, speed: 0.003, texture: 'uranusmap.jpg' },
    { name: 'Neptune', size: 2.7, dist: 120, speed: 0.002, texture: 'neptunemap.jpg' },
    { name: 'Pluto',   size: 0.8, dist: 132, speed: 0.0015, texture: 'plutomap1k.jpg' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    solarSystem.add(orbitGroup);

    // 繪製半透明極簡軌道線
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    solarSystem.add(orbitLine);

    // 載入 NASA 實體地表貼圖
    const pTexture = textureLoader.load(
      p.texture.includes('map') || p.texture.includes('atmos') || p.texture.includes('color') || p.texture.includes('jupiter') || p.texture.includes('moon')
        ? (p.texture.includes('venus') ? NASA_EXT + p.texture : (p.texture.includes('mars') ? NASA_EXT + 'mars.jpg' : (p.texture.includes('jupiter') ? NASA_EXT + 'jupiter.jpg' : (p.texture.includes('saturn') ? NASA_EXT + 'saturn.jpg' : (p.texture.includes('uranus') ? NASA_EXT + 'uranus.jpg' : (p.texture.includes('neptune') ? NASA_EXT + 'neptune.jpg' : (p.texture.includes('pluto') ? NASA_EXT + 'pluto.jpg' : NASA_CDN + p.texture)))))))
        : NASA_CDN + p.texture
    );

    const pGeo = new THREE.SphereGeometry(p.size, 64, 64);
    const pMat = new THREE.MeshStandardMaterial({
      map: pTexture,
      roughness: 0.7,
      metalness: 0.1
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitGroup.add(pMesh);

    // 地球專屬：獨立 3D 動態雲層與月球
    if (p.isEarth) {
      // 雲層
      const cloudGeo = new THREE.SphereGeometry(p.size + 0.06, 64, 64);
      const cloudTexture = textureLoader.load(NASA_CDN + 'earth_clouds_1024.png');
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      pMesh.add(cloudMesh);
      p.cloudMesh = cloudMesh;

      // 月球
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const moonMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(NASA_CDN + 'moon_1024.jpg'),
        roughness: 0.9
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 4.2;
      moonPivot.add(moonMesh);
      p.moonPivot = moonPivot;
    }

    // 土星專屬：卡西尼環縫光環 (Saturn Rings)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 2.5, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(NASA_EXT + 'saturnringcolor.jpg'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88
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

  // --- 4. 火星與木星間真實小行星帶 (Asteroids) ---
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidCount = 1800;
  const asteroidPos = new Float32Array(asteroidCount * 3);
  for (let i = 0; i < asteroidCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 12 + 52;
    const angle = Math.random() * Math.PI * 2;
    asteroidPos[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 4;
    asteroidPos[i3 + 1] = (Math.random() - 0.5) * 3;
    asteroidPos[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 4;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({ color: 0x998877, size: 0.55, transparent: true, opacity: 0.75 });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  solarSystem.add(asteroidBelt);

  // --- 5. 宇宙深空背景 (4,000 顆立體真實星光) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 4000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 800;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, transparent: true, opacity: 0.8 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // --- 6. 滑鼠視差與動畫循環 ---
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

    solarSystem.rotation.y = targetX * 0.35;
    solarSystem.rotation.x = 0.65 + (targetY * 0.2);

    sunMesh.rotation.y += 0.002;
    coronaMesh.rotation.y -= 0.003;
    asteroidBelt.rotation.y += 0.001;

    planetNodes.forEach(node => {
      node.angle += node.speed * 0.35;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;

      // 地球雙層動態：雲層比地表轉得更快
      if (node.cloudMesh) {
        node.cloudMesh.rotation.y += 0.022;
      }
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.035;
      }
    });

    stars.rotation.y -= 0.0002;
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
