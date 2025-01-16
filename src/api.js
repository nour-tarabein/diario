const API_URL = 'http://localhost:4000'; 

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};


export const fetchNotesForDate = async (date) => {
  const response = await fetch(`${API_URL}/notes/${date}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes for the selected date');
  }
  return response.json();
};
export const generateAuthCode = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to generate auth code: ${response.status}`);
    }
    
    const { code } = await response.json();
    if (!code) {
      throw new Error('No code received from server');
    }
    
    localStorage.setItem('authCode', code);
    console.log('Auth code stored in localStorage:', code); // Debug log
    return code;
  } catch (error) {
    console.error('Error in generateAuthCode:', error);
    throw error;
  }
};
export const createNote = async ({ title, text }) => {
  const authCode = localStorage.getItem('authCode');
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-auth-code': authCode 
    },
    body: JSON.stringify({ title, text }),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json();
};


export const updateNote = async (id, text, title) => {
  const authCode = localStorage.getItem('authCode');
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'x-auth-code': authCode 
    },
    body: JSON.stringify({ title, text }),
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return response.json();
};


export const deleteNote = async (id) => {
  const authCode = localStorage.getItem('authCode');
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-code': authCode
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};
// api.js
export const likeNote = async (noteId) => {
  const authCode = localStorage.getItem('authCode');
  const response = await fetch(`${API_URL}/notes/likes`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'x-auth-code': authCode
      },
      body: JSON.stringify({ noteId })
  });
  if (!response.ok) {
      throw new Error('Failed to like note');
  }
  return response.json();
};

export const getLikedNotes = async () => {
  const authCode = localStorage.getItem('authCode');
  const response = await fetch(`${API_URL}/notes/likes`, {
      headers: {
          'x-auth-code': authCode
      }
  });
  if (!response.ok) {
      throw new Error('Failed to get liked notes');
  }
  return response.json();
};

export const getLikeCount = async (noteId) => {
  const response = await fetch(`${API_URL}/notes/${noteId}/likes`);
  if (!response.ok) {
      throw new Error('Failed to get like count');
  }
  return response.json();
};