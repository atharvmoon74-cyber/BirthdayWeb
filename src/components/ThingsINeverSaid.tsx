import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { THINGS_I_NEVER_SAID } from '../utils/data';

export default function ThingsINeverSaid() {
  const { ref, inView } = useInView();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisible(prev => {
        if (prev < THINGS_I_NEVER_SAID.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      background: 'radial-gradient(ellipse at bottom, rgba(167,139,250,0.1) 0%, transparent 60%)',
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
          marginBottom: '48px',
        }}
      >
        Things I Never Said
      </motion.h2>

      <div style={{ maxWidth: '600px', width: '100%' }}>
        {THINGS_I_NEVER_SAID.map((line, i) => (
          <AnimatePresence key={i}>
            {i < visible && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontStyle: 'italic',
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
