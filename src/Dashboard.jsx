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
      await fetchBucket();
      await fetchDaily();
      await fetchYearly();
      await fetchFuture();
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    }
    setLoading(false);
  };

  const fetchBucket = async () => {
    try {
      const res = await client.graphql({ query: listBucketItems });
      const items = res.data?.listBucketItems?.items || [];
      const completed = items.filter(item => item.done).length;
      setBucketProgress(items.length ? Math.round((completed / items.length) * 100) : 0);
    } catch (err) {
      console.error('Error fetching bucket items:', err);
    }
  };

  const fetchDaily = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      const today = new Date().toISOString().split("T")[0];
      const todayTasks = items.filter(task => task.date?.split("T")[0] === today && !task._deleted);
      const completed = todayTasks.filter(task => task.done).length;
      setDailyProgress(todayTasks.length ? Math.round((completed / todayTasks.length) * 100) : 0);
    } catch (err) {
      console.error('Error fetching daily tasks:', err);
    }
  };

   const fetchYearly = async () => {
  try {
    const res = await client.graphql({ query: listYearlyGoals });
    const items = res.data?.listYearlyGoals?.items || [];
    const completed = items.filter(goal => goal.done).length;
    setYearlyProgress(items.length ? Math.round((completed / items.length) * 100) : 0);
  } catch (err) {
    console.error('Error fetching yearly goals:', err);
  }
};





  const fetchFuture = async () => {
    try {
      const res = await client.graphql({ query: listFutureGoals });
      const items = res.data?.listFutureGoals?.items || [];
      const completed = items.filter(goal => goal.done).length;
      setFutureProgress(items.length ? Math.round((completed / items.length) * 100) : 0);
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
            {bucketProgress > 0 && (
              <div className="progress-fill" style={{ width: `${bucketProgress}%` }} />
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Daily Plan</h3>
          <p>{dailyProgress}% complete</p>
          <div className="progress-bar">
            {dailyProgress > 0 && (
              <div className="progress-fill" style={{ width: `${dailyProgress}%` }} />
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Yearly Goals</h3>
          <p>{yearlyProgress}% complete</p>
          <div className="progress-bar">
            {yearlyProgress > 0 && (
              <div className="progress-fill" style={{ width: `${yearlyProgress}%` }} />
            )}
          </div>
        </div>
      </div>

      {/* ➕ FocusCard block */}
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
