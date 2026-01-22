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
        initPortfolioFilters();
        initContactForm();
        initScrollToTopButton();
      })
      .catch(error => {
        console.error("Error cargando include:", error);
      });
  });
});

function initMenu() {
  if (menuInitialized) return;
  menuInitialized = true;


  const path = window.location.pathname;
  const inSubfolder =
    path.includes("/projects/") ||
    path.split("/").filter(p => p && !p.includes(".")).length > 0;

  const links = document.querySelectorAll(".nav-right a");

  links.forEach(link => {
    const page = link.getAttribute("data-page");

    if (inSubfolder && page) {
      link.setAttribute("href", "../" + page);
    }
  });

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
    const scrollThreshold = window.innerHeight / 2;

    if (
      document.body.scrollTop > scrollThreshold ||
      document.documentElement.scrollTop > scrollThreshold
    ) {
      mybutton.classList.add("show-flex");
    } else {
      mybutton.classList.remove("show-flex");
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

document.addEventListener("DOMContentLoaded", () => {
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

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    const clickableImages = document.querySelectorAll(
      [
        ".inline-gallery img",
        ".single-image img",
        ".project-gallery .gallery-grid img",
        ".project-gallery .gallery-grid-4 img",
        ".project-gallery .gallery-grid-web img",
        ".project-gallery .gallery-grid-publicidad img",
        ".project-gallery .gallery-grid-vertical img",
        ".gallery-item-vertical img"
      ].join(", ")
    );

    clickableImages.forEach(img => {
      img.addEventListener("click", () => {
        // Imagen
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";

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


function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (!form || !success) return; 
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
