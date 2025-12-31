import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

import { Todo } from './api.list';

function getTodoData() {
    return fetch('/todo/api/list').then((res) => res.json() as Promise<Todo[]>)
}

export const Route = createFileRoute('/todo/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [todos, setTodos] = useState<Array<Todo>>([]);

    useEffect(() => {
        getTodoData().then(setTodos);
    }, [])


    return <div>Hello {JSON.stringify(todos)}</div>
}

