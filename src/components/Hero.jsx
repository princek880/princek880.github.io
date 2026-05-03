import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, FileText, ChevronRight } from 'lucide-react';

/* ── Typing effect hook ─────────────────────────────────── */
const ROLES = [
  'EXPERIMENTAL PHYSICIST',
  'ML RESEARCH ENGINEER',
  'CMS COLLABORATOR',
  'FPGA DEVELOPER',
];

function useTypingEffect(words, typingSpeed = 55, deletingSpeed = 30, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[idx % words.length];
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 300);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), deletingSpeed);
      } else {
        setIdx(i => i + 1);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, idx, phase, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ── Stats ─────────────────────────────────────────────── */
const STATS = [
  { value: '4',    label: 'PUBLICATIONS' },
  { value: '50+',  label: 'GB PROCESSED' },
  { value: '3',    label: 'CONFERENCES' },
];

const Hero = () => {
  const typedRole = useTypingEffect(ROLES);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        padding: 0, // Reset section padding
        borderBottom: '4px solid var(--border)',
      }}
    >
      {/* ── Left Column: Intro & Bio ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 3rem',
        backgroundColor: 'var(--bg)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              display: 'inline-block',
              padding: '0.2rem 0.8rem',
              border: '3px solid var(--border)',
              backgroundColor: 'var(--yellow)',
              boxShadow: '4px 4px 0px 0px var(--border)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Portfolio & Research
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              marginBottom: '1rem',
            }}
          >
            PRINCE KUMAR
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center' }}
          >
            <span
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 900,
                color: 'var(--blue)',
              }}
            >
              {typedRole}
            </span>
            <span style={{ backgroundColor: 'var(--blue)', marginLeft: '8px', height: '80%', width: '6px' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              fontSize: '1.1rem', 
              marginBottom: '3rem',
              maxWidth: '35rem',
            }}
          >
            Bridging the gap between fundamental physics and advanced computation. I build <strong>graph neural networks</strong> for jet tagging and engineer <strong>high-speed FPGA firmware</strong> for detector readout at CERN's CMS & ATLAS experiments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <a href="#research" className="btn-primary">
              VIEW RESEARCH <ChevronRight size={20} strokeWidth={3} />
            </a>
            <a href="/PrinceK_PhD_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              DOWNLOAD CV <FileText size={20} strokeWidth={3} />
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem', 
              marginTop: '4rem',
              borderTop: '4px solid var(--border)',
              paddingTop: '2rem'
            }}
          >
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--red)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.5rem', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Right Column: Bauhaus Geometric Composition ── */}
      <div style={{
        backgroundColor: 'var(--blue)',
        borderLeft: '4px solid var(--border)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '400px'
      }}>
        {/* Abstract geometric "face" constructed from circles, squares */}
        <div style={{ position: 'relative', width: '300px', height: '400px' }}>
          {/* Base Red Circle */}
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ position: 'absolute', top: '10%', left: '10%', width: '240px', height: '240px', backgroundColor: 'var(--red)', border: '6px solid var(--border)', borderRadius: '50%', boxShadow: '12px 12px 0px 0px var(--border)' }} 
          />
          {/* Yellow Rotated Square */}
          <motion.div 
            initial={{ scale: 0, rotate: 0 }} animate={{ scale: 1, rotate: 45 }} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            style={{ position: 'absolute', top: '30%', left: '30%', width: '180px', height: '180px', backgroundColor: 'var(--yellow)', border: '6px solid var(--border)', boxShadow: '12px 12px 0px 0px var(--border)' }} 
          />
          {/* White Centered Square */}
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            style={{ position: 'absolute', top: '40%', left: '15%', width: '120px', height: '120px', backgroundColor: '#FFFFFF', border: '6px solid var(--border)', boxShadow: '12px 12px 0px 0px var(--border)' }} 
          />
          {/* Blue Triangle over it */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            style={{ position: 'absolute', top: '55%', left: '25%', width: '80px', height: '80px', backgroundColor: 'var(--blue)', border: '6px solid var(--border)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
