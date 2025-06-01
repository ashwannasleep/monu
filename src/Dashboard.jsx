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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    // Reset all progress to 0 before fetching
    setBucketProgress(0);
    setDailyProgress(0);
    setYearlyProgress(0);
    setFutureProgress(0);
    setOverdueTasks(0);
    
    try {
      // Fetch all data sequentially to ensure proper loading
      await fetchBucket();
      await fetchDaily();
      await fetchYearly();
      await fetchFuture();
      await checkOverdueTasks();
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
      console.log('Bucket items:', items);
      if (items.length === 0) {
        setBucketProgress(0);
        return;
      }
      const completed = items.filter(item => item.done === true).length;
      const progress = Math.round((completed / items.length) * 100);
      console.log('Bucket progress:', progress);
      setBucketProgress(progress);
    } catch (err) {
      console.error('Error fetching bucket items:', err);
      setBucketProgress(0);
    }
  };

  const fetchDaily = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      console.log('All daily tasks:', items);
      if (items.length === 0) {
        setDailyProgress(0);
        return;
      }
      
      // Get today's date in local timezone
      const today = new Date();
      const todayString = today.getFullYear() + '-' + 
                         String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(today.getDate()).padStart(2, '0');
      
      // Filter for today's tasks only
      const todayTasks = items.filter(task => task.date === todayString);
      console.log('Today tasks:', todayTasks, 'Today date:', todayString);
      
      if (todayTasks.length === 0) {
        setDailyProgress(0);
        return;
      }
      
      const completed = todayTasks.filter(task => task.done === true).length;
      const progress = Math.round((completed / todayTasks.length) * 100);
      console.log('Daily progress:', progress);
      setDailyProgress(progress);
    } catch (err) {
      console.error('Error fetching daily tasks:', err);
      setDailyProgress(0);
    }
  };

  const fetchYearly = async () => {
    try {
      const res = await client.graphql({ query: listYearlyGoals });
      const items = res.data?.listYearlyGoals?.items || [];
      console.log('Yearly goals:', items);
      if (items.length === 0) {
        setYearlyProgress(0);
        return;
      }
      const completed = items.filter(goal => goal.completed === true).length;
      const progress = Math.round((completed / items.length) * 100);
      console.log('Yearly progress:', progress);
      setYearlyProgress(progress);
    } catch (err) {
      console.error('Error fetching yearly goals:', err);
      setYearlyProgress(0);
    }
  };

  const fetchFuture = async () => {
    try {
      const res = await client.graphql({ query: listFutureGoals });
      const items = res.data?.listFutureGoals?.items || [];
      console.log('Future goals:', items);
      if (items.length === 0) {
        setFutureProgress(0);
        return;
      }
      const completed = items.filter(goal => goal.done === true).length;
      const progress = Math.round((completed / items.length) * 100);
      console.log('Future progress:', progress);
      setFutureProgress(progress);
    } catch (err) {
      console.error('Error fetching future goals:', err);
      setFutureProgress(0);
    }
  };

  const checkOverdueTasks = async () => {
    try {
      const res = await client.graphql({ query: listDailyTasks });
      const items = res.data?.listDailyTasks?.items || [];
      
      if (items.length === 0) {
        setOverdueTasks(0);
        return;
      }
      
      // Get today's date in local timezone
      const today = new Date();
      const todayString = today.getFullYear() + '-' + 
                         String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(today.getDate()).padStart(2, '0');
      
      const overdue = items.filter(task => {
        // Skip if task is done or has no date
        if (task.done === true || !task.date) return false;
        
        // Only count as overdue if date is strictly before today
        return task.date < todayString;
      });
      
      console.log('Overdue check:', { 
        todayString, 
        totalTasks: items.length, 
        overdueCount: overdue.length,
        overdueTasks: overdue 
      });
      setOverdueTasks(overdue.length);
    } catch (err) {
      console.error('Error checking overdue tasks:', err);
      setOverdueTasks(0);
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

      {error && (
        <div className="error-alert">
          {error}
        </div>
      )}

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
            {bucketProgress > 0 && (
              <div 
                className="progress-fill" 
                style={{ width: `${bucketProgress}%` }}
              />
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Daily Plan</h3>
          <p>{dailyProgress}% complete</p>
          <div className="progress-bar">
            {dailyProgress > 0 && (
              <div 
                className="progress-fill" 
                style={{ width: `${dailyProgress}%` }}
              />
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Yearly Goals</h3>
          <p>{yearlyProgress}% complete</p>
          <div className="progress-bar">
            {yearlyProgress > 0 && (
              <div 
                className="progress-fill" 
                style={{ width: `${yearlyProgress}%` }}
              />
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Future Vision</h3>
          <p>{futureProgress}% complete</p>
          <div className="progress-bar">
            {futureProgress > 0 && (
              <div 
                className="progress-fill" 
                style={{ width: `${futureProgress}%` }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-refresh mt-8">
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