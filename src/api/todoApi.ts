import type { Todo, TodosResponse, SingleTodoResponse, CreateTodoPayload, UpdateTodoPayload } from "@/types/todoTypes";
import { api } from "./client";


export async function getTodosApi(): Promise<Todo[]> {
    const response = await api.get('todos').json<TodosResponse>()
    return response.data
}

export async function createTodoApi(payload: CreateTodoPayload): Promise<Todo> {
    const response = await api.post('todos', { json: payload }).json<SingleTodoResponse>()
    return response.data
}

export async function updateTodoApi(id: string, payload: UpdateTodoPayload): Promise<Todo> {
    const response = await api.put(`todos/${id}`, { json: payload }).json<SingleTodoResponse>()
    return response.data
}

export async function deleteTodoApi(id: string): Promise<void> {
    await api.delete(`todos/${id}`)
}