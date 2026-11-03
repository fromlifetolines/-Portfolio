/**
 * FLTL × HOWARD ｜ CIVIC ACCESS (CASE 12)
 * Interactive Application System, Gallery Lightbox & Bilingual Controller
 */

(function () {
  'use strict';

  // --- Application State ---
  const state = {
    lang: 'zh-TW',
    currentStep: 1, // 1: Scenario & Discovery, 2: Form & Upload, 3: Review, 4: Submitted
    selectedServiceId: 'srv-sub-01',
    role: '本人', // '本人' | '代辦人'
    channel: '線上申辦模擬', // '線上申辦模擬' | '服務中心臨櫃預約'
    checklist: ['doc-id'],
    demoName: '',
    demoContact: '',
    demoTopic: '生活資源資訊',
    demoNotes: '',
    attachedFiles: [
      { name: 'demo_applicant_id.pdf', size: 1258291, type: 'application/pdf', valid: true }
    ],
    searchQuery: '',
    selectedCategory: 'all',
    lightboxIndex: 0,
    demoRefId: 'DEMO-CA-2026-001'
  };

  // --- Data Store ---
  let appData = null;

  // --- DOM Elements ---
  const el = {};

  function initElements() {
    el.langButtons = document.querySelectorAll('.ca-lang-btn');
    el.fontButtons = document.querySelectorAll('.ca-font-btn');
    el.stepNavButtons = document.querySelectorAll('.ca-step-nav-btn');
    el.flowSteps = document.querySelectorAll('.ca-flow-step');
    el.resetDemoBtn = document.getElementById('caResetDemoBtn');
    el.resetFooterBtn = document.getElementById('caResetFooterBtn');

    // Search & Directory
    el.searchInput = document.getElementById('caSearchInput');
    el.searchClearBtn = document.getElementById('caSearchClearBtn');
    el.categoryChips = document.querySelectorAll('.ca-chip-btn');
    el.serviceGrid = document.getElementById('caServiceGrid');
    el.searchEmptyState = document.getElementById('caSearchEmptyState');
    el.searchResetFilterBtn = document.getElementById('caSearchResetFilterBtn');

    // Step 1: Scenario & Triage
    el.roleRadios = document.querySelectorAll('input[name="caRole"]');
    el.channelRadios = document.querySelectorAll('input[name="caChannel"]');
    el.checklistContainer = document.getElementById('caChecklistContainer');
    el.checklistCounter = document.getElementById('caChecklistCounter');
    el.step1NextBtn = document.getElementById('caStep1NextBtn');
    el.step1Alert = document.getElementById('caStep1Alert');

    // Step 2: Form & Validation
    el.formName = document.getElementById('caFormName');
    el.formContact = document.getElementById('caFormContact');
    el.formTopic = document.getElementById('caFormTopic');
    el.formNotes = document.getElementById('caFormNotes');
    el.formNameGroup = document.getElementById('caFormNameGroup');
    el.formContactGroup = document.getElementById('caFormContactGroup');
    el.step2BackBtn = document.getElementById('caStep2BackBtn');
    el.step2NextBtn = document.getElementById('caStep2NextBtn');
    el.step2Alert = document.getElementById('caStep2Alert');

    // Attachment Upload
    el.fileDropzone = document.getElementById('caFileDropzone');
    el.fileInputHidden = document.getElementById('caFileInputHidden');
    el.attachedFilesList = document.getElementById('caAttachedFilesList');
    el.simValidPdfBtn = document.getElementById('caSimValidPdfBtn');
    el.simLargePdfBtn = document.getElementById('caSimLargePdfBtn');
    el.simInvalidZipBtn = document.getElementById('caSimInvalidZipBtn');

    // Step 3: Review & Submission
    el.reviewService = document.getElementById('caReviewService');
    el.reviewRole = document.getElementById('caReviewRole');
    el.reviewChannel = document.getElementById('caReviewChannel');
    el.reviewName = document.getElementById('caReviewName');
    el.reviewContact = document.getElementById('caReviewContact');
    el.reviewDocs = document.getElementById('caReviewDocs');
    el.reviewFiles = document.getElementById('caReviewFiles');
    el.step3BackBtn = document.getElementById('caStep3BackBtn');
    el.step3SubmitBtn = document.getElementById('caStep3SubmitBtn');

    // Submitted state
    el.submittedRefNum = document.getElementById('caSubmittedRefNum');
    el.submittedResetBtn = document.getElementById('caSubmittedResetBtn');

    // Sidebar status
    el.sidebarStatusService = document.getElementById('caSidebarStatusService');
    el.sidebarStatusRole = document.getElementById('caSidebarStatusRole');
    el.sidebarStatusDocs = document.getElementById('caSidebarStatusDocs');

    // Lightbox
    el.lightbox = document.getElementById('caLightbox');
    el.lightboxImg = document.getElementById('caLightboxImg');
    el.lightboxNum = document.getElementById('caLightboxNum');
    el.lightboxTitle = document.getElementById('caLightboxTitle');
    el.lightboxCaption = document.getElementById('caLightboxCaption');
    el.lightboxSource = document.getElementById('caLightboxSource');
    el.lightboxCloseBtn = document.getElementById('caLightboxCloseBtn');
    el.lightboxPrevBtn = document.getElementById('caLightboxPrevBtn');
    el.lightboxNextBtn = document.getElementById('caLightboxNextBtn');
  }

  // --- Load Data ---
  async function loadData() {
    try {
      const res = await fetch('data/CIVIC_ACCESS_DEMO.json');
      appData = await res.json();
    } catch (e) {
      console.warn('Could not load JSON data via fetch, falling back to embedded defaults.', e);
    }
  }

  // --- Step Navigation & State ---
  function goToStep(stepNumber) {
    state.currentStep = stepNumber;

    el.flowSteps.forEach((stepEl, idx) => {
      const sNum = idx + 1;
      stepEl.classList.toggle('is-visible', sNum === stepNumber);
    });

    el.stepNavButtons.forEach((btn, idx) => {
      const sNum = idx + 1;
      btn.classList.toggle('is-active', sNum === stepNumber);
      btn.classList.toggle('is-done', sNum < stepNumber);
      btn.setAttribute('aria-current', sNum === stepNumber ? 'step' : 'false');
    });

    updateSidebarStatus();
    saveSessionDraft();

    // Accessible focus management
    const activeHeading = document.querySelector(`.ca-flow-step.is-visible h3, .ca-flow-step.is-visible .ca-step-title`);
    if (activeHeading) {
      activeHeading.setAttribute('tabindex', '-1');
      activeHeading.focus();
    }
  }

  // --- Render Services in Directory ---
  function renderServices() {
    if (!el.serviceGrid) return;
    const query = state.searchQuery.trim().toLowerCase();
    const services = appData ? appData.services : [];

    const filtered = services.filter(srv => {
      const matchesCategory = state.selectedCategory === 'all' || srv.categoryZh === state.selectedCategory || srv.categoryEn === state.selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const titleMatch = srv.titleZh.toLowerCase().includes(query) || srv.titleEn.toLowerCase().includes(query);
      const descMatch = srv.descZh.toLowerCase().includes(query) || srv.descEn.toLowerCase().includes(query);
      const tagMatch = srv.tags.some(t => t.toLowerCase().includes(query));
      return titleMatch || descMatch || tagMatch;
    });

    if (filtered.length === 0) {
      el.serviceGrid.style.display = 'none';
      if (el.searchEmptyState) el.searchEmptyState.style.display = 'block';
      return;
    }

    el.serviceGrid.style.display = 'grid';
    if (el.searchEmptyState) el.searchEmptyState.style.display = 'none';

    el.serviceGrid.innerHTML = filtered.map(srv => {
      const isSelected = srv.id === state.selectedServiceId;
      const catText = state.lang === 'zh-TW' ? srv.categoryZh : srv.categoryEn;
      const titleText = state.lang === 'zh-TW' ? srv.titleZh : srv.titleEn;
      const descText = state.lang === 'zh-TW' ? srv.descZh : srv.descEn;
      const btnText = state.lang === 'zh-TW' ? (isSelected ? '✓ 已選取此項服務' : '選取此服務申辦 →') : (isSelected ? '✓ Selected Service' : 'Apply for this service →');

      return `
        <article class="ca-service-card ${isSelected ? 'is-selected' : ''}" data-srv-id="${srv.id}" tabindex="0" role="button" aria-pressed="${isSelected}">
          <div>
            <span class="ca-service-tag">${catText}</span>
            <h4 class="ca-service-title">${titleText}</h4>
            <p class="ca-service-desc">${descText}</p>
          </div>
          <button type="button" class="ca-btn-secondary" style="padding: 8px 14px; min-height: 40px; font-size: 0.85rem;" data-select-id="${srv.id}">
            ${btnText}
          </button>
        </article>
      `;
    }).join('');

    // Event delegation
    el.serviceGrid.querySelectorAll('.ca-service-card').forEach(card => {
      const srvId = card.getAttribute('data-srv-id');
      const select = () => {
        state.selectedServiceId = srvId;
        renderServices();
        updateSidebarStatus();
        saveSessionDraft();
      };
      card.addEventListener('click', select);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select();
        }
      });
    });
  }

  // --- Dynamic Document Checklist (CA-03, CA-04) ---
  function renderChecklist() {
    if (!el.checklistContainer || !appData) return;
    const ruleKey = state.role === '代辦人' ? 'representative' : 'applicant';
    const docs = appData.documentRules[ruleKey] || [];

    // Filter checklist state to only allowed items
    state.checklist = state.checklist.filter(id => docs.some(d => d.id === id));

    const totalCount = docs.length;
    const checkedCount = state.checklist.length;
    const isAllChecked = checkedCount === totalCount && totalCount > 0;

    if (el.checklistCounter) {
      const counterLabel = state.lang === 'zh-TW'
        ? `${checkedCount}/${totalCount} 已準備`
        : `${checkedCount}/${totalCount} Ready`;
      el.checklistCounter.textContent = counterLabel;
      el.checklistCounter.classList.toggle('is-complete', isAllChecked);
    }

    el.checklistContainer.innerHTML = docs.map(doc => {
      const isChecked = state.checklist.includes(doc.id);
      const title = state.lang === 'zh-TW' ? doc.titleZh : doc.titleEn;
      const desc = state.lang === 'zh-TW' ? doc.descZh : doc.descEn;
      const statusText = state.lang === 'zh-TW' ? (isChecked ? '已準備' : '待備齊') : (isChecked ? 'Ready' : 'Pending');

      return `
        <label class="ca-check-item ${isChecked ? 'is-checked' : ''}" data-doc-id="${doc.id}">
          <input type="checkbox" class="ca-checkbox-input" value="${doc.id}" ${isChecked ? 'checked' : ''}>
          <div class="ca-check-text">
            <strong>${title}</strong>
            <p>${desc}</p>
          </div>
          <span class="ca-doc-status-badge">${statusText}</span>
        </label>
      `;
    }).join('');

    el.checklistContainer.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const docId = e.target.value;
        if (e.target.checked) {
          if (!state.checklist.includes(docId)) state.checklist.push(docId);
        } else {
          state.checklist = state.checklist.filter(id => id !== docId);
        }
        renderChecklist();
        updateSidebarStatus();
        saveSessionDraft();
      });
    });
  }

  // --- Simulated Attachment Upload (CA-09, CA-10, CA-11) ---
  function renderAttachedFiles() {
    if (!el.attachedFilesList) return;
    if (state.attachedFiles.length === 0) {
      el.attachedFilesList.innerHTML = `<p style="font-size: 0.85rem; color: var(--ca-muted); margin: 8px 0;">${state.lang === 'zh-TW' ? '尚未選取任何示範附件。' : 'No demonstration files selected.'}</p>`;
      return;
    }

    el.attachedFilesList.innerHTML = state.attachedFiles.map((file, idx) => {
      const sizeKB = (file.size / 1024).toFixed(1);
      const statusBadge = file.valid
        ? `<span class="ca-doc-status-badge" style="background: var(--ca-ok); color: white;">✓ ${state.lang === 'zh-TW' ? '符合規格' : 'Valid'}</span>`
        : `<span class="ca-doc-status-badge" style="background: var(--ca-danger); color: white;">✕ ${file.errorReason || (state.lang === 'zh-TW' ? '格式不符' : 'Invalid')}</span>`;

      return `
        <div class="ca-file-chip ${file.valid ? 'is-valid' : 'is-invalid'}">
          <div class="ca-file-name-group">
            <span>📄</span>
            <span>${file.name}</span>
            <small style="color: var(--ca-muted);">(${sizeKB} KB)</small>
          </div>
          <div class="ca-file-actions">
            ${statusBadge}
            <button type="button" class="ca-file-remove-btn" data-remove-idx="${idx}" aria-label="移除檔案 / Remove file">✕</button>
          </div>
        </div>
      `;
    }).join('');

    el.attachedFilesList.querySelectorAll('.ca-file-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-remove-idx'), 10);
        state.attachedFiles.splice(idx, 1);
        renderAttachedFiles();
        saveSessionDraft();
      });
    });
  }

  function handleFileSelection(fileObj) {
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileName = fileObj.name || 'unnamed_file';
    const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

    // Check Format (CA-09)
    if (!allowedExtensions.includes(ext)) {
      showErrorAlert(
        el.step2Alert,
        state.lang === 'zh-TW'
          ? `不支援檔案格式（${ext}）。請選取 PDF、JPG 或 PNG 格式之示範檔案。`
          : `Unsupported file format (${ext}). Please select PDF, JPG or PNG format.`
      );
      state.attachedFiles.push({
        name: fileName,
        size: fileObj.size || 500000,
        valid: false,
        errorReason: state.lang === 'zh-TW' ? '不支援此格式' : 'Unsupported format'
      });
      renderAttachedFiles();
      return;
    }

    // Check Size (CA-10)
    if (fileObj.size > MAX_SIZE) {
      showErrorAlert(
        el.step2Alert,
        state.lang === 'zh-TW'
          ? `檔案大小 (${(fileObj.size / (1024 * 1024)).toFixed(1)} MB) 超過 10 MB 上限，請重新選取。`
          : `File size exceeds 10 MB limit, please select a smaller file.`
      );
      state.attachedFiles.push({
        name: fileName,
        size: fileObj.size,
        valid: false,
        errorReason: state.lang === 'zh-TW' ? '檔案過大 (>10MB)' : 'File too large (>10MB)'
      });
      renderAttachedFiles();
      return;
    }

    // Valid file added
    hideErrorAlert(el.step2Alert);
    state.attachedFiles.push({
      name: fileName,
      size: fileObj.size || 1024000,
      valid: true
    });
    renderAttachedFiles();
    saveSessionDraft();
  }

  // --- Form Validation (CA-07, CA-08) ---
  function validateField(inputEl, groupEl, errorEl, successEl, validatorFn) {
    const val = inputEl.value.trim();
    const result = validatorFn(val);
    if (!result.valid) {
      groupEl.classList.add('has-error');
      groupEl.classList.remove('is-valid');
      if (errorEl) errorEl.textContent = result.message;
      return false;
    } else {
      groupEl.classList.remove('has-error');
      groupEl.classList.add('is-valid');
      return true;
    }
  }

  function validateStep1() {
    let isValid = true;
    let errorMsg = '';

    if (!state.role) {
      isValid = false;
      errorMsg = state.lang === 'zh-TW' ? '請選擇申辦身分（本人辦理或協助代辦）。' : 'Please select your application scenario.';
    } else if (!state.channel) {
      isValid = false;
      errorMsg = state.lang === 'zh-TW' ? '請選擇預計使用的方式。' : 'Please select your preferred channel.';
    }

    if (!isValid) {
      showErrorAlert(el.step1Alert, errorMsg);
      const firstRadio = document.querySelector('input[name="caRole"]:not(:checked)');
      if (firstRadio) firstRadio.focus();
      return false;
    }

    hideErrorAlert(el.step1Alert);
    return true;
  }

  function validateStep2() {
    let isValid = true;
    hideErrorAlert(el.step2Alert);

    // Validate Name
    const nameValid = validateField(
      el.formName,
      el.formNameGroup,
      el.formNameGroup.querySelector('.ca-field-error'),
      el.formNameGroup.querySelector('.ca-field-success'),
      (val) => {
        if (!val || val.length < 2) {
          return {
            valid: false,
            message: state.lang === 'zh-TW'
              ? '請輸入至少 2 個字元的測試稱呼（例如：測試使用者 A）。'
              : 'Please enter a demo display name with at least 2 characters.'
          };
        }
        return { valid: true };
      }
    );
    if (!nameValid) isValid = false;

    // Validate Contact (CA-07, CA-08)
    const contactValid = validateField(
      el.formContact,
      el.formContactGroup,
      el.formContactGroup.querySelector('.ca-field-error'),
      el.formContactGroup.querySelector('.ca-field-success'),
      (val) => {
        if (!val) {
          return {
            valid: false,
            message: state.lang === 'zh-TW'
              ? '請填寫示範聯絡方式，例如 0912-345-678 或 demo@example.com。'
              : 'Please enter demo contact info, e.g. 0912-345-678 or demo@example.com.'
          };
        }
        // Match phone (e.g. 0912-345-678 or 10 digits) or email
        const phoneRegex = /^09\d{2}-?\d{3}-?\d{3}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!phoneRegex.test(val) && !emailRegex.test(val)) {
          return {
            valid: false,
            message: state.lang === 'zh-TW'
              ? '格式不符。請輸入有效的示範格式，例如 0912-345-678 或 demo@example.com。'
              : 'Invalid format. Please use format like 0912-345-678 or demo@example.com.'
          };
        }
        return { valid: true };
      }
    );
    if (!contactValid) isValid = false;

    // Validate Attachments (CA-11)
    const validFiles = state.attachedFiles.filter(f => f.valid);
    if (validFiles.length === 0) {
      showErrorAlert(
        el.step2Alert,
        state.lang === 'zh-TW'
          ? '缺少必要附件。請至少選取一項符合規格的示範檔案。'
          : 'Missing required attachments. Please select at least one valid demo file.'
      );
      isValid = false;
    }

    if (!isValid) {
      // Focus on first invalid input
      if (!nameValid) el.formName.focus();
      else if (!contactValid) el.formContact.focus();
      else if (el.fileDropzone) el.fileDropzone.focus();
    }

    return isValid;
  }

  function showErrorAlert(alertEl, msg) {
    if (!alertEl) return;
    alertEl.textContent = msg;
    alertEl.classList.add('is-visible');
    alertEl.setAttribute('role', 'alert');
    alertEl.focus();
  }

  function hideErrorAlert(alertEl) {
    if (!alertEl) return;
    alertEl.textContent = '';
    alertEl.classList.remove('is-visible');
  }

  // --- Step 3 Review Setup (CA-12) ---
  function populateReview() {
    const srv = appData ? appData.services.find(s => s.id === state.selectedServiceId) : null;
    const srvTitle = srv ? (state.lang === 'zh-TW' ? srv.titleZh : srv.titleEn) : '社區資源生活補助示範諮詢';

    if (el.reviewService) el.reviewService.textContent = srvTitle;
    if (el.reviewRole) el.reviewRole.textContent = state.role;
    if (el.reviewChannel) el.reviewChannel.textContent = state.channel;
    if (el.reviewName) el.reviewName.textContent = el.formName.value.trim() || '測試使用者';
    if (el.reviewContact) el.reviewContact.textContent = el.formContact.value.trim() || '0912-345-678';

    const ruleKey = state.role === '代辦人' ? 'representative' : 'applicant';
    const totalDocs = appData ? appData.documentRules[ruleKey].length : 2;
    if (el.reviewDocs) el.reviewDocs.textContent = `${state.checklist.length} / ${totalDocs} 項已核取`;

    const validFiles = state.attachedFiles.filter(f => f.valid);
    if (el.reviewFiles) el.reviewFiles.textContent = `${validFiles.length} 個檔案 (${validFiles.map(f => f.name).join(', ')})`;
  }

  // --- Sidebar Live Status ---
  function updateSidebarStatus() {
    const srv = appData ? appData.services.find(s => s.id === state.selectedServiceId) : null;
    const srvTitle = srv ? (state.lang === 'zh-TW' ? srv.titleZh : srv.titleEn) : '生活補助諮詢';
    if (el.sidebarStatusService) el.sidebarStatusService.textContent = srvTitle;
    if (el.sidebarStatusRole) el.sidebarStatusRole.textContent = state.role || '-';

    const ruleKey = state.role === '代辦人' ? 'representative' : 'applicant';
    const totalDocs = appData ? appData.documentRules[ruleKey].length : 2;
    if (el.sidebarStatusDocs) el.sidebarStatusDocs.textContent = `${state.checklist.length}/${totalDocs}`;
  }

  // --- Reset Application State (CA-13) ---
  function resetDemo() {
    state.currentStep = 1;
    state.role = '本人';
    state.channel = '線上申辦模擬';
    state.checklist = ['doc-id'];
    state.attachedFiles = [
      { name: 'demo_applicant_id.pdf', size: 1258291, type: 'application/pdf', valid: true }
    ];
    state.searchQuery = '';
    state.selectedCategory = 'all';

    if (el.searchInput) el.searchInput.value = '';
    if (el.formName) el.formName.value = '測試使用者 A';
    if (el.formContact) el.formContact.value = '0912-345-678';
    if (el.formNameGroup) el.formNameGroup.classList.remove('has-error', 'is-valid');
    if (el.formContactGroup) el.formContactGroup.classList.remove('has-error', 'is-valid');

    el.roleRadios.forEach(r => { r.checked = (r.value === '本人'); });
    el.channelRadios.forEach(r => { r.checked = (r.value === '線上申辦模擬'); });
    updateRadioStyles();

    hideErrorAlert(el.step1Alert);
    hideErrorAlert(el.step2Alert);

    renderServices();
    renderChecklist();
    renderAttachedFiles();
    goToStep(1);

    sessionStorage.removeItem('ca_demo_state');
  }

  function updateRadioStyles() {
    document.querySelectorAll('.ca-radio-label').forEach(lbl => {
      const input = lbl.querySelector('input[type="radio"]');
      if (input) lbl.classList.toggle('is-checked', input.checked);
    });
  }

  // --- Session Draft Storage (CA-15) ---
  function saveSessionDraft() {
    try {
      const draft = {
        currentStep: state.currentStep,
        selectedServiceId: state.selectedServiceId,
        role: state.role,
        channel: state.channel,
        checklist: state.checklist,
        demoName: el.formName ? el.formName.value : '',
        demoContact: el.formContact ? el.formContact.value : '',
        demoTopic: el.formTopic ? el.formTopic.value : '',
        demoNotes: el.formNotes ? el.formNotes.value : '',
        attachedFiles: state.attachedFiles
      };
      sessionStorage.setItem('ca_demo_state', JSON.stringify(draft));
    } catch (e) {
      // sessionStorage quota or security restriction
    }
  }

  function loadSessionDraft() {
    try {
      const raw = sessionStorage.getItem('ca_demo_state');
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.selectedServiceId) state.selectedServiceId = draft.selectedServiceId;
      if (draft.role) state.role = draft.role;
      if (draft.channel) state.channel = draft.channel;
      if (Array.isArray(draft.checklist)) state.checklist = draft.checklist;
      if (Array.isArray(draft.attachedFiles)) state.attachedFiles = draft.attachedFiles;

      if (el.formName && draft.demoName) el.formName.value = draft.demoName;
      if (el.formContact && draft.demoContact) el.formContact.value = draft.demoContact;
      if (el.formTopic && draft.demoTopic) el.formTopic.value = draft.demoTopic;
      if (el.formNotes && draft.demoNotes) el.formNotes.value = draft.demoNotes;

      el.roleRadios.forEach(r => { r.checked = (r.value === state.role); });
      el.channelRadios.forEach(r => { r.checked = (r.value === state.channel); });
      updateRadioStyles();
    } catch (e) {
      console.warn('Could not restore draft state from session', e);
    }
  }

  // --- Modal Lightbox (16 Shots High-Res Viewer) ---
  let lastActiveElement = null;

  function openLightbox(index) {
    if (!appData || !appData.shots) return;
    state.lightboxIndex = index;
    const shot = appData.shots[index];
    if (!shot) return;

    lastActiveElement = document.activeElement;

    if (el.lightboxImg) el.lightboxImg.src = shot.png;
    if (el.lightboxNum) el.lightboxNum.textContent = `SHOT ${shot.id} / 16`;
    if (el.lightboxTitle) el.lightboxTitle.textContent = state.lang === 'zh-TW' ? shot.titleZh : shot.titleEn;
    if (el.lightboxCaption) el.lightboxCaption.textContent = state.lang === 'zh-TW' ? shot.captionZh : shot.captionEn;
    if (el.lightboxSource) el.lightboxSource.textContent = `Source: ${shot.source} (2560×1440)`;

    el.lightbox.classList.add('is-open');
    el.lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (el.lightboxCloseBtn) el.lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!el.lightbox) return;
    el.lightbox.classList.remove('is-open');
    el.lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  function nextLightbox() {
    if (!appData || !appData.shots) return;
    const nextIdx = (state.lightboxIndex + 1) % appData.shots.length;
    openLightbox(nextIdx);
  }

  function prevLightbox() {
    if (!appData || !appData.shots) return;
    const prevIdx = (state.lightboxIndex - 1 + appData.shots.length) % appData.shots.length;
    openLightbox(prevIdx);
  }

  // --- Bilingual Language Switcher (CA-14) ---
  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : 'en';

    el.langButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Toggle all data-i18n elements
    document.querySelectorAll('[data-zh][data-en]').forEach(node => {
      node.textContent = lang === 'zh-TW' ? node.getAttribute('data-zh') : node.getAttribute('data-en');
    });

    // Toggle elements with .ca-zh and .ca-en
    document.querySelectorAll('.ca-zh').forEach(n => { n.hidden = (lang !== 'zh-TW'); });
    document.querySelectorAll('.ca-en').forEach(n => { n.hidden = (lang === 'zh-TW'); });

    // Update dynamic sub-components
    renderServices();
    renderChecklist();
    renderAttachedFiles();
    updateSidebarStatus();
  }

  // --- Font Size Adjustment (A- / A / A+) ---
  function setFontSize(sizeKey) {
    document.body.setAttribute('data-font-size', sizeKey);
    el.fontButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-font') === sizeKey;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // --- Attach Event Listeners ---
  function attachEvents() {
    // Language & Font buttons
    el.langButtons.forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });

    el.fontButtons.forEach(btn => {
      btn.addEventListener('click', () => setFontSize(btn.getAttribute('data-font')));
    });

    // Sidebar Step buttons
    el.stepNavButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const stepNum = parseInt(btn.getAttribute('data-step'), 10);
        if (stepNum < state.currentStep) {
          goToStep(stepNum);
        } else if (stepNum === 2) {
          if (validateStep1()) goToStep(2);
        } else if (stepNum === 3) {
          if (validateStep1() && validateStep2()) {
            populateReview();
            goToStep(3);
          }
        }
      });
    });

    // Reset Buttons
    if (el.resetDemoBtn) el.resetDemoBtn.addEventListener('click', resetDemo);
    if (el.resetFooterBtn) el.resetFooterBtn.addEventListener('click', resetDemo);
    if (el.submittedResetBtn) el.submittedResetBtn.addEventListener('click', resetDemo);

    // Search events
    if (el.searchInput) {
      el.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderServices();
      });
    }

    if (el.searchClearBtn) {
      el.searchClearBtn.addEventListener('click', () => {
        state.searchQuery = '';
        if (el.searchInput) {
          el.searchInput.value = '';
          el.searchInput.focus();
        }
        renderServices();
      });
    }

    el.categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        el.categoryChips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        state.selectedCategory = chip.getAttribute('data-category');
        renderServices();
      });
    });

    if (el.searchResetFilterBtn) {
      el.searchResetFilterBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.selectedCategory = 'all';
        if (el.searchInput) el.searchInput.value = '';
        el.categoryChips.forEach(c => c.classList.toggle('is-active', c.getAttribute('data-category') === 'all'));
        renderServices();
      });
    }

    // Role & Channel Radios (CA-03, CA-04)
    el.roleRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.role = e.target.value;
        updateRadioStyles();
        renderChecklist();
        updateSidebarStatus();
        hideErrorAlert(el.step1Alert);
        saveSessionDraft();
      });
    });

    el.channelRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.channel = e.target.value;
        updateRadioStyles();
        updateSidebarStatus();
        hideErrorAlert(el.step1Alert);
        saveSessionDraft();
      });
    });

    // Step 1 -> Step 2
    if (el.step1NextBtn) {
      el.step1NextBtn.addEventListener('click', () => {
        if (validateStep1()) {
          goToStep(2);
        }
      });
    }

    // Step 2 -> Step 1 (CA-06: Return without clearing)
    if (el.step2BackBtn) {
      el.step2BackBtn.addEventListener('click', () => {
        goToStep(1);
      });
    }

    // Live validation on Step 2 inputs (CA-08)
    if (el.formContact) {
      el.formContact.addEventListener('input', () => {
        if (el.formContactGroup.classList.contains('has-error')) {
          validateField(
            el.formContact,
            el.formContactGroup,
            el.formContactGroup.querySelector('.ca-field-error'),
            el.formContactGroup.querySelector('.ca-field-success'),
            (val) => {
              const phoneRegex = /^09\d{2}-?\d{3}-?\d{3}$/;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return { valid: phoneRegex.test(val) || emailRegex.test(val) };
            }
          );
        }
      });
    }

    if (el.formName) {
      el.formName.addEventListener('input', () => {
        if (el.formNameGroup.classList.contains('has-error')) {
          validateField(
            el.formName,
            el.formNameGroup,
            el.formNameGroup.querySelector('.ca-field-error'),
            el.formNameGroup.querySelector('.ca-field-success'),
            (val) => ({ valid: val && val.length >= 2 })
          );
        }
      });
    }

    // Step 2 -> Step 3
    if (el.step2NextBtn) {
      el.step2NextBtn.addEventListener('click', () => {
        if (validateStep2()) {
          populateReview();
          goToStep(3);
        }
      });
    }

    // Step 3 -> Step 2
    if (el.step3BackBtn) {
      el.step3BackBtn.addEventListener('click', () => {
        goToStep(2);
      });
    }

    // Step 3 -> Submission (CA-12)
    if (el.step3SubmitBtn) {
      el.step3SubmitBtn.addEventListener('click', () => {
        goToStep(4);
        if (el.submittedRefNum) {
          el.submittedRefNum.textContent = state.demoRefId;
        }
      });
    }

    // Drag and Drop Upload
    if (el.fileDropzone && el.fileInputHidden) {
      el.fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        el.fileDropzone.style.borderColor = 'var(--ca-blue)';
      });
      el.fileDropzone.addEventListener('dragleave', () => {
        el.fileDropzone.style.borderColor = '';
      });
      el.fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        el.fileDropzone.style.borderColor = '';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          Array.from(e.dataTransfer.files).forEach(f => handleFileSelection(f));
        }
      });

      el.fileInputHidden.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          Array.from(e.target.files).forEach(f => handleFileSelection(f));
        }
      });
    }

    // Test Simulator Buttons (CA-09, CA-10)
    if (el.simValidPdfBtn) {
      el.simValidPdfBtn.addEventListener('click', () => {
        handleFileSelection({ name: 'demo_applicant_id_copy.pdf', size: 1400000 });
      });
    }
    if (el.simLargePdfBtn) {
      el.simLargePdfBtn.addEventListener('click', () => {
        handleFileSelection({ name: 'demo_huge_scan_file.pdf', size: 14500000 }); // 14.5MB
      });
    }
    if (el.simInvalidZipBtn) {
      el.simInvalidZipBtn.addEventListener('click', () => {
        handleFileSelection({ name: 'demo_unsupported_archive.zip', size: 520000 }); // .zip
      });
    }

    // Lightbox Controls
    if (el.lightboxCloseBtn) el.lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (el.lightboxNextBtn) el.lightboxNextBtn.addEventListener('click', nextLightbox);
    if (el.lightboxPrevBtn) el.lightboxPrevBtn.addEventListener('click', prevLightbox);

    if (el.lightbox) {
      el.lightbox.addEventListener('click', (e) => {
        if (e.target === el.lightbox) closeLightbox();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!el.lightbox || !el.lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextLightbox();
      else if (e.key === 'ArrowLeft') prevLightbox();
    });

    // Gallery Card Click opens Lightbox
    document.querySelectorAll('.ca-card-shot').forEach((card, idx) => {
      const open = () => openLightbox(idx);
      const imgBtn = card.querySelector('.ca-card-img-btn');
      const textBtn = card.querySelector('.ca-btn-lightbox-open');
      if (imgBtn) imgBtn.addEventListener('click', open);
      if (textBtn) textBtn.addEventListener('click', open);
    });
  }

  // --- Initializer ---
  async function init() {
    initElements();
    await loadData();
    loadSessionDraft();
    renderServices();
    renderChecklist();
    renderAttachedFiles();
    updateRadioStyles();
    goToStep(1);
    attachEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
