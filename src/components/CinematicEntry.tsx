import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEffect } from '../hooks/useAnimations';
import { FRIEND_NAME } from '../utils/data';

interface Props {
  onBegin: () => void;
}

export default function CinematicEntry({ onBegin }: Props) {
  const [phase, setPhase] = useState(0);
  const [lightBurst, setLightBurst] = useState(false);
  const line1 = useTypingEffect('In a world full of ordinary people...', 55);
  const line2 = useTypingEffect('There was someone extraordinary...', 55, 2800);
  const nameTyping = useTypingEffect(FRIEND_NAME, 120, 5800);

  useEffect(() => {
    if (line1.done) setPhase(1);
    if (line2.done) setPhase(2);
    if (nameTyping.done) {
      setPhase(3);
      setTimeout(() => setLightBurst(true), 300);
    }
  }, [line1.done, line2.done, nameTyping.done]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#080510', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <Stars />
      <LightRays />
      {lightBurst && <LightBurst />}

      <div style={{ textAlign: 'center', zIndex: 10, padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            minHeight: '2em',
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}
        >
          {line1.displayed}
          {line1.done && !line1.displayed.endsWith('.') && <span style={{ animation: 'breathe 1s infinite' }}>|</span>}
        </motion.p>

        {phase >= 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              minHeight: '2em',
              marginBottom: '40px',
              letterSpacing: '0.5px',
            }}
          >
            {line2.displayed}
          </motion.p>
        )}

        {phase >= 2 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: 1,
              scale: lightBurst ? 1 : 0.8,
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 7rem)',
              fontFamily: 'var(--font-heading)',
              color: 'var(--pink)',
              textShadow: lightBurst
                ? '0 0 60px rgba(255,154,203,0.8), 0 0 120px rgba(255,154,203,0.4), 0 0 200px rgba(255,154,203,0.2)'
                : '0 0 40px rgba(255,154,203,0.5), 0 0 80px rgba(255,154,203,0.2)',
              marginBottom: '56px',
              transition: 'text-shadow 1s',
            }}
          >
            {nameTyping.displayed}
          </motion.h1>
        )}

        <AnimatePresence>
          {phase >= 3 && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 40px rgba(255,154,203,0.6), 0 0 80px rgba(255,154,203,0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onBegin}
              style={{
                padding: '18px 48px',
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 600,
                letterSpacing: '1px',
                boxShadow: '0 0 30px rgba(255,154,203,0.3)',
                animation: 'pulse-glow 3s infinite',
              }}
            >
              Begin the Story
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {stars.map(s => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
          }}
        />
      ))}
    </div>
  );
}

function LightRays() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 60%)',
      pointerEvents: 'none',
    }} />
  );
}

function LightBurst() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.8, 0], scale: [0.5, 3, 5] }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,154,203,0.4) 0%, rgba(167,139,250,0.2) 40%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />
  );
}
