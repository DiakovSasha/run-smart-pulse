window.onload = function () {
  const btnUp = document.querySelector('.btn__up');
  const promoEl = document.querySelector('.promo');

  let options = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px',
  };

  let observer = new IntersectionObserver(promoIntersecting, options);
  observer.observe(promoEl);

  function promoIntersecting(entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        btnUp.classList.remove('is-hidden');
        btnUp.addEventListener('click', scrollToTop);
      } else {
        btnUp.classList.add('is-hidden');
        btnUp.removeEventListener('click', scrollToTop);
      }
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};
