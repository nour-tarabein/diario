import { useState, useEffect } from 'react';
import NotesList from './component/NoteList';
import NoteForm from './component/NoteForm';
import { fetchNotes, createNote, deleteNote } from './api';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const addNote = async (note) => {
    const newNote = await createNote(note);
    setNotes([...notes, newNote]);
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Sticky Notes</h1>
      <NoteForm onSubmit={addNote} />
      <NotesList notes={notes} onDelete={removeNote} />
    </div>
  );
};

export default App;
