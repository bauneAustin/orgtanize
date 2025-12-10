import React, { ReactElement } from 'react';

const DAYS: string[] = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
const getDayDetails = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const monthName = new Date().toLocaleString("default", { month: "long" });
    const weekday = new Date().getDay();

    return {
        firstDayOfMonth,
        lastDayOfMonth,
        monthName,
        year,
        weekday
    };
};

const MonthCalendar: React.FC = () => {
    const { firstDayOfMonth, lastDayOfMonth, monthName, year } = getDayDetails();

    const getDayHeaders = (): ReactElement[] => {
        return DAYS.map(day => <div className='text-center' key={day}>{day}</div>);
    };

    const getEmptyCells = (): ReactElement[] => {
        let markup = [];
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            markup.push(<div className='text-center' key={`empty${i}`}>{' '}</div>);
        }
        return markup;
    }

    const getDayCells = (): ReactElement[] => {
        let markup = [];
        const today = new Date().getDate();
        for (let i = 1; i < lastDayOfMonth.getDate(); i++) {
            if (i === today) {
                markup.push(<div className='rounded-full w-6 aspect-square bg-primary-dark text-center text-warning' key={`day${i}`}>{i}</div>);
            }
            else {
                markup.push(<div className='text-center' key={`day${i}`}>{i}</div>);
            }
        }
        return markup;
    }

    return (
        <div className='bg-background-light m-2 p-2 rounded-md '>
            <div className='font-bold'>{monthName} {year}</div>
            <div className='grid grid-cols-7 gap-2'>
                {getDayHeaders()}
                {getEmptyCells()}
                {getDayCells()}
            </div>
        </div>
    );
};

export default MonthCalendar;

