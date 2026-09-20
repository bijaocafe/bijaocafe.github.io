/* ======================================================================
   BijaoCafé — script.js
   ======================================================================
   ✏️  PARA CAMBIAR EL NÚMERO DE WHATSAPP:
   Modifica la constante WHATSAPP_NUMBER de aquí abajo. Ese único cambio
   actualiza TODOS los botones de WhatsApp de la página (encabezado,
   catálogo, footer, botón flotante, contacto, etc.), porque cada botón
   solo trae su propio mensaje en el atributo "data-wa-msg" y este script
   arma el enlace completo (https://wa.me/...) automáticamente.

   Formato requerido: código de país + número, sin "+", sin espacios.
   Ejemplo Colombia: 57 3001234567  ->  573001234567
   ====================================================================== */
const WHATSAPP_NUMBER = "573145711786"; // <-- CAMBIA AQUÍ tu número real de WhatsApp

/* Arma automáticamente el enlace de cada botón de WhatsApp a partir de
   su mensaje (data-wa-msg). Así, para agregar un nuevo botón en el HTML
   solo necesitas escribir:
     <a href="#" data-wa-msg="Tu mensaje aquí" target="_blank" rel="noopener" class="wa-btn wa-btn-solid">Texto</a>
   y este script se encarga del resto. */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-wa-msg]').forEach((el) => {
    const mensaje = el.getAttribute('data-wa-msg') || '';
    el.setAttribute(
      'href',
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(mensaje)}`
    );
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function openMenu() {
    menuToggle.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
  }

  function closeMenu() {
    menuToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close the mobile menu after tapping any link inside it
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ============ NUEVO: botones de WhatsApp centralizados ============ */
  initWhatsAppLinks();

  /* ============ NUEVO: botón "Volver arriba" ============ */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 480) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ NUEVO: Lightbox (foto ampliada al hacer clic) ============ */
  /* Para que una imagen nueva sea "clicable", solo agrégale la clase "lightbox-img" en el HTML. */
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(imgEl) {
    lightboxImg.src = imgEl.getAttribute('src');
    lightboxImg.alt = imgEl.getAttribute('alt') || '';
    lightboxCaption.textContent = imgEl.getAttribute('alt') || '';
    lightboxOverlay.classList.add('is-open');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // evita el scroll del fondo mientras la foto está abierta
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('is-open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxOverlay && lightboxImg) {
    document.querySelectorAll('.lightbox-img').forEach((img) => {
      img.addEventListener('click', () => openLightbox(img));
    });

    // Cerrar al hacer clic en el botón de cerrar
    lightboxClose.addEventListener('click', closeLightbox);

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }