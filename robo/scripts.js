$(".tel").mask("+7(999)999-99-99");

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.trainers-swiper-button-next',
        prevEl: '.trainers-swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
        301: {
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        401: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        701: {
            slidesPerView: 3,
            spaceBetween: 40,
        }
    },
    autoplay: {
        enabled: true,
        delay: 2000,
        disableOnInteraction: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        lastSlideMessage: 'Этот слайд последний',
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

const dialog = document.querySelector('.dialog');
const openModal = document.querySelector('.open-modal');
const closeModal = dialog.querySelector('.close-modal');

function openModalAndBlockScroll() {
    dialog.showModal();
    document.body.classList.add('scroll-block');
    document.querySelector('.checked-open').checked = true;
};

function returnScroll() {
    document.body.classList.remove('scroll-block');
};

function close() {
    dialog.close();
    returnScroll();
};

openModal.addEventListener('click', openModalAndBlockScroll);
closeModal.addEventListener('click', () => { close(); });

// function closeOnOverlayClick({ currentTarget, target }) {
//     const dialog = currentTarget;
//     const isOnOverlayClick = target === dialog;
//     if (isOnOverlayClick) {
//         close();
//     };
// };

// dialog.addEventListener('click', closeOnOverlayClick);

dialog.addEventListener('cancel', () => {
    returnScroll();
});

const dialog1 = document.querySelector('.dialog1');
const openModal1 = document.querySelector('.open-modal1');
const closeModal1 = dialog1.querySelector('.close-modal1');

function openModalAndBlockScroll1() {
    dialog1.showModal();
    document.body.classList.add('scroll-block');
    document.querySelector('.checked-open1').checked = true;
};

function returnScroll1() {
    document.body.classList.remove('scroll-block');
};

function close1() {
    dialog1.close();
    returnScroll1();
};

openModal1.addEventListener('click', openModalAndBlockScroll1);
closeModal1.addEventListener('click', () => { close1(); });

// function closeOnOverlayClick1({ currentTarget1, target1 }) {
//     const dialog1 = currentTarget1;
//     const isOnOverlayClick1 = target1 === dialog1;
//     if (isOnOverlayClick1) {
//         close1();
//     };
// };

// dialog1.addEventListener('click', closeOnOverlayClick1);

dialog1.addEventListener('cancel', () => {
    returnScroll1();
});

const dialog2 = document.querySelector('.dialog2');
const openModal2 = document.querySelector('.open-modal2');
const closeModal2 = dialog2.querySelector('.close-modal2');

function openModalAndBlockScroll2() {
    dialog2.showModal();
    document.body.classList.add('scroll-block');
    document.querySelector('.checked-open2').checked = true;
};

function returnScroll2() {
    document.body.classList.remove('scroll-block');
};

function close2() {
    dialog2.close();
    returnScroll2();
};

openModal2.addEventListener('click', openModalAndBlockScroll2);
closeModal2.addEventListener('click', () => { close2(); });

// function closeOnOverlayClick2({ currentTarget2, target2 }) {
//     const dialog2 = currentTarget2;
//     const isOnOverlayClick2 = target2 === dialog2;
//     if (isOnOverlayClick2) {
//         close2();
//     };
// };

// dialog2.addEventListener('click', closeOnOverlayClick2);

dialog2.addEventListener('cancel', () => {
    returnScroll2();
});

const dialog3 = document.querySelector('.dialog3');
const openModal3 = document.querySelector('.open-modal3');
const closeModal3 = dialog3.querySelector('.close-modal3');

function openModalAndBlockScroll3() {
    dialog3.showModal();
    document.body.classList.add('scroll-block');
    document.querySelector('.checked-open3').checked = true;
};

function returnScroll3() {
    document.body.classList.remove('scroll-block');
};

function close3() {
    dialog3.close();
    returnScroll3();
};

openModal3.addEventListener('click', openModalAndBlockScroll3);
closeModal3.addEventListener('click', () => { close3(); });

// function closeOnOverlayClick3({ currentTarget3, target3 }) {
//     const dialog3 = currentTarget3;
//     const isOnOverlayClick3 = target3 === dialog3;
//     if (isOnOverlayClick3) {
//         close3();
//     };
// };

// dialog3.addEventListener('click', closeOnOverlayClick3);

dialog3.addEventListener('cancel', () => {
    returnScroll3();
});

const dialog4 = document.querySelector('.dialog4');
const openModal4 = document.querySelector('.open-modal4');
const closeModal4 = dialog4.querySelector('.close-modal4');

function openModalAndBlockScroll4() {
    dialog4.showModal();
    document.body.classList.add('scroll-block');
    document.querySelector('.checked-open4').checked = true;
};

function returnScroll4() {
    document.body.classList.remove('scroll-block');
};

function close4() {
    dialog4.close();
    returnScroll4();
};

openModal4.addEventListener('click', openModalAndBlockScroll4);
closeModal4.addEventListener('click', () => { close4(); });

// function closeOnOverlayClick4({ currentTarget4, target4 }) {
//     const dialog4 = currentTarget4;
//     const isOnOverlayClick4 = target4 === dialog4;
//     if (isOnOverlayClick4) {
//         close4();
//     };
// };

// dialog4.addEventListener('click', closeOnOverlayClick4);

dialog4.addEventListener('cancel', () => {
    returnScroll4();
});