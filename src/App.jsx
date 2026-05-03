import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GeometricArt from './components/GeometricArt';
import ScrollProgress   from './components/ScrollProgress';
import CommandPalette   from './components/CommandPalette';
import Home             from './pages/Home';
import ProjectPage      from './pages/ProjectPage';
import CustomCursor     from './components/CustomCursor';

function App() {
  return (
    <HashRouter>
      <CustomCursor />
      <div style={{ color: 'var(--text-primary)', position: 'relative' }}>
        {/* Global: Bauhaus SVG Background Art */}
        <div style={{ opacity: 1, pointerEvents: 'none' }}>
          <GeometricArt />
        </div>

        {/* Global: scroll progress bar */}
        <ScrollProgress />

        {/* Global: Cmd+K command palette */}
        <CommandPalette />

        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/projects/:id"     element={<ProjectPage />} />
          {/* Fallback */}
          <Route path="*"                 element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
