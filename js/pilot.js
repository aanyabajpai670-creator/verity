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

  const format = value => value === null ? 'Pending' : value.toLocaleString('en', { maximumFractionDigits: 1 });
  function stat(label, value, note) {
    const item = element('div');
    item.append(element('dt', label), element('dd', value), element('p', note, 'body-sm'));
    return item;
  }

  function scoreSection(data) {
    const p = data.provisional;
    if (!p) return null;
    const section = element('section', null, 'pilot-score');
    section.append(element('h2', 'Provisional evidence score', 'heading-lg'));
    if (p.score === null) {
      paragraph(section, 'The provisional score cannot be calculated because no component is computable from the supported decisions recorded so far.');
      return section;
    }
    const headline = element('p', null, 'pilot-score__value');
    headline.append(element('strong', format(Math.round(p.score * 10) / 10)),
      element('span', ` / 100 · ${format(p.coveragePercent)} of 100 weight points`));
    section.append(headline);
    paragraph(section, 'This provisional value uses the four documented components at their original weights, and calculates each rate only from records with a supported decision. Unknown values are excluded from the denominators; they are never counted as zero or as “not reported”.');
    section.append(makeTable(['Component', 'Weight', 'Supported decisions', 'Component score', 'Contribution'], [
      ...p.components.map(c => [
        c.name,
        `${c.weight}%`,
        c.denominator === null ? 'Unavailable'
          : c.numerator === null ? `${format(c.denominator)} records`
            : `${format(c.numerator)} of ${format(c.denominator)}`,
        c.available ? format(Math.round(c.subscore * 10) / 10) : 'Not computable',
        c.available ? format(Math.round(c.contribution * 10) / 10) : '—',
      ]),
    ], 'Provisional evidence score components'));
    if (p.gaps.length) {
      paragraph(section, `Coverage is incomplete: ${p.gaps.join(' ')}`);
    }
    paragraph(section, p.caveat);
    return section;
  }

  function pilotSection() {
    const section = element('section', null, 'pilot-audit');
    section.id = 'adhd-pilot';
    section.tabIndex = -1;
    section.setAttribute('aria-labelledby', 'adhd-pilot-title');
    const title = element('h2', 'ADHD Research Representation', 'display-lg');
    title.id = 'adhd-pilot-title';
    section.append(title);
    paragraph(section, 'An AI-assisted audit of participant enrollment and reporting in ADHD research. The extraction pipeline uses the revised methodology in this pilot. See the ADHD overview for the separate March 2025 figures.');
    const data = window.verityAdhdPilot;
    if (!data?.projection) {
      paragraph(section, 'The pilot snapshot is currently unavailable.');
      return section;
    }
    const { databaseRecords, sampleRecords, sampleCounts, projectedCounts, strata } = data.projection;
    const estimate = number => `~${format(number)}`;
    const stats = element('dl', null, 'pilot-audit__stats');
    const median = data.proportionMedian === null ? 'Unavailable' : `${format(data.proportionMedian)}%`;
    stats.append(
      stat('PubMed records found', format(databaseRecords), `${format(sampleRecords)} records were sampled for screening`),
      stat('Studies including women', estimate(projectedCounts.womenIncluded), `Projected from ${format(sampleCounts.womenIncluded)} of ${format(data.inclusionKnown)} included records with a documented decision`),
      stat('Median female participation', median, data.proportionN ? `Based on ${format(data.proportionN)} included records with usable enrollment figures` : 'Usable enrollment figures unavailable'),
      stat('Studies reporting results by sex', estimate(projectedCounts.sexDisaggregated), `Projected from ${format(sampleCounts.sexDisaggregated)} of ${format(data.disaggregationKnown)} included records with a coded sex-reporting level`),
    );
    section.append(stats);
    paragraph(section, 'The sample and the corpus are different sizes. The search returned the corpus total; the figures above come from the sampled records only. Each sampled record represents roughly 25 PubMed records, weighted by five-year period. Projections reflect the evidence found so far and can change as unknown records are resolved.');
    const score = scoreSection(data);
    if (score) section.append(score);
    topic(section, `Breakdown of the ${format(sampleRecords)} sampled records`,
      'The first three rows account for the whole sample. The remaining rows describe results within the provisionally included studies. Counts of included studies with women, female-only studies and sex-disaggregated results are minimums: a study with an unknown field is not counted, so the projected figures can only rise as unknowns are resolved.');
    section.append(makeTable(['Measure', 'In the sample', 'Projected to the database search'], [
      ['Provisionally included', format(sampleCounts.include), estimate(projectedCounts.include)],
      ['Excluded', format(sampleCounts.exclude), estimate(projectedCounts.exclude)],
      ['Eligibility unresolved', format(sampleCounts.unresolved), estimate(projectedCounts.unresolved)],
      ['Studies including women', `${format(sampleCounts.womenIncluded)} of ${format(data.inclusionKnown)}`, `at least ${estimate(projectedCounts.womenIncluded)}`],
      ['Female-only studies', `${format(sampleCounts.femaleOnly)} of ${format(data.proportionN)}`, `at least ${estimate(projectedCounts.femaleOnly)}`],
      ['Studies reporting results by sex', `${format(sampleCounts.sexDisaggregated)} of ${format(data.disaggregationKnown)}`, `at least ${estimate(projectedCounts.sexDisaggregated)}`],
      ['Median female participation', median, 'Available for the sample'],
    ], 'ADHD sample and database projections'));
    const sampling = element('details', null, 'pilot-audit__evidence');
    sampling.append(element('summary', 'See how the 500 records were sampled'));
    sampling.append(makeTable(['Publication years', 'PubMed records', 'Sampled records', 'Records represented per sample'],
      strata.map(period => [
        `${period.start}–${period.start + 4}`, format(period.databaseRecords), format(period.sampleRecords),
        period.weight.toFixed(2),
      ]), 'Publication year sampling'));
    section.append(sampling);
    const unresolved = sampleCounts.unresolved;
    const unresolvedSex = data.included - data.disaggregationKnown;
    topic(section, 'What remains unresolved',
      `${format(unresolved)} sampled records still lack an eligibility decision, and many included records have unknown enrollment or reporting fields. Those records are excluded from each component denominator rather than being counted as zero, so the provisional score covers only the evidence that has been reviewed. The downloadable ledger lists every record with its coded values, its unknown fields and its review status.`);
    paragraph(section, `Some reporting fields stay unknown because the evidence could not be retrieved, not because the study was shown to omit the analysis. Every target was queried in Europe PMC and checked for an open-access copy, and publisher and repository pages that returned no readable article were recorded. For sex reporting specifically, ${format(unresolvedSex)} included records remain unresolved after those attempts. They are excluded from the denominator, which means the sex-disaggregated rate can move in either direction as they are resolved. A record is re-opened when institutional access, interlibrary loan or a publisher-permitted copy becomes available.`);
    const links = element('div', null, 'pilot-audit__links');
    const download = link('Download study ledger (CSV) ↓', 'assets/adhd-pilot-records.csv');
    download.download = 'verity-adhd-pilot-records.csv';
    links.append(download, link('Read the methodology →', '#/about'));
    section.append(links);
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
