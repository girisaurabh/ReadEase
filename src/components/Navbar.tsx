import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

interface NavbarProps {
  cursorEnabled: boolean;
  onToggleCursor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cursorEnabled, onToggleCursor }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="DyslexiEase Home">
          <img src="/logo.png" alt="DyslexiEase Logo" />
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/kids" className="nav-link">
            Kids
          </Link>
          <Link to="/parents" className="nav-link">
            Parents
          </Link>
          <Link to="/educators" className="nav-link">
            Educators
          </Link>

          <div className="nav-divider" />

          <Link to="/reading-workspace" className="nav-link tool-link" style={{ color: '#2563eb', fontWeight: 700 }}>
            Reading Studio
            <span className="nav-badge-pill">Studio</span>
          </Link>
          <Link to="/text-to-speech" className="nav-link tool-link">
            Text to Speech
          </Link>
          <Link to="/font-changer" className="nav-link tool-link">
            Font Changer
          </Link>
          <Link to="/colour-overlay" className="nav-link tool-link">
            Colour Overlays
          </Link>

          <div className="nav-divider" />

          <button
            type="button"
            className="nav-cursor-toggle"
            onClick={onToggleCursor}
            title={cursorEnabled ? 'Switch to standard cursor' : 'Turn on magic wand cursor'}
            aria-label="Toggle magic cursor"
          >
            <Wand2 size={14} color={cursorEnabled ? '#7c3aed' : '#9ca3af'} />
            <span style={{ fontSize: 12 }}>{cursorEnabled ? 'Wand On' : 'Wand Off'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
