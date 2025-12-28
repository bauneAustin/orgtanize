import React, { ReactElement } from 'react';
import { getDayDetails, getCurrentWeek } from '../utils/DateUtils';
import {
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const CalendarGrid: React.FC = () => {
    const { monthName, year } = getDayDetails();
    const currentWeekDetails = getCurrentWeek();

    const getDays = (): ReactElement[] => {
        return Array.from({ length: 7 }, (_v, index) => {
            const { dayName, dayNumber, isToday } = currentWeekDetails[index];
            return <span className={`flex flex-col items-center justify-center border-r p-2 ${isToday ? 'bg-blue-50 font-semibold' : ''}`} key={dayName}>
                <span>{dayName}</span>
                <span className='block'>{dayNumber}</span>
            </span>;
        });
    };

    return (
        <div className='flex-1 overflow-hidden bg-accent-light p-6 rounded-md min-w-0'>
            <div className='font-bold text-3xl flex mb-5'>
                {monthName} {year} <span className='flex relative top-1'><ChevronLeft className='cursor-pointer w-8 h-8' /> <ChevronRight className='cursor-pointer w-8 h-8' /></span>
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

