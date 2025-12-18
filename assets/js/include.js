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
        initMenu();
        initPortfolioFilters(); // 👈 filtros portfolio
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

  // Enlace activo
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-right a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Menú móvil
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-right");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("show");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Cerrar al clicar un enlace
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

      // Estado activo
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filtrado
      projects.forEach(project => {
        const category = project.dataset.category;

        if (filter === "all" || category === filter) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });
}
