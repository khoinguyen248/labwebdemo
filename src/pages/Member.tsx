import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { MemberData } from '../types';
import './Member.css';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaGraduationCap, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PaginatedMemberGrid: React.FC<{ members: MemberData[], renderCard: (m: MemberData) => React.ReactNode }> = ({ members, renderCard }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(members.length / itemsPerPage);

    const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

    const currentMembers = members.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    if (members.length <= itemsPerPage) {
        return (
            <div className="members-standard-grid">
                {members.map(renderCard)}
            </div>
        );
    }

    return (
        <div className="paginated-section">
            <div className="members-standard-grid">
                {currentMembers.map(renderCard)}
            </div>
            <div className="pagination-controls">
                <button onClick={prevPage} className="pagination-btn" aria-label="Previous page">
                    <FaChevronLeft />
                </button>
                <div className="pagination-dots">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i)}
                        ></span>
                    ))}
                </div>
                <button onClick={nextPage} className="pagination-btn" aria-label="Next page">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

const Member: React.FC = () => {
    const [members, setMembers] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/Thông tin cho devWeb - Member.csv');
                const reader = response.body?.getReader();
                const result = await reader?.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value);

                Papa.parse(csv, {
                    header: false,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const rows = (results.data as string[][]).slice(2);

                        const data: MemberData[] = rows.filter(row => row[0]).map(row => ({
                            "Tên": row[0],
                            "Vai trò": row[1],
                            "Areas of Interests": row[2],
                            "Team": row[3],
                            "Email": row[4],
                            "Github": row[5],
                            "Trang cá nhân (Facebook/Linkedln/Google scholar..)": row[6],
                            "Trường/Ngành": row[7],
                            "Thành tích/ Project cá nhân": row[8],
                            "Dự án thực hiện ở Lab": row[9],
                            "Hình đại diện": row[10]
                        }));
                        setMembers(data);
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

        fetchMembers();
    }, []);

    const renderMemberCard = (member: MemberData) => {
        const rawAvatar = member['Hình đại diện']?.trim();
        const memberName = member['Tên']?.trim();

        let avatarUrl = 'avt.png';
        if (rawAvatar && rawAvatar !== '') {
            avatarUrl = rawAvatar.includes('.') ? rawAvatar : `${rawAvatar}.jpg`;
        } else if (memberName) {
            avatarUrl = `${memberName}.jpg`;
        }

        let teamClass = '';
        const role = member['Vai trò']?.toLowerCase() || '';
        const team = member['Team']?.toLowerCase() || '';

        if (team.includes('ai') || role.includes('ai')) teamClass = 'team-ai';
        else if (team.includes('iot') || role.includes('iot')) teamClass = 'team-iot';
        else if (team.includes('se') || role.includes('se')) teamClass = 'team-se';

        return (
            <div className={`member-card-standard ${teamClass}`} key={member['Tên']}>
                <div className="card-avatar-section">
                    <img
                        src={avatarUrl}
                        alt={member['Tên']}
                        className="circle-avatar"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'avt.png'; }}
                    />
                </div>
                <div className="card-info-section">
                    <div className="card-header-flex">
                        <h3 className="member-name-text">{member['Tên']}</h3>
                        {teamClass && (
                            <span className={`team-badge ${teamClass}`}>
                                {teamClass === 'team-ai' ? 'AI' : teamClass === 'team-iot' ? 'IoT' : 'SE'}
                            </span>
                        )}
                    </div>
                    <p className="member-role-text">{member['Vai trò']}</p>
                    <div className="card-edu-line">
                        <FaGraduationCap className="edu-icon-small" />
                        <span className="edu-text">{member['Trường/Ngành']}</span>
                    </div>
                    <div className="card-social-links">
                        {member['Email'] && (
                            <a href={`mailto:${member['Email']}`} className="social-btn" title="Email"><FaEnvelope /></a>
                        )}
                        {member['Github'] && member['Github'].trim() && (
                            <a href={member['Github']} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub"><FaGithub /></a>
                        )}
                        {member['Trang cá nhân (Facebook/Linkedln/Google scholar..)'] && member['Trang cá nhân (Facebook/Linkedln/Google scholar..)'].trim() && (
                            <a href={member['Trang cá nhân (Facebook/Linkedln/Google scholar..)']} target="_blank" rel="noopener noreferrer" className="social-btn" title="Profile">
                                {member['Trang cá nhân (Facebook/Linkedln/Google scholar..)'].includes('facebook') ? <FaFacebook /> : <FaLinkedin />}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const getGroup = (rolePattern: string | string[]) => {
        if (Array.isArray(rolePattern)) {
            return members.filter(m => rolePattern.some(p => m['Vai trò']?.toLowerCase().includes(p.toLowerCase())));
        }
        return members.filter(m => m['Vai trò']?.toLowerCase().includes(rolePattern.toLowerCase()));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Meeting the team...</p>
            </div>
        );
    }

    const headOfLab = getGroup('Head of Lab');
    const labManagers = getGroup('Lab Manager').filter(m => !m['Vai trò'].toLowerCase().includes('former'));
    const leaders = getGroup('Leader');
    const coreMembers = getGroup('Core Member');
    const regularMembers = getGroup('Member').filter(m =>
        !m['Vai trò'].toLowerCase().includes('leader') &&
        !m['Vai trò'].toLowerCase().includes('core') &&
        !m['Vai trò'].toLowerCase().includes('manager') &&
        !m['Vai trò'].toLowerCase().includes('head')
    );
    const formerMembers = getGroup('Former');

    return (
        <div className="member-page">
            <section className="member-hero">
                <div className="container">
                    <h1 className="hero-title">Our People</h1>
                    <p className="hero-subtitle" style={{ textAlign: 'center', marginLeft: "80px" }}>Meet the brilliant minds behind MLIoT Lab's research and innovation.</p>
                </div>
            </section>

            <div className="container page-content">
                {headOfLab.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Head of Lab</h2>
                        <div className="members-standard-grid center-single">
                            {headOfLab.map(renderMemberCard)}
                        </div>
                    </section>
                )}

                {labManagers.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Lab Management</h2>
                        <PaginatedMemberGrid members={labManagers} renderCard={renderMemberCard} />
                    </section>
                )}

                {leaders.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Team Leaders</h2>
                        <PaginatedMemberGrid members={leaders} renderCard={renderMemberCard} />
                    </section>
                )}

                {coreMembers.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Core Members</h2>
                        <PaginatedMemberGrid members={coreMembers} renderCard={renderMemberCard} />
                    </section>
                )}

                {regularMembers.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Members</h2>
                        <PaginatedMemberGrid members={regularMembers} renderCard={renderMemberCard} />
                    </section>
                )}

                {formerMembers.length > 0 && (
                    <section className="member-section">
                        <h2 className="section-label">Alumni</h2>
                        <PaginatedMemberGrid members={formerMembers} renderCard={renderMemberCard} />
                    </section>
                )}
            </div>
        </div>
    );
};

export default Member;
