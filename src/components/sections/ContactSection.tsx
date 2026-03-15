'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import GlowButton from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Github, href: 'https://github.com/javtechtt', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/javaljoseph/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:connect@javal.dev', label: 'Email' },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase = 'w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-slate-600 text-sm outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-200';

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Get in touch"
        title="Let&apos;s build something "
        highlight="great"
        description="Have a project in mind? I'd love to hear about it. Let's talk."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {status === 'error' && (
            <div className="mb-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/[0.06] text-red-400 text-sm">
              Something went wrong. Please try again or email me directly at{' '}
              <a href="mailto:connect@javal.dev" className="underline">connect@javal.dev</a>.
            </div>
          )}
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Message sent!</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Thanks for reaching out. I&apos;ll get back to you within 1–2 business days.
              </p>
              <button
                onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={cn(inputBase, 'resize-none')}
                />
              </div>
              <GlowButton
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={status === 'sending'}
            onClick={status === 'error' ? () => setStatus('idle') : undefined}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={15} />
                    Send message
                  </>
                )}
              </GlowButton>
            </form>
          )}
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Availability */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-400">Available for work</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Currently accepting new projects and collaborations. Remote-first, with availability for on-site in select locations.
            </p>
          </div>

          {/* Direct email */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-[0.15em] mb-2">Direct email</p>
            <a
              href="mailto:connect@javal.dev"
              className="text-white font-medium hover:text-cyan-400 transition-colors duration-200"
            >
              connect@javal.dev
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-[0.15em] mb-4">Follow</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Response time */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-[0.15em] mb-2">Response time</p>
            <p className="text-white text-sm">Usually within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
