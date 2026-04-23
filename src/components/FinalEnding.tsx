import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInView } from '../hooks/useAnimations';

const LINES = [
  'Out of all the people in this world...',
  'Through every laugh and every tear...',
  'Through every moment, big and small...',
  'I am lucky I found you.',
  'Happy Birthday!',
];

export default function FinalEnding() {
  const { ref, inView } = useInView();
  const [visibleLines, setVisibleLines] = useState(0);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < LINES.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (visibleLines === LINES.length && !celebrated) {
      setCelebrated(true);
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff9acb', '#a78bfa', '#ffc4e0'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff9acb', '#a78bfa', '#c4b5fd'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [visibleLines, celebrated]);

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px',
      background: 'radial-gradient(ellipse at center, rgba(255,154,203,0.1) 0%, transparent 60%)',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={i < visibleLines ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{
              fontSize: i === LINES.length - 1
                ? 'clamp(2.5rem, 8vw, 5rem)'
                : 'clamp(1.1rem, 3vw, 1.5rem)',
              fontFamily: i === LINES.length - 1
                ? 'var(--font-heading)'
                : 'var(--font-body)',
              color: i === LINES.length - 1
                ? 'var(--pink)'
                : 'var(--text-secondary)',
              textShadow: i === LINES.length - 1
                ? '0 0 40px rgba(255,154,203,0.6), 0 0 80px rgba(255,154,203,0.3)'
                : 'none',
              marginBottom: i === LINES.length - 1 ? '0' : '24px',
              lineHeight: 1.4,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
