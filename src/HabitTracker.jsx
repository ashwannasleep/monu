import React, { useState } from 'react';
import HabitModal from './HabitModal';
import './HabitTracker.css';

export default function HabitTracker() {
  const [habits, setHabits] = useState([
    {
      name: 'Read for 10 mins',
      icon: '📖',
      mood: '🙂',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      log: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: false,
        Fri: true,
        Sat: false,
        Sun: false
      }
    }
  ]);
  const [activeHabit, setActiveHabit] = useState(null);

  const openHabit = (habit, index) => {
    setActiveHabit({ ...habit, index });
  };

  const saveHabit = (updated, index) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = updated;
    setHabits(updatedHabits);
    setActiveHabit(null);
  };

  return (
    <div className="habit-page">
      <h1 className="text-4xl font-serif font-bold mb-2 text-center">MONU</h1>
      <p className="mt-4 italic text-gray-600 text-center">Your habits, your rhythm 🎶</p>

      <div className="habit-tracker">
        {habits.map((habit, i) => (
          <div className="habit-card" key={i} onClick={() => setActiveHabit({ ...habit, index: i })}>
            <div className="habit-header">
              <span className="icon">{habit.icon}</span>
              <span className="name">{habit.name}</span>
            </div>
            <div className="circle-tracker">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                <div
                  key={day}
                  className={`circle ${habit.days?.includes(day) ? 'active' : ''} ${habit.log?.[day] ? 'done' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    const updatedHabits = [...habits];
                    if (!updatedHabits[i].log) updatedHabits[i].log = {};
                    updatedHabits[i].log[day] = !updatedHabits[i].log[day];
                    setHabits(updatedHabits);
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          className="add-btn"
          onClick={() =>
            setHabits([...habits, {
              name: '',
              icon: '🌟',
              mood: '',
              days: [],
              log: {}
            }])
          }
        >＋</button>
      </div>

      {activeHabit && (
        <HabitModal
        habit={activeHabit}
        onClose={() => setActiveHabit(null)}
        onSave={(updated) => saveHabit(updated, activeHabit.index)}
        onDelete={(index) => {
          const updated = [...habits];
          updated.splice(index, 1);
          setHabits(updated);
          setActiveHabit(null);
        }}
      />
      
      )}
    </div>
  );
}
