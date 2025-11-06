import { useQuery } from '@tanstack/react-query'
import { getTodosApi } from '../api/todoApi'

export const TODO_QUERY_KEY = ['todos']

export function useTodos() {
    return useQuery({
        queryKey: TODO_QUERY_KEY,
        queryFn: getTodosApi,
    })
}

export function useTodo(id: string | null) {
    const { data: todos } = useTodos()
    return todos?.find((todo) => todo.id === id) || null
}