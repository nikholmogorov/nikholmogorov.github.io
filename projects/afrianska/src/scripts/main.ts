import "../styles/main.scss";
import { FormSend } from "./modules/FormSend";
import { FormValidator } from "./modules/FormValidator";
import { Modal } from "./modules/Modal";
import { Popup } from "./modules/Popup";
import { ScrollToTopButton } from "./modules/ScrollToTopButton";

new ScrollToTopButton();
const modal = new Modal();
const popup = new Popup(modal);
const formSend = new FormSend(popup);
new FormValidator(formSend);
