/**
 * HOWARD PORTFOLIO — PROJECT REGISTRY
 * Publish only real, approved work.  No filler/placeholder projects.
 * Future entries can be added without rebuilding the Hall of Fame section.
 * Assets must be authored by or licensed to Howard / FLTL.
 */
window.HOWARD_PROJECTS = Object.freeze([
  {
    id: 'fltl-nfc',
    order: 1,
    published: true,
    title: 'FLTL NFC',
    year: '2026',
    category: { en: 'SELF-INITIATED PRODUCT', 'zh-TW': '自主開發產品' },
    projectType: { en: 'Flagship Smart Card', 'zh-TW': '旗艦智慧卡系統' },
    description: { en: 'FLTL NFC Smart Business Card system bridging physical touchpoints and instant digital transmission.', 'zh-TW': 'FLTL NFC 智慧名片系統，結合頂級消光黑卡體與微型高頻晶片，無縫串聯實體觸點與雲端數位身份。' },
    cover: 'assets/NFC_official_front.jpg',
    interactiveAsset: 'assets/NFC_official_front.jpg',
    caseStudy: 'portfolio-nfc.html'
  },
  {
    id: 'island-index',
    order: 2,
    published: true,
    title: '島序 ISLAND INDEX',
    year: '2026',
    category: {
      en: 'Brand Identity / Packaging / Product System',
      'zh-TW': '品牌識別 / 視覺包裝 / 產品系統'
    },
    projectType: {
      en: 'Self-Initiated Brand Concept',
      'zh-TW': '自主品牌概念提案'
    },
    description: {
      en: 'Contemporary Taiwanese tea brand identity featuring four coordinated tea products, editorial packaging and a complete visual system.',
      'zh-TW': '當代台灣茶風土索引品牌識別與四款產地包裝設計，結合日式編輯美學與完整視覺系統。'
    },
    cover: 'brand/island-index/assets/mockups/shot-05.jpg',
    interactiveAsset: 'brand/island-index/assets/mockups/shot-05.jpg',
    caseStudy: 'brand/island-index/'
  }
]);
