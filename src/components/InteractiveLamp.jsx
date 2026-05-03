import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const InteractiveLamp = () => {
  const constraintsRef = useRef(null);
  
  // Track horizontal and vertical drag of the hood
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add physics to the drag so it feels weighty
  const springX = useSpring(x, { stiffness: 60, damping: 10, mass: 1.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 10, mass: 1.5 });

  // Calculate the required wire length based on drag distance from the ceiling
  // Base wire length is 150px.
  const wireLength = useTransform(
    () => Math.sqrt(springX.get() ** 2 + (150 + springY.get()) ** 2)
  );

  // Calculate the rotation angle so the hood and wire point to the pivot
  // Since CSS rotation is clockwise, dragging right (positive x) requires counter-clockwise (negative) rotation.
  const rotate = useTransform(
    () => -(Math.atan2(springX.get(), 150 + springY.get()) * 180) / Math.PI
  );

  // Add subtle skew to the light beam for volumetric illusion
  const lightSkewX = useTransform(
    () => -(Math.atan2(springX.get(), 150 + springY.get()) * 180) / Math.PI * 0.5
  );

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 85, overflow: 'hidden' }}>
      
      {/* Constraints Box for Dragging */}
      <div 
        ref={constraintsRef} 
        style={{
          position: 'absolute',
          top: '120px', // allows bouncing up a bit
          right: '15%',
          width: '500px', // wide drag area
          height: '600px', // long stretch area
          transform: 'translateX(50%)',
        }}
      />

      {/* The Pivot Point at the Ceiling */}
      <div style={{ position: 'absolute', top: 0, right: '15%' }}>
        
        {/* The Wire (Stretches and Rotates) */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-1.5px', // center the 3px wire
            width: '3px',
            height: wireLength,
            background: '#222',
            boxShadow: '1px 0 3px rgba(0,0,0,0.8)',
            rotate: rotate,
            originY: 0, // pivot from top
            originX: 0.5,
          }}
        />

        {/* The Draggable Hood Assembly */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          style={{
            x,
            y,
            position: 'absolute',
            top: '150px', // Base height
            left: '-35px', // Center the 70px wide hood
            width: '70px',
            height: '40px',
            cursor: 'grab',
            pointerEvents: 'auto',
            rotate: rotate,
            originY: 0, // Rotate around the point where the wire attaches (top center)
            originX: 0.5,
            zIndex: 90,
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* Lamp Hood Graphic */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1f1f1f, #0a0a0a)',
            borderRadius: '35px 35px 0 0',
            borderBottom: '4px solid rgba(255, 230, 50, 0.8)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.9), inset 0 2px 5px rgba(255,255,255,0.1)',
            position: 'relative'
          }}>
            {/* Bulb Glow */}
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '10px',
              background: '#fffcbd',
              borderRadius: '50%',
              boxShadow: '0 0 25px 8px rgba(255, 230, 50, 0.7)'
            }} />
          </div>

          {/* Spotlight Beam (Child of Hood, naturally rotates with it) */}
          <motion.div
            style={{
              position: 'absolute',
              top: '40px', // Starts right below the hood
              left: '-600px', // Center the 1200px beam
              width: '1200px',
              height: '150vh', // Reaches past the bottom of the screen
              background: 'radial-gradient(ellipse 30% 70% at 50% 2%, rgba(255, 220, 50, 0.18) 0%, rgba(255, 200, 20, 0.05) 40%, transparent 65%)',
              skewX: lightSkewX,
              mixBlendMode: 'color-dodge', // beautiful cinematic tint
              pointerEvents: 'none',
              transformOrigin: 'top center',
              opacity: 0,
              animation: 'lampFadeIn 2s ease-in-out forwards 1s',
            }}
          />
        </motion.div>

        <style>
          {`
            @keyframes lampFadeIn {
              to { opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default InteractiveLamp;
