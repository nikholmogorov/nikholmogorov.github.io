import type { FormSend } from "./FormSend";

/**
* Валидации формы
 */

interface IFieldValidator {
  validate(value: string): true | string;
}

interface IFieldConfig {
  input: string;
  error: string;
  validator: IFieldValidator;
}

/**
 *
 */
export class FormValidator {

  formElement: HTMLFormElement;

  formSend: FormSend;

  fields: Record<
    string,
    {
      inputElement: HTMLInputElement | HTMLTextAreaElement;
      errorElement: HTMLElement;
      validator: IFieldValidator;
    }
  > = {};

  constructor(
    formId: string,
    formConfig: Record<string, IFieldConfig>,
    formSend: FormSend
  ) {
    this.formElement = document.getElementById(formId) as HTMLFormElement;
    for (const [ inputName, inputConfig ] of Object.entries(formConfig)) {
      const inputElement = this.formElement.querySelector(inputConfig.input) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      const errorElement = this.formElement.querySelector(
        inputConfig.error
      ) as HTMLElement;
      const validator = inputConfig.validator;
      this.fields[inputName] = { inputElement, errorElement, validator };
    }
    this.formSend = formSend;
    this.validateForm = this.validateForm.bind(this);
    this.bindEvents();
  }

  showError(el: HTMLElement, message: string) {
    el.textContent = message;
    el.classList.add(`error--show`);
  }

  clearErrors() {
    this.formElement
      .querySelectorAll(`[data-error]`)
      .forEach((el) => el.classList.remove(`error--show`));
  }

  validateForm(e: SubmitEvent) {
    e.preventDefault();
    this.clearErrors();
    let isValid = true;

    for (const fieldConfig of Object.values(this.fields)) {
      const result = fieldConfig.validator.validate(
        fieldConfig.inputElement.value.trim()
      );
      if (result !== true) {
        this.showError(fieldConfig.errorElement, result);
        isValid = false;
      }
    }

    if (isValid) {
      this.formSend.send();
    }
  }

  bindEvents() {
    this.formElement.addEventListener(`submit`, this.validateForm);
  }

}
