import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    src: 'https://raw.githubusercontent.com/princek880/princek880.github.io/main/Prince_workshop.JPG',
    title: 'HARDWARE WORKSHOP',
    desc: 'Working on ATLAS detector components at CERN.'
  },
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="gallery" style={{ borderBottom: '4px solid var(--border)' }}>
      <div className="container">
        <h2 className="section-title">
          <span className="section-number">07</span> GALLERY
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '12px 12px 0px 0px var(--border)' }}
              onClick={() => setSelectedImg(img)}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: 'white',
                border: '4px solid var(--border)',
                borderRadius: i % 2 === 0 ? '9999px' : '0px', // Alternating round and square
                boxShadow: '8px 8px 0px 0px var(--border)',
                transition: 'all 0.2s ease-out'
              }}
            >
              <img 
                src={img.src} 
                alt={img.title}
                style={{ 
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'grayscale(1)', transition: 'all 0.4s ease-out'
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1)')}
              />
              <div style={{
                position: 'absolute', inset: 0, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'rgba(16, 64, 192, 0.2)', // var(--blue) with opacity
                opacity: 0, transition: 'opacity 0.3s'
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={e => (e.currentTarget.style.opacity = 0)}
              >
                <div style={{ textAlign: 'center', color: 'white', fontWeight: 900 }}>
                  <ZoomIn size={32} strokeWidth={3} style={{ margin: '0 auto 0.5rem' }} />
                  <p>{img.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Bauhaus Placeholder Fillers */}
          {[1, 2].map(n => (
             <div key={n} style={{
               aspectRatio: '1/1',
               border: '4px dashed var(--border)',
               borderRadius: (images.length + n - 1) % 2 === 0 ? '9999px' : '0px',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               background: n % 2 === 0 ? 'var(--yellow)' : 'transparent',
             }}>
                <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem', transform: 'rotate(-45deg)' }}>FUTURE WORK</span>
             </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
              backgroundColor: 'rgba(240, 240, 240, 0.95)',
            }}
            onClick={() => setSelectedImg(null)}
          >
            <button style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--red)', border: '4px solid var(--border)', padding: '0.5rem', cursor: 'pointer', color: 'white' }}>
              <X size={32} strokeWidth={3} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{ maxWidth: '800px', width: '100%', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ 
                border: '6px solid var(--border)', 
                boxShadow: '16px 16px 0px 0px var(--border)',
                backgroundColor: 'white',
                padding: '1rem'
              }}>
                <img 
                  src={selectedImg.src} 
                  alt={selectedImg.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ marginTop: '1.5rem', borderTop: '4px solid var(--border)', paddingTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>{selectedImg.title}</h3>
                  <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{selectedImg.desc}</p>
                </div>
              </div>
              {/* Floating Geometric shapes for flair */}
              <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '60px', height: '60px', backgroundColor: 'var(--blue)', border: '4px solid var(--border)', borderRadius: '50%', zIndex: -1 }} />
              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '80px', height: '80px', backgroundColor: 'var(--yellow)', border: '4px solid var(--border)', zIndex: -1 }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
