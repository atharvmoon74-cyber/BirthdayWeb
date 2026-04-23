import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

export default function VoiceMessage() {
  const { ref, inView } = useInView();
  const [playing, setPlaying] = useState(false);

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
        A Message For You
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}
      >
        Play when you are alone
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--radius)',
          padding: '32px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--pink), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: 'var(--glow-pink)',
        }}>
          <motion.div
            animate={playing ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ fontSize: '2rem' }}
          >
            {playing ? '||' : '>'}
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPlaying(!playing)}
          style={{
            padding: '12px 32px',
            borderRadius: '50px',
            background: 'var(--purple)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          {playing ? 'Pause' : 'Play Message'}
        </motion.button>

        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '20px' }}
          >
            <div style={{
              display: 'flex', gap: '3px', alignItems: 'center',
              justifyContent: 'center', height: '40px',
            }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [8, Math.random() * 35 + 8, 8] }}
                  transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
                  style={{
                    width: '3px',
                    borderRadius: '2px',
                    background: 'var(--pink)',
                  }}
                />
              ))}
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginTop: '12px',
              fontStyle: 'italic',
            }}>
              Close your eyes and listen with your heart...
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
