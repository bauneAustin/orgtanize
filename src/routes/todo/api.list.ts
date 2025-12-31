import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export type Todo = {
    priority?: number;
    assignee: string;
    name: string;
    description: string;
};

export const Route = createFileRoute('/todo/api/list')({
    server: {
        handlers: {
            GET: () => json<Todo[]>([
                { priority: 5, assignee: 'Austin', name: 'TODO Page', description: 'Get basic todo routing and page working' },
                { priority: 1, assignee: 'Austin', name: 'Database', description: 'Get data stored in a db instead of hardcoded' },
                { priority: 3, assignee: 'Austin', name: 'Style Page', description: 'Style the todo page and add buttons' },
            ]),
        },
    },
})
