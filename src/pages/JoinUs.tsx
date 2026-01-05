import React, { useState } from 'react';
import './JoinUs.css';

type Language = 'en' | 'vn';

const content = {
    en: {
        hero: {
            title: "Recruitment - Round 1, 2026",
            desc: "MLIoT Lab is seeking young talents passionate about research and development in Artificial Intelligence (AI), Internet of Things (IoT), and Software Engineering (SE)."
        },
        eligibility: {
            title: "Who are we looking for?",
            items: [
                "Students from universities in Ho Chi Minh City (all faculties and majors welcome)",
                "Priority given to sophomore and junior students",
                "Possess a passion for learning and research in AI, IoT, and SE",
                "Demonstrate dynamism, creativity, ambition, and willingness to embrace challenges",
                "Demonstrate a sense of responsibility and fully participate in all weekly in-person lab meetings"
            ]
        },
        benefits: {
            title: "What You'll Gain at the Lab",
            items: [
                {
                    title: "Professional Learning Environment",
                    desc: "Work alongside experienced mentors and passionate team members. Participate in internal academic activities designed specifically for Lab members."
                },
                {
                    title: "Comprehensive Skill Development",
                    desc: "Enhance programming, data analysis, and system design skills. Directly implement AI and IoT application projects for real-world problems."
                },
                {
                    title: "Opportunities to Challenge Yourself",
                    desc: "Compete in national and international technology competitions. Conduct scientific research and publish papers."
                }
            ]
        },
        tracks: {
            title: "Research & Development Tracks",
            list: [
                {
                    name: "1. AI Researcher",
                    focus: "Conduct in-depth research on AI problems (CV, NLP, GenAI...), write scientific papers, and explore new models.",
                    reqTitle: "Requirements",
                    reqs: [
                        "Strong foundational knowledge in ML/DL",
                        "Proficiency in Python, PyTorch, TensorFlow",
                        "Research mindset, ability to read English academic documents"
                    ]
                },
                {
                    name: "2. AI Engineer",
                    focus: "Develop practical AI solutions, integrate models into embedded/cloud/mobile apps. Build complete AIoT systems.",
                    reqTitle: "Requirements",
                    reqs: [
                        "Knowledge of deploying AI on various platforms",
                        "Proficiency in Python, PyTorch, TensorFlow",
                        "System thinking, product development mindset"
                    ]
                },
                {
                    name: "3. IoT Engineer",
                    focus: "Design embedded systems/IoT. Integrate sensors, microcontrollers, and wireless communication for AIoT.",
                    reqTitle: "Requirements",
                    reqs: [
                        "Knowledge of electronics, embedded systems (ESP32, STM32, Raspberry Pi...)",
                        "C/C++ programming skills",
                        "Experience with sensors, wireless communication (MQTT, BLE, WiFi)"
                    ]
                },
                {
                    name: "4. Software Engineer",
                    focus: "Design and optimize software systems. Bridge AI/IoT integration into Web/Mobile apps.",
                    reqTitle: "Requirements",
                    reqs: [
                        "Strong grasp of DSA and OOP",
                        "Proficiency in Java, C#, Golang, or JS/TS",
                        "Database design (SQL/NoSQL), Git/GitHub",
                        "Clean Code mindset"
                    ]
                }
            ]
        },
        process: {
            title: "Application Process",
            steps: [
                {
                    number: 1,
                    title: "Application Submission",
                    time: "Jan 7, 2025 - Jan 13, 2025",
                    details: [
                        "Submit to: <strong>mlandiotlab@gmail.com</strong>",
                        "Documents: CV, Cover Letter, Transcript (PDF). Freshmen attach High school/Competency scores."
                    ]
                },
                {
                    number: 2,
                    title: "Competency Test (AI Team)",
                    time: "Morning of Jan 17, 2025",
                    loc: "Room 403.1, Building H6 - HCMUT, Di An Campus",
                    details: [
                        "Content: Basic ML, CNN/CV, NLP/LLM, Training techniques, Data preprocessing, etc."
                    ]
                },
                {
                    number: 3,
                    title: "Interview",
                    time: "IoT & SE: Jan 17, 2025 | AI: Jan 18, 2025",
                    loc: "Room 403.1, Building H6 - HCMUT, Di An Campus",
                    details: [
                        "<em>Note for SE: Prepare demos/products and presentation for a significant advantage!</em>"
                    ]
                }
            ]
        },
        contact: {
            title: "Contact Us",
            text: "For any inquiries, please reach out:",
            footer: "Join MLIoT Lab to discover your potential! 🚀"
        }
    },
    vn: {
        hero: {
            title: "TUYỂN THÀNH VIÊN MỚI - ĐỢT 1 NĂM HỌC 2026",
            desc: "MLIoT Lab đang tìm kiếm những nhân tài trẻ đam mê nghiên cứu và phát triển trong các lĩnh vực Trí tuệ nhân tạo (AI), Internet vạn vật (IoT) và Kỹ thuật phần mềm (SE)."
        },
        eligibility: {
            title: "Đối tượng tham gia",
            items: [
                "Sinh viên các trường đại học tại TP.HCM (không giới hạn khoa, chuyên ngành)",
                "Ưu tiên sinh viên năm 2 và năm 3",
                "Có đam mê học tập và nghiên cứu trong lĩnh vực AI, IoT và SE",
                "Sở hữu tinh thần năng động, sáng tạo, cầu tiến và không ngại thử thách",
                "Có tinh thần trách nhiệm, tham gia đầy đủ các buổi sinh hoạt hằng tuần trực tiếp tại phòng Lab"
            ]
        },
        benefits: {
            title: "Quyền lợi khi tham gia Lab",
            items: [
                {
                    title: "Môi trường học tập chuyên nghiệp",
                    desc: "Làm việc cùng các mentor giàu kinh nghiệm. Tham gia các hoạt động học thuật nội bộ dành riêng cho thành viên Lab."
                },
                {
                    title: "Phát triển kỹ năng toàn diện",
                    desc: "Nâng cao kỹ năng lập trình, phân tích dữ liệu, thiết kế hệ thống. Trực tiếp triển khai các dự án ứng dụng AI và IoT cho bài toán thực tế."
                },
                {
                    title: "Cơ hội thử thách bản thân",
                    desc: "Tham gia các cuộc thi công nghệ trong và ngoài nước. Nghiên cứu khoa học và công bố bài báo."
                }
            ]
        },
        tracks: {
            title: "Hướng nghiên cứu và phát triển",
            list: [
                {
                    name: "1. AI Researcher",
                    focus: "Nghiên cứu chuyên sâu các bài toán AI (CV, NLP, GenAI...), viết báo khoa học, khám phá mô hình mới.",
                    reqTitle: "Yêu cầu",
                    reqs: [
                        "Kiến thức nền tảng vững về Machine Learning, Deep Learning",
                        "Thành thạo Python và các thư viện PyTorch, TensorFlow",
                        "Tư duy nghiên cứu, khả năng đọc hiểu tài liệu học thuật tiếng Anh"
                    ]
                },
                {
                    name: "2. AI Engineer",
                    focus: "Phát triển giải pháp AI ứng dụng thực tế, tích hợp mô hình vào thiết bị nhúng/cloud/web/mobile. Xây dựng hệ thống AIoT.",
                    reqTitle: "Yêu cầu",
                    reqs: [
                        "Kiến thức triển khai mô hình AI trên các nền tảng",
                        "Thành thạo Python, PyTorch, TensorFlow",
                        "Tư duy hệ thống, tinh thần xây dựng sản phẩm"
                    ]
                },
                {
                    name: "3. IoT Engineer",
                    focus: "Thiết kế hệ thống nhúng/IoT. Tích hợp cảm biến, vi điều khiển, giao tiếp không dây cho AIoT.",
                    reqTitle: "Yêu cầu",
                    reqs: [
                        "Kiến thức điện tử, hệ thống nhúng (ESP32, STM32, RPi...)",
                        "Kỹ năng lập trình C/C++",
                        "Kinh nghiệm với cảm biến, giao tiếp không dây (MQTT, BLE, WiFi)"
                    ]
                },
                {
                    name: "4. Software Engineer",
                    focus: "Thiết kế và tối ưu hóa hệ thống phần mềm. Cầu nối tích hợp AI/IoT vào Web/Mobile.",
                    reqTitle: "Yêu cầu",
                    reqs: [
                        "Nắm vững cấu trúc dữ liệu, giải thuật và OOP",
                        "Thành thạo Java, C#, Golang hoặc JS/TS",
                        "CSDL (SQL/NoSQL), Git/GitHub",
                        "Tư duy Clean Code"
                    ]
                }
            ]
        },
        process: {
            title: "Quy trình ứng tuyển",
            steps: [
                {
                    number: 1,
                    title: "Nộp hồ sơ",
                    time: "7/1/2025 - 13/1/2025",
                    details: [
                        "Gửi về: <strong>mlandiotlab@gmail.com</strong>",
                        "Hồ sơ: CV, Cover Letter, Bảng điểm (PDF). SV năm nhất kèm điểm thi THPT/ĐGNL."
                    ]
                },
                {
                    number: 2,
                    title: "Kiểm tra năng lực (Team AI)",
                    time: "Sáng 17/1/2025",
                    loc: "Phòng 403.1, Tòa H6 - ĐH Bách Khoa, Dĩ An",
                    details: [
                        "Nội dung: Học máy cơ bản, CNN/CV, NLP/LLM, Kỹ thuật huấn luyện, Tiền xử lý dữ liệu..."
                    ]
                },
                {
                    number: 3,
                    title: "Phỏng vấn",
                    time: "IoT & SE: 17/1/2025 | AI: 18/1/2025",
                    loc: "Phòng 403.1, Tòa H6 - ĐH Bách Khoa, Dĩ An",
                    details: [
                        "<em>Lưu ý SE: Chuẩn bị demo/sản phẩm và bài thuyết trình để có điểm cộng lớn!</em>"
                    ]
                }
            ]
        },
        contact: {
            title: "Liên hệ",
            text: "Mọi thắc mắc xin vui lòng liên hệ:",
            footer: "Hãy cùng MLIoT Lab khám phá tiềm năng của bạn! "
        }
    }
};

const JoinUs: React.FC = () => {
    const [lang, setLang] = useState<Language>('vn');
    const t = content[lang];

    return (
        <div className="join-us-page">
            <div className="language-switch-container">
                <button
                    className={`lang-btn ${lang === 'vn' ? 'active' : ''}`}
                    onClick={() => setLang('vn')}
                >
                    VN
                </button>
                <div className="lang-divider">|</div>
                <button
                    className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => setLang('en')}
                >
                    EN
                </button>
            </div>

            {/* Hero */}
            <section className="join-hero">
                <div className="container">
                    <h1>{t.hero.title}</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                        {t.hero.desc}
                    </p>
                </div>
            </section>

            {/* Introduction & Eligibility */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="join-section-title">{t.eligibility.title}</h2>
                    <ul className="eligibility-list">
                        {t.eligibility.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Benefits */}
            <section className="section">
                <div className="container">
                    <h2 className="join-section-title">{t.benefits.title}</h2>
                    <div className="benefits-grid">
                        {t.benefits.items.map((item, index) => (
                            <div className="benefit-card" key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tracks */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="join-section-title">{t.tracks.title}</h2>
                    <div className="tracks-grid">
                        {t.tracks.list.map((track, index) => (
                            <div className="track-card" key={index}>
                                <h3 className="track-title">{track.name}</h3>
                                <p><strong>{lang === 'en' ? 'Focus' : 'Định hướng'}:</strong> {track.focus}</p>
                                <div className="track-section">
                                    <h4>{track.reqTitle}</h4>
                                    <ul className="track-list">
                                        {track.reqs.map((req, rIndex) => (
                                            <li key={rIndex}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section">
                <div className="container">
                    <h2 className="join-section-title">{t.process.title}</h2>
                    <div className="process-timeline">
                        {t.process.steps.map((step, index) => (
                            <div className="process-step" key={index}>
                                <div className="step-number">{step.number}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    {step.time && <p><strong>{lang === 'en' ? 'Time' : 'Thời gian'}:</strong> {step.time}</p>}
                                    {step.loc && <p><strong>{lang === 'en' ? 'Location' : 'Địa điểm'}:</strong> {step.loc}</p>}
                                    <div className="step-details">
                                        {step.details.map((detail, dIndex) => (
                                            <p key={dIndex} dangerouslySetInnerHTML={{ __html: detail }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="section">
                <div className="container">
                    <div className="contact-box">
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>{t.contact.title}</h2>
                        <p>{t.contact.text}</p>
                        <p style={{ margin: '1rem 0' }}>Email: <a href="mailto:mlandiotlab@gmail.com">mlandiotlab@gmail.com</a></p>
                        <p>Fanpage: <a href="https://facebook.com/hcmut.ml.iot.lab" target="_blank" rel="noreferrer">facebook.com/hcmut.ml.iot.lab</a></p>
                        <p style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{t.contact.footer}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinUs;
