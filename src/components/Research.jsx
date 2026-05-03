import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const publications = [
  {
    type: 'CMS PUBLIC NOTE',
    id: 'CMS-DP-2025-035',
    title: 'A NOVEL TRACK FINDING ALGORITHM TO IDENTIFY B-HADRONS IN B-JETS USING FUSIONNET: A GEOMETRIC DEEP LEARNING MODEL',
    subtitle: 'Lead Author · CERN CDS.',
    link: 'https://cds.cern.ch/record/2937581',
    tags: ['CERN CDS', 'GNN', 'GEOMETRIC DL'],
    color: 'var(--blue)',
  },
  {
    type: 'EPS-HEP 2025',
    id: 'CONFERENCE PROCEEDING',
    title: 'B-HADRON IDENTIFICATION IN B-JETS USING A NOVEL DEEP LEARNING TECHNIQUE IN PP AND PBPB COLLISIONS IN CMS',
    subtitle: 'Speaker · Marseille, France. PoS.',
    link: 'https://doi.org/10.22323/1.485.0664',
    tags: ['CMS COLLABORATION', 'SPEAKER', 'MARSEILLE'],
    color: 'var(--red)',
  },
  {
    type: 'EUCAIF 2025',
    id: 'POSTER PRESENTATION',
    title: 'B-HADRON IDENTIFICATION IN B-JETS USING A NOVEL DEEP LEARNING TECHNIQUE IN PP COLLISIONS IN CMS',
    subtitle: 'Poster · European Committee for AI in Fundamental Physics, Italy.',
    tags: ['AI IN PHYSICS', 'SARDINIA', 'GNN'],
    color: 'var(--yellow)',
  },
  {
    type: 'AIRSS 2025',
    id: 'POSTER PRESENTATION',
    title: 'B-HADRON IDENTIFICATION IN B-JETS USING A NOVEL DEEP LEARNING TECHNIQUE IN PP AND PBPB COLLISIONS IN CMS',
    subtitle: 'Poster · All India Research Scholars Summit (AIRSS), IIT Madras.',
    tags: ['IIT MADRAS', 'HEAVY ION', 'GNN'],
    color: 'var(--red)',
  },
  {
    type: 'CFI OPEN HOUSE 2024',
    id: 'POSTER PRESENTATION',
    title: 'GALAXY COLLISION SIMULATION WITH ADAPTIVE N-BODY INTEGRATION',
    subtitle: 'Poster · CFI Open House 2024, IIT Madras.',
    tags: ['ASTROSTELLAR', 'N-BODY', 'SIMULATION'],
    color: 'var(--blue)',
  },
];

const Research = () => (
  <section id="research" style={{ borderBottom: '4px solid var(--border)' }}>
    <div className="container">
      <h2 className="section-title">
        <span className="section-number">04</span> RESEARCH OUTPUT
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {publications.map((pub, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bauhaus-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <span className="tag" style={{ backgroundColor: pub.color, color: pub.color === 'var(--yellow)' ? 'black' : 'white', fontSize: '0.75rem' }}>
                {pub.type}
              </span>
              {pub.link && (
                <a href={pub.link} target="_blank" rel="noopener noreferrer" aria-label="Open publication"
                  style={{ color: 'var(--border)', transition: 'transform 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                  <ExternalLink size={24} strokeWidth={3} />
                </a>
              )}
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: pub.color === 'var(--yellow)' ? 'var(--blue)' : pub.color }}>
                {pub.id}
              </h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 900, lineHeight: 1.2, color: 'var(--text-primary)' }}>
                {pub.title}
              </p>
              <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                {pub.subtitle}
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
              {pub.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: 'var(--bg)',
                  padding: '0.2rem 0.6rem',
                  border: '2px solid var(--border)',
                  boxShadow: '2px 2px 0px 0px var(--border)'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Geometric Decoration */}
            <div style={{ 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px', 
              width: '12px', 
              height: '12px', 
              backgroundColor: pub.color, 
              border: '2px solid var(--border)',
              borderRadius: i % 2 === 0 ? '50%' : '0'
            }} />
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Research;
