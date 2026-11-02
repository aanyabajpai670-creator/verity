// js/components/searchBar.js
// Search Bar component — accessible combobox with condition filtering and keyboard navigation.

import { conditions } from '../data/conditions.js';
import { createGapTypeBadge } from './gapTypeBadge.js';

/** Auto-incrementing ID counter for unique combobox instance IDs. */
let searchBarIdCounter = 0;

/**
 * Creates a search bar element with autocomplete dropdown.
 *
 * @param {Object} [options={}] - Configuration options.
 * @param {string} [options.placeholder='Search a condition...'] - Input placeholder.
 * @param {function(Object): void} [options.onSelect] - Callback when a condition is selected.
 * @param {boolean} [options.autofocus=false] - Whether the input should be autofocused.
 * @param {'large'|'normal'} [options.size='normal'] - Size variant.
 * @returns {HTMLDivElement} The search bar DOM element.
 */
export function createSearchBar(options = {}) {
  const {
    placeholder = 'Search a condition...',
    onSelect,
    autofocus = false,
    size = 'normal',
  } = options;

  const instanceId = ++searchBarIdCounter;
  const listboxId = `search-listbox-${instanceId}`;

  // State
  let filteredConditions = [];
  let activeIndex = -1;
  let isOpen = false;

  // --- Container ---
  const container = document.createElement('div');
  container.className = 'search-bar';
  if (size === 'large') {
    container.classList.add('search-bar--large');
  }

  // --- Input ---
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-bar__input';
  input.placeholder = placeholder;
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', listboxId);
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-activedescendant', '');
  if (autofocus) {
    input.autofocus = true;
  }
  container.appendChild(input);

  // --- Dropdown ---
  const dropdown = document.createElement('div');
  dropdown.className = 'search-bar__dropdown';
  dropdown.id = listboxId;
  dropdown.setAttribute('role', 'listbox');
  container.appendChild(dropdown);

  // --- Helpers ---

  /** Generate a unique option ID for a given index. */
  function optionId(index) {
    return `search-option-${instanceId}-${index}`;
  }

  /** Open the dropdown and render filtered results. */
  function openDropdown() {
    if (filteredConditions.length === 0) {
      closeDropdown();
      return;
    }
    isOpen = true;
    dropdown.classList.add('search-bar__dropdown--visible');
    input.setAttribute('aria-expanded', 'true');
    renderOptions();
  }

  /** Close the dropdown and reset active index. */
  function closeDropdown() {
    isOpen = false;
    activeIndex = -1;
    dropdown.classList.remove('search-bar__dropdown--visible');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-activedescendant', '');
    // Clear dropdown children
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }
  }

  /** Render the filtered condition options into the dropdown. */
  function renderOptions() {
    // Clear existing options
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }

    filteredConditions.forEach((condition, index) => {
      const option = document.createElement('div');
      option.className = 'search-bar__option';
      option.id = optionId(index);
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(index === activeIndex));

      if (index === activeIndex) {
        option.classList.add('search-bar__option--active');
      }

      // Condition name
      const nameSpan = document.createElement('span');
      nameSpan.className = 'search-bar__option-name';
      nameSpan.textContent = condition.name;
      option.appendChild(nameSpan);

      // Gap type badge
      option.appendChild(createGapTypeBadge(condition.gapType, { size: 'small' }));

      // Click handler
      option.addEventListener('mousedown', (e) => {
        // Prevent input blur before selection
        e.preventDefault();
        selectCondition(condition);
      });

      dropdown.appendChild(option);
    });
  }

  /** Update the visual active state of options. */
  function updateActiveOption() {
    const optionEls = dropdown.querySelectorAll('.search-bar__option');
    optionEls.forEach((el, index) => {
      const isActive = index === activeIndex;
      el.classList.toggle('search-bar__option--active', isActive);
      el.setAttribute('aria-selected', String(isActive));
    });

    if (activeIndex >= 0) {
      const activeId = optionId(activeIndex);
      input.setAttribute('aria-activedescendant', activeId);

      // Scroll active option into view
      const activeEl = document.getElementById(activeId);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    } else {
      input.setAttribute('aria-activedescendant', '');
    }
  }

  /** Handle condition selection. */
  function selectCondition(condition) {
    input.value = condition.name;
    closeDropdown();

    if (typeof onSelect === 'function') {
      onSelect(condition);
    } else {
      // Default navigation
      window.location.hash = '#/conditions/' + condition.slug;
    }
  }

  // --- Event Listeners ---

  // Filter on input
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length === 0) {
      filteredConditions = [];
      closeDropdown();
      return;
    }

    filteredConditions = conditions.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    activeIndex = -1;
    openDropdown();
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (!isOpen) {
      // If dropdown is closed and user presses down, trigger filtering
      if (e.key === 'ArrowDown' && input.value.trim().length > 0) {
        openDropdown();
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, filteredConditions.length - 1);
        updateActiveOption();
        break;

      case 'ArrowUp':
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActiveOption();
        break;

      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredConditions.length) {
          selectCondition(filteredConditions[activeIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;
    }
  });

  // Close on blur (when focus leaves the container)
  input.addEventListener('blur', () => {
    // Small delay to allow mousedown on option to fire first
    setTimeout(() => {
      closeDropdown();
    }, 150);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      closeDropdown();
    }
  });

  return container;
}
