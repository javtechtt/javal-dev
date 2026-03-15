'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { AnimatedWords } from '@/components/ui/AnimatedText';
import VoiceAssistant from '@/components/sections/VoiceAssistant';

const stats = [
  { value: '100+', label: 'Projects delivered' },
  { value: '5yr', label: 'Experience' },
  { value: '50+', label: 'Happy clients' },
];

export default function HeroSection() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-24">
      {/* Ambient orbs */}
      <div
        className="orb w-[600px] h-[600px] opacity-[0.12] -top-40 -left-40"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
      />
      <div
        className="orb w-[500px] h-[500px] opacity-[0.10] top-20 -right-40"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />
      <div
        className="orb w-[400px] h-[400px] opacity-[0.08] bottom-0 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <Sparkles size={12} />
          Available for new projects
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <AnimatedWords
            text="AI Agent Developer"
            className="block text-white"
            delay={0.2}
          />
          <span className="block">
            <AnimatedWords
              text="& UI/UX"
              className="text-gradient"
              delay={0.4}
            />
            <AnimatedWords
              text=" Engineer"
              className="text-white"
              delay={0.55}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          I design and build modern digital products, from pixel-perfect interfaces to
          production-ready web platforms and intelligent AI agents.
        </motion.p>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.88 }}
          className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-10"
        >
          Building intelligent web products at the intersection of AI, UX, and modern web development
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <GlowButton variant="primary" size="lg" icon onClick={scrollToWork}>
            View my work
          </GlowButton>
          <GlowButton variant="secondary" size="lg" onClick={scrollToContact}>
            Start a project
          </GlowButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Voice Assistant — integrated into hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="w-full"
        >
          <VoiceAssistant />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
