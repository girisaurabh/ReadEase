import React, { useState } from 'react';
import { ColourOverlayIllustration } from '../components/Illustrations';

export interface ColourSwatch {
  name: string;
  value: string;
  accent: string;
  desc: string;
}

export const SWATCHES: ColourSwatch[] = [
  { name: 'Soft Yellow', value: '#FEFCE8', accent: '#CA8A04', desc: 'Reduces glare, widely recommended' },
  { name: 'Peach', value: '#FFF7ED', accent: '#EA580C', desc: 'Warm and calming for most readers' },
  { name: 'Mint Green', value: '#F0FDF4', accent: '#16A34A', desc: 'Helps with tracking and focus' },
  { name: 'Lavender', value: '#F5F3FF', accent: '#7C3AED', desc: 'Reduces visual stress' },
  { name: 'Sky Blue', value: '#EFF6FF', accent: '#2563EB', desc: 'Cool tone, good for extended reading' },
  { name: 'Rose', value: '#FFF1F2', accent: '#E11D48', desc: 'Gentle and easy on the eyes' },
  { name: 'Cream', value: '#FFFBEB', accent: '#D97706', desc: 'Classic reading comfort colour' },
  { name: 'Sage', value: '#F0FDF9', accent: '#0D9488', desc: 'Natural, relaxing tone' },
  { name: 'Lilac', value: '#FAF5FF', accent: '#9333EA', desc: 'Soft purple, reduces glare' },
  { name: 'Apricot', value: '#FFF8F1', accent: '#F97316', desc: 'Warm, cosy reading atmosphere' },
  { name: 'Ice Blue', value: '#F0F9FF', accent: '#0284C7', desc: 'Clean, crisp, minimal strain' },
  { name: 'White', value: '#FFFFFF', accent: '#6B7280', desc: 'Standard — no overlay' },
];

const FLOATING_BLOBS = [
  { color: '#FEFCE8', x: '2%', y: '12%', size: 80, delay: 0 },
  { color: '#EFF6FF', x: '88%', y: '8%', size: 64, delay: 0.8 },
  { color: '#F5F3FF', x: '91%', y: '42%', size: 72, delay: 1.4 },
  { color: '#F0FDF4', x: '3%', y: '50%', size: 60, delay: 0.5 },
  { color: '#FFF1F2', x: '6%', y: '78%', size: 68, delay: 1 },
  { color: '#FFF7ED', x: '85%', y: '74%', size: 56, delay: 0.3 },
];

export const ColourOverlayPage: React.FC = () => {
  const [selectedSwatch, setSelectedSwatch] = useState<ColourSwatch>(SWATCHES[0]);
  const [text, setText] = useState<string>(
    'Words on a stark white screen can bounce, shimmer, or tire out your eyes. Changing the background tint brings stillness and relief, making reading comfortable.\n\nReading should never feel like hard work. With the right settings, words flow easily from the page to the mind, and stories come alive in vivid colour.'
  );
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.8);

  return (
    <div className="co-page">
      {/* Floating Blobs */}
      {FLOATING_BLOBS.map((b, i) => (
        <div
          key={i}
          className="co-bg-blob"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Hero */}
      <div className="co-hero">
        <div className="co-hero-inner">
          <div className="co-hero-text">
            <h1>
              Colour{' '}
              <span className="co-hero-accent" style={{ color: selectedSwatch.accent }}>
                Overlay
              </span>
            </h1>
            <p>
              Many people with dyslexia read much more easily on a coloured background. Try each colour and find the one
              that makes words feel still and clear.
            </p>
          </div>
          <div className="co-hero-art">
            <ColourOverlayIllustration bgColour={selectedSwatch.value} />
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="co-body">
        {/* Swatch Grid */}
        <div className="co-swatch-grid">
          {SWATCHES.map(swatch => {
            const isSelected = selectedSwatch.name === swatch.name;
            return (
              <button
                key={swatch.name}
                type="button"
                className={`co-swatch ${isSelected ? 'selected' : ''}`}
                style={{
                  ['--csv' as any]: swatch.value,
                  ['--csa' as any]: swatch.accent,
                }}
                onClick={() => setSelectedSwatch(swatch)}
                title={swatch.desc}
              >
                <div className="co-swatch-circle" style={{ background: swatch.value }} />
                <span className="co-swatch-name">{swatch.name}</span>
                {isSelected && (
                  <div className="co-swatch-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline
                        points="20,6 9,17 4,12"
                        stroke="white"
                        strokeWidth="3.5"
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

        {/* Selected Swatch Description Strip */}
        <div
          className="co-selected-strip"
          style={{
            background: selectedSwatch.value,
            borderColor: `${selectedSwatch.accent}44`,
          }}
        >
          <div className="co-selected-dot" style={{ background: selectedSwatch.accent }} />
          <strong style={{ color: selectedSwatch.accent }}>{selectedSwatch.name}</strong>
          <span>{selectedSwatch.desc}</span>
        </div>

        {/* Workspace */}
        <div className="co-workspace">
          {/* Left Inputs */}
          <div className="co-left">
            <div className="co-panel">
              <div className="co-panel-label">Your text</div>
              <textarea
                className="co-textarea"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={7}
                placeholder="Paste or type your text here..."
              />
            </div>

            <div className="co-panel">
              <div className="co-panel-label">Reading controls</div>
              <div className="co-sliders">
                {/* Font Size */}
                <div className="co-slider-row">
                  <div className="co-slider-meta">
                    <span>Font size</span>
                    <span
                      className="co-slider-val"
                      style={{ color: selectedSwatch.accent, background: `${selectedSwatch.accent}18` }}
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
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="co-slider"
                    style={{ ['--coa' as any]: selectedSwatch.accent }}
                  />
                </div>

                {/* Line Height */}
                <div className="co-slider-row">
                  <div className="co-slider-meta">
                    <span>Line height</span>
                    <span
                      className="co-slider-val"
                      style={{ color: selectedSwatch.accent, background: `${selectedSwatch.accent}18` }}
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
                    onChange={e => setLineHeight(Number(e.target.value))}
                    className="co-slider"
                    style={{ ['--coa' as any]: selectedSwatch.accent }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="co-right">
            <div
              className="co-preview-panel"
              style={{
                background: selectedSwatch.value,
                borderColor: `${selectedSwatch.accent}33`,
              }}
            >
              <div className="co-preview-label" style={{ color: selectedSwatch.accent }}>
                <div className="co-preview-dot" style={{ background: selectedSwatch.accent }} />
                Reading on {selectedSwatch.name}
              </div>
              <div
                className="co-preview-text"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight,
                }}
              >
                {text || 'Your text will appear here.'}
              </div>
            </div>

            <div className="co-science">
              <div className="co-science-bar" style={{ background: selectedSwatch.accent }} />
              <div>
                <strong>Why this works</strong>
                <p>
                  Some people with dyslexia experience visual stress — where white backgrounds cause letters to shimmer
                  or blur. A coloured overlay lowers visual contrast and calms the effect. Studies show up to a 20%
                  improvement in reading speed for those affected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
