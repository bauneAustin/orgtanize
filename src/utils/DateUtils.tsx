export type DayDetails = {
    firstDayOfMonth: Date;
    lastDayOfMonth: Date;
    monthName: string;
    year: number;
    weekday: number;
};

export const getDayDetails = (): DayDetails => {
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

export type CurrentWeekDetails = {
    date: Date;
    dayNumber: number;
    dayName: string;
    isToday: boolean;
};

export const getCurrentWeek = (): CurrentWeekDetails[] => {
    const today = new Date();
    const day = today.getDay();

    const diff = -day; // Sunday start

    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + diff)

    return Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)

        return {
            date,
            dayNumber: date.getDate(),
            dayName: date.toLocaleDateString(undefined, { weekday: 'long' }),
            isToday: date.toDateString() === today.toDateString(),
        }
    })
}

