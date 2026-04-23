import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { ART_PIECES } from '../utils/data';

export default function CreativeArt() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(255,154,203,0.04) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Art of Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Visual stories of our friendship
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        maxWidth: '750px',
        width: '100%',
      }}>
        {ART_PIECES.map((art, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * i, duration: 0.7 }}
            whileHover={{ scale: 1.06, y: -6, boxShadow: '0 0 40px rgba(255,154,203,0.15)' }}
            style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{
              height: '140px',
              background: art.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '50px', height: '50px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: '16px', height: '16px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                }}
              />
            </div>
            <div style={{
              padding: '16px',
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(20px)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--pink)', fontSize: '1.15rem',
                marginBottom: '6px',
                textShadow: 'var(--glow-pink)',
              }}>
                {art.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem', lineHeight: 1.5, fontWeight: 300,
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
