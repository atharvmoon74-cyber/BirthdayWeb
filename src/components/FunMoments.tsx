import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { QUIZ_QUESTIONS, COMPLIMENTS } from '../utils/data';

export default function FunMoments() {
  const { ref, inView } = useInView();
  const [tab, setTab] = useState<'quiz' | 'hearts' | 'compliment'>('quiz');

  return (
    <section ref={ref} className="chapter" style={{
      background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(20,10,40,1) 50%, var(--bg-dark) 100%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Fun Moments
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Let's have some fun!
      </motion.p>

      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { key: 'quiz' as const, label: 'Quiz' },
          { key: 'hearts' as const, label: 'Catch Hearts' },
          { key: 'compliment' as const, label: 'Compliment' },
        ].map(t => (
          <motion.button
            key={t.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 24px',
              borderRadius: '50px',
              background: tab === t.key ? 'linear-gradient(135deg, var(--pink), var(--purple))' : 'var(--bg-glass)',
              border: `1px solid ${tab === t.key ? 'rgba(255,154,203,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {t.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'quiz' && <Quiz key="quiz" />}
        {tab === 'hearts' && <CatchHearts key="hearts" />}
        {tab === 'compliment' && <ComplimentGen key="compliment" />}
      </AnimatePresence>
    </section>
  );
}

function Quiz() {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: '480px', width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
      }}
    >
      {!done ? (
        <>
          <p style={{ fontSize: '0.75rem', color: 'var(--purple)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Question {current + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '24px' }}>{q.question}</p>
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
                    ? i === q.correct ? 'rgba(52,211,153,0.15)' : i === selected ? 'rgba(239,68,68,0.15)' : 'var(--bg-glass)'
                    : 'var(--bg-glass)',
                  border: `1px solid ${selected !== null
                    ? i === q.correct ? 'rgba(52,211,153,0.4)' : i === selected ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.06)'}`,
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
                color: '#fff', fontWeight: 600, fontSize: '0.85rem',
                display: 'block', marginLeft: 'auto',
              }}
            >
              {current < QUIZ_QUESTIONS.length - 1 ? 'Next' : 'See Results'}
            </motion.button>
          )}
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: 'var(--pink)', fontFamily: 'var(--font-heading)' }}>
            {score}/{QUIZ_QUESTIONS.length} Correct!
          </p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontWeight: 300 }}>
            {score === QUIZ_QUESTIONS.length ? 'You know me too well!' : 'We need to hang out more!'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function CatchHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const idRef = useRef(0);

  const start = useCallback(() => {
    setPlaying(true);
    setScore(0);
    setHearts([]);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setHearts(prev => [...prev, { id: idRef.current++, x: Math.random() * 80 + 10 }]);
    }, 600);
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const timeout = setTimeout(() => setPlaying(false), 15000);
    return () => clearTimeout(timeout);
  }, [playing]);

  const catchHeart = (id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    setScore(s => s + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: '480px', width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px',
        textAlign: 'center',
        minHeight: '300px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!playing ? (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 300 }}>
            {score > 0 ? `You caught ${score} hearts!` : 'Catch the falling hearts in 15 seconds!'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={start}
            style={{
              padding: '14px 32px', borderRadius: '50px',
              background: 'linear-gradient(135deg, var(--pink), var(--purple))',
              color: '#fff', fontWeight: 600,
            }}
          >
            {score > 0 ? 'Play Again' : 'Start Game'}
          </motion.button>
        </>
      ) : (
        <>
          <p style={{ color: 'var(--pink)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
            Score: {score}
          </p>
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
            {hearts.map(h => (
              <motion.div
                key={h.id}
                initial={{ top: -20, opacity: 1 }}
                animate={{ top: '110%', opacity: 0.5 }}
                transition={{ duration: 3, ease: 'linear' }}
                onClick={() => catchHeart(h.id)}
                style={{
                  position: 'absolute',
                  left: `${h.x}%`,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function ComplimentGen() {
  const [compliment, setCompliment] = useState('');
  const [revealed, setRevealed] = useState(false);

  const generate = () => {
    setRevealed(false);
    const c = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    setCompliment(c);
    setTimeout(() => setRevealed(true), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: '480px', width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 32px',
        textAlign: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        {revealed && compliment ? (
          <motion.p
            key={compliment}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              fontSize: '1.3rem',
              fontFamily: 'var(--font-heading)',
              color: 'var(--pink)',
              textShadow: 'var(--glow-pink)',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            {compliment}
          </motion.p>
        ) : (
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontWeight: 300 }}>
            Tap to reveal a compliment
          </p>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generate}
        style={{
          padding: '14px 32px', borderRadius: '50px',
          background: 'linear-gradient(135deg, var(--pink), var(--purple))',
          color: '#fff', fontWeight: 600,
        }}
      >
        Generate Compliment
      </motion.button>
    </motion.div>
  );
}
