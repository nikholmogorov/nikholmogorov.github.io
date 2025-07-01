const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.reviews__arrow-button-next',
        prevEl: '.reviews__arrow-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints: {
        301: {
            slidesPerView: 1,
            spaceBetween: 50,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1201: {
            slidesPerView: 2,
            spaceBetween: 50,
        }
    },
    centeredSlides: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Previous Review',
        nextSlideMessage: 'Next Review',
        lastSlideMessage: 'This Review is the Last One',
    },
});