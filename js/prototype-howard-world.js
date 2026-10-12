/**
 * HOWARD PORTFOLIO 4.0 — MOTION FIDELITY RECONSTRUCTION
 * PRIMARY REFERENCE SPECIFICATION: https://landonorris.com/
 * 
 * Features:
 * - Preloader / Initial Identity Entrance Sequence
 * - Lenis Inertial Smooth Scrolling integrated with GSAP ScrollTrigger
 * - Multi-depth Pointer Parallax on Hero with independent layer damping
 * - Hero Scroll Pinning / Differential Depth Transformation
 * - Message Typographic Line Mask Reveals & Theme Transitions
 * - Editorial Media Differential Parallax & Signature Path Draw
 * - Work & About Portals Hover Focus/Dim States (ON TRACK / OFF TRACK)
 * - Projects Hall of Fame 3D Perspective Tilt & Spatial Depth Lift
 * - Magnetic Button Microinteractions & Route Transition Curtain
 * - Mobile Touch Adaptation (Smooth reduced motion for touch viewports)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  initSmoothScroll();
  initPreloader();
  initNavTheme();
  initMenuDrawer();
  initHeroContoursCanvas();
  initHeroMultiDepthPointer();
  initHeroScrollSequence();
  initHorizontalJourney();
  initFinaleMotion();
  initMessageTextReveals();
  initEditorialParallax();
  initPortalsHoverState();
  initFLTL3DCard();
  initProjectArchive();
  initMagneticButtons();
  initRouteTransition();
});

/* ========================================================
   01. SMOOTH INERTIAL SCROLLING (Lenis + GSAP ScrollTrigger)
   ======================================================== */
let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
}

/* ========================================================
   02. PRELOADER & INITIAL IDENTITY ENTRANCE
   ======================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloaderProgress');
  if (!preloader) return;

  // Animate progress bar
  if (progressBar) {
    progressBar.style.width = '100%';
  }

  setTimeout(() => {
    preloader.classList.add('is-hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 650);
    animateHeroEntrance();
  }, 850);
}

function animateHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline();
  tl.from('#mainNav', {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('#heroEditorialBadge', {
    y: -25,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.5')
  .from('#heroScrollRig', {
    y: 50,
    scale: 0.95,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.home-hero-status-block', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.7')
  .from('.hero-touch-helper', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.5');
}

/* ========================================================
   03. NAVIGATION THEME SYNCHRONIZATION
   ======================================================== */
function initNavTheme() {
  const body = document.body;
  const darkSections = document.querySelectorAll('#message, #editorial, #helmets, #socials, #footer');

  function updateTheme() {
    let isDark = false;
    darkSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 75 && rect.bottom >= 75) {
        isDark = true;
      }
    });
    body.setAttribute('data-nav-theme', isDark ? 'dark' : 'light');
  }

  window.addEventListener('scroll', updateTheme, { passive: true });
  updateTheme();
}

/* ========================================================
   04. FULLSCREEN MENU DRAWER
   ======================================================== */
function initMenuDrawer() {
  const hamBtn = document.getElementById('navHamBtn');
  const menuOverlay = document.getElementById('navMenuOverlay');
  if (!hamBtn || !menuOverlay) return;

  function toggleMenu() {
    const isOpen = menuOverlay.classList.toggle('is-open');
    hamBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamBtn.addEventListener('click', toggleMenu);

  menuOverlay.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
      menuOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

/* ========================================================
   05. HERO PORTRAIT STATE (Stable Seated Color Cutout)
   - Baseline seated Howard color portrait (howard-hero-cutout.png)
   - Clean, crisp, natural color presentation
   - Zero distortion, zero black-and-white mask, zero image swap
   - Maintained stable and crisp pending authentic gaze motion assets
   ======================================================== */

/* ========================================================
   06. HERO BACKGROUND CONTOURS CANVAS (Concentric Organic Rings)
   ======================================================== */
function initHeroContoursCanvas() {
  const canvas = document.getElementById('heroContoursCanvas');
  const heroSec = document.getElementById('hero');
  if (!canvas || !heroSec) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  let mouseX = width * 0.5;
  let mouseY = height * 0.5;
  let targetMouseX = width * 0.5;
  let targetMouseY = height * 0.5;
  let time = 0;
  let isHeroVisible = true;
  let animId = null;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }, { passive: true });

  const numRings = 14;
  const numPoints = 64;

  function startLoop() {
    if (!animId && isHeroVisible && !document.hidden) {
      animId = requestAnimationFrame(renderContours);
    }
  }

  function stopLoop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isHeroVisible = Boolean(entries[0] && entries[0].isIntersecting);
      if (isHeroVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    }, { rootMargin: '50px' });
    observer.observe(heroSec);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopLoop();
    } else if (isHeroVisible) {
      startLoop();
    }
  });

  function renderContours() {
    if (!isHeroVisible || document.hidden) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(renderContours);
    time += 0.016;

    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.52;
    const maxRadius = Math.min(width, height) * 0.62;

    ctx.save();
    ctx.lineWidth = 1.0;

    for (let r = 1; r <= numRings; r++) {
      const baseRadius = (r / numRings) * maxRadius;
      const alpha = 0.028 + (1 - r / numRings) * 0.038;
      ctx.strokeStyle = `rgba(18, 22, 19, ${alpha.toFixed(3)})`;

      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;

        const px = centerX + Math.cos(theta) * baseRadius;
        const py = centerY + Math.sin(theta) * baseRadius * 0.95;

        const dx = px - mouseX;
        const dy = py - mouseY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseEffectRadius = 240;

        let mouseDisp = 0;
        if (distToMouse < mouseEffectRadius) {
          const factor = (1 - distToMouse / mouseEffectRadius);
          mouseDisp = Math.sin(distToMouse * 0.08 - time * 3.5) * 14 * factor;
        }

        const harmonicDisp = Math.sin(theta * 4 + time * 1.2 + r * 0.5) * 3.5 +
                             Math.cos(theta * 2 - time * 0.8) * 2.0;

        const totalR = baseRadius + mouseDisp + harmonicDisp;
        const finalX = centerX + Math.cos(theta) * totalR;
        const finalY = centerY + Math.sin(theta) * totalR * 0.95;

        if (i === 0) {
          ctx.moveTo(finalX, finalY);
        } else {
          ctx.lineTo(finalX, finalY);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  }

  startLoop();
}

/* ========================================================
   07. HERO MULTI-DEPTH POINTER PARALLAX (Restrained Luxury Tilt)
   ======================================================== */
function initHeroMultiDepthPointer() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900;
  if (isTouch) return;

  const heroSec = document.getElementById('hero');
  const pointerRig = document.getElementById('heroPointerRig');
  const editorialBadge = document.getElementById('heroEditorialBadge');
  const statusBlock = document.querySelector('.home-hero-status-block .status-block-content');
  if (!heroSec || !pointerRig) return;

  let targetNormX = 0;
  let targetNormY = 0;
  let currNormX = 0;
  let currNormY = 0;
  let isHeroVisible = true;
  let isRunning = false;
  let animId = null;

  function startParallax() {
    if (!isRunning && isHeroVisible && !document.hidden) {
      isRunning = true;
      animId = requestAnimationFrame(renderParallax);
    }
  }

  function stopParallax() {
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isHeroVisible = Boolean(entries[0] && entries[0].isIntersecting);
      if (!isHeroVisible) {
        stopParallax();
      } else {
        startParallax();
      }
    }, { rootMargin: '50px' });
    observer.observe(heroSec);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopParallax();
    } else if (isHeroVisible) {
      startParallax();
    }
  });

  window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    targetNormX = (e.clientX - w / 2) / (w / 2);
    targetNormY = (e.clientY - h / 2) / (h / 2);
    if (isHeroVisible && !isRunning) {
      startParallax();
    }
  }, { passive: true });

  function renderParallax() {
    if (!isHeroVisible || document.hidden) {
      stopParallax();
      return;
    }

    const diffX = targetNormX - currNormX;
    const diffY = targetNormY - currNormY;
    currNormX += diffX * 0.08;
    currNormY += diffY * 0.08;

    // Howard Figure: Kept completely stable in natural seated pose (NO tilt / NO cursor follow)
    pointerRig.style.transform = 'none';

    // Editorial Badge counter-drift
    if (editorialBadge) {
      editorialBadge.style.transform = `translate3d(calc(-50% + ${currNormX * -8}px), ${currNormY * -5}px, 0)`;
    }

    // Status Block counter-drift
    if (statusBlock) {
      statusBlock.style.transform = `translate3d(${currNormX * -8}px, ${currNormY * -5}px, 0)`;
    }

    // Stop updating if resting (within epsilon)
    if (Math.abs(diffX) < 0.0005 && Math.abs(diffY) < 0.0005) {
      stopParallax();
    } else {
      animId = requestAnimationFrame(renderParallax);
    }
  }

  startParallax();
}

/* ========================================================
   08. HERO SCROLL TRANSFORMATION & DEPTH SEQUENCE
   ======================================================== */
function initHeroScrollSequence() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rig = document.getElementById('heroScrollRig');
  const badge = document.getElementById('heroEditorialBadge');
  const statusBlock = document.querySelector('.home-hero-status-block');
  const helper = document.querySelector('.hero-touch-helper');
  const contours = document.querySelector('.hero-contours-canvas');
  if (!rig) return;

  const scene = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: () => '+=' + Math.round(window.innerHeight * 0.95),
      scrub: 0.15,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  scene.to(rig, { scale: 1.06, y: -28, ease: 'none', duration: 0.48 }, 0)
       .to(rig, { scale: 0.88, x: window.innerWidth > 899 ? 120 : 0, y: -130, ease: 'none', duration: 0.52 }, 0.48);

  if (badge) scene.to(badge, { opacity: 0, y: -45, ease: 'none', duration: 0.35 }, 0);
  if (statusBlock) scene.to(statusBlock, { opacity: 0, y: 52, ease: 'none', duration: 0.36 }, 0.1);
  if (helper) scene.to(helper, { opacity: 0, y: 22, ease: 'none', duration: 0.25 }, 0);
  if (contours) scene.to(contours, { opacity: 0.35, ease: 'none', duration: 1 }, 0);
}

/* ========================================================
   07. MESSAGE TYPOGRAPHIC LINE MASK REVEALS
   ======================================================== */
function initMessageTextReveals() {
  const lineInners = document.querySelectorAll('.msg-line-inner');
  const wreathWrap = document.querySelector('.message-emblem-wrap');
  if (lineInners.length === 0) return;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    if (wreathWrap) {
      gsap.from(wreathWrap, {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#message',
          start: 'top 75%'
        }
      });
    }

    gsap.to(lineInners, {
      y: '0%',
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#msgImpactText',
        start: 'top 80%'
      }
    });
  } else {
    // Fallback: reveal via class
    lineInners.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ========================================================
   08. EDITORIAL ASYMMETRICAL PARALLAX & SIGNATURE DRAW
   ======================================================== */
function initEditorialParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const itemFltl = document.getElementById('itemFltl');
  const itemFltlPackaging = document.getElementById('itemFltlPackaging');
  const itemFltlMacro = document.getElementById('itemFltlMacro');
  const sigPath = document.getElementById('editorialSigPath');

  if (itemFltl) {
    gsap.to(itemFltl, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: '#editorial',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  if (itemFltlPackaging) {
    gsap.to(itemFltlPackaging, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: {
        trigger: '#editorial',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  if (itemFltlMacro) {
    gsap.to(itemFltlMacro, {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: '#editorial',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Draw signature stroke
  if (sigPath) {
    const length = sigPath.getTotalLength ? sigPath.getTotalLength() : 200;
    sigPath.style.strokeDasharray = length;
    sigPath.style.strokeDashoffset = length;

    gsap.to(sigPath, {
      strokeDashoffset: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.editorial-quote-block',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1
      }
    });
  }
}

/* ========================================================
   09. WORK & ABOUT PORTALS HOVER FOCUS / DIM (ON TRACK / OFF TRACK)
   ======================================================== */
function initPortalsHoverState() {
  const portalsContainer = document.querySelector('.portals-container');
  const workCol = document.getElementById('work');
  const aboutCol = document.getElementById('about');
  if (!portalsContainer || !workCol || !aboutCol) return;

  workCol.addEventListener('mouseenter', () => {
    portalsContainer.classList.add('focus-work');
    portalsContainer.classList.remove('focus-about');
  });

  aboutCol.addEventListener('mouseenter', () => {
    portalsContainer.classList.add('focus-about');
    portalsContainer.classList.remove('focus-work');
  });

  portalsContainer.addEventListener('mouseleave', () => {
    portalsContainer.classList.remove('focus-work');
    portalsContainer.classList.remove('focus-about');
  });
}

/* ========================================================
   10. HALL OF FAME 3D WEB OBJECT — FLTL NFC SMART BUSINESS CARD
   Reference: Reconstructing landonorris.com helmet interaction role
   Standard card proportion: 85.6 × 54 mm (thickness 0.76mm)
   Artwork: Official FLTL NFC front & back textures
   ======================================================== */
function initFLTL3DCard() {
  const container = document.getElementById('fltlCardStage');
  const canvas = document.getElementById('fltlCardCanvas');
  const flipBtn = document.getElementById('btnCardFlip');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Stagger reveal on Scroll for the frame
  const cardItem = document.querySelector('.helmet-card-item');
  if (cardItem && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from(cardItem, {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.helmets-grid-container',
        start: 'top 85%'
      }
    });
  }

  // Dimensions
  let width = container.clientWidth || 400;
  let height = container.clientHeight || 340;

  // Renderer
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas, alpha: true, antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (error) {
    console.warn('FLTL 3D unavailable: showing official front artwork.', error);
    return; // Fallback image remains visible.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height, false);
  container.classList.add('webgl-ready');
  if ('outputEncoding' in renderer) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  if ('toneMapping' in renderer) {
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
  }

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
  camera.position.set(0, 0, 4.3);

  // Studio Lighting (restrained, tactile highlights matching reference)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
  keyLight.position.set(2.8, 3.8, 4.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
  fillLight.position.set(-3.2, -2.0, 3.2);
  scene.add(fillLight);

  // Neutral soft rim light for subtle edge definition (non-metallic)
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
  rimLight.position.set(-3.0, 3.2, -3.5);
  scene.add(rimLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.85);
  backLight.position.set(0, 2.0, -4.5);
  scene.add(backLight);

  // Textures (Official live FLTL NFC artwork from fromlifetolines.com)
  const textureLoader = new THREE.TextureLoader();
  const frontTexture = textureLoader.load('assets/NFC_official_front.jpg', () => {
    renderer.render(scene, camera);
  });
  const backTexture = textureLoader.load('assets/NFC_back.jpg', () => {
    renderer.render(scene, camera);
  });
  frontTexture.encoding = THREE.sRGBEncoding;
  backTexture.encoding = THREE.sRGBEncoding;
  const maxAnisotropy = renderer.capabilities ? renderer.capabilities.getMaxAnisotropy() : 4;
  frontTexture.anisotropy = maxAnisotropy;
  backTexture.anisotropy = maxAnisotropy;

  // Geometry: Standard card proportion 85.6 × 54 × 0.76 mm (Scale factor: 0.03)
  const cardW = 2.568;  // 85.6 mm
  const cardH = 1.62;   // 54.0 mm
  const cardR = 0.095;  // 3.18 mm rounded corner radius
  const cardThick = 0.0228; // 0.76 mm standard ISO/IEC 7810 ID-1 card thickness

  const shape = new THREE.Shape();
  const x = -cardW / 2;
  const y = -cardH / 2;
  shape.moveTo(x + cardR, y);
  shape.lineTo(x + cardW - cardR, y);
  shape.quadraticCurveTo(x + cardW, y, x + cardW, y + cardR);
  shape.lineTo(x + cardW, y + cardH - cardR);
  shape.quadraticCurveTo(x + cardW, y + cardH, x + cardW - cardR, y + cardH);
  shape.lineTo(x + cardR, y + cardH);
  shape.quadraticCurveTo(x, y + cardH, x, y + cardH - cardR);
  shape.lineTo(x, y + cardR);
  shape.quadraticCurveTo(x, y, x + cardR, y);

  // Extruded Core: Matte-Black PVC body without metallic bevel (ISO CR80 die-cut edge)
  const extrudeSettings = {
    depth: cardThick,
    bevelEnabled: false,
    steps: 1,
    curveSegments: 36
  };
  const coreGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  coreGeo.center();

  // Core material: Non-metallic matte black PVC
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x141414,
    roughness: 0.85,
    metalness: 0.0
  });
  const coreMesh = new THREE.Mesh(coreGeo, edgeMaterial);

  // Front Face (Matte finish, non-metallic)
  const frontGeo = new THREE.ShapeGeometry(shape, 36);
  const fPos = frontGeo.attributes.position;
  const fUvs = [];
  for (let i = 0; i < fPos.count; i++) {
    const px = fPos.getX(i);
    const py = fPos.getY(i);
    fUvs.push((px - x) / cardW, (py - y) / cardH);
  }
  frontGeo.setAttribute('uv', new THREE.Float32BufferAttribute(fUvs, 2));

  const frontMaterial = new THREE.MeshStandardMaterial({
    map: frontTexture,
    roughness: 0.78,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -1.0,
    polygonOffsetUnits: -1.0
  });
  const frontMesh = new THREE.Mesh(frontGeo, frontMaterial);
  frontMesh.position.z = cardThick / 2 + 0.0004;

  // Back Face (Matte finish, non-metallic)
  const backGeo = new THREE.ShapeGeometry(shape, 36);
  const bPos = backGeo.attributes.position;
  const bUvs = [];
  for (let i = 0; i < bPos.count; i++) {
    const px = bPos.getX(i);
    const py = bPos.getY(i);
    bUvs.push((cardW - (px - x)) / cardW, (py - y) / cardH);
  }
  backGeo.setAttribute('uv', new THREE.Float32BufferAttribute(bUvs, 2));

  const backMaterial = new THREE.MeshStandardMaterial({
    map: backTexture,
    roughness: 0.78,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -1.0,
    polygonOffsetUnits: -1.0
  });
  const backMesh = new THREE.Mesh(backGeo, backMaterial);
  backMesh.rotation.y = Math.PI;
  backMesh.position.z = -cardThick / 2 - 0.0004;

  // Card Assembly
  const cardGroup = new THREE.Group();
  cardGroup.add(coreMesh);
  cardGroup.add(frontMesh);
  cardGroup.add(backMesh);
  scene.add(cardGroup);

  // Soft Shadow Plane underneath
  const sCanvas = document.createElement('canvas');
  sCanvas.width = 512;
  sCanvas.height = 512;
  const sCtx = sCanvas.getContext('2d');
  const sGrad = sCtx.createRadialGradient(256, 256, 20, 256, 256, 240);
  sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
  sGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.42)');
  sGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
  sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sCtx.fillStyle = sGrad;
  sCtx.fillRect(0, 0, 512, 512);

  const shadowTexture = new THREE.CanvasTexture(sCanvas);
  const shadowGeo = new THREE.PlaneGeometry(3.6, 2.3);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(0, -0.05, -0.45);
  scene.add(shadowMesh);

  // Interaction State (Lando helmet behavior model)
  const restRotX = -0.08;
  const restRotY = -0.22;
  const restRotZ = 0.04;
  let targetRotX = restRotX;
  let targetRotY = restRotY;
  let targetRotZ = restRotZ;
  let curRotX = restRotX;
  let curRotY = restRotY;
  let curRotZ = restRotZ;

  let targetPosZ = 0.0;
  let curPosZ = 0.0;

  let isHovered = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartRotX = 0;
  let dragStartRotY = 0;
  let dragDist = 0;

  let flipAngle = 0; // 0 or Math.PI

  // Scroll Entrance (NFC remains the only published project)
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    ScrollTrigger.create({
      trigger: '#helmets',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(cardGroup.scale, 
          { x: 0.75, y: 0.75, z: 0.75 },
          { x: 1, y: 1, z: 1, duration: 1.1, ease: 'power2.out' }
        );
        gsap.fromTo(cardGroup.position,
          { z: -1.2 },
          { z: 0, duration: 1.1, ease: 'power2.out' }
        );
      }
    });
  }

  // Pointer Tracking & Hover
  function onPointerMove(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((clientY - rect.top) / rect.height) * 2 - 1;

    if (isDragging) {
      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;
      dragDist = Math.hypot(deltaX, deltaY);
      targetRotY = dragStartRotY + (deltaX * 0.012);
      targetRotX = dragStartRotX + (deltaY * 0.012);
    } else if (isHovered) {
      targetRotX = restRotX - (normY * 0.42);
      targetRotY = restRotY + flipAngle + (normX * 0.62);
      targetRotZ = restRotZ + (normX * 0.1);
    }
  }

  container.addEventListener('mouseenter', (e) => {
    isHovered = true;
    targetPosZ = 0.52; // Forward depth lift matching helmet
    onPointerMove(e.clientX, e.clientY);
  });

  container.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX, e.clientY);
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    isDragging = false;
    targetPosZ = 0.0;
    targetRotX = restRotX;
    targetRotY = restRotY + flipAngle;
    targetRotZ = restRotZ;
  });

  // Drag interaction
  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.closest('button, a')) return;
    isDragging = true;
    dragDist = 0;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartRotX = curRotX;
    dragStartRotY = curRotY;
  });

  window.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
    }
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.target.closest('button, a')) return;
    if (e.touches.length === 1) {
      isHovered = true;
      isDragging = true;
      dragDist = 0;
      targetPosZ = 0.45;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      dragStartRotX = curRotX;
      dragStartRotY = curRotY;
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isDragging = false;
    isHovered = false;
    targetPosZ = 0.0;
    targetRotX = restRotX;
    targetRotY = restRotY + flipAngle;
    targetRotZ = restRotZ;
  });

  // Flip Button 180°
  if (flipBtn) {
    flipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      flipAngle = flipAngle === 0 ? Math.PI : 0;
      targetRotY = restRotY + flipAngle;
      if (typeof gsap !== 'undefined') {
        gsap.to(flipBtn, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 });
      }
    });
  }

  // The WebGL renderer only paints while its interactive card is visible.
  let isStageVisible = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      isStageVisible = Boolean(entries[0] && entries[0].isIntersecting);
    }, { rootMargin: '150px' });
    observer.observe(container);
  }

  // Animation Loop with Inertial Damping & Idle Breathing Float
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Idle floating micro-oscillation when not dragging
    let floatY = 0;
    let floatRotX = 0;
    let floatRotY = 0;
    if (!isDragging) {
      floatY = Math.sin(elapsedTime * 1.6) * 0.035;
      floatRotX = Math.sin(elapsedTime * 1.3) * 0.015;
      floatRotY = Math.cos(elapsedTime * 1.4) * 0.02;
    }

    // Easing (smooth lerp damping)
    curRotX += (targetRotX + floatRotX - curRotX) * 0.08;
    curRotY += (targetRotY + floatRotY - curRotY) * 0.08;
    curRotZ += (targetRotZ - curRotZ) * 0.08;
    curPosZ += (targetPosZ - curPosZ) * 0.08;

    cardGroup.rotation.x = curRotX;
    cardGroup.rotation.y = curRotY;
    cardGroup.rotation.z = curRotZ;
    cardGroup.position.y = floatY;
    cardGroup.position.z = curPosZ;

    // Dynamic Shadow response
    shadowMesh.position.y = -0.05 + floatY * 0.5;
    const shadowScale = 1 + (curPosZ * 0.22);
    shadowMesh.scale.set(shadowScale, shadowScale, 1);
    shadowMat.opacity = Math.max(0.28, 0.55 - (curPosZ * 0.2));

    if (isStageVisible) renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  function onResize() {
    width = container.clientWidth || 400;
    height = container.clientHeight || 340;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  window.addEventListener('resize', onResize);
  if (window.ResizeObserver) {
    new ResizeObserver(onResize).observe(container);
  }
}

/* ========================================================
   11A. REAL SIDEWAYS MOTION SCENE — VERTICAL SCROLL => HORIZONTAL TRAVEL
   ======================================================== */
function initHorizontalJourney() {
  const section = document.getElementById('motion-rail');
  const track = document.getElementById('motionRailTrack');
  const index = document.getElementById('railProgressIndex');
  if (!section || !track || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  ScrollTrigger.matchMedia({
    '(min-width: 900px) and (prefers-reduced-motion: no-preference)': function () {
      section.classList.add('is-horizontal-active');
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -getDistance(), ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => '+=' + getDistance(),
          scrub: .75, pin: '#motionRailViewport', pinSpacing: true,
          anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: self => {
            if (index) index.textContent = String(Math.min(4, Math.floor(self.progress * 4) + 1)).padStart(2,'0') + ' / 04';
          }
        }
      });
      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill(); section.classList.remove('is-horizontal-active');
        gsap.set(track,{clearProps:'transform'});
      };
    }
  });
}

/* ========================================================
   11B. FULL-LENGTH HOWARD FINALE — SCROLL-DRIVEN PORTRAIT REVEAL
   ======================================================== */
function initFinaleMotion() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth<900) return;
  const portrait = document.getElementById('finalePortraitRig');
  if (!portrait) return;
  gsap.fromTo(portrait,{yPercent:32,scale:.8,opacity:.16},{yPercent:0,scale:1.06,opacity:1,ease:'none',scrollTrigger:{trigger:'#finale',start:'top bottom',end:'bottom bottom',scrub:1}});
  gsap.from('.finale-content',{y:70,opacity:0,duration:1,scrollTrigger:{trigger:'#finale',start:'top 72%'}});
}


/* ========================================================
   PUBLISHED PORTFOLIO REGISTRY — NO PLACEHOLDER CONTENT
   Add future verified work via js/prototype-projects.js.
   ======================================================== */
function initProjectArchive() {
  const container = document.querySelector('.helmets-grid-container');
  const items = window.HOWARD_PROJECTS;
  if (!container || !Array.isArray(items)) return;
  const published = items.filter(item => item && item.published === true && item.id && item.title && item.cover && item.caseStudy)
    .sort((a,b) => (a.order || 999) - (b.order || 999));
  const extra = published.filter(p => p.id !== 'fltl-nfc');
  if (!extra.length) return; // The current approved site has exactly one item.
  container.classList.add('is-multi');
  const safeText = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeLocal = value => typeof value === 'string' && !/^(?:[a-z]+:|\/\/)/i.test(value) && !value.includes('..') && /^[a-zA-Z0-9_.\/-]+$/.test(value) ? value : null;
  for (const project of extra) {
    const cover = safeLocal(project.interactiveAsset || project.cover);
    const caseUrl = safeLocal(project.caseStudy);
    if (!cover || !caseUrl) continue;
    const card = document.createElement('article');
    card.className = 'helmet-project-extra';
    card.innerHTML = `<a class="helmet-project-extra-link" href="${safeText(caseUrl)}">
      <span class="helmet-project-extra-number">${safeText(String(project.order || '').padStart(2,'0'))}</span>
      <div class="helmet-project-extra-stage"><img src="${safeText(cover)}" alt="${safeText(project.title)}" loading="lazy" /></div>
      <span class="helmet-project-extra-title">${safeText(project.title)} · ${safeText(project.year || '')}</span>
      <span class="helmet-project-extra-desc"></span>
    </a>`;
    container.appendChild(card);
    const updateLang = () => {
      const lang = document.documentElement.lang === 'zh-TW' ? 'zh-TW' : 'en';
      const text = project.description && (project.description[lang] || project.description.en);
      card.querySelector('.helmet-project-extra-desc').textContent = text || '';
    };
    window.addEventListener('howard:languagechange', updateLang);
    updateLang();
  }
}

/* ========================================================
   11. MAGNETIC BUTTON MICROINTERACTIONS
   ======================================================== */
function initMagneticButtons() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900;
  if (isTouch) return;

  const magneticTargets = document.querySelectorAll('.btn-store-pill, .portal-btn-arrow');
  magneticTargets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ========================================================
   12. PROTOTYPE ROUTE PAGE TRANSITION
   ======================================================== */
function initRouteTransition() {
  const curtain = document.getElementById('routeTransitionCurtain');
  const textEl = document.getElementById('routeTransitionText');
  if (!curtain) return;

  const navLinks = document.querySelectorAll('.portal-btn-arrow, #navWorkBtn, .nav-menu-list a, #viewFltlBtn, .helmet-meta-link, .status-project-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // 1. Pass-through mailto, tel, or external links
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://') || link.getAttribute('target') === '_blank') {
        return;
      }

      // 2. In-page Anchor jump with smooth scroll
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -40, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      // 3. Internal page route (.html) transition
      if (href.includes('.html')) {
        e.preventDefault();
        if (textEl) {
          const isZh = window.howardI18n && window.howardI18n.getCurrentLanguage() === 'zh-TW';
          if (href.includes('about')) {
            textEl.textContent = isZh ? '關於 HOWARD' : 'ABOUT HOWARD';
          } else if (href.includes('nfc') || href.includes('portfolio-')) {
            textEl.textContent = isZh ? '正在開啟 FLTL NFC' : `OPENING ${link.getAttribute('title') || 'FLTL NFC'}`.toUpperCase();
          } else {
            textEl.textContent = isZh ? '載入中' : 'LOADING';
          }
        }
        curtain.classList.add('is-active');
        setTimeout(() => {
          window.location.href = href;
        }, 420);
      }
    });
  });
}

/* ========================================================
   GLOBAL SECTION CONTROLLER (For automated QA & testing)
   ======================================================== */
window.protoGoToSection = function(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset: -40, duration: 1.0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};
