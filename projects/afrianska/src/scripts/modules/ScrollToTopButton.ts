/**
 * Управление видимостью кнопки скролла наверх
 */

export class ScrollToTopButton {

  scrollToTopButtonElement: HTMLElement;

  constructor() {
    this.scrollToTopButtonElement =
      document.getElementById(`scroll-to-top-button`)!;
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
