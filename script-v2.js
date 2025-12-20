/*
  ARTEL COMPANY - site scripts
  - Footer year
  - Active nav highlight
  - Optional FAQ accordion
  - Mobile hamburger menu (panel + overlay)
*/
document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active nav
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });
  }

  // FAQ toggle (if present)
  const faqHeads = document.querySelectorAll('.faq-item h3');
  faqHeads.forEach(h => {
    h.style.cursor = 'pointer';
    h.addEventListener('click', () => {
      const answer = h.nextElementSibling;
      if (!answer) return;

      const isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');
      answer.style.display = isOpen ? 'none' : 'block';
    });
  });

  // Hamburger menu (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !nav || !overlay) return;

  const openMenu = () => {
    nav.classList.add('open');
    overlay.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    overlay.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  };

  const toggleMenu = (e) => {
    if (e) e.preventDefault();
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  };

  // Tap/click on hamburger
  toggle.addEventListener('click', toggleMenu);
  toggle.addEventListener('touchend', toggleMenu, { passive: false });

  // Overlay is visual only (pointer-events disabled in CSS).
  // Close when tapping/clicking outside the menu.
  const outsideClose = (e) => {
    if (!nav.classList.contains('open')) return;
    const target = e.target;
    const clickedInside = nav.contains(target) || toggle.contains(target);
    if (!clickedInside) closeMenu();
  };
  document.addEventListener('click', outsideClose);
  document.addEventListener('touchstart', outsideClose, { passive: true });

  // Close when selecting a link (and allow navigation)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 980) closeMenu();
      // do NOT prevent default (navigation must happen)
    });
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  // If resized to desktop, ensure closed
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 980) closeMenu();
  });
});
