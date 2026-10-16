/**
 * HOWARD PORTFOLIO — ABOUT HOWARD MOTION IDENTITY V1
 * Dedicated Motion Video Controller & Accessible Interaction Logic
 * Architecture: Isolated Component Module (Zero Production Mutation)
 */

(function () {
  'use strict';

  // 1. Extend Bilingual i18n Dictionary for Motion Identity Module
  function initMotionI18n() {
    if (window.howardI18n && window.howardI18n.translations) {
      window.howardI18n.translations['en'] = window.howardI18n.translations['en'] || {};
      window.howardI18n.translations['en'].aboutMotion = {
        meta: 'MOTION IDENTITY STUDY',
        title: 'HOWARD IN MOTION',
        subtitle: 'ONE IDENTITY. MANY FORMS.',
        kanji: '動態視覺識別',
        shortDesc: 'A continuous cinematic portrait capturing two complementary facets of creative practice: deep reflective inquiry and sharp architectural execution.',
        playLabel: 'PLAY FILM',
        playSub: '10 SECONDS',
        cap1Label: 'ACT 01 \u00B7 \u975C \u00B7 CONTEMPLATION',
        cap1Title: 'THE STRATEGIC CONTEMPLATION',
        cap1Desc: 'Seated portrait in knitwear, exploring deliberate poise, internal calibration, and the synthesis of brand narrative before execution.',
        cap2Label: 'ACT 02 \u00B7 \u52D5 \u00B7 ARCHITECTURE',
        cap2Title: 'THE ARCHITECTURAL PRESENCE',
        cap2Desc: 'Tailored suit silhouette, transitioning into direct gaze and structural decisiveness\u2014building enduring systems that command space.'
      };

      window.howardI18n.translations['zh-TW'] = window.howardI18n.translations['zh-TW'] || {};
      window.howardI18n.translations['zh-TW'].aboutMotion = {
        meta: '動態識別形象研究',
        title: '動態識別：HOWARD IN MOTION',
        subtitle: '單一識別・多元形態',
        kanji: '動態視覺識別',
        shortDesc: '10 秒連貫動態形象研究，呈現在策略深思與架構實踐之間切換的雙重創作形態。',
        playLabel: '播放影片',
        playSub: '10 秒完整影片',
        cap1Label: '第一幕 \u00B7 靜 \u00B7 策略凝思',
        cap1Title: '策略凝思 \u00B7 針織坐姿',
        cap1Desc: '以沉靜坐姿與黑色針織衫為核心，展現執行前對品牌敘事與數位架構的深層推敲。',
        cap2Label: '第二幕 \u00B7 動 \u00B7 架構建構',
        cap2Title: '架構建構 \u00B7 西裝站姿',
        cap2Desc: '轉折至洗鍊西裝姿態，視線沉穩聚焦前方，象徵化策略為堅定結構的視覺主導力。'
      };

      // Re-apply current active language
      const curLang = typeof window.howardI18n.getCurrentLanguage === 'function' 
        ? window.howardI18n.getCurrentLanguage() 
        : 'en';
      if (typeof window.howardI18n.setLanguage === 'function') {
        window.howardI18n.setLanguage(curLang);
      }
    }
  }

  // 2. Format Seconds as MM:SS Helper
  function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  // 3. Main Player Controller
  function initMotionPlayer() {
    const video = document.getElementById('howardMotionVideo');
    const playBtn = document.getElementById('motionPlayBtn');
    const statusPill = document.getElementById('motionPlaybackStatus');
    const timeDisplay = document.getElementById('motionTimeDisplay');

    if (!video || !playBtn) return;

    // Start playback strictly upon direct user interaction
    function startPlayback() {
      if (video.paused) {
        // Ensure playback is not blocked by browser sound policy
        video.muted = true;
        // Enable native controls upon interaction for full keyboard & screen reader accessibility
        video.controls = true;
        video.play().then(() => {
          playBtn.classList.add('is-hidden');
          if (statusPill) statusPill.classList.add('is-active');
        }).catch(err => {
          console.warn('[About Motion] Video playback notice:', err);
        });
      }
    }

    // Play button click & keyboard support
    playBtn.addEventListener('click', startPlayback);

    // Update time indicator on native timeupdate (no rAF loop)
    video.addEventListener('timeupdate', () => {
      if (timeDisplay) {
        const cur = formatTime(video.currentTime);
        const dur = formatTime(video.duration || 10);
        timeDisplay.textContent = cur + ' / ' + dur;
      }
    });

    video.addEventListener('play', () => {
      playBtn.classList.add('is-hidden');
      if (statusPill) statusPill.classList.add('is-active');
    });

    video.addEventListener('pause', () => {
      // If paused at the very beginning, restore overlay
      if (video.currentTime === 0) {
        playBtn.classList.remove('is-hidden');
        if (statusPill) statusPill.classList.remove('is-active');
      }
    });

    // Reset cleanly when film finishes
    video.addEventListener('ended', () => {
      video.controls = false;
      try {
        video.load();
      } catch (e) {
        video.currentTime = 0;
      }
      playBtn.classList.remove('is-hidden');
    });

    // Zero background resource drain: pause if tab is hidden or user navigates
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !video.paused) {
        video.pause();
      }
    });

    window.addEventListener('pagehide', () => {
      if (!video.paused) {
        video.pause();
      }
    });

    // Test playback verification hook (if query string has ?play=1)
    if (window.location.search && window.location.search.includes('play=1')) {
      window.addEventListener('load', () => {
        video.muted = true;
        video.controls = true;
        video.currentTime = 2.4;
        video.play().catch(() => {});
        playBtn.classList.add('is-hidden');
        if (statusPill) statusPill.classList.add('is-active');
      });
    }
  }

  // 4. Initialize on DOM ready
  function init() {
    initMotionI18n();
    initMotionPlayer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
