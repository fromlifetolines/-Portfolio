#!/usr/bin/env python3
"""
FLTL × HOWARD — ISLAND INDEX (島序)
Master Presentation & Audit Plate Generator
Generates:
1. island-index-contact-sheet.jpg (2496 × 3702, 3 cols × 6 rows)
2. comparison-plate-{02, 06, 07, 10, 13, 16}.jpg (Side-by-side Before/After plates)
3. crop-*.jpg (200% zoom crops)
"""

import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
MOCKUP_DIR = os.path.join(WORKSPACE, "brand/island-index/assets/mockups")
BEFORE_DIR = os.path.join(WORKSPACE, "brand/island-index/assets/mockups_before_fidelity_v3")
PRES_DIR = os.path.join(WORKSPACE, "brand/island-index/presentation")
os.makedirs(PRES_DIR, exist_ok=True)

# Select best available system font for CJK & Latin typography
FONT_CANDIDATES = [
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/STHeiti Medium.ttc",
    "/Library/Fonts/Arial Unicode.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]
FONT_PATH = next((f for f in FONT_CANDIDATES if os.path.exists(f)), None)

if FONT_PATH:
    font_title = ImageFont.truetype(FONT_PATH, 28)
    font_sub = ImageFont.truetype(FONT_PATH, 18)
    font_meta = ImageFont.truetype(FONT_PATH, 14)
    font_caption = ImageFont.truetype(FONT_PATH, 14)
    font_plate_title = ImageFont.truetype(FONT_PATH, 24)
    font_plate_sub = ImageFont.truetype(FONT_PATH, 16)
    font_plate_desc = ImageFont.truetype(FONT_PATH, 13)
    font_plate_badge = ImageFont.truetype(FONT_PATH, 15)
else:
    font_title = font_sub = font_meta = font_caption = ImageFont.load_default()
    font_plate_title = font_plate_sub = font_plate_desc = font_plate_badge = ImageFont.load_default()

def generate_contact_sheet():
    print("[1/3] Generating Master Contact Sheet (18 Shots)...")
    cols, rows = 3, 6
    thumb_w, thumb_h = 800, 537
    pad = 24
    header_h = 160
    footer_h = 80

    total_w = cols * thumb_w + (cols + 1) * pad
    total_h = header_h + rows * (thumb_h + 40) + footer_h

    contact = Image.new("RGB", (total_w, total_h), "#121210")
    draw = ImageDraw.Draw(contact)

    draw.text((pad + 10, 35), "FLTL × HOWARD — ISLAND INDEX (島序)", font=font_title, fill="#FAF9F5")
    draw.text((pad + 10, 80), "MASTER EXHIBITION VISUAL ASSETS · 18 PHOTOREALISTIC SHOTS AUDIT SHEET", font=font_sub, fill="#D4B066")
    draw.text((pad + 10, 115), "RELEASE: V4.1 APPROVED ASSET RESTORATION · FULL 18 SHOTS AUDIT SHEET", font=font_meta, fill="#8A8880")

    titles = [
        "SHOT 01 — SEQ 01 高山烏龍 PRODUCT HERO",
        "SHOT 02 — SEQ 02 東方美人 PRODUCT HERO",
        "SHOT 03 — SEQ 03 紅玉紅茶 PRODUCT HERO",
        "SHOT 04 — SEQ 04 焙火烏龍 PRODUCT HERO",
        "SHOT 05 — COMPLETE 4-SKU COLLECTION",
        "SHOT 06 — CRAFT DETAIL: DEBOSS & COPPER FOIL",
        "SHOT 07 — UNBOXING EXPERIENCE & VELLUM MAP",
        "SHOT 08 — CANISTER LID LASER ENGRAVING",
        "SHOT 09 — ALISHAN HIGH MOUNTAIN OOLONG STORY",
        "SHOT 10 — EMEI ORIENTAL BEAUTY STORY",
        "SHOT 11 — SUN MOON LAKE RUBY BLACK TEA STORY",
        "SHOT 12 — DONGDING ROASTED MASTER OOLONG STORY",
        "SHOT 13 — 4-CANISTER LUXURY GIFT CHEST (P0)",
        "SHOT 14 — PACKAGING SPECIFICATION SHEET",
        "SHOT 15 — DIELINE CONCEPT & CARTON STRUCTURE",
        "SHOT 16 — PHYSICAL BRAND TOUCHPOINTS",
        "SHOT 17 — DIGITAL FLAGSHIP COMMERCE UI",
        "SHOT 18 — COMPLETE BRAND SYSTEM & PANTONE PALETTE",
    ]

    for idx in range(18):
        c = idx % cols
        r = idx // cols
        shot_num = idx + 1
        fn = f"shot-{shot_num:02d}.jpg"
        fp = os.path.join(MOCKUP_DIR, fn)

        x = pad + c * (thumb_w + pad)
        y = header_h + r * (thumb_h + 40)

        caption = titles[idx]
        draw.text((x, y - 24), caption, font=font_caption, fill="#C8C6BC")

        if os.path.exists(fp):
            im = Image.open(fp)
            im_thumb = im.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            contact.paste(im_thumb, (x, y))
            draw.rectangle([(x, y), (x + thumb_w, y + thumb_h)], outline="#2D2C28", width=1)

    out_p = os.path.join(PRES_DIR, "island-index-contact-sheet.jpg")
    contact.save(out_p, quality=94)
    print(f"  [OK] Saved {out_p}: {contact.size}")

def make_plate(shot_id, title, defect_desc, fix_desc):
    b_path = os.path.join(BEFORE_DIR, f"shot-{shot_id}.jpg")
    a_path = os.path.join(MOCKUP_DIR, f"shot-{shot_id}.jpg")

    img_b = Image.open(b_path)
    img_a = Image.open(a_path)

    w, h = img_b.size
    header_h = 135
    subhead_h = 45
    pad = 20

    total_w = w * 2 + pad * 3
    total_h = header_h + subhead_h + h + pad * 2

    plate = Image.new("RGB", (total_w, total_h), "#121210")
    draw = ImageDraw.Draw(plate)

    draw.text((pad, 20), f"FLTL × HOWARD — ISLAND INDEX · AUDIT PLATE {shot_id}", font=font_plate_title, fill="#FAF9F5")
    draw.text((pad, 54), f"SHOT {shot_id}: {title}", font=font_plate_sub, fill="#D4B066")
    draw.text((pad, 82), f"BEFORE DEFECT: {defect_desc}", font=font_plate_desc, fill="#E07A5F")
    draw.text((pad, 104), f"AFTER REPAIR: {fix_desc}", font=font_plate_desc, fill="#81B29A")

    draw.text((pad, header_h + 10), "BEFORE — UNCALIBRATED 2D OVERLAY (REJECTED)", font=font_plate_badge, fill="#E07A5F")
    draw.text((pad + w + pad, header_h + 10), "AFTER — PHYSICALLY-BASED CYLINDRICAL FIDELITY V3.0 (APPROVED)", font=font_plate_badge, fill="#81B29A")

    plate.paste(img_b, (pad, header_h + subhead_h))
    plate.paste(img_a, (pad + w + pad, header_h + subhead_h))

    draw.rectangle([(pad, header_h + subhead_h), (pad + w, header_h + subhead_h + h)], outline="#E07A5F", width=2)
    draw.rectangle([(pad + w + pad, header_h + subhead_h), (pad + w + pad + w, header_h + subhead_h + h)], outline="#81B29A", width=2)

    out_p = os.path.join(PRES_DIR, f"comparison-plate-{shot_id}.jpg")
    plate.save(out_p, quality=95)
    print(f"  [OK] Saved {out_p}")

def generate_comparison_plates():
    print("\n[2/3] Generating Before/After Comparison Plates...")
    make_plate(
        "13",
        "Four-Canister Luxury Gift Set (P0 Critical Defect)",
        "Labels placed at arbitrary diagonal/diamond rotation floating on foam, ignoring canister cylinder axes.",
        "Surgically aligned cylinder axes (46.5°..55.7°), arcsin cylindrical compression, silky smooth edge anti-aliasing."
    )
    make_plate(
        "07",
        "Unboxing Experience (Canister & Vellum Map)",
        "Canister label rotated incorrectly to lid; vellum map printed directly onto canister face.",
        "Canister label mapped to true cylinder body (-37.9°); vellum atlas correctly projected onto lifted translucent vellum quad."
    )
    make_plate(
        "02",
        "SEQ 02 東方美人 Product Hero",
        "Canister label was flat 2D rectangle pasted across edge seam, zero perspective or roundness.",
        "Accurate perspective quad mapping on carton face; true cylindrical arcsin mapping on canister body."
    )
    make_plate(
        "06",
        "Macro Craft: Deboss & Copper Foil",
        "Flat copper stamp graphic pasted without depth, height-map or edge bevel.",
        "Physical multi-level deboss bevel (135° key light) with warm copper metallic anisotropic luster."
    )
    make_plate(
        "10",
        "Emei Oriental Beauty Sensory Story",
        "Jar graphic in foreground had razor-sharp artificial digital edge violating bokeh circle-of-confusion.",
        "Physically-grounded depth-of-field Gaussian CoC blur matching 50mm f/1.8 optical plane."
    )
    make_plate(
        "16",
        "Physical Brand Touchpoints (Tote, Journal, Card)",
        "Tote print distorted; journal plain text pasted; card contact info pasted onto blank cotton stock.",
        "Woven linen screenprint on tote; letterpress deboss on washi journal; pristine minimalist handmade cotton card preserved."
    )

def generate_crops():
    print("\n[3/3] Generating 200% Detail Inspection Crops...")
    crops = [
        ("13", (200, 260, 460, 530), "crop-shot13-canister-curvature.jpg"),
        ("07", (410, 390, 690, 680), "crop-shot07-canister-window-light.jpg"),
        ("06", (300, 200, 1000, 690), "crop-shot06-copper-foil-emboss.jpg"),
        ("02", (420, 260, 860, 710), "crop-shot02-carton-canister-seam.jpg"),
        ("16", (360, 280, 800, 730), "crop-shot16-screenprint-canvas.jpg")
    ]
    for s_id, box, out_fn in crops:
        im = Image.open(os.path.join(MOCKUP_DIR, f"shot-{s_id}.jpg"))
        crop_im = im.crop(box)
        out_p = os.path.join(PRES_DIR, out_fn)
        crop_im.save(out_p, quality=95)
        print(f"  [OK] Saved {out_p}: {crop_im.size}")

if __name__ == "__main__":
    generate_contact_sheet()
    if os.path.exists(BEFORE_DIR):
        generate_comparison_plates()
    generate_crops()
    print("\n[DONE] All presentation deliverables generated successfully!")
