/**
* Проверка поля "name"
*/

export class NameValidator {

  validate(value: string) {
    const clearNameInputValue = value.trim().replace(/[^\p{L}\s]/gu, "");
    if (clearNameInputValue.length === 0) {
      return `Enter name in letters`;
    } else if (clearNameInputValue.length < 2) {
      return `Enter more than 1 letter`;
    }
    return true;
  }

}
