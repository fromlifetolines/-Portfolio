# FLTL × HOWARD｜CASE 14 OBJECT/01 P0 報告數值修正與同源審計交付報告

**文件編號**：`FLTL-OBJ01-P0-REFINEMENT-AUDIT-20261107-V2`  
**審計基準**：依據創意總監 2026-11-07 之《P0 報告數值修正與正式發布閘門》審核意見全面閉環  
**工作模式**：**LOCAL ONLY / ARTWORK REFINEMENT / ZERO DEPLOY**  
**工作分支**：`fix/case14-three-candidates-replacement` (保留 Commit `550f559` 歷史，新建修復提交)  
**當前決議**：**HOLD；禁止 PR／Merge／Deploy。本機審計數據與資產已全數修正閉環，等待總監最後複驗後授權發布。**

---

## 一、創意總監 7 大 P0 阻擋問題逐項閉環修復清冊

針對 2026-11-07 創意總監指出之 7 項阻擋缺陷，本機已全部完成數學重算、CAD 數據提取、工程圖繪製與資產重新渲染，嚴禁使用未經驗證之推論：

### 1. 節點數不一致問題：建立 1:1 完整節點清冊 (`BOM_NODE_AUDIT.csv`)
- **缺陷覆核**：先前報告混淆了「場景圖節點 (Scene Nodes)」、「網格實體 (Mesh Primitives)」與「功能裝配清單 (BOM Items)」，稱「16 個真實節點」卻列出 17 項。
- **程式化實測結果**（程式解析 `OBJECT01_V3_ALIGNED_MASTER.glb`，SHA-256: `7e537354...`）：
  - **總場景節點 (Scene Nodes)**：**42 個節點** (Index 00 至 41)。
  - **空變換／模組群組節點 (Non-Mesh Group Nodes)**：**8 個節點** (Node 00 根節點、Node 01 底座模組、Node 07 旋鈕子裝配、Node 12 立桿模組、Node 14 下轉軸子裝配、Node 22 懸臂模組、Node 26 上轉軸子裝配、Node 33 燈頭模組)。
  - **實體網格節點 (Mesh Nodes)**：**34 個節點** (掛載 `mesh_0` 至 `mesh_33`)。
  - **功能裝配清冊 (Functional BOM Hardware Items)**：**17 項功能裝配總成**（含底座外殼、倒角環、底墊、立桿、上下轉軸總成、懸臂管、頸管、光學艙各層組件及外部編織電源線）。
  - **概念預留項 (Concept Reservations)**：**3 項**（`BOM-RES-01` 內部配重塊、`BOM-RES-02` 驅動控制 PCBA、`BOM-RES-03` 高演色 LED 發光模組），標註為內部空間預留，未虛構 3D 模型。
- **交付檔案**：已自動匯出完整 CSV 清冊：[`brand/object01/presentation/BOM_NODE_AUDIT.csv`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/BOM_NODE_AUDIT.csv)。

---

### 2. 隔筋算式錯誤：重算真實幾何排樣 (`PACKAGING_CLEARANCE_CALC.json`)
- **缺陷覆核**：先前報告聲稱 `(380 - 194 - 164) / 3 = 22 mm`，此為嚴重算術錯誤。在 380 mm 外箱中實際為 `22 / 3 = 7.33 mm`；若在 374 mm 內托中僅有 `16 / 3 = 5.33 mm`，絕無可能聲稱「三段隔筋皆 ≥12 mm」。
- **修正架構與計算閉環**：
  - 若採原 374 mm 單層托盤，底座與燈頭橫向同列排樣在物理上無法達成 ≥12 mm 模塑紙漿隔筋標準。
  - **正式方案 (加大單層展開托盤，Enlarged Flat-Pack)**：
    - 外箱外徑：`436 mm (寬) × 336 mm (深) × 62 mm (高)`
    - 瓦楞紙箱內徑：`430 mm × 330 mm × 56 mm` (B楞 3.0mm 單瓦楞)
    - 紙漿內托外徑：`410 mm × 310 mm × 50 mm`
    - 型腔排樣配置：底座腔 (Ø194 mm, X: 20~214 mm) 與燈頭腔 (Ø164 mm, X: 236~400 mm)。
    - **中心橫向隔筋實算**：`X_min_head (236.0) - X_max_base (214.0) = 22.0 mm`！(**真正達成 ≥12.0 mm 標準**)。
    - **底座至立桿通道隔筋**：`Y_min_mast (232.0) - Y_max_base (214.0) = 18.0 mm` (**≥ 12.0 mm**)。
    - **立桿至懸臂通道隔筋**：`Y_min_arm (272.0) - Y_max_mast (256.0) = 16.0 mm` (**≥ 12.0 mm**)。
    - **構件至配件隔艙隔筋**：`X_min_acc (322.0) - X_max_mast (310.0) = 12.0 mm` (**≥ 12.0 mm**)。
  - **備選方案 (雙層分載嵌套托盤，Dual-Tier Nested)**：外箱 `390 × 330 × 90 mm`，下層專收 2.2kg 重型底座與適配器（四周隔筋 > 30mm），上層懸浮收納精密光學燈頭與管件，徹底杜絕運輸重件撞擊光學頭之風險。
- **交付檔案**：已輸出全量參數 JSON：[`brand/object01/presentation/PACKAGING_CLEARANCE_CALC.json`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/PACKAGING_CLEARANCE_CALC.json)。

---

### 3. 箱體緩衝錯誤：校正真實外箱／內托周邊防震間距
- **缺陷覆核**：先前報告外箱 380×320 mm、內托 374×314 mm，每側僅 `(380−374)/2 = 3 mm`，扣掉紙板厚度緩衝為零，卻虛構聲稱「外緣緩衝 16 mm」。
- **修正規格**：
  - **紙箱外徑**：`436 mm (W) × 336 mm (D) × 62 mm (H)`
  - **紙板規格**：B楞 3-ply 瓦楞紙板，厚度 `3.0 mm`
  - **紙箱內徑**：`430 mm (W) × 330 mm (D) × 56 mm (H)`
  - **紙漿內托外徑**：`410 mm (W) × 310 mm (D) × 50 mm (H)`
  - **真實周邊緩衝層間隔**：
    - 左右兩側各留：`(430 - 410) / 2 = 10.0 mm` 專用防震潰縮餘裕。
    - 前後兩側各留：`(330 - 310) / 2 = 10.0 mm` 專用防震潰縮餘裕。
    - 上下垂直方向：`56 - 50 = 6.0 mm` (加襯防刮 EPE 泡棉薄墊)。
  - 徹底剔除「16 mm 緩衝」之不實描述，依實體公稱尺寸完整交代壁厚與間隙。

---

### 4. 公差單位錯置：全面校正為直徑公差與徑向單側間隙
- **缺陷覆核**：先前將 Ø190 mm 零件放入 Ø194 mm 型腔寫為「徑向 +4 mm」，混淆了直徑差與徑向單側間隙。
- **全站文檔與圖版修正規範**：
  - **底座裝配配合**：公稱直徑 Ø190.0 mm 放入 Ø194.0 mm 型腔，標註為 **直徑公差間隙 +4.0 mm / 單側徑向配合間隙 2.0 mm**，雙側開闢 20×30mm 取件指槽。
  - **燈頭裝配配合**：公稱外徑 Ø160.0 mm 放入 Ø164.0 mm 型腔，標註為 **直徑公差間隙 +4.0 mm / 單側徑向配合間隙 2.0 mm**，開闢 14×50mm 頸管避位槽。
  - **立桿與懸臂通道配合**：長度方向各預留 +25.0 mm / +35.0 mm 軸向裝卸裕度。

---

### 5. 包裝容積空間配置：提交 2D 俯視排樣與無碰撞工程圖 (`PACKAGING_TOP_VIEW_MM.svg`)
- **缺陷覆核**：僅有文字表格無法證明所有零件能同時收納入托盤且互不干涉。
- **交付工程圖**：已以 1:2.0 精密比例繪製符合 ISO 規範之 2D 俯視工程向量排樣圖：
  [`brand/object01/presentation/PACKAGING_TOP_VIEW_MM.svg`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/PACKAGING_TOP_VIEW_MM.svg)。
- **圖面內容與空間排樣驗證**：
  - 完整標明外箱外廓 (436×336)、內箱邊界 (430×330)、紙漿托盤邊界 (410×310)。
  - 明確畫出 5 大型腔之精確座標中心與邊界輪廓（底座 Ø194、燈頭 Ø164、立桿通道 290×24、懸臂通道 275×22、配件隔艙 75×62）。
  - 將 3D 母型零件線框實體嵌套於腔體內，標示 2.0 mm 徑向間隙與指槽。
  - 清楚引線標註所有隔筋（22.0 mm, 18.0 mm, 16.0 mm, 12.0 mm），**幾何上 100% 無任何重疊與碰撞**。

---

### 6. 材料與測試聲明更正：全數標註為「設計目標／待選材」與「概念未測試」
- **缺陷覆核**：先前聲明之「100% Recycled Post-Consumer」、「Type 3 工業級」、「30W 適配器」、「≥12 mm 強度標準」未有第三方認證與供應商依據。
- **修復措施**：
  - 全站圖版與技術文檔一律標註為：**`設計目標／待選材 (Design Target / Material Selection Pending)`**。
  - 維持明確警示框：**`Packaging Concept / 未打樣未測試`**。
  - 誠實聲明：本案未進行真實模具壓鑄打樣、未進行 ISTA-2A 落摔震動測試與電氣安規驗證，純屬工業設計幾何裝配與造型提案。

---

### 7. 渲染同源技術審計證明書 (`RENDER_PROVENANCE.md`)
- **缺陷覆核**：缺少可追溯之腳本執行環境、GLB 哈希鏈與相機座標。
- **交付檔案**：已建立專屬證明書：[`brand/object01/presentation/RENDER_PROVENANCE.md`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/RENDER_PROVENANCE.md)。
- **同源鏈條摘要**：
  - 統一母型：`brand/object01/assets/3d/OBJECT01_V3_ALIGNED_MASTER.glb` (SHA-256: `7e537354...`)。
  - 座標單位：1 Unit = 1.0 mm (Three.js 透過 `scale(0.001)` 嚴格換算為世界公尺)。
  - 腳本與相機：
    - SHOT 01：`scratch/render_p0_hero_studio.html`，相機 FOV 28.0°，等效 80mm 中長焦微距人像鏡頭。
    - SHOT 08：`scratch/render_p0_exploded_studio.html`，等軸側視角展開 34 Mesh / 17 功能裝配項。
    - SHOT 14：`scratch/render_p0_packaging_studio.html`，45° 俯瞰開箱視角呈現 410×310 mm 紙漿托盤。
  - 色彩科學：Three.js r128、`ACESFilmicToneMapping`、4096×4096 軟陰影、程序化 3-Softbox HDR Studio Dome。

---

## 二、正式交付資產清單與數位 SHA-256 雜湊表

| 資產路徑 | 尺寸與格式 | 最新 SHA-256 數位簽章 | 狀態說明 |
|---|---|---|---|
| `brand/object01/assets/case14/shot-01.png` | 2560×1440 PNG | `45dfe580153d2072cd982320f594105c18ff99b1ea6478da116b7a0319b053dd` | SHOT 01 燈箱高畫質母圖 |
| `brand/object01/assets/case14/shot-01.jpg` | 1920×1080 JPG | `0cf089edad3c27deeb49c6bce300628307278d0088e3dd6294154be6a14de745` | SHOT 01 網站版與案例 Hero |
| `brand/object01/assets/case14/cover-original-20261107.jpg` | 1920×1080 JPG | `0cf089edad3c27deeb49c6bce300628307278d0088e3dd6294154be6a14de745` | 首頁作品卡封面 (與 Hero 100% 同源) |
| `brand/object01/assets/case14/shot-08.png` | 2560×1440 PNG | `8493fc7e1f3c74e570dd29e825b4b01d481c336cb611d0501e565e8d5cae0e1c` | SHOT 08 爆炸圖燈箱高畫質圖版 (17 BOM / 34 Mesh) |
| `brand/object01/assets/case14/shot-08.jpg` | 1920×1080 JPG | `e12f00bec947da79cd7c5b585deb343f5bf122dfa5c01a63b8edafcc846e5210` | SHOT 08 網站版卡片圖 |
| `brand/object01/assets/case14/shot-14.png` | 2560×1440 PNG | `98bfdde770b8b386189e4ed102c63fa67279ef9d9adda2c5304046404f80a29d` | SHOT 14 包裝圖版燈箱母圖 (校正 22mm 隔筋與徑向間隙) |
| `brand/object01/assets/case14/shot-14.jpg` | 1920×1080 JPG | `5ead5137f33a369debde4ee9b2c3bda306c0c1ebf07b68f2b064cf800db94df6` | SHOT 14 網站版包裝卡片圖 |
| `brand/object01/assets/case14/shot-13.png` | 2560×1440 PNG | `b9cef5b24928fbf3248433c3ca84da55eac59ffd139cd08780c6ab1d7f721b04` | **100% 完全保留原版 3D 配置器視覺，零修改** |
| `brand/object01/assets/case14/shot-13.jpg` | 1920×1080 JPG | `aa29c8aa958e38400cc3d12dd898b8f0cfceb2db20c9878f4ca284337096b0b2` | **100% 完全保留原版 3D 配置器視覺，零修改** |

---

## 三、本機全功能視覺驗收與 RWD 實測結果 (Playwright 自動化測試)

測試執行於 `http://127.0.0.1:8199/`，完整測試結果已存入 [`brand/object01/presentation/evidence-p0-refinement/qa_report.json`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/evidence-p0-refinement/qa_report.json)：

| 檢驗項目 | 測試視窗與環境 | 驗證指標 | 判定結果 |
|---|---|---|:---:|
| **首頁作品卡 (CASE 14)** | 桌機 1440×900 | 引用 `cover-original-20261107.jpg`，與 Hero 完全同源 | **PASS** |
| **首頁橫向溢出** | 桌機 1440×900 | `scrollWidth <= innerWidth` (溢出: 0px) | **PASS** |
| **首頁手機版** | 手機 390×844 | 響應式佈局正常無破版 (溢出: 0px) | **PASS** |
| **CASE 14 案例 Hero** | 桌機 1440×900 | 完美渲染，無拉伸或像素模糊 | **PASS** |
| **CASE 14 畫廊卡片總數** | 桌機 1440×900 | 剛好 16 張卡片，編號 01 至 16 嚴格有序 | **PASS** |
| **SHOT 01 卡片與燈箱** | 桌機 1440×900 | 卡片載入 JPG，點擊燈箱開啟 2560×1440 PNG | **PASS** |
| **SHOT 08 卡片與燈箱** | 桌機 1440×900 | 爆炸圖完整呈現 17 項 BOM 清單與概念預留框 | **PASS** |
| **SHOT 13 3D 配置器** | 桌機 1440×900 | 保留為第 13 張圖版，標題「3D 配置器視覺規劃」 | **PASS** |
| **SHOT 14 包裝收納** | 桌機 1440×900 | 第 14 張圖版「包裝結構與模組收納」，燈箱開啟正常 | **PASS** |
| **CASE 14 桌機橫向溢出** | 1440×900 視窗 | `1440px <= 1440px` (溢出: 0px) | **PASS** |
| **CASE 14 手機橫向溢出** | 390×844 視窗 | `390px <= 390px` (溢出: 0px) | **PASS** |
| **中英雙語切換** | 繁中 ⟷ 英文切換 | 標題、說明與警告欄位全數正常無文字重疊 | **PASS** |

實測 18 張截圖與證據清單已保存於：  
[`brand/object01/presentation/evidence-p0-refinement/`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/evidence-p0-refinement/)

---

## 四、工作邊界與嚴格守門原則確認

1. **分支狀態**：本機專用分支 `fix/case14-three-candidates-replacement`，保留 Commit `550f559`，新增本輪數值與同源修復提交。**絕未執行 rebase、reset 或破壞既有 Git 歷史**。
2. **遠端發布狀態**：**ZERO DEPLOY**。絕未向 GitHub 發起 PR，絕未合併至 `main`，絕未推送遠端觸發 GitHub Pages 部署。
3. **CASE 15 狀態**：**STRICTLY HOLD**。未碰觸任何 CASE 15 相關程式碼、設定檔或素材目錄。
4. **其他作品集狀態**：CASE 01 至 CASE 13 全部檔案 **100% 保持原樣，零修改**。
5. **SHOT 13 狀態**：**100% 保持原樣，零修改**。

---

## 五、待裁決事項 (Pending Art Director Verdict)

本報告及所附之 4 大審計附件：
1. [`BOM_NODE_AUDIT.csv`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/BOM_NODE_AUDIT.csv)
2. [`PACKAGING_CLEARANCE_CALC.json`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/PACKAGING_CLEARANCE_CALC.json)
3. [`PACKAGING_TOP_VIEW_MM.svg`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/PACKAGING_TOP_VIEW_MM.svg)
4. [`RENDER_PROVENANCE.md`](file:///Users/howard/Desktop/Portfolio/brand/object01/presentation/RENDER_PROVENANCE.md)

已徹底修正所有數學、公差單位、節點對應與材料聲明缺陷。  
**現維持決議：HOLD**。靜候 Howard / 創意總監核閱畫面細節與數值清冊；在獲得明確上架指令前，絕不擅自執行發布。
