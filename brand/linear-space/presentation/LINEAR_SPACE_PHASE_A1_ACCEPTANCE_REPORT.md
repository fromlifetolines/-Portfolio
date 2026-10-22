# FLTL × HOWARD｜PORTFOLIO 08 — LINEAR SPACE / FRAME/01
## PHASE A.1 EIGHT-SHOT VISUAL PATCH ACCEPTANCE REPORT

**任務代碼**：P08-FRAME01-PATCH-A1  
**執行模式**：LOCAL ONLY / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY  
**作業目錄**：`/Users/howard/Desktop/Portfolio`  
**素材來源**：`/Users/howard/Desktop/_patch_review/LINEAR_SPACE_08_A1_EIGHT_SHOT_ART_DIRECTION_PATCH_20261022/`  
**備份目錄**：`/Users/howard/Desktop/_patch_review/LINEAR_SPACE_08_PRE_A1_BACKUP_20261022/`  
**基準分行**：`feature/linear-space-portfolio-08-v1`（以 `origin/main` SHA `b9fc3cc` 為基礎）  
**驗收日期**：2026-10-22  
**審核狀態**：**LINEAR SPACE 08 — PHASE A.1 PATCH VERIFIED / READY FOR ART DIRECTION REVIEW**

---

### 一、八張視覺修正版替換與備份審查（Replacement & Safety Scope）

1. **嚴格限制替換範圍（Only Shots 03, 06, 07, 08, 10, 11, 12, 16）**：
   - 僅替換已核准之 8 組圖版（共 8 張 Master PNG 與 8 張 Web JPG，合計 16 筆資產）。
   - 鎖定並完整保留未修改圖版：**SHOT 01, 02, 04, 05, 09, 13, 14, 15**（共 16 筆資產，雜湊與位元組完全未動）。
2. **覆蓋前安全備份（Pre-patch Backup Verified）**：
   - 替換前已將既有 16 筆檔案完整鏡像備份至 `/Users/howard/Desktop/_patch_review/LINEAR_SPACE_08_PRE_A1_BACKUP_20261022/`（含 `shots/` 與 `mockups/` 子目錄）。
3. **無損素材承諾（No Re-generation / No Contact Sheet Slicing）**：
   - 全數採用 `01_PATCH_FILES` 正式獨立輸出檔案，絕無裁切 Contact Sheet、絕無私自重新生圖、絕無降低畫質。

---

### 二、16 筆新資產 SHA-256 密碼學校驗與畫布尺寸比對 (100% MATCH)

逐筆計算 `brand/linear-space/assets/shots/` 與 `brand/linear-space/assets/mockups/` 中 8 組替換資產之 SHA-256 雜湊值與檔案大小，與 `ASSET_MANIFEST_PHASE_A1.json` 完全吻合：

| 圖號 | 正式圖名 | 畫布解析度 | Master PNG（原寸燈箱）SHA-256 與大小 | Web JPG（網頁載入）SHA-256 與大小 | 替換判定 |
|:---:|---|:---:|---|---|:---:|
| **03** | Space Planning | 2560×1440 | `2e68cdda54f8667879407afd86857a217f8acc9312e35363e27ef33999bc12b7`<br>(2,309,244 B) | `e5f9e61a883530882e5da9c70edf02d0843fb5e924c4b5088516b30fcacf4932`<br>(600,672 B) | **PASS ✓** |
| **06** | Material Palette | 2560×1440 | `250b6416e3c3fe0ea0f953ce2838205cb4a064b157118bb1636186aaec2b893f`<br>(3,290,541 B) | `2a4138c51cdfd931a443437906443c1aff6e27ef059d7e60b7c784004634885e`<br>(758,154 B) | **PASS ✓** |
| **07** | Lighting Design | 2560×1440 | `17f552e7558455360f2c3eb5e77619c868c1ce7890a77e1bfa9e2d0197bd40c4`<br>(3,713,700 B) | `4b27fa256fed8a24728ce09b02d1505f76ed82a7cb4d2fbf4118741f99e14563`<br>(870,802 B) | **PASS ✓** |
| **08** | Retail Display | 2560×1440 | `7cea8c6a9c314d0cf07b812b0ca88aa8f210ccf7daa1505fcd70b853b388cf1b`<br>(2,394,163 B) | `bd54f2199d76018e04610a3262c27d0e9751191d34c579c2a5169b0412bbc936`<br>(662,336 B) | **PASS ✓** |
| **10** | Furniture Detail | 2560×1440 | `f5684b19ce7f0aa718a2d211f918316a2073aae66f33eaa2bb0ea949cbc60f8b`<br>(2,603,483 B) | `1a61ab8bca3375285ca0aeb4285238fbc2f94ca8bb87c2be65b566a307b80bfd`<br>(635,548 B) | **PASS ✓** |
| **11** | Human Experience | 2560×1440 | `26334412f670301288e7b059859da22ee2000e88c2fb666e8f4611ff21adc0ea`<br>(3,761,292 B) | `e3c023d1f51ef9359c4c950973c668a7b64493627e0d7ae0fbfce32c9c184976`<br>(853,137 B) | **PASS ✓** |
| **12** | Detail & Craft | 2560×1440 | `5ce258727161a47d32ca489f803f437f8a6ff2f5a6faafd935e9a7b270e5a5bb`<br>(2,209,279 B) | `cec2b8779bf4ec3add02773a420f85ac89a73af28dc2b33c44b11bc1c6469427`<br>(554,268 B) | **PASS ✓** |
| **16** | Final Showcase | 2560×1440 | `d411767e87e54a65ec4255ca471aa661f491afdd8c400142e78b055e807da7e1`<br>(4,847,401 B) | `0da46a132b0868d33ab3a511c07ab7c9160d90ef2890511c36759bb0c93a07e6`<br>(1,078,064 B) | **PASS ✓** |

**鎖定保留資產核驗（Locked Shots 01, 02, 04, 05, 09, 13, 14, 15）**：
- SHOT 01, 02, 04, 05, 09, 13, 14, 15 之 8 張 PNG 及 8 張 JPG 雜湊與原版完全一致，未發生任何非預期覆寫。

---

### 三、藝術指導重點審查與事實揭露（Art Direction & Governance）

1. **SHOT 11（Human Experience）如實標註為人物動線概念示意**：
   - 圖像內已包含 `HUMAN MOVEMENT STUDY / CONCEPTUAL OCCUPANCY` 與 `NOT A BUILT PROJECT PHOTO` 標示。
   - 網頁圖版標籤同步更新為：`SHOT 11 / 16 人物動線概念示意（非真實訪客攝影）`。
   - 網站免責宣告與 Manifest 均明確記載：「SHOT 11 人物剪影為動線與空間尺度概念示意，非竣工實景之真實訪客攝影」。絕不冒充已完工之實景紀錄。
2. **SHOT 03（Space Planning）空間計畫與五分區可讀性大幅提升**：
   - 清晰呈現 180 m² 軸測剖面，五分區（24 + 64 + 38 + 24 + 30 = 180 m²）與動線圖層層分明。
   - 標明 `Area schedule is conceptual; not a permit or construction drawing`。
3. **SHOT 06（Material Palette）獨立材質攝影**：
   - 石灰岩、煙燻橡木、金屬與霧面玻璃以自然光影靜態展示，取代先前繁複排版。
4. **SHOT 07（Lighting Design）建築照明細節**：
   - 清楚呈現 2700K 迎賓暖光與 3000K 展品焦點光的溫層變化，附帶天花洗牆（Cove）、展架洗光（Shelf wash）與玄關導引（Arrival glow）三組特寫。
5. **SHOT 08（Retail Display）展品島台聚焦**：
   - 強化展示層架與石材中島細部，減少廣角室內全景之重複感。
6. **SHOT 10（Furniture Detail）家具木作概念細節**：
   - 標明 `CONCEPT DETAIL / NOT A FABRICATION DRAWING`，網頁圖說亦標註為「示意性家具木作概念，非實際施工工程圖」。
7. **SHOT 12（Detail & Craft）微距材質銜接**：
   - 石材收邊（Stone Edge）、煙燻木紋（Timber Grain）、金屬勾縫（Metal Reveal）以微距攝影具體呈現工藝水準。
8. **SHOT 16（Final Showcase）品牌終幕總覽**：
   - 呈現暮色中通透建築量體，明確註記 `SELF-INITIATED ARCHITECTURAL CONCEPT / NOT A COMPLETED BUILT PROJECT`。

---

### 四、功能與回歸測試結果（31 Passed / 0 Errors）

執行自動化端到端驗收腳本 `scratch/linear_space_a1_qa.mjs`：

| 測試分類 | 項目 | 結果 | 判定 |
|---|---|---|:---:|
| **圖版結構** | 16 幕圖版完全渲染 | 16/16 正常載入，無缺漏 | **PASS ✓** |
| **五區空間導覽** | 5 區按鈕互動切換（Entrance 24, Gallery 64, Lounge 38, Consultation 24, Back-of-house 30 m²） | 5/5 面積與圖文對應準確，加總 180 m² | **PASS ✓** |
| **全螢幕燈箱** | 8 組替換圖版 Master PNG 呼叫 | 8/8 均能正確載入 2560×1440 Master PNG，支援 Esc 關閉與焦點返回 | **PASS ✓** |
| **雙語切換** | `zh-TW` ↔ `en` 即時切換 | 標題、圖說、免責宣告即時切換無刷新 | **PASS ✓** |
| **控制台錯誤** | 全域 Console Error 審查 | `consoleErrors = 0` | **PASS ✓** |
| **既有作品回歸** | Works 01–07 端點可達性測試 | 7/7 均為 HTTP 200 Accessible | **PASS ✓** |

**六大 Viewport 橫向無溢出審查（Horizontal Overflow = 0px）**：
- `1920 × 1080`（Desktop Large）：`overflowX = 0px` **PASS ✓**
- `1440 × 900`（Desktop Standard）：`overflowX = 0px` **PASS ✓**
- `1024 × 768`（Tablet Landscape）：`overflowX = 0px` **PASS ✓**
- `768 × 1024`（iPad Portrait）：`overflowX = 0px` **PASS ✓**
- `390 × 844`（iPhone 12/13/14）：`overflowX = 0px` **PASS ✓**
- `375 × 812`（iPhone X/XS/11 Pro）：`overflowX = 0px` **PASS ✓**

---

### 五、實機截圖證據庫（存於 `brand/linear-space/presentation/evidence-a1/`）

**8 組桌機圖版卡片截圖（Desktop Grid Cards）**：
1. `desktop_card_shot_03.png` (3.37 MB)：SHOT 03 空間計畫卡片。
2. `desktop_card_shot_06.png` (3.34 MB)：SHOT 06 材質調色盤卡片。
3. `desktop_card_shot_07.png` (2.79 MB)：SHOT 07 照明策略卡片。
4. `desktop_card_shot_08.png` (2.79 MB)：SHOT 08 展陳動線卡片。
5. `desktop_card_shot_10.png` (2.47 MB)：SHOT 10 概念木作細節卡片。
6. `desktop_card_shot_11.png` (2.38 MB)：SHOT 11 人物動線示意卡片（含非真實訪客攝影標籤）。
7. `desktop_card_shot_12.png` (2.38 MB)：SHOT 12 微距工藝卡片。
8. `desktop_card_shot_16.png` (2.06 MB)：SHOT 16 終幕總覽卡片。

**8 組燈箱全螢幕原寸 PNG 截圖（Lightbox Full PNGs）**：
9. `lightbox_shot_03.png` (2.47 MB)：燈箱檢視 SHOT 03 Master PNG。
10. `lightbox_shot_06.png` (3.49 MB)：燈箱檢視 SHOT 06 Master PNG。
11. `lightbox_shot_07.png` (3.94 MB)：燈箱檢視 SHOT 07 Master PNG。
12. `lightbox_shot_08.png` (2.63 MB)：燈箱檢視 SHOT 08 Master PNG。
13. `lightbox_shot_10.png` (2.95 MB)：燈箱檢視 SHOT 10 Master PNG。
14. `lightbox_shot_11.png` (4.01 MB)：燈箱檢視 SHOT 11 Master PNG。
15. `lightbox_shot_12.png` (2.34 MB)：燈箱檢視 SHOT 12 Master PNG。
16. `lightbox_shot_16.png` (5.14 MB)：燈箱檢視 SHOT 16 Master PNG。

**手機端與互動驗證截圖**：
17. `mobile_hero.png` (0.61 MB)：手機端（390×844）Hero 視圖。
18. `mobile_card_shot_03.png` (0.83 MB)：手機端 SHOT 03 卡片呈現。
19. `mobile_card_shot_11.png` (0.73 MB)：手機端 SHOT 11 卡片與動線標註。
20. `mobile_card_shot_16.png` (0.59 MB)：手機端 SHOT 16 卡片呈現。
21. `spatial_tour_regression.png` (0.88 MB)：五區空間導覽切換回歸截圖。

---

### 六、Git 白名單與隔離狀態審查

```bash
$ git diff --name-status
# （無任何追蹤檔案被更動 — 首頁、About、前七件作品 100% 受到保護）

$ git status --short
?? brand/linear-space/
?? portfolio-linear-space.html
?? scratch/
```

- 本輪嚴格執行 **LOCAL ONLY / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY**。
- 未將 Portfolio 08 登錄至首頁資料陣列，未修改全域樣式與腳本。
- `scratch/` 僅作為本機驗證腳本與記錄，不列入 Git 提交。

---

### 七、藝術指導審查事項（Art Direction Notes）

- **SHOT 11 視覺平衡**：人物模糊剪影具備良好的空間尺度引導功能，色調與景深融合自然，未喧賓奪主，文字標籤「人物動線概念示意（非真實訪客攝影）」清楚確立法律與品牌合規防線。
- **SHOT 03 軸測與平面對比**：180 m² 軸測模型與右下角動線流向圖線條俐落，與深色背景之對比度恰到好處，文字大小在行動端（390px 寬度）仍可辨識。
- **SHOT 06、07、08、10、12 色溫協調**：石灰岩之米灰微暖質地與煙燻橡木之深褐色在 2700K–3000K 暖光映襯下具備一致的空間沉靜感。
- **全站零阻斷問題**：無破版、無重疊字、無溢出、無控制台報錯。

正式回報：  
**LINEAR SPACE 08 — PHASE A.1 PATCH VERIFIED / READY FOR ART DIRECTION REVIEW**
