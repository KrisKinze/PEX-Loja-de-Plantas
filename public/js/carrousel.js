/* ============================================================ */
/* CARROSSEL DE THUMBNAILS */
/* ============================================================ */

const carousel = document.querySelector('.carousel-thumbnails');
const scroller = document.querySelector('.thumbnails__scroller');
const thumbnails = document.querySelectorAll('.thumbnails__image');

let scrollPosition = 0;

if (carousel) {
  carousel.style.maxWidth = '100%';
  carousel.style.width = '100%';
  carousel.style.overflow = 'hidden';
  
  const items = carousel.querySelectorAll('sl-carousel-item');
  items.forEach(item => {
    item.style.maxWidth = '100%';
    item.style.width = '100%';
    
    const imgs = item.querySelectorAll('img');
    imgs.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'contain';
    });
  });

  carousel.addEventListener('sl-slide-change', () => {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    });
  });
}

scroller.addEventListener('click', e => {
  const target = e.target;

  if (target.matches('.thumbnails__image')) {
    const index = [...thumbnails].indexOf(target);
    carousel.goToSlide(index);
  }
});

carousel.addEventListener('sl-slide-change', e => {
  const slideIndex = e.detail.index;

  [...thumbnails].forEach((thumb, i) => {
    thumb.classList.toggle('active', i === slideIndex);
    if (i === slideIndex) {
      thumb.scrollIntoView({
        block: 'nearest'
      });
    }
  });
});