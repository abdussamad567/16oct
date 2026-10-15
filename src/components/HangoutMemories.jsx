import { useState, useRef } from 'react';
import { HANGOUT_PHOTOS, HANGOUT_VIDEOS, HANGOUT_TITLE, HANGOUT_SUBTITLE } from '../config.js';
import './HangoutMemories.css';

export default function HangoutMemories({ onBack }) {
  const [lightbox, setLightbox] = useState(null); // { type: 'photo'|'video', src, caption }
  const videoRef = useRef(null);

  const openLightbox = (item) => setLightbox(item);
  const closeLightbox = () => {
    if (videoRef.current) videoRef.current.pause();
    setLightbox(null);
  };

  return (
    <div className="hangout-screen">
      {/* Floating pink background decorations */}
      <div className="hm-bg-decorations" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '⭐', '🌸', '💗', '✨'].map((emoji, i) => (
          <span
            key={i}
            className="hm-bg-heart"
            style={{
              left: `${7 + i * 12}%`,
              top: `${10 + (i % 3) * 26}%`,
              animationDelay: `${i * 0.45}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="hangout-card">
        {/* Sticky Header — Always Visible */}
        <div className="hm-header">
          <button id="hm-back-btn" className="hm-back-btn" onClick={onBack} aria-label="Back to gifts">
            ← Back to Gifts
          </button>
          <div className="hm-header-text">
            <h1 className="hm-title">{HANGOUT_TITLE}</h1>
            <p className="hm-subtitle">{HANGOUT_SUBTITLE}</p>
          </div>
        </div>

        <div className="hm-content">
          {/* Photo cards — scrapbook Polaroid style */}
          {HANGOUT_PHOTOS.length > 0 && (
            <section className="hm-section">
              <h2 className="hm-section-heading">📸 Hangout Moments</h2>
              <div className="hm-photo-grid">
                {HANGOUT_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    id={`hm-photo-${i}`}
                    className="hm-photo-card"
                    style={{
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (1 + (i % 3) * 0.7)}deg)`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                    onClick={() => openLightbox({ type: 'photo', src: photo.src, caption: photo.caption })}
                    title="Tap to enlarge"
                    aria-label={`Open photo: ${photo.caption}`}
                  >
                    {/* Cute pink washi tape sticker */}
                    <div className="hm-washi-tape" />

                    <div className="hm-photo-frame">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="hm-photo-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('hm-photo-frame--ph');
                        }}
                      />
                      <div className="hm-photo-placeholder">
                        📸 Add photo to<br /><code>/public/images/hangout{i + 1}.jpg</code>
                      </div>
                    </div>
                    <p className="hm-photo-caption">{photo.caption}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Video memories */}
          {HANGOUT_VIDEOS.length > 0 && (
            <section className="hm-section">
              <h2 className="hm-section-heading">🎥 Hangout Videos</h2>
              <div className="hm-video-grid">
                {HANGOUT_VIDEOS.map((video, i) => (
                  <div key={i} className="hm-video-card" style={{ animationDelay: `${i * 0.15}s` }}>
                    <div
                      className="hm-video-thumb-wrap"
                      onClick={() => openLightbox({ type: 'video', src: video.src, caption: video.caption })}
                      role="button"
                      tabIndex={0}
                      title="Tap to play video"
                      aria-label={`Play video: ${video.caption}`}
                    >
                      {video.poster ? (
                        <img
                          src={video.poster}
                          alt={video.caption}
                          className="hm-video-thumb"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="hm-video-thumb-placeholder">🎬</div>
                      )}
                      <div className="hm-play-overlay">
                        <div className="hm-play-btn">▶</div>
                      </div>
                    </div>
                    <p className="hm-video-caption">{video.caption}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Location pin decoration */}
          <div className="hm-location-deco">
            <span className="hm-pin">📍</span>
            <p className="hm-location-text">Iconic memories with the best friend 🍕✨</p>
          </div>

          {/* Bottom Back Button */}
          <div className="hm-footer-action">
            <button id="hm-bottom-back-btn" className="hm-bottom-back-btn" onClick={onBack}>
              ← Back to Gifts
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="hm-lightbox" onClick={closeLightbox}>
          <div className="hm-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              id="hm-close-btn"
              className="hm-close-btn"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              ✕
            </button>
            {lightbox.type === 'photo' ? (
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="hm-lightbox-photo"
                onError={(e) => { e.target.alt = 'Image not uploaded yet'; }}
              />
            ) : (
              <video
                ref={videoRef}
                src={lightbox.src}
                controls
                autoPlay
                className="hm-lightbox-video"
                preload="metadata"
              />
            )}
            {lightbox.caption && <p className="hm-lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
