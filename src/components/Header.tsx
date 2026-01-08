import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/home" className="logo">
                    {/* Placeholder for Logo Icon - using text for now or a generic icon */}
                    <img src="avt.png" alt="" className='logo-icon' />
                </Link>

                <nav className="nav-links">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/publications" className="nav-link">Publications</Link>
                    <Link to="/project" className="nav-link">Project</Link>

                    <Link to="/member" className="nav-link">Member</Link>





                </nav>

                <div className="header-actions">
                    <button className="btn-primary" onClick={() => navigate('/join-us')}>Join Us</button>
                    <button className="btn-primary" onClick={() => navigate('/contact')}>Contact</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
