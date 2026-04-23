import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

const paragraphs = [
  'We met randomly… just a simple message, but somehow it turned into something endless.',
  'It all started in November 2025 on Instagram, when you texted first.',
  'From random talks to daily conversations… from strangers to someone I can\'t imagine my days without.',
  'You capturing moments in Banaras… Me capturing moments in IIT Tirupati… And somehow, we kept sharing pieces of our lives with each other.',
  'What started small… became something really special.',
];

export default function ShortStory() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      background: 'radial-gradient(ellipse at top, rgba(255,154,203,0.08) 0%, transparent 60%)',
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
        Our Story
      </motion.h2>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 * i, duration: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
