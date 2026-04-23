import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FRIENDSHIP_START } from '../utils/data';
import { useInView } from '../hooks/useAnimations';

export default function TimeCounter() {
  const { ref, inView } = useInView();
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - FRIENDSHIP_START.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ];

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
          marginBottom: '16px',
        }}
      >
        How Long We Have Known Each Other
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Every second counts when it is with you
      </motion.p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        maxWidth: '600px',
        width: '100%',
      }}>
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)',
              padding: '24px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--purple)',
              fontFamily: 'var(--font-body)',
              textShadow: 'var(--glow-purple)',
            }}>
              {String(u.value).padStart(u.label === 'Days' ? 1 : 2, '0')}
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}>
              {u.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
