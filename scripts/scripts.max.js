document.addEventListener(`DOMContentLoaded`, () => {
    if (navigator.userAgent.includes(`Firefox`)) {
        document.documentElement.classList.add(`scrollbar-moz-fallback`);
    };

    let checkboxDesktop = document.querySelector(`input[name=theme-switch]`);
    let checkboxMobile = document.querySelector(`input[name=theme-switch-mobile]`);

    function setThemeFromSystem() {
        if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
            document.documentElement.setAttribute(`data-theme`, `dark`);
            checkboxDesktop.checked = true;
            checkboxMobile.checked = true;
        } else {
            document.documentElement.setAttribute(`data-theme`, `light`);
            checkboxDesktop.checked = false;
            checkboxMobile.checked = false;
        };
    };

    function setTheme(e) {
        let isChecked = e.target.checked;
        document.documentElement.setAttribute(
            `data-theme`,
            isChecked ? `dark` : `light`
        );
        checkboxDesktop.checked = isChecked;
        checkboxMobile.checked = isChecked;
    };

    setThemeFromSystem();
    checkboxDesktop.addEventListener(`click`, setTheme);
    checkboxMobile.addEventListener(`click`, setTheme);

    function progressBar() {
        let scroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = scroll / height * 100;
        document.getElementById(`progressBar`).style.width = scrolled + `%`;
    };

    window.addEventListener(`scroll`, progressBar);

    let projectsNavigate = document.querySelector(`.projects__navigate`);

    function activateTab(tabId) {
        let projectsButtons = document.querySelectorAll(`.projects__button`);
        let projectsPanes = document.querySelectorAll(`.projects__pane`);

        projectsButtons.forEach((buttonElement) => {
            buttonElement.classList.remove(`projects__button--active`);
        });
        projectsPanes.forEach((paneElement) => {
            paneElement.classList.remove(`projects__pane--active`);
        });

        let activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        let activePane = document.getElementById(tabId);

        if (activeButton && activePane) {
            activeButton.classList.add(`projects__button--active`);
            activePane.classList.add(`projects__pane--active`);
            return true;
        }
        return false;
    }

    function getURLData() {
        let hash = window.location.hash.substring(1);

        if (hash) {
            let hashParts = hash.split('/');

            if (hashParts.length === 2 && hashParts[0] === 'projects') {
                return {
                    type: 'projects',
                    section: hashParts[0],
                    tabId: hashParts[1]
                };
            };

            if (hashParts.length === 1) {
                return {
                    type: 'anchor',
                    section: hashParts[0],
                    tabId: null
                };
            };
        };

        return {
            type: null,
            section: null,
            tabId: null
        };
    };

    function scrollToSection(sectionId) {
        if (sectionId === '') {
            window.scrollTo({
                top: 0,
            });
            return;
        };

        let section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                block: 'start'
            });
        };
    };

    function updateURL(sectionId, tabId = null) {
        if (tabId) {
            window.location.hash = `projects/${tabId}`;
        } else {
            window.location.hash = sectionId;
        };
    };

    function handleHashChange() {
        let urlData = getURLData();

        if (urlData.type === 'projects' && urlData.section === 'projects') {
            if (urlData.tabId) {
                activateTab(urlData.tabId);
            } else {
                let firstTab = document.querySelector(`.projects__button`);
                if (firstTab) {
                    activateTab(firstTab.dataset.tab);
                };
            };
            scrollToSection('projects');
        } else if (urlData.type === 'anchor') {
            scrollToSection(urlData.section);
        } else {
            scrollToSection('');
            let firstTab = document.querySelector(`.projects__button`);
            if (firstTab) {
                activateTab(firstTab.dataset.tab);
            };
        };
    };

    projectsNavigate.addEventListener(`click`, (e) => {
        if (e.target.classList.contains(`projects__button--active`)) return;
        if (!e.target.classList.contains(`button`)) return;

        let tabId = e.target.dataset.tab;
        if (tabId) {
            activateTab(tabId);
            updateURL('projects', tabId);
        };
    });

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            let href = this.getAttribute('href');

            if (href === '#') {
                window.location.hash = '';
                window.scrollTo({
                    top: 0,
                });
                return;
            };

            let hashValue = href.substring(1);

            let targetElement = document.getElementById(hashValue.split('/')[0]);

            if (targetElement) {
                window.location.hash = hashValue;
            };
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            let href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                });
                return;
            };

            let targetId = href.split('/')[0];
            let targetElement = document.getElementById(targetId.substring(1));

            if (targetElement && window.location.hash === href) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    block: 'start'
                });
            };
        });
    });

    document.querySelectorAll(`.swiper`).forEach((swiperElement) => {
        new Swiper(swiperElement, {
            direction: `horizontal`,
            loop: true,
            simulateTouch: true,
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            slidesPerView: 1,
            slideToClickedSlide: true,
            navigation: {
                nextEl: swiperElement.querySelector(`.swiper-button-next`),
                prevEl: swiperElement.querySelector(`.swiper-button-prev`),
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
                prevSlideMessage: `Предыдущий скриншот`,
                nextSlideMessage: `Следующий скриншот`,
                lastSlideMessage: `Это последний скриншот`,
            },
        });
    });
});