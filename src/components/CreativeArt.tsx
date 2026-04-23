import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { ART_PIECES } from '../utils/data';

export default function CreativeArt() {
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
        Art of Us
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        maxWidth: '800px',
        width: '100%',
      }}>
        {ART_PIECES.map((art, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * i }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,154,203,0.2)' }}
            style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{
              height: '160px',
              background: art.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '60px', height: '60px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: '20px', height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                }}
              />
            </div>
            <div style={{
              padding: '16px',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--pink)', fontSize: '1.2rem',
                marginBottom: '6px',
              }}>
                {art.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.85rem', lineHeight: 1.5,
              }}>
                {art.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
