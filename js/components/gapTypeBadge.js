// js/components/gapTypeBadge.js
// Gap Type Badge component — displays a colored badge indicating the research gap classification.

/**
 * Mapping of gap type numbers to their labels and descriptions.
 * @type {Object.<number, {label: string, description: string}>}
 */
export const GAP_TYPE_INFO = {
  1: {
    label: 'Female Underrepresentation',
    description:
      'The historical assessment identified low female inclusion in the evidence base.',
  },
  2: {
    label: 'Limited Sex-Disaggregated Reporting',
    description:
      'The historical assessment found female enrollment and limited reporting of outcomes by sex.',
  },
  3: {
    label: 'Sex-Disaggregated Analysis Reported',
    description:
      'This label describes reporting coverage. The direction, significance and certainty of any differences require separate assessment.',
  },
  4: {
    label: 'Insufficient Evidence',
    description:
      'There is not enough research data to draw meaningful conclusions about sex-based differences.',
  },
};

/**
 * Creates a gap type badge element.
 *
 * @param {number} gapType - The gap type number (1–4).
 * @param {Object} [options={}] - Display options.
 * @param {'small'|'normal'|'large'} [options.size='normal'] - Badge size variant.
 * @returns {HTMLSpanElement} The badge DOM element.
 */
export function createGapTypeBadge(gapType, options = {}) {
  const { size = 'normal' } = options;
  const info = GAP_TYPE_INFO[gapType];

  if (!info) {
    const fallback = document.createElement('span');
    fallback.className = 'gap-badge';
    fallback.textContent = 'Unknown';
    return fallback;
  }

  const badge = document.createElement('span');
  badge.className = `gap-badge gap-badge--${gapType}`;

  if (size !== 'normal') {
    badge.classList.add(`gap-badge--${size}`);
  }

  badge.textContent = `Type ${gapType} — ${info.label}`;
  badge.setAttribute('aria-label', `Gap Type ${gapType}: ${info.label}`);

  return badge;
}
