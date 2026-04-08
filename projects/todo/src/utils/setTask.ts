import { getTasksFromLocalStorage } from './operateLocalStorage'
import { type Task } from '../types/types'

const EXAMPLE_TASKS: Task[] = [
    { id: `example-task-1`, title: `do smth`, isDone: false },
    { id: `example-task-2`, title: `do smth`, isDone: true },
    { id: `example-task-3`, title: `do smth`, isDone: true },
]

export function handleSetTask(): Task[] {
    let loadedTasks = getTasksFromLocalStorage()
    if (!loadedTasks) {
        return EXAMPLE_TASKS
    } else {
        return loadedTasks
    }
}
