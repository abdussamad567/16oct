import { useState, useEffect } from 'react';
import { LOVE_LETTER_HEADING, LOVE_LETTER_BODY, LOVE_LETTER_SIGNATURE } from '../config.js';
import './LoveLetter.css';

export default function LoveLetter({ onBack }) {
  const [stage, setStage] = useState('box'); // box → envelope → letter
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const t1 = setTimeout(() => setStage('envelope'), 900);
    const t2 = setTimeout(() => setStage('letter'), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const spawnHearts = () => {
    const batch = [...Array(14)].map((_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 0.4,
    }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => setHearts([]), 2200);
  };

  const lines = LOVE_LETTER_BODY.split('\n');

  return (
    <div className="love-screen">
      {/* Floating background decorations */}
      <div className="ll-bg-decorations" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '⭐', '✨', '🌸', '💗', '💕', '✨'].map((emoji, i) => (
          <span
            key={i}
            className="ll-bg-heart"
            style={{
              left: `${7 + i * 11}%`,
              top: `${10 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.45}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Burst particles */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="ll-burst-heart"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            '--tx': `${(Math.random() - 0.5) * 150}px`,
            '--ty': `${-60 - Math.random() * 110}px`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Stage 1: Pink gift box opening */}
      {stage === 'box' && (
        <div className="ll-gift-open">
          <div className="ll-gift-lid">
            <div className="ll-gift-bow">
              <div className="ll-bow-l" /><div className="ll-bow-r" />
              <div className="ll-bow-c" />
            </div>
          </div>
          <div className="ll-gift-base" />
          <p className="ll-open-hint">Opening your surprise, Nida… 🎁✨</p>
        </div>
      )}

      {/* Stage 2: Cute Envelope unfolding */}
      {stage === 'envelope' && (
        <div className="ll-envelope-wrap">
          <div className="ll-envelope">
            <div className="ll-envelope-flap ll-envelope-flap--open" />
            <div className="ll-envelope-body">
              <div className="ll-envelope-front">
                <span className="ll-envelope-heart">✨</span>
              </div>
            </div>
          </div>
          <p className="ll-envelope-hint">Unfolding for Nida… ✨</p>
        </div>
      )}

      {/* Stage 3: The final surprise letter */}
      {stage === 'letter' && (
        <div className="ll-letter-wrap">
          {/* Top navigation button */}
          <div className="ll-top-nav">
            <button id="ll-top-back-btn" className="ll-top-back-btn" onClick={onBack} aria-label="Back to gifts">
              ← Back to Gifts
            </button>
          </div>

          <div className="ll-letter-card">
            {/* Scalloped top border */}
            <div className="ll-wavy-border ll-wavy-top" />

            <div className="ll-letter-inner">
              {/* Header decoration */}
              <div className="ll-letter-top-deco">
                <span>✦</span>
                <span className="ll-deco-heart" onClick={spawnHearts} title="Tap for good vibes! ✨">✨</span>
                <span>✦</span>
              </div>

              <h1 className="ll-letter-heading">{LOVE_LETTER_HEADING}</h1>

              <div className="ll-divider" />

              <div className="ll-letter-body">
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={`ll-line ${line === '' ? 'll-line--gap' : ''}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>

              <div className="ll-divider-sm" />

              <div className="ll-signature-area">
                <div className="ll-signature-line" />
                <p className="ll-signature">{LOVE_LETTER_SIGNATURE}</p>
              </div>

              {/* Action button */}
              <button id="ll-heart-btn" className="ll-heart-btn" onClick={spawnHearts}>
                ✨ Hype Nida!
              </button>
            </div>

            {/* Scalloped bottom border */}
            <div className="ll-wavy-border ll-wavy-bottom" />
          </div>

          <button id="ll-back-btn" className="ll-back-btn" onClick={onBack} aria-label="Back to gifts">
            ← Back to Gifts 🎁
          </button>
        </div>
      )}
    </div>
  );
}
