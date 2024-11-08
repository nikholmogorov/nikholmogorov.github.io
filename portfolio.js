function toTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  document.getElementById('change_theme').addEventListener('click', function() {
    
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';  
    } else {
        document.body.className = 'light-theme';
    }
});

document.querySelectorAll('[data-bs-toggle="tooltip"]')
.forEach(tooltip => {
  new bootstrap.Tooltip(tooltip)
})

function progressBar() {
  let scroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = scroll / height * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', progressBar);

setInterval(function () {
	let carousel = document.querySelector('#carouselExampleControls');
	let carouselInstance = bootstrap.Carousel.getInstance(carousel);
	carouselInstance.next();
}, 2000);