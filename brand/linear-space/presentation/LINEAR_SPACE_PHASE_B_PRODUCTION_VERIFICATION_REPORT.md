# FLTL × HOWARD — LINEAR SPACE / FRAME/01
## PHASE B PRODUCTION RELEASE VERIFICATION REPORT

**發布日期：** 2026-10-22  
**發布狀態：** PRODUCTION VERIFIED (08 OF 15 LIVE)  
**專案名稱：** LINEAR SPACE / FRAME/01 — Urban Gallery & Design Salon  
**性質定位：** 自主建築與空間概念研究（Self-Initiated Architectural Concept / Interior Experience / Environmental Identity）

---

### 1. Git & Deployment Metadata

| 項目 | 記錄 / 連結 |
|---|---|
| **Feature Commit** | `84f88aaf322d920546b2eda9286a74692a294f4b` |
| **Pull Request** | [#19: feat(portfolio08): release LINEAR SPACE FRAME01 architectural concept](https://github.com/fromlifetolines/-Portfolio/pull/19) |
| **Merge Commit** | `c9bd1f8b6330a8496a32c8a504df3fcd06208c6f` (merged to `main`) |
| **Pages Workflow Run** | [Run #39740987102](https://github.com/fromlifetolines/-Portfolio/actions/runs/39740987102) |
| **Workflow 結論** | `SUCCESS` |
| **線上案例網址** | [https://fromlifetolines.github.io/-Portfolio/brand/linear-space/](https://fromlifetolines.github.io/-Portfolio/brand/linear-space/) |
| **根目錄轉址頁** | [https://fromlifetolines.github.io/-Portfolio/portfolio-linear-space.html](https://fromlifetolines.github.io/-Portfolio/portfolio-linear-space.html) |
| **線上首頁** | [https://fromlifetolines.github.io/-Portfolio/](https://fromlifetolines.github.io/-Portfolio/) |

---

### 2. CDN 32/32 資產全碼校驗表（重下載驗證）

所有 16 Master PNG 與 16 Web JPG 均自 GitHub Pages CDN 直接重新下載並逐筆核算 SHA-256 全碼：

| SHOT | 版本 | 格式 | 尺寸 | CDN 實際 SHA-256 全碼 | 判定 |
|---|---|---|---|---|---|
| 01 | LOCKED_A | PNG | 2560×1440 | `46ba3018f288239be39a82207962fdec57f734757d7baaa272b05db137bad90e` | MATCH |
| 01 | LOCKED_A | JPG | 2560×1440 | `d7da34fd1fc1cfc1963d0d51a47dc7669a70672a5cba2bd59b56f0a7b86f1ca1` | MATCH |
| 02 | LOCKED_A | PNG | 2560×1440 | `571dbb8886a931a3d46113e9e076a62884cf9341bf345793a826abc901330b0e` | MATCH |
| 02 | LOCKED_A | JPG | 2560×1440 | `e937e3b579930e04e8dd722b17ff10a6819d16308efaeada3296e6b99ecc64dc` | MATCH |
| 03 | A1_PATCH | PNG | 2560×1440 | `2e68cdda54f8667879407afd86857a217f8acc9312e35363e27ef33999bc12b7` | MATCH |
| 03 | A1_PATCH | JPG | 2560×1440 | `e5f9e61a883530882e5da9c70edf02d0843fb5e924c4b5088516b30fcacf4932` | MATCH |
| 04 | LOCKED_A | PNG | 2560×1440 | `9c8d4f57348d1cb1177b6242c27cf14da31b6a6772d047c608ac3981dce49857` | MATCH |
| 04 | LOCKED_A | JPG | 2560×1440 | `44db6fb0d555e3c5c91a01c469209277cbe7f9662c17194552e3a30fa2f76d66` | MATCH |
| 05 | LOCKED_A | PNG | 2560×1440 | `458217047d75d66b049acc62f2ed7c6a6d8380b98a88db1b889a286354123a6b` | MATCH |
| 05 | LOCKED_A | JPG | 2560×1440 | `dea0b8b5d4dce0c64b22b491296f604ab7b1a40e91ff76dcefd58e2bdf9c5b79` | MATCH |
| 06 | A1_PATCH | PNG | 2560×1440 | `250b6416e3c3fe0ea0f953ce2838205cb4a064b157118bb1636186aaec2b893f` | MATCH |
| 06 | A1_PATCH | JPG | 2560×1440 | `2a4138c51cdfd931a443437906443c1aff6e27ef059d7e60b7c784004634885e` | MATCH |
| 07 | A1_PATCH | PNG | 2560×1440 | `17f552e7558455360f2c3eb5e77619c868c1ce7890a77e1bfa9e2d0197bd40c4` | MATCH |
| 07 | A1_PATCH | JPG | 2560×1440 | `4b27fa256fed8a24728ce09b02d1505f76ed82a7cb4d2fbf4118741f99e14563` | MATCH |
| 08 | A1_PATCH | PNG | 2560×1440 | `7cea8c6a9c314d0cf07b812b0ca88aa8f210ccf7daa1505fcd70b853b388cf1b` | MATCH |
| 08 | A1_PATCH | JPG | 2560×1440 | `bd54f2199d76018e04610a3262c27d0e9751191d34c579c2a5169b0412bbc936` | MATCH |
| 09 | LOCKED_A | PNG | 2560×1440 | `122a25afb4482f4938c89d5073dd70f2fe39c5aedb28faae588329185d84e5b8` | MATCH |
| 09 | LOCKED_A | JPG | 2560×1440 | `05cfcb173040f1389688e02dd83957d06d9f202bbecda995ccfea57405fe9ac9` | MATCH |
| 10 | A1_PATCH | PNG | 2560×1440 | `f5684b19ce7f0aa718a2d211f918316a2073aae66f33eaa2bb0ea949cbc60f8b` | MATCH |
| 10 | A1_PATCH | JPG | 2560×1440 | `1a61ab8bca3375285ca0aeb4285238fbc2f94ca8bb87c2be65b566a307b80bfd` | MATCH |
| 11 | A1_PATCH | PNG | 2560×1440 | `26334412f670301288e7b059859da22ee2000e88c2fb666e8f4611ff21adc0ea` | MATCH |
| 11 | A1_PATCH | JPG | 2560×1440 | `e3c023d1f51ef9359c4c950973c668a7b64493627e0d7ae0fbfce32c9c184976` | MATCH |
| 12 | A1_PATCH | PNG | 2560×1440 | `5ce258727161a47d32ca489f803f437f8a6ff2f5a6faafd935e9a7b270e5a5bb` | MATCH |
| 12 | A1_PATCH | JPG | 2560×1440 | `cec2b8779bf4ec3add02773a420f85ac89a73af28dc2b33c44b11bc1c6469427` | MATCH |
| 13 | LOCKED_A | PNG | 2560×1440 | `483e1c7b8088807c188d986532585a468670e8e231eff1332ee0fe830e422de9` | MATCH |
| 13 | LOCKED_A | JPG | 2560×1440 | `71b11b9a16317a8a10579fce8fa6284cf95a5dd48f9eb15d2631fb7bf4337873` | MATCH |
| 14 | LOCKED_A | PNG | 2560×1440 | `0e32dac27174df442348b86f0e6ec4e8ad8e1066e0295ae6e19188f2f066fc05` | MATCH |
| 14 | LOCKED_A | JPG | 2560×1440 | `977b6060be12c49d5c616f3a8709a2384dfd6923380e79c708d36aaf2ad46564` | MATCH |
| 15 | LOCKED_A | PNG | 2560×1440 | `223d6735d9e58b9f9715714b33e6af58383d0e981807a2d1fef2648a8e96ad1d` | MATCH |
| 15 | LOCKED_A | JPG | 2560×1440 | `9c407049bde3bcfcede939611c9354db97ea36de71b26f7cf350d0f6ee3e4a84` | MATCH |
| 16 | A1_PATCH | PNG | 2560×1440 | `d411767e87e54a65ec4255ca471aa661f491afdd8c400142e78b055e807da7e1` | MATCH |
| 16 | A1_PATCH | JPG | 2560×1440 | `0da46a132b0868d33ab3a511c07ab7c9160d90ef2890511c36759bb0c93a07e6` | MATCH |

**資產總評：32 / 32 全數吻合 (100% PASS)。**

---

### 3. 線上互動功能與規範驗證

1. **空間規格一致性：**
   - 總面積 **180 m²**。
   - 5 大分區精確分配：Entrance (24 m²)、Gallery (64 m²)、Lounge (38 m²)、Consultation (24 m²)、Back-of-house (30 m²)。
   - 空間導覽（Spatial Tour）互動正常，點擊切換各區域即時更新平面圖標示與介紹。

2. **合規性與概念聲明：**
   - **SHOT 10：** 清楚標示為概念木作細節（`CONCEPT DETAIL / NOT A FABRICATION DRAWING`）。
   - **SHOT 11：** 清楚標示為動線概念示意（`HUMAN CIRCULATION CONCEPT (NOT LIVE PHOTOGRAPHY)` / 人物動線概念示意（非真實訪客攝影））。
   - 遵守虛構自主建築與空間研究宣告，無任何施工或法規簽證冒稱。

3. **雙語系統 (i18n)：**
   - 繁體中文（zh-TW）與英文（en）即時切換。
   - 頁面標題、專案陳述、區域細節、板塊名稱與圖說雙語完整對照。

4. **燈箱系統 (Lightbox)：**
   - 點擊任一板塊縮圖立即叫出 2560×1440 Master 原圖。
   - 鍵盤 ESC 退出、方向鍵切換前後圖、焦點管理與 ARIA 屬性完全正常。

5. **首頁整合與 Contact Works V3：**
   - `window.HOWARD_PROJECTS` 登記 8 件發布作品（`order: 8`, `id: 'linear-space'`）。
   - 首頁作品展示網格正確呈現第 8 件作品卡片與封面圖。
   - Contact Works V3 跑馬燈支援 8 件作品三倍循環緩衝（共 24 張卡片平滑無縫滾動）。
   - 對外 GitHub 入口移除成果完全保留（全站 GitHub 外部連結維持 0）。

6. **全站回歸：**
   - 前 7 件已發布案例（NFC、Island Index、FORNO 27、SPLIT 09、ATLAS OPS、NORTHLINE TRADE、FORME LAB）及 About Howard 全部 HTTP 200 正常運作，無樣式回退或排版破裂。

---

### 4. 實測截圖清單 (Live Evidence)

所有實測截圖均自正式線上環境擷取，保存於 `brand/linear-space/presentation/live-evidence/`：
- `01_live_homepage_project08_card.png` — 首頁 LINEAR SPACE 第八件作品卡片
- `02_live_homepage_contact_marquee.png` — Contact Works V3 無限循環展示
- `03_live_desktop_hero.png` — LINEAR SPACE 桌面版 Hero 主視覺
- `04_live_desktop_spatial_tour.png` — 180 m² 空間導覽平面圖
- `05_live_desktop_spatial_tour_gallery.png` — 空間導覽切換至藝廊區 (64 m²)
- `06_live_desktop_card_shot_03.png` — SHOT 03 (A.1 軸測圖) 桌面排版
- `07_live_desktop_card_shot_11.png` — SHOT 11 (A.1 人物動線概念) 桌面排版
- `08_live_desktop_card_shot_16.png` — SHOT 16 (A.1 建築夜景終章) 桌面排版
- `09_live_desktop_lightbox_shot_16.png` — 2560×1440 原稿燈箱檢視
- `10_live_desktop_bilingual_en.png` — 英文介面切換驗收
- `11_live_mobile_390_hero.png` — 手機版 (390px) Hero 與導覽
- `12_live_mobile_390_spatial_tour.png` — 手機版空間導覽無橫向溢出
- `13_live_mobile_390_card_shot_11.png` — 手機版 SHOT 11 概念圖文呈現
