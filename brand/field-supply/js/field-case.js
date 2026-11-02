(() => {
  'use strict';

  // =========================================================================
  // 1. DATA DICTIONARY (MATCHING CATALOG_DEMO.json & 16_INDEPENDENT_SHOTS.md)
  // =========================================================================
  const products = [
    {
      sku: 'FS-TNT-101',
      brand: 'HOLLOW RIDGE',
      name: 'RIDGE 2P TENT',
      nameZh: '雙人高階野營帳篷',
      category: 'Tents',
      categoryZh: '帳篷',
      price: 6980,
      capacity: '2P',
      packed_weight_kg: 2.15,
      season: '3-season',
      seasonZh: '三季帳',
      color: 'olive',
      colorZh: '軍綠 Olive',
      desc: '輕量化雙門雙前庭雙人帳，兼顧抗風結構與透氣紗網。適合高山縱走與週末野營。',
      descEn: 'Lightweight 2-person tent with dual vestibules, rugged pole geometry, and breathable mesh for 3-season versatility.'
    },
    {
      sku: 'FS-TNT-102',
      brand: 'SOLTRAIL',
      name: 'LITE 2P TENT',
      nameZh: '超輕量縱走雙人帳',
      category: 'Tents',
      categoryZh: '帳篷',
      price: 8480,
      capacity: '2P',
      packed_weight_kg: 1.65,
      season: '3-season',
      seasonZh: '三季帳',
      color: 'sand',
      colorZh: '沙色 Sand',
      desc: '極致輕量化科技尼龍布料，打包重量僅 1.65 公斤。專為長程徒步與快速穿越設計。',
      descEn: 'Ultralight technical nylon construction with a minimal packed weight of only 1.65 kg for long-distance thru-hiking.'
    },
    {
      sku: 'FS-TNT-103',
      brand: 'PINE ARC',
      name: 'BASE 2P TENT',
      nameZh: '耐磨基地雙人露營帳',
      category: 'Tents',
      categoryZh: '帳篷',
      price: 5980,
      capacity: '2P',
      packed_weight_kg: 2.75,
      season: '3-season',
      seasonZh: '三季帳',
      color: 'forest',
      colorZh: '墨綠 Forest',
      desc: '加厚耐磨抗水地布與寬敞內帳空間，堅固耐用，是自駕露營與初階戶外玩家的最佳基石。',
      descEn: 'Durable floor construction with spacious living room geometry, ideal for car camping and weekend adventures.'
    },
    {
      sku: 'FS-BAG-201',
      brand: 'WAYMARK',
      name: 'TRAIL 32 BACKPACK',
      nameZh: '輕量多日健行背包 32L',
      category: 'Packs',
      categoryZh: '背包',
      price: 4280,
      capacity_l: 32,
      color: 'slate',
      colorZh: '岩灰 Slate',
      desc: '符合人體工學的立體透氣背負系統，快取前袋與冰斧水袋相容設計。',
      descEn: 'Ergonomic ventilated harness with quick-access stash pockets, hydration port, and tool attachment loops.'
    },
    {
      sku: 'FS-BAG-202',
      brand: 'MOSSWAY',
      name: 'DAY 25 BACKPACK',
      nameZh: '都會日常健行背包 25L',
      category: 'Packs',
      categoryZh: '背包',
      price: 3780,
      capacity_l: 25,
      color: 'khaki',
      colorZh: '卡其 Khaki',
      desc: '兼顧日常通勤與單日郊山健行，抗撕裂防潑水布料與筆電隔層保護。',
      descEn: 'Versatile daypack bridging daily urban commutes and mountain day hikes with weather-resistant fabric.'
    },
    {
      sku: 'FS-JKT-301',
      brand: 'LORNE',
      name: 'WEATHER SHELL',
      nameZh: '三層全天候抗風雨風衣',
      category: 'Apparel',
      categoryZh: '機能服飾',
      price: 5280,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['olive', 'graphite'],
      colorsZh: ['軍綠 Olive', '石墨黑 Graphite'],
      desc: '3-layer 防水透氣複合面料，全壓膠接縫與立體剪裁連帽，提供惡劣天候完整防護。',
      descEn: '3-layer waterproof breathable shell with fully taped seams and articulated storm hood for harsh weather.'
    },
    {
      sku: 'FS-LGT-401',
      brand: 'HALO POINT',
      name: 'TRAIL HEADLAMP',
      nameZh: '高流明 USB 充電頭燈',
      category: 'Lighting',
      categoryZh: '照明裝備',
      price: 1480,
      color: 'graphite',
      colorZh: '石墨黑 Graphite',
      desc: '350 流明多段亮度調校，IPX4 防潑水，Type-C 快速充電與紅光警示夜視模式。',
      descEn: '350 lumens USB-C rechargeable headlamp with red night-vision mode and IPX4 weather sealing.'
    },
    {
      sku: 'FS-COO-501',
      brand: 'LEAF CAMP',
      name: 'COMPACT STOVE',
      nameZh: '微型折疊高山氣爐',
      category: 'Camp Kitchen',
      categoryZh: '營地廚具',
      price: 2280,
      color: 'silver',
      colorZh: '鈦銀 Silver',
      desc: '航太鋁合金與不鏽鋼折疊支架，大火力穩壓輸出，收納體積小巧便攜。',
      descEn: 'Precision micro-burner with folding pot supports, integrated piezo ignition, and high-efficiency wind guard.'
    }
  ];

  const shots16 = [
    { num: '01', title: 'MULTI-BRAND RETAIL HERO', desc: '戶外用品零售全景：帳篷、背包、外套、頭燈多品類商品組合。' },
    { num: '02', title: 'BRAND / RETAIL POSITION', desc: 'FIELD SUPPLY 通路識別與多品牌經銷合作定位展示。' },
    { num: '03', title: 'SHOPPER JOURNEY', desc: '搜尋、篩選、比對、結帳及售後完整電商使用者旅程圖。' },
    { num: '04', title: 'CATEGORY COLLECTION', desc: 'Tents / Packs / Apparel / Lighting / Camp Kitchen 五大分類展示。' },
    { num: '05', title: 'DISCOVERY SEARCH', desc: '桌機與手機即時搜尋、多維度篩選標籤及零結果狀態。' },
    { num: '06', title: 'THREE TENTS COMPARE', desc: '三款不同品牌 2P 帳篷（101/102/103）重量、價格與規格並排對照。' },
    { num: '07', title: 'TENT PRODUCT DETAIL', desc: 'FS-TNT-101 規格、運送免運提醒、庫存與加入購物車真實 UI。' },
    { num: '08', title: 'SHELL SIZE VARIANTS', desc: 'FS-JKT-301 尺寸 S/M/L/XL、色彩切換與未選尺寸錯誤提示。' },
    { num: '09', title: 'CROSS-BRAND BUNDLE', desc: '帳篷與露營配件多品牌搭配選購組合。' },
    { num: '10', title: 'CART / SHIPPING CLARITY', desc: '滿 NT$3,000 免運 / 未達 NT$100 運費計算等式與購物清單。' },
    { num: '11', title: 'GUEST CHECKOUT', desc: '訪客結帳 3 步驟：收件資料、訂單確認與防呆驗證。' },
    { num: '12', title: 'DEMO ORDER CONFIRM', desc: '純前端示範訂單編號、明細與免責聲明收尾。' },
    { num: '13', title: 'DELIVERY / RETURNS', desc: '模擬訂單配送進度追蹤與 7 天鑑賞期售後退換說明。' },
    { num: '14', title: 'RESPONSIVE MOBILE COMMERCE', desc: '390px 手機版分類濾鏡 Drawer、購物車與結帳排版。' },
    { num: '15', title: 'COMPONENTS + ACCESSIBILITY', desc: '聚焦框、錯誤提示、空狀態與無障礙讀屏標籤設計系統。' },
    { num: '16', title: 'ECOMMERCE ECOSYSTEM FINALE', desc: '全品類戶外選品電商介面與品牌視覺成果總結。' }
  ];

  // State
  let lang = 'zh-TW';
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'featured';
  let compareList = []; // SKU array, max 3
  let cart = []; // { sku, qty, size, color }
  let lastOrderId = 'FS-2026-8842';

  const q = (s) => document.querySelector(s);
  const all = (s) => [...document.querySelectorAll(s)];

  // =========================================================================
  // 2. LANGUAGE TOGGLE
  // =========================================================================
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'zh-TW';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    all('.fs-zh').forEach(n => n.hidden = lang === 'en');
    all('.fs-en').forEach(n => n.hidden = lang !== 'en');
    all('[data-lang]').forEach(n => n.setAttribute('aria-pressed', String(n.dataset.lang === lang)));
    renderCatalog();
    renderCompareMatrix();
    renderCart();
  }

  all('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // =========================================================================
  // 3. CATALOG RENDERING & FILTERING
  // =========================================================================
  function getFilteredProducts() {
    let list = [...products];

    // Category filter
    if (currentCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Search query
    if (searchQuery.trim()) {
      const kw = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        return (
          p.sku.toLowerCase().includes(kw) ||
          p.brand.toLowerCase().includes(kw) ||
          p.name.toLowerCase().includes(kw) ||
          (p.nameZh && p.nameZh.toLowerCase().includes(kw)) ||
          p.category.toLowerCase().includes(kw) ||
          (p.capacity && p.capacity.toLowerCase().includes(kw)) ||
          (p.color && p.color.toLowerCase().includes(kw)) ||
          (p.season && p.season.toLowerCase().includes(kw)) ||
          (p.desc && p.desc.toLowerCase().includes(kw))
        );
      });
    }

    // Sort
    if (currentSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }

  function renderCatalog() {
    const grid = q('#fs-product-grid');
    if (!grid) return;
    grid.replaceChildren();

    const filtered = getFilteredProducts();
    const countEl = q('#fs-catalog-count');
    const resetBtn = q('#fs-reset-filters');

    if (countEl) {
      countEl.textContent = lang === 'en'
        ? `Showing ${filtered.length} products`
        : `顯示 ${filtered.length} 件商品`;
    }

    if (resetBtn) {
      resetBtn.hidden = (currentCategory === 'all' && !searchQuery.trim() && currentSort === 'featured');
    }

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'fs-empty-state';
      empty.innerHTML = `
        <h3>${lang === 'en' ? 'No products found' : '查無符合條件的商品'}</h3>
        <p>${lang === 'en' ? 'Try adjusting your search keywords or category filters.' : '請嘗試更換搜尋關鍵字或清除分類條件。'}</p>
        <button type="button" class="fs-btn-sm fs-btn-dark" id="fs-btn-empty-reset">
          ${lang === 'en' ? 'Reset Filters' : '重設搜尋條件'}
        </button>
      `;
      grid.append(empty);
      q('#fs-btn-empty-reset')?.addEventListener('click', resetFilters);
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('article');
      card.className = 'fs-card';
      card.dataset.sku = p.sku;

      const top = document.createElement('div');
      top.className = 'fs-card-top';

      const brand = document.createElement('div');
      brand.className = 'fs-card-brand';
      brand.textContent = p.brand;

      const title = document.createElement('h3');
      title.className = 'fs-card-title';
      title.textContent = lang === 'en' ? p.name : (p.nameZh ? `${p.name} / ${p.nameZh}` : p.name);

      const sku = document.createElement('div');
      sku.className = 'fs-card-sku';
      sku.textContent = `SKU: ${p.sku}`;

      const tags = document.createElement('div');
      tags.className = 'fs-card-tags';

      const catTag = document.createElement('span');
      catTag.className = 'fs-tag';
      catTag.textContent = lang === 'en' ? p.category : p.categoryZh;
      tags.append(catTag);

      if (p.capacity) {
        const capTag = document.createElement('span');
        capTag.className = 'fs-tag';
        capTag.textContent = p.capacity;
        tags.append(capTag);
      }
      if (p.packed_weight_kg) {
        const wtTag = document.createElement('span');
        wtTag.className = 'fs-tag';
        wtTag.textContent = `${p.packed_weight_kg} kg`;
        tags.append(wtTag);
      }
      if (p.capacity_l) {
        const lTag = document.createElement('span');
        lTag.className = 'fs-tag';
        lTag.textContent = `${p.capacity_l} L`;
        tags.append(lTag);
      }
      if (p.sizes) {
        const sizeTag = document.createElement('span');
        sizeTag.className = 'fs-tag';
        sizeTag.textContent = p.sizes.join(' · ');
        tags.append(sizeTag);
      }

      top.append(brand, title, sku, tags);

      const bottom = document.createElement('div');
      const price = document.createElement('div');
      price.className = 'fs-card-price';
      price.textContent = `NT$ ${p.price.toLocaleString()}`;

      const actions = document.createElement('div');
      actions.className = 'fs-card-actions';

      const viewBtn = document.createElement('button');
      viewBtn.type = 'button';
      viewBtn.className = 'fs-btn-sm fs-btn-outline';
      viewBtn.textContent = lang === 'en' ? 'View Specs' : '查看規格';
      viewBtn.addEventListener('click', () => openPdp(p.sku));

      const isCompared = compareList.includes(p.sku);
      const cmpBtn = document.createElement('button');
      cmpBtn.type = 'button';
      cmpBtn.className = 'fs-btn-sm fs-btn-outline';
      cmpBtn.textContent = isCompared
        ? (lang === 'en' ? '✓ Compared' : '✓ 已加入比較')
        : (lang === 'en' ? '+ Compare' : '+ 加入比較');
      cmpBtn.addEventListener('click', () => toggleCompare(p.sku));

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'fs-btn-sm fs-btn-dark fs-btn-full';
      addBtn.textContent = lang === 'en' ? 'Quick Add to Cart' : '快速加入購物車';
      addBtn.addEventListener('click', () => {
        if (p.sizes) {
          openPdp(p.sku);
        } else {
          addToCart(p.sku, 1);
        }
      });

      actions.append(viewBtn, cmpBtn, addBtn);
      bottom.append(price, actions);

      card.append(top, bottom);
      grid.append(card);
    });
  }

  function resetFilters() {
    currentCategory = 'all';
    searchQuery = '';
    currentSort = 'featured';
    if (q('#fs-search-input')) q('#fs-search-input').value = '';
    if (q('#fs-sort-select')) q('#fs-sort-select').value = 'featured';
    all('.fs-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    renderCatalog();
  }

  q('#fs-reset-filters')?.addEventListener('click', resetFilters);

  q('#fs-search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderCatalog();
  });

  all('.fs-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      all('.fs-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });

  q('#fs-sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderCatalog();
  });

  // =========================================================================
  // 4. COMPARISON MATRIX (#fs-compare)
  // =========================================================================
  function toggleCompare(sku) {
    const alertEl = q('#fs-compare-alert');
    if (alertEl) alertEl.hidden = true;

    if (compareList.includes(sku)) {
      compareList = compareList.filter(s => s !== sku);
      renderCompareMatrix();
      renderCatalog();
      return;
    }

    const prodToAdd = products.find(p => p.sku === sku);
    if (!prodToAdd) return;

    // Enforce same category comparison
    if (compareList.length > 0) {
      const firstProd = products.find(p => p.sku === compareList[0]);
      if (firstProd && firstProd.category !== prodToAdd.category) {
        if (alertEl) {
          alertEl.textContent = lang === 'en'
            ? 'Cross-category items cannot be compared item-by-item (same category only).'
            : '跨分類商品無法逐項比較規格（僅支援同類別比較）。';
          alertEl.hidden = false;
        }
        return;
      }
    }

    if (compareList.length >= 3) {
      if (alertEl) {
        alertEl.textContent = lang === 'en'
          ? 'Maximum 3 products can be compared simultaneously.'
          : '最多僅能同時比較 3 件商品。';
        alertEl.hidden = false;
      }
      return;
    }

    compareList.push(sku);
    renderCompareMatrix();
    renderCatalog();

    // Scroll smoothly to compare section
    q('#fs-compare')?.scrollIntoView({ behavior: 'smooth' });
  }

  function renderCompareMatrix() {
    const infoEl = q('#fs-compare-slots-info');
    if (infoEl) {
      infoEl.textContent = lang === 'en'
        ? `Comparing: ${compareList.length} / 3 products`
        : `已選取比較：${compareList.length} / 3 件商品`;
    }

    const container = q('#fs-compare-table-container');
    if (!container) return;

    if (compareList.length === 0) {
      container.innerHTML = `
        <p style="text-align: center; color: var(--fs-granite); padding: 40px 0;">
          ${lang === 'en'
            ? 'No products in comparison. Click "+ Compare" on cards or load the 3-tent demo.'
            : '尚未加入比較商品。請在商品清單中點選「加入比較」或點擊「快速載入三款帳篷比較」。'}
        </p>
      `;
      return;
    }

    const prods = compareList.map(sku => products.find(p => p.sku === sku)).filter(Boolean);
    const cat = prods[0]?.category;

    let html = `<table class="fs-compare-table"><thead><tr><th>${lang === 'en' ? 'Specification' : '規格項目'}</th>`;
    prods.forEach(p => {
      html += `<th><strong>${p.name}</strong><br><small style="color:var(--fs-moss);font-family:var(--fs-font-mono);">${p.brand}</small></th>`;
    });
    html += `</tr></thead><tbody>`;

    // Row: SKU
    html += `<tr><th>SKU</th>`;
    prods.forEach(p => { html += `<td><code>${p.sku}</code></td>`; });
    html += `</tr>`;

    // Row: Price
    html += `<tr><th>${lang === 'en' ? 'Price' : '建議售價'}</th>`;
    prods.forEach(p => { html += `<td><strong style="color:var(--fs-ink);">NT$ ${p.price.toLocaleString()}</strong></td>`; });
    html += `</tr>`;

    // Category-specific rows
    if (cat === 'Tents') {
      html += `<tr><th>${lang === 'en' ? 'Packed Weight' : '打包重量'}</th>`;
      prods.forEach(p => { html += `<td><strong>${p.packed_weight_kg} kg</strong></td>`; });
      html += `</tr>`;

      html += `<tr><th>${lang === 'en' ? 'Capacity' : '容納人數'}</th>`;
      prods.forEach(p => { html += `<td>${p.capacity}</td>`; });
      html += `</tr>`;

      html += `<tr><th>${lang === 'en' ? 'Season Rating' : '適用季節'}</th>`;
      prods.forEach(p => { html += `<td>${lang === 'en' ? p.season : p.seasonZh}</td>`; });
      html += `</tr>`;

      html += `<tr><th>${lang === 'en' ? 'Color' : '外帳配色'}</th>`;
      prods.forEach(p => { html += `<td>${lang === 'en' ? p.color : p.colorZh}</td>`; });
      html += `</tr>`;
    } else if (cat === 'Packs') {
      html += `<tr><th>${lang === 'en' ? 'Capacity (L)' : '背包容量'}</th>`;
      prods.forEach(p => { html += `<td><strong>${p.capacity_l} L</strong></td>`; });
      html += `</tr>`;
    }

    // Row: Actions
    html += `<tr><th>${lang === 'en' ? 'Actions' : '操作'}</th>`;
    prods.forEach(p => {
      html += `<td>
        <button type="button" class="fs-btn-sm fs-btn-dark fs-btn-cmp-add" data-sku="${p.sku}" style="margin-right:6px;">
          ${lang === 'en' ? 'Add to Cart' : '加入購物車'}
        </button>
        <button type="button" class="fs-btn-sm fs-btn-outline fs-btn-cmp-del" data-sku="${p.sku}">
          ${lang === 'en' ? 'Remove' : '移除'}
        </button>
      </td>`;
    });
    html += `</tr></tbody></table>`;

    container.innerHTML = html;

    all('.fs-btn-cmp-add').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.sku, 1));
    });

    all('.fs-btn-cmp-del').forEach(btn => {
      btn.addEventListener('click', () => toggleCompare(btn.dataset.sku));
    });
  }

  q('#fs-btn-compare-demo-tents')?.addEventListener('click', () => {
    compareList = ['FS-TNT-101', 'FS-TNT-102', 'FS-TNT-103'];
    const alertEl = q('#fs-compare-alert');
    if (alertEl) alertEl.hidden = true;
    renderCompareMatrix();
    renderCatalog();
    q('#fs-compare')?.scrollIntoView({ behavior: 'smooth' });
  });

  q('#fs-btn-clear-compare')?.addEventListener('click', () => {
    compareList = [];
    const alertEl = q('#fs-compare-alert');
    if (alertEl) alertEl.hidden = true;
    renderCompareMatrix();
    renderCatalog();
  });

  // =========================================================================
  // 5. PRODUCT DETAIL MODAL (#fs-product-detail)
  // =========================================================================
  let pdpSelectedSize = null;
  let pdpQty = 1;

  function openPdp(sku) {
    const p = products.find(x => x.sku === sku);
    if (!p) return;

    pdpSelectedSize = null;
    pdpQty = 1;

    const modal = q('#fs-pdp-modal');
    const content = q('#fs-pdp-content');
    if (!modal || !content) return;

    let variantHtml = '';
    if (p.sizes) {
      variantHtml += `
        <div class="fs-variant-group">
          <div class="fs-variant-title">
            <span>${lang === 'en' ? 'Select Size *' : '選擇尺寸 *'}</span>
            <span id="fs-pdp-size-val" style="color:var(--fs-moss);font-family:var(--fs-font-mono);font-weight:700;"></span>
          </div>
          <div class="fs-variant-options" id="fs-pdp-sizes-list">
            ${p.sizes.map(s => `<button type="button" class="fs-size-btn" data-size="${s}">${s}</button>`).join('')}
          </div>
          <div class="fs-pdp-error" id="fs-err-size" hidden>
            ${lang === 'en' ? '⚠ Please select a size variant before adding to cart.' : '⚠ 請先選擇尺寸規格後再加入購物車。'}
          </div>
        </div>
      `;
    }

    content.innerHTML = `
      <div class="fs-pdp-brand">${p.brand}</div>
      <h2 class="fs-pdp-title" id="fs-pdp-title">${lang === 'en' ? p.name : (p.nameZh ? `${p.name} / ${p.nameZh}` : p.name)}</h2>
      <div style="font-family:var(--fs-font-mono); font-size:0.82rem; color:var(--fs-granite); margin-bottom:12px;">
        SKU: ${p.sku} · Category: ${lang === 'en' ? p.category : p.categoryZh}
      </div>
      <div class="fs-pdp-price">NT$ ${p.price.toLocaleString()}</div>
      
      <p style="font-size:0.95rem; line-height:1.6; color:#38423d; margin-bottom:20px;">
        ${lang === 'en' ? p.descEn : p.desc}
      </p>

      <div style="background:var(--fs-sand); padding:12px 16px; border-radius:2px; font-size:0.84rem; margin-bottom:20px;">
        <strong>${lang === 'en' ? 'Specifications:' : '詳細規格：'}</strong>
        <span style="font-family:var(--fs-font-mono);">
          ${p.capacity ? `Capacity: ${p.capacity} · ` : ''}
          ${p.packed_weight_kg ? `Packed: ${p.packed_weight_kg} kg · ` : ''}
          ${p.capacity_l ? `Volume: ${p.capacity_l} L · ` : ''}
          ${p.season ? `Season: ${lang === 'en' ? p.season : p.seasonZh} · ` : ''}
          ${p.color ? `Color: ${lang === 'en' ? p.color : p.colorZh}` : ''}
        </span>
      </div>

      ${variantHtml}

      <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
        <span style="font-size:0.85rem; font-weight:600;">${lang === 'en' ? 'Quantity:' : '購買數量：'}</span>
        <div class="fs-qty-selector">
          <button type="button" class="fs-qty-btn" id="fs-pdp-qty-minus">-</button>
          <span class="fs-qty-val" id="fs-pdp-qty-val">1</span>
          <button type="button" class="fs-qty-btn" id="fs-pdp-qty-plus">+</button>
        </div>
      </div>

      <div style="display:flex; gap:12px;">
        <button type="button" class="fs-btn-sm fs-btn-dark" id="fs-pdp-btn-add" style="flex:1; padding:12px; font-size:0.92rem;">
          ${lang === 'en' ? 'Add to Cart 🛒' : '加入購物車 🛒'}
        </button>
      </div>
    `;

    // Size button events
    if (p.sizes) {
      all('#fs-pdp-sizes-list .fs-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          all('#fs-pdp-sizes-list .fs-size-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          pdpSelectedSize = btn.dataset.size;
          const szVal = q('#fs-pdp-size-val');
          if (szVal) szVal.textContent = pdpSelectedSize;
          const err = q('#fs-err-size');
          if (err) err.hidden = true;
        });
      });
    }

    // Qty events
    q('#fs-pdp-qty-minus')?.addEventListener('click', () => {
      if (pdpQty > 1) {
        pdpQty--;
        q('#fs-pdp-qty-val').textContent = pdpQty;
      }
    });

    q('#fs-pdp-qty-plus')?.addEventListener('click', () => {
      pdpQty++;
      q('#fs-pdp-qty-val').textContent = pdpQty;
    });

    // Add to cart event
    q('#fs-pdp-btn-add')?.addEventListener('click', () => {
      if (p.sizes && !pdpSelectedSize) {
        const err = q('#fs-err-size');
        if (err) {
          err.hidden = false;
          err.focus();
        }
        return;
      }
      addToCart(p.sku, pdpQty, pdpSelectedSize);
      closePdp();
    });

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePdp() {
    const modal = q('#fs-pdp-modal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  q('#fs-pdp-close')?.addEventListener('click', closePdp);
  q('#fs-pdp-modal')?.addEventListener('click', (e) => {
    if (e.target === q('#fs-pdp-modal')) closePdp();
  });

  // =========================================================================
  // 6. SHOPPING CART (#fs-cart) & SHIPPING RULES
  // =========================================================================
  function addToCart(sku, qty = 1, size = null) {
    const p = products.find(x => x.sku === sku);
    if (!p) return;

    const existing = cart.find(item => item.sku === sku && item.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ sku, qty, size });
    }

    renderCart();
    openCart();
  }

  function renderCart() {
    const badge = q('#fs-cart-badge');
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) badge.textContent = totalCount;

    const list = q('#fs-cart-items-list');
    if (!list) return;
    list.replaceChildren();

    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:50px 20px; color:var(--fs-granite);">
          <div style="font-size:2rem; margin-bottom:8px;">🛒</div>
          <p>${lang === 'en' ? 'Your cart is empty' : '購物清單目前是空的'}</p>
        </div>
      `;
      q('#fs-cart-subtotal').textContent = 'NT$ 0';
      q('#fs-cart-shipping').textContent = 'NT$ 0';
      q('#fs-cart-total').textContent = 'NT$ 0';
      if (q('#fs-btn-checkout')) q('#fs-btn-checkout').disabled = true;
      return;
    }

    if (q('#fs-btn-checkout')) q('#fs-btn-checkout').disabled = false;

    let subtotal = 0;

    cart.forEach((item, idx) => {
      const p = products.find(x => x.sku === item.sku);
      if (!p) return;

      const itemTotal = p.price * item.qty;
      subtotal += itemTotal;

      const row = document.createElement('div');
      row.className = 'fs-cart-item';

      const left = document.createElement('div');
      const bName = document.createElement('div');
      bName.className = 'fs-cart-item-brand';
      bName.textContent = p.brand;

      const tName = document.createElement('div');
      tName.className = 'fs-cart-item-title';
      tName.textContent = `${p.name}${item.size ? ` (${item.size})` : ''}`;

      const price = document.createElement('div');
      price.className = 'fs-cart-item-price';
      price.textContent = `NT$ ${p.price.toLocaleString()} × ${item.qty} = NT$ ${itemTotal.toLocaleString()}`;

      const controls = document.createElement('div');
      controls.className = 'fs-cart-item-controls';

      const qtySel = document.createElement('div');
      qtySel.className = 'fs-qty-selector';

      const mBtn = document.createElement('button');
      mBtn.type = 'button';
      mBtn.className = 'fs-qty-btn';
      mBtn.textContent = '-';
      mBtn.addEventListener('click', () => {
        if (item.qty > 1) {
          item.qty--;
        } else {
          cart.splice(idx, 1);
        }
        renderCart();
      });

      const qVal = document.createElement('span');
      qVal.className = 'fs-qty-val';
      qVal.textContent = item.qty;

      const pBtn = document.createElement('button');
      pBtn.type = 'button';
      pBtn.className = 'fs-qty-btn';
      pBtn.textContent = '+';
      pBtn.addEventListener('click', () => {
        item.qty++;
        renderCart();
      });

      qtySel.append(mBtn, qVal, pBtn);

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'fs-cart-del-btn';
      delBtn.textContent = lang === 'en' ? 'Delete' : '刪除';
      delBtn.addEventListener('click', () => {
        cart.splice(idx, 1);
        renderCart();
      });

      controls.append(qtySel, delBtn);
      left.append(bName, tName, price, controls);

      row.append(left);
      list.append(row);
    });

    // Shipping rule: subtotal >= 3000 -> 0, else 100
    const shipping = subtotal >= 3000 ? 0 : 100;
    const total = subtotal + shipping;

    q('#fs-cart-subtotal').textContent = `NT$ ${subtotal.toLocaleString()}`;
    q('#fs-cart-shipping').textContent = shipping === 0
      ? (lang === 'en' ? 'Free (NT$ 0)' : '免運費 (NT$ 0)')
      : `NT$ ${shipping}`;
    q('#fs-cart-total').textContent = `NT$ ${total.toLocaleString()}`;

    const banner = q('#fs-shipping-banner');
    if (banner) {
      if (shipping === 0) {
        banner.textContent = lang === 'en'
          ? '✓ Free Shipping threshold reached (Order >= NT$3,000)'
          : '✓ 已達免運門檻（滿 NT$3,000 免運費）';
        banner.style.background = 'rgba(101, 124, 101, 0.15)';
      } else {
        const gap = 3000 - subtotal;
        banner.textContent = lang === 'en'
          ? `Add NT$ ${gap.toLocaleString()} more for Free Shipping`
          : `再消費 NT$ ${gap.toLocaleString()} 即可享免運優惠`;
        banner.style.background = 'rgba(119, 125, 120, 0.1)';
      }
    }
  }

  function openCart() {
    const drawer = q('#fs-cart-drawer');
    if (drawer) drawer.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    const drawer = q('#fs-cart-drawer');
    if (drawer) drawer.hidden = true;
    document.body.style.overflow = '';
  }

  q('#fs-cart-toggle')?.addEventListener('click', openCart);
  q('#fs-cart-close')?.addEventListener('click', closeCart);
  q('#fs-cart-drawer')?.addEventListener('click', (e) => {
    if (e.target === q('#fs-cart-drawer')) closeCart();
  });

  // =========================================================================
  // 7. GUEST CHECKOUT MODAL (#fs-checkout)
  // =========================================================================
  const checkoutData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  };

  function openCheckout() {
    closeCart();
    const modal = q('#fs-checkout-modal');
    if (!modal) return;

    showCheckoutStep(1);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    const modal = q('#fs-checkout-modal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  function showCheckoutStep(step) {
    const s1 = q('#fs-checkout-step-1');
    const s2 = q('#fs-checkout-step-2');
    const s3 = q('#fs-checkout-step-3');

    if (s1) s1.hidden = step !== 1;
    if (s2) s2.hidden = step !== 2;
    if (s3) s3.hidden = step !== 3;

    all('.fs-step-indicator').forEach((tab, idx) => {
      tab.classList.toggle('active', idx + 1 === step);
    });

    if (step === 2) {
      renderCheckoutReview();
    }
  }

  q('#fs-btn-checkout')?.addEventListener('click', openCheckout);
  q('#fs-checkout-close')?.addEventListener('click', closeCheckout);
  q('#fs-btn-back-to-cart')?.addEventListener('click', () => {
    closeCheckout();
    openCart();
  });

  // Step 1 Submission & Validation
  q('#fs-shipping-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = q('#fs-input-name').value.trim();
    const phone = q('#fs-input-phone').value.trim();
    const email = q('#fs-input-email').value.trim();
    const address = q('#fs-input-address').value.trim();
    const note = q('#fs-input-note').value.trim();

    let valid = true;

    if (!name) {
      q('#fs-err-name').hidden = false;
      valid = false;
    } else {
      q('#fs-err-name').hidden = true;
    }

    if (!phone) {
      q('#fs-err-phone').hidden = false;
      valid = false;
    } else {
      q('#fs-err-phone').hidden = true;
    }

    if (!email || !email.includes('@')) {
      q('#fs-err-email').hidden = false;
      valid = false;
    } else {
      q('#fs-err-email').hidden = true;
    }

    if (!address) {
      q('#fs-err-address').hidden = false;
      valid = false;
    } else {
      q('#fs-err-address').hidden = true;
    }

    if (!valid) return;

    checkoutData.name = name;
    checkoutData.phone = phone;
    checkoutData.email = email;
    checkoutData.address = address;
    checkoutData.note = note;

    showCheckoutStep(2);
  });

  function renderCheckoutReview() {
    const infoEl = q('#fs-review-shipping-info');
    if (infoEl) {
      infoEl.innerHTML = `
        <strong>${checkoutData.name}</strong> (${checkoutData.phone})<br>
        Email: ${checkoutData.email}<br>
        地址: ${checkoutData.address}
        ${checkoutData.note ? `<br>備註: ${checkoutData.note}` : ''}
      `;
    }

    const itemsEl = q('#fs-review-items-list');
    if (!itemsEl) return;
    itemsEl.replaceChildren();

    let subtotal = 0;
    cart.forEach(item => {
      const p = products.find(x => x.sku === item.sku);
      if (!p) return;
      const t = p.price * item.qty;
      subtotal += t;

      const line = document.createElement('div');
      line.style.display = 'flex';
      line.style.justifyContent = 'space-between';
      line.style.marginBottom = '6px';
      line.innerHTML = `
        <span>${p.name}${item.size ? ` (${item.size})` : ''} × ${item.qty}</span>
        <strong>NT$ ${t.toLocaleString()}</strong>
      `;
      itemsEl.append(line);
    });

    const shipping = subtotal >= 3000 ? 0 : 100;
    const total = subtotal + shipping;

    q('#fs-review-subtotal').textContent = `NT$ ${subtotal.toLocaleString()}`;
    q('#fs-review-shipping').textContent = shipping === 0 ? 'NT$ 0 (免運)' : `NT$ ${shipping}`;
    q('#fs-review-total').textContent = `NT$ ${total.toLocaleString()}`;
  }

  q('#fs-btn-back-to-step1')?.addEventListener('click', () => {
    showCheckoutStep(1);
  });

  // Step 2 Confirm -> Step 3 Order Confirmation
  q('#fs-btn-confirm-order')?.addEventListener('click', () => {
    const subtotal = cart.reduce((sum, item) => {
      const p = products.find(x => x.sku === item.sku);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const shipping = subtotal >= 3000 ? 0 : 100;
    const total = subtotal + shipping;

    // Generate Demo Order ID
    lastOrderId = `FS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    q('#fs-confirm-order-id').textContent = lastOrderId;
    q('#fs-confirm-time').textContent = now;
    q('#fs-confirm-total').textContent = `NT$ ${total.toLocaleString()}`;

    // Clear cart
    cart = [];
    renderCart();

    showCheckoutStep(3);
  });

  q('#fs-btn-finish-checkout')?.addEventListener('click', () => {
    closeCheckout();
  });

  // =========================================================================
  // 8. 16 SHOTS ARTWORK STORYBOARDS
  // =========================================================================
  function renderShotStoryboards() {
    const grid = q('#fs-shot-grid');
    if (!grid) return;
    grid.replaceChildren();

    shots16.forEach(s => {
      const card = document.createElement('div');
      card.className = 'fs-shot-card';
      card.innerHTML = `
        <div class="fs-shot-num">SHOT ${s.num} / 16</div>
        <div class="fs-shot-title">${s.title}</div>
        <div class="fs-shot-desc">${s.desc}</div>
        <span class="fs-shot-status-badge">STORYBOARD SPEC / PENDING ASSET</span>
      `;
      grid.append(card);
    });
  }

  // Initial Boot
  renderCatalog();
  renderCompareMatrix();
  renderCart();
  renderShotStoryboards();
  setLang('zh-TW');

})();
