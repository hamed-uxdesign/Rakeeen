import { Project, TimelineItem, Competency, WorkflowPhase } from '../types';

export const SITE_CONFIG = {
  name: { en: "Hamed Walid", ar: "حامد وليد", it: "Hamed Walid" },
  role: {
    en: "Product-Focused UI/UX Designer",
    ar: "UX/UI ديزاينر مركز ع المنتج",
    it: "UI/UX Designer Focalizzato sul Prodotto"
  },
  location: { en: "", ar: "", it: "" },
  email: "Hamed.rakeeen@gmail.com",
  summary: { en: "", ar: "", it: "" },
  detailed_summary: {
    en: "UX Designer with 3+ years of experience bridging the gap between complex business logic\nand human-centered design. From my early start in graphic design to building scalable digital\nproducts in Egypt and Saudi Arabia, my focus has always been Simplicity.\nI leverage AI\nworkflows to accelerate prototyping and delivery by 10X, ensuring that every pixel serves a\npurpose and every journey is frictionless for the end user.",
    it: "UX Designer con oltre 3 anni di esperienza nel colmare il divario tra logica di business e design centrato sull'utente. Dagli inizi nel graphic design alla creazione di prodotti digitali scalabili tra Egitto e Arabia Saudita, il mio focus è sempre la Semplicità Integro workflow di AI per accelerare prototipazione e delivery di 10 volte, assicurando che ogni pixel abbia uno scopo e ogni user journey sia fluida e senza intoppi",
    ar: "مصمم تجربة المستخدم بخبرة +3 سنين في تحويل تعقيدات البيزنس لتصاميم سهلة الاستخدام. رحلتي بدأت من الجرافيك ديزاين لحد بناء منتجات رقمية في مصر والسعودية، ومبدئي دايماً البساطة بستخدم الـ AI عشان أسرع الـ Prototyping والتسليم لـ 10 أضعاف، عشان أضمن إن كل بكسل له هدف، وكل رحلة للمستخدم تكون سلسة ومن غير مجهود"
  },
  heroHeadline: {
    en: "Designing for Human with AI",
    ar: "بصمم للناس ... بالذكاء الاصطناعي",
    it: "Progettare per l'uomo... con l'IA"
  },
  heroSubtitle: {
    en: "UX Designer turning complex ideas into simple, user-friendly products.\nCombining human-centered design with AI to deliver high-quality results, fast",
    ar: "مصمم تجربة المستخدم بساعدك تحول فكرتك لمنتج بسيط وسهل الاستخدام.\nبدمج بين التصميم المريح والذكاء الاصطناعي عشان أطلعلك شغل تقيل في وقت قياسي",
    it: "Designer UX trasformo idee complesse in prodotti semplici e intuitivi.\nUnisco design umano e IA per risultati di qualità in tempi record"
  },
  heroBtnPrimary: { en: "", ar: "", it: "" },
  heroBtnSecondary1: { en: "", ar: "", it: "" },
  heroBtnSecondary2: { en: "", ar: "", it: "" },
  socials: {
    linkedin: "https://www.linkedin.com/in/rakeeen/",
    behance: "https://www.behance.net/rakeeen"
  },
  siteImages: {
    navbarLogo: "https://res.cloudinary.com/dkw7eqxd2/image/upload/v1778502571/pgpzmxcx6h3ofmuaaoa9.jpg",
    aboutPortrait: "https://res.cloudinary.com/dkw7eqxd2/image/upload/v1778502059/mizl1wirm2zod6lnla94.jpg",
    favicon: "https://res.cloudinary.com/dkw7eqxd2/image/upload/v1778505083/n0xreubq3tgjmakb7dbz.png",
    contactBackground: "",
    projectDetail1: "",
    projectDetail2: "",
    projectDetail3: ""
  },
  tools: [],
  contactForm: {
    enabled: true,
    heading: { en: "Send a Letter", ar: "ابعت رسالة بروح زمان", it: "Invia una Lettera" },
    subtitle: { en: "Old school vibes. New school response time.", ar: "طابع كلاسيكي، بس برد عليك طيارة.", it: "Atmosfera vintage. Tempi di risposta moderni." },
    labelName: { en: "Your Name", ar: "اسمك إيه؟", it: "Il tuo Nome" },
    labelEmail: { en: "Your Email", ar: "إيميلك", it: "La tua Email" },
    labelMessage: { en: "Your Message", ar: "عايز تقول إيه؟", it: "Il tuo Messaggio" },
    placeholderName: { en: "Who's writing?", ar: "سجل اسمك هنا", it: "Chi scrive?" },
    placeholderEmail: { en: "So I can write back", ar: "عشان أعرف أرد عليك", it: "Così posso risponderti" },
    placeholderMessage: { en: "What's on your mind?", ar: "حابب تقول إيه؟", it: "Cosa hai in mente?" },
    btnText: { en: "Send It!", ar: "طيّر الرسالة", it: "Invia!" },
    successHeading: { en: "Letter sent!", ar: "الرسالة طارت!", it: "Lettera inviata!" },
    successBody: { en: "I'll get back to you. Promise.", ar: "هرد عليك قريب، مفيش كلام.", it: "Ti risponderò presto. Promesso." },
    responseTime: { en: "I respond within 24hrs", ar: "برد في أقل من يوم", it: "Rispondo entro 24 ore" }
  }
};

export const PROJECTS: Project[] = [
  {
    id: "1778502708356",
    title: { en: "Book a Doctor in 3 steps", ar: "", it: "" },
    link: "https://www.behance.net/gallery/242827673/Alhayat-Designing-a-Seamless-Doctor-Booking-app",
    featured: false
  },
  {
    id: "1778502742805",
    title: { en: "New Way to Design Arab Apps", ar: "", it: "" },
    link: "https://www.behance.net/gallery/228718391/Athar"
  },
  {
    id: "1778502764414",
    title: { en: "Live Chat ? Here", ar: "", it: "" },
    link: "https://www.behance.net/gallery/233544029/15-Mayo-Live-Chat-App"
  },
  {
    id: "1778502780838",
    title: { en: "Food App ? Here", ar: "", it: "" },
    link: "https://www.behance.net/gallery/228720039/Food-App"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    company: { en: "Alsanosy", ar: "السنوسي", it: "Alsanosy" },
    year: "Oct 2023 ... Apr 2024",
    role: { en: "Media Buyer", ar: "مشتري مساحات اعلانيه", it: "Media Buyer" },
    description: {
      en: "I started in marketing, graphic design, and video editing. I handled data entry and created presentations to help the team visualize ideas.",
      it: "Ho iniziato con la grafica, il montaggio video e la pubblicità. Mi occupavo anche di gestire dati e creare presentazioni efficaci.",
      ar: "بدأت مشواري في مجال الدعاية والإعلان وتجهيز الفيديوهات وتصميم الصور. كنت مسؤول كمان عن إدخال البيانات وعرض التقارير بشكل يسهل فهمه. "
    }
  },
  {
    company: { en: "Mint Ops", ar: "مينت اوبس", it: "Mint Ops" },
    year: "Apr 2024 ... Oct 2024",
    role: { en: "UIX Designer", ar: "مصمم تجربة وواجهات المستخدم", it: "" },
    description: {
      en: "I joined as a trainee to learn how to design better digital experiences. For 6 months, I focused on solving user problems through simple layouts.",
      it: "Ho fatto un tirocinio di 6 mesi per imparare a creare app facili da usare. Mi sono concentrato sulla semplicità e sulla soluzione di problemi reali.",
      ar: "بدأت أتعمق في إزاي أصمم تطبيقات ومواقع تريح الناس اللي بتستخدمها. اتدربت لمدة 6 شهور على إزاي أحول الأفكار المعقدة لحلول بسيطة وعملية."
    }
  },
  {
    company: { en: "Rakeeen", ar: "ركيـــن", it: "Rakeeen" },
    year: "Apr 2024 ... Present",
    role: { en: "Freelancer", ar: "مدير نفسي", it: "" },
    description: {
      en: "I designed financial dashboards and service apps for international clients. I used AI tools to speed up my work and deliver high-quality designs.",
      it: "Ho progettato sistemi finanziari e app di servizi per clienti in tutto il mondo. Ho usato l’IA per lavorare più velocemente e con precisionه.",
      ar: "اشتغلت مع عملاء من كذا دولة وصممت لوحات تحكم مالية وتطبيقات خدمية. ركزت في الفترة دي على استخدام الذكاء الاصطناعي عشان أنجز الشغل بجودة عالية وسرعة خيالية."
    }
  },
  {
    company: { en: "Alhayat", ar: "الحياه", it: "" },
    year: "Sep 2025 ... Present",
    role: { en: "UX Designer", ar: "مصمم تجربه", it: "" },
    description: {
      en: "Currently leading the design of the \"Alhayat\" app from scratch. I created features to make the app easy to use for families and older generations.",
      it: "Oggi gestisco l’intero design dell’app Alhayat. Ho creato funzioni speciali per rendere la tecnologia semplice per tutta la famiglia.",
      ar: "حالياً أنا المسؤول عن تصميم التطبيق من الألف للياء لضمان راحة المستخدمين. صممت مميزات خاصة بتسهل استخدام التكنولوجيا لكبار السن وللعيلة كلها."
    }
  }
];

export const COMPETENCIES: Competency[] = [
  { title: { en: "Ui Design", ar: "بناء الواجهات", it: "Design Interfacce" } },
  { title: { en: "UX Research", ar: "فهم المستخدم", it: "Ricerca Utente" } },
  { title: { en: "Quick Learner", ar: "سرعة التعلم", it: "Apprendimento Rapido" } },
  { title: { en: "AI Workflows", ar: "الذكاء الاصطناعي", it: "Flussi IA" } },
  { title: { en: "Problem Solver", ar: "حل المشكلات", it: "Risolutore Problemi" } },
  { title: { en: "Prompt Engineering", ar: "هندسة الأوامر", it: "Ingegneria Prompt" } },
  { title: { en: "Logical Thinking", ar: "تفكير منطقي", it: "Pensiero Logico" } },
  { title: { en: "Rapid Prototyping", ar: "البناء السريع", it: "Prototipazione Rapida" } },
  { title: { en: "Team Player", ar: "شغل الفريق", it: "Lavoro Squadra" } }
];

export const DEFAULT_WORKFLOW_PHASES: WorkflowPhase[] = [
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
