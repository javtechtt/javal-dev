import { cn } from '@/lib/utils';
import { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  showBar?: boolean;
  className?: string;
}

export default function SkillBadge({ skill, showBar = false, className }: SkillBadgeProps) {
  return (
    <div className={cn('group', className)}>
      {showBar ? (
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
            <span className="text-xs text-slate-500">{skill.level}%</span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ) : (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.08] bg-white/[0.04] text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-500/[0.06] hover:text-cyan-300 transition-all duration-200 cursor-default">
          {skill.name}
        </span>
      )}
    </div>
  );
}
