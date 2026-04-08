import { memo } from 'react'
import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button className={`${styles.button} ${className || ''}`} {...props}>
            {children}
        </button>
    )
}

export default memo(Button)