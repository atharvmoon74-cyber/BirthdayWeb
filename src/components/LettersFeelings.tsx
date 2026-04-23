import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { OPEN_WHEN_LETTERS, THINGS_I_NEVER_SAID } from '../utils/data';

export default function LettersFeelings() {
  const { ref, inView } = useInView();
  const [opened, setOpened] = useState<number | null>(null);
  const [visibleThings, setVisibleThings] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleThings(prev => {
        if (prev < THINGS_I_NEVER_SAID.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(15,8,25,1) 50%, var(--bg-dark) 100%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Letters & Feelings
      </motion.h2>

      {/* Open When Letters */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Each letter is for a different moment
      </motion.p>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', maxWidth: '600px',
        marginBottom: '64px',
      }}>
        {OPEN_WHEN_LETTERS.map((letter, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(255,154,203,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(i)}
            style={{
              padding: '12px 22px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, rgba(255,154,203,0.1), rgba(167,139,250,0.1))',
              border: '1px solid rgba(255,154,203,0.2)',
              color: 'var(--pink)',
              fontSize: '0.85rem',
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
              background: 'rgba(8,5,16,0.92)',
              backdropFilter: 'blur(30px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '460px', width: '100%',
                background: 'var(--bg-glass-strong)',
                backdropFilter: 'blur(30px)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,154,203,0.15)',
                padding: '40px 32px',
                textAlign: 'center',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem', color: 'var(--pink)',
                marginBottom: '20px',
                textShadow: 'var(--glow-pink)',
              }}>
                {OPEN_WHEN_LETTERS[opened].label}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }}>
                {OPEN_WHEN_LETTERS[opened].message}
              </p>
              <button
                onClick={() => setOpened(null)}
                style={{
                  marginTop: '24px', padding: '10px 28px',
                  borderRadius: '50px', background: 'var(--pink)',
                  color: '#fff', fontWeight: 600, fontSize: '0.85rem',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Things I Never Said */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.8rem',
          color: 'var(--purple)',
          textAlign: 'center',
          marginBottom: '36px',
          textShadow: 'var(--glow-purple)',
        }}
      >
        Things I Never Said
      </motion.h3>

      <div style={{ maxWidth: '580px', width: '100%' }}>
        {THINGS_I_NEVER_SAID.map((line, i) => (
          <AnimatePresence key={i}>
            {i < visibleThings && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  fontWeight: 300,
                }}
              >
                "{line}"
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
}
