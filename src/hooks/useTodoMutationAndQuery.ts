import { useCreateTodo, useUpdateTodo, useDeleteTodo } from './todoMutation'
import { useTodos, useTodo } from './todoQuery'

export function useTodoActions() {
    const todosQuery = useTodos()
    const createMutation = useCreateTodo()
    const updateMutation = useUpdateTodo()
    const deleteMutation = useDeleteTodo()

    return {
        todos: todosQuery.data || [],
        isLoading: todosQuery.isLoading,
        error: todosQuery.error,

        getTodo: (id: string | null) => useTodo(id),

        createTodo: createMutation.mutate,
        updateTodo: updateMutation.mutate,
        deleteTodo: deleteMutation.mutate,

        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        createError: createMutation.error,
        updateError: updateMutation.error,
        deleteError: deleteMutation.error,
    }
}
