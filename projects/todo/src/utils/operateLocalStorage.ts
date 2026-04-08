import { type Task } from '../types/types'

export function getTasksFromLocalStorage(): Task[] | null {
    try {
        let itemFromLocalStorage: string | null = localStorage.getItem(`tasks`)
        // null в строке ниже нужен для проставления EXAMPLE_TASKS при первом запуске
        return JSON.parse(itemFromLocalStorage as string)
    } catch (e) {
        console.log(`JSON повреждён, сбрасываем данные`, e)
        localStorage.setItem(`tasks`, JSON.stringify([]))
        return []
    }
}

export function setTasksToLocalStorage(savedTasks: Task[]) {
    localStorage.setItem(`tasks`, JSON.stringify(savedTasks))
}