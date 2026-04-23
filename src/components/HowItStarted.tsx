import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useAnimations';
import { CHAT_MESSAGES } from '../utils/data';

export default function HowItStarted() {
  const { ref, inView } = useInView();
  const [visibleMsgs, setVisibleMsgs] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVisibleMsgs(prev => {
        if (prev < CHAT_MESSAGES.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="chapter" style={{
      background: 'linear-gradient(180deg, var(--bg-dark) 0%, #0d0820 50%, var(--bg-dark) 100%)',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="chapter-title"
      >
        How It All Started
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="chapter-subtitle"
      >
        November 2025 — one message changed everything
      </motion.p>

      {/* Chat Interface */}
      <div style={{
        maxWidth: '420px', width: '100%',
        background: 'var(--bg-glass-strong)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        overflow: 'hidden',
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--pink), var(--purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 700, color: '#fff',
          }}>
            S
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Samiksha</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--emerald)' }}>Active now</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Instagram</div>
        </div>

        {/* Messages */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '300px' }}>
          {CHAT_MESSAGES.slice(0, visibleMsgs).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                alignSelf: msg.sender === 'her' ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
              }}
            >
              <div style={{
                padding: '10px 16px',
                borderRadius: msg.sender === 'her'
                  ? '18px 18px 18px 4px'
                  : '18px 18px 4px 18px',
                background: msg.sender === 'her'
                  ? 'rgba(255,154,203,0.12)'
                  : 'rgba(167,139,250,0.12)',
                border: `1px solid ${msg.sender === 'her'
                  ? 'rgba(255,154,203,0.2)'
                  : 'rgba(167,139,250,0.2)'}`,
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                marginTop: '4px',
                textAlign: msg.sender === 'her' ? 'left' : 'right',
                paddingLeft: '4px', paddingRight: '4px',
              }}>
                {msg.time}
              </div>
            </motion.div>
          ))}

          {visibleMsgs < CHAT_MESSAGES.length && inView && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '8px' }}
            >
              typing...
            </motion.div>
          )}
        </div>
      </div>

      {/* Split Visual */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          maxWidth: '420px',
          width: '100%',
          marginTop: '32px',
        }}
      >
        <div style={{
          background: 'rgba(255,154,203,0.08)',
          border: '1px solid rgba(255,154,203,0.15)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🌸</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--pink)', fontWeight: 600, marginBottom: '4px' }}>Banaras</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Her world</div>
        </div>
        <div style={{
          background: 'rgba(167,139,250,0.08)',
          border: '1px solid rgba(167,139,250,0.15)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🌙</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--purple)', fontWeight: 600, marginBottom: '4px' }}>IIT Tirupati</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>My world</div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          marginTop: '24px',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        Different places... same connection.
      </motion.p>
    </section>
  );
}
