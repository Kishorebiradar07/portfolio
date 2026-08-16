'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  Calendar,
  Zap,
  Globe,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projectsData } from '@/lib/projects';

// Roles list for the hero rotating animation
const HERO_ROLES = [
  'AI & Machine Learning Engineer',
  'AI Engineer',
  'AIML Undergraduate',
];

// Storytelling milestones
const STORYTELLING = [
  {
    title: 'Who I Am',
    desc: 'An AI & Machine Learning engineering student at Sai Vidya Institute of Technology, Bangalore (2027 Batch), developing strong programming and problem-solving skills.',
  },
  {
    title: 'What I Build',
    desc: 'Practical intelligent systems including multimodal emotion recognition models (FaceNet, LSTM) and sequential NLP network prototypes.',
  },
  {
    title: 'Why AI',
    desc: 'Inspired by the potential of neural networks to solve practical problems and dedicated to understanding the mathematical foundations of machine learning.',
  },
  {
    title: 'Current Focus',
    desc: 'Focusing on core programming concepts, Data Structures and Algorithms using C, and exploring PyTorch/TensorFlow framework structures.',
  },
  {
    title: 'Future Goals',
    desc: 'To continue exploring Artificial Intelligence, Machine Learning, and Finance applications, designing intelligent software for practical systems.',
  },
];

// Technical skills grouped into 4 distinct domains
const GROUPED_SKILLS = [
  {
    group: 'AI & Machine Learning',
    items: ['FaceNet', 'RNN', 'LSTM', 'Fully Connected Networks (FCN)', 'PyTorch', 'TensorFlow', 'Model Calibration'],
    highlighted: true,
  },
  {
    group: 'Programming & Concepts',
    items: ['C', 'Python', 'JavaScript', 'HTML', 'CSS', 'Data Structures & Algorithms using C'],
    highlighted: true,
  },
  {
    group: 'Frontend & Backend',
    items: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React', 'Node.js', 'FastAPI'],
    highlighted: false,
  },
  {
    group: 'Databases & Tools',
    items: ['PostgreSQL', 'Supabase', 'Drizzle ORM', 'Git', 'GitHub', 'Docker'],
    highlighted: false,
  },
];

// Verified Credentials & Achievements data
const CREDENTIALS_DATA = [
  {
    id: 'ibm-fundamentals',
    provider: 'IBM SkillsBuild',
    name: 'Artificial Intelligence Fundamentals',
    date: '20 Aug 2025',
    type: 'Certification' as const,
    verificationUrl: 'https://www.credly.com/badges/6982ced5-07af-4f5e-99d1-16f5ac4565ed',
    details: [
      'Completed foundational components of neural networks, machine learning algorithms, deep learning applications, and AI ethical frameworks.',
      'Issued by IBM SkillsBuild digital credentialing.',
    ],
    placeholderDesc: 'IBM SkillsBuild Artificial Intelligence Fundamentals Credential. Issued on 20 August 2025. Verification verified via Credly.',
    icon: Award,
  },
  {
    id: 'aws-genai',
    provider: 'AWS Academy',
    name: 'AWS Academy Graduate - Generative AI Foundations',
    date: '30 Nov 2025',
    type: 'Training Badge' as const,
    duration: '12 Hours',
    imageUrl: '/aws-badge.png',
    verificationUrl: 'https://www.credly.com/badges/9cd2330b-99b1-4176-8e54-b070597ac1fe',
    details: [
      '12-hour training course in Generative AI foundations covering foundation models, prompt engineering, LLMs, and cloud-native AI tools.',
      'Issued by AWS Academy program.',
    ],
    icon: Zap,
  },
  {
    id: 'ibm-literacy',
    provider: 'IBM SkillsBuild',
    name: 'AI Literacy',
    date: '14 Dec 2025',
    type: 'Certification' as const,
    verificationUrl: 'https://www.credly.com/go/bpH83zGM',
    details: [
      'Comprehensive understanding of core artificial intelligence technologies, generative models, and deployment workflows.',
      'Issued through IBM SkillsBuild official digital credentials portal.',
    ],
    placeholderDesc: 'IBM SkillsBuild AI Literacy Certificate of Completion. Issued on 14 December 2025. Verification verified via Credly.',
    icon: Award,
  },
  {
    id: 'nptel-dl',
    provider: 'NPTEL / SWAYAM / IISc Bangalore',
    name: 'Foundations of Deep Learning: Concepts and Applications',
    date: 'Jan–Apr 2026',
    type: 'Certification' as const,
    duration: '12 weeks',
    score: '54%',
    status: 'Certified',
    details: [
      '12-week advanced curriculum covering deep neural networks, optimizer performance, convolutional layers, and sequence learning backbones.',
      'Designed and evaluated by the Indian Institute of Science (IISc), Bangalore.',
      'Completed and certified with a consolidated final score of 54%.',
    ],
    placeholderDesc: 'Foundations of Deep Learning Course Certificate issued by NPTEL / IISc Bangalore. Program duration: 12 weeks. Final score: 54%. Status: Certified.',
    icon: Award,
  },
  {
    id: 'hackverse',
    provider: 'Sai Vidya Institute of Technology',
    name: 'HackVerse Hackathon',
    date: '9–11 Apr 2026',
    type: 'Hackathon' as const,
    details: [
      'Official Certificate of Participation representing team-based product development and technical problem-solving.',
      'Designed and pitched a prototype solution under intensive hackathon constraints.',
    ],
    placeholderDesc: 'HackVerse Hackathon Certificate of Participation. Organized by Sai Vidya Institute of Technology, Bangalore. Presented to Kishore Biradar for participating and demonstrating innovation and teamwork (9–11 April 2026).',
    icon: Trophy,
  },
  {
    id: 'gemma-sprint',
    provider: 'Google Build with Gemma',
    name: 'Gemma: Bengaluru AI Sprint',
    date: 'Apr 2026',
    type: 'Hackathon' as const,
    details: [
      'National-level AI Hackathon conducted under Google\'s Build with Gemma initiative.',
      'Participated under team name "TraceX" as Kishore Biradar.',
      'Certificate of Participation validating technical execution and prototype implementation.',
    ],
    placeholderDesc: 'Gemma: Bengaluru AI Sprint Certificate of Participation. Google Build with Gemma Initiative. Presented to Kishore Biradar (Team: TraceX) for participation in the Bengaluru AI Sprint (April 2026).',
    icon: Trophy,
  },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [selectedCredential, setSelectedCredential] = React.useState<typeof CREDENTIALS_DATA[number] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isEnded, setIsEnded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  // Rotating roles interval
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Sync background video properties and events
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldReduceMotion) {
      video.muted = true;
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay blocked by browser policy:', err);
        });
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [shouldReduceMotion]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      setIsEnded(false);
      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
        video.currentTime = 0;
      }
      video.play();
    } else {
      video.pause();
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsEnded(false);
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-[#07070a] text-foreground">
      
      {/* ── 1. HERO SECTION WITH VIDEO BACKGROUND ────────────────────────────── */}
      <section 
        className="relative w-full min-h-[90vh] md:h-[calc(100vh-64px)] flex items-center overflow-hidden bg-[#07070a]"
        aria-label="Introduction Hero"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/hero-avatar.mp4"
          poster="/profile.png"
          autoPlay={!shouldReduceMotion}
          muted={isMuted}
          loop={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-[1.04] origin-center z-0 pointer-events-none opacity-85"
          aria-hidden="true"
        />

        {/* Cinematic dark overlay gradients */}
        {/* Left-to-right fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/90 to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute inset-0 bg-[#07070a]/70 z-10 pointer-events-none md:hidden" />
        {/* Bottom fade to dissolve edge seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent z-10 pointer-events-none" />
        {/* Subtle top-right atmospheric ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.12),transparent_60%)] z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-20 relative">
          
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
              <div className="h-8 flex items-center overflow-hidden">
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
                  "w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
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
                  "w-full sm:w-auto border-white/[0.08] hover:bg-white/[0.04] rounded-xl cursor-pointer flex gap-2 h-11 px-6 text-sm font-semibold transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                )}
                aria-label="Download PDF Resume"
              >
                <FileDown className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Glassmorphic Video Controls */}
          <div className="lg:col-span-5 flex justify-center items-center relative w-full z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md shadow-xl text-left space-y-4 max-w-xs w-full text-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300 font-mono">
                  Audio Intro
                </span>
                <span className="text-[9px] font-mono text-white/50">
                  {isEnded ? 'Ended' : isMuted ? 'Muted Preview' : 'Playing Sound'}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold">Interactive Avatar Video</h4>
                <p className="text-[10px] text-white/70 leading-relaxed">
                  Click controls below to toggle playback or play Kishore&apos;s audio introduction.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-400 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {isEnded ? (
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" /> Replay
                  </button>
                ) : (
                  <button
                    onClick={handleTogglePlay}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-3 w-3 fill-white" /> : <Play className="h-3 w-3 fill-white" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                )}

                <button
                  onClick={handleToggleMute}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 text-white font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
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
        className="w-full bg-[#09090e] relative overflow-hidden border-b border-white/[0.02]"
        aria-label="Engineering Journey Story"
      >
        {/* Subtle ambient light field */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
                className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-sm hover:border-violet-500/20 hover:bg-white/[0.025] transition-all flex flex-col justify-between h-52 text-left"
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
        </div>
      </section>

      {/* ── 3. FLAGSHIP PROJECTS SECTION (CASE STUDIES) ────────────────────── */}
      <section 
        className="w-full bg-[#050508] relative overflow-hidden border-b border-white/[0.02]"
        aria-label="Case Studies"
      >
        {/* Subtle grid pattern & ambient radial light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.04),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
                className="rounded-2xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-md overflow-hidden hover:border-violet-500/20 hover:bg-white/[0.025] transition-all flex flex-col justify-between h-full group text-left"
              >
                <div>
                  {/* Visual Thumbnail */}
                  <div className={cn(
                    "h-44 w-full bg-gradient-to-br relative flex items-center justify-center border-b border-white/[0.04]",
                    idx === 0 ? "from-violet-500/10 to-blue-500/10" :
                    idx === 1 ? "from-emerald-500/10 to-teal-500/10" :
                    "from-amber-500/10 to-orange-500/10"
                  )}>
                    {idx === 0 && <Brain className="h-12 w-12 text-violet-400" />}
                    {idx === 1 && <Layers className="h-12 w-12 text-emerald-400" />}
                    {idx === 2 && <Globe className="h-12 w-12 text-amber-400" />}

                    {/* Status & Difficulty overlays */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="outline" className="text-[8px] font-mono border-white/[0.08] bg-zinc-950/80 text-zinc-300 uppercase tracking-wider">
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className="text-[8px] font-mono border-violet-500/20 uppercase tracking-wider bg-violet-500/5 text-violet-400">
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

                    <div className="space-y-3 pt-3 border-t border-white/[0.04] text-xs">
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
                          <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.05]">
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
                <div className="p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-end gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'xs' }),
                        "h-7 text-[9px] font-bold uppercase tracking-wider border-white/[0.08] hover:bg-white/[0.04] cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      )}
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'xs' }),
                        "h-7 text-[9px] font-bold uppercase tracking-wider border-white/[0.08] hover:bg-white/[0.04] cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      )}
                    >
                      Demo
                    </a>
                  ) : null}
                  {!project.githubUrl && !project.demoUrl && (
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">
                      Links coming soon
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SKILLS DIRECTORY: GROUPED WITHOUT METERS ─────────────────────── */}
      <section 
        className="w-full bg-[#08080d] relative overflow-hidden border-b border-white/[0.02]"
        aria-label="Technical Skills"
      >
        {/* Subtle radial ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
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
                  "p-5 rounded-2xl border bg-white/[0.015] backdrop-blur-sm text-left space-y-4 transition-all",
                  item.highlighted ? "border-violet-500/20 shadow-[0_0_20px_rgba(124,58,237,0.04)]" : "border-white/[0.05]"
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
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                  {item.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-zinc-400 border border-white/[0.04] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CREDENTIALS & ACHIEVEMENTS ─────────────────────── */}
      <section 
        className="w-full bg-[#06060a] relative overflow-hidden border-b border-white/[0.02]"
        aria-label="Credentials & Achievements"
      >
        {/* Subtle radial ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.05),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-left mb-12">
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">Proof-of-Work</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1 font-heading">Credentials & Achievements</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Certifications, hackathons, and verified learning milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CREDENTIALS_DATA.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-md text-left space-y-4 hover:border-violet-500/20 hover:bg-white/[0.025] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Thumbnail / Placeholder */}
                    {cred.imageUrl ? (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/[0.05] bg-zinc-950/40 flex items-center justify-center select-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cred.imageUrl} alt={cred.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950/60 flex flex-col items-center justify-center p-3 text-center space-y-1 select-none">
                        <Icon className="h-7 w-7 text-violet-400/80" />
                        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Verified digital record</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground truncate max-w-[120px]">{cred.provider}</span>
                        {cred.type === 'Certification' ? (
                          <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[8px] tracking-wider uppercase">
                            Certification
                          </Badge>
                        ) : cred.type === 'Training Badge' ? (
                          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] tracking-wider uppercase">
                            Badge
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] tracking-wider uppercase">
                            Hackathon
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">{cred.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{cred.date}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.04] w-full">
                    <button 
                      onClick={() => setSelectedCredential(cred)} 
                      className="w-full text-xs font-semibold py-2 rounded-xl border border-white/[0.06] hover:bg-violet-500/10 hover:border-violet-500/20 transition-all text-violet-400 flex items-center justify-center gap-1 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
                    >
                      <span>View Credential</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION SECTION ───────────────────────────────────────── */}
      <section 
        className="w-full border-t border-white/[0.02] bg-[#040406] relative overflow-hidden"
        aria-label="Contact Channels"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(120,119,198,0.06),transparent)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 flex flex-col items-center relative z-10">
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
                "border-white/[0.08] hover:bg-white/[0.04] rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Download PDF Resume"
            >
              <FileDown className="h-4 w-4" />
              <span>Download CV</span>
            </a>
            <a
              href="mailto:biradarkishore07@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Kishore%20Biradar"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-white/[0.08] hover:bg-white/[0.04] rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Send email query"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
             <a
              href="https://www.linkedin.com/in/kishore-biradar-366126252"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-white/[0.08] hover:bg-white/[0.04] rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Visit LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Kishorebiradar07"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-white/[0.08] hover:bg-white/[0.04] rounded-xl h-10 px-5 text-xs font-semibold transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-violet-500 focus:outline-none"
              )}
              aria-label="Audit GitHub Repository"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCredential && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            {/* Backdrop click close */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCredential(null)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-zinc-950 border border-white/10 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6 z-10 text-left"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCredential(null)} 
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Certificate image / placeholder */}
              {selectedCredential.imageUrl ? (
                <div className="w-full bg-muted rounded-xl border border-border overflow-hidden relative flex items-center justify-center p-2 select-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedCredential.imageUrl} alt={selectedCredential.name} className="max-h-[40vh] object-contain rounded-lg" />
                </div>
              ) : (
                <div className="w-full bg-zinc-950 rounded-xl border-2 border-violet-500/25 p-8 relative flex flex-col items-center justify-center text-center space-y-4 min-h-[250px] select-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06),transparent)] pointer-events-none" />
                  <ShieldCheck className="h-10 w-10 text-violet-400" />
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Verified digital record</span>
                    <h3 className="text-base font-bold text-white max-w-md leading-snug">{selectedCredential.name}</h3>
                    <p className="text-xs text-violet-400 font-medium">{selectedCredential.provider}</p>
                  </div>
                  <p className="text-[10px] text-zinc-400 max-w-md leading-relaxed italic">{selectedCredential.placeholderDesc}</p>
                  <div className="text-[9px] font-mono text-zinc-500 border-t border-white/5 pt-3 w-full max-w-xs">
                    ID: VERIFIED-{selectedCredential.id.toUpperCase()}-{selectedCredential.date.replace(/[\s–]/g, '')}
                  </div>
                </div>
              )}

              {/* Description & metadata */}
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono uppercase text-violet-400 tracking-wider font-semibold">{selectedCredential.type}</span>
                  <h3 className="text-lg font-bold text-foreground mt-0.5 leading-snug">{selectedCredential.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{selectedCredential.provider} — {selectedCredential.date}</p>
                </div>
                
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  {selectedCredential.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>

                {selectedCredential.verificationUrl && (
                  <div className="pt-4 border-t border-border/40 flex justify-end">
                    <a 
                      href={selectedCredential.verificationUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={cn(buttonVariants({ size: 'sm' }), "bg-violet-600 hover:bg-violet-500 text-white rounded-xl flex items-center gap-1.5 text-xs font-semibold px-4 h-9 cursor-pointer")}
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
