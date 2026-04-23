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
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.08) 0%, transparent 60%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Every Second Counts
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Since November 2025, our story has been writing itself
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '16px',
        maxWidth: '560px',
        width: '100%',
      }}>
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
            style={{
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius)',
              padding: '28px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--purple)',
              fontFamily: 'var(--font-body)',
              textShadow: 'var(--glow-purple)',
              letterSpacing: '2px',
            }}>
              {String(u.value).padStart(u.label === 'Days' ? 1 : 2, '0')}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}>
              {u.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
