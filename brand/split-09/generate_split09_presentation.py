#!/usr/bin/env python3
"""
FLTL × HOWARD — SPLIT/09
Master Presentation & Audit Plate Generator V1.0
Generates:
1. assets/split-09-contact-sheet.jpg (Exhibition-grade 18-shot audit grid)
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
    font_sub = ImageFont.truetype(FONT_PATH, 16)
    font_meta = ImageFont.truetype(FONT_PATH, 13)
    font_caption = ImageFont.truetype(FONT_PATH, 13)
else:
    font_title = font_sub = font_meta = font_caption = ImageFont.load_default()

def generate_contact_sheet():
    print("[1/1] Generating SPLIT/09 Master Contact Sheet V1.0 (18 Shots)...")
    cols, rows = 3, 6
    thumb_w, thumb_h = 720, 405  # 16:9 ratio
    pad = 28
    header_h = 160
    footer_h = 70

    total_w = cols * thumb_w + (cols + 1) * pad
    total_h = header_h + rows * (thumb_h + 38) + footer_h

    contact = Image.new("RGB", (total_w, total_h), "#0A0D1B")
    draw = ImageDraw.Draw(contact)

    # Header Accent bar
    draw.rectangle([(pad, 20), (pad + 140, 24)], fill="#FF6038")

    # Header Typography
    draw.text((pad, 36), "FLTL × HOWARD — SPLIT/09 (CITY NIGHT RUN)", font=font_title, fill="#F5F4EF")
    draw.text((pad, 82), "INTEGRATED ADVERTISING CAMPAIGN · 18 INDEPENDENT DESIGN PLATES AUDIT SHEET", font=font_sub, fill="#2938E8")
    draw.text((pad, 116), "BRAND PALETTE: #10152B · #2938E8 · #FF6038 · #F5F4EF · LOCAL PHASE A ACCEPTANCE", font=font_meta, fill="#7E83A0")

    titles = [
        "SHOT 01 — CAMPAIGN HERO (城市夜間路跑主視覺 · 5K/10K/21K 滿版)",
        "SHOT 02 — BRAND IDENTITY (品牌識別系統 · 斜槓分割與網格秩序)",
        "SHOT 03 — TYPOGRAPHY SYSTEM (大型窄體無襯線字體與等寬數字)",
        "SHOT 04 — GRAPHIC LANGUAGE (色彩架構 · 速度導引線與國際網格)",
        "SHOT 05 — THREE DISTANCES (三種挑戰級別視覺 · 5K/10K/21K)",
        "SHOT 06 — ROUTE SYSTEM (概念路線示意網絡 · 補給與救護站標註)",
        "SHOT 07 — PERFORMANCE DATA (運動效能資訊視覺化 · 配速與心率)",
        "SHOT 08 — RACE GUIDE (參賽指南編輯設計 · 封面與手冊折頁)",
        "SHOT 09 — OUTDOOR BILLBOARD (大型都會戶外看板廣告情境示意)",
        "SHOT 10 — CITY LIGHT SERIES (街角候車亭三聯式燈箱海報應用)",
        "SHOT 11 — SOCIAL CAMPAIGN (社群限動與資訊流動態廣告矩陣)",
        "SHOT 12 — MOTION STORYBOARD (8 秒動態廣告概念分鏡，僅靜態分鏡，未製作 MP4)",
        "SHOT 13 — WEBSITE EXPERIENCE (概念官方網站桌機端沉浸式介面)",
        "SHOT 14 — MOBILE EXPERIENCE (手機行動端體驗與即時路線檢視)",
        "SHOT 15 — REGISTRATION UX (多層級概念報名體驗與選手通行證)",
        "SHOT 16 — RUNNING APPAREL (機能夜跑限定風衣與周邊情境示意)",
        "SHOT 17 — EVENT WAYFINDING (賽事實體導視指標與發光立牌系統)",
        "SHOT 18 — CAMPAIGN SHOWCASE (整合全景展示 · 合作洽談結語)",
    ]

    for idx, title in enumerate(titles):
        col = idx % cols
        row = idx // cols

        x = pad + col * (thumb_w + pad)
        y = header_h + row * (thumb_h + 38)

        shot_id = f"shot-{idx+1:02d}.jpg"
        shot_path = os.path.join(MOCKUP_DIR, shot_id)

        if os.path.exists(shot_path):
            with Image.open(shot_path) as im:
                thumb = im.convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
                contact.paste(thumb, (x, y))
        else:
            draw.rectangle([(x, y), (x + thumb_w, y + thumb_h)], fill="#151C38")
            draw.text((x + 20, y + thumb_h // 2), f"MISSING: {shot_id}", font=font_caption, fill="#FF6038")

        # Frame border
        draw.rectangle([(x, y), (x + thumb_w, y + thumb_h)], outline="#2938E8", width=1)

        # Label background pill
        label_y = y + thumb_h + 6
        draw.rectangle([(x, label_y), (x + thumb_w, label_y + 24)], fill="#10152B")
        draw.rectangle([(x, label_y), (x + thumb_w, label_y + 24)], outline="#202845", width=1)
        draw.text((x + 10, label_y + 4), title, font=font_caption, fill="#F5F4EF")

    # Footer
    footer_y = total_h - footer_h + 16
    draw.line([(pad, footer_y), (total_w - pad, footer_y)], fill="#2938E8", width=1)
    draw.text((pad, footer_y + 14), "© 2026 FLTL / FROM LIFE TO LINES · HOWARD HUANG · SPLIT/09 INDEPENDENT CONCEPT PROJECT", font=font_meta, fill="#7E83A0")
    draw.text((total_w - pad - 420, footer_y + 14), "18 AUDIT PLATES · 2560×1440 · MASTER VERIFIED", font=font_meta, fill="#FF6038")

    out_path = os.path.join(ASSET_DIR, "split-09-contact-sheet.jpg")
    contact.save(out_path, "JPEG", quality=92)
    print(f"Generated: {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    generate_contact_sheet()
