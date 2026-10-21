/**
 * FLTL × HOWARD — PORTFOLIO 06: NORTHLINE TRADE INTERACTIVE ENGINE V1.0
 * Fully functional client-side B2B demonstration engine:
 *  - Persistent Bilingual Switcher (ZH / EN)
 *  - 1672 × 941 Master Lightbox with Keyboard Navigation
 *  - Part Number Autocomplete & Spec Search Engine
 *  - Multi-facet Product Catalog Filter
 *  - 3-Way Technical Spec Comparator
 *  - MOQ & Tiered Pricing Calculator (25 error, 40 -> 4800, 100 -> 10800)
 *  - RFQ Builder & Dual-Role Approval Simulator (Buyer & Manager)
 *  - Accessible Focus Management & A11y Standards
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'howard-portfolio-lang';
  const DEFAULT_LANG = 'zh';

  // State
  let currentLang = DEFAULT_LANG;
  let galleryItems = [];
  let currentImageIndex = -1;
  let lastActiveElement = null;

  // Mock Database for B2B Industrial Parts
  const PRODUCT_DATABASE = [
    {
      id: 'NL-BRG-6205',
      nameZh: '2RS 橡膠密封深溝球軸承 6205',
      nameEn: '2RS Rubber Sealed Ball Bearing 6205',
      category: 'bearing',
      categoryZh: '滾動軸承',
      categoryEn: 'Bearings',
      material: 'carbon',
      materialZh: '軸承高碳鋼 (GCr15)',
      materialEn: 'High Carbon Chromium Steel',
      dimensions: '25 × 52 × 15 mm',
      cr: '14.0 kN',
      cor: '7.85 kN',
      speed: '12,000 RPM',
      moq: 20,
      step: 10,
      priceTiers: [
        { min: 20, max: 99, price: 120 },
        { min: 100, max: 499, price: 108 },
        { min: 500, max: Infinity, price: 98 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '工業標準深溝球軸承，雙面接觸式橡膠密封 (2RS)，防塵防漏油，適用於電動機、輸送機與精密旋轉機構。',
      descEn: 'Standard deep groove ball bearing with dual contact rubber seals (2RS) for motors, conveyors and machinery.'
    },
    {
      id: 'NL-BRG-6206',
      nameZh: 'ZZ 金屬防塵蓋軸承 6206',
      nameEn: 'ZZ Steel Shielded Ball Bearing 6206',
      category: 'bearing',
      categoryZh: '滾動軸承',
      categoryEn: 'Bearings',
      material: 'carbon',
      materialZh: '軸承高碳鋼 (GCr15)',
      materialEn: 'High Carbon Chromium Steel',
      dimensions: '30 × 62 × 16 mm',
      cr: '19.5 kN',
      cor: '11.3 kN',
      speed: '13,500 RPM',
      moq: 20,
      step: 10,
      priceTiers: [
        { min: 20, max: 99, price: 145 },
        { min: 100, max: 499, price: 130 },
        { min: 500, max: Infinity, price: 118 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '雙面金屬沖壓防塵蓋 (ZZ)，摩擦阻力低，適用於高速傳動與乾淨工業設備環境。',
      descEn: 'Dual pressed steel shields (ZZ) offering low friction and high speed performance.'
    },
    {
      id: 'NL-BRG-6207',
      nameZh: 'OPEN 開放式深溝球軸承 6207',
      nameEn: 'OPEN Deep Groove Ball Bearing 6207',
      category: 'bearing',
      categoryZh: '滾動軸承',
      categoryEn: 'Bearings',
      material: 'carbon',
      materialZh: '軸承高碳鋼 (GCr15)',
      materialEn: 'High Carbon Chromium Steel',
      dimensions: '35 × 72 × 17 mm',
      cr: '25.7 kN',
      cor: '15.3 kN',
      speed: '11,000 RPM',
      moq: 20,
      step: 10,
      priceTiers: [
        { min: 20, max: 99, price: 180 },
        { min: 100, max: 499, price: 162 },
        { min: 500, max: Infinity, price: 148 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '無密封開放式滾珠結構 (OPEN)，外露精密鋼球，利於高流量油浴潤滑與內部檢修。',
      descEn: 'Open deep groove design suitable for oil bath lubrication and visual maintenance.'
    },
    {
      id: 'NL-FST-M10-050',
      nameZh: '8.8級高抗拉六角螺栓 M10×50',
      nameEn: 'Class 8.8 Hex Head Flange Bolt M10×50',
      category: 'fastener',
      categoryZh: '緊固零組件',
      categoryEn: 'Fasteners',
      material: 'stainless',
      materialZh: 'SUS304 不鏽鋼',
      materialEn: '304 Stainless Steel',
      dimensions: 'M10 × 1.5 × 50 mm',
      cr: 'Tensile 800 MPa',
      cor: 'Yield 640 MPa',
      speed: 'N/A',
      moq: 50,
      step: 50,
      priceTiers: [
        { min: 50, max: 199, price: 18 },
        { min: 200, max: 999, price: 15 },
        { min: 1000, max: Infinity, price: 12 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '精密冷鍛製造，耐腐蝕表面鈍化處理，符合 DIN 6921 工業強度規範。',
      descEn: 'Precision cold-forged corrosion resistant flange fastener conforming to DIN 6921.'
    },
    {
      id: 'NL-PNU-VLV-02',
      nameZh: '二位五通氣動電磁閥 G1/4',
      nameEn: '5/2-Way Directional Solenoid Valve G1/4',
      category: 'pneumatics',
      categoryZh: '氣動控制',
      categoryEn: 'Pneumatics',
      material: 'brass',
      materialZh: '硬質陽極氧化鋁合金 / 黃銅閥芯',
      materialEn: 'Anodized Aluminum / Brass Spool',
      dimensions: '128 × 68 × 26 mm',
      cr: 'Flow 950 L/min',
      cor: 'Pressure 0.8 MPa',
      speed: '5 cycles/sec',
      moq: 5,
      step: 5,
      priceTiers: [
        { min: 5, max: 19, price: 1250 },
        { min: 20, max: 49, price: 1120 },
        { min: 50, max: Infinity, price: 980 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '低功耗線圈驅動，快速換向響應時間小於 20ms，具備手動檢測按鈕。',
      descEn: 'Low wattage coil pilot valve with rapid switching response under 20ms.'
    },
    {
      id: 'NL-SEL-NBR-45',
      nameZh: '骨架式旋轉雙唇油封 30×45×8',
      nameEn: 'Rotary Shaft Radial Oil Seal 30×45×8',
      category: 'seals',
      categoryZh: '工業密封',
      categoryEn: 'Seals',
      material: 'nbr',
      materialZh: 'NBR 丁腈橡膠 + 碳鋼骨架',
      materialEn: 'Nitrile Rubber + Steel Garter Spring',
      dimensions: 'ID 30 × OD 45 × W 8 mm',
      cr: 'Temp -30~+120°C',
      cor: 'Speed 12 m/s',
      speed: '7,600 RPM',
      moq: 50,
      step: 10,
      priceTiers: [
        { min: 50, max: 199, price: 32 },
        { min: 200, max: 499, price: 27 },
        { min: 500, max: Infinity, price: 22 }
      ],
      leadTime: '待供應商確認 (Pending)',
      descZh: '雙防塵副唇設計，專門防止潤滑油外洩與外部切削液滲入軸心。',
      descEn: 'Dual-lip rotary shaft seal for lubricant retention and contaminant exclusion.'
    }
  ];

  // RFQ State
  let rfqState = {
    id: 'RFQ-DEMO-001',
    status: 'draft', // 'draft', 'pending', 'approved', 'returned'
    userRole: 'buyer', // 'buyer', 'manager'
    items: [
      {
        sku: 'NL-BRG-6205',
        nameZh: '2RS 橡膠密封深溝球軸承 6205',
        qty: 40,
        unitPrice: 120,
        subtotal: 4800,
        leadTime: '待供應商確認'
      }
    ],
    notes: '2026 Q2 產線自動化機台常規備品更換採購案'
  };

  /**
   * DOM Ready Initialization
   */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initStickyNav();
    initLightbox();
    initPartSearchWidget();
    initCatalogFilterWidget();
    initSpecComparator();
    initPricingCalculatorWidget();
    initRfqApprovalWidget();
  });

  /**
   * 1. Bilingual Engine
   */
  function initLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh' || stored === 'zh-TW') {
        currentLang = stored === 'en' ? 'en' : 'zh';
      } else {
        const navLang = navigator.language || '';
        currentLang = navLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
      }
    } catch (e) {
      currentLang = DEFAULT_LANG;
    }

    setLanguage(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-lang-target');
        if (target) setLanguage(target);
      });
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-lang-target') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang === 'zh' ? 'zh-TW' : 'en');
    } catch (e) {}

    // Title
    if (lang === 'zh') {
      document.title = 'NORTHLINE TRADE — 工業零組件國際貿易與 B2B 採購系統品牌案例 | FLTL × HOWARD';
    } else {
      document.title = 'NORTHLINE TRADE — Industrial Procurement & B2B Trade System Case Study | FLTL × HOWARD';
    }

    // Refresh Lightbox Caption
    if (currentImageIndex >= 0 && galleryItems[currentImageIndex]) {
      updateLightboxCaption(currentImageIndex);
    }
  }

  /**
   * 2. Sticky Nav Elevation
   */
  function initStickyNav() {
    const nav = document.querySelector('.case-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        nav.classList.add('is-elevated');
      } else {
        nav.classList.remove('is-elevated');
      }
    }, { passive: true });
  }

  /**
   * 3. Lightbox Engine (1672 × 941 Master RAW)
   */
  function initLightbox() {
    const images = document.querySelectorAll('.plate-media-wrap img');
    galleryItems = Array.from(images).map((img, idx) => {
      const card = img.closest('.plate-card') || img.closest('.master-figure');
      const num = card ? (card.querySelector('.plate-shot-num')?.textContent || `SHOT ${(idx + 1).toString().padStart(2, '0')}`) : '';
      const title = card ? (card.querySelector('.plate-title-text')?.textContent || '') : '';
      const descZh = card ? (card.querySelector('.plate-desc-text .lang-zh')?.textContent || '') : '';
      const descEn = card ? (card.querySelector('.plate-desc-text .lang-en')?.textContent || '') : '';

      return {
        src: img.getAttribute('data-raw') || img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        number: num.trim(),
        title: title.trim(),
        descZh: descZh.trim(),
        descEn: descEn.trim()
      };
    });

    const mediaWraps = document.querySelectorAll('.plate-media-wrap');
    mediaWraps.forEach((wrap, idx) => {
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-label', `檢視 ${galleryItems[idx]?.number || ''} ${galleryItems[idx]?.title || ''} (1672 × 941 RAW 原圖)`);

      wrap.addEventListener('click', () => openLightbox(idx));
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextLightbox);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-content-area')) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('is-active')) return;
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

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) return;
    lastActiveElement = document.activeElement;
    currentImageIndex = index;

    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const item = galleryItems[index];

    if (!modal || !img || !item) return;

    img.src = item.src;
    img.alt = item.alt;

    updateLightboxCaption(index);

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    currentImageIndex = -1;
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  function prevLightbox() {
    if (currentImageIndex > 0) {
      openLightbox(currentImageIndex - 1);
    } else {
      openLightbox(galleryItems.length - 1);
    }
  }

  function nextLightbox() {
    if (currentImageIndex < galleryItems.length - 1) {
      openLightbox(currentImageIndex + 1);
    } else {
      openLightbox(0);
    }
  }

  function updateLightboxCaption(index) {
    const item = galleryItems[index];
    if (!item) return;

    const shotBadge = document.getElementById('lightbox-shot');
    const titleEl = document.getElementById('lightbox-title');
    const counterEl = document.getElementById('lightbox-counter');
    const footerEl = document.getElementById('lightbox-caption');

    if (shotBadge) shotBadge.textContent = item.number;
    if (titleEl) titleEl.textContent = item.title;
    if (counterEl) counterEl.textContent = `${index + 1} / ${galleryItems.length}`;
    if (footerEl) {
      footerEl.textContent = currentLang === 'zh' ? item.descZh : item.descEn;
    }
  }

  /**
   * 4. Interactive Widget: Part Number Search Engine (Shot 05)
   */
  function initPartSearchWidget() {
    const input = document.getElementById('partSearchInput');
    const searchBtn = document.getElementById('partSearchBtn');
    const resultBox = document.getElementById('partSearchResult');
    const chips = document.querySelectorAll('.search-chip');

    if (!input || !resultBox) return;

    function executeSearch(query) {
      const q = (query || input.value || '').trim().toUpperCase();
      if (!q) {
        resultBox.innerHTML = `
          <div style="text-align: center; color: var(--c-steel); padding: 20px 0;">
            <p class="lang-zh">請輸入料號或品名關鍵字（例如：6205、6206、6207、M10、VLV、NBR）。</p>
            <p class="lang-en">Please enter a part number or keyword (e.g., 6205, 6206, 6207, M10, VLV, NBR).</p>
          </div>
        `;
        return;
      }

      const matches = PRODUCT_DATABASE.filter(p =>
        p.id.includes(q) ||
        p.nameZh.toUpperCase().includes(q) ||
        p.nameEn.toUpperCase().includes(q) ||
        p.dimensions.toUpperCase().includes(q)
      );

      if (matches.length === 0) {
        resultBox.innerHTML = `
          <div style="padding: 16px; border: 1px dashed var(--c-oxide); border-radius: 4px; background: var(--c-oxide-soft);">
            <div style="display: flex; align-items: center; gap: 8px; color: var(--c-oxide); font-weight: 700; margin-bottom: 6px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span class="lang-zh">查無相符料號：「${q}」</span>
              <span class="lang-en">No Matching Part Number: "${q}"</span>
            </div>
            <p style="font-size: 13px; color: var(--c-dark);" class="lang-zh">建議：請檢查料號拼寫是否正確，或嘗試搜尋 <strong>NL-BRG-6205</strong>、<strong>6206</strong>、<strong>6207</strong>、<strong>M10</strong> 等標準品。</p>
            <p style="font-size: 13px; color: var(--c-dark);" class="lang-en">Suggestion: Please verify the part number format or try searching standard SKUs like <strong>NL-BRG-6205</strong>, <strong>6206</strong>, <strong>6207</strong>.</p>
          </div>
        `;
      } else {
        const item = matches[0];
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-main); padding-bottom: 12px;">
              <div>
                <span class="sku-tag" style="margin-right: 8px;">${item.categoryZh} / ${item.categoryEn}</span>
                <span style="font-family: var(--font-mono); font-weight: 700; font-size: 18px; color: var(--c-dark);">${item.id}</span>
                <h4 style="font-size: 15px; font-weight: 700; margin-top: 4px;">
                  <span class="lang-zh">${item.nameZh}</span>
                  <span class="lang-en">${item.nameEn}</span>
                </h4>
              </div>
              <button type="button" id="loadToCalcBtn" class="btn-procure-action btn-primary-teal" style="font-size: 12px; padding: 6px 12px;">
                <span class="lang-zh">帶入價格試算 →</span>
                <span class="lang-en">Load to Calculator →</span>
              </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; font-family: var(--font-mono); font-size: 12.5px;">
              <div><strong style="color:var(--c-steel);">規格尺寸 Dimensions:</strong><br>${item.dimensions}</div>
              <div><strong style="color:var(--c-steel);">材質結構 Material:</strong><br>${currentLang === 'zh' ? item.materialZh : item.materialEn}</div>
              <div><strong style="color:var(--c-steel);">動負荷 Rating Cr:</strong><br>${item.cr}</div>
              <div><strong style="color:var(--c-steel);">交期預估 Lead Time:</strong><br><span style="color:var(--c-oxide); font-weight:700;">${item.leadTime}</span></div>
            </div>
            <p style="font-size: 13px; color: var(--c-steel); margin-top: 4px;">
              <span class="lang-zh">${item.descZh}</span>
              <span class="lang-en">${item.descEn}</span>
            </p>
          </div>
        `;

        const loadBtn = document.getElementById('loadToCalcBtn');
        if (loadBtn) {
          loadBtn.addEventListener('click', () => {
            const calcInput = document.getElementById('moqQtyInput');
            if (calcInput) {
              calcInput.value = item.moq * 2; // e.g. 40
              calcInput.dispatchEvent(new Event('input'));
              const calcSection = document.getElementById('pricingCalculatorSection') || document.getElementById('shot-09');
              if (calcSection) {
                calcSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
          });
        }
      }
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => executeSearch());
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch();
      }
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-search');
        if (val) {
          input.value = val;
          executeSearch(val);
        }
      });
    });

    // Default search on load: 6205
    executeSearch('6205');
  }

  /**
   * 5. Interactive Widget: Filterable Catalog (Shot 06)
   */
  function initCatalogFilterWidget() {
    const grid = document.getElementById('catalogSkusGrid');
    const countEl = document.getElementById('catalogCountDisplay');
    const categoryBtns = document.querySelectorAll('.cat-facet-btn');
    const materialBtns = document.querySelectorAll('.mat-facet-btn');
    const resetBtn = document.getElementById('catalogResetBtn');

    if (!grid) return;

    let activeCat = 'all';
    let activeMat = 'all';

    function renderCatalog() {
      const filtered = PRODUCT_DATABASE.filter(item => {
        const catMatch = activeCat === 'all' || item.category === activeCat;
        const matMatch = activeMat === 'all' || item.material === activeMat;
        return catMatch && matMatch;
      });

      if (countEl) {
        countEl.innerHTML = `
          <span class="lang-zh">顯示 <strong>${filtered.length}</strong> / ${PRODUCT_DATABASE.length} 件規格零組件</span>
          <span class="lang-en">Showing <strong>${filtered.length}</strong> of ${PRODUCT_DATABASE.length} SKUs</span>
        `;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 36px; text-align: center; background: #FFFFFF; border: 1px dashed var(--border-main); border-radius: 4px;">
            <p style="font-family: var(--font-mono); font-size: 14px; color: var(--c-steel);" class="lang-zh">查無符合目前篩選條件之零組件，請嘗試清除篩選。</p>
            <p style="font-family: var(--font-mono); font-size: 14px; color: var(--c-steel);" class="lang-en">No components match the selected facets. Please reset filters.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(item => `
        <article class="sku-product-card">
          <div class="sku-card-badge-row">
            <span class="sku-tag">${item.categoryZh}</span>
            <span style="color: var(--c-steel); font-size: 11px;">MOQ: ${item.moq} PCS</span>
          </div>
          <div>
            <div class="sku-code">${item.id}</div>
            <div class="sku-name">
              <span class="lang-zh">${item.nameZh}</span>
              <span class="lang-en">${item.nameEn}</span>
            </div>
          </div>
          <table class="sku-spec-table">
            <tr>
              <td style="color:var(--c-steel);">規格尺寸</td>
              <td>${item.dimensions}</td>
            </tr>
            <tr>
              <td style="color:var(--c-steel);">材質</td>
              <td>${currentLang === 'zh' ? item.materialZh.split(' ')[0] : item.materialEn.split(' ')[0]}</td>
            </tr>
            <tr>
              <td style="color:var(--c-steel);">基準單價</td>
              <td style="color:var(--c-teal); font-weight:700;">NT$ ${item.priceTiers[0].price} 起</td>
            </tr>
          </table>
          <button type="button" class="btn-procure-action btn-outline-dark" style="margin-top:auto; font-size:12px; padding:6px 0;" onclick="window.loadSkuToPricing('${item.id}')">
            <span class="lang-zh">試算階梯價格 →</span>
            <span class="lang-en">Calculate Tiers →</span>
          </button>
        </article>
      `).join('');
    }

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.getAttribute('data-category');
        renderCatalog();
      });
    });

    materialBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        materialBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMat = btn.getAttribute('data-material');
        renderCatalog();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCat = 'all';
        activeMat = 'all';
        categoryBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
        materialBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-material') === 'all'));
        renderCatalog();
      });
    }

    // Expose helper to global window
    window.loadSkuToPricing = function (skuId) {
      const item = PRODUCT_DATABASE.find(p => p.id === skuId);
      if (!item) return;
      const input = document.getElementById('moqQtyInput');
      if (input) {
        input.value = item.moq * 2;
        input.dispatchEvent(new Event('input'));
        const calcSection = document.getElementById('pricingCalculatorSection') || document.getElementById('shot-09');
        if (calcSection) calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    renderCatalog();
  }

  /**
   * 6. Interactive Widget: Spec Comparator (Shot 08)
   */
  function initSpecComparator() {
    const rows = document.querySelectorAll('.comparator-table tbody tr');
    rows.forEach(r => {
      r.addEventListener('click', () => {
        rows.forEach(other => other.classList.remove('is-highlight'));
        r.classList.add('is-highlight');
      });
    });
  }

  /**
   * 7. Interactive Widget: MOQ & Tiered Pricing Calculator (Shot 09)
   */
  function initPricingCalculatorWidget() {
    const qtyInput = document.getElementById('moqQtyInput');
    const minusBtn = document.getElementById('moqMinusBtn');
    const plusBtn = document.getElementById('moqPlusBtn');
    const errorAlert = document.getElementById('moqErrorAlert');
    const subtotalDisplay = document.getElementById('calcSubtotalAmount');
    const unitPriceDisplay = document.getElementById('calcUnitPriceDisplay');
    const tierCards = document.querySelectorAll('.tier-rule-card');
    const addToRfqBtn = document.getElementById('addToRfqBtn');

    if (!qtyInput) return;

    const baseSku = PRODUCT_DATABASE[0]; // NL-BRG-6205

    function calculate() {
      const rawVal = parseInt(qtyInput.value, 10);
      const isMultipleOf10 = rawVal % baseSku.step === 0;
      const isGteMoq = rawVal >= baseSku.moq;
      const isValid = !isNaN(rawVal) && rawVal > 0 && isMultipleOf10 && isGteMoq;

      // Tier check
      tierCards.forEach(c => c.classList.remove('is-active'));

      if (!isValid) {
        if (errorAlert) {
          errorAlert.classList.add('is-shown');
          errorAlert.innerHTML = `
            <span class="lang-zh">⚠️ 訂購數量須以 ${baseSku.step} 件為單位，且至少 ${baseSku.moq} 件（MOQ: ${baseSku.moq} PCS）。目前輸入：${isNaN(rawVal) ? 0 : rawVal} 件。</span>
            <span class="lang-en">⚠️ Order quantity must be in multiples of ${baseSku.step} and at least ${baseSku.moq} PCS. Current: ${isNaN(rawVal) ? 0 : rawVal} PCS.</span>
          `;
        }
        if (subtotalDisplay) subtotalDisplay.textContent = '---';
        if (unitPriceDisplay) unitPriceDisplay.textContent = '---';
        if (addToRfqBtn) addToRfqBtn.disabled = true;
        return;
      }

      // Valid quantity
      if (errorAlert) errorAlert.classList.remove('is-shown');
      if (addToRfqBtn) addToRfqBtn.disabled = false;

      let appliedTier = baseSku.priceTiers[0];
      if (rawVal >= 500) {
        appliedTier = baseSku.priceTiers[2];
        const t3 = document.querySelector('.tier-rule-card[data-tier="3"]');
        if (t3) t3.classList.add('is-active');
      } else if (rawVal >= 100) {
        appliedTier = baseSku.priceTiers[1];
        const t2 = document.querySelector('.tier-rule-card[data-tier="2"]');
        if (t2) t2.classList.add('is-active');
      } else {
        appliedTier = baseSku.priceTiers[0];
        const t1 = document.querySelector('.tier-rule-card[data-tier="1"]');
        if (t1) t1.classList.add('is-active');
      }

      const subtotal = rawVal * appliedTier.price;
      if (unitPriceDisplay) unitPriceDisplay.textContent = `NT$ ${appliedTier.price.toLocaleString()}`;
      if (subtotalDisplay) subtotalDisplay.textContent = `NT$ ${subtotal.toLocaleString()}`;
    }

    qtyInput.addEventListener('input', calculate);

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 40;
        val = Math.max(20, val - 10);
        qtyInput.value = val;
        calculate();
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 40;
        val += 10;
        qtyInput.value = val;
        calculate();
      });
    }

    if (addToRfqBtn) {
      addToRfqBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value, 10);
        if (isNaN(qty) || qty < 20 || qty % 10 !== 0) return;

        let price = 120;
        if (qty >= 500) price = 98;
        else if (qty >= 100) price = 108;

        const subtotal = qty * price;

        // Check if item exists in RFQ
        const existing = rfqState.items.find(i => i.sku === baseSku.id);
        if (existing) {
          existing.qty = qty;
          existing.unitPrice = price;
          existing.subtotal = subtotal;
        } else {
          rfqState.items.push({
            sku: baseSku.id,
            nameZh: baseSku.nameZh,
            qty: qty,
            unitPrice: price,
            subtotal: subtotal,
            leadTime: baseSku.leadTime
          });
        }

        renderRfqTable();
        showNotification(currentLang === 'zh'
          ? `已將 ${baseSku.id} (${qty} 件) 更新至 RFQ-DEMO-001 詢價草稿！`
          : `Updated ${baseSku.id} (${qty} PCS) in RFQ-DEMO-001 draft!`);

        const rfqSection = document.getElementById('rfqBuilderSection') || document.getElementById('shot-10');
        if (rfqSection) {
          rfqSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Default: 40 PCS -> NT$ 4,800
    qtyInput.value = 40;
    calculate();
  }

  /**
   * 8. Interactive Widget: RFQ Builder & Dual-Role Approval (Shots 10 & 11)
   */
  function initRfqApprovalWidget() {
    const tableBody = document.getElementById('rfqTableBody');
    const totalEl = document.getElementById('rfqTotalDisplay');
    const statusPill = document.getElementById('rfqStatusPill');
    const roleBuyerBtn = document.getElementById('roleBuyerBtn');
    const roleManagerBtn = document.getElementById('roleManagerBtn');
    const buyerActionsBox = document.getElementById('buyerActionsBox');
    const managerActionsBox = document.getElementById('managerActionsBox');
    const submitForReviewBtn = document.getElementById('submitForReviewBtn');
    const approveRfqBtn = document.getElementById('approveRfqBtn');
    const returnRfqBtn = document.getElementById('returnRfqBtn');
    const notesInput = document.getElementById('rfqNotesInput');

    if (!tableBody) return;

    window.renderRfqTable = function () {
      const isLocked = rfqState.status === 'pending' || rfqState.status === 'approved';

      tableBody.innerHTML = rfqState.items.map((item, idx) => `
        <tr>
          <td><strong style="color:var(--c-teal);">${item.sku}</strong></td>
          <td>${item.nameZh}</td>
          <td>
            ${isLocked
              ? `<span>${item.qty} PCS</span>`
              : `<input type="number" step="10" min="20" value="${item.qty}" style="width: 70px; padding: 4px; font-family: var(--font-mono);" onchange="window.updateRfqItemQty(${idx}, this.value)" />`}
          </td>
          <td>NT$ ${item.unitPrice.toLocaleString()}</td>
          <td><strong style="color:var(--c-dark);">NT$ ${item.subtotal.toLocaleString()}</strong></td>
          <td><span style="color:var(--c-oxide); font-weight:600;">${item.leadTime}</span></td>
          <td>
            ${isLocked
              ? `<span style="color:var(--c-steel); font-size:11px;">[已鎖定]</span>`
              : `<button type="button" style="color:var(--c-oxide); background:none; border:none; cursor:pointer; font-weight:700;" onclick="window.removeRfqItem(${idx})">×</button>`}
          </td>
        </tr>
      `).join('');

      const total = rfqState.items.reduce((acc, curr) => acc + curr.subtotal, 0);
      if (totalEl) totalEl.textContent = `NT$ ${total.toLocaleString()}`;

      // Update Status UI
      updateStatusBadge();
      updateRoleViews();
    };

    function updateStatusBadge() {
      if (!statusPill) return;
      statusPill.className = 'status-pill-badge';

      if (rfqState.status === 'draft') {
        statusPill.classList.add('status-draft');
        statusPill.innerHTML = `<span class="lang-zh">草稿 (DRAFT)</span><span class="lang-en">DRAFT</span>`;
      } else if (rfqState.status === 'pending') {
        statusPill.classList.add('status-pending');
        statusPill.innerHTML = `<span class="lang-zh">⏳ 待主管簽核 (PENDING REVIEW)</span><span class="lang-en">⏳ PENDING REVIEW</span>`;
      } else if (rfqState.status === 'approved') {
        statusPill.classList.add('status-approved');
        statusPill.innerHTML = `<span class="lang-zh">✓ 主管已核准 (APPROVED)</span><span class="lang-en">✓ APPROVED</span>`;
      } else if (rfqState.status === 'returned') {
        statusPill.classList.add('status-returned');
        statusPill.innerHTML = `<span class="lang-zh">⚠️ 退回修改 (RETURNED)</span><span class="lang-en">⚠️ RETURNED</span>`;
      }
    }

    function updateRoleViews() {
      if (!buyerActionsBox || !managerActionsBox) return;

      if (rfqState.userRole === 'buyer') {
        buyerActionsBox.style.display = 'flex';
        managerActionsBox.style.display = 'none';

        if (submitForReviewBtn) {
          if (rfqState.status === 'pending') {
            submitForReviewBtn.disabled = true;
            submitForReviewBtn.innerHTML = `<span class="lang-zh">審批中，請切換至主管視角 →</span><span class="lang-en">Under Review, Switch to Manager →</span>`;
          } else if (rfqState.status === 'approved') {
            submitForReviewBtn.disabled = true;
            submitForReviewBtn.innerHTML = `<span class="lang-zh">✓ 本案已核准通過</span><span class="lang-en">✓ RFQ Approved</span>`;
          } else {
            submitForReviewBtn.disabled = false;
            submitForReviewBtn.innerHTML = `<span class="lang-zh">送交內部簽核 (Submit for Review) →</span><span class="lang-en">Submit for Review →</span>`;
          }
        }
      } else {
        buyerActionsBox.style.display = 'none';
        managerActionsBox.style.display = 'flex';

        if (approveRfqBtn && returnRfqBtn) {
          if (rfqState.status === 'pending') {
            approveRfqBtn.disabled = false;
            returnRfqBtn.disabled = false;
          } else {
            approveRfqBtn.disabled = true;
            returnRfqBtn.disabled = true;
          }
        }
      }
    }

    window.updateRfqItemQty = function (idx, newQty) {
      const q = parseInt(newQty, 10);
      if (isNaN(q) || q < 20 || q % 10 !== 0) {
        alert(currentLang === 'zh' ? '數量須為 10 之倍數且至少 20 件' : 'Quantity must be in multiples of 10 and >= 20 PCS');
        renderRfqTable();
        return;
      }
      const item = rfqState.items[idx];
      if (item) {
        item.qty = q;
        let price = 120;
        if (q >= 500) price = 98;
        else if (q >= 100) price = 108;
        item.unitPrice = price;
        item.subtotal = q * price;
      }
      renderRfqTable();
    };

    window.removeRfqItem = function (idx) {
      if (rfqState.items.length <= 1) {
        alert(currentLang === 'zh' ? 'RFQ 詢價單至少須保留一項零組件' : 'RFQ must contain at least one item');
        return;
      }
      rfqState.items.splice(idx, 1);
      renderRfqTable();
    };

    if (roleBuyerBtn) {
      roleBuyerBtn.addEventListener('click', () => {
        rfqState.userRole = 'buyer';
        roleBuyerBtn.classList.add('active');
        if (roleManagerBtn) roleManagerBtn.classList.remove('active');
        updateRoleViews();
      });
    }

    if (roleManagerBtn) {
      roleManagerBtn.addEventListener('click', () => {
        rfqState.userRole = 'manager';
        roleManagerBtn.classList.add('active');
        if (roleBuyerBtn) roleBuyerBtn.classList.remove('active');
        updateRoleViews();
      });
    }

    if (submitForReviewBtn) {
      submitForReviewBtn.addEventListener('click', () => {
        if (rfqState.items.length === 0) return;
        rfqState.status = 'pending';
        renderRfqTable();
        showNotification(currentLang === 'zh'
          ? '【本機模擬】RFQ-DEMO-001 已送交內部採購主管簽核佇列！'
          : '[Demo] RFQ-DEMO-001 submitted for internal Manager review!');
      });
    }

    if (approveRfqBtn) {
      approveRfqBtn.addEventListener('click', () => {
        if (rfqState.status !== 'pending') return;
        rfqState.status = 'approved';
        renderRfqTable();
        showNotification(currentLang === 'zh'
          ? '【本機模擬】主管已核准本詢價單，正式產生採購審批碼 [NL-APV-2026-088]！'
          : '[Demo] Manager APPROVED RFQ-DEMO-001 with audit code [NL-APV-2026-088]!');
      });
    }

    if (returnRfqBtn) {
      returnRfqBtn.addEventListener('click', () => {
        if (rfqState.status !== 'pending') return;
        rfqState.status = 'returned';
        if (notesInput) {
          notesInput.value += ' \n[主管審核意見] 請確認交期是否能配合 5/1 產線換季維護日程。';
        }
        renderRfqTable();
        showNotification(currentLang === 'zh'
          ? '【本機模擬】詢價單已退回經辦修改，請經辦補充交期與採購理由。'
          : '[Demo] RFQ returned to Buyer with review comments.');
      });
    }

    renderRfqTable();
  }

  /**
   * Accessible Toast Notification Utility
   */
  function showNotification(msg) {
    let toast = document.getElementById('globalActionToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalActionToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        background: var(--c-dark);
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 6px;
        font-family: var(--font-mono);
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        border-left: 4px solid var(--c-teal);
        transform: translateY(60px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(60px)';
      toast.style.opacity = '0';
    }, 3800);
  }

})();
