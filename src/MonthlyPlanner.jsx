import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MonthlyPlanner.css';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { getGoogleAuth } from './graphql/queries';
import { createGoogleAuth, deleteGoogleAuth, createMonthlyEvent } from './graphql/mutations';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }), getDay, locales });
const client = generateClient();

function getDateRange(view, date) {
  if (view === 'month') return [new Date(date.getFullYear(), date.getMonth(), 1), new Date(date.getFullYear(), date.getMonth() + 1, 0)];
  if (view === 'week') {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return [start, end];
  }
  return [date, date];
}

function CustomToolbar({ view, onView }) {
  return (
    <div className="custom-toolbar">
      <div className="view-switcher">
        {['month', 'week', 'day'].map(v => (
          <button key={v} className={`view-btn ${view === v ? 'active' : ''}`} onClick={() => onView(v)}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MonthlyPlanner() {
  const [events, setEvents] = useState([]);
  const [googleToken, setGoogleToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  useEffect(() => {
    const loadUserId = async () => {
      const user = await getCurrentUser();
      setUserId(user?.username);
    };
    loadUserId();
  }, []);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      setGoogleToken(token);
      try {
        await client.graphql({
          authMode: 'userPool',
          query: createGoogleAuth,
          variables: { input: { id: userId, token } },
        });
      } catch (err) {
        console.error('Failed to save token to AWS:', err);
      }
    },
    onError: () => alert('❌ Google login failed'),
  });

  const unsyncCalendar = async () => {
    try {
      await client.graphql({
        authMode: 'userPool',
        query: deleteGoogleAuth,
        variables: { input: { id: userId } },
      });
    } catch (err) {
      console.error('❌ Failed to unsync:', err);
    }
    setGoogleToken(null);
    setEvents([]);
  };

  useEffect(() => {
    if (!userId || tokenLoaded || googleToken) return;
    const loadTokenFromAWS = async () => {
      try {
        const res = await client.graphql({
          authMode: 'userPool',
          query: getGoogleAuth,
          variables: { id: userId },
        });
        const token = res.data?.getGoogleAuth?.token;
        if (token) setGoogleToken(token);
      } catch {
        console.warn('No token found in AWS');
      } finally {
        setTokenLoaded(true);
      }
    };
    loadTokenFromAWS();
  }, [userId, googleToken, tokenLoaded]);

  useEffect(() => {
    if (!googleToken) return;
    const [startDate, endDate] = getDateRange(currentView, currentDate);
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: { Authorization: `Bearer ${googleToken}` },
            params: {
              timeMin: startDate.toISOString(),
              timeMax: endDate.toISOString(),
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );
        const mapped = res.data.items.map(e => ({
          id: e.id,
          title: e.summary || 'No Title',
          start: new Date(e.start.dateTime || `${e.start.date}T00:00:00`),
          end: new Date(e.end.dateTime || `${e.end.date}T23:59:59`),
          allDay: !!e.start.date,
        }));
        setEvents(mapped);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };
    fetchEvents();
  }, [googleToken, currentDate, currentView]);

  const handleCreateEvent = ({ start, end }) => {
    const title = window.prompt('Event title?');
    if (!title || !googleToken) return;
    axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      { summary: title, start: { dateTime: start.toISOString() }, end: { dateTime: end.toISOString() } },
      { headers: { Authorization: `Bearer ${googleToken}` } }
    ).then(async (res) => {
      const newEvent = { id: res.data.id, title, start, end };
      setEvents((prev) => [...prev, newEvent]);
      try {
        await client.graphql({
          authMode: 'userPool',
          query: createMonthlyEvent,
          variables: {
            input: {
              title,
              start: start.toISOString(),
              end: end.toISOString(),
            },
          },
        });
      } catch (err) {
        console.error('AWS save failed', err);
      }
    });
  };

  const handleEventClick = (event) => {
    const action = window.prompt('Type "edit" or "delete"');
    if (action?.toLowerCase() === 'edit') {
      const newTitle = window.prompt('New title:', event.title);
      if (!newTitle) return;
      axios.patch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
        { summary: newTitle },
        { headers: { Authorization: `Bearer ${googleToken}` } }
      ).then(() => {
        setEvents((prev) => prev.map(e => e.id === event.id ? { ...e, title: newTitle } : e));
      });
    } else if (action?.toLowerCase() === 'delete') {
      axios.delete(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
        { headers: { Authorization: `Bearer ${googleToken}` } }
      ).then(() => {
        setEvents((prev) => prev.filter(e => e.id !== event.id));
      });
    }
  };

  return (
    <>
      <div className="heading-box w-full flex flex-col items-center text-center pt-12">
        <Link to="/choose" className="no-underline text-inherit hover:opacity-80 transition cursor-pointer">
          <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
        </Link>
        <p className="mt-4 italic text-gray-600">Root in the rhythm of now.</p>
      </div>

      <div className="monthly-wrapper">
        {!googleToken ? (
          <button onClick={login} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded mb-6">
            Sync Google Calendar
          </button>
        ) : (
          <button onClick={unsyncCalendar} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded mb-6">
            Unsync Google Calendar
          </button>
        )}

        <div className="calendar-large">
          <Calendar
            localizer={localizer}
            events={events}
            views={['month', 'week', 'day']}
            view={currentView}
            defaultView="month"
            defaultDate={currentDate}
            onNavigate={setCurrentDate}
            onView={setCurrentView}
            selectable
            onSelectSlot={handleCreateEvent}
            onSelectEvent={handleEventClick}
            style={{ height: '80vh' }}
            components={{ toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </>
  );
}
