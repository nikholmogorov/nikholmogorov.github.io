import styles from "./Output.module.css";

interface OutputProps {
    outputValue: string;
}

const Output = (props: OutputProps) => {
    const { outputValue } = props;

    return (
        <output
            className={styles.output}
            role="status"
            name="calc-result"
            htmlFor="calc"
        >
            {outputValue}
        </output>
    );
};

export default Output;
