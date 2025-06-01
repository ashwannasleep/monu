import React, { useState, useEffect } from 'react';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
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
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => setMessage(''), [mode]);

  const resetAll = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setResetCode('');
    setNewPassword('');
    setMessage('');
  };

  const handleSendCode = async () => {
    setLoading(true);
    try {
      await resetPassword({ username: email.trim() });
      setMode('resetPassword');
      setMessage('Code sent! Check your email.');
    } catch (err) {
      setMessage(err.message || 'Failed to send code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (mode === 'signIn') {
        await onSignIn({ username: email.trim(), password });
      } else if (mode === 'signUp') {
        await onSignUp({
          username: email.trim(),
          password,
          name: fullName.trim(),
        });
      } else if (mode === 'forgotPassword') {
        await resetPassword({ username: email.trim() });
        setMessage('Code sent! Check your email.');
        setMode('resetPassword');
      } else if (mode === 'resetPassword') {
        await confirmResetPassword({
          username: email.trim(),
          confirmationCode: resetCode.trim(),
          newPassword,
        });
        setMessage('Password reset successfully! You can now sign in.');
        setMode('signIn');
        setPassword('');
      }
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // 👇 Dynamically calculate padding for small screens
  const modalStyle = {
    padding: window.innerWidth <= 480 ? '1rem' : '2.5rem 2rem',
    borderRadius: window.innerWidth <= 480 ? '1.5rem' : '2rem',
    width: '100%',
    maxWidth: '400px',
    minWidth: '280px',
    backgroundColor: '#f7f5ef',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Georgia, serif',
    textAlign: 'center',
    position: 'relative',
    animation: 'fadeIn 0.25s ease',
    boxSizing: 'border-box',
    margin: window.innerWidth <= 480 ? '0.5rem' : '0',
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" style={modalStyle} onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>
          {mode === 'signIn' && 'Sign In'}
          {mode === 'signUp' && 'Sign Up'}
          {mode === 'forgotPassword' && 'Forgot Password'}
          {mode === 'resetPassword' && 'Reset Password'}
        </h2>

        <form onSubmit={handleSubmit} className="form-container">
          {mode === 'signUp' && (
            <input
              type="text"
              placeholder="Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="auth-input"
            />
          )}

          {mode !== 'resetPassword' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          )}

          {(mode === 'signIn' || mode === 'signUp') && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          )}

          {mode === 'forgotPassword' && (
            <>
              <p className="info-text">We'll send a reset code to your email.</p>
              <button
                type="button"
                onClick={handleSendCode}
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send Code'}
              </button>
            </>
          )}

          {mode === 'resetPassword' && (
            <>
              <p className="info-text">Enter the code sent to {email} and your new password:</p>
              <input
                type="text"
                placeholder="Reset Code"
                value={resetCode}
                onChange={e => setResetCode(e.target.value)}
                required
                className="auth-input"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="auth-input"
              />
            </>
          )}

          {(mode === 'signIn' || mode === 'signUp' || mode === 'resetPassword') && (
            <button type="submit" className="submit-button" disabled={loading}>
              {loading
                ? 'Please wait…'
                : mode === 'signIn'
                ? 'Sign In'
                : mode === 'signUp'
                ? 'Sign Up'
                : 'Reset Password'}
            </button>
          )}
        </form>

        {mode === 'signIn' && (
          <p className="toggle-text">
            <span className="toggle-link" onClick={() => { resetAll(); setMode('forgotPassword'); }}>
              Forgot Password?
            </span>
          </p>
        )}

        <p className="toggle-text">
          {mode === 'signIn' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={() => { resetAll(); setMode(mode === 'signIn' ? 'signUp' : 'signIn'); }}>
            {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
          </span>
        </p>

        {message && <p className="message-text">{message}</p>}
      </div>
    </div>
  );
}
