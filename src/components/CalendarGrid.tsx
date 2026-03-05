import React, { ReactElement, useState } from 'react';
import { getDaysInMonth } from '../utils/DateUtils'; // Updated import
import { Event } from '../types/Event';
import { mockEvents } from '../data/mockEvents';
import EventFormModal from './EventFormModal';
import {
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const CalendarGrid: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0); // Offset in months from today
    const currentMonthDetails = getDaysInMonth(currentMonthOffset); // Use new function
    
    // State for modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
    const [initialDate, setInitialDate] = useState<string | undefined>(undefined);

    // Derive monthName and year from the first day of the current month
    const monthName = currentMonthDetails[0].date.toLocaleString("default", { month: "long" });
    const year = currentMonthDetails[0].date.getFullYear();

    const handleSaveEvent = (newEvent: Event) => {
      if (newEvent.id) {
        // Update existing event
        setEvents(events.map(event => event.id === newEvent.id ? newEvent : event));
      } else {
        // Add new event
        setEvents([...events, { ...newEvent, id: Date.now().toString() }]); // Ensure unique ID for new events
      }
      setIsModalOpen(false);
    };
  
    const handleDeleteEvent = (id: string) => {
      setEvents(events.filter(event => event.id !== id));
      setIsModalOpen(false);
    };

    const handleOpenAddEventModal = (date: string) => {
        setEventToEdit(null);
        setInitialDate(date);
        setIsModalOpen(true);
    };

    const handleOpenEditEventModal = (event: Event) => {
        setEventToEdit(event);
        setIsModalOpen(true);
    };

    const getDays = (monthDetails: typeof currentMonthDetails): ReactElement[] => { // Updated parameter
        const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        return (
            <>
                {/* Day names header */}
                {dayNames.map(name => (
                    <div key={name} className="flex items-center justify-center p-2 text-sm font-semibold text-gray-700 border-b border-r last:border-r-0">
                        {name}
                    </div>
                ))}
                {/* Calendar days */}
                {monthDetails.map((dayDetail, index) => {
                    const { date, dayNumber, isToday, isCurrentMonth } = dayDetail;
                    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
                    const eventsForDay = events.filter(event => event.date === formattedDate);

                    return (
                        <div
                            className={`relative flex flex-col p-2 border-r border-b min-h-[120px] 
                                ${isCurrentMonth ? (isToday ? 'bg-blue-50' : 'bg-white') : 'bg-gray-100 text-gray-400'} 
                                last:border-r-0`}
                            key={dayDetail.date.toDateString()}
                        >
                            <span className={`text-sm text-center ${isToday ? 'font-semibold text-blue-700' : 'text-gray-600'}`}>
                                {dayNumber}
                            </span>
                            <div className="flex flex-col mt-1 space-y-1 overflow-y-auto">
                                {eventsForDay.map(event => (
                                    <div
                                        key={event.id}
                                        className="text-xs p-1 rounded-md text-white overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                                        style={{ backgroundColor: event.color || '#3B82F6' }} // Default blue if no color
                                        title={`${event.title} (${event.startTime} - ${event.endTime})`}
                                        onClick={() => handleOpenEditEventModal(event)}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                            {isCurrentMonth && (
                                <button 
                                    className="text-blue-500 text-xs mt-auto self-start hover:underline absolute bottom-1 left-2"
                                    onClick={() => handleOpenAddEventModal(formattedDate)}
                                >
                                    + Add event
                                </button>
                            )}
                        </div>
                    );
                })}
            </>
        );
    };

    const goToPreviousMonth = () => {
        setCurrentMonthOffset(prev => prev - 1);
    };

    const goToNextMonth = () => {
        setCurrentMonthOffset(prev => prev + 1);
    };

    return (
        <div className='flex flex-col flex-1 rounded-md'>
            <div className='p-6'>
                <div className='font-bold text-3xl flex mb-5 items-center'>
                    {monthName} {year}
                    <span className='flex relative ml-4 top-0.5'>
                        <ChevronLeft className='cursor-pointer w-8 h-8' onClick={goToPreviousMonth} />
                        <ChevronRight className='cursor-pointer w-8 h-8' onClick={goToNextMonth} />
                    </span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className='grid grid-cols-7 grid-rows-[auto,repeat(6,minmax(120px,1fr))] min-w-full border-t border-l'>
                    {getDays(currentMonthDetails)}
                </div>
            </div>

            <EventFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                eventToEdit={eventToEdit}
                initialDate={initialDate}
            />
        </div>
    );
};

export default CalendarGrid;