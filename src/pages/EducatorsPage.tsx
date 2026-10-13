import React from 'react';
import { EducatorsIllustration, DecoBlob, DecoStar } from '../components/Illustrations';

interface StrategyItem {
  title: string;
  body: string;
}

const STRATEGIES: StrategyItem[] = [
  {
    title: 'Audio alternatives',
    body: 'Let students listen to text instead of reading silently. Use the Text to Speech tool here for any worksheet or passage.',
  },
  {
    title: 'Coloured paper',
    body: 'Print worksheets on cream or yellow paper. This single change reduces visual stress for many students at no cost.',
  },
  {
    title: 'Font choices',
    body: 'Use sans-serif fonts like Arial, Lexend, or OpenDyslexic at size 14+. Avoid decorative or heavily italic fonts.',
  },
  {
    title: 'Generous spacing',
    body: 'Set line spacing to at least 1.5×. Keep text columns under 70 characters wide to reduce tracking difficulty.',
  },
  {
    title: 'Extended time',
    body: 'Allow 25–50% extra time for reading and writing tasks. This levels the field — it is not an unfair advantage.',
  },
  {
    title: 'Oral alternatives',
    body: 'Accept verbal answers, voice recordings, or oral exams as valid alternatives to written responses.',
  },
  {
    title: 'Multisensory learning',
    body: 'Combine visual, auditory, and kinaesthetic approaches — tracing letters, building words, acting out meanings.',
  },
  {
    title: 'Celebrate strengths',
    body: 'Students with dyslexia are often exceptional storytellers, creative thinkers, and big-picture problem-solvers.',
  },
];

export const EducatorsPage: React.FC = () => {
  return (
    <div className="educators-page">
      {/* Background Blobs and Stars */}
      <DecoBlob color="#EA580C" opacity={0.1} style={{ top: -60, right: -60, width: 420, height: 420 }} />
      <DecoBlob color="#F97316" opacity={0.08} style={{ bottom: 80, left: -80, width: 380, height: 380 }} />
      <DecoBlob color="#FB923C" opacity={0.07} style={{ top: '45%', right: '4%', width: 300, height: 300 }} />

      <DecoStar style={{ top: '10%', left: '14%' }} color="#FED7AA" size={18} />
      <DecoStar style={{ top: '24%', right: '18%' }} color="#FDBA74" size={14} />
      <DecoStar style={{ top: '58%', left: '7%' }} color="#FB923C" size={20} />
      <DecoStar style={{ bottom: '18%', right: '10%' }} color="#FED7AA" size={16} />

      <div className="educators-inner">
        {/* Hero Row */}
        <div className="educators-hero-row">
          <div className="educators-hero-text">
            <h1>
              Every student
              <br />
              <span className="educators-accent">deserves a classroom</span>
              <br />
              built for them.
            </h1>
            <p>
              Around 1 in 5 students has dyslexia. Small, deliberate changes to how you teach can transform how they
              learn — and benefit every student in the room.
            </p>
          </div>
          <div className="educators-hero-art">
            <EducatorsIllustration />
          </div>
        </div>

        {/* The Numbers Section */}
        <div className="educators-section">
          <div className="educators-section-label">The numbers</div>
          <div className="educators-stat-row">
            <div className="educators-stat-card">
              <div className="esc-num">1 in 5</div>
              <div className="esc-label">students has dyslexia</div>
            </div>
            <div className="educators-stat-card">
              <div className="esc-num">4 - 6</div>
              <div className="esc-label">students per class of 30</div>
            </div>
            <div className="educators-stat-card">
              <div className="esc-num">Early</div>
              <div className="esc-label">support transforms outcomes</div>
            </div>
          </div>

          <div className="educators-what">
            <div className="educators-what-bar" />
            <p>
              Dyslexia is not a vision problem or a sign of low intelligence. It is a neurological difference in how the
              brain processes written language. Students with dyslexia who receive the right support in their early years
              close the gap with peers significantly — and often go on to excel. Accommodations do not lower standards.
              They level the playing field.
            </p>
          </div>
        </div>

        {/* Strategies Section */}
        <div className="educators-section">
          <div className="educators-section-label">Classroom strategies that work</div>
          <div className="educators-strategies-grid">
            {STRATEGIES.map((strategy, idx) => (
              <div key={idx} className="educators-strategy-card">
                <div className="estr-num">{String(idx + 1).padStart(2, '0')}</div>
                <h3>{strategy.title}</h3>
                <p>{strategy.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Note */}
        <div className="educators-closing">
          <div className="educators-what-bar" />
          <p>
            Inclusive teaching is not about lowering expectations — it is about removing the barriers that prevent
            students from showing what they actually know. Every adjustment you make for a dyslexic student makes your
            classroom better for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};
