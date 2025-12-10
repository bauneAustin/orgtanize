import { createFileRoute } from '@tanstack/react-router'
import MonthCalendar from '../../components/MonthCalendar';

export const Route = createFileRoute('/calendar/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex h-screen'>
            <div className='w-64 bg-primary-dark'><MonthCalendar /></div>
            <div className='flex-1 h-screen'>Calndar body</div>
        </div>
    );
}
