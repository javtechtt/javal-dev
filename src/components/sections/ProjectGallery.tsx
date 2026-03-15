'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { cn } from '@/lib/utils';

const categories: Array<'All' | ProjectCategory> = [
  'All',
  'AI Agent',
  'Web Design',
  'Web App',
  'E-Commerce',
  'UI/UX',
];

export default function ProjectGallery() {
  const [active, setActive] = useState<'All' | ProjectCategory>('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Portfolio"
        title="All "
        highlight="Work"
        description="Every project tells a story. Browse by category or explore everything."
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
              active === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/20'
                : 'border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
