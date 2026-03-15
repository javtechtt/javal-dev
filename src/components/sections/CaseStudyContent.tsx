'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { CaseStudy, ContentBlock, Project } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  study: CaseStudy;
  project?: Project;
}

const categoryColors: Record<string, string> = {
  'Web Design': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'UI/UX': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Web App': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'AI Agent': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'E-Commerce': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
};

function SectionBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) =>
        block.type === 'paragraph' ? (
          <p key={i} className="text-slate-400 leading-relaxed text-[15px]">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-cyan-400/70 shrink-0" />
                <span className="text-slate-400 leading-relaxed text-[15px]">{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function SkillsBlocks({ blocks }: { blocks: ContentBlock[] }) {
  const paragraphs = blocks.filter(
    (b): b is { type: 'paragraph'; text: string } => b.type === 'paragraph'
  );
  const skills = blocks
    .filter((b): b is { type: 'bullets'; items: string[] } => b.type === 'bullets')
    .flatMap((b) => b.items);

  return (
    <div>
      {paragraphs.map((b, i) => (
        <p key={i} className="text-slate-400 leading-relaxed text-[15px] mb-5">
          {b.text}
        </p>
      ))}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full text-xs border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-300 capitalize"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudyContent({ study, project }: Props) {
  const [imgError, setImgError] = useState(false);

  const catColor = project
    ? (categoryColors[project.category] ?? 'text-slate-400 bg-slate-400/10 border-slate-400/20')
    : '';
  const liveUrl = study.liveUrl ?? project?.liveUrl;
  const githubUrl = study.githubUrl ?? project?.githubUrl;
  const showImage = !!project?.thumbnail && !imgError;

  return (
    <div className="min-h-screen bg-[#05050f]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-6 overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="orb w-[600px] h-[600px] opacity-[0.08] -top-32 -left-48"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
        />
        <div
          className="orb w-[400px] h-[400px] opacity-[0.06] top-10 -right-32"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-200" />
              All projects
            </Link>
          </motion.div>

          {/* Category + year */}
          {project && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', catColor)}>
                {project.category}
              </span>
              <span className="text-slate-600 text-sm">{project.year}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
          >
            {study.title}
          </motion.h1>

          {/* Subtitle */}
          {study.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-slate-400 text-lg mb-8"
            >
              {study.subtitle}
            </motion.p>
          )}

          {/* Accent divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-cyan-500/50 via-white/[0.08] to-transparent mb-10 origin-left"
          />

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-x-10 gap-y-6 mb-10"
          >
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-[0.15em] mb-1.5">Role</p>
              <p className="text-white text-sm">{study.role}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-[0.15em] mb-1.5">Type</p>
              <p className="text-white text-sm">{study.projectType}</p>
            </div>
            {study.platform && (
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-[0.15em] mb-1.5">Platform</p>
                <p className="text-white text-sm">{study.platform}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-[0.15em] mb-1.5">Tech</p>
              <div className="flex flex-wrap gap-1.5">
                {study.tech.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full text-xs border border-white/[0.08] bg-white/[0.03] text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          {(liveUrl || githubUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={13} />
                  Live Site
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.10] bg-white/[0.04] text-white text-sm font-medium hover:bg-white/[0.08] transition-colors"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Article + Sticky Image ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className={cn(
          'grid grid-cols-1 items-start gap-16',
          showImage && 'lg:grid-cols-[1fr_260px]'
        )}>

          {/* ── Sections ── */}
          <article className="py-20 space-y-20 min-w-0">
            {study.sections.map((section, i) => {
              const isSkills = section.title === 'Skills Demonstrated';
              const num = String(i + 1).padStart(2, '0');

              return (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
                    {/* Section label */}
                    <div className="sm:pt-0.5">
                      <span className="block text-5xl font-bold text-white/[0.04] tabular-nums leading-none mb-2 select-none">
                        {num}
                      </span>
                      <h2 className="text-base font-semibold text-white leading-snug">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section content */}
                    {isSkills ? (
                      <SkillsBlocks blocks={section.blocks} />
                    ) : (
                      <SectionBlocks blocks={section.blocks} />
                    )}
                  </div>
                </motion.section>
              );
            })}
          </article>

          {/* ── Sticky Image Sidebar ── */}
          {showImage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block py-20"
            >
              <div className="sticky top-24">
                <div className="relative">
                  {/* Full-height image frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d1a]">
                    <Image
                      src={project!.thumbnail}
                      alt={study.title}
                      width={260}
                      height={600}
                      style={{ height: 'auto', width: '100%' }}
                      className="block"
                      onError={() => setImgError(true)}
                    />
                    {/* Subtle bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050f]/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Glow below */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-12" />
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors duration-200 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to all projects
        </Link>
      </div>
    </div>
  );
}
