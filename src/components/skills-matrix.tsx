'use client';

import * as React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Brain, Settings, Terminal, Layout } from 'lucide-react';
import { useRecruiterStore } from '@/store/useRecruiterStore';

interface SkillItem {
  subject: string;
  A: number; // Proficiency level (1-100)
  fullMark: number;
}

const skillsData: Record<string, SkillItem[]> = {
  ai: [
    { subject: 'PyTorch / DL', A: 95, fullMark: 100 },
    { subject: 'Computer Vision', A: 85, fullMark: 100 },
    { subject: 'NLP / RAG', A: 90, fullMark: 100 },
    { subject: 'Calibration', A: 80, fullMark: 100 },
    { subject: 'Model serving', A: 85, fullMark: 100 },
  ],
  engineering: [
    { subject: 'TypeScript', A: 90, fullMark: 100 },
    { subject: 'Next.js Router', A: 88, fullMark: 100 },
    { subject: 'PostgreSQL', A: 85, fullMark: 100 },
    { subject: 'Drizzle ORM', A: 85, fullMark: 100 },
    { subject: 'REST / GraphQL', A: 80, fullMark: 100 },
  ],
  ops: [
    { subject: 'Docker', A: 90, fullMark: 100 },
    { subject: 'Kubernetes', A: 80, fullMark: 100 },
    { subject: 'Prometheus', A: 75, fullMark: 100 },
    { subject: 'CI / CD pipelines', A: 85, fullMark: 100 },
    { subject: 'Linux / Bash', A: 85, fullMark: 100 },
  ],
};

export function SkillsMatrix() {
  const { activeRole } = useRecruiterStore();
  const [activeCategory, setActiveCategory] = React.useState<'ai' | 'engineering' | 'ops'>('ai');

  // Dynamically switch category if activeRole changes
  React.useEffect(() => {
    if (activeRole === 'mlops') {
      setActiveCategory('ops');
    } else if (activeRole === 'fullstack-ai') {
      setActiveCategory('engineering');
    } else if (activeRole === 'nlp') {
      setActiveCategory('ai');
    }
  }, [activeRole]);

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'ops':
        return 'Infrastructure & MLOps';
      case 'engineering':
        return 'Full-Stack Software Architecture';
      default:
        return 'AI Research & Deep Learning';
    }
  };

  const getRoleClarityHint = () => {
    switch (activeRole) {
      case 'mlops':
        return 'Currently showcasing: Docker, Kubernetes, and CI/CD pipelines as requested by ML Ops Mode.';
      case 'fullstack-ai':
        return 'Currently showcasing: Next.js App Router, TypeScript, and SQL schemas as requested by Full-Stack Mode.';
      case 'nlp':
        return 'Currently showcasing: RAG algorithms and Deep Learning proficiencies as requested by NLP Mode.';
      default:
        return 'Switch Recruiter Mode in the navbar to customize highlights.';
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      {/* Dynamic textual lists */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Skills Inventory
          </span>
          <h3 className="text-xl font-bold mt-1 text-foreground">
            {getCategoryTitle()}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Proficiencies are updated via project benchmarks. {getRoleClarityHint()}
          </p>
        </div>

        {/* Categories selector button list */}
        <div className="flex flex-col gap-2">
          {[
            { id: 'ai', label: 'AI/ML Focus', icon: Brain },
            { id: 'engineering', label: 'Software Stack', icon: Layout },
            { id: 'ops', label: 'ML Infrastructure', icon: Settings },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-3 p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'border-violet-500 bg-violet-500/5 text-violet-400'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radar Chart Display */}
      <div className="lg:col-span-3 h-[300px] w-full flex items-center justify-center border border-border bg-card rounded-2xl p-4 shadow-[inset_0_0_12px_rgba(255,255,255,0.01)]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData[activeCategory]}>
            <PolarGrid stroke="var(--border)" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontFamily: 'monospace' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 8 }}
            />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
