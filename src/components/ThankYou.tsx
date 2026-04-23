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
      background: 'radial-gradient(ellipse at center, rgba(255,154,203,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Thank You
      </motion.h2>

      <div style={{
        maxWidth: '560px', width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,154,203,0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '44px 36px',
        textAlign: 'center',
      }}>
        {THANK_YOU_MESSAGE.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 * i, duration: 0.7 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              lineHeight: 1.8,
              marginBottom: i < THANK_YOU_MESSAGE.length - 1 ? '16px' : '0',
              fontWeight: 300,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
