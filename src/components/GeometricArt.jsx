import React from 'react';

// Bauhaus shapes
const RedCircle = ({ size, x, y, className }) => (
  <div 
    className={className}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: 'var(--red)',
      border: '4px solid var(--border)',
      borderRadius: '50%',
      boxShadow: '8px 8px 0px 0px var(--border)'
    }}
  />
);

const BlueSquare = ({ size, x, y, rotate, className }) => (
  <div 
    className={className}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: 'var(--blue)',
      border: '4px solid var(--border)',
      boxShadow: '8px 8px 0px 0px var(--border)',
      transform: `rotate(${rotate}deg)`
    }}
  />
);

const YellowTriangle = ({ size, x, y, rotate, className }) => (
  <div 
    className={className}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: 'var(--yellow)',
      border: '4px solid var(--border)',
      boxShadow: '8px 8px 0px 0px var(--border)',
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      transform: `rotate(${rotate}deg)`
    }}
  />
);

const GeometricArt = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      
      {/* Top Right Cluster */}
      <div style={{ position: 'absolute', top: '5%', right: '10%' }}>
        <BlueSquare size={120} x={-20} y={-20} rotate={15} />
        <RedCircle size={80} x={60} y={40} />
      </div>

      {/* Middle Left Cluster */}
      <div style={{ position: 'absolute', top: '40%', left: '5%' }}>
        <YellowTriangle size={150} x={0} y={0} rotate={-25} />
        <BlueSquare size={60} x={100} y={100} rotate={45} />
      </div>

      {/* Bottom Right Cluster */}
      <div style={{ position: 'absolute', bottom: '10%', right: '15%' }}>
        <RedCircle size={200} x={-50} y={-50} />
        <YellowTriangle size={100} x={-20} y={-80} rotate={180} />
        <BlueSquare size={90} x={80} y={50} rotate={10} />
      </div>

    </div>
  );
};

export default GeometricArt;
