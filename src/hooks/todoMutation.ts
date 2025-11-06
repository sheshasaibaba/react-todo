import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodoApi, updateTodoApi, deleteTodoApi } from '../api/todoApi'
import { TODO_QUERY_KEY } from './todoQuery'
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from '../types/todoTypes'

export function useCreateTodo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTodoApi,

        onMutate: async (newTodo: CreateTodoPayload) => {
            await queryClient.cancelQueries({ queryKey: TODO_QUERY_KEY })
            const previousTodos = queryClient.getQueryData<Todo[]>(TODO_QUERY_KEY)

            const optimisticTodo: Todo = {
                id: `temp-${Date.now()}`,
                taskName: newTodo.taskName,
                progress: 0,
                importance: 1,
                completed: false,
                location: '',
                assignedTo: '',
                coordinateWith: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) => [...(old || []), optimisticTodo])
            return { previousTodos }
        },

        onSuccess: (newTodo) => {
            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                (old || []).map((todo) => (todo.id.startsWith('temp-') ? newTodo : todo))
            )
        },

        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(TODO_QUERY_KEY, context.previousTodos)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY })
        },
    })
}

export function useUpdateTodo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoPayload }) =>
            updateTodoApi(id, payload),

        onMutate: async ({ id, payload }) => {
            await queryClient.cancelQueries({ queryKey: TODO_QUERY_KEY })
            const previousTodos = queryClient.getQueryData<Todo[]>(TODO_QUERY_KEY)

            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                (old || []).map((todo) =>
                    todo.id === id ? { ...todo, ...payload, updatedAt: new Date().toISOString() } : todo
                )
            )

            return { previousTodos }
        },

        onSuccess: (updatedTodo, { id }) => {
            console.log('Update successful:', updatedTodo)
            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                (old || []).map((todo) => (todo.id === id ? updatedTodo : todo))
            )
        },

        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(TODO_QUERY_KEY, context.previousTodos)
            }
        },
        // For now no need for this, but maybe we need it if update does not send the entire node data
        // onSettled: () => {
        //     queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY })
        // },
    })
}

export function useDeleteTodo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteTodoApi,

        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: TODO_QUERY_KEY })
            const previousTodos = queryClient.getQueryData<Todo[]>(TODO_QUERY_KEY)

            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                (old || []).filter((t) => t.id !== id)
            )

            return { previousTodos }
        },

        onSuccess: (_data, id) => {
            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                (old || []).filter((t) => t.id !== id)
            )
        },

        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(TODO_QUERY_KEY, context.previousTodos)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY })
        },
    })
}