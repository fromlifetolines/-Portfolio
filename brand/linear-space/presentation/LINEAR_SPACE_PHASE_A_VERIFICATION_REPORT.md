# FLTL × HOWARD｜PORTFOLIO 08 — LINEAR SPACE / FRAME/01
## PHASE A LOCAL INTEGRATION & ART DIRECTION VERIFICATION REPORT

**任務代碼**：P08-FRAME01-LOCAL-V1  
**執行模式**：LOCAL ONLY / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY  
**作業目錄**：`/Users/howard/Desktop/Portfolio`  
**素材來源**：`/Users/howard/Desktop/_patch_review/LINEAR_SPACE_PORTFOLIO_08_FULL_16_PHASE_A_20261022/`  
**基準分行**：`feature/linear-space-portfolio-08-v1`（以 `origin/main` SHA `b9fc3cc` 為基礎）  
**驗收日期**：2026-10-22  
**審核狀態**：**LINEAR SPACE PORTFOLIO 08 — PHASE A READY FOR ART DIRECTION REVIEW**

---

### 一、最高原則與安全隔離審查（Scope & Boundaries）

1. **嚴格本機模式（Zero Push / Zero Merge / Zero Deploy）**：
   - 全程於隔離分支 `feature/linear-space-portfolio-08-v1` 執行。
   - 未執行任何 `git push`、未建立任何 PR、未執行任何 `git merge`、未執行 GitHub Pages Deploy。
2. **全站與既有資產零污染（Zero Core Modifications）**：
   - 經 `git diff --name-status` 檢查，**既有追蹤檔案變動為 0**。
   - 首頁 `index.html`、`about.html`、`js/prototype-projects.js`、`js/prototype-howard-world.js`、`css/prototype-howard-world.css`、`js/prototype-i18n.js`、Contact Works V3、以及前七件作品（Works 01–07）均未被更動或寫入。
   - 本輪僅建立自包含之第八件案例目錄 `brand/linear-space/` 及獨立根轉址 `portfolio-linear-space.html`。
3. **無損素材承諾（No Re-generation / No Contact Sheet Cropping）**：
   - 禁止重新生成或替換圖片；禁止裁切 Contact Sheet 充數；禁止改換為廉價替代素材。
   - 16 張正式 Master PNG 及 16 張 Web JPG 皆直接自交付素材包逐一驗收匯入。

---

### 二、32 筆正式二進位檔案與 SHA-256 密碼學校驗 (100% MATCH)

逐一計算 `brand/linear-space/assets/shots/`（Master PNG）與 `brand/linear-space/assets/mockups/`（Web JPG）共 32 筆檔案之 SHA-256 雜湊值，與 `ASSET_MANIFEST_FULL_16.json` 進行 1-to-1 比對：

| 組別 | 圖號與正式名稱 | 畫布解析度 | Master PNG 檔案與 SHA-256 | Web JPG 檔案與 SHA-256 | 校驗判定 |
|:---:|---|:---:|---|---|:---:|
| 01 | **SHOT 01** Architectural Hero | 2560×1440 | `SHOT_01_ARCHITECTURAL_HERO.png`<br>`46ba3018f288239be39a82207962fdec57f734757d7baaa272b05db137bad90e` | `shot-01.jpg`<br>`d7da34fd1fc1cfc1963d0d51a47dc7669a70672a5cba2bd59b56f0a7b86f1ca1` | **PASS ✓** |
| 02 | **SHOT 02** Brand Concept | 2560×1440 | `SHOT_02_BRAND_CONCEPT.png`<br>`571dbb8886a931a3d46113e9e076a62884cf9341bf345793a826abc901330b0e` | `shot-02.jpg`<br>`e937e3b579930e04e8dd722b17ff10a6819d16308efaeada3296e6b99ecc64dc` | **PASS ✓** |
| 03 | **SHOT 03** Space Planning | 2560×1440 | `SHOT_03_SPACE_PLANNING.png`<br>`e67a64f3e690bb4bc81ed7a789c2dcdc1c0314483fef34cd294f41badc29d3e9` | `shot-03.jpg`<br>`442256b596e8a7c4476162c96443076b670d24df6164f6579001b8bfe73bcb11` | **PASS ✓** |
| 04 | **SHOT 04** Exterior Arrival | 2560×1440 | `SHOT_04_EXTERIOR.png`<br>`9c8d4f57348d1cb1177b6242c27cf14da31b6a6772d047c608ac3981dce49857` | `shot-04.jpg`<br>`44db6fb0d555e3c5c91a01c469209277cbe7f9662c17194552e3a30fa2f76d66` | **PASS ✓** |
| 05 | **SHOT 05** Interior Overview | 2560×1440 | `SHOT_05_INTERIOR_OVERVIEW.png`<br>`458217047d75d66b049acc62f2ed7c6a6d8380b98a88db1b889a286354123a6b` | `shot-05.jpg`<br>`dea0b8b5d4dce0c64b22b491296f604ab7b1a40e91ff76dcefd58e2bdf9c5b79` | **PASS ✓** |
| 06 | **SHOT 06** Material Palette | 2560×1440 | `SHOT_06_MATERIAL_PALETTE.png`<br>`e3f64c7b3307175329a6431346f3458bc308307d12b65ac4a4681757e190e565` | `shot-06.jpg`<br>`80d4088b1c314370d72e67a37721f3d3ab295a2d7ba9c44c1cac8a7ce97f271a` | **PASS ✓** |
| 07 | **SHOT 07** Lighting Design | 2560×1440 | `SHOT_07_LIGHTING_DESIGN.png`<br>`2fcadc43036842c984b795f4f18ae5fb7b4918301fffac6ac67fc568632f5fd6` | `shot-07.jpg`<br>`49ea302196f1e0f0e729b49953a305bce77963e97abbc82083ddcb3f144827d4` | **PASS ✓** |
| 08 | **SHOT 08** Retail Display | 2560×1440 | `SHOT_08_RETAIL_DISPLAY.png`<br>`a77514b0661391b7ec99d236bdc1e60846d257e6c9bc62011895f8ef238a86d4` | `shot-08.jpg`<br>`bb0a8741f71d59f5abefef174017e669a6f3385c57ef1baf6065d11670638edd` | **PASS ✓** |
| 09 | **SHOT 09** Wayfinding System | 2560×1440 | `SHOT_09_WAYFINDING_SYSTEM.png`<br>`122a25afb4482f4938c89d5073dd70f2fe39c5aedb28faae588329185d84e5b8` | `shot-09.jpg`<br>`05cfcb173040f1389688e02dd83957d06d9f202bbecda995ccfea57405fe9ac9` | **PASS ✓** |
| 10 | **SHOT 10** Furniture Detail | 2560×1440 | `SHOT_10_FURNITURE_DETAIL.png`<br>`df67086bdad3e86359898f9b0994c64c5f28f39eb399add6334a8fcc2242f953` | `shot-10.jpg`<br>`ee741c584ab6b8933f02976dff7807130ba0b5a090998400b8543df03d868627` | **PASS ✓** |
| 11 | **SHOT 11** Human Experience | 2560×1440 | `SHOT_11_HUMAN_EXPERIENCE.png`<br>`150c49ff3bc26b0bac9c8c6b8b7d0024b34082e114e1bfa391afe51b61fce702` | `shot-11.jpg`<br>`64a0a0fa07af2082ea3943681944cb809a706e07e60e83f8c5d4b3575ca346f1` | **PASS ✓** |
| 12 | **SHOT 12** Detail & Craft | 2560×1440 | `SHOT_12_DETAIL_CRAFT.png`<br>`dbdbe1e8f8ea9e3340ab22b0de5aa1ee70973a04f9b8a914060ef230081a7ab3` | `shot-12.jpg`<br>`d7a769717d434e28acee122083d4e2fecc4c894f357c2fe779cd90f64094e6cf` | **PASS ✓** |
| 13 | **SHOT 13** Digital Desktop | 2560×1440 | `SHOT_13_DIGITAL_EXPERIENCE.png`<br>`483e1c7b8088807c188d986532585a468670e8e231eff1332ee0fe830e422de9` | `shot-13.jpg`<br>`71b11b9a16317a8a10579fce8fa6284cf95a5dd48f9eb15d2631fb7bf4337873` | **PASS ✓** |
| 14 | **SHOT 14** Mobile Experience | 2560×1440 | `SHOT_14_MOBILE_EXPERIENCE.png`<br>`0e32dac27174df442348b86f0e6ec4e8ad8e1066e0295ae6e19188f2f066fc05` | `shot-14.jpg`<br>`977b6060be12c49d5c616f3a8709a2384dfd6923380e79c708d36aaf2ad46564` | **PASS ✓** |
| 15 | **SHOT 15** Design Process | 2560×1440 | `SHOT_15_DESIGN_PROCESS.png`<br>`223d6735d9e58b9f9715714b33e6af58383d0e981807a2d1fef2648a8e96ad1d` | `shot-15.jpg`<br>`9c407049bde3bcfcede939611c9354db97ea36de71b26f7cf350d0f6ee3e4a84` | **PASS ✓** |
| 16 | **SHOT 16** Final Showcase | 2560×1440 | `SHOT_16_FINAL_SHOWCASE.png`<br>`46848b2a47fb23f5bf0c6347b1bc13fec1a4ef944b3172b63c63cf15a9333cac` | `shot-16.jpg`<br>`7cd0ed4f5004d9acd305e71b20a0b8831a0314243dd9205775a6642bb9620b4d` | **PASS ✓** |

**解析度與感光元件真實性揭露（Rendering Truth）**：
- 32 筆檔案皆為 **2560 × 1440 最終設計畫布**。
- SHOT 01 原生攝影生成尺寸為 1672×941，後製 Lanczos 重採樣並排版至 2560×1440；其他部分圖版亦包含非原生 4K 之攝影與合成元素。已於網頁 UI 及本報告如實載明，不宣稱全景原生 4K 光學攝影。

---

### 三、專案定位與 180 m² 空間規劃一致性

1. **專案真實定位**：
   - 品牌：**LINEAR SPACE**；案例：**FRAME/01 — Urban Gallery & Design Salon**。
   - 性質：**自主虛構建築與空間概念／品牌環境識別研究（Self-Initiated Architectural Concept Study）**。
   - 嚴格避免編造：不宣稱取得任何建築執照、消防審查、施工圖驗證、真實商業客戶、完工期程或節能認證。
2. **180 m² 分區面積嚴格數學吻合**：

| 機能分區 | 面積 (m²) | 佔比 | 主要材質策略 | 空間機能與照明焦點 |
|---|:---:|:---:|---|---|
| **01 Entrance（玄關迎賓）** | 24 m² | 13.3% | 石灰岩、霧黑金屬、隱藏地腳燈 | 挑高立面、過渡儀式感、2700K 迎賓間接引導光 |
| **02 Gallery（展演藝廊）** | 64 m² | 35.6% | 霧面玻璃、微水泥、天花洗牆軌道燈 | 主展覽島台、純淨背景、3000K 展品重點顯色照明 |
| **03 Lounge（交流沙龍）** | 38 m² | 21.1% | 煙燻橡木、羊毛織品、低角度漫射嵌燈 | 設計師洽談交流、定制長凳、暖光沉靜氛圍 |
| **04 Consultation（深度諮詢）** | 24 m² | 13.3% | 霧面隔音玻璃、煙燻橡木牆面 | 隱密選樣室、聲學降噪、柔和無眩光工作照明 |
| **05 Back-of-house（後勤營運）** | 30 m² | 16.7% | 耐磨地坪、霧黑五金、高照度功能燈 | 樣品儲存、設備機房、備品整理與職員通道 |
| **合計（TOTAL FLOOR AREA）** | **180 m²** | **100%** | **石灰岩、煙燻橡木、霧黑金屬、霧面玻璃** | **完整滿足工單 180 m² 規範，無任何計算誤差** |

---

### 四、網站架構與互動原型實作（UI/UX Implementation）

1. **檔案組織結構**：
   - `brand/linear-space/index.html`：自包含案例主頁，完整呈現品牌、規格、導覽、16 圖版與治理揭露。
   - `brand/linear-space/case-study.html`：獨立案例展示入口副本。
   - `brand/linear-space/css/linear-case.css`：建築極簡深色美學（`#0c0d0e` 背景、`#f4f4f2` 字體、石灰岩象牙白與暖黃金屬點綴）。
   - `brand/linear-space/js/linear-case.js`：動態 16 圖版注入、5 區空間導覽、無障礙全螢幕燈箱、即時中英切換。
   - `brand/linear-space/assets/shots/`：16 張 Master PNG（供燈箱高畫質檢視）。
   - `brand/linear-space/assets/mockups/`：16 張 Web JPG（供網頁快速加載展示）。
   - `brand/linear-space/assets/manifest.json`：32 筆資產清冊與 SHA-256。
   - `portfolio-linear-space.html`：根目錄轉址橋接頁。
2. **16:9 與文字無裁切保證（Aspect Ratio & Containment）**：
   - 全域圖框使用 `aspect-ratio: 16 / 9` 搭配 `object-fit: contain` 與背景 `#0c0d0e` 承接。
   - 杜絕使用 `cover` 造成圖版文字邊界遭裁切。
   - 網頁外層文字與圖版內既有文字分界清楚，無文字疊合或重複覆蓋問題。
3. **可操作的空間導覽原型（Interactive Spatial Tour）**：
   - 支援 5 個機能分區即時切換（Entrance、Gallery、Lounge、Consultation、Back-of-house）。
   - 動態更新分區名稱、面積標籤、中文／英文說明文案、材質與照明焦點，以及對應空間預覽圖。
   - 明確標註前端原型聲明，不連結真實訂位或外部系統。
4. **無障礙全功能燈箱（Accessible Fullscreen Lightbox）**：
   - 點擊任一圖版或 `2560×1440 ↗` 按鈕即可呼叫燈箱，直接載入該圖對應之 2560×1440 Master PNG。
   - 支援鍵盤快速鍵：`Escape` 關閉、`ArrowRight` 下一張、`ArrowLeft` 上一張。
   - 具備焦點管理（Focus trap & return），燈箱關閉後焦點平順返回原觸發按鈕。
   - 支援 `prefers-reduced-motion`，無突兀過渡。
5. **即時雙語切換（Bilingual Switcher）**：
   - 支援繁體中文（`zh-TW`）與英文（`en`）瞬時切換。
   - 切換時同時更新 `html[lang]`、主標題、副標題、空間規劃導覽文案、材質說明及法規免責聲明。

---

### 五、自動化 QA 測試與跨裝置驗證結果（Automated QA Suite）

執行 `scratch/linear_space_qa.mjs`，在真實無頭 Chrome 環境對 6 種視窗尺寸進行渲染與互動審查：

| 測試項目 | 檢驗標準 | 執行結果 | 判定 |
|---|---|---|:---:|
| **16 圖版完整度** | `#ls-plates-grid .ls-plate-figure` 數量精確等於 16 | 16/16 獨立渲染，無遺漏無重複 | **PASS ✓** |
| **5 區空間導覽** | `.ls-zone-btn` 數量精確等於 5，切換後面積與圖文同步更新 | 5/5 正常切換，Zone 2 (64 m²)、Zone 3 (38 m²) 驗證通過 | **PASS ✓** |
| **空間面積總和** | 面積表格總計必須為 `180 m²` | 經 DOM 讀取精確為 `180 m²` | **PASS ✓** |
| **全螢幕燈箱** | 開啟 Master PNG、切換下一張、Escape 關閉、焦點歸位 | 開啟 `SHOT_01` PNG，Next 切換至 `SHOT_02`，Esc 關閉成功 | **PASS ✓** |
| **雙語切換** | `zh-TW` ↔ `en` 點擊切換，更新語言與圖說 | 成功切換為英文文案並更新 `html[lang]="en"`，再平順切回中文 | **PASS ✓** |
| **Console 錯誤審查** | 控制台報錯數量必須為 0 | `consoleErrors = 0`，無 JavaScript 未捕捉例外 | **PASS ✓** |
| **靜態資源請求** | 無 4xx / 5xx 資源缺失（除預設 favicon） | CSS、JS、JPG、PNG 均為 HTTP 200 / 304 | **PASS ✓** |

**六大 Viewport 橫向無溢出審查（Horizontal Overflow Audit）**：
- `1920 × 1080`（Desktop Large）：`scrollWidth - clientWidth = 0px` **PASS ✓**
- `1440 × 900`（Desktop Standard）：`scrollWidth - clientWidth = 0px` **PASS ✓**
- `1024 × 768`（Tablet Landscape）：`scrollWidth - clientWidth = 0px` **PASS ✓**
- `768 × 1024`（iPad Portrait）：`scrollWidth - clientWidth = 0px` **PASS ✓**
- `390 × 844`（iPhone 12/13/14）：`scrollWidth - clientWidth = 0px` **PASS ✓**
- `375 × 812`（iPhone X/XS/11 Pro）：`scrollWidth - clientWidth = 0px` **PASS ✓**

---

### 六、前七件作品回歸測試（Works 01–07 Regression）

針對本機已上線之 Works 01–07 進行端點可達性測試，確認全數正常運作：
1. `portfolio-nfc.html`（FLTL NFC）：**HTTP 200 Accessible ✓**
2. `brand/island-index/`（ISLAND INDEX）：**HTTP 200 Accessible ✓**
3. `brand/forno-27/`（FORNO 27）：**HTTP 200 Accessible ✓**
4. `brand/split-09/`（SPLIT 09）：**HTTP 200 Accessible ✓**
5. `brand/atlas-ops/`（ATLAS OPS）：**HTTP 200 Accessible ✓**
6. `brand/northline-trade/`（NORTHLINE TRADE）：**HTTP 200 Accessible ✓**
7. `brand/forme-lab/`（FORME LAB）：**HTTP 200 Accessible ✓**

---

### 七、實機截圖與視覺證據庫（Evidence Inventory）

所有驗證截圖存儲於 `brand/linear-space/presentation/evidence-qa/`：

1. `01_desktop_hero.png` (3.66 MB)：桌機端 Hero 視圖，包含全幅 SHOT 01 建築外觀、頂部導航與標題排版。
2. `02_spatial_tour_entrance.png` (1.47 MB)：空間導覽 Entrance（24 m²）選取狀態與材質規格。
3. `03_spatial_tour_gallery.png` (1.44 MB)：空間導覽 Gallery（64 m²）動態切換後之文字與預覽圖。
4. `04_materials_palette.png` (0.28 MB)：核心材質與照明色溫規格區塊。
5. `05_plates_grid.png` (2.62 MB)：16 幕建築與空間設計畫布網格排列。
6. `06_wayfinding_digital_touchpoints.png` (1.93 MB)：SHOT 09（環境導視）與 SHOT 10（木作石材收邊）觸點展示。
7. `07_lightbox_shot_01.png` (5.47 MB)：燈箱開啟 SHOT 01 Master PNG（2560×1440）之全螢幕檢視狀態。
8. `08_mobile_hero.png` (0.61 MB)：手機端（390×844）Hero 視圖與標籤版面。
9. `09_mobile_spatial_tour.png` (0.46 MB)：手機端垂直堆疊之空間導覽互動按鈕。
10. `10_mobile_plates_grid.png` (0.88 MB)：手機端 16:9 圖版網格與燈箱捷徑按鈕。

**SHOT 13 與 SHOT 14 裝置框細節審查（Device Frames Audit）**：
- **SHOT 13（Desktop Website）**：桌機顯示器外框完整，深色 UI 內部「LINEAR SPACE ARCHITECTURAL CONCEPT STUDY」文字字距俐落，與背景石灰岩照片無重疊衝突。
- **SHOT 14（Mobile Experience）**：手機機身邊角圓弧自然，手指手持比例正常，直式螢幕內部空間選單與預訂按鈕清晰無裁切，無破版或字體變形現象。

---

### 八、Git 變更狀態與審查結論（Conclusion）

```
$ git status --short
?? brand/linear-space/
?? portfolio-linear-space.html
?? scratch/

$ git diff --name-status
(Zero tracked files modified - 完全零污染)
```

**結論**：  
Portfolio 08（LINEAR SPACE / FRAME/01）Phase A 本機整合各項指標、32 筆 SHA-256、180 m² 空間規格、16:9 比例保護、無障礙燈箱、雙語切換及無橫向溢出均已 100% 達成規範，全站既有檔案完全不受干擾。

正式回報：  
**LINEAR SPACE PORTFOLIO 08 — PHASE A READY FOR ART DIRECTION REVIEW**
