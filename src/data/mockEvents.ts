import { Event } from '../types/Event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Discuss Q1 progress and upcoming tasks.',
    date: '2026-02-16',
    startTime: '10:00',
    endTime: '11:00',
    color: '#FFD700', // Gold
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Submit final report for Project X.',
    date: '2026-02-17',
    startTime: '17:00',
    endTime: '17:30',
    color: '#ADFF2F', // GreenYellow
  },
  {
    id: '3',
    title: 'Client Demo',
    description: 'Demonstrate new features to client Y.',
    date: '2026-02-18',
    startTime: '14:00',
    endTime: '15:00',
    color: '#87CEEB', // SkyBlue
  },
  {
    id: '4',
    title: 'Lunch with John',
    description: 'Catch up on new opportunities.',
    date: '2026-02-16',
    startTime: '12:30',
    endTime: '13:30',
    color: '#FFA07A', // LightSalmon
  },
  {
    id: '5',
    title: 'Code Review',
    description: 'Review new PRs for feature Z.',
    date: '2026-02-19',
    startTime: '09:00',
    endTime: '10:30',
    color: '#DDA0DD', // Plum
  },
];
