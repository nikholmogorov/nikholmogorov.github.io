import { getTasksFromLocalStorage } from './operateLocalStorage'

const EXAMPLE_TASKS = [
    { id: `example-task-1`, title: `do smth`, isDone: false },
    { id: `example-task-2`, title: `do smth`, isDone: true },
    { id: `example-task-3`, title: `do smth`, isDone: true },
]

export function handleSetTask() {
    let loadedTasks = getTasksFromLocalStorage()
    if (!loadedTasks) {
        return EXAMPLE_TASKS
    } else {
        return loadedTasks
    }
}
