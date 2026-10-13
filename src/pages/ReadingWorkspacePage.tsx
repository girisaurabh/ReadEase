import React, { useState, useEffect, useRef } from 'react';
import {
  Type,
  Palette,
  Sliders,
  Volume2,
  Play,
  Pause,
  Square,
  RotateCcw,
  Upload,
  BookOpen,
  Edit3,
  Maximize2,
  Minimize2,
  FileText,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Compass,
  Eye,
  Check,
  AlertCircle,
} from 'lucide-react';
import { extractDocumentText } from '../utils/documentExtractor';
import { FONTS } from './FontChangerPage';
import { SWATCHES } from './ColourOverlayPage';

interface WorkspacePreferences {
  fontId: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  fontWeight: number;
  paragraphSpacing: number;
  textAlign: 'left' | 'center' | 'justify';
  bgColor: string;
  textColor: string;
  readingRulerEnabled: boolean;
  rulerHeight: number;
  focusMode: boolean;
  highlightSentences: boolean;
  speechSpeed: number;
}

const DEFAULT_PREFERENCES: WorkspacePreferences = {
  fontId: 'opendyslexic',
  fontSize: 20,
  lineHeight: 2.0,
  letterSpacing: 0.06,
  wordSpacing: 0.12,
  fontWeight: 400,
  paragraphSpacing: 1.8,
  textAlign: 'left',
  bgColor: '#FEFCE8', // Soft Yellow default
  textColor: '#1E1B4B',
  readingRulerEnabled: false,
  rulerHeight: 44,
  focusMode: false,
  highlightSentences: true,
  speechSpeed: 1.0,
};

const SAMPLE_TEXTS = [
  {
    title: 'The Brave Little Star',
    desc: 'Children Story',
    text: `Once upon a time, high above the quiet mountains, lived a little star named Pip.\n\nWhile all the other stars shone in steady, straight silver beams, Pip's light bounced and twinkled like a playful puppy. Sometimes he felt shy because he didn't shine quite like his older brothers and sisters.\n\nOne stormy evening, dark purple thunderclouds rolled across the sky. The silver stars were completely hidden behind the thick mist. Travelers down on the winding mountain roads could not find their way home.\n\nSuddenly, Pip took a deep breath. He gathered all the warm courage in his heart and danced between the tumbling raindrops. His bouncy, golden beams peeked straight through the clouds, lighting up the road like a string of lanterns.\n\n"Look!" cheered the lost travelers below. "The little dancing star is guiding us!"\n\nFrom that night on, Pip knew that shining differently wasn't a flaw at all — it was his very own superpower.`,
  },
  {
    title: 'How Whales Sing',
    desc: 'Science & Nature',
    text: `Humpback whales are among the greatest composers on our planet Earth.\n\nIn the deep blue waters of the ocean, sound waves travel nearly five times faster than they do through the open air. Because sunlight fades quickly below the waves, marine mammals rely on melodies instead of eyesight to communicate.\n\nMale humpback whales create complex songs that can last for more than twenty minutes. Amazingly, whales across an entire ocean basin will learn the same song, changing verses together season by season.\n\nScientists believe these underwater symphonies help whales stay connected across thousands of miles. By listening with patience and respect, marine biologists continue to uncover the rich emotional lives of ocean giants.`,
  },
  {
    title: 'Dyslexia & Creative Minds',
    desc: 'Educational Guide',
    text: `Dyslexia affects how the human brain processes symbols and written text. It is not an issue of vision, effort, or intellectual capability.\n\nNeuroscientists have found that individuals with dyslexia often show exceptional activity in the right hemisphere of the brain. This makes them natural visualizers, inventive inventors, and big-picture problem-solvers.\n\nMany of history's most celebrated pioneers — from architects and writers to computer scientists — lived with dyslexia. With supportive environments, adaptable typography, and audio tools, every dyslexic reader can thrive without limits.`,
  },
];

export const ReadingWorkspacePage: React.FC = () => {
  // Saved Preferences in LocalStorage
  const [prefs, setPrefs] = useState<WorkspacePreferences>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_reading_prefs');
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read saved preferences', e);
    }
    return DEFAULT_PREFERENCES;
  });

  const [text, setText] = useState<string>(SAMPLE_TEXTS[0].text);
  const [activeTab, setActiveTab] = useState<'reading' | 'edit' | 'split'>('reading');
  const [distractionFree, setDistractionFree] = useState<boolean>(false);
  const [mouseY, setMouseY] = useState<number>(300);

  // File Upload State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<string>('');

  // Speech State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSpokenSentence, setActiveSpokenSentence] = useState<number>(-1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Save preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dyslexiaease_reading_prefs', JSON.stringify(prefs));
    } catch (e) {
      console.warn('Could not save preferences', e);
    }
  }, [prefs]);

  // Speech setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        if (!synthRef.current) return;
        const vList = synthRef.current.getVoices();
        const enVoices = vList.filter(v => v.lang.startsWith('en'));
        const available = enVoices.length > 0 ? enVoices : vList;
        setVoices(available);
        if (available.length > 0 && !selectedVoice) {
          setSelectedVoice(available[0]);
        }
      };
      loadVoices();
      synthRef.current.addEventListener('voiceschanged', loadVoices);
      return () => synthRef.current?.removeEventListener('voiceschanged', loadVoices);
    }
  }, []);

  // Track mouse for Reading Ruler
  useEffect(() => {
    if (!prefs.readingRulerEnabled) return;

    const handlePointerMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMouseY(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [prefs.readingRulerEnabled]);

  const updatePref = <K extends keyof WorkspacePreferences>(key: K, val: WorkspacePreferences[K]) => {
    setPrefs(prev => ({ ...prev, [key]: val }));
  };

  const resetPreferences = () => {
    setPrefs(DEFAULT_PREFERENCES);
  };

  // Text-To-Speech handlers
  const stopSpeech = () => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveSpokenSentence(-1);
  };

  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const startSpeech = () => {
    stopSpeech();
    if (!text.trim() || !synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = prefs.speechSpeed;
    if (selectedVoice) utterance.voice = selectedVoice;

    let currentSentenceIndex = 0;
    utterance.onboundary = event => {
      if (event.name === 'sentence') {
        setActiveSpokenSentence(currentSentenceIndex);
        currentSentenceIndex++;
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveSpokenSentence(-1);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveSpokenSentence(-1);
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePauseSpeech = () => {
    if (!synthRef.current) return;
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  // File Upload
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');
    try {
      const extracted = await extractDocumentText(file);
      setText(extracted.text);
      setUploadSuccess(`Extracted ${extracted.wordCount} words from "${file.name}"!`);
      setActiveTab('reading');
    } catch (err: any) {
      setUploadError(err.message || 'Failed to extract text from document.');
    } finally {
      setIsUploading(false);
    }
  };

  const currentFontObj = FONTS.find(f => f.id === prefs.fontId) || FONTS[0];

  const paragraphs = text.split('\n\n').filter(Boolean);

  return (
    <div className={`rw-page ${prefs.focusMode ? 'focus-mode-active' : ''}`}>
      {/* Interactive Reading Ruler Overlay */}
      {prefs.readingRulerEnabled && (
        <div
          className="reading-ruler"
          style={{ top: `${mouseY - prefs.rulerHeight / 2}px` }}
          aria-hidden="true"
        >
          <div
            className="reading-ruler-bar"
            style={{
              height: `${prefs.rulerHeight}px`,
              background: 'rgba(253, 230, 138, 0.4)',
              borderColor: '#f59e0b',
            }}
          />
        </div>
      )}

      {/* Distraction Free Fullscreen View */}
      {distractionFree && (
        <div
          className="distraction-free-container"
          style={{
            background: prefs.bgColor,
            color: prefs.textColor,
          }}
        >
          <button
            type="button"
            className="distraction-free-exit"
            onClick={() => setDistractionFree(false)}
          >
            <Minimize2 size={16} style={{ marginRight: 6 }} /> Exit Distraction-Free
          </button>
          <div
            className="rw-reading-content"
            style={{
              fontFamily: currentFontObj.cssFamily,
              fontSize: `${prefs.fontSize}px`,
              lineHeight: prefs.lineHeight,
              letterSpacing: `${prefs.letterSpacing}em`,
              wordSpacing: `${prefs.wordSpacing}em`,
              fontWeight: prefs.fontWeight,
              textAlign: prefs.textAlign,
            }}
          >
            {paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="rw-reading-paragraph"
                style={{ ['--p-spacing' as any]: `${prefs.paragraphSpacing}em` }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="rw-container">
        {/* Workspace Header */}
        <div className="rw-header">
          <div className="rw-header-info">
            <h1>Dyslexia Reading Studio</h1>
            <p>
              Customise typography, colour tint, spacing, and rulers for maximum reading comfort and fluency.
            </p>
          </div>

          <div className="rw-header-actions">
            {/* View Mode Tabs */}
            <div className="rw-tabs">
              <button
                type="button"
                className={`rw-tab ${activeTab === 'reading' ? 'active' : ''}`}
                onClick={() => setActiveTab('reading')}
              >
                <BookOpen size={14} style={{ display: 'inline', marginRight: 5 }} /> Reading Mode
              </button>
              <button
                type="button"
                className={`rw-tab ${activeTab === 'edit' ? 'active' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                <Edit3 size={14} style={{ display: 'inline', marginRight: 5 }} /> Edit Text
              </button>
              <button
                type="button"
                className={`rw-tab ${activeTab === 'split' ? 'active' : ''}`}
                onClick={() => setActiveTab('split')}
              >
                <Sliders size={14} style={{ display: 'inline', marginRight: 5 }} /> Split View
              </button>
            </div>

            <button
              type="button"
              className="rw-btn rw-btn-secondary"
              onClick={() => setDistractionFree(true)}
              title="Enter full-screen reading mode"
            >
              <Maximize2 size={16} /> Fullscreen
            </button>

            <button
              type="button"
              className="rw-btn rw-btn-secondary"
              onClick={resetPreferences}
              title="Reset all reading adjustments to default"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* Sample Texts Selector Bar */}
        <div className="rw-samples-bar">
          <span className="rw-samples-label">Sample Passages:</span>
          {SAMPLE_TEXTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="rw-sample-chip"
              onClick={() => {
                setText(sample.text);
                stopSpeech();
                setUploadSuccess(`Loaded sample: "${sample.title}"`);
              }}
            >
              📖 {sample.title} ({sample.desc})
            </button>
          ))}
        </div>

        {/* Upload Success / Error Notifications */}
        {uploadSuccess && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 14,
              background: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              color: '#065f46',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Check size={18} color="#059669" />
            <span>{uploadSuccess}</span>
          </div>
        )}
        {uploadError && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: 14,
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              color: '#991b1b',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertCircle size={18} color="#dc2626" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Main Workspace Grid: Controls & Reading Area */}
        <div className="rw-grid">
          {/* Left Column: Interactive Customization Settings Panel */}
          <div className="rw-settings-panel">
            <div className="rw-section-title">
              <span>Dyslexia Typography</span>
              <Type size={16} />
            </div>

            {/* Font Picker */}
            <div className="rw-control-group">
              <label className="rw-control-label">
                <span>Font Family</span>
              </label>
              <div className="rw-font-select-grid">
                {FONTS.map(font => (
                  <button
                    key={font.id}
                    type="button"
                    className={`rw-font-pill ${prefs.fontId === font.id ? 'active' : ''}`}
                    onClick={() => updatePref('fontId', font.id)}
                  >
                    <span className="rw-font-pill-name" style={{ fontFamily: font.cssFamily }}>
                      {font.name}
                    </span>
                    <span className="rw-font-pill-sample">Aa Bb Dd</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Slider */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Font Size</span>
                <span className="rw-control-val">{prefs.fontSize}px</span>
              </div>
              <input
                type="range"
                min={14}
                max={40}
                step={1}
                value={prefs.fontSize}
                onChange={e => updatePref('fontSize', Number(e.target.value))}
                className="fc-slider"
              />
            </div>

            {/* Font Weight */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Font Weight</span>
                <span className="rw-control-val">
                  {prefs.fontWeight === 400
                    ? 'Regular'
                    : prefs.fontWeight === 500
                    ? 'Medium'
                    : prefs.fontWeight === 600
                    ? 'Semi-Bold'
                    : 'Bold'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[400, 500, 600, 700].map(weight => (
                  <button
                    key={weight}
                    type="button"
                    className={`tts-speed-btn ${prefs.fontWeight === weight ? 'active' : ''}`}
                    onClick={() => updatePref('fontWeight', weight)}
                    style={{ flex: 1, padding: '6px 4px', fontSize: 12 }}
                  >
                    {weight === 400 ? 'Normal' : weight === 500 ? 'Med' : weight === 600 ? 'Semi' : 'Bold'}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Spacing (Line Height) */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Line Height</span>
                <span className="rw-control-val">{prefs.lineHeight.toFixed(1)}×</span>
              </div>
              <input
                type="range"
                min={1.3}
                max={3.0}
                step={0.1}
                value={prefs.lineHeight}
                onChange={e => updatePref('lineHeight', Number(e.target.value))}
                className="fc-slider"
              />
            </div>

            {/* Letter Spacing */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Letter Spacing</span>
                <span className="rw-control-val">{prefs.letterSpacing.toFixed(2)}em</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={prefs.letterSpacing}
                onChange={e => updatePref('letterSpacing', Number(e.target.value))}
                className="fc-slider"
              />
            </div>

            {/* Word Spacing */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Word Spacing</span>
                <span className="rw-control-val">{prefs.wordSpacing.toFixed(2)}em</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.4}
                step={0.02}
                value={prefs.wordSpacing}
                onChange={e => updatePref('wordSpacing', Number(e.target.value))}
                className="fc-slider"
              />
            </div>

            {/* Paragraph Spacing */}
            <div className="rw-control-group">
              <div className="rw-control-label">
                <span>Paragraph Spacing</span>
                <span className="rw-control-val">{prefs.paragraphSpacing.toFixed(1)}em</span>
              </div>
              <input
                type="range"
                min={0.8}
                max={3.0}
                step={0.2}
                value={prefs.paragraphSpacing}
                onChange={e => updatePref('paragraphSpacing', Number(e.target.value))}
                className="fc-slider"
              />
            </div>

            {/* Text Alignment */}
            <div className="rw-control-group">
              <label className="rw-control-label">
                <span>Text Alignment</span>
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  className={`tts-speed-btn ${prefs.textAlign === 'left' ? 'active' : ''}`}
                  onClick={() => updatePref('textAlign', 'left')}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  title="Left align (recommended for dyslexia to prevent uneven rivers)"
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  type="button"
                  className={`tts-speed-btn ${prefs.textAlign === 'center' ? 'active' : ''}`}
                  onClick={() => updatePref('textAlign', 'center')}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  title="Center align"
                >
                  <AlignCenter size={16} />
                </button>
                <button
                  type="button"
                  className={`tts-speed-btn ${prefs.textAlign === 'justify' ? 'active' : ''}`}
                  onClick={() => updatePref('textAlign', 'justify')}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  title="Justify"
                >
                  <AlignJustify size={16} />
                </button>
              </div>
            </div>

            {/* Background Tint Overlays */}
            <div className="rw-section-title" style={{ marginTop: 10 }}>
              <span>Background Tint</span>
              <Palette size={16} />
            </div>

            <div className="rw-control-group">
              <label className="rw-control-label">
                <span>Overlay Color</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>
                  {SWATCHES.find(s => s.value === prefs.bgColor)?.name || 'Custom'}
                </span>
              </label>
              <div className="rw-palette-grid">
                {SWATCHES.map(swatch => (
                  <button
                    key={swatch.name}
                    type="button"
                    className={`rw-palette-btn ${prefs.bgColor === swatch.value ? 'active' : ''}`}
                    style={{ background: swatch.value }}
                    onClick={() => updatePref('bgColor', swatch.value)}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            {/* Text Color Presets */}
            <div className="rw-control-group">
              <label className="rw-control-label">
                <span>Text Color</span>
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: 'Deep Indigo', val: '#1E1B4B' },
                  { label: 'Charcoal', val: '#334155' },
                  { label: 'Soft Navy', val: '#0F172A' },
                  { label: 'Pure Black', val: '#000000' },
                ].map(c => (
                  <button
                    key={c.val}
                    type="button"
                    onClick={() => updatePref('textColor', c.val)}
                    style={{
                      flex: 1,
                      padding: '6px 4px',
                      borderRadius: 10,
                      background: c.val,
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 600,
                      border: prefs.textColor === c.val ? '2px solid #3b82f6' : '1px solid transparent',
                    }}
                  >
                    {c.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Assistance Tools Section */}
            <div className="rw-section-title" style={{ marginTop: 10 }}>
              <span>Assistance Tools</span>
              <Compass size={16} />
            </div>

            {/* Reading Ruler Toggle */}
            <div className="rw-toggle-row">
              <label htmlFor="ruler-toggle">
                <span className="rw-toggle-title">Reading Ruler</span>
                <span className="rw-toggle-desc">Follows mouse cursor / touch to guide eye tracking</span>
              </label>
              <input
                id="ruler-toggle"
                type="checkbox"
                checked={prefs.readingRulerEnabled}
                onChange={e => updatePref('readingRulerEnabled', e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>

            {prefs.readingRulerEnabled && (
              <div className="rw-control-group" style={{ paddingLeft: 12 }}>
                <div className="rw-control-label">
                  <span>Ruler Height</span>
                  <span className="rw-control-val">{prefs.rulerHeight}px</span>
                </div>
                <input
                  type="range"
                  min={24}
                  max={80}
                  step={4}
                  value={prefs.rulerHeight}
                  onChange={e => updatePref('rulerHeight', Number(e.target.value))}
                  className="fc-slider"
                />
              </div>
            )}

            {/* Sentence Highlighting */}
            <div className="rw-toggle-row">
              <label htmlFor="sentence-toggle">
                <span className="rw-toggle-title">Sentence Hover Highlight</span>
                <span className="rw-toggle-desc">Highlights single sentences under pointer</span>
              </label>
              <input
                id="sentence-toggle"
                type="checkbox"
                checked={prefs.highlightSentences}
                onChange={e => updatePref('highlightSentences', e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>

            {/* Focus Mode */}
            <div className="rw-toggle-row">
              <label htmlFor="focus-toggle">
                <span className="rw-toggle-title">Focus Mode</span>
                <span className="rw-toggle-desc">Dim ambient distractions</span>
              </label>
              <input
                id="focus-toggle"
                type="checkbox"
                checked={prefs.focusMode}
                onChange={e => updatePref('focusMode', e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Right Column: Reading Paper or Input Area */}
          <div className="rw-content-wrapper">
            {/* Audio Bar for Read-Aloud */}
            <div
              style={{
                background: '#ffffff',
                padding: '16px 20px',
                borderRadius: 20,
                border: '1.5px solid #eef2f6',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  className={`tts-listen-btn ${isPlaying ? 'is-playing' : ''}`}
                  onClick={() => {
                    if (isPlaying) {
                      stopSpeech();
                    } else {
                      startSpeech();
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    fontSize: 15,
                    borderRadius: 14,
                  }}
                >
                  <span className="tts-listen-icon" style={{ width: 24, height: 24 }}>
                    {isPlaying ? <Square size={12} fill="white" /> : <Play size={12} fill="white" />}
                  </span>
                  {isPlaying ? 'Stop' : 'Read Aloud'}
                </button>

                {isPlaying && (
                  <button
                    type="button"
                    className="rw-btn rw-btn-secondary"
                    onClick={togglePauseSpeech}
                    style={{ padding: '8px 14px', fontSize: 13 }}
                  >
                    {isPaused ? <Play size={14} /> : <Pause size={14} />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                )}
              </div>

              {/* Speed Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>SPEED:</span>
                {[0.75, 1.0, 1.25].map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`tts-speed-btn ${prefs.speechSpeed === s ? 'active' : ''}`}
                    onClick={() => updatePref('speechSpeed', s)}
                    style={{ padding: '5px 10px', fontSize: 12 }}
                  >
                    {s}×
                  </button>
                ))}
              </div>

              {/* Voice Select */}
              {voices.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <select
                    className="tts-voice-select"
                    value={selectedVoice?.name || ''}
                    onChange={e => {
                      const v = voices.find(vo => vo.name === e.target.value);
                      if (v) setSelectedVoice(v);
                    }}
                    style={{ fontSize: 12, padding: '6px 10px' }}
                  >
                    {voices.slice(0, 8).map(v => (
                      <option key={v.name} value={v.name}>
                        {v.name.slice(0, 24)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Document Uploader Dropzone */}
            {(activeTab === 'edit' || activeTab === 'split') && (
              <div
                className="rw-dropzone"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
              >
                <div className="rw-dropzone-icon">
                  <Upload size={24} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>
                  {isUploading ? 'Extracting text...' : 'Drag and drop your document here, or browse'}
                </div>
                <p style={{ fontSize: 13, color: '#64748b' }}>
                  Supports <strong>.txt</strong>, <strong>.docx (Word)</strong>, and <strong>.pdf</strong> documents.
                </p>
                <label className="rw-btn rw-btn-primary" style={{ marginTop: 6 }}>
                  Choose Document
                  <input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    style={{ display: 'none' }}
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}

            {/* Text Editor Input (when in edit or split mode) */}
            {(activeTab === 'edit' || activeTab === 'split') && (
              <div style={{ background: '#ffffff', borderRadius: 20, padding: 20, border: '1.5px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Workspace Text Input ({text.split(/\s+/).filter(Boolean).length} words)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setText('');
                      stopSpeech();
                    }}
                    style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, background: 'none', border: 'none' }}
                  >
                    Clear Text
                  </button>
                </div>
                <textarea
                  className="tts-textarea"
                  value={text}
                  onChange={e => {
                    setText(e.target.value);
                    stopSpeech();
                  }}
                  rows={activeTab === 'split' ? 6 : 14}
                  placeholder="Paste or write your reading text here..."
                />
              </div>
            )}

            {/* Reading View Paper (when in reading or split mode) */}
            {(activeTab === 'reading' || activeTab === 'split') && (
              <div
                className="rw-reading-paper"
                style={{
                  background: prefs.bgColor,
                  color: prefs.textColor,
                }}
              >
                <div
                  className="rw-reading-content"
                  style={{
                    fontFamily: currentFontObj.cssFamily,
                    fontSize: `${prefs.fontSize}px`,
                    lineHeight: prefs.lineHeight,
                    letterSpacing: `${prefs.letterSpacing}em`,
                    wordSpacing: `${prefs.wordSpacing}em`,
                    fontWeight: prefs.fontWeight,
                    textAlign: prefs.textAlign,
                  }}
                >
                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, pIdx) => {
                      const pSentences = p.split(/(?<=[.?!])\s+/).filter(Boolean);
                      return (
                        <p
                          key={pIdx}
                          className="rw-reading-paragraph"
                          style={{ ['--p-spacing' as any]: `${prefs.paragraphSpacing}em` }}
                        >
                          {pSentences.map((sentence, sIdx) => {
                            const globalSentenceIdx = pIdx * 10 + sIdx;
                            const isSpoken = activeSpokenSentence === globalSentenceIdx;
                            return (
                              <span
                                key={sIdx}
                                className={`rw-reading-sentence ${isSpoken ? 'active-spoken' : ''}`}
                                title={prefs.highlightSentences ? 'Sentence Focus' : undefined}
                              >
                                {sentence}{' '}
                              </span>
                            );
                          })}
                        </p>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                      <FileText size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                      <p style={{ fontSize: 16, fontWeight: 600 }}>Your reading workspace is empty.</p>
                      <p style={{ fontSize: 14 }}>
                        Switch to Edit Text mode, upload a document, or choose a sample passage above.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
