/**
 * Gap Index page renderer for the Verity SPA.
 */

import {
  conditions,
  getConditionsSortedByScore,
  GAP_TYPE_LABELS,
  GAP_TYPE_DESCRIPTIONS,
  EVIDENCE_QUALITY_LABELS,
} from '../data/conditions.js';
import { createGapTypeBadge } from '../components/gapTypeBadge.js';
import { createEvidenceQuality } from '../components/evidenceQuality.js';
import { createFilterChipGroup } from '../components/filterChip.js';

/**
 * Render the Gap Index page.
 * @param {HTMLElement} container
 */
export function renderGapIndexPage(container) {
  container.textContent = '';

  const page = document.createElement('div');
  page.className = 'gap-index-page';

  const wrapper = document.createElement('div');
  wrapper.className = 'container';

  // ── 1. Header ──
  const headerSection = document.createElement('header');
  headerSection.className = 'section';
  headerSection.style.paddingBottom = '0';

  const h1 = document.createElement('h1');
  h1.className = 'display-lg';
  h1.textContent = 'Research Gap Index';

  const subtitle = document.createElement('p');
  subtitle.className = 'body-lg';
  subtitle.style.color = 'var(--color-graphite)';
  subtitle.style.maxWidth = '720px';
  subtitle.textContent = 'A ranked overview of female research coverage across 10 indexed conditions. Sortable by representation score, gap type, and evidence quality.';

  headerSection.appendChild(h1);
  headerSection.appendChild(subtitle);
  wrapper.appendChild(headerSection);

  // ── 2. Methodology Accordion ──
  const methDetails = document.createElement('details');
  methDetails.className = 'accordion';
  methDetails.style.marginTop = 'var(--space-4)';

  const methSummary = document.createElement('summary');
  methSummary.className = 'accordion__trigger';
  methSummary.textContent = 'Methodology';
  const methChevron = document.createElement('span');
  methChevron.className = 'accordion__chevron';
  methChevron.setAttribute('aria-hidden', 'true');
  methChevron.textContent = '▾';
  methSummary.appendChild(methChevron);

  const methContent = document.createElement('div');
  methContent.className = 'accordion__content';
  const methP = document.createElement('p');
  methP.className = 'body-md';
  methP.textContent = 'The Research Gap Index evaluates conditions based on a composite representation score derived from four metrics: the proportion of studies including female participants, the proportion of female-only studies, the proportion of studies conducting sex-disaggregated analysis, and an overall evidence quality assessment. Conditions are classified into one of four gap types based on the nature of the representation gap identified. Data is sourced from PubMed, PubMed Central, and Europe PMC.';
  methContent.appendChild(methP);

  methDetails.appendChild(methSummary);
  methDetails.appendChild(methContent);
  wrapper.appendChild(methDetails);

  // ── State ──
  let gapFilter = 'all';
  let eqFilter = 'all';
  let sortCol = 'score';
  let sortAsc = false;

  // ── 3. Filter Bar ──
  const filterBar = document.createElement('div');
  filterBar.className = 'gap-index__filters';

  const gapChips = createFilterChipGroup({
    label: 'Gap Type',
    options: [
      { value: 'all', text: 'All' },
      { value: '1', text: 'Type 1' },
      { value: '2', text: 'Type 2' },
      { value: '3', text: 'Type 3' },
      { value: '4', text: 'Type 4' },
    ],
    activeValue: 'all',
    onChange: (val) => {
      gapFilter = val;
      renderTable();
    },
  });

  const eqChips = createFilterChipGroup({
    label: 'Evidence Quality',
    options: [
      { value: 'all', text: 'All' },
      { value: 'high', text: 'High (4-5)' },
      { value: 'moderate', text: 'Moderate (3)' },
      { value: 'limited', text: 'Limited (1-2)' },
    ],
    activeValue: 'all',
    onChange: (val) => {
      eqFilter = val;
      renderTable();
    },
  });

  filterBar.appendChild(gapChips);
  filterBar.appendChild(eqChips);
  wrapper.appendChild(filterBar);

  // ── 4. Table Container ──
  const tableContainer = document.createElement('div');
  tableContainer.className = 'gap-index__table-container';
  wrapper.appendChild(tableContainer);

  /** Get filtered and sorted conditions. */
  function getFilteredConditions() {
    let data = [...conditions];

    // Gap type filter
    if (gapFilter !== 'all') {
      data = data.filter(c => c.gapType === parseInt(gapFilter));
    }

    // Evidence quality filter
    if (eqFilter !== 'all') {
      if (eqFilter === 'high') {
        data = data.filter(c => c.metrics.evidenceQuality >= 4);
      } else if (eqFilter === 'moderate') {
        data = data.filter(c => c.metrics.evidenceQuality === 3);
      } else if (eqFilter === 'limited') {
        data = data.filter(c => c.metrics.evidenceQuality <= 2);
      }
    }

    // Sort
    data.sort((a, b) => {
      let valA, valB;
      switch (sortCol) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case 'gapType':
          valA = a.gapType;
          valB = b.gapType;
          break;
        case 'women':
          valA = a.metrics.studiesIncludingWomen.percent;
          valB = b.metrics.studiesIncludingWomen.percent;
          break;
        case 'disagg':
          valA = a.metrics.sexDisaggregated.percent;
          valB = b.metrics.sexDisaggregated.percent;
          break;
        case 'eq':
          valA = a.metrics.evidenceQuality;
          valB = b.metrics.evidenceQuality;
          break;
        case 'score':
        default:
          valA = a.metrics.representationScore;
          valB = b.metrics.representationScore;
          break;
      }
      if (typeof valA === 'string') return 0;
      return sortAsc ? valA - valB : valB - valA;
    });

    return data;
  }

  /** Render or re-render the data table. */
  function renderTable() {
    tableContainer.textContent = '';

    const data = getFilteredConditions();

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'table-scroll-container';

    const table = document.createElement('table');
    table.className = 'data-table';

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const columns = [
      { key: 'name', label: 'Condition' },
      { key: 'gapType', label: 'Gap Type' },
      { key: 'women', label: '% Women' },
      { key: 'disagg', label: '% Sex-Disagg.' },
      { key: 'eq', label: 'Evidence' },
      { key: 'score', label: 'Score' },
    ];

    columns.forEach(col => {
      const th = document.createElement('th');
      th.setAttribute('data-sortable', '');
      th.setAttribute('scope', 'col');

      const labelText = document.createTextNode(col.label + ' ');
      th.appendChild(labelText);

      const arrow = document.createElement('span');
      arrow.className = 'data-table__sort-icon';
      if (sortCol === col.key) {
        arrow.classList.add('data-table__sort-icon--active');
        arrow.textContent = sortAsc ? '↑' : '↓';
      } else {
        arrow.textContent = '↕';
      }
      th.appendChild(arrow);

      th.addEventListener('click', () => {
        if (sortCol === col.key) {
          sortAsc = !sortAsc;
        } else {
          sortCol = col.key;
          sortAsc = col.key === 'name';
        }
        renderTable();
      });

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');

    if (data.length === 0) {
      const emptyRow = document.createElement('tr');
      const emptyTd = document.createElement('td');
      emptyTd.colSpan = 6;
      emptyTd.style.textAlign = 'center';
      emptyTd.style.padding = 'var(--space-6)';
      emptyTd.style.color = 'var(--color-ash)';
      emptyTd.textContent = 'No conditions match the current filters.';
      emptyRow.appendChild(emptyTd);
      tbody.appendChild(emptyRow);
    } else {
      data.forEach(cond => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
          window.location.hash = `#/conditions/${cond.slug}`;
        });

        // Condition name
        const nameTd = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.href = `#/conditions/${cond.slug}`;
        nameLink.className = 'data-table__condition-link';
        nameLink.textContent = cond.name;
        nameLink.addEventListener('click', e => e.stopPropagation());
        nameTd.appendChild(nameLink);
        row.appendChild(nameTd);

        // Gap type badge
        const gapTd = document.createElement('td');
        gapTd.appendChild(createGapTypeBadge(cond.gapType, { size: 'small' }));
        row.appendChild(gapTd);

        // % Women
        const womenTd = document.createElement('td');
        womenTd.className = 'data-md';
        womenTd.textContent = `${cond.metrics.studiesIncludingWomen.percent}%`;
        row.appendChild(womenTd);

        // % Sex-disaggregated
        const disaggTd = document.createElement('td');
        disaggTd.className = 'data-md';
        disaggTd.textContent = `${cond.metrics.sexDisaggregated.percent}%`;
        row.appendChild(disaggTd);

        // Evidence quality
        const eqTd = document.createElement('td');
        eqTd.appendChild(createEvidenceQuality(cond.metrics.evidenceQuality, { size: 'small' }));
        row.appendChild(eqTd);

        // Score
        const scoreTd = document.createElement('td');
        scoreTd.className = 'data-md';
        scoreTd.style.fontWeight = '600';
        scoreTd.textContent = cond.metrics.representationScore;
        row.appendChild(scoreTd);

        tbody.appendChild(row);
      });
    }

    table.appendChild(tbody);
    scrollContainer.appendChild(table);
    tableContainer.appendChild(scrollContainer);
  }

  renderTable();

  // ── 5. Gap Type Legend ──
  const legend = document.createElement('div');
  legend.className = 'gap-legend';

  [1, 2, 3, 4].forEach(type => {
    const item = document.createElement('div');
    item.className = 'gap-legend__item';
    item.appendChild(createGapTypeBadge(type, { size: 'small' }));

    const desc = document.createElement('span');
    desc.textContent = GAP_TYPE_DESCRIPTIONS[type].substring(0, 80) + '…';
    item.appendChild(desc);

    legend.appendChild(item);
  });

  wrapper.appendChild(legend);

  // ── 6. Index Note ──
  const note = document.createElement('p');
  note.className = 'gap-index__note';
  note.textContent = 'This index reflects manually curated data. Automated analysis is in development. Last updated: March 2025.';
  wrapper.appendChild(note);

  page.appendChild(wrapper);
  container.appendChild(page);
}
