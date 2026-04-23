import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { TIMELINE_EVENTS } from '../utils/data';

export default function Timeline() {
  const { ref, inView } = useInView();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [sliderValues, setSliderValues] = useState<Record<number, number>>({});

  return (
    <section ref={ref} className="chapter" style={{
      background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(15,10,30,1) 50%, var(--bg-dark) 100%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        The Journey
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Every chapter of our story
      </motion.p>

      <div style={{ position: 'relative', maxWidth: '680px', width: '100%' }}>
        {/* Glowing path */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--pink), var(--purple), var(--pink))',
            transformOrigin: 'top',
            transform: 'translateX(-50%)',
            opacity: 0.2,
          }}
        />

        {TIMELINE_EVENTS.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 * i, duration: 0.7 }}
            style={{
              display: 'flex',
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'flex-start',
              marginBottom: '48px',
              gap: '20px',
            }}
          >
            <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(255,154,203,0.15)' }}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                style={{
                  background: 'var(--bg-glass-strong)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius)',
                  padding: '24px',
                  display: 'inline-block',
                  textAlign: 'left',
                  maxWidth: '300px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s',
                }}
              >
                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--purple)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: 600,
                }}>
                  {event.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  color: 'var(--pink)',
                  margin: '8px 0',
                  textShadow: 'var(--glow-pink)',
                }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                  {event.text}
                </p>

                {/* Then vs Now slider */}
                {expandedIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        fontSize: '0.7rem', color: 'var(--text-muted)',
                        marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px',
                      }}>
                        <span>Then</span>
                        <span>Now</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValues[i] ?? 0}
                        onChange={e => setSliderValues(prev => ({ ...prev, [i]: parseInt(e.target.value) }))}
                        style={{
                          width: '100%',
                          accentColor: 'var(--pink)',
                          cursor: 'pointer',
                          height: '4px',
                        }}
                      />
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        marginTop: '6px',
                      }}>
                        <motion.span
                          animate={{ opacity: 1 - (sliderValues[i] ?? 0) / 100 }}
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            maxWidth: '45%',
                            transition: 'opacity 0.3s',
                          }}
                        >
                          {event.then}
                        </motion.span>
                        <motion.span
                          animate={{ opacity: (sliderValues[i] ?? 0) / 100 }}
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--purple)',
                            textAlign: 'right',
                            maxWidth: '45%',
                            transition: 'opacity 0.3s',
                          }}
                        >
                          {event.now}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div style={{
              width: '14px', height: '14px', borderRadius: '50%',
              background: 'var(--pink)',
              boxShadow: '0 0 12px var(--pink)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
              marginTop: '28px',
            }} />

            <div style={{ flex: 1 }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
