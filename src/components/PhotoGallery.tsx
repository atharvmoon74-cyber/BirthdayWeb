import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { GALLERY_IMAGES } from '../utils/data';

export default function PhotoGallery() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<number | null>(null);

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
        Our Memories
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}
      >
        Every picture tells a story
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        width: '100%',
      }}>
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,154,203,0.3)' }}
            onClick={() => setSelected(i)}
            style={{
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              background: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px 12px 8px',
            }}
          >
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              style={{
                width: '100%', height: '180px', objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
              }}
            />
            <p style={{
              fontSize: '0.85rem', color: 'var(--text-secondary)',
              marginTop: '8px', textAlign: 'center',
            }}>
              {img.caption}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '600px', width: '100%',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].caption}
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }}
              />
              <p style={{
                padding: '20px', textAlign: 'center',
                color: 'var(--text-secondary)', fontSize: '1.1rem',
              }}>
                {GALLERY_IMAGES[selected].caption}
              </p>
              <button
                onClick={() => setSelected(null)}
                style={{
                  display: 'block', margin: '0 auto 20px',
                  padding: '8px 24px', borderRadius: '50px',
                  background: 'var(--pink)', color: '#fff',
                  fontSize: '0.9rem', fontWeight: 600,
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
