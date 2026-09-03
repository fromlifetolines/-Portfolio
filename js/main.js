/**
 * Pioneer 2026 Interactive OS Desktop Controller & Solar System Engine
 * Ref: maoxin1234/solar-system-3d & Layers.ai New Era
 * Integrated with Bilingual i18n Engine (Zero Delay Switch)
 */

// ========================================================
// 1. Procedural Web Audio Synthesizer (Zero MP3 404s)
// ========================================================
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
    gain.gain.setValueAtTime(0.11, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playOpen() {
    if (this.isMuted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.085, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.12);
  }
}

const audio = new SoundEngine();

// ========================================================
// 2. AAA Photorealistic 3D Solar System & Deep Space Light Engine
// ========================================================
function init3D() {
  const container = document.getElementById('webgl-canvas');
  if (!container) return;
  container.innerHTML = '';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(0, 52, 86);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();

  // 1. 太陽系主體容器與真實天文點光源
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  const ambientLight = new THREE.AmbientLight(0x0c1222, 0.35);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight(0xfff8ee, 4.8, 0, 0);
  sunLight.position.set(0, 0, 0);
  solarSystem.add(sunLight);

  // --- 2. GLSL 3D 動態等離子太陽 (NASA Plasma Shader) ---
  const COMMON_GLSL = `
    float hash3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
    float noise3(vec3 p){
      vec3 i=floor(p), f=fract(p);
      vec3 u=f*f*(3.0-2.0*f);
      return mix(
        mix(mix(hash3(i+vec3(0,0,0)), hash3(i+vec3(1,0,0)), u.x),
            mix(hash3(i+vec3(0,1,0)), hash3(i+vec3(1,1,0)), u.x), u.y),
        mix(mix(hash3(i+vec3(0,0,1)), hash3(i+vec3(1,0,1)), u.x),
            mix(hash3(i+vec3(0,1,1)), hash3(i+vec3(1,1,1)), u.x), u.y),
        u.z);
    }
    float fbm(vec3 p){
      float v=0.0, a=0.5;
      for(int i=0;i<5;i++){ v += a*noise3(p); p *= 2.0; a *= 0.5; }
      return v;
    }
    float turb(vec3 p){
      float v=0.0, a=0.5;
      for(int i=0;i<5;i++){ v += a*abs(noise3(p)*2.0-1.0); p *= 2.0; a *= 0.5; }
      return v;
    }
  `;

  const SUN_VS = `
    varying vec3 vN; varying vec3 vP; varying vec3 vLocal;
    void main(){
      vN = normalize(normalMatrix * normal);
      vLocal = normalize(position);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vP = mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `;

  const SUN_FS = COMMON_GLSL + `
    uniform float time;
    varying vec3 vN; varying vec3 vP; varying vec3 vLocal;
    void main(){
      vec3 wp = vLocal;
      
      // Multi-Octave boiling plasma noise
      vec3 p1 = wp * 3.0 + vec3(time * 0.05, time * 0.06, -time * 0.04);
      vec3 p2 = wp * 7.5 - vec3(time * 0.09, 0.0, time * 0.07);
      vec3 p3 = wp * 16.0 + vec3(0.0, -time * 0.14, time * 0.1);
      
      // Solar granulation cells (米粒組織)
      float gran = turb(wp * 22.0 + vec3(time * 0.12, 0.0, 0.0)) * 0.45;
      float plasma = turb(p1) * 0.55 + fbm(p2) * 0.35 + noise3(p3) * 0.15 + gran * 0.2;
      plasma = clamp(plasma * 1.6 - 0.1, 0.0, 1.8);
      
      // Thermonuclear gradient: Magma Red -> Intense Orange -> Radiant Gold -> Superhot White
      vec3 magmaRed  = vec3(0.48, 0.06, 0.01);
      vec3 plasmaOrg  = vec3(2.40, 0.75, 0.08);
      vec3 solarGold  = vec3(4.20, 2.30, 0.45);
      vec3 coreWhite  = vec3(5.80, 4.60, 3.20);
      
      vec3 col;
      if (plasma < 0.42) {
        col = mix(magmaRed, plasmaOrg, plasma / 0.42);
      } else if (plasma < 0.82) {
        col = mix(plasmaOrg, solarGold, (plasma - 0.42) / 0.40);
      } else {
        col = mix(solarGold, coreWhite, (plasma - 0.82) / 0.78);
      }

      // Dynamic Sunspots (黑子群)
      float spotNoise = noise3(wp * 1.6 + vec3(14.0, 8.0, 22.0));
      if (spotNoise > 0.64) {
        col *= mix(1.0, 0.12, smoothstep(0.64, 0.88, spotNoise));
      }

      // Micro-photosphere boiling grain
      float grain = noise3(wp * 42.0 + vec3(time * 0.5, 0.0, 0.0));
      col *= 0.88 + grain * 0.24;

      // Limb Darkening & Rim Flare (邊緣日珥發光)
      vec3 vd = normalize(-vP);
      float rim = 1.0 - max(dot(normalize(vN), vd), 0.0);
      col += vec3(4.2, 1.9, 0.5) * pow(rim, 2.2) * 0.75;
      
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const CORONA_VS = `
    varying vec3 vN; varying vec3 vP; varying vec3 vLocal;
    void main(){
      vN = normalize(normalMatrix * normal);
      vLocal = normalize(position);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vP = mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `;

  const CORONA_FS = COMMON_GLSL + `
    uniform float time;
    varying vec3 vN; varying vec3 vP; varying vec3 vLocal;
    void main(){
      vec3 vd = normalize(-vP);
      float fres = 1.0 - max(dot(normalize(vN), vd), 0.0);
      fres = pow(fres, 1.4);
      
      vec3 wp = vLocal;
      // High dynamic plasma eruptions & solar tongues (動態日珥噴發)
      float flame1 = turb(wp * 3.5 + vec3(time * 0.1, -time * 0.08, time * 0.09));
      float flame2 = fbm(wp * 10.0 - vec3(0.0, time * 0.16, time * 0.12)) * 0.5;
      float flame = clamp(flame1 + flame2, 0.0, 2.2);
      
      // Giant Solar Prominences (日珥卷弧)
      float prom = pow(noise3(wp * 2.2 + vec3(0.0, time * 0.06, 0.0)), 2.8) * 5.0;
      
      vec3 baseCol = vec3(3.2, 1.3, 0.35);
      vec3 hotCol = vec3(5.0, 2.8, 0.9);
      vec3 col = mix(baseCol, hotCol, flame * 0.45) * (0.7 + flame * 0.8 + prom * 0.8);
      float alpha = fres * (0.5 + flame * 0.45);
      
      gl_FragColor = vec4(col, alpha);
    }
  `;

  const sunUniforms = { time: { value: 0 } };
  const sunGeo = new THREE.SphereGeometry(6.0, 64, 64);
  const sunMat = new THREE.ShaderMaterial({
    vertexShader: SUN_VS,
    fragmentShader: SUN_FS,
    uniforms: sunUniforms
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  solarSystem.add(sunMesh);

  // 日冕動態火焰
  const coronaUniforms = { time: { value: 0 } };
  const coronaGeo = new THREE.SphereGeometry(6.5, 64, 64);
  const coronaMat = new THREE.ShaderMaterial({
    vertexShader: CORONA_VS,
    fragmentShader: CORONA_FS,
    uniforms: coronaUniforms,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  solarSystem.add(coronaMesh);

  // 外部柔和發光 Halo
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 512;
  haloCanvas.height = 512;
  const haloCtx = haloCanvas.getContext('2d');
  const haloGrad = haloCtx.createRadialGradient(256, 256, 20, 256, 256, 256);
  haloGrad.addColorStop(0, 'rgba(255, 220, 100, 0.7)');
  haloGrad.addColorStop(0.2, 'rgba(255, 120, 20, 0.35)');
  haloGrad.addColorStop(0.5, 'rgba(255, 60, 0, 0.08)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  haloCtx.fillStyle = haloGrad;
  haloCtx.fillRect(0, 0, 512, 512);

  const haloMat = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(haloCanvas),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const sunHalo = new THREE.Sprite(haloMat);
  sunHalo.scale.set(24, 24, 1);
  solarSystem.add(sunHalo);

  // --- 3. 地球專屬：晝夜晨昏 (Day/Night Terminator) + 夜間萬家燈火 ---
  const EARTH_VS = `
    varying vec3 vWorldNormal;
    varying vec3 vSunDir;
    varying vec2 vUv;
    varying vec3 vViewPos;

    void main() {
      vUv = uv;
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vSunDir = normalize(-worldPos.xyz);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPos = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const EARTH_FS = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    varying vec3 vWorldNormal;
    varying vec3 vSunDir;
    varying vec2 vUv;
    varying vec3 vViewPos;

    void main() {
      vec3 normal = normalize(vWorldNormal);
      vec3 sunDir = normalize(vSunDir);
      float nDotL = dot(normal, sunDir);

      float dayFactor = smoothstep(-0.15, 0.25, nDotL);
      float nightFactor = 1.0 - smoothstep(-0.25, 0.1, nDotL);

      vec4 dayCol = texture2D(dayTexture, vUv);
      vec4 nightCol = texture2D(nightTexture, vUv);

      vec3 ambient = vec3(0.02, 0.04, 0.08) * dayCol.rgb;
      vec3 daylight = dayCol.rgb * (dayFactor * 1.25);
      vec3 nightlight = nightCol.rgb * vec3(1.8, 1.4, 0.85) * nightFactor;

      vec3 viewDir = normalize(vViewPos);
      float rim = 1.0 - max(dot(normal, viewDir), 0.0);
      vec3 atmosphereGlow = vec3(0.18, 0.55, 1.0) * pow(rim, 3.2) * dayFactor * 0.9;

      vec3 finalCol = daylight + ambient + nightlight + atmosphereGlow;
      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;

  const CLOUDS_VS = `
    varying vec3 vWorldNormal;
    varying vec3 vSunDir;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vSunDir = normalize(-worldPos.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const CLOUDS_FS = `
    uniform sampler2D cloudTexture;
    varying vec3 vWorldNormal;
    varying vec3 vSunDir;
    varying vec2 vUv;

    void main() {
      vec4 cloudMap = texture2D(cloudTexture, vUv);
      float nDotL = dot(normalize(vWorldNormal), normalize(vSunDir));
      float dayFactor = smoothstep(-0.15, 0.25, nDotL);

      vec3 cloudColor = vec3(1.0, 1.0, 1.0) * (dayFactor * 1.1 + 0.05);
      float alpha = cloudMap.r * (dayFactor * 0.65 + 0.15);

      gl_FragColor = vec4(cloudColor, alpha);
    }
  `;

  // --- 4. NASA 9 大實體天體配置 ---
  const planetsConfig = [
    { name: 'Mercury', size: 0.95, dist: 11.5, speed: 0.024, texture: './assets/planets/mercury.jpg' },
    { name: 'Venus',   size: 1.45, dist: 16.8, speed: 0.017, texture: './assets/planets/venus.jpg' },
    { name: 'Earth',   size: 1.65, dist: 22.8, speed: 0.012, texture: './assets/planets/earth.jpg', isEarth: true },
    { name: 'Mars',    size: 1.15, dist: 28.5, speed: 0.009, texture: './assets/planets/mars.jpg' },
    { name: 'Jupiter', size: 3.8,  dist: 38.5, speed: 0.006, texture: './assets/planets/jupiter.jpg' },
    { name: 'Saturn',  size: 3.1,  dist: 49.5, speed: 0.004, texture: './assets/planets/saturn.jpg', hasRings: true },
    { name: 'Uranus',  size: 2.2,  dist: 59.8, speed: 0.003, texture: './assets/planets/uranus.jpg' },
    { name: 'Neptune', size: 2.1,  dist: 69.2, speed: 0.002, texture: './assets/planets/neptune.jpg' },
    { name: 'Pluto',   size: 0.75, dist: 77.0, speed: 0.0015, texture: './assets/planets/pluto.jpg' }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    const orbitGroup = new THREE.Group();
    solarSystem.add(orbitGroup);

    // 軌道線
    const orbitCurve = new THREE.EllipseCurve(0, 0, p.dist, p.dist, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(128);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
    const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.09 });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    solarSystem.add(orbitLine);

    // 行星實體
    const pGeo = new THREE.SphereGeometry(p.size, 64, 64);
    let pMesh;

    if (p.isEarth) {
      const earthMat = new THREE.ShaderMaterial({
        vertexShader: EARTH_VS,
        fragmentShader: EARTH_FS,
        uniforms: {
          dayTexture: { value: textureLoader.load(p.texture) },
          nightTexture: { value: textureLoader.load('./assets/planets/earth_night.jpg') }
        }
      });
      pMesh = new THREE.Mesh(pGeo, earthMat);
    } else {
      const pMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(p.texture),
        roughness: 0.88,
        metalness: 0.02
      });
      pMesh = new THREE.Mesh(pGeo, pMat);
    }

    pMesh.position.x = p.dist;
    orbitGroup.add(pMesh);

    // 地球專屬：動態半透明大氣雲層與月球
    if (p.isEarth) {
      const cloudGeo = new THREE.SphereGeometry(p.size + 0.05, 64, 64);
      const cloudMat = new THREE.ShaderMaterial({
        vertexShader: CLOUDS_VS,
        fragmentShader: CLOUDS_FS,
        uniforms: {
          cloudTexture: { value: textureLoader.load('./assets/planets/earth_clouds.jpg') }
        },
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      pMesh.add(cloudMesh);
      p.cloudMesh = cloudMesh;

      // 月球
      const moonPivot = new THREE.Group();
      pMesh.add(moonPivot);
      const moonGeo = new THREE.SphereGeometry(0.4, 32, 32);
      const moonMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load('./assets/planets/moon.jpg'),
        roughness: 0.95,
        metalness: 0.0
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 2.9;
      moonPivot.add(moonMesh);
      p.moonPivot = moonPivot;
    }

    // 土星專屬：光環
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.25, p.size * 2.45, 64);
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const dist = Math.sqrt(vx * vx + vy * vy);
        const u = (dist - p.size * 1.25) / (p.size * 1.2);
        uvs.setXY(i, u, 0.5);
      }
      const ringMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load('./assets/planets/saturn_ring.png'),
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.85,
        metalness: 0.05
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

  // --- 5. 小行星帶 (Asteroid Belt) ---
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidCount = 1600;
  const asteroidPos = new Float32Array(asteroidCount * 3);
  for (let i = 0; i < asteroidCount; i++) {
    const i3 = i * 3;
    const r = Math.random() * 6 + 32.5;
    const angle = Math.random() * Math.PI * 2;
    asteroidPos[i3] = Math.cos(angle) * r + (Math.random() - 0.5) * 2;
    asteroidPos[i3 + 1] = (Math.random() - 0.5) * 1.8;
    asteroidPos[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 2;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({ color: 0x9A8870, size: 0.45, transparent: true, opacity: 0.7 });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  solarSystem.add(asteroidBelt);

  // --- 6. 宇宙深空背景 (4,000 顆立體彩色星光 + 初始位置記憶) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 4000;
  const starPos = new Float32Array(starCount * 3);
  const starOrigPos = new Float32Array(starCount * 3);
  const starCol = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const px = (Math.random() - 0.5) * 800;
    const py = (Math.random() - 0.5) * 800;
    const pz = (Math.random() - 0.5) * 800;
    starPos[i3]     = px;
    starPos[i3 + 1] = py;
    starPos[i3 + 2] = pz;
    starOrigPos[i3]     = px;
    starOrigPos[i3 + 1] = py;
    starOrigPos[i3 + 2] = pz;

    const t = Math.random();
    const c = t < 0.7 ? [1, 1, 1] : t < 0.88 ? [0.75, 0.88, 1] : [1, 0.85, 0.7];
    starCol[i3] = c[0];
    starCol[i3 + 1] = c[1];
    starCol[i3 + 2] = c[2];
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
  const starMat = new THREE.PointsMaterial({ size: 0.65, vertexColors: true, transparent: true, opacity: 0.85 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // --- 7. 3D 鏡頭交互控制：滾輪平滑縮放 + 空白處拖曳旋轉 + 空間射線投射 ---
  let zoomDistance = 86;
  let targetZoomDistance = 86;
  const minZoom = 15;
  const maxZoom = 200;

  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let rotX = 0.55;
  let rotY = 0;
  let targetRotX = 0.55;
  let targetRotY = 0;
  let mouseX = 0, mouseY = 0;

  // 滑鼠空間射線投射器 (用於星塵物理排斥漣漪)
  const mouseRaycaster = new THREE.Raycaster();
  const mouseScreenVec = new THREE.Vector2(-999, -999);
  let hasMouseMoved = false;

  // 滑鼠滾輪縮放 (拉近拉遠)
  window.addEventListener('wheel', (e) => {
    if (e.target.closest('.os-window') || e.target.closest('.dock-container')) return;
    e.preventDefault();
    const zoomFactor = e.deltaY * 0.08;
    targetZoomDistance = Math.min(Math.max(targetZoomDistance + zoomFactor, minZoom), maxZoom);
  }, { passive: false });

  // 拖曳旋轉背景
  window.addEventListener('mousedown', (e) => {
    if (e.target.closest('.os-window') || e.target.closest('.dock-container') || e.target.closest('.system-bar') || e.target.closest('.desktop-icon')) return;
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    hasMouseMoved = true;
    mouseScreenVec.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreenVec.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotY += deltaX * 0.006;
      targetRotX += deltaY * 0.006;
      targetRotX = Math.min(Math.max(targetRotX, 0.05), Math.PI * 0.48);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    } else {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 雙擊空白處平滑重置最佳視角
  window.addEventListener('dblclick', (e) => {
    if (e.target.closest('.os-window') || e.target.closest('.dock-container') || e.target.closest('.system-bar') || e.target.closest('.desktop-icon')) return;
    targetZoomDistance = 86;
    targetRotX = 0.55;
    targetRotY = 0;
  });

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    sunUniforms.time.value = elapsedTime;
    coronaUniforms.time.value = elapsedTime;

    zoomDistance += (targetZoomDistance - zoomDistance) * 0.08;
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;

    const pitch = rotX + (isDragging ? 0 : mouseY * 0.04);
    const yaw = rotY + (isDragging ? 0 : mouseX * 0.06);

    camera.position.x = Math.sin(yaw) * Math.cos(pitch) * zoomDistance;
    camera.position.y = Math.sin(pitch) * zoomDistance;
    camera.position.z = Math.cos(yaw) * Math.cos(pitch) * zoomDistance;
    camera.lookAt(0, 0, 0);

    sunMesh.rotation.y += 0.002;
    coronaMesh.rotation.y -= 0.001;
    asteroidBelt.rotation.y += 0.0008;

    // --- 滑鼠物理斥力星塵漣漪 (Raycasting Dynamic Star Ripple) ---
    if (hasMouseMoved) {
      mouseRaycaster.setFromCamera(mouseScreenVec, camera);
      const rayOrigin = mouseRaycaster.ray.origin;
      const rayDir = mouseRaycaster.ray.direction;
      const repulsionRadius = 18.0;
      const repulsionForce = 9.0;
      const radiusSq = repulsionRadius * repulsionRadius;
      const posArr = starGeo.attributes.position.array;

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const px = posArr[i3];
        const py = posArr[i3 + 1];
        const pz = posArr[i3 + 2];

        // 空間射線投射：計算星辰至射線的最短垂直距離
        const vx = px - rayOrigin.x;
        const vy = py - rayOrigin.y;
        const vz = pz - rayOrigin.z;
        const t = vx * rayDir.x + vy * rayDir.y + vz * rayDir.z;

        if (t > 0.0) {
          const cx = rayOrigin.x + rayDir.x * t;
          const cy = rayOrigin.y + rayDir.y * t;
          const cz = rayOrigin.z + rayDir.z * t;

          const diffX = px - cx;
          const diffY = py - cy;
          const diffZ = pz - cz;
          const distSq = diffX * diffX + diffY * diffY + diffZ * diffZ;

          // 當星辰進入滑鼠半徑 18 單位內時，產生向外推散的排斥位移
          if (distSq < radiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const factor = (1.0 - dist / repulsionRadius) * repulsionForce;
            const invDist = 1.0 / dist;
            posArr[i3]     += diffX * invDist * factor;
            posArr[i3 + 1] += diffY * invDist * factor;
            posArr[i3 + 2] += diffZ * invDist * factor;
          }
        }

        // 滑鼠移開後，粒子以平滑阻尼（Lerp 0.05）自然回彈歸位
        posArr[i3]     += (starOrigPos[i3] - posArr[i3]) * 0.05;
        posArr[i3 + 1] += (starOrigPos[i3 + 1] - posArr[i3 + 1]) * 0.05;
        posArr[i3 + 2] += (starOrigPos[i3 + 2] - posArr[i3 + 2]) * 0.05;
      }
      starGeo.attributes.position.needsUpdate = true;
    }

    planetNodes.forEach(node => {
      node.angle += node.speed * 0.3;
      node.orbit.rotation.y = node.angle;
      node.mesh.rotation.y += 0.015;

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

// ========================================================
// 3. Multi-Window Management Engine (Fluid Kinetic Transitions)
// ========================================================
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

  const v = win.querySelector('video');
  if (v) {
    v.play().catch(() => {});
  }

  gsap.fromTo(win, 
    { scale: 0.92, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.32, ease: 'power3.out' }
  );
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  audio.playBlip(300, 0.08, 'square');
  gsap.to(win, {
    scale: 0.92,
    opacity: 0,
    duration: 0.22,
    ease: 'power2.in',
    onComplete: () => {
      win.classList.add('hidden');
      const v = win.querySelector('video');
      if (v) v.pause();
    }
  });
}

function toggleMaximize(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  audio.playBlip(550, 0.04);
  win.classList.toggle('is-maximized');
}

// ========================================================
// 4. Bilingual i18n Engine (Zero Delay Client-Side Switcher)
// ========================================================
const i18nData = {
  zh: {
    // Navigation & Desktop Icons
    nav_about: '[ 01_ABOUT 設計定位 ]',
    nav_services: '[ 02_SERVICES 服務項目 ]',
    nav_projects: '[ 03_PROJECTS 精選專案 ]',
    nav_showreel: '[ 04_SHOWREEL 動態展示 ]',
    nav_nfc: '[ 05_NFC 智慧名片 ]',
    
    icon_about: '01_ABOUT.os',
    icon_services: '02_SERVICES.os',
    icon_projects: '03_PROJECTS.os',
    icon_showreel: '04_SHOWREEL.mp4',
    icon_nfc: '05_NFC.os',

    // 01_ABOUT Window
    win_about_badge: '10+ YRS DATA x DESIGN',
    win_about_tag: '10+ Yrs Google Ads & Commercial Design',
    win_about_title_html: '好的設計解決溝通問題，<br class="hidden sm:inline">好的行銷帶來商業轉換。',
    win_about_subtitle: 'Clear communication. Measurable conversion.',
    win_about_desc_1: '從 Google Ads 廣告諮詢起步，我花了 10 年在轉換率、跳出率與投放預算裡找答案。這段經歷讓我養成習慣：在打開 Illustrator 或做 3D 渲染前，先釐清這套視覺要溝通給誰、能不能帶來實際訂單。',
    win_about_desc_2: '我不做脫離商業目標的裝飾性設計。從品牌識別、包裝印刷、客製化網站到實體 NFC 智慧名片，我專注於將商業策略轉化為清楚、耐看且能直接落地的視覺系統。',
    win_about_cap_tag: '// CORE CAPABILITIES // 核心專業能力',
    win_about_cap1_title: '商業與廣告數據',
    win_about_cap1_desc: '熟悉 Google Ads 廣告架構、A/B 測試與 Landing Page 動線規劃，確保設計投入能反映在名單收集與銷售成效上。',
    win_about_cap2_title: '品牌與包裝工藝',
    win_about_cap2_desc: '整合商標識別、包裝刀模展開、紙材挑選到實體打樣，確保螢幕上的提案能完整呈現在實體成品中。',
    win_about_cap3_title: '數位介面與互動建置',
    win_about_cap3_desc: '專注於結構清晰的網頁設計（UI/UX）、RWD 響應式排版與流暢微動態，建立易於閱讀與操作的品牌官網。',
    win_about_btn_explore: '探索精選專案 (PROJECTS) →',
    win_about_brand_site: '品牌官網',

    // 02_SERVICES Window
    win_serv_badge: '[OFFICIAL_CAPABILITIES]',
    win_serv_title: '全方位的視覺與品牌設計服務',
    win_serv_desc: '從品牌定位、實體平面印刷到高成效數位網頁，提供一站式視覺解決方案。',
    win_serv_b_title: '品牌設計',
    win_serv_b_1: '品牌健檢',
    win_serv_b_2: '品牌命名',
    win_serv_b_3: '品牌定位',
    win_serv_b_4: '品牌策略',
    win_serv_b_5: '商標設計',
    win_serv_b_6: '文案企劃',
    win_serv_v_title: '視覺設計',
    win_serv_v_1: '名片設計',
    win_serv_v_2: '包裝設計',
    win_serv_v_3: '海報設計',
    win_serv_v_4: '型錄設計',
    win_serv_v_5: '社群素材',
    win_serv_v_6: 'DM 設計',
    win_serv_w_title: '網頁設計',
    win_serv_w_1: '視覺風格設定',
    win_serv_w_2: 'UI/UX 設計',
    win_serv_w_3: 'RWD 響應式',
    win_serv_w_4: '內容架構',
    win_serv_w_5: 'SEO 與 GA4',
    win_serv_w_6: '廣告投放',
    win_serv_btn_view: '查看精選專案 →',

    // 03_PROJECTS Window
    win_proj_badge: '6 FLAGSHIP CASE STUDIES',
    win_proj_title: '精選專案目錄 // FEATURED WORKS DIRECTORY',
    win_proj_desc: '6 大旗艦實體與數位落地案例：涵蓋 3D 視覺、包裝工程、互動介面與全渠道廣告成效。',
    p1_title: 'AURA 空間聲學耳機系統',
    p1_tag: '[ 概念設計 / 3D 視覺系統 ]',
    p1_desc: '微工業機能美學：將聲學濾波器與微晶片轉化為品牌核心視覺資產，拒絕同質化科技極簡。',
    p2_title: 'OAT & BOTANIC 純素冷萃低碳咖啡',
    p2_tag: '[ 包裝設計 / D2C 電商排版 ]',
    p2_desc: '未塗布再生紙盒與實體觸感包裝，融合低碳永續理念與 D2C 高轉化排版系統。',
    p3_title: 'NEXUS AI 模組化協作平台',
    p3_tag: '[ UI/UX 設計 / 節點畫布系統 ]',
    p3_desc: '高密度資訊儀表板與節點式畫布系統，實現結構清晰、好操作的深色介面設計。',
    p3_btn: '探索完整案例 (READ CASE STUDY) →',
    p4_title: 'HYDRATE LAB 全渠道廣告架構',
    p4_tag: '[ 廣告投放 / 高轉換 Landing Page ]',
    p4_desc: 'Google Ads 搜索與多媒體廣告架構，搭配目標明確的 Landing Page，完成從曝光到名單的溝通流程。',
    p5_title: 'CHRONO ARCHIVE 鐘錶知識庫',
    p5_tag: '[ 內容工程 / 知識典藏介面 ]',
    p5_desc: '結構化資料標記與長尾關鍵字內容工程，建立具權威感與易讀性的典藏知識介面。',
    p6_title: 'From Life To Lines 生活線條 品牌識別',
    p6_tag: '[ 品牌識別 / 視覺系統指南 ]',
    p6_desc: '以極簡線條與手繪筆觸傳遞情感共鳴，建立兼具商業力與獨特美感的個人品牌。',

    // 04_SHOWREEL Window
    win_showreel_badge: '[4K 60FPS // LIVE CINEMA]',
    win_showreel_title: '4K 動態展示影院',
    win_showreel_status: 'STATUS: 4K_LIVE',
    win_showreel_desc: 'AURA 空間聲學系統概念展示片：融合 3D 渲染流體光澤、深色曲面螢幕 UI 與微工業工程細節。',

    // 05_NFC Window
    win_nfc_badge: '[SMART_NFC_ECOSYSTEM]',
    win_nfc_tag: 'FLTL SMART HARDWARE LAB // PROPRIETARY ENGINE',
    win_nfc_title: '超越傳統名片：軟硬整合的智慧商務人脈系統',
    win_nfc_desc: '不僅是霧面沉黑的頂級 NFC 實體卡片，更是結合了 AI 視覺掃描、雙向資訊交換、數據成效追蹤與企業 CRM 串接的全方位商務增長引擎。',
    nfc_f1_title: '01. OCR 名片掃描辨識系統',
    nfc_f1_desc: '收到對方的傳統紙本名片？透過系統內建的 AI 視覺辨識，拍照 1 秒精準辨識姓名、電話、公司與統編，自動建立數位聯絡簿，徹底終結紙張堆積。',
    nfc_f2_title: '02. 雙向聯絡資訊即時交換',
    nfc_f2_desc: '商務溝通不該是單行道。手機碰觸感應後，對方不僅能一鍵將你加入通訊錄（vCard 3.0），更可直接回傳其姓名與聯絡方式，現場完成名單雙向閉環。',
    nfc_f3_title: '03. 行銷追蹤與成效分析 (Analytics)',
    nfc_f3_desc: '發揮 10+ 年 Google Ads 數據思維：深度整合 GA4、Meta Pixel 與點擊事件追蹤，精準分析名片被感應的次數、社群點擊率與高價值客戶互動足跡。',
    nfc_f4_title: '04. 企業矩陣授權與 CRM 串接',
    nfc_f4_desc: '支援企業批量團隊管理（Tier 1–3 方案），業務外出開發獲得的人脈資料可直接無縫對接至 Salesforce、HubSpot 或自建 CRM，保障企業商務資產。',
    nfc_spec_1: '沉黑霧面防刮 PVC',
    nfc_spec_2: 'NTAG216 高頻晶片',
    nfc_spec_3: 'AES-256 安全加密',
    nfc_spec_4: '免裝 App 0.5s 感應',
    nfc_spec_tier: '個人版 / 企業客製方案全面支援',
    nfc_btn_more: '前往官方網站了解更多 →',

    // Dock Tooltips
    dock_about: '01. 關於我',
    dock_services: '02. 服務項目',
    dock_projects: '03. 精選專案',
    dock_showreel: '04. 動態展示',
    dock_nfc: '05. 智慧名片',
    dock_github: 'GitHub 官方首頁'
  },
  en: {
    // Navigation & Desktop Icons
    nav_about: '[ 01_ABOUT Positioning ]',
    nav_services: '[ 02_SERVICES Capabilities ]',
    nav_projects: '[ 03_PROJECTS Works ]',
    nav_showreel: '[ 04_SHOWREEL Cinema ]',
    nav_nfc: '[ 05_NFC Smart Card ]',
    
    icon_about: '01_ABOUT.os',
    icon_services: '02_SERVICES.os',
    icon_projects: '03_PROJECTS.os',
    icon_showreel: '04_SHOWREEL.mp4',
    icon_nfc: '05_NFC.os',

    // 01_ABOUT Window
    win_about_badge: '10+ YRS DATA x DESIGN',
    win_about_tag: '10+ Yrs Google Ads & Commercial Design',
    win_about_title_html: 'Good design resolves communication,<br class="hidden sm:inline">effective marketing drives conversion.',
    win_about_subtitle: 'Clear communication. Measurable conversion.',
    win_about_desc_1: 'Starting in Google Ads consulting, I spent 10 years analyzing conversion rates, bounce rates, and media ROI. This shaped my core discipline: before opening Illustrator or rendering 3D, clarify who the visual speaks to and how it yields measurable business outcomes.',
    win_about_desc_2: 'I reject decorative design detached from commercial goals. From brand identity, packaging engineering, bespoke web platforms to physical NFC smart hardware, I engineer durable, articulate, production-ready visual systems built on commercial strategy.',
    win_about_cap_tag: '// CORE CAPABILITIES // TECHNICAL EXPERTISE',
    win_about_cap1_title: 'Commercial & Ad Data',
    win_about_cap1_desc: 'Mastery over Google Ads architecture, A/B testing, and Landing Page UX funnels to ensure design investments yield measurable lead conversions.',
    win_about_cap2_title: 'Brand & Packaging Craft',
    win_about_cap2_desc: 'Integrating brand identity, die-cut packaging blueprints, paper substrate selection, and physical prototyping from screen to real-world finish.',
    win_about_cap3_title: 'Digital Interface & Interaction',
    win_about_cap3_desc: 'Crafting high-clarity UI/UX, responsive layouts, and kinetic micro-interactions for modern, ergonomic web platforms.',
    win_about_btn_explore: 'Explore Featured Works (PROJECTS) →',
    win_about_brand_site: 'Brand Site',

    // 02_SERVICES Window
    win_serv_badge: '[OFFICIAL_CAPABILITIES]',
    win_serv_title: 'Comprehensive Brand & Visual Design Services',
    win_serv_desc: 'End-to-end creative solutions spanning brand positioning, print packaging, and high-conversion web development.',
    win_serv_b_title: 'Brand Design',
    win_serv_b_1: 'Brand Audit',
    win_serv_b_2: 'Brand Naming',
    win_serv_b_3: 'Brand Positioning',
    win_serv_b_4: 'Brand Strategy',
    win_serv_b_5: 'Identity & Logo',
    win_serv_b_6: 'Copywriting Strategy',
    win_serv_v_title: 'Visual Design',
    win_serv_v_1: 'Business Card Design',
    win_serv_v_2: 'Packaging Design',
    win_serv_v_3: 'Poster Design',
    win_serv_v_4: 'Catalog & Brochure',
    win_serv_v_5: 'Social Media Content',
    win_serv_v_6: 'Direct Mail / Print DM',
    win_serv_w_title: 'Web Design',
    win_serv_w_1: 'Visual Style Guidelines',
    win_serv_w_2: 'UI/UX Design',
    win_serv_w_3: 'Responsive Layouts (RWD)',
    win_serv_w_4: 'Information Architecture',
    win_serv_w_5: 'SEO & GA4 Analytics',
    win_serv_w_6: 'Digital Ad Campaigns',
    win_serv_btn_view: 'View Featured Projects →',

    // 03_PROJECTS Window
    win_proj_badge: '6 FLAGSHIP CASE STUDIES',
    win_proj_title: 'Featured Works Directory // Flagship Case Studies',
    win_proj_desc: '6 Flagship commercial projects across 3D visualization, packaging engineering, interactive UI, and omnichannel ad architectures.',
    p1_title: 'AURA Spatial Audio System',
    p1_tag: '[ Concept / 3D Visual System ]',
    p1_desc: 'Micro-industrial functional aesthetics: turning acoustic filters and microchips into core visual assets, rejecting generic tech minimalism.',
    p2_title: 'OAT & BOTANIC Vegan Cold Brew',
    p2_tag: '[ Packaging Design / D2C E-commerce ]',
    p2_desc: 'Uncoated recycled paperboard packaging fusing sustainability with high-conversion D2C e-commerce typography.',
    p3_title: 'NEXUS AI Modular Platform',
    p3_tag: '[ UI/UX Design / Node Canvas ]',
    p3_desc: 'High-density telemetry dashboard and node-based canvas delivering clarity and ergonomic dark mode UI.',
    p3_btn: 'Read Full Case Study (READ CASE STUDY) →',
    p4_title: 'HYDRATE LAB Omnichannel Ad Campaign',
    p4_tag: '[ Ad Campaign / High-Conversion LP ]',
    p4_desc: 'Google Ads search and display architecture paired with targeted Landing Pages for seamless lead acquisition.',
    p5_title: 'CHRONO ARCHIVE Horology Database',
    p5_tag: '[ Content Engineering / Archive UI ]',
    p5_desc: 'Structured metadata indexing and long-tail SEO engineering creating an authoritative horological archive.',
    p6_title: 'From Life To Lines Brand Identity',
    p6_tag: '[ Brand Identity / Visual Guidelines ]',
    p6_desc: 'Minimalist linework conveying emotional resonance, establishing a brand balancing commercial clarity and artistry.',

    // 04_SHOWREEL Window
    win_showreel_badge: '[4K 60FPS // LIVE CINEMA]',
    win_showreel_title: '4K Motion Cinema Showcase',
    win_showreel_status: 'STATUS: 4K_LIVE',
    win_showreel_desc: 'AURA spatial audio conceptual film: combining 3D fluid lighting, dark curved screen UI, and micro-engineering details.',

    // 05_NFC Window
    win_nfc_badge: '[SMART_NFC_ECOSYSTEM]',
    win_nfc_tag: 'FLTL SMART HARDWARE LAB // PROPRIETARY ENGINE',
    win_nfc_title: 'Beyond Traditional Cards: Smart Hardware Networking Ecosystem',
    win_nfc_desc: 'More than a matte black premium NFC card: a growth engine integrating AI optical scanning, two-way sync, marketing analytics, and enterprise CRM.',
    nfc_f1_title: '01. AI Optical Card Scanner (OCR)',
    nfc_f1_desc: 'Received a paper business card? Snap a photo in 1 second for AI extraction of name, phone, company, and tax ID into digital contacts.',
    nfc_f2_title: '02. Instant Two-Way Contact Sync',
    nfc_f2_desc: 'Networking is never one-way. Upon tap, recipients can save your contact (vCard 3.0) and instantly transmit their info back, completing the loop.',
    nfc_f3_title: '03. Marketing Analytics & Funnel Tracking',
    nfc_f3_desc: 'Applying 10+ years of Google Ads data science: deep GA4 and Meta Pixel integration to track tap counts and high-value customer journeys.',
    nfc_f4_title: '04. Enterprise Matrix & CRM Integration',
    nfc_f4_desc: 'Enterprise multi-seat management with direct data pipeline syncing to Salesforce, HubSpot, or bespoke CRMs.',
    nfc_spec_1: 'Matte Black Anti-Scratch PVC',
    nfc_spec_2: 'NTAG216 High-Frequency Chip',
    nfc_spec_3: 'AES-256 Security Encryption',
    nfc_spec_4: 'No-App Instant 0.5s Tap',
    nfc_spec_tier: 'Personal & Enterprise Tiers Supported',
    nfc_btn_more: 'Visit Official Website to Learn More →',

    // Dock Tooltips
    dock_about: '01. About Me',
    dock_services: '02. Services',
    dock_projects: '03. Projects',
    dock_showreel: '04. Showreel',
    dock_nfc: '05. Smart NFC',
    dock_github: 'GitHub Profile'
  }
};

let currentLang = 'zh';

function setLanguage(lang) {
  if (!i18nData[lang]) lang = 'zh';
  currentLang = lang;

  // 1. TextContent updates
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  // 2. HTML content updates
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (i18nData[lang][key]) {
      el.innerHTML = i18nData[lang][key];
    }
  });

  // 3. Update pill indicators on toggle buttons
  document.querySelectorAll('.lang-opt').forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

  try {
    localStorage.setItem('fltl_lang', lang);
  } catch (e) {}
}

// ========================================================
// 5. Initialization & Telemetry
// ========================================================
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
      audioBtn.innerHTML = audio.isMuted ? '<i data-lucide="volume-x" class="w-4 h-4 text-red-400"></i>' : '<i data-lucide="volume-2" class="w-4 h-4 text-green-400"></i>';
      lucide.createIcons();
      if (!audio.isMuted) audio.playBlip(700, 0.05);
    });
  }

  // Setup GSAP Draggables for Windows with cancel parameter to protect traffic lights & buttons
  document.querySelectorAll('.os-window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
    if (window.Draggable) {
      Draggable.create(win, {
        handle: win.querySelector('.window-header'),
        bounds: window,
        edgeResistance: 0.65,
        cancel: '.traffic-btn, .traffic-lights, button, a, svg',
        onPress: () => {
          focusWindow(win);
          audio.playBlip(480, 0.03);
        }
      });
    }
  });

  // Language Toggle Button listener
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      audio.playBlip(620, 0.04);
      setLanguage(currentLang === 'zh' ? 'en' : 'zh');
    });
  }

  // Check saved language preference
  try {
    const saved = localStorage.getItem('fltl_lang');
    if (saved === 'en' || saved === 'zh') {
      setLanguage(saved);
    } else if (navigator.language && !navigator.language.startsWith('zh')) {
      setLanguage('en');
    } else {
      setLanguage('zh');
    }
  } catch (e) {
    setLanguage('zh');
  }

  // macOS Dock Hover Scale Physics
  const dock = document.getElementById('main-dock');
  if (dock) {
    const items = dock.querySelectorAll('.dock-item');
    dock.addEventListener('mousemove', (e) => {
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

  // 3D Card Perspective Mouse Tilt Physics
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
});
