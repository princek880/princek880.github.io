import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Hobby Data ─────────────────────────────────────────── */
const HOBBIES = [
  {
    id: 'drawing',
    icon: '✏️',
    title: 'DRAWING',
    subtitle: 'Sketching & Digital Art',
    color: 'var(--red)',
    shape: 'circle',
    description:
      'From quick pencil sketches in the margins of lecture notes to digital illustration, drawing is how I process ideas visually. Physics diagrams, architectural doodles, and the occasional portrait.',
    tags: ['PENCIL SKETCH', 'DIGITAL ART', 'ILLUSTRATION'],
    fact: 'I\'ve sketched Feynman diagrams by hand more times than I can count.',
  },
  {
    id: 'travelling',
    icon: '✈️',
    title: 'TRAVELLING',
    subtitle: 'Exploring Places & Cultures',
    color: 'var(--blue)',
    shape: 'square',
    description:
      'Every new city is a data point in a grand experiment. From the particle physics labs of Marseille to the backstreets of Chennai, I collect experiences like I collect datasets — obsessively.',
    tags: ['EUROPE', 'INDIA', 'PHYSICS LABS'],
    fact: 'I\'ve visited CERN in Geneva and presented at a conference in Marseille, France.',
  },
  {
    id: 'food',
    icon: '🍜',
    title: 'EXPLORING NEW FOOD',
    subtitle: 'Culinary Adventures',
    color: 'var(--yellow)',
    shape: 'triangle',
    description:
      'Food is chemistry you can eat. I approach menus like a physicist approaches an unknown system — with curiosity, no assumptions, and a willingness to be surprised. South Indian tiffin to French crêpes.',
    tags: ['SOUTH INDIAN', 'STREET FOOD', 'FRENCH CUISINE'],
    fact: 'My favourite equation: spice + heat + time = perfect flavour.',
  },
];

/* ── Shape Decoration ─────────────────────────────────────── */
const ShapeDecor = ({ shape, color, size = 40 }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: color,
    border: '3px solid var(--border)',
    borderRadius: shape === 'circle' ? '50%' : '0',
    clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
    boxShadow: '4px 4px 0px 0px var(--border)',
    flexShrink: 0,
  }} />
);

/* ── Hobby Card ────────────────────────────────────────────── */
const HobbyCard = ({ hobby, index, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <div
      className="bauhaus-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        height: '100%',
        backgroundColor: isActive ? hobby.color : 'white',
        color: isActive && hobby.color === 'var(--yellow)' ? 'black' : isActive ? 'white' : 'var(--text-primary)',
        transition: 'background-color 0.2s ease-out, color 0.2s ease-out',
        borderColor: isActive ? 'var(--border)' : 'var(--border)',
      }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '2.5rem', filter: isActive ? 'none' : 'grayscale(1)', transition: 'filter 0.2s' }}>
          {hobby.icon}
        </span>
        <ShapeDecor
          shape={hobby.shape}
          color={isActive ? (hobby.color === 'var(--yellow)' ? 'black' : 'white') : hobby.color}
          size={28}
        />
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          marginBottom: '0.2rem',
          color: 'inherit',
        }}>
          {hobby.title}
        </h3>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: 0.75,
          color: 'inherit',
        }}>
          {hobby.subtitle}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
        {hobby.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontSize: '0.65rem',
              fontWeight: 900,
              padding: '0.2rem 0.5rem',
              border: `2px solid ${isActive ? (hobby.color === 'var(--yellow)' ? 'black' : 'white') : 'var(--border)'}`,
              background: 'transparent',
              color: 'inherit',
              letterSpacing: '0.08em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Click hint */}
      {!isActive && (
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Click to explore →
        </p>
      )}
    </div>
  </motion.div>
);

/* ── Section ────────────────────────────────────────────────── */
const Hobbies = () => {
  const [activeId, setActiveId] = useState(null);
  const active = HOBBIES.find(h => h.id === activeId);

  return (
    <section id="hobbies" style={{ borderBottom: '4px solid var(--border)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">08</span> HOBBIES &amp; INTERESTS
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: active ? '3rem' : '0',
        }}>
          {HOBBIES.map((hobby, i) => (
            <HobbyCard
              key={hobby.id}
              hobby={hobby}
              index={i}
              isActive={activeId === hobby.id}
              onClick={() => setActiveId(activeId === hobby.id ? null : hobby.id)}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="bauhaus-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center',
                  backgroundColor: active.color,
                  color: active.color === 'var(--yellow)' ? 'black' : 'white',
                }}
              >
                {/* Left: description */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '3rem' }}>{active.icon}</span>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'inherit', lineHeight: 1 }}>
                      {active.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: 'inherit',
                    opacity: 0.9,
                  }}>
                    {active.description}
                  </p>
                </div>

                {/* Right: fun fact card */}
                <div style={{
                  background: 'white',
                  border: '4px solid var(--border)',
                  boxShadow: '8px 8px 0px 0px var(--border)',
                  padding: '2rem',
                  color: 'var(--text-primary)',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: active.color === 'var(--yellow)' ? 'var(--blue)' : active.color,
                    marginBottom: '1rem',
                  }}>
                    FUN FACT
                  </div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{active.fact}"
                  </p>
                  {/* Bauhaus decoration */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
                    <div style={{ width: 16, height: 16, background: 'var(--red)', border: '2px solid var(--border)', borderRadius: '50%' }} />
                    <div style={{ width: 16, height: 16, background: 'var(--blue)', border: '2px solid var(--border)' }} />
                    <div style={{ width: 16, height: 16, background: 'var(--yellow)', border: '2px solid var(--border)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hobbies;
