import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GeometricArt    from './components/GeometricArt';
import ScrollProgress  from './components/ScrollProgress';
import CommandPalette  from './components/CommandPalette';
import Home            from './pages/Home';
import ProjectPage     from './pages/ProjectPage';
import HobbiesPage     from './pages/HobbiesPage';
import CustomCursor    from './components/CustomCursor';

function App() {
  return (
    <HashRouter>
      <CustomCursor />
      {/* Global: Bauhaus SVG Background Art (fixed, z-index:-1) */}
      <GeometricArt />

      {/* Global: scroll progress bar */}
      <ScrollProgress />

      {/* Global: Cmd+K command palette */}
      <CommandPalette />

      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/projects/:id"     element={<ProjectPage />} />
        <Route path="/hobbies"          element={<HobbiesPage />} />
        {/* Fallback */}
        <Route path="*"                 element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
