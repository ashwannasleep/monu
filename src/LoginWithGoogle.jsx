import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import './LoginWithGoogle.css';

const clientId = '632636220479-21mknsckuattniq6u5e8qvt1ktl0ptb4.apps.googleusercontent.com';

function LoginBox({ onLoginSuccess }) {
  const [events, setEvents] = useState([]);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      console.log('✅ Got Access Token:', accessToken);
      onLoginSuccess?.(accessToken);

      // Fetch calendar events
      try {
        const res = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err) {
        console.error('Failed to load calendar:', err);
      }
    },
    onError: () => alert('❌ Login failed'),
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="google-login-button" onClick={() => login()}>
          📅 Sign in with Google Calendar
        </button>
        <p className="sync-link">🔄 Sync your Google Calendar to get started.</p>

        {events.length > 0 && (
          <div className="event-box">
            <h3>📌 Upcoming Events</h3>
            <ul>
              {events.map((e) => (
                <li key={e.id}>
                  <strong>{e.summary}</strong> <br />
                  {e.start.dateTime || e.start.date}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginWithGoogle({ onLoginSuccess }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginBox onLoginSuccess={onLoginSuccess} />
    </GoogleOAuthProvider>
  );
}
