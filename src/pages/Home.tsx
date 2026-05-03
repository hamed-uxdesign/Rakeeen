import React from 'react';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import { MascotFace } from '../components/ui/MascotFace';
import { useNavigate } from 'react-router-dom';
import { PolaroidCard } from '../components/ui/PolaroidCard';
import { SketchyButton } from '../components/ui/SketchyButton';
import { InteractiveGlow } from '../components/ui/InteractiveGlow';
import { TypewriterText } from '../components/ui/TypewriterText';

export const Home = () => {
  const { siteConfig, isInitialLoad, setInitialLoadComplete } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `${resolveField(siteConfig.name)} | UX Designer`;
  }, [siteConfig, resolveField]);

  return (
    <div className="page-container fade-in" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        textAlign: "center", 
        padding: "2rem 0",
        maxWidth: "800px",
        width: "100%"
      }}>
        {/* Profile Image */}
        <div style={{ 
          width: 200, 
          height: 200, 
          borderRadius: "50%", 
          border: "3px solid var(--sepia)", 
          overflow: "hidden", 
          background: "var(--paper-dark)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          boxShadow: "8px 10px 0 rgba(139,105,20,0.2)", 
          marginBottom: "2.5rem",
          opacity: isInitialLoad ? 0 : 1,
          transform: isInitialLoad ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
        }}>
          {siteConfig.siteImages?.aboutPortrait ? (
              <img src={siteConfig.siteImages.aboutPortrait} alt={resolveField(siteConfig.name)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
              <MascotFace size={130} />
          )}
        </div>

        {/* Headline */}
        <h1 className="responsive-headline" style={{ 
          fontFamily: "var(--font-sketch)", 
          fontSize: "clamp(2rem, 7vw, 4.2rem)", 
          fontWeight: 700, 
          lineHeight: 1.1, 
          color: "var(--ink)", 
          marginBottom: "1.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center"
        }}>
          <TypewriterText 
            text={resolveField((siteConfig as any).heroHeadline) || t('hero_headline', { default: 'Designing for human' })} 
            delay={0.3} 
            speed={70} 
            onComplete={setInitialLoadComplete} 
            skipAnimation={!isInitialLoad}
          />
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontFamily: "var(--font-body)", 
          fontSize: "clamp(1.1rem, 2vw, 1.3rem)", 
          lineHeight: 1.6, 
          color: "var(--ink-faded)", 
          marginBottom: "3rem",
          maxWidth: "650px",
          fontStyle: "normal",
          opacity: isInitialLoad ? 0 : 1,
          transform: isInitialLoad ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
        }}>
          {resolveField((siteConfig as any).heroSubtitle) || t('hero_subtitle', { default: "I'm Hamid Waleed. I'm a UX designer for three years ago" })}
        </p>

        {/* CTAs */}
        <div className="hero-cta" style={{ 
          display: "flex", 
          gap: "1.5rem", 
          flexWrap: "wrap", 
          justifyContent: "center",
          opacity: isInitialLoad ? 0 : 1,
          transform: isInitialLoad ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s'
        }}>
          <SketchyButton filled onClick={() => navigate("/projects")}>
              {resolveField((siteConfig as any).heroBtnPrimary) || t('seeMyWork', { default: 'See my work' })}
          </SketchyButton>
          <SketchyButton onClick={() => navigate("/about")}>
              {resolveField((siteConfig as any).heroBtnSecondary2) || t('knowMore', { default: 'Know more about me' })}
          </SketchyButton>
          <SketchyButton onClick={() => navigate("/contact")}>
              {resolveField((siteConfig as any).heroBtnSecondary1) || t('sayHello', { default: 'Say hello' })}
          </SketchyButton>
        </div>
      </section>
    </div>
  );
};
