/**
 * From Life To Lines // Kinetic Editorial Engine 2026
 * Single-Page Editorial Scroll Controller & Acoustic Telemetry
 */

// 1. Procedural Web Audio Synthesizer
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

  playBlip(freq = 600, duration = 0.04, type = 'sine') {
    if (this.isMuted) return;
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
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
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.1);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.1);
  }
}

const audio = new SoundEngine();

// 2. Mobile Navigation Drawer Controls
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
  audio.playBlip(400, 0.04);
  drawer.classList.remove('translate-y-0');
  drawer.classList.add('-translate-y-full');
  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
  setTimeout(() => {
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }, 350);
}

// 3. Scroll-Spy Navigation Highlighting
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

// 4. 3D Card Mouse Perspective Physics (Desktop only)
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// 5. Clock Telemetry
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
    clockEl.innerText = `TPE ${tpe} (UTC+8)`;
  };
  setInterval(updateTime, 1000);
  updateTime();
}

// 6. DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
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

  // Acoustic click feedback for interactive CTA buttons
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      if (!el.getAttribute('onclick')) {
        audio.playBlip(540, 0.02);
      }
    });
  });
});
