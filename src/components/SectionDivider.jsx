import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '3.5rem 0', position: 'relative' }}>
      {/* Subtle ambient glow behind the divider */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        height: '4rem',
        background: 'radial-gradient(ellipse at center, rgba(226,217,200,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: '70%',
          maxWidth: '800px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}
      >
        {/* Subtle glowing center dot */}
        <div style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--blue)',
          boxShadow: '0 0 10px var(--blue)'
        }} />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
