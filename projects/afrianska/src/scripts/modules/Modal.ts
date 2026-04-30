/**
 * Управление модальным окном
 */

export class Modal {

  openButtonElement: HTMLElement;

  modalElement: HTMLDialogElement;

  closeButtonElement: HTMLElement;

  innerElement: HTMLElement;

  constructor(openButtonAttr: string) {
    this.openButtonElement = document.querySelector(openButtonAttr)!;
    this.modalElement = document.querySelector(`[data-modal]`)!;
    this.closeButtonElement = this.modalElement.querySelector(
      `[data-modal-close-button]`
    )!;
    this.innerElement = this.modalElement.querySelector(`[data-modal-inner]`)!;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.unlockScroll = this.unlockScroll.bind(this);
    this.bindEvents();
  }

  open() {
    this.modalElement.showModal();
    document.body.classList.add(`block-scroll`);
  }

  close() {
    this.modalElement.close();
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(`[data-modal-inner]`)) {
      return;
    }
    this.close();
  }

  unlockScroll() {
    document.body.classList.remove(`block-scroll`);
  }

  bindEvents() {
    this.openButtonElement.addEventListener(`click`, this.open);
    this.closeButtonElement.addEventListener(`click`, this.close);
    this.modalElement.addEventListener(`click`, this.handleClick);
    this.modalElement.addEventListener(`close`, this.unlockScroll);
  }

}
