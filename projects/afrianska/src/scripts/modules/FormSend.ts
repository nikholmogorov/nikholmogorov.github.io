import type { Popup } from "./Popup";

/**
 *
 */
export class FormSend {
  popup: Popup;

  formElement: HTMLFormElement;

  url: string;

  method: string;

  selectors = {
    form: ".form",
  };

  constructor(popup: Popup) {
    this.popup = popup;
    this.formElement = document.querySelector(this.selectors.form)!;
    this.url = "https://jsonplaceholder.typicode.com/posts";
    this.method = "POST";
  }

  async send() {
    const formData = new FormData(this.formElement);
    const jsonData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      jsonData[key] = value as string;
    });

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
    }
  }
}
