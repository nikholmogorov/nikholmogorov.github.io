import "../styles/main.scss";
import { FormSend } from "./modules/FormSend";
import { FormValidator } from "./modules/FormValidator";
import { Modal } from "./modules/Modal";
import { Popup } from "./modules/Popup";
import { ScrollToTopButton } from "./modules/ScrollToTopButton";
import { EmailValidator } from "./modules/validators/EmailValidator";
import { MessageValidator } from "./modules/validators/MessageValidator";
import { NameValidator } from "./modules/validators/NameValidator";

const letsTalkFormConfig = {
  name: {
    input: "[data-input='name']",
    error: "[data-error='name']",
    validator: new NameValidator(),
  },
  email: {
    input: "[data-input='email']",
    error: "[data-error='email']",
    validator: new EmailValidator(),
  },
  message: {
    input: "[data-input='message']",
    error: "[data-error='message']",
    validator: new MessageValidator(),
  },
};

new ScrollToTopButton();
const modal = new Modal(`[data-open-modal="lets-talk"]`);
const popup = new Popup(modal);
const formSend = new FormSend(
  "form-lets-talk", "[data-submit='lets-talk']", "https://jsonplaceholder.typicode.com/posts", "POST", popup
);
new FormValidator("form-lets-talk", letsTalkFormConfig, formSend);
