import React, { useState, useEffect } from 'react';
import './YearlyOverview.css';
import YearlyPopup from './YearlyPopup';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createYearlyGoal, updateYearlyGoal, deleteYearlyGoal } from './graphql/mutations';
import { listYearlyGoals } from './graphql/queries';

const client = generateClient();

export default function YearlyOverview() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [goals, setGoals] = useState(["", "", "", "", ""]);
  const [goalIds, setGoalIds] = useState([null, null, null, null, null]);
  const year = new Date().getFullYear();
  const completedCount = goals.filter(g => g.done).length;
  const progressPercent = Math.round((completedCount / goals.length) * 100);


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const result = await client.graphql({
        query: listYearlyGoals,
        variables: { filter: { year: { eq: year } } }
      });
      const items = result.data.listYearlyGoals.items;
      const goalArray = ["", "", "", "", ""];
      const idArray = [null, null, null, null, null];
      items.forEach(item => {
        goalArray[item.index] = item.title;
        idArray[item.index] = item.id;
      });
      setGoals(goalArray);
      setGoalIds(idArray);
    } catch (err) {
      console.error('Failed to load yearly goals:', err);
    }
  };

  const handleGoalChange = async (index, value) => {
    const updated = [...goals];
    updated[index] = value;
    setGoals(updated);

    const input = {
      year,
      index,
      title: value,
    };

    try {
      if (goalIds[index]) {
        await client.graphql({
          query: updateYearlyGoal,
          variables: { input: { id: goalIds[index], ...input } }
        });
      } else {
        const result = await client.graphql({
          query: createYearlyGoal,
          variables: { input }
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

<div className="progress-bar-container">
  <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
</div>
<p className="progress-text">{progressPercent}% complete</p>

      <div className="yearly-wrapper">
        <div className="goals-box">
          {goals.map((goal, i) => (
            <input
              key={i}
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(i, e.target.value)}
              placeholder={`Goal ${i + 1}`}
              className="goal-input"
            />
          ))}
        </div>

        <div className="calendar-grid">
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
