const NotesList = ({ notes, onDelete }) => (
  <div className="notes-list">
    {notes?.map((note) => {
      const parsedNote = typeof note === "string" ? JSON.parse(note) : note;
      console.log("Parsed note:", parsedNote); // Log each parsed note
      return (
        <div key={parsedNote.id} className="note">
          <h3 className="note-title">{parsedNote.title || "Untitled"}</h3>
          <p className="note-text">{parsedNote.content || "No content available"}</p>
          <button onClick={() => onDelete(parsedNote.id)} className="note-delete">
            &times;
          </button>
        </div>
      );
    })}
  </div>
);

  export default NotesList;
  