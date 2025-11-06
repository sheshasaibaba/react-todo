import { Button } from '@/components/ui/button'
import { useTodoActions } from '../../hooks/useTodoMutationAndQuery'

export function TodoHeader() {
    const { createTodo, isCreating } = useTodoActions()

    const handleAddTask = () => {
        createTodo(
            { taskName: 'New Task' },
            {
                onSuccess: () => {
                    console.log('Todo created successfully')
                },
            }
        )
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Todo Manager</h1>
            <Button onClick={handleAddTask} disabled={isCreating} className="bg-blue-600 hover:bg-blue-700">
                {isCreating ? 'Adding...' : 'Add New Task'}
            </Button>
        </div>
    )
}