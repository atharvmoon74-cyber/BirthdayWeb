import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hearts: { x: number; y: number; alpha: number; size: number; vx: number; vy: number }[] = [];
    let lastX = 0, lastY = 0;

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ff9acb';
      ctx.shadowColor = '#ff9acb';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      const s = size;
      ctx.moveTo(x, y + s / 4);
      ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s / 4);
      ctx.bezierCurveTo(x - s / 2, y + s / 2, x, y + s * 0.6, x, y + s * 0.8);
      ctx.bezierCurveTo(x, y + s * 0.6, x + s / 2, y + s / 2, x + s / 2, y + s / 4);
      ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s / 4);
      ctx.fill();
      ctx.restore();
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) > 25) {
        hearts.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.5,
          size: 7 + Math.random() * 5,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.5 - 0.5,
        });
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.x += h.vx;
        h.y += h.vy;
        h.alpha -= 0.012;
        if (h.alpha <= 0) {
          hearts.splice(i, 1);
          continue;
        }
        drawHeart(h.x, h.y, h.size, h.alpha);
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        pointerEvents: 'none',
      }}
    />
  );
}
