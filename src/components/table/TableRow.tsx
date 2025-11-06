import { TableCell, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-react'
import { useTodoActions } from '../../hooks/useTodoMutationAndQuery'
import { useTodoStore } from '../../store/todoStore'
import { useTodos } from '../../hooks/todoQuery'
import { useQueryClient } from '@tanstack/react-query'
import { TODO_QUERY_KEY } from '../../hooks/todoQuery'
import type { Todo, UpdateTodoPayload } from '../../types/todoTypes'
import { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface TodoTableRowProps {
    todoId: string
    style: React.CSSProperties
    measureRef: (node: Element | null) => void
}

export function TodoTableRow({ todoId, style, measureRef }: TodoTableRowProps) {
    const queryClient = useQueryClient()
    const { updateTodo } = useTodoActions()
    const { openSidebar } = useTodoStore()
    const { data: todos = [] } = useTodos()

    const todo = todos.find((t) => t.id === todoId)

    if (!todo) return null

    const debouncedUpdateRequest = useDebouncedCallback(
        (payload: UpdateTodoPayload) => {
            updateTodo({ id: todo.id, payload })
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
                    item.id === todo.id
                        ? { ...item, [field]: value, updatedAt: new Date().toISOString() }
                        : item
                ) || []
            )

            debouncedUpdateRequest({
                taskName: field === 'taskName' ? value : todo.taskName,
                progress: field === 'progress' ? value : todo.progress,
                importance: field === 'importance' ? value : todo.importance,
                completed: field === 'completed' ? value : todo.completed,
                location: field === 'location' ? value : todo.location,
                assignedTo: field === 'assignedTo' ? value : todo.assignedTo,
                coordinateWith: field === 'coordinateWith' ? value : todo.coordinateWith,
            })
        },
        [queryClient, todo, debouncedUpdateRequest]
    )

    return (
        <TableRow
            ref={measureRef}
            style={style}
            className={todo.completed ? 'bg-muted/50' : ''}
        >
            <TableCell>
                <Input
                    value={todo.taskName}
                    onChange={(e) => handleFieldChange('taskName', e.target.value)}
                    className={`border-0 focus-visible:ring-1 ${
                        todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                />
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-4">
                    <Slider
                        value={[todo.progress || 0]}
                        onValueChange={([progress]) => handleFieldChange('progress', progress)}
                        max={100}
                        step={1}
                        className="w-32"
                    />
                    <span className="text-sm w-12">{todo.progress}%</span>
                </div>
            </TableCell>

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-20">
                            Level {todo.importance}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Set Importance</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {[1, 2, 3, 4, 5].map((level) => (
                            <DropdownMenuItem
                                key={level}
                                onSelect={() => handleFieldChange('importance', level)}
                            >
                                Level {level}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>

            <TableCell>
                <Switch
                    checked={todo.completed}
                    onCheckedChange={(completed) =>
                        handleFieldChange('completed', completed)
                    }
                />
            </TableCell>

            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => openSidebar(todo.id)}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => updateTodo({ id: todo.id, payload: {} })}>
                            Delete Task
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}