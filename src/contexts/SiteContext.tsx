import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SITE_CONFIG as DEFAULT_CONFIG, PROJECTS as DEFAULT_PROJECTS, TIMELINE as DEFAULT_TIMELINE, COMPETENCIES as DEFAULT_COMPETENCIES } from '../utils/constants';
import { Project, TimelineItem, Competency } from '../types';
import { db } from '../services/firebase.service';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

interface UISettings {
  showCursor: boolean;
  theme: 'dark' | 'light';
}

interface SiteContextType {
  siteConfig: typeof DEFAULT_CONFIG;
  projects: Project[];
  timeline: TimelineItem[];
  competencies: Competency[];
  inquiries: Inquiry[];
  settings: UISettings;
  syncComplete: boolean;
  isInitialLoad: boolean;
  updateConfig: (config: Partial<typeof DEFAULT_CONFIG>) => void;
  updateProjects: (projects: Project[]) => void;
  updateTimeline: (timeline: TimelineItem[]) => void;
  updateCompetencies: (competencies: Competency[]) => void;
  updateSettings: (settings: Partial<UISettings>) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  markInquiryRead: (id: string) => void;
  setInitialLoadComplete: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [siteConfig, setSiteConfig] = useState(DEFAULT_CONFIG);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [timeline, setTimeline] = useState(DEFAULT_TIMELINE);
  const [competencies, setCompetencies] = useState(DEFAULT_COMPETENCIES);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [syncComplete, setSyncComplete] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [settings, setSettings] = useState<UISettings>(() => {
    // 1. First priority: User's manual persistent choice
    const local = localStorage.getItem('visitor_settings');
    if (local) return JSON.parse(local);

    // 2. Second priority: Browser/System preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return { showCursor: true, theme: prefersDark ? 'dark' : 'light' };
  });

  // Real-time synchronization with System Theme changes (Light/Dark mode)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't made a manual persistent choice on this device
      if (!localStorage.getItem('visitor_settings')) {
        setSettings(prev => ({ ...prev, theme: e.matches ? 'dark' : 'light' }));
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'content', 'main');
    
    // Subscribe to Firestore for global configuration defaults
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.siteConfig) {
          setSiteConfig({
            ...DEFAULT_CONFIG,
            ...data.siteConfig,
            contactForm: { ...(DEFAULT_CONFIG.contactForm || {}), ...(data.siteConfig.contactForm || {}) },
            socials: { ...(DEFAULT_CONFIG.socials || {}), ...(data.siteConfig.socials || {}) },
            siteImages: { ...(DEFAULT_CONFIG.siteImages || {}), ...(data.siteConfig.siteImages || {}) }
          });
        }
        if (data.projects) setProjects(data.projects);
        if (data.timeline) setTimeline(data.timeline);
        if (data.competencies) setCompetencies(data.competencies);
        
        // Respect Firestore defaults ONLY if no local manual override exists
        if (data.settings && !localStorage.getItem('visitor_settings')) {
          setSettings(data.settings);
        }
      } else {
        const initialData = {
          siteConfig: DEFAULT_CONFIG,
          projects: DEFAULT_PROJECTS,
          timeline: DEFAULT_TIMELINE,
          competencies: DEFAULT_COMPETENCIES,
          settings: { showCursor: true, theme: 'dark' }
        };
        setDoc(docRef, initialData);
      }
      setSyncComplete(true);
    });

    return () => unsub();
  }, []);

  // Persist settings locally whenever they change
  useEffect(() => {
    localStorage.setItem('visitor_settings', JSON.stringify(settings));
  }, [settings]);

  const updateConfig = (config: Partial<typeof DEFAULT_CONFIG>) => setSiteConfig(prev => ({ ...prev, ...config }));
  const updateProjects = (newProjects: Project[]) => setProjects(newProjects);
  const updateTimeline = (newTimeline: TimelineItem[]) => setTimeline(newTimeline);
  const updateCompetencies = (newCompetencies: Competency[]) => setCompetencies(newCompetencies);
  const updateSettings = (newSettings: Partial<UISettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const markInquiryRead = (id: string) => {
    setInquiries(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'read' } : inv));
  };

  const setInitialLoadComplete = () => {
    setIsInitialLoad(false);
  };

  return (
    <SiteContext.Provider value={{
      siteConfig,
      projects,
      timeline,
      competencies,
      inquiries,
      settings,
      syncComplete,
      updateConfig,
      updateProjects,
      updateTimeline,
      updateCompetencies,
      updateSettings,
      addInquiry,
      markInquiryRead,
      isInitialLoad,
      setInitialLoadComplete
    }}>
      {syncComplete ? children : null}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteContext must be used within a SiteProvider');
  return context;
};
