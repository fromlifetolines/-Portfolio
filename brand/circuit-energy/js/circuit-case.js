/**
 * CIRCUIT ENERGY / PORTFOLIO 09 — CASE STUDY INTERACTIVE LOGIC
 * FLTL × HOWARD HUANG | PHASE A.2 PHOTOGRAPHIC VISUAL LOCK V3
 * Modules: 16-Plate Grid, Fullscreen Lightbox, 3-System Selector, Energy-Flow Simulator, Bilingual Switcher
 */

(() => {
  'use strict';

  // 16 Approved Official Shots Data
  const SHOTS = [
    {
      num: 1,
      slug: 'HERO',
      png: 'SHOT_01_HERO.png',
      jpg: 'shot-01.jpg',
      zh: '全域綠能園區願景',
      en: 'Integrated Renewable Vision',
      subZh: '落日時分的多能互補示範基地全景',
      subEn: 'Sunset eco-energy campus landscape hero',
      noteZh: '暮光下的山水整合能源園區，展示光電、風能與現代綠能建築景觀。',
      noteEn: 'Integrated solar, wind, and sustainable campus architecture at golden hour.'
    },
    {
      num: 2,
      slug: 'BRAND_CONCEPT',
      png: 'SHOT_02_BRAND_CONCEPT.png',
      jpg: 'shot-02.jpg',
      zh: '自然共生與循環思維',
      en: 'Brand Philosophy',
      subZh: '森林、海岸與動態能源流向的品牌哲學',
      subEn: 'Nature, coastal ecology & dynamic circularity',
      noteZh: '品牌以「流動的永續迴路」為核心，連結自然生態與清潔能源轉型。',
      noteEn: 'Brand concept grounded in continuous circularity and ecological stewardship.'
    },
    {
      num: 3,
      slug: 'SYSTEM_OVERVIEW',
      png: 'SHOT_03_SYSTEM_OVERVIEW.png',
      jpg: 'shot-03.jpg',
      zh: '五大多能互補系統軸測全景',
      en: 'Energy Ecosystem',
      subZh: '光、風、儲、智、網五大多能整合軸測圖',
      subEn: 'Axonometric integrated renewable energy campus',
      noteZh: '全基地整合光伏矩陣、陸域風機、儲能電站、研發中心與智慧調度中樞。',
      noteEn: 'Axonometric campus overview illustrating 5 unified clean energy subsystems.'
    },
    {
      num: 4,
      slug: 'SITE_AND_INFRASTRUCTURE',
      png: 'SHOT_04_SITE_AND_INFRASTRUCTURE.png',
      jpg: 'shot-04.jpg',
      zh: '山水地貌與基礎建設抵達',
      en: 'Site & Infrastructure',
      subZh: '融入湖光山色的低碳建築抵達立面',
      subEn: 'Architectural arrival integrated into terrain',
      noteZh: '順應地形地貌的流線型建築設計，以低環境衝擊手法構築迎賓大道。',
      noteEn: 'Low-impact architectural gateway harmonizing with mountains and reservoir shoreline.'
    },
    {
      num: 5,
      slug: 'EXPERIENCE_CENTER',
      png: 'SHOT_05_EXPERIENCE_CENTER.png',
      jpg: 'shot-05.jpg',
      zh: '溫潤木質能源沉浸體驗中心',
      en: 'Experience Center',
      subZh: '永續木構與互動展演交融的公眾教育場域',
      subEn: 'Warm timber immersive public exhibition pavilion',
      noteZh: '採用在地永續木材結構，展示微電網沙盤與沉浸式多媒體能源科普體驗。',
      noteEn: 'Mass timber pavilion featuring interactive kinetic models and clean energy exhibitions.'
    },
    {
      num: 6,
      slug: 'VISUAL_IDENTITY',
      png: 'SHOT_06_VISUAL_IDENTITY.png',
      jpg: 'shot-06.jpg',
      zh: 'CIRCUIT ENERGY 品牌識別規範與手冊',
      en: 'Visual Identity',
      subZh: '標誌幾何、編輯排版、標準字與實體周邊應用',
      subEn: 'Brand materials board, editorial guidelines & stationery',
      noteZh: '深邃墨綠與活力電光綠色彩系統，奠定科技與生態並重的品牌調性。',
      noteEn: 'Comprehensive corporate visual guidelines spanning typography, color tokens, and stationery.'
    },
    {
      num: 7,
      slug: 'DATA_AND_MONITORING',
      png: 'SHOT_07_DATA_AND_MONITORING.png',
      jpg: 'shot-07.jpg',
      zh: '暗色系電網監控戰情中心介面概念',
      en: 'Data & Monitoring (mockup)',
      subZh: '全島能源拓撲與實時調度介面視覺概念（範例示意圖）',
      subEn: 'Dark-mode grid monitoring dashboard concept (illustrative mockup)',
      noteZh: '⚠️ 靜態模擬介面：圖中 328.5 MW 為展示用示範數據，非實時運作系統；MW 為功率單位非發電度數 (MWh)，數值未經實測或審計。',
      noteEn: '⚠️ Static simulated UI mockup: 328.5 MW is an illustrative power capacity figure, NOT a live operating system or cumulative MWh; metrics are not measured or audited.'
    },
    {
      num: 8,
      slug: 'ENERGY_SOLUTIONS',
      png: 'SHOT_08_ENERGY_SOLUTIONS.png',
      jpg: 'shot-08.jpg',
      zh: '貨櫃式儲能系統與風光互補站點',
      en: 'Energy Solutions',
      subZh: '模組化液冷電池儲能櫃與落日發電場',
      subEn: 'Modular battery energy storage & renewable hybrid site',
      noteZh: '標準化模組儲能櫃配置於發電單元旁，平抑再生能源間歇性波動。',
      noteEn: 'Industrial-grade containerized BESS mitigating intermittency alongside generation arrays.'
    },
    {
      num: 9,
      slug: 'APPLICATION_SCENARIOS',
      png: 'SHOT_09_APPLICATION_SCENARIOS.png',
      jpg: 'shot-09.jpg',
      zh: '四大多元能源應用情境',
      en: 'Application Scenarios',
      subZh: '家庭住宅、商業園區、智慧工業與社區微電網',
      subEn: 'Residential, commercial, industrial & community microgrids',
      noteZh: '全場景清潔電力解決方案，支援自發自用、削峰填谷與電網韌性支援。',
      noteEn: 'Four deployment archetypes demonstrating comprehensive decarbonization coverage.'
    },
    {
      num: 10,
      slug: 'PRODUCT_DETAIL',
      png: 'SHOT_10_PRODUCT_DETAIL.png',
      jpg: 'shot-10.jpg',
      zh: '高效雙面太陽能板爆炸分解圖概念',
      en: 'PV Module Concept (not certified spec)',
      subZh: '抗反射鍍膜、N 型晶矽電池與封裝結構設計概念',
      subEn: 'Exploded PV module layer construction concept (schematic)',
      noteZh: '⚠️ 設計概念：僅為工業美學層級分解示意，非製造商工程認證或材料清單。',
      noteEn: '⚠️ Design concept: Schematic exploded layer visualization; not a certified engineering BOM.'
    },
    {
      num: 11,
      slug: 'HUMAN_AND_COMMUNITY',
      png: 'SHOT_11_HUMAN_AND_COMMUNITY.png',
      jpg: 'shot-11.jpg',
      zh: '社群共好與綠能科普觀景台',
      en: 'Human & Community',
      subZh: '民眾與學生參訪綠能園區，俯瞰人與能源的永續共榮',
      subEn: 'Community education & visitors at scenic energy overlook',
      noteZh: '開放式公眾步道與觀景平台，讓永續基礎建設走進大眾日常。',
      noteEn: 'Public scenic overlook fostering community engagement and renewable energy literacy.'
    },
    {
      num: 12,
      slug: 'SUSTAINABILITY_IMPACT',
      png: 'SHOT_12_SUSTAINABILITY_IMPACT.png',
      jpg: 'shot-012.jpg', // will normalize to shot-12.jpg below
      jpg: 'shot-12.jpg',
      zh: '永續環境影響力視覺與示意指標',
      en: 'Sustainability Impact (illustration only)',
      subZh: '海岸地貌與減碳效益圓環設計（概念圖版）',
      subEn: 'Coastal impact visuals & illustrative metric rings',
      noteZh: '⚠️ 示意指標：圖面數值（如 125K t、320 GWh）為視覺提案示意，非經第三方審定之碳效益。',
      noteEn: '⚠️ Illustrative metrics: Figures (125K t, 320 GWh) are fictional concept numbers, not audited ESG results.'
    },
    {
      num: 13,
      slug: 'DIGITAL_EXPERIENCE',
      png: 'SHOT_13_DIGITAL_EXPERIENCE.png',
      jpg: 'shot-13.jpg',
      zh: '跨平台自適應企業形象官網',
      en: 'Digital Experience',
      subZh: '桌機與筆記型電腦高解析響應式品牌網站展示',
      subEn: 'Responsive corporate website mockup across large viewports',
      noteZh: '沉浸式暗色設計語言與清晰資訊架構，傳遞綠能科技的高端專業度。',
      noteEn: 'Immersive dark-mode corporate digital identity highlighting solutions and research.'
    },
    {
      num: 14,
      slug: 'MOBILE_EXPERIENCE',
      png: 'SHOT_14_MOBILE_EXPERIENCE.png',
      jpg: 'shot-14.jpg',
      zh: '掌中暗調微電網監控行動 App',
      en: 'Mobile Monitoring Concept',
      subZh: '隨時掌握系統狀態、電量分配與儲能排程的行動介面概念',
      subEn: 'Handheld dark-mode energy monitoring smartphone app mockup',
      noteZh: '⚠️ 靜態模擬介面：圖中行動介面為展示用靜態示意原型，非實時運作系統；數據皆為示意數值，未經實測或審計。',
      noteEn: '⚠️ Static simulated UI mockup: Depicted mobile dashboard is an illustrative prototype, NOT a live operating system; figures are not measured or audited.'
    },
    {
      num: 15,
      slug: 'PROJECT_PROCESS',
      png: 'SHOT_15_PROJECT_PROCESS.png',
      jpg: 'shot-15.jpg',
      zh: '自調研至影響力的五階設計歷程概念',
      en: 'Project Process (conceptual)',
      subZh: '調研 > 策略 > 設計 > 部署 > 影響力五階段思維板',
      subEn: 'Research > Strategy > Design > Deployment > Impact journey board',
      noteZh: '⚠️ 概念歷程：展示自主專案之思考框架與設計演進，非工程統包承攬或商業客戶實績。',
      noteEn: '⚠️ Conceptual journey: Documents design exploration methodology; not an actual client contract.'
    },
    {
      num: 16,
      slug: 'FINALE',
      png: 'SHOT_16_FINALE.png',
      jpg: 'shot-16.jpg',
      zh: '更純淨的地球，更明亮的明天',
      en: 'Finale',
      subZh: '落日金光下的風光同幅壯闊全景，銘刻永續承諾',
      subEn: 'Cinematic sunset solar/wind campus finale',
      noteZh: '以壯麗的自然景觀與純淨能源設施收尾，傳達人、科技與大地和諧共存的願景。',
      noteEn: 'Cinematic crescendo encapsulating the overarching vision of a cleaner planet and brighter tomorrow.'
    }
  ];

  // 3-System Selector Data (三大多能互補系統)
  const SYSTEMS = [
    {
      id: 'solar',
      num: '01 / SYSTEM',
      nameZh: '智慧光伏矩陣 (Solar PV)',
      nameEn: 'Smart Photovoltaic Array (Solar PV)',
      metric: '12 MWp (DEMO)',
      metricLabelZh: '示範情境裝置容量',
      metricLabelEn: 'Illustrative Peak Capacity',
      descZh: '採用雙面發電 N 型單晶矽模組，搭配單軸追日追蹤支架系統，最大化清晨與黃昏散射光吸收效率。全區具備微型逆變器群組與智能遮蔭旁路演算法，在複雜天候下維持發電曲線平滑。',
      descEn: 'Bifacial N-type monocrystalline modules paired with single-axis smart tracking racks maximize irradiance capture at low sun angles. Granular microinverter topologies ensure seamless yield optimization across variable cloud conditions.',
      pointsZh: [
        '雙面採光增益：利用地面反射光提升 8%–15% 額外發電量',
        '自適應智慧追日：天文演算法結合雲層照度感應器即時校正角度',
        '防塵抗鹽霧耐候塗層：專為沿海高鹽霧氣候研製之保護塗層'
      ],
      pointsEn: [
        'Bifacial yield bonus: 8%–15% additional energy harvest via albedo reflectance',
        'Adaptive astronomical tracking: Calibrated dynamically against localized cloud cover',
        'Anti-soiling & marine-grade coating: Engineered for high humidity and coastal salt-spray'
      ],
      image: 'assets/mockups/shot-08.jpg'
    },
    {
      id: 'wind',
      num: '02 / SYSTEM',
      nameZh: '離岸與陸域風能 (Wind Generation)',
      nameEn: 'Coastal & Terrestrial Wind Power',
      metric: '8 MW (DEMO)',
      metricLabelZh: '示範情境裝置容量',
      metricLabelEn: 'Illustrative Rated Capacity',
      descZh: '配置直驅式永磁同步低噪聲風力渦輪機組，切入風速僅需 2.5 m/s，能有效捕捉季風帶陣風。機組配備雷達主動偏航與鳥類識別降速系統，落實生態友好承諾。',
      descEn: 'Direct-drive permanent magnet synchronous turbines feature ultra-low cut-in wind speed (2.5 m/s) to capture offshore gusts effectively. Machine-vision bird protection protocols adjust rotor speeds to minimize ecological impact.',
      pointsZh: [
        '低切入風速設計：2.5 m/s 即可啟動發電，拓寬全年利用時數',
        '全密封驅動機構：減少機械磨耗與齒輪油依賴，維護週期延長至 5 年',
        '生態雷達避障：光學與聲學偵測，鳥群接近時自動切入微速運轉'
      ],
      pointsEn: [
        'Low cut-in speed: Generates power from 2.5 m/s breezes, expanding annual operating hours',
        'Direct-drive sealed nacelle: Eliminates mechanical gearboxes, extending overhaul cycles to 5 years',
        'Eco-radar protection: Optical and acoustic sensing adjusts blade speeds during bird migration'
      ],
      image: 'assets/mockups/shot-01.jpg'
    },
    {
      id: 'storage',
      num: '03 / SYSTEM',
      nameZh: '液冷儲能微電網 (BESS)',
      nameEn: 'Liquid-Cooled Battery Storage (BESS)',
      metric: '20 MWh (DEMO)',
      metricLabelZh: '示範情境儲能容量',
      metricLabelEn: 'Illustrative Storage Capacity',
      descZh: '高安全磷酸鐵鋰 (LFP) 模組化儲能貨櫃，搭載微通道均溫液冷架構，電芯溫差控制在 ±2°C 內。支援毫秒級一次調頻、黑啟動與峰谷電量時移，建構園區堅韌安全後盾。',
      descEn: 'High-safety lithium iron phosphate (LFP) modular containers incorporate microchannel liquid cooling, keeping cell temperature variance within ±2°C. Delivers sub-second primary frequency response, black-start capabilities, and peak shifting.',
      pointsZh: [
        '智慧精密液冷：各電池包溫差低於 2°C，大幅延長系統循環壽命至 6,000 次',
        '毫秒級響應速度：20 毫秒內迅速切換充放電，平抑電網突波衝擊',
        '四重獨立安全防護：電芯級氣體偵測、全氟己酮自動滅火與防爆防焰外殼'
      ],
      pointsEn: [
        'Precision liquid cooling: Sub-2°C thermal delta extends lifecycle beyond 6,000 cycles',
        'Sub-second response: Inverts within 20 milliseconds to smooth out transient grid disturbances',
        'Quadruple safety redundancy: Pack-level gas detection, FK-5-1-12 suppression & blast-rated enclosure'
      ],
      image: 'assets/mockups/shot-08.jpg'
    }
  ];

  // Illustrative Energy-Flow Simulation Scenarios
  // Example A: Supply 8.4 + 4.8 = 13.2 MWh | Allocation 3.4 + 2.6 + 7.2 = 13.2 MWh
  // Example B: Supply 4.2 + 9.6 = 13.8 MWh | Allocation 4.1 + 3.1 + 6.6 = 13.8 MWh
  const SIM_SCENARIOS = {
    A: {
      nameZh: '情境 A：日間光伏尖峰調度 (Daytime Solar Peak)',
      nameEn: 'Scenario A: Daytime Solar Peak Dispatch',
      descZh: '正午光照強烈，光伏輸出充沛。系統優先滿足園區與周邊產業負載，多餘電力注入儲能電站蓄能，並以穩定功率反哺主電網。',
      descEn: 'Intense midday sunlight creates high solar yields. The microgrid powers industrial loads first, directs surplus power to charge storage, and exports excess green energy to the transmission grid.',
      supply: {
        solar: 8.4,
        wind: 4.8,
        total: 13.2,
        unit: 'MWh'
      },
      allocation: {
        grid: 3.4,
        storage: 2.6,
        demand: 7.2,
        total: 13.2,
        unit: 'MWh'
      },
      equationZh: '發電供給 8.4 (光伏) + 4.8 (風能) = 13.2 MWh ＝ 負載分配 3.4 (電網) + 2.6 (儲能) + 7.2 (社區工業) = 13.2 MWh',
      equationEn: 'Supply 8.4 (Solar) + 4.8 (Wind) = 13.2 MWh ＝ Demand 3.4 (Grid) + 2.6 (Storage) + 7.2 (Industry) = 13.2 MWh'
    },
    B: {
      nameZh: '情境 B：傍晚至夜間跨時段累積示範 (Dusk-to-Night Interval)',
      nameEn: 'Scenario B: Illustrative Dusk-to-Night Cumulative Interval',
      descZh: '本情境為傍晚至夜間跨時段累積發電示範：傍晚時段保留 4.2 MWh 光伏餘裕，入夜後風力發電加速至 9.6 MWh 成為主力，搭配儲能電網智慧微調，完全滿足夜間連續工業與社區負載。',
      descEn: 'This scenario illustrates a cumulative dusk-to-night reporting interval: 4.2 MWh dusk solar residual combined with 9.6 MWh nighttime coastal wind generation, dynamically balanced with storage buffers to satisfy continuous nocturnal industrial and municipal demand.',
      supply: {
        solar: 4.2, // residual / early dusk solar
        wind: 9.6,
        total: 13.8,
        unit: 'MWh'
      },
      allocation: {
        grid: 4.1,
        storage: 3.1, // charging buffer
        demand: 6.6,
        total: 13.8,
        unit: 'MWh'
      },
      equationZh: '發電供給 4.2 (跨時段光伏) + 9.6 (風能) = 13.8 MWh ＝ 負載分配 4.1 (電網) + 3.1 (儲能緩衝) + 6.6 (夜間負載) = 13.8 MWh',
      equationEn: 'Supply 4.2 (Dusk PV) + 9.6 (Wind) = 13.8 MWh ＝ Demand 4.1 (Grid) + 3.1 (Storage Buffer) + 6.6 (Night Load) = 13.8 MWh'
    }
  };

  // State
  let currentLang = 'zh-TW';
  let activeSystemIndex = 0;
  let activeScenarioKey = 'A';
  let activeLightboxIndex = 0;
  let lastFocusedElement = null;

  // DOM Elements
  const platesGrid = document.getElementById('ce-plates-grid');
  const langButtons = document.querySelectorAll('[data-lang]');

  // 3-System Elements
  const sysTabsContainer = document.getElementById('ce-sys-tabs');
  const sysCardEl = document.getElementById('ce-sys-card');

  // Energy Flow Elements
  const flowTabsContainer = document.getElementById('ce-flow-tabs');
  const flowEquationEl = document.getElementById('ce-flow-equation');
  const flowDescEl = document.getElementById('ce-flow-desc');
  const flowSupplyBar = document.getElementById('ce-flow-supply-bar');
  const flowAllocBar = document.getElementById('ce-flow-alloc-bar');
  const flowSupplyVal = document.getElementById('ce-flow-supply-val');
  const flowAllocVal = document.getElementById('ce-flow-alloc-val');

  // Lightbox Elements
  const lightbox = document.getElementById('ce-lightbox');
  const lbImg = document.getElementById('ce-lb-img');
  const lbCaption = document.getElementById('ce-lb-caption');
  const lbCloseBtn = document.getElementById('ce-lb-close');
  const lbPrevBtn = document.getElementById('ce-lb-prev');
  const lbNextBtn = document.getElementById('ce-lb-next');

  // ==========================================================================
  // 1. Render 16 Plates Grid
  // ==========================================================================
  function renderPlatesGrid() {
    if (!platesGrid) return;
    platesGrid.innerHTML = '';

    SHOTS.forEach((shot, index) => {
      const card = document.createElement('article');
      card.className = 'ce-plate-card';
      card.setAttribute('data-shot-index', index);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `檢視 SHOT ${String(shot.num).padStart(2, '0')}: ${shot.zh} / ${shot.en}`);

      const numStr = String(shot.num).padStart(2, '0');

      card.innerHTML = `
        <div class="ce-plate-media-wrap">
          <div class="ce-16x9-box">
            <img src="assets/mockups/${shot.jpg}?v=ce09-photo-v3-20261025"
                 alt="SHOT ${numStr} — ${shot.zh} (${shot.en})"
                 width="2560" height="1440"
                 loading="${index < 2 ? 'eager' : 'lazy'}"
                 decoding="async">
          </div>
          <div class="ce-plate-overlay-badge">
            <span class="ce-plate-pill">2560 × 1440 ↗</span>
          </div>
        </div>
        <div class="ce-plate-meta">
          <div class="ce-plate-topline">
            <span class="ce-plate-num">SHOT ${numStr} / 16</span>
            <span class="ce-plate-tag">CANVAS 2560×1440</span>
          </div>
          <h3 class="ce-plate-title">
            <span class="ce-zh">${shot.zh}</span>
            <span class="ce-en" hidden>${shot.en}</span>
          </h3>
          <p class="ce-plate-sub">
            <span class="ce-zh">${shot.subZh}</span>
            <span class="ce-en" hidden>${shot.subEn}</span>
          </p>
          <p class="ce-plate-desc">
            <span class="ce-zh">${shot.noteZh}</span>
            <span class="ce-en" hidden>${shot.noteEn}</span>
          </p>
        </div>
      `;

      // Event listeners
      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      platesGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // 2. Bilingual Switcher Logic
  // ==========================================================================
  function setLanguage(lang) {
    currentLang = lang;
    const isEn = lang === 'en';

    document.documentElement.lang = isEn ? 'en' : 'zh-Hant';

    // Update buttons
    langButtons.forEach(btn => {
      const match = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });

    // Toggle .ce-zh and .ce-en visibility across the document
    document.querySelectorAll('.ce-zh').forEach(el => {
      el.hidden = isEn;
    });
    document.querySelectorAll('.ce-en').forEach(el => {
      el.hidden = !isEn;
    });

    // Update dynamic interactive components
    renderSystemDetail();
    renderEnergyFlow();
    updateLightboxCaption();
  }

  // ==========================================================================
  // 3. Three-System Selector Logic
  // ==========================================================================
  function initSystemSelector() {
    if (!sysTabsContainer) return;
    sysTabsContainer.innerHTML = '';

    SYSTEMS.forEach((sys, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ce-sys-tab ${idx === activeSystemIndex ? 'active' : ''}`;
      btn.setAttribute('aria-pressed', idx === activeSystemIndex ? 'true' : 'false');
      btn.innerHTML = `
        <span class="ce-tab-index">${sys.num}</span>
        <span class="ce-tab-name ce-zh">${sys.nameZh.split(' ')[0]}</span>
        <span class="ce-tab-name ce-en" hidden>${sys.nameEn.split(' ')[0]}</span>
      `;
      btn.addEventListener('click', () => {
        activeSystemIndex = idx;
        document.querySelectorAll('.ce-sys-tab').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
          b.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
        });
        renderSystemDetail();
      });
      sysTabsContainer.appendChild(btn);
    });

    renderSystemDetail();
  }

  function renderSystemDetail() {
    if (!sysCardEl) return;
    const sys = SYSTEMS[activeSystemIndex];
    const isEn = currentLang === 'en';

    sysCardEl.innerHTML = `
      <div class="ce-sys-grid">
        <div class="ce-sys-img-wrap">
          <div class="ce-16x9-box">
            <img src="${sys.image}?v=ce09-photo-v3-20261025"
                 alt="${isEn ? sys.nameEn : sys.nameZh}"
                 width="2560" height="1440" loading="lazy">
          </div>
          <div class="ce-sys-badge">
            <span class="ce-badge-accent">${sys.metric}</span>
            <span class="ce-badge-label">${isEn ? sys.metricLabelEn : sys.metricLabelZh}</span>
          </div>
        </div>
        <div class="ce-sys-body">
          <div class="ce-sys-meta-top">
            <span class="ce-sys-tag">${sys.num}</span>
            <span class="ce-sys-pill">INDEPENDENT DEMO SCENARIO</span>
          </div>
          <h3 class="ce-sys-heading">${isEn ? sys.nameEn : sys.nameZh}</h3>
          <p class="ce-sys-desc">${isEn ? sys.descEn : sys.descZh}</p>
          <div class="ce-sys-points-title">${isEn ? 'CORE ENGINEERING ATTRIBUTES' : '核心架構與技術特點'}</div>
          <ul class="ce-sys-points">
            ${(isEn ? sys.pointsEn : sys.pointsZh).map(pt => `<li>${pt}</li>`).join('')}
          </ul>
          <div class="ce-sys-disclaimer">
            ${isEn
              ? '* All system capacities (12 MWp, 8 MW, 20 MWh) are separate demo units for this scenario; not cumulative with network power totals.'
              : '* 系統數值（12 MWp、8 MW、20 MWh）屬示範情境專用數據，不可直接相加或混同全網功率總和。'}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 4. Energy-Flow Interactive Simulator
  // ==========================================================================
  function initEnergyFlow() {
    if (!flowTabsContainer) return;
    flowTabsContainer.innerHTML = '';

    ['A', 'B'].forEach((key) => {
      const sc = SIM_SCENARIOS[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ce-flow-tab ${key === activeScenarioKey ? 'active' : ''}`;
      btn.setAttribute('aria-pressed', key === activeScenarioKey ? 'true' : 'false');
      btn.innerHTML = `
        <span class="ce-tab-key">SCENARIO ${key}</span>
        <span class="ce-zh">${key === 'A' ? '日間光伏尖峰' : '傍晚至夜間跨時段累積示範'}</span>
        <span class="ce-en" hidden>${key === 'A' ? 'Daytime Solar Peak' : 'Illustrative Dusk-to-Night Interval'}</span>
      `;
      btn.addEventListener('click', () => {
        activeScenarioKey = key;
        document.querySelectorAll('.ce-flow-tab').forEach(b => {
          const match = b === btn;
          b.classList.toggle('active', match);
          b.setAttribute('aria-pressed', match ? 'true' : 'false');
        });
        renderEnergyFlow();
      });
      flowTabsContainer.appendChild(btn);
    });

    renderEnergyFlow();
  }

  function renderEnergyFlow() {
    const sc = SIM_SCENARIOS[activeScenarioKey];
    const isEn = currentLang === 'en';

    if (flowEquationEl) {
      flowEquationEl.textContent = isEn ? sc.equationEn : sc.equationZh;
    }
    if (flowDescEl) {
      flowDescEl.textContent = isEn ? sc.descEn : sc.descZh;
    }

    if (flowSupplyVal) {
      flowSupplyVal.innerHTML = isEn
        ? `Solar: <strong>${sc.supply.solar}</strong> MWh + Wind: <strong>${sc.supply.wind}</strong> MWh = <strong>${sc.supply.total}</strong> MWh`
        : `光伏發電：<strong>${sc.supply.solar}</strong> MWh ＋ 風能發電：<strong>${sc.supply.wind}</strong> MWh ＝ 供給總量：<strong>${sc.supply.total}</strong> MWh`;
    }

    if (flowAllocVal) {
      flowAllocVal.innerHTML = isEn
        ? `Grid: <strong>${sc.allocation.grid}</strong> MWh + Storage: <strong>${sc.allocation.storage}</strong> MWh + Industry: <strong>${sc.allocation.demand}</strong> MWh = <strong>${sc.allocation.total}</strong> MWh`
        : `電網外送：<strong>${sc.allocation.grid}</strong> MWh ＋ 儲能存蓄：<strong>${sc.allocation.storage}</strong> MWh ＋ 負載消耗：<strong>${sc.allocation.demand}</strong> MWh ＝ 分配總量：<strong>${sc.allocation.total}</strong> MWh`;
    }

    // Supply percentages
    if (flowSupplyBar) {
      const solarPct = (sc.supply.solar / sc.supply.total) * 100;
      const windPct = (sc.supply.wind / sc.supply.total) * 100;
      flowSupplyBar.innerHTML = `
        <div class="ce-bar-seg solar" style="width: ${solarPct}%;" title="Solar: ${sc.supply.solar} MWh (${solarPct.toFixed(1)}%)">
          <span>${isEn ? 'Solar' : '光伏'} ${sc.supply.solar}</span>
        </div>
        <div class="ce-bar-seg wind" style="width: ${windPct}%;" title="Wind: ${sc.supply.wind} MWh (${windPct.toFixed(1)}%)">
          <span>${isEn ? 'Wind' : '風能'} ${sc.supply.wind}</span>
        </div>
      `;
    }

    // Allocation percentages
    if (flowAllocBar) {
      const gridPct = (sc.allocation.grid / sc.allocation.total) * 100;
      const storagePct = (sc.allocation.storage / sc.allocation.total) * 100;
      const demandPct = (sc.allocation.demand / sc.allocation.total) * 100;
      flowAllocBar.innerHTML = `
        <div class="ce-bar-seg grid" style="width: ${gridPct}%;" title="Grid: ${sc.allocation.grid} MWh (${gridPct.toFixed(1)}%)">
          <span>${isEn ? 'Grid' : '電網'} ${sc.allocation.grid}</span>
        </div>
        <div class="ce-bar-seg storage" style="width: ${storagePct}%;" title="Storage: ${sc.allocation.storage} MWh (${storagePct.toFixed(1)}%)">
          <span>${isEn ? 'Storage' : '儲能'} ${sc.allocation.storage}</span>
        </div>
        <div class="ce-bar-seg demand" style="width: ${demandPct}%;" title="Demand: ${sc.allocation.demand} MWh (${demandPct.toFixed(1)}%)">
          <span>${isEn ? 'Demand' : '負載'} ${sc.allocation.demand}</span>
        </div>
      `;
    }
  }

  // ==========================================================================
  // 5. Accessible Fullscreen Lightbox (Master PNG 2560x1440)
  // ==========================================================================
  function openLightbox(index) {
    if (!lightbox || !lbImg) return;
    lastFocusedElement = document.activeElement;
    activeLightboxIndex = (index + SHOTS.length) % SHOTS.length;

    const shot = SHOTS[activeLightboxIndex];
    lbImg.src = `assets/shots/${shot.png}?v=ce09-photo-v3-20261025`;
    lbImg.alt = `SHOT ${String(shot.num).padStart(2, '0')}: ${shot.zh} / ${shot.en}`;

    updateLightboxCaption();

    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (lbCloseBtn) lbCloseBtn.focus();
  }

  function updateLightboxCaption() {
    if (!lbCaption) return;
    const shot = SHOTS[activeLightboxIndex];
    const isEn = currentLang === 'en';
    const numStr = String(shot.num).padStart(2, '0');

    lbCaption.innerHTML = `
      <div class="ce-lb-header">
        <span class="ce-lb-tag">SHOT ${numStr} / 16</span>
        <span class="ce-lb-res">MASTER PNG 2560 × 1440 CANVAS</span>
      </div>
      <h4 class="ce-lb-title">${isEn ? shot.en : shot.zh}</h4>
      <p class="ce-lb-sub">${isEn ? shot.subEn : shot.subZh}</p>
      <p class="ce-lb-note">${isEn ? shot.noteEn : shot.noteZh}</p>
    `;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    if (lbImg) lbImg.src = '';
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function prevLightbox() {
    openLightbox(activeLightboxIndex - 1);
  }

  function nextLightbox() {
    openLightbox(activeLightboxIndex + 1);
  }

  function initLightboxListeners() {
    if (!lightbox) return;

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', prevLightbox);
    if (lbNextBtn) lbNextBtn.addEventListener('click', nextLightbox);

    // Click outside image closes lightbox
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('ce-lightbox-stage')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextLightbox();
      }
    });
  }

  // ==========================================================================
  // 6. Initialization
  // ==========================================================================
  function init() {
    renderPlatesGrid();
    initSystemSelector();
    initEnergyFlow();
    initLightboxListeners();

    // Language buttons
    langButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang) setLanguage(lang);
      });
    });

    // Default language
    setLanguage('zh-TW');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
