import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import {
  listBucketItems,
  listDailyTasks,
  listYearlyGoals,
  listFutureGoals
} from './graphql/queries';
import FocusCard from "./FocusCard";
import "./Dashboard.css";

const client = generateClient();

export default function Dashboard() {
  const [bucketProgress, setBucketProgress] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [yearlyProgress, setYearlyProgress] = useState(0);
  const [futureProgress, setFutureProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchBucket(),
        fetchDaily(),
        fetchYearly(),
        fetchFuture(),
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    }
    setLoading(false);
  };

  const fetchBucket = async () => {
    try {
      const res = await client.graphql({
        query: listBucketItems,
        variables: { limit: 50 },
      });
      const items = res.data?.listBucketItems?.items || [];
      
      // Filter out deleted items for consistency
      const activeItems = items.filter(item => !item._deleted);
      const completed = activeItems.filter(item => {
        return item.done === true || item.done === "true";
      }).length;
      
      setBucketProgress(activeItems.length ? Math.round((completed / activeItems.length) * 100) : 0);
    } catch (err) {
      console.error('Error fetching bucket items:', err);
    }
  };

  const fetchDaily = async () => {
    try {
      const res = await client.graphql({
        query: listDailyTasks,
        variables: { limit: 50 },
      });
      const items = res.data?.listDailyTasks?.items || [];
      const today = new Date().toISOString().split("T")[0];
      const todayTasks = items.filter(task => task.date?.split("T")[0] === today && !task._deleted);
      const completed = todayTasks.filter(task => {
        return task.done === true || task.done === "true";
      }).length;
      
      setDailyProgress(todayTasks.length ? Math.round((completed / todayTasks.length) * 100) : 0);
    } catch (err) {
      console.error('Error fetching daily tasks:', err);
    }
  };

  const fetchYearly = async () => {
    try {
      const year = new Date().getFullYear();
      const res = await client.graphql({
        query: listYearlyGoals,
        variables: { filter: { year: { eq: year } } },
      });
      const items = res.data?.listYearlyGoals?.items || [];

      // Create the same 5-slot structure as YearlyOverview
      const goals = [
        { id: null, title: '', done: false, details: '', order: 0 },
        { id: null, title: '', done: false, details: '', order: 1 },
        { id: null, title: '', done: false, details: '', order: 2 },
        { id: null, title: '', done: false, details: '', order: 3 },
        { id: null, title: '', done: false, details: '', order: 4 },
      ];

      // Fill in the goals from database, just like YearlyOverview does
      items.forEach(goal => {
        if (goal.order < goals.length) {
          goals[goal.order] = {
            id: goal.id,
            title: goal.title || '',
            done: goal.done || false,
            details: goal.details || '',
            order: goal.order,
          };
        }
      });

      // Calculate progress exactly like YearlyOverview
      const completed = goals.filter(g => g.done).length;
      const progress = goals.length ? Math.round((completed / goals.length) * 100) : 0;
      
      setYearlyProgress(progress);
    } catch (err) {
      console.error('Error fetching yearly goals:', err);
    }
  };

  const fetchFuture = async () => {
    try {
      const res = await client.graphql({
        query: listFutureGoals,
        variables: { limit: 50 },
      });
      const items = res.data?.listFutureGoals?.items || [];
      
      // Filter out deleted items for consistency
      const activeItems = items.filter(goal => !goal._deleted);
      const completed = activeItems.filter(goal => {
        return goal.done === true || goal.done === "true";
      }).length;
      
      setFutureProgress(activeItems.length ? Math.round((completed / activeItems.length) * 100) : 0);
    } catch (err) {
      console.error('Error fetching future goals:', err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center">
      <Link to="/choose" title="Back to menu" className="no-underline text-inherit hover:opacity-80">
        <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      </Link>

      <p className="mt-4 italic text-gray-600 dark:text-gray-300 text-center">
        Full Progress Overview 🌿
      </p>

      {error && <div className="error-alert">{error}</div>}

      <div className="dashboard-grid w-full mt-8">
        <div className="dashboard-card">
          <h3>Bucket List</h3>
          <p>{bucketProgress}% complete</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${bucketProgress}%`,
                height: '100%',
                backgroundColor: '#f29e8e',
                borderRadius: '9999px'
              }} 
            />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Daily Plan</h3>
          <p>{dailyProgress}% complete</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${dailyProgress}%`,
                height: '100%',
                backgroundColor: '#f29e8e',
                borderRadius: '9999px'
              }} 
            />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Yearly Goals</h3>
          <p>{yearlyProgress}% complete</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${yearlyProgress}%`,
                height: '100%',
                backgroundColor: '#f29e8e',
                borderRadius: '9999px'
              }} 
            />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center">
        <FocusCard />
      </div>

      <div className="dashboard-refresh mt-10">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <button onClick={fetchAllData} className="refresh-btn" title="Refresh Data">
            🔄
          </button>
        )}
      </div>
    </div>
  );
}