import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
     
      await signOut({ global: true });
      // Clean up local storage
      localStorage.removeItem('monu_name');
      navigate('/');
    } catch (err) {
      alert('Logout failed: ' + (err.message || err));
    }
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
}