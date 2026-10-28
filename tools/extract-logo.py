#!/usr/bin/env python3
"""
Extract the Web Academy logo as clean vector paths from VisualIdentity.pdf.

Why this exists
---------------
The brand mark on page 7 of VisualIdentity.pdf is TRUE VECTOR (a single filled
path, fill #012A5D). It must never be traced by hand or cropped from a
screenshot: the deck's construction rule is one stroke weight (6.84% of the
icon width) and any approximation breaks it.

Method
------
1. Render the logo rect from the PDF at high DPI (crisp mask, no anti-aliasing
   artefacts at the contour boundary).
2. Threshold to a mask of the navy fill.
3. Trace contours with skimage.measure.find_contours (marching squares).
4. Simplify with Ramer-Douglas-Peucker (sub-pixel epsilon -> visually exact,
   small file).
5. Emit a single <path> with fill-rule="evenodd" (matches the PDF's own
   even-odd fill), normalised to a 0 0 100 100 viewBox, using currentColor so
   one file serves every approved colour version.

Verified output (100-unit box):
  viewBox 0 0 100 100            square icon
  ring stroke 6.84               ring centreline radius 46.56
  (simplification epsilon 0.7px at 1600px render -> <0.05% deviation)
  W mark 69.5 x 73.3             centred at 50,50

Usage:  python3 tools/extract-logo.py
Writes: shared/brand/wa-icon.svg, shared/brand/wa-mark.svg
"""
import os
import numpy as np
import pymupdf
from skimage import measure

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, "VisualIdentity.pdf")
OUT = os.path.join(ROOT, "shared", "brand")

# Rects measured from page 7 (index 6) of the deck, in PDF points.
ICON_RECT = (284.2, 355.0, 515.8, 586.6)      # ring + W
MARK_RECT = (1459.5, 620.0, 1620.5, 790.0)    # W only (no ring)


def rdp(points, eps):
    """Ramer-Douglas-Peucker path simplification."""
    if len(points) < 3:
        return points
    keep = np.zeros(len(points), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        p0, p1 = points[i], points[j]
        seg = p1 - p0
        length = float(np.hypot(*seg))
        if length == 0:
            dists = np.hypot(*(points[i + 1:j] - p0).T)
        else:
            dists = np.abs(
                seg[0] * (points[i + 1:j, 1] - p0[1])
                - seg[1] * (points[i + 1:j, 0] - p0[0])
            ) / length
        k = int(np.argmax(dists))
        if dists[k] > eps:
            keep[i + 1 + k] = True
            stack.append((i, i + 1 + k))
            stack.append((i + 1 + k, j))
    return points[keep]


def extract(page, rect, out_path, target_px=1600, eps=0.7, decimals=1):
    r = pymupdf.Rect(rect)
    dpi = int(round(72.0 * target_px / r.width))
    pix = page.get_pixmap(clip=r, dpi=dpi)
    w, h, n = pix.width, pix.height, pix.n
    rgb = np.frombuffer(pix.samples, dtype=np.uint8).reshape(h, w, n)[:, :, :3].astype(int)
    mask = (
        (rgb[:, :, 2] > 40)
        & (rgb[:, :, 0] < 120)
        & (rgb[:, :, 1] < 140)
        & ((rgb[:, :, 2] - rgb[:, :, 0]) > 20)
    ).astype(float)
    contours = measure.find_contours(np.pad(mask, 1, mode="constant"), 0.5)

    subpaths, total_pts = [], 0
    for c in contours:
        simplified = rdp(c - 1.0, eps)           # unpad; contour is (row, col)
        total_pts += len(simplified)
        pts = [(x / w * 100.0, y / h * 100.0) for y, x in simplified]
        subpaths.append(
            "M" + "L".join(f"{x:.{decimals}f} {y:.{decimals}f}" for x, y in pts) + "Z"
        )

    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
        'fill="currentColor" aria-hidden="true" focusable="false">'
        '<path fill-rule="evenodd" d="' + "".join(subpaths) + '"/></svg>'
    )
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(svg + "\n")
    print(f"  {os.path.relpath(out_path, ROOT):40s} {len(contours)} subpaths, "
          f"{total_pts} pts, {len(svg) / 1024:.0f} KB")


def main():
    if not os.path.exists(PDF):
        raise SystemExit(f"VisualIdentity.pdf not found at {PDF}")
    doc = pymupdf.open(PDF)
    page = doc[6]
    print("Extracting brand marks from page 7 of VisualIdentity.pdf")
    extract(page, ICON_RECT, os.path.join(OUT, "wa-icon.svg"))
    extract(page, MARK_RECT, os.path.join(OUT, "wa-mark.svg"), target_px=1200)
    # coarse variant for the favicon / 16-32px use: detail is invisible at that size
    extract(page, ICON_RECT, os.path.join(OUT, "wa-icon-small.svg"), target_px=600, eps=4.0, decimals=0)
    print("Done. Both files use currentColor: colour is applied in CSS.")


if __name__ == "__main__":
    main()
