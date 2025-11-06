import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useTodoStore, useSelectedTodoId } from '../store/todoStore'
import { useTodoActions } from '../hooks/useTodoMutationAndQuery'
import { useTodos } from '../hooks/todoQuery'
import { useQueryClient } from '@tanstack/react-query'
import { TODO_QUERY_KEY } from '../hooks/todoQuery'
import type { Todo, UpdateTodoPayload } from '../types/todoTypes'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function TodoSidebar() {
    const queryClient = useQueryClient()
    const isSidebarOpen = useTodoStore((s) => s.isSidebarOpen)
    const closeSidebar = useTodoStore((s) => s.closeSidebar)
    const selectedTodoId = useSelectedTodoId()
    const { updateTodo } = useTodoActions()
    const { data: todos = [] } = useTodos()

    const todo = todos.find((t) => t.id === selectedTodoId)

    const debouncedUpdateRequest = useDebouncedCallback(
        (payload: UpdateTodoPayload) => {
            if (todo) {
                updateTodo({ id: todo.id, payload })
            }
        },
        500,
        {
            maxWait: 2000,
            trailing: true,
            leading: false,
        }
    )

    const handleFieldChange = useCallback(
        (field: keyof UpdateTodoPayload, value: any) => {
            queryClient.setQueryData<Todo[]>(TODO_QUERY_KEY, (old) =>
                old?.map((item) =>
                    item.id === selectedTodoId
                        ? { ...item, [field]: value, updatedAt: new Date().toISOString() }
                        : item
                ) || []
            )

            debouncedUpdateRequest({
                taskName: field === 'taskName' ? value : todo?.taskName || '',
                progress: field === 'progress' ? value : todo?.progress || 0,
                importance: field === 'importance' ? value : todo?.importance || 1,
                completed: field === 'completed' ? value : todo?.completed || false,
                location: field === 'location' ? value : todo?.location || '',
                assignedTo: field === 'assignedTo' ? value : todo?.assignedTo || '',
                coordinateWith: field === 'coordinateWith' ? value : todo?.coordinateWith || '',
            })
        },
        [queryClient, todo, selectedTodoId, debouncedUpdateRequest]
    )

    if (!todo) return null

    return (
        <Sheet open={isSidebarOpen} onOpenChange={closeSidebar}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Task Details</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                    <div>
                        <Label>Task Name</Label>
                        <Input
                            value={todo.taskName}
                            onChange={(e) => handleFieldChange('taskName', e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Progress: {todo.progress}%</Label>
                        <Slider
                            value={[todo.progress ?? 0]}
                            onValueChange={([progress]) =>
                                handleFieldChange('progress', progress)
                            }
                            max={100}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label>Location</Label>
                        <Input
                            value={todo.location}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                            placeholder="Office, Home, etc."
                        />
                    </div>

                    <div>
                        <Label>Assigned To</Label>
                        <Input
                            value={todo.assignedTo}
                            onChange={(e) => handleFieldChange('assignedTo', e.target.value)}
                            placeholder="Name"
                        />
                    </div>

                    <div>
                        <Label>Coordinate With</Label>
                        <Input
                            value={todo.coordinateWith}
                            onChange={(e) =>
                                handleFieldChange('coordinateWith', e.target.value)
                            }
                            placeholder="Team members"
                        />
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>Last updated: {new Date(todo.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}