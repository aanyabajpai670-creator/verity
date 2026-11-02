// js/components/gapTypeBadge.js
// Gap Type Badge component — displays a colored badge indicating the research gap classification.

/**
 * Mapping of gap type numbers to their labels and descriptions.
 * @type {Object.<number, {label: string, description: string}>}
 */
export const GAP_TYPE_INFO = {
  1: {
    label: 'No Female Representation',
    description:
      'Studies on this condition have not included female participants in their research cohorts.',
  },
  2: {
    label: 'Women Included, Not Studied',
    description:
      'Female participants were included in study populations but sex-disaggregated analysis was not performed.',
  },
  3: {
    label: 'No Significant Differences Found',
    description:
      'Sex-disaggregated analysis was performed but no statistically significant differences were identified.',
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
