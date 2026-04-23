import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { THOUGHT_BUBBLES } from '../utils/data';

export default function EmotionalDepth() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState(0);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 5000);
    const t3 = setTimeout(() => setPhase(3), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  useEffect(() => {
    if (phase !== 3) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'linear-gradient(180deg, #050310 0%, #080510 50%, #050310 100%)',
    }}>
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}
            >
              What if we never met?
            </motion.h2>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="bubbles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', maxWidth: '500px' }}
          >
            {THOUGHT_BUBBLES.map((thought, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 * i, duration: 0.8 }}
                style={{
                  color: i === THOUGHT_BUBBLES.length - 1 ? 'var(--pink)' : 'var(--text-muted)',
                  fontSize: '1.05rem',
                  marginBottom: '20px',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  textShadow: i === THOUGHT_BUBBLES.length - 1 ? 'var(--glow-pink)' : 'none',
                }}
              >
                {thought}
              </motion.p>
            ))}
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            key="realization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', maxWidth: '500px' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                fontFamily: 'var(--font-heading)',
                color: 'var(--pink)',
                textShadow: '0 0 30px rgba(255,154,203,0.5)',
                marginBottom: '40px',
              }}
            >
              But we did. And everything changed.
            </motion.p>

            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                }}
              >
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  marginBottom: '16px',
                }}>
                  If I had 1 minute to tell you everything
                </p>
                <motion.div
                  key={countdown}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: countdown <= 10 ? '#ef4444' : 'var(--purple)',
                    textShadow: countdown <= 10 ? '0 0 20px rgba(239,68,68,0.5)' : 'var(--glow-purple)',
                    marginBottom: '16px',
                  }}
                >
                  {countdown}
                </motion.div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  {countdown > 0
                    ? 'Every second with you matters. Every conversation, every shared photo, every late-night talk. You make my life better just by being in it.'
                    : 'Time is up. But my gratitude for you never will be.'}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
