/**
 * FLTL × HOWARD — ATLAS OPS BRAND CASE STUDY INTERACTION ENGINE V1.1 (PHASE A.2)
 * Features:
 *  - Persistent Bilingual Switcher (ZH / EN) synchronized with 'howard-portfolio-lang'
 *  - High-Resolution Lightbox Modal with Keyboard Navigation (ESC, Left, Right)
 *  - 1672 × 941 PX Raw Master Specification Display & Direct Trigger Buttons
 *  - Sticky Nav Elevation on Scroll
 *  - SHOT 08 Interactive Client-Side Spec Viewer (W3C WAI-ARIA Tabs, Arrow Navigation, Zero Network)
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

  // DOM Elements
  const html = document.documentElement;
  const langBtns = document.querySelectorAll('.lang-btn');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const caseNav = document.querySelector('.case-nav');

  /**
   * Initialize Bilingual Engine
   */
  function initLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh' || stored === 'zh-TW') {
        currentLang = (stored === 'en') ? 'en' : 'zh';
      } else {
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
   * Set Language and update UI
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

    // Document Title
    if (lang === 'zh') {
      document.title = 'ATLAS OPS — 高端戶外機能裝備品牌概念設計案例 | FLTL × HOWARD';
    } else {
      document.title = 'ATLAS OPS — Technical Outdoor Equipment Brand Concept | FLTL × HOWARD';
    }

    // Refresh Lightbox Caption if active
    if (currentImageIndex >= 0 && galleryItems[currentImageIndex]) {
      updateLightboxCaption(currentImageIndex);
    }
  }

  /**
   * Initialize Lightbox
   */
  function initLightbox() {
    const images = document.querySelectorAll('.plate-img');
    galleryItems = Array.from(images).map((img, idx) => {
      const card = img.closest('.plate-card') || img.closest('.hero-figure');
      const zhDesc = card ? (card.querySelector('.plate-desc .lang-zh')?.textContent || '') : '';
      const enDesc = card ? (card.querySelector('.plate-desc .lang-en')?.textContent || '') : '';
      const plateNumber = card ? (card.querySelector('.plate-number')?.textContent || `SHOT ${(idx + 1).toString().padStart(2, '0')}`) : '';
      const plateTitle = card ? (card.querySelector('.plate-title')?.textContent || '') : '';

      return {
        src: img.getAttribute('data-raw') || img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        number: plateNumber,
        title: plateTitle,
        descZh: zhDesc.trim(),
        descEn: enDesc.trim()
      };
    });

    const mediaWraps = document.querySelectorAll('.plate-media-wrap');
    mediaWraps.forEach((wrap, idx) => {
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'button');
      wrap.setAttribute('aria-label', `點擊或按 Enter 放大檢視 ${galleryItems[idx]?.number || ''} ${galleryItems[idx]?.title || ''} (1672 × 941 px) 原圖`);
      
      wrap.addEventListener('click', () => {
        lastActiveElement = wrap;
        openLightbox(idx);
      });
      
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lastActiveElement = wrap;
          openLightbox(idx);
        }
      });
    });

    // Dedicated caption zoom buttons
    const zoomBtns = document.querySelectorAll('.plate-zoom-btn');
    zoomBtns.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        lastActiveElement = btn;
        openLightbox(idx);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-stage')) {
          closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal || (!lightboxModal.classList.contains('is-active') && !lightboxModal.classList.contains('active'))) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    });
  }

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentImageIndex = index;
    const item = galleryItems[index];

    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${item.number} / SHOT 16`;
    }

    updateLightboxCaption(index);

    lightboxModal.classList.add('is-active');
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    currentImageIndex = -1;

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function showPrevImage() {
    if (galleryItems.length === 0) return;
    const newIdx = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(newIdx);
  }

  function showNextImage() {
    if (galleryItems.length === 0) return;
    const newIdx = (currentImageIndex + 1) % galleryItems.length;
    openLightbox(newIdx);
  }

  function updateLightboxCaption(index) {
    const item = galleryItems[index];
    if (!item || !lightboxCaption) return;
    const desc = currentLang === 'zh' ? item.descZh : item.descEn;
    lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${desc}`;
  }

  /**
   * Nav Scroll Behavior
   */
  function initNavScroll() {
    if (!caseNav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        caseNav.classList.add('scrolled');
      } else {
        caseNav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /**
   * SHOT 08 Interactive Spec Viewer (W3C WAI-ARIA Tablist with Arrow Navigation)
   */
  function initShot08SpecViewer() {
    const tabBtns = Array.from(document.querySelectorAll('.shot08-spec-tab'));
    const specPanels = document.querySelectorAll('.shot08-spec-panel');

    if (!tabBtns.length) return;

    function activateTab(btn, focus = false) {
      const target = btn.getAttribute('data-spec-target');
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      if (focus) btn.focus();

      specPanels.forEach(panel => {
        if (panel.id === `spec-${target}`) {
          panel.style.display = 'grid';
        } else {
          panel.style.display = 'none';
        }
      });
    }

    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        activateTab(btn, false);
      });

      btn.addEventListener('keydown', (e) => {
        let newIdx = idx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIdx = (idx + 1) % tabBtns.length;
          activateTab(tabBtns[newIdx], true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIdx = (idx - 1 + tabBtns.length) % tabBtns.length;
          activateTab(tabBtns[newIdx], true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          activateTab(tabBtns[0], true);
        } else if (e.key === 'End') {
          e.preventDefault();
          activateTab(tabBtns[tabBtns.length - 1], true);
        }
      });
    });
  }

  // DOM Content Loaded Execution
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initLightbox();
    initNavScroll();
    initShot08SpecViewer();
  });
})();
