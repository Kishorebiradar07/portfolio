import { ProjectsGrid } from '@/components/projects-grid';

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Case Studies
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Production Proof-of-Work
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore complete architectural writeups of deep learning optimization, semantic vector pipelines, and ML Ops deployment orchestrators. Each project represents a professional-grade study containing motivation, diagrams, challenges, and measurable performance results.
        </p>
      </section>

      <section className="pt-8 border-t border-border">
        <ProjectsGrid />
      </section>
    </div>
  );
}
