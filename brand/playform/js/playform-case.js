/**
 * PLAYFORM Case 13 — Interactive Prototype Controller
 * Features:
 * - Bilingual (ZH-Hant / EN) state management
 * - 16-spread storybook reader with interactive choices
 * - Three.js WebGL GLB viewer with OrbitControls & keyboard navigation
 * - Canvas 3D mathematical fallback renderer
 * - Child cognitive learning challenges (3 progressive missions)
 * - Segregated Parent observation & Teacher lesson planning dashboards
 * - 16-shot art direction specifications gallery
 */

(function() {
  'use strict';

  // Global Application State
  const state = {
    lang: 'zh',
    currentTab: 'gallery',
    currentSpread: 0,
    currentModel: 'assembled',
    currentMission: 0,
    demoData: null,
    audioNoticeTimeout: null,
    webglReady: false,
    threeApp: null,
    canvasFallback: null,
    currentLightboxIndex: 0,
    lastFocusedElement: null
  };

  // DOM Cache helper
  const $ = id => document.getElementById(id);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Initialize once DOM is ready
  window.addEventListener('DOMContentLoaded', init);

  async function init() {
    try {
      const resp = await fetch('data/PLAYFORM_DEMO.json?v=restored-20261106');
      state.demoData = await resp.json();
    } catch (e) {
      console.warn('Could not fetch PLAYFORM_DEMO.json directly; using fallback data', e);
    }

    setupLanguageSwitcher();
    setupTabNavigation();
    setupStorybook();
    setup3DViewer();
    setupChildLearning();
    setupParentTeacher();
    setupSpecificationsGallery();
    setupLightbox();
    renderAll();
  }

  /* ----------------------------------------------------
   * 01. Bilingual (ZH / EN) State Management
   * ---------------------------------------------------- */
  function setupLanguageSwitcher() {
    const langBtn = $('langToggle');
    if (!langBtn) return;
    langBtn.addEventListener('click', () => {
      state.lang = state.lang === 'zh' ? 'en' : 'zh';
      langBtn.textContent = state.lang === 'zh' ? 'EN' : '中文';
      langBtn.setAttribute('aria-label', state.lang === 'zh' ? '切換為英文介面' : 'Switch to Traditional Chinese');
      renderAll();
    });
  }

  function renderAll() {
    renderI18nText();
    renderStorySpread();
    renderChildMission();
    renderParentTeacher();
    renderSpecifications();
    renderLightboxContent();
  }

  function renderI18nText() {
    const isZh = state.lang === 'zh';
    $$('[data-i18n-zh]').forEach(el => {
      const text = isZh ? el.getAttribute('data-i18n-zh') : el.getAttribute('data-i18n-en');
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = text;
        } else {
          el.textContent = text;
        }
      }
    });

    $$('.zh-text').forEach(el => { el.hidden = !isZh; });
    $$('.en-text').forEach(el => { el.hidden = isZh; });
  }

  /* ----------------------------------------------------
   * 02. Tab Navigation (IA Segregation)
   * ---------------------------------------------------- */
  function setupTabNavigation() {
    const tabs = $$('.nav-tab');
    const sections = $$('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        state.currentTab = target;

        tabs.forEach(t => {
          const isCurrent = t.dataset.tab === target;
          t.classList.toggle('active', isCurrent);
          t.setAttribute('aria-pressed', String(isCurrent));
        });

        sections.forEach(sec => {
          const isTarget = sec.id === `tab-${target}`;
          sec.classList.toggle('active', isTarget);
          sec.hidden = !isTarget;
        });

        if (target === 'threed') {
          if (state.threeApp && state.threeApp.onResize) {
            state.threeApp.onResize();
          } else if (state.canvasFallback && state.canvasFallback.draw) {
            state.canvasFallback.draw();
          }
        }
      });
    });
  }

  /* ----------------------------------------------------
   * 03. 16-Spread Storybook Reader
   * ---------------------------------------------------- */
  function setupStorybook() {
    const prevBtn = $('storyPrev');
    const nextBtn = $('storyNext');
    const spreadSelect = $('spreadSelect');
    const audioBtn = $('audioBtn');
    const audioFeedback = $('audioFeedback');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.currentSpread > 0) {
          state.currentSpread--;
          renderStorySpread();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const spreads = (state.demoData && state.demoData.storybook && state.demoData.storybook.spreads) || [];
        if (state.currentSpread < spreads.length - 1) {
          state.currentSpread++;
          renderStorySpread();
        }
      });
    }

    if (spreadSelect) {
      spreadSelect.addEventListener('change', (e) => {
        state.currentSpread = parseInt(e.target.value, 10) || 0;
        renderStorySpread();
      });
    }

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (!audioFeedback) return;
        audioFeedback.hidden = false;
        audioFeedback.textContent = state.lang === 'zh'
          ? '提示：精裝繪本專業朗讀音檔錄製中，此處為單機無障礙輔助示範。'
          : 'Note: Professional audiobook audio is in production; demonstrative accessibility preview.';
        clearTimeout(state.audioNoticeTimeout);
        state.audioNoticeTimeout = setTimeout(() => {
          audioFeedback.hidden = true;
        }, 5000);
      });
    }
  }

  function renderStorySpread() {
    if (!state.demoData || !state.demoData.storybook) return;
    const spreads = state.demoData.storybook.spreads;
    const current = spreads[state.currentSpread] || spreads[0];
    const isZh = state.lang === 'zh';

    // Page headers & numbers
    const spreadHeader = $('spreadHeader');
    if (spreadHeader) {
      spreadHeader.textContent = `SPREAD ${current.spread_no} / 16 · PAGE ${current.page_range}`;
    }

    const storyText = $('storyText');
    if (storyText) {
      storyText.textContent = isZh ? current.zh : current.en;
    }

    const spreadFocus = $('spreadFocus');
    if (spreadFocus) {
      spreadFocus.textContent = isZh ? `焦點：${current.focus_zh}` : `Focus: ${current.focus_en}`;
    }

    const spreadActivity = $('spreadActivity');
    if (spreadActivity) {
      spreadActivity.textContent = isZh ? `活動：${current.activity_zh}` : `Activity: ${current.activity_en}`;
    }

    // Update select dropdown
    const spreadSelect = $('spreadSelect');
    if (spreadSelect && spreadSelect.options.length !== spreads.length) {
      spreadSelect.innerHTML = '';
      spreads.forEach((sp, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `Spread ${sp.spread_no}: ${isZh ? sp.zh.slice(0, 16) + '...' : sp.en.slice(0, 24) + '...'}`;
        spreadSelect.appendChild(opt);
      });
    }
    if (spreadSelect) {
      spreadSelect.value = state.currentSpread;
    }

    // Update Prev / Next buttons
    const prevBtn = $('storyPrev');
    const nextBtn = $('storyNext');
    if (prevBtn) prevBtn.disabled = state.currentSpread === 0;
    if (nextBtn) nextBtn.disabled = state.currentSpread === spreads.length - 1;

    // Render artwork for spread
    renderSpreadArtwork(current);
    renderSpreadInteractions(current);
  }

  function renderSpreadArtwork(spread) {
    const artworkBox = $('spreadArtwork');
    if (!artworkBox) return;

    const num = spread.spread_no;
    const proofSrc = spread.proof_path || `assets/storybook_proofs/spread-${num}.png`;
    const title = spread.title_zh || `跨頁 ${num}`;

    artworkBox.innerHTML = `
      <div class="proof-figure" style="position:relative; width:100%; border-radius:8px; overflow:hidden; background:#FFF5E3; border:1px solid #D6C29E;">
        <img src="${proofSrc}" 
             alt="跨頁 ${num} 2:1 場景分鏡稿（${title}）" 
             style="width:100%; aspect-ratio:2/1; object-fit:contain; display:block;" 
             loading="lazy" 
             onerror="this.onerror=null; this.parentElement.innerHTML = generateSpreadSvg(state.demoData.storybook.spreads.find(s => s.spread_no === '${num}'));">
        <div style="position:absolute; bottom:6px; right:8px; font-size:10px; font-weight:700; color:#5D3C39; background:rgba(255,249,245,0.9); padding:2px 6px; border-radius:4px; border:1px solid #D6C29E;">
          2:1 分鏡稿 · 出版完稿待繪
        </div>
      </div>
    `;
  }

  function generateSpreadSvg(spread) {
    const num = parseInt(spread.spread_no, 10);
    // Dynamic palette-based vector art
    return `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="繪本跨頁 ${spread.spread_no} 概念插畫" style="width:100%; max-height:220px; border-radius:8px;">
        <rect width="400" height="240" fill="#FFF2D6" />
        <path d="M0 160 Q120 130 200 165 T400 145 V240 H0 Z" fill="#C7DFD6" />
        <path d="M0 195 Q140 170 240 195 T400 180 V240 H0 Z" fill="#78B1C4" />
        <!-- River banks -->
        <rect x="20" y="145" width="85" height="50" rx="6" fill="#1A3F81" opacity="0.9" />
        <rect x="295" y="145" width="85" height="50" rx="6" fill="#1A3F81" opacity="0.9" />
        <!-- Dynamic scene elements depending on story progress -->
        ${num >= 7 ? '<path d="M95 145 A105 105 0 0 1 305 145" fill="none" stroke="#F7D75B" stroke-width="18" stroke-linecap="round" />' : ''}
        ${num >= 9 && num !== 10 ? '<line x1="80" y1="130" x2="320" y2="130" stroke="#EF8C8C" stroke-width="10" stroke-linecap="round" />' : ''}
        ${num === 10 ? '<line x1="80" y1="120" x2="320" y2="140" stroke="#EF8C8C" stroke-width="10" stroke-linecap="round" stroke-dasharray="8 4" />' : ''}
        ${num >= 12 ? '<rect x="180" y="112" width="20" height="18" fill="#1A3F81" rx="3" /><rect x="204" y="112" width="20" height="18" fill="#EF8C8C" rx="3" />' : ''}
        <!-- Characters -->
        <circle cx="65" cy="115" r="22" fill="#F7D75B" stroke="#1A3F81" stroke-width="3" />
        <circle cx="58" cy="112" r="3" fill="#1A3F81" />
        <circle cx="72" cy="112" r="3" fill="#1A3F81" />
        <rect x="315" y="105" width="36" height="40" rx="6" fill="#1A3F81" />
        <circle cx="327" cy="120" r="3" fill="#FFFFFF" />
        <circle cx="339" cy="120" r="3" fill="#FFFFFF" />
        <text x="200" y="32" text-anchor="middle" fill="#1A3F81" font-size="12" font-weight="800" letter-spacing="1">SHAPE CITY · SPREAD ${spread.spread_no}</text>
      </svg>
    `;
  }

  function renderSpreadInteractions(spread) {
    const box = $('spreadInteractionBox');
    if (!box) return;
    const isZh = state.lang === 'zh';

    if (spread.interactive_step) {
      box.hidden = false;
      const title = $('interactiveTitle');
      const container = $('interactiveChoices');
      const feedback = $('interactiveFeedback');

      if (spread.spread_no === '06') {
        if (title) title.textContent = isZh ? '情節互動：選哪一個積木來形成支撐？' : 'Story Action: Which shape provides firm support?';
        container.innerHTML = `
          <button class="btn btn-secondary opt-btn" data-val="circle">${isZh ? '圓形 (會滾動)' : 'Circle (Rolls)'}</button>
          <button class="btn btn-secondary opt-btn" data-val="square">${isZh ? '正方形 (平整底座)' : 'Square (Flat base)'}</button>
          <button class="btn btn-secondary opt-btn" data-val="triangle">${isZh ? '三角形 (頂角互鎖)' : 'Triangle (Locked corners)'}</button>
        `;
        setupChoiceEvents(container, feedback, 'triangle',
          isZh ? '琵普：「三角形的角角連在一起，最穩固！」' : 'Pip: "These triangle corners lock together!"',
          isZh ? '比姆：「再想想看，哪個形狀最不容易變形？」' : 'Bem: "Think again, which shape resists bending most?"'
        );
      } else if (spread.spread_no === '07') {
        if (title) title.textContent = isZh ? '情節互動：橋墩應該怎麼擺？' : 'Story Action: How to place the piers?';
        container.innerHTML = `
          <button class="btn btn-secondary opt-btn" data-val="left">${isZh ? '只放左岸' : 'Left shore only'}</button>
          <button class="btn btn-secondary opt-btn" data-val="both">${isZh ? '兩岸對齊放置' : 'Both shores aligned'}</button>
        `;
        setupChoiceEvents(container, feedback, 'both',
          isZh ? '路洛：「兩邊橋墩對齊好了，準備放橋拱！」' : 'Lulo: "Both piers aligned, ready for the arch!"',
          isZh ? '比姆：「只有一邊有支撐，橋拱放上去會滑下來喔。」' : 'Bem: "With one side only, the arch will slide down."'
        );
      } else if (spread.spread_no === '08') {
        if (title) title.textContent = isZh ? '情節互動：放上黃色拱形支架' : 'Story Action: Mount the yellow arch';
        container.innerHTML = `
          <button class="btn btn-coral opt-btn" data-val="mount">${isZh ? '輕輕放上橋拱' : 'Gently place the arch'}</button>
        `;
        setupChoiceEvents(container, feedback, 'mount',
          isZh ? '橋拱像一道微笑跨過了水面！' : 'The arch spanned across the river like a smile!',
          ''
        );
      } else if (spread.spread_no === '10') {
        if (title) title.textContent = isZh ? '情節互動：橋面翹起來了，該怎麼辦？' : 'Story Action: Deck is tilted, how to recover?';
        container.innerHTML = `
          <button class="btn btn-secondary opt-btn" data-val="force">${isZh ? '用力往下壓' : 'Push down hard'}</button>
          <button class="btn btn-secondary opt-btn" data-val="adjust">${isZh ? '退後一步，調整支點' : 'Step back and adjust piers'}</button>
        `;
        setupChoiceEvents(container, feedback, 'adjust',
          isZh ? '太好了！退後一步檢查，發現是橋墩沒對齊。重新調正後橋面平了！' : 'Great! Stepping back revealed misaligned piers. Balanced once readjusted!',
          isZh ? '用力壓可能會讓積木散開。試著退後一步觀察支點。' : 'Pushing too hard might break it. Step back and inspect the supports.'
        );
      } else if (spread.spread_no === '12') {
        if (title) title.textContent = isZh ? '情節互動：依序放上測試小積木' : 'Story Action: Place test blocks sequentially';
        container.innerHTML = `
          <button class="btn btn-secondary opt-btn" data-val="block1">${isZh ? '放第一塊小積木' : 'Place first block'}</button>
          <button class="btn btn-secondary opt-btn" data-val="block2">${isZh ? '放第二塊小積木' : 'Place second block'}</button>
        `;
        setupChoiceEvents(container, feedback, 'block2',
          isZh ? '兩塊積木放上去，小橋都穩穩的！測試順利通過！' : 'Two blocks loaded, the little bridge stays completely steady!',
          isZh ? '第一塊積木穩住了，再試試放上第二塊！' : 'First block holds! Try adding the second one.'
        );
      }
    } else {
      box.hidden = true;
    }
  }

  function setupChoiceEvents(container, feedbackEl, correctVal, successText, failText) {
    const btns = container.querySelectorAll('.opt-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        btns.forEach(b => b.classList.remove('correct', 'btn-coral'));
        if (val === correctVal) {
          btn.classList.add('correct');
          feedbackEl.textContent = successText;
        } else {
          btn.classList.add('btn-secondary');
          feedbackEl.textContent = failText;
        }
      });
    });
  }

  /* ----------------------------------------------------
   * 04. 3D WebGL Viewer (Three.js + GLTF + Fallback)
   * ---------------------------------------------------- */
  function setup3DViewer() {
    const container = $('webglContainer');
    if (!container) return;

    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
      try {
        state.threeApp = initThreeApp(container);
        state.webglReady = true;
      } catch (err) {
        console.warn('WebGL init failed, activating Canvas 3D fallback:', err);
        activateCanvasFallback(container);
      }
    } else {
      activateCanvasFallback(container);
    }

    setupModelButtons();
    setupStateToggles();
    setupKeyboard3DControls();
  }

  function initThreeApp(container) {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF9FBFC);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Orbit Controls
    let controls = null;
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2.05;
      controls.minDistance = 2.0;
      controls.maxDistance = 12.0;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF8E7, 0.7);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x1A3F81, 0.35);
    scene.add(hemiLight);

    // Grid stage ground
    const grid = new THREE.GridHelper(10, 20, 0x1A3F81, 0xD9D3C5);
    grid.position.y = -0.1;
    scene.add(grid);

    let currentLoadedMesh = null;
    const loader = (typeof THREE.GLTFLoader !== 'undefined') ? new THREE.GLTFLoader() : null;

    function loadGlb(path, modelKey) {
      if (!loader) return;
      loader.load(
        path,
        (gltf) => {
          if (currentLoadedMesh) {
            scene.remove(currentLoadedMesh);
          }
          currentLoadedMesh = gltf.scene;
          scene.add(currentLoadedMesh);
          updateInspectorForModel(modelKey);
        },
        undefined,
        (err) => {
          console.warn(`Failed to load ${path}, loading procedural representation`, err);
          createProceduralFallback(modelKey);
        }
      );
    }

    function createProceduralFallback(modelKey) {
      if (currentLoadedMesh) scene.remove(currentLoadedMesh);
      const group = new THREE.Group();

      const yellowMat = new THREE.MeshStandardMaterial({ color: 0xF7D75B });
      const blueMat = new THREE.MeshStandardMaterial({ color: 0x1A3F81 });
      const pinkMat = new THREE.MeshStandardMaterial({ color: 0xEF8C8C });
      const mintMat = new THREE.MeshStandardMaterial({ color: 0xC7DFD6 });

      // Base river
      const river = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.05, 1.2), mintMat);
      group.add(river);

      // Piers
      const pier1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.4), blueMat);
      pier1.position.set(-1.4, 0.35, 0);
      const pier2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.4), blueMat);
      pier2.position.set(1.4, 0.35, 0);
      group.add(pier1);
      group.add(pier2);

      // Arch
      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.15, 16, 32, Math.PI), yellowMat);
      arch.position.set(0, 0.35, 0);
      group.add(arch);

      // Deck
      const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 0.6), pinkMat);
      deck.position.set(0, state.currentModel === 'exploded' ? 2.2 : 1.75, 0);
      group.add(deck);

      currentLoadedMesh = group;
      scene.add(group);
      updateInspectorForModel(modelKey);
    }

    // Load initial model
    loadGlb('assets/3d/PLAYFORM_BRIDGE_ASSEMBLED.glb', 'assembled');

    // Animation Loop
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return {
      scene,
      camera,
      renderer,
      controls,
      loadGlb,
      onResize,
      rotateBy: (dx, dy) => {
        if (controls) {
          camera.position.x += dx;
          camera.position.y += dy;
          camera.lookAt(0, 0.5, 0);
        }
      },
      zoomBy: (delta) => {
        if (controls) {
          camera.position.multiplyScalar(delta);
        }
      },
      resetCamera: () => {
        camera.position.set(0, 3.2, 5.8);
        camera.lookAt(0, 0.5, 0);
        if (controls) controls.reset();
      }
    };
  }

  function activateCanvasFallback(container) {
    container.innerHTML = '<canvas id="fallbackCanvas" width="1200" height="720" style="width:100%; height:100%; touch-action:none; display:block; cursor:grab;"></canvas>';
    const canvas = $('fallbackCanvas');
    if (!canvas) return;
    const cx = canvas.getContext('2d');

    let yaw = 0.62, pitch = 0.58, down = false, startX = 0, startY = 0;
    const yellow = [247, 215, 91], blue = [26, 63, 129], pink = [239, 140, 140], mint = [199, 223, 214], ivory = [250, 245, 227];

    function v(x,y,z){return [x,y,z]}
    function addBox(faces,x,y,z,w,d,h,col){
      const p=[v(x-w/2,y-d/2,z-h/2),v(x+w/2,y-d/2,z-h/2),v(x+w/2,y+d/2,z-h/2),v(x-w/2,y+d/2,z-h/2),v(x-w/2,y-d/2,z+h/2),v(x+w/2,y-d/2,z+h/2),v(x+w/2,y+d/2,z+h/2),v(x-w/2,y+d/2,z+h/2)];
      for(const idx of [[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]) faces.push({p:idx.map(i=>p[i]),col});
    }

    function project3(p, W, H) {
      let [x,y,z]=p;
      let xx=x*Math.cos(yaw)-y*Math.sin(yaw), yy=x*Math.sin(yaw)+y*Math.cos(yaw);
      let yy2=yy*Math.cos(pitch)+z*Math.sin(pitch);
      let zz=z*Math.cos(pitch)-yy*Math.sin(pitch);
      const s=Math.min(W/5.8,H/3.85);
      return [W/2+xx*s, H*0.66-zz*s, yy2];
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      cx.clearRect(0,0,W,H);
      let gr=cx.createLinearGradient(0,0,W,H);
      gr.addColorStop(0,'#FFFDF8');
      gr.addColorStop(1,'#E5EAF2');
      cx.fillStyle=gr;
      cx.fillRect(0,0,W,H);

      cx.fillStyle='rgba(26,63,129,0.11)';
      cx.beginPath();
      cx.ellipse(W/2,H*0.86,370,60,0,0,2*Math.PI);
      cx.fill();

      let f=[];
      const isExploded = state.currentModel === 'exploded';
      addBox(f,0,0,-0.08,4.4,2.65,0.16,ivory);
      addBox(f,0,0,0.035,3.5,1.14,0.055,mint);
      for(let x of [-1.29,1.29]) {
        for(let y of [-0.63,0.63]){
          addBox(f,x,y,0.18,0.55,0.38,0.25,ivory);
          addBox(f,x,y,0.6,0.34,0.32,0.69,blue);
        }
      }
      for(let i=0;i<4;i++) {
        addBox(f,0,-0.62+i*0.41,isExploded?2.34:1.83,3.25,0.35,0.16,i%2?pink:yellow);
      }

      let render=f.map(face=>{
        const p=face.p.map(a=>project3(a,W,H));
        const depth=p.reduce((n,a)=>n+a[2],0)/p.length;
        let a=face.p[0],b=face.p[1],c=face.p[2];
        let u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],w=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
        let n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];
        let norm=Math.hypot(...n)||1;
        let lit=0.75+0.20*(n[0]*-0.3+n[1]*-0.5+n[2]*0.8)/norm;
        let col=face.col.map(a=>Math.max(0,Math.min(255,Math.round(a*lit))));
        return {...face,p,depth,color:`rgb(${col[0]},${col[1]},${col[2]})`};
      }).sort((a,b)=>b.depth-a.depth);

      for(let face of render){
        cx.fillStyle=face.color;
        cx.strokeStyle='rgba(23,45,74,0.12)';
        cx.lineWidth=1;
        cx.beginPath();
        face.p.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));
        cx.closePath();
        cx.fill();
        cx.stroke();
      }
    }

    canvas.addEventListener('pointerdown', e => {
      down = true;
      startX = e.clientX;
      startY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', e => {
      if (!down) return;
      yaw += (e.clientX - startX) * 0.009;
      pitch = Math.min(1.25, Math.max(0.15, pitch + (e.clientY - startY) * 0.006));
      startX = e.clientX;
      startY = e.clientY;
      draw();
    });

    canvas.addEventListener('pointerup', () => { down = false; });

    state.canvasFallback = {
      draw,
      rotateBy: (dx, dy) => {
        yaw += dx * 0.1;
        pitch = Math.min(1.25, Math.max(0.15, pitch + dy * 0.1));
        draw();
      },
      resetCamera: () => {
        yaw = 0.62;
        pitch = 0.58;
        draw();
      }
    };

    draw();
  }

  function setupModelButtons() {
    const btns = $$('.model-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.model;
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentModel = key;

        let path = 'assets/3d/PLAYFORM_BRIDGE_ASSEMBLED.glb';
        if (key === 'exploded') path = 'assets/3d/PLAYFORM_BRIDGE_EXPLODED.glb';
        else if (key === 'characters') path = 'assets/3d/PLAYFORM_CHARACTER_TRIO.glb';
        else if (key === 'kit') path = 'assets/3d/PLAYFORM_KIT_PACKAGING_CONCEPT.glb';
        else if (key === 'qbaby') path = 'assets/3d/PLAYFORM_STAR_QBABY_CHARACTER_MAQUETTE_V3.glb';

        if (state.threeApp && state.threeApp.loadGlb) {
          state.threeApp.loadGlb(path, key);
        } else if (state.canvasFallback && state.canvasFallback.draw) {
          state.canvasFallback.draw();
          updateInspectorForModel(key);
        }
      });
    });
  }

  function setupStateToggles() {
    const assembleBtn = $('btnAssemble');
    const explodeBtn = $('btnExplode');

    if (assembleBtn) {
      assembleBtn.addEventListener('click', () => {
        state.currentModel = 'assembled';
        assembleBtn.classList.add('active');
        if (explodeBtn) explodeBtn.classList.remove('active');
        switchModelByKey('assembled');
      });
    }

    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => {
        state.currentModel = 'exploded';
        explodeBtn.classList.add('active');
        if (assembleBtn) assembleBtn.classList.remove('active');
        switchModelByKey('exploded');
      });
    }
  }

  function switchModelByKey(key) {
    $$('.model-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.model === key);
    });
    let path = 'assets/3d/PLAYFORM_BRIDGE_ASSEMBLED.glb';
    if (key === 'exploded') path = 'assets/3d/PLAYFORM_BRIDGE_EXPLODED.glb';
    else if (key === 'characters') path = 'assets/3d/PLAYFORM_CHARACTER_TRIO.glb';
    else if (key === 'kit') path = 'assets/3d/PLAYFORM_KIT_PACKAGING_CONCEPT.glb';
    else if (key === 'qbaby') path = 'assets/3d/PLAYFORM_STAR_QBABY_CHARACTER_MAQUETTE_V3.glb';

    if (state.threeApp && state.threeApp.loadGlb) {
      state.threeApp.loadGlb(path, key);
    } else if (state.canvasFallback && state.canvasFallback.draw) {
      state.canvasFallback.draw();
      updateInspectorForModel(key);
    }
  }

  function setupKeyboard3DControls() {
    const kLeft = $('kRotateLeft');
    const kRight = $('kRotateRight');
    const kUp = $('kTiltUp');
    const kDown = $('kTiltDown');
    const kZoomIn = $('kZoomIn');
    const kZoomOut = $('kZoomOut');
    const kReset = $('kReset');

    const rotate = (dx, dy) => {
      if (state.threeApp && state.threeApp.rotateBy) state.threeApp.rotateBy(dx, dy);
      else if (state.canvasFallback && state.canvasFallback.rotateBy) state.canvasFallback.rotateBy(dx, dy);
    };

    if (kLeft) kLeft.addEventListener('click', () => rotate(-0.5, 0));
    if (kRight) kRight.addEventListener('click', () => rotate(0.5, 0));
    if (kUp) kUp.addEventListener('click', () => rotate(0, 0.4));
    if (kDown) kDown.addEventListener('click', () => rotate(0, -0.4));
    if (kZoomIn) kZoomIn.addEventListener('click', () => {
      if (state.threeApp && state.threeApp.zoomBy) state.threeApp.zoomBy(0.85);
    });
    if (kZoomOut) kZoomOut.addEventListener('click', () => {
      if (state.threeApp && state.threeApp.zoomBy) state.threeApp.zoomBy(1.15);
    });
    if (kReset) kReset.addEventListener('click', () => {
      if (state.threeApp && state.threeApp.resetCamera) state.threeApp.resetCamera();
      else if (state.canvasFallback && state.canvasFallback.resetCamera) state.canvasFallback.resetCamera();
    });
  }

  function updateInspectorForModel(key) {
    const titleEl = $('inspectorTitle');
    const descEl = $('inspectorDesc');
    const isZh = state.lang === 'zh';

    if (!titleEl || !descEl) return;

    if (key === 'assembled') {
      titleEl.textContent = isZh ? 'PLAYFORM 橋樑：組裝完成狀態' : 'PLAYFORM Bridge: Assembled State';
      descEl.textContent = isZh
        ? '橋拱、立柱、基座與四塊橋面平板完整結合，展示重力分散與支點承托結構。'
        : 'Arch span, pillars, riverbank footings, and 4 deck planks assembled in stable structural equilibrium.';
    } else if (key === 'exploded') {
      titleEl.textContent = isZh ? 'PLAYFORM 橋樑：結構拆解狀態' : 'PLAYFORM Bridge: Exploded Structural Breakdown';
      descEl.textContent = isZh
        ? '零件沿 Z 軸分解，清楚呈現橋面平板、黃色拱圈、深藍立柱與基座的相對卡接位置。'
        : 'Components exploded along vertical Z-axis, revealing deck planks, arch ring, pillars, and foundations.';
    } else if (key === 'characters') {
      titleEl.textContent = isZh ? '幾何角色三人組：LULO, BEM, PIP' : 'Geometric Trio: Lulo, Bem, Pip';
      descEl.textContent = isZh
        ? '路洛（黃色拱圈）、比姆（深藍方型量尺）、琵普（珊瑚三角錐）三維幾何構件原型。'
        : 'Lulo (yellow arch loop), Bem (navy square ruler), and Pip (coral wedge cone) 3D geometric components.';
    } else if (key === 'qbaby') {
      titleEl.textContent = isZh ? '主角 LULO：Q 版造型母型（未 Rig）' : 'Hero LULO: Chibi Character Maquette (Unrigged)';
      descEl.textContent = isZh
        ? '由家庭成員特徵轉化之原創童書主角 3D 幾何概念母型，粉色針織蝴蝶結與蕾絲翻領造型，目前為靜態 Concept Mesh（尚未骨架綁定 Rigging）。'
        : 'Stylized 3D concept mesh of picture-book hero Lulo (pink bow headband, lace collar). Currently static concept mesh pending skeletal rigging.';
    } else if (key === 'kit') {
      titleEl.textContent = isZh ? 'BRIDGE LAB 01：教具包裝概念' : 'BRIDGE LAB 01: Packaging Concept';
      descEl.textContent = isZh
        ? '抽屜式紙盒與內托分層設計，可收納木製積木構件、任務卡與原創繪本。'
        : 'Drawer-style paper box with layered internal tray holding blocks, mission cards, and hardcover book.';
    }
  }

  /* ----------------------------------------------------
   * 05. Child Cognitive Learning Challenges
   * ---------------------------------------------------- */
  function setupChildLearning() {
    const steps = $$('.mission-step-btn');
    steps.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        steps.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentMission = idx;
        renderChildMission();
      });
    });
  }

  function renderChildMission() {
    if (!state.demoData || !state.demoData.learning_missions) return;
    const mission = state.demoData.learning_missions[state.currentMission];
    if (!mission) return;
    const isZh = state.lang === 'zh';

    const titleEl = $('missionTitle');
    const instructionEl = $('missionInstruction');
    const choicesEl = $('missionChoices');
    const feedbackEl = $('missionFeedback');

    if (titleEl) titleEl.textContent = isZh ? mission.title_zh : mission.title_en;
    if (instructionEl) instructionEl.textContent = isZh ? mission.instruction_zh : mission.instruction_en;

    if (choicesEl) {
      choicesEl.innerHTML = '';
      mission.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'shape-btn';
        btn.setAttribute('aria-label', isZh ? c.label_zh : c.label_en);

        let iconClass = 'shape-icon-triangle';
        if (c.id.includes('circle')) iconClass = 'shape-icon-circle';
        else if (c.id.includes('square')) iconClass = 'shape-icon-square';
        else if (c.id.includes('pier')) iconClass = 'shape-icon-square';
        else if (c.id.includes('load')) iconClass = 'shape-icon-circle';

        btn.innerHTML = `
          <span class="${iconClass}"></span>
          <span class="shape-label">${isZh ? c.label_zh : c.label_en}</span>
        `;

        btn.addEventListener('click', () => {
          choicesEl.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          if (feedbackEl) {
            feedbackEl.textContent = isZh ? c.feedback_zh : c.feedback_en;
          }
        });

        choicesEl.appendChild(btn);
      });
    }

    if (feedbackEl) {
      feedbackEl.textContent = isZh ? '點選上方選項，觀察形狀的支撐特點。' : 'Tap an option above to observe structural traits.';
    }
  }

  /* ----------------------------------------------------
   * 06. Parent & Teacher Dashboards (Segregated)
   * ---------------------------------------------------- */
  function setupParentTeacher() {
    const parentResetBtn = $('parentResetBtn');
    if (parentResetBtn) {
      parentResetBtn.addEventListener('click', () => {
        const notice = $('parentNotice');
        if (notice) {
          notice.textContent = state.lang === 'zh' ? '已重設示範學習紀錄。' : 'Demonstrative session record reset.';
          setTimeout(() => {
            notice.textContent = '';
          }, 3000);
        }
      });
    }
  }

  function renderParentTeacher() {
    if (!state.demoData) return;
    const isZh = state.lang === 'zh';

    // Parent prompts
    const parentPromptsList = $('parentPrompts');
    if (parentPromptsList && state.demoData.parent_dashboard) {
      const questions = isZh
        ? state.demoData.parent_dashboard.reflection_questions_zh
        : state.demoData.parent_dashboard.reflection_questions_en;
      parentPromptsList.innerHTML = '';
      questions.forEach(q => {
        const li = document.createElement('li');
        li.textContent = q;
        parentPromptsList.appendChild(li);
      });
    }

    // Teacher schedule
    const teacherScheduleBody = $('teacherScheduleBody');
    if (teacherScheduleBody && state.demoData.teacher_dashboard) {
      const schedule = state.demoData.teacher_dashboard.schedule;
      teacherScheduleBody.innerHTML = '';
      schedule.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.time}</strong></td>
          <td><strong>${isZh ? item.phase_zh : item.phase_en}</strong></td>
          <td>${isZh ? item.desc_zh : item.desc_en}</td>
        `;
        teacherScheduleBody.appendChild(tr);
      });
    }

    // Teacher rubrics
    const teacherRubricsList = $('teacherRubricsList');
    if (teacherRubricsList && state.demoData.teacher_dashboard) {
      const rubrics = isZh
        ? state.demoData.teacher_dashboard.qualitative_rubric_zh
        : state.demoData.teacher_dashboard.qualitative_rubric_en;
      teacherRubricsList.innerHTML = '';
      rubrics.forEach(r => {
        const card = document.createElement('div');
        card.className = 'rubric-card';
        card.innerHTML = `
          <div class="rubric-dimension">${r.dimension}</div>
          <p class="rubric-desc">${r.level}</p>
        `;
        teacherRubricsList.appendChild(card);
      });
    }
  }

  /* ----------------------------------------------------
   * 07. 16 Design Plates Specifications & Gallery
   * ---------------------------------------------------- */
  function setupSpecificationsGallery() {
    // Handled in renderSpecifications()
  }

  function renderSpecifications() {
    if (!state.demoData || !state.demoData.sixteen_shots_specification) return;
    const grid = $('specsGrid');
    if (!grid) return;
    const isZh = state.lang === 'zh';

    grid.innerHTML = '';
    state.demoData.sixteen_shots_specification.forEach(shot => {
      const card = document.createElement('div');
      card.className = 'shot-spec-card';
      const title = isZh ? (shot.theme_zh || shot.title_zh) : (shot.theme_en || shot.title_en);
      const evidence = isZh ? shot.evidence_zh : shot.evidence_en;
      const composition = isZh ? (shot.composition_zh || shot.prohibition_zh) : (shot.composition_en || shot.evidence_en);
      card.innerHTML = `
        <div>
          <span class="shot-number">SHOT ${shot.shot}</span>
          <h3 class="shot-title">${title}</h3>
          <div class="shot-evidence">${evidence}</div>
          <p class="shot-composition"><strong>${isZh ? '禁止事項：' : 'Prohibition: '}</strong>${composition}</p>
        </div>
        <div>
          <span class="shot-badge">${shot.status || 'Concept Plate · Static Design Visual'}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* ----------------------------------------------------
   * 08. 16-Shot Deliverable Gallery & Lightbox
   * ---------------------------------------------------- */
  function setupLightbox() {
    const lightbox = $('playformLightbox');
    if (!lightbox) return;

    const overlay = $('lightboxOverlay');
    const closeBtn = $('lightboxCloseBtn');
    const prevBtn = $('lightboxPrevBtn');
    const nextBtn = $('lightboxNextBtn');

    // Trigger buttons from gallery cards
    $$('.shot-img-btn, .btn-lightbox-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.shotIndex || '0', 10);
        openLightbox(index, btn);
      });
    });

    if (overlay) overlay.addEventListener('click', closeLightbox);
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        navigateLightbox(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        navigateLightbox(1);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.hidden) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    });
  }

  function openLightbox(index, triggerEl) {
    const lightbox = $('playformLightbox');
    if (!lightbox) return;

    state.lastFocusedElement = triggerEl || document.activeElement;
    state.currentLightboxIndex = index;
    renderLightboxContent();

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = $('lightboxCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const lightbox = $('playformLightbox');
    if (!lightbox || lightbox.hidden) return;

    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }
  }

  function navigateLightbox(dir) {
    const shots = (state.demoData && state.demoData.sixteen_case_shots) || [];
    if (!shots.length) return;
    state.currentLightboxIndex = (state.currentLightboxIndex + dir + shots.length) % shots.length;
    renderLightboxContent();
  }

  function renderLightboxContent() {
    const shots = (state.demoData && state.demoData.sixteen_case_shots) || [];
    if (!shots.length) return;
    const shot = shots[state.currentLightboxIndex];
    if (!shot) return;

    const numEl = $('lightboxNum');
    const titleEl = $('lightboxTitle');
    const imgEl = $('lightboxImg');
    const captionEl = $('lightboxCaption');
    const isZh = state.lang === 'zh';

    if (numEl) numEl.textContent = `SHOT ${shot.id} / 16`;
    if (titleEl) titleEl.textContent = isZh ? `${shot.id} / ${shot.title}` : `${shot.id} / ${shot.title_en}`;
    if (imgEl) {
      imgEl.src = shot.src;
      imgEl.alt = shot.alt;
    }
    if (captionEl) {
      captionEl.innerHTML = `<strong>${isZh ? '展示目的：' : 'Purpose: '}</strong>${isZh ? shot.purpose : shot.purpose_en}`;
    }
  }

})();
