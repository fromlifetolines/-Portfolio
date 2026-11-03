# FLTL × HOWARD｜12 CIVIC ACCESS V4 SHOT 04 本機換圖驗收報告

**審查日期：** 2026-11-03  
**執行模式：** LOCAL PATCH ONLY · WHITELIST EXACTLY TWO FILES · ZERO PUSH · ZERO DEPLOY · ARTWORK REVIEW GATE  
**工作分支：** `feature/civic-access-case12-v2-local`  
**基準 Commit：** `9de3bfb`  
**專案路徑：** `/Users/howard/Desktop/Portfolio/brand/civic-access/`  
**最終判定狀態：**  
`LOCAL V4 SHOT04 PATCH READY / AWAITING HOWARD VISUAL APPROVAL`

---

## 一、嚴格白名單：兩張替換圖檔 SHA-256 核對

依據工單白名單，僅替換 CASE 12 的 **SHOT 04** 共 1 張 JPG 與 1 張 PNG。經 `shasum -a 256` 逐檔校驗，100% 精確符合官方交付包 `SHA256SUMS.txt` 與 `PATCH_HASHES.json`：

| 檔案類型 | 專案路徑 | 尺寸規格 | V4 正式 SHA-256 校驗值 | 校驗結果 |
|---|---|---|---|---|
| **WEB_JPG** | `brand/civic-access/assets/mockups/shot-04.jpg` | 1920 × 1080 | `242d1572b35302898bc12398d3cca6cc29d05ea1848c64f942c67029abbc79df` | ✅ **MATCH** |
| **MASTER_PNG** | `brand/civic-access/assets/shots/shot-04.png` | 2560 × 1440 | `3ee6a01c8a8a398ca970079cfdd9591d00c4e9eceb564cd3c72a0d5496fc2782` | ✅ **MATCH** |

---

## 二、SHOT 01–03、05–16 維持原狀確認（三十個圖片檔案）

全站其餘 30 個圖片檔案（15 張 JPG、15 張 PNG）完全未受修改，位元組與雜湊值完全維持原狀：
- `shot-01.jpg` (`da970e...`) / `shot-01.png` (`b86f01...`)：✅ 保留
- `shot-02.jpg` (`78365b...`) / `shot-02.png` (`4ffdb2...`)：✅ 保留
- `shot-03.jpg` (`867ab2...`) / `shot-03.png` (`e5456d...`)：✅ 保留
- `shot-05.jpg` (`e1ac8d...`) / `shot-05.png` (`6bde2f...`)：✅ 保留
- `shot-06` ～ `shot-16`（22 個檔案）：✅ 全數保留

---

## 三、SHOT 04 V4 視覺品質與 OCR 文字核對（驗收條件 2）

透過 Apple Vision OCR 深度掃描 2560×1440 Master PNG，確認工單所列關鍵文字與排版結構全數精確呈現，無任何生成假字或錯字：

1. **封面標題：**
   - 「CIVIC ACCESS PUBLIC SERVICE 申辦指南 服務手冊 APPLICATION HANDBOOK」
   - 「理解流程，準備文件。每一步都有清楚的依據。2026 VOL.01」
2. **章節標籤：**
   - 「SECTION / 01 申辦流程 確認申辦方式與所需資料（尋找服務 → 確認身分 → 準備文件 → 送出核對）」
   - 「SECTION / 02 準備與核對 建議於填寫表單前確認文件清單」
3. **四條獨立文件核對清單項目：**
   - ☑ **身分證明文件**
   - ☑ **申請資料表**
   - ☑ **相關證明文件**
   - ☑ **代辦委託書（如適用）**
4. **設計說明項目：**
   - 「01 申辦手冊與章節編排 / 02 文件清單與申辦資訊 / 03 紙張材質與細節應用」
5. **品質判定：** 文字層次分明，排版符合瑞士國際主義風格，無任何來源圖之生成假字。

---

## 四、本機 Chromium 自動化驗收成果（驗收條件 3 & 4）

執行 `scratch/test_civic_access_v4_patch.mjs`，測試結果全數 PASS：

1. **桌機 1440px 網格呈現：**
   - `assets/mockups/shot-04.jpg` 正常載入，`complete === true`，尺寸精確為 `1920 × 1080`。
   - 截圖：`ca_v4_shot_04_desktop_grid_1440.png`。
2. **原寸 2560×1440 無障礙燈箱：**
   - 點擊卡片開啟 Lightbox，`assets/shots/shot-04.png` 正常載入，`naturalWidth === 2560`，`naturalHeight === 1440`。
   - 支援 `Escape` 鍵關閉並回存鍵盤焦點。
   - 截圖：`ca_v4_shot_04_lightbox_2560.png`。
3. **手機 390px 視口實測：**
   - 在 iPhone 16/15（390×844，DPR=3）視口下，卡片寬度自適應為 358px，`scrollWidth: 390px <= innerWidth: 390px`，橫向溢出 0px。
   - 截圖：`ca_v4_shot_04_mobile_390.png`。
4. **既有功能回歸（Zero Regression）：**
   - 服務搜尋、身分分流、動態文件勾選、表單欄位驗證正常。
   - CA-10 檔案上限警示：`檔案大小（14.5 MB / 15,204,352 位元組）超過 10 MB（10,485,760 位元組）上限，請重新選取。` 格式完全維持。
   - 示範送件追蹤碼：產生 `DEMO-CA-2026-001`，零對外請求。
   - 主控台錯誤：Console Errors = 0。

---

## 五、V4 實測截圖清單（供 Howard 最終視覺驗收）

截圖已存於 `brand/civic-access/presentation/evidence-v4-local/`：

1. **桌機網格檢視 (1440px)：** [ca_v4_shot_04_desktop_grid_1440.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v4-local/ca_v4_shot_04_desktop_grid_1440.png)
2. **原寸燈箱檢視 (2560×1440)：** [ca_v4_shot_04_lightbox_2560.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v4-local/ca_v4_shot_04_lightbox_2560.png)
3. **手機直向檢視 (390px)：** [ca_v4_shot_04_mobile_390.png](file:///Users/howard/Desktop/Portfolio/brand/civic-access/presentation/evidence-v4-local/ca_v4_shot_04_mobile_390.png)

---

## 六、Git 異動清單與安全隔離確認

- **工作分支：** `feature/civic-access-case12-v2-local`
- **`git diff --name-only` 驗證：**
  - `brand/civic-access/assets/mockups/shot-04.jpg`
  - `brand/civic-access/assets/shots/shot-04.png`
  - 嚴格僅包含上述兩個白名單圖檔。
- **發布動作：** **ZERO PUSH · ZERO DEPLOY · ZERO PR · ZERO MERGE**
- **01–11 正式案件保護狀態：** 完全凍結。
- **13–15 未完成專案保護狀態：** 完全凍結。

---

## 七、結論與等待指令

**當前狀態：`LOCAL V4 SHOT04 PATCH READY / AWAITING HOWARD VISUAL APPROVAL`**

Antigravity 已嚴格按工單完成 SHOT 04 二圖替換與全功能回歸測試，請 Howard 檢閱截圖與本機實際畫面。未取得正式指示前，全案持續維持本機隔離狀態，**絕不推播或部署**。
