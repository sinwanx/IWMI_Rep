
import React from 'react';
import { FaHome, FaUser, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;