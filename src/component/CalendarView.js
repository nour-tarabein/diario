import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchNotesForDate } from '../api';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0]; 
    try {
      const notesForDate = await fetchNotesForDate(formattedDate);
      setNotes(notesForDate);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  return (
    <div>
      <h1>Calendar View</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <h2>Notes for {selectedDate.toDateString()}</h2>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title || 'Untitled'}</h3>
              <p>{note.content || 'No content available'}</p>
            </li>
          ))
        ) : (
          <p>No notes for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default CalendarView;
