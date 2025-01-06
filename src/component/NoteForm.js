import { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        required
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-input"
        required
      ></textarea>
      <button type="submit" className="note-button">Add Note</button>
    </form>
  );
};

export default NoteForm;
