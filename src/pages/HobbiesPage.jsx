import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

/* ── Hobby Data ─────────────────────────────────────────── */
const HOBBIES = [
  {
    id: 'drawing',
    icon: '✏️',
    title: 'DRAWING',
    subtitle: 'Sketching & Digital Art',
    color: 'var(--red)',
    shape: 'circle',
    accentText: 'white',
    description: [
      'Drawing has been my oldest hobby — long before physics or programming. I use it to think visually, sketch out experiment setups, and occasionally make actual art.',
      'From pencil portraits to Feynman diagram doodles in lecture margins, drawing bridges the abstract and the concrete for me in a way no other medium does.',
    ],
    highlights: [
      'Pencil & charcoal portraiture',
      'Architecture & perspective sketching',
      'Physics diagram illustration',
      'Digital art & vector composition',
    ],
    quote: '"Every physicist is a failed artist — I\'m just the one who kept drawing."',
  },
  {
    id: 'travelling',
    icon: '✈️',
    title: 'TRAVELLING',
    subtitle: 'Exploring Places & Cultures',
    color: 'var(--blue)',
    shape: 'square',
    accentText: 'white',
    description: [
      'Every new place is a new dataset. Travelling rewires the way I see problems — different cultures approach the same challenges with radically different assumptions.',
      'Physics has taken me far: conference halls in Marseille, CERN corridors in Geneva, and collaborative labs across India. Each trip expands the mental model.',
    ],
    highlights: [
      'Marseille, France — EPS-HEP 2025 speaker',
      'Geneva, Switzerland — CERN visits',
      'Sardinia, Italy — EUCAIF 2025',
      'Across India — IIT campuses & conferences',
    ],
    quote: '"Travel is just scientific fieldwork for understanding humans."',
  },
  {
    id: 'food',
    icon: '🍜',
    title: 'EXPLORING NEW FOOD',
    subtitle: 'Culinary Adventures',
    color: 'var(--yellow)',
    shape: 'triangle',
    accentText: 'black',
    description: [
      'Food is applied chemistry. I approach menus the way I approach an unknown physical system — with curiosity, no prior assumptions, and zero fear of making a mistake.',
      'From late-night South Indian tiffin in Chennai to French crêpes near École Polytechnique, I believe food is the fastest way to understand any place or culture.',
    ],
    highlights: [
      'South Indian tiffin & filter coffee',
      'French cuisine & street crêpes',
      'Experimental fusion cooking',
      'Seeking the spiciest dish everywhere',
    ],
    quote: '"The best algorithm for discovering a city: follow your nose."',
  },
];

/* ── Shape Component ────────────────────────────────────── */
const Shape = ({ type, color, size, style = {} }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: color,
    border: '4px solid var(--border)',
    borderRadius: type === 'circle' ? '50%' : '0',
    clipPath: type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
    boxShadow: '6px 6px 0px 0px var(--border)',
    flexShrink: 0,
    ...style,
  }} />
);

/* ── Hobby Card ─────────────────────────────────────────── */
const HobbyCard = ({ hobby, index, isActive, onToggle }) => {
  const isYellow = hobby.color === 'var(--yellow)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      layout
    >
      {/* Main Card */}
      <div
        className="bauhaus-card"
        onClick={onToggle}
        style={{
          cursor: 'pointer',
          backgroundColor: isActive ? hobby.color : 'white',
          color: isActive ? hobby.accentText : 'var(--text-primary)',
          transition: 'background-color 0.25s, color 0.25s, box-shadow 0.2s, transform 0.2s',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          userSelect: 'none',
        }}
      >
        {/* Top Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '3rem', transition: 'filter 0.2s', filter: isActive ? 'none' : 'grayscale(1)' }}>
            {hobby.icon}
          </span>
          <Shape
            type={hobby.shape}
            color={isActive ? (isYellow ? '#121212' : 'white') : hobby.color}
            size={32}
          />
        </div>

        {/* Title block */}
        <div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 900,
            marginBottom: '0.3rem',
            color: 'inherit',
          }}>
            {hobby.title}
          </h2>
          <p style={{
            fontSize: '0.85rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.7,
            color: 'inherit',
          }}>
            {hobby.subtitle}
          </p>
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
          {hobby.highlights.slice(0, 2).map(h => (
            <span key={h} style={{
              fontSize: '0.65rem',
              fontWeight: 900,
              padding: '0.2rem 0.6rem',
              border: `2px solid ${isActive ? (isYellow ? '#121212' : 'white') : 'var(--border)'}`,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'inherit',
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Toggle hint */}
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          opacity: 0.6,
          color: 'inherit',
          borderTop: `2px solid ${isActive ? (isYellow ? '#121212' : 'rgba(255,255,255,0.4)') : 'var(--border)'}`,
          paddingTop: '1rem',
        }}>
          {isActive ? 'CLICK TO COLLAPSE ↑' : 'CLICK TO EXPLORE →'}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ overflow: 'hidden', marginTop: '0.5rem' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {/* Description */}
              <div className="bauhaus-card" style={{ backgroundColor: 'white' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: hobby.color === 'var(--yellow)' ? 'var(--blue)' : hobby.color, marginBottom: '1.2rem' }}>
                  ABOUT THIS HOBBY
                </h3>
                {hobby.description.map((para, i) => (
                  <p key={i} style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: i < hobby.description.length - 1 ? '1rem' : 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Highlights + Quote */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="bauhaus-card" style={{ backgroundColor: hobby.color, color: hobby.accentText }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.2rem', color: 'inherit', opacity: 0.8 }}>
                    HIGHLIGHTS
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {hobby.highlights.map((h, i) => (
                      <li key={h} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', fontSize: '0.95rem', fontWeight: 700, color: 'inherit' }}>
                        <span style={{
                          width: 10, height: 10,
                          backgroundColor: isYellow ? '#121212' : 'white',
                          border: `2px solid ${isYellow ? '#121212' : 'white'}`,
                          borderRadius: i % 2 === 0 ? '50%' : '0',
                          marginTop: '0.3rem', flexShrink: 0,
                        }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bauhaus-card" style={{ backgroundColor: 'white' }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {hobby.quote}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '1rem' }}>
                    <div style={{ width: 12, height: 12, background: 'var(--red)', border: '2px solid var(--border)', borderRadius: '50%' }} />
                    <div style={{ width: 12, height: 12, background: 'var(--blue)', border: '2px solid var(--border)' }} />
                    <div style={{ width: 12, height: 12, background: 'var(--yellow)', border: '2px solid var(--border)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Page ───────────────────────────────────────────────── */
const HobbiesPage = () => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const toggle = (id) => setActiveId(prev => prev === id ? null : id);

  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main style={{ paddingTop: '6rem', minHeight: '100vh' }}>

        {/* ── Page Hero ── */}
        <section style={{
          borderBottom: '4px solid var(--border)',
          padding: '5rem 0 4rem',
          background: 'rgba(240,240,240,0.88)',
        }}>
          <div className="container">
            {/* Back link */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 900,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '2.5rem',
              }}
            >
              <ArrowLeft size={16} strokeWidth={3} /> BACK TO PORTFOLIO
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.8rem',
                    border: '3px solid var(--border)',
                    backgroundColor: 'var(--yellow)',
                    boxShadow: '4px 4px 0px 0px var(--border)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Life Outside the Lab
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1.5rem', lineHeight: 0.95 }}
                >
                  HOBBIES &amp;<br />INTERESTS
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-secondary)', maxWidth: '34rem', lineHeight: 1.7 }}
                >
                  Physics keeps the brain busy. These three things keep everything else alive.
                  Click any card below to learn more.
                </motion.p>
              </div>

              {/* Bauhaus Geometric Cluster */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ position: 'relative', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Shape type="circle" color="var(--red)"    size={100} style={{ position: 'absolute', top: '10%',  left: '15%' }} />
                <Shape type="square" color="var(--blue)"   size={80}  style={{ position: 'absolute', top: '30%',  left: '45%', transform: 'rotate(15deg)' }} />
                <Shape type="triangle" color="var(--yellow)" size={90} style={{ position: 'absolute', top: '5%', left: '55%' }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Hobby Cards ── */}
        <section style={{ padding: '5rem 0 6rem', borderBottom: 'none' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {HOBBIES.map((hobby, i) => (
              <HobbyCard
                key={hobby.id}
                hobby={hobby}
                index={i}
                isActive={activeId === hobby.id}
                onToggle={() => toggle(hobby.id)}
              />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default HobbiesPage;
