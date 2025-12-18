document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(el => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;

        // Inicializar funcionalidades cuando el menú ya está en el DOM
        initMenu();
      });
  });
});

function initMenu() {
  /* ===============================
     MENÚ ACTIVO SEGÚN LA PÁGINA
  =============================== */
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-right a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ===============================
     MENÚ HAMBURGUESA (MÓVIL)
  =============================== */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-right");

  if (toggle && nav) {
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
}



