import { useEffect, useState } from "react";
import "./BucketList.css";
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { createBucketItem, updateBucketItem, deleteBucketItem } from './graphql/mutations';
import { listBucketItems } from './graphql/queries';

const client = generateClient();

export default function BucketList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const result = await client.graphql({
        query: listBucketItems
      });
      const userItems = result.data.listBucketItems.items;
      setItems(userItems);
    } catch (err) {
      console.error('Failed to load items:', err);
    }
  };

  const handleAdd = async () => {
    if (text.trim() === "") return;

    const newItem = {
      text,
      category: category || null,
      date: date || null,
      link: link || null,
      done: false,
    };

    try {
      const result = await client.graphql({
        query: createBucketItem,
        variables: { input: newItem }
      });
      const savedItem = result.data.createBucketItem;
      setItems([...items, savedItem]);
      setText("");
      setCategory("");
      setDate("");
      setLink("");
    } catch (err) {
      console.error('Failed to save item:', err);
    }
  };

  const toggleDone = async (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);

    const item = updated[index];
    try {
      await client.graphql({
        query: updateBucketItem,
        variables: { input: { id: item.id, done: item.done } }
      });
      console.log('Item updated in DynamoDB!');
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const deleteItem = async (index) => {
    const item = items[index];
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);

    try {
      await client.graphql({
        query: deleteBucketItem,
        variables: { input: { id: item.id } }
      });
      console.log('Item deleted from DynamoDB!');
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const totalItems = items.length;
  const completedCount = items.filter(item => item.done).length;
  const progressPercent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center">
      <Link
        to="/choose"
        title="Back to menu"
        className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
      >
        <h1 className="text-4xl font-serif font-bold mb-2">
          MONU
        </h1>
      </Link>

      <p className="mt-4 italic text-gray-600">This is your moment to dream ✨</p>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="progress-text">{progressPercent}% complete</p>

      <div className="bucket-input-area">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an item..."
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Really Need">Need</option>
          <option value="Want">Want</option>
          <option value="Adventure">Entertainment</option>
          <option value="Growth">Personal Growth</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link (optional)"
        />
        <button onClick={handleAdd}>＋</button>
      </div>

      <div className="bucket-list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`bucket-item ${item.done ? "done" : ""}`}
          >
            <div className="bucket-main" onClick={() => toggleDone(index)}>
              <span className="bucket-text">{item.text}</span>
              {item.category && (
                <span className="bucket-tag">{item.category}</span>
              )}
              {item.date && <span className="bucket-date">{item.date}</span>}
              {item.link && (
                <a
                  href={item.link}
                  className="bucket-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗
                </a>
              )}
            </div>
            <button onClick={() => deleteItem(index)} className="delete-btn">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
