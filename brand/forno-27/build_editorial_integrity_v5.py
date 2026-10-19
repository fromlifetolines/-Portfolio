#!/usr/bin/env python3
"""FORNO 27 editorial integrity repair.
Builds honest photographic editorial plates from existing approved source imagery.
No invented box-hinge geometry, fake material claims, or AI-text overlays.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
SRC = BASE / 'assets' / 'mockups'
OUT = SRC
W, H = 1448, 1086
PAPER = '#F1E7D4'
INK = '#251C19'
RED = '#8C2D26'
FONT_BASE = '/usr/share/fonts/truetype/dejavu/'

def font(sz, serif=False, bold=False):
    f = ('DejaVuSerif-Bold.ttf' if bold else 'DejaVuSerif.ttf') if serif else ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')
    return ImageFont.truetype(FONT_BASE + f, sz)

def frame():
    return Image.new('RGB', (W, H), PAPER)

def crop_paste(canvas, target, shot, crop=None):
    im = Image.open(SRC / f'shot-{shot:02d}.jpg').convert('RGB')
    if crop:
        im = im.crop(crop)
    x0,y0,x1,y1 = target
    im = ImageOps.fit(im, (x1-x0,y1-y0), method=Image.Resampling.LANCZOS)
    canvas.paste(im, (x0,y0))

def finish(img, n, tag, headline, caption):
    d=ImageDraw.Draw(img)
    d.rectangle((0,874,W,H),fill=PAPER)
    d.line((72,903,W-72,903),fill='#BCB0A1',width=2)
    d.text((72,917),f'SHOT {n:02d}    /    {tag}',font=font(19,bold=True),fill=RED)
    d.text((70,952),headline,font=font(42,serif=True),fill=INK)
    d.text((W-73,984),caption,font=font(16),fill='#6C6055',anchor='ra')
    img.save(OUT / f'shot-{n:02d}-v5.jpg',quality=94,subsampling=0,optimize=True)

# Replace physically implausible box photographs with honest, intentionally
# art-directed photo essays. Never represent them as tested open-box prototypes.
c=frame()
crop_paste(c,(0,0,W,874),9,(0,25,1448,1040))
finish(c,1,'BRAND EXPRESSION','PIZZA  /  PANE  /  BUONA VITA','PACKAGING  +  ARTISAN FOOD')

c=frame()
crop_paste(c,(0,0,955,874),9,(60,295,1070,1050))
crop_paste(c,(968,0,W,433),8,(660,0,1448,740))
crop_paste(c,(968,445,W,874),16,(0,0,770,700))
finish(c,3,'PIZZA  +  PACKAGING','THE ART OF TAKEAWAY','CRAFT, FOOD & PRINT')

c=frame()
gap=12; pw=(W-gap)//2; ph=(874-gap)//2
crop_paste(c,(0,0,pw,ph),9,(0,215,1080,995))
crop_paste(c,(pw+gap,0,W,ph),4)
crop_paste(c,(0,ph+gap,pw,874),12,(290,480,1448,1050))
crop_paste(c,(pw+gap,ph+gap,W,874),16)
finish(c,6,'PRODUCT ECOSYSTEM','ONE BRAND. MULTIPLE TOUCHPOINTS.','PIZZA / SAUCE / BAKERY / PRINT')

c=frame()
crop_paste(c,(0,0,842,874),16,(0,0,760,890))
crop_paste(c,(854,0,W,431),4,(60,70,1410,920))
crop_paste(c,(854,443,W,874),8,(120,110,930,905))
finish(c,7,'PRINT  +  SERVICE','THE TAKEAWAY RITUAL','BAG / MENU / SAUCE SYSTEM')

# Rebuild contact sheet from ACTUAL current shot set, not stale screenshots.
thumbw,thumbh=730,485
cols,rows=3,6
sheet=Image.new('RGB',(cols*thumbw,rows*(thumbh+66)),PAPER)
d=ImageDraw.Draw(sheet)
for k in range(18):
    n=k+1
    selected=SRC / (f'shot-{n:02d}-v5.jpg' if n in (1,3,6,7) else f'shot-{n:02d}.jpg')
    src=Image.open(selected).convert('RGB')
    thumb=ImageOps.fit(src,(thumbw,thumbh),method=Image.Resampling.LANCZOS)
    x=(k%cols)*thumbw;y=(k//cols)*(thumbh+66)
    sheet.paste(thumb,(x,y))
    d.rectangle((x,y+thumbh,x+thumbw,y+thumbh+66),fill=PAPER)
    d.text((x+20,y+thumbh+17),f'SHOT {n:02d}  /  FORNO 27',font=font(21,bold=True),fill=INK)
sheet.save(BASE/'assets'/'forno-27-contact-sheet-v5.jpg',quality=90,subsampling=0,optimize=True)
print('Created four versioned visual repair plates and one 18-shot contact sheet.')
