import React, { useState, useRef, useEffect } from 'react';
import './Topbar.css';
import logo from '../assets/iwmi.png'; // First logo
import logo2 from '../assets/nexusgainslogo.png'; // Second logo
import logo3 from '../assets/fcdo.png'; // Third logo
import logo4 from '../assets/gop.png'; // Fourth logo
import { FaQuestionCircle, FaBook, FaInfoCircle, FaUserPlus, FaUser, FaCog, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // Add new icons
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const [showUserMenu, setShowUserMenu] = useState(false); // State for user menu
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State for Add User form
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    navigate('/login');
  };

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
    setShowUserMenu(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    setShowAddUserForm(false);
    alert("✔️ User added successfully!");
  };

  return (
    <header className="topbar slim-topbar">
      <div className="topbar-left">
        <div className="dashboard-label">CGE-W Dashboard</div>
        <img src={logo} alt="Primary Logo" className="topbar-logo-primary" />
        <img src={logo2} alt="Secondary Logo" className="topbar-logo-secondary" />
      </div>

      <div className="topbar-center">
        <h1 className="topbar-title">Hydro-Economic Decision Support System Results for Indus Basin (Pakistan)</h1>
        <div className="additional-logos">
          <img src={logo3} alt="Third Logo" className="topbar-logo-third" />
          <img src={logo4} alt="Fourth Logo" className="topbar-logo-fourth" />
        </div>
      </div>

      <div className="topbar-right">
        <button className="nav-button" onClick={() => navigate('/faq')}>
          <FaQuestionCircle className="nav-icon" /> FAQ's
        </button>
        <button className="nav-button" onClick={() => navigate('/publications')}>
          <FaBook className="nav-icon" /> Publications
        </button>
        <button className="nav-button" onClick={() => navigate('/contact-us')}>
          <FaInfoCircle className="nav-icon" /> Contact Us
        </button>
        {/* User Icon */}
        <div className="user-menu-container" ref={userMenuRef}>
          <div className="user-icon-wrapper" onClick={toggleUserMenu}>
            <FaUser className={`user-icon ${showUserMenu ? 'active' : ''}`} />
            <span className="online-dot"></span>
          </div>
          {showUserMenu && (
            <div className="user-menu">
              <button className="user-menu-item" onClick={handleAddUserClick}>Add User</button>
              <button className="user-menu-item" onClick={handleAddUserClick}>Create User</button>
              <button className="user-menu-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {showAddUserForm && (
        <div className="add-user-form-overlay">
          <div className="add-user-form-container">
            <h3>Add User</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email Address:</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Mobile Number:</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" required />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input type="password" required />
              </div>
              <div className="form-group">
                <label>Country:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>State / Province:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>User Type:</label>
                <select required>
                  <option value="Student">Student</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Official">Official</option>
                </select>
              </div>
              <div className="form-group">
                <label>Affiliation:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" required /> I agree to the Terms and Conditions
                </label>
              </div>
              <div className="form-group">
                <label>Captcha:</label>
                <input type="text" required />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
            <button className="close-button" onClick={() => setShowAddUserForm(false)}>✖</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;
