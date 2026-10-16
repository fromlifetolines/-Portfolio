/**
 * FLTL × HOWARD — BRAND CASE STUDY INTERACTION ENGINE V2.0
 * Features:
 *  - Persistent Bilingual Switcher (ZH / EN) synchronized with 'howard-portfolio-lang'
 *  - High-Resolution Lightbox Modal with Keyboard Navigation (ESC, Left, Right)
 *  - Nav Elevation on Scroll
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'howard-portfolio-lang';
  const DEFAULT_LANG = 'zh';

  // State
  let currentLang = DEFAULT_LANG;
  let galleryItems = [];
  let currentImageIndex = -1;

  // DOM Elements
  const html = document.documentElement;
  const langBtns = document.querySelectorAll('.lang-btn');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const caseNav = document.querySelector('.case-nav');

  /**
   * Initialize Language
   */
  function initLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh' || stored === 'zh-TW') {
        currentLang = (stored === 'en') ? 'en' : 'zh';
      } else {
        // Detect browser language
        const navLang = navigator.language || navigator.userLanguage || '';
        currentLang = navLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
      }
    } catch (e) {
      currentLang = DEFAULT_LANG;
    }

    setLanguage(currentLang);

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLang = btn.getAttribute('data-lang-target');
        if (targetLang) {
          setLanguage(targetLang);
        }
      });
    });
  }

  /**
   * Set Language
   */
  function setLanguage(lang) {
    currentLang = lang;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');

    langBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-lang-target') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang === 'zh' ? 'zh-TW' : 'en');
    } catch (e) {}

    // Update document title
    if (lang === 'zh') {
      document.title = '島序 ISLAND INDEX — 台灣風土茶巡禮品牌設計案例 | FLTL × HOWARD';
    } else {
      document.title = 'ISLAND INDEX — Contemporary Taiwanese Tea Atlas Case Study | FLTL × HOWARD';
    }
  }

  /**
   * Initialize Lightbox
   */
  function initLightbox() {
    if (!lightboxModal || !lightboxImg) return;

    // Collect all lightbox-able items
    const triggerElements = document.querySelectorAll('[data-lightbox]');
    galleryItems = Array.from(triggerElements).map(el => {
      const img = el.querySelector('img') || el;
      return {
        element: el,
        src: el.getAttribute('data-lightbox-src') || img.currentSrc || img.src,
        captionZh: el.getAttribute('data-caption-zh') || img.alt || '',
        captionEn: el.getAttribute('data-caption-en') || img.alt || ''
      };
    });

    triggerElements.forEach((el, idx) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(idx);
      });
    });

    // Close handlers
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        stepLightbox(-1);
      });
    }
    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        stepLightbox(1);
      });
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        stepLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        stepLightbox(1);
      }
    });
  }

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentImageIndex = index;
    const item = galleryItems[index];

    lightboxImg.src = item.src;
    lightboxImg.alt = currentLang === 'zh' ? item.captionZh : item.captionEn;

    if (lightboxCaption) {
      lightboxCaption.textContent = currentLang === 'zh' ? item.captionZh : item.captionEn;
    }

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentImageIndex = -1;
  }

  function stepLightbox(direction) {
    if (currentImageIndex === -1 || galleryItems.length <= 1) return;
    let nextIndex = currentImageIndex + direction;
    if (nextIndex < 0) nextIndex = galleryItems.length - 1;
    if (nextIndex >= galleryItems.length) nextIndex = 0;
    openLightbox(nextIndex);
  }

  /**
   * Navbar Elevation on Scroll
   */
  function initNavScroll() {
    if (!caseNav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        caseNav.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06)';
      } else {
        caseNav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLanguage();
      initLightbox();
      initNavScroll();
    });
  } else {
    initLanguage();
    initLightbox();
    initNavScroll();
  }

})();
