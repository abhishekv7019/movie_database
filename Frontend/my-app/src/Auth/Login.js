import React, { useState } from 'react';
import '../css/Login.css'; 
import {Link, useNavigate} from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  function loginUser() {
    fetch(`http://127.0.0.1:5000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid username or password');
        }
      })
      .then(data => {
        localStorage.setItem('username', data.username);
        const loggedinusername=localStorage.getItem('username')
        setStatus('Logged in successfully');
        navigate(`/home`)
      })
      .catch(error => {
        setStatus(error.message);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginUser();
  }

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="back1">
      <div className="container44">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <div className="form-group1">
            <label htmlFor="username">Username</label>
            <input type="text" value={username} onChange={handleChangeUsername} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={handleChangePassword} required />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
          {status && <p>{status}</p>}
        </form>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;

export function getUsername() {
    return localStorage.getItem('username');
}