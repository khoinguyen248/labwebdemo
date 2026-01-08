import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { ProjectData } from '../types';
import './Project.css';
import { FaGithub, FaUsers, FaTrophy, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Project: React.FC = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

    const toggleProjectExpansion = (index: number) => {
        setExpandedProjects(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // Function to parse competition name from brackets
    const parseCompetitionAndName = (fullName: string): { competition: string; projectName: string } => {
        if (!fullName || fullName.trim() === '') {
            return { competition: 'Lab Project', projectName: 'Untitled Project' };
        }
        
        const bracketMatch = fullName.match(/\[(.*?)\]/);
        if (bracketMatch) {
            const competition = bracketMatch[1].trim();
            const projectName = fullName.replace(/\[.*?\]/, '').trim();
            return { competition, projectName: projectName || 'Project' };
        }
        // Check if it's a summer course project (khóa hè)
        if (fullName.toLowerCase().includes('khóa hè') || fullName.toLowerCase().includes('project khóa hè')) {
            return { competition: 'Lab Project', projectName: 'Summer Course Project' };
        }
        return { competition: 'Lab Project', projectName: fullName };
    };

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
                        ).map(item => {
                            const { competition, projectName } = parseCompetitionAndName(item['Tên']);
                            return {
                                "Tên": item['Tên'],
                                "Competition": competition,
                                "Project Name": projectName,
                                "Giải thưởng": item['Giải thưởng'],
                                "Thành viên nhóm": item['Thành viên nhóm'],
                                "Mô tả": item['Mô tả'],
                                "Link git": item['Link git']
                            };
                        });
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
                    {projects.map((project, index) => {
                        const isExpanded = expandedProjects.has(index);
                        const hasDescription = project['Mô tả'] && project['Mô tả'].trim();
                        const descriptionLength = project['Mô tả']?.length || 0;
                        const shouldShowToggle = descriptionLength > 150; // Show toggle if description is long

                        return (
                            <div className="project-card" key={index}>
                                <div className="project-body">
                                    {/* Competition Name and Award on same line */}
                                    <div className="competition-header">
                                        <span className={`competition-tag ${project['Competition'] === 'Lab Project' ? 'lab-project' : 'competition'}`}>
                                            {project['Competition']}
                                        </span>
                                        {/* Award/Ranking */}
                                        {project['Giải thưởng'] && project['Giải thưởng'].trim() && (
                                            <div className="project-award">
                                                <FaTrophy className="award-icon" />
                                                <span className="award-text">{project['Giải thưởng']}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Name */}
                                    <h2 className="project-title">{project['Project Name']}</h2>

                                    {/* Description with Expand/Collapse */}
                                    {hasDescription && (
                                        <div className="project-description-section">
                                            <div className="description-header">
                                                <h4>Description</h4>
                                                {shouldShowToggle && (
                                                    <button 
                                                        className="expand-toggle"
                                                        onClick={() => toggleProjectExpansion(index)}
                                                        aria-label={isExpanded ? "Collapse" : "Expand"}
                                                    >
                                                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                                    </button>
                                                )}
                                            </div>
                                            <p className={`project-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
                                                {project['Mô tả']}
                                            </p>
                                        </div>
                                    )}

                                    {/* Members */}
                                    {project['Thành viên nhóm'] && (
                                        <div className="project-meta">
                                            <div className="project-members">
                                                <FaUsers className="icon" />
                                                <div>
                                                    <span className="meta-label">Team Members:</span>
                                                    <span className="meta-value">{project['Thành viên nhóm']}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* GitHub Link */}
                                <div className="project-footer">
                                    {project['Link git'] && project['Link git'].trim() && (
                                        <a
                                            href={project['Link git']}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="github-link"
                                        >
                                            <FaGithub /> View on GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Project;

