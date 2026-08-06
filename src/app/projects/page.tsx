'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Brain,
  Trophy,
  Award,
  Code,
  Github,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projectsData, CaseStudy } from '@/lib/projects';

// Category filter list
const CATEGORY_FILTERS = [
  { key: 'all', label: 'All Cases' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'research', label: 'Research' },
  { key: 'hackathon', label: 'Hackathons' },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Filter projects by search query and category tags
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'ai' && project.tags.some(t => ['PyTorch', 'TensorFlow', 'Calibration', 'NLP'].includes(t))) ||
      (selectedCategory === 'research' && project.slug === 'intellidepth') ||
      (selectedCategory === 'hackathon' && project.slug === 'algoshield');

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full space-y-12 bg-background">
      
      {/* Page Header */}
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20 w-fit">
            Case Studies Registry
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-2 font-heading">
            Production Proof-of-Work
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Deep-dive architecture specifications, model calibrations, and classification pipelines. Each file maps design motives, dataset sweeps, and core latency saves.
        </p>
      </section>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pb-6 border-b border-border/60">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by project title, tech stack, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/30 border border-border/80 rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Categories filters tabs */}
        <div className="flex flex-wrap gap-1 bg-muted/40 p-0.5 rounded-xl border border-border/60">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer",
                selectedCategory === cat.key
                  ? "bg-card text-foreground border border-border/20 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-violet-500/20 transition-all flex flex-col justify-between h-full group shadow-[0_0_24px_rgba(0,0,0,0.02)]"
            >
              <div>
                
                {/* Thumbnail gradient cover */}
                <div className={cn(
                  "h-44 w-full bg-gradient-to-br relative flex items-center justify-center border-b border-border/40",
                  idx === 0 ? "from-violet-500/10 to-blue-500/10" :
                  idx === 1 ? "from-emerald-500/10 to-teal-500/10" :
                  "from-amber-500/10 to-orange-500/10"
                )}>
                  {idx === 0 && <Brain className="h-12 w-12 text-violet-400" />}
                  {idx === 1 && <ShieldCheck className="h-12 w-12 text-emerald-400" />}
                  {idx === 2 && <Layers className="h-12 w-12 text-amber-400" />}

                  {/* Status & Difficulty overlays */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge variant="outline" className="text-[8px] font-mono border-border uppercase bg-background/80 tracking-wider">
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className={cn(
                      "text-[8px] font-mono border-border uppercase tracking-wider",
                      project.difficulty === 'Advanced' ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-muted/80 text-muted-foreground"
                    )}>
                      {project.difficulty}
                    </Badge>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-violet-400">{project.category}</span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{project.tagline}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/40 text-xs">
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Problem</strong>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <strong className="text-foreground text-[10px] uppercase block mb-1">Results Metric</strong>
                      <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
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
        </AnimatePresence>
      </div>

    </div>
  );
}
