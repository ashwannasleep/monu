import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getUserSettings } from './graphql/queries';
import { createUserSettings, updateUserSettings } from './graphql/mutations';

const client = generateClient();

export default function ThemeToggle({ userId }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const applyStoredTheme = async () => {
      const local = localStorage.getItem('theme');

      // ✅ If theme is already in localStorage, apply it
      if (local === 'dark' || local === 'light') {
        setDarkMode(local === 'dark');
        document.documentElement.classList.toggle('dark', local === 'dark');
        return;
      }

      // ✅ Otherwise, try to fetch from AWS
      try {
        const res = await client.graphql({
          query: getUserSettings,
          variables: { id: userId },
        });

        const theme = res.data?.getUserSettings?.theme;

        if (theme === 'dark' || theme === 'light') {
          setDarkMode(theme === 'dark');
          document.documentElement.classList.toggle('dark', theme === 'dark');
          localStorage.setItem('theme', theme);
        }
      } catch (err) {
        console.warn('Could not fetch theme from AWS:', err);
      }
    };

    applyStoredTheme();
  }, [userId]);

  const toggleTheme = async () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');

    try {
      await client.graphql({
        query: updateUserSettings,
        variables: {
          input: {
            id: userId,
            theme: newDark ? 'dark' : 'light',
          },
        },
      });
    } catch (err) {
      try {
        await client.graphql({
          query: createUserSettings,
          variables: {
            input: {
              id: userId,
              theme: newDark ? 'dark' : 'light',
            },
          },
        });
      } catch (err2) {
        console.error('Failed to save theme to AWS:', err2);
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-[70px] bg-transparent border-none focus:outline-none transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
