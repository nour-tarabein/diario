import { useState, useEffect } from 'react';
import { fetchNotes, createNote, deleteNote } from './api';

import NotesList from './component/NoteList';
import NoteForm from './component/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes()
      .then(setNotes)
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);
  


  const addNote = async (title, text) => {
    try {
      const newNote = await createNote({ title, text });
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };
  


  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Sticky Notes</h1>
      {/* Form to create a new note */}
      <NoteForm onSubmit={addNote} />
      {/* List of all existing notes */}
      <NotesList notes={notes} onDelete={removeNote} />
    </div>
  );
};

export default App;
