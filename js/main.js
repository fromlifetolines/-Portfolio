/**
 * Howard Portfolio OS 2.0 Desktop Controller & Solar System Engine
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
      
      // Multi-Octave boiling plasma noise with sharp convection cells
      vec3 p1 = wp * 3.2 + vec3(time * 0.06, time * 0.08, -time * 0.05);
      vec3 p2 = wp * 8.5 - vec3(time * 0.12, 0.0, time * 0.09);
      vec3 p3 = wp * 18.0 + vec3(0.0, -time * 0.18, time * 0.14);
      
      // 米粒對流組織 (Convection granulation) 階梯性銳化
      float gran = turb(wp * 26.0 + vec3(time * 0.15, 0.0, 0.0));
      gran = smoothstep(0.25, 0.75, gran);
      
      float plasma = turb(p1) * 0.55 + fbm(p2) * 0.35 + noise3(p3) * 0.15 + gran * 0.35;
      
      // 色彩精確階梯性銳化：純白熱核 (#FFFFFF)、熾熱金 (#FFB700)、狂暴深熔岩紅 (#CC2200)
      vec3 magmaRed  = vec3(0.85, 0.14, 0.0);   // #CC2200
      vec3 hotGold   = vec3(4.20, 2.30, 0.15);  // #FFB700
      vec3 whiteCore = vec3(7.20, 6.40, 5.80);  // #FFFFFF
      
      vec3 col;
      if (plasma < 0.45) {
        col = mix(magmaRed, hotGold, smoothstep(0.08, 0.45, plasma));
      } else {
        col = mix(hotGold, whiteCore, smoothstep(0.45, 1.15, plasma));
      }

      // 動態太陽黑子群 (Sunspots)
      float spotNoise = noise3(wp * 1.8 + vec3(14.0, 8.0, 22.0));
      if (spotNoise > 0.65) {
        col *= mix(1.0, 0.08, smoothstep(0.65, 0.88, spotNoise));
      }

      // 微光球沸騰米粒組織 (Micro-photospheric grain)
      float grain = noise3(wp * 48.0 + vec3(time * 0.6, 0.0, 0.0));
      col *= 0.85 + grain * 0.3;

      // 邊緣高對比發光 (Limb darkening & Prominence rim)
      vec3 vd = normalize(-vP);
      float rim = 1.0 - max(dot(normalize(vN), vd), 0.0);
      col += vec3(5.5, 2.8, 0.6) * pow(rim, 2.5) * 0.9;
      
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
      fres = pow(fres, 1.3);
      
      vec3 wp = vLocal;
      // 狂暴熱核噴發火焰與旋轉日珥弧線 (Solar Prominence Loops & Eruptions)
      float flame1 = turb(wp * 4.0 + vec3(time * 0.12, -time * 0.08, time * 0.1));
      float flame2 = fbm(wp * 9.0 - vec3(0.0, time * 0.18, time * 0.14)) * 0.5;
      float flame = flame1 + flame2;
      
      // 動態日珥卷弧 (Prominence Arcs) - 尖銳高對比能量環
      float prom = pow(noise3(wp * 2.5 + vec3(0.0, time * 0.08, 0.0)), 2.8) * 4.5;
      
      // 階梯性純白熱核、熾熱金與狂暴深熔岩紅
      vec3 magmaRed  = vec3(1.2, 0.14, 0.0);   // #CC2200
      vec3 hotGold   = vec3(4.5, 2.4, 0.15);   // #FFB700
      vec3 whiteCore = vec3(7.0, 6.2, 5.5);    // #FFFFFF

      float intensity = flame + prom * 0.7;
      vec3 col = mix(magmaRed, hotGold, smoothstep(0.2, 0.8, intensity));
      col = mix(col, whiteCore, smoothstep(0.8, 1.5, intensity));

      // 邊緣火舌銳利切斷，拒絕模糊煙霧感
      float alpha = fres * smoothstep(0.15, 0.85, intensity);
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
  const coronaGeo = new THREE.SphereGeometry(6.6, 64, 64);
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

      // 晨昏線自然過渡
      float dayFactor = smoothstep(-0.10, 0.20, nDotL);
      float nightFactor = 1.0 - smoothstep(-0.20, 0.05, nDotL);

      vec4 dayCol = texture2D(dayTexture, vUv);
      vec4 nightCol = texture2D(nightTexture, vUv);

      // 白天光照：保持 NASA 高清大陸、山脈與海洋清晰飽和，杜絕整片死白
      vec3 ambient = vec3(0.015, 0.025, 0.04) * dayCol.rgb;
      vec3 daylight = dayCol.rgb * (dayFactor * 1.08) + ambient;
      vec3 nightlight = nightCol.rgb * vec3(1.8, 1.3, 0.7) * nightFactor;

      // 大氣散射輝光：嚴格限制在星球極外緣輪廓 (Rim Limb，厚度 < 0.05)
      vec3 viewDir = normalize(vViewPos);
      float rim = 1.0 - max(dot(normal, viewDir), 0.0);
      float thinRim = pow(rim, 6.0) * smoothstep(0.75, 1.0, rim);
      vec3 atmosphereGlow = vec3(0.2, 0.6, 1.0) * thinRim * (dayFactor * 0.85);

      vec3 finalCol = daylight + nightlight + atmosphereGlow;
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

      // 薄紗飄動雲層：隨晝夜自然變換，透明度上限精準鎖定 0.28
      vec3 cloudColor = vec3(0.96, 0.98, 1.0) * (dayFactor * 0.85 + 0.15);
      float alpha = cloudMap.r * 0.28 * (dayFactor * 0.7 + 0.3);

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

    // 地球專屬：薄紗大氣雲層 (NormalBlending + 0.28 opacity) 與月球
    if (p.isEarth) {
      const cloudGeo = new THREE.SphereGeometry(p.size + 0.05, 64, 64);
      const cloudMat = new THREE.ShaderMaterial({
        vertexShader: CLOUDS_VS,
        fragmentShader: CLOUDS_FS,
        uniforms: {
          cloudTexture: { value: textureLoader.load('./assets/planets/earth_clouds.jpg') }
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending
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

  // 滑鼠螢幕像素座標 (用於星塵超感流體真空漣漪)
  let mousePixelX = -9999, mousePixelY = -9999;
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
    mousePixelX = e.clientX;
    mousePixelY = e.clientY;

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

  // 預先配置星塵矩陣運算向量，避免每幀垃圾回收 (Zero GC)
  const projMatrix = new THREE.Matrix4();
  const camDir = new THREE.Vector3();
  const camRight = new THREE.Vector3();
  const camUp = new THREE.Vector3();

  let clock = new THREE.Clock();

  let isPageVisible = !document.hidden;
  let animationFrameId = null;

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      clock.getDelta(); // prevent delta jump
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  });

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate() {
    if (!isPageVisible) {
      animationFrameId = null;
      return;
    }
    animationFrameId = requestAnimationFrame(animate);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

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

    // --- 星塵粒子超感流體推開漣漪 (Screen-Space 140px Radius & Force 35.0，有界目標位移) ---
    if (hasMouseMoved) {
      projMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      const me = projMatrix.elements;
      camera.getWorldDirection(camDir);
      camRight.crossVectors(camDir, camera.up).normalize();
      camUp.crossVectors(camRight, camDir).normalize();
      const rx = camRight.x, ry = camRight.y, rz = camRight.z;
      const ux = camUp.x, uy = camUp.y, uz = camUp.z;

      const posArr = starGeo.attributes.position.array;
      const radiusPx = 140.0;
      const radiusSq = radiusPx * radiusPx;
      const forceMultiplier = 35.0;

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const ox = starOrigPos[i3];
        const oy = starOrigPos[i3 + 1];
        const oz = starOrigPos[i3 + 2];

        // 投影原始座標至 2D 螢幕像素
        const w = me[3] * ox + me[7] * oy + me[11] * oz + me[15];
        let targetX = ox;
        let targetY = oy;
        let targetZ = oz;

        if (w > 0.0) {
          const invW = 1.0 / w;
          const ndcX = (me[0] * ox + me[4] * oy + me[8] * oz + me[12]) * invW;
          const ndcY = (me[1] * ox + me[5] * oy + me[9] * oz + me[13]) * invW;
          const sx = (ndcX * 0.5 + 0.5) * window.innerWidth;
          const sy = (-ndcY * 0.5 + 0.5) * window.innerHeight;

          const dx = sx - mousePixelX;
          const dy = sy - mousePixelY;
          const distSq = dx * dx + dy * dy;

          // 當游標進入 140 像素半徑內，計算背離游標的外推目標位置
          if (distSq < radiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (1.0 - dist / radiusPx) * forceMultiplier;
            const invD = 1.0 / dist;
            const uX = dx * invD;
            const uY = -dy * invD;
            const depthScale = Math.max(w * 0.012, 0.4);

            targetX += (rx * uX + ux * uY) * force * depthScale;
            targetY += (ry * uX + uy * uY) * force * depthScale;
            targetZ += (rz * uX + uz * uY) * force * depthScale;
          }
        }

        // 平滑彈簧阻尼自然回彈 (Lerp 0.08，嚴格有界，永不飛散)
        posArr[i3]     += (targetX - posArr[i3]) * 0.08;
        posArr[i3 + 1] += (targetY - posArr[i3 + 1]) * 0.08;
        posArr[i3 + 2] += (targetZ - posArr[i3 + 2]) * 0.08;
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
// 3. Multi-Window Management & Entry Gate Engine
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

  trackPortfolioEvent('selected_work_open', { windowId: winId });
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
  trackPortfolioEvent('window_close', { windowId: winId });
}

function toggleMaximize(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  audio.playBlip(550, 0.04);
  win.classList.toggle('is-maximized');
}

// First-Visit Entry Gate Controller (Section 05)
function enterSelectedWork() {
  dismissEntryGate();
  openWindow('win-projects');
  trackPortfolioEvent('entry_view_work_click', { destination: 'win-projects' });
}

function dismissEntryGate() {
  const gate = document.getElementById('entry-gate');
  if (!gate) return;
  audio.playBlip(520, 0.05);
  gsap.to(gate, {
    opacity: 0,
    scale: 0.96,
    duration: 0.35,
    ease: 'power2.inOut',
    onComplete: () => {
      gate.style.display = 'none';
    }
  });
  trackPortfolioEvent('entry_explore_os_click');
}

// Lightweight Analytics / Telemetry Hook (Section 26)
function trackPortfolioEvent(eventName, params = {}) {
  try {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
    window.dispatchEvent(new CustomEvent('portfolio_event', { detail: { eventName, ...params } }));
  } catch (e) {}
}
window.trackPortfolioEvent = trackPortfolioEvent;
window.enterSelectedWork = enterSelectedWork;
window.dismissEntryGate = dismissEntryGate;
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.toggleMaximize = toggleMaximize;
window.focusWindow = focusWindow;

// ========================================================
// 4. Central Project Data Model (Section 10)
// ========================================================
const projects = [
  {
    id: 'fltl-nfc',
    title: 'FLTL NFC Smart Business Card',
    slug: 'nfc-smart-card',
    projectType: 'SELF-INITIATED PRODUCT',
    year: '2026',
    categories: ['Product', 'Brand', 'Packaging', 'Digital Experience'],
    disciplines: 'Brand Identity, Card Design, Packaging, NFC Experience, Digital Experience',
    role: 'Brand, Product & Experience Design',
    thumbnail: './assets/fltl-nfc-card.png',
    featured: true,
    caseUrl: './portfolio-nfc.html',
    zh: {
      title: 'FLTL NFC 智慧商務名片',
      projectType: '自發產品 (Self-Initiated Product)',
      role: '品牌、產品與體驗設計',
      desc: '一張結合實體卡片設計與數位連結體驗的自發產品計畫。透過 NFC 感應，讓傳統名片從單次交換資訊，延伸成更快速、可更新的數位聯絡入口。'
    },
    en: {
      title: 'FLTL NFC Smart Business Card',
      projectType: 'Self-Initiated Product',
      role: 'Brand, Product & Experience Design',
      desc: 'A self-initiated product exploring the connection between physical card design and digital identity. NFC interaction extends the traditional business card into a faster, updateable digital contact experience.'
    }
  },
  {
    id: 'aura',
    title: 'AURA Spatial Audio System',
    slug: 'aura-spatial-audio',
    projectType: 'CONCEPT PROJECT',
    year: '2026',
    categories: ['Hardware', '3D Visual', 'Packaging Concept'],
    disciplines: '3D Visualization, Exploded View, Packaging Concept, Hardware Aesthetics',
    role: 'Visual Design / Art Direction',
    thumbnail: './assets/aura-exploded.jpg?v=20260904_final',
    featured: false,
    caseUrl: './portfolio-brand.html',
    zh: {
      title: 'AURA 空間聲學耳機系統 (Spatial Audio)',
      projectType: '概念研究 (Concept Project)',
      role: '視覺設計 / 藝術指導',
      desc: '微工業機能美學：將硬體內部結構與晶片概念轉化為品牌核心視覺資產，探索硬體內部視覺化、3D 概念圖與天地蓋包裝概念。'
    },
    en: {
      title: 'AURA Spatial Audio System',
      projectType: 'Concept Project',
      role: 'Visual Design / Art Direction',
      desc: 'Micro-industrial functional aesthetics: turning internal architecture concepts into core visual assets, exploring internal visualization and packaging concepts.'
    }
  },
  {
    id: 'oat-botanic',
    title: 'OAT & BOTANIC Cold Brew',
    slug: 'oat-and-botanic',
    projectType: 'CONCEPT PROJECT',
    year: '2026',
    categories: ['Packaging', 'D2C', 'Branding'],
    disciplines: 'Sustainable Packaging Concept, D2C Typography, Editorial Aesthetics',
    role: 'Brand & Packaging Design',
    thumbnail: './assets/oat-packaging.jpg',
    featured: false,
    caseUrl: './portfolio-ecommerce.html',
    zh: {
      title: 'OAT & BOTANIC 純素冷萃低碳咖啡',
      projectType: '概念研究 (Concept Project)',
      role: '品牌與包裝設計',
      desc: '以未塗布再生紙材為概念方向，探索自然觸感與編輯式排版的包裝視覺。'
    },
    en: {
      title: 'OAT & BOTANIC Vegan Cold Brew Coffee',
      projectType: 'Concept Project',
      role: 'Brand & Packaging Design',
      desc: 'A packaging concept exploring uncoated recycled-paper textures and editorial D2C typography.'
    }
  },
  {
    id: 'nexus-ai',
    title: 'NEXUS AI Modular Platform',
    slug: 'nexus-ai',
    projectType: 'CONCEPT PROJECT',
    year: '2026',
    categories: ['SaaS', 'UI/UX', 'Node Canvas'],
    disciplines: 'Telemetry Dashboard, Node Workflow, Dark Mode Design System',
    role: 'Product UI/UX Designer',
    thumbnail: './assets/nexus-ui.jpg',
    featured: false,
    caseUrl: './portfolio-web.html',
    zh: {
      title: 'NEXUS AI 模組化協作平台與動態介面',
      projectType: '概念研究 (Concept Project)',
      role: '產品 UI/UX 設計',
      desc: '全景曲面螢幕三欄式工作台，探索高密度資料視覺化、節點流程邏輯與深色開發者介面系統。'
    },
    en: {
      title: 'NEXUS AI Modular Platform & Motion UI',
      projectType: 'Concept Project',
      role: 'Product UI/UX Designer',
      desc: 'High-density telemetry dashboard and node-based canvas delivering clarity and ergonomic dark mode developer UI.'
    }
  },
  {
    id: 'hydrate-lab',
    title: 'HYDRATE LAB Performance Funnel Concept',
    slug: 'hydrate-lab',
    projectType: 'CONCEPT PROJECT',
    year: '2026',
    categories: ['Performance Ad', 'Landing Page'],
    disciplines: 'Ad Messaging, Landing Page Hierarchy, CTA Conversion Journey',
    role: 'Visual Design & Conversion Structure',
    thumbnail: './assets/marketing-ads.jpg',
    featured: false,
    caseUrl: 'https://www.instagram.com/fromlifetolines/',
    zh: {
      title: 'HYDRATE LAB 著陸頁架構與轉換動線概念',
      projectType: '概念研究 (Concept Project)',
      role: '視覺設計與轉換架構',
      desc: '探索搜尋廣告訊息、Landing Page 資訊層級與 CTA，如何形成一致的轉換路徑。'
    },
    en: {
      title: 'HYDRATE LAB Landing Page & Conversion Journey Concept',
      projectType: 'Concept Project',
      role: 'Visual Design & Conversion Structure',
      desc: 'A concept exploring how search-ad messaging, landing-page hierarchy and CTA structure can form a coherent conversion journey.'
    }
  },
  {
    id: 'fltl-identity',
    title: 'From Life To Lines Brand Identity',
    slug: 'fltl-identity',
    projectType: 'SELF-INITIATED PROJECT',
    year: '2026',
    categories: ['Branding', 'Visual Identity'],
    disciplines: 'Brand System, Illustration, Typography Guidelines',
    role: 'Founder & Creative Director',
    thumbnail: './assets/brand-identity.jpg',
    featured: false,
    caseUrl: 'https://www.fromlifetolines.com',
    zh: {
      title: 'From Life To Lines 生活線條 品牌識別',
      projectType: '自發專案 (Self-Initiated Project)',
      role: '創辦人與藝術指導',
      desc: '以極簡線條與手繪筆觸傳遞情感共鳴，建立兼具商業力與獨特美學的生活風格個人品牌。'
    },
    en: {
      title: 'From Life To Lines Brand Identity',
      projectType: 'Self-Initiated Project',
      role: 'Founder & Creative Director',
      desc: 'Minimalist linework conveying emotional resonance, establishing a lifestyle brand balancing commercial clarity and artistry.'
    }
  }
];

// ========================================================
// 5. Bilingual i18n Engine (Zero Delay Client-Side Switcher)
// ========================================================
const i18nData = {
  zh: {
    // Entry Gate
    gate_badge: 'HOWARD PORTFOLIO OS 2.0 // 2026',
    gate_desc: '10+ 年跨足視覺設計、廣告行銷策略與數位體驗。專注於將策略思考與視覺工藝轉化為清晰動人的品牌體驗。',
    gate_eyebrow: 'HOWARD HUANG // PORTFOLIO OS 2.0',
    gate_title: 'DESIGN × MARKETING × DIGITAL EXPERIENCE',
    gate_subtitle: '10+ 年橫跨設計、廣告與數位行銷 // 互動式作品集 2026',
    gate_btn_primary: '查看精選作品',
    gate_btn_secondary: '探索 Portfolio OS →',

    // Navigation (01 to 05 Priority)
    nav_projects: '[ 01_SELECTED WORK 精選作品 ]',
    nav_about: '[ 02_ABOUT 關於我 ]',
    nav_services: '[ 03_CAPABILITIES 專業能力 ]',
    nav_showreel: '[ 04_EXPERIMENTS 實驗動態 ]',
    nav_nfc: '[ 05_NFC 智慧名片 ]',
    
    // Desktop Icons
    icon_projects: '01_WORKS.os',
    icon_about: '02_ABOUT.os',
    icon_services: '03_CAPABILITIES.os',
    icon_showreel: '04_EXPERIMENTS.mp4',
    icon_nfc: '05_NFC.os',

    // 01_SELECTED WORK
    win_proj_title_nav: '01_SELECTED WORK // 精選作品集',
    win_proj_badge: '[SELECTED_WORKS]',
    projects_title: '精選專案目錄 // SELECTED WORK',
    projects_desc: '實體產品、概念研究與數位體驗：以視覺為核心，展現設計力、產品思維與跨媒介落地能力。',
    badge_self_product: '[SELF-INITIATED PRODUCT]',
    badge_concept: '[CONCEPT PROJECT]',
    title_nfc_card: 'FLTL NFC 智慧商務名片',
    role_nfc_card: 'Brand Identity / Card Design / Packaging / NFC Experience',
    desc_nfc_card: '一張結合實體卡片設計與數位連結體驗的自發產品計畫。透過 NFC 感應，讓傳統名片從單次交換資訊，延伸成更快速、可更新的數位聯絡入口。',
    btn_view_nfc_details: '[ 05_NFC 系統快速視窗 ]',
    btn_visit_fltl: 'FLTL 官網 →',

    role_aura: '視覺設計 / 藝術指導',
    title_aura: '02. AURA 空間聲學耳機系統 (Spatial Audio)',
    desc_aura: '微工業機能美學：將耳機內部精密聲學濾波器與微晶片轉化為品牌核心視覺資產，探索硬體內部視覺化、3D 爆炸圖與天地蓋實體包裝概念。',

    role_oat: '品牌與包裝設計',
    title_oat: '03. OAT & BOTANIC 純素冷萃低碳咖啡',
    desc_oat: '從紙材、印刷與視覺表現的關係出發，在概念階段建立包裝材質與印刷方向。未塗布再生紙盒融合永續理念與雜誌感生活消費品 D2C 視覺節奏。',

    role_nexus: '產品 UI/UX 設計',
    title_nexus: '04. NEXUS AI 模組化協作平台與動態介面',
    desc_nexus: '全景曲面螢幕三欄式工作台，探索高密度資料視覺化、節點流程邏輯與深色開發者介面系統。',

    tag_hydrate: '[ 概念研究 / 著陸頁架構 ]',
    title_hydrate: 'HYDRATE LAB 全渠道廣告轉換動線',
    desc_hydrate: '探索搜尋廣告訊息、Landing Page 資訊層級與 CTA，如何形成一致的轉換路徑。',

    tag_fltl: '[ 自發專案 / 品牌識別 ]',
    title_fltl: 'From Life To Lines 生活線條 品牌識別',
    desc_fltl: '以極簡線條與手繪筆觸傳遞情感共鳴，建立兼具商業力與獨特美感的個人品牌。',

    btn_view_case: 'VIEW CASE →',
    btn_ig_work: 'IG 作品精選 →',

    // 02_ABOUT 關於我
    win_about_title: '02_ABOUT // 關於我',
    win_about_badge: '[ABOUT_ME]',
    about_positioning_primary: '我跨足視覺設計、廣告策略與數位體驗。廣告背景讓我不僅將設計視為視覺產出，更視為溝通：什麼需要被理解、什麼應該被記住，以及體驗該引導何種行動。',
    about_positioning_secondary: '透過品牌「From Life To Lines 生活線條（FLTL）」，我將策略思考轉化為清晰俐落的視覺系統與跨媒介體驗，在美感、訊息層級與商業目的之間取得精準平衡。',
    about_pillar1_title: 'VISUAL DESIGN',
    about_p1_item1: 'Brand Identity 品牌識別',
    about_p1_item2: 'Graphic Design 平面視覺',
    about_p1_item3: 'Campaign Visual 廣告主視覺',
    about_p1_item4: 'Packaging Design 包裝設計',
    about_pillar2_title: 'DIGITAL EXPERIENCE',
    about_p2_item1: 'Web Design 網頁設計',
    about_p2_item2: 'UI/UX 介面與體驗',
    about_p2_item3: 'Landing Page 著陸頁架構',
    about_p2_item4: 'Interactive Prototype 互動原型',
    about_pillar3_title: 'MARKETING THINKING',
    about_p3_item1: 'Advertising Creative 廣告創意',
    about_p3_item2: 'Content Direction 內容策略',
    about_p3_item3: 'Campaign Thinking 檔期思維',
    about_p3_item4: 'Conversion Structure 轉換架構',
    about_tools_title: '// TOOLS 創作工具與環境',
    btn_explore_projects: '瀏覽精選專案 (01_SELECTED WORK) →',

    // 03_CAPABILITIES 專業能力
    win_serv_title_nav: '03_CAPABILITIES // 專業能力',
    win_serv_badge: '[CAPABILITIES]',
    win_serv_title: '設計 × 行銷 × 數位體驗 實戰能力',
    win_serv_desc: '橫跨實體品牌、數位產品與廣告視覺，具備跨媒介設計與策略思考能力。',
    cap_g1_title: 'BRAND & VISUAL 品牌與視覺',
    cap_g1_1: '品牌識別系統 (Brand Identity & Logo)',
    cap_g1_2: '平面視覺設計 (Graphic & Print Design)',
    cap_g1_3: '宣傳廣告主視覺 (Campaign Key Visual)',
    cap_g1_4: '實體包裝概念推演 (Packaging Concept)',
    cap_g2_title: 'DIGITAL EXPERIENCE 數位體驗',
    cap_g2_1: '使用者介面與體驗 (UX/UI Design)',
    cap_g2_2: '品牌響應式網站 (Responsive Web Design)',
    cap_g2_3: '著陸頁設計與轉換架構 (Landing Page Design & Conversion Structure)',
    cap_g2_4: '互動原型演繹 (Interactive Prototypes)',
    cap_g3_title: 'MARKETING 行銷思維',
    cap_g3_1: '廣告創意發想 (Advertising Creative)',
    cap_g3_2: '檔期行銷企劃 (Campaign Planning)',
    cap_g3_3: '內容策略指導 (Content Direction)',
    cap_g3_4: '數位廣告投放策略 (Digital Marketing)',
    cap_g4_title: 'EXPERIMENT 前瞻實驗',
    cap_g4_1: '創意程式碼設計 (Creative Coding)',
    cap_g4_2: '互動式網頁介面 (Interactive UI / WebGL)',
    cap_g4_3: 'AI 輔助快速原型 (AI-Assisted Prototyping)',
    cap_g4_4: '探索型程式建構 (Vibe Coding Prototypes)',
    contact_heading: 'HAVE A PROJECT IN MIND? LET\'S TALK →',
    win_serv_btn_view: '瀏覽精選作品集 (01_SELECTED WORK) →',

    // 04_EXPERIMENTS 實驗動態
    win_showreel_title: '04_EXPERIMENTS // 實驗動態',
    win_showreel_badge: '[EXPERIMENTS_LAB]',
    win_showreel_status: '4K 60FPS',
    exp_title: '創意程式碼與數位動態實驗 // EXPERIMENTAL WORK',
    win_showreel_desc: '本區塊彙整個人在互動介面、3D 渲染與技術探索上的前瞻研究。所有項目均為實驗性質，旨在探索設計工具與程式碼結合的前沿表現。',

    // 05_NFC 智慧名片
    win_nfc_title_nav: '05_NFC // 智慧商務名片',
    win_nfc_badge: '[SELF-INITIATED PRODUCT]',
    win_nfc_tag: 'FLTL NFC SMART BUSINESS CARD // SELF-INITIATED PRODUCT',
    win_nfc_title: 'FLTL NFC 智慧商務名片',
    win_nfc_desc: '一張結合實體卡片設計與數位連結體驗的自發產品計畫。透過 NFC 感應，讓傳統名片從單次交換資訊，延伸成更快速、可更新的數位聯絡入口。',
    nfc_spec_title: '沉黑霧面防刮塗層 × 極致同心線紋幾何',
    nfc_spec_desc: '以「From Life To Lines」線條哲學出發，右側同心漣漪紋路引導手機感應區域。內嵌高感度 NFC 晶片，無需充電、無需安裝 App，手機輕觸即可喚起個人數位聯絡頁面。',
    nfc_f1_title: '01. 實體卡片工藝與視覺識別',
    nfc_f1_desc: '沉黑霧面 PVC 卡體結合極簡線條幾何，傳遞專業沈穩的實體第一印象。',
    nfc_f2_title: '02. NFC 免裝 App 感應交互',
    nfc_f2_desc: '內嵌 NFC 晶片，支援主流 iOS 與 Android 設備輕觸讀取，免額外下載程式即可開啟。',
    nfc_f3_title: '03. 可動態更新的數位聯絡入口',
    nfc_f3_desc: '打破傳統紙名片印製後無法更動的限制，透過數位頁面隨時維護最新職稱、作品集與社群入口。',
    nfc_f4_title: '04. 品牌與包裝周邊整合',
    nfc_f4_desc: '延伸卡體視覺至專屬封套與包裝細節，探索從開箱到遞出卡片的一致性品牌接觸點體驗。',
    nfc_spec_1: '沉黑霧面防刮 PVC',
    nfc_spec_2: 'NFC 晶片',
    nfc_spec_3: '被動式感應 (免額外供電)',
    nfc_spec_4: '免裝 App 碰觸感應',
    nfc_spec_tier: '自發產品原型設計 (Self-Initiated Prototype)',
    nfc_btn_more: '前往官方網站了解更多 →',

    // Dock Tooltips
    dock_projects: '01. 精選作品',
    dock_about: '02. 關於我',
    dock_services: '03. 專業能力',
    dock_showreel: '04. 實驗動態',
    dock_nfc: '05. 智慧名片',
    dock_github: 'GitHub 官方首頁'
  },
  en: {
    // Entry Gate
    gate_badge: 'HOWARD PORTFOLIO OS 2.0 // 2026',
    gate_desc: '10+ years across visual design, marketing strategy, and digital experiences. Transforming strategic insight into engaging brand touchpoints.',
    gate_eyebrow: 'HOWARD HUANG // PORTFOLIO OS 2.0',
    gate_title: 'DESIGN × MARKETING × DIGITAL EXPERIENCE',
    gate_subtitle: '10+ Years Across Design, Advertising & Digital Marketing // Interactive Portfolio 2026',
    gate_btn_primary: 'VIEW SELECTED WORK',
    gate_btn_secondary: 'Explore the Portfolio OS →',

    // Navigation (01 to 05 Priority)
    nav_projects: '[ 01_SELECTED WORK ]',
    nav_about: '[ 02_ABOUT ]',
    nav_services: '[ 03_CAPABILITIES ]',
    nav_showreel: '[ 04_EXPERIMENTS ]',
    nav_nfc: '[ 05_NFC PRODUCT ]',
    
    // Desktop Icons
    icon_projects: '01_WORKS.os',
    icon_about: '02_ABOUT.os',
    icon_services: '03_CAPABILITIES.os',
    icon_showreel: '04_EXPERIMENTS.mp4',
    icon_nfc: '05_NFC.os',

    // 01_SELECTED WORK
    win_proj_title_nav: '01_SELECTED WORK // Selected Projects',
    win_proj_badge: '[SELECTED_WORKS]',
    projects_title: 'Selected Works Directory // Editorial Showcase',
    projects_desc: 'Physical products, concept studies, and digital experiences: visual-first presentation demonstrating design execution and strategic thinking.',
    badge_self_product: '[SELF-INITIATED PRODUCT]',
    badge_concept: '[CONCEPT PROJECT]',
    title_nfc_card: 'FLTL NFC Smart Business Card',
    role_nfc_card: 'Brand Identity / Card Design / Packaging / NFC Experience',
    desc_nfc_card: 'A self-initiated product exploring the connection between physical card design and digital identity. NFC interaction extends the traditional business card into a faster, updateable digital contact experience.',
    btn_view_nfc_details: '[ 05_NFC Quick Overview ]',
    btn_visit_fltl: 'FLTL Website →',

    role_aura: 'Visual Design / Art Direction',
    title_aura: '02. AURA Spatial Audio System',
    desc_aura: 'Micro-industrial aesthetics: translating precision acoustic hardware and chips into core brand visuals, exploring exploded 3D graphics and rigid-box physical packaging.',

    role_oat: 'Brand & Packaging Design',
    title_oat: '03. OAT & BOTANIC Vegan Cold Brew Coffee',
    desc_oat: 'Establishing tactile packaging and print direction during early concept phase. Uncoated recycled board meets sustainable principles and D2C editorial rhythm.',

    role_nexus: 'Product UI/UX Designer',
    title_nexus: '04. NEXUS AI Modular Workspace',
    desc_nexus: 'Panoramic curved display 3-pane workstation exploring high-density telemetry, node workflow logic, and ergonomic dark mode developer UI.',

    tag_hydrate: '[ Concept Project / LP Structure ]',
    title_hydrate: 'HYDRATE LAB Omnichannel Conversion Journey Concept',
    desc_hydrate: 'A concept exploring how search-ad messaging, landing-page hierarchy and CTA structure can form a coherent conversion journey.',

    tag_fltl: '[ Self-Initiated Project / Brand Identity ]',
    title_fltl: 'From Life To Lines Brand Identity',
    desc_fltl: 'Minimalist linework conveying emotional resonance, establishing a lifestyle brand balancing commercial clarity and artistry.',

    btn_view_case: 'VIEW CASE →',
    btn_ig_work: 'IG Works →',

    // 02_ABOUT About Me
    win_about_title: '02_ABOUT // About Me',
    win_about_badge: '[ABOUT_ME]',
    about_positioning_primary: 'I work across visual design, marketing and digital experience. My background in advertising helps me approach design not only as visual execution, but as communication: what needs to be understood, what should be remembered, and what action the experience should support.',
    about_positioning_secondary: 'Through my brand "From Life To Lines (FLTL)", I translate strategic insight into disciplined visual systems and digital experiences, balancing aesthetics, narrative hierarchy, and commercial intent.',
    about_pillar1_title: 'VISUAL DESIGN',
    about_p1_item1: 'Brand Identity',
    about_p1_item2: 'Graphic Design',
    about_p1_item3: 'Campaign Visual',
    about_p1_item4: 'Packaging Design',
    about_pillar2_title: 'DIGITAL EXPERIENCE',
    about_p2_item1: 'Web Design',
    about_p2_item2: 'UI/UX Design',
    about_p2_item3: 'Landing Page Structure',
    about_p2_item4: 'Interactive Prototype',
    about_pillar3_title: 'MARKETING THINKING',
    about_p3_item1: 'Advertising Creative',
    about_p3_item2: 'Content Direction',
    about_p3_item3: 'Campaign Thinking',
    about_p3_item4: 'Conversion Structure',
    about_tools_title: '// TOOLS & ENVIRONMENT',
    btn_explore_projects: 'Explore Selected Work (01_SELECTED WORK) →',

    // 03_CAPABILITIES Capabilities
    win_serv_title_nav: '03_CAPABILITIES // Core Capabilities',
    win_serv_badge: '[CAPABILITIES]',
    win_serv_title: 'Design × Marketing × Digital Experience Capabilities',
    win_serv_desc: 'Spanning physical branding, digital products, and advertising visuals with cross-medium craft and strategic thinking.',
    cap_g1_title: 'BRAND & VISUAL',
    cap_g1_1: 'Brand Identity & Logo Systems',
    cap_g1_2: 'Graphic & Print Design',
    cap_g1_3: 'Campaign Key Visuals',
    cap_g1_4: 'Packaging Concept Development',
    cap_g2_title: 'DIGITAL EXPERIENCE',
    cap_g2_1: 'UX/UI Product Design',
    cap_g2_2: 'Responsive Web Design (RWD)',
    cap_g2_3: 'Landing Page Design & Conversion Structure',
    cap_g2_4: 'Interactive Prototypes',
    cap_g3_title: 'MARKETING THINKING',
    cap_g3_1: 'Advertising Creative Concepts',
    cap_g3_2: 'Campaign Planning & Media Ops',
    cap_g3_3: 'Content Direction & Strategy',
    cap_g3_4: 'Digital Marketing & PPC Strategy',
    cap_g4_title: 'EXPERIMENT & EXPLORATION',
    cap_g4_1: 'Creative Coding & Micro-Interactions',
    cap_g4_2: 'Interactive UI & WebGL Graphics',
    cap_g4_3: 'AI-Assisted Rapid Prototyping',
    cap_g4_4: 'Vibe Coding & Interface Logic',
    contact_heading: 'HAVE A PROJECT IN MIND? LET\'S TALK →',
    win_serv_btn_view: 'Explore Selected Work (01_SELECTED WORK) →',

    // 04_EXPERIMENTS Experiments
    win_showreel_title: '04_EXPERIMENTS // Creative Experiments',
    win_showreel_badge: '[EXPERIMENTS_LAB]',
    win_showreel_status: '4K 60FPS',
    exp_title: 'Creative Coding & Motion Experiments // Experimental Lab',
    win_showreel_desc: 'Curated explorations across interactive UI, 3D WebGL rendering, and generative experiments. All works are self-initiated research exploring the frontier of design and code.',

    // 05_NFC Smart Card
    win_nfc_title_nav: '05_NFC // Smart Business Card',
    win_nfc_badge: '[SELF-INITIATED PRODUCT]',
    win_nfc_tag: 'FLTL NFC SMART BUSINESS CARD // SELF-INITIATED PRODUCT',
    win_nfc_title: 'FLTL NFC Smart Business Card',
    win_nfc_desc: 'A self-initiated product exploring the connection between physical card design and digital identity. NFC interaction extends the traditional business card into a faster, updateable digital contact experience.',
    nfc_spec_title: 'Matte Black Anti-Scratch Finish × Concentric Linework Geometry',
    nfc_spec_desc: 'Rooted in the "From Life To Lines" linework philosophy, the concentric contour gradient guides the intuitive tap zone. Embedded with high-sensitivity NFC chip—battery-free, zero app install required, instant launch on tap.',
    nfc_f1_title: '01. Physical Card Craft & Visual Identity',
    nfc_f1_desc: 'Matte black PVC surface paired with minimalist linework geometry for a lasting physical impression.',
    nfc_f2_title: '02. NFC Tap Interaction (No App Required)',
    nfc_f2_desc: 'Embedded NFC chip supports instantaneous contactless reading across modern iOS and Android devices.',
    nfc_f3_title: '03. Dynamic Digital Contact Gateway',
    nfc_f3_desc: 'Extends static paper cards into an updateable digital contact profile for credentials, portfolio links, and channels.',
    nfc_f4_title: '04. Brand & Packaging Integration',
    nfc_f4_desc: 'Extending card aesthetics to custom sleeves and packaging details, creating a cohesive unboxing touchpoint.',
    nfc_spec_1: 'Matte Black Anti-Scratch PVC',
    nfc_spec_2: 'NFC Chip',
    nfc_spec_3: 'Passive Inductive Power (Battery-Free)',
    nfc_spec_4: 'No-App Instant Tap',
    nfc_spec_tier: 'Self-Initiated Prototype',
    nfc_btn_more: 'Visit Official Website to Learn More →',

    // Dock Tooltips
    dock_projects: '01. Selected Work',
    dock_about: '02. About Me',
    dock_services: '03. Capabilities',
    dock_showreel: '04. Experiments',
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
window.setLanguage = setLanguage;
window.projects = projects;

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
  // Section 19: Do NOT use draggable desktop windows on mobile
  const isMobile = window.innerWidth <= 768;
  document.querySelectorAll('.os-window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
    win.addEventListener('touchstart', () => focusWindow(win), { passive: true });
    if (window.Draggable && !isMobile) {
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

  // ESC Key listener (Section 24 Accessibility: ESC window close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const gate = document.getElementById('entry-gate');
      if (gate && gate.style.display !== 'none' && !gate.classList.contains('hidden')) {
        dismissEntryGate();
        return;
      }
      const openWindows = Array.from(document.querySelectorAll('.os-window:not(.hidden)'));
      if (openWindows.length > 0) {
        openWindows.sort((a, b) => (parseInt(b.style.zIndex || '0', 10) - parseInt(a.style.zIndex || '0', 10)));
        closeWindow(openWindows[0].id);
      }
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

  // macOS Dock True Gaussian Magnification Physics (Jitter-free using layout offsets)
  const dock = document.getElementById('main-dock');
  if (dock && !isMobile && !prefersReducedMotion) {
    const items = dock.querySelectorAll('.dock-item');
    const maxRadius = 120;

    dock.addEventListener('mousemove', (e) => {
      const dockRect = dock.getBoundingClientRect();
      const mouseX = e.clientX;

      items.forEach(item => {
        const itemCenter = dockRect.left + item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(mouseX - itemCenter);

        if (distance < maxRadius) {
          const norm = distance / maxRadius;
          const curve = Math.cos((norm * Math.PI) / 2);
          const scale = 1.0 + 0.55 * Math.pow(curve, 1.45);
          const yLift = -(scale - 1.0) * 22;
          gsap.to(item, { scale: scale, y: yLift, duration: 0.1, overwrite: 'auto', ease: 'power2.out' });
        } else {
          gsap.to(item, { scale: 1.0, y: 0, duration: 0.15, overwrite: 'auto', ease: 'power2.out' });
        }
      });
    });

    dock.addEventListener('mouseleave', () => {
      items.forEach(item => {
        gsap.to(item, { scale: 1.0, y: 0, duration: 0.28, overwrite: 'auto', ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // Section 17 Motion Restraint: Unnecessary 3D card perspective tilt and cursor spotlight removed.
  // Clean hover transitions and image scales are handled via CSS for editorial elegance.
});
