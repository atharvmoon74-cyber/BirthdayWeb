import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { SECRET_ANSWER } from '../utils/data';

export default function SecretPassword() {
  const { ref, inView } = useInView();
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === SECRET_ANSWER) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section ref={ref} style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
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
        Secret Section
      </motion.h2>

      {!unlocked ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{
            maxWidth: '400px', width: '100%',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            What is my favorite color?
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
            (Hint: It is the color of the sky on a clear day)
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your answer..."
              style={{
                flex: 1, padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              style={{
                padding: '12px 20px',
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
                style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.9rem' }}
              >
                Not quite! Try again...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            maxWidth: '500px', width: '100%',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,154,203,0.3)',
            borderRadius: 'var(--radius)',
            padding: '40px 32px',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '1.5rem', fontFamily: 'var(--font-heading)',
            color: 'var(--pink)', marginBottom: '16px',
          }}>
            You unlocked the secret!
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            There is something I have always wanted to tell you: You are the most incredible person I have ever met. Not because you are perfect, but because you are perfectly you. And that is more than enough. Always has been, always will be.
          </p>
        </motion.div>
      )}
    </section>
  );
}
