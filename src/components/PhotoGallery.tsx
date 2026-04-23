import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { GALLERY_IMAGES } from '../utils/data';

export default function PhotoGallery() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'radial-gradient(ellipse at 50% 80%, rgba(255,154,203,0.06) 0%, transparent 50%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Memories
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Every picture tells a story
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
        maxWidth: '850px',
        width: '100%',
      }}>
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.12 * i, duration: 0.7 }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 40px rgba(255,154,203,0.25)',
              zIndex: 2,
            }}
            onClick={() => setSelected(i)}
            style={{
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              background: 'var(--bg-glass-strong)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '10px 10px 6px',
              position: 'relative',
            }}
          >
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              style={{
                width: '100%', height: '170px', objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                transition: 'transform 0.5s',
              }}
            />
            <p style={{
              fontSize: '0.8rem', color: 'var(--text-secondary)',
              marginTop: '8px', textAlign: 'center', fontWeight: 300,
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
              background: 'rgba(8,5,16,0.92)',
              backdropFilter: 'blur(30px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '550px', width: '100%',
                background: 'var(--bg-glass-strong)',
                backdropFilter: 'blur(30px)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].caption}
                style={{ width: '100%', maxHeight: '55vh', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.05rem',
                  marginBottom: '8px',
                  fontWeight: 500,
                }}>
                  {GALLERY_IMAGES[selected].caption}
                </p>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                }}>
                  {GALLERY_IMAGES[selected].overlay}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: '20px', padding: '10px 28px',
                    borderRadius: '50px', background: 'var(--pink)',
                    color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
