import { useState } from 'react';
import './GiftSelection.css';

const GIFTS = [
  { key: 'photoMemories',   label: '📸 Bestie Memories', desc: 'Camera photo album' },
  { key: 'hangoutMemories', label: '💕 Our Hangouts',     desc: 'Hangouts & clips' },
  { key: 'loveLetter',      label: '🎁 For Nida',         desc: 'A special surprise for you' },
];

export default function GiftSelection({ onGift }) {
  const [hoveredGift, setHoveredGift] = useState(null);
  const [openingGift, setOpeningGift] = useState(null);

  const handleClick = (key) => {
    setOpeningGift(key);
    setTimeout(() => onGift(key), 600);
  };

  return (
    <div className="gifts-screen">
      {/* Floating pink & red hearts */}
      <div className="gifts-bg-decorations" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '💖', '✨', '🌸', '💗', '💕', '✨'].map((emoji, i) => (
          <span
            key={i}
            className="gifts-deco-mark"
            style={{
              left: `${(i * 10 + 6) % 95}%`,
              top: `${(i * 11 + 7) % 90}%`,
              animationDelay: `${i * 0.45}s`,
              fontSize: `${16 + (i % 3) * 6}px`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="gifts-card">
        {/* Wavy top border */}
        <div className="gifts-wavy-top" />

        <div className="gifts-inner">
          {/* Heading banner */}
          <div className="gifts-heading-banner">
            <span className="gifts-dot" />
            <h1 className="gifts-heading">Select Any Gift 🎁💗</h1>
            <span className="gifts-dot" />
          </div>

          {/* Three gift boxes */}
          <div className="gifts-row">
            {GIFTS.map((g, i) => (
              <button
                key={g.key}
                id={`gift-btn-${g.key}`}
                className={`gift-box-btn ${hoveredGift === g.key ? 'gift-box-btn--hovered' : ''} ${openingGift === g.key ? 'gift-box-btn--opening' : ''}`}
                onMouseEnter={() => setHoveredGift(g.key)}
                onMouseLeave={() => setHoveredGift(null)}
                onClick={() => handleClick(g.key)}
                title={g.desc}
                style={{ animationDelay: `${i * 0.15}s` }}
                aria-label={`Open ${g.label}`}
              >
                {/* Gift box illustration */}
                <div className="gift-box">
                  {/* Lid */}
                  <div className="gift-lid">
                    <div className="gift-ribbon-h" />
                    {/* Bow */}
                    <div className="gift-bow">
                      <div className="bow-left" />
                      <div className="bow-right" />
                      <div className="bow-center" />
                    </div>
                  </div>
                  {/* Body */}
                  <div className="gift-body">
                    <div className="gift-ribbon-v" />
                    <div className="gift-sparkle">✨</div>
                  </div>
                </div>
                <span className="gift-label">{g.label}</span>
              </button>
            ))}
          </div>

          {/* Sweet hint */}
          <p className="gifts-hint">Tap any gift to open it 💗</p>
        </div>

        <div className="gifts-wavy-bottom" />
      </div>
    </div>
  );
}
