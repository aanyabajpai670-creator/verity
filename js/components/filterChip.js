// js/components/filterChip.js
// Filter Chip Group component — a radio-like group of toggle buttons for filtering.

/**
 * Creates a filter chip group element.
 *
 * @param {Object} config - Group configuration.
 * @param {string} config.label - Group label text.
 * @param {Array<{value: string, text: string}>} config.options - Chip options.
 * @param {string} config.activeValue - Currently active value.
 * @param {function(string): void} config.onChange - Callback when selection changes.
 * @returns {HTMLDivElement} The filter chip group DOM element.
 */
export function createFilterChipGroup({ label, options, activeValue, onChange }) {
  const group = document.createElement('div');
  group.className = 'filter-group';

  // Label
  const labelEl = document.createElement('span');
  labelEl.className = 'filter-group__label label-text';
  labelEl.textContent = label;
  group.appendChild(labelEl);

  // Chips container
  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'filter-group__chips';
  chipsContainer.setAttribute('role', 'group');
  chipsContainer.setAttribute('aria-label', label);

  /** @type {Map<string, HTMLButtonElement>} */
  const chipMap = new Map();

  options.forEach((option) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'filter-chip';
    chip.textContent = option.text;

    const isActive = option.value === activeValue;
    if (isActive) {
      chip.classList.add('filter-chip--active');
    }
    chip.setAttribute('aria-pressed', String(isActive));

    chip.addEventListener('click', () => {
      // If already active, do nothing
      if (chip.classList.contains('filter-chip--active')) {
        return;
      }

      // Deactivate all chips
      chipMap.forEach((c) => {
        c.classList.remove('filter-chip--active');
        c.setAttribute('aria-pressed', 'false');
      });

      // Activate clicked chip
      chip.classList.add('filter-chip--active');
      chip.setAttribute('aria-pressed', 'true');

      if (typeof onChange === 'function') {
        onChange(option.value);
      }
    });

    chipMap.set(option.value, chip);
    chipsContainer.appendChild(chip);
  });

  group.appendChild(chipsContainer);

  return group;
}
