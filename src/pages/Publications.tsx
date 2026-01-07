import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { PublicationData } from '../types';
import './Publications.css';
import { FaExternalLinkAlt, FaCalendarAlt, FaUserEdit, FaBookOpen } from 'react-icons/fa';

const Publications: React.FC = () => {
    const [publications, setPublications] = useState<PublicationData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await fetch('/Thông tin cho devWeb - Publications.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);

                Papa.parse(csv, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        // Filter out empty rows if any
                        const data = (results.data as PublicationData[]).filter(item => item['Tên bài báo']);
                        setPublications(data);
                        setLoading(false);
                    },
                    error: (error: Error) => {
                        console.error('Error parsing CSV:', error);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading research papers...</p>
            </div>
        );
    }

    return (
        <div className="publications-page">
            <section className="publications-hero">
                <div className="container">
                    <h1 className="hero-title">Publications</h1>
                    <p className="hero-subtitle">Our research contributions to the scientific community in AI, IoT, and Computer Science.</p>
                </div>
            </section>

            <div className="container page-content">
                <div className="publications-list">
                    {publications.map((item, index) => (
                        <div className="publication-card" key={index}>
                            <div className="pub-date">
                                <FaCalendarAlt className="icon" />
                                <span>{item['tháng/năm']}</span>
                            </div>
                            <h2 className="pub-title">{item['Tên bài báo']}</h2>
                            <div className="pub-journal">
                                <FaBookOpen className="icon" />
                                <span>{item['Hội nghị/ tạp chí xuất bản (có thể thêm địa điểm tổ chức)']}</span>
                            </div>
                            {item['Tác giả'] && (
                                <div className="pub-authors">
                                    <FaUserEdit className="icon" />
                                    <span>{item['Tác giả']}</span>
                                </div>
                            )}
                            <div className="pub-abstract">
                                <h3>Abstract</h3>
                                <p>{item['Abstract']}</p>
                            </div>
                            <div className="pub-footer">
                                <a
                                    href={item['Link bài báo']}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                >
                                    Read Full Paper <FaExternalLinkAlt />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Publications;
