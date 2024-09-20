import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Header from "../pages/components/Header";
import './css/Login.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      login(email);
      window.location.href = '/home';
      console.error(response);
      setError(" ")
    } else {
      setError("error")
    }
  };

  return (
    <>
      <Header />
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className='email-pass'>Indtast din email og adgangskode.</p>
          <p className={error === 'error' ? 'error' : 'error disable'}>Login mislykkedes, se om dine oplysninger er korrekte!</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Adgangskode"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;