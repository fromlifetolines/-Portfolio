/**
 * LINEAR SPACE / FRAME/01 — CASE STUDY INTERACTIVE LOGIC
 * FLTL × HOWARD HUANG | PORTFOLIO 08 | PHASE A
 * Modules: 16-Plate Grid, Fullscreen Lightbox, Interactive Spatial Tour, Bilingual Switcher
 */

(() => {
  'use strict';

  // 16 Approved Official Shots Data
  const SHOTS = [
    {
      num: 1,
      slug: 'ARCHITECTURAL_HERO',
      png: 'SHOT_01_ARCHITECTURAL_HERO.png',
      jpg: 'shot-01.jpg',
      zh: '建築外觀主視覺',
      en: 'Architectural Hero',
      subZh: '量體、石灰岩與暮光夜景',
      subEn: 'Massing, limestone & dusk illumination'
    },
    {
      num: 2,
      slug: 'BRAND_CONCEPT',
      png: 'SHOT_02_BRAND_CONCEPT.png',
      jpg: 'shot-02.jpg',
      zh: '品牌定位與空間哲學',
      en: 'Brand Concept & Spatial Philosophy',
      subZh: '以空間，形塑品牌的日常',
      subEn: 'Spaces for people and brands'
    },
    {
      num: 3,
      slug: 'SPACE_PLANNING',
      png: 'SHOT_03_SPACE_PLANNING.png',
      jpg: 'shot-03.jpg',
      zh: '空間規劃與軸測分區 (180 m²)',
      en: 'Spatial Planning & Isometric Zoning (180 m²)',
      subZh: '五大機能區塊與平整動線配置',
      subEn: 'Five functional zones & seamless circulation'
    },
    {
      num: 4,
      slug: 'EXTERIOR',
      png: 'SHOT_04_EXTERIOR.png',
      jpg: 'shot-04.jpg',
      zh: '建築立面與沉靜入口',
      en: 'Architectural Facade & Quiet Arrival',
      subZh: '石灰岩牆體、水景倒影與暖光',
      subEn: 'Stone facade, water reflection & warm light'
    },
    {
      num: 5,
      slug: 'INTERIOR_OVERVIEW',
      png: 'SHOT_05_INTERIOR_OVERVIEW.png',
      jpg: 'shot-05.jpg',
      zh: '中央展示藝廊全景',
      en: 'Central Gallery Overview',
      subZh: '通透挑高、漫射採光與展陳島台',
      subEn: 'High ceiling, diffused daylight & display islands'
    },
    {
      num: 6,
      slug: 'MATERIAL_PALETTE',
      png: 'SHOT_06_MATERIAL_PALETTE.png',
      jpg: 'shot-06.jpg',
      zh: '四重核心材質庫研究',
      en: 'Four-Core Material Library',
      subZh: '石灰岩、煙燻橡木、霧黑金屬、霧面玻璃',
      subEn: 'Limestone, smoked oak, matte metal, frosted glass'
    },
    {
      num: 7,
      slug: 'LIGHTING_DESIGN',
      png: 'SHOT_07_LIGHTING_DESIGN.png',
      jpg: 'shot-07.jpg',
      zh: '建築照明策略 (2700–3000K)',
      en: 'Architectural Lighting Strategy (2700–3000K)',
      subZh: '光作為建築元素與漫射色溫',
      subEn: 'Light as an element & calibrated color temperature'
    },
    {
      num: 8,
      slug: 'RETAIL_DISPLAY',
      png: 'SHOT_08_RETAIL_DISPLAY.png',
      jpg: 'shot-08.jpg',
      zh: '展演陳列與沉靜動線',
      en: 'Display as Experience',
      subZh: '模組化展具與選品導向動線',
      subEn: 'Modular fixtures & curated circulation'
    },
    {
      num: 9,
      slug: 'WAYFINDING_SYSTEM',
      png: 'SHOT_09_WAYFINDING_SYSTEM.png',
      jpg: 'shot-09.jpg',
      zh: '環境導視與標誌系統',
      en: 'Environmental Wayfinding System',
      subZh: '建築字體、立體標示與指引層級',
      subEn: 'Architectural signage & wayfinding hierarchy'
    },
    {
      num: 10,
      slug: 'FURNITURE_DETAIL',
      png: 'SHOT_10_FURNITURE_DETAIL.png',
      jpg: 'shot-10.jpg',
      zh: '訂製家具與概念木作細節',
      en: 'Quiet Joinery & Custom Furniture (Schematic Concept)',
      subZh: '示意性家具木作概念，非實際施工工程圖',
      subEn: 'Schematic furniture joinery (not fabrication engineering)'
    },
    {
      num: 11,
      slug: 'HUMAN_EXPERIENCE',
      png: 'SHOT_11_HUMAN_EXPERIENCE.png',
      jpg: 'shot-11.jpg',
      zh: '人物動線概念示意（非真實訪客攝影）',
      en: 'Human Circulation Concept (Not Live Photography)',
      subZh: '人本空間節奏與動線示意圖版',
      subEn: 'Conceptual movement visualization & spatial flow'
    },
    {
      num: 12,
      slug: 'DETAIL_CRAFT',
      png: 'SHOT_12_DETAIL_CRAFT.png',
      jpg: 'shot-12.jpg',
      zh: '材質工藝與收邊細節',
      en: 'Material Meets Precision',
      subZh: '收邊金屬、石材接縫與木質紋理',
      subEn: 'Metal transitions, stone joints & wood grain'
    },
    {
      num: 13,
      slug: 'DIGITAL_EXPERIENCE',
      png: 'SHOT_13_DIGITAL_EXPERIENCE.png',
      jpg: 'shot-13.jpg',
      zh: '數位展演桌機介面',
      en: 'Desktop Digital Experience',
      subZh: '建築概念的線上延伸與預約介面',
      subEn: 'Online architectural extension & digital showcase'
    },
    {
      num: 14,
      slug: 'MOBILE_EXPERIENCE',
      png: 'SHOT_14_MOBILE_EXPERIENCE.png',
      jpg: 'shot-14.jpg',
      zh: '行動端自適應體驗',
      en: 'Responsive Mobile Experience',
      subZh: '指尖上的空間導覽與掌中展覽',
      subEn: 'Spatial exploration & mobile narrative'
    },
    {
      num: 15,
      slug: 'DESIGN_PROCESS',
      png: 'SHOT_15_DESIGN_PROCESS.png',
      jpg: 'shot-15.jpg',
      zh: '設計研究與發展歷程',
      en: 'Design Process & Evolution',
      subZh: '調研、空間定調、材質精煉至視覺呈現',
      subEn: 'Research, spatial layout, materiality & presentation'
    },
    {
      num: 16,
      slug: 'FINAL_SHOWCASE',
      png: 'SHOT_16_FINAL_SHOWCASE.png',
      jpg: 'shot-16.jpg',
      zh: '完整品牌空間系統總覽',
      en: 'Final Brand & Architecture Showcase',
      subZh: '實體空間、環境識別與數位媒介整合',
      subEn: 'Synthesizing space, environment & digital medium'
    }
  ];

  // 5 Spatial Tour Zones (Total = 180 m²)
  const ZONES = [
    {
      id: 'z-entry',
      num: '01',
      code: 'ENTRANCE',
      area: 24,
      zhTitle: '入口沉靜迎賓玄關',
      enTitle: 'Quiet Arrival & Entry Threshold',
      zhSub: '自都會喧囂過渡至內斂空間的儀式起點',
      enSub: 'A deliberate architectural transition from urban noise to stillness',
      zhDesc: '挑高石灰岩立面包覆與低眩光線性照明，引導訪客自然放慢腳步。中央設有石灰岩削切服務檯，以幾何純粹性營造第一觸點的品牌莊重感。',
      enDesc: 'Tall limestone wall planes and recessed low-glare perimeter illumination encourage visitors to decelerate. A monolithic carved limestone reception desk anchors the first point of contact with quiet architectural authority.',
      materialZh: '石灰岩、霧黑金屬、隱藏地腳燈',
      materialEn: 'Limestone, matte black metal, concealed cove lighting',
      lightZh: '2700K 迎賓間接導引光',
      lightEn: '2700K warm indirect threshold wash',
      shotThumb: 'assets/mockups/shot-04.jpg',
      shotIndex: 3
    },
    {
      id: 'z-gallery',
      num: '02',
      code: 'GALLERY',
      area: 64,
      zhTitle: '中央核心展示主藝廊',
      enTitle: 'Central Exhibition Gallery',
      zhSub: '自然天光與開闊島台交織的展陳核心',
      enSub: 'Expansive daylight hall with bespoke display islands',
      zhDesc: '全案最大核心展示空間（64 m²），挑高開闊，天花板配置格柵漫射天光。島台採用石灰岩基座與煙燻橡木檯面，提供 360 度無阻礙的展品環景觀賞動線。',
      enDesc: 'The largest single zone (64 m²), featuring lofty volume and overhead diffused daylight louvers. Monolithic display islands combine limestone plinths with smoked oak tops, enabling frictionless 360-degree curated circulation.',
      materialZh: '石灰岩島台、煙燻橡木、抗眩玻璃',
      materialEn: 'Limestone display islands, smoked oak, anti-reflective glass',
      lightZh: '3000K 展品高演色重點光 + 漫射天光',
      lightEn: '3000K high-CRI accent spots + diffused natural daylight',
      shotThumb: 'assets/mockups/shot-05.jpg',
      shotIndex: 4
    },
    {
      id: 'z-lounge',
      num: '03',
      code: 'LOUNGE',
      area: 38,
      zhTitle: '交流休閒沙龍區',
      enTitle: 'Conversation & Design Lounge',
      zhSub: '煙燻橡木壁板與暖光包覆的沉靜對話場域',
      enSub: 'An intimate envelope of timber millwork and warm light',
      zhDesc: '規劃 38 m² 的深度社交交流沙龍。全室以垂直煙燻橡木壁板與暖光光膜包覆，降低回音殘響，配置低矮訂製沙發與閱讀陳列，營造如同私人圖書館的靜謐氛圍。',
      enDesc: 'A 38 m² dialogue lounge wrapped in vertical smoked oak slatwork and soft perimeter light bands, acoustically calibrated to minimize reverberation for private client exchanges and design culture reading.',
      materialZh: '煙燻橡木壁板、羊毛織品、暗調金屬',
      materialEn: 'Smoked oak panelling, natural wool textiles, dark metal',
      lightZh: '2700K 溫潤漫射氛圍光',
      lightEn: '2700K intimate diffused ambient glow',
      shotThumb: 'assets/mockups/shot-07.jpg',
      shotIndex: 6
    },
    {
      id: 'z-consult',
      num: '04',
      code: 'CONSULTATION',
      area: 24,
      zhTitle: '深度設計諮詢室',
      enTitle: 'Private Design Consultation Suite',
      zhSub: '霧面玻璃半透隔屏與客製材質樣本選配台',
      enSub: 'Acoustic frosted glass screens and tailored material tasting table',
      zhDesc: '設置 24 m² 獨立諮詢空間，採用霧面條紋玻璃與霧黑金屬框劃分邊界，確保視線與談話隱私。內部備有長型材質選樣台，提供實體石材、木皮與色階樣板體驗。',
      enDesc: 'A dedicated 24 m² consultation suite framed by ribbed frosted glass and blackened metal profiles, ensuring acoustic discretion while accommodating a bespoke material inspection island with stone, veneer and finish samples.',
      materialZh: '霧面玻璃、霧黑鋁框、天然石材樣板',
      materialEn: 'Frosted ribbed glass, matte black framing, stone samples',
      lightZh: '3000K CRI 95+ 真實顯色工作光',
      lightEn: '3000K CRI 95+ high-fidelity task lighting',
      shotThumb: 'assets/mockups/shot-08.jpg',
      shotIndex: 7
    },
    {
      id: 'z-boh',
      num: '05',
      code: 'BACK_OF_HOUSE',
      area: 30,
      zhTitle: '後勤工作準備與機房',
      enTitle: 'Service & Back-of-House Facilities',
      zhSub: '高效幕後支援系統，維持對外空間的極致純粹',
      enSub: 'Streamlined backstage infrastructure preserving public order',
      zhDesc: '配置 30 m² 後勤工作區，涵蓋隱藏式庫存收納、員工備品室、水電智慧控制總機與多媒體伺服設備，將管線與雜物完全隱蔽，維持前台一塵不染的秩序。',
      enDesc: 'A dedicated 30 m² operational spine integrating inventory storage, staff prep facilities, digital media distribution servers, and lighting automation hubs—ensuring public galleries stay impeccably minimalist.',
      materialZh: '霧黑耐磨鋼板、隔音吸音棉',
      materialEn: 'Matte black steel, acoustic dampening panels',
      lightZh: '4000K/3000K 雙模工作照度',
      lightEn: '4000K/3000K dual-mode functional work lighting',
      shotThumb: 'assets/mockups/shot-03.jpg',
      shotIndex: 2
    }
  ];

  // State
  let currentLang = 'zh-TW';
  let activeZoneIndex = 0;
  let activeLightboxIndex = 0;
  let lastFocusedElement = null;

  // DOM Helpers
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  // ==========================================================================
  // BILINGUAL LOGIC
  // ==========================================================================
  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'zh-TW';
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-Hant';

    // Toggle text visibility
    $$('.ls-zh').forEach(el => el.hidden = currentLang === 'en');
    $$('.ls-en').forEach(el => el.hidden = currentLang !== 'en');

    // Update buttons state
    $$('[data-lang]').forEach(btn => {
      const isCurrent = btn.dataset.lang === currentLang;
      btn.classList.toggle('active', isCurrent);
      btn.setAttribute('aria-pressed', String(isCurrent));
    });

    // Refresh active zone details
    renderZoneDetails();

    // Update lightbox caption if open
    if (!$('#ls-lightbox').hidden) {
      renderLightboxImage();
    }
  }

  // ==========================================================================
  // SPATIAL TOUR EXPLORER
  // ==========================================================================
  function renderZoneDetails() {
    const zone = ZONES[activeZoneIndex];
    if (!zone) return;

    // Update texts
    $('#ls-zone-id').textContent = `ZONE ${zone.num} / 05 — ${zone.code}`;
    $('#ls-zone-area').textContent = `${zone.area} m²`;

    const titleEl = $('#ls-zone-title');
    const subEl = $('#ls-zone-sub');
    const descEl = $('#ls-zone-desc');
    const matEl = $('#ls-zone-mat');
    const lightEl = $('#ls-zone-light');

    if (currentLang === 'en') {
      titleEl.textContent = zone.enTitle;
      subEl.textContent = zone.enSub;
      descEl.textContent = zone.enDesc;
      matEl.textContent = zone.materialEn;
      lightEl.textContent = zone.lightEn;
    } else {
      titleEl.textContent = zone.zhTitle;
      subEl.textContent = zone.zhSub;
      descEl.textContent = zone.zhDesc;
      matEl.textContent = zone.materialZh;
      lightEl.textContent = zone.lightZh;
    }

    // Update Visual
    const imgEl = $('#ls-zone-img');
    imgEl.src = zone.shotThumb;
    imgEl.alt = currentLang === 'en' ? zone.enTitle : zone.zhTitle;

    // Update Active Button
    $$('.ls-zone-btn').forEach((btn, idx) => {
      const isSelected = idx === activeZoneIndex;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });
  }

  function initSpatialExplorer() {
    const selectorBar = $('#ls-zone-selector');
    if (!selectorBar) return;

    selectorBar.replaceChildren();

    ZONES.forEach((zone, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ls-zone-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-pressed', String(idx === 0));
      btn.innerHTML = `<span>${zone.num} ${zone.code}</span><span class="badge">${zone.area} m²</span>`;
      btn.addEventListener('click', () => {
        activeZoneIndex = idx;
        renderZoneDetails();
      });
      selectorBar.appendChild(btn);
    });

    renderZoneDetails();
  }

  // ==========================================================================
  // 16 PLATES GRID
  // ==========================================================================
  function initPlatesGrid() {
    const grid = $('#ls-plates-grid');
    if (!grid) return;

    grid.replaceChildren();

    SHOTS.forEach((shot, idx) => {
      const numStr = String(shot.num).padStart(2, '0');

      const figure = document.createElement('figure');
      figure.className = 'ls-plate-figure';

      // Interactive image trigger
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ls-plate-btn';
      btn.setAttribute('aria-label', `開啟 SHOT ${numStr} 原圖檢視（2560 × 1440）`);

      const img = document.createElement('img');
      img.src = `assets/mockups/${shot.jpg}`;
      img.alt = `SHOT ${numStr}: ${shot.zh}`;
      img.loading = idx < 2 ? 'eager' : 'lazy';
      img.setAttribute('width', '2560');
      img.setAttribute('height', '1440');

      const zoomBadge = document.createElement('span');
      zoomBadge.className = 'ls-plate-badge-zoom';
      zoomBadge.textContent = 'VIEW ORIGINAL 2560 × 1440 ↗';

      btn.appendChild(img);
      btn.appendChild(zoomBadge);

      btn.addEventListener('click', () => {
        openLightbox(idx, btn);
      });

      // Caption
      const figcap = document.createElement('figcaption');
      figcap.className = 'ls-plate-caption';

      const info = document.createElement('div');
      info.className = 'ls-plate-info';

      const numSpan = document.createElement('span');
      numSpan.className = 'ls-plate-num';
      numSpan.textContent = `SHOT ${numStr} / 16`;

      const titleSpan = document.createElement('strong');
      titleSpan.className = 'ls-plate-title';
      titleSpan.innerHTML = `<span class="ls-zh">${shot.zh}</span><span class="ls-en" hidden>${shot.en}</span>`;

      const subSpan = document.createElement('span');
      subSpan.className = 'ls-plate-sub';
      subSpan.innerHTML = `<span class="ls-zh">${shot.subZh}</span><span class="ls-en" hidden>${shot.subEn}</span>`;

      info.appendChild(numSpan);
      info.appendChild(titleSpan);
      info.appendChild(subSpan);

      const actionSpan = document.createElement('span');
      actionSpan.className = 'ls-plate-view-link';
      actionSpan.textContent = '2560×1440 ↗';

      figcap.appendChild(info);
      figcap.appendChild(actionSpan);

      figure.appendChild(btn);
      figure.appendChild(figcap);

      grid.appendChild(figure);
    });
  }

  // ==========================================================================
  // FULLSCREEN LIGHTBOX (Accessible Dialog, 2560x1440 Master PNG)
  // ==========================================================================
  const lightbox = $('#ls-lightbox');
  const lbImg = $('#ls-lb-img');
  const lbCaption = $('#ls-lb-caption');
  const lbCloseBtn = $('#ls-lb-close');
  const lbPrevBtn = $('#ls-lb-prev');
  const lbNextBtn = $('#ls-lb-next');

  function openLightbox(index, triggerElement) {
    lastFocusedElement = triggerElement;
    activeLightboxIndex = (index + SHOTS.length) % SHOTS.length;
    renderLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbCloseBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function renderLightboxImage() {
    const shot = SHOTS[activeLightboxIndex];
    if (!shot) return;

    const numStr = String(shot.num).padStart(2, '0');
    lbImg.src = `assets/shots/${shot.png}`;
    lbImg.alt = currentLang === 'en' ? shot.en : shot.zh;

    const title = currentLang === 'en' ? shot.en : shot.zh;
    lbCaption.innerHTML = `<em>SHOT ${numStr} / 16</em> ${title} — 2560 × 1440 px MASTER CANVAS`;
  }

  function initLightbox() {
    if (!lightbox) return;

    lbCloseBtn.addEventListener('click', closeLightbox);

    lbPrevBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex - 1 + SHOTS.length) % SHOTS.length;
      renderLightboxImage();
    });

    lbNextBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex + 1) % SHOTS.length;
      renderLightboxImage();
    });

    // Close on backdrop click
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox || e.target.classList.contains('ls-lightbox-stage')) {
        closeLightbox();
      }
    });

    // Keyboard navigation (Esc, Left, Right, Tab Trap)
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activeLightboxIndex = (activeLightboxIndex - 1 + SHOTS.length) % SHOTS.length;
        renderLightboxImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        activeLightboxIndex = (activeLightboxIndex + 1) % SHOTS.length;
        renderLightboxImage();
      } else if (e.key === 'Tab') {
        const focusable = [lbCloseBtn, lbPrevBtn, lbNextBtn].filter(el => el && el.offsetParent !== null);
        const currentIndex = focusable.indexOf(document.activeElement);

        if (e.shiftKey) {
          if (currentIndex <= 0) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          }
        } else {
          if (currentIndex >= focusable.length - 1) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      }
    });
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    // Language switcher buttons
    $$('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    // Init components
    initSpatialExplorer();
    initPlatesGrid();
    initLightbox();

    // Default language zh-TW
    setLanguage('zh-TW');

    console.log('LINEAR SPACE / FRAME/01 Case Study Initialized (16 Shots, 5 Zones)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
