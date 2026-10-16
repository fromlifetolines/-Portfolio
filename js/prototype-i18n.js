/**
 * HOWARD PORTFOLIO — BILINGUAL I18N SYSTEM
 * Supported Languages:
 *   - en: English (Default)
 *   - zh-TW: Traditional Chinese (Taiwan)
 * 
 * Persistence Key: 'howard-portfolio-lang'
 * Preserves all GSAP / ScrollTrigger / Three.js node references
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'howard-portfolio-lang';
  const DEFAULT_LANG = 'en';

  const TRANSLATIONS = {
    'en': {
      meta: {
        homeTitle: 'Howard Huang — Creative Strategist & Visual Design Director',
        homeDesc: 'Howard Huang: Creative Strategist, Visual Design Director and Digital Product Builder. Designing visual identities, digital products and connected experiences.',
        aboutTitle: 'About Howard Huang — Creative Strategist & Visual Design Director',
        aboutDesc: 'Biography and creative practice of Howard Huang: Creative Strategist, Visual Design Director, and Digital Product Builder with 10+ years across design, advertising, and digital experience.'
      },
      nav: {
        work: 'WORK',
        menuToggle: 'Toggle Navigation Menu',
        home: 'HOME',
        navWork: 'WORK',
        navAbout: 'ABOUT',
        navHelmets: 'HALL OF FAME',
        tagline: '10+ YEARS CREATIVE DIRECTION & DIGITAL SYSTEMS',
        contact: 'CONTACT',
        langLabel: 'LANGUAGE:'
      },
      hero: {
        mobileRole: 'CREATIVE STRATEGIST & VISUAL DESIGN DIRECTOR',
        role1: 'CREATIVE STRATEGIST',
        role2: 'VISUAL DESIGN DIRECTOR',
        role3: 'DIGITAL PRODUCT BUILDER',
        exp: '10+ YEARS EXPERIENCE',
        featuredProject: 'FEATURED PROJECT',
        selfInitiated: 'SELF-INITIATED PRODUCT<br/>2026',
        scrollEnter: 'SCROLL TO ENTER',
        imgAlt: 'Howard Huang — Seated Identity Cutout'
      },
      message: {
        emblemText: 'CREATIVE STRATEGIST · VISUAL DESIGN DIRECTOR',
        line1: 'DESIGNING <span class="c-lime-serif">VISUAL IDENTITIES</span>,',
        line2: 'DIGITAL PRODUCTS AND',
        line3: '<span class="c-lime-serif">CONNECTED EXPERIENCES</span>',
        line4: 'ACROSS BRAND, ADVERTISING',
        line5: 'AND <span class="c-lime-serif">TECHNOLOGY</span>.'
      },
      editorial: {
        captionFltl: 'FLTL NFC · FLAGSHIP OBJECT',
        captionPackaging: 'TACTILE PACKAGING · 2026',
        quote: 'It doesn’t matter <span class="quote-serif">where</span> you start, it’s <span class="quote-serif">how</span> you craft the systems that endure.',
        captionMacro: 'EMBEDDED ANTENNA ARCHITECTURE · 2026',
        altFltl: 'FLTL NFC Smart Business Card Hero',
        altPackaging: 'FLTL NFC Tactile Packaging',
        altMacro: 'FLTL NFC Micro Antenna Architecture'
      },
      rail: {
        aria: 'Howard and FLTL NFC horizontal visual journey',
        label: 'SCROLL TO EXPLORE',
        kicker3: '03 / CONNECTION',
        kicker4: '04 / FLAGSHIP',
        ghostDesign: 'DESIGN',
        ghostConnect: 'CONNECT',
        heading1: 'THE PERSON BEHIND THE WORK.',
        desc1: 'Visual direction, product thinking and digital craft.',
        heading2: 'ONE IDEA. TWO WORLDS.',
        desc2: 'A physical card connected to a digital identity.',
        heading3: 'MAKE THE CONNECTION.',
        desc3: 'Bring the card close to a compatible NFC smartphone.',
        heading4: 'DESIGNED TO BE HELD.',
        desc4: 'FLTL NFC Smart Business Card · 2026',
        explore: 'EXPLORE THE OBJECT ↗',
        altHoward: 'Howard Huang — Side-profile portrait',
        altPhysical: 'FLTL physical and digital product experience',
        altTap: 'FLTL NFC interaction near smartphone',
        altPackage: 'FLTL NFC premium tri-fold package'
      },
      finale: {
        imageAlt: 'Howard Huang — Full-length professional portrait',
        eyebrow: 'THE PERSON BEHIND THE WORK',
        heading: 'THE NEXT CHAPTER IS BEING BUILT.',
        about: 'ABOUT HOWARD ↗',
        contact: 'GET IN TOUCH ↗'
      },
      portals: {
        workEyebrow: 'FEATURED',
        workTitle: 'WORK',
        workOverlay: 'Work',
        workDesc: 'FLTL NFC smart business card system bridging physical touchpoints and instant digital transmission.',
        workBtnTitle: 'View Featured Work',
        aboutEyebrow: 'ABOUT',
        aboutTitle: 'HOWARD',
        aboutDesc: 'Creative Strategist, Visual Design Director & Digital Product Builder with 10+ years across design and digital experience.',
        aboutBtnTitle: 'About Howard Huang',
        altHowardFront: 'Howard Huang — Standing Front Crop',
        altHowardSide: 'Howard Huang — Standing Side Profile Crop'
      },
      helmets: {
        titleMain: 'FLAGSHIP OBJECT',
        titleSub: 'HALL OF FAME',
        desc: 'Self-initiated NFC smart business card system engineered with genuine NXP NTAG216 high-frequency chip (888 bytes, 32-bit password protection), standard 85.6 × 54 × 0.76 mm matte black PVC card body, and NFC-enabled digital profile access on compatible phones.',
        canvasAria: 'Interactive 3D FLTL NFC Smart Business Card',
        btnFlip: 'FLIP 180°',
        btnFlipTitle: 'Flip Card 180°',
        dragHint: 'DRAG TO INSPECT 3D OBJECT',
        revealCue: 'HOVER TO REVEAL THE OBJECT',
        metaTitle: 'Open FLTL NFC Case Study',
        calloutPrompt: 'Explore complete FLTL NFC engineering case study and live official product specification',
        btnCase: 'VIEW FLTL NFC CASE →',
        btnStore: 'OFFICIAL PRODUCT SITE ↗'
      },
      socials: {
        titleMain: 'WHAT’S NEXT',
        titleSerif: 'ON PRACTICE',
        intro: 'CONNECT WITH HOWARD HUANG',
        email: 'EMAIL'
      },
      footer: {
        marqueeHtml: '<span class="marquee-item">HOWARD HUANG</span><span class="marquee-dot">•</span><span class="marquee-item">FLTL NFC</span><span class="marquee-dot">•</span><span class="marquee-item">CREATIVE STRATEGIST</span><span class="marquee-dot">•</span><span class="marquee-item">VISUAL DESIGN DIRECTOR</span><span class="marquee-dot">•</span><span class="marquee-item">DIGITAL PRODUCT BUILDER</span><span class="marquee-dot">•</span><span class="marquee-item">10+ YEARS EXPERIENCE</span><span class="marquee-dot">•</span><span class="marquee-item">HOWARD HUANG</span><span class="marquee-dot">•</span><span class="marquee-item">FLTL NFC</span><span class="marquee-dot">•</span><span class="marquee-item">CREATIVE STRATEGIST</span><span class="marquee-dot">•</span><span class="marquee-item">VISUAL DESIGN DIRECTOR</span><span class="marquee-dot">•</span><span class="marquee-item">DIGITAL PRODUCT BUILDER</span><span class="marquee-dot">•</span><span class="marquee-item">10+ YEARS EXPERIENCE</span><span class="marquee-dot">•</span>',
        marquee: 'HOWARD HUANG • FLTL NFC • CREATIVE STRATEGIST • VISUAL DESIGN DIRECTOR • DIGITAL PRODUCT BUILDER • 10+ YEARS EXPERIENCE • HOWARD HUANG • FLTL NFC • CREATIVE STRATEGIST • VISUAL DESIGN DIRECTOR • DIGITAL PRODUCT BUILDER • 10+ YEARS EXPERIENCE',
        pages: 'PAGES',
        home: 'Home',
        work: 'Work',
        about: 'About Howard',
        helmets: 'Hall of Fame',
        featuredCase: 'FEATURED CASE',
        fltlCase: 'FLTL NFC Smart Business Card (2026)',
        islandCase: '島序 ISLAND INDEX — Tea Atlas (2026)',
        officialStore: 'Official FLTL Store ↗',
        contactHeader: 'DIRECT CONTACT',
        linkedin: 'LinkedIn Profile',
        github: 'GitHub Repository',
        legalCopy: '© 2026 Howard Huang. All rights reserved.',
        designSystem: 'FLTL Design System',
        backToTop: 'Back to Top ↑'
      },
      aboutPage: {
        preloaderBrand: 'ABOUT HOWARD',
        heroEyebrow: 'PROFILE · BIOGRAPHY',
        heroExp: '10+ YEARS EXPERIENCE',
        heroTitleSerif: 'ABOUT',
        heroTitleSans: 'HOWARD',
        heroRoles: 'CREATIVE STRATEGIST · VISUAL DESIGN DIRECTOR · DIGITAL PRODUCT BUILDER',
        badgeYears: 'TEN+ YEARS',
        badgeDesc: 'DESIGN, ADVERTISING & DIGITAL SYSTEMS',
        heroImgAlt: 'Howard Huang — Standing Portrait',
        whoHeader: 'WHO I AM',
        whoLead: 'Howard Huang is a Creative Strategist, Visual Design Director, and Digital Product Builder with more than a decade of cross-disciplinary experience across design, advertising, and digital experience.',
        whoP1: 'Operating at the critical intersection where brand narrative meets digital architecture, Howard leads creative systems that transform strategic goals into unmistakable visual identities and responsive products.',
        whoP2: 'With 10+ years directing visual design and digital craft, he works as both a strategic leader and hands-on builder—designing cohesive brand universes, high-conversion interfaces, and tactile physical-digital touchpoints.',
        practiceHeader: 'MY CREATIVE PRACTICE',
        practiceQuote: '“It doesn’t matter <span class="quote-serif">where</span> you start, it’s <span class="quote-serif">how</span> you craft the systems that endure.”',
        practiceP1: 'Howard’s creative practice is defined by systematic rigour and aesthetic uncompromisingness. Rather than treating design as decorative styling, every project begins with structural thinking: establishing the brand’s conceptual core, typography hierarchy, behavioral logic, and tactile materiality.',
        practiceP2: 'From editorial art direction and high-contrast typography to interactive 3D WebGL objects and performance-tuned frontend systems, the practice continuously bridges physical craftsmanship with modern web capabilities.',
        expHeader: 'EXPERIENCE & EXPERTISE',
        expLead: 'Ten-plus years focused on four core disciplines across the contemporary design landscape:',
        pillar1Title: 'CREATIVE STRATEGY & BRAND ARCHITECTURE',
        pillar1Desc: 'Formulating brand positioning, strategic narratives, visual identity systems, and unified guidelines that provide clarity and competitive distinction.',
        pillar2Title: 'VISUAL DESIGN DIRECTION & ART DIRECTION',
        pillar2Desc: 'Editorial layouts, bespoke typography, campaign art direction, packaging craft, and cinematic visual pacing that command attention.',
        pillar3Title: 'DIGITAL PRODUCT BUILDING & UI SYSTEMS',
        pillar3Desc: 'Engineering intuitive interfaces, design systems, responsive component libraries, and ergonomic user journeys built for scalable digital platforms.',
        pillar4Title: 'PHYSICAL-DIGITAL CONNECTED EXPERIENCES',
        pillar4Desc: 'Bridging physical tangible objects with instant digital cloud endpoints via embedded micro-technologies, NFC integrations, and interactive web objects.',
        fltlHeader: 'FROM LIFE TO LINES',
        fltlLead: '“From Life to Lines” (FLTL) is Howard’s self-initiated design philosophy and product platform.',
        fltlP1: 'It represents the translation of life’s spontaneous interactions into precise, enduring design lines. The philosophy asserts that modern design must not remain trapped behind screens—it should live in the physical hands of people, connecting physical presence with seamless digital identity.',
        fltlP2: 'The flagship realization of this platform is the <strong>FLTL NFC Smart Business Card (2026)</strong>: a premium matte-black PVC card engineered with an embedded NTAG216 micro-chip, supporting instantaneous contact sharing across iOS and Android without any application installation.',
        btnCase: 'VIEW FLTL NFC CASE →',
        btnProduct: 'OFFICIAL PRODUCT SITE ↗',
        footerFeaturedObject: 'FEATURED OBJECT',
        footerCardName: 'FLTL NFC Smart Card (2026)'
      }
    },
    'zh-TW': {
      meta: {
        homeTitle: 'Howard Huang — 創意策略總監與視覺設計指導',
        homeDesc: 'Howard Huang：創意策略總監、視覺設計指導與數位產品建構者。專注於打造品牌視覺識別、數位產品與虛實整合體驗。',
        aboutTitle: '關於 Howard Huang — 創意策略總監與視覺設計指導',
        aboutDesc: 'Howard Huang 個人自傳與創作實踐：創意策略總監、視覺設計指導與數位產品建構者，擁有超過 10 年橫跨品牌設計、廣告傳播與數位體驗之專業經驗。'
      },
      nav: {
        work: '作品',
        menuToggle: '切換導覽選單',
        home: '首頁',
        navWork: '專案作品',
        navAbout: '關於 HOWARD',
        navHelmets: '旗艦殿堂',
        tagline: '10+ 年創意指導、品牌策略與數位體驗架構',
        contact: '聯絡洽談',
        langLabel: '語言：'
      },
      hero: {
        mobileRole: '創意策略總監與視覺設計指導',
        role1: '創意策略總監',
        role2: '視覺設計指導',
        role3: '數位產品建構者',
        exp: '10+ 年資深實務經驗',
        featuredProject: '精選專案',
        selfInitiated: '自主研發產品<br/>2026',
        scrollEnter: '向下滾動探索',
        imgAlt: 'Howard Huang — 創意策略總監與視覺設計指導'
      },
      message: {
        emblemText: '創意策略總監 · 視覺設計指導',
        line1: '打造獨特<span class="c-lime-serif">品牌視覺識別</span>，',
        line2: '建構全方位數位產品與',
        line3: '<span class="c-lime-serif">虛實整合連結體驗</span>，',
        line4: '貫通品牌策略、廣告傳播',
        line5: '與尖端<span class="c-lime-serif">數位科技</span>。'
      },
      editorial: {
        captionFltl: 'FLTL NFC · 旗艦實體作品',
        captionPackaging: '極致觸感包裝 · 2026',
        quote: '起點在<span class="quote-serif">哪裡</span>並不重要，重要的是你如何打造歷久彌堅的<span class="quote-serif">系統</span>。',
        captionMacro: '微型天線迴路架構 · 2026',
        altFltl: 'FLTL NFC 旗艦智慧名片主體',
        altPackaging: 'FLTL NFC 極致觸感包裝',
        altMacro: 'FLTL NFC 微型天線迴路特寫'
      },
      rail: {
        aria: 'Howard 與 FLTL NFC 橫向設計旅程',
        label: '向下滑動，探索作品',
        kicker3: '03 / 連結',
        kicker4: '04 / 旗艦作品',
        ghostDesign: '設計',
        ghostConnect: '連結',
        heading1: '作品背後的設計師。',
        desc1: '視覺指導、產品思考與數位設計實作。',
        heading2: '一個想法，連結虛實。',
        desc2: '一張實體卡片，連結專屬的數位身分。',
        heading3: '讓連結自然發生。',
        desc3: '將卡片靠近支援 NFC 的手機，即可開啟數位資訊。',
        heading4: '為握在手中的體驗而設計。',
        desc4: 'FLTL NFC 智慧名片 · 2026',
        explore: '探索產品互動 ↗',
        altHoward: 'Howard Huang — 側面人物肖像',
        altPhysical: 'FLTL 實體與數位產品體驗',
        altTap: 'FLTL NFC 卡片靠近手機的感應示意',
        altPackage: 'FLTL NFC 三折式包裝'
      },
      finale: {
        imageAlt: 'Howard Huang — 全身專業形象照',
        eyebrow: '作品背後的設計師',
        heading: '下一個創作篇章，持續進行。',
        about: '關於 HOWARD ↗',
        contact: '聯絡我 ↗'
      },
      portals: {
        workEyebrow: '精選',
        workTitle: '作品',
        workOverlay: '作品',
        workDesc: 'FLTL NFC 旗艦智慧名片系統，無縫鏈結實體社交觸點與即時數位傳輸。',
        workBtnTitle: '瀏覽精選專案',
        aboutEyebrow: '關於',
        aboutTitle: 'HOWARD',
        aboutDesc: '創意策略總監、視覺設計指導與數位產品建構者，擁有超過 10 年橫跨品牌設計、廣告傳播與數位體驗之深厚資歷。',
        aboutBtnTitle: '深入了解 Howard Huang',
        altHowardFront: 'Howard Huang — 正面形象肖像',
        altHowardSide: 'Howard Huang — 側面形象肖像'
      },
      helmets: {
        titleMain: '旗艦實體作品',
        titleSub: '殿堂核心',
        desc: '自主研發之 NFC 智慧名片系統，搭載原廠 NXP NTAG216 高頻晶片（888 位元組儲存空間、支援 32-bit 密碼保護），採用標準 85.6 × 54 × 0.76 mm 純黑消光 PVC 霧面卡體，實現一觸即達的極速數位傳輸。',
        canvasAria: '可互動 3D FLTL NFC 智慧名片實體模型',
        btnFlip: '翻轉 180°',
        btnFlipTitle: '翻轉卡片 180 度',
        dragHint: '按住拖曳可 360° 檢視 3D 實體',
        revealCue: '滑鼠移入，呈現 NFC 互動物件',
        metaTitle: '開啟 FLTL NFC 完整專案歷程',
        calloutPrompt: '探索完整 FLTL NFC 工程設計專案歷程與官方產品詳細規格',
        btnCase: '瀏覽 FLTL NFC 專案 →',
        btnStore: '官方產品官網 ↗'
      },
      socials: {
        titleMain: '前瞻實踐',
        titleSerif: '設計歷程',
        intro: '與 HOWARD HUANG 建立聯繫',
        email: '電子郵件'
      },
      footer: {
        marqueeHtml: '<span class="marquee-item">HOWARD HUANG</span><span class="marquee-dot">•</span><span class="marquee-item">FLTL NFC</span><span class="marquee-dot">•</span><span class="marquee-item">創意策略</span><span class="marquee-dot">•</span><span class="marquee-item">視覺設計</span><span class="marquee-dot">•</span><span class="marquee-item">數位產品</span><span class="marquee-dot">•</span><span class="marquee-item">10 年以上經驗</span><span class="marquee-dot">•</span><span class="marquee-item">HOWARD HUANG</span><span class="marquee-dot">•</span><span class="marquee-item">FLTL NFC</span><span class="marquee-dot">•</span><span class="marquee-item">創意策略</span><span class="marquee-dot">•</span><span class="marquee-item">視覺設計</span><span class="marquee-dot">•</span><span class="marquee-item">數位產品</span><span class="marquee-dot">•</span><span class="marquee-item">10 年以上經驗</span><span class="marquee-dot">•</span>',
        marquee: 'HOWARD HUANG • FLTL NFC • 創意策略總監 • 視覺設計指導 • 數位產品建構者 • 10+ 年實務經驗 • HOWARD HUANG • FLTL NFC • 創意策略總監 • 視覺設計指導 • 數位產品建構者 • 10+ 年實務經驗',
        pages: '頁面導覽',
        home: '首頁',
        work: '作品',
        about: '關於 Howard',
        helmets: '旗艦殿堂',
        featuredCase: '精選代表作',
        fltlCase: 'FLTL NFC 智慧名片 (2026)',
        islandCase: '島序 ISLAND INDEX 台灣茶風土索引 (2026)',
        officialStore: '官方線上商店 ↗',
        contactHeader: '即時聯繫',
        linkedin: 'LinkedIn 個人檔案',
        github: 'GitHub 專案庫',
        legalCopy: '© 2026 Howard Huang. 版權所有。',
        designSystem: 'FLTL 設計系統',
        backToTop: '返回頂部 ↑'
      },
      aboutPage: {
        preloaderBrand: '關於 HOWARD',
        heroEyebrow: '個人檔案 · 深度自傳',
        heroExp: '10+ 年實務經驗',
        heroTitleSerif: '關於',
        heroTitleSans: 'HOWARD',
        heroRoles: '創意策略總監 · 視覺設計指導 · 數位產品建構者',
        badgeYears: '十餘年深厚歷練',
        badgeDesc: '深耕品牌設計、廣告傳播與數位系統',
        heroImgAlt: 'Howard Huang — 站姿肖像',
        whoHeader: '我是誰',
        whoLead: 'Howard Huang 是一位擁有十餘年跨領域歷練的創意策略總監、視覺設計指導與數位產品建構者，深耕於品牌設計、廣告傳播與全方位數位體驗。',
        whoP1: '立足於品牌敘事與數位架構的核心交會點，Howard 專注於領導整全的創意系統，將商業策略目標精準轉化為辨識度鮮明的視覺識別與高效響應的數位產品。',
        whoP2: '擁有 10 年以上主導視覺設計與數位工藝的實務經驗，他同時兼具策略引領者與核心建構者的角色——一手策劃協調的品牌宇宙、高轉換率的介面系統，以及兼具手感與功能的虛實整合互動觸點。',
        practiceHeader: '我的創作實踐',
        practiceQuote: '「起點在<span class="quote-serif">哪裡</span>並不重要，重要的是你如何打造歷久彌堅的<span class="quote-serif">系統</span>。」',
        practiceP1: 'Howard 的創作實踐體現於系統性的嚴謹架構與絕不妥協的美學標準。他從不將設計視為表層的裝飾手法，每一項專案皆始於結構性思維：確立品牌的核心概念、字體階層架構、行為互動邏輯以及實體手感的材質本質。',
        practiceP2: '從大膽鮮明的編排美術指導、高對比字體排印，到即時互動的 3D WebGL 數位物件與極致調校的前端系統，他的實踐始終致力於將實體材質工藝與現代網頁尖端能力深度融合。',
        expHeader: '專業歷練與核心專長',
        expLead: '十餘年深耕於當代設計領域的四大核心維度：',
        pillar1Title: '創意策略與品牌架構',
        pillar1Desc: '制定精準的品牌定位、戰略敘事、整體視覺識別系統與一致性規範，為品牌樹立清晰無二的市場辨識度與競爭優勢。',
        pillar2Title: '視覺設計指導與美術總監',
        pillar2Desc: '專精於編排設計、客製字體排印、整合宣傳美術指導、包裝工藝與電影級節奏感的視覺鋪陳，創造具震撼力的目光焦點。',
        pillar3Title: '數位產品建構與 UI 系統',
        pillar3Desc: '打造符合人體工學的直覺介面、嚴謹設計系統、全端響應式元件庫與流暢的使用者旅程，支援高度可擴展的數位平台。',
        pillar4Title: '虛實整合連結體驗',
        pillar4Desc: '透過微型晶片嵌入技術、NFC 整合應用與即時網頁互動三維物件，打破物理邊界，無縫連結實體物件與雲端數位生態。',
        fltlHeader: 'FROM LIFE TO LINES',
        fltlLead: '「From Life to Lines」(FLTL) 是 Howard 自主發起的設計哲學與實體產品研發平台。',
        fltlP1: '它代表著將生活中自然流淌的即時互動，提煉為精確且歷久彌新的設計線條。這項哲學主張現代設計不應僅僅被困於螢幕之後——它應當真實握在人們手中，將實體世界的身影與數位身份無縫串聯。',
        fltlP2: '這項平台的旗艦實體結晶即是 <strong>FLTL NFC 智慧名片 (2026)</strong>：採用頂級純黑消光霧面 PVC 卡體，內嵌 NTAG216 高頻微型晶片，支援 iOS 與 Android 雙系統免裝 App 一碰秒傳聯絡資訊。',
        btnCase: '瀏覽 FLTL NFC 專案 →',
        btnProduct: '官方產品官網 ↗',
        footerFeaturedObject: '精選實體作品',
        footerCardName: 'FLTL NFC 智慧名片 (2026)'
      }
    }
  };

  function getSavedLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'zh-TW' || urlLang === 'en') {
        return urlLang;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'zh-TW')) {
        return saved;
      }
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function resolveKey(lang, path) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    const parts = path.split('.');
    let cur = dict;
    for (let i = 0; i < parts.length; i++) {
      if (cur && typeof cur === 'object' && parts[i] in cur) {
        cur = cur[parts[i]];
      } else {
        return undefined;
      }
    }
    return cur;
  }

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'zh-TW') lang = DEFAULT_LANG;

    // 1. Update HTML lang
    document.documentElement.lang = lang;

    // 2. Update Document Title & Meta Description based on page type
    const isAboutPage = window.location.pathname.includes('about') || document.body.classList.contains('page-about');
    const titleKey = isAboutPage ? 'meta.aboutTitle' : 'meta.homeTitle';
    const descKey = isAboutPage ? 'meta.aboutDesc' : 'meta.homeDesc';

    const newTitle = resolveKey(lang, titleKey);
    if (newTitle) {
      document.title = newTitle;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    const newDesc = resolveKey(lang, descKey);
    if (metaDesc && newDesc) {
      metaDesc.setAttribute('content', newDesc);
    }

    // 3. Update text-level translations [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolveKey(lang, key);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // 4. Update markup-level translations [data-i18n-html] without destroying outer elements
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = resolveKey(lang, key);
      if (val !== undefined) {
        el.innerHTML = val;
      }
    });

    // 5. Update attribute-level translations [data-i18n-attr="attr:key;attr2:key2"]
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const raw = el.getAttribute('data-i18n-attr');
      raw.split(';').forEach(pair => {
        const parts = pair.split(':');
        if (parts.length >= 2) {
          const attr = parts[0].trim();
          const key = parts.slice(1).join(':').trim();
          const val = resolveKey(lang, key);
          if (val !== undefined) {
            el.setAttribute(attr, val);
          }
        }
      });
    });

    // 6. Update language switch buttons UI active state
    document.querySelectorAll('.btn-lang').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      const isActive = btnLang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Let dynamically published project cards synchronize with the language.
    window.dispatchEvent(new CustomEvent('howard:languagechange', { detail: { lang } }));

    // 7. Persist language selection
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    // 8. Safely refresh GSAP ScrollTrigger after layout settles
    if (typeof window.ScrollTrigger !== 'undefined') {
      requestAnimationFrame(() => {
        window.ScrollTrigger.refresh();
      });
      setTimeout(() => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 80);
    }
  }

  function initI18n() {
    const initialLang = getSavedLanguage();

    // Attach click handlers to all language switch buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang) {
          setLanguage(targetLang);
        }
      });
    });

    // Apply the initial language
    setLanguage(initialLang);
  }

  // Auto-init on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }

  // Expose to window for external access
  window.howardI18n = {
    setLanguage: setLanguage,
    getCurrentLanguage: function () {
      return document.documentElement.lang || getSavedLanguage();
    },
    translations: TRANSLATIONS
  };
})();
