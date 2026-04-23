import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

const paragraphs = [
  'Some people enter your life and everything changes. Not with fireworks or grand announcements, but with a quiet kind of magic that you only notice when you look back.',
  'That is what happened with you. One random day, one random conversation, and suddenly the world had more color in it. The jokes were funnier, the sun was warmer, and the hard days felt a little less impossible.',
  'You did not just become my friend. You became the person I want to share every good news with, every bad day with, every random thought at 2 AM with.',
  'This is not just a birthday page. This is a love letter to the friendship that saved me, shaped me, and made me believe that the best things in life are the people beside you.',
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
        A Story About You
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
