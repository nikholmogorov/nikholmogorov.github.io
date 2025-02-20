document.querySelectorAll('.guarantees-card-link').forEach(function (e) {
    let img = new Image(), hrefURL = e.getAttribute('href')
    img.onload = function () {
        e.dataset.pswpWidth = this.width
        e.dataset.pswpHeight = this.height
    }
    img.src = hrefURL
})
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';
const lightbox = new PhotoSwipeLightbox({
    gallery: '.guarantees-card',
    children: '.guarantees-card-link',
    pswpModule: () => import('./photoswipe.esm.min.js')
});
lightbox.init();

$(".telephone").mask("+7(999)999-99-99");

function getBrowserSize() {
    var w, h;
    if (typeof window.innerWidth != 'undefined') {
        w = window.innerWidth;
        h = window.innerHeight;
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    }
    else {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }
    return { 'width': w, 'height': h };
};
if (parseInt(getBrowserSize().width) < 801) {
    document.querySelector('.header-bottom').classList.add('visually-hidden');
    document.querySelector('.header-top-right-info').classList.add('visually-hidden');
};

document.querySelector('.header-top-right-burger').addEventListener('click', toggleBurgerMenu);
function toggleBurgerMenu() {
    document.querySelector('.header-bottom').classList.toggle('visually-hidden');
    document.querySelector('.header-top-right-info').classList.toggle('visually-hidden');
    document.querySelector('.header').classList.toggle('burger-open');
    document.querySelector('.header-top-right-burger').classList.toggle('burger-open-icon');
    document.querySelector('.content').classList.toggle('shadow');
};

document.querySelector('.content').addEventListener('click', closeBurgerMenu);
function closeBurgerMenu() {
    if ((getBrowserSize().width) < 801) {
        document.querySelector('.header-bottom').classList.add('visually-hidden');
        document.querySelector('.header-top-right-info').classList.add('visually-hidden');
        document.querySelector('.header').classList.remove('burger-open');
        document.querySelector('.header-top-right-burger').classList.remove('burger-open-icon');
        document.querySelector('.content').classList.remove('shadow');
    }
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
        1101: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    },
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

const submitButton1 = document.querySelector('.banner-calc-form-submit');
const submitButton2 = document.querySelector('.request-form-submit');
const mailPath = './mail.php'
document.querySelectorAll('.uniForm').forEach((e) => {
    e.addEventListener('submit', function (e) {
        let th = this,
            params = new FormData(this),
            request = new XMLHttpRequest()
        request.open('POST', mailPath, true)
        request.send(params)
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                setTimeout(function () { th.reset() }, 1000)
                submitButton1.textContent = 'Расчёт Успешно Отправлен!';
                submitButton2.textContent = 'Заявка Успешно Отправлена!';
                document.querySelector('.banner-calc-form-submit').classList.add('sended');
                document.querySelector('.request-form-submit').classList.add('sended');
                setTimeout(function () {
                    location.reload();
                }, 3000);
            }
        }
        e.preventDefault()
    })
})

// const submitButton1 = document.querySelector('.banner-calc-form-submit');
// const submitButton2 = document.querySelector('.request-form-submit');
// document.querySelector('.uniFormJS1').addEventListener('submit', function (event) {
//     event.preventDefault();
//     submitButton1.textContent = 'Расчёт Успешно Отправлен!';
//     document.querySelector('.banner-calc-form-submit').classList.add('sended');
//     setTimeout(function () {
//         location.reload();
//     }, 3000);
// });
// document.querySelector('.uniFormJS2').addEventListener('submit', function (event) {
//     event.preventDefault();
//     submitButton2.textContent = 'Заявка Успешно Отправлена!';
//     document.querySelector('.request-form-submit').classList.add('sended');
//     setTimeout(function () {
//         location.reload();
//     }, 3000);
// });