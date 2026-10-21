# FLTL × HOWARD｜PORTFOLIO 06 — NORTHLINE TRADE
## PHASE A.4 視覺素材替換與本機終審驗收報告 (Final Acceptance Report)

**專案狀態**：PHASE A.4 本機素材替換與全功能 QA 通過（PASS）
**審查判定**：**READY FOR PHASE B REVIEW**
**執行模式**：嚴格本機隔離（**ZERO PUSH / ZERO MERGE / ZERO DEPLOY**）
**工作目錄**：`/Users/howard/Desktop/Portfolio`
**工作分支**：`feature/northline-trade-portfolio-06-v1`
**基準提交**：`c89b238971820723fdf6cede1c31c593288c3c0f` (`origin/main`, `HEAD`)
**專案位置**：`brand/northline-trade/` 及獨立入口 `portfolio-northline-trade.html`
**概念揭示**：`INDEPENDENT CONCEPT / DEMO DATA`（自主品牌概念提案，非實際供應商照片或成交紀錄）

---

### 一、發布安全防線與工作區檢查

1. **零推播・零合併・零部署**：本輪開發嚴格限制於本機，未執行任何 `git push`、`git merge` 或 GitHub Pages 部署操作。
2. **零既有檔案污染**：
   - 未改動首頁 `index.html`、`js/prototype-howard-world.js`、`css/prototype-howard-world.css`。
   - 未改動作品註冊表 `js/prototype-projects.js`（維持 5 件已發布作品，第 6 件尚未提早上架至首頁輪播）。
   - 未改動多國語系核心 `js/prototype-i18n.js`、Lenis 捲動、NFC 3D 卡片。
   - 未改動前五件作品的程式碼或資產。
3. **工作區狀態核實**：
   ```bash
   $ git branch --show-current
   feature/northline-trade-portfolio-06-v1
   $ git rev-parse HEAD
   c89b238971820723fdf6cede1c31c593288c3c0f
   $ git status --short
   ?? brand/northline-trade/
   ?? portfolio-northline-trade.html
   ```
   所有異動均限制於獨立新增檔案與資料夾，追蹤清單無任何既有檔案修改。

---

### 二、修改前備份確認 (Pre-replacement Backup)

在覆寫前，已依工單指示將原有的 4 張 PNG 及 4 張 JPG 備份至：
`/Users/howard/Desktop/_patch_review/NORTHLINE_TRADE_A4_BEFORE_BACKUP_20261021/`

- `shots/SHOT_01_INDUSTRIAL_PROCUREMENT.png` (750,198 bytes, SHA: `300914...`)
- `shots/SHOT_06_PRODUCT_CATALOG.png` (116,071 bytes, SHA: `0c758c...`)
- `shots/SHOT_07_PRODUCT_DETAIL.png` (507,550 bytes, SHA: `726ce8...`)
- `shots/SHOT_16_FINAL_SHOWCASE.png` (500,430 bytes, SHA: `e81aa3...`)
- `mockups/shot-01.jpg` (296,651 bytes, SHA: `74f7ae...`)
- `mockups/shot-06.jpg` (264,282 bytes, SHA: `faf10b...`)
- `mockups/shot-07.jpg` (249,058 bytes, SHA: `cf49dd...`)
- `mockups/shot-16.jpg` (244,919 bytes, SHA: `eb94a1...`)

---

### 三、A.4 新版 8 組素材 SHA-256 與解析度驗證表

依據 `ASSET_MANIFEST_PATCH_A4.json` 逐一驗證替換後位於 `brand/northline-trade/assets/` 下的檔案：
**全部 8 個檔案解析度均為 2560 × 1440，長寬比嚴格 16:9，SHA-256 100% 吻合**：

| SHOT | 檔案名稱 | 實際路徑 | 尺寸 (PX) | 檔案大小 | SHA-256 驗證結果 | 視覺改善目標 |
|:---:|---|---|:---:|:---:|:---:|---|
| **01** | `SHOT_01_INDUSTRIAL_PROCUREMENT.png` | `assets/shots/` | 2560×1440 | 984,784 B | **PASS** (`0acd7917d2ea6b9b...`) | 企業級深色工業工作場景、金屬質感，完整品牌主視覺 |
| **01** | `shot-01.jpg` | `assets/mockups/` | 2560×1440 | 421,570 B | **PASS** (`d8a10240f0d172bb...`) | 展示 JPG 對應新版主視覺，無虛構客戶宣稱 |
| **06** | `SHOT_06_PRODUCT_CATALOG.png` | `assets/shots/` | 2560×1440 | 657,400 B | **PASS** (`83f7ab9c49516958...`) | 6205 2RS密封、6206 ZZ防塵、6207 OPEN外露三種可辨結構 |
| **06** | `shot-06.jpg` | `assets/mockups/` | 2560×1440 | 436,822 B | **PASS** (`cc203d9591c49944...`) | 展示 JPG 清晰辨識不同產品外觀，符合日式型錄 |
| **07** | `SHOT_07_PRODUCT_DETAIL.png` | `assets/shots/` | 2560×1440 | 702,798 B | **PASS** (`4d187c79ab68b384...`) | 6205 呈現可信 2RS 雙側橡膠密封端面，不再混淆為外露滾珠 |
| **07** | `shot-07.jpg` | `assets/mockups/` | 2560×1440 | 385,926 B | **PASS** (`3a09503625b584fd...`) | 展示 JPG 規格參數、內外徑公差與交期揭露 |
| **16** | `SHOT_16_FINAL_SHOWCASE.png` | `assets/shots/` | 2560×1440 | 499,790 B | **PASS** (`93b56ad5d3651a41...`) | 整合新版型錄、RFQ 詢價草稿與簽核收尾版面，不重複單顆軸承 |
| **16** | `shot-16.jpg` | `assets/mockups/` | 2560×1440 | 364,244 B | **PASS** (`35b432db6a9c15ce...`) | 展示 JPG 跨終端與數位採購系統完整呈現 |

*其餘 12 組素材（SHOT 02–05、SHOT 08–15）全數維持原貌未更動，經 Chromium 與 PIL 核對皆正常加載且解析度均為 2560×1440。*

---

### 四、產品名稱、數據與互動原型嚴格一致性

本輪已依照工單第 3 條要求，精準修訂 `northline-case.js` 及網頁文案，與 A.4 圖像設定完全對齊：

1. **三大核心展示 SKU**：
   - **`NL-BRG-6205`**：2RS 橡膠密封深溝球軸承（25 × 52 × 15 mm，雙面橡膠密封 2RS，動載荷 Cr: 14.0 kN，交期：待供應商確認）。
   - **`NL-BRG-6206`**：ZZ 金屬防塵蓋軸承（30 × 62 × 16 mm，雙面金屬防塵蓋 ZZ，動載荷 Cr: 19.5 kN，交期：待供應商確認）。
   - **`NL-BRG-6207`**：OPEN 開放式深溝球軸承（35 × 72 × 17 mm，外露滾珠無密封 OPEN，動載荷 Cr: 25.7 kN，交期：待供應商確認）。
2. **已確立之既定價格與防呆規則（100% 保持不變）**：
   - `NL-BRG-6205`：MOQ 20 件，訂購倍數 10 件。
   - 輸入 `25` 件：系統攔截提示「⚠️ 訂購數量須以 10 件為單位，且至少 20 件（MOQ: 20 PCS）」，禁用加入詢價單，小計輸出 `---`。
   - `40` 件 × NT$120 (Tier 1) = **NT$ 4,800**。
   - `100` 件 × NT$108 (Tier 2) = **NT$ 10,800**。
   - `500` 件 × NT$98 (Tier 3) = **NT$ 49,000**。
3. **RFQ 權限與簽核狀態（100% 保持不變）**：
   - 單號 `RFQ-DEMO-001`，初始狀態 `草稿 (DRAFT)`，預設含 40 PCS `NL-BRG-6205`（NT$ 4,800）。
   - 經辦送審轉為 `⏳ 待主管簽核 (PENDING REVIEW)`。
   - 主管退回轉為 `⚠️ 退回修改 (RETURNED)` 並自動附加審核註記。
   - 主管核准正式轉為 `✓ 主管已核准 (APPROVED)`，產生核准序號 `NL-APV-2026-088`。
   - 未經主管核准前絕無 Approved 狀態。

---

### 五、五大可操作 B2B 原型實測結論

透過 Chromium CDP 自動化測試腳本逐一執行互動，結果如下：

| 原型模組 | 測試動作 | 預期反應 | 實測結果 | 驗收結論 |
|---|---|---|---|:---:|
| **1. 料號搜尋** | 輸入 `6205` | 匹配 `NL-BRG-6205`（2RS 橡膠密封） | 即時顯示技術規格與交期「待供應商確認」 | **PASS** |
| | 輸入 `6206` | 匹配 `NL-BRG-6206`（ZZ 防塵蓋） | 顯示 30×62×16mm 規格與 ZZ 防塵說明 | **PASS** |
| | 輸入 `6207` | 匹配 `NL-BRG-6207`（OPEN 開放式） | 顯示 35×72×17mm 規格與 OPEN 外露說明 | **PASS** |
| | 輸入 `XYZ-999` | 查無相符料號錯誤狀態 | 顯示警告紅框與標準品建議 | **PASS** |
| **2. 商品型錄** | 點擊「滾動軸承」 | 篩選出 3 款軸承 | 顯示 6205、6206、6207，計數器標示 3 / 6 | **PASS** |
| | 點擊「重設全部條件」 | 還原型錄顯示 | 顯示全數 6 款零組件，計數器標示 6 / 6 | **PASS** |
| **3. 規格比較** | 檢視 6205、6206、6207 | 同基準橫向比對 | 三列軸承並列呈現內外徑、密封結構與單價 | **PASS** |
| | 點選表格任一行 | 啟動高亮對比 | 觸發 `.is-highlight` 高亮 | **PASS** |
| **4. 階梯計算機** | 輸入 `25` 件 | 違反 MOQ / 倍數防呆 | 阻擋並提示倍數錯誤，小計 `---`，按鈕停用 | **PASS** |
| | 輸入 `40` 件 | Tier 1 計算 | 單價 NT$120，小計精確輸出 **NT$ 4,800** | **PASS** |
| | 輸入 `100` 件 | Tier 2 計算 | 單價 NT$108，小計精確輸出 **NT$ 10,800** | **PASS** |
| | 輸入 `500` 件 | Tier 3 計算 | 單價 NT$98，小計精確輸出 **NT$ 49,000** | **PASS** |
| **5. RFQ 與簽核** | 經辦點擊「送交簽核」 | 狀態變更為待主管審批 | 狀態轉為 `PENDING REVIEW`，表單鎖定 | **PASS** |
| | 主管點擊「退回重審」 | 狀態變更為退回修改 | 狀態轉為 `RETURNED`，附加換季日程意見 | **PASS** |
| | 主管點擊「核准送出」 | 狀態變更為主客已核准 | 狀態轉為 `APPROVED`，產生審批紀錄碼 | **PASS** |

---

### 六、多裝置響應式、無障礙與雙語檢驗

1. **桌機檢視 (1440 × 900)**：
   - 頂部導航無遮擋，四組修正後卡片（SHOT 01、06、07、16）比例完美，字級排版銳利。
   - 所有原稿圖長寬比均維持 16:9，無任何拉伸形變。
2. **手機檢視 (390 × 844 iPhone 14)**：
   - 垂直流暢堆疊，按鈕符合單手觸控標準熱區。
   - 數量增減步進器（-10 / +10）正常運作，RFQ 報價單支援橫向平順滾動。
3. **Master RAW Lightbox (2560 × 1440)**：
   - 點擊 SHOT 01、06、07、16 任一圖卡，正確開啟高解析 Master PNG（naturalWidth: 2560, naturalHeight: 1440）。
   - 按鍵 `Escape` 能瞬間關閉，關閉後焦點平順返回原卡片，無焦點丟失。
4. **雙語切換 (ZH-TW / EN)**：
   - 點擊導航 `EN` 瞬間切換所有章節、圖卡解說、沙盒操作介面。
   - 點擊 `中` 即刻無刷新切換回繁體中文。
5. **程式碼稽核**：
   - 應用程式 Console Errors 數為 **0**。
   - 網路 4xx/5xx 失敗數為 **0**。

---

### 七、既有五件上線作品與首頁 V3 循環輪播迴歸驗收

所有端點皆在本機經由 HTTP 要求實測驗證，無任何功能受損或破版：

| 頁面端點 | 專案名稱與正式定位 | HTTP 狀態碼 | 結論 |
|---|---|:---:|:---:|
| `http://localhost:8080/index.html` | FLTL 官方首頁（含最新 Contact Works V3 無限循環輪播） | **200 OK** | **PASS** |
| `http://localhost:8080/portfolio-nfc.html` | 01. FLTL NFC（旗艦智慧卡系統） | **200 OK** | **PASS** |
| `http://localhost:8080/brand/island-index/` | 02. 島序 ISLAND INDEX（當代台灣茶風土索引） | **200 OK** | **PASS** |
| `http://localhost:8080/brand/forno-27/` | 03. FORNO 27（義式柴燒窯烤披薩與烘焙品牌） | **200 OK** | **PASS** |
| `http://localhost:8080/brand/split-09/` | 04. SPLIT/09（城市夜間路跑整合廣告企劃） | **200 OK** | **PASS** |
| `http://localhost:8080/brand/atlas-ops/` | 05. ATLAS OPS（戶外機能裝備品牌概念設計） | **200 OK** | **PASS** |
| `http://localhost:8080/portfolio-northline-trade.html` | 06. NORTHLINE TRADE（獨立跳轉入口） | **200 OK** | **PASS** |
| `http://localhost:8080/brand/northline-trade/` | 06. NORTHLINE TRADE（案例主頁面） | **200 OK** | **PASS** |

*(註：前次報告筆誤提及之 SPLIT/09 與 ATLAS OPS 標籤，已於本報告確認並正名為「城市夜間路跑整合廣告企劃」與「戶外機能裝備品牌概念設計」，未更動正式線上作品。)*

---

### 八、Phase A.4 實測佐證截圖檔案清單

全部 24 份驗收截圖已完整輸出並雙向留存於：
- [brand/northline-trade/presentation/evidence/](file:///Users/howard/Desktop/Portfolio/brand/northline-trade/presentation/evidence/)
- `/Users/howard/Desktop/_patch_review/NORTHLINE_TRADE_PHASE_A4_FINAL_PATCH_20261021/02_PREVIEW/evidence/`

1. **4 張新版卡片情境截圖**：
   - `a4_desktop_1440_hero_shot01.png`（新版 SHOT 01 深色工業場景首屏，498 KB）
   - `a4_desktop_1440_shot06_catalog.png`（新版 SHOT 06 三款軸承型錄，331 KB）
   - `a4_desktop_1440_shot07_detail.png`（新版 SHOT 07 2RS 橡膠密封詳情，403 KB）
   - `a4_desktop_1440_shot16_finale.png`（新版 SHOT 16 採購系統整合收尾，238 KB）
2. **4 張新版 Lightbox 2560×1440 Master RAW 實測截圖**：
   - `a4_lightbox_shot01.png`（394 KB）
   - `a4_lightbox_shot06.png`（274 KB）
   - `a4_lightbox_shot07.png`（291 KB）
   - `a4_lightbox_shot16.png`（217 KB）
3. **B2B 原型操作截圖**：
   - `a4_interaction_search_6205.png`（搜尋 6205 成功展示 2RS 密封軸承，391 KB）
   - `a4_interaction_search_error.png`（未知料號 XYZ-999 錯誤防呆，160 KB）
   - `a4_interaction_catalog_bearings.png`（型錄篩選 3/6 軸承，145 KB）
   - `a4_interaction_spec_comparator.png`（6205/6206/6207 三向規格表對比，149 KB）
   - `a4_interaction_moq_25_error.png`（輸入 25 件觸發防呆警告，124 KB）
   - `a4_interaction_moq_40_legal.png`（輸入 40 件成功計算 NT$4,800，119 KB）
   - `a4_interaction_rfq_pending.png`（經辦送審轉為待簽核，145 KB）
   - `a4_interaction_rfq_returned.png`（主管退回附換季日程意見，155 KB）
   - `a4_interaction_rfq_approved.png`（主管核准產生審批序號，156 KB）
4. **手機 390×844 響應式截圖**：
   - `a4_mobile_390_hero.png`、`a4_mobile_390_shot06.png`、`a4_mobile_390_shot07.png`、`a4_mobile_390_shot16.png`
   - `a4_mobile_390_calc.png`（手機計算機）、`a4_mobile_390_rfq.png`（手機詢價單）
5. **雙語檢驗截圖**：
   - `a4_bilingual_english.png`（全站英文切換展示，456 KB）

---

### 九、總結與就緒提報

本輪 PHASE A.4 視覺素材替換與本機全功能驗收已**全面通過 (PASS)**。所有 8 個新檔案的 SHA-256 與 2560×1440 尺寸核對無誤，B2B 業務邏輯與產品圖像完全一致，前五件作品及首頁 V3 循環輪播運作正常。

正式依工單回報宣告：

```text
NORTHLINE TRADE — PHASE A.4 VISUAL PATCH VERIFIED / READY FOR PHASE B REVIEW
```
