import React, { useState, useEffect } from "react";
import "./DailyPlan.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { safeSetItem, safeGetItem } from "./safeStorage"; 

export default function DailyPlan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [input, setInput] = useState("");
  const [timeInputs, setTimeInputs] = useState({});
  const [durationInputs, setDurationInputs] = useState({});

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
    const saved = JSON.parse(safeGetItem("monu_daily_plans")) || {}; 
    setPlans(saved);
  }, []);

  useEffect(() => {
    safeSetItem("monu_daily_plans", JSON.stringify(plans)); 
  }, [plans]);

  const handleAdd = () => {
    const task = {
      text: input.trim(),
      time: timeInputs[selectedDate.toDateString()] || "",
      duration: durationInputs[selectedDate.toDateString()] || "",
    };
    if (!task.text) return;
    const key = selectedDate.toDateString();
    const updated = {
      ...plans,
      [key]: [...(plans[key] || []), task],
    };
    setPlans(updated);
    setInput("");
    setTimeInputs({ ...timeInputs, [key]: "" });
    setDurationInputs({ ...durationInputs, [key]: "" });
  };

  const handleEdit = (index, field, value) => {
    const key = selectedDate.toDateString();
    const updated = [...plans[key]];
    updated[index][field] = value;
    setPlans({ ...plans, [key]: updated });
  };

  const handleDelete = (index) => {
    const key = selectedDate.toDateString();
    const updated = [...plans[key]];
    updated.splice(index, 1);
    setPlans({ ...plans, [key]: updated });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const key = selectedDate.toDateString();
    const reordered = Array.from(plans[key]);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setPlans({ ...plans, [key]: reordered });
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#3A3A3A] px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      <p className="text-center italic text-[#666] mb-6">Balance, intention, and clarity — one day at a time.  ✨</p>

      <div className="week-selector">
        {currentWeek().map((date) => (
          <div
            key={date}
            className={`week-day ${date.toDateString() === selectedDate.toDateString() ? "selected-day" : ""}`}
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

      <div className="plan-box w-full max-w-md">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="plan-list">
            {(provided) => (
              <ul
                className="plan-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {(plans[selectedDate.toDateString()] || []).map((item, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided) => (
                      <li
                        className="plan-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleEdit(index, "text", e.target.value)}
                          className="plan-input"
                        />
                        <input
                          type="time"
                          value={item.time || ""}
                          onChange={(e) => handleEdit(index, "time", e.target.value)}
                          className="plan-time"
                        />
                        <input
                          type="text"
                          placeholder="e.g. 30 min"
                          value={item.duration || ""}
                          onChange={(e) => handleEdit(index, "duration", e.target.value)}
                          className="plan-duration"
                        />
                        <button onClick={() => handleDelete(index)} className="delete-btn">
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

        <div className="add-plan">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="plan-input"
          />
          <input
            type="time"
            value={timeInputs[selectedDate.toDateString()] || ""}
            onChange={(e) =>
              setTimeInputs({ ...timeInputs, [selectedDate.toDateString()]: e.target.value })
            }
            className="plan-time"
          />
          <input
            type="text"
            placeholder="e.g. 30 min"
            value={durationInputs[selectedDate.toDateString()] || ""}
            onChange={(e) =>
              setDurationInputs({ ...durationInputs, [selectedDate.toDateString()]: e.target.value })
            }
            className="plan-duration"
          />
          <button onClick={handleAdd} className="add-btn">＋</button>
        </div>
      </div>
    </div>
  );
}
