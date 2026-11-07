/**
 * OBJECT/01 — CASE 14 Interactive Experience & 16 Deliverable Plates
 * FLTL × HOWARD HUANG · 2026
 */

(function () {
  'use strict';

  // 16 Deliverable Plates Metadata
  const SHOTS_DATA = [
    {
      index: 1,
      num: 'SHOT 01',
      group: 'part1',
      jpg: 'assets/case14/shot-01.jpg?v=candidates-20261107',
      png: 'assets/case14/shot-01.png?v=candidates-20261107',
      titleZh: '產品主視覺與工作室情境',
      titleEn: 'Studio Product Hero & Workspace Context',
      sub: 'ADJUSTABLE TASK LIGHT / INDUSTRIAL PRODUCT CONCEPT',
      descZh: 'OBJECT/01 桌燈產品視覺，以深色工作室、金屬懸臂與暖色桌面光池呈現設計意圖。此圖為視覺概念提案，非已量產產品攝影。',
      descEn: 'OBJECT/01 studio design visualization, showing the metallic articulated arm and warm task-light pool. Concept imagery, not photography of a manufactured product.',
      noticeZh: '視覺概念圖 · 轉軸幾何與實體產品需後續工程驗證',
      noticeEn: 'Concept image · Joint geometry and physical prototype pending engineering validation'
    },
    {
      index: 2,
      num: 'SHOT 02',
      group: 'part1',
      jpg: 'assets/case14/shot-02-unified-20261107.svg',
      png: 'assets/case14/shot-02-unified-20261107.svg',
      titleZh: '品牌識別與產品視覺語言',
      titleEn: 'Identity System & Product Story',
      sub: 'LOGOTYPE / SERIAL SYSTEM / CONCEPT',
      descZh: '使用已核定主視覺規劃識別、字體與產品編號。非實體銘牌或產品攝影打樣。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 3,
      num: 'SHOT 03',
      group: 'part1',
      jpg: 'assets/case14/shot-03-unified-20261107.svg',
      png: 'assets/case14/shot-03-unified-20261107.svg',
      titleZh: '造型與比例視覺研究',
      titleEn: 'Form & Proportion Study',
      sub: 'FORM STUDY / VISUAL REFERENCE',
      descZh: '以核定的主視覺與一致產品照片呈現燈具比例；非工程正投影或正式尺寸資料。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 4,
      num: 'SHOT 04',
      group: 'part1',
      jpg: 'assets/case14/shot-04-unified-20261107.svg',
      png: 'assets/case14/shot-04-unified-20261107.svg',
      titleZh: '產品造型與懸臂研究',
      titleEn: 'Form Composition & Arm Study',
      sub: 'FORM LANGUAGE / ORIGINAL SOURCE',
      descZh: '以核定原圖說明燈頭、懸臂與底座的視覺配置，不另混入不同燈具造型。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 5,
      num: 'SHOT 05',
      group: 'part2',
      jpg: 'assets/case14/shot-05-unified-20261107.svg',
      png: 'assets/case14/shot-05-unified-20261107.svg',
      titleZh: '燈頭與光學概念',
      titleEn: 'Optical Housing Concept',
      sub: 'HEAD DETAIL / UNVERIFIED OPTICS',
      descZh: '原始核定爆炸圖的構件概念展示；未完成光學、散熱與電氣測試。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 6,
      num: 'SHOT 06',
      group: 'part2',
      jpg: 'assets/case14/shot-06-unified-20261107.svg',
      png: 'assets/case14/shot-06-unified-20261107.svg',
      titleZh: '轉軸與關節設計概念',
      titleEn: 'Pivot & Joint Concept',
      sub: 'HINGE STUDY / UNVERIFIED MECHANICS',
      descZh: '以核定爆炸圖解讀關節意圖；未驗證實際阻尼、耐久或可動範圍。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 7,
      num: 'SHOT 07',
      group: 'part2',
      jpg: 'assets/case14/shot-07-unified-20261107.svg',
      png: 'assets/case14/shot-07-unified-20261107.svg',
      titleZh: '底座與線材概念',
      titleEn: 'Base & Cable Study',
      sub: 'BASE STUDY / UNVERIFIED STABILITY',
      descZh: '以核定照片的底座、立柱及走線為據；配重、穩定與公差仍待測試。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 8,
      num: 'SHOT 08',
      group: 'part2',
      jpg: 'assets/case14/shot-08.jpg?v=candidates-20261107',
      png: 'assets/case14/shot-08.png?v=candidates-20261107',
      titleZh: '模組化爆炸圖',
      titleEn: 'Exploded Assembly & Shared Master Geometry',
      sub: 'EXPLODED ASSEMBLY / SHARED MASTER GEOMETRY',
      descZh: '模組化爆炸視覺示意，展示燈頭、轉軸、立柱、懸臂與底座的構件關係。圖示細節與零件數量尚須依正式工程模型逐項核對。',
      descEn: 'Conceptual exploded visual illustrating component relationships across the lamp head, pivots, mast, arm and base; detailed hardware remains subject to CAD/BOM reconciliation.',
      noticeZh: '設計概念爆炸圖 · 零件構造與組裝方式尚未實體驗證',
      noticeEn: 'Conceptual exploded artwork · Part geometry and assembly remain unvalidated'
    },
    {
      index: 9,
      num: 'SHOT 09',
      group: 'part3',
      jpg: 'assets/case14/shot-09-unified-20261107.svg',
      png: 'assets/case14/shot-09-unified-20261107.svg',
      titleZh: 'CMF 材質方向',
      titleEn: 'CMF Color Directions',
      sub: 'THREE COLOR DIRECTIONS / CONCEPT',
      descZh: '石墨黑、緞面銀與礦石綠為色票提案，不代表三款產品均已實體打樣。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 10,
      num: 'SHOT 10',
      group: 'part3',
      jpg: 'assets/case14/shot-10-unified-20261107.svg',
      png: 'assets/case14/shot-10-unified-20261107.svg',
      titleZh: '工作桌面使用情境',
      titleEn: 'Workspace Context',
      sub: 'WORKSPACE IMAGE / LIGHT SIMULATION',
      descZh: '以核定主視覺呈現桌燈工作場景；明暗效果為影像概念，非照度實測。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 11,
      num: 'SHOT 11',
      group: 'part3',
      jpg: 'assets/case14/shot-11-unified-20261107.svg',
      png: 'assets/case14/shot-11-unified-20261107.svg',
      titleZh: '模組化構件關係',
      titleEn: 'Assembly Concept Study',
      sub: 'ASSEMBLY CONCEPT / NOT FORMAL BOM',
      descZh: '依核定爆炸圖說明構件關係；未驗證正式零件表、組裝方法及安全規格。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 12,
      num: 'SHOT 12',
      group: 'part3',
      jpg: 'assets/case14/shot-12-unified-20261107.svg',
      png: 'assets/case14/shot-12-unified-20261107.svg',
      titleZh: '人因與使用操作概念',
      titleEn: 'Ergonomics & Control Study',
      sub: 'USER INTERACTION / DESIGN INTENT',
      descZh: '研究桌燈調整方向與人因操作意圖；尚無實體控制介面驗證。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 13,
      num: 'SHOT 13',
      group: 'part4',
      jpg: 'assets/case14/shot-13-unified-20261107.svg',
      png: 'assets/case14/shot-13-unified-20261107.svg',
      titleZh: '數位產品配置介面概念',
      titleEn: 'Digital Product Experience',
      sub: 'DIGITAL EXPERIENCE / EARLY PROTOTYPE',
      descZh: '以同一核定產品影像設計介面；現有 WebGL 原型尚未與核定主視覺完整對位。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 14,
      num: 'SHOT 14',
      group: 'part4',
      jpg: 'assets/case14/shot-14.jpg?v=candidates-20261107',
      png: 'assets/case14/shot-14.png?v=candidates-20261107',
      titleZh: '包裝結構與模組收納',
      titleEn: 'Packaging Architecture, Pulp Tray & Carton Flow',
      sub: 'PACKAGING ARCHITECTURE / CONCEPT ONLY',
      descZh: '以開盒情境呈現產品盒型、內托收納與零件分艙的概念，包材、固定方式及緩衝配置仍需打樣測試。',
      descEn: 'Packaging concept showing a flat presentation box, compartmentalized accessory layout and unboxing narrative; insert fit and transport protection remain untested.',
      noticeZh: '包裝情境示意 · 未打樣、未進行落摔或防護測試',
      noticeEn: 'Packaging visualization · No physical mockup, drop test or protection validation'
    },
    {
      index: 15,
      num: 'SHOT 15',
      group: 'part4',
      jpg: 'assets/case14/shot-15-unified-20261107.svg',
      png: 'assets/case14/shot-15-unified-20261107.svg',
      titleZh: '外觀保養與收納',
      titleEn: 'Care & Storage Information',
      sub: 'CARE GUIDE / EXTERNAL ONLY',
      descZh: '規劃表面清潔、線材保護與收納資訊；不提供實體產品內部拆修說明。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    },
    {
      index: 16,
      num: 'SHOT 16',
      group: 'part4',
      jpg: 'assets/case14/shot-16-unified-20261107.svg',
      png: 'assets/case14/shot-16-unified-20261107.svg',
      titleZh: '開發及驗證計畫',
      titleEn: 'Design Validation Roadmap',
      sub: 'VALIDATION PLAN / TESTS PENDING',
      descZh: '機構、照度、電氣安全及包裝防護皆尚待實體測試，不宣稱已量產。',
      descEn: 'Editorial concept plate based on the approved candidate images. Engineering validation, physical prototyping and manufacture are not claimed.',
      noticeZh: '產品概念圖版，尚未進行實體工程測試',
      noticeEn: 'Concept plate; engineering and physical tests pending'
    }
  ];

  // App State
  const state = {
    lang: 'zh-TW', // 'zh-TW' or 'en'
    currentLightboxIndex: 0,
    currentCMF: 'silver', // 'silver', 'graphite', 'green'
    isLightOn: true
  };
  window.state = state;

  // DOM Elements
  const langToggleBtn = document.getElementById('langToggle');
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const shotsGrid = document.getElementById('shotsGrid');
  
  // Lightbox Elements
  const lightbox = document.getElementById('objectLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxNum = document.getElementById('lightboxNum');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  // Render 16 Gallery Cards
  function renderGallery() {
    if (!shotsGrid) return;
    shotsGrid.innerHTML = '';

    SHOTS_DATA.forEach((shot, idx) => {
      const card = document.createElement('article');
      card.className = 'shot-card';
      card.setAttribute('data-shot', shot.index);

      const title = state.lang === 'zh-TW' ? shot.titleZh : shot.titleEn;
      const desc = state.lang === 'zh-TW' ? shot.descZh : shot.descEn;
      const notice = state.lang === 'zh-TW' ? shot.noticeZh : shot.noticeEn;

      card.innerHTML = `
        <button type="button" class="shot-btn" data-index="${idx}" aria-label="${shot.num} ${title} (放大高解析燈箱)">
          <div class="shot-img-wrap">
            <img src="${shot.jpg}" width="1920" height="1080" alt="${title} — ${desc}" loading="lazy">
            <span class="shot-badge">${shot.num}</span>
            <span class="shot-res-tag">${shot.png.endsWith('.svg') ? 'EDITORIAL / SVG' : 'APPROVED SOURCE'}</span>
          </div>
        </button>
        <div class="shot-meta">
          <div class="shot-header-row">
            <h3 class="shot-title">${title}</h3>
            <span class="chip" style="font-size:10px;">${shot.num}</span>
          </div>
          <div class="shot-sub">${shot.sub}</div>
          <p class="shot-desc">${desc}</p>
          <div class="shot-notice">${notice}</div>
        </div>
      `;

      card.querySelector('.shot-btn').addEventListener('click', () => {
        openLightbox(idx);
      });

      shotsGrid.appendChild(card);
    });
  }

  // Language Toggle
  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : 'en';

    if (langToggleBtn) {
      langToggleBtn.textContent = lang === 'zh-TW' ? 'EN' : '中文';
      langToggleBtn.setAttribute('aria-label', lang === 'zh-TW' ? '切換為英文介面' : 'Switch to Traditional Chinese');
    }

    // Update i18n DOM attributes
    document.querySelectorAll('[data-i18n-zh]').forEach(el => {
      const zh = el.getAttribute('data-i18n-zh');
      const en = el.getAttribute('data-i18n-en');
      el.textContent = lang === 'zh-TW' ? zh : en;
    });

    renderGallery();
    updateLightboxContent();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setLanguage(state.lang === 'zh-TW' ? 'en' : 'zh-TW');
    });
  }

  // Navigation Tabs Switching
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      
      navTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // If switching to 3D Configurator tab, trigger Three.js resize
      if (targetId === 'tab-3d' && window.object3DViewer) {
        window.object3DViewer.handleResize();
      }
    });
  });

  // Lightbox Implementation
  function openLightbox(index) {
    state.currentLightboxIndex = index;
    updateLightboxContent();
    if (lightbox) {
      lightbox.removeAttribute('hidden');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxCloseBtn) lightboxCloseBtn.focus();
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.setAttribute('hidden', '');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function updateLightboxContent() {
    const shot = SHOTS_DATA[state.currentLightboxIndex];
    if (!shot || !lightboxImg) return;

    // Use source image or 2560 x 1440 self-contained editorial SVG
    lightboxImg.src = shot.png;
    lightboxImg.alt = state.lang === 'zh-TW' ? shot.titleZh : shot.titleEn;

    if (lightboxNum) lightboxNum.textContent = `${shot.num} / 16`;
    if (lightboxTitle) lightboxTitle.textContent = state.lang === 'zh-TW' ? shot.titleZh : shot.titleEn;
    if (lightboxCaption) {
      const captionText = state.lang === 'zh-TW' ? shot.descZh : shot.descEn;
      lightboxCaption.innerHTML = `<strong>${shot.num}：</strong>${captionText}`;
    }
  }

  function prevLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex - 1 + SHOTS_DATA.length) % SHOTS_DATA.length;
    updateLightboxContent();
  }

  function nextLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex + 1) % SHOTS_DATA.length;
    updateLightboxContent();
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.hasAttribute('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    }
  });

  // Touch swipe support for mobile lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) nextLightbox();
      if (touchEndX - touchStartX > 50) prevLightbox();
    }, { passive: true });
  }

  // ==========================================================================
  // Three.js Interactive 3D Configurator Studio
  // ==========================================================================
  class Object3DViewer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.model = null;
      this.materialsMap = {};
      this.lightBeam = null;
      this.diffuserMesh = null;
      this.loaded = false;

      this.init();
    }

    init() {
      const container = this.canvas.parentElement;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 580;

      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.05, 20);
      this.camera.position.set(0.65, 0.46, 1.05);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Controls
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.minDistance = 0.4;
      this.controls.maxDistance = 2.5;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't go too far below floor
      this.controls.target.set(0, 0.24, 0.08);
      this.controls.update();

      // Lighting Setup
      this.setupLighting();

      // Load GLTF Model
      this.loadModel();

      // Setup Event Listeners
      window.addEventListener('resize', () => this.handleResize());
      this.setupUIControls();

      // Animation Loop
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    setupLighting() {
      // Key light - calibrated studio light with normalBias to eliminate shadow acne
      const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.4);
      keyLight.position.set(1.2, 1.8, 1.4);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.camera.near = 0.1;
      keyLight.shadow.camera.far = 3.5;
      keyLight.shadow.camera.left = -0.35;
      keyLight.shadow.camera.right = 0.35;
      keyLight.shadow.camera.top = 0.65;
      keyLight.shadow.camera.bottom = -0.15;
      keyLight.shadow.bias = -0.0001;
      keyLight.shadow.normalBias = 0.02; // Critical for smooth PBR curvature shadows
      this.scene.add(keyLight);

      // Fill light - soft cool fill for shadow graduation
      const fillLight = new THREE.DirectionalLight(0xd0e0ff, 0.65);
      fillLight.position.set(-1.5, 1.2, -0.8);
      this.scene.add(fillLight);

      // Rim light - sharp contour edge definition
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.85);
      rimLight.position.set(0, 2.0, -1.8);
      this.scene.add(rimLight);

      // Ambient light - controlled soft base
      const ambientLight = new THREE.AmbientLight(0x222630, 0.6);
      this.scene.add(ambientLight);

      // Matte architectural tabletop plane to receive task light illumination and shadows
      const deskGeo = new THREE.PlaneGeometry(2.4, 2.0);
      const deskMat = new THREE.MeshStandardMaterial({
        color: 0x15171e,
        roughness: 0.86,
        metalness: 0.08
      });
      const deskPlane = new THREE.Mesh(deskGeo, deskMat);
      deskPlane.rotation.x = -Math.PI / 2;
      deskPlane.position.set(0, -0.0005, 0.1);
      deskPlane.receiveShadow = true;
      this.scene.add(deskPlane);

      // Downward Task Spotlight simulating optical diffuser cone illumination on desk
      this.taskSpotLight = new THREE.SpotLight(0xFFF1D8, 3.8);
      this.taskSpotLight.position.set(0, 0.45, 0.187);
      this.taskSpotLight.target.position.set(0, 0, 0.187);
      this.taskSpotLight.angle = Math.PI / 3.4; // ~53 deg cone
      this.taskSpotLight.penumbra = 0.5;
      this.taskSpotLight.decay = 1.4;
      this.taskSpotLight.distance = 1.4;
      this.taskSpotLight.castShadow = true;
      this.taskSpotLight.shadow.mapSize.width = 1024;
      this.taskSpotLight.shadow.mapSize.height = 1024;
      this.taskSpotLight.shadow.bias = -0.0002;
      this.scene.add(this.taskSpotLight);
      this.scene.add(this.taskSpotLight.target);

      // Diffuser localized glow point light
      this.taskGlow = new THREE.PointLight(0xFFE5B5, 1.4, 0.7);
      this.taskGlow.position.set(0, 0.435, 0.187);
      this.scene.add(this.taskGlow);
    }

    loadModel() {
      const loader = new THREE.GLTFLoader();
      const modelPath = 'assets/3d/OBJECT01_V3_ALIGNED_MASTER.glb';

      loader.load(
        modelPath,
        (gltf) => {
          this.model = gltf.scene;

          // Scale from mm CAD units to meters (1/1000)
          this.model.scale.set(0.001, 0.001, 0.001);
          // Align base silicone pad bottom to ground contact at Y=0
          this.model.position.y = 0.0006;

          // Track parts and enable shadows
          this.diffuserMesh = null;
          this.accentMeshes = [];
          this.shellMeshes = [];

          this.model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              const name = (child.name || '').toLowerCase();
              if (name.includes('diffuser')) {
                this.diffuserMesh = child;
              } else if (name.includes('trim') || name.includes('accent') || name.includes('bezel') || name.includes('knob')) {
                this.accentMeshes.push(child);
              } else if (!name.includes('cable') && !name.includes('pad') && !name.includes('boot')) {
                this.shellMeshes.push(child);
              }
            }
          });

          this.scene.add(this.model);
          this.loaded = true;
          this.applyCMF('silver');
        },
        undefined,
        (error) => {
          console.warn('GLB load note:', error);
        }
      );
    }

    applyCMF(cmfKey) {
      state.currentCMF = cmfKey;
      if (!this.model) return;

      let shellColor, shellMetal, shellRough;
      let accentColor, accentMetal, accentRough;

      if (cmfKey === 'silver') {
        shellColor = new THREE.Color(0xBDC3C7);
        shellMetal = 0.88;
        shellRough = 0.28;
        accentColor = new THREE.Color(0x7F8C8D);
        accentMetal = 0.94;
        accentRough = 0.16;
      } else if (cmfKey === 'graphite') {
        shellColor = new THREE.Color(0x383B42);
        shellMetal = 0.90;
        shellRough = 0.32;
        accentColor = new THREE.Color(0x1F2126);
        accentMetal = 0.95;
        accentRough = 0.18;
      } else if (cmfKey === 'green') {
        shellColor = new THREE.Color(0x2B3D32); // Mineral Green (低彩度建築苔綠)
        shellMetal = 0.86;
        shellRough = 0.35;
        accentColor = new THREE.Color(0xC8A46D); // Spun Brass / Champagne Gold (暖銅香檳金飾環)
        accentMetal = 0.92;
        accentRough = 0.22;
      }

      this.shellMeshes.forEach(child => {
        if (child.material) {
          child.material.color = shellColor;
          child.material.metalness = shellMetal;
          child.material.roughness = shellRough;
          child.material.needsUpdate = true;
        }
      });

      this.accentMeshes.forEach(child => {
        if (child.material) {
          child.material.color = accentColor;
          child.material.metalness = accentMetal;
          child.material.roughness = accentRough;
          child.material.needsUpdate = true;
        }
      });

      if (this.diffuserMesh && this.diffuserMesh.material) {
        this.diffuserMesh.material.color = state.isLightOn ? new THREE.Color(0xFFFBF4) : new THREE.Color(0x333333);
        this.diffuserMesh.material.roughness = 0.35;
        this.diffuserMesh.material.metalness = 0.05;
        this.diffuserMesh.material.emissive = new THREE.Color(0xFFECC2);
        this.diffuserMesh.material.emissiveIntensity = state.isLightOn ? 2.5 : 0.0;
        this.diffuserMesh.material.needsUpdate = true;
      }
    }

    toggleLight() {
      state.isLightOn = !state.isLightOn;
      if (this.diffuserMesh && this.diffuserMesh.material) {
        this.diffuserMesh.material.emissiveIntensity = state.isLightOn ? 2.5 : 0.0;
        this.diffuserMesh.material.color = state.isLightOn ? new THREE.Color(0xFFFBF4) : new THREE.Color(0x333333);
        this.diffuserMesh.material.needsUpdate = true;
      }
      if (this.taskSpotLight) {
        this.taskSpotLight.intensity = state.isLightOn ? 3.8 : 0.0;
      }
      if (this.taskGlow) {
        this.taskGlow.intensity = state.isLightOn ? 1.4 : 0.0;
      }
      const lightBtn = document.getElementById('btnToggleLight');
      if (lightBtn) {
        const textZh = state.isLightOn ? '💡 模擬燈光：開啟' : '🌑 模擬燈光：關閉';
        const textEn = state.isLightOn ? '💡 Task Light: ON' : '🌑 Task Light: OFF';
        lightBtn.textContent = state.lang === 'zh-TW' ? textZh : textEn;
      }
    }

    resetView() {
      if (this.controls && this.camera) {
        this.camera.position.set(0.65, 0.46, 1.05);
        this.controls.target.set(0, 0.24, 0.08);
        this.controls.update();
      }
    }

    setupUIControls() {
      // CMF Buttons
      document.querySelectorAll('.cmf-option').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.cmf-option').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cmf = btn.getAttribute('data-cmf');
          this.applyCMF(cmf);
        });
      });

      const resetBtn = document.getElementById('btnResetView');
      if (resetBtn) resetBtn.addEventListener('click', () => this.resetView());

      const lightBtn = document.getElementById('btnToggleLight');
      if (lightBtn) lightBtn.addEventListener('click', () => this.toggleLight());
    }

    handleResize() {
      if (!this.canvas) return;
      const container = this.canvas.parentElement;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 580;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    animate() {
      requestAnimationFrame(this.animate);
      if (this.controls) this.controls.update();
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    renderGallery();

    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined' && document.getElementById('threeCanvas')) {
      window.object3DViewer = new Object3DViewer('threeCanvas');
    }
  });

})();

