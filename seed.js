import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const siteConfig = {
  name: 'Hamed Walid',
  role: 'Product-Focused UI/UX Designer | AI Integrator',
  location: 'Cairo, Egypt',
  phone: '+20 111 204 6671',
  whatsapp: '+201112046671',
  email: 'Hamed.rakeeen@gmail.com',
  summary: 'UI/UX Designer with 3+ years of experience bridging the gap between complex business logic and human-centered design. From an early start in graphic design to building scalable digital products in Egypt and Saudi Arabia — my focus has always been Simplicity. I leverage AI workflows to accelerate prototyping and delivery by 10X, ensuring that every pixel serves a purpose and every journey is frictionless.',
  detailed_summary: 'UI/UX Designer bridging complex business logic and human-centered design. Leveraging AI workflows to accelerate delivery by 10X — every pixel serves a purpose.',
  socials: {
    x: 'https://x.com/Rakeeeeeeen',
    linkedin: 'https://www.linkedin.com/in/rakeeen/',
    behance: 'https://www.behance.net/rakeeen',
  },
  siteImages: {
    aboutPortrait: '/hamed_portrait.jpg',
    contactBackground: '/old_road.png',
    projectDetail1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9klW_cfF-8n7D00AzX-du6k2WKlgyizY5r0r-IbdUqg3jGjNYVKT-XoEU1io1hP38fyahcRohwIxj-rGZD0-3siP5X9uBJIDjB3rnYw_-iJCD1gRIF2CGZIJp0PjsbHseVKAxnI_1OlRSLeEtPrsECulquUw7evmH-i-BYCubQzuQBrRv83ZUHL6qStpEosQEz2lpFQXWKtr_8pkvo5ZQx4hZLQ-dI4Yh3m5CSGB9_yLp4sXlXOEq40w8FDUVwGZXpIDst7QmkDRY',
    projectDetail2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdPDBofmGncyBE1srfqvQUTU_2KsUl0uEZldTpxbTr_esn2ulmOTibDs8RzQ28jn1gwSyEXRWPhmvL5GUceC1YG80_alVDGyPotOm2XUKp4rbqs4BiDsYFnKq9h1ZPT_NkeDMrloMurZtqLeI3yglNn5s5bjwedQYZItSG1D1wVcBS2-_63A6_Zqc0Vn3A1Xfr0dlEZT7k9eQIfCtZA_h5mxiCNGzi_IT3H369vmbUvkN8c6seipTbP4Cf3sbYT3QZ5K_In9UEtU-Y',
    projectDetail3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkirkdA-zx8jyVgU0OLGKWvcSxPqbo80BGe5RaVTi_4hziPm6GOLUvl1Au_dMSgLGmfKy1qHEiP_jDzYBdXVA2fwHfZL0y8ed8SXhi_zB2n6BdY6Jt3BexA0ZdZ2Xd4fj0Ks8AF9xZ2QZPD2fKyzKgdsULwzSKDJ7sBE17pDHsQH9U7AGlolE2FzSfaYOwDsIaO3T3uIp1H4ncXnh3PsKT8aFdcP5lhVMpxgIhrO66hj63QS_ZUGDaz1dLJCpBcWd-Lq9-DqCDOkp6'
  },
  tools: ['Figma', 'Adobe Suite', 'Framer', 'AI Workflows']
};

const timeline = [
  {
    year: 'Sept 2025 — Present',
    role: 'UI/UX Designer',
    company: 'Alhayat Company',
    description: 'Led the UI/UX phase for the Alhayat app from scratch, collaborating with cross-functional teams. Designed the "Family Management" feature enabling proxy bookings for non-tech-savvy family members, expanding accessibility to older generations. Simplified complex navigation flows ensuring seamless experience for a growing user base in KSA.',
    tags: ['Saudi Arabia', 'Full-Time', 'On-site', 'Mobile App']
  },
  {
    year: '2022 — Sept 2025',
    role: 'Freelance UI/UX Designer',
    company: 'International Projects',
    description: 'Delivered high-impact designs across Egypt, KSA, and Canada. Designed a private revenue management system for 1,500+ users. Built Tamam App UX for on-demand geo-location services. Integrated AI Prompt Engineering into design cycles for rapid prototyping, reducing time-to-market significantly. Delivered high-fidelity designs for E-commerce, Chat apps, and Landing Pages.',
    tags: ['Egypt', 'KSA', 'Canada', 'Remote', 'Freelance']
  },
  {
    year: '2020 — 2022',
    role: 'Graphic Designer',
    company: 'Self-employed',
    description: 'Started career in visual communication — branding, print, and social media design. This foundation in visual composition directly informed the precision and clarity that defines the current design philosophy.',
    tags: ['Cairo', 'Branding', 'Graphic Design']
  }
];

const competencies = [
  {
    title: 'UX Mastery',
    description: 'User Research, Wireframing, Information Architecture, Usability Testing, Problem Solving, User Flows, Responsive Web Design.',
    icon: 'design_services'
  },
  {
    title: 'UI & Visuals',
    description: 'Minimalist Design, Color Theory, Typography, Visual Storytelling, Design Systems, Brand Identity.',
    icon: 'palette'
  },
  {
    title: 'AI Productivity',
    description: 'AI-Assisted Prototyping, Prompt Engineering for Layouts & Copywriting, Design Automation — 10X delivery acceleration.',
    icon: 'auto_awesome'
  },
  {
    title: 'Tools & Tech',
    description: 'Figma (Power User), Adobe Creative Suite (PS, AI, PR, AE), Adobe XD, Zeplin, VS Code, Framer (Beginner).',
    icon: 'construction'
  },
  {
    title: 'Product Thinking',
    description: 'End-to-end product lifecycle, Cross-functional team collaboration, Business objective alignment, Design for Business.',
    icon: 'psychology'
  },
  {
    title: 'Languages & Certs',
    description: 'Arabic (Native), English (Professional). Google Foundations of UX Design Certificate. Information Systems — Delta Higher Institute (3rd Year).',
    icon: 'language'
  }
];

const projects = [
  {
    id: 'alhayat-app',
    title: 'Alhayat Family App',
    description: 'Led the UI/UX phase from scratch for a Saudi-based healthcare platform, collaborating with cross-functional teams to align design decisions with core business objectives and a fast-paced delivery environment.',
    tags: ['UI/UX Design', 'Mobile App', 'Healthcare', 'Saudi Arabia'],
    category: 'Mobile Application',
    featured: true,
    client: 'Alhayat Company',
    role: 'Lead UI/UX Designer',
    duration: 'Sept 2025 – Present',
    challenge: 'Users struggled to book medical appointments for elderly and non-digital family members, creating deep friction and abandoned booking funnels at a critical scale.',
    painPoints: 'Non-tech-savvy users (60+) had zero discoverability of core booking flows. Drop-off rates spiked at every critical handoff. Data hierarchy within the app was completely disorganized, building deep user distrust.',
    strategy: 'Designed the "Family Management" module as a first-class proxy booking system — an entirely separate navigational context mapped specifically to caregiver and elder mental models, with zero ambiguity at every micro-step.',
    solution: 'A seamlessly intuitive end-to-end medical app with a Family Management core — enabling any family member to manage the healthcare journey of another, regardless of digital literacy.',
    architecture: '1. Proxy Account Engine — delegated booking with permission scopes\n2. Unified Patient Timeline — family-wide health history view\n3. Smart ETA & Notification Layer — real-time appointment confidence',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588776814546-1ffbb3dab4b4?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2791&auto=format&fit=crop'
    ],
    dynamicSections: []
  },
  {
    id: 'private-revenue-system',
    title: 'Revenue Management System',
    description: 'Designed a closed enterprise revenue management platform transforming overwhelming raw financial data into intuitive, actionable visual command centers for over 1,500 daily active users.',
    tags: ['Enterprise Dashboard', 'Data Visualization', 'Fintech', 'UX Strategy'],
    category: 'Web Dashboard',
    featured: true,
    client: 'Confidential (International)',
    role: 'Freelance UI/UX Designer',
    duration: '2022 – 2025',
    challenge: 'A critical decision-making paralysis caused by unstructured dense spreadsheet exports — 1,500+ finance workers spending 60% of their day attempting to interpret data instead of acting on it.',
    painPoints: 'Nested horizontal scrolling tables breaking cognitive load. No visual hierarchy to separate KPIs from secondary metrics. Zero filtering — executives and entry-level users seeing identical cluttered views.',
    strategy: 'Ran a deep Jobs-to-Be-Done audit across all 6 user roles, then rebuilt the entire information architecture from scratch. Prioritized ruthless metric reduction — surfacing only the top 3 KPIs above the fold per role context.',
    solution: 'A state-of-the-art, role-aware revenue command center adopted exclusively by 1,500+ users — reducing average report interpretation time from 47 minutes to under 4 minutes per session.',
    architecture: '1. Role-Contextualized Widget Grid — unique layout per user persona\n2. Real-time Zero-Latency Filtering Funnels\n3. Algorithmic Anomaly Highlighting Tables',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2948&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop'
    ],
    dynamicSections: []
  },
  {
    id: 'tamam-ondemand',
    title: 'Tamam App',
    description: 'Architected the complete user experience for a geo-location on-demand service app bridging households with verified local technicians — focusing relentlessly on trust, reliability and speed.',
    tags: ['On-Demand', 'Geo-Location', 'Mobile UX', 'Service Design'],
    category: 'Mobile Application',
    featured: true,
    client: 'Tamam Startup',
    role: 'Freelance UI/UX Designer',
    duration: '2022 – 2025',
    challenge: 'Households completely distrusted anonymous technician dispatching. Zero confidence in arrival ETAs caused mass service abandonment within the first 90 seconds of booking.',
    painPoints: 'Opaque background-check systems left users with safety anxiety. Map UIs masked rather than revealed technician proximity context. Booking confirmation flows were 11 taps deep with zero feedback loops.',
    strategy: 'Led a trust-by-design philosophy — rebuilt the entire service dispatch flow around radical transparency. Technician profiles, live GPS pins, photo IDs, and community ratings surfaced at every critical trust-checkpoint.',
    solution: 'A high-fidelity geo-synchronized booking platform delivering instantaneous local technician connections with radical transparency into every step of the service journey.',
    architecture: '1. Predictive Location Confidence Funnels\n2. Real-time Technician Proximity Pacing\n3. Micro-Confirmation Booking Modules (3-tap flow)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop'
    ],
    dynamicSections: []
  },
  {
    id: 'wiqaa-system',
    title: 'Wiqaa (وِقْعَة)',
    description: 'Founded and built an end-to-end internal system and customer journey for a startup solving daily life challenges — managing team workflows and mastering Design for Business.',
    tags: ['Startup Founder', 'Product Design', 'B2B & B2C', 'Design Strategy'],
    category: 'Product Architecture',
    featured: true,
    client: 'Wiqaa — Internal',
    role: 'Founder & Lead Product Designer',
    duration: '2023 – 2024',
    challenge: 'Simultaneously serving two completely different audiences — operations teams and end-consumers — under one coherent product umbrella without fragmenting the experience for either side.',
    painPoints: 'Internal workflows were entirely paper-based with catastrophic order tracking gaps. Customer-facing journeys were undefined. Communication between service fulfillment and consumer expectations was completely misaligned.',
    strategy: 'Designed a Dual-Faced Architecture — one internal command layer feeding one consumer-facing delivery interface, governed by a shared real-time data backbone ensuring zero information asymmetry between operations and customers.',
    solution: 'A unified product ecosystem simultaneously scaling internal operations efficiency and maintaining frictionless consumer experiences — proving that design thinking is the highest-leverage business tool.',
    architecture: '1. Bifurcated Control Layers — Admin vs. Consumer Modes\n2. Omni-channel Command Desks for operations\n3. Fluid B2C Transaction Pipes with live status tracking',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2952&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2952&auto=format&fit=crop'
    ],
    dynamicSections: []
  }
];

const run = async () => {
    try {
        const docRef = doc(db, 'content', 'main');
        await setDoc(docRef, {
          siteConfig,
          timeline,
          competencies,
          projects,
          settings: { showCursor: true, theme: 'dark' }
        }, { merge: true });
        console.log("✅ Full CV-aligned content successfully written to Firebase.");
        process.exit(0);
    } catch (e) {
        console.error("❌ Error:", e);
        process.exit(1);
    }
};

run();
