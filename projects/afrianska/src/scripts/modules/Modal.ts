/**
 *
 */
export class Modal {
  openButtonElement: HTMLElement;

  modalElement: HTMLDialogElement;

  closeButtonElement: HTMLElement;

  innerElement: HTMLElement;

  selectors = {
    openButton: `.modal-open-button`,
    modal: `.modal`,
    closeButton: `.modal__close-button`,
    inner: `.modal__inner`,
    blockScroll: `block-scroll`,
  };

  constructor() {
    this.openButtonElement = document.querySelector(this.selectors.openButton)!;
    this.modalElement = document.querySelector(this.selectors.modal)!;
    this.closeButtonElement = this.modalElement.querySelector(
      this.selectors.closeButton,
    )!;
    this.innerElement = this.modalElement.querySelector(this.selectors.inner)!;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.unlockScroll = this.unlockScroll.bind(this);
    this.bindEvents();
  }

  open() {
    this.modalElement.showModal();
    document.body.classList.add(this.selectors.blockScroll);
  }

  close() {
    this.modalElement.close();
  }

  handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(this.selectors.inner)) {
      return;
    }
    this.close();
  }

  unlockScroll() {
    document.body.classList.remove(this.selectors.blockScroll);
  }

  bindEvents() {
    this.openButtonElement.addEventListener(`click`, this.open);
    this.closeButtonElement.addEventListener(`click`, this.close);
    this.modalElement.addEventListener(`click`, this.handleClick);
    this.modalElement.addEventListener(`close`, this.unlockScroll);
  }
}
