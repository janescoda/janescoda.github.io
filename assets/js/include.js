document.addEventListener("DOMContentLoaded", () => {
    const includeElements = document.querySelectorAll("[data-include]");

    includeElements.forEach(el => {
        const file = el.getAttribute("data-include");

        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
            });
    });

});

const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-right a').forEach(link => {
  if (
    link.getAttribute('href') === currentPage ||
    (currentPage === '' && link.getAttribute('href') === 'index.html')
  ) {
    link.classList.add('active');
  }
});
