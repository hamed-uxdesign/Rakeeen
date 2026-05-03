import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Offline } from './pages/Offline';
import { CustomCursor } from './components/ui/CustomCursor';
import { SiteProvider, useSiteContext } from './contexts/SiteContext';
import { LangProvider } from './contexts/LangContext';
import { db } from './services/firebase.service';
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

// Applies the favicon from SiteContext to the browser tab
const FaviconSync = () => {
  const { siteConfig } = useSiteContext();
  useEffect(() => {
    const faviconUrl = siteConfig?.siteImages?.favicon;
    if (faviconUrl) {
      const link = document.getElementById('favicon') as HTMLLinkElement;
      if (link) {
        link.href = faviconUrl;
      }
    }
  }, [siteConfig?.siteImages?.favicon]);
  return null;
};

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const { settings, isInitialLoad, setInitialLoadComplete } = useSiteContext();
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/project/');
  const isHome = location.pathname === '/';

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

  useEffect(() => {
    if (isInitialLoad) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh'; // Prevent scrolling on some mobile browsers
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isInitialLoad]);

  useEffect(() => {
    if (!isHome && isInitialLoad) {
      setInitialLoadComplete();
    }
  }, [isHome, isInitialLoad, setInitialLoadComplete]);

  return (
    <div className="paper-texture" style={{ display: 'flex', flexDirection: 'column' }}>
      {settings?.showCursor !== false && <CustomCursor />}
      <div style={{ 
        opacity: isInitialLoad ? 0 : 1, 
        transition: 'opacity 0.8s ease 0.2s',
        pointerEvents: isInitialLoad ? 'none' : 'auto',
        position: 'relative',
        zIndex: 100
      }}>
        <Navbar isOverlay={isProjectDetail} />
      </div>
      <main style={{ flexGrow: 1, paddingTop: (isProjectDetail || isHome) ? 0 : '2.5rem' }}>
        {children ?? <Outlet />}
      </main>
      <div style={{ 
        opacity: isInitialLoad ? 0 : 1, 
        transition: 'opacity 0.8s ease 0.6s',
        pointerEvents: isInitialLoad ? 'none' : 'auto'
      }}>
        <Footer />
      </div>
    </div>
  );
};

// Watches online/offline status and shows the film-noir offline page
const OnlineGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  if (!isOnline) return <Offline />;
  return <>{children}</>;
};

export default function App() {
  return (
    <LangProvider>
      <SiteProvider>
        <OnlineGuard>
          <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <ScrollToTop />
            <ThemeSync />
            <FaviconSync />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </OnlineGuard>
      </SiteProvider>
    </LangProvider>
  );
}
