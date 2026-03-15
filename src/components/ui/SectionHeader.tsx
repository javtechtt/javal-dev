'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-6 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
          <div className="h-px w-6 bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {titleParts[0]}
        {highlight && (
          <span className="text-gradient">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>

      {description && (
        <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
