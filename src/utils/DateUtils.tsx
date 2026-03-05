export type DayDetails = {
    date: Date;
    dayNumber: number;
    dayName: string;
    isToday: boolean;
    isCurrentMonth: boolean;
};

export const getDaysInMonth = (monthOffset: number = 0): DayDetails[] => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const targetDate = new Date(currentYear, currentMonth + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days: DayDetails[] = [];

    // Days from previous month
    const startDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    // Adjust startDay to be 0 for Monday, 6 for Sunday
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

    for (let i = adjustedStartDay; i > 0; i--) {
        const date = new Date(firstDayOfMonth);
        date.setDate(firstDayOfMonth.getDate() - i);
        days.push({
            date,
            dayNumber: date.getDate(),
            dayName: date.toLocaleDateString(undefined, { weekday: 'long' }),
            isToday: date.toDateString() === today.toDateString(),
            isCurrentMonth: false,
        });
    }

    // Days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(year, month, i);
        days.push({
            date,
            dayNumber: i,
            dayName: date.toLocaleDateString(undefined, { weekday: 'long' }),
            isToday: date.toDateString() === today.toDateString(),
            isCurrentMonth: true,
        });
    }

    // Days from next month to fill the grid (up to 6 weeks)
    const totalDays = days.length;
    const remainingSlots = 42 - totalDays; // 6 weeks * 7 days
    if (remainingSlots > 0) {
        for (let i = 1; i <= remainingSlots; i++) {
            const date = new Date(lastDayOfMonth);
            date.setDate(lastDayOfMonth.getDate() + i);
            days.push({
                date,
                dayNumber: date.getDate(),
                dayName: date.toLocaleDateString(undefined, { weekday: 'long' }),
                isToday: date.toDateString() === today.toDateString(),
                isCurrentMonth: false,
            });
        }
    }

    return days;
};

