import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import './LoginWithGoogle.css';
import { createGoogleAuth, updateGoogleAuth } from './graphql/mutations';
import { getGoogleAuth } from './graphql/queries';

const clientId = '632636220479-21mknsckuattniq6u5e8qvt1ktl0ptb4.apps.googleusercontent.com';
const client = generateClient();

function LoginBox({ onLoginSuccess, userId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      console.log('✅ Got Access Token:', accessToken);

      try {
        await fetchAuthSession(); // Ensure identity context
        await client.graphql({
          query: updateGoogleAuth,
          variables: {
            input: { id: userId, token: accessToken },
          },
        });
      } catch {
        await fetchAuthSession();
        await client.graphql({
          query: createGoogleAuth,
          variables: {
            input: { id: userId, token: accessToken },
          },
        });
      }

      setHasToken(true);
      onLoginSuccess?.(accessToken);

      try {
        const res = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
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

  useEffect(() => {
    const fetchAWS = async () => {
      try {
        await fetchAuthSession(); // Ensure auth context is valid
        const res = await client.graphql({
          query: getGoogleAuth,
          variables: { id: userId },
        });
        const token = res.data?.getGoogleAuth?.token;

        if (token) {
          setHasToken(true);
          onLoginSuccess?.(token);
        } else {
          setHasToken(false);
        }
      } catch (err) {
        console.error('Error fetching token from AWS:', err);
      }

      setLoading(false);
    };

    fetchAWS();
  }, [userId, onLoginSuccess]);

  return (
    <div className="login-container">
      <div className="login-box">
        {!hasToken && (
          <>
            <button className="google-login-button" onClick={() => login()}>
              📅 Sign in with Google Calendar
            </button>
            <p className="sync-link">🔄 Sync your Google Calendar to get started.</p>
          </>
        )}

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

export default function LoginWithGoogle({ onLoginSuccess, userId }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginBox onLoginSuccess={onLoginSuccess} userId={userId} />
    </GoogleOAuthProvider>
  );
}
