import React, { useState, useEffect } from 'react';
import './YearlyPopup.css';
import { generateClient } from 'aws-amplify/api';
import {
  listYearlyPopupTasks,
} from './graphql/queries';
import {
  createYearlyPopupTask,
  deleteYearlyPopupTask,
  updateYearlyPopupTask
} from './graphql/mutations';

const client = generateClient();

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
    const fetchTasksFromAWS = async () => {
      try {
        const result = await client.graphql({
          query: listYearlyPopupTasks,
          variables: { filter: { month: { eq: month } } },
        });
        const items = result.data.listYearlyPopupTasks.items;
        const toDo = items.filter(item => !item.done);
        const done = items.filter(item => item.done);
        setTasks({ toDo, done });
      } catch (err) {
        console.error('Failed to fetch from AWS:', err);
      }
    };

    fetchTasksFromAWS();
  }, [month]);

  const handleCalendarClick = (day) => {
    const paddedMonth = String(monthIndex + 1).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    const formatted = `${currentYear}-${paddedMonth}-${paddedDay}`;
    setSelectedDate(formatted);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await client.graphql({
        query: createYearlyPopupTask,
        variables: {
          input: {
            month,
            title: newTask,
            date: selectedDate || null,
            time: selectedTime || null,
            done: false,
          },
        },
      });
      const savedTask = res.data.createYearlyPopupTask;
      setTasks(prev => ({ ...prev, toDo: [...prev.toDo, savedTask] }));
      setNewTask('');
      setSelectedDate('');
      setSelectedTime('');
    } catch (err) {
      console.error('Failed to add task to AWS:', err);
    }
  };

  const completeTask = async (i) => {
    const task = tasks.toDo[i];
    try {
      await client.graphql({
        query: updateYearlyPopupTask,
        variables: { input: { id: task.id, done: true } },
      });
      setTasks(prev => {
        const newToDo = [...prev.toDo];
        newToDo.splice(i, 1);
        return { toDo: newToDo, done: [...prev.done, { ...task, done: true }] };
      });
    } catch (err) {
      console.error('Failed to mark task done:', err);
    }
  };

  const deleteTask = async (i, type) => {
    const task = tasks[type][i];
    try {
      await client.graphql({
        query: deleteYearlyPopupTask,
        variables: { input: { id: task.id } },
      });
      setTasks(prev => {
        const updated = [...prev[type]];
        updated.splice(i, 1);
        return { ...prev, [type]: updated };
      });
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
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
                <li key={task.id}>
                  <span>{task.title}</span>
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
                <li key={task.id}>
                  <span>{task.title}</span>
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