'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function GlowButton({
  children,
  onClick,
  href,
  newTab = false,
  variant = 'primary',
  size = 'md',
  icon = false,
  className,
  disabled,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-90',
    secondary:
      'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-cyan-500/40',
    ghost: 'text-cyan-400 hover:text-cyan-300',
  };

  const base = cn(
    'relative inline-flex items-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const content = (
    <>
      {children}
      {icon && (
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={16} />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={base}
        whileTap={{ scale: 0.97 }}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={base}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
