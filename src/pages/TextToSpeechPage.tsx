import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Pause, RotateCcw, Upload, Volume2 } from 'lucide-react';
import { TtsKidIllustration } from '../components/Illustrations';
import { extractDocumentText } from '../utils/documentExtractor';

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

export const TextToSpeechPage: React.FC = () => {
  const [text, setText] = useState<string>(
    'Dyslexia is a superpower of creative and big-picture thinking. When words are read aloud, learning becomes effortless and fun!'
  );
  const [speed, setSpeed] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(-1);
  const [status, setStatus] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (!synthRef.current) return;
        const availableVoices = synthRef.current.getVoices();
        // Prefer English voices if available, or all voices
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

  const stopReading = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setActiveWordIdx(-1);
    setStatus('');
  };

  const handleSpeak = (textToSpeak: string) => {
    stopReading();
    const clean = textToSpeak.trim();
    if (!clean) {
      setStatus('Please type or upload some text first!');
      return;
    }

    if (!synthRef.current) {
      setStatus('Speech synthesis is not available in your browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = speed;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    let wordCounter = 0;
    utterance.onboundary = event => {
      if (event.name === 'word') {
        setActiveWordIdx(wordCounter);
        wordCounter++;
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWordIdx(-1);
      setStatus('Finished reading!');
    };

    utterance.onerror = event => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        setStatus(`Error reading text: ${event.error}`);
      }
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setStatus('Reading aloud...');
  };

  const handlePauseResume = () => {
    if (!synthRef.current) return;
    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setStatus('Reading resumed...');
    } else {
      synthRef.current.pause();
      setIsPaused(true);
      setStatus('Reading paused.');
    }
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
      setStatus(`Successfully loaded "${file.name}" (${result.wordCount} words)! Press Listen.`);
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

      {/* Hero Section */}
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
              Paste any text and hear it read aloud in a clear, natural voice. Click any word to hear it on its own.
            </p>
          </div>
          <div className="tts-hero-art">
            <TtsKidIllustration playing={isPlaying} />
            <div className="tts-kid-label">
              {isPlaying ? 'Listening...' : 'Press Listen!'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="tts-main">
        {/* Controls Strip */}
        <div className="tts-controls-strip">
          <div className="tts-ctrl-group">
            <span className="tts-ctrl-label">Speed</span>
            <div className="tts-speed-row">
              {SPEED_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`tts-speed-btn ${speed === opt.value ? 'active' : ''}`}
                  onClick={() => setSpeed(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

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
              >
                {voices.map(v => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="tts-ctrl-group">
            <span className="tts-ctrl-label">Upload document</span>
            <label className="tts-upload-btn">
              <Upload size={14} style={{ marginRight: 6 }} />
              {loadingFile ? 'Reading file...' : 'Choose file (.txt, .pdf, .docx)'}
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

        {/* Text Input */}
        <textarea
          className="tts-textarea"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={e => {
            setText(e.target.value);
            stopReading();
          }}
          rows={7}
        />

        {/* Action Buttons */}
        <div className="tts-btn-row">
          <button
            type="button"
            className={`tts-listen-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={() => {
              if (isPlaying) {
                stopReading();
              } else {
                handleSpeak(text);
              }
            }}
          >
            <span className="tts-listen-icon">
              {isPlaying ? <Square size={16} fill="white" /> : <Play size={16} fill="white" />}
            </span>
            {isPlaying ? 'Stop' : 'Listen'}
          </button>

          {isPlaying && (
            <button
              type="button"
              className="tts-clear-btn"
              onClick={handlePauseResume}
              style={{ background: '#f5f3ff', borderColor: '#c4b5fd', color: '#6d28d9' }}
            >
              {isPaused ? <Play size={16} style={{ marginRight: 6 }} /> : <Pause size={16} style={{ marginRight: 6 }} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}

          <button
            type="button"
            className="tts-clear-btn"
            onClick={() => {
              setText('');
              stopReading();
              setStatus('Cleared text.');
            }}
          >
            Clear
          </button>
        </div>

        {/* Feedback / Status */}
        {status && (
          <div className={`tts-status ${isPlaying ? 'is-reading' : ''}`}>
            {isPlaying && <span className="tts-status-dot" />}
            <Volume2 size={16} style={{ marginRight: 4 }} />
            <span>{status}</span>
          </div>
        )}

        {/* Interactive Word Click Panel */}
        {words.length > 0 && (
          <div className="tts-word-panel">
            <p className="tts-word-panel-hint">
              Click any word below to hear it spoken individually:
            </p>
            <div className="tts-words">
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`tts-word ${activeWordIdx === idx ? 'active' : ''}`}
                  onClick={() => speakSingleWord(word, idx)}
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
            <p>Use 0.75× or 0.5× speed if the reading pace feels too fast or crowded.</p>
          </div>
          <div className="tts-tip-card">
            <div className="tts-tip-bar" />
            <p>Click any highlighted word in the word box above to listen to just that tricky word.</p>
          </div>
          <div className="tts-tip-card">
            <div className="tts-tip-bar" />
            <p>Upload TXT, Word (.docx), or PDF documents directly using the upload button above.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
