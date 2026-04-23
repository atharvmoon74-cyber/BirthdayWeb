import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { MEMORY_QUESTIONS } from '../utils/data';

export default function MemoryGuessGame() {
  const { ref, inView } = useInView();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const q = MEMORY_QUESTIONS[current];
  const isCorrect = selected === q.answer;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < MEMORY_QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const done = current === MEMORY_QUESTIONS.length - 1 && revealed;

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
        Memory Guess
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        How well do you remember our moments?
      </motion.p>

      <div style={{
        maxWidth: '500px', width: '100%',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 'var(--radius)',
        padding: '32px',
      }}>
        {!done ? (
          <>
            <p style={{
              fontSize: '1.1rem', color: 'var(--text-primary)',
              marginBottom: '24px', textAlign: 'center',
            }}>
              {q.hint}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={!revealed ? { scale: 1.03 } : {}}
                  whileTap={!revealed ? { scale: 0.97 } : {}}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '14px', borderRadius: 'var(--radius-sm)',
                    background: revealed
                      ? i === q.answer
                        ? 'rgba(52,211,153,0.2)'
                        : i === selected
                          ? 'rgba(239,68,68,0.2)'
                          : 'var(--bg-glass)'
                      : 'var(--bg-glass)',
                    border: revealed
                      ? i === q.answer
                        ? '1px solid rgba(52,211,153,0.5)'
                        : i === selected
                          ? '1px solid rgba(239,68,68,0.5)'
                          : '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    cursor: revealed ? 'default' : 'pointer',
                  }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '20px', textAlign: 'center' }}
                >
                  <p style={{
                    color: isCorrect ? '#34d399' : '#ef4444',
                    fontWeight: 600, marginBottom: '8px',
                  }}>
                    {isCorrect ? 'You got it!' : 'Not quite!'}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {q.reveal}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={next}
                    style={{
                      marginTop: '16px', padding: '10px 28px',
                      borderRadius: '50px', background: 'var(--purple)',
                      color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                    }}
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontSize: '1.5rem', color: 'var(--pink)', fontFamily: 'var(--font-heading)' }}>
              You scored {score}/{MEMORY_QUESTIONS.length}!
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
              {score === MEMORY_QUESTIONS.length
                ? 'You remember everything! Best friend goals!'
                : 'Not bad! But I remember more!'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
