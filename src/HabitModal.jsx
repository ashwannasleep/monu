import React, { useState } from 'react';
import './HabitModal.css';

const icons = ['💪', '❤️', '📖', '🧠', '🍃', '🎵', '💧', '✅', '✨', '⭐', '🧘', '🐾'];
const moods = ['😐', '🙂', '😊', '😄', '😁'];

export default function HabitModal({ habit, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(habit);

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="habit-modal-overlay">
      <div className="habit-modal">
        <h3>Edit Habit</h3>

        <label>Name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} />

        <label>Description</label>
        <input value={form.description || ''} onChange={(e) => update('description', e.target.value)} />

        <label>Time</label>
        <select value={form.time || ''} onChange={(e) => update('time', e.target.value)}>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Flexible</option>
        </select>

        <label>Detailed Plan</label>
        <textarea value={form.plan || ''} onChange={(e) => update('plan', e.target.value)} />

        <label>Mood</label>
        <div className="mood-options">
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => update('mood', form.mood === m ? '' : m)}
              className={form.mood === m ? 'selected' : ''}
            >
              {m}
            </button>
          ))}
        </div>

        <label>Icon</label>
        <div className="icon-options">
          {icons.map((icon, i) => (
            <button
              key={i}
              onClick={() => update('icon', form.icon === icon ? '' : icon)}
              className={form.icon === icon ? 'selected' : ''}
            >
              {icon}
            </button>
          ))}
        </div>

        <label>Scheduled Days</label>
        <div className="day-picker">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <button
              key={day}
              onClick={() => {
                const current = form.days || [];
                const updatedDays = current.includes(day)
                  ? current.filter(d => d !== day)
                  : [...current, day];
                update('days', updatedDays);
              }}
              className={form.days?.includes(day) ? 'selected' : ''}
            >
              {day.charAt(0)}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button onClick={() => onSave(form)}>Save</button>
          <button onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={() => onDelete(habit.index)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
