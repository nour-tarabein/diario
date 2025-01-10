
const NotesList = ({ notes, onDelete, onNoteClick }) => (
  <div className="notes-list">
    {notes?.map((note) => {
      const parsedNote = typeof note === "string" ? JSON.parse(note) : note;
      return (
        <div
          key={parsedNote.id}
          className="note"
          onClick={() => onNoteClick(parsedNote)}
        >
          <h3 className="note-title">{parsedNote.title || "Untitled"}</h3>
          <p className="note-text">{parsedNote.content}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(parsedNote.id);
            }}
            className="note-delete"
          >
            &times;
          </button>
        </div>
      );
    })}
  </div>
);

export default NotesList;

  