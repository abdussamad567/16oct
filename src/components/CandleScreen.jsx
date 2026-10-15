import { useState } from 'react';
import './CandleScreen.css';

export default function CandleScreen({ onNext }) {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const blowCandle = () => {
    if (blown) return;
    setBlown(true);

    // Spawn pink, rose, red, and gold confetti
    setConfetti([...Array(36)].map((_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      color: ['#f43f6e', '#fb7185', '#e11d48', '#f9c74f', '#ff85a2', '#ffffff'][i % 6],
      size: 7 + Math.random() * 8,
      delay: Math.random() * 0.4,
    })));

    setTimeout(onNext, 2200);
  };

  return (
    <div className="candle-screen">
      {/* Sparkles background */}
      <div className="candle-stars" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <span key={i} className="cs-star" style={{
            left: `${5 + Math.random() * 90}%`,
            top:  `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}>✦</span>
        ))}
      </div>

      <div className="candle-card">
        <h2 className="candle-heading">Blow & Make a Wish 🎂💗</h2>

        {/* Cake with candle */}
        <div
          className="candle-cake-wrap"
          onClick={blowCandle}
          onTouchStart={blowCandle}
          role="button"
          tabIndex={0}
          title="Tap to blow out the candle!"
          aria-label="Birthday cake with candle"
        >
          {/* Candle Assembly */}
          <div className="candle-assembly">
            {/* Flickering Flame */}
            {!blown && (
              <div className="candle-flame-wrap">
                <div className="candle-flame-outer" />
                <div className="candle-flame-inner" />
              </div>
            )}
            {blown && <div className="candle-smoke" />}

            {/* Candle Stick */}
            <div className="candle-stick">
              <div className="candle-star cs1">★</div>
              <div className="candle-star cs2">★</div>
              <div className="candle-star cs3">★</div>
            </div>
          </div>

          {/* Strawberry Pink Cake */}
          <div className="candle-cake-body">
            <div className="cake-top-layer">
              <div className="cake-drip" />
              <div className="cake-drip" />
              <div className="cake-drip" />
              <div className="cake-drip" />
            </div>
            <div className="cake-mid-layer" />
            <div className="cake-bottom-layer" />
            <div className="cake-plate" />
          </div>
        </div>

        {!blown ? (
          <p className="candle-hint">🌬️ Tap the candle to blow it out!</p>
        ) : (
          <p className="candle-wish">Your wish is on its way to coming true! 💗✨</p>
        )}

        {/* Confetti */}
        {confetti.map((c) => (
          <div
            key={c.id}
            className="conf-piece"
            style={{
              left: `${c.x}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              background: c.color,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

        {/* Cute party cat */}
        <div className="candle-cat-right" aria-hidden="true">
          <div className="ccat-hat">🎀</div>
          <div className="ccat-ear ccat-ear--l" /><div className="ccat-ear ccat-ear--r" />
          <div className="ccat-head">
            <div className="ccat-glasses">
              <div className="ccat-lens" /><div className="ccat-bridge" /><div className="ccat-lens" />
            </div>
            <div className="ccat-nose" />
          </div>
        </div>

        {blown && (
          <button className="candle-skip-btn" onClick={onNext}>
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
