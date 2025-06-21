const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
    breakpoints: {
        301: {
            slidesPerView: 1,
            spaceBetween: 100,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 100,
        },
        1201: {
            slidesPerView: 1,
            spaceBetween: 100,
        }
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
        lastSlideMessage: 'Это последний слайд',
    },
});

const swiper2 = new Swiper('.swiper2', {
    direction: 'horizontal',
    loop: false,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: false,
    breakpoints: {
        359: {
            initialSlide: 0,
            slidesPerView: 1.2,
            spaceBetween: 0,
        },
        389: {
            initialSlide: 0,
            slidesPerView: 1.3,
            spaceBetween: 0,
        },
        767: {
            initialSlide: 0,
            slidesPerView: 3,
            spaceBetween: 0,
        }
    },
    centeredSlides: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий товар',
        nextSlideMessage: 'Следующий товар',
        lastSlideMessage: 'Это последний товар',
    },
});

const swiper3 = new Swiper('.swiper3', {
    direction: 'horizontal',
    loop: false,
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    slideToClickedSlide: false,
    breakpoints: {
        359: {
            initialSlide: 0,
            slidesPerView: 1.3,
            spaceBetween: 0,
        },
        389: {
            initialSlide: 0,
            slidesPerView: 1.4,
            spaceBetween: 0,
        },
        767: {
            initialSlide: 0,
            slidesPerView: 3,
            spaceBetween: 0,
        },
        900: {
            initialSlide: 0,
            slidesPerView: 4,
            spaceBetween: 0,
        }
    },
    centeredSlides: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий товар',
        nextSlideMessage: 'Следующий товар',
        lastSlideMessage: 'Это последний товар',
    },
});

ymaps.ready(init);
function init() {
    var map = new ymaps.Map('map', {
        center: [55.159515, 61.386195],
        zoom: 17,
    });
    var myPlacemark = new ymaps.Placemark(
        [55.159515, 61.386195],
        {
            // НЕ СТАВИТЬ *{transition:...} В _globals.scss ВМЕСТЕ С ЯНДЕКС КАРТАМИ
            balloonContent: `
				<div class="balloon">
					<div class="balloon__address">Пр. Ленина, 71</div>
					<div class="balloon__contacts">
						<a href="tel:+78312484646" target="_blank">+7 (999) 584-98-92</a>
					</div>
				</div>
			`,
        },
        {
            iconLayout: 'default#image',
            iconImageHref: './images/marker.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40],
        }
    );
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    // map.controls.remove('fullscreenControl');
    // map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);
    map.geoObjects.add(myPlacemark);
    // myPlacemark.balloon.open();
}; 