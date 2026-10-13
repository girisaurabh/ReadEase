import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileCode, FileText, Volume2, Check, AlertCircle } from 'lucide-react';
import { FontChangerIllustration } from '../components/Illustrations';
import { useReadingSettings, AVAILABLE_FONTS } from '../context/ReadingContext';
import { downloadAsHtml, downloadAsTxt } from '../utils/downloadFormattedText';

export const FONTS = AVAILABLE_FONTS;

const FLOATING_LETTERS = [
  { l: 'b', x: '2%', y: '14%', color: '#BFDBFE', size: 56, delay: 0, rot: -10 },
  { l: 'd', x: '88%', y: '10%', color: '#DDD6FE', size: 48, delay: 0.8, rot: 8 },
  { l: 'p', x: '91%', y: '44%', color: '#A7F3D0', size: 42, delay: 1.4, rot: -6 },
  { l: 'q', x: '3%', y: '52%', color: '#FDE68A', size: 50, delay: 0.5, rot: 12 },
  { l: 'A', x: '5%', y: '80%', color: '#BFDBFE', size: 38, delay: 1.1, rot: -14 },
  { l: 'R', x: '86%', y: '78%', color: '#DDD6FE', size: 44, delay: 0.3, rot: 7 },
];

export const FontChangerPage: React.FC = () => {
  const {
    text,
    setText,
    selectedFont,
    setSelectedFont,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
    wordSpacing,
    paragraphSpacing,
    textAlign,
    bgColor,
    textColor,
  } = useReadingSettings();

  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDownload = (format: 'html' | 'txt') => {
    setDownloadDropdownOpen(false);
    if (!text.trim()) {
      setDownloadFeedback({
        type: 'error',
        message: 'Cannot download empty text. Please type or paste your reading text first.',
      });
      return;
    }

    try {
      if (format === 'html') {
        downloadAsHtml({
          text,
          fontName: selectedFont.name,
          fontFamily: selectedFont.cssFamily,
          fontSize,
          lineHeight,
          letterSpacing,
          wordSpacing,
          paragraphSpacing,
          textAlign,
          bgColor,
          textColor,
          fileName: `dyslexiease-${selectedFont.id}-document`,
        });
        setDownloadFeedback({
          type: 'success',
          message: `Downloaded formatted HTML with ${selectedFont.name} typography! Open it in any browser.`,
        });
      } else {
        downloadAsTxt(text, `dyslexiease-document`);
        setDownloadFeedback({
          type: 'success',
          message: 'Downloaded as TXT (note: plain text files do not preserve fonts or styling).',
        });
      }
    } catch (err: any) {
      setDownloadFeedback({
        type: 'error',
        message: err.message || 'Download failed.',
      });
    }

    setTimeout(() => {
      setDownloadFeedback(null);
    }, 4500);
  };

  return (
    <div className="fc-page">
      {/* Floating Background Letters */}
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

      {/* Hero Header */}
      <div className="fc-hero">
        <div className="fc-hero-inner">
          <div className="fc-hero-text">
            <h1>
              Font <span className="fc-hero-accent">Changer</span>
            </h1>
            <p>
              Letters like b, d, p and q are easily confused with dyslexia. These fonts are built to keep them distinct.
              Choose your font, customize your layout, and download the formatted text.
            </p>
          </div>
          <div className="fc-hero-art">
            <FontChangerIllustration fontFamily={selectedFont.cssFamily} />
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="fc-body">
        {/* Font Picker Grid */}
        <div className="fc-font-picker">
          {AVAILABLE_FONTS.map(font => {
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
                aria-pressed={isSelected}
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

        {/* Feedback Alert */}
        {downloadFeedback && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 14,
              background: downloadFeedback.type === 'success' ? '#ecfdf5' : '#fef2f2',
              border: `1.5px solid ${downloadFeedback.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
              color: downloadFeedback.type === 'success' ? '#065f46' : '#991b1b',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            {downloadFeedback.type === 'success' ? (
              <Check size={18} color="#059669" />
            ) : (
              <AlertCircle size={18} color="#dc2626" />
            )}
            <span>{downloadFeedback.message}</span>
          </div>
        )}

        {/* Workspace: Left Inputs & Right Preview */}
        <div className="fc-workspace">
          {/* Left Controls */}
          <div className="fc-left">
            <div className="fc-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div className="fc-panel-label" style={{ marginBottom: 0 }}>Your text</div>
                <button
                  type="button"
                  onClick={() => setText('')}
                  style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Clear
                </button>
              </div>
              <textarea
                className="fc-textarea"
                value={text}
                onChange={e => setText(e.target.value)}
                rows={6}
                placeholder="Paste or type your text here..."
                aria-label="Text content to format"
              />
            </div>

            <div className="fc-panel">
              <div className="fc-panel-label">Fine-tune Spacing</div>
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
                    max={36}
                    step={1}
                    value={fontSize}
                    onChange={e => setFontSize(parseFloat(e.target.value))}
                    className="fc-slider"
                    style={{ ['--fc-accent' as any]: selectedFont.accent }}
                    aria-label="Font size"
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
                    aria-label="Line height"
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
                    aria-label="Letter spacing"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview & Download Action */}
          <div className="fc-right">
            {/* Download Bar and TTS Quick Action */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#fff',
                padding: '14px 18px',
                borderRadius: 18,
                border: '1.5px solid #e5e7eb',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              {/* Prominent Download Formatted Text Button with Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: selectedFont.accent,
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: 14,
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: `0 4px 14px ${selectedFont.accent}55`,
                    transition: 'all 0.2s ease',
                  }}
                  aria-expanded={downloadDropdownOpen}
                >
                  <Download size={16} />
                  Download Formatted Text
                  <span style={{ fontSize: 10, opacity: 0.8 }}>▼</span>
                </button>

                {downloadDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '115%',
                      left: 0,
                      zIndex: 50,
                      background: '#ffffff',
                      borderRadius: 16,
                      boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
                      border: '1.5px solid #e2e8f0',
                      padding: 8,
                      minWidth: 260,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleDownload('html')}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <FileCode size={20} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                          Download as HTML
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>
                          Preserves {selectedFont.name} font, line height, letter spacing &amp; styling in browser.
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload('txt')}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <FileText size={20} color="#64748b" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                          Download as TXT
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>
                          Exports complete text (plain text cannot preserve fonts or colors).
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Seamless Jump to TTS */}
              <Link
                to="/text-to-speech"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 16px',
                  borderRadius: 14,
                  background: '#f1f5f9',
                  color: 'var(--text)',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: 'Nunito, sans-serif',
                  transition: 'all 0.2s ease',
                }}
              >
                <Volume2 size={16} color="#7c3aed" />
                Listen in Text-to-Speech &rarr;
              </Link>
            </div>

            {/* Reading Preview Panel */}
            <div className="fc-preview-panel" style={{ background: selectedFont.bg }}>
              <div
                className="fc-preview-tag"
                style={{ color: selectedFont.accent, background: `${selectedFont.accent}22` }}
              >
                {selectedFont.name} Preview
              </div>
              <div
                className="fc-preview-text"
                style={{
                  fontFamily: selectedFont.cssFamily,
                  fontSize: `${fontSize}px`,
                  lineHeight,
                  letterSpacing: `${letterSpacing}em`,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {text || 'Your formatted text will appear here.'}
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
