import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { ProjectData } from '../types';
import './Project.css';
import { FaGithub, FaUsers } from 'react-icons/fa';

const Project: React.FC = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/Thông tin cho devWeb - Projects.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);

                Papa.parse(csv, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        // Filter out empty rows or instruction rows
                        const data = (results.data as any[]).filter(item =>
                            item['Tên'] && item['Tên'] !== 'Tên' && !item['Tên'].startsWith('Yêu cầu')
                        ).map(item => ({
                            "Tên": item['Tên'],
                            "Giải thưởng": item['Giải thưởng'],
                            "Thành viên nhóm": item['Thành viên nhóm'],
                            "Mô tả": item['Mô tả'],
                            "Link git": item['Link git']
                        }));
                        setProjects(data);
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

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="projects-page">
            <section className="projects-hero">
                <div className="container">
                    <h1 className="hero-title">Our Projects</h1>
                    <p className="hero-subtitle" style={{ textAlign: 'center', marginLeft: "80px" }}>Innovative solutions and research projects developed by MLIoT Lab members.</p>
                </div>
            </section>

            <div className="container page-content">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div className="project-card" key={index}>
                            <div className="project-body">
                                {project['Giải thưởng'] ? (
                                    <span className="project-tag award">{project['Giải thưởng']}</span>
                                ) : (
                                    <span className="project-tag">Lab Project</span>
                                )}

                                <h2 className="project-title">{project['Tên']}</h2>

                                {project['Mô tả'] && (
                                    <p className="project-description">{project['Mô tả']}</p>
                                )}

                                <div className="project-meta">
                                    <div className="project-members">
                                        <FaUsers className="icon" />
                                        <span>{project['Thành viên nhóm']}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="project-footer">
                                {project['Link git'] && (
                                    <a
                                        href={project['Link git']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="github-link"
                                    >
                                        <FaGithub /> GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;

