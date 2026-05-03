import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLS = 14;
const ROWS = 14;
const CELL = 20;
const W = COLS * CELL;
const H = ROWS * CELL;

const DIRS = {
  UP:    { x: 0, y: -1 },
  DOWN:  { x: 0, y:  1 },
  LEFT:  { x:-1, y:  0 },
  RIGHT: { x: 1, y:  0 },
};
const OPPOSITE = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };

const KEY_MAP = {
  ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT',
  w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT',
  W:'UP', S:'DOWN', A:'LEFT', D:'RIGHT',
};

const INIT_SNAKE = [{ x:7,y:7 }, { x:6,y:7 }, { x:5,y:7 }];

function randomFood(snake) {
  let p;
  do { p = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) }; }
  while (snake.some(s => s.x===p.x && s.y===p.y));
  return p;
}

function drawSegment(ctx, x, y, index) {
  const cx = x * CELL + CELL/2, cy = y * CELL + CELL/2;
  const pad = 3;
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 3;

  if (index === 0) {
    // Head: red circle
    ctx.beginPath();
    ctx.arc(cx, cy, CELL/2 - pad, 0, Math.PI*2);
    ctx.fillStyle = '#D02020';
    ctx.fill(); ctx.stroke();
    // Eyes
    const eyeR = 2.5, ex = x*CELL + pad*2, ey = y*CELL + pad*2;
    ctx.beginPath(); ctx.arc(ex+6, ey+4, eyeR, 0, Math.PI*2);
    ctx.fillStyle = 'white'; ctx.fill();
    ctx.beginPath(); ctx.arc(ex+6, ey+4, 1.2, 0, Math.PI*2);
    ctx.fillStyle = '#121212'; ctx.fill();
  } else if (index % 2 === 1) {
    // Blue square
    ctx.fillStyle = '#1040C0';
    ctx.fillRect(x*CELL+pad, y*CELL+pad, CELL-pad*2, CELL-pad*2);
    ctx.strokeRect(x*CELL+pad, y*CELL+pad, CELL-pad*2, CELL-pad*2);
  } else {
    // Yellow triangle
    ctx.beginPath();
    ctx.moveTo(cx, y*CELL+pad);
    ctx.lineTo(x*CELL+CELL-pad, y*CELL+CELL-pad);
    ctx.lineTo(x*CELL+pad, y*CELL+CELL-pad);
    ctx.closePath();
    ctx.fillStyle = '#F0C020';
    ctx.fill(); ctx.stroke();
  }
}

function drawFood(ctx, x, y, tick) {
  const cx = x*CELL + CELL/2;
  const pulse = Math.sin(tick * 0.12) * 2;
  const pad = 3 - pulse * 0.5;
  ctx.beginPath();
  ctx.moveTo(cx, y*CELL + pad);
  ctx.lineTo(x*CELL + CELL - pad, y*CELL + CELL - pad);
  ctx.lineTo(x*CELL + pad, y*CELL + CELL - pad);
  ctx.closePath();
  ctx.fillStyle = '#F0C020';
  ctx.fill();
  ctx.strokeStyle = '#121212';
  ctx.lineWidth = 3;
  ctx.stroke();
}

const GeometricSnake = () => {
  const canvasRef = useRef(null);
  const g = useRef({
    snake: INIT_SNAKE.map(s => ({...s})),
    food: { x:11, y:7 },
    dir: 'RIGHT',
    nextDir: 'RIGHT',
    score: 0,
    speed: 170,
    state: 'idle',
    tick: 0,
    raf: null,
    lastTime: 0,
  });

  const [uiState, setUiState] = useState('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { snake, food, tick } = g.current;

    // Background
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(0, 0, W, H);
    // Dot grid
    ctx.fillStyle = '#d4d4d4';
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        ctx.arc(c*CELL + CELL/2, r*CELL + CELL/2, 1.2, 0, Math.PI*2);
        ctx.fill();
      }

    drawFood(ctx, food.x, food.y, tick);
    for (let i = snake.length-1; i >= 0; i--) drawSegment(ctx, snake[i].x, snake[i].y, i);

    // Border
    ctx.strokeStyle = '#121212';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, W-4, H-4);
  }, []);

  const step = useCallback(() => {
    const r = g.current;
    if (r.state !== 'playing') return;
    r.tick++;
    r.dir = r.nextDir;
    const d = DIRS[r.dir];
    const head = r.snake[0];
    const nh = { x: head.x + d.x, y: head.y + d.y };

    if (nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS ||
        r.snake.slice(0,-1).some(s => s.x===nh.x && s.y===nh.y)) {
      r.state = 'dead';
      setBest(prev => Math.max(prev, r.score));
      setUiState('dead');
      return;
    }

    const ate = nh.x===r.food.x && nh.y===r.food.y;
    r.snake = [nh, ...r.snake];
    if (!ate) r.snake.pop();
    else {
      r.score++;
      r.food = randomFood(r.snake);
      r.speed = Math.max(70, 170 - r.score * 7);
      setScore(r.score);
    }
  }, []);

  useEffect(() => {
    const loop = (time) => {
      g.current.raf = requestAnimationFrame(loop);
      if (g.current.state === 'playing' && time - g.current.lastTime >= g.current.speed) {
        step();
        g.current.lastTime = time;
      }
      draw();
    };
    g.current.raf = requestAnimationFrame(loop);
    return () => { if (g.current.raf) cancelAnimationFrame(g.current.raf); };
  }, [draw, step]);

  useEffect(() => {
    const onKey = (e) => {
      const r = g.current;
      const dk = KEY_MAP[e.key];
      if (!dk) return;
      if (r.state === 'playing') {
        e.preventDefault();
        if (OPPOSITE[dk] !== r.dir) r.nextDir = dk;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const touchPos = useRef(null);
  const onTouchStart = e => { touchPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = e => {
    if (!touchPos.current || g.current.state !== 'playing') return;
    const dx = e.changedTouches[0].clientX - touchPos.current.x;
    const dy = e.changedTouches[0].clientY - touchPos.current.y;
    const r = g.current;
    let dk;
    if (Math.abs(dx) > Math.abs(dy)) dk = dx > 0 ? 'RIGHT' : 'LEFT';
    else dk = dy > 0 ? 'DOWN' : 'UP';
    if (OPPOSITE[dk] !== r.dir) r.nextDir = dk;
  };

  const startGame = () => {
    const r = g.current;
    r.snake = INIT_SNAKE.map(s => ({...s}));
    r.food = randomFood(r.snake);
    r.dir = 'RIGHT'; r.nextDir = 'RIGHT';
    r.score = 0; r.speed = 170; r.tick = 0; r.lastTime = 0;
    r.state = 'playing';
    setScore(0); setUiState('playing');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.8rem', padding:'1.5rem 1rem' }}>
      {/* Score bar */}
      <div style={{ display:'flex', justifyContent:'space-between', width:W, maxWidth:'100%' }}>
        <div>
          <div style={{ fontSize:'0.6rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.6)', marginBottom:'0.2rem' }}>SCORE</div>
          <div style={{ fontSize:'2.2rem', fontWeight:900, color:'white', lineHeight:1 }}>{score}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:'0.6rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.6)', marginBottom:'0.2rem' }}>BEST</div>
          <div style={{ fontSize:'2.2rem', fontWeight:900, color:'#F0C020', lineHeight:1 }}>{best}</div>
        </div>
      </div>

      {/* Game canvas */}
      <div style={{ position:'relative' }}>
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display:'block', maxWidth:'100%', border:'4px solid #121212', boxShadow:'8px 8px 0px 0px #121212' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
        <AnimatePresence>
          {uiState !== 'playing' && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ position:'absolute', inset:0, backgroundColor:'rgba(16,64,192,0.93)',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.2rem' }}
            >
              {uiState === 'idle' && (
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.8rem', fontWeight:900, color:'white', letterSpacing:'-0.04em', marginBottom:'0.8rem' }}>SNAKE</div>
                  <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'0.8rem' }}>
                    {[['#D02020','50%'],['#1040C0','0'],['#F0C020','polygon(50% 0%,0% 100%,100% 100%)']].map(([c,r,clip],i) => (
                      <div key={i} style={{ width:18, height:18, backgroundColor:c, border:'2.5px solid #121212', borderRadius:r, clipPath:clip||'none' }} />
                    ))}
                  </div>
                  <div style={{ fontSize:'0.7rem', fontWeight:700, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.08em' }}>
                    ARROWS · WASD · SWIPE
                  </div>
                </div>
              )}
              {uiState === 'dead' && (
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.4rem', fontWeight:900, color:'#D02020', letterSpacing:'-0.02em', marginBottom:'0.4rem' }}>GAME OVER</div>
                  <div style={{ fontSize:'0.9rem', fontWeight:700, color:'white' }}>Score: {score}</div>
                </div>
              )}
              <button
                onClick={startGame}
                style={{ background:'#D02020', color:'white', border:'3px solid #121212', padding:'0.6rem 2rem',
                  fontWeight:900, fontSize:'1rem', textTransform:'uppercase', letterSpacing:'0.1em',
                  cursor:'pointer', boxShadow:'4px 4px 0px 0px #121212', fontFamily:'var(--font-sans)',
                  transition:'transform 0.1s, box-shadow 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='6px 6px 0px 0px #121212'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='4px 4px 0px 0px #121212'; }}
              >
                {uiState === 'dead' ? 'PLAY AGAIN' : 'PLAY'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:'1rem' }}>
        {[['circle','#D02020','HEAD'],['square','#1040C0','BODY'],['triangle','#F0C020','FOOD']].map(([s,c,l]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            <div style={{ width:12, height:12, backgroundColor:c, border:'2px solid #121212',
              borderRadius: s==='circle'?'50%':'0',
              clipPath: s==='triangle'?'polygon(50% 0%,0% 100%,100% 100%)':'none' }} />
            <span style={{ fontSize:'0.58rem', fontWeight:900, color:'rgba(255,255,255,0.65)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeometricSnake;
