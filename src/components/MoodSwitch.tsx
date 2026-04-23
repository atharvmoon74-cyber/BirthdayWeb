import { motion } from 'framer-motion';
import { useMood, useInView } from '../hooks/useAnimations';

export default function MoodSwitch() {
  const { ref, inView } = useInView();
  const { mood, toggle } = useMood();

  return (
    <section ref={ref} style={{
      minHeight: '50vh', display: 'flex', flexDirection: 'column',
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
        Mood Switch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}
      >
        How are you feeling right now?
      </motion.p>

      <div style={{ display: 'flex', gap: '16px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          style={{
            padding: '16px 32px',
            borderRadius: '50px',
            background: mood === 'romantic'
              ? 'linear-gradient(135deg, var(--pink), var(--purple))'
              : 'var(--bg-glass)',
            border: mood === 'romantic'
              ? '1px solid rgba(255,154,203,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: mood === 'romantic' ? 'var(--glow-pink)' : 'none',
          }}
        >
          Romantic Mode
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          style={{
            padding: '16px 32px',
            borderRadius: '50px',
            background: mood === 'funny'
              ? 'linear-gradient(135deg, #fbbf24, #34d399)'
              : 'var(--bg-glass)',
            border: mood === 'funny'
              ? '1px solid rgba(251,191,36,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: mood === 'funny' ? '0 0 20px rgba(251,191,36,0.4)' : 'none',
          }}
        >
          Funny Mode
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '24px',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          textAlign: 'center',
        }}
      >
        {mood === 'romantic'
          ? 'Soft pinks and purples to warm your heart'
          : 'Sunny vibes and good times only!'}
      </motion.p>
    </section>
  );
}
