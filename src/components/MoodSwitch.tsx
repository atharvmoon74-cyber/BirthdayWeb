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
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Mood Switch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        How are you feeling right now?
      </motion.p>

      <div style={{ display: 'flex', gap: '16px' }}>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => mood === 'funny' && toggle()}
          style={{
            padding: '16px 36px',
            borderRadius: '50px',
            background: mood === 'romantic'
              ? 'linear-gradient(135deg, var(--pink), var(--purple))'
              : 'var(--bg-glass)',
            border: `1px solid ${mood === 'romantic' ? 'rgba(255,154,203,0.4)' : 'rgba(255,255,255,0.06)'}`,
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: mood === 'romantic' ? 'var(--glow-pink)' : 'none',
          }}
        >
          Romantic Mode
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => mood === 'romantic' && toggle()}
          style={{
            padding: '16px 36px',
            borderRadius: '50px',
            background: mood === 'funny'
              ? 'linear-gradient(135deg, #fbbf24, #34d399)'
              : 'var(--bg-glass)',
            border: `1px solid ${mood === 'funny' ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.06)'}`,
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
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '20px',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        {mood === 'romantic'
          ? 'Soft pinks and purples to warm your heart'
          : 'Sunny vibes and good times only!'}
      </motion.p>
    </section>
  );
}
