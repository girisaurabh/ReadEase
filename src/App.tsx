import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MagicCursor } from './components/MagicCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TextToSpeechPage } from './pages/TextToSpeechPage';
import { FontChangerPage } from './pages/FontChangerPage';
import { ColourOverlayPage } from './pages/ColourOverlayPage';
import { KidsPage } from './pages/KidsPage';
import { ParentsPage } from './pages/ParentsPage';
import { EducatorsPage } from './pages/EducatorsPage';
import { ReadingWorkspacePage } from './pages/ReadingWorkspacePage';

// Component to scroll to top whenever navigation changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [cursorEnabled, setCursorEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('dyslexiaease_magic_cursor');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleCursor = () => {
    setCursorEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('dyslexiaease_magic_cursor', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MagicCursor enabled={cursorEnabled} />
      <Navbar cursorEnabled={cursorEnabled} onToggleCursor={toggleCursor} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading-workspace" element={<ReadingWorkspacePage />} />
          <Route path="/text-to-speech" element={<TextToSpeechPage />} />
          <Route path="/font-changer" element={<FontChangerPage />} />
          <Route path="/colour-overlay" element={<ColourOverlayPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/educators" element={<EducatorsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
