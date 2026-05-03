import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import { PolaroidCard } from '../components/ui/PolaroidCard';

export const Projects = () => {
  const { projects } = useSiteContext();
  const { t } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `${t('projects')} | Hamed Walid`;
  }, [t]);

  return (
    <div className="page-container fade-in">
      <section style={{ padding: "3rem 0 1rem" }}>
        <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "0.5rem", color: "var(--ink)" }}>{t('My Work')}</h1>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-faded)", marginBottom: "3rem" }}>{t('curated')}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {projects.map((p, index) => (
            <PolaroidCard key={p.id} project={p} index={index} />
          ))}
        </div>
      </section>

      <hr className="sketch-divider" />
      <div style={{ textAlign: "center", padding: "3rem 0 4rem" }}>
        <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.4rem", color: "var(--ink-faded)", marginBottom: "1.5rem" }}>{t('wantMore')}</p>
        <button className="sketchy-btn filled" onClick={() => navigate("/contact")}>{t('reachOut')}</button>
      </div>
    </div>
  );
};
