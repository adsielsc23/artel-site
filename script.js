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

  const onToggle = (e) => {
    if (e) e.preventDefault();
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  };

  // Click + touch support
  toggle.addEventListener('click', onToggle);
  toggle.addEventListener('touchend', onToggle, { passive: false });

  overlay.addEventListener('click', closeMenu);

  // Close when selecting a link on mobile
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 980) closeMenu();
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
