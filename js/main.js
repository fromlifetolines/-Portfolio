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

// 2. High-End Cinematic Solar System & Deep Galaxy Engine
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 55, 95);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  // 1. 動態 Procedural 行星表面與大氣紋理生成器 (Canvas Generated Textures)
  function createPlanetTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (type === 'sun') {
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, '#ffcc00');
      grad.addColorStop(0.5, '#ff6600');
      grad.addColorStop(1, '#ff3300');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.4)' : 'rgba(255,100,0,0.3)';
        ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 6, Math.random() * 4);
      }
    } else if (type === 'earth') {
      ctx.fillStyle = '#0f3875';
      ctx.fillRect(0, 0, 512, 256);
      // 大陸板塊與雲層
      ctx.fillStyle = '#227744';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 35 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < 60; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 70, Math.random() * 8);
      }
    } else if (type === 'jupiter') {
      for (let y = 0; y < 256; y += 4) {
        const shade = Math.sin(y * 0.1) * 30 + 180;
        ctx.fillStyle = `rgb(${shade + 40}, ${shade}, ${shade - 30})`;
        ctx.fillRect(0, y, 512, 4);
      }
      // 大紅斑
      ctx.fillStyle = '#cc4422';
      ctx.beginPath();
      ctx.ellipse(320, 160, 45, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'mars') {
      ctx.fillStyle = '#b33917';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#802008';
      for (let i = 0; i < 50; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 40, Math.random() * 15);
      }
    } else {
      ctx.fillStyle = '#888899';
      ctx.fillRect(0, 0, 512, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }

  // 2. 太陽系主容器與燈光
  const universeGroup = new THREE.Group();
  scene.add(universeGroup);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xfff0dd, 4.5, 350, 0.6);
  sunLight.position.set(0, 0, 0);
  universeGroup.add(sunLight);

  // --- 3. 太陽 (The Sun with Solar Corona) ---
  const sunGeo = new THREE.SphereGeometry(6.5, 48, 48);
  const sunMat = new THREE.MeshBasicMaterial({
    map: createPlanetTexture('sun')
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  universeGroup.add(sunMesh);

  // 日冕發光層 (Solar Corona)
  const coronaGeo = new THREE.SphereGeometry(7.8, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xff6a00,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  universeGroup.add(coronaMesh);

  // --- 4. 10,000 顆發光螺旋星系旋臂 (Spiral Arms Starfield) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 10000;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 140 + 10;
    const branch = (i % 3) * ((2 * Math.PI) / 3);
    const spin = r * 0.04;

    const randX = (Math.random() - 0.5) * (r * 0.25);
    const randY = (Math.random() - 0.5) * 12;
    const randZ = (Math.random() - 0.5) * (r * 0.25);

    starPositions[i3] = Math.cos(branch + spin) * r + randX;
    starPositions[i3 + 1] = randY;
    starPositions[i3 + 2] = Math.sin(branch + spin) * r + randZ;

    const color = new THREE.Color(r < 50 ? 0xffccaa : 0x66ccff);
    starColors[i3] = color.r;
    starColors[i3 + 1] = color.g;
    starColors[i3 + 2] = color.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const galaxyStars = new THREE.Points(starGeo, starMat);
  universeGroup.add(galaxyStars);

  // --- 5. 實體行星配置 (大尺寸、具備高解析度與自轉) ---
  const planetsConfig = [
    { name: '水星 Mercury', size: 1.1, dist: 12, speed: 0.024, color: 0x9e9e9e, texture: 'mercury' },
    { name: '金星 Venus',   size: 1.7, dist: 18, speed: 0.017, color: 0xe3bb7b, texture: 'venus' },
    { name: '地球 Earth',   size: 2.0, dist: 26, speed: 0.012, color: 0x2277ff, texture: 'earth', hasMoon: true },
    { name: '火星 Mars',    size: 1.4, dist: 35, speed: 0.009, color: 0xcc4422, texture: 'mars' },
    { name: '木星 Jupiter', size: 4.8, dist: 49, speed: 0.006, color: 0xd4a373, texture: 'jupiter' },
    { name: '土星 Saturn',  size: 3.8, dist: 65, speed: 0.004, color: 0xe2bf7d, texture: 'saturn', hasRings: true },
    { name: '天王星 Uranus', size: 2.6, dist: 78, speed: 0.003, color: 0x70d6ff, texture: 'uranus' },
    { name: '海王星 Neptune',size: 2.5, dist: 90, speed: 0.002, color: 0x3344ff, texture: 'neptune' },
    { name: '冥王星 Pluto',  size: 0.9, dist: 100, speed: 0.0015, color: 0xaa9988, texture: 'pluto' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    universeGroup.add(orbitGroup);

    // 發光半透明軌道
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.12 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    universeGroup.add(orbitLine);

    // 行星本體
    const pGeo = new THREE.SphereGeometry(p.size, 32, 32);
    const pMat = new THREE.MeshStandardMaterial({
      map: createPlanetTexture(p.texture),
      roughness: 0.6,
      metalness: 0.1
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    pMesh.castShadow = true;
    pMesh.receiveShadow = true;
    orbitGroup.add(pMesh);

    // 土星光環
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 2.4, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xc8b27a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      ringMesh.rotation.y = 0.2;
      pMesh.add(ringMesh);
    }

    // 地球月球
    if (p.hasMoon) {
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.9 });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 3.4;
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

  // --- 6. 游標互動與動畫循環 ---
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

    universeGroup.rotation.y = targetX * 0.4;
    universeGroup.rotation.x = 0.55 + (targetY * 0.25);

    // 太陽旋轉與日冕
    sunMesh.rotation.y += 0.002;
    coronaMesh.rotation.y -= 0.003;
    coronaMesh.rotation.z += 0.001;

    // 行星公轉與自轉
    planetNodes.forEach(node => {
      node.angle += node.speed * 0.4;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.035;
      }
    });

    galaxyStars.rotation.y -= 0.0004;

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
