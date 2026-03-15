import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/javaljoseph/', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#05050f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-sm">
                J
              </div>
              <span className="font-semibold text-white tracking-tight">
                javal<span className="text-cyan-400">.dev</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Digital creative & UI/UX developer crafting premium web experiences that convert and inspire.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Available for new projects.{' '}
              <a href="#contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Get in touch →
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} javal.dev — All rights reserved
          </p>
          <p className="text-xs text-slate-600">
            Designed & built with Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
