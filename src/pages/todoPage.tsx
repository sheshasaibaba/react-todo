import { TodoHeader } from '../components/table/TodoHeader'
import { TodoTable } from '../components/table/Table'
import { TodoSidebar } from '../components/Sidebar'
import { useTodos } from '../hooks/todoQuery'

function TodoPage() {
    const { data: todos = [] } = useTodos()

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <TodoHeader />
            <TodoTable />
            <TodoSidebar />

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {todos.length} tasks •{' '}
                {todos.filter((t) => t.completed).length} completed •{' '}
                {todos.filter((t) => !t.completed).length} remaining
            </div>
        </div>
    )
}

export default TodoPage