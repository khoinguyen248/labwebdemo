import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { PublicationData, MemberData } from '../types';
import './Publications.css';
import { FaExternalLinkAlt, FaCalendarAlt, FaUserEdit, FaBookOpen, FaTimes, FaLightbulb, FaAward, FaFlask, FaEnvelope, FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Publications: React.FC = () => {
    const [publications, setPublications] = useState<PublicationData[]>([]);
    const [members, setMembers] = useState<MemberData[]>([]);
    const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
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
                            "Tên": row[0]?.trim(),
                            "Vai trò": row[1]?.trim(),
                            "Areas of Interests": row[2]?.trim(),
                            "Team": row[3]?.trim(),
                            "Email": row[4]?.trim(),
                            "Github": row[5]?.trim(),
                            "Trang cá nhân (Facebook/Linkedln/Google scholar..)": row[6]?.trim(),
                            "Trường/Ngành": row[7]?.trim(),
                            "Thành tích/ Project cá nhân": row[8]?.trim(),
                            "Dự án thực hiện ở Lab": row[9]?.trim(),
                            "Hình đại diện": row[10]?.trim()
                        }));
                        setMembers(data);
                    },
                    error: (error: Error) => {
                        console.error('Error parsing Members CSV:', error);
                    }
                });
            } catch (error) {
                console.error('Error fetching Members CSV:', error);
            }
        };

        fetchPublications();
        fetchMembers();
    }, []);

    // Helper function to get avatar URL
    const getAvatarUrl = (member: MemberData) => {
        const rawAvatar = member['Hình đại diện']?.trim();
        const memberName = member['Tên']?.trim();

        let avatarUrl = 'avt.png';
        if (rawAvatar && rawAvatar !== '') {
            let cleanAvatar = rawAvatar;
            if (cleanAvatar.toLowerCase().startsWith('hình ảnh ')) {
                cleanAvatar = cleanAvatar.substring(9).trim();
            }
            avatarUrl = cleanAvatar.includes('.') ? cleanAvatar : `${cleanAvatar}.jpg`;
        } else if (memberName) {
            avatarUrl = `${memberName}.jpg`;
        }
        return avatarUrl;
    };

    // Helper function to get team class
    const getTeamClass = (member: MemberData) => {
        const role = member['Vai trò']?.toLowerCase() || '';
        const team = member['Team']?.toLowerCase() || '';
        if (team.includes('ai') || role.includes('ai')) return 'team-ai';
        if (team.includes('iot') || role.includes('iot')) return 'team-iot';
        if (team.includes('se') || role.includes('se')) return 'team-se';
        return '';
    };

    // Function to normalize Vietnamese text (remove diacritics)
    const removeDiacritics = (str: string): string => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    // Function to extract name parts
    const getNameParts = (name: string): string[] => {
        return name
            .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
            .split(/\s+/) // Split by whitespace
            .filter(part => part.length > 0)
            .map(part => removeDiacritics(part));
    };

    // Function to check if two names match (handles Vietnamese and English formats)
    const namesMatch = (authorName: string, memberName: string): boolean => {
        const authorParts = getNameParts(authorName);
        const memberParts = getNameParts(memberName);

        // If either name has less than 2 parts, require exact match
        if (authorParts.length < 2 || memberParts.length < 2) {
            return authorParts.join('') === memberParts.join('');
        }

        // Check if all significant parts of author name exist in member name or vice versa
        // Filter out very short parts (like middle initials)
        const significantAuthorParts = authorParts.filter(p => p.length >= 2);
        const significantMemberParts = memberParts.filter(p => p.length >= 2);

        // Check if all author parts are found in member parts
        const authorInMember = significantAuthorParts.every(authorPart =>
            significantMemberParts.some(memberPart => 
                memberPart.includes(authorPart) || authorPart.includes(memberPart)
            )
        );

        // Check if all member parts are found in author parts
        const memberInAuthor = significantMemberParts.every(memberPart =>
            significantAuthorParts.some(authorPart => 
                authorPart.includes(memberPart) || memberPart.includes(authorPart)
            )
        );

        return authorInMember || memberInAuthor;
    };

    // Function to find member by name with fuzzy matching
    const findMemberByName = (authorName: string): MemberData | null => {
        const trimmedName = authorName.trim();
        
        // First try exact match
        let member = members.find(m => m['Tên']?.toLowerCase() === trimmedName.toLowerCase());
        if (member) return member;

        // Then try fuzzy matching
        member = members.find(m => {
            const memberName = m['Tên']?.trim();
            if (!memberName) return false;
            return namesMatch(trimmedName, memberName);
        });

        return member || null;
    };

    // Function to render authors with clickable links
    const renderAuthors = (authorsString: string) => {
        if (!authorsString) return null;
        
        const authorNames = authorsString.split(',').map(name => name.trim());
        
        return (
            <span>
                {authorNames.map((authorName, index) => {
                    const member = findMemberByName(authorName);
                    
                    return (
                        <React.Fragment key={index}>
                            {member ? (
                                <span
                                    className="author-link"
                                    onClick={() => setSelectedMember(member)}
                                    title={`View ${authorName}'s profile`}
                                >
                                    {authorName}
                                </span>
                            ) : (
                                <span>{authorName}</span>
                            )}
                            {index < authorNames.length - 1 && ', '}
                        </React.Fragment>
                    );
                })}
            </span>
        );
    };

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
                                    {renderAuthors(item['Tác giả'])}
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

            {/* Member Profile Modal */}
            {selectedMember && (
                <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedMember(null)}>
                            <FaTimes />
                        </button>

                        <div className="modal-header-section">
                            <img
                                src={getAvatarUrl(selectedMember)}
                                alt={selectedMember['Tên']}
                                className="modal-avatar-large"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    const mName = selectedMember['Tên']?.trim();
                                    const nameImg = `${mName}.jpg`;
                                    if (!target.src.endsWith(encodeURIComponent(nameImg)) && !target.src.endsWith(nameImg)) {
                                        target.src = nameImg;
                                    } else {
                                        target.src = 'avt.png';
                                    }
                                }}
                            />
                            <div className="modal-info-block">
                                <span className={`modal-role-badge ${getTeamClass(selectedMember)}`}>
                                    {selectedMember['Vai trò']}
                                </span>
                                <h2>{selectedMember['Tên']}</h2>
                                <div className="modal-edu-text">
                                    {selectedMember['Trường/Ngành']}
                                </div>
                                
                                {/* Social Links in Modal */}
                                <div className="modal-social-links">
                                    {selectedMember['Email'] && (
                                        <a href={`mailto:${selectedMember['Email']}`} className="social-btn" title="Email">
                                            <FaEnvelope />
                                        </a>
                                    )}
                                    {selectedMember['Github'] && selectedMember['Github'].trim() && (
                                        <a href={selectedMember['Github']} target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                                            <FaGithub />
                                        </a>
                                    )}
                                    {selectedMember['Trang cá nhân (Facebook/Linkedln/Google scholar..)'] && selectedMember['Trang cá nhân (Facebook/Linkedln/Google scholar..)'].trim() && (
                                        <a href={selectedMember['Trang cá nhân (Facebook/Linkedln/Google scholar..)']} target="_blank" rel="noopener noreferrer" className="social-btn" title="Profile">
                                            {selectedMember['Trang cá nhân (Facebook/Linkedln/Google scholar..)'].includes('facebook') ? <FaFacebook /> : <FaLinkedin />}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-details">
                            {selectedMember['Areas of Interests'] && (
                                <div className="detail-block">
                                    <h4><FaLightbulb /> Areas of Interests</h4>
                                    <div className="detail-content">{selectedMember['Areas of Interests']}</div>
                                </div>
                            )}

                            {selectedMember['Thành tích/ Project cá nhân'] && (
                                <div className="detail-block">
                                    <h4><FaAward /> Achievements & Personal Projects</h4>
                                    <div className="detail-content">{selectedMember['Thành tích/ Project cá nhân']}</div>
                                </div>
                            )}

                            {selectedMember['Dự án thực hiện ở Lab'] && (
                                <div className="detail-block">
                                    <h4><FaFlask /> Lab Projects</h4>
                                    <div className="detail-content">{selectedMember['Dự án thực hiện ở Lab']}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Publications;
