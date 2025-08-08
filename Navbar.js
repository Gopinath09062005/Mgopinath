import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';


const Navbar = () => {
  const location = useLocation();

  // If user is inside dashboard, don't show Login & Signup links
  const isInDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav>
      {!isInDashboard && (
      
        <ul>
          {/* <img src={logo} alt="logo" className="logo-image" /> */}
          <li id='gname'>Gopi Website</li>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        
      
        )} 
    </nav>
  );
};

export default Navbar;
