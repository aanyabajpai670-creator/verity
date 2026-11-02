// js/components/metricTile.js
// Metric Tile component — displays a key metric with optional tooltip.

/** Auto-incrementing ID counter for unique tooltip pair IDs. */
let tooltipIdCounter = 0;

/**
 * Creates a metric tile element.
 *
 * @param {Object} config - Tile configuration.
 * @param {string|number} config.value - The main metric value.
 * @param {string} config.label - Descriptive label below the value.
 * @param {string} [config.sublabel] - Optional secondary text.
 * @param {string} [config.tooltip] - Optional tooltip text.
 * @param {boolean} [config.highlight=false] - Whether to apply highlight styling.
 * @returns {HTMLDivElement} The metric tile DOM element.
 */
export function createMetricTile({ value, label, sublabel, tooltip, highlight = false }) {
  const tile = document.createElement('div');
  tile.className = 'metric-tile';
  if (highlight) {
    tile.classList.add('metric-tile--highlight');
  }

  // Value
  const valueEl = document.createElement('div');
  valueEl.className = 'metric-tile__value data-lg';
  valueEl.textContent = String(value);
  tile.appendChild(valueEl);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'metric-tile__label label-text';
  labelEl.textContent = label;
  tile.appendChild(labelEl);

  // Sublabel (optional)
  if (sublabel) {
    const sublabelEl = document.createElement('div');
    sublabelEl.className = 'metric-tile__sublabel body-sm';
    sublabelEl.style.color = 'var(--color-ash)';
    sublabelEl.textContent = sublabel;
    tile.appendChild(sublabelEl);
  }

  // Tooltip (optional)
  if (tooltip) {
    const tooltipId = `metric-tooltip-${++tooltipIdCounter}`;

    const trigger = document.createElement('button');
    trigger.className = 'metric-tile__tooltip-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-describedby', tooltipId);
    trigger.setAttribute('aria-label', 'More information');
    trigger.textContent = '\u2139'; // ℹ info symbol

    const content = document.createElement('div');
    content.className = 'tooltip__content';
    content.id = tooltipId;
    content.setAttribute('role', 'tooltip');
    content.textContent = tooltip;

    // Show/hide on hover and focus
    const show = () => content.classList.add('tooltip__content--visible');
    const hide = () => content.classList.remove('tooltip__content--visible');

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', hide);

    tile.appendChild(trigger);
    tile.appendChild(content);
  }

  return tile;
}
