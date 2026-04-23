import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';

const PUZZLE_PIECES = [
  { id: 0, label: 'F', color: 'var(--pink)' },
  { id: 1, label: 'R', color: 'var(--purple)' },
  { id: 2, label: 'I', color: 'var(--pink)' },
  { id: 3, label: 'E', color: 'var(--purple)' },
  { id: 4, label: 'N', color: 'var(--pink)' },
  { id: 5, label: 'D', color: 'var(--purple)' },
];

export default function PuzzleUnlock() {
  const { ref, inView } = useInView();
  const [order, setOrder] = useState<number[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [shuffled] = useState(() => {
    const arr = [...PUZZLE_PIECES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const handlePiece = (id: number) => {
    if (unlocked) return;
    const next = [...order, id];
    setOrder(next);
    if (next.length === PUZZLE_PIECES.length) {
      const correct = next.every((n, i) => n === i);
      if (correct) {
        setUnlocked(true);
      } else {
        setTimeout(() => setOrder([]), 800);
      }
    }
  };

  return (
    <section ref={ref} style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
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
        Puzzle Unlock
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}
      >
        Arrange the letters in the right order to unlock the final message
      </motion.p>

      {!unlocked ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex', gap: '8px',
            justifyContent: 'center', marginBottom: '24px',
            minHeight: '60px',
          }}>
            {PUZZLE_PIECES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '48px', height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  background: order.includes(i) ? 'rgba(255,154,203,0.2)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${order.includes(i) ? 'rgba(255,154,203,0.4)' : 'rgba(255,255,255,0.05)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: order.includes(i) ? 'var(--pink)' : 'var(--text-muted)',
                  fontSize: '1.2rem', fontWeight: 700,
                }}
              >
                {order.includes(i) ? PUZZLE_PIECES[i].label : '?'}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {shuffled.map((piece) => (
              <motion.button
                key={piece.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePiece(piece.id)}
                disabled={order.includes(piece.id)}
                style={{
                  width: '56px', height: '56px',
                  borderRadius: 'var(--radius-sm)',
                  background: order.includes(piece.id)
                    ? 'rgba(255,255,255,0.03)'
                    : piece.color,
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: order.includes(piece.id) ? 'var(--text-muted)' : '#fff',
                  fontSize: '1.4rem', fontWeight: 700,
                  opacity: order.includes(piece.id) ? 0.3 : 1,
                }}
              >
                {piece.label}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,154,203,0.3)',
              borderRadius: 'var(--radius)',
              padding: '40px 32px',
              maxWidth: '500px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: '2rem', fontFamily: 'var(--font-heading)',
              color: 'var(--pink)', marginBottom: '16px',
            }}>
              FRIEND
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              That is what you are. The best one I have ever had. And no puzzle in this world could ever capture how much you mean to me.
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
