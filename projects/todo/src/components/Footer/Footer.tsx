import Button from '../Button/Button'
import styles from "./Footer.module.css";

interface FooterProps {
    onDeleteCompleted: () => void;
}

const Footer = (props: FooterProps) => {
    const { onDeleteCompleted } = props

    return (
        <div>
            <Button className={styles["button-delete-completed"]}
            onClick={onDeleteCompleted}>𐄂 𐄂 𐄂</Button>
        </div>
    )
}

export default Footer
