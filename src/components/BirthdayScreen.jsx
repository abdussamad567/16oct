import { useState, useEffect } from 'react';
import './BirthdayScreen.css';

const BALLOONS = [
  { color: '#f43f6e', x: 8,  y: 60 },
  { color: '#fb7185', x: 14, y: 55 },
  { color: '#f9c74f', x: 20, y: 62 },
];

export default function BirthdayScreen({ onNext }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="birthday-screen">
      {/* Soft pink / blush pastel vertical stripes */}
      <div className="bday-stripes" aria-hidden="true">
        {[...Array(16)].map((_, i) => (
          <div key={i} className={`bday-stripe ${i % 2 === 0 ? 'bs-pink' : 'bs-blush'}`} />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="bday-floating-hearts" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '💖', '✨'].map((emoji, i) => (
          <span
            key={i}
            className="bday-float-heart"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main scrapbook card */}
      <div className={`bday-card ${visible ? 'bday-card--visible' : ''}`}>

        {/* Bunting at the top in pinks, reds, and gold */}
        <div className="bday-bunting" aria-hidden="true">
          {['#e11d48', '#f9c74f', '#f43f6e', '#fb7185', '#e11d48', '#f9c74f', '#f43f6e'].map((c, i) => (
            <div key={i} className="bunting-flag" style={{ background: c }} />
          ))}
        </div>
        <div className="bunting-string" aria-hidden="true" />

        <div className="bday-main">
          {/* Left balloons */}
          <div className="bday-balloons-left">
            {BALLOONS.map((b, i) => (
              <div key={i} className="bday-balloon-wrap" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="bday-balloon" style={{ background: b.color }}>
                  <div className="balloon-shine" />
                </div>
                <div className="balloon-string" />
              </div>
            ))}
          </div>

          {/* Center photo + party hat + Happy Birthday text */}
          <div className="bday-center">
            <div className="bday-photo-container">
              {/* Party hat above photo */}
              <div className="bday-party-hat" aria-hidden="true">
                <div className="ph-cone">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="ph-star" style={{ top: `${8 + i * 13}%`, left: `${15 + (i % 3) * 25}%` }}>★</span>
                  ))}
                </div>
                <div className="ph-brim" />
                <div className="ph-tassel">
                  {[...Array(5)].map((_, i) => <span key={i} className="ph-tassel-strand" style={{ left: `${i * 20}%` }} />)}
                </div>
              </div>

              <div className="bday-photo-frame">
                <img
                  src="/images/birthday.jpg"
                  alt="Birthday celebrant"
                  className="bday-photo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bday-photo-frame--placeholder');
                  }}
                />
                <div className="bday-photo-placeholder">📸 Add /public/images/birthday.jpg</div>
              </div>
            </div>

            {/* Happy Birthday Nida text — ransom note scrapbook style */}
            <div className="hb-text" aria-label="Happy Birthday Nida">
              {'HaPpY'.split('').map((ch, i) => (
                <span key={i} className={`hb-letter hb-l${i}`}>{ch}</span>
              ))}
              <br />
              {'BiRtHdAy'.split('').map((ch, i) => (
                <span key={i} className={`hb-letter hb-b${i}`}>{ch}</span>
              ))}
              <br />
              {'NiDa!'.split('').map((ch, i) => (
                <span key={i} className={`hb-letter hb-n${i}`}>{ch}</span>
              ))}
            </div>

            {/* Gold stars & hearts */}
            <div className="bday-stars-row">
              <span className="bday-gold-star">⭐</span>
              <span className="bday-gold-star" style={{ animationDelay: '0.3s' }}>💗</span>
              <span className="bday-gold-star" style={{ animationDelay: '0.6s' }}>⭐</span>
            </div>
          </div>

          {/* Right side — disco ball + party cat */}
          <div className="bday-right">
            {/* Disco ball */}
            <div className="disco-ball-wrap">
              <div className="disco-ball">
                <div className="disco-shine" />
                <div className="disco-shine disco-shine--2" />
              </div>
              <div className="disco-string" />
            </div>

            {/* Cat with glasses */}
            <div className="bday-cat-right" aria-hidden="true">
              <div className="bc-ear bc-ear--l" /><div className="bc-ear bc-ear--r" />
              <div className="bc-head">
                <div className="bc-glasses">
                  <div className="bc-lens" /><div className="bc-bridge" /><div className="bc-lens" />
                </div>
                <div className="bc-nose" />
              </div>
              <div className="bday-cat-hat-small">🎀</div>
            </div>
          </div>
        </div>

        {/* Next button */}
        <div className="bday-footer">
          <button id="birthday-next-btn" className="bday-next-btn" onClick={onNext}>
            Next surprise 🎂 →
          </button>
        </div>
      </div>
    </div>
  );
}
