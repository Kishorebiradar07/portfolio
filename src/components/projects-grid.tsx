'use client';

import * as React from 'react';
import { FolderGit, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projectsData } from '@/lib/projects';

export function ProjectsGrid() {
  const sortedProjects = React.useMemo(() => {
    return [...projectsData].sort((a, b) => b.roleWeight.default - a.roleWeight.default);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FolderGit className="h-5 w-5 text-violet-500" />
            <span>Featured Case Studies</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Explore deep-dive technical architectures and implementation metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {sortedProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
              className="flex flex-col"
            >
              <Card className="flex-1 flex flex-col border border-border bg-card hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.03)] transition-all h-full rounded-xl overflow-hidden group">
                <CardHeader className="p-5 flex-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold mt-2 text-foreground group-hover:text-violet-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {project.tagline}
                  </CardDescription>
                </CardHeader>

                {/* Case Study Metrics */}
                <CardContent className="px-5 py-2 flex-1">
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col text-center">
                        <span className="text-sm font-bold font-mono text-foreground">{m.value}</span>
                        <span className="text-[8px] uppercase tracking-widest text-muted-foreground mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 rounded font-mono border border-border/40 font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-5 border-t border-border/50 flex-none flex gap-2">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        "px-3 hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg cursor-pointer h-9 flex items-center justify-center"
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider ml-auto">
                      Links coming soon
                    </span>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
