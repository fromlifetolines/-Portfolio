# FLTL × HOWARD｜CASE 13 PLAYFORM
## 本機創意規格接收與互動原型整合驗收報告

- **日期**：2026-11-03
- **分支**：`feature/playform-case13-local-v1`
- **基底 Commit**：`ab0b1c7` (latest `main`)
- **執行模式**：`LOCAL STAGING ONLY / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY`
- **最終狀態判定**：`CASE13 / CREATIVE MASTER DELIVERED / LOCAL PROTOTYPE READY / FINAL ARTWORK HOLD`

---

### 1. 執行目標與事實邊界確認

本輪任務為接收 `/Users/howard/Desktop/_patch_review/FLTL_PLAYFORM_13_CREATIVE_MASTER_V1/` 交付素材包，於本地端建立 CASE 13 PLAYFORM 網站核心骨架，並完成可操作的兒童閱讀、3D 結構建造、幼兒認知任務、家長端與教師端展示介面。

**嚴格遵循的事實與安全邊界**：
1. **未發布保護**：嚴格保護已正式上架之 CASE 01–12 與尚未公布之 CASE 14–15。
2. **白名單隔離**：所有程式與素材僅新增於 `brand/playform/` 與本地測試腳本 `scratch/`。未修改首頁註冊（`js/prototype-projects.js`）、全站共用 CSS/JS 與共用資料字典。
3. **誠實視覺邊界**：本交付包包含完整藝術指導規格、32 頁雙語繪本腳本、4 個 GLB 3D 模型、向量識別母稿與 HTML 原型，**尚未交付 16 張正式 2560×1440 商業設計完稿／精修插畫／商業攝影**。本機不拿暫存預覽冒充完稿。
4. **零推送承諾**：無任何 `git push`、`gh pr create`、`git merge` 或部署行為。

---

### 2. 交付素材與檔案結構

本次於 `brand/playform/` 建立之完整目錄架構如下：

```
brand/playform/
├── assets/
│   ├── 3d/
│   │   ├── PLAYFORM_BRIDGE_ASSEMBLED.glb (29 KB, SHA: 4e4b8785...)
│   │   ├── PLAYFORM_BRIDGE_EXPLODED.glb (29 KB, SHA: 0c01fc57...)
│   │   ├── PLAYFORM_CHARACTER_TRIO.glb (34 KB, SHA: cad16f30...)
│   │   └── PLAYFORM_KIT_PACKAGING_CONCEPT.glb (3.4 KB, SHA: 09d2b50a...)
│   ├── identity/
│   │   ├── BRIDGE_LAB_PACKAGING_LABEL.svg
│   │   ├── PLAYFORM_CHARACTER_SHEET.svg
│   │   └── PLAYFORM_WORDMARK.svg
│   ├── storybook/
│   │   ├── SPREAD_01_AFTER_THE_RAIN.svg
│   │   └── SPREAD_08_PLACE_THE_ARCH.svg
│   └── previews/
│       ├── 01_PLAYFORM_HERO_DESKTOP.png ~ 06_PLAYFORM_MOBILE_390.png
│       ├── PLAYFORM_3D_ORBIT_PREVIEW.gif
│       └── CONTACT_SHEET_9_CONCEPT_REFERENCES.jpg
├── css/
│   └── playform-case.css (純淨 RWD、瑞士網格排版、無障礙色彩對比、可見焦點)
├── js/
│   ├── vendor/
│   │   ├── three.min.js (Three.js r128 核心)
│   │   ├── GLTFLoader.js (GLTF/GLB 模型載入器)
│   │   └── OrbitControls.js (360° 空間軌道控制器)
│   └── playform-case.js (中英雙語切換、16 跨頁翻頁與情節互動、3D WebGL 檢視器、任務邏輯)
├── data/
│   └── PLAYFORM_DEMO.json (完整專案中英雙語資料、16 跨頁腳本、16 張分鏡規格、示範家長/教師數據)
├── index.html (語意化 HTML5 主入口)
├── case-study.html (對等鏡像頁面)
└── presentation/
    ├── PLAYFORM_13_LOCAL_STAGING_REPORT.md (本報告)
    └── evidence-local-v1/
        ├── 01_playform_desktop_hero_1440.png
        ├── 02_playform_storybook_reader.png
        ├── 03_playform_3d_webgl_viewer.png
        ├── 04_playform_child_challenge.png
        ├── 05_playform_parent_dashboard.png
        ├── 06_playform_teacher_dashboard.png
        ├── 07_playform_16_shot_specs.png
        ├── 08_playform_mobile_390.png
        ├── 09_playform_mobile_320.png
        ├── 10_playform_bilingual_english.png
        └── PLAYFORM_13_LOCAL_QA_RESULTS.json
```

---

### 3. 功能模組實作與驗收要點

#### 3.1 中英雙語系統 (Bilingual Architecture)
- 頂部導覽列提供單鍵即時切換 `[ EN / 中文 ]`。
- 專案標題、副標、設計範疇、挑戰與回應、繪本 16 跨頁正文、角色性格、任務指令、家長提問與教師課表均支援無延遲雙語切換。

#### 3.2 16 跨頁互動繪本閱讀器 (Storybook Reader)
- 完整納入《形狀城的第七座橋》16 個跨頁故事腳本（32 頁精裝書規格）。
- 具備上一頁、下一頁、跨頁下拉選單快速跳頁，並即時更新頁碼進度（如 `SPREAD 01 / 16 · PAGE 01-02`）。
- 關鍵互動跨頁包含情節決策按鈕：
  - **Spread 06**：選擇三角形積木，比對頂角互鎖特性。
  - **Spread 07**：對齊兩岸橋墩，準備放置橋拱。
  - **Spread 08**：放上黃色微笑橋拱。
  - **Spread 10**：橋面傾斜時引導「退後一步，調整支點」，實踐錯誤復原。
  - **Spread 12**：漸進放置第一塊、第二塊測試小積木，驗證結構平衡。
- 朗讀按鈕誠實標註「朗讀示範（錄製中）」，點擊提示音檔製作狀態，不冒充已錄製完成。

#### 3.3 3D WebGL Bridge Lab 實驗室 (Dual-Engine Architecture)
- **WebGL 模式**：採用 Three.js + GLTFLoader 載入實際匯出之 `.glb` 檔案。
  - 支援 360° 滑鼠拖曳、觸控旋轉、滾輪縮放。
  - 支援模型切換：組裝橋樑 (`PLAYFORM_BRIDGE_ASSEMBLED.glb`)、拆解橋樑 (`PLAYFORM_BRIDGE_EXPLODED.glb`)、角色三人組 (`PLAYFORM_CHARACTER_TRIO.glb`)、包裝概念盒 (`PLAYFORM_KIT_PACKAGING_CONCEPT.glb`)。
  - 支援無障礙純鍵盤方向鍵控制（視角上／下／左／右、放大／縮小、重設視角）。
  - 動態零件檢視欄（Part Inspector）依模型狀態解析橋拱、立柱、基座與橋面板塊。
- **Canvas 數學投影容錯模式**：在無硬體 WebGL 支援或無 GPU 環境下自動無縫降級，確保 100% 離線與環境相容性。

#### 3.4 幼兒認知任務 (Child Cognitive Learning Challenge)
- 3 段漸進探索任務（形狀支撐、橋墩對齊、承重測試）。
- 採用 120×120px 大觸控熱區，溫和具象說明，不設答錯扣分或 Game Over 挫敗畫面。
- 標明兒童隱私保護（無第三方追蹤、不收集真實學童個資）。

#### 3.5 家長端與教師端資訊架構嚴格隔離 (Segregated Adult Dashboards)
- **家長端**：成人雜誌式版面，呈現單次探索紀錄（形狀種類、修正次數、學習模式）、開放式親子引導提問（避免焦慮評分），以及延伸至客廳積木的實體搭建建議。附帶清除本次示範紀錄功能。
- **教師端**：B2B 課堂教學架構，提供 28 分鐘模組化課程課表（共讀 8m、建構與 3D 12m、測試反思 8m）與質性觀察評量規準（結構探索、原因說明、團隊合作）。嚴格標註單機示範，不串接校園資料庫。

#### 3.6 16 張分鏡規格畫廊 (Art Direction Blueprint Gallery)
- 完整列出 SHOT 01 至 SHOT 16 之藝術指導要求、商業設計證據目標、畫面構圖與驗收標準。
- 統一標註 `Art Direction Master Specified / Artwork Pending`，誠實展現待製作清單。

---

### 4. 跨裝置響應式 (RWD) 與無障礙 (A11y) 驗收數據

經由自動化 Chrome CDP 腳本 (`scratch/test_playform_case13_staging.mjs`) 實測結果：

| 視口寬度 | 設備模擬 | `scrollWidth` | `innerWidth` | 橫向溢出判定 | 驗收狀態 |
|---|---|---|---|---|---|
| **1920px** | Desktop Full | 1905px | 1920px | 無 (`hasOverflow: false`) | **PASS** |
| **1440px** | Desktop Standard | 1425px | 1440px | 無 (`hasOverflow: false`) | **PASS** |
| **768px** | Tablet Portrait | 753px | 768px | 無 (`hasOverflow: false`) | **PASS** |
| **390px** | Mobile Standard (iPhone) | 390px | 390px | 無 (`hasOverflow: false`) | **PASS** |
| **320px** | Mobile Small (SE) | 320px | 320px | 無 (`hasOverflow: false`) | **PASS** |

- **焦點管理**：全站具備 `:focus-visible` 高對比外框（3px solid `#E27C44`）。
- **色彩對比**：深藍 (`#1A3F81`) 於米色紙底 (`#FFF9ED`) 對比度達 9.8:1，文字墨黑 (`#1D2936`) 對比度達 12.5:1，符合高對比易讀標準。
- **動態偏好**：包含 `@media (prefers-reduced-motion: reduce)`，即時停用動態轉場。

---

### 5. 16 張正式作品圖版製作狀態清單

| SHOT | 主題 | 製作類型 | 交付包狀態 | 正式圖版驗收狀態 |
|---|---|---|---|---|
| 01 | 品牌整合 Hero | 3D 模型＋實景攝影合成 | 規格定案／HTML 原型展示 | **待繪製完稿 (Artwork Pending)** |
| 02 | 品牌識別系統 | Illustrator 級向量排版 | SVG 母稿交付／待 2560×1440 排版 | **待繪製完稿 (Artwork Pending)** |
| 03 | 角色 IP／表情動作 | 原創插畫＋3D turntable | 角色三維原型與 SVG 交付 | **待繪製完稿 (Artwork Pending)** |
| 04 | 繪本封面及精裝工藝 | 產品 3D／寫實材質攝影 | 尺寸規格定案 | **待繪製完稿 (Artwork Pending)** |
| 05 | 繪本情節一：河上的空白 | 紙雕／繪本插畫 | 故事腳本與 SVG 概念圖交付 | **待繪製完稿 (Artwork Pending)** |
| 06 | 繪本情節二：一起造橋 | 繪本插畫與開書 mockup | 故事腳本交付 | **待繪製完稿 (Artwork Pending)** |
| 07 | 互動繪本閱讀器 | DOM 介面＋情境攝影 | DOM 原型可實測操作 | **待情境攝影合成 (Artwork Pending)** |
| 08 | 實體學習盒拆封 | 產品 3D／攝影 | 標籤 SVG 與 3D 概念交付 | **待繪製完稿 (Artwork Pending)** |
| 09 | 3D 結構與拆解 | 3D GLB render | 組裝／拆解 2 份 GLB 模型交付 | **待高精度渲染 (Artwork Pending)** |
| 10 | 3D 即時建造器 | Three.js / WebGL | WebGL 原型已上線可旋轉操作 | **待情境攝影合成 (Artwork Pending)** |
| 11 | 兒童形狀任務 | 實作介面與互動狀態 | 3 段任務原型可實測操作 | **待情境攝影合成 (Artwork Pending)** |
| 12 | 建造測試與錯誤復原 | 3D＋互動操作畫面 | 互動圖解邏輯已就緒 | **待序列完稿 (Artwork Pending)** |
| 13 | 親子實體延伸活動 | 真人情境攝影／合成 | 拍攝規格已定案 | **待實景拍攝 (Artwork Pending)** |
| 14 | 家長端學習回饋 | 功能 UI／RWD | RWD 原型已上線可實測操作 | **待高解析出圖 (Artwork Pending)** |
| 15 | 教師端課程管理 | 教師平台 UI／流程 | 課堂模組原型已上線可操作 | **待高解析出圖 (Artwork Pending)** |
| 16 | 教室情境／品牌最終應用 | 教室品牌環境與攝影 | 空間規格已定案 | **待實景攝影 (Artwork Pending)** |

---

### 6. 截圖證據清單

所有截圖均儲存於 `brand/playform/presentation/evidence-local-v1/`：
1. `01_playform_desktop_hero_1440.png`：1440px 桌面版品牌 Hero 視圖與三位角色向量插畫。
2. `02_playform_storybook_reader.png`：互動繪本閱讀器（雙跨頁展開、情節互動與無障礙朗讀提示）。
3. `03_playform_3d_webgl_viewer.png`：3D WebGL 實驗室（模型切換、拆解狀態與零件檢視器）。
4. `04_playform_child_challenge.png`：幼兒認知任務（大熱區幾何按鈕與成長型文字反饋）。
5. `05_playform_parent_dashboard.png`：家長端觀察記錄、開放式對話提問與示範資料重設。
6. `06_playform_teacher_dashboard.png`：教師端 28 分鐘課程鷹架時程表與質性評量規準。
7. `07_playform_16_shot_specs.png`：16 張分鏡逐張藝術指導與商業證據規格卡。
8. `08_playform_mobile_390.png`：390px 手機版垂直排版與無橫向溢出驗證。
9. `09_playform_mobile_320.png`：320px 超窄手機版版面彈性驗證。
10. `10_playform_bilingual_english.png`：英文語系即時切換視圖。

---

### 7. 缺陷與後續待辦清單 (Defect & Backlog)

1. **商業級大圖尚未交付**：目前 16 張分鏡以設計規格卡與向量／3D 原型展示，需待藝術製作端交付 2560×1440 Master PNG 與 1920×1080 Web JPG 後進行圖版替換。
2. **精裝繪本完稿插畫待精修**：目前僅 SPREAD 01 與 SPREAD 08 有向量插畫交付，其餘 14 跨頁以動態向量場景呈現，正式精修繪本插畫待藝術總監交付。
3. **專業朗讀音檔待錄製**：目前朗讀按鈕已設置提示狀態，正式音檔錄製完成後可進一步實作 HTML5 Web Audio 播放器。
4. **全站導覽登錄鎖定**：首頁 `js/prototype-projects.js` 與共用導覽保持凍結，待 Howard 最終核准上架授權後方可加入。

---

### 8. Git 本地異動確認

- 分支：`feature/playform-case13-local-v1`
- 新增路徑：`brand/playform/`、`scratch/test_playform_case13_staging.mjs`
- 未觸碰檔案：`index.html`、`about.html`、`js/prototype-projects.js`、`brand/01~12`、`brand/14~15`。
- 本地狀態：**LOCAL PROTOTYPE READY / FINAL ARTWORK HOLD**。
