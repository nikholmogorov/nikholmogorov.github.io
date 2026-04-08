import styles from "./Input.module.css";

interface InputProps {
    inputValue: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const Input = (props: InputProps) => {
    const { inputValue, handleInput, inputRef } = props;

    // обработчик взаимодействия с клавиатуры
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
            onChange={handleInput}
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
