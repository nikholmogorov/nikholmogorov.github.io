import type { Modal } from "./Modal";

/**
 * Управление попапом с сообщением об отправке данных
 */

export class Popup {

  popupElement: HTMLDialogElement;

  innerElement: HTMLElement;

  titleElement: HTMLElement;

  closeButtonElement: HTMLElement;

  modal: Modal;

  constructor(modal: Modal) {
    this.modal = modal;
    this.popupElement = document.querySelector(`[data-popup]`)!;
    this.innerElement = this.popupElement.querySelector(`[data-popup-inner]`)!;
    this.titleElement = this.popupElement.querySelector(`[data-popup-title]`)!;
    this.closeButtonElement = this.popupElement.querySelector(
      `[data-popup-close-button]`
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
    if (target.closest(`[data-popup-inner]`)) {
      return;
    }
    this.close();
  }

  bindEvents() {
    this.closeButtonElement.addEventListener(`click`, this.close);
    this.popupElement.addEventListener(`click`, this.handleClick);
  }

}
