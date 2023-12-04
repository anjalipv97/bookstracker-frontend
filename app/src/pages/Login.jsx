// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import Error from '../pages/Error'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5558/login', { username, password });
      const token = response.data.token;
      login(token);
      navigate('/books');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Incorrect username or password. Please try again.');
    }
  };

  return (
    // <div>
    //   <h2 className="text-2xl font-bold text-gray-800 mb-4">Login to your account</h2>
    //   <label>Username</label>
    //   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <br />
    //   <label>Password</label>
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <br />
    //   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
    //   {error && <Error />} {/* Conditionally render the Error component */}
    //   {/* Add the Link to navigate to the Signup page */}
    //   <p>
    //     Don't have an account? <Link to="/signup">Signup</Link>
    //   </p>
    // </div>
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Login to your account</h2>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button
    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
    onClick={handleLogin}
  >
    Login
  </button>

  {error && <Error />} {/* Conditionally render the Error component */}

  <p className="mt-4 text-sm text-gray-600">
    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
  </p>
</div>

  );
};

export default Login;
