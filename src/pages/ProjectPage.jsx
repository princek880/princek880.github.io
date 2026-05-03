import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Building2, Tag, ChevronRight } from 'lucide-react';
import { getProject, PROJECTS } from '../data/projects';
import ScrollProgress from '../components/ScrollProgress';

/* ── Status badge ───────────────────────────────────────── */
const STATUS = {
  published:  { label: 'PUBLISHED',  bg: 'var(--red)', color: 'white' },
  ongoing:    { label: 'ONGOING',    bg: 'var(--yellow)', color: 'black' },
  completed:  { label: 'COMPLETED',  bg: 'var(--blue)', color: 'white' },
};

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project  = getProject(id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <h1 style={{ fontSize: '3rem' }}>PROJECT NOT FOUND</h1>
        <Link to="/" className="btn-primary">← BACK TO PORTFOLIO</Link>
      </div>
    );
  }

  const st = STATUS[project.status];
  const others = PROJECTS.filter(p => p.id !== id).slice(0, 3);
  const accent = project.color || 'var(--blue)';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      <ScrollProgress />

      {/* ── Back nav ── */}
      <div style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 100 }}>
        <button
          onClick={() => navigate(-1)}
          className="btn-outline"
          style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} strokeWidth={3} /> BACK
        </button>
      </div>

      <main style={{ paddingTop: '8rem' }}>
        {/* ═════════════════ HERO ═════════════════ */}
        <section style={{ padding: '0 0 6rem', borderBottom: '6px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <Link to="/" style={{ color: 'var(--text-muted)' }}>PORTFOLIO</Link>
              <ChevronRight size={16} strokeWidth={3} />
              {/* Use a plain <a> for in-page hash anchor — React Router's Link misinterprets /#projects with HashRouter */}
              <a href="#projects" onClick={() => navigate('/')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>PROJECTS</a>
              <ChevronRight size={16} strokeWidth={3} />
              <span style={{ color: accent }}>{project.title.toUpperCase()}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
              <div>
                {/* Status + category */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <span style={{ 
                    padding: '0.4rem 1rem', 
                    fontWeight: 900,
                    background: st.bg, 
                    color: st.color, 
                    border: '3px solid var(--border)', 
                    boxShadow: '4px 4px 0px 0px var(--border)' 
                  }}>
                    {st.label}
                  </span>
                  <span className="tag" style={{ background: 'white' }}>
                    {project.category.toUpperCase()}
                  </span>
                </div>

                <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', marginBottom: '1.5rem' }}>
                  <span style={{ marginRight: '1rem' }}>{project.emoji}</span>
                  {project.title.toUpperCase()}
                </h1>

                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.3 }}>
                  {project.subtitle}
                </p>

                {/* Meta row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                  {[
                    { Icon: Calendar, text: project.year },
                    { Icon: Building2, text: project.institution.toUpperCase() },
                  ].map(({ Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 900, fontSize: '0.9rem' }}>
                      <Icon size={20} strokeWidth={3} style={{ color: accent }} />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Links */}
                {project.links.length > 0 && (
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {project.links.map(l => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                        className="btn-primary" style={{ background: accent, color: accent === 'var(--yellow)' ? 'black' : 'white' }}>
                        <ExternalLink size={18} strokeWidth={3} /> {l.label.toUpperCase()}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Tagline Card */}
              <div className="bauhaus-card" style={{ backgroundColor: 'white', borderLeftWidth: '12px', borderLeftColor: accent }}>
                 <p style={{ fontStyle: 'italic', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  "{project.tagline}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════ METRICS ═════════════════ */}
        <section style={{ padding: '6rem 0', backgroundColor: 'rgba(255,255,255,0.82)', borderBottom: '6px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {project.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bauhaus-card"
                  style={{ textAlign: 'center', backgroundColor: i % 3 === 0 ? 'var(--red)' : i % 3 === 1 ? 'var(--blue)' : 'var(--yellow)', color: i % 3 === 2 ? 'black' : 'white' }}
                >
                  <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>
                    {m.value}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '1rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '0.5rem', opacity: 0.9 }}>
                    {m.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════ CONTENT GRID ═════════════════ */}
        <section style={{ padding: '6rem 0' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
              
              {/* Overview */}
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', borderBottom: '6px solid var(--blue)', display: 'inline-block' }}>OVERVIEW</h2>
                <p style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {project.overview}
                </p>
              </div>

              {/* Technical Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0', borderBottom: '6px solid var(--red)', display: 'inline-block', alignSelf: 'flex-start' }}>TECHNICAL DETAILS</h2>
                {project.details.map((d, i) => (
                  <div key={d.heading} className="bauhaus-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.8rem', textTransform: 'uppercase' }}>{d.heading}</h3>
                    <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d.body}</p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="bauhaus-card" style={{ backgroundColor: 'var(--yellow)', gridColumn: 'span 1' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem' }}>KEY HIGHLIGHTS</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', gap: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                      <span style={{ width: '12px', height: '12px', backgroundColor: 'black', border: '2px solid var(--border)', marginTop: '0.4rem', flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="bauhaus-card" style={{ gridColumn: 'span 1' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem' }}>TECH STACK</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {project.tech.map((t, i) => (
                    <span key={t} className="tag" style={{ 
                      backgroundColor: i % 3 === 0 ? 'var(--red)' : i % 3 === 1 ? 'var(--blue)' : 'var(--yellow)',
                      color: i % 3 === 2 ? 'black' : 'white'
                    }}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═════════════════ OTHER PROJECTS ═════════════════ */}
        <section style={{ padding: '6rem 0 8rem', borderTop: '6px solid var(--border)', background: 'rgba(255,255,255,0.82)' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>OTHER PROJECTS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {others.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="bauhaus-card" style={{ transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem', filter: 'grayscale(1)' }}>{p.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{p.title.toUpperCase()}</div>
                  <div style={{ fontWeight: 900, fontSize: '0.8rem', color: p.color || 'var(--blue)' }}>{p.category.toUpperCase()}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectPage;
