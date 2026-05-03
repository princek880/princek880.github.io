import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, AtSign } from 'lucide-react';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'prince.kumar@cern.ch',
    href: 'mailto:prince.kumar@cern.ch',
  },
  {
    Icon: AtSign,
    label: 'Institution',
    value: 'IIT Madras, Chennai',
    href: 'https://www.iitm.ac.in',
  },
];

const Field = ({ icon: Icon, label, id, type = 'text', textarea = false, ...rest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label
      htmlFor={id}
      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      <Icon size={16} strokeWidth={3} style={{ color: 'var(--blue)' }} />
      {label}
    </label>
    {textarea ? (
      <textarea
        id={id}
        rows={5}
        className="input-field"
        style={{ resize: 'vertical', minHeight: '120px' }}
        {...rest}
      />
    ) : (
      <input id={id} type={type} className="input-field" {...rest} />
    )}
  </div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus]   = useState('idle');
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" style={{ backgroundColor: 'rgba(240,192,32,0.85)', borderBottom: 'none' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2 className="section-title">
          <span className="section-number" style={{ color: 'var(--blue)' }}>08</span> GET IN TOUCH
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* ── Left: info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bauhaus-card"
          >
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', backgroundColor: 'var(--red)', border: '3px solid var(--border)', borderRadius: '0' }} />

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem', fontWeight: 500 }}>
              Whether you want to chat about GNNs, have a wild research idea, or just want to say hi—my inbox is always open!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3rem', height: '3rem', border: '3px solid var(--border)', backgroundColor: 'var(--blue)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    boxShadow: '4px 4px 0px 0px var(--border)'
                  }}>
                    <Icon size={20} strokeWidth={3} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {label}
                    </div>
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative equation */}
            <div style={{
              padding: '1.5rem',
              background: 'white',
              border: '3px solid var(--border)',
              boxShadow: '6px 6px 0px 0px var(--border)'
            }}>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', color: 'var(--red)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                CURRENT STATUS
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <span style={{ color: 'white', backgroundColor: 'var(--blue)', padding: '0.1rem 0.5rem', border: '2px solid var(--border)' }}>OPEN</span>
                {' '}FOR:<br />
                <span style={{ color: 'var(--red)' }}>"research collaborations"</span><br />
                <span style={{ color: 'var(--red)' }}>"PhD opportunities"</span><br />
                <span style={{ color: 'var(--red)' }}>"interesting problems"</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bauhaus-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <Field
                  icon={User}
                  label="Name"
                  id="contact-name"
                  name="from_name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  icon={Mail}
                  label="Email"
                  id="contact-email"
                  type="email"
                  name="from_email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <Field
                icon={MessageSquare}
                label="Subject"
                id="contact-subject"
                name="subject"
                placeholder="Research collaboration / PhD / ..."
                value={form.subject}
                onChange={handleChange}
                required
              />
              <Field
                icon={MessageSquare}
                label="Message"
                id="contact-message"
                name="message"
                textarea
                placeholder="Hi Prince, I wanted to reach out about..."
                value={form.message}
                onChange={handleChange}
                required
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="btn-primary"
                style={{
                  marginTop: '1rem',
                  backgroundColor: status === 'success' ? '#10b981' : status === 'error' ? 'var(--red)' : 'var(--blue)',
                }}
              >
                {status === 'loading' && (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                    <Send size={20} strokeWidth={3} />
                  </motion.div>
                )}
                {status === 'success' && <CheckCircle size={20} strokeWidth={3} />}
                {status === 'error'   && <AlertCircle size={20} strokeWidth={3} />}
                {status === 'idle'    && <Send size={20} strokeWidth={3} />}
                
                {status === 'loading' ? 'SENDING…'         :
                 status === 'success' ? 'MESSAGE SENT!'    :
                 status === 'error'   ? 'FAILED — RETRY'   : 'SEND MESSAGE'}
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
