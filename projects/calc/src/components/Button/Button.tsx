import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
    const { children, onButtonClick } = props;

    return (
        <button className={styles.button} onClick={onButtonClick}>
            {children}
        </button>
    );
};

export default Button;
