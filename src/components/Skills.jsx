import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVEL_CONFIG = {
  core:       { label: 'CORE',       dots: 4 },
  advanced:   { label: 'ADVANCED',   dots: 3 },
  proficient: { label: 'PROFICIENT', dots: 2 },
  familiar:   { label: 'FAMILIAR',   dots: 1 },
};

const SKILLS = [
  {
    id: 'physics',
    category: 'PHYSICS & SIM',
    color: 'var(--blue)',
    icon: '⚛️',
    desc: 'Detector simulation, data analysis, and phenomenology tools',
    tools: [
      { name: 'ROOT / TMVA',     level: 'core',       context: 'Daily use · CMS/ATLAS analysis pipelines' },
      { name: 'CMSSW',           level: 'advanced',   context: 'CMS software framework · event processing' },
      { name: 'Geant4',          level: 'advanced',   context: 'Detector sim · SPEED payload, ATLAS' },
      { name: 'Pythia8',         level: 'proficient', context: 'Monte Carlo event generation · heavy-ion' },
      { name: 'MC² Analyzer',    level: 'proficient', context: 'DAQ framework · IITMSAT satellite payload' },
      { name: 'FastJet',         level: 'familiar',   context: 'Jet clustering · underlying event sub.' },
    ],
  },
  {
    id: 'ml',
    category: 'MACHINE LEARNING',
    color: 'var(--red)',
    icon: '🧠',
    desc: 'Deep learning architectures for high-energy physics applications',
    tools: [
      { name: 'Python',              level: 'core',       context: 'Primary language · all ML projects' },
      { name: 'PyTorch',             level: 'core',       context: 'All neural network development' },
      { name: 'PyTorch Geometric',   level: 'advanced',   context: 'Graph NNs · FusionNet, VGAE, dead cone' },
      { name: 'Graph Neural Nets',   level: 'advanced',   context: 'GAT, GCN, message-passing architectures' },
      { name: 'VGAE / Contrastive',  level: 'advanced',   context: 'Unsupervised jet substructure clustering' },
      { name: 'XGBoost / BDT',       level: 'proficient', context: 'Benchmark comparisons · CMS b-tagging' },
      { name: 'scikit-learn',        level: 'proficient', context: 'Classical ML · clustering, evaluation' },
      { name: 'UMAP',                level: 'familiar',   context: 'Latent space visualization' },
    ],
  },
  {
    id: 'hardware',
    category: 'HARDWARE & FPGA',
    color: 'var(--yellow)',
    icon: '⚡',
    desc: 'FPGA design, verification, and detector readout systems',
    tools: [
      { name: 'Verilog / VHDL',       level: 'advanced',   context: 'RTL design · ATLAS FELIX readout' },
      { name: 'Vivado',               level: 'advanced',   context: 'Synthesis, impl, timing closure · Xilinx' },
      { name: 'Kintex Ultrascale',    level: 'proficient', context: 'AXKU040 board · ATLAS Phase-II upgrade' },
      { name: 'GBT Protocol',         level: 'proficient', context: '4.8 Gbps detector links · ATLAS' },
      { name: 'ILA / Chipscope',      level: 'proficient', context: 'On-chip debug · BER testing' },
      { name: 'LTSpice / KiCAD',      level: 'familiar',   context: 'Circuit simulation & PCB layout' },
    ],
  },
  {
    id: 'software',
    category: 'SOFTWARE & DATA',
    color: 'var(--blue)',
    icon: '💻',
    desc: 'Languages, data engineering, and scientific computing tools',
    tools: [
      { name: 'C++ (17/20)',           level: 'core',       context: 'Physics software, CMSSW, ROOT' },
      { name: 'uproot / awkward-array',level: 'advanced',   context: '50+ GB CMS ROOT data · Python pipeline' },
      { name: 'NumPy / SciPy',         level: 'advanced',   context: 'Numerical computing · daily use' },
      { name: 'Matplotlib / Plotly',   level: 'advanced',   context: 'Publication-quality physics plots' },
      { name: 'NetworkX',              level: 'proficient', context: 'Graph analysis · jet topology studies' },
      { name: 'Git / GitHub',          level: 'advanced',   context: 'Version control · all projects' },
      { name: 'Bash / TCL',            level: 'proficient', context: 'Scripting · Vivado automation' },
      { name: 'LaTeX',                 level: 'advanced',   context: 'Physics papers, talks, notes' },
    ],
  },
];

const ProfDots = ({ level, color }) => {
  const cfg = LEVEL_CONFIG[level];
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {[1,2,3,4].map(n => (
        <div key={n} style={{
          width: 8, height: 8,
          background: n <= cfg.dots ? color : 'transparent',
          border: '2px solid var(--border)',
          borderRadius: n % 2 === 0 ? '0%' : '50%', // Mixing squares and circles for Bauhaus flair
        }} />
      ))}
    </div>
  );
};

const ToolChip = ({ name, level, context, color }) => {
  return (
    <motion.div
      whileHover={{ y: -2, x: -2, boxShadow: '6px 6px 0px 0px var(--border)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.8rem 1.2rem',
        background: 'white',
        border: '3px solid var(--border)',
        boxShadow: '4px 4px 0px 0px var(--border)',
        cursor: 'default',
        transition: 'all 0.1s ease-out',
      }}
    >
      <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', flex: 1 }}>
        {name}
      </span>
      <ProfDots level={level} color={color} />
    </motion.div>
  );
};

const Skills = () => {
  const [activeId, setActiveId] = useState('physics');
  const active = SKILLS.find(s => s.id === activeId);

  return (
    <section id="skills" style={{ borderBottom: '4px solid var(--border)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">02</span> TECH STACK
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Category Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SKILLS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.5rem',
                  border: '4px solid var(--border)',
                  background: activeId === s.id ? s.color : 'white',
                  color: activeId === s.id && s.color !== 'var(--yellow)' ? 'white' : 'var(--text-primary)',
                  fontWeight: 900, fontSize: '0.9rem',
                  textAlign: 'left', cursor: 'pointer',
                  boxShadow: activeId === s.id ? 'none' : '6px 6px 0px 0px var(--border)',
                  transform: activeId === s.id ? 'translate(6px, 6px)' : 'none',
                  transition: 'all 0.1s ease-out',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                {s.category}
              </button>
            ))}
            
            {/* Legend Card */}
            <div className="bauhaus-card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              <div style={{ fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1rem' }}>PROFICIENCY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {Object.entries(LEVEL_CONFIG).map(([key, cfg]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ProfDots level={key} color="var(--border)" />
                    <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{cfg.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bauhaus-card"
              style={{ backgroundColor: active.color, color: active.color === 'var(--yellow)' ? 'black' : 'white' }}
            >
              <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '24px', height: '24px', backgroundColor: 'white', border: '3px solid var(--border)' }} />
              <p style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.5 }}>
                {active.desc}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + '-tools'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}
              >
                {active.tools.map(tool => (
                  <ToolChip key={tool.name} {...tool} color={active.color} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
