import Output from "../Output/Output";
import Input from "../Input/Input";
import styles from "./Form.module.css";

interface FormProps {
    inputValue: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    outputValue: string;
}

const Form = (props: FormProps) => {
    const { inputValue, handleInput, inputRef, outputValue } = props;

    return (
        <form className={styles.form}>
            <div>
                <label
                    className={styles["visually-hidden"]}
                    htmlFor="calc"
                >
                    type here
                </label>
                <Output outputValue={outputValue} />
                <Input
                    inputValue={inputValue}
                    handleInput={handleInput}
                    inputRef={inputRef}
                />
            </div>
        </form>
    );
};

export default Form;
