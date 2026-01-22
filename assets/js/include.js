// Evita inicializar cosas más de una vez
let menuInitialized = false;

document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(el => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar ${file}`);
        }
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;

        // Initialize all components AFTER content is loaded
        initMenu();
        initPortfolioFilters();
        initContactForm();
        initScrollToTopButton();
      })
      .catch(error => {
        console.error("Error cargando include:", error);
      });
  });
});

/* ===============================
   MENÚ PRINCIPAL
=============================== */
function initMenu() {
  if (menuInitialized) return;
  menuInitialized = true;

  // Detectar si estamos en una subcarpeta y ajustar rutas
  const path = window.location.pathname;
  const inSubfolder =
    path.includes("/projects/") ||
    path.split("/").filter(p => p && !p.includes(".")).length > 0;

  const links = document.querySelectorAll(".nav-right a");

  links.forEach(link => {
    const page = link.getAttribute("data-page");

    // Si estamos en subcarpeta, usar ruta relativa
    if (inSubfolder && page) {
      link.setAttribute("href", "../" + page);
    }
  });

  // Marcar página activa
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      href === "../" + currentPage ||
      href === "/" + currentPage
    ) {
      link.classList.add("active");
    }
  });

  // Funcionalidad del menú móvil
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-right");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("show");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll(".nav-right a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===============================
   FILTROS PORTFOLIO
=============================== */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-link");

  if (!filterButtons.length || !projects.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      projects.forEach(project => {
        const category = project.dataset.category;
        project.style.display =
          filter === "all" || category === filter ? "block" : "none";
      });
    });
  });
}

/* ===============================
   SCROLL TO TOP BUTTON
=============================== */
function initScrollToTopButton() {
  let mybutton = document.getElementById("scroll-to-top");

  if (!mybutton) {
    console.warn(
      "Scroll-to-top button not found. Make sure its HTML is included."
    );
    return;
  }

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    // Calculate the threshold as half the viewport height
    const scrollThreshold = window.innerHeight / 2;

    if (
      document.body.scrollTop > scrollThreshold ||
      document.documentElement.scrollTop > scrollThreshold
    ) {
      mybutton.classList.add("show-flex"); // Add the class to show it with flex
    } else {
      mybutton.classList.remove("show-flex"); // Remove the class to hide it
    }
  }

  mybutton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Navegación por tabs + scroll-to-top + LIGHTBOX
document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     NAVEGACIÓN POR TABS (proyectos)
  =============================== */
  document.querySelectorAll(".project-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 80,
          behavior: "smooth"
        });
      }

      document.querySelectorAll(".project-tab").forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  /* ===============================
     BOTÓN SCROLL-TO-TOP (fallback)
  =============================== */
  const scrollBtn = document.getElementById("scroll-to-top");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("show-flex");
      } else {
        scrollBtn.classList.remove("show-flex");
      }
    });
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===============================
     LIGHTBOX PARA IMÁGENES
  =============================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    const clickableImages = document.querySelectorAll(
      [
        ".inline-gallery img",                         // IKEA, Airo
        ".single-image img",                           // logos, iconos, paletas
        ".project-gallery .gallery-grid img",          // rejillas estándar
        ".project-gallery .gallery-grid-4 img",        // grid 4 columnas (Accesorios3d)
        ".project-gallery .gallery-grid-web img",      // capturas web
        ".project-gallery .gallery-grid-publicidad img", // Scan&Go LAVS
        ".project-gallery .gallery-grid-vertical img", // verticales La Prairié / Coesuz
        ".gallery-item-vertical img"                   // por si se usa suelto
      ].join(", ")
    );

    clickableImages.forEach(img => {
      img.addEventListener("click", () => {
        // Imagen
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";

        // Texto: primero figcaption, si no hay, alt
        let captionText = "";
        const figure = img.closest("figure");
        if (figure) {
          const figcaption = figure.querySelector("figcaption");
          if (figcaption) {
            captionText = figcaption.textContent.trim();
          }
        }
        if (!captionText) {
          captionText = img.alt || "";
        }
        lightboxCaption.textContent = captionText;

        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }
});

/* ===============================
   FORMULARIO CONTACTO
=============================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (!form || !success) return; // Solo en contacto

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.style.display = "none";
      success.style.display = "block";
    }
  });
}
