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
        initScrollToTopButton(); // <--- CALL THE NEW FUNCTION HERE
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
  const inSubfolder = path.includes('/projects/') || path.split('/').filter(p => p && !p.includes('.')).length > 0;

  const links = document.querySelectorAll('.nav-right a');

  links.forEach(link => {
    const page = link.getAttribute('data-page');

    // Si estamos en subcarpeta, usar ruta relativa
    if (inSubfolder && page) {
      link.setAttribute('href', '../' + page);
    }
  });

  // Marcar página activa
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || href === '../' + currentPage || href === '/' + currentPage) {
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
        console.warn("Scroll-to-top button not found. Make sure its HTML is included.");
        return;
    }

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        const scrollThreshold = 1000;

        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            mybutton.classList.add("show-flex"); // Add the class to show it with flex
        } else {
            mybutton.classList.remove("show-flex"); // Remove the class to hide it
        }
    }

    mybutton.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



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







