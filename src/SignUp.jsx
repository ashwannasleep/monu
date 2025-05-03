import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signUp'); 
  const navigate = useNavigate();

 
  const signUp = async () => {
    try {
      await Auth.signUp({ username: email, password });
      setStep('confirm'); 
    } catch (err) {
      alert(err.message);
    }
  };


  const confirm = async () => {
    try {
      await Auth.confirmSignUp(email, code); 
      alert('Account confirmed! Please sign in.');
      navigate('/login'); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      {step === 'signUp' && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={signUp}>Sign Up</button>
        </>
      )}

      {step === 'confirm' && (
        <>
          <input
            type="text"
            placeholder="Enter the verification code"
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button onClick={confirm}>Confirm Account</button>
        </>
      )}
    </div>
  );
}
