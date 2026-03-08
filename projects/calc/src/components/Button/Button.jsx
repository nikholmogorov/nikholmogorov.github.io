import styles from "./Button.module.css";

const Button = (props) => {
    const { children, onButtonClick } = props;

    return (
        <button className={styles.button} onClick={onButtonClick}>
            {children}
        </button>
    );
};

export default Button;
