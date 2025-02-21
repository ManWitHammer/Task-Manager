import { create } from 'zustand'

interface Task {
    title: string
    date: string
    content: string
}

interface WithId {
    id: string
}

type TaskWithId = Task & WithId

interface Store {
    tasks: TaskWithId[]
    selectedTask: TaskWithId | null
    addTask: (task: TaskWithId) => void
    removeTask: (id: string) => void
    updateTask: (id: string, updatedTask: Task) => void
    selectTask: (task: TaskWithId | null) => void
}

export const useStore = create<Store>((set) => ({
    tasks: [],
    selectedTask: null,
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    updateTask: (id, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ),
        })),
    selectTask: (task) => set({ selectedTask: task }),
}))