import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const experiences = [
  {
    role: 'Undergraduate Researcher — Space Lab',
    company: 'IIT Madras',
    location: 'PI: Dr. David Koilpillai',
    period: 'AUG 2025 – PRESENT',
    color: 'var(--blue)',
    shape: 'circle',
    description: [
      'Working on the SPEED Payload (Space-based Proton Electron Energy Detector) for the IITMSAT satellite.',
      'Performed Geant4 simulations for detector efficiency and cosmic muon response characterisation.',
      'Executed DAQ workflows using MC² Analyzer and debugged ADC-to-energy calibration mapping.',
    ],
  },
  {
    role: 'RPIT Research Fellow',
    company: 'LLR, École Polytechnique',
    location: 'PIs: Dr. Matthew Nguyen & Dr. Shamik Ghosh',
    period: 'JUN 2025 – AUG 2025',
    color: 'var(--red)',
    shape: 'square',
    link: 'https://polytechnique.edu',
    description: [
      'Research in CMS Experiment: Graph ML & jet substructure in high-energy hadronic collisions.',
      'Engineered FusionNet (GNN), outperforming Boosted Decision Trees by 5–15% in high signal-efficiency regions.',
      'Developed VGAE-based contrastive clustering for unsupervised jet substructure analysis.',
    ],
  },
  {
    role: 'Firmware Developer — Detector Dev Lab',
    company: 'IIT Madras',
    location: 'PI: Dr. Prafulla Kumar Behera',
    period: 'NOV 2024 – MAY 2025',
    color: 'var(--yellow)',
    shape: 'triangle',
    description: [
      'Hardware R&D for the ATLAS Experiment readout upgrade chain at CERN.',
      'Executed end-to-end FPGA workflow on ALINX board using Vivado toolchain.',
      'Ported firmware from KC705 to AXKU040 (Kintex Ultrascale) for Phase-II readout tests.',
    ],
  },
  {
    role: 'Young Research Fellow — EHEP Lab',
    company: 'IIT Madras',
    location: 'PI: Dr. Prabhat Pujahari',
    period: 'JUN 2024 – MAY 2025',
    color: 'var(--red)',
    shape: 'circle',
    description: [
      'Investigated the dead cone effect in pp/PbPb collisions using Graph Neural Networks.',
      'Built end-to-end framework with uproot/awkward-array to process 50 GB+ ROOT data files.',
      'Developed custom generator fragment for heavy-ion collision analysis in CMSSW.',
    ],
  },
  {
    role: 'Undergraduate Researcher — Computer Vision',
    company: 'Computational Imaging Lab',
    location: 'PI: Dr. Kaushik Mitra',
    period: 'JAN 2024 – MAY 2024',
    color: 'var(--blue)',
    shape: 'square',
    description: [
      'Developed GAN-based models with UNET architecture for lens flare artifact removal.',
      'Integrated Uformer, Restormer, NAFNet, Mamba blocks, and Retinexformer into the codebase.',
      'Achieved PSNR of 23.52 and SSIM of 0.66, and extended capabilities to video restoration.',
    ],
  },
];

const Experience = () => (
  <section id="experience" style={{ borderBottom: '4px solid var(--border)' }}>
    <div className="container" style={{ maxWidth: '900px' }}>
      <h2 className="section-title">
        <span className="section-number">03</span> EXPERIENCE
      </h2>

      <div style={{ position: 'relative', paddingLeft: '3rem' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '10px',
          top: 0,
          bottom: 0,
          width: '6px',
          background: 'var(--border)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              {/* Timeline marker */}
              <div style={{
                position: 'absolute', 
                left: '-40px', 
                top: '0',
                width: '30px', 
                height: '30px',
                backgroundColor: exp.color,
                border: '4px solid var(--border)',
                borderRadius: exp.shape === 'circle' ? '50%' : '0',
                clipPath: exp.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                boxShadow: '4px 4px 0px 0px var(--border)',
                zIndex: 2,
              }} />

              <div className="bauhaus-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{exp.role}</h3>
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer"
                          style={{ color: 'var(--red)', transition: 'transform 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                          <ExternalLink size={20} strokeWidth={3} />
                        </a>
                      )}
                    </div>
                    <p style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', color: exp.color === 'var(--yellow)' ? 'var(--blue)' : exp.color }}>
                      {exp.company} <span style={{ color: 'var(--text-muted)' }}>— {exp.location}</span>
                    </p>
                  </div>
                  <div style={{
                    fontWeight: 900, fontSize: '0.8rem',
                    color: 'var(--text-primary)', background: 'var(--yellow)',
                    border: '3px solid var(--border)', padding: '0.3rem 0.8rem',
                    boxShadow: '4px 4px 0px 0px var(--border)',
                  }}>
                    {exp.period}
                  </div>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {exp.description.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '1rem', fontSize: '1.05rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ 
                        width: '12px', height: '12px', 
                        backgroundColor: i % 2 === 0 ? 'var(--red)' : 'var(--blue)', 
                        border: '2px solid var(--border)',
                        marginTop: '0.4rem', flexShrink: 0,
                        borderRadius: j % 2 === 0 ? '0' : '50%'
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
