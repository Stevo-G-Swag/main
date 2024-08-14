import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Calibrate from './components/pages/Calibrate';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/calibrate" element={<PrivateRoute><Calibrate /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthState>
  );
};

export default App;