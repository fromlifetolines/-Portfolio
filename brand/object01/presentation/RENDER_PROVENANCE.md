# FLTL × HOWARD｜CASE 14 OBJECT/01 渲染同源技術審計證明書 (RENDER PROVENANCE)

**文件編號**：`FLTL-OBJ01-PROVENANCE-20261107-V2`  
**審計基準**：100% 依據本機參數化 CAD 母型檔案、自動化渲染腳本與 SHA-256 數位雜湊鏈  
**工程狀態**：`CAD GEOMETRY VERIFIED / PACKAGING CONCEPT UNTESTED`

---

## 一、CAD 母型檔案數位身分 (Master 3D CAD Identity)

| 屬性 | 規格參數 |
|---|---|
| **模型檔案名稱** | `brand/object01/assets/3d/OBJECT01_V3_ALIGNED_MASTER.glb` |
| **檔案大小** | `341,252 bytes` |
| **SHA-256 數位簽章** | `7e5373545e36fa9e3204b63a56e34219b1bfec755c9db6a1088686a6eb64575d` |
| **內部座標單位** | 1.0 Unit = 1.0 mm (頂點存取器以毫米為絕對單位，Three.js 載入時以 `scale.set(0.001, 0.001, 0.001)` 換算為世界公尺) |
| **座標系規範** | glTF 2.0 國際標準 (Y-up, 右手座標系) |
| **場景總節點數** | **42 個節點** (Node 00 至 Node 41) |
| **非網格群組節點** | **8 個節點** (Root, 4 大裝配模組, 3 大子裝配) |
| **網格節點數** | **34 個節點** (掛載 `mesh_0` 至 `mesh_33`) |
| **PBR 材質數** | **7 組材質** (`Mat_Shell`, `Mat_Accent`, `Mat_Knob`, `Mat_Fastener`, `Mat_Diffuser`, `Mat_Rubber`, `Mat_Cable`) |

---

## 二、渲染引擎與色彩科學環境 (Rendering Engine & Color Science)

| 環境項目 | 實作規格 |
|---|---|
| **執行環境** | Google Chrome Headless via Playwright Automation |
| **3D 渲染核心** | Three.js r128 (WebGL 2.0 Core) |
| **色彩編碼 (Encoding)**| `THREE.sRGBEncoding` (嚴格符合 Web 色彩管理) |
| **色調映射 (Tone Mapping)**| `THREE.ACESFilmicToneMapping` (電影級高動態範圍壓縮) |
| **曝光補償 (Exposure)** | `1.15` (SHOT 01) / `1.18` (SHOT 08 & SHOT 14) |
| **陰影計算 (Shadows)** | `THREE.PCFSoftShadowMap` (4096 × 4096 高解析深度貼圖，Bias: -0.00008, NormalBias: 0.025) |
| **動態環境貼圖 (PMREM)** | 即時程序化 3-Softbox 攝影棚穹頂環境貼圖 (3200K 主柔光箱 + 5600K 輪廓反光板 + 廣角漫射板) |

---

## 三、各圖版同源渲染與管線追溯清單

### 1. SHOT 01｜主視覺攝影棚視角 (Hero Studio View)

- **生成腳本路徑**：`scratch/render_p0_hero_studio.html` (由 `scratch/build_all_p0_plates.mjs` 自動調用)
- **相機光學參數**：
  - 視角 (FOV)：`28.0°` (等效 135 全片幅 ~80mm 中長焦微距人像鏡頭，完全消除廣角透視畸變)
  - 相機位置 (Camera Position)：`[0.66, 0.40, 0.92]` m
  - 注視目標 (LookAt Target)：`[0.01, 0.23, 0.07]` m
- **燈具姿態與同源對照**：
  - 底座外殼：直接引用 Node 02 (`OBJ-01-A1_base_shell`, mesh_0)，直徑 Ø190.0 mm、厚度 15.0 mm。
  - 調光旋鈕：直接引用 Node 07 子裝配 (Node 08/09/10, mesh_5/6/7)，滾花主體與高光車削襯環同軸裝配於偏心定位點。
  - 垂直立桿：直接引用 Node 13 (`OBJ-01-B1_vertical_mast`, mesh_9)，高 265.0 mm。
  - 雙轉軸耳板：直接引用 Node 14 (下轉軸, mesh_10–16) 與 Node 26 (上轉軸, mesh_20–24)，同軸銷與阻尼飾環皆與母型 1:1 對齊。
  - 燈頭光學艙：直接引用 Node 33 總成 (Node 34/35/36/37/38/39/40, mesh_26–32)，外徑 Ø160.0 mm、厚度 18.0 mm。
  - 編織電源線：直接引用 Node 41 (`OBJ-01-E1_braided_power_cable`, mesh_33)，實體 3D 空間樣條曲線沿夾環引導。
- **輸出資產與 SHA-256**：
  - `brand/object01/assets/case14/shot-01.png` (2560×1440)：`45dfe580153d2072cd982320f594105c18ff99b1ea6478da116b7a0319b053dd`
  - `brand/object01/assets/case14/shot-01.jpg` (1920×1080)：`0cf089edad3c27deeb49c6bce300628307278d0088e3dd6294154be6a14de745`
  - `brand/object01/assets/case14/cover-original-20261107.jpg` (1920×1080)：`0cf089edad3c27deeb49c6bce300628307278d0088e3dd6294154be6a14de745`

---

### 2. SHOT 08｜爆炸裝配與零件拓撲 (Exploded Assembly Plate)

- **生成腳本路徑**：`scratch/render_p0_exploded_studio.html`
- **相機光學參數**：
  - 視角 (FOV)：`28.0°` (等軸側透視視角)
  - 相機位置 (Camera Position)：`[1.10, 0.72, 1.42]` m
  - 注視目標 (LookAt Target)：`[-0.08, 0.35, 0.06]` m (微向左位移以容納右側工程規格資訊側欄)
- **裝配軸線與位移邏輯**：
  - 各構件嚴格沿物理裝配軸線展開（底座組沿 Z 軸下移、立桿沿 Y 軸拉開、懸臂組沿懸臂軸線位移、燈頭組沿頸管軸線展開）。
  - **42 場景節點 / 34 個 Mesh 網格 / 17 功能裝配項** 與 `BOM_NODE_AUDIT.csv` 實現 1:1 雙向溯源對照。
  - 誠實標示 3 大概念預留項 (`BOM-RES-01` 內部鑄鐵配重、`BOM-RES-02` 驅動控制 PCBA、`BOM-RES-03` 高演色 LED 發光模組)，未虛構內部未建模電路。
- **輸出資產與 SHA-256**：
  - `brand/object01/assets/case14/shot-08.png` (2560×1440)：`8493fc7e1f3c74e570dd29e825b4b01d481c336cb611d0501e565e8d5cae0e1c`
  - `brand/object01/assets/case14/shot-08.jpg` (1920×1080)：`e12f00bec947da79cd7c5b585deb343f5bf122dfa5c01a63b8edafcc846e5210`

---

### 3. SHOT 14｜實體包裝與模塑內托 (Packaging Architecture Plate)

- **生成腳本路徑**：`scratch/render_p0_packaging_studio.html`
- **相機光學參數**：
  - 視角 (FOV)：`26.0°` (俯瞰 45° 產品開箱視角)
  - 相機位置 (Camera Position)：`[0.72, 0.95, 1.25]` m
  - 注視目標 (LookAt Target)：`[-0.16, 0.08, 0.0]` m
- **幾何配置與型腔對照**：
  - 外箱尺寸：`436 mm (W) × 336 mm (D) × 62 mm (H)` (B楞 3mm 瓦楞紙盒，內徑 430 × 330 × 56 mm)。
  - 模塑紙漿內托：`410 mm (W) × 310 mm (D) × 50 mm (H)`，脫模斜度 3°，四角圓角 R12mm。
  - 關鍵隔筋厚度 (均經 `PACKAGING_CLEARANCE_CALC.json` 驗算且 ≥ 12.0 mm)：
    - 底座與燈頭中心隔筋：`22.0 mm`
    - 底座與立桿通道隔筋：`18.0 mm`
    - 立桿與懸臂通道隔筋：`16.0 mm`
    - 通道與配件艙隔筋：`12.0 mm`
  - 公差配合標註：
    - 底座型腔 (Ø194 mm vs 零件 Ø190 mm)：直徑公差間隙 +4.0 mm / 單側徑向配合間隙 2.0 mm。
    - 燈頭型腔 (Ø164 mm vs 零件 Ø160 mm)：直徑公差間隙 +4.0 mm / 單側徑向配合間隙 2.0 mm。
  - 狀態聲明：維持標註 `Packaging Concept (未打樣未測試)`，材料標記為「設計目標／待選材」。
- **輸出資產與 SHA-256**：
  - `brand/object01/assets/case14/shot-14.png` (2560×1440)：`98bfdde770b8b386189e4ed102c63fa67279ef9d9adda2c5304046404f80a29d`
  - `brand/object01/assets/case14/shot-14.jpg` (1920×1080)：`5ead5137f33a369debde4ee9b2c3bda306c0c1ebf07b68f2b064cf800db94df6`

---

### 4. SHOT 13｜3D 即時配置器 (WebGL Interactive Configurator)

- **狀態**：**100% 零修改、零覆蓋，保持原狀**。
- **實體圖檔**：
  - `brand/object01/assets/case14/shot-13.png` (2560×1440)：`b9cef5b24928fbf3248433c3ca84da55eac59ffd139cd08780c6ab1d7f721b04`
  - `brand/object01/assets/case14/shot-13.jpg` (1920×1080)：`aa29c8aa958e38400cc3d12dd898b8f0cfceb2db20c9878f4ca284337096b0b2`
- **即時腳本**：`brand/object01/js/object01-3d.js` 載入相同之 `OBJECT01_V3_ALIGNED_MASTER.glb`，確保線上互動配置器與靜態圖版視覺特徵完全統一。

---

## 四、工程誠實邊界聲明 (Fact Boundary Disclosure)

1. **同源幾何驗證範圍**：本證明書僅確認 SHOT 01、08、14 之 3D 幾何特徵、零件比例與裝配拓撲完全同源於 `OBJECT01_V3_ALIGNED_MASTER.glb`。
2. **非量產實體驗證**：三維渲染之高質感光澤、PBR 金屬反射與 RWD 像素通過，不代表本產品已通過實體模具衝壓、陽極氧化封孔、力矩衰減壽命、電氣安全認證（如 CE/UL）或紙箱落摔防震（ISTA-2A）之實物驗收。
3. **未選材與概念標記**：內部鑄鐵配重、PCBA 佈局、高演色 LED 光學透鏡與濕壓模塑紙漿均維持「設計目標待選材」與「Packaging Concept / 未打樣未測試」標記，絕無誇大宣告。
