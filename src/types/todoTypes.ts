export interface Todo {
    id: string
    taskName: string
    progress: number
    importance: number
    completed: boolean
    location: string
    assignedTo: string
    coordinateWith: string
    createdAt: string
    updatedAt: string
}

export interface TodosResponse {
    success: boolean
    count: number
    data: Todo[]
}

export interface SingleTodoResponse {
    success: boolean
    data: Todo
}

export interface CreateTodoPayload {
    taskName: string
}

export interface UpdateTodoPayload {
    progress?: number
    importance?: number
    completed?: boolean
    location?: string
    assignedTo?: string
    coordinateWith?: string
    taskName?: string
}