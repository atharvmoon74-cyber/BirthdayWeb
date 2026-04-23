import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LYRIC_CAPTIONS } from '../utils/data';

type MusicPhase = 'intro' | 'warm' | 'emotional' | 'finale';

interface MusicContextType {
  playing: boolean;
  phase: MusicPhase;
  volume: number;
  toggle: () => void;
  setPhase: (p: MusicPhase) => void;
  fadeOut: () => void;
}

export const MusicContext = createContext<MusicContextType>({
  playing: false,
  phase: 'intro',
  volume: 0.3,
  toggle: () => {},
  setPhase: () => {},
  fadeOut: () => {},
});

export function useMusic() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhaseState] = useState<MusicPhase>('intro');
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(
      'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3'
    );
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const targetVolume = phase === 'finale' ? 0.1 : phase === 'emotional' ? 0.2 : phase === 'warm' ? 0.35 : 0.3;
    setVolume(targetVolume);
    if (playing) {
      audioRef.current.volume = targetVolume;
    }
  }, [phase, playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const setPhase = (p: MusicPhase) => {
    setPhaseState(p);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    let vol = audioRef.current.volume;
    fadeIntervalRef.current = window.setInterval(() => {
      vol -= 0.01;
      if (vol <= 0) {
        vol = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audioRef.current?.pause();
        setPlaying(false);
      }
      if (audioRef.current) audioRef.current.volume = Math.max(0, vol);
    }, 100);
  };

  return (
    <MusicContext.Provider value={{ playing, phase, volume, toggle, setPhase, fadeOut }}>
      {children}
    </MusicContext.Provider>
  );
}

export default function MusicPlayer() {
  const { playing, toggle, volume } = useMusic();
  const [showVol, setShowVol] = useState(false);

  return (
    <>
      {/* Floating lyric captions */}
      <LyricCaptions />

      {/* Player controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onMouseEnter={() => setShowVol(true)}
        onMouseLeave={() => setShowVol(false)}
      >
        <AnimatePresence>
          {showVol && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '80px' }}
              exit={{ opacity: 0, width: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => {
                  const v = parseFloat(e.target.value);
                  const audio = document.querySelector('audio');
                  if (audio) audio.volume = v;
                }}
                style={{
                  width: '80px',
                  accentColor: 'var(--pink)',
                  cursor: 'pointer',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--pink)',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: playing ? 'var(--glow-pink)' : 'none',
            transition: 'box-shadow 0.3s',
          }}
          title={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? '||' : '>'}
        </motion.button>
      </motion.div>
    </>
  );
}

function LyricCaptions() {
  const { playing } = useMusic();
  const [currentLyric, setCurrentLyric] = useState('');
  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      startTimeRef.current = null;
      setVisible(false);
      return;
    }
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const interval = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;

      for (const caption of LYRIC_CAPTIONS) {
        if (elapsed >= caption.delay && elapsed < caption.delay + 4000) {
          if (currentLyric !== caption.text) {
            setCurrentLyric(caption.text);
            setVisible(true);
            setTimeout(() => setVisible(false), 3500);
          }
          break;
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [playing, currentLyric]);

  return (
    <AnimatePresence>
      {visible && playing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            background: 'rgba(8,5,16,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50px',
            padding: '10px 28px',
            maxWidth: '90vw',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            fontWeight: 300,
            letterSpacing: '0.5px',
          }}>
            {currentLyric}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
