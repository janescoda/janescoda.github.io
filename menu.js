// menu.js
(function() {
  // Función que inicializa comportamiento del menú (hamburguesa, copy, activo)
  function initMenu(activePage) {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;

    const toggleBtn   = nav.querySelector('.nav-toggle');
    const mobileMenu  = nav.querySelector('.nav-right-mobile');

    // Hamburguesa (abrir/cerrar menú móvil)
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = nav.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      mobileMenu.addEventListener('click', function(e) {
        if (e.target.matches('.nav-link')) {
          nav.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Copy email (desktop y mobile)
    function wireCopy(btnId) {
      const btn = document.getElementById(btnId);
      if (!btn) return;

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof copyEmail === 'function') {
          copyEmail();
        }
      });
    }

    wireCopy('copyBtn');
    wireCopy('copyBtnMobile');

    // Marcar link activo
    const workLink  = document.querySelector('.nav-link[href="index.html#work"]');
    const aboutLink = document.querySelector('.nav-link[href="about.html"]');

    if (workLink && aboutLink) {
      workLink.classList.remove('is-active');
      aboutLink.classList.remove('is-active');

      if (activePage === 'work') {
        workLink.classList.add('is-active');
      } else if (activePage === 'about') {
        aboutLink.classList.add('is-active');
      }
    }
  }

  // Hacemos la función accesible globalmente
  window._initMenuShared = initMenu;
})();
