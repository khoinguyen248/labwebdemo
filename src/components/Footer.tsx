import React from 'react';
import { FaFacebookF, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-left">
                    <div className="logo-section">
                        <img src="avt.png" alt="" className='logo-icon' />
                        <span className="copyright">© 2025 MLIoT Lab. Made by SE Team.</span>
                    </div>
                </div>

                <div className="footer-right">
                    <h3>Contact</h3>
                    <p className="email">nkloi@hcmut.edu.vn</p>
                    <p className="address">Ly Thuong Kiet Street, Ho Chi Minh City, Vietnam</p>
                    <div className="social-links">
                        <a href="https://www.facebook.com/hcmut.ml.iot.lab" className="social-link"><FaFacebookF /></a>
                        <a href="https://github.com/mliotlab" className="social-link"><FaGithub /></a>
                        <a href="youtube.com/@mliotlab" className="social-link"><FaYoutube /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
