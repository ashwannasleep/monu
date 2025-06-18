import React, { useState, useEffect } from 'react';
import './YearlyOverview.css';
import YearlyPopup from './YearlyPopup';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listYearlyGoals } from './graphql/queries';
import { createYearlyGoal, updateYearlyGoal } from './graphql/mutations';

const client = generateClient();

export default function YearlyOverview() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [goals, setGoals] = useState([
    { id: null, title: '', done: false, details: '', order: 0 },
    { id: null, title: '', done: false, details: '', order: 1 },
    { id: null, title: '', done: false, details: '', order: 2 },
    { id: null, title: '', done: false, details: '', order: 3 },
    { id: null, title: '', done: false, details: '', order: 4 },
  ]);

  const year = new Date().getFullYear();
  const completed = goals.filter(g => g.done).length;
  const progress = goals.length ? Math.round((completed / goals.length) * 100) : 0;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchGoalsFromAWS();
  }, []);

  const fetchGoalsFromAWS = async () => {
    try {
      const res = await client.graphql({
        authMode: 'userPool',
        query: listYearlyGoals,
        variables: { filter: { year: { eq: year } } },
      });
      const items = res.data?.listYearlyGoals?.items || [];

      const newGoals = [...goals];
      items.forEach(goal => {
        if (goal.order < newGoals.length) {
          newGoals[goal.order] = {
            id: goal.id,
            title: goal.title || '',
            done: goal.done || false,
            details: goal.details || '',
            order: goal.order,
          };
        }
      });

      setGoals(newGoals);
    } catch (err) {
      console.error('❌ Failed to fetch goals:', err);
    }
  };

  const saveGoal = async (goal, index) => {
    const input = {
      year,
      title: goal.title,
      done: goal.done,
      details: goal.details,
      order: index,
    };

    try {
      if (goal.id) {
        await client.graphql({
          authMode: 'userPool',
          query: updateYearlyGoal,
          variables: { input: { ...input, id: goal.id } },
        });
      } else {
        const result = await client.graphql({
          authMode: 'userPool',
          query: createYearlyGoal,
          variables: { input },
        });
        const newId = result.data?.createYearlyGoal?.id;
        setGoals(prev => {
          const updated = [...prev];
          updated[index].id = newId;
          return updated;
        });
      }
    } catch (err) {
      console.error('❌ Failed to save goal:', err);
    }
  };

  const handleToggle = (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);
    saveGoal(updated[index], index);
  };

  const handleTitleChange = (index, newTitle) => {
    const updated = [...goals];
    updated[index].title = newTitle;
    setGoals(updated);
    saveGoal(updated[index], index);
  };

  return (
    <>
      <div className="yearly-header">
        <Link to="/choose" className="no-underline text-inherit hover:opacity-80">
          <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
        </Link>
        <p className="italic text-gray-600 dark:text-gray-300 text-center">
          Plan your year with intention ✦
        </p>
      </div>

      <div className="progress-bar-container mt-6 mb-4">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: document.documentElement.classList.contains('dark')
              ? '#f7b7a3'
              : '#f29e8e',
          }}
        />
      </div>
      <p className="progress-text mb-6">{progress}% complete</p>

      <div className="goals-card-container">
        {goals.map((goal, i) => (
          <div key={i} className={`goal-card ${goal.done ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={goal.done}
              onChange={() => handleToggle(i)}
              className="goal-checkbox"
            />
            <input
              type="text"
              value={goal.title}
              placeholder={`Goal ${i + 1}`}
              onChange={(e) => handleTitleChange(i, e.target.value)}
              className="goal-text-input"
            />
          </div>
        ))}
      </div>

      <div className="calendar-grid mt-8">
        {months.map(month => (
          <div key={month} className="month-card" onClick={() => setSelectedMonth(month)}>
            <h3>{month}</h3>
            <div className="month-calendar">
              {[...Array(31).keys()].map((_, i) => (
                <span key={i + 1}>{i + 1}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMonth && (
        <YearlyPopup
          month={selectedMonth.slice(0, 3)}
          onClose={() => setSelectedMonth(null)}
        />
      )}
    </>
  );
}
