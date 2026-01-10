import React from 'react';
import { FaFacebookF, FaGithub, FaYoutube, FaMapMarkerAlt, FaGlobe, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-left">
                    <div className="logo-section">
                        <span className="copyright">
                            © 2019 - {new Date().getFullYear()}.SE Team @ MLIoT Lab. All rights reserved
                        </span>
                    </div>
                </div>

                <div className="footer-right">
                    <h3>Contact</h3>

                    <div className="footer-info">
                        <p className="footer-item">
                            <FaMapMarkerAlt className="footer-icon" />
                            <span><strong>Location:</strong> 403.1 BK.B6, HCMUT Campus 2</span>
                        </p>


                        <p className="footer-item">
                            <FaEnvelope className="footer-icon" />
                            <span>
                                <strong>Email:</strong><br />
                                <a href="mailto:nkloi@hcmut.edu.vn">nkloi@hcmut.edu.vn</a><br />
                                <a href="mailto:mlandiotlab@gmail.com">mlandiotlab@gmail.com</a>
                            </span>
                        </p>
                    </div>

                    <div className="social-links">
                        <a href="https://facebook.com/hcmut.ml.iot.lab" className="social-link" target="_blank" rel="noreferrer" title="Fanpage">
                            <FaFacebookF />
                        </a>
                        <a href="https://youtube.com/@mliotlab" className="social-link" target="_blank" rel="noreferrer" title="Youtube">
                            <FaYoutube />
                        </a>
                        <a href="https://github.com/mliotlab" className="social-link" target="_blank" rel="noreferrer" title="Github">
                            <FaGithub />
                        </a>
                        <a href="https://ml-iotlab.com" className="social-link" target="_blank" rel="noreferrer" title="Website">
                            <FaGlobe />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
