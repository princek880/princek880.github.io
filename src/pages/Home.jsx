import React from 'react';
import Navbar    from '../components/Navbar';
import Hero      from '../components/Hero';
import About     from '../components/About';
import Skills    from '../components/Skills';
import Experience from '../components/Experience';
import Research  from '../components/Research';
import Teaching  from '../components/Teaching';
import Projects  from '../components/Projects';
import Gallery   from '../components/Gallery';
import Contact   from '../components/Contact';
import Footer    from '../components/Footer';
const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Research />
      <Teaching />
      <Projects />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Home;
