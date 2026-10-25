# FLTL × HOWARD｜PORTFOLIO 09 — CIRCUIT ENERGY
## PHASE A.2 PHOTOGRAPHIC VISUAL LOCK V3 LOCAL VERIFICATION REPORT

**任務代碼**：P09-CIRCUIT-ENERGY-V3-LOCAL
**執行模式**：`LOCAL ONLY / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY`
**專案目錄**：`/Users/howard/Desktop/Portfolio`
**素材來源**：`/Users/howard/Desktop/_patch_review/CIRCUIT_ENERGY_09_PHOTOGRAPHIC_VISUAL_LOCK_V3_20261025/`
**作業分行**：`feature/circuit-energy-09-photographic-v3-local`（基於 `origin/main` SHA `3adea8c`）
**驗收日期**：2026-10-26 (Asia/Taipei)
**最終判定**：**CIRCUIT ENERGY 09 — PHASE A.2 V3 LOCAL QA VERIFIED / HOLD FOR ART DIRECTION REVIEW**

---

### 一、最高原則與安全隔離審查（Scope & Boundaries）

1. **嚴格本機模式（Zero Push / Zero Merge / Zero Deploy）**：
   - 全程於隔離功能分支 `feature/circuit-energy-09-photographic-v3-local` 執行。
   - 未執行任何 `git push`、未建立任何 PR、未執行任何 `git merge`、未執行 GitHub Pages Deploy。
2. **全站與前八件作品零污染（Zero Core Modifications）**：
   - 經 `git diff origin/main` 檢查，**既有追蹤檔案變更數為 0**。
   - 首頁 `index.html`、`about.html`、`js/prototype-projects.js`、Contact Works V3、以及 Works 01–08 均未被更動。
   - 未將 `id: 'circuit-energy'` 標記為 `published: true`，符合 Phase B 正式發布前之安全隔離要求。
   - 本輪僅建立第九件案例目錄 `brand/circuit-energy/` 及獨立預覽轉址 `portfolio-circuit-energy.html`。
3. **無損素材承諾（No Re-generation / No Cropping / No Flat Vector Regression）**：
   - 嚴格使用指定目錄之 V3 正式素材，不重新生圖、不使用舊版向量插圖、不從 Contact Sheet 切圖。
   - 16 張展示用 PNG 及 16 張 Web JPG 均直接自交付包完整鏡像匯入。

---

### 二、素材來源與 48 筆二進位 SHA-256 密碼學校驗 (100% MATCH)

依據 `04_DOCUMENTS/ASSET_MANIFEST_VISUAL_LOCK_V3.json`，對交付包之原生 PNG、展示 PNG 及 Web JPG 共 48 筆圖檔進行完整 SHA-256 雜湊校驗，全部通過：

| SHOT | 圖檔名稱與語意標題 | 原生解析度<br>(1672×941 PNG) SHA-256 | 正式展示解析度<br>(2560×1440 PNG) SHA-256 | 網站加載圖檔<br>(2560×1440 JPG) SHA-256 | 校驗判定 |
|:---:|---|---|---|---|:---:|
| 01 | **SHOT 01** Hero / Sunset Campus | `dba562fcea5fb60fdb033dd0a10973411d38fed6327a58038bb971d88c4f1b2a` | `977f9578a371eb8fcca0519124a802373e54629c80dceeb3feb4b2e2eefd6ded` | `e58c37170efa509e7f5b9b635f65c99ad7e3a048bf7de96dc879c5ddb311cbb9` | **PASS ✓** |
| 02 | **SHOT 02** Brand Concept / Nature | `a78c6c8238a7e2a3a7fca1a07611bd128e403bf3a44d9987c7244aedb516693b` | `97cb59dcede920cfd4dc9f1462a4359034fbc865e230c050603846e9789925be` | `8c5d60126ee146d2f7a6298af6b8a9d77ac4a60fa64b161984bd79a9ed875d38` | **PASS ✓** |
| 03 | **SHOT 03** System Overview / Campus | `efca5e9f95f8c66d8a6ff11f6e8850c618c4a6b56bf03f753f26c2adff1e042b` | `380459ae0e9e545a251f0bd40308f418604d3449695ffb8df199fd80ea2cf058` | `01bc4b0d54fb12d4352a33467c8210dd57ad748b112e48b6c93ae8247f0632c3` | **PASS ✓** |
| 04 | **SHOT 04** Site & Infrastructure | `025a0eee3f74edb82a418a167fc4ab18abfa1bae0d855ebd950dbae0af6d1df8` | `86a477b3ee83cf17a16f7dfb2711b861537d49ea067385d4617996fb16ea6240` | `5c7686572e7e84937cbc2f2366adfc3223607fbf17d70bc90c64402aa6fe914d` | **PASS ✓** |
| 05 | **SHOT 05** Experience Center | `12c0b14479af60c3855e21b15893fbba6864a5f73245cf322891576961900399` | `755adbcd330576b18eb56d90d69879f24ab16afda68811748aecdef0dc9a6b91` | `4db8f6e710018ee6b787007bd241abdee01aa568e8df1b2daf1b55bba9596632` | **PASS ✓** |
| 06 | **SHOT 06** Visual Identity | `1b667a32a9c9889e27b359f0ed1394217fd6915e0dd998b6e11b2d427fca3c9d` | `b8926804dfd495d30ec921fd0c41af292c79c8a3b5dbb42b3124b51c8699cd6f` | `939e65b49506880a150d2fc22551331d01c0c31677deb92f2b5fc513d19c854a` | **PASS ✓** |
| 07 | **SHOT 07** Data & Monitoring | `196d328198470342b1d5dd4af2875033960947ced027fce639429a34918e707f` | `c35ab1ec37c4b66372c9fe847538e74712832f13c5d6a6996bf5fbd3a7e36b0d` | `5b456897c207bb62354d6111a89d4fe7f5cf373e6d471a186823f8841ef29cf3` | **PASS ✓** |
| 08 | **SHOT 08** Energy Solutions | `bf966094462be0e81e614d38492c660458e98681e1d6845724a6f8ee793f514a` | `84cf78257b923cfc2441680e35293cd368edb6e2448bd958bb3940b537f6d66b` | `24bd8bf495c6ae36bf16976788b4828fabeaf2570ebafc3d4c2af3d4b9d220d7` | **PASS ✓** |
| 09 | **SHOT 09** Application Scenarios | `ac28ccd35797134d9f260b9c33168d0da44218edbc087d5c350ec4942bdda78d` | `418e754b4487d87652064a374e97ac67387ec7bfd164cc82fe3206037ddd7ed0` | `5684d6dc348ebddaf736ef9e7c81adbb9d2287f1bbd42554ed6a3bb93f99593a` | **PASS ✓** |
| 10 | **SHOT 10** PV Product Detail | `a49d5f2bd73e8585f22fd9187ca1fa45f525cbb5e105079107d85005ea69caf7` | `5627640b62608ea6c40c2ce501a0200bab206ad8d0620e54d24ab732e97cbcc0` | `9bd4365c81c312b1f0612c4cb12490e4243bccc67d8ebd2325eea26ac5028a99` | **PASS ✓** |
| 11 | **SHOT 11** Human & Community | `ef86e6bf5ffd7eb61c45dd2b56bbb321588e96ca4c19d1a2c53210ab25651bf8` | `0f3e0c2fec276bb9d857b9e4079fa9a041f1b46a75b41e7ab3c67abf7307ca28` | `beb22fb23c0aacbca40d4f96073121fa85865f8a29785214665e48b05ade17c9` | **PASS ✓** |
| 12 | **SHOT 12** Sustainability Impact | `10991c549f960590e08e7d085dd2e9568aa3e27b67fd774bdc8a5719787896b6` | `3cd89d1e36e5997667af7dccec7fbacdea0d7f6a6afbae66da70d8d7c34672fd` | `a0fc8c08ba4f8eedfb10b624cff76255381ee597e6858702c53cb65feb9e3715` | **PASS ✓** |
| 13 | **SHOT 13** Digital Experience | `66b650181ba8e09580f1f63073913e75dccf37f9b20fa991e6f37631ea0e113a` | `c9a25a1afaa5527a3f41bf8194313513ee7d1baee268efae521281d6f8bf8fef` | `f8d91c803bf521e8267c78f3be730211ccb826c105927f292af2c07b8352f168` | **PASS ✓** |
| 14 | **SHOT 14** Mobile Experience | `026f0fac9f338d11d19b1292f2b2526fabb9743b65b9e3953f68f770e9ce6cac` | `8dd5f1244e6cd49217ec85568f2928d7e68037da5d7bde23bef57cde1685956b` | `5162237d91e1e30b6d153441898f350481f92ef01495ff10eff560b635817715` | **PASS ✓** |
| 15 | **SHOT 15** Project Process | `a1a18c4f7314e154ff86ac6d9e7a904d7e6e3c532d96e1d1a21eb8c2dad5fdb3` | `87549040f9c7ab293bbb30a29f40bf41490a8cc5b0e14a39c4a943e8b6243c9e` | `bf80e113b1b40e826066687a86e1bf41ad640d13319863822db5941033a4fcda` | **PASS ✓** |
| 16 | **SHOT 16** Finale | `422395d864b4e3fa50938aa66805d0b0ff86cebdff9030ab371d45a4be101ace` | `cea72a196082e8e55fd7beb8430ca0ec7a1fdd1ecb79bb3ce2f798b969bf4019` | `22528434c90a251f73b26027e6faef0d23bc03d6db29a55b784b201febee5a85` | **PASS ✓** |

**專案資產庫鏡像審核**：
- `brand/circuit-energy/assets/shots/*.png`（16 筆）與 `brand/circuit-energy/assets/mockups/*.jpg`（16 筆）共 32 筆檔案已由獨立驗證指令確認 100% 符合 SHA-256。
- 專案資產清冊 `brand/circuit-energy/assets/manifest.json` 已正式生成完備。

---

### 三、數據模型、P0 規範與真實性揭露驗收

本專案為自發虛構清潔能源概念提案，嚴格遵循工單 Section D 規範：

1. **顯著首頁概念聲明（Near-Hero Disclosure）**：
   - 於 Hero 標題下方配置顯著雙語聲明卡：
     `自主概念設計｜所有設備、情境與數據均為視覺示意，非實際建置、量測或減碳驗證成果。` /
     `Self-initiated concept. All facilities, dashboards and figures are illustrative; not actual installations, audited performance or verified carbon savings.`
2. **SHOT 07 & SHOT 14 單位澄清與標記**：
   - 圖面標示之 `328.5 MW` 為版面示範數字；MW 屬於功率單位，非發電總量。已於網頁 UI 圖版說明及燈箱圖說中顯著提示：「⚠️ 示意概念：圖中 328.5 MW 為介面版面示範數據。MW 為功率單位非發電總量，非實測數據。」
3. **示範情境數據與圖版數據完全隔離**：
   - 示範情境專用數據（光伏 12 MWp、風力 8 MW、儲能 20 MWh）明定為三種獨立容量單位，未與全網總功率混淆或累加。
4. **能源調度動態模擬數學完全平衡**：
   - **情境 A（日間光伏尖峰）**：
     - 供給：光伏 8.4 MWh ＋ 風能 4.8 MWh ＝ **13.2 MWh**
     - 分配：電網外送 3.4 MWh ＋ 儲能存蓄 2.6 MWh ＋ 負載消耗 7.2 MWh ＝ **13.2 MWh**（供需 100% 平衡）
   - **情境 B（夜間沿海風能增益）**：
     - 供給：日落光伏 4.2 MWh ＋ 風能 9.6 MWh ＝ **13.8 MWh**
     - 分配：電網外送 4.1 MWh ＋ 儲能緩衝 3.1 MWh ＋ 夜間負載 6.6 MWh ＝ **13.8 MWh**（供需 100% 平衡）
5. **虛構指標與技術概念聲明**：
   - SHOT 12 減碳指標（125K t、320 GWh、85K 家戶）均清楚標記為「概念示意數值，非經第三方驗證之 ESG 結果」。
   - SHOT 10 雙面太陽能板爆炸分解圖載明「工業美學分解概念，非製造廠認證之材料工程結構清單」。
   - SHOT 15 專案歷程載明「設計思考歷程概念，非商業客戶統包工程實績」。

---

### 四、網站功能、無障礙與視覺 UI/UX 驗收

1. **16:9 比例與零裁切保證（Containment Fit）**：
   - 全套圖框強制採用 `aspect-ratio: 16 / 9` 與 `object-fit: contain`，背景以碳黑 `#06090B` 接續。
   - 16 張圖版上的所有標題、Logo、圖表數據與附註均完整可讀，無任何被外層邊框遮蔽或裁切現象。
2. **三大多能互補系統探索原型（3-System Selector）**：
   - 支援 Solar（智慧光伏矩陣）、Wind（離岸陸域風能）、Storage（液冷儲能微電網）即時切換。
   - 動態更新高解析圖示、獨立示範容量標籤、核心架構與技術特點。
3. **無障礙全功能燈箱（Accessible Fullscreen Lightbox）**：
   - 點擊任一圖版即載入 2560 × 1440 正式 Master PNG。
   - 支援鍵盤快速鍵：`Escape` 關閉、`ArrowRight` 下一張、`ArrowLeft` 上一張。
   - 具備焦點管理（Focus trap & return），關閉後焦點平順返回原按鈕。
   - 支援 `prefers-reduced-motion`，無突兀過渡。
4. **即時雙語切換（Bilingual Switcher）**：
   - 點擊「中」與「EN」按鈕即時切換全頁文案，並同步更新 `<html lang="zh-Hant">` 與 `<html lang="en">`。
5. **跨裝置自適應與零水平破版**：
   - 桌機（1440×900、1920×1080）與手機端（390×844、375×812）均實測 `scrollWidth <= innerWidth`（零水平捲軸）。
   - 手機端所有互動按鈕與點擊目標高度皆大於或等於 44 CSS px。
6. **主控台零錯誤（Zero Console Errors）**：
   - 實測無任何 Console Error 或未處理之 JavaScript Exception。

---

### 五、正式測試佐證清冊（Evidence Manifest）

本輪產出之截圖與證據檔皆存放於：
`brand/circuit-energy/presentation/evidence-qa/`

| 檔案名稱 | 說明 | 格式 / 尺寸 |
|---|---|:---:|
| `01_desktop_hero_1440.png` | 桌機 Hero 視覺與標題、近首頁聲明與規格條 | PNG (1440×900) |
| `02_desktop_fullpage_1440.png` | 桌機版全頁滾動長截圖 | PNG (1440×7400+) |
| `03_system_01_solar.png` | 三大系統選擇器：01 Solar 光伏矩陣 | PNG (1440×900) |
| `04_system_02_wind.png` | 三大系統選擇器：02 Wind 離岸與陸域風能 | PNG (1440×900) |
| `05_system_03_storage.png` | 三大系統選擇器：03 Storage 液冷儲能 | PNG (1440×900) |
| `06_energy_flow_scenario_A.png` | 能源調度模擬：情境 A 日間光伏尖峰 (13.2 MWh) | PNG (1440×900) |
| `07_energy_flow_scenario_B.png` | 能源調度模擬：情境 B 夜間風能增益 (13.8 MWh) | PNG (1440×900) |
| `08_lightbox_shot_01.png` | 全螢幕燈箱：SHOT 01 Hero 原寸 Master PNG | PNG (2560×1440 畫布) |
| `09_lightbox_shot_07_data_monitoring.png` | 全螢幕燈箱：SHOT 07 監控戰情中心概念 | PNG (2560×1440 畫布) |
| `10_lightbox_shot_10_pv_exploded.png` | 全螢幕燈箱：SHOT 10 雙面太陽能板爆炸分解圖 | PNG (2560×1440 畫布) |
| `11_lightbox_shot_12_sustainability.png` | 全螢幕燈箱：SHOT 12 永續環境影響力指標圖版 | PNG (2560×1440 畫布) |
| `12_lightbox_shot_14_mobile.png` | 全螢幕燈箱：SHOT 14 掌中微電網監控 App | PNG (2560×1440 畫布) |
| `13_lightbox_shot_16_finale.png` | 全螢幕燈箱：SHOT 16 壯闊落日全景收尾 | PNG (2560×1440 畫布) |
| `14_desktop_hero_EN.png` | 英文版狀態：Hero 標題與聲明 | PNG (1440×900) |
| `15_energy_flow_EN.png` | 英文版狀態：能源調度模擬介面 | PNG (1440×900) |
| `16_governance_disclosures_EN.png` | 英文版狀態：專案治理與合規聲明卡 | PNG (1440×900) |
| `17_mobile_hero_390.png` | 手機端 iPhone 視窗 (390×844) Hero | PNG (390×844) |
| `18_mobile_systems_390.png` | 手機端三大發電系統互動區塊 | PNG (390×844) |
| `19_mobile_energy_flow_390.png` | 手機端能源平衡調度模擬器 | PNG (390×844) |
| `20_mobile_gallery_plates_390.png` | 手機端 16 圖版網格與卡片排列 | PNG (390×844) |
| `21_mobile_footer_390.png` | 手機端頁尾與治理合規揭露卡片 | PNG (390×844) |
| `plate_shot_01.png` ~ `plate_shot_16.png` | 16 張獨立展示圖板卡片逐張截圖 | PNG × 16 |

---

### 六、Git 異動審計與分支狀態

```text
$ git status --short
?? brand/circuit-energy/
?? portfolio-circuit-energy.html

$ git diff origin/main
(empty — zero modifications to existing tracked files)
```

- **目前分支**：`feature/circuit-energy-09-photographic-v3-local`
- **遠端關聯**：`origin/main`（SHA: `3adea8c`）
- **發布狀態**：未 Push、未開 PR、未 Merge、未 Deploy。符合 `LOCAL ONLY` 嚴格限制。

---

### 七、最終簽核結論

```text
CIRCUIT ENERGY 09 — PHASE A.2 V3 LOCAL QA VERIFIED / HOLD FOR ART DIRECTION REVIEW
```
