export function getTasksFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(`tasks`))
    } catch (e) {
        console.log(`JSON повреждён, сбрасываем данные`, e)
        localStorage.setItem(`tasks`, JSON.stringify([]))
        return []
    }
}

export function setTasksToLocalStorage(savedTasks) {
    localStorage.setItem(`tasks`, JSON.stringify(savedTasks))
}
