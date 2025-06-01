import { useEffect, useState } from "react";
import "./BucketList.css";
import { Link } from 'react-router-dom';

// Mock GraphQL operations for demonstration
const mockGraphQL = {
  async listBucketItems() {
    const stored = localStorage.getItem('bucketItems');
    return { data: { listBucketItems: { items: stored ? JSON.parse(stored) : [] } } };
  },

  async createBucketItem(item) {
    const stored = localStorage.getItem('bucketItems');
    const items = stored ? JSON.parse(stored) : [];
    const newItem = { ...item, id: Date.now().toString() };
    items.push(newItem);
    localStorage.setItem('bucketItems', JSON.stringify(items));
    return { data: { createBucketItem: newItem } };
  },

  async updateBucketItem(id, updates) {
    const stored = localStorage.getItem('bucketItems');
    const items = stored ? JSON.parse(stored) : [];
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      localStorage.setItem('bucketItems', JSON.stringify(items));
    }
    return { data: { updateBucketItem: items[index] } };
  },

  async deleteBucketItem(id) {
    const stored = localStorage.getItem('bucketItems');
    const items = stored ? JSON.parse(stored) : [];
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem('bucketItems', JSON.stringify(filtered));
    return { data: { deleteBucketItem: { id } } };
  }
};

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const result = await mockGraphQL.listBucketItems();
      const userItems = result.data.listBucketItems.items;
      setItems(userItems);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (text.trim() === "") return;

    const newItem = {
      text: text.trim(),
      category: category || null,
      date: date || null,
      link: link || null,
      done: false,
    };

    try {
      setLoading(true);
      const result = await mockGraphQL.createBucketItem(newItem);
      const savedItem = result.data.createBucketItem;
      setItems([...items, savedItem]);
      setText("");
      setCategory("");
      setDate("");
      setLink("");
    } catch (err) {
      console.error('Failed to save item:', err);
      alert('Failed to save item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (index) => {
    const item = items[index];
    const updatedDone = !item.done;

    const updated = [...items];
    updated[index].done = updatedDone;
    setItems(updated);

    try {
      await mockGraphQL.updateBucketItem(item.id, { done: updatedDone });
    } catch (err) {
      console.error('Failed to update item:', err);
      updated[index].done = !updatedDone;
      setItems([...updated]);
    }
  };

  const deleteItem = async (index) => {
    const item = items[index];

    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);

    try {
      await mockGraphQL.deleteBucketItem(item.id);
    } catch (err) {
      console.error('Failed to delete item:', err);
      setItems([...items]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAdd();
    }
  };

  const totalItems = items.length;
  const completedCount = items.filter(item => item.done).length;
  const progressPercent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

  // Detect dark mode using documentElement
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Set progress bar color dynamically
  const progressBarColor = isDarkMode ? '#f29e8e' : '#f29e8e';

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
        <p className="mt-4 italic text-gray-600 text-center">This is your moment to dream ✨</p>
      </div>
      <div className="bucket-container">

        <div className="progress-container">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressBarColor
              }}
            />
          </div>
          <p className="progress-text">
            {progressPercent}% complete ({completedCount} of {totalItems} items)
          </p>
        </div>

        <div className="bucket-input-section">
          <div className="bucket-input-grid">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add an item..."
              className="bucket-input bucket-input-main"
              disabled={loading} />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bucket-dropdown"
              disabled={loading}
            >
              <option value="">Category</option>
              <option value="Need">Need</option>
              <option value="Want">Want</option>
              <option value="Adventure">Adventure</option>
              <option value="Growth">Growth</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bucket-input"
              disabled={loading} />

            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Link (optional)"
              className="bucket-input bucket-input-url"
              disabled={loading} />
          </div>

          <button
            onClick={handleAdd}
            disabled={loading || text.trim() === ""}
            className="bucket-add-btn"
          >
            {loading ? "Adding..." : "＋ Add Item"}
          </button>
        </div>

        <div className="bucket-list">
          {loading && items.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your bucket list...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">Your bucket list is empty</p>
              <p className="empty-subtitle">Add your first dream above! ✨</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className={`bucket-item ${item.done ? 'done' : ''}`}
              >
                <div
                  className="bucket-main"
                  onClick={() => toggleDone(index)}
                >
                  <div className="bucket-text">
                    {item.text}
                  </div>

                  <div className="bucket-tags">
                    {item.category && (
                      <span className="bucket-tag">
                        {item.category}
                      </span>
                    )}
                    {item.date && (
                      <span className="bucket-date">
                        📅 {new Date(item.date).toLocaleDateString()}
                      </span>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="bucket-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔗 Link
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteItem(index)}
                  className="delete-btn"
                  title="Delete item"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
