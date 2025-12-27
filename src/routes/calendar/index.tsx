import { createFileRoute } from '@tanstack/react-router'
import MonthCalendar from '../../components/MonthCalendar';
import CalendarGrid from '../../components/CalendarGrid';

export const Route = createFileRoute('/calendar/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex h-screen'>
            <div className='w-64 bg-primary-dark'><MonthCalendar /></div>
            <CalendarGrid />
        </div>
    );
}
