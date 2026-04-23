import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useInView } from '../hooks/useAnimations';
import { TREE_MEMORIES } from '../utils/data';

type Phase = 'box' | 'crack' | 'light' | 'explosion' | 'tree';

export default function MysteryBox() {
  const { ref, inView } = useInView();
  const [phase, setPhase] = useState<Phase>('box');
  const [hoveredLeaf, setHoveredLeaf] = useState<number | null>(null);
  const [goldenFound, setGoldenFound] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleBoxClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next === 1) setPhase('crack');
    if (next === 2) setPhase('light');
    if (next >= 3) {
      setPhase('explosion');
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff9acb', '#a78bfa', '#ffc4e0', '#fbbf24', '#34d399'],
      });
      setTimeout(() => setPhase('tree'), 2000);
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
        style={{ opacity: phase === 'tree' ? 0 : 1, transition: 'opacity 1s' }}
      >
        The Mystery Box
      </motion.h2>

      <AnimatePresence mode="wait">
        {phase === 'box' && (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              animate={{ boxShadow: ['0 0 30px rgba(255,154,203,0.3)', '0 0 60px rgba(255,154,203,0.5)', '0 0 30px rgba(255,154,203,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={handleBoxClick}
              style={{
                width: '120px', height: '120px',
                margin: '0 auto 24px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '2.5rem',
              }}
            >
              🎁
            </motion.div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>Open me</p>
          </motion.div>
        )}

        {phase === 'crack' && (
          <motion.div
            key="crack"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              animate={{ rotate: [-2, 2, -2], boxShadow: ['0 0 40px rgba(255,154,203,0.4)', '0 0 80px rgba(255,154,203,0.6)', '0 0 40px rgba(255,154,203,0.4)'] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              onClick={handleBoxClick}
              style={{
                width: '120px', height: '120px',
                margin: '0 auto 24px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '2.5rem',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              🎁
            </motion.div>
            <p style={{ color: 'var(--pink)', fontWeight: 300 }}>Something is happening...</p>
          </motion.div>
        )}

        {phase === 'light' && (
          <motion.div
            key="light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 60px rgba(255,154,203,0.5)', '0 0 120px rgba(255,154,203,0.8)', '0 0 60px rgba(255,154,203,0.5)'] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              onClick={handleBoxClick}
              style={{
                width: '120px', height: '120px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,154,203,0.8), rgba(167,139,250,0.6))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '2.5rem',
              }}
            >
              ✨
            </motion.div>
            <p style={{ color: 'var(--gold)', fontWeight: 300 }}>Almost there...</p>
          </motion.div>
        )}

        {phase === 'explosion' && (
          <motion.div
            key="explosion"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [0.5, 2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              width: '200px', height: '200px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,154,203,0.6), rgba(167,139,250,0.4), transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem',
            }}>
              🌸
            </div>
          </motion.div>
        )}

        {phase === 'tree' && (
          <motion.div
            key="tree"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              width: '100%', maxWidth: '700px',
              position: 'relative',
              minHeight: '600px',
            }}
          >
            {/* Night sky background */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(25,15,50,0.8) 0%, transparent 60%)',
              borderRadius: 'var(--radius-lg)',
            }} />

            {/* Fireflies */}
            <Fireflies />

            {/* Tree SVG */}
            <svg viewBox="0 0 400 500" style={{
              width: '100%', maxWidth: '400px',
              margin: '0 auto', display: 'block',
              position: 'relative', zIndex: 2,
            }}>
              {/* Roots */}
              <motion.path
                d="M200,420 Q180,440 160,460 M200,420 Q220,440 240,460 M200,420 Q190,445 170,470 M200,420 Q210,445 230,470"
                stroke="rgba(139,92,42,0.6)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              {/* Trunk */}
              <motion.path
                d="M200,420 L200,280"
                stroke="rgba(139,92,42,0.8)"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              {/* Branches */}
              <motion.path
                d="M200,320 Q160,300 130,270 M200,320 Q240,300 270,270 M200,290 Q170,270 140,240 M200,290 Q230,270 260,240 M200,350 Q150,340 120,320 M200,350 Q250,340 280,320"
                stroke="rgba(139,92,42,0.6)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              {/* Canopy circles */}
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

            {/* Memory leaves */}
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
                    animate={{
                      y: [0, -4, 0],
                      rotate: [0, 3, -3, 0],
                    }}
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

            {/* Hovered leaf message */}
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

            {/* Golden leaf secret */}
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

            {/* Falling leaves */}
            <FallingLeaves />

            {/* Bottom message */}
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
      </AnimatePresence>
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
