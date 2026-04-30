/**
* Проверка поля "message"
 */

export class MessageValidator {

  validate(value: string) {
    const messageInputValue = value.trim();
    if (messageInputValue.length === 0) {
      return `Enter message`;
    } else if (messageInputValue.length < 5) {
      return `Enter more than 4 characters`;
    }
    return true;
  }

}
