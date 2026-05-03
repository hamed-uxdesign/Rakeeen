import React from 'react';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import { useNavigate } from 'react-router-dom';
import { MascotFace } from '../components/ui/MascotFace';
import { SkillTag } from '../components/ui/SkillTag';
import { TimelineItem } from '../components/ui/TimelineItem';
import { SketchyButton } from '../components/ui/SketchyButton';

export const About = () => {
  const { siteConfig, timeline, competencies } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `${t('about')} | ${resolveField(siteConfig.name)}`;
  }, [siteConfig, t, resolveField]);

  return (
    <div className="page-container fade-in">
      {/* About Hero */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "center" }}>
           <div style={{ flex: 1, minWidth: '300px' }}>
             <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
               {t('behindPixels')}
             </h1>
             <p style={{ 
               fontFamily: "var(--font-body)", 
               fontSize: "1.1rem", 
               lineHeight: 1.8, 
               color: "var(--ink-faded)", 
               maxWidth: "800px",
               fontStyle: "normal"
             }}>
               {resolveField(siteConfig.detailed_summary) || resolveField(siteConfig.summary)}
             </p>
           </div>
           <div style={{ 
             display: (window.innerWidth < 768 ? 'none' : 'flex'), 
             justifyContent: 'center', 
             flexShrink: 0, 
             opacity: 0.3,
             paddingInlineStart: "2rem"
           }}>
             <div className="hidden md:block"><MascotFace size={150} color="var(--ink)" /></div>
           </div>
        </div>
      </section>

      <hr className="sketch-divider" />

      {/* Experience Timeline */}
      <section style={{ padding: "2rem 0" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", marginBottom: "2rem", color: "var(--ink)" }}>
          {t('myJourney')} <span style={{ color: "var(--ink-light)", fontSize: "1.2rem" }}>{t('experience')}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingInlineStart: "1rem" }}>
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} isLast={i === timeline.length - 1} />
          ))}
        </div>
      </section>

      <hr className="sketch-divider" />

      {/* Skills */}
      <section style={{ padding: "2rem 0 3rem" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", marginBottom: "1.5rem", color: "var(--ink)" }}>
          {t('mySkills')} <span style={{ color: "var(--ink-light)", fontSize: "1.2rem" }}>{t('skills')}</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {competencies.map((skill, index) => (
             <SkillTag key={skill.title} title={skill.title} description={skill.description} index={index} />
          ))}
        </div>
      </section>

      {/* Senior UX Professional CTA Section */}
      <section style={{ padding: "4rem 0 8rem" }}>
        <div style={{ 
          background: "var(--paper)", 
          borderTop: "1.5px solid var(--ink)", 
          borderBottom: "1.5px solid var(--ink)",
          padding: "5rem 0", 
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h3 style={{ 
            fontFamily: "var(--font-sketch)", 
            fontSize: "2.2rem", 
            color: "var(--ink)", 
            marginBottom: "0.8rem",
            letterSpacing: "-0.02em"
          }}>
            {t('getInTouch')}
          </h3>
          
          <p style={{ 
            fontFamily: "var(--font-body)", 
            fontSize: "1rem", 
            color: "var(--ink-faded)", 
            marginBottom: "2.5rem", 
            lineHeight: 1.6,
            maxWidth: "500px",
            fontStyle: "normal",
            opacity: 0.8
          }}>
            {t('alwaysLooking')}
          </p>

          <SketchyButton filled onClick={() => navigate("/contact")} style={{ fontSize: "1.1rem", padding: "0.6rem 2.2rem" }}>
            {t('reachOut')}
          </SketchyButton>
        </div>
      </section>
    </div>
  );
};
