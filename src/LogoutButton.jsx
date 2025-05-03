import { useNavigate } from 'react-router-dom';
import * as Auth from '@aws-amplify/auth';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      localStorage.removeItem('monuUser');
      navigate('/');
    } catch (error) {
      alert('Logout failed.');
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
