import { create } from 'zustand'

interface TodoStoreState {
    isSidebarOpen: boolean
    selectedTodoId: string | null
    openSidebar: (todoId: string) => void
    closeSidebar: () => void
}

export const useTodoStore = create<TodoStoreState>((set) => ({
    isSidebarOpen: false,
    selectedTodoId: null,

    openSidebar: (todoId: string) =>
        set({
            isSidebarOpen: true,
            selectedTodoId: todoId,
        }),

    closeSidebar: () =>
        set({
            isSidebarOpen: false,
            selectedTodoId: null,
        }),
}))

export const useSelectedTodoId = () => useTodoStore((state) => state.selectedTodoId)
