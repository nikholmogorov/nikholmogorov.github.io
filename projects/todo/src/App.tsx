import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import { type Task } from './types/types'
import { setTasksToLocalStorage } from './utils/operateLocalStorage'
import { handleSetTask } from './utils/setTask'
import styles from './assets/App.module.css'

function App() {
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState<Task[]>(handleSetTask)

    function addTask(taskTitle: string) {
        let taskId = crypto?.randomUUID() ?? Date.now().toString()
        let cleanTaskTitle = taskTitle.replace(/[&<>"']/g, ``)
        setTasks([...tasks, { id: taskId, title: cleanTaskTitle, isDone: false }])
    }

    function markTask(taskId: string, isDone: boolean): void {
        setTasks(tasks.map((task: Task) => (task.id === taskId ? { ...task, isDone } : task)))
    }

    function deleteTask(taskId: string): void {
        setTasks(tasks.filter((task: Task) => task.id !== taskId))
    }

    function deleteCompleted(): void {
        setTasks(tasks.filter((task: Task) => task.isDone !== true))
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
