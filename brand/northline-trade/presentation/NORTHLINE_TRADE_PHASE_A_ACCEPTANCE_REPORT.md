# FLTL × HOWARD｜PORTFOLIO 06 — NORTHLINE TRADE
## PHASE A 本機驗收與藝術指導審查報告 (Local Acceptance Report)

**專案狀態**：本機建置完成，等待主理人藝術指導審查 (Ready for Art Direction Review)
**執行模式**：嚴格本機開發（**ZERO PUSH / ZERO MERGE / ZERO DEPLOY**）
**工作目錄**：`/Users/howard/Desktop/Portfolio`
**工作分支**：`feature/northline-trade-portfolio-06-v1`
**基準提交**：`c89b238971820723fdf6cede1c31c593288c3c0f` (origin/main)
**案例位置**：`brand/northline-trade/` 及獨立入口 `portfolio-northline-trade.html`
**性質揭示**：`INDEPENDENT CONCEPT / DEMO DATA`（自主品牌概念研究，非實際客戶委案或真實採購交易）

---

### 一、發布安全防線與隔離確認

1. **零推播・零合併・零部署**：本輪開發完全於本機獨立分支 `feature/northline-trade-portfolio-06-v1` 進行，未執行任何 `git push`、`git merge` 或 GitHub Pages 部署操作。
2. **零既有檔案污染**：
   - 未更動 `index.html`、`js/prototype-howard-world.js`、`css/prototype-howard-world.css`。
   - 未更動 `js/prototype-projects.js`（保持 5 件作品，未提早上架至公開首頁輪播）。
   - 未更動 `js/prototype-i18n.js`、NFC 3D 卡片、Lenis 捲動核心、或前五件作品 (`brand/atlas-ops/`, `brand/split-09/`, `brand/forno-27/`, `brand/island-index/`, `portfolio-nfc.html`)。
3. **新增檔案清單**：
   - `portfolio-northline-trade.html`（本機專屬獨立跳轉入口）
   - `brand/northline-trade/index.html`（作品案例主頁面）
   - `brand/northline-trade/case-study.html`（完整鏡像）
   - `brand/northline-trade/css/northline-case.css`（獨立樣式系統）
   - `brand/northline-trade/js/northline-case.js`（可操作 B2B 原型引擎）
   - `brand/northline-trade/assets/mockups/shot-01.jpg` ~ `shot-16.jpg`（16 張網站圖片）
   - `brand/northline-trade/assets/shots/SHOT_01_*.png` ~ `SHOT_16_*.png`（16 張 2560×1440 原稿）
   - `brand/northline-trade/assets/manifest.json`
   - `brand/northline-trade/presentation/evidence/`（37 張實測驗收佐證截圖）

---

### 二、16 組素材完整性與 SHA-256 核對表

依據 `ASSET_MANIFEST.json` 逐一驗證 32 檔案（16 Master PNG + 16 Web JPG），**全部尺寸為 2560 × 1440，SHA-256 100% 吻合**：

| SHOT | 章節檔案 (MASTER PNG) | Web JPG | 尺寸 | SHA-256 驗證結論 |
|:---:|---|---|:---:|:---:|
| **01** | `SHOT_01_INDUSTRIAL_PROCUREMENT.png` | `shot-01.jpg` | 2560×1440 | **PASS** (`300914...` / `74f7ae...`) |
| **02** | `SHOT_02_BUYER_CONTEXT.png` | `shot-02.jpg` | 2560×1440 | **PASS** (`376c78...` / `6c072f...`) |
| **03** | `SHOT_03_BRAND_IDENTITY.png` | `shot-03.jpg` | 2560×1440 | **PASS** (`495f91...` / `ea6f2a...`) |
| **04** | `SHOT_04_INFORMATION_ARCHITECTURE.png` | `shot-04.jpg` | 2560×1440 | **PASS** (`45437b...` / `2cd39d...`) |
| **05** | `SHOT_05_PART_NUMBER_SEARCH.png` | `shot-05.jpg` | 2560×1440 | **PASS** (`bdfeb7...` / `cbf6da...`) |
| **06** | `SHOT_06_PRODUCT_CATALOG.png` | `shot-06.jpg` | 2560×1440 | **PASS** (`0c758c...` / `faf10b...`) |
| **07** | `SHOT_07_PRODUCT_DETAIL.png` | `shot-07.jpg` | 2560×1440 | **PASS** (`726ce8...` / `cf49dd...`) |
| **08** | `SHOT_08_SPEC_COMPARISON.png` | `shot-08.jpg` | 2560×1440 | **PASS** (`4db112...` / `41134f...`) |
| **09** | `SHOT_09_MOQ_TIERED_PRICING.png` | `shot-09.jpg` | 2560×1440 | **PASS** (`786e8a...` / `411acc...`) |
| **10** | `SHOT_10_RFQ_BUILDER.png` | `shot-10.jpg` | 2560×1440 | **PASS** (`056fa1...` / `8b8951...`) |
| **11** | `SHOT_11_APPROVAL_WORKFLOW.png` | `shot-11.jpg` | 2560×1440 | **PASS** (`120ac3...` / `438ead...`) |
| **12** | `SHOT_12_QUOTATION_REVIEW.png` | `shot-12.jpg` | 2560×1440 | **PASS** (`cc6472...` / `e305e9...`) |
| **13** | `SHOT_13_PROCUREMENT_STATUS.png` | `shot-13.jpg` | 2560×1440 | **PASS** (`bd03b6...` / `b0a30c...`) |
| **14** | `SHOT_14_MOBILE_QUICK_PROCUREMENT.png` | `shot-14.jpg` | 2560×1440 | **PASS** (`de74a4...` / `abc642...`) |
| **15** | `SHOT_15_UI_COMPONENTS_ACCESSIBILITY.png` | `shot-15.jpg` | 2560×1440 | **PASS** (`58c7d8...` / `b785bc...`) |
| **16** | `SHOT_16_FINAL_SHOWCASE.png` | `shot-16.jpg` | 2560×1440 | **PASS** (`e81aa3...` / `eb94a1...`) |

---

### 三、真正可操作之 B2B 互動原型驗證 (Interactive Prototypes)

本案例拒絕純靜態圖框與假按鈕，於頁面中實作了 5 大真正運作的 B2B 業務前端邏輯：

#### 1. 料號搜尋引擎 (Part Number Search Engine)
- **輸入 `6205`**：即時匹配 `NL-BRG-6205`（封閉型深溝滾珠軸承 25×52×15mm），顯示規格動載荷 Cr: 14.0 kN，交期明確標示「待供應商確認 (Pending)」，並提供「帶入價格試算」快速鍵。
- **輸入未知料號（如 `XYZ-999`）**：觸發嚴謹的錯誤防呆狀態，提示「查無相符料號」，並列出標準料號搜尋建議。
- **快速標籤（Chips）**：點擊 `6005`、`6305`、`M10`、`VLV` 即可瞬間切換查詢結果。

#### 2. 多維度複合型錄篩選 (Multi-facet Product Catalog)
- **類別 Facets**：全部、滾動軸承 (Bearings)、緊固零組件 (Fasteners)、氣動控制 (Pneumatics)、工業密封 (Seals)。
- **材質 Facets**：高碳鋼 (GCr15)、SUS304 不鏽鋼、黃銅/鋁合金、NBR 丁腈橡膠。
- **動態聯動**：點擊滾動軸承時，即時篩選出 3 款軸承；計數器動態呈現「顯示 3 / 6 件規格零組件」；點擊「重設全部條件」立即還原全部 6 件展示。

#### 3. 三向同基準規格比較矩陣 (3-Way Spec Comparator)
- 針對 `NL-BRG-6205`（標準型）、`NL-BRG-6005`（薄型）、`NL-BRG-6305`（重載型）並列比較。
- 採用統一工程單位（內徑 mm、外徑 mm、寬度 mm、Cr kN、Cor kN、RPM、NT$/PC）。
- 支援**點選行高亮 (Row Highlighting)**，直觀對比重載型動負荷較標準型提升 60% 之工程數據。

#### 4. MOQ 與階梯定價計算機 (MOQ & Tiered Pricing Calculator)
- **示範基準**：`NL-BRG-6205`，起訂量 (MOQ) 20 件，訂購倍數 10 件。
- **防呆驗證實測**：
  - 輸入 **25 件**：系統即刻攔截，顯示「⚠️ 訂購數量須以 10 件為單位，且至少 20 件（MOQ: 20 PCS）」，禁用加入詢價單按鈕，小計呈現 `---`。
  - 輸入 **40 件**：合法批量，匹配 Tier 1 (NT$120/件)，小計精確輸出 **NT$ 4,800**。
  - 輸入 **100 件**：合法批量，自動晉級 Tier 2 (NT$108/件，享 9 折)，小計輸出 **NT$ 10,800**。
  - 輸入 **500 件**：合法批量，自動晉級 Tier 3 (NT$98/件，享 82 折)，小計輸出 **NT$ 49,000**。
- 點擊「+ 加入 RFQ-DEMO-001 詢價單草稿」無縫注入下方詢價單並觸發浮動通知。

#### 5. 詢價單與雙角色審批流 (RFQ Builder & Dual-Role Approval)
- 詢價單編號：`RFQ-DEMO-001`，初始狀態為 `草稿 (DRAFT)`，預設含 40 件軸承（NT$ 4,800）。
- **角色切換視角 (Actor Switching)**：
  - **Buyer 經辦視角**：可編輯數量、增刪料號；點擊「送交內部簽核」後狀態轉為 `⏳ 待主管簽核 (PENDING REVIEW)`，表單自動鎖定為唯讀狀態。
  - **Manager 主管視角**：切換至主管時解鎖審核控制台：
    - 點擊「退回重審 (Return to Buyer)」：狀態轉為 `⚠️ 退回修改 (RETURNED)`，並於備註欄自動附加「[主管審核意見] 請確認交期是否能配合 5/1 產線換季維護日程」，經辦可重新編輯。
    - 點擊「✓ 核准送出 (Approve RFQ)」：狀態正式轉為 `✓ 主管已核准 (APPROVED)`，產生審批紀錄碼 `NL-APV-2026-088`。
  - **合規性保護**：主管核准前絕不擅自呈現 Approved；所有操作標註本機概念模擬，絕無外部 API 發送。

---

### 四、視覺品管與響應式驗證 (Visual QA & Responsive Layout)

以 Chromium 針對多種標準解析度進行實測，確保無裝置變形、無純縮放缺陷：

| 裝置視圖 | 測試解析度 | 驗收重點 | 結論 |
|---|:---:|---|:---:|
| **Desktop 4K / FHD** | 1920 × 1080 | 頂部導航、Hero 首屏 (Shot 01)、各沙盒雙欄佈局、16 個圖卡高解析渲染 | **PASS** |
| **Desktop Laptop** | 1440 × 900 | 容器滿版無水平溢位、型錄 3 欄自適應卡片 | **PASS** |
| **Tablet Landscape** | 1024 × 768 | 導航自動收合輔助文字、沙盒單欄流暢堆疊 | **PASS** |
| **Tablet Portrait** | 768 × 1024 | 比較矩陣橫向捲軸正常、圖卡雙欄轉單欄排版優化 | **PASS** |
| **Mobile Standard** | 390 × 844 (iPhone 14) | 單手易操作按鈕尺寸、階梯計算機大字號計數器、RFQ 表格響應式捲動 | **PASS** |
| **Mobile Compact** | 375 × 812 (SE/Mini) | 375 寬度文字不折行截斷、彈出層與導航無任何破版 | **PASS** |

---

### 五、無障礙、雙語與通用功能檢驗

1. **2560 × 1440 Master RAW Lightbox**：
   - 點選任一圖卡（或鍵盤 Enter）開啟高解析 Master PNG 檢視器。
   - 支援 `Escape` 鍵退出、鍵盤左右箭頭切換作品、右上關閉鍵、背景點擊關閉。
   - 關閉後焦點平順返回原始觸發按鈕，無焦點丟失問題。
2. **雙語切換系統 (Bilingual Toggle)**：
   - 點擊導航 `中` / `EN` 瞬間切換全站標題、徽章、圖卡說明與操作介面。
   - 同步記錄於 `localStorage['howard-portfolio-lang']`，重整後記憶偏好。
3. **無障礙 Focus 狀態與減敏動態**：
   - 所有互動元件具備高能見度 `:focus-visible` 外框（`2px solid var(--c-oxide)`）。
   - 支援 `@media (prefers-reduced-motion: reduce)`，即時停用動態過渡與脈衝動畫。
4. **Console & Network 稽核**：
   - 應用程式 Console Errors 為 **0**。
   - 網路請求 4xx/5xx 為 **0**，所有圖片資源正確載入。

---

### 六、既有前五件作品與首頁回歸驗收 (Regression Test)

本機伺服器針對全站五件既有作品進行 HTTP 狀態碼與功能性迴歸測試：

| 檢查端點 | 預期功能 | 實測狀態 |
|---|---|:---:|
| `http://localhost:8080/index.html` | 首頁作品總覽與最新聯絡區滑動輪播 V3 | **HTTP 200 OK** |
| `http://localhost:8080/portfolio-nfc.html` | 01. FLTL NFC 智慧卡案例 | **HTTP 200 OK** |
| `http://localhost:8080/brand/island-index/` | 02. 島序 ISLAND INDEX 案例 | **HTTP 200 OK** |
| `http://localhost:8080/brand/forno-27/` | 03. FORNO 27 案例 | **HTTP 200 OK** |
| `http://localhost:8080/brand/split-09/` | 04. SPLIT/09 案例 | **HTTP 200 OK** |
| `http://localhost:8080/brand/atlas-ops/` | 05. ATLAS OPS 案例 | **HTTP 200 OK** |
| `http://localhost:8080/portfolio-northline-trade.html` | 06. NORTHLINE TRADE 專屬跳轉入口 | **HTTP 200 OK** |

---

### 七、佐證截圖檔案清單 (Evidence Files)

全部 37 份截圖已完整儲存於：
- `brand/northline-trade/presentation/evidence/`
- `/Users/howard/Desktop/_patch_review/NORTHLINE_TRADE_PORTFOLIO_06_20261021/04_PREVIEW/evidence/`

1. **16 張作品單獨情境截圖**：
   - `shot_01_desktop_context.png` 至 `shot_16_desktop_context.png`
2. **B2B 原型沙盒互動證據**：
   - `interaction_search_success_6205.png`（搜尋 6205 成功展示）
   - `interaction_search_error_fallback.png`（未知料號錯誤防呆）
   - `interaction_catalog_filtered_bearings.png`（型錄滾動軸承篩選）
   - `interaction_spec_comparator_highlight.png`（三向規格表高亮對比）
   - `interaction_moq_error_qty_25.png`（MOQ 25 數量錯誤防呆）
   - `interaction_moq_legal_qty_40.png`（MOQ 40 成功計算 NT$4,800）
   - `interaction_rfq_01_draft_state.png`（RFQ 草稿初始狀態）
   - `interaction_rfq_02_pending_review.png`（Buyer 送審，狀態轉 Pending）
   - `interaction_rfq_03_returned_state.png`（Manager 退回附審核意見）
   - `interaction_rfq_04_approved_state.png`（Manager 核准通過）
3. **功能與視圖證據**：
   - `lightbox_shot_01_master_raw.png`（2560×1440 Master RAW Lightbox）
   - `bilingual_mode_english_desktop.png`（全站英文切換展示）
   - `responsive_desktop_1440_hero.png`
   - `responsive_tablet_1024_hero.png`
   - `responsive_tablet_768_hero.png`
   - `responsive_mobile_390_iphone14_hero.png`、`responsive_mobile_390_iphone14_calc.png`、`responsive_mobile_390_iphone14_rfq.png`
   - `responsive_mobile_375_compact_hero.png`、`responsive_mobile_375_compact_calc.png`、`responsive_mobile_375_compact_rfq.png`

---

### 八、總結與就緒宣告

本機建置與全功能整合測試已全面 PASS，未發現阻斷性缺陷，亦未觸及任何線上推播。正式提報：

**`NORTHLINE TRADE PHASE A — READY FOR ART DIRECTION REVIEW`**
