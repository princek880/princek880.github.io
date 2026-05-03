import React from 'react';
import { motion } from 'framer-motion';

/* Bauhaus Icons */
const GraduationCapIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const teachingItems = [
  {
    role: 'TEACHING ASSISTANT',
    title: 'Foundations of Computational Physics',
    period: 'AUG 2025 – NOV 2025',
    Icon: GraduationCapIcon,
    color: 'var(--red)',
    description:
      'Assisted Prof. Prabhat Pujahari. Taught numerical methods, Python/C++, ROOT, and ML modules to ~50 undergraduates. Led weekly lab sessions.',
  },
  {
    role: 'SAATHI MENTOR',
    title: 'IIT Madras Peer Mentorship Programme',
    period: 'JUL 2024 – PRESENT',
    Icon: UsersIcon,
    color: 'var(--blue)',
    description:
      'Mentoring junior undergraduate students at IIT Madras, guiding their transition from school to college academic life and hostel culture.',
  },
  {
    role: 'SHIKSHA PRAYAS MENTOR',
    title: 'Community Outreach Initiative',
    period: 'JAN 2023 – MAR 2024',
    Icon: HeartIcon,
    color: 'var(--yellow)',
    description:
      'Mentored underprivileged high-school students from Haryana, guiding their academic development and achieving satisfactory results.',
  },
];

const Teaching = () => (
  <section id="teaching" style={{ borderBottom: '4px solid var(--border)' }}>
    <div className="container">
      <h2 className="section-title">
        <span className="section-number">05</span> TEACHING & MENTORSHIP
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {teachingItems.map(({ role, title, period, Icon, color, description }, i) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bauhaus-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.2rem',
              transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out'
            }}
          >
            <div style={{ 
              width: '60px', height: '60px', 
              backgroundColor: color, 
              border: '3px solid var(--border)', 
              boxShadow: '4px 4px 0px 0px var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: color === 'var(--yellow)' ? 'black' : 'white',
              borderRadius: i % 2 === 0 ? '50%' : '0'
            }}>
              <Icon />
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
                {role}
              </h3>
              <p style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', color: color === 'var(--yellow)' ? 'var(--blue)' : color, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                {period}
              </p>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                {title}
              </p>
              <p style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {description}
              </p>
            </div>
            
            {/* Bauhaus detail */}
            <div style={{ 
              position: 'absolute', top: '20px', right: '20px', 
              width: '16px', height: '16px', 
              backgroundColor: 'var(--border)', 
              borderRadius: '50%' 
            }} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Teaching;
