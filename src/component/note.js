import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for the delete button

const Note = ({ note, onDelete }) => (
  <div className="note" onDoubleClick={() => onDelete(note.id)}>
    <h1 className="note-title">{note.title}</h1>
    <p className="note-text">{note.content}</p>
    <button
      className="note-delete"
      onClick={() => onDelete(note.id)}
      title="Delete Note"
    >
      <FaTrashAlt />
    </button>
  </div>
);

export default Note;

  