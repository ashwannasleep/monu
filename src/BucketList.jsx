import { useEffect, useState } from "react";
import "./BucketList.css";
import { safeSetItem, safeGetItem } from './safeStorage';
import { Link } from 'react-router-dom';



export default function BucketList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const stored = safeGetItem("monu_bucket");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    safeSetItem("monu_bucket", JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    if (text.trim() === "") return;
    const newItem = {
      text,
      category,
      date,
      link,
      done: false,
    };
    setItems([...items, newItem]);
    setText("");
    setCategory("");
    setDate("");
    setLink("");
  };

  const toggleDone = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);
  };

  const deleteItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

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
      <h2 className="text-2xl font-semibold">Bucket List</h2>
      <p className="mt-4 italic text-gray-600">This is your moment to dream ✨</p>
      
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
        <button onClick={handleAdd}>+</button>
      </div>

      <div className="bucket-list">
        {items.map((item, index) => (
          <div
            key={index}
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
