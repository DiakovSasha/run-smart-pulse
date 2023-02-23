const swiper = new Swiper('.mySwiper', {
  effect: 'flip',
  speed: 800,
  allowTouchMove: true,
  keyboard: true,
  grabCursor: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
//
