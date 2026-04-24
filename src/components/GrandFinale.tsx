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

  // Black screen pause then start lines
  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase('lines'), 2000);
    return () => clearTimeout(t1);
  }, [inView]);
const { playMusic } = useMusic();

useEffect(() => {
  playMusic();
}, []);
  // Reveal lines one by one
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

  // Show final after all lines
  useEffect(() => {
    if (visibleLines === LINES.length && phase === 'lines') {
      const timeout = setTimeout(() => {
        setPhase('final');
        fadeOut();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, phase]);

  // Fireworks on final
  useEffect(() => {
    if (phase === 'final' && !celebrated) {
      setCelebrated(true);

      const duration = 6000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60 + Math.random() * 60,
          spread: 55 + Math.random() * 20,
          origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.3 + 0.2 },
          colors: ['#ff9acb', '#a78bfa', '#ffc4e0', '#fbbf24', '#34d399'],
          gravity: 0.8,
          scalar: 1.2,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      // Second wave
      setTimeout(() => {
        const end2 = Date.now() + 4000;
        const frame2 = () => {
          confetti({
            particleCount: 3,
            startVelocity: 35,
            angle: 50 + Math.random() * 80,
            spread: 40,
            origin: { x: Math.random(), y: 0.6 },
            colors: ['#ff9acb', '#a78bfa', '#fbbf24'],
          });
          if (Date.now() < end2) requestAnimationFrame(frame2);
        };
        frame2();
      }, 2000);

      // Third wave - name fireworks
      setTimeout(() => {
        const end3 = Date.now() + 3000;
        const frame3 = () => {
          confetti({
            particleCount: 6,
            startVelocity: 25,
            spread: 360,
            origin: { x: 0.5, y: 0.4 },
            colors: ['#ff9acb', '#ffc4e0', '#a78bfa'],
            gravity: 0.5,
            scalar: 1.5,
          });
          if (Date.now() < end3) requestAnimationFrame(frame3);
        };
        frame3();
      }, 3500);
    }
  }, [phase, celebrated]);

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px',
      background: '#050310',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <MemoryParticles />

      <AnimatePresence mode="wait">
        {phase === 'pause' && (
          <motion.div
            key="pause"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: '#050310',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ textAlign: 'center', maxWidth: '600px', position: 'relative', zIndex: 10 }}>
        {(phase === 'lines' || phase === 'final') && LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={i < visibleLines ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              marginBottom: '28px',
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            {line}
          </motion.p>
        ))}

        <AnimatePresence>
          {phase === 'final' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            >
              <motion.h1
                animate={{
                  textShadow: [
                    '0 0 40px rgba(255,154,203,0.5), 0 0 80px rgba(255,154,203,0.2)',
                    '0 0 60px rgba(255,154,203,0.8), 0 0 120px rgba(255,154,203,0.4), 0 0 200px rgba(255,154,203,0.2)',
                    '0 0 40px rgba(255,154,203,0.5), 0 0 80px rgba(255,154,203,0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--pink)',
                  marginBottom: '40px',
                }}
              >
                Happy Birthday {FRIEND_NAME}!
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,154,203,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  padding: '14px 36px',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Replay Our Story
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MemoryParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 8 + 10,
    size: Math.random() * 4 + 2,
    isGold: Math.random() > 0.7,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: ['-5vh', '105vh'],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: p.isGold ? '50%' : '50% 0 50% 0',
            background: p.isGold ? 'var(--gold)' : 'var(--pink)',
            boxShadow: p.isGold ? '0 0 6px var(--gold)' : '0 0 6px var(--pink)',
          }}
        />
      ))}
    </div>
  );
}
