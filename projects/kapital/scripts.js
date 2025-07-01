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
if (parseInt(getBrowserSize().width) > 959) {
    let figure1 = document.querySelector('.principles-block-parallax-figure-1');
    let figure2 = document.querySelector('.principles-block-parallax-figure-2');
    let figure3 = document.querySelector('.principles-block-parallax-figure-3');
    window.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        figure1.style.transform = 'translate(-' + x * 100 + 'px, -' + y * 100 + 'px)';
        figure2.style.transform = 'translate(+' + x * 80 + 'px, +' + y * 80 + 'px)';
        figure3.style.transform = 'translate(+' + x * 80 + 'px, -' + y * 80 + 'px)';
    });
};

window.onload = () => {
    let userAgentString =
        navigator.userAgent;
    let firefoxAgent =
        userAgentString.indexOf('Firefox') > -1;
    if (firefoxAgent == true) {
        document.querySelector('.principles-block-parallax-figure-1').classList.add('principles-block-parallax-figure-1-moz-fallback');
        document.querySelector('.principles-block-parallax-figure-2').classList.add('principles-block-parallax-figure-2-moz-fallback');
        document.querySelector('.principles-block-parallax-figure-3').classList.add('principles-block-parallax-figure-3-moz-fallback');
        document.documentElement.classList.add('scrollbar-moz-fallback');
        document.querySelector('.b-m-f-1').classList.add('hero-top-menu-link-moz-fallback');
        document.querySelector('.b-m-f-2').classList.add('hero-top-menu-link-moz-fallback');
        document.querySelector('.b-m-f-3').classList.add('hero-top-menu-link-moz-fallback');
        document.querySelector('.b-m-f-4').classList.add('hero-top-menu-link-moz-fallback');
    }
};

function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }
    });
}
let options = {
    threshold: [0]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
    observer.observe(elm);
}