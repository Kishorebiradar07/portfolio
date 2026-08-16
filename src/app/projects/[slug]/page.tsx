'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FolderOpen,
  Calendar,
  Cpu,
  Server,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectsData } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = React.use(params);
  const project = projectsData.find((p) => p.slug === slug);

  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [aiStep, setAiStep] = React.useState(0);
  const [typedAnswer, setTypedAnswer] = React.useState('');

  if (!project) {
    notFound();
  }

  // AI explanation step animation triggers
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (aiModalOpen) {
      setTimeout(() => {
        setAiStep(0);
        setTypedAnswer('');
      }, 0);
      
      let stepCount = 0;
      interval = setInterval(() => {
        stepCount++;
        setAiStep(stepCount);
        if (stepCount >= 3) {
          clearInterval(interval);
          // Simulate typing for explanation text
          let charIndex = 0;
          const fullText = project.aiExplanation;
          const typingInterval = setInterval(() => {
            setTypedAnswer((prev) => prev + fullText.charAt(charIndex));
            charIndex++;
            if (charIndex >= fullText.length) {
              clearInterval(typingInterval);
            }
          }, 8);
        }
      }, 900);
    }
    return () => clearInterval(interval);
  }, [aiModalOpen, project]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12 bg-background">
      
      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Projects</span>
      </Link>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Sidebar Telemetry (col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                {project.category}
              </span>
              <Badge variant="outline" className="text-[9px] uppercase tracking-wider border-border bg-muted/20">
                {project.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action buttons & AI explainer */}
          <div className="space-y-2.5">
            {(project.githubUrl || project.demoUrl) && (
              <div className="flex gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      "flex-1 bg-violet-600 text-white hover:bg-violet-500 rounded-xl cursor-pointer h-10 px-4 text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                    )}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    <span>View Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      "flex-1 border-border hover:bg-accent rounded-xl cursor-pointer h-10 px-4 text-xs font-semibold flex items-center justify-center gap-2"
                    )}
                  >
                    <span>Launch Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Explain this project AI triggers */}
            <Button
              onClick={() => setAiModalOpen(true)}
              variant="outline"
              className="w-full border-violet-500/20 hover:border-violet-500/30 text-violet-400 bg-violet-500/[0.02] hover:bg-violet-500/[0.05] rounded-xl h-10 text-xs font-semibold flex gap-2 cursor-pointer"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Explain this Project with AI RAG</span>
            </Button>
          </div>

          {/* Performance Telemetry */}
          <div className="p-5 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Performance Telemetry
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-border/40 last:border-b-0">
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                  <span className="text-sm font-bold font-mono text-foreground">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies badges */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 rounded font-mono border border-border/40 font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Case study narrative (col-span-8) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Motivation & Problem */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Problem Statement & Motivation</span>
            </h2>
            <div className="p-5 rounded-2xl border border-amber-500/10 bg-amber-500/[0.01] space-y-3 leading-relaxed text-xs">
              <p className="text-muted-foreground">
                <strong className="text-foreground uppercase block text-[9px] mb-1">Challenge Details</strong>
                {project.problem}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground uppercase block text-[9px] mb-1">Architecture Motivations</strong>
                {project.motivation}
              </p>
            </div>
          </section>

          {/* System Architecture Flow */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Cpu className="h-5 w-5 text-violet-400" />
              <span>Pipeline Architecture & Flow</span>
            </h2>
            <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {project.architecture}
              </p>
              <div className="bg-muted/60 border border-border p-4 rounded-xl font-mono text-[10px] text-muted-foreground overflow-x-auto leading-relaxed">
                {`[Input Vector/Source] \n       │\n       ▼\n[${project.title} Preprocessor] ──► (Feature scaling loops)\n       │\n       ├─► [Calibrator Engine] ──► Temperature Scaled Scores\n       │\n       ▼\n[Exit Pipeline Prediction]`}
              </div>
            </div>
          </section>

          {/* Repository Folder Structure */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-violet-400" />
              <span>Repository Directory Mapping</span>
            </h2>
            <div className="bg-muted/40 border border-border/80 p-5 rounded-2xl font-mono text-[10px] text-muted-foreground overflow-x-auto leading-relaxed">
              <pre>{project.folderStructure}</pre>
            </div>
          </section>

          {/* Development Timeline (Module 5) */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-400" />
              <span>Project Development Stages</span>
            </h2>
            <div className="relative border-l border-border pl-6 ml-3 space-y-6">
              {project.timeline.map((item, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-card bg-violet-500" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-violet-400">{item.date}</span>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider border-border bg-muted/20">
                      {item.phase}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Module 4: Engineering Insights (whySelected, tradeoffs, performance, scalability) */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Server className="h-5 w-5 text-violet-400" />
              <span>Engineering Insights & Trade-offs</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground">Why Selected</span>
                <p className="text-muted-foreground">{project.insights.whySelected}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground">Trade-offs</span>
                <p className="text-muted-foreground">{project.insights.tradeoffs}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground">Performance Considerations</span>
                <p className="text-muted-foreground">{project.insights.performance}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground">Scalability Options</span>
                <p className="text-muted-foreground">{project.insights.scalability}</p>
              </div>
            </div>
          </section>

          {/* Research & Tech Choices */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>Technical Research & Choice Matrix</span>
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {project.research}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {project.techChoices.map((choice, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                  <span className="text-xs text-foreground font-mono">{choice}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Critical Challenges & Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400">
                  Engineering Bottleneck
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div className="p-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.01] space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
                  Technical Solution
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            </div>
          </section>

          {/* Results, Retrospectives */}
          <section className="space-y-4 border-t border-border pt-8 text-xs text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-bold text-foreground">
              Results & Retrospective
            </h2>
            <p>
              <strong className="text-foreground">Results:</strong> {project.results}
            </p>
            <p>
              <strong className="text-foreground">Lessons Learned:</strong> {project.lessons}
            </p>
            <p>
              <strong className="text-foreground">Future Directions:</strong> {project.future}
            </p>
          </section>

        </div>

      </div>

      {/* ── AI EXPLAINER DIALOGUE OVERLAY (RAG SIMULATOR) ──────────────────── */}
      <AnimatePresence>
        {aiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Title bar */}
              <div className="flex justify-between items-center p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">AI RAG Project Explainer</span>
                </div>
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* simulated terminal screen */}
              <div className="p-6 space-y-4 font-mono text-xs bg-black/40 text-muted-foreground h-96 overflow-y-auto leading-relaxed border-b border-border">
                
                {/* Step 1: Query logs */}
                <div className="space-y-1">
                  <span className="text-violet-400 block">[USER QUERY]</span>
                  <span className="text-foreground">&quot;Explain early-exit temperature scaling in {project.slug}...&quot;</span>
                </div>

                {/* Step 2: Vector search simulation */}
                {aiStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-1 pt-2 border-t border-border/20"
                  >
                    <span className="text-amber-400 block">[RAG VECTOR SEARCH]</span>
                    <span className="block text-[11px] text-zinc-500">Query Embedding: [0.125, -0.048, 0.912, ...] (1536-dim)</span>
                    <span className="block text-[11px] text-zinc-500">Searching indexes fallbackKnowledgeBase...</span>
                    <span className="text-emerald-400 block">✓ Retrieved doc matches title: &quot;Education Background&quot; &amp; &quot;Milestones&quot; (Similarity: 0.892)</span>
                  </motion.div>
                )}

                {/* Step 3: Context feed */}
                {aiStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-1 pt-2 border-t border-border/20"
                  >
                    <span className="text-blue-400 block">[CONTEXT FED TO MODEL]</span>
                    <span className="block text-[10px] text-zinc-500 italic bg-muted/20 p-2 rounded">
                      &quot;He specializes in deep learning model calibration (IntelliDepth early-exit system saving 58.45% FLOPs) tuned using L-BFGS...&quot;
                    </span>
                  </motion.div>
                )}

                {/* Step 4: Final output typed */}
                {aiStep >= 3 && (
                  <div className="space-y-1 pt-2 border-t border-border/20">
                    <span className="text-violet-400 block">[AI RESPONSE]</span>
                    <span className="text-foreground leading-relaxed block font-sans text-xs">
                      {typedAnswer}
                      <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-0.5 animate-pulse" />
                    </span>
                  </div>
                )}

              </div>

              {/* Footer actions */}
              <div className="p-4 bg-muted/20 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => setAiModalOpen(false)}
                  className="bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs"
                >
                  Got it
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
