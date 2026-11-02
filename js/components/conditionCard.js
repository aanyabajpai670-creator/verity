// js/components/conditionCard.js
// Condition Card component — a clickable card linking to a condition detail page.

import { createGapTypeBadge } from './gapTypeBadge.js';

/**
 * Creates a condition card element.
 *
 * @param {Object} condition - A condition data object.
 * @param {string} condition.name - Display name of the condition.
 * @param {string} condition.slug - URL-safe slug for routing.
 * @param {number} condition.gapType - Gap type number (1–4).
 * @param {number} condition.representationScore - Score out of 100.
 * @returns {HTMLAnchorElement} The condition card DOM element.
 */
export function createConditionCard(condition) {
  const card = document.createElement('a');
  card.href = `#/conditions/${condition.slug}`;
  card.className = 'condition-card';

  // Header
  const header = document.createElement('div');
  header.className = 'condition-card__header';

  const name = document.createElement('h3');
  name.className = 'condition-card__name heading-lg';
  name.textContent = condition.name;
  header.appendChild(name);

  const badgeWrapper = document.createElement('div');
  badgeWrapper.className = 'condition-card__badge';
  badgeWrapper.appendChild(createGapTypeBadge(condition.gapType, { size: 'small' }));
  header.appendChild(badgeWrapper);

  card.appendChild(header);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'condition-card__footer';

  const scoreContainer = document.createElement('div');
  scoreContainer.className = 'condition-card__score';

  const scoreValue = document.createElement('span');
  scoreValue.className = 'data-lg';
  scoreValue.textContent = String(condition.metrics.representationScore);
  scoreContainer.appendChild(scoreValue);

  const scoreMax = document.createElement('span');
  scoreMax.className = 'body-sm';
  scoreMax.style.color = 'var(--color-ash)';
  scoreMax.textContent = '/100';
  scoreContainer.appendChild(scoreMax);

  footer.appendChild(scoreContainer);

  const scoreLabel = document.createElement('div');
  scoreLabel.className = 'condition-card__label label-text';
  scoreLabel.textContent = 'Representation Score';
  footer.appendChild(scoreLabel);

  card.appendChild(footer);

  return card;
}
