import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const quotes = [
  "Take your time, {name}.",
  "Everything starts here, {name}.",
  "A quiet place to begin.",
  "Let today be gentle, {name}.",
  "{name}, the moment is yours.",
  "It’s okay to go slow, {name}.",
  "This space belongs to you.",
  "Little steps, {name}, lasting change.",
  "This is where it begins, {name}.",
  "{name}, you’ve arrived.",
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("monu_name");
    if (stored) setInput(stored);
  }, []);

  const handleStart = () => {
    if (input.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    const name = input;  
    localStorage.setItem("monu_name", name);
  
    // Personalize quote
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    const personalized = picked.includes("{name}")
      ? picked.replace("{name}", name)
      : `${picked} — ${name}`;
  
    setQuote(personalized);
    setShowQuote(true);
  
    // Transition to next page
    setTimeout(() => navigate("/choose"), 2300);
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EF] text-[#3A3A3A] px-6 text-center transform scale-200 orgin-top">
      <h1 className="text-5xl font-serif font-semibold tracking-wide mb-4">MONU</h1>
      <p className="italic text-lg text-[#5A5A5A] mb-10">moment & you</p>

      {!showQuote ? (
        <div className="flex flex-col items-center space-y-5 animate-fade-in">
          <input
            type="text"
            placeholder="Enter your name..."
            required  
            className="px-4 py-2 border border-gray-400 rounded-xl bg-white text-center text-[#333] w-64 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleStart}
            className="mt-[15px] bg-[#C7BFB2] hover:bg-[#b3aa9d] text-black font-semibold px-6 py-2 rounded-full shadow-md transition duration-200"
          >
            Start Planning →
          </button>
        </div>
      ) : (
        <p className="mt-16 text-2xl font-serif text-[#3A3A3A] animate-slidefade">{quote}</p>
      )}
    </div>
  );
}
