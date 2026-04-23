import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { TIMELINE_EVENTS } from '../utils/data';

export default function Timeline() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
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
        Our Timeline
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Every chapter of our story
      </motion.p>

      <div style={{ position: 'relative', maxWidth: '700px', width: '100%' }}>
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: '2px', background: 'linear-gradient(to bottom, var(--pink), var(--purple))',
          transform: 'translateX(-50%)', opacity: 0.3,
        }} />

        {TIMELINE_EVENTS.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'center',
              marginBottom: '48px',
              gap: '24px',
            }}
          >
            <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
              <div style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius)',
                padding: '24px',
                display: 'inline-block',
                textAlign: 'left',
                maxWidth: '280px',
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--purple)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 600,
                }}>
                  {event.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  color: 'var(--pink)',
                  margin: '8px 0',
                }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {event.text}
                </p>
              </div>
            </div>

            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'var(--pink)',
              boxShadow: 'var(--glow-pink)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }} />

            <div style={{ flex: 1 }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
