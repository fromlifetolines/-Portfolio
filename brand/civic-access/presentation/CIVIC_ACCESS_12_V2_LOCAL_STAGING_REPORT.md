# FLTL × HOWARD｜12 CIVIC ACCESS V2 本機整合、全量圖版品質審查與無障礙補充驗證報告

**審查日期：** 2026-11-03  
**執行模式：** LOCAL STAGING ONLY · STRICT ALLOWLIST · ZERO PUSH · ZERO DEPLOY · ARTWORK REVIEW GATE  
**工作分支：** `feature/civic-access-case12-v2-local`（基底為最新 `main` Commit `c87578c`）  
**專案路徑：** `/Users/howard/Desktop/Portfolio/brand/civic-access/`  
**當前正式判定門檻：**  
`V2 LOCAL FUNCTIONAL READY（本機測試通過）／VISUAL REJECTED（SHOT 01–05 視覺退件）／AWAITING V3 ASSETS／ZERO PUSH／ZERO DEPLOY`

---

## 一、16 張視覺圖版逐張深度審查（含 AI 生成文字與標誌瑕疵盤點）

依工單要求，逐張放大檢視 16 張 2560×1440 PNG 原圖與 1920×1080 JPG 網站預覽，絕非僅憑 SHA-256 判定：

| SHOT | 標題 (ZH / EN) | 製作來源 | 視覺內容核對與品質判定 | 視覺總監退件／待修正瑕疵 (V3 Gatekeepers) |
|---|---|---|---|---|
| **01** | 公共服務整合體驗<br>Integrated Civic Experience | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現 CIVIC ACCESS 品牌整合大版，包含主視覺、宣傳折頁、卡片與數位介面綜合陳列。整體色彩與排版大器。 | ❌ **P0 退件（生成文字錯字）**：大字副文出現生成錯字與幻覺字，「快速**童找**、準備、申請與**追發**進度」（應為尋找／追蹤）、「大**幡**降低」（應為大幅）。正式發布前必須以向量排版重新替換此段說明文字，且需統一品牌標誌。 |
| **02** | 品牌識別規範<br>Brand Identity System | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現藍色幾何圖形 Logo 規範、色彩色票（Civic Blue、Deep Ink）與圖標網格。 | ❌ **P0 退件（標誌曲線不符）**：圖版中生成的幾何色塊弧度與角度，與可編輯向量母稿 `civic_mark.svg` 存在細部曲率差異；字級與色彩標註小字有模糊拉伸痕跡，需使用唯一向量母稿構建鎖定版 VI。色碼必須精確為 `#0059C9`／`#101820`／`#FFFFFF`／`#FFAE3D`。 |
| **03** | 公共空間與導視<br>Service Center & Wayfinding | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現公共服務中心櫃檯、指標導視懸掛牌與開闊服務大廳。透視與光影合理。 | ❌ **P0 退件（嚴重生成錯字）**：掛牌與牆面文字出現明顯 AI 生成錯字，「市民**服粥**據點」（應為服務）、「**無陳礙**設施」（應為無障礙）、「環境設計範**聰**」（應為範疇）、「服務櫃**樓**」（應為櫃檯）、「無**雞薇股施**」（嚴重錯字）。**絕對禁止直接推上正式線**，須由視覺端按透視重新合成修正標牌。 |
| **04** | 紙本申辦指南<br>Printed Service Guidance | 生成圖版<br>(1672×941 → Lanczos 2560×1440) | 呈現印刷申辦手冊封面、內頁檢核表與單張折頁的實體紙本情境。紙張質感與排版優良。 | ❌ **P0 退件（假字與缺漏）**：內頁文案「涵申辦手冊」（缺「蓋」字，應為涵蓋），內頁表格細線小字為生成偽字（Lorem 假字痕跡），屬示意原型印刷物，不可宣稱已實體量產。須由視覺端提供真正的可編輯版式 Mockup。 |
| **05** | 自助申辦機台<br>Self-Service Kiosk | 獨立公共服務照片裁切<br>＋ Chromium 原生 HTML 排版 | 左側為現場服務機台照片裁片，右側為原生 HTML/CSS 渲染之 3 項機台任務導覽（服務選擇、文件準備、進度查詢）。 | ❌ **P0 退件（機台標誌截斷）**：左側實體機台上方螢幕顯示文字為「VIC CCESS」（AI 截切掉首尾字元），左右拼接感過強。須由視覺端交付完整構圖之獨立機台情境。 |
| **06** | 使用者情境分析<br>Citizen Scenarios | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 三欄瑞士網格分析長者使用者、家庭照顧者與輔助科技使用者的痛點與設計需求。文字 100% 向量銳利，層級清晰。 | ⚠️ **P1 暫存（可作版面基礎）**：符合非真實訪談之情境假設規範。後續需再確認版面張力。 |
| **07** | 桌機服務入口<br>Desktop Service Directory | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現完整桌機端搜尋列、5 大服務分類卡片、申辦指南與常見問題。排版整齊，符合 Swiss Grid。 | ⚠️ **P1 暫存（可作版面基礎）**：保留真正 UI 結構而非裝飾性截圖。文字層級分明。 |
| **08** | 行動端服務旅程<br>Mobile-First Journey | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 三部手機並排呈現「01 服務搜尋」、「02 身分選擇」、「03 文件指引」的三步驟行動端介面。 | ⚠️ **P1 暫存（可作版面基礎）**：小字在 390px 實際螢幕可讀，字級未過度縮減。 |
| **09** | 服務藍圖<br>Service Blueprint | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 五階段對照矩陣：民眾（前台）、數位平台（系統）、服務人員（支援）之接觸點藍圖。 | ⚠️ **P1 暫存（可作版面基礎）**：流程節點對應完整，資訊架構清晰。 |
| **10** | 申請身分分流<br>Applicant & Representative | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現本人辦理（2 項文件）與協助他人代辦（3 項文件）的動態分流介面。 | ⚠️ **P1 暫存（可作版面基礎）**：清楚標示為設計示範，不冒稱真實法定資格。 |
| **11** | 動態文件清單<br>Dynamic Document Checklist | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 清楚展示「已準備」、「待準備」與「缺件」的三種狀態標籤與文件卡片。 | ⚠️ **P1 暫存（可作版面基礎）**：狀態均以文字及圖示雙重區分，不單靠顏色辨識。 |
| **12** | 分步表單<br>Progressive Form | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現三步驟表單、必填星號標示、欄位提示與操作按鈕。 | ⚠️ **P1 暫存（可作版面基礎）**：UI 規範標準，按鈕觸控區域達標。 |
| **13** | 錯誤提示與修復<br>Error & Recovery States | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 左右對照「01 需要修改（紅色高亮＋明確錯誤文字）」與「02 修正完成（綠色勾選）」兩種介面狀態。 | ⚠️ **P1 暫存（可作版面基礎）**：符合 WCAG 2.2 SC 3.3.1 / 3.3.3 錯誤提示規範。 |
| **14** | 附件上傳與核對<br>Upload & Pre-Submission | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現「選取附件（拖曳區）」與「驗證與核對（大小/格式檢核）」兩種狀態。 | ⚠️ **P1 暫存（可作版面基礎）**：單檔 10 MB 上限與 PDF/JPG/PNG 格式提示明確。 |
| **15** | 示範案件進度<br>Case Tracking | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 呈現送出後之示範編號 `DEMO-CA-2026-001` 與三節點進度時間軸。 | ⚠️ **P1 暫存（可作版面基礎）**：嚴格限定 DEMO 編號，未向政府系統傳送資料。 |
| **16** | 無障礙驗收規範<br>Accessibility Plan | Chromium 原生渲染<br>(2560×1440 HTML/CSS) | 系統化列出文字對比（≥4.5:1 / ≥3:1）、鍵盤可視焦點（#FFAE3D）、觸控標的（≥44px）與 ARIA 狀態實測指標。 | ⚠️ **P1 暫存（可作版面基礎）**：明確標明為設計與檢測目標，不虛構官方認證。 |

---

## 二、前端互動原型 15 項驗收成果（全數通過）

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
- **CA-10 (超過 10 MB 附件阻擋)**：✅ **PASS**。選取 `14.5 MB` 大檔時，即時阻擋並精確提示位元組與 MiB 換算：「檔案大小（14.5 MB / 15,204,352 位元組）超過 10 MB（10,485,760 位元組）上限，請重新選取。」
- **CA-11 (缺少必要附件阻擋送出)**：✅ **PASS**。無有效附件時阻擋進下一步，並高亮上傳區塊。
- **CA-12 (完整示範送件)**：✅ **PASS**。送出前呈現完整摘要卡；確認送出後產生正式示範編號 `DEMO-CA-2026-001`，並呈現三階段模擬追蹤時間軸與非官方免責聲明。
- **CA-13 (重新測試重設)**：✅ **PASS**。點擊「重新測試」安全清空示範表單、附件與狀態，返回步驟 1。
- **CA-14 (中英雙語動態切換)**：✅ **PASS**。點擊頂部「中 / EN」切換器，全頁介面（導覽列、Hero、搜尋、身分選項、表單欄位、錯誤提示、16 張圖版標題、圖說及替代文字）100% 同步切換，文字無截斷。
- **CA-15 (Session 草稿保護)**：✅ **PASS**。示範輸入僅存於當前瀏覽器 Session 範圍，重設後乾淨抹除，不收集或向外傳送任何個資。

---

## 三、CA-10 容量單位澄清、CA-14 雙語範圍定義與 WCAG 2.2 AA 實測證據

依據視覺總監審查會議決議，本機已完成針對技術規格的深度澄清與實證量測：

### 1. CA-10 容量單位與位元組精確度澄清（Binary MiB vs Decimal MB）
- **先前誤差原因：**  
  在先前版本中，測試按鈕模擬檔案傳入十進位 $14,500,000 \text{ 位元組}$，但在程式邏輯中除以二進位 $1,048,576$（即 $1024 \times 1024$），計算得出 $13.828 \text{ MB}$，導致按鈕標籤寫 $14.5 \text{ MB}$ 但提示文字顯示 $13.8 \text{ MB}$ 之落差。
- **正式標準化修正：**  
  全站統一定義容量為 **二進位 MiB** 換算，並在錯誤訊息中同時並列 **精準位元組數 (Byte Count)**，徹底杜絕混淆：
  - 上限標準：$10 \text{ MB} = 10 \times 1024 \times 1024 = 10,485,760 \text{ 位元組}$。
  - 測試超大檔：$14.5 \text{ MB} = 14.5 \times 1024 \times 1024 = 15,204,352 \text{ 位元組}$。
  - 正式提示文案（中文）：`檔案大小（14.5 MB / 15,204,352 位元組）超過 10 MB（10,485,760 位元組）上限，請重新選取。`
  - 正式提示文案（英文）：`File size (14.5 MB / 15,204,352 bytes) exceeds the 10 MB (10,485,760 bytes) limit. Please select a smaller file.`
  - 實測狀態：在 `scratch/test_civic_access_wcag_evidence.mjs` 中獲評為 **PASS**。

### 2. CA-14 中英雙語範圍之嚴謹定義（DOM 網頁介面 vs 點陣圖版圖像）
- **網頁 DOM 介面（100% 動態支援中英雙語）：**  
  包含全站頁首 Header、字級縮放按鈕、語言切換器、麵包屑、Hero 標題與引言、服務目錄搜尋列、分類篩選頁籤、卡片標題、分流選項、動態文件檢核清單、表單標籤、輸入框 Placeholder、即時驗證錯誤訊息、核對確認卡、案件示範追蹤條、燈箱控制項、16 張圖版之 DOM 標題、說明文案與圖片 `alt` 屬性，點擊切換時均即時動態更新。
- **靜態點陣圖版（SHOT 01–16，不得聲稱像素內生成文字會動態切換）：**  
  16 張圖版之 PNG/JPG 為靜態點陣圖像資產。其中 SHOT 01–05 影像內部烙印之文字屬生成圖檔之一部分，無法亦不應於執行期被瀏覽器翻譯；該些影像內的生成假字與錯字已被列為視覺 P0 退件，將待視覺團隊提供正式 V3 重繪圖檔。

### 3. WCAG 2.2 AA 技術量測數據

透過 CDP 注入標準相對亮度計算公式（$L = 0.2126R + 0.7152G + 0.0722B$），全站 9 組主要配色色彩對比度全數達標：

| 色彩組合項目 | 前景色 (FG) | 背景色 (BG) | 實測對比度 | WCAG 2.2 AA 標準 | 判定 |
|---|---|---|---|---|---|
| 品牌主色對白色背景 | `#0059C9` | `#FFFFFF` | **6.42 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 內文碳黑對白色背景 | `#101820` | `#FFFFFF` | **17.89 : 1** | 一般文字 ≥ 4.5:1 (超標 AAA 7:1) | ✅ **PASS** |
| 次要說明文字對白色背景 | `#556070` | `#FFFFFF` | **6.38 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 琥珀標籤對碳黑背景 | `#FFAE3D` | `#101820` | **9.69 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 錯誤警示紅對淺紅底色 | `#C73339` | `#FFF0F1` | **4.79 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 錯誤警示紅對純白底色 | `#C73339` | `#FFFFFF` | **5.30 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 成功狀態綠對淺綠底色 | `#157D53` | `#EBF7F0` | **4.67 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 成功狀態綠對純白底色 | `#157D53` | `#FFFFFF` | **5.13 : 1** | 一般文字 ≥ 4.5:1 | ✅ **PASS** |
| 焦點可視外框 (Focus Ring) | `#0059C9` | `#FFFFFF` | **6.42 : 1** | SC 2.4.13 / 1.4.11 ≥ 3.0:1 | ✅ **PASS** |

### 4. 200% 字級放大與文字垂直重排 (WCAG SC 1.4.4 & SC 1.4.10 Reflow)
- 在 Chromium 實測注入 `pageScaleFactor: 2.0`（200% 縮放放大）。
- 檢驗指標：`document.documentElement.scrollWidth <= window.innerWidth`。
- 實測結果：視口寬度 1440px 下，捲動寬度為 1425px，**完全未產生橫向捲軸**。服務卡片、表單欄位與圖版格線皆順暢垂直重排，無內容遭裁切或疊合。

### 5. 鍵盤完整無障礙操作鏈與焦點回存 (SC 2.1.1, 2.1.2, 2.4.3, 2.4.7)
- **Tab 順序：** 遵循 DOM 視覺順序，可由跳至內容連結（Skip link）直達主要區塊，依序聚焦各互動控制項。
- **燈箱焦點拘束 (Modal Focus Trap)：** 開啟燈箱後，焦點自動鎖定於關閉按鈕；按下 `Tab` / `Shift+Tab` 鍵時，焦點僅在燈箱內按鈕（關閉、上一張、下一張）之間迴圈循環，不會逸出穿透至底層頁面。
- **Escape 鍵關閉與焦點復原：** 在燈箱中按下 `Escape` 鍵，燈箱立即關閉，鍵盤焦點 **100% 精確回存** 至觸發該次燈箱的圖版按鈕上，使用者無需重新從頁首 Tab。

### 6. 螢幕閱讀器與 ARIA 即時公告 (SC 4.1.3 Status Messages)
- 頁面內建專屬隱藏朗讀容器：`<div id="caLiveAnnouncer" class="ca-sr-only" role="status" aria-live="polite" aria-atomic="true">`。
- 狀態卡片標記為 `role="region" aria-live="polite"`。
- 表單驗證錯誤標籤（`#caStep1Alert`, `#caStep2Alert`, `#caStep3Alert`）預先具備 `role="alert" aria-live="assertive"`，動態插入錯誤文字時，輔助科技能即刻發出語音警示。

### 7. 模擬個資隔離與零外部連線宣告
- 原型所有送件展示編號一律強制鎖定為前綴 `DEMO-CA-2026-001`。
- 測試資料（例如「測試使用者 A」、「0912-345-678」）僅存於前端 JavaScript 記憶體狀態（`caState`）。
- 經網路封包監控確認：表單操作過程 **零 XHR / Fetch 對外發送**，完全隔離，無任何政府或外部端點資料洩漏風險。

---

## 四、響應式佈局 (RWD) 實測結果

在 Headless Chromium 實測 5 種標準視口：

1. **1920 × 1080 (Large Desktop)**：`scrollWidth: 1905px`，橫向捲動溢出 0px。圖版網格、側邊欄進度、表單兩欄配置大器開闊。
2. **1440 × 900 (Standard Desktop)**：`scrollWidth: 1425px`，橫向捲動溢出 0px。
3. **768 × 1024 (Tablet / iPad)**：`scrollWidth: 753px`，橫向捲動溢出 0px。側邊欄自動轉換為上方水平均勻步驟條。
4. **390 × 844 (Mobile - iPhone 16/15)**：`scrollWidth: 390px`，橫向捲動溢出 0px。單行任務導向，觸控按鈕寬度 100%、高度 ≥ 48px。
5. **320 × 568 (Small Mobile - iPhone SE)**：`scrollWidth: 320px`，橫向捲動溢出 0px。文字與間距自動縮放，無截字與溢出。

---

## 五、驗收截圖證據存檔清單

所有本機截圖儲存於 `brand/civic-access/presentation/evidence-v2-local/`：

1. `ca_01_hero_desktop_1440.png` — 1440px 桌機首頁 Hero 視覺。
2. `ca_02_form_validation_error.png` — 步驟 2 表單錯誤提示與即時指引。
3. `ca_03_submitted_tracking_state.png` — 步驟 4 送出完成與 DEMO 編號示範時間軸。
4. `ca_04_lightbox_modal.png` — 2560×1440 原寸圖版無障礙燈箱檢視。
5. `ca_rwd_desktop_1920.png` — 1920px 寬螢幕佈局。
6. `ca_rwd_desktop_1440.png` — 1440px 標準桌機佈局。
7. `ca_rwd_tablet_768.png` — 768px 平板直向佈局。
8. `ca_rwd_mobile_390.png` — 390px 手機直向佈局。
9. `ca_rwd_mobile_320.png` — 320px 窄螢幕手機佈局。
10. `ca_wcag_oversized_file_alert.png` — **[新增]** CA-10 二進位 MiB 與 15,204,352 位元組精確警示訊息。
11. `ca_wcag_200_percent_zoom_reflow.png` — **[新增]** 200% 字級放大下零橫向捲軸之垂直重排驗證。
12. `ca_wcag_keyboard_focus_ring.png` — **[新增]** 鍵盤焦點指示環（6.42:1 高對比可視外框）驗收。
13. `ca_wcag_en_bilingual_dom.png` — **[新增]** 全站 DOM 元素、Placeholder 與替代文字切換英文之實況。

---

## 六、Git 異動清單與安全隔離確認

- **工作分支：** `feature/civic-access-case12-v2-local`
- **發布動作：** **ZERO PUSH · ZERO DEPLOY · ZERO PR · ZERO MERGE**
- **01–11 正式案件保護狀態：** 完全凍結，無任何修改。
- **13–15 未完成專案保護狀態：** 完全凍結。
- **本次新增與異動檔案清單（嚴格限定）：**
  - `brand/civic-access/index.html`
  - `brand/civic-access/case-study.html`
  - `brand/civic-access/css/civic-case.css`
  - `brand/civic-access/js/civic-case.js`
  - `brand/civic-access/data/CIVIC_ACCESS_DEMO.json`
  - `brand/civic-access/assets/mockups/shot-01.jpg` ~ `shot-16.jpg` (16 張)
  - `brand/civic-access/assets/shots/shot-01.png` ~ `shot-16.png` (16 張)
  - `brand/civic-access/assets/civic_mark.svg`
  - `brand/civic-access/presentation/evidence-v2-local/` (13 張驗收截圖)
  - `brand/civic-access/presentation/CIVIC_ACCESS_12_V2_LOCAL_STAGING_REPORT.md` (本報告)
  - `scratch/inspect_16_shots_ocr.swift` (OCR 工具)
  - `scratch/test_civic_access_staging.mjs` (QA 測試套件)
  - `scratch/test_civic_access_wcag_evidence.mjs` (WCAG 深度測試套件)

---

## 七、結論與門檻狀態

**當前正式判定門檻：`LOCAL FUNCTIONAL READY / VISUAL REJECTED (SHOT 01–05 P0) / AWAITING V3 ASSETS / ZERO DEPLOY`**

本機前端互動邏輯、鍵盤導航、無障礙架構與 RWD 佈局已通過嚴格工程驗收；但針對 **SHOT 01–05 影像內部之生成文字錯字、標誌曲率母稿不符與機台文字截斷**，依視覺總監之裁決，**全案處於退件等待重繪狀態 (HOLD)**。

Antigravity 遵守指令：
1. **絕不自行尋找替代圖片、任意裁切或加遮罩遮掩錯字。**
2. **絕不執行 Push、PR、Merge 或 Deploy。**
3. 嚴格保護 01–11 與 13–15 作品集不受干擾。
4. 靜待視覺製作端交付正式核准之 V3 圖版素材包後，再行執行限定路徑圖片替換與本機 QA。
