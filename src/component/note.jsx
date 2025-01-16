import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaHeart, FaRegHeart } from "react-icons/fa";

const Note = ({ note, onDelete, onNoteClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);


  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {

        const authCode = localStorage.getItem('authCode');
        const response = await fetch('http://localhost:4000/notes/likes', {
          headers: {
            'x-auth-code': authCode
          }
        });
        
        if (response.ok) {
          const likedNotes = await response.json();
          setIsLiked(likedNotes.some(like => like.note_id === note.id));
        }


        const countResponse = await fetch(`http://localhost:4000/notes/${note.id}/likes`);
        if (countResponse.ok) {
          const data = await countResponse.json();
          setLikes(data.count);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [note.id]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    const authCode = localStorage.getItem('authCode');

    try {
      if (isLiked) {
        const response = await fetch(`http://localhost:4000/notes/likes/${note.id}`, {
          method: 'DELETE',
          headers: {
            'x-auth-code': authCode
          }
        });

        if (response.ok) {
          setIsLiked(false);
          setLikes(prev => prev - 1);
        }
      } else {
        const response = await fetch('http://localhost:4000/notes/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-code': authCode
          },
          body: JSON.stringify({ noteId: note.id })
        });

        if (response.ok) {
          setIsLiked(true);
          setLikes(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="note" onClick={() => onNoteClick(note)}>
      <h3 className="note-title">{note.title || "Untitled"}</h3>
      <p className="note-text">{note.content}</p>
      <div className="note-actions">
        <button
          className="note-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          title="Delete Note"
        >
          <FaTrashAlt />
        </button>
        <button 
          className={`note-like ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
          title={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className="like-count">{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default Note;