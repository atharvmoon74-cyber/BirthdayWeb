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
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        A Message For You
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Play when you are alone
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        style={{
          background: 'var(--bg-glass-strong)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <motion.div
          animate={playing ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            width: '80px', height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--pink), var(--purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: 'var(--glow-pink)',
            cursor: 'pointer',
          }}
          onClick={() => setPlaying(!playing)}
        >
          <span style={{ fontSize: '1.8rem', color: '#fff' }}>
            {playing ? '||' : '>'}
          </span>
        </motion.div>

        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '16px' }}
          >
            <div style={{
              display: 'flex', gap: '3px', alignItems: 'center',
              justifyContent: 'center', height: '40px',
            }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [6, Math.random() * 35 + 6, 6] }}
                  transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.04 }}
                  style={{
                    width: '3px',
                    borderRadius: '2px',
                    background: 'var(--pink)',
                  }}
                />
              ))}
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              marginTop: '12px',
              fontStyle: 'italic',
              fontWeight: 300,
            }}>
              Close your eyes and listen with your heart...
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
