#!/usr/bin/env python3
"""Optional independent PDF/calendar parser checks. Requires pymupdf + icalendar."""
from pathlib import Path
import json, re, subprocess, unicodedata
import pymupdf as fitz
from icalendar import Calendar

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '.cache/education-qa'
OUT.mkdir(parents=True, exist_ok=True)
script = """import {courses,resources} from './shared/lib/data.mjs';import {resourceSections} from './shared/lib/downloads.mjs';console.log(JSON.stringify({courses,resources:resources.map(r=>({...r,sections:resourceSections(r)}))}));"""
data = json.loads(subprocess.run(['node', '--input-type=module', '-e', script], cwd=ROOT, check=True, capture_output=True, text=True).stdout)

def plain(s):
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    for a, b in [('–','-'),('—','-'),('→','-'),('“','"'),('”','"'),('‘',"'"),('’',"'")]:
        s = s.replace(a,b)
    return re.sub(r'\s+', ' ', ''.join(c for c in s if 32 <= ord(c) <= 126 or c == '\n')).strip()

result = {'pdfs':0,'pdfPages':0,'calendarFiles':0,'parsedEvents':0,'resourceTextParagraphs':0,'arabicPdfs':0,'arabicPdfPages':0,'arabicFontEmbeddings':0,'arabicTaggedPdfs':0,'arabicCalendarFiles':0,'arabicParsedEvents':0}
for theme in ['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing']:
    base = ROOT / theme / 'dist/assets'
    for file in sorted((base/'downloads').glob('*.pdf')):
        with fitz.open(file) as doc:
            expected = 3 if file.name.startswith('syllabus-') else 4
            assert len(doc) == expected, str(file)
            for page in doc:
                assert len(page.get_text().strip()) > 200, f'Empty PDF page: {file}'
                for x0,y0,x1,y1,*_ in page.get_text('words'):
                    assert x0 >= 0 and y0 >= 0 and x1 <= page.rect.width and y1 <= page.rect.height, f'Clipped text: {file}'
            if file.name.startswith('resource-'):
                r = next(r for r in data['resources'] if f"resource-{r['slug']}.pdf" == file.name)
                for page,section in zip(doc,r['sections']):
                    text = plain(page.get_text())
                    for paragraph in section['lines']:
                        assert plain(paragraph) in text, f'Missing paragraph: {file}: {paragraph[:60]}'
                        result['resourceTextParagraphs'] += 1
            result['pdfs'] += 1
            result['pdfPages'] += len(doc)
    for file in sorted((base/'calendar').glob('*.ics')):
        cal = Calendar.from_ical(file.read_bytes())
        events = [c for c in cal.walk() if c.name == 'VEVENT']
        assert len(events) == (10 if file.name == 'academy.ics' else 1), str(file)
        for event in events:
            assert '(demo)' in str(event['SUMMARY'])
            assert event.decoded('DTSTART').tzinfo is not None
            assert event.decoded('DTEND') > event.decoded('DTSTART')
            assert event.get('UID')
            assert 'no live room' in str(event['DESCRIPTION'])
        result['calendarFiles'] += 1
        result['parsedEvents'] += len(events)
    # Arabic exports use a shaping engine and embedded subset fonts. Their
    # extraction order is not asserted as a substitute for visual/AT review.
    for file in sorted((base/'downloads/ar').glob('*.pdf')):
        with fitz.open(file) as doc:
            expected = 3 if file.name.startswith('syllabus-') else 4
            assert len(doc) == expected, f'Unexpected Arabic pagination: {file}'
            assert doc.xref_get_key(doc.pdf_catalog(), 'Lang') == ('string', 'ar'), str(file)
            assert '/Marked true' in doc.xref_get_key(doc.pdf_catalog(), 'MarkInfo')[1], str(file)
            result['arabicTaggedPdfs'] += 1
            font_ids = set()
            for page in doc:
                text = page.get_text()
                assert sum('\u0600' <= c <= '\u06ff' for c in text) > 100, f'Empty Arabic page: {file}'
                for x0,y0,x1,y1,*_ in page.get_text('words'):
                    assert x0 >= -1 and y0 >= -1 and x1 <= page.rect.width + 1 and y1 <= page.rect.height + 1, f'Clipped Arabic text: {file}'
                for font in page.get_fonts():
                    if 'NotoSansArabic' in font[3]:
                        font_ids.add(font[0])
            assert font_ids, f'No Arabic font: {file}'
            for font_id in font_ids:
                assert len(doc.extract_font(font_id)[3]) > 0, f'Non-embedded font: {file}'
                result['arabicFontEmbeddings'] += 1
            result['arabicPdfs'] += 1
            result['arabicPdfPages'] += len(doc)
    for file in sorted((base/'calendar/ar').glob('*.ics')):
        cal = Calendar.from_ical(file.read_bytes())
        events = [c for c in cal.walk() if c.name == 'VEVENT']
        assert len(events) == (10 if file.name == 'academy.ics' else 1), str(file)
        for event in events:
            assert '(تجريبي)' in str(event['SUMMARY'])
            assert event.decoded('DTSTART').tzinfo is not None
            assert event.decoded('DTEND') > event.decoded('DTSTART')
            assert event.get('UID')
            assert 'لا يوجد صف مباشر' in str(event['DESCRIPTION'])
        result['arabicCalendarFiles'] += 1
        result['arabicParsedEvents'] += len(events)
# Visual parser smoke: the document is rendered, not just accepted syntactically.
source = ROOT/'01-nova-academy/dist/assets/downloads/resource-the-interface-audit-checklist.pdf'
with fitz.open(source) as doc:
    doc[1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(str(OUT/'workbook-page.png'))
with fitz.open(ROOT/'shared/downloads/ar/resource-the-interface-audit-checklist.pdf') as doc:
    doc[1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(str(OUT/'arabic-workbook-page.png'))
(OUT/'downloads-report.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
