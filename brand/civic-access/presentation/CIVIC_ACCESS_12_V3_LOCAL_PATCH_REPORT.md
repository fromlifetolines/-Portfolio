# FLTL × HOWARD｜12 CIVIC ACCESS V3 本機換圖驗收與視覺審查報告

**審查日期：** 2026-11-03  
**執行模式：** LOCAL PATCH ONLY · STRICT ALLOWLIST · ZERO PUSH · ZERO DEPLOY · ARTWORK REVIEW GATE  
**工作分支：** `feature/civic-access-case12-v2-local`  
**專案路徑：** `/Users/howard/Desktop/Portfolio/brand/civic-access/`  
**最終判定門檻：**  
`LOCAL V3 PATCH READY / AWAITING HOWARD VISUAL APPROVAL`

---

## 一、替換檔案 SHA-256 完整校驗紀錄（十個圖片檔案）

依據工單白名單，嚴格僅替換 CASE 12 之 **SHOT 01–05** 共 5 張 JPG 與 5 張 PNG。經 `shasum -a 256` 逐檔比對，十個檔案皆 100% 精確符合官方交付包 `SHA256SUMS.txt`：

| SHOT | 檔案類型 | 專案路徑 | 尺寸規格 | V3 正式校驗碼 (SHA-256) | 校驗結果 |
|---|---|---|---|---|---|
| **01** | WEB_JPG | `brand/civic-access/assets/mockups/shot-01.jpg` | 1920 × 1080 | `da970edf1743a616a92d0c697399ef2945f54c31d6c6c09e186b36aafe3a6de1` | ✅ **MATCH** |
| **01** | MASTER_PNG | `brand/civic-access/assets/shots/shot-01.png` | 2560 × 1440 | `b86f011bacba479f191aeaa8b0d9c3ca49892d97c9d141e75713075326cbcb16` | ✅ **MATCH** |
| **02** | WEB_JPG | `brand/civic-access/assets/mockups/shot-02.jpg` | 1920 × 1080 | `78365b1589f63e8aeb7d5ba497095afea567e849d66c7e1f69a188262573ea4d` | ✅ **MATCH** |
| **02** | MASTER_PNG | `brand/civic-access/assets/shots/shot-02.png` | 2560 × 1440 | `4ffdb21da3e7edb1343425707b08efdb6018278087c40b17e545230572046bfe` | ✅ **MATCH** |
| **03** | WEB_JPG | `brand/civic-access/assets/mockups/shot-03.jpg` | 1920 × 1080 | `867ab2120b5e057bb11c096a9d3490c608e2db9d5cd4f02e22c99f0a7b629017` | ✅ **MATCH** |
| **03** | MASTER_PNG | `brand/civic-access/assets/shots/shot-03.png` | 2560 × 1440 | `e5456db95c9ffea23cff02af860f55ff5979693aeafd4412752996c876027585` | ✅ **MATCH** |
| **04** | WEB_JPG | `brand/civic-access/assets/mockups/shot-04.jpg` | 1920 × 1080 | `2f5a681763cf2882bd4805348c814b83451d8ad0fb3df9b955ab7e2bed58b43a` | ✅ **MATCH** |
| **04** | MASTER_PNG | `brand/civic-access/assets/shots/shot-04.png` | 2560 × 1440 | `93795694daf3ec86c87ed9dc41318773f903229fb97af94d4f61923848dbe418` | ✅ **MATCH** |
| **05** | WEB_JPG | `brand/civic-access/assets/mockups/shot-05.jpg` | 1920 × 1080 | `e1ac8dbf98c7113b85b3fb76d0eda17eb11dd4fdc169ba801e9b6d5ac9a922e7` | ✅ **MATCH** |
| **05** | MASTER_PNG | `brand/civic-access/assets/shots/shot-05.png` | 2560 × 1440 | `6bde2f9ebb25466633384d2def13c115d3d30fb159e8575aa3242bdaad7a397f` | ✅ **MATCH** |

---

## 二、SHOT 06–16 原資產保留確認（二十二個圖片檔案）

SHOT 06–16 共 11 張 JPG 與 11 張 PNG 完全未受修改，位元組與雜湊值均維持原狀：
- `shot-06.jpg` (`65c03c...`) / `shot-06.png` (`744935...`)：✅ 保留
- `shot-07.jpg` (`00b8d2...`) / `shot-07.png` (`d19e41...`)：✅ 保留
- `shot-08.jpg` (`e9c216...`) / `shot-08.png` (`b93278...`)：✅ 保留
- `shot-09.jpg` (`5fb3de...`) / `shot-09.png` (`d63d72...`)：✅ 保留
- `shot-10.jpg` (`4d5df3...`) / `shot-10.png` (`2cb0d4...`)：✅ 保留
- `shot-11.jpg` (`ee6126...`) / `shot-11.png` (`d48f76...`)：✅ 保留
- `shot-12.jpg` (`4d00be...`) / `shot-12.png` (`642c8b...`)：✅ 保留
- `shot-13.jpg` (`f7c2d2...`) / `shot-13.png` (`8a367e...`)：✅ 保留
- `shot-14.jpg` (`48c008...`) / `shot-14.png` (`6b39cc...`)：✅ 保留
- `shot-15.jpg` (`20b6ac...`) / `shot-15.png` (`f81552...`)：✅ 保留
- `shot-16.jpg` (`52ab48...`) / `shot-16.png` (`8f8043...`)：✅ 保留

---

## 三、SHOT 01–05 逐圖視覺品質與文字 OCR 核對

透過 Apple Vision OCR 深度掃描 2560×1440 Master PNG，確認 V2 視覺總監退件之 P0 瑕疵已全數排除：

| SHOT | 標題 | V2 退件缺陷 (Rejection Reasons) | V3 修正成果與 OCR 實測文字核對 | 判定 |
|---|---|---|---|---|
| **01** | 公共服務整合體驗<br>Integrated Civic Experience | 生成錯字「童找」、「追發」、「大幡降低」；多處小字無意義拉伸模糊。 | ✅ **全面改為正確向量文字排版**：<br>• 主標題：「讓公共服務，變得容易理解。」<br>• 三階段體驗：「01 / DISCOVER 找到適合的服務」、「02 / APPLY 準備申請資料」、「03 / FOLLOW UP 掌握示範進度」<br>• 品牌標示與徽標統一為 CIVIC ACCESS 官方鎖定版。完全無錯字。 | ✅ **PASS** |
| **02** | 品牌識別規範<br>Brand Identity System | 生成圖像中 Logo 幾何弧度與源檔 `civic_mark.svg` 不一致；色碼標註小字模糊。 | ✅ **直接引用唯一核准向量母稿排版**：<br>• 標誌幾何結構明定：「GEOMETRIC CONSTRUCTION / 4 MODULES / 16 / 24 / 36 PX LOGIC」<br>• 正式標誌引用宣告：「MASTER LOGO SOURCE: CIVIC_MARK.SVG • #0059C9」<br>• 精準色碼：「BLUE #0059C9 / INK #101820 / WHITE #FFFFFF / AMBER #FFAE3D」<br>• 字體規範：「Aa Noto Sans TC 公共服務設計 資訊清楚・容易閱讀」。完全符合 VI 標準。 | ✅ **PASS** |
| **03** | 公共空間與導視<br>Service Center & Wayfinding | 指標牌面出現荒謬生成錯字：「市民服粥據點」、「無陳礙設施」、「環境設計範聰」、「服務櫃樓」、「無雞薇股施」。 | ✅ **全面按空間透視合成獨立向量導視牌面**：<br>• 「市民服務中心 Civic Service Center」<br>• 「無障礙服務櫃檯 Accessible Service Counter」<br>• 「自助申辦區 SELF-SERVICE」<br>• 「無障礙服務 ACCESSIBLE」<br>• 「洗手間 Restroom & Facilities」<br>• 三大導視原則：「01 遠距辨識 / Clear hierarchy」、「02 雙語對照 / Bilingual labels」、「03 多元導引 / Multiple access routes」。空間標籤無任何錯字。 | ✅ **PASS** |
| **04** | 紙本申辦指南<br>Printed Service Guidance | 內頁文案「涵申辦手冊」（缺字），內頁表格為生成偽字（Lorem 痕跡），無可讀欄位。 | ✅ **提供真實可讀之紙本手冊與文件核對卡排版**：<br>• 封面手冊標題：「CIVIC ACCESS 申辦指南 服務手冊 PUBLIC SERVICE HANDBOOK」<br>• 文件核對清單：「DOCUMENT CHECKLIST 申請文件 核對清單 請依申請情境準備對應文件。」<br>• 具體項目：「身分證明文件 / 申請資料表 / 相關證明文件 / 代辦委託書（如適用）」。欄位清晰可辨。 | ✅ **PASS** |
| **05** | 自助申辦機台<br>Self-Service Kiosk | 左側實體機台上方螢幕顯示文字為「VIC CCESS」（AI 截切掉首尾字元）；左右拼接感過強。 | ✅ **改為獨立完整機台情境視覺與原生觸控選單**：<br>• 完整呈現官方 CIVIC ACCESS 標誌（未截斷）<br>• 迎賓與選單：「WELCOME／歡迎使用 請選擇辦理服務 Select a service to continue」<br>• 三大功能觸控大鈕：「申辦服務 / 文件準備 / 進度查詢」<br>• 示範警示標註：「本機示範，不連接政府系統」。整體比例自然且具實境感。 | ✅ **PASS** |

---

## 四、本機 Chromium 自動化驗收成果（全數通過）

執行 `scratch/test_civic_access_v3_patch.mjs` 與 `scratch/test_civic_access_wcag_evidence.mjs`：

1. **圖片載入與自然尺寸檢驗：**  
   - 16 張 Web JPG：全數 `complete === true`，尺寸精確為 `1920 × 1080`。  
   - 16 張 Master PNG：全數於燈箱載入成功，尺寸精確為 `2560 × 1440`。  
   - 0 處 Broken Image。
2. **燈箱無障礙互動與鍵盤流程：**  
   - 點擊任一圖版即時開啟 `role="dialog"` 燈箱。  
   - `Tab` / `Shift+Tab` 焦點拘束（Focus Trap）正常循環。  
   - 按下 `Escape` 立即關閉，焦點 100% 回存至觸發之縮圖按鈕。  
   - `ArrowLeft` / `ArrowRight` 順暢切換。
3. **行動端 390px 視口實測：**  
   - 在 iPhone 16/15（390×844，DPR=3）視口下，SHOT 01、03、05 畫面排版大器，文字清晰可讀，觸控按鈕寬度 100%、高度 ≥ 48px，橫向捲動溢出 0px。
4. **既有前端功能回歸測試（Zero Regression）：**  
   - 服務搜尋：「長照」即時篩選出 1 筆服務，空狀態與復原按鈕正常。  
   - 申辦分流：本人（2 項）與代辦（3 項）文件即時切換。  
   - 表單驗證：格式不符時即時紅框提示，修正後轉為綠色打勾。  
   - CA-10 檔案上限警示：上傳 15,204,352 位元組檔案時，精確提示「檔案大小（14.5 MB / 15,204,352 位元組）超過 10 MB（10,485,760 位元組）上限，請重新選取。」  
   - 送件示範追蹤：送出後呈現 `DEMO-CA-2026-001` 與模擬時間軸，零對外網路請求。  
   - 主控台錯誤：Console Errors = 0。

---

## 五、V3 實測截圖清單（供 Howard 最終視覺核准）

截圖已存於 `brand/civic-access/presentation/evidence-v3-local/`：

1. `ca_v3_gallery_grid_overview.png` — 1440px 桌機圖版總覽網格。
2. `ca_v3_shot_01_lightbox.png` — **SHOT 01 整合主視覺 (2560×1440 原寸燈箱)**。
3. `ca_v3_shot_01_mobile_390.png` — SHOT 01 行動端 390px 實際呈現。
4. `ca_v3_shot_02_lightbox.png` — **SHOT 02 品牌識別規範 (2560×1440 原寸燈箱)**。
5. `ca_v3_shot_03_lightbox.png` — **SHOT 03 公共空間與導視 (2560×1440 原寸燈箱)**。
6. `ca_v3_shot_03_mobile_390.png` — SHOT 03 行動端 390px 實際呈現。
7. `ca_v3_shot_04_lightbox.png` — **SHOT 04 紙本申辦指南 (2560×1440 原寸燈箱)**。
8. `ca_v3_shot_05_lightbox.png` — **SHOT 05 自助申辦機台 (2560×1440 原寸燈箱)**。
9. `ca_v3_shot_05_mobile_390.png` — SHOT 05 行動端 390px 實際呈現。

---

## 六、Git 異動清單與安全隔離確認

- **工作分支：** `feature/civic-access-case12-v2-local`
- **發布動作：** **ZERO PUSH · ZERO DEPLOY · ZERO PR · ZERO MERGE**
- **01–11 正式案件保護狀態：** 完全凍結，無任何修改。
- **13–15 未完成專案保護狀態：** 完全凍結。
- **本次異動檔案：** 僅限十個圖片資產替換與本機報告、測試產物。

---

## 七、結論與等待指令

**當前狀態：`LOCAL V3 PATCH READY / AWAITING HOWARD VISUAL APPROVAL`**

Antigravity 已嚴格按工單完成十個圖片檔案替換與全功能回歸測試，請 Howard 檢閱上述五張新版圖版截圖與實際畫面。未取得正式指示前，全案持續維持本機隔離狀態，**絕不推播或部署**。
