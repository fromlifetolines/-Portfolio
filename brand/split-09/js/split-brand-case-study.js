/**
 * FLTL × HOWARD — SPLIT/09 BRAND CASE STUDY INTERACTION ENGINE V1.0
 * Features:
 *  - Persistent Bilingual Switcher (ZH / EN) synchronized with 'howard-portfolio-lang'
 *  - High-Resolution Lightbox Modal with Keyboard Navigation (ESC, Left, Right)
 *  - Nav Elevation on Scroll
 *  - SHOT 15 In-Memory Client-Side Registration Demo (Zero Network / Zero Storage)
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
  const lightboxCounter = document.getElementById('lightbox-counter');
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
      document.title = 'SPLIT/09 — 城市夜間路跑整合廣告企劃案例 | FLTL × HOWARD';
    } else {
      document.title = 'SPLIT/09 — Urban Night Run Campaign Brand Case Study | FLTL × HOWARD';
    }

    // Update lightbox caption if active
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
      wrap.setAttribute('aria-label', `點擊或按 Enter 放大檢視 ${galleryItems[idx]?.number || ''} ${galleryItems[idx]?.title || ''} 高解析大圖`);
      wrap.addEventListener('click', () => {
        openLightbox(idx);
      });
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
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
      if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
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
      lightboxCounter.textContent = `${item.number} / SHOT 18`;
    }

    updateLightboxCaption(index);

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    currentImageIndex = -1;
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
   * SHOT 15 In-Memory Interactive Demo
   */
  function initShot15Demo() {
    const form = document.getElementById('shot15-demo-form');
    if (!form) return;

    const nameInput = document.getElementById('runner-name-input');
    const timeInput = document.getElementById('runner-time-input');
    const outName = document.getElementById('pass-display-name');
    const outBib = document.getElementById('pass-display-bib');
    const outTier = document.getElementById('pass-display-tier');
    const outTime = document.getElementById('pass-display-time');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selectedTierRadio = form.querySelector('input[name="race-tier"]:checked');
      const tierVal = selectedTierRadio ? selectedTierRadio.value : '10KM';
      const runnerName = nameInput.value.trim() || 'RUNNER-09';
      const targetTime = timeInput.value.trim() || '48:30';

      // Generate random simulated bib number
      const randomBibNum = Math.floor(1000 + Math.random() * 9000);
      const bibPrefix = tierVal === '5KM' ? 'EXP' : (tierVal === '10KM' ? 'CHL' : 'BYD');
      const bibString = `${bibPrefix}-${randomBibNum}`;

      if (outName) outName.textContent = runnerName;
      if (outBib) outBib.textContent = bibString;
      if (outTier) outTier.textContent = tierVal;
      if (outTime) outTime.textContent = targetTime;

      // Subtle pulse feedback
      const card = document.getElementById('runner-pass-preview');
      if (card) {
        card.style.transform = 'scale(1.02)';
        card.style.borderColor = 'var(--c-orange)';
        setTimeout(() => {
          card.style.transform = '';
          card.style.borderColor = '';
        }, 250);
      }
    });
  }

  // DOM Content Loaded Execution
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initLightbox();
    initNavScroll();
    initShot15Demo();
  });
})();
