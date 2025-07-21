import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Notes.css'

const NOTES_STORAGE_KEY = 'futuristic_mac_notes';

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(NOTES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'Welcome', content: 'This is your first note!' }];
  });
  const [selectedId, setSelectedId] = useState(notes[0]?.id || 1)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newTitle.trim()) return
    const id = Date.now()
    setNotes([...notes, { id, title: newTitle, content: newContent }])
    setSelectedId(id)
    setNewTitle('')
    setNewContent('')
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id))
    if (selectedId === id && notes.length > 1) {
      setSelectedId(notes[0].id)
    }
  }

  const updateNote = (id, field, value) => {
    setNotes(notes.map(n => n.id === id ? { ...n, [field]: value } : n))
  }

  const selectedNote = notes.find(n => n.id === selectedId)

  return (
    <div className="notes-app glass-subtle">
      <div className="notes-sidebar">
        <h3>Notes</h3>
        <ul>
          {notes.map(note => (
            <li
              key={note.id}
              className={note.id === selectedId ? 'active' : ''}
              onClick={() => setSelectedId(note.id)}
            >
              {note.title}
              <button className="delete-btn" onClick={e => { e.stopPropagation(); deleteNote(note.id) }}>🗑️</button>
            </li>
          ))}
        </ul>
        <div className="add-note-form">
          <button onClick={() => {
            // const untitledCount = notes.filter(n => n.title.startsWith('Untitled')).length + 1;
            const id = Date.now();
            setNotes([...notes, { id, title: `New Note`, content: '' }]);
            setSelectedId(id);
          }}>Create Note</button>
        </div>
      </div>
      <div className="notes-content">
        {selectedNote ? (
          <>
            <input
              className="note-title"
              value={selectedNote.title}
              onChange={e => updateNote(selectedNote.id, 'title', e.target.value)}
            />
            <textarea
              className="note-body"
              value={selectedNote.content}
              onChange={e => updateNote(selectedNote.id, 'content', e.target.value)}
            />
          </>
        ) : (
          <p>Select a note to view or edit.</p>
        )}
      </div>
    </div>
  )
}

export default Notes
