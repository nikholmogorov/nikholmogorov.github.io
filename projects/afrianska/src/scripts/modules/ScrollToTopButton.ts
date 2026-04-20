/**
 *
 */
export class ScrollToTopButton {
  scrollToTopButtonElement: HTMLElement;

  selectors = {
    scrollToTopButton: `.scroll-to-top-button`,
  };

  constructor() {
    this.scrollToTopButtonElement = document.querySelector(
      this.selectors.scrollToTopButton,
    )!;
    this.showScrollButton = this.showScrollButton.bind(this);
    this.bindEvents();
    this.showScrollButton();
  }

  showScrollButton() {
    if (window.scrollY > 900) {
      this.scrollToTopButtonElement.style.display = `block`;
    } else {
      this.scrollToTopButtonElement.style.display = `none`;
    }
  }

  bindEvents() {
    window.addEventListener(`scroll`, this.showScrollButton);
  }
}
