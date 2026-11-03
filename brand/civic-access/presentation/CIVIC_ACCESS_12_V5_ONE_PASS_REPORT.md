# FLTL × HOWARD｜12 CIVIC ACCESS V5 單次視覺整合完整驗收報告

**審查日期：** 2026-11-03  
**執行模式：** LOCAL PATCH ONLY · STRICT IMAGE ALLOWLIST · ZERO PUSH · ZERO DEPLOY · ARTWORK REVIEW GATE  
**工作分支：** `feature/civic-access-case12-v2-local`  
**基準 Commit：** `f8ed38e`  
**專案路徑：** `/Users/howard/Desktop/Portfolio/brand/civic-access/`  
**最終判定狀態：**  
`CASE12 / LOCAL V5 ARTWORK INTEGRATED / AWAITING HOWARD VISUAL APPROVAL`

---

## 一、嚴格白名單：八張替換圖檔 SHA-256 核對清單

依據 V5 工單白名單，僅替換 CASE 12 之 **SHOT 01、03、04、05** 共 4 張 JPG 與 4 張 PNG（合計 8 個檔案）。經 `shasum -a 256` 逐檔校驗，100% 精確符合官方交付包 `SHA256SUMS.txt`：

| SHOT | 類型 | 本機檔案路徑 | 尺寸規格 | V5 正式 SHA-256 校驗值 | 校驗結果 |
|---|---|---|---|---|---|
| **01** | WEB_JPG | `brand/civic-access/assets/mockups/shot-01.jpg` | 1920 × 1080 | `ff3f6cc5ec70ad80fa9fb68789a8eb38baf9f1fcc0fa66cbaa0eb2dedaf187b3` | ✅ **PASS** |
| **01** | MASTER_PNG | `brand/civic-access/assets/shots/shot-01.png` | 2560 × 1440 | `1be808d3b08034966310c8b4e7e93f6885912c93a7d3d4a24f19c08bfd9f360f` | ✅ **PASS** |
| **03** | WEB_JPG | `brand/civic-access/assets/mockups/shot-03.jpg` | 1920 × 1080 | `adedd5b47efc5a14d4935e4e36f698cd5f7bcb58ef36b95f3bd4184d4625701c` | ✅ **PASS** |
| **03** | MASTER_PNG | `brand/civic-access/assets/shots/shot-03.png` | 2560 × 1440 | `7d0089aa775021ca513288680b5d7c4e4da55af790cfd06602f484fe1561b705` | ✅ **PASS** |
| **04** | WEB_JPG | `brand/civic-access/assets/mockups/shot-04.jpg` | 1920 × 1080 | `595b78d3b6b7d46e04945219d08215787a831bbab94601188cca4196ec60008d` | ✅ **PASS** |
| **04** | MASTER_PNG | `brand/civic-access/assets/shots/shot-04.png` | 2560 × 1440 | `5bbd06b5a094559b085102f7de341de8a315471c7403e054dab19f97560ed7e8` | ✅ **PASS** |
| **05** | WEB_JPG | `brand/civic-access/assets/mockups/shot-05.jpg` | 1920 × 1080 | `cb923109a12bf5cef3d3a23a6b36ccc2ae2ef33ea89a5fe58488438a342b372c` | ✅ **PASS** |
| **05** | MASTER_PNG | `brand/civic-access/assets/shots/shot-05.png` | 2560 × 1440 | `641b569615fed4cbfd1f28c165cffa13fc2990e7cfb2d7abdea89ee9848e9b0e` | ✅ **PASS** |

---

## 二、其餘 24 張圖片唯讀比對與保護確認

全站其餘 12 組圖版（SHOT 02、06～16，共 12 張 JPG 與 12 張 PNG，合計 24 個檔案）完全未複製、未覆蓋，經比對與 V5 交付包之 SHA-256 100% 位元組一致：

- **SHOT 02**（識別規範）：JPG `78365b...` / PNG `4ffdb2...`（✅ 保持一致）
- **SHOT 06**（情境分析）：JPG `65c03c...` / PNG `744935...`（✅ 保持一致）
- **SHOT 07**（桌機入口）：JPG `00b8d2...` / PNG `d19e41...`（✅ 保持一致）
- **SHOT 08**（行動旅程）：JPG `e9c216...` / PNG `b93278...`（✅ 保持一致）
- **SHOT 09**（服務藍圖）：JPG `5fb3de...` / PNG `d63d72...`（✅ 保持一致）
- **SHOT 10**（身分分流）：JPG `4d5df3...` / PNG `2cb0d4...`（✅ 保持一致）
- **SHOT 11**（文件清單）：JPG `ee6126...` / PNG `d48f76...`（✅ 保持一致）
- **SHOT 12**（分步表單）：JPG `4d00be...` / PNG `642c8b...`（✅ 保持一致）
- **SHOT 13**（錯誤修復）：JPG `f7c2d2...` / PNG `8a367e...`（✅ 保持一致）
- **SHOT 14**（附件核對）：JPG `48c008...` / PNG `6b39cc...`（✅ 保持一致）
- **SHOT 15**（案件追蹤）：JPG `20b6ac...` / PNG `f81552...`（✅ 保持一致）
- **SHOT 16**（無障礙規劃）：JPG `52ab48...` / PNG `8f8043...`（✅ 保持一致）

01–11 正式案件、13–15 未完成專案、首頁與全站 JS/CSS 均 **100% 凍結零異動**。

---

## 三、16 張視覺圖版深度審查與缺陷盤點（含 P0/P1 誠實揭露）

依據工單第 4 條「禁止宣稱」與第 5 條「不得只寫 ALL PASS」之要求，逐張進行放大審查與 Apple Vision OCR 文本檢驗：

| SHOT | 標題 (ZH / EN) | 製作來源規格 | 視覺完成度與設計任務 | 審查細節與 P0/P1 缺陷揭露 (Honest QA) |
|---|---|---|---|---|
| **01** | 公共服務整合體驗<br>Integrated Civic Experience | 生成底圖 (1672×941)<br>Lanczos 重取樣至 2560×1440 | 建築大廳、筆電與手機跨裝置綜合陳列。左側標題與主文排版銳利大器。 | ⚠️ **P1 視覺提示**：左側大字與標題「公共服務數位申辦系統設計」為正確向量字；但筆電與手機螢幕內的微縮介面因源自生成圖底稿，仍存在局部假字（如「腿癆項目」、「身心陳框服務」、「諺輸入服務名稱」等）。整體視覺宏觀自然，符合設計模擬提案標準，但不可宣稱螢幕內小字為可點擊介面。 |
| **02** | 品牌識別規範<br>Brand Identity System | 正式向量母稿程式渲染<br>(2560×1440 原生輸出) | 鎖定版標誌、幾何格線、色彩規範（#0059C9、#101820、#FFFFFF、#FFAE3D）與字型階層。 | ✅ **無缺陷**。引用唯一核准向量檔 `civic_mark.svg`，小字銳利清晰，色碼精準。 |
| **03** | 公共空間與導視<br>Service Center & Wayfinding | 生成底圖 (1672×941)<br>Lanczos 重取樣至 2560×1440 | 呈現挑高服務大廳、主要指標懸掛牌與無障礙櫃檯。空間感與透視良好。 | ⚠️ **P1 視覺提示**：主要吊牌與牆面標誌已合成正確繁體中文（「市民服務中心 Civic Service Center」、「無障礙服務櫃檯 Accessible Service Counter」、「洗手間」）；但遠景與次要指示牌上仍殘留生成錯字（如「目助申辦區」、「無陳礙設施」、「環境設計範聰」）。符合概念空間渲染提案，不可宣稱已實體施作施工。 |
| **04** | 紙本申辦指南<br>Printed Service Editorial | 實體攝影底稿＋程式排版<br>(2560×1440 重新合成) | 呈現 A5 申辦手冊封面、跨頁流程說明與四項可勾選之文件核對卡。 | ✅ **優良**。封面標題「申辦指南 服務手冊 APPLICATION HANDBOOK」與四項清單（身分證明文件、申請資料表、相關證明文件、代辦委託書）排版清晰，資訊層次分明。 |
| **05** | 自助申辦機台<br>Self-Service Kiosk | 落地機台實景合成<br>(2560×1440 重新取樣) | 呈現完整機身含底座，立於服務大廳現場，螢幕呈現迎賓畫面與三大任務。 | ⚠️ **P1 視覺提示**：機身完整無截斷，CIVIC ACCESS 標誌完整露出；螢幕主要按鈕「申辦服務 / 文件準備 / 進度查詢」清楚易讀，且已標註「本機示範，不連接政府系統」；次要輔助標籤（如「需要培助」）具生成字體痕跡。整體場域比例自然。 |
| **06** | 使用者情境分析<br>Citizen Scenarios | Chromium 原生渲染<br>(2560×1440) | 三欄瑞士網格分析長者、照顧者與輔助科技使用者需求。 | ✅ **無缺陷**。向量文字層級分明，無真實訪談之過度宣稱。 |
| **07** | 桌機服務入口<br>Desktop Service Directory | Chromium 原生渲染<br>(2560×1440) | 呈現桌機端搜尋列、5 大分類卡片與導覽結構。 | ✅ **無缺陷**。真實 UI 結構，瑞士網格排版工整。 |
| **08** | 行動端服務旅程<br>Mobile-First Journey | Chromium 原生渲染<br>(2560×1440) | 三部手機呈現搜尋、身分、文件三步驟行動體驗。 | ✅ **無缺陷**。行動端文字對比度達標，小字清晰可讀。 |
| **09** | 服務藍圖<br>Service Blueprint | Chromium 原生渲染<br>(2560×1440) | 民眾、系統、人員五階段對照矩陣。 | ✅ **無缺陷**。資訊架構清晰完整。 |
| **10** | 申請身分分流<br>Applicant & Representative | Chromium 原生渲染<br>(2560×1440) | 本人辦理與代辦分流介面。 | ✅ **無缺陷**。清楚標示為設計示範，不冒稱真實法定資格判定。 |
| **11** | 動態文件清單<br>Dynamic Document Checklist | Chromium 原生渲染<br>(2560×1440) | 展示「已準備 / 待準備 / 缺件」三種狀態。 | ✅ **無缺陷**。文字與圖示雙重區分，不以單一顏色表達。 |
| **12** | 分步表單<br>Progressive Form | Chromium 原生渲染<br>(2560×1440) | 三步驟表單、欄位提示與操作按鈕。 | ✅ **無缺陷**。欄位規範與觸控標的達標。 |
| **13** | 錯誤提示與修復<br>Error & Recovery States | Chromium 原生渲染<br>(2560×1440) | 需要修改與修正完成左右對照。 | ✅ **無缺陷**。符合 WCAG 錯誤修復指引標準。 |
| **14** | 附件上傳與核對<br>Upload & Pre-Submission | Chromium 原生渲染<br>(2560×1440) | 拖曳上傳與 10 MiB / 格式檢核狀態。 | ✅ **無缺陷**。容量與格式規範提示明確。 |
| **15** | 示範案件進度<br>Case Tracking | Chromium 原生渲染<br>(2560×1440) | 呈現 `DEMO-CA-2026-001` 與三階段追蹤。 | ✅ **無缺陷**。清楚標示「僅用於作品集流程示範，未送至任何政府系統」。 |
| **16** | 無障礙驗收規範<br>Accessibility Plan | Chromium 原生渲染<br>(2560×1440) | 系統化列出對比度、焦點外框與 ARIA 檢驗項目。 | ✅ **無缺陷**。明確標明為設計與檢測目標，未宣稱官方合規認證。 |

---

## 四、本機 Chromium 自動化驗收成果（全數通過）

執行 `scratch/test_civic_access_v5_one_pass.mjs`，測試結果如下：

1. **16 張 JPG 網格載入檢驗：**  
   - 全數 16 張卡片圖片 `complete === true`，尺寸精確為 `1920 × 1080`。  
   - 0 處破圖，網格佈局整齊。
2. **16 張 Master PNG 燈箱檢驗：**  
   - 點擊卡片正常開啟 `role="dialog"` 燈箱，原寸 PNG 尺寸精確為 `2560 × 1440`。  
   - 支援 `Escape` 鍵關閉，焦點自動回存至觸發按鈕。
3. **多裝置視口響應式測試 (RWD)：**  
   - **1920 × 1080 (Large Desktop)**：`scrollWidth: 1905px`，橫向溢出 0px。  
   - **1440 × 900 (Standard Desktop)**：`scrollWidth: 1425px`，橫向溢出 0px。  
   - **768 × 1024 (Tablet)**：`scrollWidth: 768px`，橫向溢出 0px。  
   - **390 × 844 (Mobile - iPhone 16/15)**：`scrollWidth: 390px`，橫向溢出 0px。  
   - **320 × 568 (Small Mobile - iPhone SE)**：`scrollWidth: 320px`，橫向溢出 0px。
4. **既有功能回歸測試（Zero Regression）：**  
   - 服務搜尋：「長照」即時篩選出 1 筆服務，空狀態正常。  
   - 身分分流：代辦顯示 3 項文件、本人顯示 2 項文件。  
   - 表單驗證：格式不合即時紅框高亮，修正後轉為綠色打勾。  
   - 上傳上限提示：`檔案大小（14.5 MB / 15,204,352 位元組）超過 10 MB（10,485,760 位元組）上限，請重新選取。`（統一定義 10 MiB = 10,485,760 bytes）。  
   - 送件示範追蹤：送出後呈現 `DEMO-CA-2026-001`，零外部網路請求。  
   - 雙語切換：中英切換即時，DOM 標籤與 Placeholder 100% 同步。  
   - 主控台錯誤：Console Errors = 0。

---

## 五、V5 實測截圖清單（儲存於 evidence-v5-local/）

截圖已產生並存於 [evidence-v5-local/](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/)：

1. **圖版總覽網格 (1440px)：** [ca_v5_gallery_grid_overview_1440.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_gallery_grid_overview_1440.png)
2. **SHOT 01 整合主視覺 (2560×1440 原寸燈箱)：** [ca_v5_shot_01_lightbox_2560.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_shot_01_lightbox_2560.png)
3. **SHOT 03 公共空間與導視 (2560×1440 原寸燈箱)：** [ca_v5_shot_03_lightbox_2560.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_shot_03_lightbox_2560.png)
4. **SHOT 04 紙本申辦指南 (2560×1440 原寸燈箱)：** [ca_v5_shot_04_lightbox_2560.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_shot_04_lightbox_2560.png)
5. **SHOT 05 自助申辦機台 (2560×1440 原寸燈箱)：** [ca_v5_shot_05_lightbox_2560.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_shot_05_lightbox_2560.png)
6. **桌機 1440px 首頁呈現：** [ca_v5_desktop_1440.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_desktop_1440.png)
7. **桌機 1920px 寬螢幕呈現：** [ca_v5_desktop_1920.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_desktop_1920.png)
8. **平板 768px 直向呈現：** [ca_v5_tablet_768.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_tablet_768.png)
9. **手機 390px 直向呈現：** [ca_v5_mobile_390.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_mobile_390.png)
10. **手機 320px 窄螢幕呈現：** [ca_v5_mobile_320.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_mobile_320.png)
11. **步驟 2 表單錯誤驗證狀態：** [ca_v5_form_step2_validation.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_form_step2_validation.png)
12. **步驟 4 送出完成與 DEMO 編號時間軸：** [ca_v5_form_step4_submitted.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v5-local/ca_v5_form_step4_submitted.png)

---

## 六、Git 異動清單與安全隔離確認

- **工作分支：** `feature/civic-access-case12-v2-local`
- **`git diff --name-only` 驗證（嚴格僅 8 個白名單圖檔）：**
  - `brand/civic-access/assets/mockups/shot-01.jpg`
  - `brand/civic-access/assets/mockups/shot-03.jpg`
  - `brand/civic-access/assets/mockups/shot-04.jpg`
  - `brand/civic-access/assets/mockups/shot-05.jpg`
  - `brand/civic-access/assets/shots/shot-01.png`
  - `brand/civic-access/assets/shots/shot-03.png`
  - `brand/civic-access/assets/shots/shot-04.png`
  - `brand/civic-access/assets/shots/shot-05.png`
- **發布動作：** **ZERO PUSH · ZERO DEPLOY · ZERO PR · ZERO MERGE**
- **01–11 正式案件保護狀態：** 完全凍結。
- **13–15 未完成專案保護狀態：** 完全凍結。

---

## 七、結論與等待指令

**當前狀態：`CASE12 / LOCAL V5 ARTWORK INTEGRATED / AWAITING HOWARD VISUAL APPROVAL`**

Antigravity 已嚴格按工單完成 8 個圖片檔案替換、24 張圖片唯讀核驗、16 張圖版品質檢視、全套響應式截圖與全功能回歸測試。請 Howard 進行整套視覺之最終驗收。未取得正式指示前，全案持續維持本機隔離狀態，**絕不推播或部署**。
