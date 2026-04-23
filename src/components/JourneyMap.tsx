import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { PLATFORM_JOURNEY, JOURNEY_PLACES } from '../utils/data';

export default function JourneyMap() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
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
        Our Journey Map
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        How our connection traveled across platforms
      </motion.p>

      {/* Platform Journey Flow */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0', marginBottom: '48px', flexWrap: 'wrap',
        maxWidth: '700px', width: '100%',
      }}>
        {PLATFORM_JOURNEY.map((platform, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 * i }}
              whileHover={{ scale: 1.1, y: -4 }}
              onClick={() => setSelectedPlatform(selectedPlatform === i ? null : i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer', padding: '12px',
              }}
            >
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '50%',
                background: selectedPlatform === i
                  ? platform.color
                  : `${platform.color}33`,
                border: `2px solid ${selectedPlatform === i ? platform.color : `${platform.color}66`}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                transition: 'all 0.3s',
                boxShadow: selectedPlatform === i ? `0 0 20px ${platform.color}66` : 'none',
              }}>
                {platform.icon}
              </div>
              <span style={{
                marginTop: '8px',
                fontSize: '0.75rem',
                color: selectedPlatform === i ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: selectedPlatform === i ? 600 : 400,
                transition: 'all 0.3s',
              }}>
                {platform.name}
              </span>
            </motion.div>

            {i < PLATFORM_JOURNEY.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2 * i + 0.3, duration: 0.5 }}
                style={{
                  width: '40px', height: '2px',
                  background: 'linear-gradient(90deg, var(--pink), var(--purple))',
                  transformOrigin: 'left',
                  margin: '0 4px',
                  marginBottom: '20px',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlatform !== null && (
          <motion.div
            key={selectedPlatform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)',
              padding: '20px 28px',
              maxWidth: '400px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: PLATFORM_JOURNEY[selectedPlatform].color,
              fontSize: '1.2rem',
              marginBottom: '8px',
            }}>
              {PLATFORM_JOURNEY[selectedPlatform].name}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {PLATFORM_JOURNEY[selectedPlatform].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selectable Platform Options */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}
      >
        Where do we talk the most?
      </motion.p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
        {['Instagram', 'Facebook', 'Threads', 'Telegram'].map((name, i) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 + 0.1 * i }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              background: active === i ? 'var(--pink)' : 'var(--bg-glass)',
              border: `1px solid ${active === i ? 'rgba(255,154,203,0.5)' : 'rgba(255,255,255,0.1)'}`,
              color: active === i ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            {name}
          </motion.button>
        ))}
      </div>

      {/* Map with pins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(255,154,203,0.05), rgba(167,139,250,0.05))',
          borderRadius: 'var(--radius)',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
          {JOURNEY_PLACES.map((place, i) => {
            const next = JOURNEY_PLACES[i + 1];
            return next ? (
              <line
                key={`line-${i}`}
                x1={place.x} y1={place.y}
                x2={next.x} y2={next.y}
                stroke="rgba(255,154,203,0.2)"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
            ) : null;
          })}
        </svg>

        {JOURNEY_PLACES.map((place, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.6 + 0.15 * i, type: 'spring' }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setSelectedPlatform(i)}
            style={{
              position: 'absolute',
              left: `${place.x}%`,
              top: `${place.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '14px', height: '14px',
              borderRadius: '50%',
              background: 'var(--purple)',
              boxShadow: '0 0 10px var(--purple)',
            }} />
            <span style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}>
              {place.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
