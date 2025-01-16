import React, { useState, useEffect } from 'react';
import NotesList from './component/NoteList';
import ExpandedNote from './component/ExpandedNote';
import WelcomeSection from './component/WelcomeSection'; 
import { fetchNotes, createNote, updateNote, deleteNote, generateAuthCode } from './api';
import { FaPlus } from "react-icons/fa";
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [error, setError] = useState(null);
  const [likedNotes, setLikedNotes] = useState(new Set());


  useEffect(() => {
    const code = localStorage.getItem('authCode');
    const initializeAuth = async () => {
      try {
        const code = await generateAuthCode();
        console.log('Generated new auth code:', code); 
      } catch (err) {
        console.error('Failed to generate auth code:', err);
      }
    };
    if (code == null) {
      initializeAuth();
    }
  }, []);


  const loadNotes = async () => {
    try {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
      
      const response = await fetch('http://localhost:4000/notes/likes', {
        headers: {
          'x-auth-code': localStorage.getItem('authCode')
        }
      });
      if (response.ok) {
        const likedData = await response.json();
        setLikedNotes(new Set(likedData.map(like => like.note_id)));
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleAddNoteClick = () => {
    setSelectedNote({ title: '', content: '' });
  };

  const handleSaveNote = async (id, title, content) => {
    try {
      if (id) {
        const updatedNote = await updateNote(id, content, title);
        setNotes((prevNotes) => 
          prevNotes.map((n) => (n.id === id ? updatedNote : n))
        );
      } else {
        const newNote = await createNote({ title, text: content });
        setNotes((prevNotes) => [...prevNotes, newNote]);
      }
      setSelectedNote(null);
    } catch (err) {
      setError("You don't have permission to edit this note");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      setError("You don't have permission to delete this note");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleLike = async (noteId) => {
    try {
      setLikedNotes(prev => new Set([...prev, noteId]));
      
      await loadNotes();
    } catch (err) {
      setError("Failed to like note");
      setTimeout(() => setError(null), 3000);
      setLikedNotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(noteId);
        return newSet;
      });
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div className="app">
      {error && <div className="error-message">{error}</div>}
      
      <WelcomeSection />
      <div style={{ padding: '2rem' }}>
        <button className="add-note-button" onClick={handleAddNoteClick}>
          <FaPlus />
        </button>

        <NotesList
          notes={notes}
          onDelete={handleDeleteNote}
          onNoteClick={handleNoteClick}
          onLike={handleLike}
          likedNotes={likedNotes}
        />
        
        {selectedNote && (
          <ExpandedNote
            note={selectedNote}
            onSave={handleSaveNote}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default App;