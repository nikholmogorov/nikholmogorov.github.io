import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import { setTasksToLocalStorage } from './utils/operateLocalStorage'
import { handleSetTask } from './utils/setTask'
import styles from './assets/App.module.css'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState(handleSetTask)

    function addTask(taskTitle) {
        let taskId = crypto?.randomUUID() ?? Date.now().toString()
        let cleanTaskTitle = taskTitle.replace(/[&<>"']/g, ``)
        setTasks([...tasks, { id: taskId, title: cleanTaskTitle, isDone: false }])
    }

    function markTask(taskId, isDone) {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone } : task)))
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    function deleteCompleted() {
        setTasks(tasks.filter((task) => task.isDone !== true))
    }

    useEffect(() => {
        setTasksToLocalStorage(tasks)
    }, [tasks])

    return (
        <div className={styles['todo']}>
            <Header onAddTask={addTask} inputValue={inputValue} setInputValue={setInputValue} />
            <Body tasks={tasks} onMarkTask={markTask} onDeleteTask={deleteTask} />
            <Footer onDeleteCompleted={deleteCompleted} />
        </div>
    )
}
export default App
