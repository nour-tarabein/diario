import React from 'react';
import Note from './note';

const NotesList = ({ notes, onDelete, onNoteClick }) => (
  <div className="notes-list">
    {notes?.map((note) => {
      const parsedNote = typeof note === "string" ? JSON.parse(note) : note;
      return (
        <Note
          key={parsedNote.id}
          note={parsedNote}
          onDelete={onDelete}
          onNoteClick={onNoteClick}
        />
      );
    })}
  </div>
);

export default NotesList;
  