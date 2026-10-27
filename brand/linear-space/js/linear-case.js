/**
 * LINEAR SPACE / FRAME/01 — CASE STUDY INTERACTIVE LOGIC
 * FLTL × HOWARD HUANG | PORTFOLIO 08 | PHASE A
 * Modules: 16-Plate Grid, Fullscreen Lightbox, Interactive Spatial Tour, Bilingual Switcher
 */

(() => {
  'use strict';

  // 16 Approved Official Shots Data
  const SHOTS = [
    {
      num: 1,
      slug: 'ARCHITECTURAL_HERO',
      png: 'SHOT_01_ARCHITECTURAL_HERO.png',
      jpg: 'shot-01.jpg',
      zh: '建築外觀主視覺',
      en: 'Architectural Hero',
      subZh: '量體、石灰岩與暮光夜景',
      subEn: 'Massing, limestone & dusk illumination'
    },
    {
      num: 2,
      slug: 'BRAND_CONCEPT',
      png: 'SHOT_02_BRAND_CONCEPT.png',
      jpg: 'shot-02.jpg',
      zh: '品牌定位與空間哲學',
      en: 'Brand Concept & Spatial Philosophy',
      subZh: '以空間，形塑品牌的日常',
      subEn: 'Spaces for people and brands'
    },
    {
      num: 3,
      slug: 'SPACE_PLANNING',
      png: 'SHOT_03_SPACE_PLANNING.png',
      jpg: 'shot-03.jpg',
      zh: '空間規劃與軸測分區 (180 m²)',
      en: 'Spatial Planning & Isometric Zoning (180 m²)',
      subZh: '五大機能區塊與平整動線配置',
      subEn: 'Five functional zones & seamless circulation'
    },
    {
      num: 4,
      slug: 'EXTERIOR',
      png: 'SHOT_04_EXTERIOR.png',
      jpg: 'shot-04.jpg',
      zh: '建築立面與沉靜入口',
      en: 'Architectural Facade & Quiet Arrival',
      subZh: '石灰岩牆體、水景倒影與暖光',
      subEn: 'Stone facade, water reflection & warm light'
    },
    {
      num: 5,
      slug: 'INTERIOR_OVERVIEW',
      png: 'SHOT_05_INTERIOR_OVERVIEW.png',
      jpg: 'shot-05.jpg',
      zh: '中央展示藝廊全景',
      en: 'Central Gallery Overview',
      subZh: '通透挑高、漫射採光與展陳島台',
      subEn: 'High ceiling, diffused daylight & display islands'
    },
    {
      num: 6,
      slug: 'MATERIAL_PALETTE',
      png: 'SHOT_06_MATERIAL_PALETTE.png',
      jpg: 'shot-06.jpg',
      zh: '四重核心材質庫研究',
      en: 'Four-Core Material Library',
      subZh: '石灰岩、煙燻橡木、霧黑金屬、霧面玻璃',
      subEn: 'Limestone, smoked oak, matte metal, frosted glass'
    },
    {
      num: 7,
      slug: 'LIGHTING_DESIGN',
      png: 'SHOT_07_LIGHTING_DESIGN.png',
      jpg: 'shot-07.jpg',
      zh: '建築照明策略 (2700–3000K)',
      en: 'Architectural Lighting Strategy (2700–3000K)',
      subZh: '光作為建築元素與漫射色溫',
      subEn: 'Light as an element & calibrated color temperature'
    },
    {
      num: 8,
      slug: 'RETAIL_DISPLAY',
      png: 'SHOT_08_RETAIL_DISPLAY.png',
      jpg: 'shot-08.jpg',
      zh: '展演陳列與沉靜動線',
      en: 'Display as Experience',
      subZh: '模組化展具與選品導向動線',
      subEn: 'Modular fixtures & curated circulation'
    },
    {
      num: 9,
      slug: 'WAYFINDING_SYSTEM',
      png: 'SHOT_09_WAYFINDING_SYSTEM.png',
      jpg: 'shot-09.jpg',
      zh: '環境導視與標誌系統',
      en: 'Environmental Wayfinding System',
      subZh: '建築字體、立體標示與指引層級',
      subEn: 'Architectural signage & wayfinding hierarchy'
    },
    {
      num: 10,
      slug: 'FURNITURE_DETAIL',
      png: 'SHOT_10_FURNITURE_DETAIL.png',
      jpg: 'shot-10.jpg',
      zh: '訂製家具與概念木作細節',
      en: 'Quiet Joinery & Custom Furniture (Schematic Concept)',
      subZh: '示意性家具木作概念，非實際施工工程圖',
      subEn: 'Schematic furniture joinery (not fabrication engineering)'
    },
    {
      num: 11,
      slug: 'HUMAN_EXPERIENCE',
      png: 'SHOT_11_HUMAN_EXPERIENCE.png',
      jpg: 'shot-11.jpg',
      zh: '人物動線概念示意（非真實訪客攝影）',
      en: 'Human Circulation Concept (Not Live Photography)',
      subZh: '人本空間節奏與動線示意圖版',
      subEn: 'Conceptual movement visualization & spatial flow'
    },
    {
      num: 12,
      slug: 'DETAIL_CRAFT',
      png: 'SHOT_12_DETAIL_CRAFT.png',
      jpg: 'shot-12.jpg',
      zh: '材質工藝與收邊細節',
      en: 'Material Meets Precision',
      subZh: '收邊金屬、石材接縫與木質紋理',
      subEn: 'Metal transitions, stone joints & wood grain'
    },
    {
      num: 13,
      slug: 'DIGITAL_EXPERIENCE',
      png: 'SHOT_13_DIGITAL_EXPERIENCE.png',
      jpg: 'shot-13.jpg',
      zh: '數位展演桌機介面',
      en: 'Desktop Digital Experience',
      subZh: '建築概念的線上延伸與預約介面',
      subEn: 'Online architectural extension & digital showcase'
    },
    {
      num: 14,
      slug: 'MOBILE_EXPERIENCE',
      png: 'SHOT_14_MOBILE_EXPERIENCE.png',
      jpg: 'shot-14.jpg',
      zh: '行動端自適應體驗',
      en: 'Responsive Mobile Experience',
      subZh: '指尖上的空間導覽與掌中展覽',
      subEn: 'Spatial exploration & mobile narrative'
    },
    {
      num: 15,
      slug: 'DESIGN_PROCESS',
      png: 'SHOT_15_DESIGN_PROCESS.png',
      jpg: 'shot-15.jpg',
      zh: '設計研究與發展歷程',
      en: 'Design Process & Evolution',
      subZh: '調研、空間定調、材質精煉至視覺呈現',
      subEn: 'Research, spatial layout, materiality & presentation'
    },
    {
      num: 16,
      slug: 'FINAL_SHOWCASE',
      png: 'SHOT_16_FINAL_SHOWCASE.png',
      jpg: 'shot-16.jpg',
      zh: '完整品牌空間系統總覽',
      en: 'Final Brand & Architecture Showcase',
      subZh: '實體空間、環境識別與數位媒介整合',
      subEn: 'Synthesizing space, environment & digital medium'
    }
  ];

  // 5 Spatial Tour Zones (Total = 180 m²)
  const ZONES = [
    {
      id: 'z-entry',
      num: '01',
      code: 'ENTRANCE',
      area: 24,
      zhTitle: '入口沉靜迎賓玄關',
      enTitle: 'Quiet Arrival & Entry Threshold',
      zhSub: '自都會喧囂過渡至內斂空間的儀式起點',
      enSub: 'A deliberate architectural transition from urban noise to stillness',
      zhDesc: '挑高石灰岩立面包覆與低眩光線性照明，引導訪客自然放慢腳步。中央設有石灰岩削切服務檯，以幾何純粹性營造第一觸點的品牌莊重感。',
      enDesc: 'Tall limestone wall planes and recessed low-glare perimeter illumination encourage visitors to decelerate. A monolithic carved limestone reception desk anchors the first point of contact with quiet architectural authority.',
      materialZh: '石灰岩、霧黑金屬、隱藏地腳燈',
      materialEn: 'Limestone, matte black metal, concealed cove lighting',
      lightZh: '2700K 迎賓間接導引光',
      lightEn: '2700K warm indirect threshold wash',
      shotThumb: 'assets/mockups/shot-04.jpg',
      shotIndex: 3
    },
    {
      id: 'z-gallery',
      num: '02',
      code: 'GALLERY',
      area: 64,
      zhTitle: '中央核心展示主藝廊',
      enTitle: 'Central Exhibition Gallery',
      zhSub: '自然天光與開闊島台交織的展陳核心',
      enSub: 'Expansive daylight hall with bespoke display islands',
      zhDesc: '全案最大核心展示空間（64 m²），挑高開闊，天花板配置格柵漫射天光。島台採用石灰岩基座與煙燻橡木檯面，提供 360 度無阻礙的展品環景觀賞動線。',
      enDesc: 'The largest single zone (64 m²), featuring lofty volume and overhead diffused daylight louvers. Monolithic display islands combine limestone plinths with smoked oak tops, enabling frictionless 360-degree curated circulation.',
      materialZh: '石灰岩島台、煙燻橡木、抗眩玻璃',
      materialEn: 'Limestone display islands, smoked oak, anti-reflective glass',
      lightZh: '3000K 展品高演色重點光 + 漫射天光',
      lightEn: '3000K high-CRI accent spots + diffused natural daylight',
      shotThumb: 'assets/mockups/shot-05.jpg',
      shotIndex: 4
    },
    {
      id: 'z-lounge',
      num: '03',
      code: 'LOUNGE',
      area: 38,
      zhTitle: '交流休閒沙龍區',
      enTitle: 'Conversation & Design Lounge',
      zhSub: '煙燻橡木壁板與暖光包覆的沉靜對話場域',
      enSub: 'An intimate envelope of timber millwork and warm light',
      zhDesc: '規劃 38 m² 的深度社交交流沙龍。全室以垂直煙燻橡木壁板與暖光光膜包覆，降低回音殘響，配置低矮訂製沙發與閱讀陳列，營造如同私人圖書館的靜謐氛圍。',
      enDesc: 'A 38 m² dialogue lounge wrapped in vertical smoked oak slatwork and soft perimeter light bands, acoustically calibrated to minimize reverberation for private client exchanges and design culture reading.',
      materialZh: '煙燻橡木壁板、羊毛織品、暗調金屬',
      materialEn: 'Smoked oak panelling, natural wool textiles, dark metal',
      lightZh: '2700K 溫潤漫射氛圍光',
      lightEn: '2700K intimate diffused ambient glow',
      shotThumb: 'assets/mockups/shot-07.jpg',
      shotIndex: 6
    },
    {
      id: 'z-consult',
      num: '04',
      code: 'CONSULTATION',
      area: 24,
      zhTitle: '深度設計諮詢室',
      enTitle: 'Private Design Consultation Suite',
      zhSub: '霧面玻璃半透隔屏與客製材質樣本選配台',
      enSub: 'Acoustic frosted glass screens and tailored material tasting table',
      zhDesc: '設置 24 m² 獨立諮詢空間，採用霧面條紋玻璃與霧黑金屬框劃分邊界，確保視線與談話隱私。內部備有長型材質選樣台，提供實體石材、木皮與色階樣板體驗。',
      enDesc: 'A dedicated 24 m² consultation suite framed by ribbed frosted glass and blackened metal profiles, ensuring acoustic discretion while accommodating a bespoke material inspection island with stone, veneer and finish samples.',
      materialZh: '霧面玻璃、霧黑鋁框、天然石材樣板',
      materialEn: 'Frosted ribbed glass, matte black framing, stone samples',
      lightZh: '3000K CRI 95+ 真實顯色工作光',
      lightEn: '3000K CRI 95+ high-fidelity task lighting',
      shotThumb: 'assets/mockups/shot-08.jpg',
      shotIndex: 7
    },
    {
      id: 'z-boh',
      num: '05',
      code: 'BACK_OF_HOUSE',
      area: 30,
      zhTitle: '後勤工作準備與機房',
      enTitle: 'Service & Back-of-House Facilities',
      zhSub: '高效幕後支援系統，維持對外空間的極致純粹',
      enSub: 'Streamlined backstage infrastructure preserving public order',
      zhDesc: '配置 30 m² 後勤工作區，涵蓋隱藏式庫存收納、員工備品室、水電智慧控制總機與多媒體伺服設備，將管線與雜物完全隱蔽，維持前台一塵不染的秩序。',
      enDesc: 'A dedicated 30 m² operational spine integrating inventory storage, staff prep facilities, digital media distribution servers, and lighting automation hubs—ensuring public galleries stay impeccably minimalist.',
      materialZh: '霧黑耐磨鋼板、隔音吸音棉',
      materialEn: 'Matte black steel, acoustic dampening panels',
      lightZh: '4000K/3000K 雙模工作照度',
      lightEn: '4000K/3000K dual-mode functional work lighting',
      shotThumb: 'assets/mockups/shot-03.jpg',
      shotIndex: 2
    }
  ];

  // 9 Spaces Workplace Directory (V4 Demonstration Dataset)
  // Reuses exact 5 zones (180 m² total) for 1F; 2F and 3F are unmeasured conceptual models.
  const DIRECTORY_DATA = {
    project: "LINEAR SPACE FRAME/01",
    dataset: "FICTIONAL DEMO — NOT A REAL BUILDING OR ACCESSIBILITY CERTIFICATION",
    version: "V4-20261026",
    visitor_centre_area_1f_sqm: 180,
    floors: [
      {
        id: "1F",
        label_zh: "展示與共享接待中心",
        label_en: "Visitor & Shared Space Centre",
        is_rendered_in_existing_images: true,
        has_verified_area: true,
        spaces: [
          {
            id: "LS-1F-ENT",
            floor: "1F",
            zone: "ENTRANCE",
            label_zh: "入口迎賓玄關",
            label_en: "Quiet Arrival & Entrance",
            area_sqm: 24,
            category: "reception",
            visitor_access: "public",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION"],
            amenities_demo_zh: ["石灰岩削切接待檯", "建築導引看板", "低眩光線性照明"],
            amenities_demo_en: ["Limestone reception desk", "Wayfinding directory", "Low-glare linear lighting"],
            shotThumb: "assets/mockups/shot-04.jpg",
            desc_zh: "自都會喧囂過渡至內斂空間的儀式起點，挑高石灰岩立面包覆與第一觸點服務檯。",
            desc_en: "A deliberate architectural transition from urban noise to stillness with carved stone desk."
          },
          {
            id: "LS-1F-GAL",
            floor: "1F",
            zone: "GALLERY",
            label_zh: "中央核心展示藝廊",
            label_en: "Central Exhibition Gallery",
            area_sqm: 64,
            category: "reception",
            visitor_access: "public",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "GALLERY"],
            amenities_demo_zh: ["全區挑高天光", "360度展陳島台", "高演色防眩重點光"],
            amenities_demo_en: ["Diffused daylight louvers", "360-degree display islands", "High-CRI accent spots"],
            shotThumb: "assets/mockups/shot-05.jpg",
            desc_zh: "全案最大核心展示空間（64 m²），挑高開闊，配置石灰岩基座與煙燻橡木檯面。",
            desc_en: "The largest single zone (64 m²), featuring lofty volume and monolithic display plinths."
          },
          {
            id: "LS-1F-LOU",
            floor: "1F",
            zone: "LOUNGE",
            label_zh: "交流休閒沙龍",
            label_en: "Shared Design Lounge",
            area_sqm: 38,
            category: "cowork",
            visitor_access: "public",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "LOUNGE"],
            amenities_demo_zh: ["煙燻橡木壁板", "低矮訂製座席", "文化閱讀陳列區"],
            amenities_demo_en: ["Smoked oak wall slats", "Low custom lounge seating", "Design reading library"],
            shotThumb: "assets/mockups/shot-07.jpg",
            desc_zh: "以垂直煙燻橡木壁板包覆的 38 m² 深度交流沙龍，具備吸音降噪與靜謐閱讀氛圍。",
            desc_en: "A 38 m² dialogue lounge acoustically calibrated with timber millwork for quiet exchanges."
          },
          {
            id: "LS-1F-CON",
            floor: "1F",
            zone: "CONSULTATION",
            label_zh: "深度設計諮詢室",
            label_en: "Private Consultation Suite",
            area_sqm: 24,
            category: "meeting",
            visitor_access: "appointment",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "CONSULTATION"],
            amenities_demo_zh: ["霧面條紋隔屏", "材質選樣展台", "真實顯色工作光"],
            amenities_demo_en: ["Ribbed frosted screens", "Material tasting table", "High-fidelity task light"],
            shotThumb: "assets/mockups/shot-08.jpg",
            desc_zh: "24 m² 獨立諮詢空間，採用條紋霧面玻璃阻隔視線，提供私密商務會談與材質選樣。",
            desc_en: "A dedicated 24 m² suite framed by frosted glass for confidential discussions and finishes."
          },
          {
            id: "LS-1F-BOH",
            floor: "1F",
            zone: "BACK_OF_HOUSE",
            label_zh: "後勤工作準備室",
            label_en: "Back-of-House Facilities",
            area_sqm: 30,
            category: "staff",
            visitor_access: "staff-only",
            route_nodes: [],
            amenities_demo_zh: ["管制機房設備", "營運庫存收納", "水電智慧控制中心"],
            amenities_demo_en: ["Restricted plant servers", "Operations storage", "Smart BMS control hub"],
            shotThumb: "assets/mockups/shot-03.jpg",
            desc_zh: "後勤支援核心（30 m²），整合水電機房與庫存，維持前台極致秩序。不對外開放公眾自導參訪。",
            desc_en: "A 30 m² operational spine for servers and storage. Restricted to authorized staff only."
          }
        ]
      },
      {
        id: "2F",
        label_zh: "工作與會議（概念模型）",
        label_en: "Work & Meeting (Concept Model)",
        is_rendered_in_existing_images: false,
        has_verified_area: false,
        spaces: [
          {
            id: "LS-2F-M01",
            floor: "2F",
            zone: "MEETING_01",
            label_zh: "團隊會議室 M01",
            label_en: "Team Meeting Room M01",
            area_sqm: null,
            category: "meeting",
            visitor_access: "appointment",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "ELEVATOR_LOBBY", "FLOOR_2", "M01"],
            amenities_demo_zh: ["8人會議長桌示意", "視訊簡報螢幕示意", "隔音吸音壁面模組"],
            amenities_demo_en: ["8-person table mockup", "Video conferencing display", "Acoustic wall modules"],
            shotThumb: "./assets/workplace-concepts/ls-2f-m01.jpg",
            desc_zh: "2F 概念會議空間，專供租戶與訪客預約使用。需經 1F 梯廳搭乘電梯抵達。",
            desc_en: "Conceptual meeting facility on 2F for tenant collaboration, accessible via elevator."
          },
          {
            id: "LS-2F-HUB",
            floor: "2F",
            zone: "WORK_HUB",
            label_zh: "共同工作交流區",
            label_en: "Shared Work Hub",
            area_sqm: null,
            category: "cowork",
            visitor_access: "appointment",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "ELEVATOR_LOBBY", "FLOOR_2", "HUB"],
            amenities_demo_zh: ["共享熱桌工位示意", "整合式公共電源示意", "開放式交流討論吧檯"],
            amenities_demo_en: ["Shared hot-desk stations", "Integrated power points", "Open collaboration bar"],
            shotThumb: "./assets/workplace-concepts/ls-2f-hub.jpg",
            desc_zh: "2F 開放式共同工作區概念，提供靈活工位配置與跨領域團隊協作體驗。",
            desc_en: "Open coworking floor concept offering agile seating and collaborative touchpoints."
          }
        ]
      },
      {
        id: "3F",
        label_zh: "獨立工作室（概念模型）",
        label_en: "Private Studios (Concept Model)",
        is_rendered_in_existing_images: false,
        has_verified_area: false,
        spaces: [
          {
            id: "LS-3F-S01",
            floor: "3F",
            zone: "STUDIO_01",
            label_zh: "獨立工作室 S01",
            label_en: "Private Studio S01",
            area_sqm: null,
            category: "private",
            visitor_access: "appointment",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "ELEVATOR_LOBBY", "FLOOR_3", "S01"],
            amenities_demo_zh: ["專屬門禁磁卡門鎖", "固定團隊工作站示意", "獨立置物衣櫃示意"],
            amenities_demo_en: ["Keycard access entry", "Dedicated team stations", "Private secure lockers"],
            shotThumb: "./assets/workplace-concepts/ls-3f-s01.jpg",
            desc_zh: "3F 專用辦公套裝方案，為中小型創意或專業團隊提供獨立私密之實體工作環境。",
            desc_en: "Dedicated office suite providing acoustic privacy and secure access for specialist teams."
          },
          {
            id: "LS-3F-COM",
            floor: "3F",
            zone: "COMMUNITY",
            label_zh: "頂層共享交流區",
            label_en: "Community Lounge",
            area_sqm: null,
            category: "cowork",
            visitor_access: "appointment",
            route_nodes: ["MAIN_ENTRANCE", "RECEPTION", "ELEVATOR_LOBBY", "FLOOR_3", "COM"],
            amenities_demo_zh: ["咖啡輕食備餐台示意", "高採光景觀坐席示意", "非正式會客沙發示意"],
            amenities_demo_en: ["Beverage pantry counter", "High-daylight window seats", "Informal guest sofas"],
            shotThumb: "./assets/workplace-concepts/ls-3f-com.jpg",
            desc_zh: "3F 租戶專屬共享交流場域，營造放鬆交談與非正式交流之舒適社交節點。",
            desc_en: "Tenant-exclusive breakout space designed for informal conversations and daylight breaks."
          }
        ]
      }
    ]
  };

  // Human-readable Wayfinding Route Node Dictionary
  const ROUTE_NODES_MAP = {
    MAIN_ENTRANCE: {
      zh: '1F 主入口迎賓玄關',
      en: '1F Main Entrance Threshold',
      type: 'origin',
      desc_zh: '步入沉靜挑高石灰岩迎賓門廳，放慢步伐。',
      desc_en: 'Enter through the quiet limestone threshold.'
    },
    RECEPTION: {
      zh: '1F 接待服務檯',
      en: '1F Central Reception Desk',
      type: 'checkpoint',
      desc_zh: '至中央削切石灰岩服務檯出示預約或向導覽人員登記。',
      desc_en: 'Check in at the monolithic reception plinth for orientation.'
    },
    GALLERY: {
      zh: '1F 中央展示主藝廊 (64 m²)',
      en: '1F Central Exhibition Gallery (64 m²)',
      type: 'destination',
      desc_zh: '經寬闊中軸步入天光核心展區，環行 360 度展陳島台。',
      desc_en: 'Proceed straight along the central axis into the daylight hall.'
    },
    LOUNGE: {
      zh: '1F 交流休閒沙龍 (38 m²)',
      en: '1F Shared Design Lounge (38 m²)',
      type: 'destination',
      desc_zh: '自展區側廊轉入煙燻橡木壁板包覆之深度交流沙龍。',
      desc_en: 'Turn laterally into the acoustic timber-lined dialogue lounge.'
    },
    CONSULTATION: {
      zh: '1F 深度設計諮詢室 (24 m²)',
      en: '1F Private Consultation Suite (24 m²)',
      type: 'destination',
      desc_zh: '穿過條紋霧面玻璃隔屏，進入私密樣板選配諮詢室。',
      desc_en: 'Pass through the ribbed frosted screens into the consultation suite.'
    },
    ELEVATOR_LOBBY: {
      zh: '1F 概念電梯大廳（梯廳優先示範）',
      en: '1F Concept Elevator Lobby (Elevator-first)',
      type: 'elevator',
      desc_zh: '由接待處右側進入垂直升降動線大廳（示意模型）。',
      desc_en: 'Proceed right from reception to the elevator lobby (concept model).'
    },
    FLOOR_2: {
      zh: '2F 梯廳轉折廊道',
      en: '2F Elevator Landing & Corridor',
      type: 'transit',
      desc_zh: '出電梯後依微型霧黑金屬導視牌沿廊道前行。',
      desc_en: 'Exit the elevator and follow the matte black wayfinding signage.'
    },
    FLOOR_3: {
      zh: '3F 梯廳轉折廊道',
      en: '3F Elevator Landing & Corridor',
      type: 'transit',
      desc_zh: '出電梯後依頂層工作室導覽指示轉入西側長廊。',
      desc_en: 'Exit the elevator and proceed along the west corridor to the studios.'
    },
    M01: {
      zh: '2F 團隊會議室 M01',
      en: '2F Team Meeting Room M01',
      type: 'destination',
      desc_zh: '抵達會議室門廳，刷卡或由工作人員引導開啟進入。',
      desc_en: 'Arrive at Meeting Room M01; badge in or receive staff greeting.'
    },
    HUB: {
      zh: '2F 共同工作交流區',
      en: '2F Shared Work Hub',
      type: 'destination',
      desc_zh: '抵達 2F 開放式共同工作區，選擇預約熱桌席位。',
      desc_en: 'Arrive at the 2F work hub and select your allocated hot-desk.'
    },
    S01: {
      zh: '3F 獨立工作室 S01',
      en: '3F Private Studio S01',
      type: 'destination',
      desc_zh: '抵達 3F S01 專屬工作室門前，使用磁卡感應門禁。',
      desc_en: 'Arrive at Studio S01 private suite; access via keycard reader.'
    },
    COM: {
      zh: '3F 頂層共享交流區',
      en: '3F Top-floor Community Lounge',
      type: 'destination',
      desc_zh: '抵達頂層共享交誼沙龍，可於景觀座席非正式洽談。',
      desc_en: 'Arrive at the top-floor lounge for informal discussions and breakout.'
    }
  };

  // State
  let currentLang = 'zh-TW';
  let activeZoneIndex = 0;
  let activeLightboxIndex = 0;
  let lastFocusedElement = null;

  // Workplace Explorer State (V4)
  let selectedFloor = 'ALL';
  let selectedCategory = 'ALL';
  let searchKeyword = '';
  let activeSpaceId = 'LS-1F-GAL';
  let compareSlots = [];

  // DOM Helpers
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  // ==========================================================================
  // BILINGUAL LOGIC
  // ==========================================================================
  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'zh-TW';
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-Hant';

    // Toggle text visibility
    $$('.ls-zh').forEach(el => el.hidden = currentLang === 'en');
    $$('.ls-en').forEach(el => el.hidden = currentLang !== 'en');

    // Update buttons state
    $$('[data-lang]').forEach(btn => {
      const isCurrent = btn.dataset.lang === currentLang;
      btn.classList.toggle('active', isCurrent);
      btn.setAttribute('aria-pressed', String(isCurrent));
    });

    // Refresh active zone details
    renderZoneDetails();

    // Refresh workplace modules
    renderWorkplaceDirectory();
    renderSelectedSpaceDetail();
    renderWayfindingRoute();
    renderCompareTable();
    const inqModal = $('#ls-inquiry-modal');
    if (inqModal && !inqModal.hidden) {
      renderInquiryContent();
    }

    // Update lightbox caption if open
    if (!$('#ls-lightbox').hidden) {
      renderLightboxImage();
    }
  }

  // ==========================================================================
  // SPATIAL TOUR EXPLORER
  // ==========================================================================
  function renderZoneDetails() {
    const zone = ZONES[activeZoneIndex];
    if (!zone) return;

    // Update texts
    $('#ls-zone-id').textContent = `ZONE ${zone.num} / 05 — ${zone.code}`;
    $('#ls-zone-area').textContent = `${zone.area} m²`;

    const titleEl = $('#ls-zone-title');
    const subEl = $('#ls-zone-sub');
    const descEl = $('#ls-zone-desc');
    const matEl = $('#ls-zone-mat');
    const lightEl = $('#ls-zone-light');

    if (currentLang === 'en') {
      titleEl.textContent = zone.enTitle;
      subEl.textContent = zone.enSub;
      descEl.textContent = zone.enDesc;
      matEl.textContent = zone.materialEn;
      lightEl.textContent = zone.lightEn;
    } else {
      titleEl.textContent = zone.zhTitle;
      subEl.textContent = zone.zhSub;
      descEl.textContent = zone.zhDesc;
      matEl.textContent = zone.materialZh;
      lightEl.textContent = zone.lightZh;
    }

    // Update Visual
    const imgEl = $('#ls-zone-img');
    imgEl.src = zone.shotThumb;
    imgEl.alt = currentLang === 'en' ? zone.enTitle : zone.zhTitle;

    // Update Active Button
    $$('.ls-zone-btn').forEach((btn, idx) => {
      const isSelected = idx === activeZoneIndex;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });
  }

  function initSpatialExplorer() {
    const selectorBar = $('#ls-zone-selector');
    if (!selectorBar) return;

    selectorBar.replaceChildren();

    ZONES.forEach((zone, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ls-zone-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-pressed', String(idx === 0));
      btn.innerHTML = `<span>${zone.num} ${zone.code}</span><span class="badge">${zone.area} m²</span>`;
      btn.addEventListener('click', () => {
        activeZoneIndex = idx;
        renderZoneDetails();
      });
      selectorBar.appendChild(btn);
    });

    renderZoneDetails();
  }

  // ==========================================================================
  // 16 PLATES GRID
  // ==========================================================================
  function initPlatesGrid() {
    const grid = $('#ls-plates-grid');
    if (!grid) return;

    grid.replaceChildren();

    SHOTS.forEach((shot, idx) => {
      const numStr = String(shot.num).padStart(2, '0');

      const figure = document.createElement('figure');
      figure.className = 'ls-plate-figure';

      // Interactive image trigger
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ls-plate-btn';
      btn.setAttribute('aria-label', `開啟 SHOT ${numStr} 原圖檢視（2560 × 1440）`);

      const img = document.createElement('img');
      img.src = `assets/mockups/${shot.jpg}`;
      img.alt = `SHOT ${numStr}: ${shot.zh}`;
      img.loading = idx < 2 ? 'eager' : 'lazy';
      img.setAttribute('width', '2560');
      img.setAttribute('height', '1440');

      const zoomBadge = document.createElement('span');
      zoomBadge.className = 'ls-plate-badge-zoom';
      zoomBadge.textContent = 'VIEW ORIGINAL 2560 × 1440 ↗';

      btn.appendChild(img);
      btn.appendChild(zoomBadge);

      btn.addEventListener('click', () => {
        openLightbox(idx, btn);
      });

      // Caption
      const figcap = document.createElement('figcaption');
      figcap.className = 'ls-plate-caption';

      const info = document.createElement('div');
      info.className = 'ls-plate-info';

      const numSpan = document.createElement('span');
      numSpan.className = 'ls-plate-num';
      numSpan.textContent = `SHOT ${numStr} / 16`;

      const titleSpan = document.createElement('strong');
      titleSpan.className = 'ls-plate-title';
      titleSpan.innerHTML = `<span class="ls-zh">${shot.zh}</span><span class="ls-en" hidden>${shot.en}</span>`;

      const subSpan = document.createElement('span');
      subSpan.className = 'ls-plate-sub';
      subSpan.innerHTML = `<span class="ls-zh">${shot.subZh}</span><span class="ls-en" hidden>${shot.subEn}</span>`;

      info.appendChild(numSpan);
      info.appendChild(titleSpan);
      info.appendChild(subSpan);

      const actionSpan = document.createElement('span');
      actionSpan.className = 'ls-plate-view-link';
      actionSpan.textContent = '2560×1440 ↗';

      figcap.appendChild(info);
      figcap.appendChild(actionSpan);

      figure.appendChild(btn);
      figure.appendChild(figcap);

      grid.appendChild(figure);
    });
  }

  // ==========================================================================
  // FULLSCREEN LIGHTBOX (Accessible Dialog, 2560x1440 Master PNG)
  // ==========================================================================
  const lightbox = $('#ls-lightbox');
  const lbImg = $('#ls-lb-img');
  const lbCaption = $('#ls-lb-caption');
  const lbCloseBtn = $('#ls-lb-close');
  const lbPrevBtn = $('#ls-lb-prev');
  const lbNextBtn = $('#ls-lb-next');

  function openLightbox(index, triggerElement) {
    lastFocusedElement = triggerElement;
    activeLightboxIndex = (index + SHOTS.length) % SHOTS.length;
    renderLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbCloseBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function renderLightboxImage() {
    const shot = SHOTS[activeLightboxIndex];
    if (!shot) return;

    const numStr = String(shot.num).padStart(2, '0');
    lbImg.src = `assets/shots/${shot.png}`;
    lbImg.alt = currentLang === 'en' ? shot.en : shot.zh;

    const title = currentLang === 'en' ? shot.en : shot.zh;
    lbCaption.innerHTML = `<em>SHOT ${numStr} / 16</em> ${title} — 2560 × 1440 px MASTER CANVAS`;
  }

  function initLightbox() {
    if (!lightbox) return;

    lbCloseBtn.addEventListener('click', closeLightbox);

    lbPrevBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex - 1 + SHOTS.length) % SHOTS.length;
      renderLightboxImage();
    });

    lbNextBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex + 1) % SHOTS.length;
      renderLightboxImage();
    });

    // Close on backdrop click
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox || e.target.classList.contains('ls-lightbox-stage')) {
        closeLightbox();
      }
    });

    // Keyboard navigation (Esc, Left, Right, Tab Trap)
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activeLightboxIndex = (activeLightboxIndex - 1 + SHOTS.length) % SHOTS.length;
        renderLightboxImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        activeLightboxIndex = (activeLightboxIndex + 1) % SHOTS.length;
        renderLightboxImage();
      } else if (e.key === 'Tab') {
        const focusable = [lbCloseBtn, lbPrevBtn, lbNextBtn].filter(el => el && el.offsetParent !== null);
        const currentIndex = focusable.indexOf(document.activeElement);

        if (e.shiftKey) {
          if (currentIndex <= 0) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          }
        } else {
          if (currentIndex >= focusable.length - 1) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      }
    });
  }

  // ==========================================================================
  // WORKPLACE DIRECTORY, WAYFINDING & LEASING MODULE (V4 REMEDIATION)
  // ==========================================================================
  function getAllSpaces() {
    const list = [];
    DIRECTORY_DATA.floors.forEach(floor => {
      floor.spaces.forEach(s => {
        list.push({
          ...s,
          floorId: floor.id,
          floorLabelZh: floor.label_zh,
          floorLabelEn: floor.label_en,
          hasVerifiedArea: floor.has_verified_area
        });
      });
    });
    return list;
  }

  function getSpaceById(spaceId) {
    return getAllSpaces().find(s => s.id === spaceId);
  }

  function getFilteredSpaces() {
    const query = searchKeyword.trim().toLowerCase();
    return getAllSpaces().filter(s => {
      // Floor filter
      if (selectedFloor !== 'ALL' && s.floorId !== selectedFloor) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && s.category !== selectedCategory) {
        return false;
      }
      // Search keyword
      if (query) {
        const matchesId = s.id.toLowerCase().includes(query);
        const matchesZh = s.label_zh.toLowerCase().includes(query);
        const matchesEn = s.label_en.toLowerCase().includes(query);
        const matchesZone = s.zone ? s.zone.toLowerCase().includes(query) : false;
        const matchesAmenZh = s.amenities_demo_zh ? s.amenities_demo_zh.some(a => a.toLowerCase().includes(query)) : false;
        const matchesAmenEn = s.amenities_demo_en ? s.amenities_demo_en.some(a => a.toLowerCase().includes(query)) : false;
        if (!matchesId && !matchesZh && !matchesEn && !matchesZone && !matchesAmenZh && !matchesAmenEn) {
          return false;
        }
      }
      return true;
    });
  }

  function renderWorkplaceDirectory() {
    const container = $('#ls-spaces-container');
    const emptyBox = $('#ls-spaces-empty');
    const resultsCount = $('#ls-results-count');
    const resetLink = $('#ls-filters-reset-btn');

    if (!container) return;

    const spaces = getFilteredSpaces();

    // Results counter & reset link
    if (currentLang === 'en') {
      resultsCount.textContent = `Showing ${spaces.length} space ${spaces.length === 1 ? 'item' : 'items'}`;
    } else {
      resultsCount.textContent = `顯示 ${spaces.length} 個空間項目`;
    }

    const isFiltered = selectedFloor !== 'ALL' || selectedCategory !== 'ALL' || searchKeyword.trim() !== '';
    if (resetLink) {
      resetLink.style.display = isFiltered ? 'inline-block' : 'none';
    }

    container.replaceChildren();

    if (spaces.length === 0) {
      container.hidden = true;
      if (emptyBox) emptyBox.hidden = false;
      return;
    }

    container.hidden = false;
    if (emptyBox) emptyBox.hidden = true;

    spaces.forEach(space => {
      const card = document.createElement('div');
      card.className = `ls-space-card ${space.id === activeSpaceId ? 'active' : ''}`;
      card.setAttribute('data-space-id', space.id);

      // Card Header
      const head = document.createElement('div');
      head.className = 'ls-space-card-head';

      const left = document.createElement('div');
      left.className = 'ls-space-card-left';

      const floorBadge = document.createElement('span');
      floorBadge.className = 'ls-space-floor-badge';
      floorBadge.textContent = space.floorId;

      const code = document.createElement('span');
      code.className = 'ls-space-code';
      code.textContent = space.id;

      left.appendChild(floorBadge);
      left.appendChild(code);

      const accessTag = document.createElement('span');
      accessTag.className = `ls-access-tag ${space.visitor_access === 'staff-only' ? 'staff' : (space.visitor_access === 'public' ? 'public' : 'appointment')}`;
      if (currentLang === 'en') {
        accessTag.textContent = space.visitor_access === 'staff-only' ? 'STAFF ONLY' : (space.visitor_access === 'public' ? 'PUBLIC' : 'BY APPOINTMENT');
      } else {
        accessTag.textContent = space.visitor_access === 'staff-only' ? '後勤管制' : (space.visitor_access === 'public' ? '開放參訪' : '預約專屬');
      }

      head.appendChild(left);
      head.appendChild(accessTag);

      // Card Body
      const body = document.createElement('div');
      body.className = 'ls-space-card-body';

      const info = document.createElement('div');
      info.className = 'ls-space-info';

      const title = document.createElement('h4');
      title.textContent = currentLang === 'en' ? space.label_en : space.label_zh;

      const desc = document.createElement('p');
      desc.textContent = currentLang === 'en' ? space.desc_en : space.desc_zh;

      info.appendChild(title);
      info.appendChild(desc);

      const areaBadge = document.createElement('span');
      areaBadge.className = 'ls-space-area-badge';
      if (space.area_sqm !== null) {
        areaBadge.textContent = `${space.area_sqm} m²`;
      } else {
        areaBadge.textContent = currentLang === 'en' ? 'Concept' : '概念模型';
      }

      body.appendChild(info);
      body.appendChild(areaBadge);

      // Amenities
      const amenitiesRow = document.createElement('div');
      amenitiesRow.className = 'ls-space-amenities-tags';
      const amenities = currentLang === 'en' ? space.amenities_demo_en : space.amenities_demo_zh;
      amenities.forEach(am => {
        const amTag = document.createElement('span');
        amTag.className = 'ls-amenity-tag';
        amTag.textContent = am;
        amenitiesRow.appendChild(amTag);
      });

      // Actions
      const actions = document.createElement('div');
      actions.className = 'ls-space-card-actions';

      const selectBtn = document.createElement('button');
      selectBtn.type = 'button';
      selectBtn.className = 'ls-space-select-btn';
      selectBtn.textContent = space.id === activeSpaceId
        ? (currentLang === 'en' ? '✓ Selected' : '✓ 檢視中')
        : (currentLang === 'en' ? 'Select Space' : '選取空間');
      selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectSpace(space.id);
      });

      const isInCompare = compareSlots.includes(space.id);
      const compareBtn = document.createElement('button');
      compareBtn.type = 'button';
      compareBtn.className = `ls-space-compare-btn ${isInCompare ? 'in-compare' : ''}`;
      compareBtn.textContent = isInCompare
        ? (currentLang === 'en' ? '✓ Compared' : '✓ 已加入比較')
        : (currentLang === 'en' ? '+ Add to Compare' : '+ 加入比較');
      compareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCompare(space.id);
      });

      actions.appendChild(selectBtn);
      actions.appendChild(compareBtn);

      card.appendChild(head);
      card.appendChild(body);
      card.appendChild(amenitiesRow);
      card.appendChild(actions);

      card.addEventListener('click', () => {
        selectSpace(space.id);
      });

      container.appendChild(card);
    });
  }

  function selectSpace(spaceId) {
    activeSpaceId = spaceId;

    // Update active class on cards
    $$('.ls-space-card').forEach(card => {
      const isCardActive = card.getAttribute('data-space-id') === spaceId;
      card.classList.toggle('active', isCardActive);
      const selBtn = card.querySelector('.ls-space-select-btn');
      if (selBtn) {
        selBtn.textContent = isCardActive
          ? (currentLang === 'en' ? '✓ Selected' : '✓ 檢視中')
          : (currentLang === 'en' ? 'Select Space' : '選取空間');
      }
    });

    renderSelectedSpaceDetail();
    renderWayfindingRoute();
  }

  function renderSelectedSpaceDetail() {
    const box = $('#ls-space-detail-card');
    if (!box) return;

    const space = getSpaceById(activeSpaceId);
    if (!space) return;

    box.replaceChildren();

    // Head
    const head = document.createElement('div');
    head.className = 'ls-sel-head';

    const meta = document.createElement('div');
    meta.className = 'ls-sel-meta';

    const floorBadge = document.createElement('span');
    floorBadge.className = 'ls-space-floor-badge';
    floorBadge.textContent = space.floorId;

    const code = document.createElement('span');
    code.className = 'ls-space-code';
    code.textContent = space.id;

    meta.appendChild(floorBadge);
    meta.appendChild(code);

    const accessTag = document.createElement('span');
    accessTag.className = `ls-access-tag ${space.visitor_access === 'staff-only' ? 'staff' : (space.visitor_access === 'public' ? 'public' : 'appointment')}`;
    if (currentLang === 'en') {
      accessTag.textContent = space.visitor_access === 'staff-only' ? 'STAFF ONLY' : (space.visitor_access === 'public' ? 'PUBLIC' : 'BY APPOINTMENT');
    } else {
      accessTag.textContent = space.visitor_access === 'staff-only' ? '後勤管制' : (space.visitor_access === 'public' ? '開放參訪' : '預約專屬');
    }

    head.appendChild(meta);
    head.appendChild(accessTag);

    // Media
    const media = document.createElement('div');
    media.className = 'ls-sel-media';
    if (space.shotThumb) {
      const img = document.createElement('img');
      img.src = space.shotThumb;
      img.alt = currentLang === 'en' ? space.label_en : space.label_zh;
      img.setAttribute('width', '2560');
      img.setAttribute('height', '1440');
      media.appendChild(img);
    } else {
      const conceptBadge = document.createElement('div');
      conceptBadge.className = 'ls-sel-media-concept';
      conceptBadge.innerHTML = `
        <span style="font-size: 1.5rem; color: var(--ls-warm);">⌖</span>
        <strong>${space.floorId} CONCEPTUAL WORKPLACE MODEL</strong>
        <span>${currentLang === 'en' ? 'Unrendered upper-floor spatial schema (Not photographed in 1F gallery series)' : '未收錄於 1F 實景攝影之高樓層概念服務模型'}</span>
      `;
      media.appendChild(conceptBadge);
    }

    // Title
    const titleBlock = document.createElement('div');
    titleBlock.className = 'ls-sel-title-block';

    const h3 = document.createElement('h3');
    h3.textContent = currentLang === 'en' ? space.label_en : space.label_zh;

    const p = document.createElement('p');
    p.textContent = currentLang === 'en' ? space.desc_en : space.desc_zh;

    titleBlock.appendChild(h3);
    titleBlock.appendChild(p);

    // Specs Grid
    const specsGrid = document.createElement('div');
    specsGrid.className = 'ls-sel-specs-grid';

    // Area spec
    const areaBox = document.createElement('div');
    areaBox.className = 'ls-sel-spec-box';
    areaBox.innerHTML = `
      <div class="ls-sel-spec-label">${currentLang === 'en' ? 'AREA / MEASUREMENT' : '面積驗證規格'}</div>
      <div class="ls-sel-spec-val">${space.area_sqm !== null ? `${space.area_sqm} m² (1F 實測樣板)` : (currentLang === 'en' ? 'Unmeasured Concept Model' : '無尺寸概念模型')}</div>
    `;

    // Typology spec
    const typoBox = document.createElement('div');
    typoBox.className = 'ls-sel-spec-box';
    const typoLabelZh = { reception: '迎賓展陳', meeting: '商務會議', cowork: '共同工作', private: '獨立辦公', staff: '後勤管制' }[space.category] || space.category;
    const typoLabelEn = { reception: 'Reception & Gallery', meeting: 'Meeting & Conference', cowork: 'Coworking Lounge', private: 'Private Studio', staff: 'Back-of-house Staff' }[space.category] || space.category;
    typoBox.innerHTML = `
      <div class="ls-sel-spec-label">${currentLang === 'en' ? 'TYPOLOGY / CATEGORY' : '空間使用類型'}</div>
      <div class="ls-sel-spec-val">${currentLang === 'en' ? typoLabelEn : typoLabelZh}</div>
    `;

    specsGrid.appendChild(areaBox);
    specsGrid.appendChild(typoBox);

    box.appendChild(head);
    box.appendChild(media);
    box.appendChild(titleBlock);
    box.appendChild(specsGrid);
  }

  function renderWayfindingRoute() {
    const routeBox = $('#ls-route-content');
    if (!routeBox) return;

    const space = getSpaceById(activeSpaceId);
    if (!space) return;

    routeBox.replaceChildren();

    // Check if staff-only (LS-1F-BOH)
    if (space.visitor_access === 'staff-only' || space.route_nodes.length === 0) {
      const restricted = document.createElement('div');
      restricted.className = 'ls-restricted-box';
      restricted.innerHTML = `
        <div class="ls-restricted-title">
          <span style="font-size: 1.25rem;">⚠</span>
          <span>${currentLang === 'en' ? 'RESTRICTED AREA — NO PUBLIC ROUTE' : '後勤管制區域 — 訪客禁止通行'}</span>
        </div>
        <p>
          ${currentLang === 'en'
            ? 'This area is designated as Back-of-house Service and Engineering Facilities. No self-guided visitor navigation is provided.'
            : '此區域為後勤工作準備與工程設備管制區，不對外開放公眾自導參訪路線。'}
        </p>
        <div class="ls-restricted-help">
          ${currentLang === 'en'
            ? 'Official access requires administrative authorization. Please report to the 1F Central Reception Desk for assistance.'
            : '公務維運或工作人員進出，請至 1F 接待服務檯登記，由空間營運主管親自陪同授權。'}
        </div>
      `;
      routeBox.appendChild(restricted);
      return;
    }

    // Accessible Route Flow
    const list = document.createElement('ol');
    list.className = 'ls-route-steps';

    space.route_nodes.forEach((nodeKey, idx) => {
      const nodeInfo = ROUTE_NODES_MAP[nodeKey] || {
        zh: nodeKey,
        en: nodeKey,
        type: 'transit',
        desc_zh: '循現場環境導視標牌前行。',
        desc_en: 'Follow environmental wayfinding signs.'
      };

      const step = document.createElement('li');
      const isElevator = nodeKey === 'ELEVATOR_LOBBY';
      const isDestination = idx === space.route_nodes.length - 1;

      step.className = `ls-route-step ${isElevator ? 'elevator' : ''} ${isDestination ? 'destination' : ''}`;

      const marker = document.createElement('span');
      marker.className = 'ls-step-marker';
      marker.textContent = String(idx + 1).padStart(2, '0');

      const head = document.createElement('div');
      head.className = 'ls-step-header';

      const name = document.createElement('span');
      name.className = 'ls-step-name';
      name.textContent = currentLang === 'en' ? nodeInfo.en : nodeInfo.zh;

      head.appendChild(name);

      if (isElevator) {
        const elevatorBadge = document.createElement('span');
        elevatorBadge.className = 'ls-step-elevator-badge';
        elevatorBadge.textContent = currentLang === 'en' ? 'ELEVATOR-FIRST' : '升降梯優先';
        head.appendChild(elevatorBadge);
      }

      const desc = document.createElement('p');
      desc.className = 'ls-step-desc';
      desc.textContent = currentLang === 'en' ? nodeInfo.desc_en : nodeInfo.desc_zh;

      step.appendChild(marker);
      step.appendChild(head);
      step.appendChild(desc);

      list.appendChild(step);
    });

    routeBox.appendChild(list);
  }

  function toggleCompare(spaceId) {
    const idx = compareSlots.indexOf(spaceId);
    if (idx >= 0) {
      compareSlots.splice(idx, 1);
    } else {
      if (compareSlots.length < 2) {
        compareSlots.push(spaceId);
      } else {
        compareSlots = [compareSlots[1], spaceId];
      }
    }

    renderWorkplaceDirectory();
    renderCompareTable();
  }

  function renderCompareTable() {
    const slotAHead = $('#ls-slot-a-head');
    const slotBHead = $('#ls-slot-b-head');
    const tbody = $('#ls-compare-tbody');
    const statusMsg = $('#ls-compare-status-msg');
    const clearBtn = $('#ls-compare-clear-btn');
    const generateBtn = $('#ls-generate-inquiry-btn');

    if (!tbody) return;

    const spaceA = compareSlots[0] ? getSpaceById(compareSlots[0]) : null;
    const spaceB = compareSlots[1] ? getSpaceById(compareSlots[1]) : null;

    if (slotAHead) {
      slotAHead.textContent = spaceA
        ? `PLAN A: ${spaceA.id} (${currentLang === 'en' ? spaceA.label_en : spaceA.label_zh})`
        : (currentLang === 'en' ? 'PLAN A: (Not Selected)' : 'PLAN A: (尚未選擇)');
    }
    if (slotBHead) {
      slotBHead.textContent = spaceB
        ? `PLAN B: ${spaceB.id} (${currentLang === 'en' ? spaceB.label_en : spaceB.label_zh})`
        : (currentLang === 'en' ? 'PLAN B: (Not Selected)' : 'PLAN B: (尚未選擇)');
    }

    if (clearBtn) {
      clearBtn.disabled = compareSlots.length === 0;
    }
    if (generateBtn) {
      generateBtn.disabled = compareSlots.length < 2;
    }

    // Status bar message
    if (statusMsg) {
      if (compareSlots.length === 0) {
        statusMsg.innerHTML = currentLang === 'en'
          ? '<span>Select two workspace plans from above by clicking <strong>"Add to Compare"</strong>.</span>'
          : '<span>請自上方空間清單點擊<strong>「加入比較」</strong>按鈕選取兩個方案。</span>';
      } else if (compareSlots.length === 1) {
        statusMsg.innerHTML = currentLang === 'en'
          ? `<span>Plan <strong>${compareSlots[0]}</strong> selected. Please pick a 2nd plan to compare.</span>`
          : `<span>已選取 <strong>${compareSlots[0]}</strong>，請再選取第 2 個方案進行對照。</span>`;
      } else {
        statusMsg.innerHTML = currentLang === 'en'
          ? `<span>Ready: <strong>${compareSlots[0]}</strong> vs <strong>${compareSlots[1]}</strong>. Click "Generate Inquiry Summary" to create concept brief.</span>`
          : `<span>對照完成：<strong>${compareSlots[0]}</strong> vs <strong>${compareSlots[1]}</strong>。可點擊右方按鈕產生洽詢需求摘要。</span>`;
      }
    }

    // Rows definition
    const rows = [
      {
        labelZh: '空間代碼',
        labelEn: 'Space ID',
        valA: spaceA ? spaceA.id : null,
        valB: spaceB ? spaceB.id : null
      },
      {
        labelZh: '所在樓層',
        labelEn: 'Floor Level',
        valA: spaceA ? `${spaceA.floorId} (${currentLang === 'en' ? spaceA.floorLabelEn : spaceA.floorLabelZh})` : null,
        valB: spaceB ? `${spaceB.floorId} (${currentLang === 'en' ? spaceB.floorLabelEn : spaceB.floorLabelZh})` : null
      },
      {
        labelZh: '空間類型',
        labelEn: 'Typology',
        valA: spaceA ? (currentLang === 'en' ? spaceA.category.toUpperCase() : ({ reception: '迎賓展陳', meeting: '商務會議', cowork: '共同工作', private: '獨立工作室', staff: '後勤管制' }[spaceA.category] || spaceA.category)) : null,
        valB: spaceB ? (currentLang === 'en' ? spaceB.category.toUpperCase() : ({ reception: '迎賓展陳', meeting: '商務會議', cowork: '共同工作', private: '獨立工作室', staff: '後勤管制' }[spaceB.category] || spaceB.category)) : null
      },
      {
        labelZh: '面積規格',
        labelEn: 'Area Specification',
        valA: spaceA ? (spaceA.area_sqm !== null ? `${spaceA.area_sqm} m² (1F 實測)` : (currentLang === 'en' ? 'Unmeasured Concept Model' : '無尺寸概念模型（非實測）')) : null,
        valB: spaceB ? (spaceB.area_sqm !== null ? `${spaceB.area_sqm} m² (1F 實測)` : (currentLang === 'en' ? 'Unmeasured Concept Model' : '無尺寸概念模型（非實測）')) : null
      },
      {
        labelZh: '參訪權限',
        labelEn: 'Visitor Access',
        valA: spaceA ? (spaceA.visitor_access === 'staff-only' ? (currentLang === 'en' ? 'Staff Only (Restricted)' : '後勤管制（不對外開放）') : (spaceA.visitor_access === 'public' ? (currentLang === 'en' ? 'Public Access' : '公眾開放') : (currentLang === 'en' ? 'By Appointment' : '預約專屬'))) : null,
        valB: spaceB ? (spaceB.visitor_access === 'staff-only' ? (currentLang === 'en' ? 'Staff Only (Restricted)' : '後勤管制（不對外開放）') : (spaceB.visitor_access === 'public' ? (currentLang === 'en' ? 'Public Access' : '公眾開放') : (currentLang === 'en' ? 'By Appointment' : '預約專屬'))) : null
      },
      {
        labelZh: '設備配置示意',
        labelEn: 'Amenities Mockup',
        valA: spaceA ? (currentLang === 'en' ? spaceA.amenities_demo_en.join(', ') : spaceA.amenities_demo_zh.join('、')) : null,
        valB: spaceB ? (currentLang === 'en' ? spaceB.amenities_demo_en.join(', ') : spaceB.amenities_demo_zh.join('、')) : null
      },
      {
        labelZh: '招商洽詢重點',
        labelEn: 'Inquiry Scope',
        valA: spaceA ? (currentLang === 'en' ? `Leasing inquiry for ${spaceA.id}` : `針對 ${spaceA.label_zh} 進行功能方案評估與空間進駐排程。`) : null,
        valB: spaceB ? (currentLang === 'en' ? `Leasing inquiry for ${spaceB.id}` : `針對 ${spaceB.label_zh} 進行功能方案評估與空間進駐排程。`) : null
      }
    ];

    tbody.replaceChildren();

    rows.forEach(r => {
      const tr = document.createElement('tr');

      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = currentLang === 'en' ? r.labelEn : r.labelZh;
      tr.appendChild(th);

      const tdA = document.createElement('td');
      if (r.valA) {
        tdA.textContent = r.valA;
      } else {
        tdA.className = 'ls-compare-empty-cell';
        tdA.textContent = currentLang === 'en' ? '(Select Plan A above)' : '（請自上方空間加入方案 A）';
      }
      tr.appendChild(tdA);

      const tdB = document.createElement('td');
      if (r.valB) {
        tdB.textContent = r.valB;
      } else {
        tdB.className = 'ls-compare-empty-cell';
        tdB.textContent = currentLang === 'en' ? '(Select Plan B above)' : '（請自上方空間加入方案 B）';
      }
      tr.appendChild(tdB);

      tbody.appendChild(tr);
    });
  }

  function renderInquiryContent() {
    const modalContent = $('#ls-inquiry-content');
    if (!modalContent) return;

    const spaceA = compareSlots[0] ? getSpaceById(compareSlots[0]) : null;
    const spaceB = compareSlots[1] ? getSpaceById(compareSlots[1]) : null;

    if (!spaceA || !spaceB) return;

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const inqRef = `INQ-LS-V4-${spaceA.id}-${spaceB.id}`;

    if (currentLang === 'en') {
      modalContent.textContent =
`=============================================================
LINEAR SPACE FRAME/01 — WORKSPACE INQUIRY SUMMARY (DEMO)
=============================================================
Reference Code : ${inqRef}
Generated Time : ${timestamp} (Client-side in-memory only)
Operator       : LINEAR SPACE Workplace Management Co.

[SELECTED WORKSPACE PLANS]
1. PLAN A: [${spaceA.id}] ${spaceA.label_en}
   - Floor: ${spaceA.floorId} | Access: ${spaceA.visitor_access}
   - Area: ${spaceA.area_sqm !== null ? spaceA.area_sqm + ' m² (Verified 1F)' : 'Concept Model (Unmeasured)'}
   - Mockup Amenities: ${spaceA.amenities_demo_en.join(', ')}

2. PLAN B: [${spaceB.id}] ${spaceB.label_en}
   - Floor: ${spaceB.floorId} | Access: ${spaceB.visitor_access}
   - Area: ${spaceB.area_sqm !== null ? spaceB.area_sqm + ' m² (Verified 1F)' : 'Concept Model (Unmeasured)'}
   - Mockup Amenities: ${spaceB.amenities_demo_en.join(', ')}

[CONCEPT EVALUATION NOTES]
- Intended Use: Commercial workplace / design suite evaluation
- Availability: Illustrative fictional concept; no real vacancies or binding lease agreements.
- Data Governance: No personal data (name, phone, email) is collected or transmitted.
=============================================================`;
    } else {
      modalContent.textContent =
`=============================================================
LINEAR SPACE FRAME/01 — 招商方案需求評估摘要（前端概念展示）
=============================================================
洽詢編號     ：${inqRef}
生成時間     ：${timestamp}（瀏覽器前端本機記憶體生成）
空間營運機構 ：LINEAR SPACE 複合商辦與工作空間管理公司

【選定對照方案】
1. 方案 A：【${spaceA.id}】${spaceA.label_zh}
   - 所在樓層：${spaceA.floorId} ｜ 參訪屬性：${spaceA.visitor_access === 'public' ? '公眾開放' : '預約專屬'}
   - 面積規格：${spaceA.area_sqm !== null ? spaceA.area_sqm + ' m² (1F 實測樣板)' : '無尺寸概念模型（非實測）'}
   - 設備配置：${spaceA.amenities_demo_zh.join('、')}

2. 方案 B：【${spaceB.id}】${spaceB.label_zh}
   - 所在樓層：${spaceB.floorId} ｜ 參訪屬性：${spaceB.visitor_access === 'public' ? '公眾開放' : '預約專屬'}
   - 面積規格：${spaceB.area_sqm !== null ? spaceB.area_sqm + ' m² (1F 實測樣板)' : '無尺寸概念模型（非實測）'}
   - 設備配置：${spaceB.amenities_demo_zh.join('、')}

【空間進駐評估重點】
- 進駐需求考量：商務會議支援／工作室獨立性／品牌旗艦接待契合度。
- 誠實聲明：本摘要純為前端概念示範，不保證即時空房、現場租金，亦不具備任何商業租賃契約效力。
- 隱私聲明：不收集或上傳任何使用者姓名、電話或 Email。
=============================================================`;
    }
  }

  function initWorkplaceModule() {
    // Floor tab filters
    $$('#ls-floor-filters .ls-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFloor = btn.dataset.floor;
        $$('#ls-floor-filters .ls-filter-pill').forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });
        renderWorkplaceDirectory();
      });
    });

    // Category tab filters
    $$('#ls-category-filters .ls-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.dataset.category;
        $$('#ls-category-filters .ls-filter-pill').forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });
        renderWorkplaceDirectory();
      });
    });

    // Search input
    const searchInput = $('#ls-space-search');
    const searchClear = $('#ls-search-clear');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchKeyword = searchInput.value;
        if (searchClear) searchClear.hidden = searchKeyword.length === 0;
        renderWorkplaceDirectory();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchKeyword = '';
          searchClear.hidden = true;
          searchInput.focus();
        }
        renderWorkplaceDirectory();
      });
    }

    // Reset filters buttons
    const resetFilters = () => {
      selectedFloor = 'ALL';
      selectedCategory = 'ALL';
      searchKeyword = '';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.hidden = true;

      $$('#ls-floor-filters .ls-filter-pill').forEach((b, idx) => {
        b.classList.toggle('active', idx === 0);
        b.setAttribute('aria-pressed', String(idx === 0));
      });
      $$('#ls-category-filters .ls-filter-pill').forEach((b, idx) => {
        b.classList.toggle('active', idx === 0);
        b.setAttribute('aria-pressed', String(idx === 0));
      });

      renderWorkplaceDirectory();
    };

    const resetBtn1 = $('#ls-filters-reset-btn');
    if (resetBtn1) resetBtn1.addEventListener('click', resetFilters);

    const resetBtn2 = $('#ls-empty-reset-btn');
    if (resetBtn2) resetBtn2.addEventListener('click', resetFilters);

    // Quick compare demo button: 2F Meeting Room vs 3F Studio
    const quickDemoBtn = $('#ls-quick-compare-demo');
    if (quickDemoBtn) {
      quickDemoBtn.addEventListener('click', () => {
        compareSlots = ['LS-2F-M01', 'LS-3F-S01'];
        renderWorkplaceDirectory();
        renderCompareTable();
      });
    }

    // Clear compare button
    const clearCompareBtn = $('#ls-compare-clear-btn');
    if (clearCompareBtn) {
      clearCompareBtn.addEventListener('click', () => {
        compareSlots = [];
        renderWorkplaceDirectory();
        renderCompareTable();
        const inqModal = $('#ls-inquiry-modal');
        if (inqModal) inqModal.hidden = true;
      });
    }

    // Generate inquiry summary button
    const generateBtn = $('#ls-generate-inquiry-btn');
    const inqModal = $('#ls-inquiry-modal');
    if (generateBtn && inqModal) {
      generateBtn.addEventListener('click', () => {
        if (compareSlots.length < 2) return;
        renderInquiryContent();
        inqModal.hidden = false;
        inqModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    // Close inquiry box
    const inqCloseBtn = $('#ls-inquiry-close-btn');
    if (inqCloseBtn && inqModal) {
      inqCloseBtn.addEventListener('click', () => {
        inqModal.hidden = true;
      });
    }

    // Copy inquiry text button
    const copyBtn = $('#ls-inquiry-copy-btn');
    const inqContent = $('#ls-inquiry-content');
    if (copyBtn && inqContent) {
      copyBtn.addEventListener('click', () => {
        const text = inqContent.textContent;
        const copySuccess = () => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = currentLang === 'en'
            ? '<span>✓ Copied to Clipboard!</span>'
            : '<span>✓ 摘要文字已複製！</span>';
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2500);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(copySuccess).catch(() => {
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }

        function fallbackCopy(str) {
          const ta = document.createElement('textarea');
          ta.value = str;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand('copy');
            copySuccess();
          } catch (e) {
            console.warn('Fallback copy failed:', e);
            prompt(currentLang === 'en' ? 'Copy text below:' : '請複製以下內容：', str);
          }
          document.body.removeChild(ta);
        }
      });
    }

    // Initial render
    renderWorkplaceDirectory();
    renderSelectedSpaceDetail();
    renderWayfindingRoute();
    renderCompareTable();
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    // Language switcher buttons
    $$('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    // Init components
    initSpatialExplorer();
    initWorkplaceModule();
    initPlatesGrid();
    initLightbox();

    // Default language zh-TW
    setLanguage('zh-TW');

    console.log('LINEAR SPACE / FRAME/01 Case Study Initialized (16 Shots, 5 Zones, Workplace Explorer V4)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
