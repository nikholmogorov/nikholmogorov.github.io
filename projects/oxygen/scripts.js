const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.featured-projects__arrow-next',
        prevEl: '.featured-projects__arrow-previous',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    centeredSlides: true,
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