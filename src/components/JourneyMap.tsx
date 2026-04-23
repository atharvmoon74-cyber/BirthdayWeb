import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { JOURNEY_PLACES } from '../utils/data';

export default function JourneyMap() {
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
        Our Journey Map
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}
      >
        Places that shaped our story
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(255,154,203,0.05), rgba(167,139,250,0.05))',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
          {JOURNEY_PLACES.map((place, i) => {
            const next = JOURNEY_PLACES[i + 1];
            return next ? (
              <line
                key={`line-${i}`}
                x1={place.x} y1={place.y}
                x2={next.x} y2={next.y}
                stroke="rgba(255,154,203,0.2)"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
            ) : null;
          })}
        </svg>

        {JOURNEY_PLACES.map((place, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 * i, type: 'spring' }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              position: 'absolute',
              left: `${place.x}%`,
              top: `${place.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: active === i ? '20px' : '14px',
              height: active === i ? '20px' : '14px',
              borderRadius: '50%',
              background: active === i ? 'var(--pink)' : 'var(--purple)',
              boxShadow: active === i ? '0 0 20px var(--pink)' : '0 0 10px var(--purple)',
              transition: 'all 0.3s',
            }} />
            <span style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}>
              {place.name}
            </span>
          </motion.div>
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
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--pink)', fontSize: '1.2rem',
              marginBottom: '8px',
            }}>
              {JOURNEY_PLACES[active].name}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {JOURNEY_PLACES[active].memory}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
