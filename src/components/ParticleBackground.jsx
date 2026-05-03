import React, { useEffect, useRef } from 'react';

/**
 * Interactive Geometric Constellation
 * Nodes drift slowly. When the mouse approaches, nodes are gently attracted,
 * and elegant geometric lines connect the cursor to nearby nodes.
 */
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseout', onMouseLeave, { passive: true });

    /* ── Classy Onyx & Ivory Palette ── */
    const IVORY  = [226, 217, 200];
    const STONE  = [168, 162, 158];
    const BRONZE = [140, 132, 119];
    const PALETTES = [IVORY, IVORY, STONE, BRONZE];

    const COUNT = 80;
    const CONNECT_DIST = 150;
    const MOUSE_RADIUS = 200; // Increased radius for interaction

    class Node {
      constructor() { this.init(); }
      init() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 1.5 + 0.8;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.alpha     = this.baseAlpha;
        this.pulse     = Math.random() * Math.PI * 2;
        this.color     = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      }

      update(t) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges cleanly
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width  + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;

        this.pulse += 0.02;
        const pulseFactor = 0.5 + 0.5 * Math.sin(this.pulse);

        /* Mouse interaction physics */
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < MOUSE_RADIUS) {
          // Gentle attraction towards cursor
          const force = (1 - dist / MOUSE_RADIUS) * 0.02;
          this.vx += dx * force;
          this.vy += dy * force;
          // Brighten up when cursor is near
          this.alpha = Math.min(1, this.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.8);
        } else {
          // Normal pulse fade
          this.alpha += (this.baseAlpha * (0.5 + 0.5 * pulseFactor) - this.alpha) * 0.05;
        }

        /* Velocity damping to prevent infinite acceleration */
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.5) {
          this.vx *= 0.95;
          this.vy *= 0.95;
        }
      }

      draw() {
        const [r, g, b] = this.color;
        
        /* Core dot */
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
        ctx.fill();

        /* Ambient glow for brighter nodes */
        if (this.alpha > 0.6) {
          const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
          grd.addColorStop(0, `rgba(${r},${g},${b},${(this.alpha - 0.6) * 0.5})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }
    }

    const nodes = Array.from({ length: COUNT }, () => new Node());

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      /* Draw edges between nodes */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const strength = 1 - Math.pow(dist / CONNECT_DIST, 1.5); // Smoother fade
            const [r1,g1,b1] = a.color;
            const r = r1, g = g1, bv = b1; // Simplify to first node's color
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${bv},${strength * 0.15})`;
            ctx.lineWidth   = strength * 1.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* Draw interactive cursor geometry */
      if (mouse.x > 0 && mouse.y > 0) {
        nodes.forEach(n => {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const strength = 1 - dist / MOUSE_RADIUS;
            const [r,g,b] = n.color;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${b},${strength * 0.4})`;
            ctx.lineWidth = strength * 2;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      /* Draw nodes */
      nodes.forEach(n => { n.update(t); n.draw(); });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
};

export default NeuralBackground;
