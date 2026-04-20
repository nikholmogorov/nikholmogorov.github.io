import type { FormSend } from "./FormSend";

/**
 *
 */
export class FormValidator {
  formElement: HTMLElement;

  nameInputElement: HTMLInputElement;

  errorNameInputElement: HTMLElement;

  emailInputElement: HTMLInputElement;

  errorEmailInputElement: HTMLElement;

  messageInputElement: HTMLInputElement;

  errorMessageInputElement: HTMLElement;

  formSend: FormSend;

  selectors = {
    form: `.form`,
    nameInput: `#name`,
    errorNameInput: `.error-name`,
    emailInput: `#email`,
    errorEmailInput: `.error-email`,
    messageInput: `#message`,
    errorMessageInput: `.error-message`,
    error: `.error`,
    errorShow: `error--show`,
  };

  constructor(formSend: FormSend) {
    this.formSend = formSend;
    this.formElement = document.querySelector(this.selectors.form)!;
    this.nameInputElement = this.formElement.querySelector(
      this.selectors.nameInput,
    )!;
    this.errorNameInputElement = this.formElement.querySelector(
      this.selectors.errorNameInput,
    )!;
    this.emailInputElement = this.formElement.querySelector(
      this.selectors.emailInput,
    )!;
    this.errorEmailInputElement = this.formElement.querySelector(
      this.selectors.errorEmailInput,
    )!;
    this.messageInputElement = this.formElement.querySelector(
      this.selectors.messageInput,
    )!;
    this.errorMessageInputElement = this.formElement.querySelector(
      this.selectors.errorMessageInput,
    )!;
    this.validateForm = this.validateForm.bind(this);
    this.bindEvents();
  }

  isCorrectEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(el: HTMLElement, message: string) {
    el.textContent = message;
    el.classList.add(this.selectors.errorShow);
  }

  clearErrors() {
    this.formElement
      .querySelectorAll(this.selectors.error)
      .forEach((el) => el.classList.remove(this.selectors.errorShow));
  }

  validateName() {
    const clearNameInputValue = this.nameInputElement.value
      .trim()
      .replace(/[^\p{L}\s]/gu, "");
    if (clearNameInputValue.length === 0) {
      this.showError(this.errorNameInputElement, `Enter name in letters`);
      return false;
    } else if (clearNameInputValue.length < 2) {
      this.showError(this.errorNameInputElement, `Enter more than 1 letter`);
      return false;
    }
    return true;
  }

  validateEmail() {
    const emailInputValue = this.emailInputElement.value.trim();
    if (emailInputValue.length === 0) {
      this.showError(this.errorEmailInputElement, `Enter email`);
      return false;
    } else if (!this.isCorrectEmail(emailInputValue)) {
      this.showError(this.errorEmailInputElement, `Incorrect email format`);
      return false;
    }
    return true;
  }

  validateMessage() {
    const messageInputValue = this.messageInputElement.value.trim();
    if (messageInputValue.length === 0) {
      this.showError(this.errorMessageInputElement, `Enter message`);
      return false;
    } else if (messageInputValue.length < 5) {
      this.showError(
        this.errorMessageInputElement,
        `Enter more than 4 characters`,
      );
      return false;
    }
    return true;
  }

  validateForm(e: SubmitEvent) {
    e.preventDefault();
    this.clearErrors();
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isMessageValid = this.validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      this.formSend.send();
    }
  }

  bindEvents() {
    this.formElement.addEventListener(`submit`, this.validateForm);
  }
}
