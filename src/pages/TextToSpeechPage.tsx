import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Square,
  Pause,
  Upload,
  Volume2,
  Type,
  Eye,
  Sliders,
  Check,
  RotateCcw,
} from 'lucide-react';
import { TtsKidIllustration } from '../components/Illustrations';
import { extractDocumentText } from '../utils/documentExtractor';
import { useReadingSettings, AVAILABLE_FONTS } from '../context/ReadingContext';

interface SpeedOption {
  label: string;
  value: number;
}

const SPEED_OPTIONS: SpeedOption[] = [
  { label: '0.5×', value: 0.5 },
  { label: '0.75×', value: 0.75 },
  { label: '1×', value: 1.0 },
  { label: '1.25×', value: 1.25 },
  { label: '1.5×', value: 1.5 },
];

const FLOATING_LETTERS = [
  { l: 'A', x: '3%', y: '12%', color: '#A78BFA', size: 52, delay: 0, rot: -15 },
  { l: 'b', x: '88%', y: '8%', color: '#60A5FA', size: 44, delay: 0.7, rot: 10 },
  { l: 'S', x: '92%', y: '38%', color: '#34D399', size: 38, delay: 1.4, rot: -8 },
  { l: 'd', x: '2%', y: '44%', color: '#F472B6', size: 46, delay: 0.4, rot: 12 },
  { l: 'p', x: '6%', y: '72%', color: '#FBBF24', size: 36, delay: 1.0, rot: -10 },
  { l: 'z', x: '85%', y: '68%', color: '#C4B5FD', size: 48, delay: 0.2, rot: 14 },
];

interface SentenceItem {
  globalIndex: number;
  text: string;
}

interface ParagraphItem {
  paragraphIndex: number;
  sentences: SentenceItem[];
}

export const TextToSpeechPage: React.FC = () => {
  const {
    text,
    setText,
    selectedFont,
    setSelectedFont,
    fontSize,
    lineHeight,
    letterSpacing,
    wordSpacing,
    paragraphSpacing,
    textAlign,
    bgColor,
    textColor,
  } = useReadingSettings();

  const [speed, setSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
  const [status, setStatus] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(-1);
  const [viewMode, setViewMode] = useState<'focus' | 'edit'>('focus');

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(-1);
  const sentenceRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const viewerContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    activeIndexRef.current = activeSentenceIndex;
  }, [activeSentenceIndex]);

  // Load browser voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (!synthRef.current) return;
        const availableVoices = synthRef.current.getVoices();
        const enVoices = availableVoices.filter(v => v.lang.startsWith('en'));
        const listToUse = enVoices.length > 0 ? enVoices : availableVoices;
        setVoices(listToUse);
        if (listToUse.length > 0 && !selectedVoice) {
          setSelectedVoice(listToUse[0]);
        }
      };

      updateVoices();
      synthRef.current.addEventListener('voiceschanged', updateVoices);
      return () => {
        synthRef.current?.removeEventListener('voiceschanged', updateVoices);
      };
    } else {
      setStatus('Speech synthesis is not supported on this browser.');
    }
  }, []);

  // Parse paragraphs and sentences
  const { paragraphs, allSentences } = useMemo(() => {
    const rawParagraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    const parsedParagraphs: ParagraphItem[] = [];
    const parsedSentences: SentenceItem[] = [];
    let count = 0;

    rawParagraphs.forEach((pText, pIdx) => {
      // Split on sentence boundaries: ., !, ?, followed by whitespace or end of line
      const sMatches = pText
        .split(/(?<=[.?!])\s+|\n+/)
        .map(s => s.trim())
        .filter(Boolean);

      const pSentences: SentenceItem[] = [];
      sMatches.forEach(sText => {
        const item: SentenceItem = {
          globalIndex: count++,
          text: sText,
        };
        pSentences.push(item);
        parsedSentences.push(item);
      });

      if (pSentences.length > 0) {
        parsedParagraphs.push({
          paragraphIndex: pIdx,
          sentences: pSentences,
        });
      }
    });

    return { paragraphs: parsedParagraphs, allSentences: parsedSentences };
  }, [text]);

  const stopReading = (finished = false) => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    isPlayingRef.current = false;
    isPausedRef.current = false;
    activeIndexRef.current = -1;

    setIsPlaying(false);
    setIsPaused(false);
    setActiveSentenceIndex(-1);
    setActiveWordIdx(-1);

    if (finished) {
      setStatus('Finished reading aloud! Complete text restored.');
    } else {
      setStatus('');
    }
  };

  const speakSentence = (index: number) => {
    if (!isPlayingRef.current || isPausedRef.current) return;

    if (index >= allSentences.length) {
      stopReading(true);
      return;
    }

    if (!synthRef.current) {
      setStatus('Speech synthesis is not available in your browser.');
      stopReading();
      return;
    }

    activeIndexRef.current = index;
    setActiveSentenceIndex(index);
    setStatus(`Reading sentence ${index + 1} of ${allSentences.length}...`);

    // Smooth auto-scroll to current sentence
    const el = sentenceRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const currentSentence = allSentences[index].text;
    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.rate = speed;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current && !isPausedRef.current) {
        speakSentence(index + 1);
      }
    };

    utterance.onerror = event => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        setStatus(`Error reading sentence: ${event.error}`);
        stopReading();
      }
    };

    synthRef.current.speak(utterance);
  };

  const startReading = (fromIndex = 0) => {
    if (allSentences.length === 0) {
      setStatus('Please enter or upload some text first!');
      return;
    }

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    isPlayingRef.current = true;
    isPausedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    setViewMode('focus');

    speakSentence(fromIndex);
  };

  const handlePause = () => {
    if (!synthRef.current) return;
    isPausedRef.current = true;
    setIsPaused(true);
    synthRef.current.cancel(); // Clears active audio buffer while keeping activeSentenceIndex intact
    setStatus(`Paused on sentence ${activeSentenceIndex + 1}. Press Resume to continue.`);
  };

  const handleResume = () => {
    if (!synthRef.current) return;
    isPausedRef.current = false;
    isPlayingRef.current = true;
    setIsPaused(false);
    setIsPlaying(true);
    const resumeIndex = activeIndexRef.current >= 0 ? activeIndexRef.current : 0;
    speakSentence(resumeIndex);
  };

  const handleSentenceClick = (index: number) => {
    // Allows user to click any sentence to immediately jump reading to it
    startReading(index);
  };

  const speakSingleWord = (word: string, index: number) => {
    stopReading();
    if (!synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = speed;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onend = () => setActiveWordIdx(-1);

    synthRef.current.speak(utterance);
    setActiveWordIdx(index);
    setStatus(`Spoke word: "${word}"`);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingFile(true);
    setStatus(`Extracting text from ${file.name}...`);
    try {
      const result = await extractDocumentText(file);
      setText(result.text);
      stopReading();
      setStatus(`Loaded "${file.name}" (${result.wordCount} words)! Press Play to listen with sentence focus.`);
    } catch (err: any) {
      setStatus(err.message || 'Could not load file.');
    } finally {
      setLoadingFile(false);
      e.target.value = '';
    }
  };

  const words = text.trim() ? text.trim().split(/\s+/) : [];

  return (
    <div className="tts-page">
      {/* Floating Letters */}
      {FLOATING_LETTERS.map((item, idx) => (
        <div
          key={idx}
          className="tts-float-letter"
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
      <div className="tts-hero">
        <div className="tts-sound-rings" aria-hidden="true">
          <div className="tts-ring tts-ring-1" />
          <div className="tts-ring tts-ring-2" />
          <div className="tts-ring tts-ring-3" />
        </div>

        <div className="tts-hero-inner">
          <div className="tts-hero-text">
            <h1>
              Text to <span className="tts-hero-accent">Speech</span>
            </h1>
            <p>
              Listen with automatic sentence focus mode in your chosen dyslexia-friendly font. Inactive text gently dims
              while the spoken sentence shines clearly.
            </p>
          </div>
          <div className="tts-hero-art">
            <TtsKidIllustration playing={isPlaying} />
            <div className="tts-kid-label">
              {isPlaying ? (isPaused ? 'Paused' : 'Focus Mode On!') : 'Press Listen!'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="tts-main">
        {/* Controls Strip */}
        <div className="tts-controls-strip">
          {/* Speed Pills */}
          <div className="tts-ctrl-group">
            <span className="tts-ctrl-label">Speed</span>
            <div className="tts-speed-row">
              {SPEED_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`tts-speed-btn ${speed === opt.value ? 'active' : ''}`}
                  onClick={() => setSpeed(opt.value)}
                  aria-label={`Speech rate ${opt.label}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Select */}
          {voices.length > 0 && (
            <div className="tts-ctrl-group">
              <span className="tts-ctrl-label">Voice</span>
              <select
                className="tts-voice-select"
                value={selectedVoice?.name || ''}
                onChange={e => {
                  const match = voices.find(v => v.name === e.target.value);
                  if (match) setSelectedVoice(match);
                }}
                aria-label="Speech Voice"
              >
                {voices.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dyslexia Font Selector Quick Pill */}
          <div className="tts-ctrl-group">
            <span className="tts-ctrl-label">Reading Font</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <select
                className="tts-voice-select"
                value={selectedFont.id}
                onChange={e => {
                  const f = AVAILABLE_FONTS.find(font => font.id === e.target.value);
                  if (f) setSelectedFont(f);
                }}
                aria-label="Dyslexia Font"
                style={{ fontWeight: 600, color: '#4c0593' }}
              >
                {AVAILABLE_FONTS.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.desc})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document Upload Button */}
          <div className="tts-ctrl-group">
            <span className="tts-ctrl-label">Upload File</span>
            <label className="tts-upload-btn">
              <Upload size={14} style={{ marginRight: 6 }} />
              {loadingFile ? 'Loading...' : 'Choose file (.txt, .pdf, .docx)'}
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                disabled={loadingFile}
              />
            </label>
          </div>
        </div>

        {/* View Mode Bar: Reading Focus View vs Edit Text */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div className="tts-mode-switch">
            <button
              type="button"
              className={`tts-mode-btn ${viewMode === 'focus' ? 'active' : ''}`}
              onClick={() => setViewMode('focus')}
            >
              <Eye size={14} style={{ display: 'inline', marginRight: 5 }} />
              Sentence Focus Mode
            </button>
            <button
              type="button"
              className={`tts-mode-btn ${viewMode === 'edit' ? 'active' : ''}`}
              onClick={() => setViewMode('edit')}
            >
              <Sliders size={14} style={{ display: 'inline', marginRight: 5 }} />
              Edit Text
            </button>
          </div>

          <div className="tts-font-badge">
            <Type size={14} />
            <span>Active Font: <strong>{selectedFont.name}</strong></span>
          </div>
        </div>

        {/* Reading Content Area */}
        {viewMode === 'focus' ? (
          /* Sentence-Level Reading Focus Viewer with Applied Dyslexia Typography */
          <div
            ref={viewerContainerRef}
            className={`tts-reading-viewer ${isPlaying ? 'reading-active' : ''}`}
            style={{
              fontFamily: selectedFont.cssFamily,
              fontSize: `${fontSize}px`,
              lineHeight,
              letterSpacing: `${letterSpacing}em`,
              wordSpacing: `${wordSpacing}em`,
              textAlign,
              backgroundColor: bgColor || '#ffffff',
              color: textColor || '#1e1b4b',
            }}
            aria-live="polite"
          >
            {paragraphs.length > 0 ? (
              paragraphs.map(p => (
                <div
                  key={p.paragraphIndex}
                  className="tts-paragraph"
                  style={{ ['--p-spacing' as any]: `${paragraphSpacing}em` }}
                >
                  {p.sentences.map(sentence => {
                    const isActive = activeSentenceIndex === sentence.globalIndex;
                    return (
                      <span
                        key={sentence.globalIndex}
                        ref={el => (sentenceRefs.current[sentence.globalIndex] = el)}
                        className={`tts-sentence ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleSentenceClick(sentence.globalIndex)}
                        title="Click to play from this sentence"
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleSentenceClick(sentence.globalIndex);
                          }
                        }}
                      >
                        {isActive && (
                          <span className="tts-sentence-badge" aria-hidden="true">
                            ▶
                          </span>
                        )}
                        {sentence.text}{' '}
                      </span>
                    );
                  })}
                </div>
              ))
            ) : (
              <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                Your reading text is empty. Click "Edit Text" or upload a file above.
              </p>
            )}
          </div>
        ) : (
          /* Editable Textarea */
          <textarea
            className="tts-textarea"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={e => {
              setText(e.target.value);
              stopReading();
            }}
            rows={7}
            style={{
              fontFamily: selectedFont.cssFamily,
              fontSize: `${fontSize}px`,
              lineHeight,
              letterSpacing: `${letterSpacing}em`,
              wordSpacing: `${wordSpacing}em`,
            }}
            aria-label="Editable text content"
          />
        )}

        {/* Action Controls Row */}
        <div className="tts-btn-row">
          {/* Play/Listen button */}
          {!isPlaying ? (
            <button
              type="button"
              className="tts-listen-btn"
              onClick={() => startReading(0)}
              aria-label="Play reading aloud with sentence focus mode"
            >
              <span className="tts-listen-icon">
                <Play size={16} fill="white" />
              </span>
              Listen
            </button>
          ) : (
            <button
              type="button"
              className="tts-listen-btn is-playing"
              onClick={() => stopReading()}
              aria-label="Stop reading aloud"
            >
              <span className="tts-listen-icon">
                <Square size={16} fill="white" />
              </span>
              Stop
            </button>
          )}

          {/* Pause / Resume Button */}
          {isPlaying && (
            <button
              type="button"
              className="tts-clear-btn"
              onClick={isPaused ? handleResume : handlePause}
              style={{
                background: isPaused ? '#ecfdf5' : '#ede9fe',
                borderColor: isPaused ? '#10b981' : '#7c3aed',
                color: isPaused ? '#065f46' : '#6d28d9',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
              aria-label={isPaused ? 'Resume reading' : 'Pause reading'}
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}

          {/* Clear / Reset text */}
          <button
            type="button"
            className="tts-clear-btn"
            onClick={() => {
              setText('');
              stopReading();
              setStatus('Cleared text.');
            }}
            aria-label="Clear reading text"
          >
            Clear
          </button>
        </div>

        {/* Feedback / Status */}
        {status && (
          <div className={`tts-status ${isPlaying && !isPaused ? 'is-reading' : ''}`}>
            {isPlaying && !isPaused && <span className="tts-status-dot" />}
            <Volume2 size={16} style={{ marginRight: 4, flexShrink: 0 }} />
            <span>{status}</span>
          </div>
        )}

        {/* Click-to-Hear Individual Words Panel */}
        {words.length > 0 && (
          <div className="tts-word-panel">
            <p className="tts-word-panel-hint">
              <strong>Need help with a tricky word?</strong> Click any word below to hear it spoken individually in {selectedFont.name}:
            </p>
            <div className="tts-words">
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`tts-word ${activeWordIdx === idx ? 'active' : ''}`}
                  onClick={() => speakSingleWord(word, idx)}
                  style={{ fontFamily: selectedFont.cssFamily }}
                  title={`Click to listen to "${word}"`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Helpful Tips Row */}
        <div className="tts-tips-row">
          <div className="tts-tip-card">
            <div className="tts-tip-bar" />
            <p>
              <strong>Reading Focus Mode:</strong> As speech plays, the current sentence stays in sharp focus while
              surrounding lines gently dim. Click any sentence to jump straight to it.
            </p>
          </div>
          <div className="tts-tip-card">
            <div className="tts-tip-bar" />
            <p>
              <strong>Synchronized Font:</strong> Your chosen font (<strong>{selectedFont.name}</strong>) and spacing
              automatically apply to the text being read aloud.
            </p>
          </div>
          <div className="tts-tip-card">
            <div className="tts-tip-bar" />
            <p>
              <strong>Speed &amp; Voices:</strong> Try <strong>0.75×</strong> for a calmer, more comfortable reading
              pace. Supports TXT, Word, and PDF document imports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
