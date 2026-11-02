/**
 * 404 Not Found page renderer for the Verity SPA.
 */

/**
 * Render the 404 page.
 * @param {HTMLElement} container
 */
export function renderNotFoundPage(container) {
  container.textContent = '';

  const page = document.createElement('div');
  page.className = 'section';
  page.style.textAlign = 'center';

  const wrapper = document.createElement('div');
  wrapper.className = 'container';

  const code = document.createElement('div');
  code.className = 'data-xl';
  code.style.color = 'var(--color-dust)';
  code.style.marginBottom = 'var(--space-3)';
  code.textContent = '404';

  const title = document.createElement('h1');
  title.className = 'display-md';
  title.style.marginBottom = 'var(--space-2)';
  title.textContent = 'Page not found';

  const desc = document.createElement('p');
  desc.className = 'body-lg';
  desc.style.color = 'var(--color-graphite)';
  desc.style.marginBottom = 'var(--space-4)';
  desc.textContent = 'The page you are looking for does not exist or has been moved.';

  const homeLink = document.createElement('a');
  homeLink.href = '#/';
  homeLink.className = 'body-md';
  homeLink.textContent = '← Back to Home';

  wrapper.appendChild(code);
  wrapper.appendChild(title);
  wrapper.appendChild(desc);
  wrapper.appendChild(homeLink);
  page.appendChild(wrapper);
  container.appendChild(page);
}
