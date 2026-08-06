import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { Sparkles, Terminal, Code2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <Hero />

      {/* Main content grid */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Core Competencies Quick Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card hover:border-violet-500/20 transition-all space-y-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 w-fit">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Applied Deep Learning
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Experience training multi-exit architectures, configuring loss schedules, and applying post-hoc calibration algorithms in PyTorch.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:border-violet-500/20 transition-all space-y-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 w-fit">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Full-Stack Engineering
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Architecting fast web applications with Next.js App Router, managing state with Zustand, and defining schemas using Drizzle ORM.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card hover:border-violet-500/20 transition-all space-y-3">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 w-fit">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Vector & RAG Architectures
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Structuring parent-child chunk index configurations, writing pgvector queries, and embedding indexing for contextual search.
            </p>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="pt-8">
          <ProjectsGrid />
        </section>

      </div>
    </div>
  );
}

