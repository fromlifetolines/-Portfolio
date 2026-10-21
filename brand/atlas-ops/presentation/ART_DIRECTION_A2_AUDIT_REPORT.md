# FLTL × HOWARD｜PORTFOLIO 05 — ATLAS OPS
## Phase A.2｜一次性視覺、文字與互動精修驗收報告

**文件版號**：v1.2.0-Phase-A2-Final  
**驗收日期**：2026-10-21  
**執行模式**：`LOCAL PATCH ONLY / ZERO PUSH / ZERO MERGE / ZERO DEPLOY / ZERO CODE AND IMAGE MUTATIONS TO OTHER WORKS`  
**工作儲存庫**：`/Users/howard/Desktop/Portfolio`  
**工作分支**：`feature/atlas-ops-outdoor-portfolio-v1`  
**主線基準**：`origin/main` @ `fc673a29f20cd8c5b556a5ac89e48de5abc64fb5`  
**審查包目錄**：`/Users/howard/Desktop/_patch_review/ATLAS_OPS_PHASE_A2_REVIEW_SLIM_20261021/`  
**交付壓縮檔**：`/Users/howard/Desktop/ATLAS_OPS_PHASE_A2_REVIEW_SLIM_20261021.zip`  
**本輪審核結論**：**`HOLD`**（本機前端代碼、UI/UX 與圖說已達簽核水準；因 SHOT 13 與 SHOT 14 原始圖片文字缺陷尚未取得藝術指導正式修正圖，依工單維持 HOLD，嚴禁合併至 main）。

---

## 01｜工作環境、版本與零污染安全核對

### 1.1 Git 狀態與主線基準核對

```bash
$ git branch --show-current
feature/atlas-ops-outdoor-portfolio-v1

$ git rev-parse HEAD
fc673a29f20cd8c5b556a5ac89e48de5abc64fb5

$ git rev-parse origin/main
fc673a29f20cd8c5b556a5ac89e48de5abc64fb5

$ git diff --name-status origin/main
(輸出為空，代表相對於 origin/main 零已追蹤檔案修改)

$ git status --short
?? brand/atlas-ops/
?? portfolio-atlas-ops.html
```

### 1.2 零污染防護查驗（Zero Pollution Verification）

- **主網站首頁** (`index.html`)：零修改。未新增第五件作品首頁卡片。
- **全站多國語系核心** (`js/prototype-i18n.js`)：零修改。
- **全站專案清單** (`js/prototype-projects.js`)：零修改。
- **前四件已上線作品**：
  - `brand/fltl-nfc/`：零修改。
  - `brand/island-index/`：零修改。
  - `brand/forno-27/`：零修改。
  - `brand/split-09/`：零修改。
- **發布安全承諾**：
  - `ZERO COMMIT`：PASS
  - `ZERO PUSH`：PASS
  - `ZERO MERGE`：PASS
  - `ZERO DEPLOY`：PASS
  - `ZERO FAKE CSS OVERLAY`：PASS（絕不用 CSS 貼字遮蓋原圖瑕疵）

---

## 02｜本輪四大核心問題修正與工程驗收

### 2.1 P1 — 首屏視覺順序與主標重複優化（Hero Section Refinement）

- **修正前問題**：
  桌機 1440px 渲染中，頂部出現高達 96px 的巨大 HTML `ATLAS OPS` 與兩行副標題，緊接著 SHOT 01 圖片頂部又內建一組巨大 `ATLAS OPS` 字標。兩組巨大 Logo 上下疊加，導致首屏照片比重嚴重下降，山岳岩壁主視覺落到畫面下半部；手機版前 400px 也充斥重複字標與前導文字。
- **修正後設計**：
  1. 將 HTML 頂部改為緊湊俐落的建築式案例識別列（Architectonic Case Header Lockup）。
  2. 保留正確 SEO 與無障礙語意 `<h1>`，整合為 `PORTFOLIO 05 / FLTL × HOWARD — ATLAS OPS`，並搭配精簡副標 `"FIELD GEAR FOR REAL CONDITIONS"`。
  3. 頁首垂直佔比大幅縮減約 70%（高度由 260px 壓縮至 80px），使 SHOT 01 阿爾卑斯山岳攝影在桌機（1440px）與手機（390px）均能第一時間完整出現在首屏視野中，第一眼即建立震撼的山岳品牌意象。
  4. 保持黑灰橘核心色調與版面比例，未縮小整張主圖或重繪圖片。
- **驗收證據檔**：
  - `01_HERO_OPTIMIZATION/desktop_1440_hero_before_zh.jpg` vs `desktop_1440_hero_after_zh.jpg`
  - `01_HERO_OPTIMIZATION/mobile_390_hero_before_zh.jpg` vs `mobile_390_hero_after_zh.jpg`
  - `01_HERO_OPTIMIZATION/desktop_1440_hero_after_en.jpg` & `mobile_390_hero_after_en.jpg`

---

### 2.2 P1 — SHOT 08 商品容量與互動規格一致性，及手機版頁籤截斷修復

- **修正前問題**：
  1. 圖片內手機畫面明確標註為 `FIELD PACK 32L`，容量選單為 `28L / 32L / 40L`。Phase A.1 報告錯記為 S/M/L/XL。
  2. 網站前端示範器原先標註 `48L EXPEDITION PACK`、`1,120 GRAMS`、`-35°C TO +45°C`，與畫面中的 32L 背包不同，且包含虛構之實測性能數值。
  3. 手機版（390px、375px）第三個 Tab `CHASSIS BUILD` 被右側螢幕邊緣截斷，僅露 `CHA...`，嚴重影響可用性。
- **修正後設計**：
  1. **規格與容量完全統一**：以 `FIELD PACK 32L` 為主要示範型號，容量選項統一為 `28L / 32L / 40L STUDY`，與靜態 Mockup 完全對齊。
  2. **移除未驗證性能宣稱**：全面移除 1,120g 重量、-35°C 耐溫、420D cordura 等虛構規格。改為 `ALPINE TECHNICAL DAYPACK`、`HIGH-DENSITY RIPSTOP CONCEPT`、`DUAL-DENSITY CONTOUR FOAM` 等工業設計探索欄位。
  3. **模擬資料顯著標示**：圖說與警語明確標註圖內 `$249.00` 售價與 `★ 5.0 (124)` 評論為虛構示意假資料（Mockup Dummy Data），非真實銷售或消費者評價。
  4. **手機版 Tab 截斷徹底修復**：
     - 將 Tab 標籤精簡為等寬三欄：`32L SPECS`、`MATERIALS`、`ERGONOMICS`。
     - 手機版使用 CSS Grid `repeat(3, 1fr)` 均分版寬。
     - 實測數據：
       - **390px 視窗**：每 Tab 寬 102px，右邊界至 348px（< 390px），全寬無截斷。
       - **375px 視窗**：每 Tab 寬 97px，右邊界至 333px（< 375px），全寬無截斷。
  5. **無障礙 W3C WAI-ARIA 鍵盤導覽**：
     - 支援左右方向鍵（`ArrowLeft` / `ArrowRight`）、`Home`、`End` 鍵即時切換 Tab 與面板。
     - 具備完整 `role="tablist"`、`role="tab"`、`role="tabpanel"`、`aria-selected`、`aria-controls` 與焦點輪廓（Visible Focus Outline）。
  6. **純本機狀態**：無金流交易、無任何購物車 API 或後端資料庫請求。
- **驗收證據檔**：
  - `02_SHOT08_FIXES/mobile_390_shot08_before.jpg`（顯示截斷問題）
  - `02_SHOT08_FIXES/mobile_390_shot08_after_tab1.jpg`（32L SPECS 完整展示）
  - `02_SHOT08_FIXES/mobile_390_shot08_after_tab2.jpg`（MATERIALS 完整展示）
  - `02_SHOT08_FIXES/mobile_390_shot08_after_tab3.jpg`（ERGONOMICS 完整展示）
  - `02_SHOT08_FIXES/mobile_375_shot08_tab1.jpg`（375px 最小手機寬度驗證）
  - `02_SHOT08_FIXES/desktop_1440_shot08_tabs.jpg`（桌機寬度驗證）

---

### 2.3 P1 — 圖片放大提示遮擋作品修復（Non-Obscuring Zoom Badge & Trigger）

- **修正前問題**：
  手機版 390px 截圖中，`點擊／輕觸放大檢視 1672 × 941` 黑色粗長橫條常駐壓在圖片右下角，大面積遮擋原稿邊緣文字、扣具與比例細節。
- **修正後設計**：
  1. 徹底移除壓在圖片底部的粗長黑色橫條。
  2. 圖片右上角改為極致微型的非遮擋式標籤 `.plate-zoom-badge`（桌機平常透明度 0，懸停時微亮；手機版為 9px 緊湊半透明小標籤，置於右上角落，絕不壓住作品下方細節）。
  3. 在圖片正下方的圖說資訊列中，新增獨立、觸控友善的放大按鈕 `.plate-zoom-btn`（`[🔍 檢視 1672 × 941 原圖]`）。使用者既可點擊圖片本體，亦可點擊該按鈕開啟高品質燈箱。
  4. 燈箱功能經實測完整支援 `Escape` 鍵退出、左右方向鍵切換、點擊背景遮罩關閉。
- **驗收證據檔**：
  - `03_ZOOM_HINT_FIXES/mobile_390_zoom_hint_before.jpg` vs `mobile_390_zoom_hint_after.jpg`
  - `03_ZOOM_HINT_FIXES/desktop_1440_zoom_badge.jpg`
  - `03_ZOOM_HINT_FIXES/desktop_1440_lightbox_active.jpg`

---

### 2.4 P1/P2 — 全站文字精修：移除未驗證產品性能、材質與實測宣稱

對全站 16 個 SHOT 的中英雙語圖說進行全面體檢，排除過度擬真保證之語氣：

1. **SHOT 03（字體系統）**：明確標明字母表為品牌排版探索研究，基於 Space Grotesk / Space Mono 結構，非對外發行之實體字型檔。
2. **SHOT 05（產品概念）**：圖內 `ALL-WEATHER / FIELD READY` 明確歸類為工業設計造型語彙，非實體量產商品或實測防護保證。
3. **SHOT 09（品牌環境）**：明確標註路標距離（`BASECAMP 2.4 KM` 等）與地理座標（`24.0119° N / 121.5487° E`）為藝術指導虛擬設定，非實際阿爾卑斯登山步道或實測 GPS 座標。
4. **SHOT 11（服飾系統）**：圖面字句 `WEATHERPROOF HARDWARE` 與 `ALL-WEATHER PERFORMANCE` 定位為造型提案，非經第三方檢測之物理防水透濕膜或防護認證。
5. **SHOT 12（品牌手冊）**：保留風格化標語 `REALER`，說明全刊物為概念編輯出版研究。
6. **SHOT 13（展示空間）**：加註 `[WAITING FOR ASSET: SHOT 13 牆面展示板原圖拼字待正式修正版替換]`。
7. **SHOT 14（裝備細節）**：加註 `[WAITING FOR ASSET: SHOT 14 原圖性能宣稱文字待正式修正版替換]`，圖說中明確將 420D、7075-T6 等定義為工業設計提案參數，無實驗室實體拉力證明。
8. **SHOT 16（品牌整合）**：明確說明簡化之 `ATLAS` 三角標誌為概念次級輔助識別。
9. **頁尾 CTA**：改為謙遜真誠之專業合作邀請，移除任何已營運或量產之口吻。

---

## 03｜16 個 SHOT 逐張驗收結果總表（Master Verification Matrix）

| 圖號 | 作品標題 | 視覺類別 | 判定 | 具體畫面區域 | 圖內文字狀態與處置 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | PROJECT OVERVIEW | 總覽概念 | **PASS** | 首屏主圖中央 | 首屏 HTML 前導高度已縮減 70%，山岳主視覺首屏比重大幅提升，圖文層次分明。 |
| **02** | LOGO IDENTITY SYSTEM | 標誌識別 | **PASS (基準)** | 畫面中央幾何三角 A | 正 60° 幾何三角造型、內折切口結構清晰，作為全品牌唯一比較基準。 |
| **03** | TYPE SYSTEM | 字體系統 | **PASS** | 畫面中央 A–Z 字母表 | 大寫 A–Z 與 0–9 完整呈現無亂碼；圖說註記為排版概念研究。 |
| **04** | COLOR & GRAPHIC | 色彩語言 | **PASS** | 左下色票；背景等高線 | 五色色票（炭黑、岩板灰、礫石灰、雪地白、警戒橘）精準無偏色，向量等高線層次分明。 |
| **05** | PRODUCT CONCEPT | 產品概念 | **PASS** | 中央 40L 登山包及配件 | 背包配件比例協調；`ALL-WEATHER` 已由圖說界定為設計外觀提案。 |
| **06** | KEY VISUAL | 品牌主視覺 | **PASS** | 畫面中央單人攀登者 | 攀登者解剖比例自然，衝鋒衣防風褶皺與地質岩面透視逼真，情感張力強烈。 |
| **07** | PACKAGING | 包裝應用 | **PASS** | 中央牛皮紙箱與吊牌 | 未漂白厚卡紙盒、封箱膠帶與編織布章質感真實，燙黑油墨反光自然。 |
| **08** | DIGITAL EXPERIENCE | 數位體驗 | **PASS** | 手機 UI 與切換面板 | **已修復**：統一為 FIELD PACK 32L（28L/32L/40L），移除虛構數值；手機 Tab 截斷修復完成，鍵盤導覽完整。 |
| **09** | BRAND ENVIRONMENT | 品牌環境 | **PASS** | 右側木質路標；避難哨 | 高山避難哨氛圍到位；已明確標記路標距離與經緯度座標為概念設定。 |
| **10** | CAMPAIGN LIFESTYLE | 形象廣告 | **PASS** | 水泥牆面三聯海報 | 街頭清水模水泥牆海報貼付逼真，排版柵格連貫。 |
| **11** | APPAREL SYSTEM | 服飾系統 | **PASS** | 三層穿搭；胸前口袋 | 機能結構外觀細緻；圖說已界定機能字句為概念造型，非實體防護認證。 |
| **12** | FIELD GUIDE EDITORIAL | 刊物編輯 | **PASS** | 跨頁展冊；左頁標題 | 跨頁排版俐落；保留口語詞 `REALER` 並界定為風格化概念刊物。 |
| **13** | RETAIL ENVIRONMENT | 實體空間 | **WAITING FOR ASSET / HOLD** | 右後方裝備展示板看板 | **原圖拼字問題**：看板出現 `PIELD GEAR`（應為 `FIELD GEAR`）。已列入等待正式替換圖，網頁端已加註 WAITING 標籤。 |
| **14** | GEAR DETAILS | 裝備細節 | **WAITING FOR ASSET / HOLD** | 左側插扣；右側面料標籤 | **原圖宣稱問題**：圖內有 `FIELD TESTED PERFORMANCE` 等強保證字句。已列入等待正式替換圖，網頁端已加註 WAITING 標籤並修正圖說。 |
| **15** | SOCIAL EDITORIAL | 社群編輯 | **PASS** | 9:16 三聯直式貼文 | 動態排版節奏明確，適應行動數位社群版型。 |
| **16** | BRAND SYSTEM FINALE | 品牌終章 | **PASS** | 左側掛旗；右側吊牌 | 全要素總結收尾；簡化 `ATLAS` 標誌已註記為概念次級輔助識別。 |

---

## 04｜跨視窗響應（RWD）實測數據

使用 Chrome 155 於本機 Chromium 進行 6 種標準裝置寬度實測（包含中英文版本切換）：

| 測試視窗寬度 | 典型對應裝置 | `scrollWidth` | `clientWidth` | 水平溢出（Overflow） | 控制項與排版狀態 |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **375 px** | iPhone SE / 小螢幕手機 | 375 px | 375 px | **false (零溢出)** | Tab 寬 97px，右界 333px，三頁籤 100% 完整露出 |
| **390 px** | iPhone 14 Pro / 標準手機 | 390 px | 390 px | **false (零溢出)** | Tab 寬 102px，右界 348px，三頁籤 100% 完整露出 |
| **768 px** | iPad / 直向平板 | 753 px | 753 px | **false (零溢出)** | 雙欄圖文自適應，側邊留白平衡 |
| **1024 px** | iPad Pro / 橫向平板 | 1009 px | 1009 px | **false (零溢出)** | 資訊網格自動重排為 2 欄，排版無擠壓 |
| **1440 px** | Desktop / 典型筆電與桌機 | 1425 px | 1425 px | **false (零溢出)** | 首屏山岳主圖完全浮現，四欄資訊列對齊 |
| **1920 px** | Large Desktop / 大尺寸螢幕 | 1905 px | 1905 px | **false (零溢出)** | 最大版寬 1360px 居中限制，兩側留白自然 |

---

## 05｜待正式資產替換清單（Waiting for Asset Inventory）

以下 2 項為**原始圖片檔案本身的瑕疵**，依工單指示嚴禁以 CSS 覆蓋方式假修復，必須等待主理人或 ChatGPT 交付正式高解析 PNG 修正版：

| 項目 | 涉及檔案 | 原圖當前問題 | 正式資產預期修正方向 | 目前狀態 |
| :---: | :--- | :--- | :--- | :---: |
| **ASSET-01** | `SHOT_13_RETAIL_ENVIRONMENT.png` & `shot-13.jpg` | 展示店右後方展示板出現拼寫微瑕 `PIELD GEAR` | 於原稿圖內將 `PIELD GEAR` 正確修復為 `FIELD GEAR`，保持周邊鋼木透視與燈光不變。 | **WAITING FOR ASSET** |
| **ASSET-02** | `SHOT_14_GEAR_DETAILS.png` & `shot-14.jpg` | 圖內直接壓印 `FIELD TESTED PERFORMANCE`、`WEATHERPROOF CONSTRUCTION`、`HIGH-STRENGTH BUCKLES` 等無憑證之實測宣稱 | 保留扣具微距與攝影構圖，將字句修改為概念設計語彙（例如 `MATERIAL & HARDWARE STUDY`、`CONSTRUCTION CONCEPT`、`BUCKLE DESIGN STUDY`）。 | **WAITING FOR ASSET** |

*附註：SHOT 05、SHOT 11、SHOT 15 中之 `ALL-WEATHER`、`WEATHERPROOF` 等字句，網頁端圖說已完成降級與概念標註；若日後重製該批圖片，建議同步納入圖面文字修正清單。*

---

## 06｜審查包內容與交付 Manifest

**交付路徑**：`/Users/howard/Desktop/ATLAS_OPS_PHASE_A2_REVIEW_SLIM_20261021.zip`  
**檔案總數**：28 個核心證據檔案（包含 16 張全貌驗收聯絡單 `16_SHOT_OVERVIEW_CONTACT_SHEET.jpg`）

```
ATLAS_OPS_PHASE_A2_REVIEW_SLIM_20261021/
├── 01_HERO_OPTIMIZATION/ (6 files)
│   ├── desktop_1440_hero_before_zh.jpg    - 桌機首屏修正前（巨大字標疊加）
│   ├── desktop_1440_hero_after_zh.jpg     - 桌機首屏修正後（山岳主視覺首屏完整呈現）
│   ├── desktop_1440_hero_after_en.jpg     - 桌機首屏英文版
│   ├── mobile_390_hero_before_zh.jpg      - 手機首屏修正前
│   ├── mobile_390_hero_after_zh.jpg       - 手機首屏修正後
│   └── mobile_390_hero_after_en.jpg       - 手機首屏英文版
├── 02_SHOT08_FIXES/ (6 files)
│   ├── mobile_390_shot08_before.jpg       - 手機版修正前（CHA... 截斷問題）
│   ├── mobile_390_shot08_after_tab1.jpg   - 手機版修正後（32L SPECS 完整展示）
│   ├── mobile_390_shot08_after_tab2.jpg   - 手機版修正後（MATERIALS 完整展示）
│   ├── mobile_390_shot08_after_tab3.jpg   - 手機版修正後（ERGONOMICS 完整展示）
│   ├── mobile_375_shot08_tab1.jpg         - 375px 極限窄螢幕驗證截圖
│   └── desktop_1440_shot08_tabs.jpg       - 桌機版 SHOT 08 完整卡片截圖
├── 03_ZOOM_HINT_FIXES/ (4 files)
│   ├── mobile_390_zoom_hint_before.jpg    - 修正前黑色粗橫條遮擋作品截圖
│   ├── mobile_390_zoom_hint_after.jpg     - 修正後微型右上角標籤與下方獨立按鈕
│   ├── desktop_1440_zoom_badge.jpg        - 桌機懸停精緻標籤
│   └── desktop_1440_lightbox_active.jpg   - 燈箱啟動與高解析檢視截圖
├── 04_VIEWPORT_RESPONSIVENESS/ (8 files)
│   ├── viewport_375_zh.jpg / viewport_390_zh.jpg / viewport_768_zh.jpg
│   ├── viewport_1024_zh.jpg / viewport_1440_zh.jpg / viewport_1920_zh.jpg
│   └── viewport_390_en.jpg / viewport_1440_en.jpg
├── 05_SHOT_REVIEW_16/ (17 files)
│   ├── shot_01.jpg ... shot_16.jpg        - 16 張作品卡片於 1440px 之獨立真實截圖
│   └── 16_SHOT_OVERVIEW_CONTACT_SHEET.jpg - 16 張全覽 Master Contact Sheet（視覺簽核總覽）
└── 06_REPORT/ (2 files)
    ├── test_metrics.json                  - 實測數值、Tab 尺寸與無障礙測試數據
    └── ART_DIRECTION_A2_AUDIT_REPORT.md   - 本驗收報告
```

---

## 07｜最終審核結論與發布判定

- **審核結論**：**`HOLD`**
- **阻斷理由（Blocking Reasons）**：
  1. `SHOT 13` 原始 PNG 圖內仍存在 `PIELD GEAR` 拼字微瑕，等待藝術指導提供正式修正版。
  2. `SHOT 14` 原始 PNG 圖內仍存在 `FIELD TESTED PERFORMANCE` 等過度確定之實測宣稱，等待藝術指導提供正式修正版。
- **本機已完成項目**：
  - 首屏標題重複與山岳主視覺首屏比重已完美優化。
  - SHOT 08 商品名稱、容量選單、模擬資料警語已完全統一；手機版 Tab 截斷已徹底修復，支援 W3C WAI-ARIA 鍵盤導覽。
  - 手機版放大提示遮擋作品已徹底修復為微型標籤與下方獨立操作鈕。
  - 全站 16 個 SHOT 中英雙語圖說均已修正為誠實之概念設計語彙。
  - 375px 至 1920px 跨視窗響應零水平溢出、零 Console 錯誤。
  - 16 張全覽聯絡單 `16_SHOT_OVERVIEW_CONTACT_SHEET.jpg` 已產出。
- **後續步驟**：
  本機維持 `feature/atlas-ops-outdoor-portfolio-v1` 隔離分支，嚴格維持 **ZERO PUSH / ZERO MERGE / ZERO DEPLOY**。待主理人與 ChatGPT 提供正式替換圖並完成視覺比對簽核後，方可進入正式發布階段。
