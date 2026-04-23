import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

export default function FakeError() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (inView && phase === 0) {
      const t1 = setTimeout(() => setPhase(1), 2000);
      const t2 = setTimeout(() => setPhase(2), 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [inView, phase]);

  return (
    <section ref={ref} style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
    }}>
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius)',
              padding: '48px 40px',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            <p style={{
              fontSize: '3rem', fontWeight: 700,
              color: '#ef4444', marginBottom: '8px',
            }}>
              Error 404
            </p>
            <p style={{
              fontSize: '1.2rem', color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}>
              Too much cuteness detected
            </p>
            <div style={{
              width: '100%', height: '4px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              marginTop: '16px',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--pink), var(--purple))',
                  borderRadius: '2px',
                }}
              />
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ color: 'var(--purple)', fontSize: '1.1rem' }}
            >
              Recalibrating cuteness levels...
            </motion.p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,154,203,0.3)',
              borderRadius: 'var(--radius)',
              padding: '40px 32px',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            <p style={{
              fontSize: '1.5rem', fontFamily: 'var(--font-heading)',
              color: 'var(--pink)', marginBottom: '12px',
            }}>
              Cuteness overload resolved!
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Just kidding! Your cuteness is off the charts and there is no fix for that. And honestly? I would not have it any other way.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
