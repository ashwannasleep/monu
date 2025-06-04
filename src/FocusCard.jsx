import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import {
  listFocusTasks,
  listDailyTasks
} from './graphql/queries';
import {
  createFocusTask,
  updateFocusTask,
  deleteFocusTask
} from './graphql/mutations';

const client = generateClient();
const today = new Date().toISOString().split('T')[0];

export default function FocusCard() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [glimpse, setGlimpse] = useState([]);
  const [stats, setStats] = useState({ done: 0, total: 0 });

  useEffect(() => {
    fetchFocusTasks();
    fetchCalendarGlimpse();
    fetchStats();
  }, []);

  const fetchFocusTasks = async () => {
    try {
      const res = await client.graphql({ query: listFocusTasks });
      const items = res.data?.listFocusTasks?.items || [];
      const todayTasks = items.filter(t => t.date === today);
      setTasks(todayTasks);
    } catch (err) {
      console.error("Fetch focus tasks failed:", err);
    }
  };

  const fetchCalendarGlimpse = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      const upcoming = items.filter(t => t.date > today && !t.done)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3);
      setGlimpse(upcoming);
    } catch (err) {
      console.error("Calendar glimpse fetch failed:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      const thisWeek = items.filter(t => {
        const date = new Date(t.date);
        const now = new Date();
        const diff = (now - date) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff < 7;
      });
      const done = thisWeek.filter(t => t.done).length;
      setStats({ done, total: thisWeek.length });
    } catch (err) {
      console.error("Stats fetch failed:", err);
    }
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    try {
      const res = await client.graphql({
        query: createFocusTask,
        variables: {
          input: { title: input.trim(), date: today, done: false }
        },
      });
      const newTask = res.data?.createFocusTask;
      setTasks([...tasks, newTask]);
      setInput('');
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await client.graphql({
        query: updateFocusTask,
        variables: {
          input: {
            id: task.id,
            title: task.title,
            date: task.date,
            done: !task.done,
          },
        },
      });
      const updated = res.data?.updateFocusTask;
      setTasks(tasks.map(t => t.id === updated.id ? updated : t));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await client.graphql({
        query: deleteFocusTask,
        variables: { input: { id } },
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="dashboard-card mt-10 mb-10">
      <h3>Today's Focus</h3>

      <ul className="list-disc list-inside text-gray-800 dark:text-gray-100 mb-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center">
            <span className={task.done ? 'line-through text-gray-400' : ''}>{task.title}</span>
            <div className="flex gap-2">
              <button onClick={() => handleToggle(task)} className="text-green-600 text-sm">✔️</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-500 text-sm">✕</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 mt-4">
  <input
    value={input}
    onChange={e => setInput(e.target.value)}
    placeholder="Add a focus task..."
    className="flex-1 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
  />
  <button
    onClick={handleAdd}
    className="whitespace-nowrap px-4 py-2 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
  >
    Add
  </button>
</div>


      <div className="mt-6">
        <h4>Coming Up</h4>
        {glimpse.length === 0 ? (
          <p className="text-sm italic">No upcoming tasks.</p>
        ) : (
          <ul className="text-sm list-disc list-inside">
            {glimpse.map(task => (
              <li key={task.id}>{task.date}: {task.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h4>Weekly Stats</h4>
        <p className="text-sm">
          {stats.done} of {stats.total} daily tasks completed this week
        </p>
      </div>
    </div>
  );
}
