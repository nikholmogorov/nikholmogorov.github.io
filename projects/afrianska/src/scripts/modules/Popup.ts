import type { Modal } from "./Modal";

/**
 *
 */
export class Popup {
  popupElement: HTMLDialogElement;

  innerElement: HTMLElement;

  titleElement: HTMLElement;

  closeButtonElement: HTMLElement;

  modal: Modal;

  selectors = {
    popup: `.popup`,
    inner: `.popup__inner`,
    title: `.popup__title`,
    closeButton: `.popup__close-button`,
  };

  constructor(modal: Modal) {
    this.modal = modal;
    this.popupElement = document.querySelector(this.selectors.popup)!;
    this.innerElement = this.popupElement.querySelector(this.selectors.inner)!;
    this.titleElement = this.popupElement.querySelector(this.selectors.title)!;
    this.closeButtonElement = this.popupElement.querySelector(
      this.selectors.closeButton,
    )!;
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.bindEvents();
  }

  showSuccess() {
    this.titleElement.textContent = `Your message successfully sent`;
    this.modal.close();
    this.popupElement.showModal();
  }

  showFailure() {
    this.titleElement.textContent = `There was an error sending your message`;
    this.popupElement.showModal();
  }

  close() {
    this.popupElement.close();
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(this.selectors.inner)) {
      return;
    }
    this.close();
  }

  bindEvents() {
    this.closeButtonElement.addEventListener(`click`, this.close);
    this.popupElement.addEventListener(`click`, this.handleClick);
  }
}
