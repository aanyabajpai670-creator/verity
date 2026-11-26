import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './pages/home.js';
import { renderConditionPage } from './pages/condition.js';
import { renderGapIndexPage } from './pages/gapIndex.js';
import { renderAboutPage } from './pages/about.js';
import { renderNotFoundPage } from './pages/notFound.js';
import { getConditionBySlug } from './data/conditions.js';

/**
 * Route definitions for the Verity SPA.
 * Each route has a pattern (regex) and a handler function.
 */
const routes = [
  {
    pattern: /^#?\/conditions\/adhd\/pilot\/?$/,
    title: 'ADHD Research Representation — Verity',
    handler: main => window.renderVerityAdhdPilotPage(main),
  },
  {
    pattern: /^#?\/?$/,
    title: 'Verity — Clinical Research & Data Verification Platform',
    handler: (main) => renderHomePage(main),
  },
  {
    pattern: /^#?\/conditions\/([a-z0-9-]+)\/?$/,
    title: null, // Set dynamically from condition name
    handler: (main, match) => {
      const slug = match[1];
      const condition = getConditionBySlug(slug);
      if (condition) {
        document.title = `${condition.name} — Verity`;
        renderConditionPage(main, condition);
      } else {
        document.title = 'Not Found — Verity';
        renderNotFoundPage(main);
      }
    },
  },
  {
    pattern: /^#?\/gap-index\/?$/,
    title: 'Gap Index — Verity',
    handler: (main) => renderGapIndexPage(main),
  },
  {
    pattern: /^#?\/about\/?$/,
    title: 'About — Verity',
    handler: (main) => renderAboutPage(main),
  },
];

/**
 * Resolve the current hash to a route and render it.
 */
function resolveRoute() {
  const hash = window.location.hash || '#/';
  const main = document.getElementById('main-content');

  if (!main) return;

  // Try each route pattern
  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      if (route.title) {
        document.title = route.title;
      }
      route.handler(main, match);
      postRouteSetup();
      return;
    }
  }

  // No match — render 404
  document.title = 'Not Found — Verity';
  renderNotFoundPage(main);
  postRouteSetup();
}

/**
 * Tasks to run after every route change:
 * - Scroll to top
 * - Set up Intersection Observer for fade-in sections
 * - Update navbar active state
 */
function postRouteSetup() {
  window.scrollTo({ top: 0, behavior: 'instant' });
  setupFadeInSections();
}

/**
 * Set up Intersection Observer for `.fade-in-section` elements.
 * Respects prefers-reduced-motion by applying `.visible` immediately.
 */
function setupFadeInSections() {
  const sections = document.querySelectorAll('.fade-in-section');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Attach scroll listener to toggle `.scrolled` class on the navbar.
 * Adds a subtle border when the user scrolls past 10px.
 */
function setupNavbarScrollBehavior() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Navigate programmatically to a given hash route.
 * @param {string} hash — e.g. '#/' or '#/conditions/adhd'
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Initialize the application.
 */
function init() {
  const navbarContainer = document.getElementById('navbar');
  const footerContainer = document.getElementById('footer');

  renderNavbar(navbarContainer);
  renderFooter(footerContainer);

  // Listen for hash changes
  window.addEventListener('hashchange', resolveRoute);

  // Set up navbar scroll behavior
  setupNavbarScrollBehavior();

  // Handle the initial route
  resolveRoute();
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
