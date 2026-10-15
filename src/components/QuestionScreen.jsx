import { useState, useRef } from 'react';
import { READY_HEADING, READY_SUBTITLE, READY_YES_BTN, READY_NO_BTN, READY_DODGE_MSG } from '../config.js';
import './QuestionScreen.css';

// Pre-defined safe dodge offsets (relative translate) that keep the button inside visible container and away from YES button
const SAFE_DODGE_OFFSETS = [
  { x: 90,  y: -55 },
  { x: -90, y: -65 },
  { x: 100, y: 55 },
  { x: -85, y: 55 },
  { x: 0,   y: -75 },
  { x: 110, y: 0 },
  { x: -95, y: -20 },
  { x: 80,  y: -80 },
];

export default function QuestionScreen({ onNext }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [isDodged, setIsDodged] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [exiting, setExiting] = useState(false);
  const lastIndexRef = useRef(-1);

  const triggerDodge = (e) => {
    // Prevent default on touch to avoid triggering a tap event
    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }

    setDodgeCount((prev) => prev + 1);

    // Pick a new safe offset that is different from previous
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * SAFE_DODGE_OFFSETS.length);
    } while (nextIdx === lastIndexRef.current && SAFE_DODGE_OFFSETS.length > 1);

    lastIndexRef.current = nextIdx;
    const baseOffset = SAFE_DODGE_OFFSETS[nextIdx];

    // Add tiny random variation (+/- 6px) for natural organic feel
    const jitterX = Math.floor((Math.random() - 0.5) * 12);
    const jitterY = Math.floor((Math.random() - 0.5) * 12);

    setDodgeOffset({
      x: baseOffset.x + jitterX,
      y: baseOffset.y + jitterY,
    });
    setIsDodged(true);
  };

  const handleYes = () => {
    if (yesClicked) return;
    setYesClicked(true);
    setExiting(true);
    setTimeout(onNext, 500);
  };

  return (
    <div className={`question-screen ${exiting ? 'question-screen--exit' : ''}`}>
      {/* Floating background decorations */}
      <div className="q-bg-decorations" aria-hidden="true">
        {['💗', '🌸', '✨', '💕', '💖', '✨', '🌸', '💗', '💕', '✨'].map((item, i) => (
          <span
            key={i}
            className="q-float-item"
            style={{
              left: `${(i * 10 + 5) % 95}%`,
              top: `${(i * 11 + 8) % 90}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="question-card">
        {/* Adorable Cat peeking over card with pink blushing cheeks */}
        <div className="q-cat-peeker" aria-hidden="true">
          <div className="q-cat-ear q-cat-ear--left">
            <span className="q-ear-inner" />
          </div>
          <div className="q-cat-ear q-cat-ear--right">
            <span className="q-ear-inner" />
          </div>
          <div className="q-cat-head">
            <div className="q-cat-eyes">
              <span className="q-cat-eye"><span className="eye-shine" /></span>
              <span className="q-cat-eye"><span className="eye-shine" /></span>
            </div>
            <div className="q-cat-blush q-cat-blush--left" />
            <div className="q-cat-blush q-cat-blush--right" />
            <div className="q-cat-nose" />
            <div className="q-cat-mouth">ω</div>
            <div className="q-cat-whiskers left">
              <span /><span />
            </div>
            <div className="q-cat-whiskers right">
              <span /><span />
            </div>
          </div>
          {/* Cute little paws */}
          <div className="q-cat-paws">
            <div className="q-paw" />
            <div className="q-paw" />
          </div>
        </div>

        {/* Content Box */}
        <div className="question-content">
          <h1 className="question-heading">{READY_HEADING}</h1>
          <p className="question-subtext">{READY_SUBTITLE}</p>

          {/* Playful toast message when NO is dodged multiple times */}
          <div className={`dodge-message ${dodgeCount >= 3 ? 'dodge-message--visible' : ''}`}>
            <span>{READY_DODGE_MSG}</span>
          </div>

          {/* Interactive Buttons Container */}
          <div className="question-action-area">
            {/* Stationary YES Button */}
            <button
              id="btn-ready-yes"
              className={`btn-choice btn-yes ${yesClicked ? 'btn-yes--active' : ''}`}
              onClick={handleYes}
              aria-label="Yes, I am ready"
            >
              <span className="btn-choice-glow" />
              <span className="btn-choice-text">{READY_YES_BTN}</span>
            </button>

            {/* Playfully Dodging NO Button */}
            <div className="no-btn-wrapper">
              <button
                id="btn-ready-no"
                className={`btn-choice btn-no ${isDodged ? 'btn-no--dodged' : ''}`}
                onMouseEnter={triggerDodge}
                onTouchStart={triggerDodge}
                onPointerDown={(e) => {
                  if (e.pointerType === 'touch') {
                    triggerDodge(e);
                  }
                }}
                onClick={triggerDodge}
                style={{
                  transform: isDodged
                    ? `translate3d(${dodgeOffset.x}px, ${dodgeOffset.y}px, 0)`
                    : 'translate3d(0, 0, 0)',
                }}
                aria-label="No button playfully dodging"
              >
                <span className="btn-choice-text">{READY_NO_BTN}</span>
              </button>
            </div>
          </div>

          {dodgeCount > 0 && (
            <p className="attempts-hint">
              Nice try! Attempt {dodgeCount} 🤭
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
