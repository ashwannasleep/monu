import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';
import {
  listBucketItems,
  listDailyTasks,
  listYearlyGoals,
  listFutureGoals
} from './graphql/queries';
import "./Dashboard.css";

const client = generateClient();

export default function Dashboard() {
  const [bucketProgress, setBucketProgress] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [yearlyProgress, setYearlyProgress] = useState(0);
  const [futureProgress, setFutureProgress] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetchBucket();
    fetchDaily();
    fetchYearly();
    fetchFuture();
    checkOverdueTasks();
  };

  const fetchBucket = async () => {
    try {
      const res = await client.graphql({ query: listBucketItems });
      const items = res.data.listBucketItems.items;
      const completed = items.filter(item => item.done).length;
      const progress = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);
      setBucketProgress(progress);
    } catch (err) {
      console.error('Bucket fetch failed:', err);
    }
  };

  const fetchDaily = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data.listDailyTasks.items;
      const completed = items.filter(task => task.done).length;
      const progress = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);
      setDailyProgress(progress);
    } catch (err) {
      console.error('Daily fetch failed:', err);
    }
  };

  const fetchYearly = async () => {
    try {
      const res = await client.graphql({ query: listYearlyGoals });
      const items = res.data.listYearlyGoals.items;
      const completed = items.filter(goal => goal.completed).length;
      const progress = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);
      setYearlyProgress(progress);
    } catch (err) {
      console.error('Yearly fetch failed:', err);
    }
  };

  const fetchFuture = async () => {
    try {
      const res = await client.graphql({ query: listFutureGoals });
      const items = res.data.listFutureGoals.items;
      const completed = items.filter(goal => goal.done).length;
      const progress = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);
      setFutureProgress(progress);
    } catch (err) {
      console.error('Future goals fetch failed:', err);
    }
  };

  const checkOverdueTasks = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data.listDailyTasks.items;
      const today = new Date();
      const overdue = items.filter(task => {
        const taskDate = new Date(task.date);
        return !task.done && taskDate < today;
      });
      setOverdueTasks(overdue.length);
    } catch (err) {
      console.error('Overdue check failed:', err);
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

      {overdueTasks > 0 && (
        <div className="overdue-alert">
          ⚠ You have {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}!
        </div>
      )}

      <div className="dashboard-grid w-full mt-8">
        <div className="dashboard-card">
          <h3>Bucket List</h3>
          <p>{bucketProgress}% complete</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${bucketProgress}%` }} />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Daily Plan</h3>
          <p>{dailyProgress}% complete</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${dailyProgress}%` }} />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Yearly Goals</h3>
          <p>{yearlyProgress}% complete</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${yearlyProgress}%` }} />
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Future Vision</h3>
          <p>{futureProgress}% complete</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${futureProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="dashboard-refresh mt-8">
        <button onClick={fetchAllData} className="refresh-btn">
          🔄
        </button>
      </div>
    </div>
  );
}
