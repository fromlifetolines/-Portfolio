# FORNO 27 — Visual Integrity Restoration V5

**Date:** 2026-10-19  
**Scope:** FORNO 27 visual presentation only.  
**Mode:** Authored editorial photo recomposition using existing versioned project imagery. No synthetic box engineering, no new fake physical mockup.

## Root cause

Previously published SHOT 01, 03, 06, and 07 rendered inconsistent pizza-box lid planes, oversized or floating lid, fake triangular side gussets, and disconnected hinge relationships. The purported emergency redo images repeated these artifacts. File-presence checks and HTTP 200 tests could not certify the physical packaging geometry.

## Repair strategy

Instead of again falsely claiming a full-scale, manufactured folding pizza box, the four affected positions now use truthful editorial crops of existing FORNO 27 photos. No image claims to document a physically validated opening mechanism.

| Slot | Output | Photo sources | What the image actually shows |
| --- | --- | --- | --- |
| 01 | `assets/mockups/shot-01-v5.jpg` | shot-09 | Finished pizza, branded napkin, partially framed **closed** takeaway box. |
| 03 | `assets/mockups/shot-03-v5.jpg` | shot-09, shot-08, shot-16 | Editorial combination of pizza, print branding, takeaway touchpoints; **not** an open-box construction demonstration. |
| 06 | `assets/mockups/shot-06-v5.jpg` | shot-09, shot-04, shot-12, shot-16 | Pizza, sauce, artisan bakery, branded collateral as a four-quadrant **product-system collage**. |
| 07 | `assets/mockups/shot-07-v5.jpg` | shot-16, shot-04, shot-08 | Paper takeaway bag, menus, napkins and sauces; **not** physical lid-opening photography. |

## Source of truth and references

- Image source: `brand/forno-27/assets/mockups/shot-XX.jpg` within this repository; the pipeline does **not** pull files from Antigravity temporary directories.
- Builder: `brand/forno-27/build_editorial_integrity_v5.py`.
- Generated contact sheet: `brand/forno-27/assets/forno-27-contact-sheet-v5.jpg`.
- The case-study page and mirror, OG thumbnail, lightbox references and homepage WORK cover must point to **versioned v5 names**, never silent overwrites.
- **Identity:** original nine-stone kiln arch and five palette tokens retained.
- **Protected:** FLTL NFC, 島序, About Motion, core homepage animation, SHOT 14/15/17/18 native editable engineering and UI.

## Quality gate and open engineering caveats

- **Visual artifact gate:** All replaced positions omit the anomalous raised lid, disjointed hinge and triangular folding parts. This is a verified compositional avoidance of previously rejected geometry, **not** proof of correct physical package tooling.
- **Print detail gate:** Artwork on reused photo panels remains from the approved FORNO 27 branding. Recomposition only crops and arranges photographs; it never retypes onto package surfaces.
- **Concept packaging:** Dimensions, die-line and folding feasibility remain **concept designs requiring a physical mockup and converter validation**. Do not claim manufactured proof, engineering certification, or verified venting/ECT performance.
- **Content consistency:** Captions for 01/03/06/07 explicitly describe editorial photography and service touchpoints. The old claims of tested glueless locks, lid clearance, and unboxing mechanics have been removed from the affected shot captions.
- **Remaining visual caveat:** Other existing photographs are retained; no universal 18/18 physical engineering PASS is claimed. The remaining photo surfaces need human visual approval if new errors are found.

## Release-specific safeguards

Do not publish until assets 01/03/06/07 and contact sheet are present at the exact paths, and both the case page and homepage WORK card reference the versioned names. Compare `main` against repair branch. GitHub Pages success does not equal independent visual approval.
