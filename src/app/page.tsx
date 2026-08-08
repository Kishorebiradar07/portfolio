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
  ArrowUpRight,
  BookOpen,
  GitBranch,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projectsData } from '@/lib/projects';

// Roles list for the hero rotating animation
const HERO_ROLES = [
  'AI Engineer',
  'Full-Stack Developer',
  'Building Intelligent Software',
];

// Storytelling milestones
const STORYTELLING = [
  {
    title: 'Who I Am',
    desc: 'Final-year Electronics & Communication Engineering student at Sai Vidya Institute of Technology, Bangalore. Specializing in hardware-constrained neural network efficiency.',
  },
  {
    title: 'What I Build',
    desc: 'Deployable deep learning models calibrated to maintain reliability under shifts, coupled with responsive full-stack applications.',
  },
  {
    title: 'Why AI',
    desc: 'Fascinated by the challenge of making modern neural networks run efficiently on low-power edge platforms by designing smart inference paths.',
  },
  {
    title: 'Current Focus',
    desc: 'Applying post-hoc confidence calibration algorithms (Platt/temperature scaling) to joint multi-exit ResNet architectures.',
  },
  {
    title: 'Future Goals',
    desc: 'To design compilers and scheduling pipelines for custom edge accelerators, bringing high-fidelity AI models to the smallest sensors.',
  },
];

// Technical skills grouped into 9 distinct recruiter domains
const GROUPED_SKILLS = [
  {
    group: 'AI Engineering',
    items: ['Model Optimization', 'Calibration (ECE)', 'Multi-Exit Architectures', 'Confidence Thresholding'],
    highlighted: true,
  },
  {
    group: 'Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Feature Engineering', 'Supervised Classifier Tuning'],
    highlighted: true,
  },
  {
    group: 'Computer Vision',
    items: ['OpenCV', 'ResNet architectures', 'Image Normalization', 'Contours & Gradients'],
    highlighted: false,
  },
  {
    group: 'LLMs',
    items: ['OpenAI API Integration', 'Prompt Structuring', 'Structured JSON outputs', 'RAG pipelines (pgvector)'],
    highlighted: false,
  },
  {
    group: 'Backend',
    items: ['Node.js', 'FastAPI', 'REST APIs', 'Serverless Functions', 'Zod schema validation'],
    highlighted: false,
  },
  {
    group: 'Frontend',
    items: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion animations'],
    highlighted: false,
  },
  {
    group: 'Cloud',
    items: ['AWS Machine Learning Specialty', 'SageMaker', 'S3 Data Buckets', 'Vercel Deployment'],
    highlighted: false,
  },
  {
    group: 'Databases',
    items: ['PostgreSQL', 'Supabase', 'pgvector Store', 'Drizzle ORM', 'Relational SQL queries'],
    highlighted: false,
  },
  {
    group: 'DevOps',
    items: ['Docker containers', 'Git & GitHub workflows', 'CLI scripting', 'Linux OS environments'],
    highlighted: false,
  },
];

// Trust signals / Credentials
const TRUST_SIGNALS = [
  {
    category: 'Hackathons',
    title: 'Winner - National Level AI Hackathon',
    desc: 'Secured 1st Place at REVA University by building AlgoShield: a multi-layer email phishing detector combining header validations and NLP risk scoring.',
    meta: 'REVA University (2025)',
    icon: Trophy,
  },
  {
    category: 'Certifications',
    title: 'AWS Academy Graduate — Machine Learning Specialty',
    desc: 'Validated expertise in cloud machine learning services, SageMaker data pipelines, and production deployment parameters.',
    meta: 'Amazon Web Services (2025)',
    icon: Award,
  },
  {
    category: 'Open Source & Research',
    title: 'Model Calibration co-authored study',
    desc: 'Researched Platt and temperature scaling algorithms for exit configurations. Maintained open-source PyTorch early-exit scripts on GitHub.',
    meta: 'CS Deep Learning Laboratory (2024)',
    icon: BookOpen,
  },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = React.useState(0);

  // Rotating roles interval
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-background">
      
      {/* ── 1. HERO & PROFILE SECTION ───────────────────────────────────────── */}
      <section 
        className="relative w-full overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 border-b border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"
        aria-label="Introduction Hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest font-mono"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Engineering Portfolio</span>
            </motion.div>

            <div className="space-y-3 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-none font-heading"
              >
                Kishore Biradar
              </motion.h1>

              {/* Subtitle / Rotating role */}
              <div className="h-8 sm:h-10 overflow-hidden relative flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-lg sm:text-xl font-medium text-violet-400 font-mono tracking-wide"
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
                  "w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                )}
                aria-label="Schedule an Interview slot"
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
                  "w-full sm:w-auto border-border hover:bg-accent rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                )}
                aria-label="Download PDF Resume"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border border-border shadow-2xl bg-card group"
            >
              <img
                src="/profile.png"
                alt="Kishore Biradar Headshot Portrait"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 pointer-events-none" />
            </motion.div>
          </div>

        </div>

        {/* Bouncing Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none hidden sm:flex"
        >
          <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/45 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-violet-400"
            />
          </div>
        </motion.div>
      </section>

      {/* ── 2. STORYTELLING SECTION: THE ENGINEERING JOURNEY ────────────────── */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-border/60"
        aria-label="Engineering Journey Story"
      >
        <div className="text-left mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Engineering Journey</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Storytelling: Optimization Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {STORYTELLING.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 rounded-2xl border border-border bg-card/60 hover:border-violet-500/20 transition-all flex flex-col justify-between h-52 text-left"
            >
              <div>
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 mb-3">
                  0{index + 1}
                </span>
                <h3 className="text-sm font-bold text-foreground mb-2">{story.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">{story.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. FLAGSHIP PROJECTS SECTION (CASE STUDIES) ────────────────────── */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-border/60"
        aria-label="Case Studies"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Case Studies</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Flagship Projects</h2>
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
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-violet-500/20 transition-all flex flex-col justify-between h-full group text-left"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className={cn(
                  "h-44 w-full bg-gradient-to-br relative flex items-center justify-center border-b border-border/40",
                  idx === 0 ? "from-violet-500/10 to-blue-500/10" :
                  idx === 1 ? "from-emerald-500/10 to-teal-500/10" :
                  "from-amber-500/10 to-orange-500/10"
                )}>
                  {idx === 0 && <Brain className="h-12 w-12 text-violet-400" />}
                  {idx === 1 && <Layers className="h-12 w-12 text-emerald-400" />}
                  {idx === 2 && <Globe className="h-12 w-12 text-amber-400" />}

                  {/* Status & Difficulty overlays */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge variant="outline" className="text-[8px] font-mono border-border uppercase bg-background/80 tracking-wider">
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-[8px] font-mono border-border uppercase tracking-wider bg-violet-500/5 text-violet-400 border-violet-500/20">
                      {project.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Project Case Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400">{project.category}</span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{project.tagline}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/40 text-xs">
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Problem & Why It Matters</strong>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Solution & Architecture</strong>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed">{project.motivation}</p>
                    </div>

                    {/* Technologies tags list */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* High-visibility key achievement */}
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1.5 rounded-xl font-medium mt-2">
                      <Zap className="h-3.5 w-3.5 shrink-0" />
                      <span>Key Achievement: {project.metrics[0].value} {project.metrics[0].label}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 pt-0 border-t border-border/30 mt-4 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors"
                >
                  View Case Study
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'xs' }),
                      "h-7 text-[9px] font-bold uppercase tracking-wider border-border cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
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
                      "h-7 text-[9px] font-bold uppercase tracking-wider border-border cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
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

      {/* ── 4. SKILLS DIRECTORY: GROUPED WITHOUT METERS ─────────────────────── */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-border/60"
        aria-label="Technical Skills"
      >
        <div className="text-left mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Expertise Directory</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Grouped Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GROUPED_SKILLS.map((item, idx) => (
            <motion.div
              key={item.group}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={cn(
                "p-5 rounded-2xl border bg-card text-left space-y-4 transition-all",
                item.highlighted ? "border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.04)]" : "border-border"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{item.group}</h3>
                {item.highlighted && (
                  <Badge variant="secondary" className="text-[8px] px-1.5 py-0.5 rounded font-mono uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 ml-auto">
                    Core Area
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                {item.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/40 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. TRUST SIGNALS: CERTIFICATES & HACKATHONS ─────────────────────── */}
      <section 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-border/60"
        aria-label="Highlights & Trust Signals"
      >
        <div className="text-left mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Proof-of-Work</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Trust Signals & Credentials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_SIGNALS.map((ts, idx) => {
            const Icon = ts.icon;
            return (
              <motion.div
                key={ts.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-border bg-card text-left space-y-4 hover:border-violet-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">{ts.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{ts.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ts.desc}</p>
                </div>
                <div className="pt-4 border-t border-border/40 text-[9px] font-mono text-zinc-500">
                  {ts.meta}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 6. CALL TO ACTION SECTION ───────────────────────────────────────── */}
      <section 
        className="w-full border-t border-border bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"
        aria-label="Contact Channels"
      >
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 flex flex-col items-center">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 block mb-1">Get In Touch</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">Collaborate with Kishore</h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            Interested in low-latency machine learning pipelines, deep neural calibration parameters, or full-stack web products?
          </p>

          <div className="flex flex-wrap justify-center gap-3 w-full sm:w-auto pt-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'default' }),
                "bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-10 px-5 text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Book a direct technical interview slot"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Interview</span>
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border hover:bg-accent rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Download PDF Resume"
            >
              <FileDown className="h-4 w-4" />
              <span>Download CV</span>
            </a>
            <a
              href="mailto:biradarkishore07@gmail.com"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border hover:bg-accent rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Send email query"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border hover:bg-accent rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Visit LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/biradarkishore07"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-border hover:bg-accent rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Audit GitHub Repository"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
