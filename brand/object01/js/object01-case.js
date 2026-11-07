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
      jpg: 'assets/case14/hero-editorial-20261107.svg',
      png: 'assets/case14/hero-editorial-20261107.svg',
      titleZh: '產品形象與閱讀情境',
      titleEn: 'Product Portrait & Workspace Context',
      sub: 'ADJUSTABLE TASK LIGHT / INDUSTRIAL PRODUCT CONCEPT',
      descZh: '以真實工作桌視覺情境呈現桌燈的造型比例、金屬材質與局部工作照明；屬概念視覺合成，非量產產品攝影。',
      descEn: 'An editorial workspace portrait exploring the lamp’s proportions, metallic finish and focused task lighting; a design visualization rather than manufactured product photography.',
      noticeZh: '概念視覺提案 · 未宣稱已量產或完成安規認證',
      noticeEn: 'Design concept visual · Pending physical production & certifications'
    },
    {
      index: 2,
      num: 'SHOT 02',
      group: 'part1',
      jpg: 'assets/case14/shot-02.jpg',
      png: 'assets/case14/shot-02.png',
      titleZh: '產品識別與視覺語言',
      titleEn: 'Logotype, Serial System & Design Language',
      sub: 'LOGOTYPE / SERIAL SYSTEM / DESIGN MATERIALS',
      descZh: '確立 OBJECT/01 識別邏輯、精密字型排印規範、銘牌雕刻規範與金屬消光質感層次。',
      descEn: 'Defines the serial logic, typographic hierarchy, debossed metal marking, and subtle satin metal finishes.',
      noticeZh: '銘板標示與視覺規範 · 供概念溝通使用',
      noticeEn: 'Visual branding standard · Concept communication only'
    },
    {
      index: 3,
      num: 'SHOT 03',
      group: 'part1',
      jpg: 'assets/case14/shot-03.jpg?v=restored-20261106',
      png: 'assets/case14/shot-03.png?v=restored-20261106',
      titleZh: '工業設計三視圖',
      titleEn: 'Orthographic Study & Concept Dimensions',
      sub: 'ORTHOGRAPHIC STUDY / CONCEPT DIMENSIONS',
      descZh: '提供前視、側視與俯視正投影圖面，標註燈頭 Ø160mm、底座 Ø190mm、立桿高 265mm 之公稱設計幾何。',
      descEn: 'Front, side, and top orthographic projections specifying nominal dimensions (Head Ø160mm, Base Ø190mm, Mast 265mm).',
      noticeZh: '公稱設計尺寸 · 尚未完成量產公差與結構剛性實測',
      noticeEn: 'Nominal design dimensions · Tolerance & rigidity pending testing'
    },
    {
      index: 4,
      num: 'SHOT 04',
      group: 'part1',
      jpg: 'assets/case14/shot-04.jpg?v=restored-20261106',
      png: 'assets/case14/shot-04.png?v=restored-20261106',
      titleZh: '同源造型與空間比例',
      titleEn: 'Form Exploration & Three Views from Master GLB',
      sub: 'FORM EXPLORATION / THREE VIEWS FROM ONE GLB',
      descZh: '從單一參數化 GLB 母型出發，展示全貌形態、後方走線幾何與純粹側影比例，確保各視角線條協調。',
      descEn: 'Multi-angle study derived from a single GLB master model, validating overall balance, rear cable path, and side profile.',
      noticeZh: '同源 3D 母型輸出 · 各角度比例嚴格對位',
      noticeEn: 'Rendered from identical master GLB · Strict geometric alignment'
    },
    {
      index: 5,
      num: 'SHOT 05',
      group: 'part2',
      jpg: 'assets/case14/shot-05.jpg',
      png: 'assets/case14/shot-05.png',
      titleZh: '燈頭光學艙概念',
      titleEn: 'Optical Housing, Bezel & Diffuser Study',
      sub: 'HOUSING / BEZEL / DIFFUSER / STRUCTURAL STUDY',
      descZh: '剖析燈頭五層結構：上金屬外殼、金屬飾環、沉頭開口邊框、乳白漫射板與固定支架。',
      descEn: 'Detailed anatomical analysis of the 5-layer optical housing: top cap, trim ring, aperture bezel, diffuser, and internal mount.',
      noticeZh: '僅為設計剖析 · 非完成的光學、散熱或電氣測試結果',
      noticeEn: 'Design anatomy only · Photometric, thermal & electrical tests pending'
    },
    {
      index: 6,
      num: 'SHOT 06',
      group: 'part2',
      jpg: 'assets/case14/shot-06.jpg',
      png: 'assets/case14/shot-06.png',
      titleZh: '雙關節與旋轉機構',
      titleEn: 'Articulation Study & Dual Hinge Geometry',
      sub: 'ARTICULATION STUDY / HINGE GEOMETRY',
      descZh: '設計上下雙轉軸關節模組，規劃旋轉止擋、內部走線穿入孔與同軸樞紐軸銷，實現順暢定位。',
      descEn: 'Engineers dual upper and lower pivot hinges with internal stops, cable conduit pass-throughs, and concentric pins.',
      noticeZh: '機械意圖示意 · 阻尼手感、耐久壽命與旋轉角度需實體驗證',
      noticeEn: 'Mechanical intent · Damping torque & cycle life pending validation'
    },
    {
      index: 7,
      num: 'SHOT 07',
      group: 'part2',
      jpg: 'assets/case14/shot-07.jpg',
      png: 'assets/case14/shot-07.png',
      titleZh: '配重底座與電源走線',
      titleEn: 'Base Architecture, Cable Routing & Knurled Dial',
      sub: 'BASE ARCHITECTURE / STABILITY CONCEPT',
      descZh: '低重心配重底盤（Ø190mm × 15mm），整合滾花旋鈕調光介面、立桿固定座與後方電纜抗折出線套。',
      descEn: 'Low-center-of-gravity cast base integrating knurled rotary dimmer, mast collar, and rear strain-relief cable exit.',
      noticeZh: '結構與配重概念 · 實際翻倒角與防滑腳墊需實測',
      noticeEn: 'Stability concept · Tipping angle & anti-slip pads pending physical testing'
    },
    {
      index: 8,
      num: 'SHOT 08',
      group: 'part2',
      jpg: 'assets/case14/shot-08.jpg?v=restored-20261106',
      png: 'assets/case14/shot-08.png?v=restored-20261106',
      titleZh: '模組化爆炸圖',
      titleEn: 'Exploded Assembly & Shared Master Geometry',
      sub: 'EXPLODED ASSEMBLY / SHARED MASTER GEOMETRY',
      descZh: '以同源參數化母型展開爆炸組裝圖，精確展示燈頭組件、上關節、下關節、懸臂立柱與配重底座裝配邏輯。',
      descEn: 'Full exploded assembly breakdown from parametric geometry, depicting modular hierarchy from base to optical diffuser.',
      noticeZh: '概念幾何裝配圖 · 未包含緊固件公差、散熱模組與電路基板',
      noticeEn: 'Conceptual exploded geometry · Fastener tolerances & PCB layout pending'
    },
    {
      index: 9,
      num: 'SHOT 09',
      group: 'part3',
      jpg: 'assets/case14/shot-09.jpg',
      png: 'assets/case14/shot-09.png',
      titleZh: 'CMF 材質與表面處理',
      titleEn: 'Triple CMF Finishes (Silver, Graphite, Mineral Green)',
      sub: 'ONE FORM / THREE FINISH DIRECTIONS',
      descZh: '定義三款經典建築材質方向：微珠擊陽極銀 (Satin Silver)、微絨粉體烤漆霧黑 (Matte Graphite) 與建築礦石苔綠 (Mineral Green)。',
      descEn: 'Specifies three architectural finishes: fine-bead blasted Anodized Silver, ultra-matte Graphite, and Mineral Sage Green.',
      noticeZh: '材質色樣規格 · 實際表面粗糙度 Ra 與色差 ΔE 待打樣確認',
      noticeEn: 'CMF specification · Physical surface roughness Ra & delta-E pending samples'
    },
    {
      index: 10,
      num: 'SHOT 10',
      group: 'part3',
      jpg: 'assets/case14/shot-10.jpg',
      png: 'assets/case14/shot-10.png',
      titleZh: '閱讀與工作桌面情境',
      titleEn: 'Use Context, Light Pool & Workspace Task',
      sub: 'USE CONTEXT / LIGHT POOL & WORKSPACE',
      descZh: '桌燈於實際閱讀、繪圖與筆電工作場域的視覺模擬，展現純淨下照光束與柔和周邊漫射的層次感。',
      descEn: 'Photographic workspace simulation depicting focused downlight pool, ambient contrast, and task ergonomics.',
      noticeZh: '光束與桌面照度為視覺模擬示意 · 未經實驗室照度計實測',
      noticeEn: 'Light pool is a visual simulation · Photometric lux levels unmeasured'
    },
    {
      index: 11,
      num: 'SHOT 11',
      group: 'part3',
      jpg: 'assets/case14/shot-11.jpg',
      png: 'assets/case14/shot-11.png',
      titleZh: '模組化裝配順序',
      titleEn: 'Assembly Concept & Component Hierarchy',
      sub: 'ASSEMBLY CONCEPT / COMPONENT FAMILIES',
      descZh: '解構四步驟模組化組裝流程：底座安裝、立桿鎖固、鉸鏈連結與燈頭定位，探索工具極簡化的可能性。',
      descEn: 'Four-stage modular assembly flow: base placement, mast locking, hinge articulation, and head positioning.',
      noticeZh: '概念裝配流程 · 實際電氣安全鎖定與工具需求尚待工程確認',
      noticeEn: 'Assembly concept · Mechanical fasteners & electrical safety pending'
    },
    {
      index: 12,
      num: 'SHOT 12',
      group: 'part3',
      jpg: 'assets/case14/shot-12.jpg',
      png: 'assets/case14/shot-12.png',
      titleZh: '人因操作與調光介面',
      titleEn: 'Knurled Dimmer Control & Ergonomic States',
      sub: 'KNURLED CONTROL / INTERACTION STATES',
      descZh: '聚焦前置滾花旋鈕的人因操作細節：微動按壓開關、無段旋轉亮度調光，以及盲操觸感回饋設計。',
      descEn: 'Human-interface study of the knurled metal rotary dial: push-to-toggle power, smooth continuous dimming, and tactile knurling.',
      noticeZh: '介面操作方式為設計意圖 · 尚未製作實體控制板或編碼器',
      noticeEn: 'Interface design intent · Hardware control board & firmware pending'
    },
    {
      index: 13,
      num: 'SHOT 13',
      group: 'part4',
      jpg: 'assets/case14/shot-13.jpg',
      png: 'assets/case14/shot-13.png',
      titleZh: '3D 配置器視覺規劃',
      titleEn: 'Digital Product Experience & UI Concept',
      sub: 'DIGITAL PRODUCT EXPERIENCE / UI CONCEPT',
      descZh: '規劃產品線上 3D 即時配置器體驗，支援 360 度旋轉檢視、三色 CMF 即時切換與照明模式切換。本頁 Tab 02 已實作可操作原型。',
      descEn: 'UI design for a web-based 3D configurator featuring 360-degree orbit, live CMF switching, and interactive lighting states.',
      noticeZh: '3D 展示介面概念 · 已在本頁 Tab 02 提供實際可操作 WebGL 原型',
      noticeEn: 'Digital experience concept · Fully interactive WebGL prototype in Tab 02'
    },
    {
      index: 14,
      num: 'SHOT 14',
      group: 'part4',
      jpg: 'assets/case14/shot-14.jpg',
      png: 'assets/case14/shot-14.png',
      titleZh: '包裝結構與模組收納',
      titleEn: 'Packaging Architecture, Pulp Tray & Carton Flow',
      sub: 'PACKAGING ARCHITECTURE / CONCEPT ONLY',
      descZh: '環保紙漿模塑內托與精裝外盒結構，零件分艙定位，保護燈頭鏡面與旋鈕，並維持緊湊扁平化運輸體積。',
      descEn: 'Sustainable molded pulp tray and rigid folding carton packaging, providing compartmentalized protection in a flat pack.',
      noticeZh: '示意性刀模與收納概念 · 尚未完成實物防護測試或紙材打樣',
      noticeEn: 'Packaging concept · Physical drop testing & paper prototypes pending'
    },
    {
      index: 15,
      num: 'SHOT 15',
      group: 'part4',
      jpg: 'assets/case14/shot-15.jpg',
      png: 'assets/case14/shot-15.png',
      titleZh: '日常保養與產品資訊系統',
      titleEn: 'Care Guide & Non-Electrical Maintenance',
      sub: 'CARE GUIDE / NON-ELECTRICAL MAINTENANCE',
      descZh: '為使用者提供外觀保養說明：柔軟微纖維布除塵、線材避免扭折、收藏防潮存放，體現長效產品哲學。',
      descEn: 'User-facing product care principles: microfiber surface dusting, cable strain avoidance, and safe seasonal storage.',
      noticeZh: '外觀清潔與非電氣維護指引 · 本圖不提供自行拆修內部電路之指引',
      noticeEn: 'Cosmetic care guide only · Does not provide internal electrical repair guides'
    },
    {
      index: 16,
      num: 'SHOT 16',
      group: 'part4',
      jpg: 'assets/case14/shot-16.jpg',
      png: 'assets/case14/shot-16.png',
      titleZh: '設計驗證與開發路線',
      titleEn: 'Design Roadmap & Pending Physical Validation',
      sub: 'DESIGN ROADMAP / PENDING PHYSICAL VALIDATION',
      descZh: '公開透明的工程驗證路線圖：光學配光曲線、機械關節疲勞、電氣安全認證（CE/UL/BSMI）與包裝跌落測試之預定時程。',
      descEn: 'Transparent validation roadmap outlining scheduled optical profiling, hinge fatigue tests, electrical certifications, and drop tests.',
      noticeZh: 'ALL TESTS PENDING · 誠實聲明所有項目尚待實體打樣與實驗室測試',
      noticeEn: 'ALL TESTS PENDING · Honest disclosure that all items await laboratory testing'
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
            <span class="shot-res-tag">${shot.png.endsWith('.svg') ? 'VECTOR EDITORIAL' : 'DETAILED VIEW'}</span>
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

    // Use full original 2560x1440 PNG
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

