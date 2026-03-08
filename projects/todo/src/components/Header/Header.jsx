import { useRef } from "react"
import Button from '../Button/Button'
import styles from "./Header.module.css";

const Header = (props) => {
    const { onAddTask, inputValue, setInputValue } = props

    const inputRef = useRef(null)

    function handleAddTask(e) {
        e.preventDefault()
        onAddTask(inputValue)
        setInputValue(``)
        inputRef.current?.focus()
    }

    return (
        <div>
            <h1 className={styles["visually-hidden"]}>todo 1</h1>
            <form className={styles.form} onSubmit={handleAddTask}>
                <div className={styles.field}>
                    <label className={styles["visually-hidden"]} htmlFor="new-task">
                        New task title
                    </label>
                    <input className={styles.input} id="new-task" type="text" placeholder="" autoComplete="off" autoFocus value={inputValue} onChange={(e) => { setInputValue(e.target.value)}} ref={inputRef}/>
                </div>
                <Button type="submit"
                onClick={handleAddTask}><span className={styles["button-span"]}>𐄂</span></Button>
            </form>
        </div>
    )
}

export default Header
