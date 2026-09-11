import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, Sun, Moon, Menu, X, Award, GraduationCap, 
  FolderCode, Server, User, Mail, Phone, MapPin, 
  ExternalLink, BookOpen, Code2, Layers, 
  Database, BarChart3, Users, BadgeCheck, Trophy, Sparkles, Download, Cpu
} from 'lucide-react';

const Github = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function App() {
  // --- States ---
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [matchedSkill, setMatchedSkill] = useState(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [activeCertificate, setActiveCertificate] = useState(null);

  const [formState, setFormState] = useState({ name: '', email: '', message: '', botcheck: false });
  const [formStatus, setFormStatus] = useState({ text: '', type: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // --- Refs ---
  const cursorRef = useRef(null);
  const recruiterDashboardRef = useRef(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const glowCoords = useRef({ x: 0, y: 0 });
  const cursorActive = useRef(false);

  // --- Typewriter Effect ---
  const typewriterWords = [
    "Software Engineer Undergraduate", 
    "Full-Stack Developer", 
    "Smart India Hackathon '24 Winner", 
    "Team Lead"
  ];
  
  useEffect(() => {
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const typeEffect = () => {
      const currentWord = typewriterWords[wordIdx];
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypewriterText(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 30 : 65;

      if (!isDeleting && charIdx === currentWord.length) {
        speed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typewriterWords.length;
        speed = 400; // Pause before typing next word
      }

      timeoutId = setTimeout(typeEffect, speed);
    };

    typeEffect();
    return () => clearTimeout(timeoutId);
  }, []);

  // --- Theme Syncing ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen to OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // --- Recruiter Mode Body Class Sync ---
  useEffect(() => {
    if (recruiterMode) {
      document.body.classList.add('recruiter-mode-active');
      // Scroll to dashboard
      setTimeout(() => {
        recruiterDashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    } else {
      document.body.classList.remove('recruiter-mode-active');
      setMatchedSkill(null); // Reset skill highlight when off
    }
  }, [recruiterMode]);

  // --- Interactive Cursor Glow Follower ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (!cursorActive.current) {
        document.body.classList.add('cursor-active');
        cursorActive.current = true;
      }
    };

    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-active');
      cursorActive.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    const animateGlow = () => {
      const lerpFactor = 0.08;
      glowCoords.current.x += (mouseCoords.current.x - glowCoords.current.x) * lerpFactor;
      glowCoords.current.y += (mouseCoords.current.y - glowCoords.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${glowCoords.current.x}px`;
        cursorRef.current.style.top = `${glowCoords.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Card Tilt Glare Effect ---
  const handleCardMouseMove = (e, cardRef) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 18;
    const angleY = (x - xc) / 18;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`;
    card.style.transition = 'transform 0.1s ease-out';

    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    card.style.backgroundImage = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%), var(--card-bg)`;
  };

  const handleCardMouseLeave = (cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.backgroundImage = '';
  };

  // Create Ref helper for cards
  const createCardRefHelper = () => {
    const ref = useRef(null);
    return {
      ref,
      onMouseMove: (e) => handleCardMouseMove(e, ref),
      onMouseLeave: () => handleCardMouseLeave(ref)
    };
  };

  // --- Helpers for Skills Matcher ---
  const isSkillMatched = (techTags = [], description = '', title = '') => {
    if (!matchedSkill) return { matched: false, dimmed: false };
    const query = matchedSkill.toLowerCase();
    
    // Check tags
    const hasTagMatch = techTags.some(t => {
      const text = t.toLowerCase();
      return text.includes(query) || query.includes(text);
    });

    // Check title/desc
    const hasTextMatch = title.toLowerCase().includes(query) || description.toLowerCase().includes(query);

    const isMatch = hasTagMatch || hasTextMatch;
    return {
      matched: isMatch,
      dimmed: !isMatch
    };
  };

  const getMatchClasses = (techTags = [], description = '', title = '') => {
    const { matched, dimmed } = isSkillMatched(techTags, description, title);
    if (matched) return 'highlight-match';
    if (dimmed) return 'dimmed-non-match';
    return '';
  };

  // --- Handlers ---
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleRecruiterMode = () => setRecruiterMode(prev => !prev);
  const handleResumePrint = () => {
    const link = document.createElement('a');
    link.href = '/Komal_Kanwar_Resume.pdf';
    link.download = 'Komal_Kanwar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSkillMatcherTagClick = (skill) => {
    setMatchedSkill(prev => prev === skill ? null : skill);
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    if (formState.botcheck) return; // Silent discard spambots
    
    setFormSubmitting(true);
    setFormStatus({ text: 'Sending...', type: '' });

    const formData = new FormData();
    formData.append('access_key', '8cb564a1-c300-4ade-9b0b-b18d6f086c8a');
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      const json = await response.json();
      if (response.status === 200) {
        setFormStatus({ text: 'Thank you! Your message has been sent successfully.', type: 'success' });
        setFormState({ name: '', email: '', message: '', botcheck: false });
      } else {
        setFormStatus({ text: json.message || 'Something went wrong. Please try again.', type: 'error' });
      }
    })
    .catch(() => {
      setFormStatus({ text: 'Oops! Network error. Please try again later.', type: 'error' });
    })
    .finally(() => {
      setFormSubmitting(false);
      setTimeout(() => setFormStatus({ text: '', type: '' }), 6000);
    });
  };

  // --- Render Subcomponents Helpers ---
  const Card = ({ children, className = '', ...props }) => {
    const handlers = createCardRefHelper();
    return (
      <div 
        ref={handlers.ref}
        onMouseMove={handlers.onMouseMove}
        onMouseLeave={handlers.onMouseLeave}
        className={`${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }; // --- Project Data ---
  const projectsData = [
    {
      id: 'sih-project',
      category: 'backend',
      badge: 'SIH Winner',
      title: 'Parsing Social Media Applications',
      desc: 'A Flask and Selenium-based forensic platform built for the National Investigation Agency (NIA) to parse, analyze, and extract digital footprints across 7+ social platforms and location histories with a few clicks.',
      tags: ['Flask', 'Python', 'Selenium', 'SQL', 'Web Scraping', 'Geomapping'],
      links: <span className="project-link-disabled"><Award size={16} /> National Winner</span>
    },
    {
      id: 'ems-project',
      category: 'fullstack',
      badge: 'Live Demo',
      title: 'EMS (Employee Management System)',
      desc: 'A secure employee record management system featuring Role-Based Access Control (RBAC) to restrict and authorize data access dynamically for administrators and team members.',
      tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL'],
      links: <a href="https://ems-isoftzone.vercel.app" target="_blank" rel="noreferrer" className="project-link"><ExternalLink size={16} /> Live Demo</a>
    },
    {
      id: 'weekearn-project',
      category: 'fullstack',
      title: 'WeekEarn Portal',
      desc: 'A student employment platform featuring safe token-based authentication, interactive job matching, and real-time KPI dashboards for part-time opportunities.',
      tags: ['React', 'Node.js', 'JWT', 'Express.js'],
      links: <a href="https://github.com/komalkanwar04/WeekEarn" target="_blank" rel="noreferrer" className="project-link"><Github size={16} /> Repository</a>
    },
    {
      id: 'helmet-project',
      category: 'iot',
      badge: 'Research Paper',
      title: 'Smart Helmet System',
      desc: 'Designed an IoT-based smart helmet with real-time crash detection, GPS tracking, and alert triggers. Co-authored a research paper on the hardware-software communication architecture.',
      tags: ['IoT', 'Hardware', 'C++', 'Research'],
      links: <span className="project-link-disabled"><BookOpen size={16} /> Co-Authored Paper</span>
    },
    {
      id: 'eventhub-project',
      category: 'backend',
      title: 'EventHub360',
      desc: 'Designed and modeled a production-ready backend API covering authentication, booking engines, guest administration, and dynamic vendor management with Prisma and Postgres.',
      tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM'],
      links: <a href="https://github.com/soninancy080-spec/eventhub360-wedding-management-" target="_blank" rel="noreferrer" className="project-link"><Github size={16} /> Team Repository</a>
    }
  ];

  return (
    <>
      {/* Background glow elements */}
      <div className="glow-bg">
        <div className="glow-sphere sphere-1"></div>
        <div className="glow-sphere sphere-2"></div>
        <div className="glow-sphere sphere-3"></div>
      </div>

      {/* Interactive Cursor Follower */}
      <div ref={cursorRef} className="cursor-glow"></div>

      {/* Floating Navigation Bar */}
      <header className="navbar-wrapper">
        <nav className="navbar" id="navbar">
          <a href="#" className="nav-logo">KK<span>.</span></a>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="nav-links">
            <a href="#hero" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#skills" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#leadership" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Leadership</a>
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
          <div className="nav-actions">
            <button 
              className={`recruiter-toggle ${recruiterMode ? 'active' : ''}`} 
              onClick={toggleRecruiterMode} 
              aria-label="Toggle Recruiter Mode"
            >
              {recruiterMode ? <Sparkles size={16} /> : <Briefcase size={16} />}
              <span className="toggle-text">{recruiterMode ? 'Recruiter Mode On' : 'Recruiter Mode'}</span>
            </button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Color Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Recruiter Mode Quick Pitch Dashboard */}
        <div 
          ref={recruiterDashboardRef} 
          className="recruiter-dashboard-overlay container" 
          id="recruiter-dashboard"
        >
          <div className="recruiter-card glass-card">
            <div className="recruiter-header">
              <div className="recruiter-profile-summary">
                <Sparkles className="pulse-icon" size={20} />
                <h2>Recruiter Quick Pitch Dashboard</h2>
              </div>
              <button className="btn btn-primary btn-sm" id="download-resume-btn" onClick={handleResumePrint}>
                <Download size={15} /> Download Resume (PDF)
              </button>
            </div>
            <div className="recruiter-pitch-grid">
              <div className="pitch-col">
                <h3>The 30-Second Pitch</h3>
                <p className="pitch-text">
                  I am a high-performing Software Engineering B.Tech student (graduating 2027) with a strong <strong>8.787 CGPA</strong>, a <strong>National Winner</strong> title from Smart India Hackathon 2024, and real team leadership experience at iSoftZone. I build robust, production-ready full-stack systems and APIs that deliver concrete business value. Driven by strong <strong>leadership, collaborative problem-solving, and clear communication</strong>, I thrive in fast-paced Agile environments.
                </p>
              </div>
              <div className="pitch-stats">
                <div className="p-stat">
                  <span className="p-val">8.787</span>
                  <span className="p-lbl">CGPA (CSIT)</span>
                </div>
                <div className="p-stat">
                  <span className="p-val">SIH '24</span>
                  <span className="p-lbl">National 1st Place</span>
                </div>
                <div className="p-stat">
                  <span className="p-val">5-Dev</span>
                  <span className="p-lbl">Team Led</span>
                </div>
                <div className="p-stat">
                  <span className="p-val">10+</span>
                  <span className="p-lbl">REST APIs Built</span>
                </div>
              </div>
            </div>
            <div className="recruiter-skills-matcher">
              <h3>Skills Matcher</h3>
              <p>Click on any skill to highlight related projects and timeline achievements:</p>
              <div className="skills-filter-tags">
                {['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Flask', 'Python', 'IoT', 'Prisma ORM'].map(skill => (
                  <span 
                    key={skill}
                    className={`matcher-tag ${matchedSkill === skill ? 'active' : ''}`}
                    onClick={() => handleSkillMatcherTagClick(skill)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <div className="badge-sih">
                <Award size={16} />
                <span>Smart India Hackathon 2024 – National Winner</span>
              </div>
              <h1 className="hero-title">Hi, I'm <span className="gradient-text">Komal Kanwar</span></h1>
              <p className="hero-subtitle">B.Tech CSIT (2023–2027) | <span id="typewriter">{typewriterText}</span></p>
              
              {/* Print Only Header details */}
              <div className="hero-print-contact print-only" style={{ display: 'none' }}>
                +91 8827831317 &nbsp;|&nbsp; komalkanwar0407@gmail.com &nbsp;|&nbsp; Sukhliya, Indore, Madhya Pradesh &nbsp;|&nbsp; linkedin.com/in/komal-kanwar-429163288 &nbsp;|&nbsp; github.com/komalkanwar04
              </div>

              <p className="hero-description">
                Passionate full-stack developer, team lead, and systems thinker with proven experience in building scalable backend services, IoT safety systems, and roles-based web applications. Currently maintaining a 8.787/10 CGPA.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
              <div className="hero-socials">
                <a href="https://linkedin.com/in/komal-kanwar-429163288" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><Linkedin size={20} /></a>
                <a href="https://github.com/komalkanwar04" target="_blank" rel="noreferrer" aria-label="GitHub Profile"><Github size={20} /></a>
                <a href="mailto:komalkanwar0407@gmail.com" aria-label="Email Me"><Mail size={20} /></a>
                <a href="tel:+918827831317" aria-label="Call Me"><Phone size={20} /></a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="profile-card">
                <div className="profile-frame">
                  <img src="profile_headshot.jpg" alt="Komal Kanwar Profile" />
                </div>
                <div className="profile-status">
                  <span className="status-dot"></span>
                  <span>Open for Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="stats-section">
          <div className="container stats-container">
            <Card className="stat-card">
              <GraduationCap size={32} />
              <h3 className="stat-number">8.787<span className="stat-sub">/10</span></h3>
              <p className="stat-label">B.Tech CSIT CGPA</p>
            </Card>
            <Card className="stat-card">
              <Award size={32} />
              <h3 className="stat-number">1st</h3>
              <p className="stat-label">SIH National Winner</p>
            </Card>
            <Card className="stat-card">
              <FolderCode size={32} />
              <h3 className="stat-number">5+</h3>
              <p className="stat-label">Core Projects</p>
            </Card>
            <Card className="stat-card">
              <Server size={32} />
              <h3 className="stat-number">10+</h3>
              <p className="stat-label">REST APIs Maintained</p>
            </Card>
          </div>
        </section>

        {/* SIH Spotlight Section */}
        <section id="sih-spotlight" className={`sih-spotlight-section ${getMatchClasses(['Flask', 'Python', 'Selenium', 'SQL', 'Web Scraping', 'Geomapping'], 'Developed a digital footprint collection & forensic tool for the National Investigation Agency', 'Parsing Social Media Applications')}`}>
          <div className="container">
            <Card 
              className="sih-card glass-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveCertificate({ title: 'Smart India Hackathon 2024 National Winner - Team Cyber Vanguard', images: ['/sih_cheque.jpg', '/sih_stage.png'] })}
            >
              <div className="sih-glow"></div>
              <div className="sih-badge-large">
                <Trophy size={18} />
                <span>Smart India Hackathon 2024 National Winner</span>
              </div>
              <div className="sih-grid">
                <div className="sih-content">
                  <h2 className="gradient-text">Parsing Social Media Applications</h2>
                  <p className="sih-org">Organized by Ministry of Education, Govt. of India</p>
                  <p className="sih-problem-stmt">
                    <strong>Problem Statement:</strong> Developed a digital footprint collection & forensic tool for the <strong>National Investigation Agency (NIA)</strong> to fetch and map a victim's active digital footprint in just a few clicks.
                  </p>
                  <p className="sih-contribution">
                    <strong>My Contribution & Tech:</strong> Built robust web scrapers and data parsers utilizing <strong>Selenium</strong> and <strong>Python</strong> to extract history, activity, and communication files across 7+ social media and location platforms (including YouTube, Instagram, Facebook, WhatsApp, Telegram, Mastodon, Discord, Reddit, Google Maps timeline, and Google search history). Structured the SQL database schema and engineered the Flask backend.
                  </p>
                  <div className="sih-tags">
                    {['Flask', 'Python', 'Selenium', 'SQL', 'Web Scraping', 'Geomapping'].map(tag => (
                      <span key={tag} className={`tech-tag ${matchedSkill === tag ? 'highlight-match' : ''}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="sih-stat-visual">
                  <div className="sih-metric">
                    <span className="sih-metric-num">1st</span>
                    <span className="sih-metric-lbl">National Rank</span>
                  </div>
                  <div className="sih-metric">
                    <span className="sih-metric-num">36h</span>
                    <span className="sih-metric-lbl">Development</span>
                  </div>
                  <div className="sih-metric">
                    <span className="sih-metric-num">Govt.</span>
                    <span className="sih-metric-lbl">Endorsed</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <h2 className="section-title text-center">About Me</h2>
            <div className="about-grid">
              <div className="about-info">
                <Card className="about-card">
                  <div className="card-icon"><User size={20} /></div>
                  <h3>Professional Summary</h3>
                  <p>
                    Software Engineering undergraduate (B.Tech CSIT, 2023–2027), graduating June 2027 with a current CGPA of 8.787/10. Hands-on experience in full-stack development, system design, and RESTful API development. A Smart India Hackathon 2024 National Winner with proven experience leading a 5-member developer team, applying engineering best practices and coding standards, and supporting release planning across sprints. Proficient in Python, C++, SQL, and JavaScript, with AI/ML exposure (OpenCV, speech recognition) and interest in responsible AI use in financial technology. Collaborative, deadline-driven, and motivated to deliver scalable, reliable solutions in a fast-paced global technology team.
                  </p>
                </Card>
                <Card className="about-card">
                  <div className="card-icon"><GraduationCap size={20} /></div>
                  <h3>Education</h3>
                  <p>
                    <strong>B.Tech in Computer Science & Information Technology (CSIT)</strong><br />
                    Symbiosis University of Applied Sciences<br />
                    2023 – 2027 | Current CGPA: 8.787/10
                  </p>
                </Card>
              </div>
              <div className="about-visual">
                <div className="about-image-card glass-card">
                  <img src="profile.jpg" alt="Komal Kanwar Full Profile" className="about-image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="container">
            <h2 className="section-title text-center">Professional Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <Card className={`timeline-content glass-card ${getMatchClasses(['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs'], 'Led a 5-developer team, contributing to system specification and design for PERN-stack applications on EventHub360', 'Team Lead – Software Developer Intern')}`}>
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">Team Lead – Software Developer Intern</h3>
                      <span className="timeline-company">iSoftZone</span>
                    </div>
                    <span className="timeline-duration">2023 - Present</span>
                  </div>
                  <ul className="timeline-bullets">
                    <li>Led a 5-developer team, contributing to system specification and design for PERN-stack applications on EventHub360.</li>
                    <li>Wrote high-quality backend code following engineering best practices, translating client requirements into scalable solutions.</li>
                    <li>Supported release planning, reviewed code, and resolved integration issues to ensure reliable, on-time delivery.</li>
                    <li>Applied Agile practices and Git-based version control across 2-week sprints.</li>
                    <li>Performed system modeling and developed backend modules using Node.js, Express.js, PostgreSQL, and Prisma ORM.</li>
                    <li>Built and maintained 10+ REST API endpoints to ensure application reliability and performance.</li>
                  </ul>
                  <div className="timeline-tags">
                    {['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs'].map(tag => (
                      <span key={tag} className={`tech-tag ${matchedSkill === tag ? 'highlight-match' : ''}`}>{tag}</span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <h2 className="section-title text-center">Featured Projects</h2>
            
            <div className="project-filters">
              {['all', 'fullstack', 'backend', 'iot'].map(f => (
                <button 
                  key={f}
                  className={`filter-btn ${projectFilter === f ? 'active' : ''}`}
                  onClick={() => setProjectFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {projectsData
                .filter(p => projectFilter === 'all' || p.category === projectFilter)
                .map(project => (
                  <Card 
                    key={project.id}
                    className={`project-card glass-card ${getMatchClasses(project.tags, project.desc, project.title)}`}
                  >
                    <div className="project-header">
                      {project.badge && <div className="project-badge">{project.badge}</div>}
                      <h3 className="project-title">{project.title}</h3>
                    </div>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className={`tech-tag ${matchedSkill === tag ? 'highlight-match' : ''}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="container">
            <h2 className="section-title text-center">Technical Skills</h2>
            <div className="skills-grid">
              <Card className={`skills-card glass-card ${getMatchClasses(['Python', 'JavaScript', 'SQL', 'HTML/CSS', 'C/C++'])}`}>
                <h3><Code2 size={18} /> Languages</h3>
                <div className="skills-list">
                  {['Python', 'JavaScript', 'SQL', 'HTML/CSS', 'C/C++'].map(skill => (
                    <span key={skill} className={`skill-item ${matchedSkill === skill ? 'highlight-match' : ''}`}>{skill}</span>
                  ))}
                </div>
              </Card>

              <Card className={`skills-card glass-card ${getMatchClasses(['React', 'Node.js', 'Express.js', 'Flask'])}`}>
                <h3><Layers size={18} /> Frameworks</h3>
                <div className="skills-list">
                  {['React', 'Node.js', 'Express.js', 'Flask'].map(skill => (
                    <span key={skill} className={`skill-item ${matchedSkill === skill ? 'highlight-match' : ''}`}>{skill}</span>
                  ))}
                </div>
              </Card>

              <Card className={`skills-card glass-card ${getMatchClasses(['PostgreSQL', 'MySQL', 'Prisma ORM'])}`}>
                <h3><Database size={18} /> Databases</h3>
                <div className="skills-list">
                  {['PostgreSQL', 'MySQL', 'Prisma ORM'].map(skill => (
                    <span key={skill} className={`skill-item ${matchedSkill === skill ? 'highlight-match' : ''}`}>{skill}</span>
                  ))}
                </div>
              </Card>

              <Card className={`skills-card glass-card ${getMatchClasses(['SQL', 'MS Excel', 'Data Cleaning', 'Data Visualization', 'Dashboard Development'])}`}>
                <h3><BarChart3 size={18} /> Data Analytics</h3>
                <div className="skills-list">
                  {['SQL', 'MS Excel', 'Data Cleaning', 'Data Visualization', 'Dashboard Development'].map(skill => (
                    <span key={skill} className={`skill-item ${matchedSkill === skill ? 'highlight-match' : ''}`}>{skill}</span>
                  ))}
                </div>
              </Card>

              <Card className={`skills-card glass-card ${getMatchClasses(['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'SDLC', 'REST APIs', 'Git', 'Agile', 'Debugging'])}`}>
                <h3><Cpu size={18} /> Core</h3>
                <div className="skills-list">
                  {['DSA & OOP', 'DBMS & OS', 'CN & SDLC', 'REST APIs', 'Git & Agile', 'Debugging'].map(skill => (
                    <span key={skill} className={`skill-item ${matchedSkill === skill ? 'highlight-match' : ''}`}>{skill}</span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership & Activities Section */}
        <section id="leadership" className="leadership-section">
          <div className="container">
            <h2 className="section-title text-center">Leadership & Extra-Curriculars</h2>
            <div className="leadership-grid">
              <Card className="leadership-item glass-card">
                <div className="leadership-icon"><Users size={20} /></div>
                <h3>Vice President</h3>
                <h4 className="sub-heading">CODEC Club</h4>
                <p>Led club initiatives, organized and coordinated multiple technical events, and managed activities for a community of 100+ members.</p>
              </Card>
              <Card className="leadership-item glass-card">
                <div className="leadership-icon"><Briefcase size={20} /></div>
                <h3>Senior Student Placement Coordinator</h3>
                <h4 className="sub-heading">Symbiosis Placement Cell</h4>
                <p>Supported university-wide placement drives, coordinated between placement officers, corporate recruiters, and graduating students.</p>
              </Card>
              <Card 
                className="leadership-item glass-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveCertificate({ title: 'ACM Student Chapter Membership Certificate', img: '/cert_acm_membership.png' })}
              >
                <div className="leadership-icon"><GraduationCap size={20} /></div>
                <h3>ACM Chapter Lead</h3>
                <h4 className="sub-heading">ACM Women Vice Chair & Student Development Chair</h4>
                <p>Organized various ACM chapter programs, hands-on coding workshops, hackathons, and technical panels for university students.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="certifications-section">
          <div className="container">
            <h2 className="section-title text-center">Certifications</h2>
            <div className="certifications-grid">
              {[
                { name: 'Symbiosis Skill Hackathon 2026', proof: '/cert_hackathon_2026.png', tag: 'Team AKAI' },
                { name: 'AWS Academy Graduate - Cloud Foundations', proof: '/cert_aws_academy.png', link: 'https://www.credly.com/go/KuZ6c65G' },
                { name: 'IEEE World Skills Appreciation (2025)', proof: '/cert_ieee_worldskills.png', tag: 'Student Volunteer' },
                { name: 'ISRO National Space Day Appreciation (2025)', proof: '/cert_space_day.png', tag: 'Event Coordinator' },
                { name: 'Microsoft AI Skills Challenge' },
                { name: 'IBM AI' },
                { name: 'Infosys Agile' },
                { name: 'Infosys DBMS & SQL' }
              ].map(cert => (
                <Card 
                  key={cert.name} 
                  className={`cert-item glass-card ${cert.proof ? 'has-proof' : ''}`}
                  style={cert.proof ? { cursor: 'pointer', transition: 'border-color 0.3s ease' } : {}}
                  onClick={cert.proof ? () => setActiveCertificate({ title: cert.name, img: cert.proof }) : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    <BadgeCheck size={18} style={{ color: cert.proof ? 'var(--primary-color)' : 'var(--text-secondary)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: cert.proof ? 600 : 400 }}>{cert.name}</span>
                      {cert.tag && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cert.tag}</span>}
                    </div>
                  </div>
                  {cert.proof && (
                    <div style={{ marginLeft: 'auto', display: 'flex', color: 'var(--primary-color)', opacity: 0.8 }}>
                      <Award size={16} />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container contact-container">
            <div className="contact-info">
              <h2 className="section-title">Let's Connect</h2>
              <p className="contact-tagline">Interested in my work or want to collaborate? Feel free to drop a message or contact me directly.</p>
              <div className="contact-details">
                <div className="contact-detail-item">
                  <Mail size={20} />
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:komalkanwar0407@gmail.com">komalkanwar0407@gmail.com</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <Phone size={20} />
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+918827831317">+91 8827831317</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <MapPin size={20} />
                  <div>
                    <h4>Location</h4>
                    <p>Sukhliya, Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper glass-card">
              <form id="contact-form" className="contact-form" onSubmit={handleContactFormSubmit}>
                {/* Spam Honeypot Field */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  className="hidden" 
                  style={{ display: 'none' }}
                  checked={formState.botcheck}
                  onChange={(e) => setFormState(prev => ({ ...prev, botcheck: e.target.checked }))}
                />
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="John Doe" 
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com" 
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Your message here..." 
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block" 
                  id="form-submit-btn"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {formStatus.text && (
                <div id="form-status" className={`form-status ${formStatus.type}`}>
              {formStatus.text}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Proof Lightbox Modal */}
      {activeCertificate && (
        <div 
          className="certificate-modal-overlay" 
          onClick={() => setActiveCertificate(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            cursor: 'pointer',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div 
            className="certificate-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {activeCertificate.title}
              </h3>
              <button 
                onClick={() => setActiveCertificate(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ width: '100%', maxHeight: '70vh', overflow: 'auto', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', backgroundColor: '#0f0f11', padding: '1rem' }}>
              {activeCertificate.images ? (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {activeCertificate.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`${activeCertificate.title} - proof ${idx + 1}`} 
                      style={{ maxWidth: '100%', maxHeight: '55vh', height: 'auto', display: 'block', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    />
                  ))}
                </div>
              ) : (
                <img 
                  src={activeCertificate.img} 
                  alt={activeCertificate.title} 
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="main-footer">
        <div className="container footer-container">
          <p>&copy; 2026 Komal Kanwar. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://linkedin.com/in/komal-kanwar-429163288" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/komalkanwar04" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
