import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { PROS, CONS, SPECIAL_REASONS } from '../utils/data';

export default function WhoSheIs() {
  const { ref, inView } = useInView();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 30%, rgba(167,139,250,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Who You Are
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        The real you, through my eyes
      </motion.p>

      {/* Pros & Cons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        maxWidth: '700px',
        width: '100%',
        marginBottom: '56px',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem', color: 'var(--emerald)',
            textAlign: 'center', marginBottom: '16px',
            textShadow: '0 0 20px rgba(52,211,153,0.3)',
          }}>
            What Makes You Amazing
          </h3>
          {PROS.map((pro, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.08 * i }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(52,211,153,0.15)' }}
              style={{
                background: 'rgba(52,211,153,0.06)',
                border: '1px solid rgba(52,211,153,0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 18px',
                marginBottom: '8px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              {pro}
            </motion.div>
          ))}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem', color: 'var(--pink)',
            textAlign: 'center', marginBottom: '16px',
            textShadow: 'var(--glow-pink)',
          }}>
            Cute Little Things
          </h3>
          {CONS.map((con, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.08 * i }}
              whileHover={{ scale: 1.02, boxShadow: 'var(--glow-pink)' }}
              style={{
                background: 'rgba(255,154,203,0.06)',
                border: '1px solid rgba(255,154,203,0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 18px',
                marginBottom: '8px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              {con}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Special */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.6rem',
          color: 'var(--purple)',
          textAlign: 'center',
          marginBottom: '24px',
          textShadow: 'var(--glow-purple)',
        }}
      >
        Why You Are Special
      </motion.h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px',
        maxWidth: '700px',
        width: '100%',
      }}>
        {SPECIAL_REASONS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            style={{
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(30px)',
              border: `1px solid ${expanded === i ? 'rgba(255,154,203,0.25)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 'var(--radius)',
              padding: '22px',
              cursor: 'pointer',
              transition: 'border-color 0.3s',
            }}
          >
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem', color: 'var(--pink)',
              marginBottom: '6px',
              textShadow: 'var(--glow-pink)',
            }}>
              {item.title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 300 }}>
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
                    fontSize: '0.85rem',
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    lineHeight: 1.7,
                    fontWeight: 300,
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
