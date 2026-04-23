import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { OPEN_WHEN_LETTERS } from '../utils/data';

export default function OpenWhenLetters() {
  const { ref, inView } = useInView();
  const [opened, setOpened] = useState<number | null>(null);

  return (
    <section ref={ref} style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontFamily: 'var(--font-heading)',
          color: 'var(--pink)',
          textShadow: 'var(--glow-pink)',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        Open When Letters
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Each letter is for a different moment
      </motion.p>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '12px',
        justifyContent: 'center', maxWidth: '600px',
      }}>
        {OPEN_WHEN_LETTERS.map((letter, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.05, boxShadow: 'var(--glow-pink)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(i)}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, rgba(255,154,203,0.15), rgba(167,139,250,0.15))',
              border: '1px solid rgba(255,154,203,0.3)',
              color: 'var(--pink)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {letter.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {opened !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '500px', width: '100%',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(255,154,203,0.2)',
                padding: '40px 32px',
                textAlign: 'center',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem', color: 'var(--pink)',
                marginBottom: '20px',
              }}>
                {OPEN_WHEN_LETTERS[opened].label}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8, fontSize: '1rem',
              }}>
                {OPEN_WHEN_LETTERS[opened].message}
              </p>
              <button
                onClick={() => setOpened(null)}
                style={{
                  marginTop: '24px', padding: '10px 28px',
                  borderRadius: '50px', background: 'var(--pink)',
                  color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
