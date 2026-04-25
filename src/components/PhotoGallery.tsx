import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { GALLERY_IMAGES } from '../utils/data';


export default function PhotoGallery() {
  const { ref, inView } = useInView();

  const [selected, setSelected] = useState<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  usePreloadNext(selected);
useSmartAutoplay(setAutoPlay);

  // 🔥 ESC + Arrow Keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);

      if (selected !== null) {
        if (e.key === 'ArrowRight') {
          setSelected((prev) =>
            prev !== null ? (prev + 1) % GALLERY_IMAGES.length : prev
          );
        }

        if (e.key === 'ArrowLeft') {
          setSelected((prev) =>
            prev !== null
              ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
              : prev
          );
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected]);

  // 🎬 Auto Slideshow
  useEffect(() => {
    if (selected === null || !autoPlay) return;

    const interval = setInterval(() => {
      setSelected((prev) => {
        if (prev === null) return prev;
        return (prev + 1) % GALLERY_IMAGES.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selected, autoPlay]);

  const nextImage = () => {
    setSelected((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : prev
    );
  };

  const prevImage = () => {
    setSelected((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : prev
    );
  };

  const btnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #ff9acb, #a78bfa)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
  };

  return (
   <section
  ref={ref}
  className="chapter"
  style={{
    position: "relative",
    background:
      'radial-gradient(ellipse at 50% 80%, rgba(255,154,203,0.08) 0%, transparent 60%)',
  }}
>
  <CinematicBackground />
  <FloatingParticles />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        Memories ✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        Every picture tells a story 💖
      </motion.p>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '24px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        {GALLERY_IMAGES.map((img, i) => {
          const imageSrc = import.meta.env.BASE_URL + img.src;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
              }}
              onClick={() => setSelected(i)}
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                  boxShadow:
                    '0 0 50px rgba(255,154,203,0.4), 0 0 100px rgba(255,154,203,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,154,203,0.15)',
                }}
              >
                <img
                  src={imageSrc}
                  alt={img.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />

                {/* Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 40%, rgba(8,5,16,0.9) 100%)',
                  }}
                />

                {/* Caption */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '14px',
                  }}
                >
                  <p style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                    {img.caption}
                  </p>
                  <p style={{ color: '#ccc', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    {img.overlay}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 0 80px rgba(255,154,203,0.3)',
              }}
            >
              <img
                src={import.meta.env.BASE_URL + GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].caption}
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  objectFit: 'cover',
                }}
              />

              <div style={{ padding: '24px', textAlign: 'center' }}>
                <h3 style={{ color: '#fff' }}>
                  {GALLERY_IMAGES[selected].caption}
                </h3>
                <p style={{ color: '#aaa', fontStyle: 'italic' }}>
                  {GALLERY_IMAGES[selected].overlay}
                </p>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                  <button onClick={prevImage} style={btnStyle}>⬅</button>
                  <button onClick={() => setAutoPlay(!autoPlay)} style={btnStyle}>
                    {autoPlay ? 'Pause ⏸' : 'Play ▶'}
                  </button>
                  <button onClick={nextImage} style={btnStyle}>➡</button>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: '20px',
                    padding: '10px 30px',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #ff9acb, #a78bfa)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  Close ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
/* ===========================
   🔥 GOD LEVEL ADDON PATCH
   =========================== */



/* 🎬 Background Cinematic Glow */
function CinematicBackground() {
  return (
    <motion.div
      animate={{
        background: [
          "radial-gradient(circle at 20% 30%, rgba(255,154,203,0.15), transparent 60%)",
          "radial-gradient(circle at 80% 70%, rgba(167,139,250,0.15), transparent 60%)",
          "radial-gradient(circle at 40% 60%, rgba(255,154,203,0.12), transparent 60%)",
        ],
      }}
      transition={{ duration: 12, repeat: Infinity }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/* ✨ Floating Particles */
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 6,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.6, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255,154,203,0.7)",
            boxShadow: "0 0 10px rgba(255,154,203,0.8)",
          }}
        />
      ))}
    </div>
  );
}

/* 🎞 Preload next image (smooth transitions) */
function usePreloadNext(selected: number | null) {
  useEffect(() => {
    if (selected === null) return;

    const nextIndex = (selected + 1) % GALLERY_IMAGES.length;
    const img = new Image();
    img.src = import.meta.env.BASE_URL + GALLERY_IMAGES[nextIndex].src;
  }, [selected]);
}

/* 🧠 Smart autoplay pause when user interacts */
function useSmartAutoplay(setAutoPlay: (v: boolean) => void) {
  useEffect(() => {
    const stop = () => setAutoPlay(false);

    window.addEventListener("click", stop);
    window.addEventListener("keydown", stop);

    return () => {
      window.removeEventListener("click", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);
}

/* ===========================
   🔥 APPLY INSIDE YOUR COMPONENT
   =========================== */

/*
👉 STEP 1: Inside your PhotoGallery component, ADD these:

const containerRef = useRef<HTMLDivElement | null>(null);
usePreloadNext(selected);
useSmartAutoplay(setAutoPlay);

👉 STEP 2: Wrap your <section> content like this:

<section ...>
  <CinematicBackground />
  <FloatingParticles />

👉 STEP 3: Add ACTIVE IMAGE GLOW inside your image card:

style={{
  ...
  border: selected === i ? "2px solid #ff9acb" : "2px solid rgba(255,154,203,0.15)",
}}

👉 STEP 4: Add this animation to selected image modal:

<motion.div
  animate={{
    boxShadow: [
      "0 0 40px rgba(255,154,203,0.2)",
      "0 0 80px rgba(255,154,203,0.5)",
      "0 0 40px rgba(255,154,203,0.2)",
    ],
  }}
  transition={{ duration: 2, repeat: Infinity }}
>

👉 STEP 5: Smooth image fade:

<img
  key={selected}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
/>

*/

/* ===========================
   DONE ✅
   =========================== */