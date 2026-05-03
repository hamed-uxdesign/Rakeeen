import React, { useState } from 'react';
import { useSiteContext } from '../contexts/SiteContext';
import { useLang } from '../contexts/LangContext';
import { MascotFace } from '../components/ui/MascotFace';
import { SketchyButton } from '../components/ui/SketchyButton';
import { db } from '../services/firebase.service';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

/* ─── Sketchy inline toast ─────────────────────── */
const SketchyToast = ({ message, type, onClose }: { message: string; type: 'error' | 'warn'; onClose: () => void }) => (
  <div
    style={{
      background: type === 'error' ? 'var(--rust)' : 'var(--sepia)',
      color: 'white',
      fontFamily: 'var(--font-sketch)',
      fontSize: '0.95rem',
      fontWeight: 700,
      fontStyle: 'normal',
      padding: '0.8rem 1.2rem',
      borderRadius: '4px 16px 4px 16px',
      boxShadow: '4px 5px 0 rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: '1rem',
      animation: 'fadeIn 0.3s ease',
    }}
  >
    <span>✕&nbsp; {message}</span>
    <button
      onClick={onClose}
      style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1, opacity: 0.8 }}
    >×</button>
  </div>
);

export const Contact = () => {
  const { siteConfig } = useSiteContext();
  const { t, resolveField, lang } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'warn' } | null>(null);

  React.useEffect(() => {
    document.title = `${t('contact')} | ${resolveField(siteConfig.name)}`;
  }, [t, resolveField, siteConfig.name]);

  // Resolve contactForm fields from Firebase config, with fallbacks
  const cf = (siteConfig as any).contactForm;
  const resolve = (field: any, fallback: string) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[lang] || field.en || fallback;
  };

  const formHeading = resolve(cf?.heading, t('sendLetter'));
  const formSubtitle = resolve(cf?.subtitle, t('oldSchool'));
  const lblName = resolve(cf?.labelName, t('yourName'));
  const lblEmail = resolve(cf?.labelEmail, t('yourEmail'));
  const lblMessage = resolve(cf?.labelMessage, t('yourMessage'));
  const phName = resolve(cf?.placeholderName, t('ph_name'));
  const phEmail = resolve(cf?.placeholderEmail, t('ph_email'));
  const phMessage = resolve(cf?.placeholderMessage, t('ph_message'));
  const btnText = resolve(cf?.btnText, '');
  const successHeading = resolve(cf?.successHeading, t('letterSent'));
  const successBody = resolve(cf?.successBody, '');
  const responseTime = resolve(cf?.responseTime, t('iRespond'));
  const formEnabled = cf?.enabled !== false;

  // Extra contact info items from dashboard (array of { label, value, type })
  const extraInfoItems: { label: any; value: string; type?: string }[] = cf?.extraInfo || [];

  const showToast = (message: string, type: 'error' | 'warn' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      showToast(t('fill_fields'), 'warn');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false
      });

      try {
        const ref = doc(db, 'analytics', 'main');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, { inquiries: increment(1) });
        } else {
          await setDoc(ref, { visitors: 1, inquiries: 1 });
        }
      } catch (e) {
        console.warn("Analytics tracking bypassed due to security rules.", e);
      }

      setSent(true);
    } catch (error: any) {
      console.error("Error submitting form", error);
      showToast(t('error_sending'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-sketch)",
    fontSize: "0.9rem",
    color: "var(--ink-light)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "block",
    marginBottom: "0.3rem"
  };

  return (
    <div className="page-container fade-in">
      <section style={{ padding: "3rem 0 5rem", maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "0.5rem" }}>{formHeading}</h1>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-faded)", marginBottom: "3rem" }}>{formSubtitle}</p>

        {/* Postcard */}
        <div style={{ background: "var(--cream)", border: "1.5px solid var(--ink-light)", borderRadius: "8px 30px 8px 30px", padding: "2.5rem 2rem", position: "relative", boxShadow: "6px 8px 0 rgba(42,32,24,0.1)" }}>
          <div style={{ borderBottom: "1px dashed var(--ink-light)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "var(--ink-light)", marginBottom: "0.3rem" }}>{t('to')} {resolveField(siteConfig.name)}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-light)" }}>{siteConfig.email}</p>
          </div>

          {!formEnabled ? (
            <div style={{ textAlign: "center", padding: "2rem 0", opacity: 0.5 }}>
              <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.5rem" }}>
                {lang === 'ar' ? 'نموذج التواصل غير متاح حالياً' : lang === 'it' ? 'Modulo non disponibile' : 'Contact form is currently unavailable.'}
              </p>
            </div>
          ) : !sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <label style={labelStyle}>{lblName}</label>
                <input className="input-line" placeholder={phName} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={isSubmitting} />
              </div>
              <div>
                <label style={labelStyle}>{lblEmail}</label>
                <input className="input-line" type="email" placeholder={phEmail} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled={isSubmitting} />
              </div>
              <div>
                <label style={labelStyle}>{lblMessage}</label>
                <textarea className="input-line" placeholder={phMessage} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} disabled={isSubmitting} />
              </div>

              {/* Custom inline toast — replaces native alert() */}
              {toast && <SketchyToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

              <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem" }}>
                <button className="wax-btn" onClick={handleSend} disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? '...' : <span dangerouslySetInnerHTML={{ __html: btnText || t('send_it') }} />}
                </button>
                <div>
                  <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "var(--ink-faded)" }}>{t('pressWax')}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--ink-light)" }}>{responseTime}</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}><MascotFace size={80} color="var(--forest)" /></div>
              <h3 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", color: "var(--forest)", marginTop: "1rem" }}>{successHeading}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-faded)" }}>{successBody || t('illGetBack', { name: formData.name })}</p>
              <SketchyButton style={{ marginTop: '2rem' }} onClick={() => { setSent(false); setFormData({ name: '', email: '', message: '' }); }}>{t('sendAnother')}</SketchyButton>
            </div>
          )}
        </div>

        <hr className="sketch-divider" />

        {/* Extra info items (phone, address, etc.) from Firebase */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {extraInfoItems.filter(item => item.value).map((item, i) => (
            <div key={i}>
              <p style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase" }}>
                {resolve(item.label, '')}
              </p>
              {item.type === 'phone' ? (
                <a href={`tel:${item.value}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--sepia)", textDecoration: 'none' }}>{item.value}</a>
              ) : item.type === 'link' ? (
                <a href={item.value} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--sepia)", textDecoration: 'none' }}>{item.value}</a>
              ) : (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--sepia)" }}>{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
