import React, { useState, useEffect } from 'react';
import { Event } from '../types/Event';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete?: (id: string) => void;
  eventToEdit?: Event | null;
  initialDate?: string; // For pre-filling the date when creating from a specific day
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  eventToEdit,
  initialDate,
}) => {
  const [id, setId] = useState<string>(eventToEdit?.id || '');
  const [title, setTitle] = useState<string>(eventToEdit?.title || '');
  const [description, setDescription] = useState<string>(eventToEdit?.description || '');
  const [date, setDate] = useState<string>(eventToEdit?.date || initialDate || '');
  const [startTime, setStartTime] = useState<string>(eventToEdit?.startTime || '09:00');
  const [endTime, setEndTime] = useState<string>(eventToEdit?.endTime || '10:00');
  const [color, setColor] = useState<string>(eventToEdit?.color || '#3B82F6'); // Default blue

  useEffect(() => {
    if (eventToEdit) {
      setId(eventToEdit.id);
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description || '');
      setDate(eventToEdit.date);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setColor(eventToEdit.color || '#3B82F6');
    } else {
      // Reset form for new event
      setId('');
      setTitle('');
      setDescription('');
      setDate(initialDate || '');
      setStartTime('09:00');
      setEndTime('10:00');
      setColor('#3B82F6');
    }
  }, [eventToEdit, initialDate, isOpen]); // Reset when modal opens or eventToEdit changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !startTime || !endTime) {
      alert('Please fill in all required fields: Title, Date, Start Time, End Time');
      return;
    }

    const newEvent: Event = {
      id: id || Date.now().toString(), // Generate new ID if not editing
      title,
      description,
      date,
      startTime,
      endTime,
      color,
    };
    onSave(newEvent);
    onClose();
  };

  const handleDelete = () => {
    if (id && onDelete) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        onDelete(id);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{eventToEdit ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Start Time <span className="text-red-500">*</span></label>
              <input
                type="time"
                id="startTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">End Time <span className="text-red-500">*</span></label>
              <input
                type="time"
                id="endTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
            <input
              type="color"
              id="color"
              className="w-full h-10 border-0"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              {eventToEdit && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {eventToEdit ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
