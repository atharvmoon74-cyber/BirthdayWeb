import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { PROS, CONS } from '../utils/data';

export default function ProsAndCons() {
  const { ref, inView } = useInView();

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
          marginBottom: '48px',
        }}
      >
        Pros & Cons
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        maxWidth: '700px',
        width: '100%',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem', color: '#34d399',
            textAlign: 'center', marginBottom: '20px',
          }}>
            Pros
          </h3>
          {PROS.map((pro, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(52,211,153,0.2)' }}
              style={{
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 18px',
                marginBottom: '10px',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
              }}
            >
              {pro}
            </motion.div>
          ))}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem', color: 'var(--pink)',
            textAlign: 'center', marginBottom: '20px',
          }}>
            Cons
          </h3>
          {CONS.map((con, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03, boxShadow: 'var(--glow-pink)' }}
              style={{
                background: 'rgba(255,154,203,0.08)',
                border: '1px solid rgba(255,154,203,0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 18px',
                marginBottom: '10px',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
              }}
            >
              {con}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
