import Task from '../Task/Task'
import { type Task as TaskType } from '../../types/types'
import styles from "./Body.module.css";

interface BodyProps {
    tasks: TaskType[];
    onMarkTask: (taskId: string, isDone: boolean) => void;
    onDeleteTask: (taskId: string) => void;
}

const Body = (props: BodyProps) => {
    const { tasks, onMarkTask, onDeleteTask } = props
    const listTasks = tasks.map((task) => <Task task={task} key={task.id}
        onMarkTask={onMarkTask} onDeleteTask={onDeleteTask} />)

    return <div className={styles.body}>{listTasks}</div>
}

export default Body
