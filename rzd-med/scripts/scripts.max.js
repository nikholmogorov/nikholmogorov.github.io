ymaps.ready(init);
function init() {
    var map = new ymaps.Map('map', {
        center: [56.292927, 43.935190],
        zoom: 14,
    });
    var myPlacemark = new ymaps.Placemark(
        [56.292927, 43.935190],
        {
            balloonContent: `
				<div class="balloon">
					<div class="balloon__address">Пр. Ленина, 18</div>
					<div class="balloon__contacts">
						<a href="tel:+78312484646" target="_blank">+7 (831) 248-46-46</a>
					</div>
				</div>
			`,
        },
        {
            iconLayout: 'default#image',
            iconImageHref: '../images/marker.svg',
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

document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});