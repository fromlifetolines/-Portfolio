(() => {
  'use strict';

  // =========================================================================
  // 1. DATA (ISSUES & ARTICLES DEMO)
  // =========================================================================
  const issues = [
    {
      id: 'CS-ISS-001',
      edition: '01',
      year: 2026,
      slug: 'reading-space',
      titleZh: '空間的閱讀方式',
      titleEn: 'Reading Space',
      deckZh: '形式退後，讓行為與尺度浮現。',
      deckEn: 'A journal issue on how space is read through behavior and scale.',
      articleIds: ['CS-ART-001', 'CS-ART-002', 'CS-ART-003']
    },
    {
      id: 'CS-ISS-002',
      edition: '02',
      year: 2026,
      slug: 'matter-time',
      titleZh: '材料與時間',
      titleEn: 'Matter & Time',
      deckZh: '看見表面、使用與時間留下的痕跡。',
      deckEn: 'Surfaces, use, and the marks left by time.',
      articleIds: ['CS-ART-004', 'CS-ART-005', 'CS-ART-006']
    }
  ];

  const articles = [
    {
      id: 'CS-ART-001',
      issueId: 'CS-ISS-001',
      categoryZh: '建築觀點',
      categoryEn: 'Architecture Essay',
      titleZh: '門檻之間',
      titleEn: 'Between Thresholds',
      deckZh: '一棟建築不只由牆、窗與樓層定義。',
      deckEn: 'Architecture is not defined only by walls, windows and floors.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '一棟建築不只由牆、窗與樓層定義。真正改變人在空間裡感受的，往往是走進門的那幾秒。入口的高度、轉角的光線、腳步是否需要放慢，都會改寫訪客對公共與私密的理解。門檻因此不是單純的構造線，而是使用者與空間建立關係的起點。',
        '在本期的概念研究中，我們將門檻視為一組連續的提示。材質的切換可以告訴人們正在進入新的區域；視線的收放則決定是否願意繼續探索。清楚的導覽不必依賴大量標示，但也不能要求訪客憑直覺猜路。好的空間會讓資訊可被看見，同時留下停留與觀察的餘裕。'
      ],
      bodyEn: [
        'Architecture is not defined only by walls, windows and floors. The first few seconds after entry can change how a place is understood. A change in height, a turn toward light, or a pause before the reception area can quietly explain the relationship between public and private space.',
        'In this fictional editorial study, we treat thresholds as a sequence of clues. Shifts in materials signal transitions. Openings and sightlines affect whether visitors feel invited to continue. Wayfinding does not require visual noise, yet it must never force people to guess where they belong.'
      ]
    },
    {
      id: 'CS-ART-002',
      issueId: 'CS-ISS-001',
      categoryZh: '城市觀察',
      categoryEn: 'Urban Observation',
      titleZh: '城市邊界的日常尺度',
      titleEn: 'The Everyday Edge',
      deckZh: '街道的品質無法只靠鳥瞰圖判斷。',
      deckEn: 'The quality of a street cannot be read from an aerial image alone.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '街道的品質無法只靠鳥瞰圖判斷。街角的騎樓深度、雨天能否短暫避雨、等待朋友時是否有可停留的位置，這些看似微小的條件，才是日常生活與建築直接接觸的地方。',
        '我們把「邊界」當成觀察方法：記錄店面退縮、階梯與樹蔭如何影響行人的速度，也比較透明立面與封閉牆面帶來的視線差異。這不是城市調查成果，而是為出版設計建立的一套示範閱讀框架。讀者可透過照片、文字與註解，重新辨認每天經過卻沒有細看的街道。'
      ],
      bodyEn: [
        'The quality of a street cannot be read from an aerial image alone. Shelter from rain, a place to pause, or the depth of a small arcade can shape the daily relationship between buildings and pedestrians.',
        'This fictional editorial framework studies edges rather than landmarks. It asks readers to compare setbacks, shade and transparency, then notice how these conditions affect movement and attention. The purpose is to practice careful looking, not to claim a completed urban field study.'
      ]
    },
    {
      id: 'CS-ART-003',
      issueId: 'CS-ISS-001',
      categoryZh: '空間訪談',
      categoryEn: 'Spatial Dialogue',
      titleZh: '留白是否也是一種導覽',
      titleEn: 'Can Silence Guide?',
      deckZh: '展覽與公共空間常把資訊越放越多，彷彿每一面牆都必須解釋自己的功能。',
      deckEn: 'Exhibition spaces often accumulate information until every wall becomes an instruction.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '展覽與公共空間常把資訊越放越多，彷彿每一面牆都必須解釋自己的功能。然而，人需要的不一定是更多文字。適當的留白，能讓最重要的方向訊息被辨識，也能提供停下來理解內容的節奏。',
        '編輯團隊以概念對話形式提出幾個問題：什麼資訊應該常駐？哪些內容適合放在點擊後才展開？手機導覽和現場標示應如何互補？答案不是移除說明，而是重新安排閱讀順序。導覽系統若能讓第一次使用的人安心移動，就已經完成最基本的工作。'
      ],
      bodyEn: [
        'Exhibition spaces often accumulate information until every wall becomes an instruction. Yet readers and visitors do not always need more text. Deliberate empty space can reveal what matters, and it can make room for a slower moment of attention.',
        'This fictional editorial dialogue asks which messages should remain visible, which can appear on demand, and how a mobile guide should complement physical signage. Clarity is about sequence, not simply about the volume of information.'
      ]
    },
    {
      id: 'CS-ART-004',
      issueId: 'CS-ISS-002',
      categoryZh: '材料研究',
      categoryEn: 'Material Study',
      titleZh: '表面不是最後一道工序',
      titleEn: 'The Surface Is Not an Ending',
      deckZh: '材料常在完工照片裡被定格為一種顏色或紋理，但使用者真正接觸的是更複雜的經驗。',
      deckEn: 'A material is often frozen as a color or texture in completion photographs, while everyday experience is much less stable.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '材料常在完工照片裡被定格為一種顏色或紋理，但使用者真正接觸的是更複雜的經驗。扶手的溫度、地面在濕氣裡的反光、不同光源下的顆粒變化，都會使同一種材料顯現不同表情。',
        '本篇以紙張、石材、金屬與木質材料作為視覺研究對象。所有紋理與場景皆為概念示意，並非經過實驗室測試的性能結果。出版設計將特寫影像、材料註記與大幅留白排列在同一個網格，讓讀者不只看到表面，也看見材料與使用情境的關係。'
      ],
      bodyEn: [
        'A material is often frozen as a color or texture in completion photographs, while everyday experience is much less stable. The warmth of a handrail, reflections after rain, and changes under artificial light give the same surface many different readings.',
        'This fictional visual essay examines paper, stone, metal and timber through editorial compositions. The images and descriptions are conceptual, not laboratory-tested performance claims. Close-up photographs and careful annotations give materials room to be read as part of lived environments.'
      ]
    },
    {
      id: 'CS-ART-005',
      issueId: 'CS-ISS-002',
      categoryZh: '編輯實驗',
      categoryEn: 'Editorial Experiment',
      titleZh: '印刷網格與螢幕呼吸',
      titleEn: 'Grids That Breathe',
      deckZh: '紙本雜誌的跨頁，容許讀者用視線在兩個頁面之間移動；手機卻要求內容在窄長的畫面裡依序出現。',
      deckEn: 'A print spread allows the eye to move across two facing pages.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '紙本雜誌的跨頁，容許讀者用視線在兩個頁面之間移動；手機卻要求內容在窄長的畫面裡依序出現。若把印刷版面直接縮小，字會失去比例，註解也容易擠在圖片旁邊。',
        '我們因此替 CROSS SECTION 建立兩套互相對應的編輯規則。紙本保留強烈的欄線、圖版與大標題；數位閱讀則讓內文維持舒適行長，圖註與延伸資料可以獨立展開。這不是要讓兩種媒介長得一樣，而是確保同一篇文章在不同載體裡仍有自己的閱讀節奏。'
      ],
      bodyEn: [
        'A print spread allows the eye to move across two facing pages. A phone asks the same material to unfold in a narrow sequence. Simply shrinking a print layout makes type fragile and captions difficult to place.',
        'CROSS SECTION therefore uses complementary editorial systems. Print relies on strong grids, image plates and large headings; digital reading keeps comfortable line lengths and gives captions their own space. The two experiences share an identity without becoming identical.'
      ]
    },
    {
      id: 'CS-ART-006',
      issueId: 'CS-ISS-002',
      categoryZh: '文化札記',
      categoryEn: 'Cultural Note',
      titleZh: '保存使用痕跡的理由',
      titleEn: 'Why Traces Matter',
      deckZh: '時間會在空間裡留下使用痕跡：桌面變得光滑的邊角、經常被觸摸的把手、被重新貼上的指示紙條。',
      deckEn: 'Time leaves visible traces in spaces: a polished edge of a shared table, a handle touched thousands of times, or a label carefully replaced.',
      authorZh: 'CROSS SECTION 編輯部（虛構）',
      authorEn: 'CROSS SECTION Editorial (Fictional)',
      bodyZh: [
        '時間會在空間裡留下使用痕跡：桌面變得光滑的邊角、經常被觸摸的把手、被重新貼上的指示紙條。這些細節不一定符合剛完工時的照片，卻說明了人與場所如何長期相處。',
        '文化出版可以替這些細節留下位置。與其把每一段歷史寫成宏大的敘事，不如先把物件、材料與使用者的日常關係記錄清楚。CROSS SECTION 的第二期以此收尾，提醒讀者：建築的價值除了設計完成那一刻，也存在於被使用、被修繕與被重新理解的過程。'
      ],
      bodyEn: [
        'Time leaves visible traces in spaces: a polished edge of a shared table, a handle touched thousands of times, or a label carefully replaced. These details rarely appear in pristine completion photographs, yet they reveal how people and places continue to interact.',
        'Cultural publishing can hold space for these modest records. Rather than turning every detail into a grand narrative, it can document the relationship between objects, surfaces and everyday use. This fictional issue closes with the idea that a building continues to acquire meaning after its original design is finished.'
      ]
    }
  ];

  const shots16 = [
    {
      num: '01',
      slug: 'EDITORIAL_HERO',
      title: 'EDITORIAL PUBLISHER HERO',
      titleZh: '建築文化出版實體雜誌全景',
      desc: '單一高級黑白建築刊物／桌面實體雜誌攝影，展示出版品牌地位。',
      descEn: 'Monochrome architectural journal hero showcase establishing editorial prestige and physical publishing craft.',
      jpg: 'shot-01.jpg',
      png: 'shot-01.png'
    },
    {
      num: '02',
      slug: 'MASTHEAD_SYSTEM',
      title: 'MASTHEAD & LOGOTYPE',
      titleZh: '刊頭字標、網格系統與印刷規格',
      desc: 'CROSS SECTION 字標、網格系統、紙張與印刷標準。',
      descEn: 'CROSS SECTION masthead architecture, baseline grid system, paper selection, and prepress standards.',
      jpg: 'shot-02.jpg',
      png: 'shot-02.png'
    },
    {
      num: '03',
      slug: 'ISSUE_01_COVER',
      title: 'ISSUE 01 COVER',
      titleZh: 'Issue 01《空間的閱讀方式》獨立封面',
      desc: '《空間的閱讀方式 / Reading Space》第一期獨立 A4 封面完稿與 16:9 展示圖。',
      descEn: 'Issue 01 "Reading Space" independent A4 portrait cover artwork and 16:9 editorial presentation.',
      jpg: 'shot-03.jpg',
      png: 'shot-03.png'
    },
    {
      num: '04',
      slug: 'ISSUE_02_COVER',
      title: 'ISSUE 02 COVER',
      titleZh: 'Issue 02《材料與時間》獨立封面',
      desc: '《材料與時間 / Matter & Time》第二期獨立 A4 封面完稿與 16:9 展示圖。',
      descEn: 'Issue 02 "Matter & Time" independent A4 portrait cover artwork and 16:9 editorial presentation.',
      jpg: 'shot-04.jpg',
      png: 'shot-04.png'
    },
    {
      num: '05',
      slug: 'COVER_FAMILY',
      title: 'COVER FAMILY DISPLAY',
      titleZh: '雙期系列封面實體疊放與書脊質感',
      desc: '兩期刊物實體疊放、書脊與裝幀質感。',
      descEn: 'Dual-issue editorial stack highlighting spine typography, paper weight, and binding craftsmanship.',
      jpg: 'shot-05.jpg',
      png: 'shot-05.png'
    },
    {
      num: '06',
      slug: 'EDITORIAL_PHOTOGRAPHY',
      title: 'ARCHITECTURAL EDITORIAL PHOTO',
      titleZh: '空間細節攝影與圖說層級展示',
      desc: '真實感空間細節攝影與圖說層級展示。',
      descEn: 'High-contrast spatial detail photography integrated with structured caption hierarchies.',
      jpg: 'shot-06.jpg',
      png: 'shot-06.png'
    },
    {
      num: '07',
      slug: 'PRINT_SPREAD',
      title: 'LONGFORM PRINT SPREAD',
      titleZh: '專題長文跨頁排版與瑞士網格',
      desc: '專題跨頁之真實編輯排版與瑞士網格排版。',
      descEn: 'Longform editorial spread utilizing asymmetric Swiss grid alignment and bilingual typographic balance.',
      jpg: 'shot-07.jpg',
      png: 'shot-07.png'
    },
    {
      num: '08',
      slug: 'MATERIALS_ESSAY',
      title: 'MATERIALS PHOTO ESSAY',
      titleZh: '材質微距攝影專題：石、木、金屬與紙',
      desc: '石材、木材、金屬與紙張材質微距影像專題。',
      descEn: 'Material texture photographic essay exploring tactile stone, timber, metal, and uncoated paper.',
      jpg: 'shot-08.jpg',
      png: 'shot-08.png'
    },
    {
      num: '09',
      slug: 'DIGITAL_INDEX',
      title: 'DIGITAL ISSUE INDEX',
      titleZh: '線上期刊目錄與期數檢索介面',
      desc: '線上期數檢索、目錄與摘要切換真實 UI。',
      descEn: 'Digital journal index facilitating issue selection, table of contents navigation, and executive abstracts.',
      jpg: 'shot-09.jpg',
      png: 'shot-09.png'
    },
    {
      num: '10',
      slug: 'TOPIC_DISCOVERY',
      title: 'TOPIC & ARTICLE DISCOVERY',
      titleZh: '文章檢索、主題標籤與即時篩選',
      desc: '主題標籤與六篇文章即時搜尋與空狀態介面。',
      descEn: 'Article discovery interface with tag filtering, real-time keyword search, and graceful empty states.',
      jpg: 'shot-10.jpg',
      png: 'shot-10.png'
    },
    {
      num: '11',
      slug: 'DESKTOP_READER',
      title: 'ARTICLE READER DESKTOP',
      titleZh: '桌面端長文沉浸閱讀介面',
      desc: '長文閱讀介面、章節進度、圖註與字級縮放。',
      descEn: 'Focused desktop reading experience with progress indicator, dynamic font sizing, and footnote overlays.',
      jpg: 'shot-11.jpg',
      png: 'shot-11.png'
    },
    {
      num: '12',
      slug: 'BOOKMARKS_SYSTEM',
      title: 'ARTICLE BOOKMARKS',
      titleZh: '專文收藏抽屜與本機儲存管理',
      desc: '文章收藏管理、即時計數與無收藏狀態。',
      descEn: 'Slide-over bookmarks drawer managing saved articles with instant badge counters and local persistence.',
      jpg: 'shot-12.jpg',
      png: 'shot-12.png'
    },
    {
      num: '13',
      slug: 'MOBILE_READER',
      title: 'MOBILE READER',
      titleZh: '行動端 390px 舒適排版與導覽',
      desc: '390px 手機長篇閱讀舒適行長與目錄導航。',
      descEn: 'Mobile-first 390px responsive reader optimizing typographic measure and chapter navigation.',
      jpg: 'shot-13.jpg',
      png: 'shot-13.png'
    },
    {
      num: '14',
      slug: 'BILINGUAL_UX',
      title: 'BILINGUAL EDITION UX',
      titleZh: '雙語對照排版與多語系切換',
      desc: '繁體中文與英文對應排版與字體密度展示。',
      descEn: 'Bilingual typography matrix harmonizing Traditional Chinese serif weights with Latin grotesque metrics.',
      jpg: 'shot-14.jpg',
      png: 'shot-14.png'
    },
    {
      num: '15',
      slug: 'DESIGN_SYSTEM',
      title: 'EDITORIAL DESIGN SYSTEM',
      titleZh: '出版設計系統、無障礙與列印樣式',
      desc: '字體網格、頁碼索引、鍵盤焦點與印刷 CSS。',
      descEn: 'Editorial token architecture, focus rings, WCAG accessibility semantics, and print stylesheet rules.',
      jpg: 'shot-15.jpg',
      png: 'shot-15.png'
    },
    {
      num: '16',
      slug: 'FINALE',
      title: 'ISSUE COLLECTION FINALE',
      titleZh: '建築文化出版與數位閱讀系統總成',
      desc: '兩期刊物全景與數位閱讀系統總成。',
      descEn: 'Complete retrospective of the CROSS SECTION physical publication and digital reading platform.',
      jpg: 'shot-16.jpg',
      png: 'shot-16.png'
    }
  ];

  // State
  let lang = 'zh-TW';
  let currentIssueId = 'CS-ISS-001';
  let currentTopic = 'all';
  let searchQuery = '';
  let activeArticleId = 'CS-ART-001';
  let bookmarks = []; // Array of article IDs

  // Lightbox State & Elements
  let activeLightboxIndex = 0;
  let currentLoadToken = 0;
  const preloadedMasterMap = new Map();
  let lastFocusedElement = null;

  const q = (s) => document.querySelector(s);
  const all = (s) => [...document.querySelectorAll(s)];

  const lightbox = q('#cs-lightbox');
  const lbImg = q('#cs-lb-img');
  const lbCaption = q('#cs-lb-caption');
  const lbCloseBtn = q('#cs-lb-close');
  const lbPrevBtn = q('#cs-lb-prev');
  const lbNextBtn = q('#cs-lb-next');

  // Load bookmarks from localStorage if available
  try {
    const saved = localStorage.getItem('cs_bookmarks');
    if (saved) bookmarks = JSON.parse(saved);
  } catch (e) {}

  // =========================================================================
  // 2. LANGUAGE TOGGLE
  // =========================================================================
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'zh-TW';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    all('.cs-zh').forEach(n => n.hidden = lang === 'en');
    all('.cs-en').forEach(n => n.hidden = lang !== 'en');
    all('[data-lang]').forEach(n => n.setAttribute('aria-pressed', String(n.dataset.lang === lang)));

    renderIssueOverview();
    renderArticlesGrid();
    renderBookmarks();
    renderShotStoryboards();

    if (lightbox && !lightbox.hidden) {
      updateLightboxCaption();
    }

    // If reader is open, update its content
    if (!q('#cs-reader-modal')?.hidden) {
      populateReader(activeArticleId);
    }
  }

  all('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Font size toggle
  function setFontSize(size) {
    const validSizes = ['sm', 'md', 'lg'];
    const currentSize = validSizes.includes(size) ? size : 'md';
    all('[data-font]').forEach(btn => {
      const isCur = btn.dataset.font === currentSize;
      btn.classList.toggle('active', isCur);
      btn.setAttribute('aria-pressed', String(isCur));
    });
    document.body.classList.remove('font-sm', 'font-lg');
    if (currentSize === 'sm') document.body.classList.add('font-sm');
    if (currentSize === 'lg') document.body.classList.add('font-lg');
    try {
      localStorage.setItem('cs_font_size', currentSize);
    } catch (e) {}
  }

  all('[data-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      setFontSize(btn.dataset.font);
    });
  });

  // Restore font size from storage
  let savedFontSize = 'md';
  try {
    savedFontSize = localStorage.getItem('cs_font_size') || 'md';
  } catch (e) {}
  setFontSize(savedFontSize);

  // =========================================================================
  // 3. ISSUE ARCHIVE & TOC (#cs-issues)
  // =========================================================================
  function renderIssueOverview() {
    const curIssue = issues.find(i => i.id === currentIssueId) || issues[0];
    const badge = q('#cs-issue-badge');
    const title = q('#cs-issue-title');
    const deck = q('#cs-issue-deck');
    const toc = q('#cs-issue-articles-toc');

    if (badge) badge.textContent = `EDITION ${curIssue.edition} / ${curIssue.year}`;
    if (title) title.textContent = lang === 'en' ? curIssue.titleEn : curIssue.titleZh;
    if (deck) deck.textContent = lang === 'en' ? curIssue.deckEn : curIssue.deckZh;

    if (toc) {
      toc.replaceChildren();
      const issueArts = articles.filter(a => curIssue.articleIds.includes(a.id));

      const list = document.createElement('div');
      list.style.display = 'grid';
      list.style.gap = '14px';

      issueArts.forEach((a, idx) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.justifyContent = 'space-between';
        row.style.padding = '12px 16px';
        row.style.background = '#F9F8F5';
        row.style.border = '1px solid var(--cs-border)';
        row.style.borderRadius = '2px';

        const left = document.createElement('div');
        left.innerHTML = `
          <span style="font-family:var(--cs-font-mono); font-size:0.75rem; color:var(--cs-red); font-weight:700; margin-right:8px;">ART 0${idx + 1}</span>
          <strong style="font-family:var(--cs-font-serif); font-size:1.05rem;">${lang === 'en' ? a.titleEn : a.titleZh}</strong>
          <span style="font-size:0.8rem; color:var(--cs-gray); margin-left:8px;">(${lang === 'en' ? a.categoryEn : a.categoryZh})</span>
        `;

        const readBtn = document.createElement('button');
        readBtn.type = 'button';
        readBtn.className = 'cs-btn-sm cs-btn-dark';
        readBtn.textContent = lang === 'en' ? 'Read Essay ↗' : '閱讀專文 ↗';
        readBtn.addEventListener('click', () => openReader(a.id));

        row.append(left, readBtn);
        list.append(row);
      });

      toc.append(list);
    }
  }

  all('.cs-issue-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      all('.cs-issue-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentIssueId = btn.dataset.issueId;
      renderIssueOverview();
    });
  });

  // =========================================================================
  // 4. ARTICLES SEARCH & TOPIC DISCOVERY (#cs-articles, #cs-topics)
  // =========================================================================
  function getFilteredArticles() {
    let list = [...articles];

    // Topic filter
    if (currentTopic !== 'all') {
      list = list.filter(a => a.categoryEn.toLowerCase() === currentTopic.toLowerCase());
    }

    // Search keyword
    if (searchQuery.trim()) {
      const kw = searchQuery.toLowerCase().trim();
      list = list.filter(a => {
        return (
          a.id.toLowerCase().includes(kw) ||
          a.titleZh.toLowerCase().includes(kw) ||
          a.titleEn.toLowerCase().includes(kw) ||
          a.deckZh.toLowerCase().includes(kw) ||
          a.deckEn.toLowerCase().includes(kw) ||
          a.categoryZh.toLowerCase().includes(kw) ||
          a.categoryEn.toLowerCase().includes(kw) ||
          a.bodyZh.some(p => p.toLowerCase().includes(kw)) ||
          a.bodyEn.some(p => p.toLowerCase().includes(kw))
        );
      });
    }

    return list;
  }

  function renderArticlesGrid() {
    const grid = q('#cs-articles-grid');
    if (!grid) return;
    grid.replaceChildren();

    const filtered = getFilteredArticles();
    const countEl = q('#cs-articles-count');
    const resetBtn = q('#cs-reset-search');

    if (countEl) {
      countEl.textContent = lang === 'en'
        ? `Showing ${filtered.length} essays`
        : `顯示 ${filtered.length} 篇專文`;
    }

    if (resetBtn) {
      resetBtn.hidden = (currentTopic === 'all' && !searchQuery.trim());
    }

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'cs-empty-state';
      empty.innerHTML = `
        <h3 style="font-family:var(--cs-font-serif); font-size:1.35rem; margin:0 0 8px;">
          ${lang === 'en' ? 'No essays found' : '查無符合條件的專文'}
        </h3>
        <p style="color:var(--cs-gray); font-size:0.9rem; margin:0 0 16px;">
          ${lang === 'en' ? 'Try adjusting your search terms or clearing the topic filter.' : '請嘗試更換關鍵字或點擊清除篩選條件。'}
        </p>
        <button type="button" class="cs-btn-sm cs-btn-dark" id="cs-btn-empty-reset">
          ${lang === 'en' ? 'Reset Search & Filters' : '重設搜尋條件'}
        </button>
      `;
      grid.append(empty);
      q('#cs-btn-empty-reset')?.addEventListener('click', resetSearch);
      return;
    }

    filtered.forEach(a => {
      const card = document.createElement('article');
      card.className = 'cs-art-card';
      card.dataset.id = a.id;

      const cat = document.createElement('div');
      cat.className = 'cs-art-card-cat';
      cat.textContent = lang === 'en' ? a.categoryEn : a.categoryZh;

      const title = document.createElement('h3');
      title.className = 'cs-art-card-title';
      title.textContent = lang === 'en' ? a.titleEn : a.titleZh;

      const excerpt = document.createElement('p');
      excerpt.className = 'cs-art-card-excerpt';
      excerpt.textContent = lang === 'en' ? a.deckEn : a.deckZh;

      const meta = document.createElement('div');
      meta.className = 'cs-art-card-meta';
      meta.innerHTML = `
        <span>${a.issueId}</span>
        <span>~3 MIN READ</span>
      `;

      const actions = document.createElement('div');
      actions.className = 'cs-art-card-actions';

      const readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.className = 'cs-btn-sm cs-btn-dark';
      readBtn.style.flex = '1';
      readBtn.textContent = lang === 'en' ? 'Read Article ↗' : '閱讀專文 ↗';
      readBtn.addEventListener('click', () => openReader(a.id));

      const isBookmarked = bookmarks.includes(a.id);
      const bkmBtn = document.createElement('button');
      bkmBtn.type = 'button';
      bkmBtn.className = 'cs-btn-sm cs-btn-outline';
      bkmBtn.textContent = isBookmarked ? '✓' : '🔖';
      bkmBtn.setAttribute('aria-label', isBookmarked ? '已收藏' : '加入收藏');
      bkmBtn.addEventListener('click', () => toggleBookmark(a.id));

      actions.append(readBtn, bkmBtn);

      card.append(cat, title, excerpt, meta, actions);
      grid.append(card);
    });
  }

  function resetSearch() {
    currentTopic = 'all';
    searchQuery = '';
    if (q('#cs-search-input')) q('#cs-search-input').value = '';
    all('.cs-topic-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.topic === 'all'));
    renderArticlesGrid();
  }

  q('#cs-reset-search')?.addEventListener('click', resetSearch);

  q('#cs-search-input')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderArticlesGrid();
  });

  all('.cs-topic-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      all('.cs-topic-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTopic = btn.dataset.topic;
      renderArticlesGrid();
    });
  });

  // =========================================================================
  // 5. ARTICLE READER MODAL (#cs-reader)
  // =========================================================================
  function populateReader(id) {
    const a = articles.find(x => x.id === id);
    if (!a) return;
    activeArticleId = id;

    const catEl = q('#cs-reader-category');
    const titleEl = q('#cs-reader-title');
    const deckEl = q('#cs-reader-deck');
    const authorEl = q('#cs-reader-author');
    const issueEl = q('#cs-reader-issue');
    const bodyEl = q('#cs-reader-body');
    const bkmBtn = q('#cs-btn-reader-bookmark');

    if (catEl) catEl.textContent = lang === 'en' ? a.categoryEn : a.categoryZh;
    if (titleEl) titleEl.textContent = lang === 'en' ? a.titleEn : a.titleZh;
    if (deckEl) deckEl.textContent = lang === 'en' ? a.deckEn : a.deckZh;
    if (authorEl) {
      authorEl.textContent = lang === 'en'
        ? 'CROSS SECTION Editorial (Editorial concept)'
        : 'CROSS SECTION 編輯部（編輯企劃署名）';
    }
    if (issueEl) issueEl.textContent = `${a.issueId} (2026)`;

    if (bkmBtn) {
      const isBookmarked = bookmarks.includes(id);
      bkmBtn.textContent = isBookmarked
        ? (lang === 'en' ? '✓ Saved in Bookmarks' : '✓ 已在收藏清單中')
        : (lang === 'en' ? '🔖 Save to Bookmarks' : '🔖 收藏本文');
    }

    if (bodyEl) {
      bodyEl.replaceChildren();
      const paras = lang === 'en' ? a.bodyEn : a.bodyZh;
      paras.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        bodyEl.append(p);
      });
    }

    // Prev / Next button state
    const curIdx = articles.findIndex(x => x.id === id);
    const prevBtn = q('#cs-btn-prev-article');
    const nextBtn = q('#cs-btn-next-article');

    if (prevBtn) {
      prevBtn.disabled = curIdx === 0;
      prevBtn.style.opacity = curIdx === 0 ? '0.4' : '1';
    }
    if (nextBtn) {
      nextBtn.disabled = curIdx === articles.length - 1;
      nextBtn.style.opacity = curIdx === articles.length - 1 ? '0.4' : '1';
    }

    // Scroll reader modal to top
    const modal = q('.cs-reader-modal');
    if (modal) modal.scrollTop = 0;
  }

  function openReader(id) {
    populateReader(id);
    const modal = q('#cs-reader-modal');
    if (modal) modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeReader() {
    const modal = q('#cs-reader-modal');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  q('#cs-reader-close')?.addEventListener('click', closeReader);
  q('#cs-reader-modal')?.addEventListener('click', (e) => {
    if (e.target === q('#cs-reader-modal')) closeReader();
  });

  q('#cs-btn-prev-article')?.addEventListener('click', () => {
    const curIdx = articles.findIndex(x => x.id === activeArticleId);
    if (curIdx > 0) {
      populateReader(articles[curIdx - 1].id);
    }
  });

  q('#cs-btn-next-article')?.addEventListener('click', () => {
    const curIdx = articles.findIndex(x => x.id === activeArticleId);
    if (curIdx < articles.length - 1) {
      populateReader(articles[curIdx + 1].id);
    }
  });

  q('#cs-btn-reader-bookmark')?.addEventListener('click', () => {
    toggleBookmark(activeArticleId);
    populateReader(activeArticleId);
  });

  // =========================================================================
  // 6. BOOKMARKS SYSTEM (#cs-bookmarks)
  // =========================================================================
  function toggleBookmark(id) {
    if (bookmarks.includes(id)) {
      bookmarks = bookmarks.filter(x => x !== id);
    } else {
      bookmarks.push(id);
    }

    try {
      localStorage.setItem('cs_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {}

    renderBookmarks();
    renderArticlesGrid();
  }

  function renderBookmarks() {
    const countEl = q('#cs-bookmarks-count');
    if (countEl) countEl.textContent = bookmarks.length;

    const list = q('#cs-bookmarks-list');
    if (!list) return;
    list.replaceChildren();

    if (bookmarks.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:50px 20px; color:var(--cs-gray);">
          <div style="font-size:2rem; margin-bottom:8px;">🔖</div>
          <p>${lang === 'en' ? 'No saved essays yet.' : '尚未收藏任何專文。'}</p>
        </div>
      `;
      return;
    }

    bookmarks.forEach(id => {
      const a = articles.find(x => x.id === id);
      if (!a) return;

      const item = document.createElement('div');
      item.className = 'cs-bookmark-item';

      const title = document.createElement('strong');
      title.style.fontFamily = 'var(--cs-font-serif)';
      title.style.fontSize = '1.05rem';
      title.textContent = lang === 'en' ? a.titleEn : a.titleZh;

      const cat = document.createElement('small');
      cat.style.color = 'var(--cs-red)';
      cat.style.fontFamily = 'var(--cs-font-mono)';
      cat.textContent = `${a.id} · ${lang === 'en' ? a.categoryEn : a.categoryZh}`;

      const btns = document.createElement('div');
      btns.style.display = 'flex';
      btns.style.gap = '8px';
      btns.style.marginTop = '8px';

      const readBtn = document.createElement('button');
      readBtn.type = 'button';
      readBtn.className = 'cs-btn-sm cs-btn-dark';
      readBtn.textContent = lang === 'en' ? 'Read ↗' : '閱讀 ↗';
      readBtn.addEventListener('click', () => {
        closeBookmarks();
        openReader(a.id);
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'cs-btn-sm cs-btn-outline';
      delBtn.textContent = lang === 'en' ? 'Remove' : '移除';
      delBtn.addEventListener('click', () => toggleBookmark(a.id));

      btns.append(readBtn, delBtn);
      item.append(cat, title, btns);
      list.append(item);
    });
  }

  function openBookmarks() {
    const drawer = q('#cs-bookmarks-drawer');
    if (drawer) drawer.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeBookmarks() {
    const drawer = q('#cs-bookmarks-drawer');
    if (drawer) drawer.hidden = true;
    document.body.style.overflow = '';
  }

  q('#cs-bookmarks-toggle')?.addEventListener('click', openBookmarks);
  q('#cs-bookmarks-close')?.addEventListener('click', closeBookmarks);
  q('#cs-bookmarks-drawer')?.addEventListener('click', (e) => {
    if (e.target === q('#cs-bookmarks-drawer')) closeBookmarks();
  });

  q('#cs-btn-clear-bookmarks')?.addEventListener('click', () => {
    bookmarks = [];
    try {
      localStorage.setItem('cs_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {}
    renderBookmarks();
    renderArticlesGrid();
  });

  // =========================================================================
  // 7. 16 SHOTS STORYBOARD EXHIBITION & LIGHTBOX (#cs-artwork)
  // =========================================================================
  function renderShotStoryboards() {
    const grid = q('#cs-shot-grid');
    if (!grid) return;
    grid.replaceChildren();

    shots16.forEach((s, idx) => {
      const card = document.createElement('article');
      card.className = 'cs-shot-card';
      card.setAttribute('data-shot-index', idx);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `檢視 PLATE ${s.num}: ${lang === 'en' ? s.title : s.titleZh}`);

      card.innerHTML = `
        <div class="cs-shot-media-wrap">
          <img class="cs-shot-thumb"
               src="assets/mockups/${s.jpg}"
               alt="PLATE ${s.num}: ${s.title}"
               loading="${idx === 0 ? 'eager' : 'lazy'}"
               width="1920"
               height="1080">
          <div class="cs-shot-badge-overlay">
            <span class="cs-shot-tag">PLATE ${s.num}</span>
            <span class="cs-shot-zoom-hint" aria-hidden="true">⤢ 2560×1440</span>
          </div>
        </div>
        <div class="cs-shot-meta">
          <div class="cs-shot-num">PLATE ${s.num} / 16</div>
          <h3 class="cs-shot-title cs-zh">${s.titleZh}</h3>
          <h3 class="cs-shot-title cs-en" hidden>${s.title}</h3>
          <p class="cs-shot-desc cs-zh">${s.desc}</p>
          <p class="cs-shot-desc cs-en" hidden>${s.descEn}</p>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });

      grid.append(card);
    });

    all('#cs-shot-grid .cs-zh').forEach(n => n.hidden = lang === 'en');
    all('#cs-shot-grid .cs-en').forEach(n => n.hidden = lang !== 'en');
  }

  function updateLightboxCaption(isMasterLoaded) {
    if (!lbCaption) return;
    const shot = shots16[activeLightboxIndex];
    if (!shot) return;
    const isEn = lang === 'en';

    if (typeof isMasterLoaded === 'undefined') {
      const masterSrc = `assets/shots/${shot.png}`;
      isMasterLoaded = preloadedMasterMap.has(masterSrc);
    }

    const resLabel = isMasterLoaded
      ? 'MASTER PNG 2560 × 1440 CANVAS'
      : (isEn ? '2560 × 1440 CANVAS (UPGRADING...)' : '2560 × 1440 畫布 (載入原寸高解析中...)');

    lbCaption.innerHTML = `
      <div class="cs-lb-header">
        <span class="cs-lb-tag">PLATE ${shot.num} / 16 · ${shot.slug}</span>
        <span class="cs-lb-res">${resLabel}</span>
      </div>
      <div class="cs-lb-title">${isEn ? shot.title : shot.titleZh}</div>
      <div class="cs-lb-desc">${isEn ? shot.descEn : shot.desc}</div>
    `;
  }

  function renderLightboxImage() {
    if (!lightbox || !lbImg) return;
    const shot = shots16[activeLightboxIndex];
    if (!shot) return;

    const token = ++currentLoadToken;
    const masterSrc = `assets/shots/${shot.png}`;
    const previewSrc = `assets/mockups/${shot.jpg}`;

    if (preloadedMasterMap.has(masterSrc)) {
      lbImg.src = masterSrc;
      lbImg.alt = `PLATE ${shot.num}: ${shot.title}`;
      lbImg.classList.remove('is-upgrading');
      updateLightboxCaption(true);
    } else {
      lbImg.src = previewSrc;
      lbImg.alt = `PLATE ${shot.num}: ${shot.title}`;
      lbImg.classList.add('is-upgrading');
      updateLightboxCaption(false);

      const master = new Image();
      master.src = masterSrc;
      master.onload = () => {
        preloadedMasterMap.set(masterSrc, true);
        if (token === currentLoadToken) {
          lbImg.src = masterSrc;
          lbImg.classList.remove('is-upgrading');
          updateLightboxCaption(true);
        }
      };
    }

    preloadAdjacentShots(activeLightboxIndex);
  }

  function preloadAdjacentShots(index) {
    const nextIdx = (index + 1) % shots16.length;
    const prevIdx = (index + shots16.length - 1) % shots16.length;

    const nextJpg = new Image();
    nextJpg.src = `assets/mockups/${shots16[nextIdx].jpg}`;

    const prevJpg = new Image();
    prevJpg.src = `assets/mockups/${shots16[prevIdx].jpg}`;

    const nextPngSrc = `assets/shots/${shots16[nextIdx].png}`;
    if (!preloadedMasterMap.has(nextPngSrc)) {
      const nextPng = new Image();
      nextPng.src = nextPngSrc;
      nextPng.onload = () => preloadedMasterMap.set(nextPngSrc, true);
    }
  }

  function openLightbox(index) {
    if (!lightbox || !lbImg) return;
    lastFocusedElement = document.activeElement;
    activeLightboxIndex = (index + shots16.length) % shots16.length;

    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    renderLightboxImage();

    if (lbCloseBtn) lbCloseBtn.focus();
  }

  function prevLightbox() {
    activeLightboxIndex = (activeLightboxIndex - 1 + shots16.length) % shots16.length;
    renderLightboxImage();
  }

  function nextLightbox() {
    activeLightboxIndex = (activeLightboxIndex + 1) % shots16.length;
    renderLightboxImage();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    if (lbImg) {
      lbImg.src = '';
      lbImg.classList.remove('is-upgrading');
    }
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function initLightboxListeners() {
    if (!lightbox) return;

    if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
    if (lbPrevBtn) lbPrevBtn.addEventListener('click', prevLightbox);
    if (lbNextBtn) lbNextBtn.addEventListener('click', nextLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('cs-lightbox-stage')) {
        closeLightbox();
      }
    });

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

    let touchStartX = 0;
    let touchStartY = 0;
    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          if (deltaX < 0) {
            nextLightbox();
          } else {
            prevLightbox();
          }
        }
      }
    }, { passive: true });
  }

  // Initial Boot
  renderIssueOverview();
  renderArticlesGrid();
  renderBookmarks();
  renderShotStoryboards();
  initLightboxListeners();
  setLang('zh-TW');

})();
