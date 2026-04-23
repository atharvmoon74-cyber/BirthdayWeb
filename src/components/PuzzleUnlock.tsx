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
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Puzzle Unlock
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Arrange the letters in the right order
      </motion.p>

      {!unlocked ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex', gap: '8px',
            justifyContent: 'center', marginBottom: '24px',
            minHeight: '56px',
          }}>
            {PUZZLE_PIECES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '44px', height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  background: order.includes(i) ? 'rgba(255,154,203,0.15)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${order.includes(i) ? 'rgba(255,154,203,0.3)' : 'rgba(255,255,255,0.04)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: order.includes(i) ? 'var(--pink)' : 'var(--text-muted)',
                  fontSize: '1.1rem', fontWeight: 700,
                  transition: 'all 0.3s',
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
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePiece(piece.id)}
                disabled={order.includes(piece.id)}
                style={{
                  width: '52px', height: '52px',
                  borderRadius: 'var(--radius-sm)',
                  background: order.includes(piece.id)
                    ? 'rgba(255,255,255,0.02)'
                    : piece.color,
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: order.includes(piece.id) ? 'var(--text-muted)' : '#fff',
                  fontSize: '1.3rem', fontWeight: 700,
                  opacity: order.includes(piece.id) ? 0.25 : 1,
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
            transition={{ type: 'spring', stiffness: 60 }}
            style={{
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,154,203,0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px 32px',
              maxWidth: '460px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: '2rem', fontFamily: 'var(--font-heading)',
              color: 'var(--pink)', marginBottom: '16px',
              textShadow: 'var(--glow-pink)',
            }}>
              FRIEND
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
              That is what you are. The best one I have ever had. And no puzzle in this world could ever capture how much you mean to me.
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
