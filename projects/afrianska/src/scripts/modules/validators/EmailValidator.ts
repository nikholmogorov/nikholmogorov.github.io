/**
* Проверка поля "email"
 */

export class EmailValidator {

  isCorrectEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validate(value: string) {
    const emailInputValue = value.trim();
    if (emailInputValue.length === 0) {
      return `Enter email`;
    } else if (!this.isCorrectEmail(emailInputValue)) {
      return `Incorrect email format`;
    }
    return true;
  }

}
