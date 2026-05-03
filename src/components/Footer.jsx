import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GitHubIcon = ({ size = 20 }) => (
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

const SOCIALS = [
  { Icon: GitHubIcon,   href: 'https://github.com/prince-kumar-99',                  label: 'GitHub' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/prince-kumar-9426631b1/', label: 'LinkedIn' },
  { Icon: XIcon,        href: 'https://twitter.com/PrinceK7040',                     label: 'X / Twitter' },
  { Icon: Mail,         href: 'mailto:prince.kumar@cern.ch',               label: 'Email' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '4px solid var(--border)', background: 'white', padding: '4rem 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>

        {/* Geometric Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--red)', borderRadius: '50%', border: '2px solid var(--border)' }} />
            <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--blue)', border: '2px solid var(--border)' }} />
            <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--yellow)', border: '2px solid var(--border)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          PRINCE KUMAR
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              whileHover={{ y: -4, x: -4, boxShadow: '6px 6px 0px 0px var(--border)' }}
              style={{ 
                color: 'var(--text-primary)', 
                background: 'white',
                border: '3px solid var(--border)',
                padding: '0.6rem',
                display: 'flex',
                boxShadow: '4px 4px 0px 0px var(--border)',
                transition: 'all 0.1s ease-out'
              }}
            >
              <Icon size={20} strokeWidth={3} />
            </motion.a>
          ))}
        </div>

        {/* Attribution */}
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            DESIGNED & BUILT BY <span style={{ color: 'var(--red)' }}>PRINCE KUMAR</span> · © {year}
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase' }}>
            REACT · VITE · FRAMER MOTION · EMAILJS
          </p>
        </div>

        {/* Bauhaus detail */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
           <div style={{ width: '20px', height: '4px', background: 'var(--red)' }} />
           <div style={{ width: '20px', height: '4px', background: 'var(--blue)' }} />
           <div style={{ width: '20px', height: '4px', background: 'var(--yellow)' }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
