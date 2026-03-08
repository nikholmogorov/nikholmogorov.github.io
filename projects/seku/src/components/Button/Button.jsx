import { memo } from 'react'
import styles from "./Button.module.scss"

const Button = ({ className, children, ...props }) => {
    return (
        <button className={`${styles.button} ${className || ''}`} {...props}>
            {children}
        </button>
    )
}

export default memo(Button)