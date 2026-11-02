/**
 * About page renderer for the Verity SPA.
 */

import { createGapTypeBadge, GAP_TYPE_INFO } from '../components/gapTypeBadge.js';
import { GAP_TYPE_DESCRIPTIONS } from '../data/conditions.js';

/**
 * Render the About page.
 * @param {HTMLElement} container
 */
export function renderAboutPage(container) {
  container.textContent = '';

  const page = document.createElement('div');
  page.className = 'about-page section';

  const wrapper = document.createElement('div');
  wrapper.className = 'container about-content';

  // ── 1. Mission Statement ──
  appendSection(wrapper, 'Mission', 'display-lg', [
    'Verity is a research transparency platform that measures female representation in scientific and medical evidence. It provides structured, citation-backed data on how well women are represented in clinical research — across conditions, across study types, and across analytical approaches.',
    'Verity exists because the quality of evidence should be visible, not assumed.',
  ]);

  // ── 2. What Verity Is Not ──
  const notSection = createAboutSection('What Verity Is Not', 'heading-lg');
  const notList = document.createElement('ul');
  notList.style.cssText = 'list-style: disc; padding-left: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2);';

  const nots = [
    'A medical advice platform — Verity does not diagnose, recommend treatments, or interpret individual health situations.',
    'A clinical decision tool — it is not designed for use in clinical settings as a diagnostic or treatment aid.',
    'A research journal — Verity does not publish original research. It indexes and evaluates existing evidence.',
    'A news site — it does not report on breaking medical developments or health trends.',
    'A consumer health app — the reading level and depth of analysis reflect a research-grade audience.',
  ];

  nots.forEach(text => {
    const li = document.createElement('li');
    li.className = 'body-md';
    li.textContent = text;
    notList.appendChild(li);
  });

  notSection.appendChild(notList);
  wrapper.appendChild(notSection);

  // ── 3. Methodology ──
  const methSection = createAboutSection('Methodology', 'heading-lg');

  const methSubs = [
    {
      title: 'Condition Selection',
      text: 'Conditions are selected based on prevalence, known sex-based differences in presentation or outcomes, and documented gaps in the literature. The initial index includes 10 conditions spanning cardiovascular, neurological, hormonal, immunological, and mental health categories.',
    },
    {
      title: 'Study Identification',
      text: 'Studies are identified through systematic searches of PubMed, PubMed Central, Europe PMC, and Semantic Scholar. Search strategies use condition-specific MeSH terms combined with filters for study design, population characteristics, and sex-disaggregated reporting.',
    },
    {
      title: 'Scoring Methodology',
      text: 'The Representation Score is a composite metric (0–100) derived from four weighted components: proportion of studies including female participants (30%), proportion of female-only studies (20%), proportion of studies with sex-disaggregated analysis (30%), and expert-assessed evidence quality (20%). Higher scores indicate more robust female representation in the evidence base.',
    },
  ];

  methSubs.forEach(sub => {
    const h4 = document.createElement('h4');
    h4.className = 'heading-sm';
    h4.textContent = sub.title;
    h4.style.marginTop = 'var(--space-3)';
    h4.style.marginBottom = 'var(--space-1)';

    const p = document.createElement('p');
    p.className = 'body-md';
    p.textContent = sub.text;
    p.style.maxWidth = '65ch';

    methSection.appendChild(h4);
    methSection.appendChild(p);
  });

  wrapper.appendChild(methSection);

  // ── 4. Data Sources ──
  const dsSection = createAboutSection('Data Sources', 'heading-lg');

  const sources = [
    {
      name: 'PubMed',
      desc: 'Comprehensive database of biomedical literature maintained by the National Library of Medicine. Primary source for identifying relevant clinical studies.',
    },
    {
      name: 'PubMed Central (PMC)',
      desc: 'Full-text archive of biomedical and life sciences journal literature. Used to verify study methodology and cohort demographics when abstracts lack detail.',
    },
    {
      name: 'Semantic Scholar',
      desc: 'AI-augmented academic search engine. Used for citation network analysis and identifying related studies not captured by MeSH-based searches.',
    },
    {
      name: 'Europe PMC',
      desc: 'European counterpart to PMC providing additional coverage of European clinical trials and research publications.',
    },
  ];

  sources.forEach(source => {
    const dt = document.createElement('h4');
    dt.className = 'heading-sm';
    dt.textContent = source.name;
    dt.style.marginTop = 'var(--space-3)';
    dt.style.marginBottom = 'var(--space-1)';

    const dd = document.createElement('p');
    dd.className = 'body-md';
    dd.textContent = source.desc;
    dd.style.maxWidth = '65ch';

    dsSection.appendChild(dt);
    dsSection.appendChild(dd);
  });

  wrapper.appendChild(dsSection);

  // ── 5. Limitations ──
  const limSection = createAboutSection('Limitations', 'heading-lg');
  const limList = document.createElement('ul');
  limList.style.cssText = 'list-style: disc; padding-left: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2);';

  const limitations = [
    'The current dataset covers 10 conditions. This is not comprehensive and will expand over time.',
    'Study identification relies on indexed databases and may miss grey literature, conference proceedings, or non-English publications.',
    'The Representation Score is a composite metric designed for comparison across conditions. It should not be interpreted as an absolute measure of evidence quality.',
    'Gap Type classification is based on available data and may change as new studies are published.',
    'Manual curation introduces the possibility of subjective judgment in edge cases. The methodology aims to minimize this through standardized criteria.',
  ];

  limitations.forEach(text => {
    const li = document.createElement('li');
    li.className = 'body-md';
    li.textContent = text;
    limList.appendChild(li);
  });

  limSection.appendChild(limList);
  wrapper.appendChild(limSection);

  // ── 6. Gap Classification Framework ──
  const gcfSection = createAboutSection('Gap Classification Framework', 'heading-lg');

  const gcfIntro = document.createElement('p');
  gcfIntro.className = 'body-md';
  gcfIntro.textContent = 'Every condition indexed in Verity is assigned one of four gap types based on the nature of its female representation gap. These classifications are not value judgments — they are structural descriptions of the evidence landscape.';
  gcfIntro.style.marginBottom = 'var(--space-4)';
  gcfSection.appendChild(gcfIntro);

  const gapPanelsData = [
    { type: 1, example: 'Heart Disease, Autism' },
    { type: 2, example: 'ADHD, Sleep Apnea, Chronic Pain' },
    { type: 3, example: 'Depression, PCOS' },
    { type: 4, example: 'Endometriosis, Autoimmune Disorders' },
  ];

  gapPanelsData.forEach(({ type, example }) => {
    const panel = document.createElement('div');
    panel.className = 'about-gap-panel';
    panel.style.cssText = `
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--color-stone);
      border-radius: 8px;
      margin-bottom: var(--space-2);
      border-left: 3px solid var(--color-gap-${type});
    `;

    panel.appendChild(createGapTypeBadge(type));

    const desc = document.createElement('p');
    desc.className = 'body-md';
    desc.textContent = GAP_TYPE_DESCRIPTIONS[type];
    desc.style.marginTop = 'var(--space-2)';
    desc.style.maxWidth = '65ch';

    const ex = document.createElement('p');
    ex.className = 'body-sm';
    ex.style.color = 'var(--color-ash)';
    ex.style.marginTop = 'var(--space-1)';
    ex.textContent = `Example: ${example}`;

    panel.appendChild(desc);
    panel.appendChild(ex);
    gcfSection.appendChild(panel);
  });

  wrapper.appendChild(gcfSection);

  // ── 7. Disclaimer ──
  const disclaimer = document.createElement('div');
  disclaimer.className = 'disclaimer-banner';
  disclaimer.style.marginTop = 'var(--space-6)';
  const disclaimerText = document.createElement('p');
  disclaimerText.textContent = 'Verity does not provide medical advice, diagnosis, or treatment recommendations. All data is provided for informational and educational purposes only.';
  disclaimer.appendChild(disclaimerText);
  wrapper.appendChild(disclaimer);

  page.appendChild(wrapper);
  container.appendChild(page);
}

/** Creates a titled about section. */
function createAboutSection(title, titleClass) {
  const section = document.createElement('section');
  section.className = 'about-section';

  const h = document.createElement('h2');
  h.className = `about-section__title ${titleClass}`;
  h.textContent = title;

  section.appendChild(h);
  return section;
}

/** Appends a simple section with title and paragraph(s). */
function appendSection(parent, title, titleClass, paragraphs) {
  const section = createAboutSection(title, titleClass);

  paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.className = 'body-lg';
    p.textContent = text;
    p.style.maxWidth = '65ch';
    if (paragraphs.indexOf(text) > 0) {
      p.style.marginTop = 'var(--space-2)';
    }
    section.appendChild(p);
  });

  parent.appendChild(section);
}
