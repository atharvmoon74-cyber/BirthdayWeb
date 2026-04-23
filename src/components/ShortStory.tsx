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
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at top, rgba(255,154,203,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Our Story
      </motion.h2>
      <div style={{ maxWidth: '680px', width: '100%' }}>
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 * i, duration: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: '28px',
              textAlign: 'center',
              fontWeight: 300,
            }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
