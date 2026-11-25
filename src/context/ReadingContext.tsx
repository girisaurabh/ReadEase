import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FontOption {
  id: string;
  name: string;
  desc: string;
  cssFamily: string;
  preview: string;
  accent: string;
  bg: string;
}

export const AVAILABLE_FONTS: FontOption[] = [
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
    id: 'verdana',
    name: 'Verdana',
    desc: 'Wide proportions and distinct shapes prevent confusion.',
    cssFamily: 'Verdana, sans-serif',
    preview: 'Aa',
    accent: '#0D9488',
    bg: '#CCFBF1',
  },
  {
    id: 'comic',
    name: 'Comic Sans',
    desc: 'Surprisingly effective for many dyslexic readers.',
    cssFamily: '"Comic Sans MS", cursive, sans-serif',
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

export interface ReadingSettingsState {
  text: string;
  setText: (t: string) => void;
  selectedFont: FontOption;
  setSelectedFont: (f: FontOption) => void;
  fontSize: number;
  setFontSize: (s: number) => void;
  lineHeight: number;
  setLineHeight: (lh: number) => void;
  letterSpacing: number;
  setLetterSpacing: (ls: number) => void;
  wordSpacing: number;
  setWordSpacing: (ws: number) => void;
  paragraphSpacing: number;
  setParagraphSpacing: (ps: number) => void;
  textAlign: 'left' | 'center' | 'justify';
  setTextAlign: (align: 'left' | 'center' | 'justify') => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  fontWeight: number;
  setFontWeight: (w: number) => void;
  resetSettings: () => void;
}

const DEFAULT_TEXT = `Reading is a wonderful journey. Every word is a small adventure, and every sentence is a path to new discovery.\n\nWith the right font and comfortable spacing, reading becomes easier, smoother, and more enjoyable for everyone.\n\nText-to-speech brings stories to life, while dyslexia-friendly fonts keep letters still on the page.`;

const ReadingContext = createContext<ReadingSettingsState | undefined>(undefined);

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Shared reading text
  const [text, setTextState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_shared_text');
      return saved !== null ? saved : DEFAULT_TEXT;
    } catch {
      return DEFAULT_TEXT;
    }
  });

  // Settings
  const [selectedFont, setSelectedFontState] = useState<FontOption>(() => {
    try {
      const savedId = localStorage.getItem('dyslexiaease_selected_font_id');
      const found = AVAILABLE_FONTS.find(f => f.id === savedId);
      return found || AVAILABLE_FONTS[0];
    } catch {
      return AVAILABLE_FONTS[0];
    }
  });

  const [fontSize, setFontSizeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_font_size');
      return saved ? parseFloat(saved) : 18;
    } catch {
      return 18;
    }
  });

  const [lineHeight, setLineHeightState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_line_height');
      return saved ? parseFloat(saved) : 1.8;
    } catch {
      return 1.8;
    }
  });

  const [letterSpacing, setLetterSpacingState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_letter_spacing');
      return saved ? parseFloat(saved) : 0.05;
    } catch {
      return 0.05;
    }
  });

  const [wordSpacing, setWordSpacingState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_word_spacing');
      return saved ? parseFloat(saved) : 0.1;
    } catch {
      return 0.1;
    }
  });

  const [paragraphSpacing, setParagraphSpacingState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_paragraph_spacing');
      return saved ? parseFloat(saved) : 1.8;
    } catch {
      return 1.8;
    }
  });

  const [textAlign, setTextAlignState] = useState<'left' | 'center' | 'justify'>('left');
  const [bgColor, setBgColorState] = useState<string>('#FEFCE8');
  const [textColor, setTextColorState] = useState<string>('#1E1B4B');
  const [fontWeight, setFontWeightState] = useState<number>(400);

  // Sync text to localStorage
  const setText = (t: string) => {
    setTextState(t);
    try {
      localStorage.setItem('dyslexiaease_shared_text', t);
    } catch (e) {
      console.warn('Failed to save shared text', e);
    }
  };

  // Sync font to localStorage
  const setSelectedFont = (f: FontOption) => {
    setSelectedFontState(f);
    try {
      localStorage.setItem('dyslexiaease_selected_font_id', f.id);
    } catch (e) {
      console.warn('Failed to save font choice', e);
    }
  };

  const setFontSize = (s: number) => {
    setFontSizeState(s);
    try {
      localStorage.setItem('dyslexiaease_font_size', s.toString());
    } catch (e) {
      console.warn(e);
    }
  };

  const setLineHeight = (lh: number) => {
    setLineHeightState(lh);
    try {
      localStorage.setItem('dyslexiaease_line_height', lh.toString());
    } catch (e) {
      console.warn(e);
    }
  };

  const setLetterSpacing = (ls: number) => {
    setLetterSpacingState(ls);
    try {
      localStorage.setItem('dyslexiaease_letter_spacing', ls.toString());
    } catch (e) {
      console.warn(e);
    }
  };

  const setWordSpacing = (ws: number) => {
    setWordSpacingState(ws);
    try {
      localStorage.setItem('dyslexiaease_word_spacing', ws.toString());
    } catch (e) {
      console.warn(e);
    }
  };

  const setParagraphSpacing = (ps: number) => {
    setParagraphSpacingState(ps);
    try {
      localStorage.setItem('dyslexiaease_paragraph_spacing', ps.toString());
    } catch (e) {
      console.warn(e);
    }
  };

  const setTextAlign = (align: 'left' | 'center' | 'justify') => setTextAlignState(align);
  const setBgColor = (color: string) => setBgColorState(color);
  const setTextColor = (color: string) => setTextColorState(color);
  const setFontWeight = (w: number) => setFontWeightState(w);

  const resetSettings = () => {
    setSelectedFont(AVAILABLE_FONTS[0]);
    setFontSize(18);
    setLineHeight(1.8);
    setLetterSpacing(0.05);
    setWordSpacing(0.1);
    setParagraphSpacing(1.8);
    setTextAlign('left');
    setBgColor('#FEFCE8');
    setTextColor('#1E1B4B');
    setFontWeight(400);
  };

  return (
    <ReadingContext.Provider
      value={{
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
        setWordSpacing,
        paragraphSpacing,
        setParagraphSpacing,
        textAlign,
        setTextAlign,
        bgColor,
        setBgColor,
        textColor,
        setTextColor,
        fontWeight,
        setFontWeight,
        resetSettings,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReadingSettings = (): ReadingSettingsState => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReadingSettings must be used within a ReadingProvider');
  }
  return context;
};
