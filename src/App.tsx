import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { CustomCursor } from './components/ui/CustomCursor';
import { SiteProvider, useSiteContext } from './context/SiteContext';
import { LangProvider } from './context/LangContext';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Applies the theme (light/dark) from SiteContext to the document body
const ThemeSync = () => {
  const { settings } = useSiteContext();
  useEffect(() => {
    if (settings?.theme) {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(settings.theme);
    }
  }, [settings?.theme]);
  return null;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSiteContext();
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/project/');

  useEffect(() => {
    const trackVisit = async () => {
      // 1. Total Sessions (Increments every time the browser is opened)
      if (!sessionStorage.getItem('hamed_session_tracked')) {
        sessionStorage.setItem('hamed_session_tracked', 'true');
        try {
          const ref = doc(db, 'analytics', 'main');
          await updateDoc(ref, { totalVisits: increment(1) });
        } catch (e) {
          // If doc doesn't exist, initialize it
          try {
            await setDoc(doc(db, 'analytics', 'main'), { totalVisits: 1, uniqueVisitors: 1, inquiries: 0 });
          } catch (err) { console.error("Init stats error", err); }
        }
      }

      // 2. Unique Visitors (Hardened v2 check: Only once per human ever)
      const uniqueKey = 'hamed_human_v2_confirmed'; // New versioned key for clean counting
      if (!localStorage.getItem(uniqueKey)) {
        // Set immediately to shield against rapid multi-tab clicks
        localStorage.setItem(uniqueKey, `v2_${Date.now()}`);
        
        try {
          const analyticsRef = doc(db, 'analytics', 'main');
          await updateDoc(analyticsRef, { uniqueVisitors: increment(1) });
        } catch (e) {
          // Initialize if missing
          try {
             await setDoc(doc(db, 'analytics', 'main'), { totalVisits: 1, uniqueVisitors: 1, inquiries: 0 });
          } catch(err) { console.warn("Reset sync failed", err); }
        }
      }
    };
    trackVisit();
  }, []);

  return (
    <div className="paper-texture" style={{ display: 'flex', flexDirection: 'column' }}>
      {settings?.showCursor !== false && <CustomCursor />}
      <Navbar isOverlay={isProjectDetail} />
      <main style={{ flexGrow: 1, paddingTop: isProjectDetail ? 0 : '2.5rem' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LangProvider>
      <SiteProvider>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToTop />
          <ThemeSync />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </MainLayout>
        </Router>
      </SiteProvider>
    </LangProvider>
  );
}
