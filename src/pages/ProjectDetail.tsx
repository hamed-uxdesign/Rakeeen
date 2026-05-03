import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  const projectIndex  = projects.findIndex(p => p.id === id);
  const project       = projectIndex !== -1 ? projects[projectIndex] : projects[0];
  const resolvedIndex = projectIndex === -1 ? 0 : projectIndex;

  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      document.title = `${resolveField(project.title)} | Hamed Walid`;
      window.scrollTo(0, 0);
    }
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [project, resolveField]);

  if (!project) return null;

  const tldr = [
    { label: t('problem_label'), value: resolveField(project.challenge || project.painPoints) },
    { label: t('solution_label'), value: resolveField(project.solution) },
    { label: t('role_label_short'), value: resolveField(project.role) },
    { label: t('outcome_label'), value: resolveField(project.conclusion || project.keyResult) }
  ];

  const gallery = (project as any).gallery || project.detailImages?.map((url: string) => ({ url })) || [];

  return (
    <div className="fade-in" style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      
      {/* ══ THE BITE (10 Seconds) ══ */}
      <section style={{ paddingBottom: '4rem' }}>
        {/* Full-width Hero Image */}
        <div style={{ 
          width: '100%', 
          height: '70dvh', 
          backgroundImage: `url(${project.image})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          borderBottom: '2px solid var(--ink)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }} />

        {/* TL;DR Summary */}
        <div className="page-container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          <div style={{ 
            background: 'var(--paper-dark)', 
            padding: '3rem', 
            borderRadius: 'var(--radius-organic)', 
            border: '2px solid var(--ink)',
            boxShadow: '10px 12px 0 rgba(42,32,24,0.15)'
          }}>
            <h1 style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem' }}>
              {resolveField(project.title)}
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'start' }}>
              {tldr.map((item, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '0.5rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.5, color: 'var(--ink-faded)' }}>
                    {item.value || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE SNACK (1 Minute) ══ */}
      <section className="page-container" style={{ padding: '6rem 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {gallery.slice(0, 3).map((img: any, i: number) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-sketch)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                maxWidth: '800px',
                lineHeight: 1.2
              }}>
                {i === 0 ? t('snack_caption_1') : 
                 i === 1 ? t('snack_caption_2') : 
                 t('snack_caption_3')}
              </h2>
              <div style={{ 
                borderRadius: 'var(--radius-organic)', 
                overflow: 'hidden', 
                border: '1.5px solid var(--tape)',
                boxShadow: '8px 10px 0 rgba(0,0,0,0.05)'
              }}>
                <img src={img.url} alt="Project Highlight" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THE MEAL (Deep Dive) ══ */}
      <section style={{ background: 'var(--paper-dark)', padding: '6rem 0' }}>
        <div className="page-container">
          <h2 style={{ fontFamily: 'var(--font-sketch)', fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
            {t('theDeepDive')}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { id: 'research', title: t('meal_research'), content: project.strategy || t('meal_research_fallback') },
              { id: 'wireframes', title: t('meal_wireframes'), content: project.architecture || t('meal_wireframes_fallback') },
              { id: 'ai', title: t('meal_ai'), content: (project as any).aiWorkflow || t('meal_ai_fallback') }
            ].map((section) => (
              <div key={section.id} style={{ 
                border: '1.5px solid var(--ink-light)', 
                borderRadius: '12px', 
                overflow: 'hidden',
                background: 'var(--paper)'
              }}>
                <button 
                  onClick={() => setExpandedMeal(expandedMeal === section.id ? null : section.id)}
                  style={{ 
                    width: '100%', 
                    padding: '1.5rem 2rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sketch)',
                    fontSize: '1.4rem',
                    color: 'var(--ink)'
                  }}
                >
                  {section.title}
                  <span>{expandedMeal === section.id ? '−' : '+'}</span>
                </button>
                {expandedMeal === section.id && (
                  <div style={{ padding: '0 2rem 2rem', color: 'var(--ink-faded)', lineHeight: 1.8 }}>
                    <p style={{ whiteSpace: 'pre-line' }}>{resolveField(section.content)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section style={{ borderTop: '2px solid var(--tape)', padding: '4rem 0' }}>
        <div className="page-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {projectIndex > 0 && (
            <button onClick={() => navigate(`/project/${projects[projectIndex - 1].id}`)} className="sketchy-btn">
              {t('prevProject')}
            </button>
          )}
          {projectIndex < projects.length - 1 && (
            <button onClick={() => navigate(`/project/${projects[projectIndex + 1].id}`)} className="sketchy-btn">
              {t('nextProject')}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
