import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

/* ── Inline SVG brand icons ─────────────────────────────── */
const GitHubIcon  = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const NAV_LINKS = [
  { name: 'ABOUT',      href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'RESEARCH',   href: '#research' },
  { name: 'PROJECTS',   href: '#projects' },
  { name: 'CONTACT',    href: '#contact' },
];

const SOCIALS = [
  { Icon: GitHubIcon,   href: 'https://github.com/prince-kumar-99',                  label: 'GitHub' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/prince-kumar-9426631b1/', label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://twitter.com/PrinceK7040',                     label: 'X / Twitter' },
];

const Navbar = () => {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'white',
        borderBottom: '4px solid var(--border)',
        padding: '1rem 0',
        boxShadow: scrolled ? '0px 8px 0px 0px rgba(18,18,18,0.1)' : 'none',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Geometric Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.05em' }}
        >
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--red)', borderRadius: '50%', border: '2px solid var(--border)' }} />
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--blue)', border: '2px solid var(--border)' }} />
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--yellow)', border: '2px solid var(--border)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          PRINCE
        </motion.a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>

          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ name, href }, i) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
              >
                <a
                  href={href}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', transition: 'color 0.18s', letterSpacing: '0.05em' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {name}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{ width: '4px', height: '1.5rem', background: 'var(--border)' }} />

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                style={{ color: 'var(--text-primary)', transition: 'transform 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Icon />
              </a>
            ))}
          </div>

          {/* Resume CTA */}
          <motion.a
            href="/PrinceK_PhD_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <FileText size={16} strokeWidth={3} /> RESUME
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden"
          style={{ background: 'var(--yellow)', border: '3px solid var(--border)', padding: '0.5rem', cursor: 'pointer', display: 'flex', boxShadow: '3px 3px 0px 0px var(--border)' }}
        >
          {open ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              borderBottom: '4px solid var(--border)',
              padding: '2rem 1.5rem',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {NAV_LINKS.map(({ name, href }, i) => (
                <li key={name}>
                  <a href={href} onClick={close}
                    style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', display: 'block' }}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '4px solid var(--border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ color: 'var(--text-primary)' }}>
                  <Icon size={24} />
                </a>
              ))}
              <a href="/PrinceK_PhD_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginLeft: 'auto', padding: '0.5rem 1rem' }}>
                <FileText size={16} strokeWidth={3} /> RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
