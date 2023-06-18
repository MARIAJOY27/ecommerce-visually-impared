// Navbar.js
import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {

  const {user} = useContext(AuthContext)

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink to="/" className="navbar__link">Home</NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/about" className="navbar__link">About</NavLink>
        </li>
        {
          !user &&
          <li className="navbar__item">
          <NavLink to="/login" className="navbar__link">Login</NavLink>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
