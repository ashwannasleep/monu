import React, { useState, useRef, useEffect } from 'react';
import './Pomodoro.css';
import { Link } from 'react-router-dom';

export default function Pomodoro() {
  const [modes, setModes] = useState({
    study: 30,
    reading: 45,
    work: 50,
  });
  const [mode, setMode] = useState('study');
  const [customTime, setCustomTime] = useState(modes[mode]);
  const [secondsLeft, setSecondsLeft] = useState(modes[mode] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('focus');
  const [showBreakChoice, setShowBreakChoice] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (phase === 'focus') {
      setCustomTime(modes[mode]);
      setSecondsLeft(modes[mode] * 60);
    }
    pauseTimer();
  }, [mode, phase]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleCustomTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      const updated = { ...modes, [mode]: value };
      setModes(updated);
      setCustomTime(value);
      setSecondsLeft(value * 60);
      pauseTimer();
    }
  };

  const startTimer = () => {
    if (intervalRef.current) return;
    setIsRunning(true);
    audioRef.current.play();
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          audioRef.current.pause();
          if (phase === 'focus') {
            setShowBreakChoice(true);
          } else {
            setPhase('focus');
            setShowBreakChoice(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    audioRef.current.pause();
  };

  const resetTimer = () => {
    pauseTimer();
    if (phase === 'focus') {
      setSecondsLeft(customTime * 60);
    } else {
      setSecondsLeft(phase === 'shortBreak' ? 5 * 60 : 15 * 60);
    }
  };

  const handleBreakChoice = (type) => {
    setPhase(type);
    setSecondsLeft(type === 'shortBreak' ? 5 * 60 : 15 * 60);
    setShowBreakChoice(false);
    startTimer();
  };

  return (
    <>
      <div className="pomodoro-header overflow-hidden flex flex-col items-center max-h-screen justify-center">
      <Link
  to="/choose"
  title="Back to menu"
  className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
>
  <h1 className="text-4xl font-serif font-bold mb-2">
    MONU
  </h1>
</Link>
        <p className="italic text-gray-600 text-center">Your rhythm of focus and rest 🍅</p>
      </div>

      <div className="pomodoro-wrapper">
        <div className="mode-buttons">
          {Object.keys(modes).map((key) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`mode-btn ${mode === key ? 'active' : ''}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        <div className="custom-time-input">
          <label>Set minutes for {mode}:</label>
          <input
            type="number"
            value={customTime}
            onChange={handleCustomTimeChange}
            min="1"
          />
        </div>

        <div className="timer-circle">
          <span className="timer-display">{formatTime(secondsLeft)}</span>
        </div>

        {!showBreakChoice ? (
          <div className="button-group">
            {!isRunning ? (
              <button className="main-btn" onClick={startTimer}>Start</button>
            ) : (
              <button className="main-btn pause" onClick={pauseTimer}>Pause</button>
            )}
            <button className="main-btn reset" onClick={resetTimer}>Reset</button>
          </div>
        ) : (
          <div className="break-toggle">
            <p className="text-lg mb-2">Break time! What do you need?</p>
            <button className="main-btn" onClick={() => handleBreakChoice('shortBreak')}>☕ Short Break</button>
            <button className="main-btn" onClick={() => handleBreakChoice('longBreak')}>🌿 Long Break</button>
          </div>
        )}

        <audio ref={audioRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-rain-loop-2393.mp3" />
      </div>
    </>
  );
}
