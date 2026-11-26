/**
 * Condition detail page renderer for the Verity SPA.
 */

import { getConditionBySlug, GAP_TYPE_LABELS } from '../data/conditions.js';
import { createGapTypeBadge } from '../components/gapTypeBadge.js';
import { createMetricTile } from '../components/metricTile.js';
import { createEvidenceQuality } from '../components/evidenceQuality.js';

/**
 * Render the condition detail page.
 * @param {HTMLElement} container
 * @param {Object} condition - Full condition data object
 */
export function renderConditionPage(container, condition) {
  container.textContent = '';

  const page = document.createElement('div');
  page.className = 'condition-page';

  const wrapper = document.createElement('div');
  wrapper.className = 'container';

  // ── 1. Breadcrumb ──
  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');

  const homeLink = document.createElement('a');
  homeLink.href = '#/';
  homeLink.className = 'breadcrumb__link';
  homeLink.textContent = 'Home';

  const sep = document.createElement('span');
  sep.className = 'breadcrumb__separator';
  sep.setAttribute('aria-hidden', 'true');
  sep.textContent = '/';

  const current = document.createElement('span');
  current.className = 'breadcrumb__current';
  current.setAttribute('aria-current', 'page');
  current.textContent = condition.name;

  breadcrumb.appendChild(homeLink);
  breadcrumb.appendChild(sep);
  breadcrumb.appendChild(current);
  wrapper.appendChild(breadcrumb);

  // ── 2. Condition Header ──
  const header = document.createElement('header');
  header.className = 'condition-header';

  const headerText = document.createElement('div');
  headerText.className = 'condition-header__text';

  const h1 = document.createElement('h1');
  h1.className = 'display-lg';
  h1.textContent = condition.name;

  const desc = document.createElement('p');
  desc.className = 'body-lg';
  desc.style.color = 'var(--color-graphite)';
  desc.textContent = condition.description;

  const reviewed = document.createElement('p');
  reviewed.className = 'body-sm';
  reviewed.style.color = 'var(--color-ash)';
  reviewed.textContent = `Last reviewed: ${condition.lastReviewed}`;

  headerText.appendChild(h1);
  headerText.appendChild(desc);
  headerText.appendChild(reviewed);

  const headerBadge = document.createElement('div');
  headerBadge.className = 'condition-header__badge';
  headerBadge.appendChild(createGapTypeBadge(condition.gapType, { size: 'large' }));

  header.appendChild(headerText);
  header.appendChild(headerBadge);
  wrapper.appendChild(header);

  // ── 3. Representation Metrics Panel ──
  const panelTitle = document.createElement('h2');
  panelTitle.className = 'heading-lg representation-panel__title';
  panelTitle.textContent = 'Representation Metrics';
  if (condition.slug === 'adhd') {
    const pilotLink = document.createElement('a');
    pilotLink.href = '#/conditions/adhd/pilot';
    pilotLink.className = 'research-link';
    pilotLink.textContent = 'Explore ADHD research representation →';
    headerText.appendChild(pilotLink);
  }

  const panel = document.createElement('div');
  panel.className = 'representation-panel';

  const m = condition.metrics;

  panel.appendChild(panelTitle);

  panel.appendChild(createMetricTile({
    value: `~${m.totalStudies.toLocaleString()}`,
    label: 'Total Studies',
    tooltip: 'Total number of studies identified in systematic search',
  }));

  panel.appendChild(createMetricTile({
    value: `~${m.studiesIncludingWomen.percent}%`,
    label: 'Studies Including Women',
    sublabel: `~${m.studiesIncludingWomen.absolute} studies`,
    tooltip: 'Studies that included female participants',
  }));

  panel.appendChild(createMetricTile({
    value: `~${m.femaleOnlyStudies.percent}%`,
    label: 'Female-Only Studies',
    sublabel: `~${m.femaleOnlyStudies.absolute} studies`,
    tooltip: 'Studies conducted exclusively with female cohorts',
  }));

  panel.appendChild(createMetricTile({
    value: `~${m.sexDisaggregated.percent}%`,
    label: 'Sex-Disaggregated',
    sublabel: `~${m.sexDisaggregated.absolute} studies`,
    tooltip: 'Studies that analyzed results separately by sex',
  }));

  // Evidence Quality tile (special — embeds the dots component)
  const eqTile = document.createElement('div');
  eqTile.className = 'metric-tile';
  const eqLabel = document.createElement('div');
  eqLabel.className = 'metric-tile__label label-text';
  eqLabel.textContent = 'Evidence Quality';
  eqTile.appendChild(createEvidenceQuality(m.evidenceQuality, { showLabel: true }));
  eqTile.appendChild(eqLabel);
  panel.appendChild(eqTile);

  // Representation Score (highlight)
  panel.appendChild(createMetricTile({
    value: m.representationScore,
    label: 'Representation Score',
    sublabel: '/100',
    highlight: true,
    tooltip: 'Composite score reflecting overall female representation quality',
  }));

  wrapper.appendChild(panel);

  // ── 4. Female-Specific Findings ──
  const findingsSection = document.createElement('section');
  findingsSection.className = 'findings-section';

  const findingsTitle = document.createElement('h2');
  findingsTitle.className = 'heading-lg findings-section__title';
  findingsTitle.textContent = 'Female-Specific Findings';
  findingsSection.appendChild(findingsTitle);

  const categories = ['symptoms', 'diagnosis', 'prevalence', 'treatment'];
  const categoryLabels = {
    symptoms: 'Symptoms',
    diagnosis: 'Diagnosis',
    prevalence: 'Prevalence',
    treatment: 'Treatment',
  };

  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'category-tabs';
  tabs.setAttribute('role', 'tablist');

  const contentPanels = {};

  categories.forEach((cat, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'category-tab';
    tab.textContent = categoryLabels[cat];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tab.id = `tab-${cat}`;
    tab.setAttribute('aria-controls', `panel-${cat}`);

    if (index === 0) {
      tab.classList.add('category-tab--active');
    }

    tab.addEventListener('click', () => {
      // Deactivate all tabs
      tabs.querySelectorAll('.category-tab').forEach(t => {
        t.classList.remove('category-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      // Hide all panels
      Object.values(contentPanels).forEach(p => {
        p.hidden = true;
      });
      // Activate clicked tab and panel
      tab.classList.add('category-tab--active');
      tab.setAttribute('aria-selected', 'true');
      contentPanels[cat].hidden = false;
    });

    tabs.appendChild(tab);

    // Content panel
    const panelEl = document.createElement('div');
    panelEl.className = 'findings-section__content';
    panelEl.id = `panel-${cat}`;
    panelEl.setAttribute('role', 'tabpanel');
    panelEl.setAttribute('aria-labelledby', `tab-${cat}`);
    panelEl.hidden = index !== 0;

    const findings = condition.findings[cat] || [];

    if (findings.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'findings-section__empty';
      empty.textContent = 'No findings currently indexed for this category.';
      panelEl.appendChild(empty);
    } else {
      findings.forEach(finding => {
        const card = document.createElement('div');
        card.className = 'finding-card';

        const text = document.createElement('p');
        text.className = 'finding-card__text body-lg';
        text.textContent = finding.text;

        const citation = document.createElement('div');
        citation.className = 'finding-card__citation';

        const arrow = document.createElement('span');
        arrow.textContent = '↳';
        arrow.setAttribute('aria-hidden', 'true');

        const link = document.createElement('a');
        link.href = `https://pubmed.ncbi.nlm.nih.gov/${finding.pmid}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = `${finding.citation} · PMID ${finding.pmid}`;

        citation.appendChild(arrow);
        citation.appendChild(link);

        card.appendChild(text);
        card.appendChild(citation);
        panelEl.appendChild(card);
      });
    }

    contentPanels[cat] = panelEl;
  });

  findingsSection.appendChild(tabs);
  categories.forEach(cat => {
    findingsSection.appendChild(contentPanels[cat]);
  });
  wrapper.appendChild(findingsSection);

  // ── 5. Gap Classification Panel ──
  const gapSection = document.createElement('section');
  gapSection.className = 'gap-classification';

  const gapPanel = document.createElement('div');
  gapPanel.className = 'gap-classification__panel';
  gapPanel.style.borderLeftColor = `var(--color-gap-${condition.gapType})`;

  const gapHeader = document.createElement('div');
  gapHeader.className = 'gap-classification__header';
  gapHeader.appendChild(createGapTypeBadge(condition.gapType));

  const gapText = document.createElement('p');
  gapText.className = 'body-lg';
  gapText.textContent = condition.gapExplanation;

  gapPanel.appendChild(gapHeader);
  gapPanel.appendChild(gapText);
  gapSection.appendChild(gapPanel);
  wrapper.appendChild(gapSection);

  // ── 6. What This Means ──
  const wtm = document.createElement('section');
  wtm.className = 'what-this-means';

  const wtmTitle = document.createElement('h2');
  wtmTitle.className = 'heading-lg';
  wtmTitle.textContent = 'What This Means';

  const wtmText = document.createElement('p');
  wtmText.className = 'body-lg';
  wtmText.textContent = condition.whatThisMeans;

  wtm.appendChild(wtmTitle);
  wtm.appendChild(wtmText);
  wrapper.appendChild(wtm);

  // Disclaimer
  const disclaimer = document.createElement('div');
  disclaimer.className = 'disclaimer-banner';
  const disclaimerText = document.createElement('p');
  disclaimerText.textContent = 'This page presents evidence visibility data only. It does not constitute medical advice.';
  disclaimer.appendChild(disclaimerText);
  wrapper.appendChild(disclaimer);

  // ── 7. Methodology Accordion ──
  const methDetails = document.createElement('details');
  methDetails.className = 'accordion';

  const methSummary = document.createElement('summary');
  methSummary.className = 'accordion__trigger';
  methSummary.textContent = 'How was this condition evaluated?';
  const methChevron = document.createElement('span');
  methChevron.className = 'accordion__chevron';
  methChevron.setAttribute('aria-hidden', 'true');
  methChevron.textContent = '▾';
  methSummary.appendChild(methChevron);

  const methContent = document.createElement('div');
  methContent.className = 'accordion__content';
  const methP = document.createElement('p');
  methP.className = 'body-md';
  methP.textContent = condition.methodology;
  methContent.appendChild(methP);

  methDetails.appendChild(methSummary);
  methDetails.appendChild(methContent);
  wrapper.appendChild(methDetails);

  // ── 8. Source Citations Accordion ──
  const srcDetails = document.createElement('details');
  srcDetails.className = 'accordion';

  const srcSummary = document.createElement('summary');
  srcSummary.className = 'accordion__trigger';
  srcSummary.textContent = `Sources (${condition.sources.length})`;
  const srcChevron = document.createElement('span');
  srcChevron.className = 'accordion__chevron';
  srcChevron.setAttribute('aria-hidden', 'true');
  srcChevron.textContent = '▾';
  srcSummary.appendChild(srcChevron);

  const srcContent = document.createElement('div');
  srcContent.className = 'accordion__content citation-list';

  condition.sources.forEach(source => {
    const item = document.createElement('div');
    item.className = 'citation-item';

    const text = document.createElement('span');
    text.textContent = `${source.authors} (${source.year}). ${source.title}. `;

    const journal = document.createElement('em');
    journal.textContent = source.journal;

    const link = document.createElement('a');
    link.href = source.doi ? `https://doi.org/${source.doi}` : `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = source.pmid ? ` PMID ${source.pmid}` : ` DOI ${source.doi}`;

    item.appendChild(text);
    item.appendChild(journal);
    item.appendChild(link);
    srcContent.appendChild(item);
  });

  srcDetails.appendChild(srcSummary);
  srcDetails.appendChild(srcContent);
  wrapper.appendChild(srcDetails);

  // ── 9. Related Conditions ──
  if (condition.relatedConditions && condition.relatedConditions.length > 0) {
    const related = document.createElement('section');
    related.className = 'related-conditions';

    const relTitle = document.createElement('h2');
    relTitle.className = 'heading-lg';
    relTitle.textContent = 'Related Conditions';

    const relChips = document.createElement('div');
    relChips.className = 'related-conditions__chips';

    condition.relatedConditions.forEach(slug => {
      const relCond = getConditionBySlug(slug);
      if (relCond) {
        const chip = document.createElement('a');
        chip.href = `#/conditions/${relCond.slug}`;
        chip.className = 'condition-chip';
        chip.textContent = `${relCond.name} →`;
        relChips.appendChild(chip);
      }
    });

    related.appendChild(relTitle);
    related.appendChild(relChips);
    wrapper.appendChild(related);
  }

  page.appendChild(wrapper);
  container.appendChild(page);
}
