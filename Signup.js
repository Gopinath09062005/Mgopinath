import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email.includes('@')) {
    alert('Please enter a valid email');
    return;
  }

  if (password === '') {
    alert('Please enter the password');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Get existing users array or empty array
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    alert('Account already exists');
    return;
  }

  // Add new user
  users.push({ email, password });

  // Save back to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  alert('Congrats! Your account is created');
  navigate('/');
};

  return (
    <div className="container">
      <div className="registration form">
        <header>Signup</header>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn" type="submit">Signup</button>
        </form>

        <div className="signup">
          Already have an account?{' '}
          <label onClick={() => navigate('/')}>Login</label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
