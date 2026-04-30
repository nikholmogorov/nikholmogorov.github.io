import type { Popup } from "./Popup";

/**
* Сбор и отправка данных
*/

export class FormSend {

  popup: Popup;

  formElement: HTMLFormElement;

  submitButtonElement: HTMLButtonElement;

  url: string;

  method: string;

  constructor(
    formId: string,
    submitButtonAttr: string,
    url: string,
    method: string,
    popup: Popup
  ) {
    this.formElement = document.getElementById(formId) as HTMLFormElement;
    this.submitButtonElement =
      this.formElement.querySelector(submitButtonAttr)!;
    this.url = url;
    this.method = method;
    this.popup = popup;
  }

  disableButton() {
    this.submitButtonElement.disabled = true;
    this.submitButtonElement.textContent = "Sending...";
  }

  enableButton() {
    this.submitButtonElement.disabled = false;
    this.submitButtonElement.textContent = "SUBMIT";
  }

  async send() {
    const formData = new FormData(this.formElement);
    const jsonData: { [key: string]: string; } = {};
    formData.forEach((value, key) => {
      jsonData[key] = value as string;
    });

    this.disableButton();

    try {
      const response = await fetch(this.url, {
        method: this.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      if (typeof result.id === "number") {
        this.formElement.reset();
        this.popup.showSuccess();
      } else {
        this.popup.showFailure();
      }
    } catch (error) {
      this.popup.showFailure();
      console.error(error);
    } finally {
      this.enableButton();
    }
  }

}
