import { create } from 'zustand'
import { Task, TaskWithId } from '../types'
import { validateContent, validateDate, validateTitle } from '../utils/validate'

interface Store {
    tasks: TaskWithId[]
    selectedTask: TaskWithId | null
    errorText: string | null
    addTask: (task: TaskWithId) => boolean
    removeTask: (id: string) => void
    updateTask: (id: string, updatedTask: Task) => boolean
    selectTask: (task: TaskWithId | null) => void
    setErrorText: (text: string) => void
}

export const useStore = create<Store>((set) => ({
    tasks: [],
    selectedTask: null,
    errorText: null,
    addTask: (task) => {
        const checkContent = validateContent(task.content)
        const checkTitle = validateTitle(task.title)
        const checkeDate = validateDate(task.date)
        if (checkContent || checkTitle || checkeDate) {
            set({ errorText: checkContent || checkTitle || checkeDate })
            setTimeout(() => set({ errorText: null }), 3000)
            return false
        } else {
            set((state) => ({ tasks: [...state.tasks, task] }))
            return true
        }
    },
    removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    updateTask: (id, updatedTask) => {
        const checkContent = validateContent(updatedTask.content)
        const checkTitle = validateTitle(updatedTask.title)
        const checkeDate = validateDate(updatedTask.date)
        if (checkContent || checkTitle || checkeDate) {
            set({ errorText: checkContent || checkTitle || checkeDate })
            setTimeout(() => set({ errorText: null }), 3000)
            return false
        } else {
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updatedTask } : task
                ),
            }))
            return true
        }
    },
    selectTask: (task) => set({ selectedTask: task }),
    setErrorText: (text) => set({ errorText: text }),
}))