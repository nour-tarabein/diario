// App.js
import { useState, useEffect } from 'react';
import NotesList from './component/NoteList';
import ExpandedNote from './component/ExpandedNote';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';
import { FaPlus } from "react-icons/fa";
import './App.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes().then(setNotes).catch(console.error);
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note); // opens the expanded note
  };

  const handleAddNoteClick = () => {
    // An empty object implies a new note
    setSelectedNote({ title: '', content: '' });
  };

  const handleSaveNote = async (id, title, content) => {
    try {
      if (id) {
        // We have an existing note => update
        const updatedNote = await updateNote(id, content, title); 
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === id ? updatedNote : n))
        );
      } else {
        // No ID => create a new note
        const newNote = await createNote({ title, text: content });
        setNotes((prevNotes) => [...prevNotes, newNote]);
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setSelectedNote(null); // close the expanded note
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div className="app">

      <button className="add-note-button" onClick={handleAddNoteClick}>
        <FaPlus />
      </button>
      

      <NotesList notes={notes} onDelete={handleDeleteNote} onNoteClick={handleNoteClick} />
      {selectedNote && (
        <ExpandedNote
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
