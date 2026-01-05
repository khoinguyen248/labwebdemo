import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/home" className="logo">
                    {/* Placeholder for Logo Icon - using text for now or a generic icon */}
                    <img src="avt.png" alt="" className='logo-icon' />
                    <span className="logo-text">MLIoT Lab</span>
                </Link>

                <nav className="nav-links">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/about-us" className="nav-link">About Us</Link>
                    <Link to="/people" className="nav-link">People</Link>
                    <div className="nav-item-dropdown">
                        <span className="nav-link">Knowledge & Contributions <FaChevronDown size={12} /></span>
                        {/* Dropdown content could go here */}
                    </div>
                </nav>

                <div className="header-actions">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Search..." />
                        <span className="shortcut-hint">Ctrl K</span>
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/join-us')}>Join Us</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
