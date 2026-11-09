/* ==========================================================================
   Shared content model. Placeholder copy, final structure.
   Every template draws from these collections so cross-template links resolve
   and the family stays coherent.
   ========================================================================== */
import { subjectCover, portraitArt, scene, educationImageSet } from './education-art.mjs';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const mentors = [
  { id: 'ana', name: 'Ana Torres', role: 'Illustration & visual story', specialty: ['Illustration', 'Storyboarding'], city: 'Lisbon', rating: 4.9, students: 12800, courses: 4, bio: 'Fifteen years drawing for editorial and animation clients. Ana teaches the craft of building a visual voice that clients can recognise at a glance.', quote: 'A portfolio is not a gallery. It is an argument.' },
  { id: 'idris', name: 'Idris Bello', role: 'Front-end engineering', specialty: ['JavaScript', 'Accessibility'], city: 'Lagos', rating: 4.8, students: 21400, courses: 6, bio: 'Idris has shipped design systems for banks and newsrooms. He teaches the parts of engineering that make interfaces feel effortless.', quote: 'Fast is a feature. So is clear.' },
  { id: 'mei', name: 'Mei Lin', role: 'Product design', specialty: ['Product design', 'Research'], city: 'Taipei', rating: 4.9, students: 9600, courses: 3, bio: 'Mei leads design at a fintech scale-up and has interviewed more than four hundred users. Her teaching is built on evidence, not taste.', quote: 'Test the sentence, not the colour.' },
  { id: 'omar', name: 'Omar Haddad', role: 'Data & analytics', specialty: ['Data', 'Python'], city: 'Amman', rating: 4.7, students: 15200, courses: 5, bio: 'Omar builds analytics for education platforms and teaches data work the way it actually happens: messy, iterative and collaborative.', quote: 'Start with the question, not the query.' },
  { id: 'sofia', name: 'Sofia Marković', role: 'Motion direction', specialty: ['Motion', '3D'], city: 'Belgrade', rating: 4.9, students: 7400, courses: 3, bio: 'Sofia directs motion for brand systems. She teaches timing as a language — the difference between decoration and meaning.', quote: 'Easing is punctuation.' },
  { id: 'tomas', name: 'Tomás Rivera', role: 'Type & editorial design', specialty: ['Typography', 'Editorial'], city: 'Mexico City', rating: 4.8, students: 6100, courses: 2, bio: 'Tomás sets books for a living. He teaches type at the scale it is actually used: long documents, dense screens, real constraints.', quote: 'A typeface is a promise about rhythm.' },
  { id: 'hala', name: 'Hala Nasser', role: 'Facilitation & cohorts', specialty: ['Teaching', 'Cohorts'], city: 'Cairo', rating: 5.0, students: 4300, courses: 2, bio: 'Hala designs learning experiences for professional cohorts and trains instructors across three continents.', quote: 'Nobody learns alone. Design for the room.' },
  { id: 'jonas', name: 'Jonas Weber', role: 'Creative direction', specialty: ['Brand', 'Creative direction'], city: 'Berlin', rating: 4.8, students: 8800, courses: 3, bio: 'Jonas has built studio practices from a kitchen table to twenty people. He teaches the business side of creative work without the mythology.', quote: 'Taste is a habit you can train.' },
].map((m) => ({ ...m, slug: slug(m.name), art: `av-${m.id}` }));

export const tracks = [
  { id: 'design', label: 'Design', blurb: 'Interface, product and visual design, from first principles to portfolio.', icon: 'layers', tint: 'sky' },
  { id: 'code', label: 'Engineering', blurb: 'Front-end craft, accessibility and the systems behind fast interfaces.', icon: 'code', tint: 'navy' },
  { id: 'visual', label: 'Visual craft', blurb: 'Illustration, typography and motion for people who make images for a living.', icon: 'wand', tint: 'lime' },
  { id: 'data', label: 'Data', blurb: 'Analysis, insight and the storytelling that makes numbers useful.', icon: 'chart', tint: 'mid' },
  { id: 'business', label: 'Business of creative work', blurb: 'Pricing, positioning, client work and running a small studio.', icon: 'briefcase', tint: 'ice' },
  { id: 'teaching', label: 'Teaching', blurb: 'How to teach what you know — live, recorded and in cohorts.', icon: 'users', tint: 'navy' },
];

const courseSeed = [
  ['Designing interfaces that scale', 'design', 'Intermediate', 12900, 372, 8, 'mei', ['Interface systems', 'Design tokens', 'Component libraries']],
  ['Illustration for editorial clients', 'visual', 'Beginner', 8400, 640, 6, 'ana', ['Editorial briefs', 'Visual metaphor', 'Delivery workflow']],
  ['Front-end foundations with JavaScript', 'code', 'Beginner', 0, 1480, 10, 'idris', ['DOM & events', 'Fetching data', 'Accessible UI']],
  ['Type at scale: setting long documents', 'visual', 'Advanced', 11500, 210, 5, 'tomas', ['Grids', 'Hierarchies', 'Print to screen']],
  ['Product research in two weeks', 'design', 'Intermediate', 9600, 284, 4, 'mei', ['Interview scripts', 'Synthesis', 'Evidence-led decisions']],
  ['Motion timing for brand systems', 'visual', 'Intermediate', 10900, 196, 5, 'sofia', ['Easing', 'Choreography', 'Systemised motion']],
  ['Accessible components from scratch', 'code', 'Advanced', 13500, 168, 7, 'idris', ['ARIA patterns', 'Focus management', 'Testing']],
  ['Data storytelling for teams', 'data', 'Beginner', 6900, 520, 4, 'omar', ['Framing', 'Chart choice', 'Narrative structure']],
  ['Python for non-programmers', 'data', 'Beginner', 0, 2100, 8, 'omar', ['Notebooks', 'Pandas basics', 'Automation']],
  ['Pricing and positioning your studio', 'business', 'Intermediate', 7900, 340, 3, 'jonas', ['Value framing', 'Proposals', 'Rate design']],
  ['Designing live cohorts that work', 'teaching', 'Advanced', 14200, 122, 6, 'hala', ['Session design', 'Facilitation', 'Assessment']],
  ['From portfolio to client pipeline', 'business', 'Beginner', 5900, 480, 4, 'jonas', ['Case studies', 'Outreach', 'Follow-up']],
  ['3D for motion designers', 'visual', 'Intermediate', 12400, 176, 6, 'sofia', ['Modelling basics', 'Lighting', 'Render pipeline']],
  ['Creative direction for small teams', 'business', 'Advanced', 15900, 96, 5, 'jonas', ['Briefs', 'Feedback', 'Decision records']],
  ['Teaching your craft online', 'teaching', 'Beginner', 4900, 760, 5, 'hala', ['Curriculum design', 'Recording setup', 'Feedback loops']],
  ['Interface animation with restraint', 'code', 'Intermediate', 8900, 232, 4, 'sofia', ['Timing tokens', 'Reduced motion', 'Performance']],
];

function curriculumFor(outcomes, count, duration) {
  const titles = ['Find your starting point', ...outcomes.map(s => `Explore: ${s.toLowerCase()}`), 'A guided worked example', 'Make your first draft', 'Use the critique checklist', 'Refine your project', 'Present the finished work', 'Your next learning step'];
  const all = Array.from({ length: count }, (_, i) => titles[i % titles.length]);
  const lengths = [Math.ceil(count / 3), Math.ceil((count - Math.ceil(count / 3)) / 2)];
  lengths.push(count - lengths[0] - lengths[1]);
  let offset = 0;
  return lengths.map((length, i) => {
    const start = offset; offset += length;
    return { title: ['Understand the foundations', 'Put it into practice', 'Make it your own'][i], lessons: all.slice(start, offset), minutes: all.slice(start, offset).map((_, j) => Math.floor(duration / count) + (start + j < duration % count ? 1 : 0)) };
  }).filter(s => s.lessons.length);
}

export const courses = courseSeed.map(([title, track, level, price, students, lessons, mentorId, outcomes], i) => {
  const mentor = mentors.find((m) => m.id === mentorId);
  const trackObj = tracks.find((t) => t.id === track);
  return {
    id: `c${i + 1}`,
    slug: slug(title),
    title,
    subtitle: `A ${lessons}-lesson ${trackObj.label.toLowerCase()} course with ${mentor.name.split(' ')[0]}.`,
    track,
    trackLabel: trackObj.label,
    level,
    price,
    cohortPrice: Math.round(price * 1.6),
    cohortDeposit: Math.round(price * .4),
    free: price === 0,
    currency: 'USD',
    rating: (4.5 + ((i * 7) % 5) / 10).toFixed(1),
    ratingCount: 80 + ((i * 137) % 900),
    students,
    duration: lessons * 18 + (i % 3) * 6,
    lessonCount: lessons,
    updated: 'September 2026',
    language: ['English'],
    mentor: mentor.name,
    mentorId,
    art: `cover-c${i + 1}`,
    outcomes,
    format: i % 4 === 0 ? 'Live + self-paced' : 'Self-paced',
    project: ['A documented interface system', 'An editorial illustration series', 'An accessible interactive website', 'A carefully typeset publication', 'An evidence-led research report', 'A brand motion study', 'A keyboard-complete component', 'A clear data story', 'A useful Python notebook', 'A sustainable studio proposal', 'A complete cohort teaching plan', 'A portfolio case study', 'A short three-dimensional scene', 'A creative direction brief', 'Your first online lesson', 'An accessible motion prototype'][i],
    audience: level === 'Beginner' ? 'Curious beginners, career changers and anyone ready to make a first project.' : level === 'Advanced' ? 'Practising professionals ready to sharpen an existing skill through a focused project.' : 'Learners with some experience who want a clearer method and constructive feedback.',
    sections: curriculumFor(outcomes, lessons, lessons * 18 + (i % 3) * 6),
    requirements: ['A laptop and a browser', level === 'Beginner' ? 'No previous experience in this subject' : 'Some practical experience with the subject', 'Time to practise and share a project'],
    description:
      'This course is built around one idea: you learn a craft by making things and having them looked at. Each section pairs a short demonstration with a project you can finish in an evening, then reviews the result against a clear standard.',
    reviews: [
      { name: 'Priya S.', rating: 5, date: 'Sep 2026', body: 'The clearest explanation of this material I have found. The critique sections alone were worth it.' },
      { name: 'Daniel K.', rating: 5, date: 'Aug 2026', body: 'Practical, well-paced, and generous with real examples. I shipped something in week two.' },
      { name: 'Marwa A.', rating: 4, date: 'Aug 2026', body: 'Excellent structure. I would have liked one more session on the advanced material.' },
    ],
    featured: i < 4,
  };
});

mentors.forEach(m => { const own = courses.filter(c => c.mentorId === m.id); m.courses = own.length; m.students = own.reduce((n,c)=>n+c.students,0); });

tracks.forEach(t => { t.count=courses.filter(c=>c.track===t.id).length; });

const demoDay = new Date(process.env.WA_DEMO_DATE || new Date().toISOString().slice(0, 10) + 'T12:00:00Z').getTime();

export const sessions = [
  ['Critique night: portfolio reviews', 'ana', '2026-11-03T18:00:00Z', 90, 40, 33, 'upcoming', 'Live feedback on six student portfolios, with a repeatable review framework you can use on your own work.'],
  ['Interface teardown: three banks, one flow', 'mei', '2026-11-05T16:00:00Z', 60, 60, 51, 'upcoming', 'We take apart three account-opening flows and rebuild the decision points live.'],
  ['Accessibility clinic: focus and keyboard', 'idris', '2026-11-10T15:00:00Z', 75, 50, 22, 'upcoming', 'Bring a component. We will make it keyboard-complete together, live.'],
  ['Motion timing workshop', 'sofia', '2026-11-12T17:00:00Z', 90, 45, 45, 'live', 'A hands-on session on easing, choreography and the discipline of restraint.'],
  ['Data storytelling: from chart to argument', 'omar', '2026-11-17T14:00:00Z', 60, 80, 34, 'upcoming', 'How to move an audience from numbers to a decision without misleading them.'],
  ['How to price a project without guessing', 'jonas', '2026-11-19T17:00:00Z', 75, 40, 12, 'upcoming', 'A live walkthrough of three real proposals, including the ones that lost.'],
  ['Cohort design office hours', 'hala', '2026-11-24T13:00:00Z', 60, 30, 8, 'upcoming', 'Open office hours for anyone designing or running a cohort.'],
  ['Type critique: spacing and rhythm', 'tomas', '2026-10-21T16:00:00Z', 75, 50, 44, 'ended', 'A recorded critique session on real student work, with a spacing checklist.'],
  ['Illustration briefs that hold up', 'ana', '2026-10-14T18:00:00Z', 60, 60, 58, 'ended', 'How to turn a vague brief into a visual argument, recorded live.'],
  ['Building a design system in public', 'idris', '2026-10-07T15:00:00Z', 90, 75, 75, 'ended', 'A recorded build session: tokens, components and documentation as you go.'],
].map(([title, mentorId, startsAt, durationMin, seats, seatsFilled, status, blurb], i) => ({
  id: `s${i + 1}`,
  slug: slug(title),
  title,
  mentorId,
  mentor: mentors.find((m) => m.id === mentorId).name,
  startsAt: new Date(demoDay + (status === 'live' ? -10 * 60000 : status === 'ended' ? -(i - 5) * 86400000 : (i + 1) * 86400000)).toISOString(),
  durationMin,
  seats,
  seatsFilled,
  status,
  demo: true,
  format: 'Interactive workshop · demo',
  blurb,
  agenda: [{ time: '00:00', topic: 'Welcome and the learning goal' }, { time: '00:10', topic: 'An instructor-led demonstration' }, { time: '00:25', topic: 'Hands-on practice' }, { time: '00:' + String(Math.min(50, durationMin - 10)).padStart(2, '0'), topic: 'Feedback, questions and your next step' }],
}));

export const resources = [
  ['The interface audit checklist', 'Guide', 24, '1.2 MB', 'Every check we run before a design review, in the order we run it.'],
  ['Cohort facilitation playbook', 'Guide', 46, '2.4 MB', 'Session structures, timing templates and the questions that open a room up.'],
  ['Design token starter kit', 'Template', 12, '340 KB', 'A small JSON token structure and a decision checklist for consistent interface patterns.'],
  ['Portfolio review scorecard', 'Checklist', 4, '180 KB', 'The six criteria we use in critique night, with anchors for each score.'],
  ['Motion timing reference', 'Guide', 18, '980 KB', 'Easing curves, durations and the reasoning behind each default.'],
  ['Accessibility testing script', 'Checklist', 8, '260 KB', 'A keyboard and screen-reader pass you can run in forty minutes.'],
  ['Data storytelling workbook', 'Template', 22, '1.6 MB', 'Framing worksheets and a chart-choice decision tree.'],
  ['Pricing calculator (sheet)', 'Template', 6, '96 KB', 'A rate model that accounts for admin, revisions and the work you did not quote.'],
  ['Type specimen generator', 'Template', 10, '420 KB', 'Edit a local specimen and compare reading sizes, line heights and three font families.'],
  ['Illustration brief template', 'Template', 5, '210 KB', 'The brief we send clients so that round one is never a guess.'],
  ['Recording setup for instructors', 'Guide', 16, '1.1 MB', 'Microphones, lighting and the settings that make a difference.'],
  ['Critique language glossary', 'Guide', 9, '300 KB', 'Precise words for describing what is working and what is not.'],
].map(([title, type, pages, size, blurb], i) => {
  const s = slug(title);
  return { id: `r${i + 1}`, slug: s, title, type, pages: 4, size: 'Sample PDF', blurb, art: `res-${i + 1}`, updated: 'Updated September 2026' };
});

export const posts = [
  ['Why we teach in cohorts, not just courses', 'Teaching', 'Self-paced video solved access and lost accountability. Cohorts put the room back.', 7],
  ['The case against the hero carousel', 'Design', 'Carousels exist to serve stakeholders, not readers. Here is what to build instead.', 6],
  ['A practical guide to motion restraint', 'Motion', 'Most interface animation fails because it explains nothing. A test for every transition.', 9],
  ['What accessibility work actually looks like', 'Engineering', 'Beyond contrast checks: focus order, error recovery and the cost of custom widgets.', 11],
  ['Pricing your first cohort', 'Business', 'A model, three scenarios, and the two numbers most instructors forget to include.', 8],
  ['Teaching critique without crushing people', 'Teaching', 'A structure for feedback that changes the work instead of the mood.', 6],
  ['Design tokens are a language, not a file', 'Design', 'The artefact is the agreement, not the JSON. How to keep the agreement alive.', 10],
  ['When to say no to a project', 'Business', 'Four signals that a project will cost more than it pays, and how to decline well.', 5],
  ['Reading type at a distance', 'Visual craft', 'Why long documents need different spacing than screens, and how to bridge them.', 12],
];

export const postsFull = posts.map(([title, category, excerpt, readingMin], i) => ({
  id: `p${i + 1}`,
  slug: slug(title),
  title,
  category,
  excerpt,
  readingMin,
  publishedAt: new Date(Date.UTC(2026, 9 - (i % 5), 20 - i)).toISOString(),
  dateLabel: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 9 - (i % 5), 20 - i))),
  authorId: mentors[i % mentors.length].id,
  author: mentors[i % mentors.length].name,
  art: `post-${i + 1}`,
}));

export const testimonials = [
  { quote: 'I came for the illustration course and stayed for the critique nights. The feedback is specific enough to act on the same week.', name: 'Léa M.', role: 'Illustrator, Lyon' },
  { quote: 'The accessibility material is the first I have seen that treats it as engineering rather than a checklist. It changed how my team ships.', name: 'Sam O.', role: 'Front-end lead, Manchester' },
  { quote: 'Six weeks, one cohort, one honest critique. I rebuilt my portfolio and signed two clients before the cohort ended.', name: 'Ines R.', role: 'Designer, Lisbon' },
  { quote: 'I run a small studio and I finally have a language for pricing. The calculator alone paid for the year.', name: 'Kwame A.', role: 'Studio founder, Accra' },
  { quote: 'Live sessions are the reason I stayed. Being able to ask a question and get an answer in the room is worth more than a hundred videos.', name: 'Yuki T.', role: 'Motion designer, Osaka' },
  { quote: 'The teaching cohort changed how I present my own work. I now design the room before the slides.', name: 'Marta P.', role: 'Instructor, Warsaw' },
];

export const faqs = [
  { q: 'Can I try a lesson before I decide?', a: 'Yes. Every course includes an illustrated sample classroom with a practical exercise, a short knowledge check and progress saved only on your browser. No account is required.' },
  { q: 'What happens in the live-session demo?', a: 'You can explore the agenda, preview room controls, try a local registration form and download a real calendar file. There is no connected meeting, live video, payment or email service.' },
  { q: 'Do I get a certificate?', a: 'The artwork includes a sample completion certificate. Finishing the sample classroom records local progress only; it is not accreditation or a verifiable professional qualification.' },
  { q: 'Can my academy or team use this?', a: 'The same themes support academy and independent-educator presets. Courses, instructor profiles, cohort applications and resources can be adapted to a real organisation. Connect your own enrolment and payment services before publishing.' },
  { q: 'How much time should I set aside?', a: 'Start with a short sample lesson and a ten-minute exercise. Full course pages show the exact number of lessons and learning-material minutes; programme pages separately explain their weekly commitment.' },
  { q: 'What is the refund policy?', a: 'This is a static demonstration: no money is collected and no booking or subscription is created. A real provider must publish its own access, cancellation and refund terms before accepting enrolments.' },
];

export const stats = [
  { value: courses.length, suffix: '', label: 'Courses to explore' },
  { value: mentors.length, suffix: '', label: 'Practising educators' },
  { value: tracks.length, suffix: '', label: 'Learning tracks' },
  { value: resources.length, suffix: '', label: 'Practical resources' },
];

export const partners = ['Northline', 'Kestrel Studio', 'Foundry Labs', 'Marlowe & Co', 'Braid Collective', 'Atlas Type'];

export const disciplines = ['Illustration', 'Graphic design', 'Motion design', '3D and CGI', 'Photography', 'Typography', 'UI/UX design', 'Something else'];

/* -------------------------------------------------------------------------- */
/* imagery                                                                    */
/* -------------------------------------------------------------------------- */
export function imageSet(theme = 'nova') {
  const set = educationImageSet(theme);
  courses.forEach((c, i) => { set[c.art] = subjectCover(c.track, i, c.project.toUpperCase(), { dark: theme === 'aero', id: c.art }); });
  postsFull.forEach((p, i) => { set[p.art] = subjectCover(({ Teaching:'teaching', Design:'design', Motion:'visual', Engineering:'code', Business:'business', 'Visual craft':'visual' })[p.category], i, p.category.toUpperCase() + ' / FIELD NOTES', { dark: theme === 'aero', id:p.art }); });
  mentors.forEach((m, i) => { set[`av-${m.id}`] = portraitArt(m.id, i); });
  tracks.forEach((t, i) => { set[`track-${t.id}`] = subjectCover(t.id, i, t.label.toUpperCase(), { dark: theme === 'aero', id: `track-${t.id}` }); });
  resources.forEach((r, i) => { set[r.art] = subjectCover(['design','teaching','code','visual','visual','code','data','business','visual','visual','teaching','teaching'][i], i, r.type.toUpperCase() + ' / THE PRACTICAL LIBRARY', { dark: theme === 'aero', id: r.art }); });
  set['folio-hero'] = scene('folio');
  set['folio-pricing'] = scene('project');
  set['folio-live'] = scene('workshop');
  set['folio-students'] = scene('community');
  set['folio-library'] = scene('library');
  set['folio-paid'] = scene('certificate');
  set['folio-frame'] = scene('project');
  set['atelier-studio'] = scene('atelier');
  set['nova-collab'] = scene('critique');
  set['aero-room'] = scene('aero');
  return set;
}

export const library = { mentors, tracks, courses, sessions, resources, posts: postsFull, testimonials, faqs, stats, partners, disciplines };
export default library;
