import React, { useState, useEffect } from 'react';
import './YearlyOverview.css';
import YearlyPopup from './YearlyPopup';
import { safeSetItem, safeGetItem } from './safeStorage'; 

export default function YearlyOverview() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [goals, setGoals] = useState(["", "", "", "", ""]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const saved = JSON.parse(safeGetItem("monu_yearly_goals")) || null; 
    if (saved) setGoals(saved);
  }, []);

  const handleGoalChange = (index, value) => {
    const updated = [...goals];
    updated[index] = value;
    safeSetItem("monu_yearly_goals", JSON.stringify(updated)); 
    setGoals(updated);
  };

  return (
    <>
      <div className="yearly-header">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">MONU</h1>
        <p className="italic text-gray-600 text-center">Plan your year with intention ✦</p>
      </div>

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
