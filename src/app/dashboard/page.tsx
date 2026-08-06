'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Brain, Github, Linkedin, Mail, FileDown, Sparkles,
  ChevronRight, ArrowUpRight, ShieldCheck, CheckCircle,
  UserCheck, GraduationCap, Trophy, Award, Layers,
  Terminal, Code, Zap, Target, TrendingUp, Globe,
  FolderGit, Clock, ExternalLink,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRecruiterStore } from '@/store/useRecruiterStore';
import { projectsData } from '@/lib/projects';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────────────────────
// DATA LAYER  (structured for future RAG / admin editing)
// ─────────────────────────────────────────────────────────────────────────────
const CANDIDATE = {
  name: 'Kishore Biradar',
  role: 'Applied AI & ECE Engineer',
  college: 'Sai Vidya Institute of Technology, Bangalore',
  dept: 'Dept of Electronics & Communication Engineering',
  email: 'biradarkishore07@gmail.com',
  github: 'https://github.com/biradarkishore07',
  linkedin: 'https://linkedin.com',
  yearsLearning: 4,
  mission: 'Deploying confidence-calibrated deep learning inference on edge hardware to dramatically reduce compute costs while maintaining model accuracy.',
  goal: 'ML / MLOps Engineer at a product-driven AI company',
  interests: ['Model Optimization', 'Edge Inference', 'Computer Vision', 'NLP Pipelines'],
};

const SKILL_CATEGORIES = [
  {
    label: 'AI & Deep Learning',
    color: 'violet',
    icon: Brain,
    skills: [
      { name: 'PyTorch', level: 95 },
      { name: 'Model Calibration (ECE)', level: 92 },
      { name: 'ResNet / CNNs', level: 90 },
      { name: 'TensorFlow / Keras', level: 85 },
      { name: 'Scikit-Learn', level: 88 },
    ],
  },
  {
    label: 'NLP & Computer Vision',
    color: 'blue',
    icon: Layers,
    skills: [
      { name: 'Text Classification', level: 90 },
      { name: 'TF-IDF Vectorizers', level: 87 },
      { name: 'OpenCV', level: 85 },
      { name: 'Feature Engineering', level: 88 },
      { name: 'NLTK / SpaCy', level: 80 },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: 'emerald',
    icon: Globe,
    skills: [
      { name: 'Python', level: 96 },
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 82 },
      { name: 'AWS (ML Services)', level: 80 },
      { name: 'Linux / CLI', level: 85 },
    ],
  },
];

const TIMELINE = [
  {
    year: 'Aug 2026',
    type: 'Project',
    title: 'IntelliDepth — Major Graduation Project',
    body: 'Built a confidence-calibrated adaptive early-exit ResNet-56 inference system on CIFAR-100. Achieved 58.45% FLOPs savings via temperature-scaled exit policies.',
    tag: 'Deep Learning',
    icon: Brain,
  },
  {
    year: '2025',
    type: 'Hackathon',
    title: 'Winner — National Level AI Hackathon, REVA University',
    body: 'AlgoShield: intelligent multi-layer email phishing detector using NLP, TF-IDF, and metadata scoring. 96.8% accuracy on Enron + Kaggle benchmark.',
    tag: '🏆 1st Place',
    icon: Trophy,
  },
  {
    year: '2025',
    type: 'Certification',
    title: 'AWS Academy Graduate — Machine Learning',
    body: 'Validated proficiency in cloud ML infrastructure, SageMaker pipelines, and production model hosting.',
    tag: 'AWS',
    icon: Award,
  },
  {
    year: '2024',
    type: 'Certification',
    title: 'Deep Learning Specialization — DeepLearning.AI',
    body: 'Mastered CNNs, RNNs, hyperparameter tuning, and batch normalization over 5 structured Coursera courses.',
    tag: 'Coursera',
    icon: Award,
  },
  {
    year: '2024',
    type: 'Certification',
    title: 'Google TensorFlow Developer Certificate',
    body: 'Credentialed in building and training neural networks for NLP, image classification, and time-series prediction.',
    tag: 'Google',
    icon: Award,
  },
  {
    year: '2022 – 2026',
    type: 'Education',
    title: 'B.E. Electronics & Communication Engineering',
    body: 'Sai Vidya Institute of Technology, Bangalore — VTU affiliated. Specialization in AI/ML. CGPA 3.90/4.00 equivalent.',
    tag: 'SVIT, Bangalore',
    icon: GraduationCap,
  },
];

const INSIGHTS = [
  {
    icon: Zap,
    title: 'Strengths',
    items: [
      'Adaptive inference & model calibration (ECE, temperature scaling)',
      'Multi-layer NLP pipeline design (TF-IDF + metadata fusion)',
      'Research-grade code structure with modular Python projects',
    ],
  },
  {
    icon: Target,
    title: 'Technical Focus',
    items: [
      'Deep Learning optimization for edge & resource-limited devices',
      'Joint multi-exit training and post-hoc confidence calibration',
      'Full pipeline ownership from dataset to deployment-ready artifact',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Learning Mindset',
    items: [
      'Self-initiated major project beyond coursework requirements',
      'Active hackathon competitor with 1st-place award',
      'Continuous upskilling: 3 professional certifications in 2 years',
    ],
  },
];

const PROJECT_FILTERS = [
  { key: 'all', label: 'All Projects' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'research', label: 'Research' },
  { key: 'hackathon', label: 'Hackathon' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as any } },
};

const stagger = (delay = 0.06) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// Animated skill bar with entrance animation
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500',
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
  };
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-muted-foreground font-medium">{name}</span>
        <span className="font-mono text-xs text-zinc-500">{level}%</span>
      </div>
      <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-1 rounded-full', colorMap[color] ?? 'bg-violet-500')}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        />
      </div>
    </div>
  );
}

// Scroll-reveal wrapper
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function RecruiterDashboard() {
  const { customPersonalization, toggleAssistant } = useRecruiterStore();
  const [filter, setFilter] = React.useState('all');
  const [summaryText, setSummaryText] = React.useState(
    `${CANDIDATE.name} is a final-year Electronics and Communication Engineering student at Sai Vidya Institute of Technology, Bangalore. He specialises in deep learning model calibration (IntelliDepth — 58.45% FLOPs saved) and NLP security systems (AlgoShield — 96.8% phishing detection accuracy). Strong research background with three professional certifications and a national hackathon win.`
  );
  const [editingSummary, setEditingSummary] = React.useState(false);

  React.useEffect(() => {
    if (customPersonalization) {
      setSummaryText(
        `${CANDIDATE.name} has been AI-optimised for your ${customPersonalization.role} role at ${customPersonalization.company}. Highlighted projects: ${customPersonalization.highlightedProjects.join(', ')}. Priority skills: ${customPersonalization.prioritizedSkills.join(', ')}.`
      );
    }
  }, [customPersonalization]);

  const filtered = projectsData.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.tags.some(t => ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'NLP'].includes(t));
    if (filter === 'research') return p.slug === 'intellidepth';
    if (filter === 'hackathon') return p.slug === 'algoshield';
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-background">
      {/* ── HERO BANNER ─────────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Label row */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Sparkles className="h-3 w-3" />
                AI Recruiter Operating System
              </span>
              {customPersonalization && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="h-3 w-3" />
                  Optimised for {customPersonalization.company}
                </span>
              )}
            </motion.div>

            {/* Headline + intro split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <motion.div variants={fadeUp} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Kishore Biradar
                  <span className="block text-2xl sm:text-3xl font-medium text-muted-foreground mt-1">
                    Applied AI & ECE Engineer
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {summaryText}
                </p>
              </motion.div>

              {/* Quick-action buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-3 lg:justify-end"
              >
                <Button
                  onClick={toggleAssistant}
                  className="bg-violet-600 hover:bg-violet-500 text-white h-10 px-5 rounded-xl gap-2 font-semibold shadow-[0_0_20px_rgba(124,58,237,0.25)] cursor-pointer"
                >
                  <Brain className="h-4 w-4" />
                  Ask AI Assistant
                </Button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'default' }),
                    'h-10 px-5 rounded-xl gap-2 font-semibold border-border'
                  )}
                >
                  <FileDown className="h-4 w-4" />
                  Download CV
                </a>
                <a href={CANDIDATE.github} target="_blank" rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-xl h-10 w-10 border border-border')}>
                  <Github className="h-4 w-4" />
                </a>
                <a href={CANDIDATE.linkedin} target="_blank" rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-xl h-10 w-10 border border-border')}>
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${CANDIDATE.email}`}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-xl h-10 w-10 border border-border')}>
                  <Mail className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            {/* KPI strip */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/60"
            >
              {[
                { label: 'Years Learning', value: `${CANDIDATE.yearsLearning}+` },
                { label: 'Compute Saved (IntelliDepth)', value: '58.45%' },
                { label: 'Phishing Detection Accuracy', value: '96.8%' },
                { label: 'Certifications', value: '3' },
              ].map((kpi) => (
                <div key={kpi.label} className="space-y-0.5">
                  <div className="text-2xl font-bold text-foreground font-mono">{kpi.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{kpi.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── PAGE BODY ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">

        {/* ── MODULE 2: EDITABLE EXECUTIVE SUMMARY ────────────────────────── */}
        <Reveal>
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionLabel icon={FileDown} text="Executive Summary" />
              <button
                onClick={() => setEditingSummary(v => !v)}
                className="text-[10px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Terminal className="h-3 w-3" />
                {editingSummary ? 'Save' : 'Override bio'}
              </button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              {editingSummary ? (
                <div className="space-y-3">
                  <textarea
                    rows={4}
                    value={summaryText}
                    onChange={e => setSummaryText(e.target.value)}
                    className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm text-foreground leading-relaxed focus:outline-none focus:border-violet-500 resize-none font-sans"
                  />
                  <Button
                    size="sm"
                    onClick={() => { setEditingSummary(false); toast.success('Executive bio saved.'); }}
                    className="bg-violet-600 hover:bg-violet-500 text-white h-8 text-xs rounded-lg"
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">{summaryText}</p>
              )}
            </div>
          </section>
        </Reveal>

        {/* ── MODULE 8: PERSONAL BRANDING CARD ───────────────────────────── */}
        <Reveal>
          <section className="space-y-4">
            <SectionLabel icon={UserCheck} text="Personal Branding" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Identity card */}
              <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 border border-violet-500/20 flex items-center justify-center">
                  <UserCheck className="h-9 w-9 text-violet-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{CANDIDATE.name}</h2>
                    <p className="text-sm text-violet-400 font-medium">{CANDIDATE.role}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{CANDIDATE.dept} · {CANDIDATE.college}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-violet-500/40 pl-3">
                    &ldquo;{CANDIDATE.mission}&rdquo;
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CANDIDATE.interests.map(i => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40">{i}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goal & career target */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Career Goal</p>
                  <p className="text-sm font-semibold text-foreground">{CANDIDATE.goal}</p>
                </div>
                <div className="pt-4 border-t border-border/60 space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Contact</p>
                  <a href={`mailto:${CANDIDATE.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-3.5 w-3.5" /> {CANDIDATE.email}
                  </a>
                  <a href={CANDIDATE.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-3.5 w-3.5" /> github.com/biradarkishore07
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── MODULE 3: SKILL INTELLIGENCE ───────────────────────────────── */}
        <Reveal>
          <section className="space-y-6">
            <SectionLabel icon={Code} text="Skill Intelligence" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.label} className="rounded-2xl border border-border bg-card p-6 space-y-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'h-8 w-8 rounded-lg flex items-center justify-center',
                        cat.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                        cat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-emerald-500/10 text-emerald-400'
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{cat.label}</h3>
                    </div>
                    <div className="space-y-4">
                      {cat.skills.map(s => (
                        <SkillBar key={s.name} name={s.name} level={s.level} color={cat.color} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* ── MODULE 4: PROJECT INTELLIGENCE ─────────────────────────────── */}
        <Reveal>
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <SectionLabel icon={FolderGit} text="Project Intelligence" />
              {/* Filter tabs */}
              <div className="flex items-center gap-1 bg-muted/60 border border-border/40 rounded-xl p-1">
                {PROJECT_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer',
                      filter === f.key
                        ? 'bg-card text-foreground shadow-sm border border-border/20'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-6"
              >
                {filtered.map((project) => (
                  <div
                    key={project.slug}
                    className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-violet-500/30 transition-all duration-300"
                  >
                    <div className="p-6 space-y-5">
                      {/* Card header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400">{project.category}</span>
                          <h3 className="text-base font-bold text-foreground">{project.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">{project.tagline}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 shrink-0">
                          {project.metrics.map(m => (
                            <div key={m.label} className="text-center px-3 py-1.5 rounded-lg bg-violet-500/8 border border-violet-500/15">
                              <div className="font-mono text-xs font-bold text-violet-400">{m.value}</div>
                              <div className="text-[8px] uppercase tracking-widest text-muted-foreground mt-0.5">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical detail grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 border-t border-border/50">
                        <ProjectDetail label="Problem" text={project.problem} />
                        <ProjectDetail label="Architecture" text={project.architecture} />
                        <ProjectDetail label="Challenges" text={project.challenges} />
                        <ProjectDetail label="Results" text={project.results} />
                      </div>

                      {/* Tag strip + CTA row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border/50">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 5).map(tag => (
                            <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-foreground hover:text-violet-400 transition-colors group"
                          >
                            Full Case Study
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-7 text-[10px] rounded-lg border-border px-3 gap-1')}>
                            <Github className="h-3 w-3" /> GitHub
                          </a>
                          <a href={project.demoUrl} target="_blank" rel="noreferrer"
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-7 text-[10px] rounded-lg border-border px-3 gap-1')}>
                            <ExternalLink className="h-3 w-3" /> Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        </Reveal>

        {/* ── MODULE 6: TIMELINE ──────────────────────────────────────────── */}
        <Reveal>
          <section className="space-y-6">
            <SectionLabel icon={Clock} text="Career & Academic Timeline" />
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-3 bottom-3 w-px bg-border" />
              <div className="space-y-6 pl-12">
                {TIMELINE.map((item, i) => {
                  const Icon = item.icon;
                  const typeColors: Record<string, string> = {
                    Project: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
                    Hackathon: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                    Certification: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                    Education: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                  };
                  return (
                    <Reveal key={i} delay={i * 0.05}>
                      <div className="relative flex gap-4 items-start">
                        {/* Node */}
                        <div className={cn(
                          'absolute -left-12 h-11 w-11 rounded-full border-2 border-background flex items-center justify-center shadow-sm',
                          item.type === 'Project' ? 'bg-violet-500/20 border-violet-500' :
                          item.type === 'Hackathon' ? 'bg-amber-500/20 border-amber-500' :
                          item.type === 'Certification' ? 'bg-blue-500/20 border-blue-500' :
                          'bg-emerald-500/20 border-emerald-500'
                        )}>
                          <Icon className={cn('h-4.5 w-4.5',
                            item.type === 'Project' ? 'text-violet-400' :
                            item.type === 'Hackathon' ? 'text-amber-400' :
                            item.type === 'Certification' ? 'text-blue-400' :
                            'text-emerald-400'
                          )} />
                        </div>

                        {/* Content card */}
                        <div className="flex-1 rounded-2xl border border-border bg-card p-5 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-muted-foreground">{item.year}</span>
                            <span className={cn('text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border', typeColors[item.type] ?? 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20')}>
                              {item.type}
                            </span>
                            <span className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.tag}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── MODULE 7: RECRUITER INSIGHTS ───────────────────────────────── */}
        <Reveal>
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionLabel icon={ShieldCheck} text="AI Recruiter Insights" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">AI-Generated Evaluation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INSIGHTS.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.title} className="rounded-2xl border border-border bg-card p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-violet-400" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{insight.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {insight.items.map((item) => (
                        <li key={item} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Proficiency radar-style table */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-5">Overall Proficiency Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { name: 'Deep Learning (PyTorch)', score: 95 },
                  { name: 'Model Calibration (ECE / Temperature Scaling)', score: 92 },
                  { name: 'NLP Classification (TF-IDF, Random Forest)', score: 90 },
                  { name: 'Computer Vision (OpenCV)', score: 85 },
                  { name: 'Research & Technical Writing', score: 88 },
                  { name: 'Python (Data Science Stack)', score: 96 },
                ].map(item => (
                  <SkillBar key={item.name} name={item.name} level={item.score} color="violet" />
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── CTA STRIP ───────────────────────────────────────────────────── */}
        <Reveal>
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">Ready to connect?</h3>
              <p className="text-sm text-muted-foreground">Schedule an interview or download the full resume.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: 'default' }), 'bg-violet-600 hover:bg-violet-500 text-white h-10 px-6 rounded-xl gap-2 font-semibold shadow-[0_0_20px_rgba(124,58,237,0.25)]')}
              >
                <Mail className="h-4 w-4" />
                Schedule Interview
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'outline' }), 'h-10 px-6 rounded-xl gap-2 font-semibold border-border')}
              >
                <FileDown className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-violet-400" />
      <span className="text-xs font-bold uppercase tracking-widest text-foreground">{text}</span>
    </div>
  );
}

function ProjectDetail({ label, text }: { label: string; text: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-4">{text}</p>
    </div>
  );
}
