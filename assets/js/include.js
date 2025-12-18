// Evita inicializar el menú más de una vez
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

        // Inicializa el menú SOLO cuando ya está en el DOM
        initMenu();
      })
      .catch(error => {
        console.error("Error cargando include:", error);
      });
  });
});

function initMenu() {
  // Protección contra doble inicialización
  if (menuInitialized) return;
  menuInitialized = true;

  /* MENÚ ACTIVO SEGÚN LA PÁGINA */
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-right a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* MENÚ HAMBURGUESA (MÓVIL) */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-right");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  // Cerrar menú al hacer click en un enlace (móvil)
  document.querySelectorAll(".nav-right a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  });
}





