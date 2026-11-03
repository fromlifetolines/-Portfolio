# FLTL × HOWARD｜12 CIVIC ACCESS V2 本機整合與全量圖版品質審查報告

**審查日期：** 2026-11-03  
**執行模式：** LOCAL STAGING ONLY · STRICT ALLOWLIST · ZERO PUSH · ZERO DEPLOY · ARTWORK REVIEW GATE  
**工作分支：** `feature/civic-access-case12-v2-local`（基底為最新 `main` Commit `c87578c`）  
**專案路徑：** `/Users/howard/Desktop/Portfolio/brand/civic-access/`  
**當前狀態：** **本機整合完成 · 16 逐圖品質審查完成 · 互動功能 QA 全數通過 · 等待主理人視覺核准門檻（禁止上線）**

---

## 一、16 張視覺圖版逐張深度審查（含 AI 生成文字與標誌瑕疵盤點）

依工單要求，逐張放大檢視 16 張 2560×1440 PNG 原圖與 1920×1080 JPG 網站預覽，絕非僅憑 SHA-256 判定：

| SHOT | 標題 (ZH / EN) | 製作來源 | 視覺內容核對與品質判定 | 待主理人核准之瑕疵／風險項目 (Gatekeepers) |
|---|---|---|---|---|
| **01** | 公共服務整合體驗<br>Integrated Civic Experience | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現 CIVIC ACCESS 品牌整合大版，包含主視覺、宣傳折頁、卡片與數位介面綜合陳列。整體色彩與排版大器。 | ⚠️ **生成中文字瑕疵**：大字副文出現錯字與幻覺字，「快速**童找**、準備、申請與**追發**進度」（應為尋找／追蹤）、「大**幡**降低」（應為大幅）。正式發布前必須以向量排版重新替換此段說明文字。 |
| **02** | 品牌識別規範<br>Brand Identity System | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現藍色幾何圖形 Logo 規範、色彩色票（Civic Blue、Deep Ink）與圖標網格。 | ⚠️ **標誌母稿差異**：圖版中生成的 CIVIC ACCESS 四塊幾何色塊弧度與角度，與可編輯向量檔 `civic_mark.svg` 存在細部曲率差異；副文標註小字有模糊拉伸痕跡，需以正式 Illustrator 向量圖層重繪為正式 VI 規範。 |
| **03** | 公共空間與導視<br>Service Center & Wayfinding | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現公共服務中心櫃檯、指標導視懸掛牌與開闊服務大廳。透視與光影合理。 | ⚠️ **生成中文字嚴重錯字**：掛牌與牆面文字出現明顯 AI 生成錯字，「市民**服粥**據點」（應為服務）、「**無陳礙**設施」（應為無障礙）、「環境設計範**聰**」（應為範疇）、「服務櫃**樓**」（應為櫃檯）、「無**雞薇股施**」（嚴重錯字）。**絕對禁止直接推上正式線**，須重修空間標籤字樣。 |
| **04** | 紙本申辦指南<br>Printed Service Guidance | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現印刷申辦手冊封面、內頁檢核表與單張折頁的實體紙本情境。紙張質感與排版優良。 | ⚠️ **中文字缺漏與小字糊化**：內頁文案「涵申辦手冊」（缺「蓋」字，應為涵蓋），內頁表格細線小字為生成偽字（Lorem 痕跡），屬示意原型印刷物，不可宣稱已量產印製。 |
| **05** | 自助申辦機台<br>Self-Service Kiosk | 獨立公共服務照片裁切<br>＋ Chromium 原生 HTML 排版 | 左側為現場服務機台照片裁片，右側為原生 HTML/CSS 渲染之 3 項機台任務導覽（服務選擇、文件準備、進度查詢）。 | ⚠️ **機台標誌細節**：左側實體機台上方螢幕顯示文字為「VIC CCESS」（AI 截切掉首尾字元），而非完整「CIVIC ACCESS」。右側文字排版銳利完整無瑕疵。 |
| **06** | 使用者情境分析<br>Citizen Scenarios | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 三欄瑞士網格分析長者使用者、家庭照顧者與輔助科技使用者的痛點與設計需求。文字 100% 向量銳利，層級清晰。 | ✅ **無瑕疵**。已在 V2 修正遮蔽問題；文案已符合非真實訪談之情境假設規範。 |
| **07** | 桌機服務入口<br>Desktop Service Directory | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現完整桌機端搜尋列、5 大服務分類卡片、申辦指南與常見問題。排版整齊，符合 Swiss Grid。 | ✅ **無瑕疵**。文字層級分明，對比符合 WCAG 2.2 AA。 |
| **08** | 行動端服務旅程<br>Mobile-First Journey | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 三部手機並排呈現「01 服務搜尋」、「02 身分選擇」、「03 文件指引」的三步驟行動端介面。 | ✅ **無瑕疵**。V2 已修正小字對比問題；介面比例符合現代 iPhone 16/15 螢幕比例。 |
| **09** | 服務藍圖<br>Service Blueprint | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 五階段對照矩陣：民眾（前台）、數位平台（系統）、服務人員（支援）之接觸點藍圖。 | ✅ **無瑕疵**。資訊架構清晰完整，邏輯嚴謹。 |
| **10** | 申請身分分流<br>Applicant & Representative | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現本人辦理（2 項文件）與協助他人代辦（3 項文件）的動態分流介面。 | ✅ **無瑕疵**。HTML 排版文案精準，勾選與未勾選狀態明確。 |
| **11** | 動態文件清單<br>Dynamic Document Checklist | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 清楚展示「已準備」、「待準備」與「缺件」的三種狀態標籤與文件卡片。 | ✅ **無瑕疵**。色票使用綠色 (`#157D53`) 與警告色，對比強烈。 |
| **12** | 分步表單<br>Progressive Form | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現三步驟表單、必填星號標示、欄位提示與操作按鈕。 | ✅ **無瑕疵**。UI 規範標準，按鈕觸控區域達標。 |
| **13** | 錯誤提示與修復<br>Error & Recovery States | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 左右對照「01 需要修改（紅色高亮＋明確錯誤文字）」與「02 修正完成（綠色勾選）」兩種介面狀態。 | ✅ **無瑕疵**。符合 WCAG 2.2 SC 3.3.1 / 3.3.3 錯誤提示規範。 |
| **14** | 附件上傳與核對<br>Upload & Pre-Submission | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現「選取附件（拖曳區）」與「驗證與核對（大小/格式檢核）」兩種狀態。 | ✅ **無瑕疵**。單檔 10MB 上限與 PDF/JPG/PNG 格式提示明確。 |
| **15** | 示範案件進度<br>Case Tracking | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現送出後之示範編號 `DEMO-CA-2026-001` 與三節點進度時間軸。 | ✅ **無瑕疵**。清楚標示「僅用於作品集流程示範，未送至任何政府系統」。 |
| **16** | 無障礙驗收規範<br>Accessibility Plan | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 系統化列出文字對比（≥4.5:1 / ≥3:1）、鍵盤可視焦點（#FFAE3D）、觸控標的（≥44px）與 ARIA 狀態實測指標。 | ✅ **無瑕疵**。明確定義為原型檢驗項目，未宣稱虛假 WCAG 官方標章。 |

---

## 二、前端互動原型驗收成果（全數通過）

依 `04_FUNCTIONAL_UX_ACCEPTANCE.md` 之 15 項驗收標準進行 CDP 自動化與人工操作驗證：

- **CA-01 (搜尋「補助」)**：✅ **PASS**。即時篩選出「社區資源生活補助示範諮詢」等 2 筆服務，關鍵字高亮，提供清除按鈕。
- **CA-02 (搜尋不存在字詞)**：✅ **PASS**。輸入 `xyzNonExistent999` 立即顯示無結果空狀態與「清除搜尋並顯示全部服務」按鈕，點擊後安全復原。
- **CA-03 (情境「本人辦理」)**：✅ **PASS**。動態文件清單鎖定為 2 項基礎示範證件，無代辦資料。
- **CA-04 (情境「協助他人代辦」)**：✅ **PASS**。動態文件清單即時切換為 3 項，加入「代辦委託書與受任人身分證件」，計數器同步更新為 `1/3 已準備`。
- **CA-05 (未選取辦理方式即繼續)**：✅ **PASS**。阻擋前進，顯示語音可讀之 `role="alert"` 錯誤訊息並自動將鍵盤焦點引導至未填欄位。
- **CA-06 (前進至步驟 2 後返回步驟 1)**：✅ **PASS**。返回時完整保留已選情境與勾選文件，不遺失操作進度。
- **CA-07 (欄位格式錯誤提示)**：✅ **PASS**。輸入 `09-12` 時，欄位紅框高亮並精確顯示：「格式不符。請輸入有效的示範格式，例如 0912-345-678 或 demo@example.com。」
- **CA-08 (欄位資料修正完成)**：✅ **PASS**。修正為 `0912-345-678` 後，錯誤訊息即時抹除，呈現綠色打勾成功狀態，不單靠色彩辨識。
- **CA-09 (不支援附件格式阻擋)**：✅ **PASS**。選取 `.ZIP` 檔案時，即時阻擋並提示：「不支援檔案格式（.zip）。請選取 PDF、JPG 或 PNG 格式之示範檔案。」，不將無效檔案加入清單。
- **CA-10 (超過 10 MB 附件阻擋)**：✅ **PASS**。選取 `14.5 MB` 大檔時，即時阻擋並提示：「檔案大小 (13.8 MB) 超過 10 MB 上限，請重新選取。」
- **CA-11 (缺少必要附件阻擋送出)**：✅ **PASS**。無有效附件時阻擋進下一步，並高亮上傳區塊。
- **CA-12 (完整示範送件)**：✅ **PASS**。送出前呈現完整摘要卡；確認送出後產生正式示範編號 `DEMO-CA-2026-001`，並呈現三階段模擬追蹤時間軸與非官方免責聲明。
- **CA-13 (重新測試重設)**：✅ **PASS**。點擊「重新測試」安全清空示範表單、附件與狀態，返回步驟 1。
- **CA-14 (中英雙語動態切換)**：✅ **PASS**。點擊頂部「中 / EN」切換器，全頁（導覽列、Hero、搜尋、身分選項、表單欄位、錯誤提示、16 張圖版標題與圖說）100% 同步切換，文字無截斷。
- **CA-15 (Session 草稿保護)**：✅ **PASS**。示範輸入僅存於當前瀏覽器 Session 範圍，重設後乾淨抹除，不收集或向外傳送任何個資。

---

## 三、響應式佈局 (RWD) 與無障礙實測

在 Headless Chromium 實測 5 種標準視口：

1. **1920 × 1080 (Large Desktop)**：`scrollWidth: 1905px`，橫向捲動溢出 0px。圖版網格、側邊欄進度、表單兩欄配置大器開闊。
2. **1440 × 900 (Standard Desktop)**：`scrollWidth: 1425px`，橫向捲動溢出 0px。
3. **768 × 1024 (Tablet / iPad)**：`scrollWidth: 753px`，橫向捲動溢出 0px。側邊欄自動轉換為上方水平均勻步驟條。
4. **390 × 844 (Mobile - iPhone 16/15)**：`scrollWidth: 390px`，橫向捲動溢出 0px。單行任務導向，觸控按鈕寬度 100%、高度 ≥ 48px。
5. **320 × 568 (Small Mobile - iPhone SE)**：`scrollWidth: 320px`，橫向捲動溢出 0px。文字與間距自動縮放，無截字與溢出。

---

## 四、燈箱 (Modal Lightbox) 互動與 A11y 驗收

- 點擊任一圖版之「放大檢視 (2560×1440)」即開啟無障礙對話框 (`role="dialog"`、`aria-modal="true"`)。
- 載入完整 2560×1440 PNG 原圖。
- 支援純鍵盤操作：
  - `Escape` 鍵關閉燈箱，並將焦點安全歸還至觸發之按鈕。
  - `ArrowRight` (→) 切換下一張。
  - `ArrowLeft` (←) 切換上一張。
- 頁面背景捲動於開啟期間自動鎖定 (`overflow: hidden`)，關閉後復原。

---

## 五、Git 異動清單與安全隔離確認

- **工作分支：** `feature/civic-access-case12-v2-local`
- **發布動作：** **ZERO PUSH · ZERO DEPLOY · ZERO PR · ZERO MERGE**
- **01–11 正式案件保護狀態：** 完全凍結，無任何修改。
- **13–15 未完成專案保護狀態：** 完全凍結。
- **本次新增檔案清單（嚴格限定）：**
  - `brand/civic-access/index.html`
  - `brand/civic-access/case-study.html`
  - `brand/civic-access/css/civic-case.css`
  - `brand/civic-access/js/civic-case.js`
  - `brand/civic-access/data/CIVIC_ACCESS_DEMO.json`
  - `brand/civic-access/assets/mockups/shot-01.jpg` ~ `shot-16.jpg` (16 張)
  - `brand/civic-access/assets/shots/shot-01.png` ~ `shot-16.png` (16 張)
  - `brand/civic-access/assets/civic_mark.svg`
  - `brand/civic-access/presentation/evidence-v2-local/` (驗收截圖)
  - `brand/civic-access/presentation/CIVIC_ACCESS_12_V2_LOCAL_STAGING_REPORT.md` (本報告)
  - `scratch/inspect_16_shots_ocr.swift` (OCR 工具)
  - `scratch/test_civic_access_staging.mjs` (QA 測試套件)

---

## 六、結論與門檻狀態

**當前狀態：`LOCAL STAGING PREVIEW / AWAITING HOWARD VISUAL APPROVAL / NO DEPLOY`**

前端功能與無障礙已達商業級互動原型水準，但在主理人完成對 **SHOT 01、02、03、04、05 之生成文字瑕疵、標誌曲率校正與空間錯字確認** 前，本專案將持續維持本機工作分支狀態，**絕不推播或部署至正式 GitHub Pages**。
