// --- js/components/dotsBackground.js ---
let verityDotsRafId = null;

function initVerityDotsBackground() {
  const canvas = document.getElementById('verity-dots-bg');
  if (!canvas) return;

  // Kill any previous loop still running from a prior render of this page
  if (verityDotsRafId) {
    cancelAnimationFrame(verityDotsRafId);
    verityDotsRafId = null;
  }

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rootStyles = getComputedStyle(document.documentElement);
  function cssVar(name, fallback) {
    const val = rootStyles.getPropertyValue(name).trim();
    return val || fallback;
  }
  const COLOR_BASE = cssVar('--color-stone', '#E2DDD8');
  const COLOR_DUST = cssVar('--color-dust', '#C4C0BC');
  const COLOR_ACCENT = cssVar('--color-verity-blue', '#1B4F8A');

  const SPACING = 42;
  const BASE_RADIUS = 1.3;
  const MAX_RADIUS = 3.2;
  const GLOW_RADIUS = 150;
  const BASE_OPACITY = 0.28;
  const MAX_OPACITY = 0.75;
  const EASE = 0.12;

  let width, height, dpr, dots = [];
  let mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  function buildGrid() {
    dots = [];
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 1;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const useDust = (row + col) % 3 === 0;
        dots.push({
          x: col * SPACING,
          y: row * SPACING,
          radius: BASE_RADIUS,
          opacity: BASE_OPACITY,
          color: useDust ? COLOR_DUST : COLOR_BASE,
        });
      }
    }
  }

  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const dot of dots) {
      let targetRadius = BASE_RADIUS, targetOpacity = BASE_OPACITY, targetColor = dot.color;
      if (mouse.active) {
        const dx = dot.x - mouse.x, dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < GLOW_RADIUS) {
          const t = 1 - dist / GLOW_RADIUS;
          targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t;
          targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * t;
          targetColor = COLOR_ACCENT;
        }
      }
      dot.radius += (targetRadius - dot.radius) * EASE;
      dot.opacity += (targetOpacity - dot.opacity) * EASE;
      dot.renderColor = targetColor;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(dot.renderColor, dot.opacity);
      ctx.fill();
    }
  }

  function loop() {
    draw();
    verityDotsRafId = requestAnimationFrame(loop);
  }

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }
  function handleMouseLeave() { mouse.active = false; }

  resize();
  window.addEventListener('resize', resize);

  if (prefersReducedMotion) {
    draw();
  } else {
    canvas.parentElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    loop();
  }
}
