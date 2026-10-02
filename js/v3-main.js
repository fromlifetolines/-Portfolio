/**
 * HOWARD PORTFOLIO 3.0 — FOUNDATIONAL RUNTIME
 * Architecture & Interaction Scaffold
 */

(function () {
  'use strict';

  // 1. Live Taipei Telemetry Clock
  function initLiveClock() {
    const clockEl = document.getElementById('v3-telemetry-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Taipei',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `TPE ${timeStr}`;
    }

    update();
    setInterval(update, 1000);
  }

  // 2. Active Section Spy for Navigation
  function initSectionSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.v3-nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // 3. Howard System Interaction Scaffolding (Phase 01 Hooks)
  function initHowardSystemScaffold() {
    const layerBtns = document.querySelectorAll('.v3-layer-btn');
    const viewPills = document.querySelectorAll('.v3-view-pill');
    const telemetryState = document.getElementById('v3-sys-state-readout');

    layerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        layerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const layer = btn.getAttribute('data-layer');
        if (telemetryState) {
          telemetryState.textContent = `LAYER: ${layer}`;
        }
      });
    });

    viewPills.forEach(pill => {
      pill.addEventListener('click', () => {
        viewPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const view = pill.getAttribute('data-view');
        if (telemetryState) {
          telemetryState.textContent = `VIEW: ${view}`;
        }
      });
    });
  }

  // 4. Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    initSectionSpy();
    initHowardSystemScaffold();

    console.log(
      '%c HOWARD PORTFOLIO 3.0 %c PHASE 01 FOUNDATION ACTIVE %c',
      'background:#CCFF00; color:#000; font-weight:bold; padding:2px 6px;',
      'background:#181818; color:#F3F3EE; padding:2px 6px;',
      'background:transparent'
    );
  });
})();
