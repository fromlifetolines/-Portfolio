# FLTL × HOWARD｜CASE 14 OBJECT/01 三張候選圖片精準替換與本機審核報告

- **日期**：2026-11-07
- **分支**：`fix/case14-three-candidates-replacement`（Commit：`3ae828e`）
- **來源路徑**：`/Users/howard/Desktop/_patch_review/FLTL_OBJECT01_20261107_3_CANDIDATES_REVIEW_ONLY/`
- **備份目錄**：`/Users/howard/Desktop/_patch_review/CASE14_BACKUP_BEFORE_3_CANDIDATES_20261107/`
- **當前審核狀態**：**ARTWORK HOLD（三張候選圖已於本機精準替換完成，等待總監最終裁定，未覆蓋 main / 未觸發線上部署）**

---

## 一、來源素材校驗與 SHA-256 查核

| 檔案名稱 | 原始解析度 | 交付重採樣尺寸 | SHA-256 驗證結果 | 來源標記 |
|---|---|---|---|---|
| `CASE14_SHOT01_HERO_PRODUCT_STUDIO.jpg` | 1672×941 | 1920×1080 JPG | `a90205ae5537cca2fedc689e0eff8e0dae6c5ffc1c36db57fa0eb5d50c9512f1` | 吻合 (HOLD) |
| `CASE14_SHOT01_HERO_PRODUCT_STUDIO.png` | 1672×941 | 2560×1440 PNG | `4cf2512b1ca7c8cb02d18a38fdac5b623ca00e54bf0f6eded622f85aaaf49914` | 吻合 (HOLD) |
| `CASE14_SHOT08_EXPLODED_STRUCTURE.jpg` | 1672×941 | 1920×1080 JPG | `6d1114201705dce2793c8686aaf4423473ec8d05a27e5059873967f85075dbb5` | 吻合 (HOLD) |
| `CASE14_SHOT08_EXPLODED_STRUCTURE.png` | 1672×941 | 2560×1440 PNG | `8cb22b7d4f02e5e164764e4a9e35df6b6509502a0d0d6ae5bd74a384d4f876ed` | 吻合 (HOLD) |
| `CASE14_SHOT13_PHYSICAL_PACKAGING.jpg` | 1672×941 | 1920×1080 JPG | `e92400ad368790b27548e2b10cc4ae7a68e4e5314764472cbcd500f14f5c4db6` | 吻合 (HOLD) |
| `CASE14_SHOT13_PHYSICAL_PACKAGING.png` | 1672×941 | 2560×1440 PNG | `f5a79a462e917989b53a575b5f69d54025c3af5a755c22a88e82405390872082` | 吻合 (HOLD) |

---

## 二、精準圖位映射與替換結果

| 來源素材 | 替換網站位置 | 格式與畫布 | 關鍵防呆機制 |
|---|---|---|---|
| `CASE14_SHOT01_HERO_PRODUCT_STUDIO.*` | `brand/object01/assets/case14/shot-01.*` | 網頁 JPG 1920×1080 / 燈箱 PNG 2560×1440 | 同步更新 Hero 視圖與首頁作品卡，建立 `cover-original-20261107.jpg` |
| `CASE14_SHOT08_EXPLODED_STRUCTURE.*` | `brand/object01/assets/case14/shot-08.*` | 網頁 JPG 1920×1080 / 燈箱 PNG 2560×1440 | 指向 SHOT 08「模組化爆炸圖」 |
| `CASE14_SHOT13_PHYSICAL_PACKAGING.*` | **`brand/object01/assets/case14/shot-14.*`** | 網頁 JPG 1920×1080 / 燈箱 PNG 2560×1440 | **嚴格防呆：放入 SHOT 14 包裝板，完全保留現行 SHOT 13 之 3D 配置器視覺** |

---

## 三、三張候選素材之逐張判定與物理缺陷清單

### 1. SHOT 01「產品主視覺與概念定位」
- **本機展示驗收**：PASS（首頁作品卡、案例 Hero、SHOT 01 卡片及燈箱無縫對接，桌機 1440×900 與手機 390×844 無裁切溢出）。
- **物理幾何判定**：**HOLD**。
- **具體缺陷與差異**：
  1. 轉軸節點幾何（lower/upper pivot knuckles）之銷孔倒角與耳板厚度，與 CAD 母型 `OBJECT01_V3_ALIGNED_MASTER.glb`（下關節外徑 Ø24mm、軸寬 26mm、軸心銷徑 Ø12mm）略有風格化出入。
  2. 底座邊緣 2.5mm 切削倒角與滾花旋鈕比例，屬於寫實渲染風格，但在嚴苛 CAD 裝配比對上未達 100% 同源同模。
  3. 來源清單明確標示：`Render candidate exists; geometry mismatch: HOLD`。

### 2. SHOT 08「完整整燈爆炸圖」
- **本機展示驗收**：PASS（卡片清晰展示爆炸圖，燈箱開展 2560×1440 PNG）。
- **物理幾何判定**：**HOLD**。
- **具體缺陷與差異**：
  1. 爆炸圖畫面呈現之緊固件、散熱片與內部彈簧結構，超出 V3 GLB 目前建構的 16 個主節點（GLB 內配重與電路基板為未建模預留項）。
  2. 裝配軸線與網站 Tab 03 規範之 `OBJECT01_PARTS_SPEC.json` 缺少一對一零件編號刻度。
  3. 來源清單明確標示：`Candidate exists, component mapping unverified: HOLD`。

### 3. SHOT 14「包裝結構與模組收納」（來源檔名 SHOT13）
- **本機展示驗收**：PASS（精確映射至網站 SHOT 14，未污染 SHOT 13 3D 配置器）。
- **物理幾何判定**：**HOLD**。
- **具體缺陷與差異**：
  1. 紙漿模塑內托之實體型腔，為設計概念展示；尚未依照拆解後零件的剛性外框（底座 Ø190mm × 15mm、燈頭 Ø160mm × 18mm、立桿長 265mm、懸臂長 240mm）進行精確公差容積驗算。
  2. 尚未進行真實紙材打樣與落摔測試（Drop Test）。
  3. 來源清單明確標示：`Candidate exists, physical fit unverified: HOLD`。

---

## 四、本機前端與 RWD 實測結果

- **測試環境**：Node.js + Playwright + Google Chrome Headless 於 `http://127.0.0.1:8199/`
- **桌機視窗 (1440×900)**：
  - 首頁 CASE 14 作品卡：正常載入 `shot-01.jpg`，橫向溢出 `0px`（PASS）
  - 案例 Hero 視覺：正常載入 `shot-01.jpg`，橫向溢出 `0px`（PASS）
  - SHOT 01 / 08 / 14 燈箱：開啟後正確呈現 2560×1440 PNG，ESC 與關閉鈕響應正常（PASS）
  - SHOT 13 保留：標題「3D 配置器視覺規劃」，圖片為配置器介面圖（PASS）
- **手機視窗 (390×844)**：
  - 全頁橫向捲軸：`scrollWidth === innerWidth`（0px 橫向溢出，PASS）
  - 圖卡堆疊：卡片上下間距與字級排版均勻，無截斷（PASS）
- **雙語切換**：繁體中文與英文切換無破版，標題說明完整保留。

---

## 五、執行原則與後續指示

依據工單最高準則：
1. **禁止宣稱未完工素材為 PASS**：如實回報 3 張候選圖片幾何不完全一致之客觀事實。
2. **守門原則**：本機已於專用分支 `fix/case14-three-candidates-replacement` 完成完整替換與預覽驗收；**在總監裁示前，絕不私自合併 main 或推送到線上**。
3. **CASE 15**：嚴格維持 **HOLD**，無任何更動。
4. **其他作品集 01–13**：100% 零更動。

