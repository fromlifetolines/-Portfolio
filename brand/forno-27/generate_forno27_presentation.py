#!/usr/bin/env python3
"""
FLTL × HOWARD — FORNO 27
Master Presentation & Audit Plate Generator V1.1
Generates:
1. assets/forno-27-contact-sheet.jpg (Exhibition-grade 18-shot audit grid)
"""

import os
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MOCKUP_DIR = os.path.join(BASE_DIR, "assets/mockups")
ASSET_DIR = os.path.join(BASE_DIR, "assets")

FONT_CANDIDATES = [
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/STHeiti Medium.ttc",
    "/Library/Fonts/Arial Unicode.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]
FONT_PATH = next((f for f in FONT_CANDIDATES if os.path.exists(f)), None)

if FONT_PATH:
    font_title = ImageFont.truetype(FONT_PATH, 30)
    font_sub = ImageFont.truetype(FONT_PATH, 17)
    font_meta = ImageFont.truetype(FONT_PATH, 13)
    font_caption = ImageFont.truetype(FONT_PATH, 13)
else:
    font_title = font_sub = font_meta = font_caption = ImageFont.load_default()

def generate_contact_sheet():
    print("[1/1] Generating FORNO 27 Master Contact Sheet V1.1 (18 Shots)...")
    cols, rows = 3, 6
    thumb_w, thumb_h = 720, 540
    pad = 28
    header_h = 160
    footer_h = 70

    total_w = cols * thumb_w + (cols + 1) * pad
    total_h = header_h + rows * (thumb_h + 38) + footer_h

    contact = Image.new("RGB", (total_w, total_h), "#181311")
    draw = ImageDraw.Draw(contact)

    # Header Accent bar
    draw.rectangle([(pad, 20), (pad + 120, 24)], fill="#8C2D26")

    # Header Typography
    draw.text((pad, 36), "FLTL × HOWARD — FORNO 27 (當代義式窯烤與烘焙)", font=font_title, fill="#F5EFE6")
    draw.text((pad, 82), "MASTER EXHIBITION VISUAL ASSETS · 18 PHOTOREALISTIC & ENGINEERING SHOTS AUDIT SHEET", font=font_sub, fill="#C85332")
    draw.text((pad, 116), "RELEASE: V1.1 FINAL IDENTITY LOCK (9-BRICK ARCH) · GEOMETRIC CORRECTION · RELEASE CANDIDATE", font=font_meta, fill="#8E857C")

    titles = [
        "SHOT 01 — HERO CRAFT PIZZA BOX (經典 12 吋瓦楞外帶披薩盒)",
        "SHOT 02 — UNBOXING EXPERIENCE (開盒熱氣騰騰披薩與防油紙)",
        "SHOT 03 — DIPPING SAUCE LINE (四款經典義式沾醬玻璃罐系列)",
        "SHOT 04 — ARTISAN SOURDOUGH BREAD (酸種麵包與棉線紙封籤包裝)",
        "SHOT 05 — OLIVE OIL & BALSAMIC (冷壓初榨橄欖油與巴薩米克醋)",
        "SHOT 06 — COMPLETE PRODUCT FAMILY (全系列產品家族全景陳列)",
        "SHOT 07 — CRAFT DETAIL: RED HOT FOIL (未塗布牛皮紙紅色燙金)",
        "SHOT 08 — TAKEOUT TOTE & NAPKINS (外帶紙袋、封口貼與印花餐巾)",
        "SHOT 09 — MARGHERITA CLASSICA (經典瑪格麗特披薩工藝故事)",
        "SHOT 10 — DIAVOLA & CHILI HONEY (香辣薩拉米與辣蜂蜜工藝故事)",
        "SHOT 11 — QUATTRO FORMAGGI (四種起司與黑松露蜂蜜工藝故事)",
        "SHOT 12 — RUSTIC SOURDOUGH LOAF (傳統柴燒窯烤天然酵母酸種)",
        "SHOT 13 — STOREFRONT & BAKERY CAFE (現代義式窯烤空間與外觀)",
        "SHOT 14 — CONCEPT ENGINEERING SPEC (8\"/12\"/16\" 盒型與提袋規格)",
        "SHOT 15 — PACKAGING DIELINE & STRUCTURE (可編輯向量刀模圖層)",
        "SHOT 16 — PHYSICAL BRAND TOUCHPOINTS (菜單、名片、貼紙與杯墊)",
        "SHOT 17 — DIGITAL ORDERING UI (自適應響應式線上點餐平台)",
        "SHOT 18 — BRAND IDENTITY GUIDELINES (九石放射窯拱母稿與色盤)",
    ]

    for idx in range(18):
        c = idx % cols
        r = idx // cols
        shot_num = idx + 1
        fn = f"shot-{shot_num:02d}.jpg"
        fp = os.path.join(MOCKUP_DIR, fn)

        x = pad + c * (thumb_w + pad)
        y = header_h + r * (thumb_h + 38)

        caption = titles[idx]
        draw.text((x, y - 22), caption, font=font_caption, fill="#B5ADA3")

        if os.path.exists(fp):
            im = Image.open(fp)
            im_thumb = im.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            contact.paste(im_thumb, (x, y))
            draw.rectangle([(x, y), (x + thumb_w, y + thumb_h)], outline="#382C27", width=1)
        else:
            draw.rectangle([(x, y), (x + thumb_w, y + thumb_h)], fill="#28221E", outline="#8C2D26", width=2)
            draw.text((x + 20, y + 20), f"MISSING: {fn}", font=font_caption, fill="#FF6B6B")

    # Footer note
    draw.text((pad, total_h - 40), "© 2026 FLTL × HOWARD. ALL RIGHTS RESERVED. FORNO 27 BRAND CASE STUDY V1.1.", font=font_meta, fill="#6E655C")

    out_path = os.path.join(ASSET_DIR, "forno-27-contact-sheet.jpg")
    contact.save(out_path, quality=92, optimize=True)
    print(f"✓ Contact sheet saved: {out_path} ({contact.size[0]}×{contact.size[1]}px)")

if __name__ == "__main__":
    generate_contact_sheet()
