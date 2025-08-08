import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Products from './Products';
import Navbar from './Navbar';

import './Home.css';

function App() {
  return (
    <div className="main-app-container" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Nested Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <footer className="footer-bar">
        &copy; {new Date().getFullYear()} My App.
      </footer>
    </div>
  );
}

export default App;
