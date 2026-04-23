import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { THANK_YOU_MESSAGE } from '../utils/data';

export default function ThankYou() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      background: 'radial-gradient(ellipse at center, rgba(255,154,203,0.08) 0%, transparent 60%)',
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
        Thank You
      </motion.h2>

      <div style={{
        maxWidth: '600px', width: '100%',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,154,203,0.2)',
        borderRadius: 'var(--radius)',
        padding: '40px 32px',
        textAlign: 'center',
      }}>
        {THANK_YOU_MESSAGE.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 * i, duration: 0.6 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              lineHeight: 1.8,
              marginBottom: i < THANK_YOU_MESSAGE.length - 1 ? '16px' : '0',
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
