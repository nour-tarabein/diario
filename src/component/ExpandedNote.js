import React, { useState, useEffect } from 'react';

const ExpandedNote = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note?.id, title, content);
  };

  return (
    <div className="expanded-note-backdrop" onClick={onCancel}>
      {}
      <div className="expanded-note-container" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="expanded-note-form">
          <input
            type="text"
            placeholder="Title"
            className="expanded-note-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your note here..."
            className="expanded-note-content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="expanded-note-buttons">
            <button type="submit" className="expanded-note-save">
              Save
            </button>
            <button type="button" onClick={onCancel} className="expanded-note-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpandedNote;
