import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { PLATFORM_JOURNEY } from '../utils/data';

export default function JourneyMap() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [litSteps, setLitSteps] = useState<Set<number>>(new Set());

  const handleStepClick = (i: number) => {
    setActiveStep(i);
    setLitSteps(prev => new Set(prev).add(i));
  };

  return (
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Our Journey Map
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        How our connection traveled across platforms
      </motion.p>

      {/* Animated Path */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0', marginBottom: '40px', flexWrap: 'wrap',
        maxWidth: '700px', width: '100%',
      }}>
        {PLATFORM_JOURNEY.map((platform, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 * i, type: 'spring', stiffness: 80 }}
              whileHover={{ scale: 1.15, y: -6 }}
              onClick={() => handleStepClick(i)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer', padding: '12px',
              }}
            >
              <motion.div
                animate={litSteps.has(i) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  width: '60px', height: '60px',
                  borderRadius: '50%',
                  background: litSteps.has(i)
                    ? platform.color
                    : `${platform.color}22`,
                  border: `2px solid ${litSteps.has(i) ? platform.color : `${platform.color}44`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  transition: 'all 0.4s',
                  boxShadow: litSteps.has(i) ? `0 0 25px ${platform.color}66` : 'none',
                }}
              >
                {platform.icon}
              </motion.div>
              <span style={{
                marginTop: '10px',
                fontSize: '0.75rem',
                color: litSteps.has(i) ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: litSteps.has(i) ? 600 : 400,
                transition: 'all 0.3s',
              }}>
                {platform.name}
              </span>
            </motion.div>

            {i < PLATFORM_JOURNEY.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 * i + 0.5, duration: 0.6 }}
                style={{
                  width: '50px', height: '2px',
                  background: 'linear-gradient(90deg, var(--pink), var(--purple))',
                  transformOrigin: 'left',
                  margin: '0 4px',
                  marginBottom: '24px',
                  opacity: 0.4,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step detail */}
      <AnimatePresence>
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius)',
              padding: '24px 28px',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              color: PLATFORM_JOURNEY[activeStep].color,
              fontSize: '1.2rem',
              marginBottom: '8px',
            }}>
              {PLATFORM_JOURNEY[activeStep].name}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>
              {PLATFORM_JOURNEY[activeStep].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selectable options */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '32px', marginBottom: '12px' }}
      >
        Where do we talk the most?
      </motion.p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Instagram', 'Facebook', 'Threads', 'Telegram'].map((name, i) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1 + 0.1 * i }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStepClick(i === 0 ? 1 : i === 3 ? 3 : i === 2 ? 0 : 2)}
            style={{
              padding: '8px 18px',
              borderRadius: '50px',
              background: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {name}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
