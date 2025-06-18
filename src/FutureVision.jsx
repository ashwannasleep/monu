import React, { useState, useEffect } from 'react';
import './FutureVision.css';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listFutureGoals } from './graphql/queries';
import { createFutureGoal, updateFutureGoal, deleteFutureGoal } from './graphql/mutations';

const client = generateClient({
  authMode: 'userPool',
});

export default function FutureVision() {
  const [ageTarget, setAgeTarget] = useState('21-year-old me');
  const [goals, setGoals] = useState({
    health: [],
    relationships: [],
    growth: [],
    travel: [],
    environment: [],
    career: [],
    finance: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const result = await client.graphql({ query: listFutureGoals });
      const items = result.data.listFutureGoals.items;

      const organized = {
        health: [],
        relationships: [],
        growth: [],
        travel: [],
        environment: [],
        career: [],
        finance: []
      };

      items.forEach(item => {
        if (organized[item.category]) {
          organized[item.category].push(item);
        }
      });

      setGoals(organized);
    } catch (err) {
      console.error('Failed to load future goals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (category, index, value) => {
    const updated = { ...goals };
    const item = updated[category][index];
    item.title = value;
    setGoals(updated);

    if (item.id) {
      try {
        await client.graphql({
          query: updateFutureGoal,
          variables: { input: { id: item.id, title: value } }
        });
      } catch (err) {
        console.error('Failed to update goal:', err);
      }
    }
  };

  const handleAddLine = async (category) => {
    try {
      const result = await client.graphql({
        query: createFutureGoal,
        variables: { input: { category, title: '', done: false } }
      });
      const newItem = result.data.createFutureGoal;

      setGoals(prev => ({
        ...prev,
        [category]: [...prev[category], newItem]
      }));
    } catch (err) {
      console.error('Failed to add future goal:', err);
    }
  };

  const handleDelete = async (category, index) => {
    const item = goals[category][index];
    if (!item.id) return;

    try {
      await client.graphql({
        query: deleteFutureGoal,
        variables: { input: { id: item.id } }
      });
      setGoals(prev => {
        const updated = [...prev[category]];
        updated.splice(index, 1);
        return { ...prev, [category]: updated };
      });
    } catch (err) {
      console.error('Failed to delete future goal:', err);
    }
  };

  return (
    <div className="future-vision min-h-screen px-6 py-12 flex flex-col items-center">
      <Link
        to="/choose"
        title="Back to menu"
        className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
      >
        <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      </Link>
      <p className="future-subheader italic">Your 3-Year Blueprint</p>

      <div className="section">
        <h3>
          TO:
          <input
            className="editable-title text-center"
            type="text"
            value={ageTarget}
            onChange={(e) => setAgeTarget(e.target.value)}
            placeholder="e.g. 21 year old me"
          />
        </h3>
      </div>

      <div className="blueprint-wrapper">
        <div className="column">
          {['health', 'relationships', 'growth'].map((cat) => (
            <div className="section" key={cat}>
              <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
              <ul>
                {goals[cat].map((item, i) => (
                  <li key={item.id || i}>
                    <div className="goal-item">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleChange(cat, i, e.target.value)}
                      />
                      <button
                        onClick={() => handleDelete(cat, i)}
                        className="delete-btn"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAddLine(cat)}
                className="add-btn"
                title="Add new goal"
              >
                ＋
              </button>
            </div>
          ))}
        </div>

        <div className="column">
          {['travel', 'environment', 'career', 'finance'].map((cat) => (
            <div className="section" key={cat}>
              <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
              <ul>
                {goals[cat].map((item, i) => (
                  <li key={item.id || i}>
                    <div className="goal-item">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleChange(cat, i, e.target.value)}
                      />
                      <button
                        onClick={() => handleDelete(cat, i)}
                        className="delete-btn"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAddLine(cat)}
                className="add-btn"
                title="Add new goal"
              >
                ＋
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
