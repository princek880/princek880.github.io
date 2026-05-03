import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Hash, FileText, ArrowRight, ExternalLink, Command } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const NAV_SECTIONS = [
  { label: 'ABOUT',      href: '#about' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'RESEARCH',   href: '#research' },
  { label: 'TEACHING',   href: '#teaching' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'CONTACT',    href: '#contact' },
];

const ALL_ITEMS = [
  ...NAV_SECTIONS.map(s => ({
    type: 'SECTION',
    label: s.label,
    sub: 'JUMP TO SECTION',
    icon: Hash,
    action: s.href,
  })),
  ...PROJECTS.map(p => ({
    type: 'PROJECT',
    label: p.title.toUpperCase(),
    sub: p.tagline.toUpperCase(),
    icon: FileText,
    action: `/projects/${p.id}`,
    color: p.color,
    emoji: p.emoji,
  })),
  {
    type: 'LINK',
    label: 'DOWNLOAD CV',
    sub: 'PDF — PRINCEK_PHD_CV.PDF',
    icon: ExternalLink,
    action: '/PrinceK_PhD_CV.pdf',
    external: true,
  },
  {
    type: 'LINK',
    label: 'GITHUB PROFILE',
    sub: 'GITHUB.COM/PRINCEK880',
    icon: ExternalLink,
    action: 'https://github.com/princek880',
    external: true,
  },
  {
    type: 'LINK',
    label: 'LINKEDIN',
    sub: 'LINKEDIN.COM/IN/PRINCE-KUMAR880',
    icon: ExternalLink,
    action: 'https://www.linkedin.com/in/prince-kumar880/',
    external: true,
  },
];

const CommandPalette = () => {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef            = useRef(null);
  const navigate            = useNavigate();

  const filtered = query.trim()
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()) || i.sub.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS;

  useEffect(() => { setCursor(0); }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
        setQuery('');
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const execute = useCallback((item) => {
    setOpen(false);
    setQuery('');
    if (item.type === 'SECTION') {
      const el = document.querySelector(item.action);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = item.action;
    } else if (item.external) {
      window.open(item.action, '_blank', 'noopener');
    } else {
      navigate(item.action);
    }
  }, [navigate]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === 'Enter' && filtered[cursor]) execute(filtered[cursor]);
  };

  const TYPE_COLORS = { SECTION: 'var(--blue)', PROJECT: 'var(--red)', LINK: 'var(--yellow)' };

  return (
    <>
      {/* ── Trigger hint ── */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90,
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          padding: '0.6rem 1.2rem',
          background: 'var(--yellow)',
          border: '4px solid var(--border)',
          color: 'var(--text-primary)', 
          fontWeight: 900, fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '6px 6px 0px 0px var(--border)',
          transition: 'all 0.1s ease-out',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '8px 8px 0px 0px var(--border)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '6px 6px 0px 0px var(--border)'; }}
      >
        <Command size={18} strokeWidth={3} />
        <span>⌘K</span>
      </motion.button>

      {/* ── Palette modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(18,18,18,0.8)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: '10vh',
            }}
          >
            <motion.div
              key="palette"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '600px', margin: '0 1rem',
                background: 'white',
                border: '6px solid var(--border)',
                boxShadow: '16px 16px 0px 0px var(--border)',
                overflow: 'hidden',
              }}
            >
              {/* Search bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', borderBottom: '6px solid var(--border)', background: 'var(--bg)' }}>
                <Search size={24} strokeWidth={3} style={{ color: 'var(--blue)' }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="SEARCH ANYTHING..."
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    color: 'var(--text-primary)', fontWeight: 900, fontSize: '1.2rem',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              {/* Results */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: 'var(--red)' }}>
                    NO RESULTS FOR "{query.toUpperCase()}"
                  </div>
                ) : (
                  filtered.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = i === cursor;
                    const color = TYPE_COLORS[item.type];
                    return (
                      <div
                        key={`${item.type}-${item.label}`}
                        onClick={() => execute(item)}
                        onMouseEnter={() => setCursor(i)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '1.5rem',
                          padding: '1.2rem 1.5rem',
                          background: isActive ? color : 'transparent',
                          color: isActive ? (color === 'var(--yellow)' ? 'black' : 'white') : 'var(--text-primary)',
                          cursor: 'pointer', borderBottom: '3px solid var(--border)',
                          transition: 'all 0.1s ease-out',
                        }}
                      >
                        {item.emoji ? (
                          <span style={{ fontSize: '1.5rem', width: '2rem', textAlign: 'center', filter: isActive ? 'none' : 'grayscale(1)' }}>{item.emoji}</span>
                        ) : (
                          <div style={{ 
                            width: '40px', height: '40px', 
                            backgroundColor: isActive ? 'white' : color, 
                            border: '3px solid var(--border)',
                            color: isActive ? color : (color === 'var(--yellow)' ? 'black' : 'white'),
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <Icon size={20} strokeWidth={3} />
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.sub}
                          </div>
                        </div>
                        {isActive && <ArrowRight size={24} strokeWidth={3} />}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', fontWeight: 900, fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><kbd style={{ border: '2px solid var(--border)', padding: '0 0.3rem' }}>↑↓</kbd> NAVIGATE</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><kbd style={{ border: '2px solid var(--border)', padding: '0 0.3rem' }}>↵</kbd> OPEN</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><kbd style={{ border: '2px solid var(--border)', padding: '0 0.3rem' }}>ESC</kbd> CLOSE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
