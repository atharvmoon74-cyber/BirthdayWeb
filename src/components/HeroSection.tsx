import { motion } from 'framer-motion';
import { FRIEND_NAME } from '../utils/data';

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px', position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 40%, rgba(167,139,250,0.12) 0%, rgba(255,154,203,0.06) 40%, transparent 70%)',
    }}>
      <FloatingParticles />
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontFamily: 'var(--font-heading)',
          color: 'var(--pink)',
          textShadow: '0 0 50px rgba(255,154,203,0.5), 0 0 100px rgba(255,154,203,0.2), 0 0 150px rgba(255,154,203,0.1)',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {FRIEND_NAME}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '550px',
          lineHeight: 1.7,
          fontWeight: 300,
          letterSpacing: '0.3px',
        }}
      >
        A story of laughter, madness & unforgettable memories
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        animate={{ y: [0, 12, 0] }}
        style={{ marginTop: '80px', color: 'var(--text-muted)', fontSize: '1.2rem' }}
      >
        &#8595;
      </motion.div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 3,
    isPink: Math.random() > 0.5,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: [-30, 30, -30],
            x: [-10, 10, -10],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.isPink ? 'var(--pink)' : 'var(--purple)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}
