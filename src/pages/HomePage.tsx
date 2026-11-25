import React from 'react';
import { Link } from 'react-router-dom';
import { BlobBackground } from '../components/Illustrations';

interface StatPillProps {
  num: string;
  label: string;
}

const StatPill: React.FC<StatPillProps> = ({ num, label }) => (
  <div className="stat-pill">
    <div className="stat-num">{num}</div>
    <div className="stat-label">{label}</div>
  </div>
);

interface IllusCardProps {
  label: string;
  color: string;
  delay: number;
  style: React.CSSProperties;
}

const FloatingIllusCard: React.FC<IllusCardProps> = ({ label, color, delay, style }) => (
  <div
    className="illus-card"
    style={{
      ...style,
      ['--color' as any]: color,
      ['--delay' as any]: `${delay}s`,
    }}
  >
    <div className="illus-label">{label}</div>
  </div>
);

interface ToolCardProps {
  to: string;
  title: string;
  desc: string;
  color: string;
  accent: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ to, title, desc, color, accent }) => (
  <Link to={to} className="tool-card" style={{ ['--tc' as any]: color, ['--ta' as any]: accent }}>
    <div className="tool-card-bar" />
    <h3>{title}</h3>
    <p>{desc}</p>
    <span className="tool-card-link">Try it →</span>
  </Link>
);

export const HomePage: React.FC = () => {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <BlobBackground />

        <div className="hero-content">
          <div>
            <div className="hero-badge">✨Free forever — no login needed✨</div>
          </div>
          <h1>
            Reading made <span className="highlight-blue">joyful</span> for<br />
            every <span className="highlight-purple">brilliant</span> mind
          </h1>
          <p className="hero-sub">
            DyslexiEase gives people with dyslexia superpowered reading tools — text-to-speech with sentence focus,
            dyslexia-friendly fonts, colour overlays, reading ruler, and formatted text export. 100% free, no signup, no fuss.
          </p>
          <div className="hero-ctas">
            <Link to="/reading-workspace" className="btn-primary">
              Open Reading Studio
            </Link>
            <Link to="/text-to-speech" className="btn-secondary">
              Start Listening
            </Link>
          </div>
          <div className="hero-stats">
            <StatPill num="1 in 5" label="people have dyslexia" />
            <StatPill num="100%" label="free, always" />
            <StatPill num="4 tools" label="ready right now" />
          </div>
        </div>

        {/* Floating Tag Badges */}
        <FloatingIllusCard label="📚Reading" color="#DBEAFE" delay={0.2} style={{ top: '18%', right: '4%' }} />
        <FloatingIllusCard label="🎵Listening" color="#EDE9FE" delay={0.5} style={{ top: '42%', right: '1%' }} />
        <FloatingIllusCard label="🎨Colours" color="#FCE7F3" delay={0.8} style={{ bottom: '22%', right: '6%' }} />
        <FloatingIllusCard label="📖Fonts" color="#D1FAE5" delay={1.0} style={{ top: '22%', left: '2%' }} />
        <FloatingIllusCard label="❤️You can do it!" color="#FEF3C7" delay={1.3} style={{ bottom: '28%', left: '1%' }} />
      </section>

      {/* Interactive Tools Strip */}
      <section className="tools-strip">
        <div className="tools-inner">
          <ToolCard
            to="/reading-workspace"
            title="Reading Studio"
            desc="All-in-one dyslexia reading workspace with customizable fonts, ruler & document uploader."
            color="#FEF3C7"
            accent="#F59E0B"
          />
          <ToolCard
            to="/text-to-speech"
            title="Text to Speech"
            desc="Hear text read aloud with synchronized sentence focus mode, natural voices, and clickable words."
            color="#DBEAFE"
            accent="#3B82F6"
          />
          <ToolCard
            to="/font-changer"
            title="Font Changer"
            desc="Switch to fonts built to prevent letter confusion, fine-tune spacing, and download formatted text."
            color="#EDE9FE"
            accent="#8B5CF6"
          />
          <ToolCard
            to="/colour-overlay"
            title="Colour Overlay"
            desc="Pick a background colour that makes reading click for you and calms visual stress."
            color="#D1FAE5"
            accent="#10B981"
          />
        </div>
      </section>
    </div>
  );
};
