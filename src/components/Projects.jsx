import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

/* ── Status badge ───────────────────────────────────────── */
const STATUS = {
  published: { label: 'PUBLISHED',  color: 'var(--red)' },
  ongoing:   { label: 'ONGOING',    color: 'var(--yellow)' },
  completed: { label: 'COMPLETED',  color: 'var(--blue)' },
};

/* ── Project Card ──────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const st = STATUS[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="bauhaus-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2.5rem', filter: 'grayscale(1)' }}>{project.emoji}</span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '0.2rem 0.6rem',
            color: 'white',
            background: st.color === 'var(--yellow)' ? 'black' : st.color,
            border: '2px solid var(--border)',
            boxShadow: '2px 2px 0px 0px var(--border)',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
            {st.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
          {project.title}
        </h3>
        <p style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', color: project.color || 'var(--blue)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
          {project.category} · {project.year}
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>
          {project.tagline}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={t} style={{
              fontSize: '0.7rem',
              fontWeight: 900,
              padding: '0.2rem 0.6rem',
              background: 'white',
              color: 'var(--text-primary)',
              border: '2px solid var(--border)',
              boxShadow: '2px 2px 0px 0px var(--border)',
              borderRadius: i % 2 === 0 ? '50%' : '0'
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/projects/${project.id}`}
          className="btn-primary"
          style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
        >
          VIEW PROJECT <ArrowUpRight size={18} strokeWidth={3} />
        </Link>
      </div>
    </motion.div>
  );
};

/* ── Section ────────────────────────────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(PROJECTS.map(p => p.category.split(' · ')[0]))];

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.startsWith(filter));

  return (
    <section id="projects" style={{ borderBottom: '4px solid var(--border)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">06</span> PROJECTS
        </h2>

        {/* Category filter boxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.6rem 1.2rem',
                border: '3px solid var(--border)',
                background: filter === cat ? 'var(--blue)' : 'white',
                color: filter === cat ? 'white' : 'var(--text-primary)',
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.1s ease-out',
                textTransform: 'uppercase',
                boxShadow: filter === cat ? 'none' : '4px 4px 0px 0px var(--border)',
                transform: filter === cat ? 'translate(4px, 4px)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
