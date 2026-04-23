import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInView } from '../hooks/useAnimations';

export default function HiddenSurprise() {
  const { ref, inView } = useInView();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff9acb', '#a78bfa', '#ffc4e0', '#c4b5fd'],
    });
  };

  return (
    <section ref={ref} style={{
      minHeight: '50vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        style={{ textAlign: 'center' }}
      >
        {!clicked ? (
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255,154,203,0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            style={{
              padding: '20px 48px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, var(--pink), var(--purple))',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: 'var(--glow-pink)',
            }}
          >
            Don't click this
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,154,203,0.3)',
                borderRadius: 'var(--radius)',
                padding: '40px 32px',
                maxWidth: '400px',
              }}
            >
              <p style={{
                fontSize: '1.5rem', fontFamily: 'var(--font-heading)',
                color: 'var(--pink)', marginBottom: '12px',
              }}>
                You clicked it!
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                I knew you could not resist! That curiosity is exactly what makes you amazing. Never lose that spark!
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
