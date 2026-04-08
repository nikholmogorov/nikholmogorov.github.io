import styles from "./Input.module.css";

const Input = (props) => {
    const { inputValue, handleInput, inputRef } = props;

    // обработчик взаимодействия с клавиатуры
    function handleKeyDown(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return true;
        }
        if (e.key.startsWith("F") && e.key.length > 1) {
            return true;
        }
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Tab",
            "Home",
            "End",
        ];
        if (allowedKeys.includes(e.key)) {
            return true;
        }
        const allowedChars = /^[0-9+\-*/e().,%÷×−]$/;
        if (!allowedChars.test(e.key)) {
            e.preventDefault();
            return false;
        }
    }

    return (
        <input
            className={styles.input}
            value={inputValue}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            ref={inputRef}
            id="calc"
            placeholder=""
            autoComplete="off"
            inputMode="none"
            autoFocus
        />
    );
};

export default Input;
