/**
 * Pioneer 2026 Interactive OS Desktop Controller & Solar System Engine
 * Ref: maoxin1234/solar-system-3d & Layers.ai New Era
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

// 2. AAA Photorealistic 3D Solar System & Deep Space Light Engine
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

  // 1. 太陽系主體容器與真實天文點光源 (深邃宇宙暗部 + 太陽中心強光)
  const solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // 深空冷色微弱環境光（避免背陽面全死黑，保留幽暗輪廓）
  const ambientLight = new THREE.AmbientLight(0x0c1222, 0.35);
  scene.add(ambientLight);

  // 太陽中心真實物理點光源 (Sun Point Light)
  const sunLight = new THREE.PointLight(0xfff8ee, 4.8, 0, 0);
  sunLight.position.set(0, 0, 0);
  solarSystem.add(sunLight);

  // --- 2. 頂級 GLSL 3D 動態等離子太陽 (NASA Plasma Shader - Ref: maoxin1234) ---
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
      vec3 p1 = wp * 2.5 + vec3(time*0.04, time*0.05, -time*0.03);
      vec3 p2 = wp * 6.5 - vec3(time*0.08, 0.0, time*0.06);
      vec3 p3 = wp * 14.0 + vec3(0.0, -time*0.1, time*0.08);
      float t = turb(p1) * 0.6 + fbm(p2) * 0.3 + noise3(p3) * 0.1;
      t = clamp(t * 1.5 - 0.05, 0.0, 1.6);
      
      vec3 dark  = vec3(0.40, 0.08, 0.0);
      vec3 mid   = vec3(2.20, 0.75, 0.10);
      vec3 hot   = vec3(3.60, 2.10, 0.45);
      vec3 white = vec3(4.80, 3.80, 2.50);
      vec3 col;
      if (t < 0.45)      col = mix(dark, mid, t/0.45);
      else if (t < 0.85) col = mix(mid, hot, (t-0.45)/0.4);
      else               col = mix(hot, white, (t-0.85)/0.75);

      float spot = noise3(wp * 1.3 + vec3(20.0, 7.0, 11.0));
      if (spot > 0.62) col *= mix(1.0, 0.15, smoothstep(0.62, 0.85, spot));

      float grain = noise3(wp * 35.0 + vec3(time*0.4, 0.0, 0.0));
      col *= 0.85 + grain * 0.3;

      vec3 vd = normalize(-vP);
      float rim = 1.0 - max(dot(normalize(vN), vd), 0.0);
      col += vec3(3.5, 1.6, 0.4) * pow(rim, 2.0) * 0.6;
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
      fres = pow(fres, 1.6);
      vec3 wp = vLocal;
      float flame = turb(wp * 3.2 + vec3(time*0.08, -time*0.06, time*0.07));
      flame += fbm(wp * 9.0 - vec3(0.0, time*0.12, time*0.1)) * 0.4;
      flame = clamp(flame, 0.0, 1.8);
      float prom = pow(noise3(wp * 1.8 + vec3(0.0, time*0.04, 0.0)), 3.0) * 4.0;
      vec3 baseCol = vec3(2.8, 1.1, 0.3);
      vec3 col = baseCol * (0.6 + flame + prom * 0.6);
      float alpha = fres * (0.45 + flame * 0.35);
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

  // --- 3. 地球專屬：真實晝夜晨昏 (Day/Night Terminator) + 夜間萬家燈火著色器 ---
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

      // 晨昏線光影平滑過渡
      float dayFactor = smoothstep(-0.15, 0.25, nDotL);
      float nightFactor = 1.0 - smoothstep(-0.25, 0.1, nDotL);

      vec4 dayCol = texture2D(dayTexture, vUv);
      vec4 nightCol = texture2D(nightTexture, vUv);

      // 白天光照（含微光漫射）
      vec3 ambient = vec3(0.02, 0.04, 0.08) * dayCol.rgb;
      vec3 daylight = dayCol.rgb * (dayFactor * 1.25);

      // 夜間城市燈光（向陽面熄滅，背陽面亮起暖金色燈火）
      vec3 nightlight = nightCol.rgb * vec3(1.8, 1.4, 0.85) * nightFactor;

      // 大氣層向陽藍色邊緣散射 (Atmospheric Rim Scatter)
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

      // 雲層在向陽面明亮反射白光，在背陽面變暗
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
      // 地球專屬晝夜晨昏著色器材質
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
      // 其他天體採用物理標準材質 (向陽面耀眼、背陽面深邃)
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

      // 月球 (受太陽單一光源照明產生真實月相)
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

    // 土星專屬：NASA 實體卡西尼環縫透明光環 (Saturn Rings)
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

  // --- 5. 小行星帶 (Asteroids - 火星與木星之間) ---
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

  // --- 6. 宇宙深空背景 (4,000 顆立體彩色星光) ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 4000;
  const starPos = new Float32Array(starCount * 3);
  const starCol = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    starPos[i3] = (Math.random() - 0.5) * 800;
    starPos[i3 + 1] = (Math.random() - 0.5) * 800;
    starPos[i3 + 2] = (Math.random() - 0.5) * 800;

    const t = Math.random();
    const c = t < 0.7 ? [1, 1, 1] : t < 0.88 ? [0.75, 0.88, 1] : [1, 0.85, 0.7];
    starCol[i3] = c[0];
    starCol[i3 + 1] = c[1];
    starCol[i3 + 2] = c[2];
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
  const starMat = new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.85 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // --- 7. 3D 鏡頭交互控制：滾輪平滑縮放 + 空白處拖曳旋轉 ---
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

    // 更新太陽與日冕 GLSL 動態時間相位
    sunUniforms.time.value = elapsedTime;
    coronaUniforms.time.value = elapsedTime;

    // 鏡頭平滑插值 (阻尼運動)
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

// 視窗開關微動態音效 (音量提升 10%：0.04 -> 0.044)
function playWindowSound(type = 'open') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      // 原音量 0.04 提升 10% -> 0.044
      gain.gain.setValueAtTime(0.044, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.06);
      // 原音量 0.04 提升 10% -> 0.044
      gain.gain.setValueAtTime(0.044, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch (e) {
    // 靜默處理音訊限制
  }
}

// 3. Multi-Window Management Engine (Fluid Kinetic Transitions)
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
  playWindowSound('open');
  win.classList.remove('hidden');
  focusWindow(win);

  const v = win.querySelector('video');
  if (v) {
    v.play().catch(() => {});
  }

  gsap.fromTo(win, 
    { scale: 0.9, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
  );
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  playWindowSound('close');
  gsap.to(win, {
    scale: 0.9,
    opacity: 0,
    y: 20,
    duration: 0.25,
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
      audioBtn.innerHTML = audio.isMuted ? '<i data-lucide="volume-x" class="w-4 h-4 text-red-400"></i>' : '<i data-lucide="volume-2" class="w-4 h-4 text-green-400"></i>';
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
