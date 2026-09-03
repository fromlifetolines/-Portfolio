/**
 * From Life To Lines // Japanese Cream Minimalist & Bilingual i18n Controller 2026
 * Warm Cream Palette, Sumi Charcoal Ink, Client-Side Instant i18n Engine
 */

// 1. Procedural Web Audio Synthesizer (Acoustic Feedback)
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

  playBlip(freq = 520, duration = 0.04, type = 'sine') {
    if (this.isMuted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, this.ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playOpen() {
    if (this.isMuted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.1);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.1);
  }
}

const audio = new SoundEngine();

// 2. Comprehensive Bilingual i18n Translation Dictionary
const i18nData = {
  zh: {
    // Navigation
    nav_about: '關於我',
    nav_capabilities: '核心能力',
    nav_projects: '精選專案',
    nav_showreel: '動態展示',
    nav_services: '設計服務',
    nav_nfc: '智慧名片',
    nav_contact_btn: '聯絡委託',
    mobile_nav_title: '選單導航',
    mobile_about: '01. 關於我 (ABOUT)',
    mobile_capabilities: '02. 核心能力 (CAPABILITIES)',
    mobile_projects: '03. 精選專案 (PROJECTS)',
    mobile_showreel: '04. 動態展示 (SHOWREEL)',
    mobile_services: '05. 設計服務 (SERVICES)',
    mobile_nfc: '06. 智慧名片 (NFC HARDWARE)',
    mobile_contact_btn: '立即聯絡委託',

    // Hero / About Me
    hero_badge: '10+ YRS / GOOGLE ADS & COMMERCIAL DESIGN',
    hero_title_html: '好的設計解決溝通問題，<br class="hidden sm:inline">好的行銷帶來商業轉換。',
    hero_subtitle: 'Clear communication through craft, measurable conversion with data.',
    hero_desc_1: '從 Google Ads 廣告諮詢起步，我花了 10 年在轉換率、跳出率與預算投放裡找答案。在打開排版軟體前，我習慣先釐清視覺要溝通給誰、能不能帶來實質訂單。',
    hero_desc_2: '不做無效益的純裝飾，專注於將商業策略轉化為清楚、耐看且能直接執行的視覺系統。從品牌識別、包裝印刷、客製化網頁到實體 NFC 智慧名片，協助品牌建立穩固的市場溝通標準。',
    metric_1_label: '實戰經歷',
    metric_1_val: '10+ 年',
    metric_1_sub: '商業數據與視覺整合',
    metric_2_label: '行銷效益',
    metric_2_val: 'ROAS 4.8x',
    metric_2_sub: '平均廣告導流指標',
    metric_3_label: '交付全案',
    metric_3_val: '全案整合',
    metric_3_sub: '品牌 × 網頁 × 實體硬體',
    btn_explore_projects: '探索精選專案 ↓',
    btn_brand_site: '品牌官網',

    // Capabilities
    cap_tag: '// 01. CORE CAPABILITIES',
    cap_title: '核心能力矩陣',
    cap_subtitle: '結合廣告成效邏輯與細緻視覺執行，提供真正能帶來業務成長的解決方案。',
    cap_1_title: '01. 商業與廣告數據',
    cap_1_badge: 'ROAS 4.8x',
    cap_1_desc: '熟悉 Google Ads 架構、A/B 測試與 Landing Page 動線，確保設計投入能轉化為名單與營收。',
    cap_2_title: '02. 品牌與包裝實務',
    cap_2_badge: 'Print & Packaging',
    cap_2_desc: '整合商標識別、包裝刀模展開、紙材挑選到實體打樣，確保送印成品與螢幕提案具備一致水準。',
    cap_3_title: '03. 數位介面與互動建置',
    cap_3_badge: 'UI/UX & Code',
    cap_3_desc: '專注結構清晰的排版、RWD 響應式介面與流暢微動態，建立載入迅速、易於操作的品牌官網。',

    // Projects
    proj_tag: '// 02. FEATURED WORKS',
    proj_title: '精選專案庫',
    proj_subtitle: '涵蓋 3D 視覺、包裝與電商、介面動效與廣告投放，每個專案皆清楚標註屬性與設計策略。',
    p1_tag: '[ 概念設計 / 3D 視覺系統 ]',
    p1_title: 'AURA 空間聲學耳機系統',
    p1_desc: '微工業機能美學：將聲學濾波器與微晶片轉化為品牌核心視覺資產，拒絕同質化科技極簡。',
    btn_read_case: '探索完整案例 (READ CASE STUDY)',
    p2_tag: '[ 概念設計 / 包裝與電商 ]',
    p2_title: 'OAT & BOTANIC 純素冷萃低碳咖啡',
    p2_desc: '未塗布再生紙盒與實體觸感包裝，融合低碳永續理念與 D2C 高轉化排版系統。',
    p3_tag: '[ 概念設計 / 介面與動效系統 ]',
    p3_title: 'NEXUS AI 模組化協作平台',
    p3_desc: '高密度資訊儀表板與節點式畫布系統，實現結構清晰、好操作的深色介面設計。',
    p4_tag: '[ 商業投放 / 廣告與動線規劃 ]',
    p4_title: 'HYDRATE LAB 全渠道廣告架構',
    p4_desc: 'Google Ads 搜索與多媒體廣告架構，搭配目標明確的 Landing Page，完成從曝光到名單的溝通流程。',
    btn_ig_works: 'Instagram 作品精選',
    p5_tag: '[ 內容工程 / SEO 結構化設計 ]',
    p5_title: 'CHRONO ARCHIVE 鐘錶知識庫',
    p5_desc: '結構化資料標記與長尾關鍵字內容工程，建立具權威感與易讀性的典藏知識介面。',
    p6_tag: '[ 品牌識別 / 視覺系統 ]',
    p6_title: 'From Life To Lines 生活線條 品牌識別',
    p6_desc: '以極簡線條與手繪筆觸傳遞情感共鳴，建立兼具商業力與獨特美感的個人品牌。',
    btn_ig_page: '前往 Instagram 專頁',

    // Motion Showcase
    showreel_tag: '// 03. MOTION & SPATIAL',
    showreel_title: '4K 動態展示影院',
    showreel_badge: '[4K 60FPS // LIVE CINEMA]',
    showreel_desc: 'AURA 空間聲學系統概念展示片：融合 3D 渲染流體光澤、深色曲面螢幕 UI 與微工業工程細節。',

    // Services
    serv_tag: '// 04. CAPABILITIES & SERVICES',
    serv_title: '設計服務項目',
    serv_subtitle: '依照名片背面三大核心範疇，提供從品牌定位、實體平面印刷到高成效數位網頁的一站式視覺解決方案。',
    serv_b_title: '品牌設計',
    serv_b_badge: '[BRAND]',
    serv_v_title: '視覺設計',
    serv_v_badge: '[VISUAL]',
    serv_w_title: '網頁設計',
    serv_w_badge: '[WEB]',

    // NFC Smart Card
    nfc_tag: 'FLTL SMART HARDWARE LAB // PROPRIETARY ENGINE',
    nfc_title: '超越傳統名片：軟硬整合的智慧商務人脈系統',
    nfc_desc: '不僅是霧面沉黑的頂級 NFC 實體卡片，更是結合了 AI 視覺掃描、雙向資訊交換、數據成效追蹤與企業 CRM 串接的全方位商務增長引擎。',
    nfc_f1_title: '01. OCR 名片掃描辨識系統',
    nfc_f1_desc: '收到對方的傳統紙本名片？拍照 1 秒由 AI 辨識姓名、電話、公司與統編，自動建立數位聯絡簿，徹底終結紙張堆積。',
    nfc_f2_title: '02. 雙向聯絡資訊即時交換',
    nfc_f2_desc: '手機碰觸感應後，對方不僅能一鍵加入通訊錄（vCard 3.0），更可直接回傳其姓名與聯絡方式，現場完成名單雙向閉環。',
    nfc_f3_title: '03. 行銷追蹤與成效分析 (Analytics)',
    nfc_f3_desc: '發揮 10+ 年 Google Ads 數據思維：深度整合 GA4、Meta Pixel 與點擊事件追蹤，精準分析名片被感應次數與客戶互動足跡。',
    nfc_f4_title: '04. 企業級 CRM 串接',
    nfc_f4_desc: '支援企業批量團隊管理（Tier 1–3 方案），業務外出開發獲得的人脈資料可直接無縫對接至 Salesforce、HubSpot 或自建 CRM。',
    nfc_spec_1: '沉黑霧面防刮 PVC',
    nfc_spec_2: 'NTAG216 高頻晶片',
    nfc_spec_3: 'AES-256 安全加密',
    nfc_spec_4: '免裝 App 0.5s 感應',
    nfc_btn_more: '前往品牌官網了解更多 →',

    // Contact & Footer
    contact_tag: '// START A CONVERSATION',
    contact_title: '準備好開始您的專案了嗎？',
    contact_desc: '好的設計解決溝通問題，好的行銷帶來商業轉換。如果您有品牌識別、包裝印刷、客製網頁建置或 NFC 系統需求，歡迎直接聯繫。',
    contact_p_label: '直接通話',
    contact_p_desc: '專案顧問與電話諮詢',
    contact_m_label: '電子郵箱',
    contact_m_desc: '提案邀請與商務合作',
    contact_w_label: '官方品牌站',
    contact_w_desc: '生活線條官方主站',
    copyright: '© 2026 FROM LIFE TO LINES. ALL RIGHTS RESERVED.'
  },

  en: {
    // Navigation
    nav_about: 'About',
    nav_capabilities: 'Capabilities',
    nav_projects: 'Works',
    nav_showreel: 'Showreel',
    nav_services: 'Services',
    nav_nfc: 'NFC Card',
    nav_contact_btn: 'Contact Me',
    mobile_nav_title: 'Navigation Menu',
    mobile_about: '01. About',
    mobile_capabilities: '02. Capabilities',
    mobile_projects: '03. Works',
    mobile_showreel: '04. Showreel',
    mobile_services: '05. Services',
    mobile_nfc: '06. NFC Hardware',
    mobile_contact_btn: 'Contact Me Now',

    // Hero / About Me
    hero_badge: '10+ YRS / GOOGLE ADS & COMMERCIAL DESIGN',
    hero_title_html: 'Clear communication through craft,<br class="hidden sm:inline">measurable conversion with data.',
    hero_subtitle: 'Designing purposeful identities and high-performing digital systems.',
    hero_desc_1: 'Starting in Google Ads consulting, I spent 10 years finding answers in conversion rates, bounce metrics, and ad budgets. Before opening design software, I clarify who the visual speaks to and whether it drives real revenue.',
    hero_desc_2: 'No purely decorative fluff—just clean, enduring, and actionable design systems. From brand identities and packaging print production to bespoke web development and smart NFC hardware, I build structured visual foundations.',
    metric_1_label: 'Experience',
    metric_1_val: '10+ Yrs',
    metric_1_sub: 'Data Strategy & Visual Craft',
    metric_2_label: 'Ad Performance',
    metric_2_val: 'ROAS 4.8x',
    metric_2_sub: 'Average Campaign Benchmark',
    metric_3_label: 'End-to-End',
    metric_3_val: 'Full Scope',
    metric_3_sub: 'Brand × Web × Hardware',
    btn_explore_projects: 'Explore Selected Works ↓',
    btn_brand_site: 'Official Website',

    // Capabilities
    cap_tag: '// 01. CORE CAPABILITIES',
    cap_title: 'Core Capabilities',
    cap_subtitle: 'Bridging strategic performance marketing with refined visual craft to unlock measurable business growth.',
    cap_1_title: '01. Commercial Ads & Data',
    cap_1_badge: 'ROAS 4.8x',
    cap_1_desc: 'Google Ads architecture, conversion funnels, and landing page UX focused on measurable revenue and high ROAS.',
    cap_2_title: '02. Branding & Packaging Craft',
    cap_2_badge: 'Print & Packaging',
    cap_2_desc: 'From brand identities to packaging die-lines, tactile paper curation, and factory print-proof verification.',
    cap_3_title: '03. Digital Interface & Web Dev',
    cap_3_badge: 'UI/UX & Code',
    cap_3_desc: 'Clean typography, responsive layouts, and lightweight interactions built for modern web performance.',

    // Projects
    proj_tag: '// 02. FEATURED WORKS',
    proj_title: 'Curated Project Archive',
    proj_subtitle: 'Spanning 3D spatial visuals, sustainable e-commerce packaging, UI design systems, and full-funnel ad campaigns.',
    p1_tag: '[ Concept / 3D Visual System ]',
    p1_title: 'AURA Spatial Audio Headphone System',
    p1_desc: 'Micro-industrial aesthetics: transforming acoustic filters and microchips into iconic brand visuals without tech clichés.',
    btn_read_case: 'Read Case Study (FULL ARCHIVE)',
    p2_tag: '[ Concept / Packaging & E-Commerce ]',
    p2_title: 'OAT & BOTANIC Vegan Cold Brew Coffee',
    p2_desc: 'Uncoated recycled cardboard packaging and tactile paper craft paired with a high-converting D2C layout.',
    p3_tag: '[ Concept / UI & Motion System ]',
    p3_title: 'NEXUS AI Modular Workspace Platform',
    p3_desc: 'High-density information dashboards and node-based canvas interface designed for intuitive, dark-mode workflows.',
    p4_tag: '[ Commercial / Ads & Growth ]',
    p4_title: 'HYDRATE LAB Omnichannel Conversion Funnel',
    p4_desc: 'Google Ads search and display architecture paired with purpose-driven landing pages for seamless lead acquisition.',
    btn_ig_works: 'Instagram Highlights',
    p5_tag: '[ Content Eng / Structured SEO ]',
    p5_title: 'CHRONO ARCHIVE Horology Knowledge Base',
    p5_desc: 'Structured schema markup and editorial SEO strategy, delivering an authoritative, scannable archive for enthusiasts.',
    p6_tag: '[ Brand Identity / Visual System ]',
    p6_title: 'From Life To Lines Brand Identity',
    p6_desc: 'Minimalist line work and authentic hand-drawn strokes conveying emotional resonance and distinct personality.',
    btn_ig_page: 'Visit Instagram Page',

    // Motion Showcase
    showreel_tag: '// 03. MOTION & SPATIAL',
    showreel_title: '4K Cinema Showcase',
    showreel_badge: '[4K 60FPS // LIVE CINEMA]',
    showreel_desc: 'AURA Spatial Sound concept reel: combining 3D fluid reflections, curved interface graphics, and micro-industrial engineering details.',

    // Services
    serv_tag: '// 04. CAPABILITIES & SERVICES',
    serv_title: 'Design Services Directory',
    serv_subtitle: 'Aligned with official business card specializations, providing end-to-end creative and commercial solutions.',
    serv_b_title: 'Brand Identity',
    serv_b_badge: '[BRAND]',
    serv_v_title: 'Visual Design',
    serv_v_badge: '[VISUAL]',
    serv_w_title: 'Web & Digital',
    serv_w_badge: '[WEB]',

    // NFC Smart Card
    nfc_tag: 'FLTL SMART HARDWARE LAB // PROPRIETARY ENGINE',
    nfc_title: 'Beyond Paper Cards: Integrated Smart Business Networking',
    nfc_desc: 'More than a matte black premium NFC card—a full-spectrum growth engine combining AI OCR scanning, two-way data sync, GA4 analytics, and CRM integration.',
    nfc_f1_title: '01. AI OCR Business Card Scanner',
    nfc_f1_desc: 'Handed a traditional paper card? Scan it with on-device AI in 1 second to parse names, phone numbers, and company details directly into your contacts.',
    nfc_f2_title: '02. Two-Way Instant Contact Sync',
    nfc_f2_desc: 'Networking is a two-way street. When tapped, contacts can save your vCard 3.0 profile and immediately submit their own contact details back.',
    nfc_f3_title: '03. Marketing Analytics & Funnel Tracking',
    nfc_f3_desc: 'Infused with 10+ years of Google Ads data mindset: integrated GA4 and Meta Pixel tracking to evaluate tap frequencies and high-value user footprints.',
    nfc_f4_title: '04. Enterprise CRM Integration',
    nfc_f4_desc: 'Supports multi-seat team management with direct API synchronization into Salesforce, HubSpot, or bespoke company CRMs.',
    nfc_spec_1: 'Matte Scratch-Resistant PVC',
    nfc_spec_2: 'NTAG216 High-Frequency Chip',
    nfc_spec_3: 'AES-256 Security Encryption',
    nfc_spec_4: 'Zero App Required 0.5s Tap',
    nfc_btn_more: 'Learn More on Official Site →',

    // Contact & Footer
    contact_tag: '// START A CONVERSATION',
    contact_title: 'Ready to build your next project?',
    contact_desc: 'Clear communication solves design challenges; data-driven strategy drives commercial conversion. For brand identity, packaging, web development, or smart NFC systems, feel free to reach out.',
    contact_p_label: 'Direct Phone',
    contact_p_desc: 'Project inquiries and consulting',
    contact_m_label: 'Email Address',
    contact_m_desc: 'RFP and business collaboration',
    contact_w_label: 'Brand Website',
    contact_w_desc: 'Official From Life To Lines portal',
    copyright: '© 2026 FROM LIFE TO LINES. ALL RIGHTS RESERVED.'
  }
};

// Current active language state
let currentLang = 'zh';

// 3. Language Switching Engine
function setLanguage(lang) {
  if (!i18nData[lang]) lang = 'zh';
  currentLang = lang;

  // 1. Update textContent elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  // 2. Update innerHTML elements
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (i18nData[lang][key]) {
      el.innerHTML = i18nData[lang][key];
    }
  });

  // 3. Update active pill indicators on language toggle buttons
  document.querySelectorAll('.lang-opt').forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // 4. Update document language attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

  // 5. Store in LocalStorage
  try {
    localStorage.setItem('fltl_lang', lang);
  } catch (e) {}

  audio.playBlip(620, 0.03);
}

// 4. Mobile Navigation Drawer Controls
function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  if (!drawer || !backdrop) return;
  audio.playOpen();
  backdrop.classList.remove('hidden');
  setTimeout(() => {
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    drawer.classList.remove('-translate-y-full');
    drawer.classList.add('translate-y-0');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  if (!drawer || !backdrop) return;
  audio.playBlip(380, 0.04);
  drawer.classList.remove('translate-y-0');
  drawer.classList.add('-translate-y-full');
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
  setTimeout(() => {
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }, 350);
}

// 5. Scroll-Spy Navigation Highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 6. 3D Card Mouse Perspective Physics (Desktop only)
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// 7. Clock Telemetry (Taipei UTC+8)
function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;
  const updateTime = () => {
    const now = new Date();
    const tpe = new Intl.DateTimeFormat('en-GB', { 
      timeZone: 'Asia/Taipei', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    }).format(now);
    clockEl.innerText = `TPE ${tpe}`;
  };
  setInterval(updateTime, 1000);
  updateTime();
}

// 8. DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // Initialize saved or browser language
  let preferredLang = 'zh';
  try {
    const stored = localStorage.getItem('fltl_lang');
    if (stored && (stored === 'zh' || stored === 'en')) {
      preferredLang = stored;
    } else if (navigator.language && !navigator.language.startsWith('zh')) {
      preferredLang = 'en';
    }
  } catch (e) {}

  setLanguage(preferredLang);

  // Setup Language Toggle buttons
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'zh' ? 'en' : 'zh';
      setLanguage(nextLang);
    });
  }

  const mobileLangToggleBtn = document.getElementById('mobile-lang-toggle');
  if (mobileLangToggleBtn) {
    mobileLangToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'zh' ? 'en' : 'zh';
      setLanguage(nextLang);
    });
  }

  initScrollSpy();
  initTiltCards();
  initClock();

  // Mobile menu button event listeners
  const btnOpenMobile = document.getElementById('btn-mobile-menu');
  const btnCloseMobile = document.getElementById('btn-close-mobile');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  if (btnOpenMobile) btnOpenMobile.addEventListener('click', openMobileDrawer);
  if (btnCloseMobile) btnCloseMobile.addEventListener('click', closeMobileDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileDrawer);

  // Close drawer upon clicking any mobile nav link
  document.querySelectorAll('#mobile-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Acoustic click feedback for interactive links & buttons
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (!el.getAttribute('onclick') && el.id !== 'lang-toggle') {
        audio.playBlip(540, 0.02);
      }
    });
  });
});
