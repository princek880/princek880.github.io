import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const technologies = [
    'C++ / Python / ROOT',
    'Geant4 / Pythia8',
    'Verilog / VHDL (Vivado)',
    'PyTorch / PyG (GNNs)',
    'uproot / awkward-array',
    'LTSpice / KiCAD',
  ];

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">01</span> ABOUT ME
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* Text Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bauhaus-card"
          >
            {/* Geometric Corner Decoration */}
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', backgroundColor: 'var(--blue)', border: '3px solid var(--border)', borderRadius: '50%' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              <p>
                Hi there! 👋 I'm a final-year <strong style={{ color: 'var(--text-primary)' }}>Engineering Physics undergrad at IIT Madras</strong>.
                My work spans the full stack of experimental high-energy physics — from writing FPGA firmware to training graph neural networks that actually run in detector pipelines.
              </p>
              <p>
                I specialize in <strong style={{ color: 'var(--red)' }}>GNN-based track classification</strong> for the CMS experiment and developed firmware for the{' '}
                <strong style={{ color: 'var(--blue)' }}>ATLAS readout upgrade</strong> at CERN. Currently contributing to the{' '}
                <strong style={{ color: 'var(--yellow)' }}>SPEED payload</strong> aboard the IITMSAT satellite (ISRO launch).
              </p>

              <div style={{ marginTop: '1rem', borderTop: '3px solid var(--border)', paddingTop: '1.5rem' }}>
                <p style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  Core Technologies
                </p>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>
                  {technologies.map((tech, i) => (
                    <li key={tech} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        width: '12px', height: '12px', 
                        backgroundColor: i % 3 === 0 ? 'var(--red)' : i % 3 === 1 ? 'var(--blue)' : 'var(--yellow)', 
                        border: '2px solid var(--border)',
                        borderRadius: i % 2 === 0 ? '50%' : '0'
                      }} />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, x: -4, boxShadow: '16px 16px 0px 0px var(--border)' }}
            style={{ 
              position: 'relative', 
              width: '100%',
              maxWidth: '400px', 
              margin: '0 auto',
              marginBottom: '2.5rem', /* space for the overflowing label badge */
              border: '4px solid var(--border)',
              boxShadow: '8px 8px 0px 0px var(--border)',
              backgroundColor: 'white',
              transition: 'all 0.2s ease-out',
              overflow: 'visible', /* allow the label badge to overflow */
            }}
          >
            {/* Image Wrapper */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden' }}>
              <img
                src="https://raw.githubusercontent.com/princek880/princek880.github.io/main/Prince_workshop.JPG"
                alt="Prince Kumar at a physics hardware workshop"
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'grayscale(1)', transition: 'filter 0.3s ease-out'
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1)')}
              />
            </div>
            {/* Bold Label */}
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: 'var(--yellow)', border: '4px solid var(--border)', padding: '0.5rem 1rem', fontWeight: 900, textTransform: 'uppercase', boxShadow: '4px 4px 0px 0px var(--border)', zIndex: 2 }}>
              HARDWARE WORKSHOP
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
