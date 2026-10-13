import React from 'react';
import { Link } from 'react-router-dom';
import {
  KidReadingIllustration,
  MicShape,
  FontShape,
  ColourShape,
  DecoStar,
  DecoBlob,
  DotCluster,
} from '../components/Illustrations';

interface KidToolCardProps {
  to: string;
  title: string;
  desc: string;
  bg: string;
  accent: string;
  shape: React.ReactNode;
}

const KidToolCard: React.FC<KidToolCardProps> = ({ to, title, desc, bg, accent, shape }) => (
  <Link
    to={to}
    className="ktc"
    style={{
      ['--ktc-bg' as any]: bg,
      ['--ktc-a' as any]: accent,
    }}
  >
    <div className="ktc-shape">{shape}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
    <span className="ktc-arrow">Try it →</span>
  </Link>
);

const FLOATING_LETTERS = [
  { l: 'A', x: '5%', y: '15%', color: '#8B5CF6', size: 48, delay: 0, rotate: -12 },
  { l: 'b', x: '88%', y: '20%', color: '#3B82F6', size: 40, delay: 0.6, rotate: 8 },
  { l: 'd', x: '92%', y: '52%', color: '#10B981', size: 36, delay: 1.2, rotate: -5 },
  { l: 'p', x: '3%', y: '55%', color: '#F59E0B', size: 44, delay: 0.9, rotate: 14 },
  { l: 'q', x: '8%', y: '78%', color: '#EC4899', size: 32, delay: 0.3, rotate: -8 },
  { l: 'R', x: '85%', y: '78%', color: '#8B5CF6', size: 38, delay: 1.5, rotate: 6 },
];

export const KidsPage: React.FC = () => {
  return (
    <div className="kids-page">
      {/* Decorative Blobs */}
      <DecoBlob color="#8B5CF6" opacity={0.12} style={{ top: -60, right: -60, width: 400, height: 400 }} />
      <DecoBlob color="#3B82F6" opacity={0.1} style={{ bottom: 100, left: -80, width: 360, height: 360 }} />
      <DecoBlob color="#10B981" opacity={0.1} style={{ top: '40%', right: '5%', width: 280, height: 280 }} />

      {/* Floating Letters */}
      {FLOATING_LETTERS.map((item, idx) => (
        <div
          key={idx}
          className="floating-letter"
          style={{
            left: item.x,
            top: item.y,
            color: item.color,
            fontSize: item.size,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotate}deg)`,
          }}
        >
          {item.l}
        </div>
      ))}

      {/* Decorative Stars and Clusters */}
      <DecoStar style={{ top: '12%', left: '18%' }} color="#FCD34D" size={20} />
      <DecoStar style={{ top: '28%', right: '22%' }} color="#A78BFA" size={14} />
      <DecoStar style={{ top: '65%', left: '14%' }} color="#6EE7B7" size={18} />
      <DecoStar style={{ bottom: '18%', right: '18%' }} color="#FCA5A5" size={22} />
      <DotCluster style={{ top: '8%', right: '28%' }} />
      <DotCluster style={{ bottom: '25%', left: '10%' }} />

      <div className="kids-inner">
        {/* Hero Row */}
        <div className="kids-hero-row">
          <div className="kids-hero-text">
            <h1>
              Your brain works
              <br />
              <span className="kids-accent">differently.</span>
              <br />
              That's a good thing.
            </h1>
            <p>Dyslexia doesn't mean you're behind. It means you think in a way most people can't.</p>
          </div>
          <div className="kids-hero-art">
            <KidReadingIllustration />
          </div>
        </div>

        {/* Message Card */}
        <div className="kids-message">
          <div className="kids-message-accent" />
          <div className="kids-message-body">
            <h2>You are not behind.</h2>
            <p>
              Dyslexia means your brain processes words in its own way — not a wrong way, just a different one. Reading
              might take a little more effort, but that same brain is often brilliant at seeing the big picture,
              solving problems, and thinking creatively in ways others simply can't.
            </p>
            <p>
              The tools here are built to make reading easier, so you can focus on what you actually want to say and
              learn.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="kids-tools">
          <p className="kids-tools-label">Tools built for you</p>
          <div className="kids-tools-grid">
            <KidToolCard
              to="/text-to-speech"
              title="Listen to text"
              desc="Paste anything and hear it read aloud at whatever speed works for you."
              bg="#DBEAFE"
              accent="#3B82F6"
              shape={<MicShape />}
            />
            <KidToolCard
              to="/font-changer"
              title="Change the font"
              desc="Swap any text into a font where letters don't flip or get confused."
              bg="#EDE9FE"
              accent="#8B5CF6"
              shape={<FontShape />}
            />
            <KidToolCard
              to="/colour-overlay"
              title="Change the colour"
              desc="A different background colour can make words sit still on the page."
              bg="#D1FAE5"
              accent="#10B981"
              shape={<ColourShape />}
            />
          </div>
        </div>

        {/* Encouraging Note */}
        <p className="kids-note">
          Reading might take longer sometimes — and that's okay. Ask for help when you need it. You are always enough.
        </p>
      </div>
    </div>
  );
};
