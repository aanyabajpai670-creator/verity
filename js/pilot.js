(() => {
  const scoreMeaning = 'The Representation Score is a weighted composite index out of 100. Its points summarize research representation, rather than a percentage of studies involving women, a clinical safety rating, or a universal measure of scientific quality.';

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== null && text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function link(label, href) {
    const node = element('a', label, 'research-link');
    node.href = href;
    return node;
  }

  function paragraph(parent, text) {
    parent.append(element('p', text, 'body-md'));
  }

  function topic(parent, title, text) {
    parent.append(element('h3', title, 'heading-md'));
    paragraph(parent, text);
  }

  function makeTable(columns, rows, label) {
    const wrapper = element('div', null, 'research-table-wrap');
    const table = element('table', null, 'research-table');
    table.setAttribute('aria-label', label);
    const header = table.createTHead().insertRow();
    for (const column of columns) {
      const cell = element('th', column);
      cell.scope = 'col';
      header.append(cell);
    }
    const body = table.createTBody();
    for (const values of rows) {
      const row = body.insertRow();
      const name = element('th', values[0]);
      name.scope = 'row';
      row.append(name);
      for (const value of values.slice(1)) row.insertCell().textContent = value;
    }
    wrapper.append(table);
    return wrapper;
  }

  function methodology() {
    const section = element('section', null, 'about-section research-method');
    section.append(element('h2', 'Research methodology', 'heading-lg about-section__title'));
    paragraph(section, scoreMeaning);
    topic(section, 'Original assessment · March 2025',
      'The original index used literature searches, keyword-based filtering, automated crawling and individual assessment of selected publications. The published condition metrics are approximate estimates. Verity’s female-specific clinical findings were developed through manual review of approximately 150 research papers.');
    paragraph(section, 'The original score weighted female inclusion at 30%, female-only studies at 20%, sex-disaggregated analysis at 30% and evidence quality at 20%. The Gap Index uses this framework across conditions.');
    topic(section, 'Revised study-level audit',
      'The revised method follows the Verity methodology specification. It defines a PubMed corpus for 2000–2024, records the search and sampling procedure, and screens original human research against explicit eligibility criteria. The ADHD pilot tests this workflow on a fixed, date-stratified sample of 500 candidate publications drawn from a larger search corpus.');
    paragraph(section, 'The pipeline retrieves title and abstract records, and article text where openly available. An AI model proposes study-level codes for eligibility, enrollment, reporting and study design. Every proposed value is tied to an exact quoted excerpt and a publication identifier. Deterministic code then checks that each excerpt appears in the saved source, reconciles conflicting values, calculates proportions only from paired counts, and keeps unresolved fields as unknown rather than guessing.');
    paragraph(section, 'AI-proposed codes are reviewed and corrected against the saved sources; corrected values are recorded with their quote and scope in a separate field ledger. Coding is assisted, not independently validated: there is no completed double-coding, adjudication or inter-rater agreement study behind these figures. Coverage of full text is partial, because many articles are closed access.');
    section.append(makeTable(['Component', 'Weight', 'Scoring and rationale'], [
      ['Female inclusion', '25%', 'The percentage of eligible studies that included at least one female participant measures how widely women are enrolled.'],
      ['Median female participant proportion', '25%', 'The median across studies with known proportions measures how many participants were female in a typical coded study. A median of 50% earns the full component score.'],
      ['Sex-disaggregated analysis', '35%', 'The percentage of eligible studies reporting sex-specific outcomes or an interaction test. This has the highest weight because enrollment alone leaves questions about sex-specific outcomes unanswered when results are pooled.'],
      ['Evidence-base strength', '15%', 'A rubric rates the strength of the evidence base using study design, sample sizes, coverage and, for the highest tier, consistency of findings. The 1–5 rating is scaled to 100.'],
    ], 'Revised Representation Score components'));
    topic(section, 'Complete-coverage score',
      'A complete score requires a resolved eligibility decision for every sampled record, a supported decision for female inclusion and sex reporting on every included record, a computable median, and a documented eligible corpus size and consistency synthesis. When any of these is missing, the complete score is withheld rather than estimated.');
    topic(section, 'Sex-reporting levels',
      'Sex reporting is coded 0 to 3 from the full article where available. Level 0 means pooled or non-sex-specific reporting only, or adjustment for sex without any stratified result. Level 1 means participant sex is reported demographically, as sample composition or counts. Level 2 means an explicit sex-stratified outcome, or sex as a predictor with an effect estimate. Level 3 means a formal statistical test of a sex difference, interaction or moderation, including a null test, or a sex comparison that is the primary aim with a reported result. Levels 2 and 3 both count as reporting results by sex; the distinction records how strong the analysis is, not whether it happened. A record is left unresolved rather than coded 0 or 1 from an abstract alone, because absence of a sex result in an abstract does not establish absence in the article.');
    topic(section, 'Provisional evidence score',
      'While coverage is incomplete, the pilot also reports a provisional evidence score. It keeps the same four components and the same weights. Each component is calculated only from records with a supported decision, and its numerator and denominator are shown. Unknown values are excluded from the denominators and are never converted to zero or to “not reported”. An unavailable component keeps its weight and is reported as a gap instead of being dropped or reweighted, so the provisional value states how many of the 100 weight points it actually covers.');
    paragraph(section, 'The provisional score is not comparable to a complete score, and it does not replace the March 2025 Gap Index figures. Incomplete reporting, unresolved eligibility and limited full-text access can bias it in either direction. Every record behind it, including its coded values, unknown fields and review status, is published in the downloadable study ledger.');
    paragraph(section, 'The original hosted extraction ran on part of the ADHD sample, and 25 abstracts have initial independent human labels. Larger benchmark validation, double coding, and review of unresolved or conflicting evidence remain outstanding. The pilot does not change the March 2025 Gap Index scores.');
    paragraph(section, 'Audit date: 26 November 2026.');
    section.append(link('Explore ADHD research representation →', '#/conditions/adhd/pilot'));
    return section;
  }

  const format = value => value === null || value === undefined ? 'Pending'
    : typeof value === 'number' ? value.toLocaleString('en', { maximumFractionDigits: 1 }) : String(value);
  const pct = (part, whole) => (whole ? Math.round(1000 * part / whole) / 10 : null);
  const pctLabel = (part, whole) => {
    const value = pct(part, whole);
    return value === null ? '—' : `${format(value)}%`;
  };

  function metric(label, value, detail, projected) {
    const tile = element('div', null, 'pilot-metric');
    tile.append(element('p', label, 'pilot-metric__label'));
    tile.append(element('p', value, 'pilot-metric__value'));
    if (detail) tile.append(element('p', detail, 'pilot-metric__detail'));
    if (projected) tile.append(element('p', projected, 'pilot-metric__projected'));
    return tile;
  }

  function findingsSection() {
    const adhd = typeof window.getConditionBySlug === 'function'
      ? window.getConditionBySlug('adhd') : null;
    if (!adhd || !adhd.findings) return null;
    const section = element('section', null, 'findings-section pilot-findings');
    section.append(element('h2', 'Female-Specific Findings', 'heading-lg findings-section__title'));
    const categories = ['symptoms', 'diagnosis', 'prevalence', 'treatment'];
    const labels = { symptoms: 'Symptoms', diagnosis: 'Diagnosis', prevalence: 'Prevalence', treatment: 'Treatment' };
    const tabs = element('div', null, 'category-tabs');
    tabs.setAttribute('role', 'tablist');
    const panels = {};
    categories.forEach((cat, index) => {
      const tab = element('button', labels[cat], 'category-tab');
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.id = `tab-${cat}`;
      tab.setAttribute('aria-controls', `panel-${cat}`);
      if (index === 0) tab.classList.add('category-tab--active');
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.category-tab').forEach(other => {
          other.classList.remove('category-tab--active');
          other.setAttribute('aria-selected', 'false');
        });
        Object.values(panels).forEach(panel => { panel.hidden = true; });
        tab.classList.add('category-tab--active');
        tab.setAttribute('aria-selected', 'true');
        panels[cat].hidden = false;
      });
      tabs.append(tab);
      const panel = element('div', null, 'findings-section__content');
      panel.id = `panel-${cat}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${cat}`);
      panel.hidden = index !== 0;
      const findings = adhd.findings[cat] || [];
      if (!findings.length) {
        panel.append(element('p', 'No findings currently indexed for this category.', 'findings-section__empty'));
      } else {
        findings.forEach(finding => {
          const card = element('div', null, 'finding-card');
          card.append(element('p', finding.text, 'finding-card__text body-lg'));
          const citation = element('div', null, 'finding-card__citation');
          const arrow = element('span', '↳');
          arrow.setAttribute('aria-hidden', 'true');
          const anchor = element('a', `${finding.citation} · PMID ${finding.pmid}`);
          anchor.href = `https://pubmed.ncbi.nlm.nih.gov/${finding.pmid}`;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          citation.append(arrow, anchor);
          card.append(citation);
          panel.append(card);
        });
      }
      panels[cat] = panel;
    });
    section.append(tabs);
    categories.forEach(cat => section.append(panels[cat]));
    return section;
  }

  function breakdownTable(p) {
    return makeTable(['Component', 'Weight', 'Supported decisions', 'Component score', 'Contribution'], [
      ...p.components.map(c => [
        c.name,
        `${c.weight}%`,
        c.denominator === null ? 'Unavailable'
          : c.numerator === null ? `${format(c.denominator)} records`
            : `${format(c.numerator)} of ${format(c.denominator)}`,
        c.available ? format(Math.round(c.subscore * 10) / 10) : 'Pending',
        c.available ? format(Math.round(c.contribution * 10) / 10) : '—',
      ]),
    ], 'Provisional evidence score components');
  }

  function detailsSection(title, build) {
    const details = element('details', null, 'accordion pilot-audit__details');
    const summary = element('summary', title, 'accordion__trigger');
    const chevron = element('span', '▾', 'accordion__chevron');
    chevron.setAttribute('aria-hidden', 'true');
    summary.append(chevron);
    details.append(summary);
    const content = element('div', null, 'accordion__content');
    build(content);
    details.append(content);
    return details;
  }

  function coverageSection(data) {
    const included = data.included;
    const known = data.inclusionKnown;
    const yes = data.inclusionYes;
    if (!included || known === null || known === undefined) return null;
    const no = known - yes;
    const unknown = included - known;

    const section = element('section', null, 'pilot-coverage');
    section.append(element('h3', 'Reporting coverage and uncertainty', 'heading-md pilot-coverage__heading'));
    section.append(element('p',
      `All ${format(included)} included studies are shown. ${format(known)} have a documented inclusion decision; ${format(unknown)} remain unresolved.`,
      'pilot-coverage__summary'));

    const segments = [
      { key: 'yes', label: 'Confirmed female inclusion', value: yes },
      { key: 'no', label: 'Confirmed absence of female participation', value: no },
      { key: 'unknown', label: 'Inclusion status unresolved', value: unknown },
    ];

    const bar = element('div', null, 'pilot-coverage__bar');
    bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label',
      `Included studies by female inclusion status: ${format(yes)} with confirmed female inclusion, ` +
      `${format(no)} with confirmed absence of female participation, and ${format(unknown)} unresolved, ` +
      `out of ${format(included)} included studies.`);
    for (const segment of segments) {
      if (!segment.value) continue;
      const fill = element('div', null, `pilot-coverage__fill pilot-coverage__fill--${segment.key}`);
      fill.style.width = `${(100 * segment.value) / included}%`;
      bar.append(fill);
    }
    section.append(bar);

    const legend = element('ul', null, 'pilot-coverage__legend');
    for (const segment of segments) {
      const item = element('li', null, `pilot-coverage__item pilot-coverage__item--${segment.key}`);
      const swatch = element('span', null, 'pilot-coverage__swatch');
      swatch.setAttribute('aria-hidden', 'true');
      const text = element('span', null, 'pilot-coverage__text');
      text.append(
        element('span', segment.label, 'pilot-coverage__label'),
        element('span',
          `${format(segment.value)} of ${format(included)} · ${pctLabel(segment.value, included)}`,
          'pilot-coverage__count'));
      item.append(swatch, text);
      legend.append(item);
    }
    section.append(legend);

    const note = element('div', null, 'pilot-coverage__note');
    paragraph(note,
      `The ${pctLabel(yes, known)} “studies including women” metric uses only the ${format(known)} studies with a documented decision. It does not describe all ${format(included)} included studies.`);
    paragraph(note,
      'Unresolved studies are not negative results. Available-case percentages may be affected by systematic differences in reporting and source availability. Missingness may be non-random, but this has not been established.');
    section.append(note);
    return section;
  }

  function metricsBlock(data) {
    const p = data.provisional;
    const { databaseRecords, sampleRecords, sampleCounts, projectedCounts } = data.projection;
    const block = element('section', null, 'pilot-metrics');
    block.append(element('h2', 'Representation Metrics', 'heading-lg pilot-metrics__heading'));

    const score = element('div', null, 'pilot-metrics__score');
    score.append(element('p', 'Provisional evidence score', 'pilot-metrics__label'));
    if (p && p.score !== null) {
      const row = element('p', null, 'pilot-metrics__value-row');
      row.append(element('strong', format(Math.round(p.score * 10) / 10)),
        element('span', '/ 100', 'pilot-metrics__unit'));
      score.append(row);
      score.append(element('p', `${format(p.coveragePercent)} of 100 weight points available`, 'pilot-metrics__note'));
      const pending = p.components.filter(component => !component.available).map(component => component.name);
      if (pending.length) {
        score.append(element('p',
          `${pending.join(' and ')} is pending: the component has no supported decision yet, so its weight is held rather than scored.`,
          'pilot-metrics__pending'));
      }
    } else {
      score.append(element('p', 'Not yet computable', 'pilot-metrics__value-row'));
    }
    block.append(score);

    const row = element('div', null, 'pilot-metrics__row');
    row.append(
      metric('PubMed records found', format(databaseRecords),
        `${format(sampleRecords)} sampled for screening`),
      metric('Included studies', format(sampleCounts.include),
        `of ${format(sampleRecords)} sampled records`, `~${format(projectedCounts.include)} projected`),
      metric('Studies including women', pctLabel(sampleCounts.womenIncluded, data.inclusionKnown),
        `${format(sampleCounts.womenIncluded)} of ${format(data.inclusionKnown)} with a documented decision`,
        `at least ~${format(projectedCounts.womenIncluded)} projected`),
      metric('Female-only studies', pctLabel(sampleCounts.femaleOnly, data.proportionN),
        `${format(sampleCounts.femaleOnly)} of ${format(data.proportionN)} with a usable proportion`,
        `at least ~${format(projectedCounts.femaleOnly)} projected`),
      metric('Sex-disaggregated analysis', pctLabel(sampleCounts.sexDisaggregated, data.disaggregationKnown),
        `${format(sampleCounts.sexDisaggregated)} of ${format(data.disaggregationKnown)} with a coded level`,
        `at least ~${format(projectedCounts.sexDisaggregated)} projected`),
    );
    block.append(row);

    block.append(coverageSection(data));

    block.append(element('p',
      'Sampled records are the publications screened for this pilot. Included studies are the sampled records that met eligibility. Projections scale the sampled evidence to the wider search corpus and are labelled “at least”, because a record with an unknown field is not counted.',
      'pilot-audit__note'));

    const links = element('div', null, 'pilot-links');
    const download = link('Download the public study ledger (CSV) ↓', 'assets/adhd-pilot-records.csv');
    download.download = 'verity-adhd-pilot-records.csv';
    links.append(download, link('Read the methodology →', '#/about'));
    block.append(links);
    return block;
  }

  function pilotSection() {
    const section = element('section', null, 'pilot-audit');
    section.id = 'adhd-pilot';
    section.tabIndex = -1;
    section.setAttribute('aria-labelledby', 'adhd-pilot-title');
    const title = element('h2', 'ADHD Research Representation', 'display-lg');
    title.id = 'adhd-pilot-title';
    section.append(title);
    paragraph(section, 'An AI-assisted audit of participant enrollment and reporting in ADHD research. These figures come from the revised study-level audit; the ADHD overview keeps the separate March 2025 estimates.');
    const data = window.verityAdhdPilot;
    if (!data?.projection) {
      paragraph(section, 'The pilot snapshot is currently unavailable.');
      return section;
    }
    section.append(metricsBlock(data));

    const findings = findingsSection();
    if (findings) section.append(findings);

    const p = data.provisional;
    if (p) {
      section.append(detailsSection('Score breakdown and coverage', content => {
        paragraph(content, 'The provisional value uses the four documented components at their original weights, and calculates each rate only from records with a supported decision. Unknown values are excluded from the denominators; they are never counted as zero or as “not reported”. An unavailable component keeps its weight and is reported as a gap rather than being dropped or reweighted.');
        content.append(breakdownTable(p));
        if (p.gaps.length) paragraph(content, `Coverage is incomplete: ${p.gaps.join(' ')}`);
        paragraph(content, p.caveat);
      }));
    }

    const { sampleRecords, sampleCounts, projectedCounts, strata } = data.projection;
    const estimate = number => `~${format(number)}`;
    const median = data.proportionMedian === null ? 'Unavailable' : `${format(data.proportionMedian)}%`;
    section.append(detailsSection('Coverage of the 500 sampled records', content => {
      paragraph(content, 'The first three rows account for the whole sample. The remaining rows describe results within the provisionally included studies. Counts of included studies with women, female-only studies and sex-disaggregated results are minimums: a study with an unknown field is not counted, so the projected figures can only rise as unknowns are resolved.');
      content.append(makeTable(['Measure', 'In the sample', 'Projected to the database search'], [
        ['Provisionally included', format(sampleCounts.include), estimate(projectedCounts.include)],
        ['Excluded', format(sampleCounts.exclude), estimate(projectedCounts.exclude)],
        ['Eligibility unresolved', format(sampleCounts.unresolved), estimate(projectedCounts.unresolved)],
        ['Studies including women', `${format(sampleCounts.womenIncluded)} of ${format(data.inclusionKnown)}`, `at least ${estimate(projectedCounts.womenIncluded)}`],
        ['Female-only studies', `${format(sampleCounts.femaleOnly)} of ${format(data.proportionN)}`, `at least ${estimate(projectedCounts.femaleOnly)}`],
        ['Studies reporting results by sex', `${format(sampleCounts.sexDisaggregated)} of ${format(data.disaggregationKnown)}`, `at least ${estimate(projectedCounts.sexDisaggregated)}`],
        ['Median female participation', median, 'Available for the sample'],
      ], 'ADHD sample and database projections'));
      content.append(makeTable(['Publication years', 'PubMed records', 'Sampled records', 'Records represented per sample'],
        strata.map(period => [
          `${period.start}–${period.start + 4}`, format(period.databaseRecords), format(period.sampleRecords),
          period.weight.toFixed(2),
        ]), 'Publication year sampling'));
      const unresolved = sampleCounts.unresolved;
      const unresolvedSex = data.included - data.disaggregationKnown;
      paragraph(content, `${format(unresolved)} sampled records still lack an eligibility decision, and many included records have unknown enrollment or reporting fields. Those records are excluded from each component denominator rather than being counted as zero, so the provisional score covers only the evidence that has been reviewed. The downloadable ledger lists every record with its coded values, its unknown fields and its review status.`);
      paragraph(content, `Some reporting fields stay unknown because the evidence could not be retrieved, not because the study was shown to omit the analysis. Every target was queried in Europe PMC and checked for an open-access copy, and publisher and repository pages that returned no readable article were recorded. For sex reporting specifically, ${format(unresolvedSex)} included records remain unresolved after those attempts. They are excluded from the denominator, which means the sex-disaggregated rate can move in either direction as they are resolved. A record is re-opened when institutional access, interlibrary loan or a publisher-permitted copy becomes available.`);
    }));

    section.append(detailsSection('Limitations and how to read this', content => {
      topic(content, 'Sex-reporting levels',
        'Sex reporting is coded 0 to 3 from the full article where available. Level 0 means pooled or non-sex-specific reporting only, or adjustment for sex without any stratified result. Level 1 means participant sex is reported demographically, as sample composition or counts. Level 2 means an explicit sex-stratified outcome, or sex as a predictor with an effect estimate. Level 3 means a formal statistical test of a sex difference, interaction or moderation, including a null test, or a sex comparison that is the primary aim with a reported result. Levels 2 and 3 both count as reporting results by sex; the distinction records how strong the analysis is, not whether it happened. A record is left unresolved rather than coded 0 or 1 from an abstract alone, because absence of a sex result in an abstract does not establish absence in the article.');
      topic(content, 'What this score is not',
        scoreMeaning);
      paragraph(content, 'The provisional score is not comparable to a complete score, and it does not replace the March 2025 Gap Index figures. Incomplete reporting, unresolved eligibility and limited full-text access can bias it in either direction. Every record behind it, including its coded values, unknown fields and review status, is published in the downloadable study ledger.');
      paragraph(content, 'Coding is AI-assisted and reviewed against saved sources, but not independently validated: there is no completed double-coding, adjudication or inter-rater agreement study behind these figures. Coverage of full text is partial, because many articles are closed access.');
      paragraph(content, 'Audit date: 26 November 2026.');
    }));

    if (data.examples?.length) {
      const details = element('details', null, 'pilot-audit__evidence');
      details.append(element('summary', 'Open study-level examples'));
      const labels = { eligibility: 'Eligibility', n_female: 'Female participants',
        female_percent: 'Female participant percentage', sex_reporting: 'Sex reporting level' };
      for (const record of data.examples) {
        const example = element('article');
        example.append(element('h4', record.title, 'heading-sm'));
        paragraph(example, `${labels[record.field]}: ${record.answer} · ${record.source}`);
        example.append(element('blockquote', record.quote), link(`PubMed ${record.pmid} ↗`, `https://pubmed.ncbi.nlm.nih.gov/${record.pmid}/`));
        details.append(example);
      }
      section.append(details);
    }
    return section;
  }

  window.VerityResearch = { scoreMeaning, methodology, pilotSection };
})();
