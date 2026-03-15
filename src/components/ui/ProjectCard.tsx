'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: 'default' | 'featured';
  className?: string;
}

const categoryColors: Record<string, string> = {
  'Web Design': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'UI/UX': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Web App': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'AI Agent': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'E-Commerce': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'Branding': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'Mobile': 'text-green-400 bg-green-400/10 border-green-400/20',
};

const placeholderGradients = [
  '#0e1a2e, #0c3a5a',
  '#1a0e2e, #3a0c5a',
  '#0e2e1a, #0c5a3a',
  '#2e1a0e, #5a3a0c',
  '#1a1a2e, #2e2e5a',
  '#2e0e1a, #5a0c3a',
];

export default function ProjectCard({ project, index = 0, variant = 'default', className }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const catColor = categoryColors[project.category] ?? 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  const showPlaceholder = !project.thumbnail || imgError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#111124]',
        'hover:border-white/[0.12] transition-all duration-500',
        variant === 'featured' && 'md:col-span-1',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d1a]">
        {showPlaceholder ? (
          /* Fallback gradient when no image or image fails */
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${placeholderGradients[index % placeholderGradients.length]})` }}
          >
            <div className="absolute inset-4 rounded-lg border border-white/[0.05] bg-white/[0.02] flex flex-col gap-2 p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-16 h-1.5 rounded bg-white/10" />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="col-span-2 rounded bg-white/[0.04]" />
                <div className="rounded bg-white/[0.04]" />
              </div>
              <div className="h-6 rounded bg-white/[0.04]" />
              <div className="h-4 rounded bg-white/[0.04] w-2/3" />
            </div>
          </div>
        ) : (
          /* Real thumbnail */
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        {/* Bottom fade so content doesn't clash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111124] via-transparent to-transparent opacity-50" />

        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <ExternalLink size={13} />
              Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          <Link
            href={project.caseStudyUrl ?? '#'}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/80 backdrop-blur-sm text-white text-sm font-medium hover:bg-cyan-500 transition-colors"
          >
            Case study
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-2', catColor)}>
              {project.category}
            </span>
            <h3 className="text-white font-semibold text-base leading-snug group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span className="text-xs text-slate-600 shrink-0 mt-1">{project.year}</span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs text-slate-500 border border-white/[0.06] bg-white/[0.02]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-5 flex items-center gap-4">
        <Link
          href={project.caseStudyUrl ?? '#'}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors duration-200 group/link"
        >
          View case study
          <ArrowUpRight
            size={12}
            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-400 transition-colors duration-200"
          >
            <Github size={12} />
            GitHub
          </a>
        )}
      </div>
    </motion.article>
  );
}
