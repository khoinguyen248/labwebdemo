import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1 className="hero-title">HCMUT EE Machine Learning & IoT Lab </h1>
                    <p className="hero-subtitle">
                        A specialized research laboratory at the Faculty of Electrical & Electronics Engineering, HCMUT.
                        We focus on R&D in Artificial Intelligence, IoT, and Software Engineering.
                    </p>

                </div>
            </section>

            {/* About Section */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="section-title">About the Lab</h2>
                    <div className="about-content">
                        <p>
                            Established in 2019 under the Department of Telecommunications (Faculty of Electrical & Electronics Engineering, HCMUT)
                            and led by M.Sc. Nguyen Khanh Loi, MLIoT Lab is a collaborative hub for students passionate about AI, IoT, and Software Engineering.
                            Through hands-on projects, technical competitions, and weekly workshops, members engage in continuous learning and research.
                            We empower our students with the essential expertise and practical skills required to excel in both advanced research and their future professional careers.
                        </p>
                    </div>

                    {/* Research Cards */}
                    <div className="research-grid">
                        {/* AI Card */}
                        <div className="research-card">
                            <img src="teamAI.jpg" alt="AI Research" className="card-img" />
                            <div className="card-body">
                                <h3 className="card-title">Artificial Intelligence</h3>
                                <ul className="card-list">
                                    <li>Machine Learning</li>
                                    <li>Deep Learning</li>
                                    <li>Computer Vision, NLP</li>
                                    <li>GenAI, AI Agent, Edge AI</li>
                                </ul>
                            </div>
                        </div>

                        {/* IoT Card */}
                        <div className="research-card">
                            <img src="teamIoT.jpg" alt="IoT Research" className="card-img" />
                            <div className="card-body">
                                <h3 className="card-title">Internet of Things</h3>
                                <ul className="card-list">
                                    <li>AIoT</li>
                                    <li>Embedded Systems</li>
                                    <li>Robotics</li>
                                    <li>PCB Design</li>
                                </ul>
                            </div>
                        </div>

                        {/* SE Card */}
                        <div className="research-card">
                            <img src="teamSE.jpg" alt="Software Engineering" className="card-img" />
                            <div className="card-body">
                                <h3 className="card-title">Software Engineering</h3>
                                <ul className="card-list">
                                    <li>Web & Mobile Application</li>
                                    <li>DevOps/MLOps</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Lab's Activities</h2>

                    {/* Activity 1: Internal Training */}
                    <div className="activity-item">
                        <div className="activity-header">
                            <h3 className="activity-title">Internal Training & Development</h3>
                            <p className="activity-desc">
                                At MLIoT Lab, we foster a culture of continuous growth through structured weekly sessions designed to sharpen both theoretical knowledge and practical expertise.
                                Our activities include Paper Reading to stay ahead of academic trends, Technical Seminars, hands-on Workshops, and collaborative Project development.
                                Our internal training programs cover a comprehensive range of disciplines, from AI, Machine Learning, and Deep Learning to Embedded Systems, IoT, and Full-stack Software Engineering (Web, Mobile, and DevOps).
                            </p>
                        </div>
                        <div className="activity-images">
                            <img src="train1.jpg" alt="Training Session" className="activity-img" />
                            <img src="train2.jpg" alt="Training Session" className="activity-img" />
                            <img src="train3.jpg" alt="Training Session" className="activity-img" />
                        </div>
                    </div>

                    {/* Activity 2: Python Course */}
                    <div className="activity-item">
                        <div className="activity-header">
                            <h3 className="activity-title">Python & Machine Learning Course</h3>
                            <p className="activity-desc">
                                Since its inception, the Python & Machine Learning Summer Course has become a hallmark tradition of MLIoT Lab, reaching its 6th edition (Batch 6) in 2025.
                                This non-profit initiative is designed to bridge the gap between academic theory and practical application for tech enthusiasts.
                                The course provides a solid foundation in Mathematical Logic, Python Programming, and Fundamental Machine Learning.
                            </p>
                        </div>
                        <div className="activity-images">
                            <img src="course1.png" alt="ML Course" className="activity-img" />
                            <img src="course3.jpg" alt="ML Course" className="activity-img" />
                            <img src="course2.jpg" alt="ML Course" className="activity-img" />
                        </div>
                    </div>

                    {/* Activity 3: Community Engagement */}
                    <div className="activity-item">
                        <div className="activity-header">
                            <h3 className="activity-title">Community Engagement & Knowledge Sharing</h3>
                            <p className="activity-desc">
                                We are committed to inspiring the next generation of innovators. Through the MLIoT x PTNK initiative, our lab provides scientific research mentorship for high school students.
                                We guide young talents in developing technical projects, fostering their curiosity and building a strong foundation in STEM fields.
                            </p>
                        </div>
                        <div className="activity-images">
                            <img src="PTNK1.jpg" alt="Community Engagement" className="activity-img" />
                            <img src="PTNK2.jpg" alt="Community Engagement" className="activity-img" />
                            <img src="PTNK3.jpg" alt="Community Engagement" className="activity-img" />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;
