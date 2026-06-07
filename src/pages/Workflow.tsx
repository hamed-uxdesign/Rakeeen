import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useSiteContext } from '../contexts/SiteContext';

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  transform: 'translateY(15px)',
  animation: `wf-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
});

// Pool of geometric pixel-art vectors (cycles as phases grow)
const VECTOR_POOL = [
  [[3,0],[4,0],[3,1],[4,1],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[3,6],[4,6],[3,7],[4,7]],
  [[3,0],[4,0],[2,1],[5,1],[1,2],[6,2],[0,3],[7,3],[1,4],[6,4],[2,5],[5,5],[3,6],[4,6]],
  [[3,0],[4,0],[2,1],[3,1],[4,1],[5,1],[1,2],[2,2],[5,2],[6,2],[0,3],[1,3],[6,3],[7,3],[0,4],[1,4],[6,4],[7,4],[1,5],[2,5],[5,5],[6,5],[2,6],[3,6],[4,6],[5,6],[3,7],[4,7]],
  [[1,0],[6,0],[2,1],[5,1],[3,2],[4,2],[3,3],[4,3],[2,4],[5,4],[1,5],[6,5],[2,6],[5,6],[3,7],[4,7]],
  [[1,2],[2,1],[3,2],[3,3],[2,4],[1,3],[4,2],[5,1],[6,2],[6,3],[5,4],[4,3]],
  [[0,0],[1,0],[6,0],[7,0],[0,1],[7,1],[0,6],[7,6],[0,7],[1,7],[6,7],[7,7],[3,3],[4,3],[3,4],[4,4]],
  [[4,0],[3,1],[4,1],[5,1],[2,2],[3,2],[5,2],[6,2],[1,3],[7,3],[1,4],[7,4],[2,5],[3,5],[5,5],[6,5],[3,6],[4,6],[5,6],[4,7]],
  [[0,2],[1,1],[2,0],[5,0],[6,1],[7,2],[7,5],[6,6],[5,7],[2,7],[1,6],[0,5],[3,3],[4,3],[3,4],[4,4]],
];

const PHASE_COLORS = [
  'var(--sepia)',
  '#3B82F6',
  '#A855F7',
  '#F97316',
  '#22C55E',
  '#EC4899',
  '#14B8A6',
  '#F59E0B',
];

export const Workflow = () => {
  const { lang } = useLang() as any;
  const navigate = useNavigate();
  const { workflowPhases } = useSiteContext() as any;
  const isAr = lang === 'ar';
  const [activePhase, setActivePhase] = useState(0);
  const [sidebarY, setSidebarY] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const sidebarWrapperRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = isAr ? 'منهجية العمل | Hamed Walid' : 'The Workflow | Hamed Walid';
  }, [isAr]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(mid - trigger);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActivePhase(best);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSidebarScroll = () => {
      if (!sidebarWrapperRef.current || !sidebarRef.current) return;
      const wrapperRect = sidebarWrapperRef.current.getBoundingClientRect();
      const wrapperHeight = wrapperRect.height;
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Center the sidebar vertically at 40% of the screen height
      const triggerTop = viewportHeight * 0.4;
      const currentYInViewport = triggerTop - wrapperRect.top;
      const maxMove = wrapperHeight - sidebarHeight;

      // Clamp between 0 (top line) and maxMove (bottom line)
      const targetY = Math.max(0, Math.min(maxMove, currentYInViewport));
      setSidebarY(targetY);
    };

    window.addEventListener('scroll', handleSidebarScroll, { passive: true });
    window.addEventListener('resize', handleSidebarScroll);
    setTimeout(handleSidebarScroll, 150);
    return () => {
      window.removeEventListener('scroll', handleSidebarScroll);
      window.removeEventListener('resize', handleSidebarScroll);
    };
  }, [workflowPhases]);

  const phases = workflowPhases && workflowPhases.length > 0 ? workflowPhases : [
    {
      en_title: '01 · Pure UX & Logic',
      ar_title: '01 · التخطيط وتجربة المستخدم',
      en_sub: 'Brainstorming & User Flows',
      ar_sub: 'العصف الذهني والمسارات',
      en_desc: "We map the user's journey before writing a single line of code. Wireframes, flows, and early testing keep the idea sharp and the direction clear.",
      ar_desc: 'نرسم رحلة المستخدم قبل أي كود. أسكيشات سريعة واختبار مبكر يحفظ الوقت ويوضح الاتجاه.',
      en_skills: 'User Flows · Wireframes · Usability Testing',
      ar_skills: 'مسارات المستخدم · الهياكل السلكية · اختبار التجربة',
    },
    {
      en_title: '02 · UI & Figma Engineering',
      ar_title: '02 · تصميم الواجهات والنظام',
      en_sub: 'Design Tokens & Architecture',
      ar_sub: 'المتغيرات والمكونات المرنة',
      en_desc: "Flows become high-fidelity screens. Every component lives in a design system that mirrors production code — consistent, scalable, and handoff-ready.",
      ar_desc: 'المسارات تتحول لشاشات دقيقة. كل مكوّن في نظام تصميم متكامل يشبه الكود الحقيقي، جاهز للتسليم.',
      en_skills: 'Figma Auto-Layout · Design Tokens · Edge Cases',
      ar_skills: 'Auto Layout · نظام التصميم · الحالات الخاصة',
    },
    {
      en_title: '03 · Agentic Vibe Coding',
      ar_title: '03 · التنفيذ البرمجي الذكي',
      en_sub: 'Figma to React & TailwindCSS',
      ar_sub: 'من فيجما إلى كود نظيف',
      en_desc: "Design becomes semantic React with Tailwind. Clean state, responsive layouts, and global accessibility baked in from the start.",
      ar_desc: 'التصميم يتحول لكود React & Tailwind نظيف. تجاوب كامل ومعايير وصول عالمية من البداية.',
      en_skills: 'React · Tailwind CSS · Accessibility (a11y)',
      ar_skills: 'React · Tailwind · معايير الوصول',
    },
    {
      en_title: '04 · Visual & Code QA',
      ar_title: '04 · مراجعة الجودة والفحص',
      en_sub: 'Linters & Layout Audits',
      ar_sub: 'التطابق البصري وفحص الأخطاء',
      en_desc: "Every pixel is checked against the design. Automated linters run to catch issues early — the result is a fast, bug-free, production-ready product.",
      ar_desc: 'كل بكسل يُقارن بالتصميم. أدوات الفحص تلتقط الأخطاء مبكراً للخروج بمنتج سريع وخالٍ من الأعطال.',
      en_skills: 'Design Parity · Code Standards · Performance',
      ar_skills: 'التطابق البصري · معايير الكود · الأداء',
    },
    {
      en_title: '05 · Handover & Analytics',
      ar_title: '05 · التسليم والتحليلات',
      en_sub: 'Backend Ready Components',
      ar_sub: 'كود موثق جاهز للربط',
      en_desc: "User behavior analytics are embedded. The codebase is handed over documented, structured, and backend-ready for smooth developer integration.",
      ar_desc: 'نُدمج تحليلات سلوك المستخدم ونسلّم الكود موثقاً ومنظماً جاهزاً للربط بقاعدة البيانات.',
      en_skills: 'Analytics · Technical Docs · API Integration',
      ar_skills: 'تحليلات الأداء · التوثيق البرمجي · ربط API',
    },
  ];

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes wf-up { to { opacity:1; transform:translateY(0); } }

        .wf-step-box {
          padding: 2.5rem 2.8rem;
          border: 1.5px solid var(--ink);
          background: var(--paper-dark);
          margin-bottom: 1.6rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* Two-column: [vectors sidebar] [cards] */
        .wf-cols {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 0 3rem;
          position: relative;
        }
        html[dir="rtl"] .wf-cols {
          grid-template-columns: 1fr 52px;
        }

        .wf-sidebar-wrapper {
          position: relative;
          height: 100%;
        }

        /* Fluid sliding sidebar, fully bounded inside the column */
        .wf-sidebar {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
          will-change: transform;
          transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* The sub-label — on the opposite side from the title */
        .wf-sub-label {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.4;
          padding: 0.32rem 0.75rem;
          border: 1px solid var(--ink);
          flex-shrink: 0;
          margin-top: 0.1rem;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .wf-step-box { padding: 1.6rem 1.4rem; }
          .wf-cols { grid-template-columns: 36px 1fr; gap: 0 1.2rem; }
          .wf-sidebar { gap: 1.2rem; }
        }
      `}</style>

      <div className="page-container" style={{ paddingTop: '6rem', paddingBottom: '8rem', maxWidth: '820px', margin: '0 auto' }}>

        {/* ── Heading ── */}
        <div style={{ borderBottom: '1.5px solid var(--ink)', paddingBottom: '2.5rem', marginBottom: '3.5rem', ...fadeUp(0.05) }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
            marginBottom: '1rem',
          }}>
            {isAr ? 'منهجية العمل' : 'THE WORKFLOW'}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--ink)',
            ...fadeUp(0.1),
          }}>
            {isAr ? 'كيف يفكر المهندس' : 'How My Brain Works'}
          </h1>
        </div>

        {/* ── Two-column: vectors sidebar + cards ── */}
        <div className="wf-cols" style={fadeUp(0.18)}>

          {/* Sidebar Wrapper (holds the 52px column space and bounds the sliding sidebar) */}
          <div className="wf-sidebar-wrapper" ref={sidebarWrapperRef}>
            <div className="wf-sidebar" ref={sidebarRef} style={{ transform: `translateY(${sidebarY}px)` }}>
              {phases.map((_: any, i: number) => {
                const isActive = i === activePhase;
                const dots = VECTOR_POOL[i % VECTOR_POOL.length];
                return (
                  <div
                    key={i}
                    style={{
                      transform: isActive ? 'scale(1.25) rotate(45deg)' : 'scale(0.85) rotate(0deg)',
                      transition: 'all 0.45s cubic-bezier(0.19, 1, 0.22, 1)',
                      color: isActive ? PHASE_COLORS[i % PHASE_COLORS.length] : 'var(--ink)',
                      opacity: isActive ? 1 : 0.18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="32" height="32" viewBox="-0.5 -0.5 9 9"
                      style={{ shapeRendering: 'crispEdges', overflow: 'visible', display: 'block' }}>
                      {dots.map(([cx, cy]: number[], di: number) => (
                        <circle key={di} cx={cx + 0.5} cy={cy + 0.5} r="0.45" fill="currentColor" />
                      ))}
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Cards */}
          <div ref={cardsContainerRef} style={{ height: '100%' }}>
            {phases.map((phase: any, i: number) => (
              <div
                key={i}
                ref={el => { stepsRef.current[i] = el; }}
                className="wf-step-box"
              >
                {/* Title row: title one side, badge opposite */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  marginBottom: '1rem',
                  flexDirection: isAr ? 'row-reverse' : 'row',
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 850,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: 'var(--ink)',
                    margin: 0,
                  }}>
                    {isAr ? phase.ar_title : phase.en_title}
                  </h2>
                  <span className="wf-sub-label">
                    {isAr ? phase.ar_sub : phase.en_sub}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--ink)',
                  opacity: 0.6,
                  marginBottom: '1.4rem',
                }}>
                  {isAr ? phase.ar_desc : phase.en_desc}
                </p>

                {/* Skills footer */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  borderTop: '1px dashed var(--ink)',
                  paddingTop: '0.65rem',
                  color: 'var(--ink)',
                  opacity: 0.45,
                }}>
                  {isAr ? phase.ar_skills : phase.en_skills}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          borderTop: '2px solid var(--ink)',
          paddingTop: '5rem',
          marginTop: '5rem',
          textAlign: 'center',
          ...fadeUp(0.72)
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.4,
            marginBottom: '2.5rem'
          }}>
            {isAr ? 'اكتشف المزيد من الملف المهني' : 'CONTINUE THE JOURNEY'}
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-brutalist" onClick={() => navigate('/projects')} style={{ minWidth: '180px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'أعمالي' : 'MY WORK ?'}
            </button>
            <button className="btn-brutalist btn-brutalist--outline" onClick={() => navigate('/about')} style={{ minWidth: '180px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'عني' : 'ABOUT ME'}
            </button>
            <button className="btn-brutalist btn-brutalist--ghost" onClick={() => navigate('/contact')} style={{ minWidth: '180px', fontFamily: 'var(--font-mono)' }}>
              {isAr ? 'تواصل معي' : 'SAY HEYY !'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
