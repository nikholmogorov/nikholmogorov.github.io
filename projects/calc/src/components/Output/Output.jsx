import styles from "./Output.module.css";

const Output = (props) => {
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
