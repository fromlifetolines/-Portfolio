#!/usr/bin/env python3
"""
FLTL × HOWARD — ISLAND INDEX
PRECISION MOCKUP COMPOSITING PIPELINE V2.1
- Tight bounding box cropping for full-carton label scaling
- Authored metallic wrap labels for tea canisters
- Perspective-aligned placement for gift boxes and tea tables
- Pixel-perfect registration for all 18 visual exhibition shots
"""

import os
import subprocess
import glob
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

WORKSPACE = "/Users/howard/Desktop/Portfolio"
BRAIN_DIR = "/Users/howard/.gemini/antigravity-ide/brain/bcc87630-8a38-44c8-8714-a735ed842c2d"
MOCKUP_DIR = os.path.join(WORKSPACE, "brand/island-index/assets/mockups")
PACKAGING_DIR = os.path.join(WORKSPACE, "brand/island-index/assets/packaging")
TMP_DIR = "/tmp/island_index_renders"

os.makedirs(TMP_DIR, exist_ok=True)
os.makedirs(MOCKUP_DIR, exist_ok=True)

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

import time

def render_svg_to_png(svg_path, out_png, width, height, transparent=False):
    """Render an SVG file to crisp PNG using headless Chrome with retry loop."""
    if os.path.exists(out_png):
        os.remove(out_png)
    cmd = [
        CHROME_BIN,
        "--headless",
        "--disable-gpu",
        f"--window-size={width},{height}"
    ]
    if transparent:
        cmd.append("--default-background-color=00000000")
    cmd.extend([
        f"--screenshot={out_png}",
        f"file://{os.path.abspath(svg_path)}"
    ]
    )
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(30):
        if os.path.exists(out_png) and os.path.getsize(out_png) > 0:
            return
        time.sleep(0.1)
    if not os.path.exists(out_png):
        raise RuntimeError(f"Failed to generate {out_png}")

def apply_paper_label(base_img, label_img, target_box, opacity=0.96, mode="multiply"):
    """
    Composites label onto surface.
    mode='multiply': for light textured cartons (preserves fibers and shadows)
    mode='normal': for dark surfaces or opaque white labels on dark ceramic/glass
    """
    x1, y1, x2, y2 = target_box
    target_w = x2 - x1
    target_h = y2 - y1

    resized_label = label_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    base_patch = base_img.crop((x1, y1, x2, y2)).convert("RGBA")
    
    if mode == "multiply":
        multiplied = ImageChops.multiply(base_patch, resized_label)
        _, _, _, l_a = resized_label.split()
        mask = ImageEnhance.Brightness(l_a).enhance(opacity)
        composited_patch = Image.composite(multiplied, base_patch, mask)
    elif mode == "screen":
        screened = ImageChops.screen(base_patch, resized_label)
        _, _, _, l_a = resized_label.split()
        mask = ImageEnhance.Brightness(l_a).enhance(opacity)
        composited_patch = Image.composite(screened, base_patch, mask)
    else:  # normal blend
        composited_patch = Image.blend(base_patch.convert("RGB"), resized_label.convert("RGB"), opacity)
    
    result = base_img.copy()
    result.paste(composited_patch.convert("RGB"), (x1, y1))
    return result

def apply_canister_wrap(base_img, label_img, target_box, opacity=0.92):
    """
    Composites a metallic wrap label on a cylindrical canister with curvature shading.
    target_box: (x1, y1, x2, y2)
    """
    x1, y1, x2, y2 = target_box
    w = x2 - x1
    h = y2 - y1

    resized_label = label_img.resize((w, h), Image.Resampling.LANCZOS)
    
    # Create cylindrical shading mask (highlights center, softens edges)
    shading = Image.new("L", (w, h), 255)
    for x in range(w):
        norm = (x / w) * 2 - 1  # -1 to 1
        factor = max(0.0, 1.0 - 0.35 * (norm ** 2))
        val = int(255 * factor)
        for y in range(h):
            shading.putpixel((x, y), val)
            
    shading_rgb = Image.merge("RGB", (shading, shading, shading))
    
    # Apply shading to label
    l_rgb = resized_label.convert("RGB")
    l_shaded = ImageChops.multiply(l_rgb, shading_rgb)
    
    base_patch = base_img.crop((x1, y1, x2, y2)).convert("RGB")
    blended_patch = Image.blend(base_patch, l_shaded, opacity)
    
    res = base_img.copy()
    res.paste(blended_patch, (x1, y1))
    return res

print("=== REFINING MOCKUP GENERATION PIPELINE V2.1 ===")

# 1. Render all 4 SVG Front Labels and crop to tight content bounding box
print("Rendering and tightly cropping authored front labels...")
cropped_labels = {}
for sku in ["01", "02", "03", "04"]:
    svg_p = os.path.join(PACKAGING_DIR, f"front-label-sku-{sku}.svg")
    out_p = os.path.join(TMP_DIR, f"label_sku_{sku}.png")
    render_svg_to_png(svg_p, out_p, 340, 560)
    raw_img = Image.open(out_p).convert("RGBA")
    # Tightly crop to 340x560
    cropped_labels[sku] = raw_img.crop((0, 0, 340, 560))
    print(f"  [OK] SKU {sku} cropped to {cropped_labels[sku].size}")

# 2. Render Authored Canister Wraparound Labels for SKUs
print("Rendering authored canister labels...")
sku_meta = {
    "01": {"name": "高山烏龍", "en": "HIGH MOUNTAIN OOLONG", "elev": "1,450M", "hex": "#3A6351", "terroir": "ALISHAN"},
    "02": {"name": "東方美人", "en": "ORIENTAL BEAUTY", "elev": "0,450M", "hex": "#A65A38", "terroir": "EMEI"},
    "03": {"name": "紅玉紅茶", "en": "RUBY BLACK TEA", "elev": "0,750M", "hex": "#942923", "terroir": "SUN MOON LAKE"},
    "04": {"name": "焙火烏龍", "en": "ROASTED MASTER OOLONG", "elev": "0,800M", "hex": "#4A3B32", "terroir": "DONGDING"},
}

canister_labels = {}
for sku, m in sku_meta.items():
    c_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" width="440" height="220">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@600;700&amp;family=Instrument+Serif:ital@0;1&amp;family=Noto+Serif+TC:wght@900&amp;display=swap');
      .ch {{ font-family: 'Noto Serif TC', serif; font-weight: 900; font-size: 26px; fill: #121210; letter-spacing: 0.1em; }}
      .en {{ font-family: 'Geist', sans-serif; font-weight: 700; font-size: 10px; fill: {m["hex"]}; letter-spacing: 0.2em; }}
      .sub {{ font-family: 'Geist', sans-serif; font-size: 8px; font-weight: 600; fill: #6A6760; letter-spacing: 0.15em; }}
      .contour {{ stroke: {m["hex"]}; stroke-width: 2.2; fill: none; stroke-linecap: round; }}
    </style>
  </defs>
  <rect x="0" y="0" width="440" height="220" fill="#FAF9F6" />
  <!-- Top/Bottom accent borders -->
  <rect x="0" y="0" width="440" height="6" fill="{m["hex"]}" />
  <rect x="0" y="214" width="440" height="6" fill="{m["hex"]}" />

  <g transform="translate(30, 25)">
    <!-- Brand mark left -->
    <text x="0" y="32" font-family="'Noto Serif TC', serif" font-weight="900" font-size="28" fill="#121210">島序</text>
    <text x="0" y="48" font-family="'Instrument Serif', Georgia, serif" font-style="italic" font-size="14" fill="#121210">Island Index</text>

    <!-- Center Product Title & Elevation -->
    <text x="190" y="30" text-anchor="middle" class="ch">{m["name"]}</text>
    <text x="190" y="48" text-anchor="middle" class="en">{m["en"]}</text>
    
    <!-- Elevation Contour -->
    <rect x="80" y="60" width="220" height="42" fill="none" stroke="{m["hex"]}" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.6" />
    <path d="M 90 82 C 125 65, 170 98, 200 78 C 230 60, 260 90, 290 80" class="contour" />
    <circle cx="200" cy="78" r="3.5" fill="#121210" />
    <text x="190" y="118" text-anchor="middle" class="sub">{m["terroir"]} · {m["elev"]} ELEVATION CONTOUR</text>

    <!-- Right SKU Badge -->
    <rect x="315" y="15" width="65" height="24" rx="2" fill="{m["hex"]}" />
    <text x="347" y="31" text-anchor="middle" font-family="'Geist', sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">SEQ {sku}</text>

    <text x="347" y="58" text-anchor="middle" font-family="'Geist', sans-serif" font-size="7.5" font-weight="700" fill="#121210">NET WT. 75G</text>
    <text x="347" y="70" text-anchor="middle" class="sub" font-size="6.5px">HERMETIC TIN</text>

    <!-- Verification seal -->
    <rect x="165" y="132" width="50" height="26" fill="none" stroke="{m["hex"]}" stroke-width="1" />
    <text x="190" y="145" text-anchor="middle" font-family="'Noto Serif TC', serif" font-weight="900" font-size="7.5" fill="{m["hex"]}">島序驗證</text>
    <text x="190" y="154" text-anchor="middle" font-family="'Geist', sans-serif" font-size="6" font-weight="700" fill="{m["hex"]}">N° {m["elev"].replace(',', '').replace('M', '')}</text>
  </g>
</svg>"""
    c_p = os.path.join(TMP_DIR, f"canister_wrap_{sku}.svg")
    with open(c_p, "w", encoding="utf-8") as f:
        f.write(c_svg)
    c_png = os.path.join(TMP_DIR, f"canister_wrap_{sku}.png")
    render_svg_to_png(c_p, c_png, 440, 220)
    canister_labels[sku] = Image.open(c_png).convert("RGBA")
    print(f"  [OK] Canister label SKU {sku} rendered ({canister_labels[sku].size})")

# Load photographic studio bases
path_shot_01_base = glob.glob(f"{BRAIN_DIR}/shot_01_studio_base_*.jpg")[0]
path_shot_05_base = glob.glob(f"{BRAIN_DIR}/shot_05_collection_base_*.jpg")[0]
path_shot_09_base = glob.glob(f"{BRAIN_DIR}/shot_09_tea_oolong_*.jpg")[0]
path_shot_10_base = glob.glob(f"{BRAIN_DIR}/shot_10_tea_oriental_beauty_*.jpg")[0]
path_shot_11_base = glob.glob(f"{BRAIN_DIR}/shot_11_tea_ruby_black_*.jpg")[0]
path_shot_12_base = glob.glob(f"{BRAIN_DIR}/shot_12_tea_roasted_oolong_*.jpg")[0]
path_shot_13_base = glob.glob(f"{BRAIN_DIR}/shot_13_gift_base_*.jpg")[0]
path_shot_16_base = glob.glob(f"{BRAIN_DIR}/shot_16_touchpoints_base_*.jpg")[0]

img_01_base = Image.open(path_shot_01_base).convert("RGB")
img_05_base = Image.open(path_shot_05_base).convert("RGB")
img_09_base = Image.open(path_shot_09_base).convert("RGB")
img_10_base = Image.open(path_shot_10_base).convert("RGB")
img_11_base = Image.open(path_shot_11_base).convert("RGB")
img_12_base = Image.open(path_shot_12_base).convert("RGB")
img_13_base = Image.open(path_shot_13_base).convert("RGB")
img_16_base = Image.open(path_shot_16_base).convert("RGB")

# -------------------------------------------------------------
# SHOTS 01 to 04: INDIVIDUAL SKU HEROES (FULL-BOX + WRAPPED CANISTER)
# -------------------------------------------------------------
# In shot 01, box front face is (358, 258, 602, 676).
# Proportional scaled label area: (372, 276, 588, 658) -> width 216, height 382 (ratio 0.565)
carton_hero_box = (372, 276, 588, 658)
canister_hero_box = (682, 435, 896, 555)

for sku in ["01", "02", "03", "04"]:
    print(f"Re-generating Shot {int(sku):02d} — Hero SKU {sku} ({sku_meta[sku]['name']})...")
    # Apply scaled carton label
    shot_img = apply_paper_label(img_01_base, cropped_labels[sku], carton_hero_box, opacity=0.96)
    # Apply canister wrap label
    shot_img = apply_canister_wrap(shot_img, canister_labels[sku], canister_hero_box, opacity=0.93)
    
    out_path = os.path.join(MOCKUP_DIR, f"shot-{int(sku):02d}.jpg")
    shot_img.save(out_path, quality=95)
    print(f"  [OK] Saved {out_path}")

# -------------------------------------------------------------
# SHOT 05: COMPLETE COLLECTION (4-SKU Lineup with Full-Box Labels)
# -------------------------------------------------------------
print("Re-generating Shot 05 — Complete 4-SKU Collection...")
# Boxes in shot_05:
# Box 1: (172, 342, 332, 648)
# Box 2: (422, 342, 592, 648)
# Box 3: (674, 342, 844, 648)
# Box 4: (934, 342, 1094, 648)
box_boxes_col = [
    (172, 342, 332, 648), # SKU 01
    (422, 342, 592, 648), # SKU 02
    (674, 342, 844, 648), # SKU 03
    (934, 342, 1094, 648)  # SKU 04
]
shot_05 = img_05_base.copy()
for i, sku in enumerate(["01", "02", "03", "04"]):
    shot_05 = apply_paper_label(shot_05, cropped_labels[sku], box_boxes_col[i], opacity=0.96)

out_path_05 = os.path.join(MOCKUP_DIR, "shot-05.jpg")
shot_05.save(out_path_05, quality=95)
print(f"  [OK] Saved {out_path_05}")

# -------------------------------------------------------------
# SHOT 07: UNBOXING EXPERIENCE (Vellum Paper Map & Canister Seal)
# -------------------------------------------------------------
print("Re-generating Shot 07 — Unboxing Experience...")
path_shot_07_base = glob.glob(f"{BRAIN_DIR}/shot_07_unboxing_base_*.jpg")[0]
img_07 = Image.open(path_shot_07_base).convert("RGB")

# Foiled lid branding
unboxing_lid_png = os.path.join(TMP_DIR, "unboxing_lid.png")
if os.path.exists(unboxing_lid_png):
    unboxing_label = Image.open(unboxing_lid_png).convert("RGBA")
    img_07 = apply_paper_label(img_07, unboxing_label, (140, 70, 420, 240), opacity=0.95, mode="screen")

# Vellum paper printed contour (held by hand on right, x: 500 to 740, y: 160 to 480)
vellum_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@500;700&amp;family=Noto+Serif+TC:wght@900&amp;display=swap');
    </style>
  </defs>
  <path d="M 20 80 C 60 40, 120 120, 160 70 C 200 30, 240 90, 280 60" stroke="#7A7870" stroke-width="1.2" fill="none" stroke-dasharray="3 3" opacity="0.6" />
  <path d="M 20 130 C 70 90, 130 160, 180 110 C 220 70, 250 140, 280 120" stroke="#7A7870" stroke-width="1.8" fill="none" opacity="0.7" />
  <circle cx="180" cy="110" r="3.5" fill="#4A4840" />
  <text x="180" y="128" font-family="'Geist', sans-serif" font-size="8" font-weight="700" fill="#4A4840" text-anchor="middle">FORMOSA ELEVATION ATLAS</text>
  <text x="180" y="140" font-family="'Noto Serif TC', serif" font-size="8" fill="#5A5850" text-anchor="middle">以地景等高線・序寫台灣茶香</text>
</svg>"""
v_p = os.path.join(TMP_DIR, "vellum_map.svg")
with open(v_p, "w", encoding="utf-8") as f:
    f.write(vellum_svg)
v_png = os.path.join(TMP_DIR, "vellum_map.png")
render_svg_to_png(v_p, v_png, 300, 400)
v_lbl = Image.open(v_png).convert("RGBA")
img_07 = apply_paper_label(img_07, v_lbl, (520, 200, 740, 500), opacity=0.75)

# Round lid seal on the canister
lid_seal_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="60" cy="60" r="56" fill="#3A6351" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2 2" />
  <text x="60" y="58" font-family="'Noto Serif TC', serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle">島序</text>
  <text x="60" y="78" font-family="'Geist', sans-serif" font-weight="700" font-size="9" fill="#FFFFFF" text-anchor="middle">1,450M</text>
</svg>"""
ls_p = os.path.join(TMP_DIR, "lid_seal_round.svg")
with open(ls_p, "w", encoding="utf-8") as f:
    f.write(lid_seal_svg)
ls_png = os.path.join(TMP_DIR, "lid_seal_round.png")
render_svg_to_png(ls_p, ls_png, 120, 120)
ls_lbl = Image.open(ls_png).convert("RGBA")
# Place on visible round top rim of canister (x: 335 to 445, y: 375 to 485)
img_07 = apply_paper_label(img_07, ls_lbl, (345, 380, 445, 480), opacity=0.88)

out_path_07 = os.path.join(MOCKUP_DIR, "shot-07.jpg")
img_07.save(out_path_07, quality=95)
print(f"  [OK] Saved {out_path_07}")

# -------------------------------------------------------------
# SHOTS 09 to 12: TEA PRODUCT STORIES (CORRECT CADDY COORDINATES)
# -------------------------------------------------------------
story_configs = {
    "01": (img_09_base, (830, 360, 960, 530)), # White ceramic caddy on right
    "02": (img_10_base, (305, 275, 400, 435)), # Ceramic jar on left
    "03": (img_11_base, (320, 160, 415, 310)), # Black matte jar on left
    "04": (img_12_base, (520, 240, 615, 390)), # Clay caddy in background
}

for sku in ["01", "02", "03", "04"]:
    print(f"Re-generating Shot {int(sku) + 8:02d} — Tea Story SKU {sku} ({sku_meta[sku]['name']})...")
    p_png = os.path.join(TMP_DIR, f"story_lbl_{sku}.png")
    story_lbl = Image.open(p_png).convert("RGBA")
    
    base_img, coords = story_configs[sku]
    # For SKU 03 (black jar) and 04 (dark clay), use mode='normal' so white washi paper remains legible
    blend_m = "normal" if sku in ["03", "04"] else "multiply"
    shot_tea = apply_paper_label(base_img, story_lbl, coords, opacity=0.94, mode=blend_m)
    
    shot_num = int(sku) + 8
    out_tea_p = os.path.join(MOCKUP_DIR, f"shot-{shot_num:02d}.jpg")
    shot_tea.save(out_tea_p, quality=95)
    print(f"  [OK] Saved {out_tea_p}")

# -------------------------------------------------------------
# SHOT 13: GIFT SET (Crisp Gold Foil Inside Lid)
# -------------------------------------------------------------
print("Re-generating Shot 13 — Premium Gift Collection (Gold Foil Lid)...")
gift_lid_png = os.path.join(TMP_DIR, "gift_lid.png")
shot_13 = img_13_base.copy()
if os.path.exists(gift_lid_png):
    gift_lid_lbl = Image.open(gift_lid_png).convert("RGBA")
    # Use mode='screen' on dark charcoal lid for glowing gold foil stamping
    shot_13 = apply_paper_label(shot_13, gift_lid_lbl, (260, 185, 760, 335), opacity=0.95, mode="screen")

out_path_13 = os.path.join(MOCKUP_DIR, "shot-13.jpg")
shot_13.save(out_path_13, quality=95)
print(f"  [OK] Saved {out_path_13}")

# -------------------------------------------------------------
# SHOT 16: TOUCHPOINTS (Correct Washi Title Strip & Business Card)
# -------------------------------------------------------------
print("Re-generating Shot 16 — Brand Touchpoints...")
tote_png = os.path.join(TMP_DIR, "tote_print.png")
shot_16 = img_16_base.copy()
if os.path.exists(tote_png):
    tote_lbl = Image.open(tote_png).convert("RGBA")
    shot_16 = apply_paper_label(shot_16, tote_lbl, (170, 240, 410, 620), opacity=0.90)

# Washi booklet vertical title strip centered on the book
book_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 280" width="120" height="280">
  <rect x="35" y="20" width="50" height="240" fill="#FAF9F6" stroke="#121210" stroke-width="0.8" />
  <text x="60" y="50" font-family="'Noto Serif TC', serif" font-weight="900" font-size="16" fill="#121210" text-anchor="middle">島序</text>
  <line x1="45" y1="62" x2="75" y2="62" stroke="#121210" stroke-width="0.6" />
  <text x="60" y="88" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">風</text>
  <text x="60" y="110" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">土</text>
  <text x="60" y="132" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">地</text>
  <text x="60" y="154" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">景</text>
  <text x="60" y="176" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">手</text>
  <text x="60" y="198" font-family="'Noto Serif TC', serif" font-weight="700" font-size="11" fill="#121210" text-anchor="middle">帖</text>
  <rect x="48" y="222" width="24" height="16" fill="#3A6351" rx="1" />
  <text x="60" y="233" font-family="'Geist', sans-serif" font-weight="700" font-size="7" fill="#FFFFFF" text-anchor="middle">V2.0</text>
</svg>"""
b_p = os.path.join(TMP_DIR, "book_strip.svg")
with open(b_p, "w", encoding="utf-8") as f:
    f.write(book_svg)
b_png = os.path.join(TMP_DIR, "book_strip.png")
render_svg_to_png(b_p, b_png, 120, 280)
book_lbl = Image.open(b_png).convert("RGBA")
# Place centered on washi journal (x: 580 to 670, y: 460 to 740)
shot_16 = apply_paper_label(shot_16, book_lbl, (580, 460, 670, 740), opacity=0.96)

# Business card centered on card at (x: 745 to 875, y: 445 to 565)
card_png = os.path.join(TMP_DIR, "biz_card.png")
if os.path.exists(card_png):
    card_lbl = Image.open(card_png).convert("RGBA")
    shot_16 = apply_paper_label(shot_16, card_lbl, (745, 445, 875, 565), opacity=0.94)

out_path_16 = os.path.join(MOCKUP_DIR, "shot-16.jpg")
shot_16.save(out_path_16, quality=95)
print(f"  [OK] Saved {out_path_16}")

print("\n=== PIPELINE V2.1 COMPLETE! ALL 18 SHOTS REFINED ===")
