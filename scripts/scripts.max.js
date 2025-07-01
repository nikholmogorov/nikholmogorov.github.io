window.onload = () => {
	let userAgentString =
		navigator.userAgent;
	let firefoxAgent =
		userAgentString.indexOf('Firefox') > -1;
	if (firefoxAgent == true) {
		document.documentElement.classList.add('scrollbar-moz-fallback');
	}
};

let checkbox = document.querySelector('input[name=theme-switch]');
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.documentElement.setAttribute('data-theme', 'dark');
	checkbox.checked = true;
} else {
	document.documentElement.setAttribute('data-theme', 'light');
	checkbox.checked = false;
}
checkbox.addEventListener('change', (cb) => {
	document.documentElement.setAttribute(
		'data-theme',
		cb.target.checked ? 'dark' : 'light'
	);
});

let checkboxmobile = document.querySelector('input[name=theme-switch-mobile]');
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.documentElement.setAttribute('data-theme', 'dark');
	checkboxmobile.checked = true;
} else {
	document.documentElement.setAttribute('data-theme', 'light');
	checkboxmobile.checked = false;
}
checkboxmobile.addEventListener('change', (cb) => {
	document.documentElement.setAttribute(
		'data-theme',
		cb.target.checked ? 'dark' : 'light'
	);
});

function progressBar() {
	let scroll = document.body.scrollTop || document.documentElement.scrollTop;
	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrolled = scroll / height * 100;
	document.getElementById('progressBar').style.width = scrolled + '%';
}
window.addEventListener('scroll', progressBar);

const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,
	simulateTouch: true,
	touchRatio: 1,
	touchAngle: 45,
	grabCursor: true,
	slidesPerView: 'auto',
	slideToClickedSlide: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 2000,
	},
	centeredSlides: true,
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	a11y: {
		enabled: true,
		prevSlideMessage: 'Предыдущий скриншот',
		nextSlideMessage: 'Следующий скриншот',
		lastSlideMessage: 'Это последний скриншот',
	},
});