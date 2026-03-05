import React, { ReactElement } from 'react';
import { getDaysInMonth } from '../utils/DateUtils' // Import new function

const DAYS: string[] = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

const MonthCalendar: React.FC = () => {
    const currentMonthDetails = getDaysInMonth(0); // Get details for the current month
    const todayDate = new Date(); // To check for today's date

    // Derive monthName and year from the first day of the current month's details
    const monthName = currentMonthDetails[0].date.toLocaleString("default", { month: "long" });
    const year = currentMonthDetails[0].date.getFullYear();

    const getDayHeaders = (): ReactElement[] => {
        return DAYS.map(day => <div className='text-center text-sm font-semibold text-gray-700' key={day}>{day}</div>);
    };

    const getDayCells = (): ReactElement[] => {
        return currentMonthDetails.map((dayDetail, index) => {
            const { date, dayNumber, isToday, isCurrentMonth } = dayDetail;
            const key = date.toISOString(); // Use the ISO string of the date for a stable key

            return (
                <div 
                    className={`text-center py-1 text-sm ${isCurrentMonth ? '' : 'text-gray-400'} ${isToday ? 'rounded-full w-6 aspect-square bg-primary-dark text-warning mx-auto' : ''}`} 
                    key={key}
                >
                    {dayNumber}
                </div>
            );
        });
    };

    return (
        <div className='bg-background-light m-2 p-2 rounded-md '>
            <div className='font-bold text-lg mb-2'>{monthName} {year}</div>
            <div className='grid grid-cols-7 gap-1'>
                {getDayHeaders()}
                {getDayCells()}
            </div>
        </div>
    );
};

export default MonthCalendar;

