import { motion } from 'framer-motion';
import { FRIEND_NAME } from '../utils/data';

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.15) 0%, transparent 70%)',
    }}>
      <FloatingParticles />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontFamily: 'var(--font-heading)',
          color: 'var(--pink)',
          textShadow: '0 0 40px rgba(255,154,203,0.5), 0 0 80px rgba(255,154,203,0.2)',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        {FRIEND_NAME}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}
      >
        A story of laughter, madness & unforgettable memories
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        animate={{ y: [0, 10, 0] }}
        style={{ marginTop: '60px', color: 'var(--text-muted)', fontSize: '1.5rem' }}
      >
        &#8595;
      </motion.div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--pink)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}
