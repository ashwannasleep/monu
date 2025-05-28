import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listBucketItems, listDailyTasks, listYearlyGoals } from './graphql/queries';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Dashboard.css';

const client = generateClient();

export default function Dashboard() {
  const [bucketProgress, setBucketProgress] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [yearlyProgress, setYearlyProgress] = useState(0);
  const [googleEvents, setGoogleEvents] = useState([]);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: (tokenResponse) => fetchGoogleEvents(tokenResponse.access_token)
  });

  useEffect(() => {
    fetchBucket();
    fetchDaily();
    fetchYearly();
  }, []);

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

  const fetchGoogleEvents = async (token) => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { maxResults: 3, singleEvents: true, orderBy: 'startTime' },
        }
      );
      setGoogleEvents(res.data.items);
    } catch (err) {
      console.error('Google Calendar fetch failed:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <Link
        to="/choose"
        title="Back to menu"
        className="dashboard-header"
      >
        <h1>MONU</h1>
      </Link>

      <div className="dashboard-grid">
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
          <h3>Google Calendar</h3>
          {googleEvents.length === 0 ? (
            <button onClick={login} className="google-sync-btn">
              Sync Google Calendar
            </button>
          ) : (
            <ul className="events-list">
              {googleEvents.map((event) => (
                <li key={event.id}>{event.summary}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}