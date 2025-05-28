import React, { useState, useEffect } from "react";
import "./DailyPlan.css";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { generateClient } from 'aws-amplify/api';
import { createDailyTask, updateDailyTask, deleteDailyTask } from './graphql/mutations';
import { listDailyTasks } from './graphql/queries';

const client = generateClient();

export default function DailyPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [input, setInput] = useState("");
  const [timeInputs, setTimeInputs] = useState({});
  const [durationInputs, setDurationInputs] = useState({});
const todayKey = selectedDate.toDateString();
const todayTasks = plans[todayKey] || [];
const completedCount = todayTasks.filter(t => t.done).length;
const progressPercent = todayTasks.length === 0 ? 0 : Math.round((completedCount / todayTasks.length) * 100);

  const currentWeek = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      const result = await client.graphql({
        query: listDailyTasks,
        variables: { filter: { date: { eq: selectedDate.toISOString().split('T')[0] } } }
      });
      const tasks = result.data.listDailyTasks.items.sort((a, b) => a.order - b.order);
      setPlans(prev => ({ ...prev, [selectedDate.toDateString()]: tasks }));
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const handleAdd = async () => {
    const key = selectedDate.toDateString();
    const text = input.trim();
    if (!text) return;

    const newTask = {
      date: selectedDate.toISOString().split('T')[0],
      text,
      time: timeInputs[key] || "",
      duration: durationInputs[key] || "",
      order: (plans[key]?.length || 0),
    };

    try {
      const result = await client.graphql({
        query: createDailyTask,
        variables: { input: newTask }
      });
      const savedTask = result.data.createDailyTask;
      setPlans(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), savedTask]
      }));
      setInput("");
      setTimeInputs(prev => ({ ...prev, [key]: "" }));
      setDurationInputs(prev => ({ ...prev, [key]: "" }));
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleDelete = async index => {
    const key = selectedDate.toDateString();
    const task = plans[key][index];

    try {
      await client.graphql({
        query: deleteDailyTask,
        variables: { input: { id: task.id } }
      });
      const updated = [...plans[key]];
      updated.splice(index, 1);
      setPlans(prev => ({ ...prev, [key]: updated }));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleDragEnd = async result => {
    if (!result.destination) return;
    const key = selectedDate.toDateString();
    const items = Array.from(plans[key]);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setPlans(prev => ({ ...prev, [key]: items }));

    try {
      await Promise.all(items.map((item, idx) =>
        client.graphql({
          query: updateDailyTask,
          variables: { input: { id: item.id, order: idx } }
        })
      ));
      console.log('Order updated');
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center">
      <Link to="/choose" title="Back to menu" className="no-underline text-inherit hover:opacity-80">
        <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      </Link>
      <p className="text-center italic text-[#666] mb-6">
        Balance, intention, and clarity — one day at a time. ✨
      </p>

      <div className="week-selector">
        {currentWeek().map(date => (
          <div
            key={date}
            className={
              "week-day " +
              (date.toDateString() === selectedDate.toDateString()
                ? "selected-day"
                : "")
            }
            onClick={() => setSelectedDate(date)}
          >
            <span className="day-name">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <span className="day-number">{date.getDate()}</span>
          </div>
        ))}
      </div>


      <p className="daily-subtitle mb-4">
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </p>

<div className="progress-bar-container">
  <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
</div>
<p className="progress-text">{progressPercent}% complete</p>

      <div className="task-container">
        <div className="add-plan">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="plan-input"
          />
          <input
            type="time"
            value={timeInputs[selectedDate.toDateString()] || ""}
            onChange={e =>
              setTimeInputs(prev => ({
                ...prev,
                [selectedDate.toDateString()]: e.target.value,
              }))
            }
            className="plan-time"
          />
          <input
            type="text"
            placeholder="e.g. 30 min"
            value={durationInputs[selectedDate.toDateString()] || ""}
            onChange={e =>
              setDurationInputs(prev => ({
                ...prev,
                [selectedDate.toDateString()]: e.target.value,
              }))
            }
            className="plan-duration"
          />
          <button onClick={handleAdd} className="add-btn">
            ＋
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="plan-list">
            {provided => (
              <ul
                className="plan-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {(plans[selectedDate.toDateString()] || []).map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {provided => (
                      <li
                        className="plan-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-content">
                          {item.time && (
                            <span className="task-time">{item.time}</span>
                          )}
                          <span className="task-description">
                            {item.text}
                          </span>
                          {item.duration && (
                            <span className="task-duration">
                              {item.duration}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="delete-btn"
                        >
                          ✕
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
