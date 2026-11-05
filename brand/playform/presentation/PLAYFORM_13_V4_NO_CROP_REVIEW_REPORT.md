# FLTL × HOWARD｜CASE 13 PLAYFORM
## V4 視覺母稿審查與缺圖清單報告 (No-Crop Review)

- **審查日期**：2026-11-05
- **審查模式**：`READ-ONLY AUDIT → LOCAL CURATED ASSET REVIEW / ZERO PUSH / ZERO PR / ZERO MERGE / ZERO DEPLOY`
- **當前分支**：`feature/playform-case13-local-v1`
- **當前 Commit**：`5aa0ca6` (HEAD)
- **基準 `origin/main`**：`ab0b1c7`
- **本輪判定結果**：`CASE 13 / V4 SEVEN CURATED BOARDS RECEIVED / VISUAL PRODUCTION HOLD`

---

### 一、執行總覽與治理邊界確認

本輪任務依據主理人工單，接收 `/Users/howard/Desktop/_patch_review/FLTL_PLAYFORM_13_V4_NO_CROP_VISUAL_REVIEW/` 交付素材包，以 **7 張未裁切的新版視覺母稿**（原生 1672 × 941）建立本地獨立審稿畫廊，徹底取代 V3 被強制裁切、重複使用的舊圖版候選；同時建立嚴格的 16 張案例圖版與 16 跨頁繪本插畫**缺圖清單 (Backlog)**。

**關鍵治理與安全邊界**：
1. **零部署承諾 (Zero Push / PR / Merge / Deploy)**：完全隔離於本機，禁止發布至任何遠端分支或 Pages。
2. **白名單隔離**：所有審稿檔案與素材僅收納於 `brand/playform/review/` 與 `brand/playform/presentation/`；完全不覆蓋已完成的本機原型功能，首頁註冊檔案（`js/prototype-projects.js`）與全站導覽維持 100% 凍結。
3. **已發布與未公開作品保護**：CASE 01–12（已正式上架）與 CASE 14–15（未公開案）嚴格凍結。
4. **零裁切展示準則**：所有圖稿均採 `object-fit: contain; width: 100%; height: auto;` 原生比例呈現，絕不使用 `ImageOps.fit()` 或 CSS `cover`/超出隱藏裁切人物、書本、教具或文字。
5. **女兒隱私與角色造型鎖定**：主角維持女兒 Q 版特徵（粉色大蝴蝶結、精緻蕾絲翻領、珊瑚粉洋裝）；嚴禁將女兒的私人照片或個資加入公開 Git 倉庫。

---

### 二、SHA-256 交付檔案校驗表

素材包內 30 個檔案經 `shasum -c SHA256SUMS.txt` 逐檔校驗，**100% 通過驗證 (ALL OK)**：

| 檔案路徑 | SHA-256 雜湊值 | 校驗結果 |
|---|---|---|
| `00_ANTIGRAVITY_CASE13_V4.md` | `026e9dc78d94d25f9e0db236c6d8cce5825c51f2eeefb5c20ec5b505e34c698a` | **OK** |
| `01_ART_DIRECTION_BOARDS/01_CHARACTER_IP.jpg` | `00dbf8a819defe1ae231907949c5e851da75d6b5ff20054627bb0b4987687f9c` | **OK** |
| `01_ART_DIRECTION_BOARDS/01_CHARACTER_IP.png` | `ae40d8e2306125ba031268deaf454102bcd8fb2774b2a9256cc13b2a089865c3` | **OK** |
| `01_ART_DIRECTION_BOARDS/02_PICTURE_BOOK_OBJECT.jpg` | `a35ddb1e3fc44f18de667ff467f929825095cf70853ea5d22b66eac7ec559888` | **OK** |
| `01_ART_DIRECTION_BOARDS/02_PICTURE_BOOK_OBJECT.png` | `43c58d522b2375fa4862f67d61ec55bc04a4c00c2f5a7ca0f70b79d93df97883` | **OK** |
| `01_ART_DIRECTION_BOARDS/03_PICTURE_BOOK_SCENES.jpg` | `cca5c7fdfaebad638f4632767a1d9c6f2693afee104a468368a4f499a3903f75` | **OK** |
| `01_ART_DIRECTION_BOARDS/03_PICTURE_BOOK_SCENES.png` | `f4890d1c6284d339eaa99328d3218f6e94b109d91908b2f28c936faf4c8fc3d9` | **OK** |
| `01_ART_DIRECTION_BOARDS/04_BRIDGE_LEARNING_KIT.jpg` | `522b63d01b1e7c688e1293bbd49766e9733ef096717bc9369f14f3f1519f70cd` | **OK** |
| `01_ART_DIRECTION_BOARDS/04_BRIDGE_LEARNING_KIT.png` | `98d76dea7e8a1cb00cf7afc743dd4221aae77b8f7096ae791f5b151399355a04` | **OK** |
| `01_ART_DIRECTION_BOARDS/05_PRODUCT_ENGINEERING.jpg` | `de80ac298ba5506881db15648bc03c79c32e322b89ec4b5c2a4eca11560c29ce` | **OK** |
| `01_ART_DIRECTION_BOARDS/05_PRODUCT_ENGINEERING.png` | `9e5088707b91f68f034f3b572301d4c85c1faca9df7de9a1222ec3c2b85c4bec` | **OK** |
| `01_ART_DIRECTION_BOARDS/06_CHILD_INTERACTION.jpg` | `045d8e9c8ca0580723f4138cf38f377ba36401e714bf32c3a38165f4bbbad949` | **OK** |
| `01_ART_DIRECTION_BOARDS/06_CHILD_INTERACTION.png` | `0e9c68e3b8bf8f6425a081285db8c8b852e447e6a0db2a4e9a363105230b0193` | **OK** |
| `01_ART_DIRECTION_BOARDS/07_PARENT_TEACHER_PORTAL.jpg` | `a0a7a3f74f3852c54fba09d176ea078f2225a92415dfa1a57f2c652e39dd2586` | **OK** |
| `01_ART_DIRECTION_BOARDS/07_PARENT_TEACHER_PORTAL.png` | `cc9c48f56ad76b16ae83ccbd567c1ac509d0ba8a562d89e1436137d924545ac0` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_BRIDGE_ASSEMBLED.glb` | `4e4b878592d3014390c36effec9ef65e94cb761a3710137aa2a6ccc3744ba8f2` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_BRIDGE_EXPLODED.glb` | `0c01fc573f4e5b19bba21319459faf4e7a4cc8d71680459c98ac31339b3cddbd` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_CHARACTER_TRIO.glb` | `cad16f309b2051976372c8666d1563ef5d2e60c3d12d285623fa345a426673c7` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_INTERACTIVE_PREVIEW.html` | `f168721de8d81530a1048973a290e648a3ec42af96495486dd8ca0eb025b84cc` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_KIT_PACKAGING_CONCEPT.glb` | `09d2b50a3d356a40204f8f78e77f0386b561dd1c7711b643ff898be3cdb2d7c3` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_MASCOT_CELEBRATE_LOOP.gif` | `61916456fb970d214e0d6bf4f45e130bd9cf34de02465a28947418f9f5123229` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_STAR_QBABY_CHARACTER_MAQUETTE_V3.glb` | `080aa026ee4d7713b19ad17bd6159191a3f00240a41ed31b26372b5b3e146f6f` | **OK** |
| `02_INTERACTIVE_AND_3D/PLAYFORM_STORY_LINKED_BRIDGE_DEMO.html` | `3f47e005a73a85316723b20b6f6b6c9bde4507231823b0e82bb8633f9913affc` | **OK** |
| `03_STORY_AND_EDITORIAL/16_CASE_SHOT_SPEC_V1.md` | `ffb549af0239e0d857652d541e2057313bbe2490cab0492c126873ced7eaa8ee` | **OK** |
| `03_STORY_AND_EDITORIAL/16_SPREAD_STORY_SCRIPT_ZH_EN.md` | `8159ede32b377bdc0f0e4d421da3077e9a9f9d30c9bc9e5ab0557edbaf7374ce` | **OK** |
| `04_QA/ASSET_MAPPING.csv` | `d828e499b08b3f496114cad1deebba1da2853f8c88873047e75fc91c8a73d8ac` | **OK** |
| `04_QA/CONTACT_SHEET_07_NO_CROP.jpg` | `1d834780e51458c102c6b5738203e45e6e3d7d508041beda423e36ec198f9766` | **OK** |
| `04_QA/OPEN_LOCAL_PREVIEW.html` | `11e89a404c9850137e93e3adc137f0712a4717a030b3b5f54585c7486682c2b0` | **OK** |
| `04_QA/QA_STATUS.md` | `eaab766873bb1f27b44e59b0de25915142ade63357ebdc4b5a25d9ef721bf3da` | **OK** |
| `README.md` | `84920ebb5a306851244e74e3f890e02753a6e5045eb3d09cba6c37698c7220f6` | **OK** |

---

### 三、7 張視覺母圖逐張人工審查與文字核對

所有母圖規格均為 **1672 × 941 RGB**，經 macOS Vision 框架精準 OCR 掃描與視覺檢視：

#### Board 01｜`01_CHARACTER_IP.png`（主角 IP 三視圖、表情與材質設計）
- **視覺內容**：女兒 Q 版小女孩角色三視圖（正面、側面、四分之三角）與 4 種生動表情（好奇、微笑、驚喜、專注），搭配黃色立體幾何構件與木質底座。
- **文字核對**：標題「PLAYFORM 3D MASCOT DESIGN」字元乾淨無毛邊，無不明文字。
- **保留判定**：**保留作為角色美術指導母版 (ART DIRECTION REF)**。
- **重繪／缺口注意事項**：此為概念渲染板，非具備 Rigging 骨架之可動畫 3D 模型；亦未包含三角色（Lulo、Bem、Pip）同尺度對比。正式 SHOT 03 仍列為 HOLD。

#### Board 02｜`02_PICTURE_BOOK_OBJECT.png`（精裝書裝幀工藝母版）
- **視覺內容**：方形精裝繪本（240×240mm）、深色木桌情境、書脊燙印厚度、攤平跨頁紙質質感。
- **文字核對**：封面與書脊「THE SEVENTH BRIDGE / PLAYFORM PICTURE BOOK」拼寫正確、字型層次分明。
- **保留判定**：**保留作為出版樣書概念母版 (BOOK OBJECT REF)**。
- **重繪／缺口注意事項**：僅展示封面與單一攤平選頁，未包含 16 跨頁實體印刷原檔；正式 SHOT 04（正背封微距工藝）列為 HOLD。

#### Board 03｜`03_PICTURE_BOOK_SCENES.png`（繪本多場景敘事與情節插畫示例）
- **視覺內容**：6 格核心情節關鍵畫面（雨後河水、斷橋困惑、尋找支點、拱橋搭建、過河歡呼）。
- **文字核對**：標題「THE SEVENTH BRIDGE / STORY SPREADS」清晰。
- **保留判定**：**保留作為故事敘事分鏡參考 (STORY SPREADS REF)**。
- **重繪／缺口注意事項**：此為多格合成板 (Montage)，並非 16 張獨立出版級雙跨頁印刷大圖，且畫面內無正式故事雙語段落排版。16 跨頁印刷完稿列為 HOLD。

#### Board 04｜`04_BRIDGE_LEARNING_KIT.png`（教具組件、抽屜外盒與配件情境）
- **視覺內容**：工作桌俯拍，展示抽屜式紙盒、內托凹槽、拱形積木、立柱、任務卡片與成品橋樑。
- **文字核對**：主標「PLAYFORM • LEARNING KIT」清楚；**但人工檢查發現微型標籤存在 AI 生成瑕疵**（如出現無效字元「BPD」、「自本品06」、「RLELEORCN」）。
- **保留判定**：**保留作為教具情境氛圍參考 (KIT PACKAGING REF)**。
- **重繪／缺口注意事項**：微型標籤瑕疵須在正式攝影完稿前修正；實體教具未量產，安全（CNS/EN71）標示不得假冒。正式 SHOT 08 列為 HOLD。

#### Board 05｜`05_PRODUCT_ENGINEERING.png`（產品工程系統與包裝結構）
- **視覺內容**：工業設計爆炸圖，詳細標註構件數量（Bridge Arch Pieces x4 sets, Columns x4, Base Plates x4 等）、三段卡榫邏輯（1. Anchor Fit & Lock, 2. Join Snap Fit, 3. Secure Press Lock）、刀模與環保紙漿內托 (Molded Paper Pulp)。
- **文字核對**：結構說明邏輯嚴密；**但部分次級字樣存在微型拼寫毛邊**（如「Ricid Paperboard」應為 Rigid、「Buid •Lewn」應為 Build Learn）。
- **保留判定**：**保留作為產品結構圖版 (ENGINEERING SPEC REF)**。
- **重繪／缺口注意事項**：圖中零件為設計概念幾何，非模具射出工程 CAD，需修正拼字後方可出圖。正式 SHOT 09、10 列為 HOLD。

#### Board 06｜`06_CHILD_INTERACTION.png`（兒童數位體驗與任務介面）
- **視覺內容**：平板裝置呈現 3D 造橋遊戲、小女孩角色在旁引導、底部大觸控熱區形狀選擇。
- **文字核對**：主標「PLAYFORM / CHILD EXPERIENCE」清晰。
- **保留判定**：**保留作為兒童 UI 概念參考 (CHILD UI CONCEPT REF)**。
- **重繪／缺口注意事項**：此為平面 Mockup，真正可操作行為以本機已實作之 DOM 原型為準；不能以此圖冒充 SHOT 07、10、11、12 四張獨立案圖。

#### Board 07｜`07_PARENT_TEACHER_PORTAL.png`（家長端與教師端生態）
- **視覺內容**：左右對稱展示家長端（Today's Play, Activity Highlights, At-Home Extension）與教師端（Lesson Flow, Classroom Facilitation, Qualitative Assessment）。
- **文字核對**：大標題清晰；平板內文為線框概念示範，未達 2560×1440 正式圖版易讀性。
- **保留判定**：**保留作為成人端後台概念參考 (PORTAL ECOSYSTEM REF)**。
- **重繪／缺口注意事項**：家長與教師後台需嚴格分流，SHOT 14 與 SHOT 15 仍需獨立高清出圖，標記 HOLD。

---

### 四、16 張正式案例圖版缺圖清單 (Case Shots Backlog)

對照 `16_CASE_SHOT_SPEC_V1.md` 逐張核對，**目前 16 張獨立正式作品圖均未達正式出版／商業上架驗收標準**，明確標註現狀與阻擋項：

| SHOT | 正式圖版定義 | 製作類型 | V4 視覺母稿覆蓋度 | 驗收狀態判定 | 待辦事項 |
|---|---|---|---|---|---|
| **SHOT 01** | 品牌整合 Hero（外盒、繪本、橋樑、任務卡 45° 俯視大景） | 3D 模型＋實景攝影合成 | Board 04 部分覆蓋 | **HOLD** | 待整合精裝繪本、成套教具與任務卡大景拍攝合成 |
| **SHOT 02** | 品牌識別系統（深藍底符號結構大圖、反白版、色票、排版邊界） | Illustrator 級向量排版 | 向量母稿完整 | **HOLD** | 待產出 2560×1440 正式橫式／直式視覺規範大圖 |
| **SHOT 03** | 角色 IP 表情動作（三角色各正側背視角、同尺度、至少 5 表情） | 原創插畫＋3D Turntable | Board 01 覆蓋女兒單人 | **PARTIAL / HOLD** | 待加入 LULO、BEM、PIP 三角色同尺度比例對比板 |
| **SHOT 04** | 繪本封面及精裝工藝（單本完整精裝正背封、書脊、布紋燙印） | 產品 3D／寫實材質攝影 | Board 02 覆蓋樣書外觀 | **HOLD** | 待產出正背封完整平鋪與書脊布紋燙印微距特寫 |
| **SHOT 05** | 繪本情節一：河上的空白（雨後斷橋雙跨頁插畫，無 UI 裝置） | 紙雕／繪本插畫 | Board 03 包含小縮圖 | **HOLD** | 待產出獨立 2560×1440 全幅印刷級跨頁插畫 |
| **SHOT 06** | 繪本情節二：一起造橋（廣角跨頁插畫，三角色合作嘗試支撐） | 繪本插畫與開書 Mockup | Board 03 包含小縮圖 | **HOLD** | 待產出獨立 2560×1440 全幅開書實拍質感插畫 |
| **SHOT 07** | 互動繪本閱讀器（手持平板情境，展示可選橋墩位置與微互動） | DOM 介面＋情境攝影 | 本機 DOM 原型已可用 | **PROTOTYPE READY / HOLD** | 待手持平板情境攝影合成 |
| **SHOT 08** | 實體學習盒拆封（工作室俯拍，打開抽屜盒展示分隔內托與零件） | 產品 3D／攝影 | Board 04 覆蓋情境 | **HOLD** | 待修正微型標籤 AI 錯字後產出正式拆封攝影 |
| **SHOT 09** | 3D 結構與拆解（潔淨三維空間，組好橋與爆炸圖並排、軸線標示） | 3D GLB Render | GLB 模型（組裝／拆解）就緒 | **HOLD** | 待以專業渲染器產出高精度並排爆炸圖 |
| **SHOT 10** | 3D 即時建造器（筆電介面顯示可旋轉橋樑、選取零件與組裝狀態） | Three.js / WebGL | 本機 WebGL 原型已就緒 | **PROTOTYPE READY / HOLD** | 待筆電工作情境攝影合成 |
| **SHOT 11** | 兒童形狀任務（結構清晰之形狀選擇遊戲，一個指令一個選擇） | 實作介面與互動狀態 | Board 06 覆蓋概念；DOM 就緒 | **PROTOTYPE READY / HOLD** | 待產出正式高解析操作圖版 |
| **SHOT 12** | 建造測試與錯誤復原（動態圖解：橋面傾斜前／調整支點後雙態） | 3D＋互動操作畫面 | 互動邏輯已於本機實作 | **HOLD** | 待產出結構前後雙狀態對比圖版 |
| **SHOT 13** | 親子實體延伸活動（木桌自然光，照護者與孩子使用實體積木特寫） | 真人情境攝影／合成 | V4 視覺包未包含 | **HOLD** | 待安排照護者與孩子手部實體搭建攝影 |
| **SHOT 14** | 家長端學習回饋（成人雜誌式 Dashboard，本次活動、對話提問） | 功能 UI／RWD | Board 07 覆蓋概念；DOM 就緒 | **PROTOTYPE READY / HOLD** | 待產出成人端高解析雜誌式介面圖版 |
| **SHOT 15** | 教師端課程管理（寬螢幕課表、共讀／實作時段、質性觀察紀錄） | 教師平台 UI／流程 | Board 07 覆蓋概念；DOM 就緒 | **PROTOTYPE READY / HOLD** | 待產出 28 分鐘課程模組高解析介面圖版 |
| **SHOT 16** | 教室情境／品牌最終應用（教室全景，教師與孩子合作搭橋成果） | 教室品牌環境與攝影 | V4 視覺包未包含 | **HOLD** | 待安排教室品牌環境實景合成 |

---

### 五、繪本出版進度：16 個故事跨頁插畫清單

對照 `16_SPREAD_STORY_SCRIPT_ZH_EN.md`，目前僅有腳本文字與動態 SVG 概念圖，**全書 16 個出版級獨立跨頁插畫全數列為 HOLD**：

| 跨頁 | 中文故事正文 | 英文閱讀正文 | 交付狀態 |
|---|---|---|---|
| Spread 01 | 形狀城的雨，滴答滴答，下了一整夜。早晨，小橋不見了。 | Rain tapped on Shape City all night... bridge was gone. | **SVG 概念圖就緒 · 正式出版插畫 HOLD** |
| Spread 02 | 路洛站在岸邊，往前看，又往後看。「要怎麼過去呢？」 | Lulo looked across the river... “How will we get across?” | **HOLD · 待繪製正式插畫** |
| Spread 03 | 「我們先量量看。」比姆拿出小量尺，一步、兩步、三步。 | “Let's measure first,” said Bem... | **HOLD · 待繪製正式插畫** |
| Spread 04 | 琵普滾來一個圓圓的積木。「這個可以嗎？」一路滾向草地。 | Pip brought a round block... rolled away into the grass. | **HOLD · 待繪製正式插畫** |
| Spread 05 | 比姆擺好一塊方方的積木。「如果站在它上面呢？」 | Bem placed a square block... “Could this hold something up?” | **HOLD · 待繪製正式插畫** |
| Spread 06 | 琵普拿起一個三角形。「角角可以連在一起。」 | Pip lifted a triangle. “These corners can meet.” | **HOLD · 待繪製正式插畫** |
| Spread 07 | 「先在兩邊，蓋起橋墩！」路洛和琵普把積木排好。 | “Let's start with supports on both sides!” | **HOLD · 待繪製正式插畫** |
| Spread 08 | 比姆把橋拱慢慢放上去。它像一道微笑，跨過了水面。 | Bem gently placed the arch. It looked like a smile... | **SVG 概念圖就緒 · 正式出版插畫 HOLD** |
| Spread 09 | 橋面放好了。可是，左邊翹了起來。「還不能走！」 | The deck was in place. But one side tipped up. | **HOLD · 待繪製正式插畫** |
| Spread 10 | 他們退後一點，看了又看。「原來橋墩沒有對齊。」 | They stepped back... “The supports aren't lined up.” | **HOLD · 待繪製正式插畫** |
| Spread 11 | 路洛扶住橋拱，比姆調距離，琵普把積木推回正中間。 | Lulo held the arch. Bem adjusted... Pip nudged blocks. | **HOLD · 待繪製正式插畫** |
| Spread 12 | 先放上一塊小積木，沒有晃。再放第二塊，還是穩穩的。 | They tried one little block... Then a second—still steady. | **HOLD · 待繪製正式插畫** |
| Spread 13 | 「我們成功了嗎？」琵普問。比姆說：「還可以再檢查一次。」 | “Did we do it?” asked Pip. Bem smiled. “Let's check...” | **HOLD · 待繪製正式插畫** |
| Spread 14 | 路洛說：「原來，重新試一次，也是一種辦法。」 | “Trying again is part of figuring it out,” said Lulo. | **HOLD · 待繪製正式插畫** |
| Spread 15 | 小橋把兩岸連在一起。路過的人揮揮手說聲謝謝。 | The bridge joined both riverbanks. A traveler waved... | **HOLD · 待繪製正式插畫** |
| Spread 16 | 第二天，形狀城飄來一朵奇怪的雲。「下次要蓋什麼？」 | The next morning, a curious cloud drifted over... | **HOLD · 待繪製正式插畫** |

---

### 六、RWD 與自動化無障礙驗證數據

以 Chrome CDP 自動化測試腳本 (`scratch/test_playform_v4_review.mjs`) 實測 `brand/playform/review/index.html`：

| 視口寬度 | 測試規格 | `scrollWidth` | `innerWidth` | 橫向溢出判定 | 測試結果 |
|---|---|---|---|---|---|
| **1920px** | Desktop Full | 1905px | 1920px | 無 (`hasOverflow: false`) | **PASS** |
| **1440px** | Desktop Standard | 1425px | 1440px | 無 (`hasOverflow: false`) | **PASS** |
| **768px** | Tablet Portrait | 753px | 768px | 無 (`hasOverflow: false`) | **PASS** |
| **390px** | Mobile Standard (iPhone) | 390px | 390px | 無 (`hasOverflow: false`) | **PASS** |
| **320px** | Mobile Small (SE) | 320px | 320px | 無 (`hasOverflow: false`) | **PASS** |

- **主控台錯誤 (Console Errors)**：0 筆。
- **無障礙對比與焦點**：全站具備 `:focus-visible` 高對比外框（3px solid `#E27C44`）；全圖以 `contain` 排版，無任何內容裁切或橫向捲軸。

---

### 七、截圖證據清單 (13 張截圖)

儲存於 [`brand/playform/presentation/evidence-v4-review/`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/)：

1. [`01_v4_review_desktop_1440.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/01_v4_review_desktop_1440.png) — 1440px 審稿頁主視覺與導航
2. [`02_v4_review_desktop_1920.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/02_v4_review_desktop_1920.png) — 1920px 寬螢幕審稿頁佈局
3. [`03_v4_review_tablet_768.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/03_v4_review_tablet_768.png) — 768px 平板直向響應式視圖
4. [`04_v4_review_mobile_390.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/04_v4_review_mobile_390.png) — 390px 手機版無溢位視圖
5. [`05_v4_review_mobile_320.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/05_v4_review_mobile_320.png) — 320px 極窄手機版排版視圖
6. [`board_01_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_01_contain.png) — Board 01 (主角 IP) 完整無裁切檢視
7. [`board_02_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_02_contain.png) — Board 02 (精裝書) 完整無裁切檢視
8. [`board_03_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_03_contain.png) — Board 03 (繪本多場景) 完整無裁切檢視
9. [`board_04_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_04_contain.png) — Board 04 (學習教具組) 完整無裁切檢視
10. [`board_05_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_05_contain.png) — Board 05 (產品工程結構) 完整無裁切檢視
11. [`board_06_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_06_contain.png) — Board 06 (兒童操作介面) 完整無裁切檢視
12. [`board_07_contain.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/board_07_contain.png) — Board 07 (家長與教師後台) 完整無裁切檢視
13. [`backlog_table_inspection.png`](file:///Users/howard/Desktop/Portfolio/brand/playform/presentation/evidence-v4-review/backlog_table_inspection.png) — 16 案例圖版與 16 跨頁腳本缺圖清單表格視圖

---

### 八、素材處置結論：保留項 vs 需重繪／後製項

#### 可以保留（作為設計母稿／美術方向參考）：
- `01_CHARACTER_IP`：女兒 Q 版角色（粉色蝴蝶結、蕾絲領、珊瑚粉洋裝）造形與表情一致性母版。
- `02_PICTURE_BOOK_OBJECT`：精裝方本裝幀厚度與封面視覺母版。
- `03_PICTURE_BOOK_SCENES`：核心故事分鏡與插畫溫暖色調指引。
- `04_BRIDGE_LEARNING_KIT`：教具成套收納與抽屜外盒設計提案。
- `05_PRODUCT_ENGINEERING`：積木構件數量規劃、三段卡榫邏輯與環保紙漿內托方案。
- `06_CHILD_INTERACTION`：兒童遊戲操作介面概念。
- `07_PARENT_TEACHER_PORTAL`：家長質性提問與教師 28 分鐘課程鷹架規劃。

#### 必須重繪／修正／重新製作（正式上架前阻擋項）：
1. **SHOT 01 品牌 Hero 大景**：需正式拍攝／渲染完整外盒、精裝書、組好的一座橋及任務卡之 45° 俯視大景（2560×1440）。
2. **SHOT 02 品牌識別系統大圖**：需產出深藍底之標誌符號、比例網格與色票規範大圖。
3. **SHOT 03 角色尺度對照板**：需將女兒角色與 Lulo、Bem、Pip 三角色置於同一水平線上對齊比例。
4. **SHOT 04 正背封與書脊特寫**：需補足背封條碼、版權標示與布紋燙印之實拍級近景。
5. **SHOT 08、05 微型文字瑕疵修正**：修復包裝盒上之殘缺字元（「BPD」、「自本品06」）與工程圖拼寫（「Ricid」改為 Rigid）。
6. **16 個繪本獨立雙跨頁插畫**：需由插畫師獨立繪製 16 幅出版級全幅手繪插畫（含雙語內文印刷排版）。
7. **SHOT 13、16 實景環境攝影**：需進行真人手部搭建與教室空間環境之實景拍攝合成。

---

### 九、最終狀態

`CASE 13 / V4 SEVEN CURATED BOARDS RECEIVED / VISUAL PRODUCTION HOLD`
**本輪不是發布工單；正式圖版全部通過美術檢查後，才另外進行發布流程。**
