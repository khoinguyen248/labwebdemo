import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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
                    <Link to="/join-us" className="nav-link">Join Us</Link>
                    <Link to="/member" className="nav-link">Member</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/publications" className="nav-link">Publications</Link>
                    <Link to="/project" className="nav-link">Project</Link>


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
