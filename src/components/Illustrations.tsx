import React from 'react';

// Hero background animated blobs
export const BlobBackground: React.FC = () => (
  <div className="blob-bg" aria-hidden="true">
    <svg className="blob blob-1" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        fill="url(#g1)"
        d="M320,280Q240,360,160,320Q80,280,80,180Q80,80,180,80Q280,80,340,160Q400,240,320,280Z"
      />
    </svg>
    <svg className="blob blob-2" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        fill="url(#g2)"
        d="M300,260Q220,320,150,290Q80,260,90,170Q100,80,190,90Q280,100,310,180Q340,260,300,260Z"
      />
    </svg>
    <svg className="blob blob-3" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="120" fill="#FDE68A" />
    </svg>
    <svg className="blob blob-4" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="100" fill="#FCE7F3" />
    </svg>
  </div>
);

// TTS Kid Illustration
export const TtsKidIllustration: React.FC<{ playing?: boolean }> = () => (
  <svg
    viewBox="0 0 180 260"
    xmlns="http://www.w3.org/2000/svg"
    className="tts-kid-svg"
    aria-label="A kid pointing at the listen button"
  >
    <rect x="62" y="148" width="56" height="68" rx="18" fill="#4e98f2" />
    <rect x="62" y="160" width="56" height="6" fill="#57fb80" opacity="0.4" />
    <rect x="62" y="172" width="56" height="6" fill="#57fb80" opacity="0.4" />
    <rect x="70" y="208" width="16" height="38" rx="8" fill="#FDE68A" />
    <rect x="94" y="208" width="16" height="38" rx="8" fill="#FDE68A" />
    <ellipse cx="78" cy="246" rx="13" ry="8" fill="#6D28D9" />
    <ellipse cx="102" cy="246" rx="13" ry="8" fill="#6D28D9" />
    <rect x="36" y="158" width="30" height="12" rx="6" fill="#FDE68A" transform="rotate(20 36 158)" />
    <rect x="112" y="152" width="48" height="12" rx="6" fill="#FDE68A" transform="rotate(-10 112 152)" />
    <ellipse cx="158" cy="149" rx="8" ry="7" fill="#FDE68A" />
    <rect x="160" y="143" width="8" height="16" rx="4" fill="#FDE68A" />
    <rect x="82" y="128" width="16" height="22" rx="7" fill="#FDE68A" />
    <ellipse cx="90" cy="112" rx="30" ry="30" fill="#FDE68A" />
    <ellipse cx="90" cy="86" rx="30" ry="16" fill="#92400E" />
    <ellipse cx="62" cy="100" rx="9" ry="16" fill="#92400E" />
    <ellipse cx="118" cy="100" rx="9" ry="16" fill="#92400E" />
    <ellipse cx="80" cy="112" rx="5" ry="6" fill="white" />
    <ellipse cx="100" cy="112" rx="5" ry="6" fill="white" />
    <ellipse cx="80" cy="113" rx="3.2" ry="3.8" fill="#1E1B4B" />
    <ellipse cx="100" cy="113" rx="3.2" ry="3.8" fill="#1E1B4B" />
    <circle cx="81.5" cy="111.5" r="1.2" fill="white" />
    <circle cx="101.5" cy="111.5" r="1.2" fill="white" />
    <path d="M74 104 Q80 100 86 104" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M94 104 Q100 100 106 104" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M78 124 Q90 136 102 124" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Font Changer Hand Writing Illustration
export const FontChangerIllustration: React.FC<{ fontFamily?: string }> = ({ fontFamily = 'OpenDyslexic, serif' }) => (
  <svg
    viewBox="0 0 260 200"
    xmlns="http://www.w3.org/2000/svg"
    className="fc-illustration"
    aria-label="A hand writing letters on paper"
  >
    <rect x="20" y="30" width="200" height="150" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="2" />
    {[70, 90, 110, 130, 150].map(y => (
      <line key={y} x1="36" y1={y} x2="204" y2={y} stroke="#DBEAFE" strokeWidth="1.2" />
    ))}
    <line x1="54" y1="30" x2="54" y2="180" stroke="#FCA5A5" strokeWidth="1.5" />
    <text x="66" y="68" fontSize="28" fontWeight="bold" fill="#3B82F6" fontFamily={fontFamily} className="fc-letter-anim fc-letter-b">
      b
    </text>
    <text x="106" y="68" fontSize="28" fontWeight="bold" fill="#8B5CF6" fontFamily={fontFamily} className="fc-letter-anim fc-letter-d">
      d
    </text>
    <text x="146" y="68" fontSize="28" fontWeight="bold" fill="#10B981" fontFamily={fontFamily} className="fc-letter-anim fc-letter-p">
      p
    </text>
    <text x="186" y="68" fontSize="28" fontWeight="bold" fill="#F59E0B" fontFamily={fontFamily} className="fc-letter-anim fc-letter-q">
      q
    </text>
    <text x="66" y="108" fontSize="15" fill="#6B7280" fontFamily={fontFamily}>reading</text>
    <text x="66" y="128" fontSize="15" fill="#6B7280" fontFamily={fontFamily}>dyslexia</text>
    <rect x="155" y="140" width="80" height="30" rx="14" fill="#FDE68A" transform="rotate(-20 155 140)" />
    <ellipse cx="162" cy="162" rx="22" ry="16" fill="#FDE68A" />
    <rect x="148" y="148" width="10" height="22" rx="5" fill="#FDE68A" transform="rotate(-15 148 148)" />
    <rect x="160" y="144" width="10" height="26" rx="5" fill="#FDE68A" transform="rotate(-5 160 144)" />
    <rect x="172" y="145" width="10" height="24" rx="5" fill="#FDE68A" transform="rotate(5 172 145)" />
    <rect x="183" y="150" width="10" height="20" rx="5" fill="#FDE68A" transform="rotate(15 183 150)" />
    <rect x="140" y="158" width="10" height="18" rx="5" fill="#FDE68A" transform="rotate(-40 140 158)" />
    <rect x="149" y="128" width="6" height="36" rx="2" fill="#FCD34D" transform="rotate(-15 149 128)" />
    <polygon points="149,164 155,164 152,174" fill="#FCA5A5" transform="rotate(-15 152 164)" />
    <circle cx="149" cy="172" r="2" fill="#1E1B4B" opacity="0.5" transform="rotate(-15 152 164)" />
  </svg>
);

// Colour Overlay Child Reading Under Lamp Illustration
export const ColourOverlayIllustration: React.FC<{ bgColour: string }> = ({ bgColour }) => (
  <svg
    viewBox="0 0 240 220"
    xmlns="http://www.w3.org/2000/svg"
    className="co-illustration"
    aria-label="A child reading a book under a lamp"
  >
    <ellipse cx="120" cy="208" rx="100" ry="8" fill="#E5E7EB" opacity="0.5" />
    <rect x="117" y="60" width="6" height="90" rx="3" fill="#9CA3AF" />
    <rect x="100" y="148" width="40" height="6" rx="3" fill="#6B7280" />
    <path d="M90 60 L150 60 L138 30 L102 30 Z" fill="#FCD34D" />
    <path d="M90 60 L150 60 L138 30 L102 30 Z" fill="none" stroke="#F59E0B" strokeWidth="2" />
    <ellipse cx="120" cy="65" rx="36" ry="12" fill="#FEF9C3" opacity="0.6" />
    <path d="M95 65 L68 155 L172 155 L145 65 Z" fill="#FEFCE8" opacity="0.35" />
    <ellipse cx="120" cy="195" rx="64" ry="18" fill="#C4B5FD" />
    <ellipse cx="120" cy="188" rx="56" ry="22" fill="#DDD6FE" />
    <rect x="90" y="148" width="60" height="52" rx="20" fill="#FDE68A" />
    <rect x="90" y="158" width="60" height="8" rx="0" fill="#60A5FA" opacity="0.5" />
    <rect x="90" y="170" width="60" height="8" rx="0" fill="#60A5FA" opacity="0.4" />
    <ellipse cx="104" cy="200" rx="18" ry="10" fill="#FDE68A" transform="rotate(-15 104 200)" />
    <ellipse cx="136" cy="200" rx="18" ry="10" fill="#FDE68A" transform="rotate(15 136 200)" />
    <rect x="82" y="162" width="76" height="52" rx="6" fill={bgColour} stroke="#E5E7EB" strokeWidth="1.5" />
    <rect x="82" y="162" width="38" height="52" rx="0" fill={bgColour === '#FFFFFF' ? '#F9FAFB' : bgColour} opacity="0.8" />
    <rect x="119" y="162" width="2" height="52" fill="#D1D5DB" />
    <rect x="88" y="174" width="26" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="88" y="181" width="20" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="88" y="188" width="24" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="88" y="195" width="18" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="123" y="174" width="26" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="123" y="181" width="20" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="123" y="188" width="24" height="3" rx="1.5" fill="#9CA3AF" opacity="0.5" />
    <rect x="66" y="168" width="28" height="11" rx="5" fill="#FDE68A" transform="rotate(10 66 168)" />
    <rect x="146" y="168" width="28" height="11" rx="5" fill="#FDE68A" transform="rotate(-10 146 168)" />
    <rect x="110" y="128" width="20" height="22" rx="8" fill="#FDE68A" />
    <ellipse cx="120" cy="114" rx="30" ry="30" fill="#FDE68A" />
    <ellipse cx="120" cy="88" rx="30" ry="16" fill="#92400E" />
    <ellipse cx="93" cy="102" rx="9" ry="16" fill="#92400E" />
    <ellipse cx="147" cy="102" rx="9" ry="16" fill="#92400E" />
    <ellipse cx="111" cy="116" rx="4.5" ry="3.5" fill="white" />
    <ellipse cx="129" cy="116" rx="4.5" ry="3.5" fill="white" />
    <ellipse cx="111" cy="117" rx="3" ry="2.5" fill="#1E1B4B" />
    <ellipse cx="129" cy="117" rx="3" ry="2.5" fill="#1E1B4B" />
    <circle cx="112" cy="116" r="1" fill="white" />
    <circle cx="130" cy="116" r="1" fill="white" />
    <path d="M112 126 Q120 132 128 126" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="103" cy="122" rx="6" ry="4" fill="#FCA5A5" opacity="0.45" />
    <ellipse cx="137" cy="122" rx="6" ry="4" fill="#FCA5A5" opacity="0.45" />
    {/* Floating color bubbles */}
    <circle cx="44" cy="80" r="10" fill="#FEFCE8" stroke="#FCD34D" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '0s' }} />
    <circle cx="196" cy="70" r="8" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '0.6s' }} />
    <circle cx="30" cy="130" r="7" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '1.2s' }} />
    <circle cx="210" cy="120" r="9" fill="#F0FDF4" stroke="#6EE7B7" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '0.3s' }} />
    <circle cx="52" cy="170" r="6" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '0.9s' }} />
    <circle cx="200" cy="165" r="7" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2" className="co-swatch-float" style={{ animationDelay: '0.5s' }} />
  </svg>
);

// Kids Page Illustration
export const KidReadingIllustration: React.FC = () => (
  <svg
    viewBox="0 0 220 260"
    xmlns="http://www.w3.org/2000/svg"
    className="kid-illustration"
    aria-label="A kid happily reading a book"
  >
    <rect x="30" y="200" width="160" height="12" rx="6" fill="#C4B5FD" />
    <rect x="45" y="212" width="12" height="40" rx="4" fill="#A78BFA" />
    <rect x="163" y="212" width="12" height="40" rx="4" fill="#A78BFA" />
    <rect x="22" y="168" width="12" height="52" rx="4" fill="#A78BFA" />
    <rect x="70" y="148" width="80" height="68" rx="20" fill="#FDE68A" />
    <rect x="78" y="200" width="22" height="38" rx="10" fill="#FDE68A" />
    <rect x="120" y="200" width="22" height="38" rx="10" fill="#FDE68A" />
    <ellipse cx="89" cy="238" rx="16" ry="9" fill="#6D28D9" />
    <ellipse cx="131" cy="238" rx="16" ry="9" fill="#6D28D9" />
    <rect x="42" y="158" width="32" height="14" rx="7" fill="#FDE68A" />
    <rect x="146" y="158" width="32" height="14" rx="7" fill="#FDE68A" />
    <rect x="58" y="158" width="104" height="70" rx="8" fill="#3B82F6" />
    <rect x="58" y="158" width="52" height="70" rx="0" fill="#60A5FA" />
    <rect x="108" y="158" width="2" height="70" fill="#1D4ED8" />
    <rect x="66" y="172" width="36" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="66" y="182" width="28" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="66" y="192" width="32" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="66" y="202" width="24" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="116" y="172" width="36" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="116" y="182" width="28" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="116" y="192" width="32" height="4" rx="2" fill="white" opacity="0.6" />
    <rect x="98" y="120" width="24" height="30" rx="10" fill="#FDE68A" />
    <ellipse cx="110" cy="104" rx="38" ry="40" fill="#FDE68A" />
    <ellipse cx="110" cy="70" rx="38" ry="20" fill="#92400E" />
    <ellipse cx="76" cy="90" rx="10" ry="18" fill="#92400E" />
    <ellipse cx="144" cy="90" rx="10" ry="18" fill="#92400E" />
    <ellipse cx="96" cy="104" rx="6" ry="7" fill="white" />
    <ellipse cx="124" cy="104" rx="6" ry="7" fill="white" />
    <ellipse cx="97" cy="105" rx="4" ry="4.5" fill="#1E1B4B" />
    <ellipse cx="125" cy="105" rx="4" ry="4.5" fill="#1E1B4B" />
    <circle cx="99" cy="103" r="1.5" fill="white" />
    <circle cx="127" cy="103" r="1.5" fill="white" />
    <path d="M98 118 Q110 128 122 118" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="84" cy="115" rx="8" ry="5" fill="#FCA5A5" opacity="0.5" />
    <ellipse cx="136" cy="115" rx="8" ry="5" fill="#FCA5A5" opacity="0.5" />
  </svg>
);

// Parents Page Family Illustration
export const ParentsIllustration: React.FC = () => (
  <svg
    viewBox="0 0 300 240"
    xmlns="http://www.w3.org/2000/svg"
    className="parents-illustration"
    aria-label="A family of three playing together"
  >
    <ellipse cx="150" cy="228" rx="130" ry="10" fill="#D1FAE5" opacity="0.6" />
    <rect x="128" y="152" width="44" height="52" rx="16" fill="#0D9488" />
    <rect x="132" y="196" width="14" height="30" rx="7" fill="#FDE68A" />
    <rect x="154" y="196" width="14" height="30" rx="7" fill="#FDE68A" />
    <ellipse cx="139" cy="226" rx="11" ry="7" fill="#0F766E" />
    <ellipse cx="161" cy="226" rx="11" ry="7" fill="#0F766E" />
    <rect x="143" y="132" width="14" height="22" rx="6" fill="#FDE68A" />
    <ellipse cx="150" cy="118" rx="26" ry="26" fill="#FDE68A" />
    <ellipse cx="150" cy="96" rx="26" ry="14" fill="#92400E" />
    <ellipse cx="126" cy="110" rx="7" ry="14" fill="#92400E" />
    <ellipse cx="174" cy="110" rx="7" ry="14" fill="#92400E" />
    <ellipse cx="142" cy="118" rx="4" ry="4.5" fill="white" />
    <ellipse cx="158" cy="118" rx="4" ry="4.5" fill="white" />
    <ellipse cx="142" cy="119" rx="2.5" ry="3" fill="#1E1B4B" />
    <ellipse cx="158" cy="119" rx="2.5" ry="3" fill="#1E1B4B" />
    <circle cx="143" cy="118" r="1" fill="white" />
    <circle cx="159" cy="118" r="1" fill="white" />
    <path d="M143 128 Q150 135 157 128" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="135" cy="124" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.5" />
    <ellipse cx="165" cy="124" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.5" />

    {/* Parent Left */}
    <rect x="68" y="138" width="52" height="66" rx="18" fill="#06B6D4" />
    <rect x="74" y="196" width="16" height="34" rx="7" fill="#1E293B" />
    <rect x="98" y="196" width="16" height="34" rx="7" fill="#1E293B" />
    <ellipse cx="82" cy="228" rx="12" ry="7" fill="#0F172A" />
    <ellipse cx="106" cy="228" rx="12" ry="7" fill="#0F172A" />
    <ellipse cx="94" cy="108" rx="28" ry="30" fill="#FDE68A" />
    <ellipse cx="94" cy="82" rx="28" ry="16" fill="#B45309" />
    <ellipse cx="86" cy="108" rx="4" ry="4.5" fill="#1E1B4B" />
    <ellipse cx="102" cy="108" rx="4" ry="4.5" fill="#1E1B4B" />
    <path d="M88 120 Q94 126 100 120" stroke="#92400E" strokeWidth="2" fill="none" />

    {/* Parent Right */}
    <rect x="180" y="138" width="52" height="66" rx="18" fill="#10B981" />
    <rect x="186" y="196" width="16" height="34" rx="7" fill="#1E293B" />
    <rect x="210" y="196" width="16" height="34" rx="7" fill="#1E293B" />
    <ellipse cx="194" cy="228" rx="12" ry="7" fill="#0F172A" />
    <ellipse cx="218" cy="228" rx="12" ry="7" fill="#0F172A" />
    <ellipse cx="206" cy="108" rx="28" ry="30" fill="#FDE68A" />
    <ellipse cx="206" cy="82" rx="28" ry="16" fill="#92400E" />
    <ellipse cx="198" cy="108" rx="4" ry="4.5" fill="#1E1B4B" />
    <ellipse cx="214" cy="108" rx="4" ry="4.5" fill="#1E1B4B" />
    <path d="M200 120 Q206 126 212 120" stroke="#92400E" strokeWidth="2" fill="none" />
  </svg>
);

// Educators Classroom Illustration
export const EducatorsIllustration: React.FC = () => (
  <svg
    viewBox="0 0 380 280"
    xmlns="http://www.w3.org/2000/svg"
    className="educators-illustration"
    aria-label="A teacher writing on a blackboard while a student sits at a desk"
  >
    {/* Blackboard */}
    <rect x="10" y="20" width="170" height="110" rx="6" fill="#1a3a2a" />
    <rect x="16" y="26" width="158" height="98" rx="4" fill="#1e4d36" />
    <rect x="10" y="130" width="170" height="8" rx="3" fill="#78350F" />
    <text x="30" y="80" fontSize="28" fontWeight="bold" fill="white" fontFamily="serif" opacity="0.9">
      a b
    </text>
    <text x="100" y="80" fontSize="28" fontWeight="bold" fill="white" fontFamily="serif" opacity="0.9">
      c d
    </text>
    <line x1="30" y1="88" x2="155" y2="88" stroke="white" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 3" />
    <rect x="32" y="100" width="18" height="3" rx="1.5" fill="white" opacity="0.25" />
    <rect x="58" y="100" width="12" height="3" rx="1.5" fill="white" opacity="0.25" />
    <rect x="78" y="100" width="20" height="3" rx="1.5" fill="white" opacity="0.25" />
    <rect x="10" y="20" width="170" height="110" rx="6" fill="none" stroke="#92400E" strokeWidth="2.5" />

    {/* Teacher */}
    <rect x="192" y="128" width="52" height="80" rx="18" fill="#EA580C" opacity="0.9" />
    <path d="M210 128 L218 148 L226 128" fill="white" opacity="0.9" />
    <rect x="200" y="200" width="14" height="40" rx="7" fill="#1E293B" />
    <rect x="222" y="200" width="14" height="40" rx="7" fill="#1E293B" />
    <ellipse cx="207" cy="240" rx="12" ry="7" fill="#0F172A" />
    <ellipse cx="229" cy="240" rx="12" ry="7" fill="#0F172A" />
    <rect x="155" y="112" width="46" height="12" rx="6" fill="#FDE68A" transform="rotate(-15 155 112)" />
    <rect x="148" y="108" width="16" height="6" rx="3" fill="white" />
    <rect x="238" y="140" width="30" height="12" rx="6" fill="#FDE68A" />
    <rect x="210" y="106" width="16" height="24" rx="7" fill="#FDE68A" />
    <ellipse cx="218" cy="92" rx="26" ry="28" fill="#FDE68A" />
    <ellipse cx="218" cy="67" rx="26" ry="14" fill="#B45309" />
    <ellipse cx="195" cy="80" rx="7" ry="14" fill="#B45309" />
    <ellipse cx="241" cy="80" rx="7" ry="14" fill="#B45309" />
    <rect x="204" y="88" width="12" height="9" rx="4" fill="none" stroke="#1E293B" strokeWidth="1.8" />
    <rect x="220" y="88" width="12" height="9" rx="4" fill="none" stroke="#1E293B" strokeWidth="1.8" />
    <ellipse cx="210" cy="92" rx="2.5" ry="3" fill="#1E1B4B" />
    <ellipse cx="226" cy="92" rx="2.5" ry="3" fill="#1E1B4B" />
    <path d="M210 102 Q218 109 226 102" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Student Desk */}
    <rect x="290" y="190" width="80" height="10" rx="4" fill="#B45309" />
    <rect x="295" y="200" width="8" height="50" rx="3" fill="#92400E" />
    <rect x="357" y="200" width="8" height="50" rx="3" fill="#92400E" />
    <rect x="294" y="178" width="52" height="14" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="298" y1="183" x2="342" y2="183" stroke="#DBEAFE" strokeWidth="1.2" />
    <line x1="298" y1="187" x2="338" y2="187" stroke="#DBEAFE" strokeWidth="1.2" />

    {/* Student */}
    <g className="student-head-group">
      <ellipse cx="320" cy="130" rx="22" ry="24" fill="#FDE68A" />
      <ellipse cx="320" cy="112" rx="22" ry="14" fill="#78350F" />
      <ellipse cx="314" cy="130" rx="2.5" ry="3" fill="#1E1B4B" />
      <ellipse cx="326" cy="130" rx="2.5" ry="3" fill="#1E1B4B" />
      <path d="M315 140 Q320 144 325 140" stroke="#92400E" strokeWidth="1.5" fill="none" />
    </g>
    <rect x="300" y="152" width="40" height="45" rx="14" fill="#3B82F6" />
  </svg>
);

// Decorative SVG Shapes
export const MicShape: React.FC = () => (
  <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="28" ry="28" fill="#BFDBFE" />
    <path d="M24 22 C24 16 40 16 40 22 L40 34 C40 40 24 40 24 34 Z" fill="#3B82F6" />
    <rect x="28" y="40" width="8" height="6" fill="#3B82F6" />
    <rect x="22" y="46" width="20" height="4" rx="2" fill="#3B82F6" />
    <path d="M18 26 Q14 32 18 38" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M46 26 Q50 32 46 38" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

export const FontShape: React.FC = () => (
  <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="28" ry="28" fill="#DDD6FE" />
    <text x="16" y="40" fontSize="28" fontWeight="bold" fill="#7C3AED" fontFamily="serif">A</text>
    <text x="36" y="38" fontSize="20" fontWeight="bold" fill="#8B5CF6" fontFamily="sans-serif">a</text>
  </svg>
);

export const ColourShape: React.FC = () => (
  <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="28" ry="28" fill="#A7F3D0" />
    <circle cx="22" cy="28" r="10" fill="#FCD34D" />
    <circle cx="38" cy="24" r="10" fill="#60A5FA" opacity="0.85" />
    <circle cx="30" cy="38" r="10" fill="#F472B6" opacity="0.8" />
  </svg>
);

export const DecoStar: React.FC<{ style?: React.CSSProperties; color?: string; size?: number }> = ({
  style = {},
  color = '#FCD34D',
  size = 24,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ position: 'absolute', ...style }} aria-hidden="true">
    <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" fill={color} />
  </svg>
);

export const DecoBlob: React.FC<{ color: string; opacity?: number; style?: React.CSSProperties }> = ({
  color,
  opacity = 0.15,
  style = {},
}) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="deco-blob" style={style} aria-hidden="true">
    <path
      fill={color}
      fillOpacity={opacity}
      d="M48,-67C60,-55,67,-38,72,-20C77,-2,80,17,73,32C65,47,48,58,30,66C12,74,-7,80,-25,75C-43,70,-60,56,-68,38C-76,20,-75,0,-67,-17C-59,-34,-44,-48,-28,-59C-12,-70,5,-79,20,-75C35,-71,36,-79,48,-67Z"
      transform="translate(100 100)"
    />
  </svg>
);

export const DotCluster: React.FC<{ style?: React.CSSProperties }> = ({ style = {} }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', ...style }} aria-hidden="true">
    {[
      [10, 10], [30, 8], [50, 12], [8, 30],
      [52, 28], [12, 50], [32, 52], [50, 48],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="#A78BFA" opacity="0.5" />
    ))}
  </svg>
);
