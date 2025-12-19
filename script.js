/*
  Custom JavaScript for ARTEL COMPANY site
  - Highlights active navigation tab
  - Sets footer year
  - Optional FAQ toggles (accordion)
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

  // FAQ toggle (if FAQ exists on a page)
  const faqItems = document.querySelectorAll('.faq-item h3');
  faqItems.forEach(function (h) {
    h.style.cursor = 'pointer';
    h.addEventListener('click', function () {
      const answer = h.nextElementSibling;
      if (!answer) return;

      const isOpen = answer.style.display === 'block';
      // Close all
      document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');
      // Toggle current
      answer.style.display = isOpen ? 'none' : 'block';
    });
  });
});

// Hamburger menu (mobile)
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !nav || !overlay) return;

  function openMenu() {
    nav.classList.add('open');
    overlay.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    // prevent background scroll
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close on link click (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 980) closeMenu();
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  // Safety: close if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 980) {
      closeMenu();
    }
  });
});
