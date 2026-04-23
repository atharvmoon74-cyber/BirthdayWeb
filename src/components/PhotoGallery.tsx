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
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
        maxWidth: '750px',
        width: '100%',
      }}>
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.2 * i, duration: 0.8 }}
            style={{
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 40px rgba(255,154,203,0.3), 0 0 80px rgba(255,154,203,0.1)',
                zIndex: 2,
              }}
              onClick={() => setSelected(i)}
              style={{
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '2px solid rgba(255,154,203,0.15)',
                boxShadow: '0 0 20px rgba(255,154,203,0.08)',
                transition: 'box-shadow 0.4s, border-color 0.4s',
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  style={{
                    width: '100%', height: '200px', objectFit: 'cover',
                    transition: 'transform 0.6s',
                    filter: 'brightness(0.9)',
                  }}
                  onMouseOver={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; }}
                  onMouseOut={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                {/* Glow overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(8,5,16,0.8) 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Caption */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '16px',
                  pointerEvents: 'none',
                }}>
                  <p style={{
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    marginBottom: '4px',
                  }}>
                    {img.caption}
                  </p>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontStyle: 'italic',
                  }}>
                    {img.overlay}
                  </p>
                </div>
              </div>

              {img.placeholder && (
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(251,191,36,0.06)',
                  borderTop: '1px solid rgba(251,191,36,0.1)',
                  textAlign: 'center',
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                    color: 'var(--gold)',
                    opacity: 0.6,
                  }}>
                    Replace with real photos
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(8,5,16,0.94)',
              backdropFilter: 'blur(40px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '550px', width: '100%',
                background: 'var(--bg-glass-strong)',
                backdropFilter: 'blur(30px)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,154,203,0.15)',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(255,154,203,0.15)',
              }}
            >
              <img
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].caption}
                style={{ width: '100%', maxHeight: '55vh', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px', textAlign: 'center' }}>
                <p style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
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
