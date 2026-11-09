#!/usr/bin/env python3
"""Optional deterministic glyph atlas exporter; not a build/runtime dependency.
SIL OFL Noto Sans Arabic. HarfBuzz shapes complete logical runs; UAX #9 resolves
mixed-direction run order. Outlines retain joining, ligatures and mark positioning.
"""
import io
import json
import sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from bidi.algorithm import (get_empty_storage, get_base_level, get_embedding_levels,
    explicit_embed_and_overrides, resolve_weak_types, resolve_neutral_types,
    resolve_implicit_levels, reorder_resolved_levels, apply_mirroring)

manifest, font_path, output = sys.argv[1:]
font = TTFont(font_path)
font.flavor = None
buffer = io.BytesIO()
font.save(buffer)
face = hb.Face(buffer.getvalue())
hbfont = hb.Font(face)
hbfont.scale = (face.upem, face.upem)
hb.ot_font_set_funcs(hbfont)
glyphs = font.getGlyphSet()
order = font.getGlyphOrder()
units = face.upem

def visual_runs(text):
    storage = get_empty_storage()
    storage['base_level'] = get_base_level(text)
    storage['base_dir'] = 'R' if storage['base_level'] else 'L'
    get_embedding_levels(text, storage, False, False)
    for i, item in enumerate(storage['chars']):
        item['index'] = i
    explicit_embed_and_overrides(storage, False)
    resolve_weak_types(storage, False)
    resolve_neutral_types(storage, False)
    resolve_implicit_levels(storage, False)
    reorder_resolved_levels(storage, False)
    apply_mirroring(storage, False)
    groups = []
    for item in storage['chars']:
        if not groups or groups[-1][0]['level'] != item['level']:
            groups.append([])
        groups[-1].append(item)
    return [(''.join(c['ch'] for c in sorted(group, key=lambda c: c['index'])),
             'rtl' if group[0]['level'] % 2 else 'ltr') for group in groups]

def shape(text, paths=False):
    pen = SVGPathPen(glyphs, ntos=lambda n: str(round(n, 1)).removesuffix('.0'))
    cursor = 0
    placements = []
    for run, direction in visual_runs(text):
        b = hb.Buffer()
        b.add_str(run)
        b.guess_segment_properties()
        b.direction = direction
        hb.shape(hbfont, b)
        for info, pos in zip(b.glyph_infos, b.glyph_positions):
            if paths:
                key = str(info.codepoint)
                if key not in glyph_paths:
                    one = SVGPathPen(glyphs, ntos=lambda n: str(round(n, 1)).removesuffix('.0'))
                    glyphs[order[info.codepoint]].draw(one)
                    glyph_paths[key] = one.getCommands()
                placements.append([key, cursor + pos.x_offset, pos.y_offset])
            cursor += pos.x_advance
    return cursor, placements if paths else ''

result = {}
glyph_paths = {}
for entry in json.load(open(manifest, encoding='utf8')):
    advance, commands = shape(entry['text'], True)
    # Respect the original drawing's label width. The Arabic sentence remains
    # a single joined, proportionally scaled vector rather than clipped text.
    source_widths = [shape(s['text'])[0] + max(0, len(s['text'])-1) * s['spacing'] * units
                     for s in entry['sources']]
    max_width = min(source_widths) * 1.05
    result[entry['text']] = {'units': units, 'advance': max(1, advance),
                            'maxWidth': max(1, round(max_width)), 'glyphs': commands}
with open(output, 'w', encoding='utf8') as f:
    json.dump({'glyphs': glyph_paths, 'labels': result}, f, ensure_ascii=False, separators=(',', ':'))
    f.write('\n')
print(f'{len(result)} labels, {len(glyph_paths)} reusable outlines, {sum(len(v) for v in glyph_paths.values()):,} path characters')
