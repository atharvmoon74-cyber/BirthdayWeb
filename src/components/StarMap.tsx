import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { STAR_MEMORIES } from '../utils/data';

export default function StarMap() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Our Star Map
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Click a star to reveal a memory
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.08) 0%, transparent 70%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255,255,255,0.04)',
          overflow: 'hidden',
        }}
      >
        {STAR_MEMORIES.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
            onClick={() => setActive(i)}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: active === i ? '16px' : '8px',
              height: active === i ? '16px' : '8px',
              borderRadius: '50%',
              background: active === i ? 'var(--pink)' : '#fff',
              boxShadow: active === i ? '0 0 25px var(--pink)' : '0 0 10px rgba(255,255,255,0.4)',
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
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius)',
              padding: '20px 28px',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 300 }}>
              {STAR_MEMORIES[active].memory}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
