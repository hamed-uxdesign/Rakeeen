import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MascotFace } from '../ui/MascotFace';
import { useSiteContext } from '../../contexts/SiteContext';
import { useLang } from '../../contexts/LangContext';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ isOverlay }: { isOverlay?: boolean }) => {
  const { siteConfig, settings, updateSettings } = useSiteContext();
  const { lang, setLang, t, resolveField, resolveFieldPlain } = useLang() as any;
  const location = useLocation();
  const isDark = settings.theme === 'dark';
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t('home'),     path: '/' },
    { name: t('projects'), path: '/projects' },
    { name: t('about'),    path: '/about' },
    { name: t('contact'),  path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleTheme = () => {
    updateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  const siteName = resolveField(siteConfig.name);

  return (
    <nav 
      className={`navbar-container ${isOverlay ? 'overlay-nav' : ''}`}
      style={isOverlay ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        borderBottom: 'none',
        zIndex: 1000
      } : {}}
    >
      {/* Logo */}
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        {(siteConfig.siteImages?.navbarLogo || siteConfig.siteImages?.aboutPortrait) ? (
          <div style={{ 
            width: 35, 
            height: 35, 
            borderRadius: "50%", 
            border: `1.5px solid ${isOverlay ? '#faf6ee' : 'var(--sepia)'}`, 
            overflow: "hidden", 
            background: "var(--paper-dark)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={siteConfig.siteImages.navbarLogo || siteConfig.siteImages.aboutPortrait} 
              alt="RAKEEEEN" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ) : (
          <MascotFace size={32} color={isOverlay ? '#faf6ee' : 'var(--ink)'} />
        )}
        <span className="sketch-font text-lg md:text-xl font-bold" style={{ color: isOverlay ? '#faf6ee' : 'var(--ink)' }}>
          Rakeeeeeen
        </span>
      </Link>

      {/* Mobile Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={isOverlay ? { color: '#faf6ee' } : {}}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Nav Links & Controls */}
      <div className={`navbar-content ${isMenuOpen ? 'mobile-open' : ''} ${isOverlay ? 'overlay-content' : ''}`}>
        <div className="nav-links-wrap">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              style={isOverlay ? { color: '#faf6ee', opacity: 0.7 } : {}}
            >
              {name}
            </Link>
          ))}
        </div>
        
        <div className="nav-controls">
          <div className={`custom-select-container ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
            <div className={`custom-select-trigger ${isOverlay ? 'overlay-trigger' : ''}`} style={isOverlay ? { background: 'rgba(250, 246, 238, 0.1)', color: '#faf6ee', borderColor: 'rgba(250, 246, 238, 0.2)' } : {}}>
              {lang.toUpperCase()}
            </div>
            <div className="custom-select-options">
              {['en', 'ar', 'it'].map((l) => (
                <div 
                  key={l} 
                  className={`custom-select-option ${lang === l ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLang(l as any);
                    setIsLangOpen(false);
                  }}
                >
                  {l.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title="Toggle Theme"
          >
              {isDark ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOverlay ? "#faf6ee" : "var(--ink)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                      <path d="M17 4l.5 1.5M19 6l1.5.5M15 8l-1-2" opacity="0.6" />
                  </svg>
              ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOverlay ? "#faf6ee" : "var(--ink)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      <path d="M9 9l-1-1M15 15l1 1" opacity="0.4" />
                  </svg>
              )}
          </button>
        </div>
      </div>
    </nav>
  );
};

