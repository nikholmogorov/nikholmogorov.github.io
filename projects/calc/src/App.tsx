import { useState, useRef, useEffect } from "react";
import Form from "./components/Form/Form";
import Button from "./components/Button/Button";
import { cleanFloat } from './utils/calculate';
import styles from "./assets/App.module.css";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("result here");

    const inputRef = useRef<HTMLInputElement>(null);

    function handleDeleteAllButton() {
        setInputValue("");
        inputRef.current?.focus();
    }

    function handleDeleteButton() {
        setInputValue((inputValue) => inputValue.slice(0, -1));
        inputRef.current?.focus();
    }

    function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        let buttonText = e.currentTarget.innerText;
        setInputValue((inputValue) => (inputValue += buttonText));
        inputRef.current?.focus();
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const filteredValue = value.replace(/[^0-9+\-*/e().,%÷×−]/g, "");
        if (filteredValue !== value) {
            e.currentTarget.value = filteredValue;
        }
        setInputValue(filteredValue);
    }

    useEffect(() => {
        calcResult();
    }, [inputValue]);

    function calcResult() {
        if (!inputValue.trim()) {
            setOutputValue("result here");
            return;
        }
        if (/÷{2,}/.test(inputValue) || /\/{2,}/.test(inputValue)) {
            setOutputValue("result here");
            return;
        }
        if (inputValue === "e") {
            setOutputValue("2,718282");
            return;
        }

        let replacedInputValue = inputValue
            .replace(/−/g, `-`)
            .replace(/÷/g, `/`)
            .replace(/×/g, `*`)
            .replace(/,/g, `.`)
            .replace(/e/g, `2.718282`);
        try {
            let result = eval(replacedInputValue);
            if (+replacedInputValue !== result && result !== undefined) {
                result = cleanFloat(result);
                const replacedOutputValue = `${inputValue.replace(/\//g, `÷`).replace(/\*/g, `×`).replace(/\./g, `,`).replace(/e/g, `2,718282`)} = ${result.toString().replace(/\./g, ",")}`;
                setOutputValue(replacedOutputValue);
            } else if (result !== 2.718282) {
                setOutputValue("result here");
            }
        } catch (e: unknown) {
            if (e instanceof Error && e.name === `SyntaxError`) {
                if (inputValue === "%") {
                    setOutputValue("1% = 0,01");
                    return;
                } else if (inputValue.endsWith("%")) {
                    const num = parseFloat(
                        inputValue.replace("%", "").replace(",", "."),
                    );
                    setOutputValue(
                        `${inputValue} = ${(num / 100).toString().replace(/\./g, ",")}`,
                    );
                    return;
                }
            }
            setOutputValue("result here");
            return;
        }
    }

    return (
        <div className={styles.calc}>
            <Form
                inputValue={inputValue}
                handleInput={handleInput}
                inputRef={inputRef}
                outputValue={outputValue}
            />
            <div className={styles.buttons}>
                <Button onButtonClick={handleDeleteAllButton}>C</Button>
                <Button onButtonClick={handleDeleteButton}>←</Button>
                <Button onButtonClick={handleButtonClick}>%</Button>
                <Button onButtonClick={handleButtonClick}>÷</Button>
                <Button onButtonClick={handleButtonClick}>7</Button>
                <Button onButtonClick={handleButtonClick}>8</Button>
                <Button onButtonClick={handleButtonClick}>9</Button>
                <Button onButtonClick={handleButtonClick}>×</Button>
                <Button onButtonClick={handleButtonClick}>4</Button>
                <Button onButtonClick={handleButtonClick}>5</Button>
                <Button onButtonClick={handleButtonClick}>6</Button>
                <Button onButtonClick={handleButtonClick}>−</Button>
                <Button onButtonClick={handleButtonClick}>1</Button>
                <Button onButtonClick={handleButtonClick}>2</Button>
                <Button onButtonClick={handleButtonClick}>3</Button>
                <Button onButtonClick={handleButtonClick}>+</Button>
                <Button onButtonClick={handleButtonClick}>0</Button>
                <Button onButtonClick={handleButtonClick}>,</Button>
                <Button>=</Button>
            </div>
        </div>
    );
}

export default App;
