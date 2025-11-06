import { useRef, useEffect, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TodoTableRow } from './TableRow'
import { useTodos } from '../../hooks/todoQuery'

export function TodoTable() {
    const { data: todos = [], isLoading, error } = useTodos()
    const tableContainerRef = useRef<HTMLDivElement>(null)
    const [containerReady, setContainerReady] = useState(false)

    const virtualizer = useVirtualizer({
        count: todos.length,
        getScrollElement: () => tableContainerRef.current,
        estimateSize: () => 60,
        overscan: 5,
        enabled: containerReady && todos.length > 0,
    })

    const virtualItems = virtualizer.getVirtualItems()
    const totalSize = virtualizer.getTotalSize()

    useEffect(() => {
        if (tableContainerRef.current) {
            setContainerReady(true)
        }
    }, [todos.length])

    if (isLoading) {
        return <div className="text-center py-8">Loading todos...</div>
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error loading todos</div>
    }

    if (todos.length === 0) {
        return <div className="text-center py-8 text-gray-500">No todos yet</div>
    }

    return (
        <div
            ref={tableContainerRef}
            className="h-[600px] overflow-auto border rounded-lg"
            style={{ contain: 'strict' }}
        >
            <Table className="relative w-full">
                <TableHeader className="sticky top-0 bg-background z-20">
                    <TableRow>
                        <TableHead className="w-[300px]">Task Name</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Importance</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody
                    style={{
                        height: `${totalSize}px`,
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    {virtualItems.length === 0 ? (
                        <TableRow>
                            <td colSpan={5} className="text-center py-8">
                                No items to display
                            </td>
                        </TableRow>
                    ) : (
                        virtualItems.map((virtualItem) => {
                            const todo = todos[virtualItem.index]

                            if (!todo) {
                                return null
                            }

                            return (
                                <TodoTableRow
                                    key={`${todo.id}-${virtualItem.index}`}
                                    todoId={todo.id}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                    measureRef={(node) => {
                                        if (node) {
                                            virtualizer.measureElement(node as HTMLElement)
                                        }
                                    }}
                                />
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}