'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquareCode, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRecruiterStore } from '@/store/useRecruiterStore';

export function Hero() {
  const { activeRole, toggleAssistant, customPersonalization } = useRecruiterStore();

  const getContent = () => {
    if (customPersonalization) {
      return {
        badge: `${customPersonalization.company} Optimized Profile`,
        title: `Aligning Engineering Capabilities with the ${customPersonalization.role} Role`,
        subtitle: `Tailoring model architectures and project highlights to address your goal: "${customPersonalization.goal || `Personalized selection for ${customPersonalization.role}`}".`,
        stats: [
          { label: 'Hiring Team', val: customPersonalization.company },
          { label: 'Target Focus', val: customPersonalization.resumeVersion.toUpperCase() },
          { label: 'Core Stack', val: customPersonalization.prioritizedSkills[0] || 'Python' },
        ],
      };
    }

    switch (activeRole) {
      case 'mlops':
        return {
          badge: 'ML Infrastructure & Ops',
          title: 'Architecting Scalable Machine Learning Infrastructure',
          subtitle: 'Designing Dockerized model deployment systems, CI/CD automated training pipelines, and real-time inference monitoring dashboards.',
          stats: [
            { label: 'Latency Target', val: '< 50ms' },
            { label: 'Orchestrations', val: 'Kubernetes' },
            { label: 'Engines Deployed', val: 'Triton / FastAPI' },
          ],
        };
      case 'fullstack-ai':
        return {
          badge: 'Full-Stack AI Product Architect',
          title: 'Building Intelligent SaaS Products from Idea to Deploy',
          subtitle: 'Crafting high-fidelity Next.js interfaces powered by serverless backend APIs, secure Clerk authentication, and Drizzle/Supabase databases.',
          stats: [
            { label: 'React Framework', val: 'Next.js App Router' },
            { label: 'Security & Auth', val: 'Clerk SSO' },
            { label: 'Database ORM', val: 'Drizzle + pg' },
          ],
        };
      case 'nlp':
        return {
          badge: 'NLP & Large Language Models',
          title: 'Structuring RAG Pipelines and Autonomous Agents',
          subtitle: 'Optimizing token parsing, designing vector-database retrieval structures (pgvector), and constructing custom agentic prompt-chains.',
          stats: [
            { label: 'Embeddings Size', val: '1536-dim (OpenAI)' },
            { label: 'Vector Index', val: 'pgvector / HNSW' },
            { label: 'Frameworks', val: 'LangChain / custom' },
          ],
        };
      default:
        return {
          badge: 'Applied AI & ECE Portfolio',
          title: 'Optimizing Deep Learning & Intelligent Systems',
          subtitle: 'Final-year Electronics & Communication Engineering student at Sai Vidya Institute of Technology, Bangalore. Specializing in PyTorch model calibration and NLP classification pipelines.',
          stats: [
            { label: 'College SVIT', val: 'Dept of ECE' },
            { label: 'Model Focus', val: 'Deep Learning' },
            { label: 'Core Stack', val: 'PyTorch & Python' },
          ],
        };
    }
  };

  const { badge, title, subtitle, stats } = getContent();

  return (
    <section className="relative w-full overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6 uppercase tracking-wider font-mono"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-3xl"
          >
            {title}
          </motion.h1>
        </AnimatePresence>

        {/* Dynamic Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Button
            onClick={toggleAssistant}
            size="lg"
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer flex gap-2 h-11 px-5 text-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.2)]"
          >
            <MessageSquareCode className="h-4 w-4" />
            <span>Talk to AI Assistant</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="w-full sm:w-auto border-border hover:bg-accent rounded-lg cursor-pointer flex gap-2 h-11 px-5 text-sm font-semibold"
          >
            <FileDown className="h-4 w-4" />
            <span>Download Tailored CV</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </motion.div>

        {/* Metrics Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 pt-12 border-t border-border w-full max-w-3xl"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-bold tracking-tight text-foreground font-mono">
                  {stat.val}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
