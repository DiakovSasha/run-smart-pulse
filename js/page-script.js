const catalogMenuName = document.querySelectorAll('.catalog-menu__item');
const catalogContentList = document.querySelector('.catalog-content__list');
const modalOverlay = document.querySelector('.overlay');
const modalEl = document.querySelector('.modal');
const modalOverlayAccept = document.querySelector('.overlay-accept');
const btnClosemodal = document.querySelector('[data-modal-close]');
const pageForm = document.querySelectorAll('.form');
const formInput = document.querySelectorAll('.form__input');
const loaderEl = document.querySelector('.preloader');
const btnUp = document.querySelector('.btn__up');
// ================================================================================

// =====================markup content and render page =========================
function markUpCatalogItem(item) {
  return ` <li class="catalog-content__item">
            <ul class="catalog-description">
              <li class="catalog-description__item">
                <p class="catalog-description__text">
                  Вы услышите звуковое оповещение о нужном пульсе во время
                  тренировки;
                </p>
              </li>
              <li class="catalog-description__item">
                <p class="catalog-description__text">
                  Вы увидите информативный графический индикатор целевых
                  тренировочных зон пульса;
                </p>
              </li>
              <li class="catalog-description__item">
                <p class="catalog-description__text">
                  Также Вы увидите информацию о расходе калорий за тренировку;
                </p>
              </li>
              <li class="catalog-description__item">
                <p class="catalog-description__text">
                  Вы сможете посмотреть данные по 10 тренировкам.
                </p>
              </li>
            </ul>
            <div class="content__wrapper">
              <img
                src="${item.image}"
                alt="pulsoximetr"
                 width="140"
                 height="180"
                class="catalog-content__img"
              />
              <h4 class="catalog-content__subtitle">${item.subtitle}</h4>
              <p class="catalog-content__descr">
                Для первых шагов в тренировках, основанных на сердечном ритме
              </p>
            </div>
            <a href="#" rel="noopener noreferrer" class="catalog-content__link"
              >ПОДРОБНЕЕ</a
            >
            <div class="price">
              <ul class="price-list">
                <li class="price__item">
                  <p class="price__old">${item.oldPrice}</p>
                </li>
                <li class="price__item">
                  <p class="price__new">${item.newPrice}</p>
                </li>
              </ul>
              <button data-modal-open type="button" class="btn btn__price">КУПИТЬ</button>
            </div>
          </li>`;
}

function addELIstener() {
  return document.querySelectorAll('.catalog-content__link').forEach((el) => el.addEventListener('click', descrList));
}
function aeModalOpen() {
  document.querySelectorAll('.btn[data-modal-open]').forEach((el) => el.addEventListener('click', openOrderModal));
  // body
}
function aeModalClose() {
  btnClosemodal.addEventListener('click', modalClose);
}

function openOrderModal(event) {
  event.preventDefault();
  const innerBtnText = event.currentTarget.innerText.toLowerCase();

  if (innerBtnText === 'купить') {
    modalEl.children[1].textContent = 'Ваш заказ:';
    modalEl.children[2].textContent = event.target.offsetParent.children[1].children[1].innerText;
    modalEl.children[3].children[3].textContent = 'купить'.toUpperCase();
  } else if (
    innerBtnText === 'заказать звонок'.toLocaleLowerCase() ||
    innerBtnText === 'заказать консультацию'.toLocaleLowerCase()
  ) {
    modalEl.children[1].textContent = 'Просто заполните форму заявки';
    modalEl.children[2].textContent = 'и мы перезвоним вам в течении 10 минут';
    modalEl.children[3].children[3].textContent = 'отправить'.toUpperCase();
  }
  document.body.classList.add('modal-open');
  modalOverlay.classList.remove('is-hidden');
  aeModalClose();
}

function modalClose(event) {
  event.preventDefault();
  formInput.forEach((el) => (el.value = ''));

  document.body.classList.remove('modal-open');
  modalOverlay.classList.add('is-hidden');
  modalOverlayAccept.classList.add('is-hidden');
  btnClosemodal.removeEventListener('click', modalClose);
}
const pulse = pulseOximetrs.map((el) => markUpCatalogItem(el));
catalogContentList.innerHTML = pulse.join('');
addELIstener();

// ==============================menu tabs filter======================
function handleMenuActive(event) {
  for (let i = 0; i < catalogMenuName.length; i += 1) {
    if (catalogMenuName[i].classList.contains('catalog-menu__item--active')) {
      catalogMenuName[i].classList.remove('catalog-menu__item--active');
    }
  }
  event.currentTarget.classList.add('catalog-menu__item--active');
  console.dir(event.currentTarget);

  const filteredProducts = pulseOximetrs.filter(
    (el) => el.type.toLowerCase() === event.currentTarget.innerText.toLowerCase()
  );

  catalogContentList.innerHTML = filteredProducts.map((el) => markUpCatalogItem(el)).join('');
  aeModalOpen();
  aeModalClose();
  addELIstener();

  if (event.currentTarget.innerText.toLowerCase() === 'для фитнеса'.toLowerCase()) {
    catalogContentList.innerHTML = pulse.join('');
    aeModalOpen();
    aeModalClose();
    addELIstener();
  }
}
catalogMenuName.forEach((el) => el.addEventListener('click', handleMenuActive));
aeModalOpen();

// ====================catalog btn description of oximetr=============

function descrList(event) {
  event.preventDefault();
  const descrList = event.target.parentNode.children[0];
  const descrEl = event.target.parentNode.children[1];

  descrList.classList.toggle('catalog-description__active');
  descrEl.classList.toggle('is-hidden');
  descrList.classList.contains('catalog-description__active')
    ? (event.target.textContent = 'назад')
    : (event.target.textContent = 'подробнее');
}

// ===================================================================
function formInfo(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const formInfo = {};

  for (let [name, value] of formData) {
    formInfo[name] = value;
  }

  const options = {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formInfo),
  };

  loaderEl.classList.remove('is-hidden');
  modalOverlay.classList.add('is-hidden');

  fetch('mailer/smart.php', options)
    .then((response) => {
      if (response.ok) {
        loaderEl.classList.add('is-hidden');
        form.reset();
        document.body.classList.add('modal-open');
        modalOverlayAccept.classList.remove('is-hidden');
        document.querySelector('.modal-accept [data-modal-close]').addEventListener('click', modalClose);
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch((error) => console.log(error));
}
pageForm.forEach((el) => el.addEventListener('submit', formInfo));
// ================================================================================
const telMaskEl = Array.from(formInput).filter(
  (el) => el.attributes[0].nodeValue.toLowerCase() === 'tel'.toLowerCase()
);
const maskOptions = {
  mask: '+{38}(000)000-00-00',
};
const mask = IMask(telMaskEl[0], maskOptions);

const mask2 = IMask(telMaskEl[1], maskOptions);

// ==================================================================
const wow = new WOW({
  boxClass: 'wow', // default
  animateClass: 'animate__fadeInUp', // default
  offset: 0, // default
  mobile: true, // default
  live: true,
  // default
});
wow.init();
