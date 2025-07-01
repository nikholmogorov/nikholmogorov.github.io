window.onload = () => {
    setTimeout(function () {
        document.querySelector('.banner-info-subtext').classList.add('show');
    }, 1000);
};

let figure1 = document.querySelector('.banner-parallax-figure-1');
let figure2 = document.querySelector('.banner-parallax-figure-2');
let figure3 = document.querySelector('.banner-parallax-figure-3');
let figure4 = document.querySelector('.banner-parallax-figure-4');
window.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    figure1.style.transform = 'translate(+' + x * 50 + 'px, -' + y * 50 + 'px)';
    figure2.style.transform = 'translate(+' + x * 50 + 'px, +' + y * 50 + 'px)';
    figure3.style.transform = 'translate(-' + x * 50 + 'px, +' + y * 50 + 'px)';
    figure4.style.transform = 'translate(+' + x * 50 + 'px, +' + y * 50 + 'px)';
});

document.querySelector('.banner-info-subtext').addEventListener('click', restartAnimation);
function restartAnimation() {
    document.querySelector('.banner-info-subtext').classList.remove('show');
    document.querySelector('.banner-info-subtext').classList.remove('animate');
    setTimeout(function () {
        document.querySelector('.banner-info-subtext').classList.add('animate');
    }, 1);
};

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.reviews-swiper-button-next',
        prevEl: '.reviews-swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints: {
        301: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        801: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        1201: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    },
    centeredSlides: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий отзыв',
        nextSlideMessage: 'Следующий отзыв',
        lastSlideMessage: 'Этот отзыв последний',
    },
});

const preloadNext = (n) => {
    swiper
        .slides
        .slice(swiper.activeIndex, swiper.activeIndex + n + 1)
        .map(slide => slide.querySelector('img'))
        .forEach(s => s.setAttribute('loading', 'eager'));
};

preloadNext(2);

swiper.on('slideChange', () => preloadNext(2));

document.querySelectorAll('.gallery-link').forEach(function (e) {
    let img = new Image(), hrefURL = e.getAttribute('href')
    img.onload = function () {
        e.dataset.pswpWidth = this.width
        e.dataset.pswpHeight = this.height
    }
    img.src = hrefURL
})
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';
const lightbox = new PhotoSwipeLightbox({
    gallery: '.gallery-inner',
    children: '.gallery-link',
    pswpModule: () => import('./photoswipe.esm.min.js')
});
lightbox.init();

$(".telephone").mask("+7(999)999-99-99");

const submitButton1 = document.querySelector('.order-form-submit');
document.querySelector('.uniFormJS1').addEventListener('submit', function (event) {
    event.preventDefault();
    submitButton1.textContent = 'Заявка Отправлена!';
    document.querySelector('.order-form-submit').classList.add('sended');
    setTimeout(function () {
        location.reload();
    }, 3000);
});