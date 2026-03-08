import Button from '../Button/Button';
import styles from "./Task.module.css";

const Task = (props) => {
    const { task, onMarkTask, onDeleteTask } = props

    return (
        <form className={`${styles.task} ${task.isDone ? styles["task-completed"] : ``}`}>
            <div className={styles.checkbox}>
                <input className={styles["checkbox-input"]} type="checkbox" readOnly id={task.id}
                checked={task.isDone} onClick={(e) => onMarkTask(task.id, e.target.checked)}/>
                <label className={styles["checkbox-label"]} htmlFor={task.id}>{task.title}</label>
            </div>
            <Button className={styles["button-delete-task"]} type="button" onClick={() => onDeleteTask(task.id)}>𐄂</Button>
        </form>
    )
}

export default Task