import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { STAR_MEMORIES } from '../utils/data';

export default function StarMap() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState<number | null>(null);

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
        Our Star Map
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}
      >
        Click a star to reveal a memory
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, transparent 70%)',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {STAR_MEMORIES.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
            onClick={() => setActive(i)}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: active === i ? '14px' : '8px',
              height: active === i ? '14px' : '8px',
              borderRadius: '50%',
              background: active === i ? 'var(--pink)' : '#fff',
              boxShadow: active === i ? '0 0 20px var(--pink)' : '0 0 8px rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '24px',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)',
              padding: '20px 28px',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              {STAR_MEMORIES[active].memory}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
