import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listDailyTasks } from './graphql/queries';

const client = generateClient();
const today = new Date().toISOString().split('T')[0];

export default function FocusCard() {
  const [todayTasks, setTodayTasks] = useState([]);
  const [glimpse, setGlimpse] = useState([]);
  const [stats, setStats] = useState({ done: 0, total: 0 });

  useEffect(() => {
    fetchTodayFocus();
    fetchComingUp();
    fetchStats();
  }, []);

  const fetchTodayFocus = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      const tasks = items.filter(t => t.date === today && !t._deleted);
      setTodayTasks(tasks);
    } catch (err) {
      console.error("Failed to fetch today's tasks:", err);
    }
  };

  const fetchComingUp = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      const upcoming = items
        .filter(t => t.date > today && !t.done && !t._deleted)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3);
      setGlimpse(upcoming);
    } catch (err) {
      console.error("Failed to fetch coming up tasks:", err);
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
        return diff >= 0 && diff < 7 && !t._deleted;
      });
      const done = thisWeek.filter(t => t.done).length;
      setStats({ done, total: thisWeek.length });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="dashboard-card w-full max-w-6xl">
      <div className="flex gap-8">
        
        {/* Focus - Left */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Today's Focus</h3>
          {todayTasks.length === 0 ? (
            <p className="text-sm italic text-gray-500">No tasks for today.</p>
          ) : (
            <ul className="space-y-2">
              {todayTasks.map(task => (
                <li key={task.id} className="flex items-start">
                  <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className={`text-sm leading-relaxed ${
                    task.done 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-800 dark:text-gray-100'
                  }`}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-4">Coming Up</h4>
          {glimpse.length === 0 ? (
            <p className="text-sm italic text-gray-500">No upcoming tasks.</p>
          ) : (
            <ul className="space-y-2">
              {glimpse.map(task => (
                <li key={task.id} className="flex items-start">
                  <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{task.date}:</span> {task.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

       
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-4">Weekly Stats</h4>
          <div className="flex flex-col items-center">
            
            <div className="relative w-24 h-24 mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                  className="dark:stroke-gray-600"
                />
                
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f29e8e"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
             
            
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              {stats.done} of {stats.total} daily tasks completed this week
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}