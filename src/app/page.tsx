'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Trophy,
  Award,
  Github,
  Linkedin,
  Mail,
  FileDown,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code,
  ShieldCheck,
  CheckCircle,
  Database,
  Cloud,
  Terminal,
  Calendar,
  Zap,
  Globe,
  Sliders,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projectsData } from '@/lib/projects';

// Roles list for the hero rotating animation
const HERO_ROLES = [
  'AI Engineer',
  'Full Stack Developer',
  'Machine Learning Enthusiast',
];

// Highlight cards for the Trust Section
const TRUST_HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'AI Projects',
    value: '3 Production Builds',
    desc: 'Joint multi-exit models, calibration scaling, & NLP classifiers.',
  },
  {
    icon: Trophy,
    title: 'Hackathons',
    value: '1st Place Winner',
    desc: 'National level AI phishing detector at REVA University.',
  },
  {
    icon: Award,
    title: 'Certifications',
    value: '3 Professional Credentials',
    desc: 'AWS Academy ML, TensorFlow Developer, & DeepLearning.AI.',
  },
  {
    icon: Code,
    title: 'Technologies',
    value: '15+ Core Tools',
    desc: 'Python, PyTorch, Next.js, OpenCV, Docker, & pgvector.',
  },
  {
    icon: Github,
    title: 'Contributions',
    value: 'Open Source',
    desc: 'Maintained repositories for early-exits & phishing detectors.',
  },
];

// Technical skills categorized for Module 4
const TECHNICAL_EXPERTISE = [
  {
    category: 'AI & ML',
    icon: Brain,
    skills: ['PyTorch', 'TensorFlow', 'Model Calibration (ECE)', 'L-BFGS Optimization', 'Supervised Learning'],
  },
  {
    category: 'Computer Vision',
    icon: Layers,
    skills: ['OpenCV', 'ResNet architectures', 'Image Preprocessing', 'Feature Extraction', 'CNNs'],
  },
  {
    category: 'NLP & LLMs',
    icon: Globe,
    skills: ['TF-IDF Vectorizers', 'Text Classification', 'NLTK', 'Tokenization', 'Prompt Chains'],
  },
  {
    category: 'Frontend',
    icon: Code,
    skills: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: Terminal,
    skills: ['Node.js', 'FastAPI', 'REST APIs', 'Serverless Functions', 'Zod Validation'],
  },
  {
    category: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'Supabase', 'pgvector (Vector Store)', 'Drizzle ORM', 'SQL Queries'],
  },
  {
    category: 'Cloud',
    icon: Cloud,
    skills: ['AWS (SageMaker, S3)', 'Vercel Deployment', 'Cloud Infrastructure', 'API Integrations', 'AWS Academy'],
  },
  {
    category: 'DevOps',
    icon: Sliders,
    skills: ['Docker Containers', 'Git & GitHub Versioning', 'CLI Shell Scripting', 'CI/CD Pipelines', 'Linux OS'],
  },
];

// Vertical timeline events
const TIMELINE_EVENTS = [
  {
    date: '2026',
    title: 'IntelliDepth Adaptive Inference Project',
    subtitle: 'Major Project, Department of ECE',
    desc: 'Programmed an adaptive early-exit ResNet-56 image classifier in PyTorch. Calibrated exits with temperature scaling to decrease ECE to 0.024 and save 58.45% FLOP compute.',
  },
  {
    date: '2025',
    title: '1st Place Win — National Level AI Hackathon',
    subtitle: 'REVA University',
    desc: 'Created AlgoShield: an NLP email phishing classifier leveraging metadata and TF-IDF features to achieve 96.8% accuracy.',
  },
  {
    date: '2025',
    title: 'AWS Academy Graduate — Machine Learning Specialty',
    subtitle: 'Amazon Web Services',
    desc: 'Validated cloud-native model design, automated data pipelines, and scalable SageMaker hosting setups.',
  },
  {
    date: '2024',
    title: 'Deep Learning & TensorFlow Certifications',
    subtitle: 'DeepLearning.AI & Google',
    desc: 'Gained credentials in deep neural networking, computer vision convolutions, and NLP sequence processing.',
  },
  {
    date: '2022 - 2026',
    title: 'B.E. in Electronics & Communication Engineering',
    subtitle: 'Sai Vidya Institute of Technology, Bangalore',
    desc: 'Focusing on applied machine learning and hardware-software system integration. Maintained 3.90/4.00 CGPA equivalent.',
  },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = React.useState(0);

  // Rotating roles loop
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-background">
      
      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden pt-24 pb-16 md:pt-36 md:pb-28 border-b border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest font-mono"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Kishore Biradar Portfolio</span>
            </motion.div>

            <div className="space-y-3 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Kishore Biradar
              </motion.h1>

              {/* Rotating role animation */}
              <div className="h-10 sm:h-12 overflow-hidden relative flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="text-xl sm:text-2xl font-semibold text-violet-400 uppercase tracking-wide font-mono"
                  >
                    {HERO_ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              <strong>Mission Statement</strong>: Deploying confidence-calibrated machine learning models on edge compute devices to optimize inference latencies, reduce Expected Calibration Errors, and lower server infrastructure costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-4"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  "w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                )}
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Interview</span>
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  "w-full sm:w-auto border-border hover:bg-accent rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold"
                )}
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Right Visual Image Layout */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl border border-violet-500/20 bg-card p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.1)] group hover:border-violet-500/40 transition-all duration-500"
            >
              {/* Futuristic floating visual nodes */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Header inside graphic card */}
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Calibration Agent</span>
                </div>
                <Terminal className="h-4 w-4 text-violet-400/80" />
              </div>

              {/* Central Abstract model graphic node */}
              <div className="my-auto flex flex-col items-center justify-center space-y-3 z-10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center shadow-lg">
                    <Brain className="h-8 w-8 text-violet-400" />
                  </div>
                  {/* Outer orbiting rings */}
                  <div className="absolute -inset-2.5 rounded-3xl border border-dashed border-violet-500/20 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute -inset-5 rounded-full border border-violet-500/10 animate-[spin_40s_linear_infinite]" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-xs font-bold text-foreground">IntelliDepth Net</p>
                  <p className="font-mono text-[9px] text-violet-400 mt-0.5">ECE early-exit validation</p>
                </div>
              </div>

              {/* Bottom Telemetry labels */}
              <div className="flex justify-between items-center pt-4 border-t border-border/40 z-10">
                <div className="text-left">
                  <span className="text-[8px] text-muted-foreground uppercase block">Avg savings</span>
                  <span className="font-mono text-xs font-bold text-foreground">58.45% FLOPs</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-muted-foreground uppercase block">Tuned ECE</span>
                  <span className="font-mono text-xs font-bold text-foreground">0.024</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 2. TRUST SECTION (HIGHLIGHTS) ─────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {TRUST_HIGHLIGHTS.map((hl, index) => {
            const Icon = hl.icon;
            return (
              <motion.div
                key={hl.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-5 rounded-2xl border border-border bg-card/60 hover:border-violet-500/20 transition-all flex flex-col justify-between h-36"
              >
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 w-fit">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{hl.title}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">{hl.value}</div>
                  <div className="text-[9px] text-muted-foreground leading-snug mt-1">{hl.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ─────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Featured Work</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">Research &amp; Hackathon Projects</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>All Projects</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-violet-500/20 transition-all flex flex-col justify-between h-full group"
            >
              <div>
                {/* Project Thumbnail (Visual gradients representing specific project domains) */}
                <div className={cn(
                  "h-40 w-full bg-gradient-to-br relative flex items-center justify-center border-b border-border/50",
                  idx === 0 ? "from-violet-500/10 to-blue-500/10" :
                  idx === 1 ? "from-emerald-500/10 to-teal-500/10" :
                  "from-amber-500/10 to-orange-500/10"
                )}>
                  {idx === 0 && <Brain className="h-10 w-10 text-violet-400" />}
                  {idx === 1 && <ShieldCheck className="h-10 w-10 text-emerald-400" />}
                  {idx === 2 && <Layers className="h-10 w-10 text-amber-400" />}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-violet-400">{project.category}</span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{project.tagline}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/40 text-xs">
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Problem</strong>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Results</strong>
                      <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer actions */}
              <div className="p-6 pt-0 border-t border-border/30 mt-4 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Case Study
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'xs' }),
                      "h-7 text-[9px] font-bold uppercase tracking-wider border-border"
                    )}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'xs' }),
                      "h-7 text-[9px] font-bold uppercase tracking-wider border-border"
                    )}
                  >
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. TECHNICAL EXPERTISE ───────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <div className="text-left mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Skills Directory</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">Interactive Technical Expertise</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TECHNICAL_EXPERTISE.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 rounded-2xl border border-border bg-card space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 w-fit">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{exp.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 5. EXPERIENCE TIMELINE ───────────────────────────────────────── */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Milestones</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">Academic &amp; Project Timeline</h2>
        </div>

        <div className="relative border-l border-border pl-6 ml-3 space-y-8">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative space-y-1"
            >
              {/* Orbital timeline node indicator */}
              <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-card bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
              
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-violet-400">{event.date}</span>
                <Badge variant="outline" className="text-[9px] uppercase tracking-wider border-border bg-muted/20">
                  {event.subtitle}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-foreground">{event.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. CALL TO ACTION ────────────────────────────────────────────── */}
      <section className="w-full border-t border-border bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 flex flex-col items-center">
          <SectionTitle label="Get in touch" title="Collaborate with Kishore" />
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            Interested in model optimizations, PyTorch workflows, or low-latency ML deployments? Choose an action below to establish contact.
          </p>

          <div className="flex flex-wrap justify-center gap-3 w-full sm:w-auto pt-2">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'default' }),
                "bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-10 px-6 font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.2)]"
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Interview / Hire Me</span>
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border rounded-xl h-10 px-6 font-semibold flex items-center gap-2"
              )}
            >
              <FileDown className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border rounded-xl h-10 px-6 font-semibold flex items-center gap-2"
              )}
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Local helper header display
function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 block mb-1">
        {label}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}
