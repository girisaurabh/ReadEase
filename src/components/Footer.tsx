import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 18, fontSize: 13, color: '#64748b' }}>
          <Link to="/" style={{ color: 'inherit' }}>Home</Link>
          <span>•</span>
          <Link to="/reading-workspace" style={{ color: 'inherit' }}>Reading Studio</Link>
          <span>•</span>
          <Link to="/text-to-speech" style={{ color: 'inherit' }}>Text to Speech</Link>
          <span>•</span>
          <Link to="/font-changer" style={{ color: 'inherit' }}>Font Changer</Link>
          <span>•</span>
          <Link to="/colour-overlay" style={{ color: 'inherit' }}>Colour Overlays</Link>
          <span>•</span>
          <Link to="/kids" style={{ color: 'inherit' }}>Kids</Link>
          <span>•</span>
          <Link to="/parents" style={{ color: 'inherit' }}>Parents</Link>
          <span>•</span>
          <Link to="/educators" style={{ color: 'inherit' }}>Educators</Link>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
          Built with Love by Ari — Recreated &amp; Enhanced for DyslexiEase
        </p>
      </div>
    </footer>
  );
};
