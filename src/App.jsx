import { useState, useRef, useEffect } from 'react';
import OpeningScreen    from './components/OpeningScreen.jsx';
import QuestionScreen   from './components/QuestionScreen.jsx';
import BirthdayScreen   from './components/BirthdayScreen.jsx';
import CandleScreen     from './components/CandleScreen.jsx';
import LetterScreen     from './components/LetterScreen.jsx';
import GiftSelection    from './components/GiftSelection.jsx';
import PhotoMemories    from './components/PhotoMemories.jsx';
import HangoutMemories  from './components/HangoutMemories.jsx';
import LoveLetter       from './components/LoveLetter.jsx';
import { MUSIC_SRC }    from './config.js';

// Navigation state machine — NO passcode/unlock screen
const SCREENS = {
  opening:        'opening',
  question:       'question',
  birthday:       'birthday',
  candle:         'candle',
  letter:         'letter',
  gifts:          'gifts',
  photoMemories:  'photoMemories',
  hangoutMemories:'hangoutMemories',
  loveLetter:     'loveLetter',
};

// Precise Back Button Hierarchy
const PREV_SCREEN = {
  [SCREENS.question]:        SCREENS.opening,
  [SCREENS.birthday]:        SCREENS.question,
  [SCREENS.candle]:          SCREENS.birthday,
  [SCREENS.letter]:          SCREENS.candle,
  [SCREENS.gifts]:           SCREENS.letter,
  [SCREENS.photoMemories]:   SCREENS.gifts,
  [SCREENS.hangoutMemories]: SCREENS.gifts,
  [SCREENS.loveLetter]:      SCREENS.gifts,
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.opening);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const audioRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4500);
  };

  // Safe audio play that handles browser autoplay restrictions
  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsBlocked(false);
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            setIsBlocked(true);
          } else {
            setIsPlaying(false);
          }
        });
    }
  };

  // Toggle play/pause without restarting or resetting position
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBlocked(false);
          })
          .catch((err) => {
            if (err.name === 'NotAllowedError') {
              setIsBlocked(true);
            } else {
              showToast('🎵 Please place music file in public/music/ folder');
              setIsPlaying(false);
            }
          });
      }
    }
  };

  // Attempt autoplay immediately on mount, plus one-time user-interaction trigger
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const cleanupListeners = () => {
      ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((ev) =>
        window.removeEventListener(ev, onUserInteraction)
      );
    };

    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsBlocked(false);
            cleanupListeners();
          })
          .catch((err) => {
            if (err.name === 'NotAllowedError') {
              setIsBlocked(true);
            }
          });
      }
    };

    const onUserInteraction = () => {
      tryPlay();
    };

    // 1. Try immediate autoplay on page load
    tryPlay();

    // 2. Attach one-time global listeners so the very first touch/click anywhere on screen starts music immediately
    ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((ev) =>
      window.addEventListener(ev, onUserInteraction, { once: true, passive: true })
    );

    return () => {
      cleanupListeners();
    };
  }, []);

  const handleAudioError = () => {
    showToast('🎵 Place music file in public/music/ to play');
    setIsPlaying(false);
  };

  const go = (target) => {
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler returning to immediately preceding slide
  const handleBack = () => {
    const prev = PREV_SCREEN[screen];
    if (prev) {
      setScreen(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* Root-level persistent audio player for Chand Baaliyan */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        autoPlay
        playsInline
        loop
        preload="auto"
        onError={handleAudioError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Global Navigation Bar (Back Button + Music Control) */}
      <header className="global-nav-bar" role="banner">
        {screen !== SCREENS.opening ? (
          <button
            id="global-back-btn"
            className="global-back-btn"
            onClick={handleBack}
            aria-label="Go back to previous slide"
          >
            ← Back
          </button>
        ) : (
          <div aria-hidden="true" />
        )}

        <div className="global-music-container">
          <button
            id="global-music-btn"
            className={`global-music-btn ${isPlaying ? 'global-music-btn--playing' : ''}`}
            onClick={toggleMusic}
            title={isPlaying ? 'Pause music' : 'Play music'}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          >
            <span
              className={`music-disc-icon ${isPlaying ? 'music-disc-icon--rotating' : ''}`}
              aria-hidden="true"
            >
              🎵
            </span>
            <span className="global-music-badge" aria-hidden="true">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>
        </div>
      </header>

      {/* Music Toast Notification */}
      {toastMsg && (
        <div className="music-toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      )}

      {/* Slide Sequence with Navigation Preservation */}
      {screen === SCREENS.opening && (
        <OpeningScreen
          onNext={() => {
            startMusic();
            go(SCREENS.question);
          }}
        />
      )}
      {screen === SCREENS.question && (
        <QuestionScreen onNext={() => go(SCREENS.birthday)} />
      )}
      {screen === SCREENS.birthday && (
        <BirthdayScreen onNext={() => go(SCREENS.candle)} />
      )}
      {screen === SCREENS.candle && (
        <CandleScreen onNext={() => go(SCREENS.letter)} />
      )}
      {screen === SCREENS.letter && (
        <LetterScreen onNext={() => go(SCREENS.gifts)} />
      )}
      {screen === SCREENS.gifts && (
        <GiftSelection onGift={(n) => go(SCREENS[n])} />
      )}
      {screen === SCREENS.photoMemories && (
        <PhotoMemories onBack={handleBack} />
      )}
      {screen === SCREENS.hangoutMemories && (
        <HangoutMemories onBack={handleBack} />
      )}
      {screen === SCREENS.loveLetter && (
        <LoveLetter onBack={handleBack} />
      )}
    </div>
  );
}
