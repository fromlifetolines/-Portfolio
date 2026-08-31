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

// 2. AAA Cinematic Photorealistic Solar System Engine
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(0, 55, 110);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  container.appendChild(renderer.domElement);

  // --- 高階噪點演算法 (Perlin / Fractal Simplex Noise Generator for Photorealism) ---
  function createNoiseMap(width, height, octaves = 6, persistence = 0.5) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // 快速多頻率 Perlin 偽隨機噪點合成
    const permutation = [];
    for (let i = 0; i < 256; i++) permutation[i] = Math.floor(Math.random() * 256);
    const p = new Array(512);
    for (let i = 0; i < 512; i++) p[i] = permutation[i & 255];

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y) {
      const h = hash & 7;
      const u = h < 4 ? x : y;
      const v = h < 4 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    function noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const A = p[X] + Y, B = p[X + 1] + Y;
      return lerp(v, lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
                     lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)));
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let total = 0;
        let frequency = 0.008;
        let amplitude = 1;
        let maxValue = 0;
        for (let o = 0; o < octaves; o++) {
          total += noise(x * frequency, y * frequency) * amplitude;
          maxValue += amplitude;
          amplitude *= persistence;
          frequency *= 2;
        }
        const val = Math.floor(((total / maxValue) + 1) * 0.5 * 255);
        const idx = (y * width + x) * 4;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  // --- 生成真實物理級行星貼圖 ---
  function generateCinematicTexture(planetType) {
    const width = 1024, height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const noiseCanvas = createNoiseMap(width, height, 5, 0.55);
    const noiseCtx = noiseCanvas.getContext('2d');
    const nData = noiseCtx.getImageData(0, 0, width, height).data;

    const imgData = ctx.createImageData(width, height);
    const d = imgData.data;

    if (planetType === 'earth') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        if (n < 0.46) {
          // 深海至淺海漸層
          const oceanT = n / 0.46;
          d[idx] = Math.floor(10 * oceanT);
          d[idx + 1] = Math.floor(35 + 45 * oceanT);
          d[idx + 2] = Math.floor(90 + 90 * oceanT);
        } else if (n < 0.50) {
          // 海岸沙灘
          d[idx] = 194; d[idx + 1] = 178; d[idx + 2] = 128;
        } else if (n < 0.72) {
          // 植被與山地
          const landT = (n - 0.50) / 0.22;
          d[idx] = Math.floor(34 + 60 * landT);
          d[idx + 1] = Math.floor(95 + 40 * landT);
          d[idx + 2] = Math.floor(34 + 20 * landT);
        } else {
          // 高山雪原
          const snowT = (n - 0.72) / 0.28;
          d[idx] = Math.floor(160 + 95 * snowT);
          d[idx + 1] = Math.floor(160 + 95 * snowT);
          d[idx + 2] = Math.floor(170 + 85 * snowT);
        }
        d[idx + 3] = 255;
      }
    } else if (planetType === 'jupiter') {
      for (let y = 0; y < height; y++) {
        const bandNoise = Math.sin(y * 0.08) * 0.5 + 0.5;
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const n = nData[i * 4] / 255;
          const idx = i * 4;
          const blend = (bandNoise * 0.65 + n * 0.35);
          // 木星大氣湍流色系
          d[idx] = Math.floor(190 + 55 * Math.sin(blend * Math.PI * 3));
          d[idx + 1] = Math.floor(140 + 40 * Math.cos(blend * Math.PI * 2));
          d[idx + 2] = Math.floor(90 + 35 * blend);
          d[idx + 3] = 255;

          // 注入木星大紅斑 (Great Red Spot)
          const dx = (x - 680) / 75;
          const dy = (y - 320) / 38;
          if (dx * dx + dy * dy < 1.0) {
            d[idx] = 185;
            d[idx + 1] = 60;
            d[idx + 2] = 35;
          }
        }
      }
    } else if (planetType === 'mars') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = Math.floor(165 + 65 * n);
        d[idx + 1] = Math.floor(55 + 40 * n);
        d[idx + 2] = Math.floor(25 + 25 * n);
        d[idx + 3] = 255;
      }
    } else if (planetType === 'venus') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = Math.floor(215 + 35 * n);
        d[idx + 1] = Math.floor(175 + 40 * n);
        d[idx + 2] = Math.floor(110 + 30 * n);
        d[idx + 3] = 255;
      }
    } else if (planetType === 'saturn') {
      for (let y = 0; y < height; y++) {
        const band = Math.sin(y * 0.05) * 0.5 + 0.5;
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const n = nData[i * 4] / 255;
          const idx = i * 4;
          const v = band * 0.7 + n * 0.3;
          d[idx] = Math.floor(210 + 35 * v);
          d[idx + 1] = Math.floor(190 + 30 * v);
          d[idx + 2] = Math.floor(140 + 25 * v);
          d[idx + 3] = 255;
        }
      }
    } else if (planetType === 'sun') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        // 太陽等離子高動態表面
        d[idx] = 255;
        d[idx + 1] = Math.floor(130 + 125 * n);
        d[idx + 2] = Math.floor(20 + 60 * Math.pow(n, 3));
        d[idx + 3] = 255;
      }
    } else if (planetType === 'clouds') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = 255;
        d[idx + 1] = 255;
        d[idx + 2] = 255;
        d[idx + 3] = n > 0.52 ? Math.floor((n - 0.52) / 0.48 * 220) : 0;
      }
    } else if (planetType === 'neptune') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = Math.floor(20 + 30 * n);
        d[idx + 1] = Math.floor(65 + 60 * n);
        d[idx + 2] = Math.floor(200 + 55 * n);
        d[idx + 3] = 255;
      }
    } else if (planetType === 'uranus') {
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = Math.floor(100 + 40 * n);
        d[idx + 1] = Math.floor(210 + 40 * n);
        d[idx + 2] = Math.floor(225 + 30 * n);
        d[idx + 3] = 255;
      }
    } else {
      // 水星 / 冥王星 隕石坑地貌
      for (let i = 0; i < width * height; i++) {
        const n = nData[i * 4] / 255;
        const idx = i * 4;
        d[idx] = Math.floor(120 + 70 * n);
        d[idx + 1] = Math.floor(120 + 70 * n);
        d[idx + 2] = Math.floor(125 + 70 * n);
        d[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }

  // --- 生成土星卡西尼環縫真實紋理 (Saturn Ring Alpha Gradient) ---
  function generateSaturnRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.15, 'rgba(180,165,135,0.7)');
    grad.addColorStop(0.48, 'rgba(215,195,160,0.9)');
    grad.addColorStop(0.52, 'rgba(10,10,10,0.05)'); // 卡西尼縫 (Cassini Division)
    grad.addColorStop(0.56, 'rgba(195,175,140,0.85)');
    grad.addColorStop(0.88, 'rgba(160,140,115,0.5)');
    grad.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // --- 3. 宇宙主容器與真實太空點光源 ---
  const universe = new THREE.Group();
  scene.add(universe);

  // 微弱深空環境光 (保留背光面真實陰影與晨昏線)
  const ambientLight = new THREE.AmbientLight(0x1a2233, 0.45);
  scene.add(ambientLight);

  // 太陽中心真實強光
  const sunLight = new THREE.PointLight(0xfffaed, 5.2, 800, 0.5);
  sunLight.position.set(0, 0, 0);
  universe.add(sunLight);

  // --- 4. 電影級等離子發光太陽 (The Sun with Volumetric Radial Corona) ---
  const sunGeo = new THREE.SphereGeometry(6.8, 64, 64);
  const sunMat = new THREE.MeshBasicMaterial({
    map: generateCinematicTexture('sun')
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  universe.add(sunMesh);

  // 太陽真實柔和輝光層 (Additive Blending Halo)
  function createSunGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 20, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 200, 50, 1)');
    grad.addColorStop(0.3, 'rgba(255, 100, 10, 0.5)');
    grad.addColorStop(0.7, 'rgba(255, 50, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }
  const sunSpriteMat = new THREE.SpriteMaterial({
    map: createSunGlowTexture(),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95
  });
  const sunSprite = new THREE.Sprite(sunSpriteMat);
  sunSprite.scale.set(38, 38, 1);
  universe.add(sunSprite);

  // --- 5. 小行星帶 (Asteroid Belt: 3,000 顆三維不規則微粒) ---
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidCount = 3500;
  const asteroidPos = new Float32Array(asteroidCount * 3);
  const asteroidScales = new Float32Array(asteroidCount);

  for (let i = 0; i < asteroidCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 8 + 44;
    const theta = Math.random() * Math.PI * 2;
    asteroidPos[i3] = Math.cos(theta) * r + (Math.random() - 0.5) * 3;
    asteroidPos[i3 + 1] = (Math.random() - 0.5) * 2;
    asteroidPos[i3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 3;
    asteroidScales[i] = Math.random() * 0.4 + 0.15;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({
    color: 0x998877,
    size: 0.45,
    transparent: true,
    opacity: 0.8
  });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  universe.add(asteroidBelt);

  // --- 6. 8 大行星與冥王星 (高動態光影與物理細節) ---
  const planetsConfig = [
    { name: 'Mercury', size: 1.1, dist: 13.5, speed: 0.024, type: 'mercury', bumpScale: 0.05 },
    { name: 'Venus',   size: 1.7, dist: 20.5, speed: 0.018, type: 'venus', hasAtmosphere: true, atmosColor: 0xffd180 },
    { name: 'Earth',   size: 2.1, dist: 29.0, speed: 0.013, type: 'earth', hasClouds: true, hasMoon: true, hasAtmosphere: true, atmosColor: 0x00a2ff },
    { name: 'Mars',    size: 1.4, dist: 38.0, speed: 0.010, type: 'mars', hasAtmosphere: true, atmosColor: 0xcc5533 },
    { name: 'Jupiter', size: 5.2, dist: 58.0, speed: 0.006, type: 'jupiter' },
    { name: 'Saturn',  size: 4.2, dist: 75.0, speed: 0.004, type: 'saturn', hasRings: true },
    { name: 'Uranus',  size: 2.7, dist: 90.0, speed: 0.003, type: 'uranus', hasAtmosphere: true, atmosColor: 0x7de3f4 },
    { name: 'Neptune', size: 2.6, dist: 104.0, speed: 0.002, type: 'neptune', hasAtmosphere: true, atmosColor: 0x2747d8 },
    { name: 'Pluto',   size: 0.9, dist: 115.0, speed: 0.0014, type: 'pluto' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    universe.add(orbitGroup);

    // 幽微細緻的軌道線
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(160);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.08 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    universe.add(orbitLine);

    // 行星主體網格 (MeshStandardMaterial 呈現深邃明暗交界線)
    const pGeo = new THREE.SphereGeometry(p.size, 48, 48);
    const texture = generateCinematicTexture(p.type);
    const pMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.75,
      metalness: 0.1
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    orbitGroup.add(pMesh);

    // 大氣發光層 (Atmospheric Rim Fresnel)
    if (p.hasAtmosphere) {
      const atmosGeo = new THREE.SphereGeometry(p.size * 1.05, 32, 32);
      const atmosMat = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(p.atmosColor) }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
            gl_FragColor = vec4(color, intensity * 0.7);
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
      });
      const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
      pMesh.add(atmosMesh);
    }

    // 地球獨立雙層雲層 (Earth Dynamic Clouds)
    let cloudsMesh = null;
    if (p.hasClouds) {
      const cloudGeo = new THREE.SphereGeometry(p.size * 1.02, 48, 48);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: generateCinematicTexture('clouds'),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
      pMesh.add(cloudsMesh);
    }

    // 土星環 (Saturn Rings with Cassini Division)
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.35, p.size * 2.6, 64);
      // 修正 Ring UV 映射
      const pos = ringGeo.attributes.position;
      const v3 = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ringGeo.attributes.uv.setXY(i, (v3.length() - p.size * 1.35) / (p.size * 1.25), 0.5);
      }
      const ringMat = new THREE.MeshStandardMaterial({
        map: generateSaturnRingTexture(),
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.35;
      ringMesh.rotation.y = 0.15;
      pMesh.add(ringMesh);
    }

    // 地球月球公轉系統 (Earth Moon)
    let moonPivot = null;
    if (p.hasMoon) {
      moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.48, 24, 24);
      const moonMat = new THREE.MeshStandardMaterial({
        map: generateCinematicTexture('moon'),
        roughness: 0.9
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 3.8;
      moonPivot.add(moonMesh);
    }

    planetNodes.push({
      orbit: orbitGroup,
      mesh: pMesh,
      clouds: cloudsMesh,
      speed: p.speed,
      angle: Math.random() * Math.PI * 2,
      moonPivot: moonPivot
    });
  });

  // --- 7. 深空銀河星雲背景 (4,000 顆深邃冷暖星光) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 4000;
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPos[i3] = (Math.random() - 0.5) * 800;
    starPos[i3 + 1] = (Math.random() - 0.5) * 800;
    starPos[i3 + 2] = (Math.random() - 0.5) * 800;

    const shade = Math.random();
    const c = new THREE.Color(shade > 0.7 ? 0xffeedd : (shade > 0.3 ? 0x99ccff : 0xffffff));
    starColors[i3] = c.r;
    starColors[i3 + 1] = c.g;
    starColors[i3 + 2] = c.b;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });
  const bgStars = new THREE.Points(starGeo, starMat);
  universe.add(bgStars);

  // --- 8. 動畫渲染循環與滑鼠空間引力 ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.035;
    targetY += (mouseY - targetY) * 0.035;

    universe.rotation.y = targetX * 0.35;
    universe.rotation.x = 0.58 + (targetY * 0.2);

    // 太陽自轉與微幅呼吸脈衝
    sunMesh.rotation.y += 0.0018;

    // 小行星帶自轉
    asteroidBelt.rotation.y += 0.0006;

    // 行星公轉、自轉與大氣雲層相對運動
    planetNodes.forEach(node => {
      node.angle += node.speed * 0.35;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;

      // 地球雲層以不同速度獨立流動
      if (node.clouds) {
        node.clouds.rotation.y += 0.018;
      }
      if (node.moonPivot) {
        node.moonPivot.rotation.y += 0.03;
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
