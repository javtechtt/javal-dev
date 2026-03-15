'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, Coffee } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillBadge from '@/components/ui/SkillBadge';
import GlowButton from '@/components/ui/GlowButton';
import { skills } from '@/data/skills';
import { SkillCategory } from '@/types';

const skillCategories: SkillCategory[] = ['Design', 'Frontend', 'Tools', 'Backend', 'AI Tools'];

const facts = [
  { icon: MapPin, text: 'Remote — worldwide' },
  { icon: Coffee, text: '100+ projects delivered' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-gradient-to-r from-cyan-400 to-blue-500" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.2em]">
              About me
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Where design{' '}
            <span className="text-gradient">meets code</span>
          </h2>

          <div className="space-y-4 text-slate-400 text-base leading-relaxed mb-8">
            <p>
              I&apos;m an AI Agent Developer and UI/UX Engineer working at the intersection of design and engineering.
              I believe great digital products aren&apos;t just visually appealing; they&apos;re intuitive, performant and carefully engineered.
            </p>
            <p>
              My interest in building products started with a simple curiosity: how can thoughtful product decisions drive business outcomes,
              and how can emerging technologies like AI be leveraged to push those outcomes even further.
            </p>
            <p>
              Over the past 5+ years, I&apos;ve worked with startups, agencies and established organizations to design and build web platforms
              that combine strong user experience with reliable technical foundations. My process starts by understanding the problem deeply,
              then translating that insight into thoughtful interfaces and scalable systems.
            </p>
            <p>
              Outside of client work, I enjoy exploring the evolving edge of technology, experimenting with AI agents, interactive interfaces,
              design systems and modern frontend technologies that shape the next generation of digital experiences.
            </p>
          </div>

          {/* Facts */}
          <div className="flex flex-wrap gap-4 mb-8">
            {facts.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon size={14} className="text-cyan-400 shrink-0" />
                {text}
              </div>
            ))}
          </div>

          <GlowButton variant="secondary" size="md" href="/resume/javal-joseph-resume.pdf" newTab>
            <Download size={15} />
            Download resume
          </GlowButton>
        </motion.div>

        {/* Right: Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <div key={category}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-4">
                  {category}
                </p>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} showBar />
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating tags (decorative skill badges) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 flex flex-wrap gap-2 justify-center"
      >
        {skills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </section>
  );
}
