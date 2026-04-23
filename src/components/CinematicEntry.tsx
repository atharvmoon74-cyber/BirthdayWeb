import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEffect } from '../hooks/useAnimations';
import { FRIEND_NAME } from '../utils/data';

interface Props {
  onBegin: () => void;
}

export default function CinematicEntry({ onBegin }: Props) {
  const [phase, setPhase] = useState(0);
  const line1 = useTypingEffect('In a world full of ordinary people...', 60);
  const line2 = useTypingEffect('There was someone extraordinary...', 60, 2500);
  const nameTyping = useTypingEffect(FRIEND_NAME, 100, 5500);

  useEffect(() => {
    if (line1.done) setPhase(1);
    if (line2.done) setPhase(2);
    if (nameTyping.done) setPhase(3);
  }, [line1.done, line2.done, nameTyping.done]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#0f0a1a', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <Stars />
      <div style={{ textAlign: 'center', zIndex: 1, padding: '0 24px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-body)',
            minHeight: '2em',
            marginBottom: '16px',
          }}
        >
          {line1.displayed}
          {line1.done && !line1.displayed.endsWith('.') && <span className="cursor">|</span>}
        </motion.p>

        {phase >= 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              minHeight: '2em',
              marginBottom: '32px',
            }}
          >
            {line2.displayed}
          </motion.p>
        )}

        {phase >= 2 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontFamily: 'var(--font-heading)',
              color: 'var(--pink)',
              textShadow: '0 0 40px rgba(255,154,203,0.6), 0 0 80px rgba(255,154,203,0.3)',
              marginBottom: '48px',
            }}
          >
            {nameTyping.displayed}
          </motion.h1>
        )}

        <AnimatePresence>
          {phase >= 3 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,154,203,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBegin}
              style={{
                padding: '16px 40px',
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                color: '#fff',
                borderRadius: '50px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 0 20px rgba(255,154,203,0.3)',
              }}
            >
              Tap to Begin
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {stars.map(s => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.2, 1, 0.2] }}
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
