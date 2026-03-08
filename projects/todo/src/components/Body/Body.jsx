import Task from '../Task/Task.jsx'
import styles from "./Body.module.css";

const Body = (props) => {
    const { tasks, onMarkTask, onDeleteTask } = props
    const listTasks = tasks.map((task) => <Task task={task} key={task.id}
    onMarkTask={onMarkTask} onDeleteTask={onDeleteTask} />)

    return <div className={styles.body}>{listTasks}</div>
}

export default Body
