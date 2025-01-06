const API_URL = 'http://localhost:4000'; 

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};




export const createNote = async ({ title, text }) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, text }),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json(); 
};


export const updateNote = async (id, text, title) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, text }),
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};
