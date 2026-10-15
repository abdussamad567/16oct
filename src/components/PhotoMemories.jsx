import { useState } from 'react';
import { PHOTO_GALLERY, PHOTO_MEMORIES_TITLE, PHOTO_MEMORIES_SUBTITLE } from '../config.js';
import './PhotoMemories.css';

export default function PhotoMemories({ onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flash, setFlash]           = useState(false);
  const [hearts, setHearts]         = useState([]);

  const current = PHOTO_GALLERY[currentIdx] || { src: '', caption: 'Besties ✨' };

  const changePhoto = (idx) => {
    if (idx === currentIdx) return;
    setFlash(true);
    setTimeout(() => {
      setCurrentIdx(idx);
      setFlash(false);
    }, 180);
  };

  const prev = () => changePhoto((currentIdx - 1 + PHOTO_GALLERY.length) % PHOTO_GALLERY.length);
  const next = () => changePhoto((currentIdx + 1) % PHOTO_GALLERY.length);

  const spawnHearts = () => {
    const newHearts = [...Array(10)].map((_, i) => ({
      id: Date.now() + i,
      x: 25 + Math.random() * 50,
      size: 16 + Math.random() * 18,
      delay: Math.random() * 0.35,
    }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => setHearts([]), 1800);
  };

  return (
    <div className="photo-screen">
      {/* Floating background decorations */}
      <div className="pm-bg-decorations" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '⭐', '✨', '🌸', '💗'].map((emoji, i) => (
          <span
            key={i}
            className="pm-bg-heart"
            style={{
              left: `${8 + i * 12}%`,
              top: `${12 + (i % 3) * 24}%`,
              animationDelay: `${i * 0.4}s`,
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
          className="pm-burst-heart"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            '--tx': `${(Math.random() - 0.5) * 120}px`,
            '--ty': `${-60 - Math.random() * 90}px`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Camera flash overlay */}
      {flash && <div className="pm-flash" />}

      <div className="photo-card">
        {/* Sticky Header — Always Visible */}
        <div className="pm-header">
          <button id="pm-back-btn" className="pm-back-btn" onClick={onBack} aria-label="Back to gifts">
            ← Back to Gifts
          </button>
          <div className="pm-header-text">
            <h1 className="pm-title">{PHOTO_MEMORIES_TITLE}</h1>
            <p className="pm-subtitle">{PHOTO_MEMORIES_SUBTITLE}</p>
          </div>
        </div>

        {/* Vintage Camera Frame */}
        <div className="pm-camera-wrap">
          <div className="pm-camera-body">
            <div className="pm-camera-top-bar">
              <div className="pm-camera-flash-light" />
              <div className="pm-camera-brand">NIDA'S ALBUM 📷</div>
              <div className="pm-camera-mode">BESTIE MODE ✨</div>
            </div>

            {/* Viewfinder */}
            <div className="pm-viewfinder">
              <img
                src={current.src}
                alt={current.caption}
                className="pm-main-photo"
                key={currentIdx}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('pm-viewfinder--placeholder');
                }}
              />
              <div className="pm-viewfinder-placeholder">
                📸 Add your photos to<br /><code>/public/images/photo{currentIdx + 1}.jpg</code>
              </div>
              {/* Corner guides */}
              <div className="vf-corner vf-tl" />
              <div className="vf-corner vf-tr" />
              <div className="vf-corner vf-bl" />
              <div className="vf-corner vf-br" />
            </div>

            {/* Navigation and Caption */}
            <div className="pm-camera-bottom-bar">
              <button id="pm-prev-btn" className="pm-nav-btn" onClick={prev} aria-label="Previous photo">
                ‹
              </button>
              <p className="pm-caption">{current.caption}</p>
              <button id="pm-next-btn" className="pm-nav-btn" onClick={next} aria-label="Next photo">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="pm-thumbnails">
          {PHOTO_GALLERY.map((photo, i) => (
            <button
              key={i}
              id={`pm-thumb-${i}`}
              className={`pm-thumb ${i === currentIdx ? 'pm-thumb--active' : ''}`}
              onClick={() => changePhoto(i)}
              title={photo.caption}
              aria-label={`Photo ${i + 1}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = `📸 ${i + 1}`;
                }}
              />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pm-footer-action">
          <button id="pm-bottom-back-btn" className="pm-bottom-back-btn" onClick={onBack}>
            ← Back to Gifts
          </button>
          <button id="pm-heart-btn" className="pm-heart-burst-btn" onClick={spawnHearts}>
            ✨ Hype Nida!
          </button>
        </div>
      </div>
    </div>
  );
}
