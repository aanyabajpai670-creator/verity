/**
 * Home page renderer for the Verity SPA — Premium Edition.
 * Animated counters, interactive charts, rich micro-interactions.
 */

import { conditions, getConditionBySlug, getConditionsSortedByScore } from '../data/conditions.js';
import { createSearchBar } from '../components/searchBar.js';
import { createConditionCard } from '../components/conditionCard.js';
import { createEvidenceQuality } from '../components/evidenceQuality.js';
import { createGapTypeBadge } from '../components/gapTypeBadge.js';

/**
 * Render the home page into the given container.
 * @param {HTMLElement} container
 */
export function renderHomePage(container) {
  container.textContent = '';

  // ── Hero Section ──
  const hero = document.createElement('section');
  hero.className = 'hero section';

  const heroContainer = document.createElement('div');
  heroContainer.className = 'container';

  const headline = document.createElement('h1');
  headline.className = 'hero__headline display-xl';
  headline.textContent = 'What does the evidence actually look like for women?';

  const subheadline = document.createElement('p');
  subheadline.className = 'hero__subheadline body-lg';
  subheadline.textContent = 'Verity measures female representation in scientific and medical research. Not advice. Evidence visibility.';

  const searchBar = createSearchBar({ size: 'large', autofocus: true, placeholder: 'Search a condition — e.g. ADHD, Heart Disease, PCOS…' });

  const chips = document.createElement('div');
  chips.className = 'hero__chips';

  const chipSlugs = ['adhd', 'heart-disease', 'endometriosis', 'depression', 'pcos'];
  chipSlugs.forEach(slug => {
    const cond = getConditionBySlug(slug);
    if (cond) {
      const chip = document.createElement('a');
      chip.href = `#/conditions/${cond.slug}`;
      chip.className = 'condition-chip';
      chip.textContent = cond.name;
      chips.appendChild(chip);
    }
  });

  heroContainer.appendChild(headline);
  heroContainer.appendChild(subheadline);
  heroContainer.appendChild(searchBar);
  heroContainer.appendChild(chips);
  hero.appendChild(heroContainer);
  container.appendChild(hero);

  // ── Problem Section — Animated Counters ──
  const problem = document.createElement('section');
  problem.className = 'problem-section section fade-in-section';

  const problemContainer = document.createElement('div');
  problemContainer.className = 'container';

  const statsGrid = document.createElement('div');
  statsGrid.className = 'problem-section__stats grid-3';

  const statsData = [
    { target: 30, suffix: '%', prefix: '<', label: 'of cardiovascular trial participants are women' },
    { target: 79, suffix: '%', prefix: '', label: 'of studies that include women don\'t analyze sex differences' },
    { target: 6, suffix: ' yrs', prefix: '', label: 'average diagnostic delay for women with sleep apnea vs. men' },
  ];

  statsData.forEach(stat => {
    const block = document.createElement('div');
    block.className = 'stat-block';

    const num = document.createElement('div');
    num.className = 'stat-block__number data-xl';
    num.textContent = `${stat.prefix}0${stat.suffix}`;
    num.dataset.target = stat.target;
    num.dataset.prefix = stat.prefix;
    num.dataset.suffix = stat.suffix;

    const label = document.createElement('div');
    label.className = 'stat-block__label body-md';
    label.textContent = stat.label;

    block.appendChild(num);
    block.appendChild(label);
    statsGrid.appendChild(block);
  });

  const problemText = document.createElement('p');
  problemText.className = 'problem-section__text body-lg';
  problemText.textContent = 'Clinical research has historically enrolled male-dominant cohorts and rarely analyzed outcomes by sex. When women are included, their data is frequently merged into mixed-sex analyses, obscuring potential differences in symptoms, diagnosis, and treatment response.';

  problemContainer.appendChild(statsGrid);
  problemContainer.appendChild(problemText);
  problem.appendChild(problemContainer);
  container.appendChild(problem);

  // ── Score Visualization Section ──
  const vizSection = document.createElement('section');
  vizSection.className = 'viz-section section fade-in-section';

  const vizContainer = document.createElement('div');
  vizContainer.className = 'container';

  const vizTitle = document.createElement('h2');
  vizTitle.className = 'display-md';
  vizTitle.style.marginBottom = 'var(--space-2)';
  vizTitle.textContent = 'Representation Scores at a Glance';

  const vizSubtitle = document.createElement('p');
  vizSubtitle.className = 'body-md';
  vizSubtitle.style.cssText = 'color: var(--color-graphite); margin-bottom: var(--space-5); max-width: 50ch;';
  vizSubtitle.textContent = 'How well each condition\'s evidence base represents women, scored 0–100.';

  const chartContainer = document.createElement('div');
  chartContainer.className = 'score-chart';
  chartContainer.style.cssText = 'display: flex; flex-direction: column; gap: 10px;';

  const sorted = getConditionsSortedByScore(false);
  sorted.forEach(cond => {
    const row = document.createElement('a');
    row.href = `#/conditions/${cond.slug}`;
    row.style.cssText = `
      display: grid;
      grid-template-columns: 140px 1fr 52px;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      color: inherit;
      padding: 6px 0;
      border-radius: 8px;
      transition: background-color 150ms ease;
    `;
    row.addEventListener('mouseenter', () => { row.style.backgroundColor = 'var(--color-accent-subtle)'; });
    row.addEventListener('mouseleave', () => { row.style.backgroundColor = ''; });

    const nameEl = document.createElement('span');
    nameEl.className = 'body-sm';
    nameEl.style.fontWeight = '600';
    nameEl.textContent = cond.name;

    const barOuter = document.createElement('div');
    barOuter.style.cssText = `
      height: 28px;
      background-color: var(--color-stone);
      border-radius: 6px;
      overflow: hidden;
      position: relative;
    `;

    const barInner = document.createElement('div');
    barInner.className = 'score-bar-fill';
    const score = cond.metrics.representationScore;
    const hue = score < 30 ? 215 : score < 50 ? 215 : score < 70 ? 215 : 215;
    const lightness = Math.max(28, 55 - score * 0.3);
    barInner.style.cssText = `
      height: 100%;
      width: 0%;
      background: var(--color-verity-blue);
      opacity: ${0.4 + (score / 100) * 0.6};
      border-radius: 6px;
      transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    barInner.dataset.width = `${score}%`;
    barOuter.appendChild(barInner);

    const scoreEl = document.createElement('span');
    scoreEl.className = 'data-md';
    scoreEl.style.cssText = 'text-align: right; font-weight: 600;';
    scoreEl.textContent = score;

    row.appendChild(nameEl);
    row.appendChild(barOuter);
    row.appendChild(scoreEl);
    chartContainer.appendChild(row);
  });

  vizContainer.appendChild(vizTitle);
  vizContainer.appendChild(vizSubtitle);
  vizContainer.appendChild(chartContainer);
  vizSection.appendChild(vizContainer);
  container.appendChild(vizSection);

  // ── How It Works Section ──
  const howItWorks = document.createElement('section');
  howItWorks.className = 'how-it-works section fade-in-section';

  const hiwContainer = document.createElement('div');
  hiwContainer.className = 'container';

  const hiwTitle = document.createElement('h2');
  hiwTitle.className = 'display-md';
  hiwTitle.textContent = 'How Verity Works';

  const stepsGrid = document.createElement('div');
  stepsGrid.className = 'how-it-works__steps grid-3';

  const steps = [
    { number: '01', title: 'Search a condition', desc: 'Enter any medical condition to see its research landscape.' },
    { number: '02', title: 'See the evidence', desc: 'View representation metrics, study counts, and gap classifications.' },
    { number: '03', title: 'Understand the gaps', desc: 'Know what\'s studied, what\'s missing, and what it means.' },
  ];

  steps.forEach(step => {
    const card = document.createElement('div');
    card.className = 'step-card';

    const num = document.createElement('div');
    num.className = 'step-card__number';
    num.textContent = step.number;

    const title = document.createElement('h3');
    title.className = 'step-card__title heading-lg';
    title.textContent = step.title;

    const desc = document.createElement('p');
    desc.className = 'step-card__desc body-md';
    desc.textContent = step.desc;

    card.appendChild(num);
    card.appendChild(title);
    card.appendChild(desc);
    stepsGrid.appendChild(card);
  });

  hiwContainer.appendChild(hiwTitle);
  hiwContainer.appendChild(stepsGrid);
  howItWorks.appendChild(hiwContainer);
  container.appendChild(howItWorks);

  // ── Featured Conditions Section ──
  const featured = document.createElement('section');
  featured.className = 'featured-section section fade-in-section';

  const featContainer = document.createElement('div');
  featContainer.className = 'container';

  const featTitle = document.createElement('h2');
  featTitle.className = 'display-md';
  featTitle.textContent = 'Explore Conditions';

  const featGrid = document.createElement('div');
  featGrid.className = 'featured-section__grid grid-3';

  const featSlugs = ['adhd', 'heart-disease', 'endometriosis', 'depression', 'autism', 'chronic-pain'];
  featSlugs.forEach(slug => {
    const cond = getConditionBySlug(slug);
    if (cond) {
      featGrid.appendChild(createConditionCard(cond));
    }
  });

  featContainer.appendChild(featTitle);
  featContainer.appendChild(featGrid);
  featured.appendChild(featContainer);
  container.appendChild(featured);

  // ── Gap Index Preview ──
  const gapPreview = document.createElement('section');
  gapPreview.className = 'gap-preview section fade-in-section';

  const gpContainer = document.createElement('div');
  gpContainer.className = 'container';

  const gpTitle = document.createElement('h2');
  gpTitle.className = 'display-md';
  gpTitle.textContent = 'Research Gap Index';

  const columns = document.createElement('div');
  columns.className = 'gap-preview__columns grid-2';

  // Highest coverage column
  const highCol = document.createElement('div');
  highCol.className = 'gap-preview__column';
  const highTitle = document.createElement('h3');
  highTitle.className = 'heading-md';
  highTitle.textContent = 'Highest evidence coverage';
  highCol.appendChild(highTitle);

  const top3 = sorted.slice(0, 3);
  top3.forEach(cond => {
    highCol.appendChild(createRankedItem(cond));
  });

  // Largest gaps column
  const lowCol = document.createElement('div');
  lowCol.className = 'gap-preview__column';
  const lowTitle = document.createElement('h3');
  lowTitle.className = 'heading-md';
  lowTitle.textContent = 'Largest gaps';
  lowCol.appendChild(lowTitle);

  const bottom3 = getConditionsSortedByScore(true).slice(0, 3);
  bottom3.forEach(cond => {
    lowCol.appendChild(createRankedItem(cond));
  });

  columns.appendChild(highCol);
  columns.appendChild(lowCol);

  const cta = document.createElement('a');
  cta.href = '#/gap-index';
  cta.className = 'gap-preview__cta body-lg';
  cta.textContent = 'View Full Research Gap Index →';

  gpContainer.appendChild(gpTitle);
  gpContainer.appendChild(columns);
  gpContainer.appendChild(cta);
  gapPreview.appendChild(gpContainer);
  container.appendChild(gapPreview);

  // ── Mission Strip ──
  const mission = document.createElement('section');
  mission.className = 'mission-strip';

  const missionContainer = document.createElement('div');
  missionContainer.className = 'container';

  const missionText = document.createElement('p');
  missionText.className = 'body-lg';
  missionText.textContent = 'Verity measures female representation in scientific research. It does not provide medical advice.';

  const missionLink = document.createElement('a');
  missionLink.href = '#/about';
  missionLink.className = 'body-md';
  missionLink.textContent = 'About Verity →';

  missionContainer.appendChild(missionText);
  missionContainer.appendChild(missionLink);
  mission.appendChild(missionContainer);
  container.appendChild(mission);

  // ── Initialize animations after render ──
  requestAnimationFrame(() => {
    initCounterAnimations();
    initBarAnimations();
  });
}

/**
 * Animate stat block counters when they scroll into view.
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-block__number[data-target]');
  if (counters.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';

        if (prefersReducedMotion) {
          el.textContent = `${prefix}${target}${suffix}`;
        } else {
          animateCounter(el, target, prefix, suffix);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.01 });

  counters.forEach(c => observer.observe(c));
}

/**
 * Animate a number from 0 to target.
 */
function animateCounter(el, target, prefix, suffix) {
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Animate score bar fills when they scroll into view.
 */
function initBarAnimations() {
  const bars = document.querySelectorAll('.score-bar-fill');
  if (bars.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width;
        if (prefersReducedMotion) {
          bar.style.width = targetWidth;
        } else {
          // Stagger bars slightly
          const index = Array.from(bars).indexOf(bar);
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, index * 80);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.01 });

  bars.forEach(b => observer.observe(b));
}

/**
 * Creates a ranked list item with name, score, and evidence dots.
 */
function createRankedItem(condition) {
  const item = document.createElement('a');
  item.href = `#/conditions/${condition.slug}`;
  item.className = 'gap-preview__item';

  const left = document.createElement('div');
  left.style.cssText = 'display:flex; align-items:center; gap:var(--space-2);';

  const name = document.createElement('span');
  name.className = 'body-md';
  name.style.fontWeight = '600';
  name.textContent = condition.name;

  const dots = createEvidenceQuality(condition.metrics.evidenceQuality, { size: 'small' });

  left.appendChild(name);
  left.appendChild(dots);

  const score = document.createElement('span');
  score.className = 'data-md';
  score.textContent = condition.metrics.representationScore;

  item.appendChild(left);
  item.appendChild(score);

  return item;
}
