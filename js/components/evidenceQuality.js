// js/components/evidenceQuality.js
// Evidence Quality indicator — renders a row of dots representing evidence strength.

/**
 * Mapping of evidence quality scores to their text labels.
 * @type {Object.<number, string>}
 */
const EVIDENCE_LABELS = {
  1: 'Very Limited',
  2: 'Limited',
  3: 'Moderate',
  4: 'Moderate-Strong',
  5: 'Strong',
};

/** Maximum number of dots in the scale. */
const MAX_SCORE = 5;

/**
 * Creates an evidence quality indicator element.
 *
 * @param {number} score - Evidence quality score (1–5).
 * @param {Object} [options={}] - Display options.
 * @param {boolean} [options.showLabel=false] - Whether to show the text label.
 * @param {'small'|'normal'} [options.size='normal'] - Size variant.
 * @returns {HTMLDivElement} The evidence quality DOM element.
 */
export function createEvidenceQuality(score, options = {}) {
  const { showLabel = false, size = 'normal' } = options;

  // Clamp score to valid range
  const clampedScore = Math.max(1, Math.min(MAX_SCORE, Math.round(score)));
  const label = EVIDENCE_LABELS[clampedScore] || 'Unknown';
  const cssVar = `var(--color-eq-${clampedScore})`;

  const container = document.createElement('div');
  container.className = 'evidence-dots';
  if (size === 'small') {
    container.classList.add('evidence-dots--small');
  }
  container.setAttribute(
    'aria-label',
    `Evidence quality: ${clampedScore} out of ${MAX_SCORE} — ${label}`
  );

  // Render dots
  for (let i = 1; i <= MAX_SCORE; i++) {
    const dot = document.createElement('span');
    if (i <= clampedScore) {
      dot.className = 'evidence-dot evidence-dot--filled';
      dot.style.backgroundColor = cssVar;
    } else {
      dot.className = 'evidence-dot evidence-dot--empty';
    }
    container.appendChild(dot);
  }

  // Optional text label
  if (showLabel) {
    const labelEl = document.createElement('span');
    labelEl.className = 'evidence-dots__label';
    labelEl.textContent = label;
    container.appendChild(labelEl);
  }

  return container;
}
