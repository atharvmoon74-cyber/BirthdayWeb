import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { SPECIAL_REASONS } from '../utils/data';

export default function WhySpecial() {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState<number | null>(null);

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
        Why You Are Special
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Tap each card to discover more
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        maxWidth: '800px',
        width: '100%',
      }}>
        {SPECIAL_REASONS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${expanded === i ? 'rgba(255,154,203,0.3)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 'var(--radius)',
              padding: '24px',
              cursor: 'pointer',
              transition: 'border-color 0.3s',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem', color: 'var(--pink)',
              marginBottom: '8px',
            }}>
              {item.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {item.short}
            </p>
            <AnimatePresence>
              {expanded === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.long}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
