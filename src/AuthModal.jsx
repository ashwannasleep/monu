import React, { useState, useEffect } from 'react';
import './AuthModal.css';

export default function AuthModal({
  onClose,
  initialMode = 'signIn',
  onSignIn,
  onSignUp,
}) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    setMessage('');
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signIn') {
        await onSignIn({ username: email.trim(), password });
      } else {
        await onSignUp({ username: email.trim(), password, name: fullName.trim() });
      }
  
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>  
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="form-container">
        {mode === 'signUp' && (
            <input
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="auth-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading
              ? 'Please wait…'
              : mode === 'signIn'
              ? 'Sign In'
              : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          {mode === 'signIn'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <span onClick={toggleMode} className="toggle-link">
            {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
        {message && <p className="message-text">{message}</p>}
      </div>
    </div>
  );
}