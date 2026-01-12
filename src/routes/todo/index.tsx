import { convexQuery } from '@convex-dev/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../../convex/_generated/api';

export const Route = createFileRoute('/todo/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

    return <div>Hello {JSON.stringify(data)}</div>
}

