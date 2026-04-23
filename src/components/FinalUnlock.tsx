import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { SECRET_ANSWER } from '../utils/data';

export default function FinalUnlock() {
  const { ref, inView } = useInView();
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [lightTransition, setLightTransition] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === SECRET_ANSWER) {
      setLightTransition(true);
      setTimeout(() => {
        setUnlocked(true);
        setLightTransition(false);
      }, 1500);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section ref={ref} className="chapter" style={{
      background: 'var(--bg-dark)',
      position: 'relative',
    }}>
      {lightTransition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), rgba(255,154,203,0.4), transparent)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Final Unlock
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        One last thing before the finale
      </motion.p>

      {!unlocked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{
            maxWidth: '400px', width: '100%',
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 300 }}>
            Where did we first meet?
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>
            (Hint: The app where it all started)
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your answer..."
              style={{
                flex: 1, padding: '14px 18px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.3s',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              style={{
                padding: '14px 22px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--purple)',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              Go
            </motion.button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.85rem' }}
              >
                Not quite! Try again...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 60 }}
          style={{
            maxWidth: '500px', width: '100%',
            background: 'var(--bg-glass-strong)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,154,203,0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '44px 36px',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '1.8rem', fontFamily: 'var(--font-heading)',
            color: 'var(--pink)', marginBottom: '16px',
            textShadow: '0 0 30px rgba(255,154,203,0.5)',
          }}>
            Unlocked!
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
            You unlocked the final message. There is something I have always wanted to tell you: You are the most incredible person I have ever met. Not because you are perfect, but because you are perfectly you. And that is more than enough. Always has been, always will be.
          </p>
        </motion.div>
      )}
    </section>
  );
}
