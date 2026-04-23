import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { QUIZ_QUESTIONS } from '../utils/data';

export default function FunQuiz() {
  const { ref, inView } = useInView();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

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
        How Well Do You Know Me?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Let's find out!
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
              fontSize: '0.85rem', color: 'var(--purple)',
              marginBottom: '8px', textTransform: 'uppercase',
              letterSpacing: '2px',
            }}>
              Question {current + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <p style={{
              fontSize: '1.1rem', color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              {q.question}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={selected === null ? { scale: 1.02, x: 4 } : {}}
                  whileTap={selected === null ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '14px 18px', borderRadius: 'var(--radius-sm)',
                    background: selected !== null
                      ? i === q.correct
                        ? 'rgba(52,211,153,0.2)'
                        : i === selected
                          ? 'rgba(239,68,68,0.2)'
                          : 'var(--bg-glass)'
                      : 'var(--bg-glass)',
                    border: selected !== null
                      ? i === q.correct
                        ? '1px solid rgba(52,211,153,0.5)'
                        : i === selected
                          ? '1px solid rgba(239,68,68,0.5)'
                          : '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    cursor: selected === null ? 'pointer' : 'default',
                  }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
            {selected !== null && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                style={{
                  marginTop: '20px', padding: '10px 28px',
                  borderRadius: '50px', background: 'var(--purple)',
                  color: '#fff', fontWeight: 600, fontSize: '0.9rem',
                  display: 'block', marginLeft: 'auto',
                }}
              >
                {current < QUIZ_QUESTIONS.length - 1 ? 'Next' : 'See Results'}
              </motion.button>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontSize: '1.5rem', color: 'var(--pink)', fontFamily: 'var(--font-heading)' }}>
              {score}/{QUIZ_QUESTIONS.length} Correct!
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
              {score === QUIZ_QUESTIONS.length
                ? 'You know me too well! Best friend certified!'
                : score >= QUIZ_QUESTIONS.length / 2
                  ? 'Pretty good! But I have secrets you do not know about!'
                  : 'We need to hang out more!'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
