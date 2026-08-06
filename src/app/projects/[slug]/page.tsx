import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectsData } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Projects</span>
      </Link>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Title, description & sidebar metrics (col-span-4 on large screens) */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
              {project.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-2">
              {project.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'default' }),
                "flex-1 bg-violet-600 text-white hover:bg-violet-500 rounded-lg cursor-pointer h-10 px-4 text-xs font-semibold flex items-center justify-center gap-2"
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              <span>View Source</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "flex-1 border-border hover:bg-accent rounded-lg cursor-pointer h-10 px-4 text-xs font-semibold flex items-center justify-center gap-2"
              )}
            >
              <span>Launch Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Metrics summary */}
          <div className="p-5 rounded-xl border border-border bg-card space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
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

          {/* Technology stack used */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Technologies Deployed
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

        {/* Narrative writeup content (col-span-8 on large screens) */}
        <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-border pt-12 lg:pt-0 lg:pl-12 space-y-12">
          
          {/* Motivation & Problem */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Problem Statement & Motivation</span>
            </h2>
            <div className="p-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                PROBLEM: {project.problem}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                MOTIVATION: {project.motivation}
              </p>
            </div>
          </section>

          {/* Research & Tech Choices */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>Technical Research & Framework Choices</span>
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

          {/* System Architecture */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              System Architecture & Implementation
            </h2>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                Pipeline Orchestration Flow
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {project.architecture}
              </p>
              <div className="bg-muted/60 border border-border p-4 rounded-lg font-mono text-[10px] text-muted-foreground overflow-x-auto leading-relaxed">
                {/* Visual architectural box diagram */}
                {`[Input Data Source] \n       │\n       ▼\n[${project.title} Engine] ──► (Dynamic serving routes)\n       │\n       ├─► [Pipeline Calibrator Module] ──► Calibrated Logits\n       │\n       ▼\n[Optimized Inference Exit]`}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4">
              {project.implementation}
            </p>
          </section>

          {/* Engineering Challenges & Solutions */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Engineering Challenges & Interventions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-border bg-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400">
                  Critical Challenge
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div className="p-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.01] space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
                  Engineering Intervention
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            </div>
          </section>

          {/* Results, Lessons Learned & Future Improvements */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground">
              Results & Retrospective
            </h2>
            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Results:</strong> {project.results}
              </p>
              <p>
                <strong className="text-foreground">Lessons Learned:</strong> {project.lessons}
              </p>
              <p>
                <strong className="text-foreground">Future Directions:</strong> {project.future}
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
