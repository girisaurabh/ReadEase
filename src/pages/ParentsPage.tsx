import React from 'react';
import { ParentsIllustration, DecoBlob, DecoStar } from '../components/Illustrations';

interface SignItem {
  label: string;
}

const SIGNS_LIST: SignItem[] = [
  { label: 'Reads slowly or avoids reading altogether' },
  { label: 'Spells the same word differently each time' },
  { label: 'Reverses or confuses letters — b/d, p/q' },
  { label: 'Strong verbally but struggles to write it down' },
  { label: 'Finds listening far easier than reading' },
  { label: 'Takes much longer on reading or writing tasks' },
];

interface TipItem {
  title: string;
  body: string;
}

const TIPS_LIST: TipItem[] = [
  {
    title: 'Read together daily',
    body: 'Take turns reading aloud. Never correct every mistake — focus on meaning and enjoyment over perfection.',
  },
  {
    title: 'Give more time',
    body: 'Allow extra time for reading and writing tasks at home. Pressure and rushing make dyslexia significantly worse.',
  },
  {
    title: 'Use audio alternatives',
    body: 'Let your child listen to school books and homework read aloud. The Text to Speech tool on this site is completely free.',
  },
  {
    title: 'Try coloured backgrounds',
    body: 'A yellow, mint or lavender background reduces visual stress for many children. Try the Colour Overlay tool here.',
  },
  {
    title: 'Switch to a friendlier font',
    body: 'Fonts like OpenDyslexic and Lexend reduce letter confusion. Use the Font Changer on this site for any text.',
  },
  {
    title: 'Focus on their strengths',
    body: 'Children with dyslexia are often highly creative, empathetic, and brilliant at big-picture thinking. Celebrate that.',
  },
];

export const ParentsPage: React.FC = () => {
  return (
    <div className="parents-page">
      {/* Background blobs and stars */}
      <DecoBlob color="#0D9488" opacity={0.12} style={{ top: -60, right: -60, width: 420, height: 420 }} />
      <DecoBlob color="#10B981" opacity={0.09} style={{ bottom: 80, left: -80, width: 380, height: 380 }} />
      <DecoBlob color="#06B6D4" opacity={0.08} style={{ top: '45%', right: '5%', width: 300, height: 300 }} />

      <DecoStar style={{ top: '10%', left: '15%' }} color="#6EE7B7" size={18} />
      <DecoStar style={{ top: '22%', right: '20%' }} color="#A7F3D0" size={14} />
      <DecoStar style={{ top: '60%', left: '8%' }} color="#5EEAD4" size={20} />
      <DecoStar style={{ bottom: '20%', right: '12%' }} color="#99F6E4" size={16} />

      <div className="parents-inner">
        {/* Hero Row */}
        <div className="parents-hero-row">
          <div className="parents-hero-text">
            <h1>
              Your child isn't
              <br />
              <span className="parents-accent">struggling — they're</span>
              <br />
              wired differently.
            </h1>
            <p>
              Dyslexia is a neurological difference, not a lack of effort or intelligence. Understanding it is the first
              step to giving your child the right support.
            </p>
          </div>
          <div className="parents-hero-art">
            <ParentsIllustration />
          </div>
        </div>

        {/* What is dyslexia? */}
        <div className="parents-section">
          <div className="parents-section-label">What is dyslexia?</div>
          <div className="parents-what">
            <div className="parents-what-bar" />
            <div className="parents-what-text">
              <p>
                Dyslexia is a learning difference that can make reading, spelling, and recognizing words more difficult,
                even though a person is intelligent and capable.
              </p>
              <p>
                Around <strong>1 in 5 people</strong> have some form of dyslexia, making it the most common learning
                difference in the world. Many dyslexic people go on to become exceptional thinkers, creators, and
                leaders precisely because their brains work differently.
              </p>
            </div>
          </div>
        </div>

        {/* Signs to look for */}
        <div className="parents-section">
          <div className="parents-section-label">Signs to look for</div>
          <div className="parents-signs-grid">
            {SIGNS_LIST.map((item, idx) => (
              <div key={idx} className="parents-sign-card">
                <div className="psc-dot" />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to help at home */}
        <div className="parents-section">
          <div className="parents-section-label">How to help at home</div>
          <div className="parents-tips-grid">
            {TIPS_LIST.map((tip, idx) => (
              <div key={idx} className="parents-tip-card">
                <div className="ptc-num">{String(idx + 1).padStart(2, '0')}</div>
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
