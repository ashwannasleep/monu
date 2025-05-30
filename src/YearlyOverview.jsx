import React, { useState, useEffect } from 'react';
import './YearlyOverview.css';
import YearlyPopup from './YearlyPopup';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createYearlyGoal, updateYearlyGoal } from './graphql/mutations';
import { listYearlyGoals } from './graphql/queries';

const client = generateClient();

export default function YearlyOverview() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [goals, setGoals] = useState([
    { title: '', done: false },
    { title: '', done: false },
    { title: '', done: false },
    { title: '', done: false },
    { title: '', done: false },
  ]);
  const [goalIds, setGoalIds] = useState([null, null, null, null, null]);
  const year = new Date().getFullYear();

  const completedCount = goals.filter(g => g.done).length;
  const progressPercent = Math.min(completedCount * 20, 100);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const result = await client.graphql({
        query: listYearlyGoals,
        variables: { filter: { year: { eq: year } } },
      });
      const items = result.data.listYearlyGoals.items;
      const updatedGoals = [...goals];
      const updatedIds = [...goalIds];

      items.forEach(item => {
        updatedGoals[item.index] = { title: item.title, done: item.done || false };
        updatedIds[item.index] = item.id;
      });

      setGoals(updatedGoals);
      setGoalIds(updatedIds);
    } catch (err) {
      console.error('Failed to load yearly goals:', err);
    }
  };

  const handleGoalChange = async (index, value) => {
    const updated = [...goals];
    updated[index].title = value;
    setGoals(updated);

    const input = {
      year,
      index,
      title: value,
      done: updated[index].done,
    };

    try {
      if (goalIds[index]) {
        await client.graphql({
          query: updateYearlyGoal,
          variables: { input: { id: goalIds[index], ...input } },
        });
      } else {
        const result = await client.graphql({
          query: createYearlyGoal,
          variables: { input },
        });
        const newId = result.data.createYearlyGoal.id;
        const newIds = [...goalIds];
        newIds[index] = newId;
        setGoalIds(newIds);
      }
    } catch (err) {
      console.error('Failed to save yearly goal:', err);
    }
  };

  const handleToggleDone = async (index) => {
    const updated = [...goals];
    updated[index].done = !updated[index].done;
    setGoals(updated);

    if (!goalIds[index]) return;

    const input = {
      id: goalIds[index],
      year,
      index,
      title: updated[index].title,
      done: updated[index].done,
    };

    try {
      await client.graphql({
        query: updateYearlyGoal,
        variables: { input },
      });
    } catch (err) {
      console.error('Failed to update goal status:', err);
    }
  };

  return (
    <>
      <div className="yearly-header">
        <Link
          to="/choose"
          title="Back to menu"
          className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
        </Link>
        <p className="italic text-gray-600 text-center">Plan your year with intention ✦</p>
      </div>

      <div className="progress-bar-container mt-6 mb-4">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercent}%`,
            backgroundColor:
              progressPercent === 100
                ? '#4caf50'
                : progressPercent >= 50
                ? '#f29e8e'
                : '#6bb6ff',
            boxShadow:
              progressPercent === 100
                ? '0 0 10px #4caf50'
                : progressPercent >= 50
                ? '0 0 8px #f29e8e'
                : '0 0 6px #6bb6ff',
          }}
        />
      </div>
      <p className="progress-text mb-6">{progressPercent}% complete</p>

      <div className="yearly-wrapper">
        <div className="goals-box space-y-3">
          {goals.map((goal, i) => (
            <div key={i} className="goal-row flex items-center">
              <input
                type="text"
                value={goal.title}
                onChange={(e) => handleGoalChange(i, e.target.value)}
                placeholder={`Goal ${i + 1}`}
                className="goal-input"
                style={{ minWidth: '300px' }}
              />
              <input
                type="checkbox"
                checked={goal.done}
                onChange={() => handleToggleDone(i)}
                className="ml-3 w-5 h-5 accent-[#f29e8e]"
              />
            </div>
          ))}
        </div>

        <div className="calendar-grid mt-8">
          {months.map((month) => (
            <div key={month} className="month-card" onClick={() => setSelectedMonth(month)}>
              <h3>{month}</h3>
              <div className="month-calendar">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <span key={day}>{day}</span>
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
      </div>
    </>
  );
}
