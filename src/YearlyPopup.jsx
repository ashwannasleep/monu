import React, { useState, useEffect } from 'react';
import './YearlyPopup.css';

export default function YearlyPopup({ month, onClose }) {
  const [tasks, setTasks] = useState({ toDo: [], done: [] });
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const currentYear = new Date().getFullYear();

  const monthIndex = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].indexOf(month);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`monu_tasks_${month}`));
    if (saved) setTasks(saved);
  }, [month]);

  useEffect(() => {
    localStorage.setItem(`monu_tasks_${month}`, JSON.stringify(tasks));
  }, [tasks, month]);

  const handleCalendarClick = (day) => {
    const paddedMonth = String(monthIndex + 1).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    const formatted = `${currentYear}-${paddedMonth}-${paddedDay}`;
    setSelectedDate(formatted);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = `${newTask}${selectedDate ? ` (${selectedDate}${selectedTime ? ` ${selectedTime}` : ''})` : ''}`;
    setTasks({ ...tasks, toDo: [...tasks.toDo, task] });
    setNewTask('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const completeTask = (i) => {
    const updatedToDo = [...tasks.toDo];
    const item = updatedToDo.splice(i, 1)[0];
    setTasks({ toDo: updatedToDo, done: [...tasks.done, item] });
  };

  const deleteTask = (i, type) => {
    const updated = [...tasks[type]];
    updated.splice(i, 1);
    setTasks({ ...tasks, [type]: updated });
  };

  const renderMiniCalendar = () => {
    const date = new Date(currentYear, monthIndex, 1);
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    const firstDay = date.getDay();
    const weeks = [];
    let day = 1 - firstDay;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (day < 1 || day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          week.push(
            <td key={j} onClick={() => handleCalendarClick(day)} className="hoverable-day">
              {day}
            </td>
          );
        }
        day++;
      }
      weeks.push(<tr key={i}>{week}</tr>);
    }

    return (
      <table className="mini-calendar">
        <thead>
          <tr>{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    );
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{month} {currentYear}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {renderMiniCalendar()}

        <div className="popup-inputs">
          <input
            type="text"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          <button onClick={addTask}>＋</button>
        </div>

        <div className="popup-sections">
          <div className="task-card">
            <h3>To Do</h3>
            <ul>
              {tasks.toDo.map((task, i) => (
                <li key={i}>
                  <span>{task}</span>
                  <div className="btns">
                    <button onClick={() => completeTask(i)}>✔</button>
                    <button onClick={() => deleteTask(i, 'toDo')}>✕</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="task-card completed">
            <h3>Completed</h3>
            <ul>
              {tasks.done.map((task, i) => (
                <li key={i}>
                  <span>{task}</span>
                  <button onClick={() => deleteTask(i, 'done')}>✕</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
