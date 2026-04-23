import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3'
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      onClick={toggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
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
  );
}
