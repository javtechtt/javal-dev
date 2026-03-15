'use client';

import { motion } from 'framer-motion';
import { Layers, Code2, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Code2,
  ShoppingBag,
  Sparkles,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
}

export default function ServiceCard({ service, index = 0, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Layers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]',
        'hover:border-cyan-500/20 hover:bg-white/[0.04]',
        'transition-all duration-500',
        className
      )}
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: 'radial-gradient(400px at 50% 0%, rgba(34,211,238,0.04), transparent)' }} />

      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-5 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300">
        <Icon size={22} className="text-cyan-400" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{service.description}</p>

      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
            <Check size={13} className="text-cyan-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
