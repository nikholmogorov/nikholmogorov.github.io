import Button from '../Button/Button';
import { type Task } from '../../types/types'
import styles from "./Task.module.css";

interface TaskProps {
    task: Task;
    onMarkTask: (taskId: string, isDone: boolean) => void;
    onDeleteTask: (taskId: string) => void;
}

const Task = (props: TaskProps) => {
    const { task, onMarkTask, onDeleteTask } = props

    return (
        <form className={`${styles.task} ${task.isDone ? styles["task-completed"] : ``}`}>
            <div className={styles.checkbox}>
                <input className={styles["checkbox-input"]} type="checkbox" readOnly id={task.id}
                checked={task.isDone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onMarkTask(task.id, e.target.checked)}/>
                <label className={styles["checkbox-label"]} htmlFor={task.id}>{task.title}</label>
            </div>
            <Button className={styles["button-delete-task"]} type="button" onClick={() => onDeleteTask(task.id)}>𐄂</Button>
        </form>
    )
}

export default Task