import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInView } from '../hooks/useAnimations';
import { MYSTERY_BOXES, TREE_MEMORIES } from '../utils/data';

type Phase = 'boxes' | 'tree';

export default function MysteryBox() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState<Phase>('boxes');
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set());
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [hoveredLeaf, setHoveredLeaf] = useState<number | null>(null);
  const [goldenFound, setGoldenFound] = useState(false);

  const openBox = (id: number) => {
    if (id === 2 && !openedBoxes.has(1)) return;
    if (id === 3 && !openedBoxes.has(2)) return;
    if (openedBoxes.has(id)) {
      setActiveBox(activeBox === id ? null : id);
      return;
    }

    setOpenedBoxes(prev => new Set(prev).add(id));
    setActiveBox(id);

    if (id === 2) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#ff9acb', '#a78bfa', '#ffc4e0'],
      });
    }

    if (id === 3) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff9acb', '#a78bfa', '#ffc4e0', '#fbbf24', '#34d399'],
      });
      setTimeout(() => setPhase('tree'), 3000);
    }
  };

  return (
    <section ref={ref} className="chapter" style={{
      background: phase === 'tree'
        ? 'linear-gradient(180deg, #060412 0%, #0a0618 30%, #0d0820 100%)'
        : 'var(--bg-dark)',
      transition: 'background 2s',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        {phase === 'boxes' ? 'The Mystery Boxes' : 'The Memory Tree'}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        {phase === 'boxes' ? 'Open each box to discover what lies within' : 'From one small moment... grew something beautiful'}
      </motion.p>

      {phase === 'boxes' && (
        <div style={{
          display: 'flex', gap: '20px', flexWrap: 'wrap',
          justifyContent: 'center', maxWidth: '700px', width: '100%',
        }}>
          {MYSTERY_BOXES.map((box, i) => {
            const boxId = box.id;
            const isOpen = openedBoxes.has(boxId);
            const isLocked = (boxId === 2 && !openedBoxes.has(1)) || (boxId === 3 && !openedBoxes.has(2));
            const isActive = activeBox === boxId;

            return (
              <motion.div
                key={boxId}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * i }}
                style={{
                  width: '200px',
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${isOpen ? `${box.glowColor.replace('0.4', '0.3')}` : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.4 : 1,
                  transition: 'opacity 0.3s, border-color 0.3s',
                  boxShadow: isOpen ? `0 0 30px ${box.glowColor}` : 'none',
                }}
                onClick={() => !isLocked && openBox(boxId)}
                whileHover={!isLocked ? { scale: 1.04, y: -4 } : {}}
                whileTap={!isLocked ? { scale: 0.97 } : {}}
              >
                <motion.div
                  animate={isOpen ? {} : { boxShadow: [`0 0 20px ${box.glowColor}`, `0 0 40px ${box.glowColor}`, `0 0 20px ${box.glowColor}`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '64px', height: '64px',
                    borderRadius: '20px',
                    background: isOpen
                      ? `linear-gradient(135deg, ${box.color}, transparent)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: `2px solid ${isOpen ? box.color : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '1.8rem',
                    transition: 'all 0.5s',
                  }}
                >
                  {isOpen ? box.icon : '?'}
                </motion.div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  color: isOpen ? box.color : 'var(--text-muted)',
                  marginBottom: '8px',
                  textShadow: isOpen ? `0 0 20px ${box.glowColor}` : 'none',
                  transition: 'all 0.3s',
                }}>
                  {isLocked ? 'Locked' : box.title}
                </h3>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  {isLocked ? `Open Box ${boxId - 1} first` : isOpen ? 'Click to reveal' : 'Tap to open'}
                </p>

                <AnimatePresence>
                  {isActive && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: '16px', paddingTop: '12px',
                        borderTop: `1px solid ${box.glowColor.replace('0.4', '0.15')}`,
                      }}>
                        {box.thoughts.map((thought, ti) => (
                          <motion.p
                            key={ti}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 * ti }}
                            style={{
                              color: 'var(--text-secondary)',
                              fontSize: '0.8rem',
                              lineHeight: 1.6,
                              marginBottom: '8px',
                              fontWeight: 300,
                              fontStyle: 'italic',
                            }}
                          >
                            {thought}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {phase === 'tree' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            width: '100%', maxWidth: '700px',
            position: 'relative',
            minHeight: '600px',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(25,15,50,0.8) 0%, transparent 60%)',
            borderRadius: 'var(--radius-lg)',
          }} />

          <Fireflies />

          <svg viewBox="0 0 400 500" style={{
            width: '100%', maxWidth: '400px',
            margin: '0 auto', display: 'block',
            position: 'relative', zIndex: 2,
          }}>
            <motion.path
              d="M200,420 Q180,440 160,460 M200,420 Q220,440 240,460 M200,420 Q190,445 170,470 M200,420 Q210,445 230,470"
              stroke="rgba(139,92,42,0.6)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path
              d="M200,420 L200,280"
              stroke="rgba(139,92,42,0.8)"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.path
              d="M200,320 Q160,300 130,270 M200,320 Q240,300 270,270 M200,290 Q170,270 140,240 M200,290 Q230,270 260,240 M200,350 Q150,340 120,320 M200,350 Q250,340 280,320"
              stroke="rgba(139,92,42,0.6)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            {[{ cx: 200, cy: 200, r: 60 }, { cx: 150, cy: 230, r: 45 }, { cx: 250, cy: 230, r: 45 }, { cx: 170, cy: 180, r: 40 }, { cx: 230, cy: 180, r: 40 }, { cx: 200, cy: 150, r: 35 }].map((c, i) => (
              <motion.circle
                key={i}
                cx={c.cx} cy={c.cy} r={c.r}
                fill={`rgba(52,211,153,${0.15 + i * 0.03})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.2, duration: 0.8, type: 'spring' }}
              />
            ))}
          </svg>

          {TREE_MEMORIES.map((mem, i) => {
            const positions = [
              { x: 42, y: 28 }, { x: 58, y: 32 }, { x: 35, y: 38 },
              { x: 65, y: 40 }, { x: 30, y: 48 }, { x: 70, y: 48 },
              { x: 38, y: 55 }, { x: 62, y: 55 }, { x: 45, y: 60 },
              { x: 55, y: 60 }, { x: 50, y: 25 },
            ];
            const pos = positions[i] || { x: 50, y: 50 };
            const isGolden = mem.type === 'golden';

            return (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.3, type: 'spring' }}
                onMouseEnter={() => setHoveredLeaf(i)}
                onMouseLeave={() => setHoveredLeaf(null)}
                onClick={() => isGolden && setGoldenFound(true)}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: isGolden ? 'pointer' : 'default',
                  zIndex: 3,
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
                  style={{
                    width: isGolden ? '28px' : '18px',
                    height: isGolden ? '28px' : '18px',
                    borderRadius: '50% 0 50% 0',
                    background: isGolden
                      ? 'linear-gradient(135deg, #fbbf24, #fde68a)'
                      : mem.type === 'root' ? 'rgba(139,92,42,0.6)'
                        : mem.type === 'trunk' ? 'rgba(52,211,153,0.5)'
                          : mem.type === 'branch' ? 'rgba(52,211,153,0.7)'
                            : 'rgba(52,211,153,0.9)',
                    boxShadow: isGolden ? '0 0 20px rgba(251,191,36,0.6)' : hoveredLeaf === i ? '0 0 15px rgba(52,211,153,0.5)' : 'none',
                    transition: 'box-shadow 0.3s',
                  }}
                />
              </motion.div>
            );
          })}

          <AnimatePresence>
            {hoveredLeaf !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius)',
                  padding: '12px 20px',
                  maxWidth: '300px',
                  textAlign: 'center',
                  zIndex: 10,
                }}
              >
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 300 }}>
                  {TREE_MEMORIES[hoveredLeaf]?.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {goldenFound && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(251,191,36,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  maxWidth: '350px',
                  textAlign: 'center',
                  zIndex: 20,
                }}
              >
                <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '12px', textShadow: 'var(--glow-gold)' }}>
                  You found the golden leaf!
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
                  You are the best thing that happened to me. From one small moment... grew something beautiful.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <FallingLeaves />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              fontFamily: 'var(--font-heading)',
              textShadow: 'var(--glow-pink)',
              textAlign: 'center',
              zIndex: 5,
              whiteSpace: 'nowrap',
            }}
          >
            From one small moment... grew something beautiful
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}

function Fireflies() {
  const flies = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {flies.map(f => (
        <motion.div
          key={f.id}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * -30, 0],
            opacity: [0, 0.8, 0, 0.6, 0],
          }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 8px var(--gold)',
          }}
        />
      ))}
    </div>
  );
}

function FallingLeaves() {
  const leaves = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 8,
    size: Math.random() * 8 + 6,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 4 }}>
      {leaves.map(l => (
        <motion.div
          key={l.id}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: `${l.x}%`,
            width: l.size,
            height: l.size,
            borderRadius: '50% 0 50% 0',
            background: Math.random() > 0.7 ? 'var(--gold)' : 'var(--emerald)',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
