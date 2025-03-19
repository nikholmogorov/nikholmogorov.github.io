document.onclick = function (e) {
  document.getElementById('menu_close').classList.add('collapsed');
  document.getElementById('navbarSupportedContent').classList.remove('show');
};

function conditionCloseMenu() {
  if (document.getElementById('navbarSupportedContent').classList.contains('show')) {
    closeMenu();
    menuAnimate();
  }
};

function closeMenu() {
  document.getElementById('menu_close').classList.add('collapsed');
  document.getElementById('navbarSupportedContent').classList.remove('show');
};

function menuAnimate() {
  if (document.getElementById('id_burger').classList.contains('active')) {
    document.getElementById('id_burger').classList.remove('active');
    document.getElementById('menu_close').classList.remove('navbar-toggler_shadow');
  } else {
    document.getElementById('id_burger').classList.add('active');
    document.getElementById('menu_close').classList.add('navbar-toggler_shadow');
  }
};

document.getElementById('change_theme').addEventListener('click', (e) => {
  if (document.documentElement.hasAttribute('theme')) {
    document.documentElement.removeAttribute('theme');
  } else {
    document.documentElement.setAttribute('theme', 'dark');
  }
});

function progressBar() {
  let scroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = scroll / height * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
}
window.addEventListener('scroll', progressBar);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_sst');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_oxygen');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_kropp');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_alivio');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_ink-house');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_konstruct');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_himo');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_pioner');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_ujjo');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_whirl');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_simple');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_robo');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_fromboard');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_sunduk');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_positivus');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

setInterval(function () {
  let carousel = document.querySelector('#carouselExampleControls_kapital');
  let carouselInstance = bootstrap.Carousel.getInstance(carousel);
  carouselInstance.next();
}, 2000);

document.querySelectorAll('[data-bs-toggle="tooltip"]')
  .forEach(tooltip => {
    new bootstrap.Tooltip(tooltip)
  });

function toTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};