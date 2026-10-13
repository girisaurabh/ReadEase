import React, { useState } from 'react';
import { FontChangerIllustration } from '../components/Illustrations';

export interface FontOption {
  id: string;
  name: string;
  desc: string;
  cssFamily: string;
  preview: string;
  accent: string;
  bg: string;
}

export const FONTS: FontOption[] = [
  {
    id: 'opendyslexic',
    name: 'OpenDyslexic',
    desc: 'Heavy bottoms stop letters from flipping.',
    cssFamily: '"OpenDyslexic", serif',
    preview: 'Aa',
    accent: '#3B82F6',
    bg: '#DBEAFE',
  },
  {
    id: 'lexend',
    name: 'Lexend',
    desc: 'Reduces visual stress and improves fluency.',
    cssFamily: '"Lexend", sans-serif',
    preview: 'Aa',
    accent: '#8B5CF6',
    bg: '#EDE9FE',
  },
  {
    id: 'atkinson',
    name: 'Atkinson Hyperlegible',
    desc: 'Distinct letterforms from the Braille Institute.',
    cssFamily: '"Atkinson Hyperlegible", sans-serif',
    preview: 'Aa',
    accent: '#10B981',
    bg: '#D1FAE5',
  },
  {
    id: 'comic',
    name: 'Comic Sans',
    desc: 'Surprisingly effective for many dyslexic readers.',
    cssFamily: '"Comic Sans MS", cursive',
    preview: 'Aa',
    accent: '#F59E0B',
    bg: '#FEF3C7',
  },
  {
    id: 'arial',
    name: 'Arial',
    desc: 'Clean, no serifs to confuse letter shapes.',
    cssFamily: 'Arial, sans-serif',
    preview: 'Aa',
    accent: '#EC4899',
    bg: '#FCE7F3',
  },
];

const FLOATING_LETTERS = [
  { l: 'b', x: '2%', y: '14%', color: '#BFDBFE', size: 56, delay: 0, rot: -10 },
  { l: 'd', x: '88%', y: '10%', color: '#DDD6FE', size: 48, delay: 0.8, rot: 8 },
  { l: 'p', x: '91%', y: '44%', color: '#A7F3D0', size: 42, delay: 1.4, rot: -6 },
  { l: 'q', x: '3%', y: '52%', color: '#FDE68A', size: 50, delay: 0.5, rot: 12 },
  { l: 'A', x: '5%', y: '80%', color: '#BFDBFE', size: 38, delay: 1.1, rot: -14 },
  { l: 'R', x: '86%', y: '78%', color: '#DDD6FE', size: 44, delay: 0.3, rot: 7 },
];

export const FontChangerPage: React.FC = () => {
  const [text, setText] = useState<string>(
    'Reading is a wonderful journey. Every word is a small adventure, and every sentence is a path to new discovery. With the right font and size, reading becomes easier and more enjoyable for everyone.'
  );
  const [selectedFont, setSelectedFont] = useState<FontOption>(FONTS[0]);
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.8);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.05);

  return (
    <div className="fc-page">
      {/* Floating Letters */}
      {FLOATING_LETTERS.map((item, idx) => (
        <div
          key={idx}
          className="fc-float-letter"
          style={{
            left: item.x,
            top: item.y,
            color: item.color,
            fontSize: item.size,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rot}deg)`,
          }}
        >
          {item.l}
        </div>
      ))}

      {/* Hero */}
      <div className="fc-hero">
        <div className="fc-hero-inner">
          <div className="fc-hero-text">
            <h1>
              Font <span className="fc-hero-accent">Changer</span>
            </h1>
            <p>
              Letters like b, d, p and q are easily confused with dyslexia. These fonts are built to keep them distinct.
              Paste your text and see the difference.
            </p>
          </div>
          <div className="fc-hero-art">
            <FontChangerIllustration fontFamily={selectedFont.cssFamily} />
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="fc-body">
        {/* Font Picker Grid */}
        <div className="fc-font-picker">
          {FONTS.map(font => {
            const isSelected = selectedFont.id === font.id;
            return (
              <button
                key={font.id}
                type="button"
                className={`fc-font-btn ${isSelected ? 'selected' : ''}`}
                style={{
                  ['--fca' as any]: font.accent,
                  ['--fcbg' as any]: font.bg,
                }}
                onClick={() => setSelectedFont(font)}
              >
                <div className="fc-font-btn-preview" style={{ fontFamily: font.cssFamily }}>
                  {font.preview}
                </div>
                <div className="fc-font-btn-name">{font.name}</div>
                <div className="fc-font-btn-desc">{font.desc}</div>
                {isSelected && (
                  <div className="fc-font-btn-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <polyline
                        points="20,6 9,17 4,12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Workspace */}
        <div className="fc-workspace">
          {/* Left Controls */}
          <div className="fc-left">
            <div className="fc-panel">
              <div className="fc-panel-label">Your text</div>
              <textarea
                className="fc-textarea"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={6}
                placeholder="Paste or type your text here..."
              />
            </div>

            <div className="fc-panel">
              <div className="fc-panel-label">Fine-tune</div>
              <div className="fc-sliders-stack">
                {/* Font Size */}
                <div className="fc-slider-row">
                  <div className="fc-slider-meta">
                    <span className="fc-slider-label">Font size</span>
                    <span
                      className="fc-slider-value"
                      style={{ color: selectedFont.accent, background: `${selectedFont.accent}18` }}
                    >
                      {fontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={32}
                    step={1}
                    value={fontSize}
                    onChange={e => setFontSize(parseFloat(e.target.value))}
                    className="fc-slider"
                    style={{ ['--fc-accent' as any]: selectedFont.accent }}
                  />
                </div>

                {/* Line Height */}
                <div className="fc-slider-row">
                  <div className="fc-slider-meta">
                    <span className="fc-slider-label">Line height</span>
                    <span
                      className="fc-slider-value"
                      style={{ color: selectedFont.accent, background: `${selectedFont.accent}18` }}
                    >
                      {lineHeight.toFixed(1)}×
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1.2}
                    max={3.0}
                    step={0.1}
                    value={lineHeight}
                    onChange={e => setLineHeight(parseFloat(e.target.value))}
                    className="fc-slider"
                    style={{ ['--fc-accent' as any]: selectedFont.accent }}
                  />
                </div>

                {/* Letter Spacing */}
                <div className="fc-slider-row">
                  <div className="fc-slider-meta">
                    <span className="fc-slider-label">Letter spacing</span>
                    <span
                      className="fc-slider-value"
                      style={{ color: selectedFont.accent, background: `${selectedFont.accent}18` }}
                    >
                      {letterSpacing.toFixed(2)}em
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={0.3}
                    step={0.01}
                    value={letterSpacing}
                    onChange={e => setLetterSpacing(parseFloat(e.target.value))}
                    className="fc-slider"
                    style={{ ['--fc-accent' as any]: selectedFont.accent }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="fc-right">
            <div className="fc-preview-panel" style={{ background: selectedFont.bg }}>
              <div
                className="fc-preview-tag"
                style={{ color: selectedFont.accent, background: `${selectedFont.accent}22` }}
              >
                {selectedFont.name}
              </div>
              <div
                className="fc-preview-text"
                style={{
                  fontFamily: selectedFont.cssFamily,
                  fontSize: `${fontSize}px`,
                  lineHeight,
                  letterSpacing: `${letterSpacing}em`,
                }}
              >
                {text || 'Your text will appear here.'}
              </div>
            </div>

            <div className="fc-why-cards">
              <div className="fc-why-card">
                <div className="fc-why-bar" style={{ background: selectedFont.accent }} />
                <p>
                  <strong>Why fonts matter</strong> — dyslexia-friendly fonts make b, d, p, q look distinct so your brain
                  stops second-guessing them.
                </p>
              </div>
              <div className="fc-why-card">
                <div className="fc-why-bar" style={{ background: selectedFont.accent }} />
                <p>
                  <strong>Spacing helps too</strong> — more room between letters and lines makes text feel less crowded
                  and easier to track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
