import React, { useState, useEffect } from 'react';
import HabitModal from './HabitModal';
import './HabitTracker.css';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createHabit, updateHabit, deleteHabit } from './graphql/mutations';
import { listHabits } from './graphql/queries';

const client = generateClient();

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [activeHabit, setActiveHabit] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const result = await client.graphql({
        query: listHabits
      });
      setHabits(result.data.listHabits.items);
    } catch (err) {
      console.error('Failed to load habits:', err);
    }
  };
 
  const saveHabit = async (updated, index) => {
    try {
      if (updated.id) {
        // Update existing habit
        const result = await client.graphql({
          query: updateHabit,
          variables: { input: { 
            id: updated.id,
            name: updated.name || 'Untitled Habit',
            icon: updated.icon || '🌟',
            mood: updated.mood || '',
            days: updated.days || [],
            description: updated.description || '',
            time: updated.time || '',
            plan: updated.plan || '',
            log: updated.log ? JSON.stringify(updated.log) : '{}'
          } }
        });
        const updatedItem = result.data.updateHabit;
        const updatedHabits = [...habits];
        updatedHabits[index] = updatedItem;
        setHabits(updatedHabits);
        console.log('Updated habit:', updatedItem);
      } else {
        // Create new habit
        const result = await client.graphql({
          query: createHabit,
          variables: { input: { 
            name: updated.name || 'Untitled Habit',
            icon: updated.icon || '🌟',
            mood: updated.mood || '',
            days: updated.days || [],
            description: updated.description || '',
            time: updated.time || '',
            plan: updated.plan || '',
            log: updated.log ? JSON.stringify(updated.log) : '{}'
          } }
        });
        const newItem = result.data.createHabit;
        setHabits([...habits, newItem]);
        console.log('Created new habit:', newItem);
      }
      setActiveHabit(null);
    } catch (err) {
      console.error('Failed to save habit:', err);
    }
  };
  

  const handleDelete = async (index) => {
    const habit = habits[index];
    try {
      await client.graphql({
        query: deleteHabit,
        variables: { input: { id: habit.id } }
      });
      const updated = [...habits];
      updated.splice(index, 1);
      setHabits(updated);
      setActiveHabit(null);
    } catch (err) {
      console.error('Failed to delete habit:', err);
    }
  };

  const toggleLog = async (i, day) => {
    const updatedHabits = [...habits];
    if (!updatedHabits[i].log) updatedHabits[i].log = {};
    updatedHabits[i].log[day] = !updatedHabits[i].log[day];
    setHabits(updatedHabits);

    try {
      await client.graphql({
        query: updateHabit,
        variables: { input: { id: updatedHabits[i].id, log: JSON.stringify(updatedHabits[i].log) } }
      });
    } catch (err) {
      console.error('Failed to update log:', err);
    }
  };

  return (
    <div className="habit-page">
      <Link to="/choose" title="Back to menu" className="no-underline text-inherit hover:opacity-80">
        <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      </Link>
      <p className="mt-4 italic text-gray-600 text-center">Your habits, your rhythm 🎶</p>

      <div className="habit-tracker">
        {habits.map((habit, i) => (
          <div className="habit-card" key={habit.id || i} onClick={() => setActiveHabit({ ...habit, index: i })}>
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
                    toggleLog(i, day);
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          className="add-btn"
          onClick={() =>
            setActiveHabit({
              name: '',
              icon: '🌟',
              mood: '',
              days: [],
              log: {}
            })
          }
        >＋</button>
      </div>

      {activeHabit && (
        <HabitModal
          habit={activeHabit}
          onClose={() => setActiveHabit(null)}
          onSave={(updated) => saveHabit(updated, activeHabit.index)}
          onDelete={() => handleDelete(activeHabit.index)}
        />
      )}
    </div>
  );
}
