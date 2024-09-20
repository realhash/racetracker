import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { calculateAge } from '../pages/functions/AgeCalculator';
import Header from "../pages/components/Header";
import './css/Register.css';

const Register: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setAge(selectedDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, age }),
    });

    if (response.ok) {
      login(email);
      window.location.href = '/home';
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <>
      <Header />
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p>Indtast en email og en adgangskode.</p>
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
          <input
            type="date"
            value={age}
            onChange={handleDateChange}
            placeholder="Alder"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
