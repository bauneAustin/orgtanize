import React, { ReactElement } from 'react';
import { getDayDetails, getCurrentWeek } from '../utils/DateUtils';

const DAYS: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CalendarGrid: React.FC = () => {
    const { monthName, year } = getDayDetails();
    const currentWeekDetails = getCurrentWeek();

    const getDays = (): ReactElement[] => {
        return DAYS.map((day, index) => {
            const { dayName, dayNumber, isToday } = currentWeekDetails[index];
            return <span className={`flex flex-col items-center justify-center border-r p-2 ${isToday ? 'bg-blue-50 font-semibold' : ''}`} key={day}>
                <span>{dayName}</span>
                <span className='block m-l-2'>{dayNumber}</span>
            </span>;
        });
    };

    return (
        <div className='flex-1 overflow-hidden bg-accent-light p-6 rounded-md min-w-0'>
            <div className='font-bold text-3xl'>
                {monthName} {year}
            </div>
            <div className="h-full overflow-x-auto">
                <div className='grid grid-flow-col auto-cols-[minmax(140px,1fr)] min-w-full'>
                    {getDays()}
                </div>
            </div>
        </div>
    );
};

export default CalendarGrid;

