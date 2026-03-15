'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Testimonials"
        title="What clients "
        highlight="say"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] transition-colors duration-400 group"
          >
            {/* Quote icon */}
            <Quote size={28} className="text-cyan-500/30 mb-4" />

            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
              </div>
            </div>

            {/* Bottom glow on hover */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
