import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MonthlyPlanner.css';
import { Link } from 'react-router-dom';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

function getDateRange(view, date) {
  if (view === 'month') {
    return [
      new Date(date.getFullYear(), date.getMonth(), 1),
      new Date(date.getFullYear(), date.getMonth() + 1, 0),
    ];
  } else if (view === 'week') {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return [start, end];
  } else if (view === 'day') {
    return [date, date];
  }
}

function CustomToolbar(props) {
  const { view, onView } = props;
  return (
    <div className="custom-toolbar">
      <div className="view-switcher">
        {['month', 'week', 'day'].map((v) => (
          <button
            key={v}
            className={`view-btn ${view === v ? 'active' : ''}`}
            onClick={() => onView(v)}
          >
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: (tokenResponse) => {
      setGoogleToken(tokenResponse.access_token);
    }
  });

  useEffect(() => {
    if (!googleToken) return;

    const [startDate, endDate] = getDateRange(currentView, currentDate);

    const fetchGoogleEvents = async () => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: { Authorization: `Bearer ${googleToken}` },
            params: {
              timeMin: startDate.toISOString(),
              timeMax: endDate.toISOString(),
              showDeleted: false,
              singleEvents: true,
              orderBy: 'startTime',
            },
          }
        );

        const mappedEvents = res.data.items.map((event) => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
        }));

        setEvents(mappedEvents);
      } catch (err) {
        console.error('Failed to load Google Calendar events', err);
      }
    };

    fetchGoogleEvents();
  }, [googleToken, currentDate, currentView]);

  const handleCreateEvent = ({ start, end }) => {
    const title = window.prompt('Enter event title');
    if (!title || !googleToken) return;

    const newEvent = {
      summary: title,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        const addedEvent = {
          id: res.data.id,
          title,
          start,
          end,
        };
        setEvents((prev) => [...prev, addedEvent]);
      })
      .catch((err) => {
        console.error('Failed to create event:', err);
        alert('Could not create event on Google Calendar');
      });
  };

  const handleEventClick = (event) => {
    const action = window.prompt('Type "edit" to rename or "delete" to remove');
    if (!action || !googleToken) return;

    if (action.toLowerCase() === 'edit') {
      const newTitle = window.prompt('New event title', event.title);
      if (newTitle) {
        axios.patch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
          { summary: newTitle },
          {
            headers: {
              Authorization: `Bearer ${googleToken}`,
              'Content-Type': 'application/json',
            },
          }
        ).then(() => {
          setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, title: newTitle } : e));
        });
      }
    } else if (action.toLowerCase() === 'delete') {
      axios.delete(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`,
        {
          headers: { Authorization: `Bearer ${googleToken}` },
        }
      ).then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
      });
    }
  };

    
  return (
    <>
      <div className="heading-box w-full flex flex-col items-center text-center pt-12">
      <Link
  to="/choose"
  title="Back to menu"
  className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
>
  <h1 className="text-4xl font-serif font-bold mb-2">
    MONU
  </h1>
</Link>
  <p className="mt-4 italic text-gray-600">
    Root in the rhythm of now.
  </p>
</div>

  
      <div className="monthly-wrapper">
        {!googleToken && (
          <button onClick={login} className="google-sync-btn">
            Sync Google Calendar
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
            onNavigate={(date) => setCurrentDate(date)}
            onView={(view) => setCurrentView(view)}
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