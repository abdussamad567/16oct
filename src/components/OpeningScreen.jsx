import { useEffect, useState } from 'react';
import { INTRO_HEADING, INTRO_SUBTITLE, INTRO_BUTTON } from '../config.js';
import './OpeningScreen.css';

export default function OpeningScreen({ onNext }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleStart = () => {
    setExiting(true);
    setTimeout(onNext, 450);
  };

  return (
    <div className={`opening-screen ${exiting ? 'opening-screen--exit' : ''}`}>
      {/* Floating hearts and sparkles background */}
      <div className="opening-bg-effects" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '💖', '💝', '🌸', '❤️', '✨', '💕', '💗', '✨'].map((emoji, i) => (
          <span
            key={i}
            className={`opening-particle p-${i % 4}`}
            style={{
              left: `${(i * 8.3 + 4) % 94}%`,
              top: `${(i * 13.7 + 6) % 90}%`,
              animationDelay: `${(i * 0.45).toFixed(1)}s`,
              animationDuration: `${4 + (i % 3) * 1.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className={`opening-card ${visible ? 'opening-card--visible' : ''}`}>
        {/* Cute top bunting / ribbon accents */}
        <div className="opening-ribbon-accent">
          <span>🌸</span>
          <span>💗</span>
          <span>✨</span>
          <span>💗</span>
          <span>🌸</span>
        </div>

        {/* Front Page Romantic Portrait Frame */}
        <div className="opening-photo-wrapper">
          <div className="opening-photo-frame">
            <img
              src="/images/opening.jpg"
              alt="Birthday surprise portrait"
              className="opening-photo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          {/* Floating micro hearts around photo */}
          <span className="micro-heart mh-1">💗</span>
          <span className="micro-heart mh-2">✨</span>
          <span className="micro-heart mh-3">💕</span>
        </div>

        {/* Text Content */}
        <h1 className="opening-heading">{INTRO_HEADING}</h1>
        <p className="opening-subtitle">{INTRO_SUBTITLE}</p>

        {/* Animated Pink Gift Box Illustration */}
        <div className="opening-gift-wrap" onClick={handleStart} role="button" tabIndex={0} title="Click to open!">
          <div className="pink-gift-box">
            {/* Gift Lid */}
            <div className="gift-lid">
              <div className="lid-ribbon-horizontal" />
              {/* Satin Ribbon Bow */}
              <div className="satin-bow">
                <div className="bow-loop bow-left" />
                <div className="bow-loop bow-right" />
                <div className="bow-knot" />
                <div className="bow-tail tail-left" />
                <div className="bow-tail tail-right" />
              </div>
            </div>

            {/* Gift Body */}
            <div className="gift-box-base">
              <div className="box-ribbon-vertical" />
              <div className="box-shine" />
              <div className="box-heart-tag">💝</div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          id="btn-open-surprise"
          className="opening-cta-btn"
          onClick={handleStart}
          aria-label={INTRO_BUTTON}
        >
          <span className="btn-glow" />
          <span className="btn-text">{INTRO_BUTTON}</span>
        </button>

        <div className="opening-footer-deco">
          <span className="deco-sparkle">✦</span>
          <span className="deco-dot">●</span>
          <span className="deco-sparkle">✦</span>
        </div>
      </div>
    </div>
  );
}
