  // LIGHTBOX PARA IMÁGENES
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
const clickableImages = document.querySelectorAll(
  [
    '.inline-gallery img',
    '.single-image img',
    '.project-gallery .gallery-grid img',
    '.project-gallery .gallery-grid-4 img',
    '.project-gallery .gallery-grid-web img',
    '.project-gallery .gallery-grid-publicidad img',
    '.project-gallery .gallery-grid-vertical img',
    '.gallery-item-vertical img'
  ].join(', ')
);

    clickableImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';

        let captionText = '';
        const figure = img.closest('figure');
        if (figure) {
          const figcaption = figure.querySelector('figcaption');
          if (figcaption) {
            captionText = figcaption.textContent.trim();
          }
        }
        if (!captionText) {
          captionText = img.alt || '';
        }
        lightboxCaption.textContent = captionText;

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

