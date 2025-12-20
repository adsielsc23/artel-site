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

  // Quote form -> WhatsApp message (no backend)
  document.querySelectorAll('form.quote-form').forEach((form) => {
    const waBtn = form.querySelector('[data-wa-send]');
    if (!waBtn) return;

    const phone = '51926192633';

    const buildMessage = () => {
      const get = (name) => {
        const el = form.querySelector(`[name="${name}"]`);
        return el ? (el.value || '').trim() : '';
      };

      const lines = [];
      lines.push('Hola ARTEL COMPANY, deseo una cotización.');
      lines.push('');
      const nombre = get('nombre');
      const zona = get('zona');
      const servicio = get('servicio');
      const cliente = get('cliente');
      const detalle = get('detalle');
      const telefono = get('telefono');
      const correo = get('correo');

      if (nombre) lines.push(`Nombre: ${nombre}`);
      if (zona) lines.push(`Zona/Distrito: ${zona}`);
      if (servicio) lines.push(`Servicio: ${servicio}`);
      if (cliente) lines.push(`Tipo de cliente: ${cliente}`);
      if (detalle) lines.push(`Detalle: ${detalle}`);
      if (telefono) lines.push(`Teléfono: ${telefono}`);
      if (correo) lines.push(`Correo: ${correo}`);

      lines.push('');
      lines.push('Enviado desde la web de ARTEL COMPANY.');
      return lines.join('
');
    };

    waBtn.addEventListener('click', () => {
      // Validate required fields quickly
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const text = encodeURIComponent(buildMessage());
      const url = `https://wa.me/${phone}?text=${text}`;
      window.location.href = url; // works best on mobile
    });
  });

});
