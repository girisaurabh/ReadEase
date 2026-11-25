import React, { useEffect, useState, useRef } from 'react';

const COLORS = ['#A78BFA', '#60A5FA', '#F472B6', '#34D399', '#FBBF24', '#C4B5FD'];

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  shape: 'star' | 'dot';
}

interface MagicCursorProps {
  enabled?: boolean;
}

export const MagicCursor: React.FC<MagicCursorProps> = ({ enabled = true }) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const idCounter = useRef(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  useEffect(() => {
    if (!enabled || isTouch) {
      document.body.classList.remove('magic-cursor-active');
      return;
    }

    document.body.classList.add('magic-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });

      const newId = idCounter.current++;
      const particle: Particle = {
        id: newId,
        x: clientX + randomRange(-6, 6),
        y: clientY + randomRange(-6, 6),
        size: randomRange(4, 9),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: randomRange(0, 360),
        shape: Math.random() > 0.5 ? 'star' : 'dot',
      };

      setParticles(prev => [...prev.slice(-16), particle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newId));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.body.classList.remove('magic-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, isTouch]);

  if (!enabled || isTouch) return null;

  return (
    <>
      {/* Magic Wand Cursor */}
      <div
        className="mc-wand"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <line x1="6" y1="22" x2="20" y2="8" stroke="#4c0593" strokeWidth="3" strokeLinecap="round" />
          <line x1="6" y1="22" x2="10" y2="18" stroke="#7C3AED" strokeWidth="4.5" strokeLinecap="round" />
          <polygon
            points="20,2 21.5,7 26,7 22.5,10 24,15 20,12 16,15 17.5,10 14,7 18.5,7"
            fill="#FBBF24"
            stroke="#F59E0B"
            strokeWidth="0.5"
          />
          <circle cx="20" cy="8" r="3" fill="#FEF9C3" opacity="0.6" />
        </svg>
      </div>

      {/* Trailing Sparkle Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="mc-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            ['--pc' as any]: p.color,
            ['--pr' as any]: `${p.rotation}deg`,
          }}
          aria-hidden="true"
        >
          {p.shape === 'star' ? (
            <svg width={p.size * 2} height={p.size * 2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polygon points="12,2 14,9 21,9 15.5,14 17.5,21 12,17 6.5,21 8.5,14 3,9 10,9" fill={p.color} />
            </svg>
          ) : (
            <svg width={p.size} height={p.size} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="4" fill={p.color} />
            </svg>
          )}
        </div>
      ))}
    </>
  );
};
