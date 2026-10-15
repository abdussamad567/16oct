import { useState, useEffect } from 'react';
import { LETTER_HEADING, LETTER_BODY, LETTER_SIGNATURE } from '../config.js';
import './LetterScreen.css';

export default function LetterScreen({ onNext }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  const lines = LETTER_BODY.split('\n');

  return (
    <div className="letter-screen">
      {/* Floating pink hearts */}
      <div className="letter-bg-hearts" aria-hidden="true">
        {['💗', '🌸', '💕', '✨', '💖', '🌸', '💗', '✨'].map((emoji, i) => (
          <span
            key={i}
            className="letter-float-heart"
            style={{
              left: `${8 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className={`letter-card ${revealed ? 'letter-card--in' : ''}`}>
        {/* Scalloped top border */}
        <div className="letter-border-top" />

        <div className="letter-inner">
          {/* Decorative header */}
          <div className="letter-top-deco">
            <span>✦</span>
            <span className="letter-deco-heart">💗</span>
            <span>✦</span>
          </div>

          <h2 className="letter-heading">{LETTER_HEADING}</h2>

          <div className="letter-divider" />

          <div className="letter-body">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`letter-line ${line === '' ? 'letter-line--gap' : ''}`}
                style={{ animationDelay: `${0.2 + i * 0.03}s` }}
              >
                {line || '\u00A0'}
              </p>
            ))}
          </div>

          <div className="letter-signature-wrap">
            <div className="letter-divider-sm" />
            <p className="letter-signature">{LETTER_SIGNATURE}</p>
          </div>
        </div>

        <div className="letter-border-bottom" />
      </div>

      <button id="letter-next-btn" className="letter-next-btn" onClick={onNext}>
        See your gifts 🎁
      </button>
    </div>
  );
}
