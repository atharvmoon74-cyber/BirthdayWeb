import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInView } from '../hooks/useAnimations';
import { FRIEND_NAME } from '../utils/data';
import { useMusic } from "./MusicPlayer";

const LINES = [
  'Out of all the random moments in life...',
  'Through every message, every photo, every conversation...',
  'Through Banaras and IIT Tirupati...',
  'I am really glad I found you.',
];

export default function GrandFinale() {
  const { ref, inView } = useInView();

  const [phase, setPhase] = useState<'pause' | 'lines' | 'final'>('pause');
  const [visibleLines, setVisibleLines] = useState(0);
  const [celebrated, setCelebrated] = useState(false);

  // ✅ SAFE music usage (no crash)
  const music = useMusic();

useEffect(() => {
  music.playMusic();
}, [music]);

  // ⏳ Start sequence
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPhase('lines'), 2000);
    return () => clearTimeout(t);
  }, [inView]);

  // ✨ Show lines one by one
  useEffect(() => {
    if (phase !== 'lines') return;

    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < LINES.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [phase]);

  // 🎯 Move to final
  useEffect(() => {
    if (visibleLines === LINES.length && phase === 'lines') {
      const t = setTimeout(() => setPhase('final'), 1500);
      return () => clearTimeout(t);
    }
  }, [visibleLines, phase]);

  // 🎆 Confetti system (optimized)
  useEffect(() => {
    if (phase !== 'final' || celebrated) return;

    setCelebrated(true);

    const shoot = (options: any) => confetti(options);

    const duration = 6000;
    const end = Date.now() + duration;

    const frame = () => {
      shoot({
        particleCount: 5,
        angle: 60 + Math.random() * 60,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#ff9acb', '#a78bfa', '#ffc4e0', '#fbbf24'],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();

    // second wave
    setTimeout(() => {
      shoot({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.6 },
      });
    }, 2000);

  }, [phase, celebrated]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        background: '#050310',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MemoryParticles />

      {/* Black intro */}
      <AnimatePresence>
        {phase === 'pause' && (
          <motion.div
            key="pause"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#050310',
              zIndex: 20,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ textAlign: 'center', maxWidth: '600px', zIndex: 10 }}>
        
        {(phase === 'lines' || phase === 'final') &&
          LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={i < visibleLines ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
              }}
            >
              {line}
            </motion.p>
          ))}

        <AnimatePresence>
          {phase === 'final' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1
                style={{
                  fontSize: '3rem',
                  color: 'var(--pink)',
                  marginBottom: '30px',
                }}
              >
                Happy Birthday {FRIEND_NAME} 🎉
              </h1>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  padding: '12px 30px',
                  borderRadius: '50px',
                  background: 'var(--pink)',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Replay
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ✨ Floating particles
function MemoryParticles() {
  const particles = Array.from({ length: 20 });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            background: 'var(--pink)',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
}