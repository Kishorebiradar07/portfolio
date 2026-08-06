'use client';

import * as React from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Briefcase,
  Layers,
  Bot,
  Brain,
  RotateCcw,
  Check,
  Eye,
  Terminal,
  Activity,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRecruiterStore, RecruiterRole, RecruiterPersonalization } from '@/store/useRecruiterStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface RoleOption {
  value: RecruiterRole;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleOptions: RoleOption[] = [
  {
    value: 'mlops',
    title: 'MLOps / Platform Engineer',
    description: 'Prioritizes orchestration, Kubernetes configs, scraping agents, and latency reductions.',
    icon: Layers,
  },
  {
    value: 'nlp',
    title: 'NLP / Retrieval Specialist',
    description: 'Highlights pgvector search pipelines, HNSW index benchmarks, and streaming LLMs.',
    icon: Bot,
  },
  {
    value: 'research',
    title: 'Deep Learning / CV Researcher',
    description: 'Highlights ResNet architectures, Expected Calibration Error parameters, and scaling.',
    icon: Brain,
  },
  {
    value: 'fullstack-ai',
    title: 'Full-Stack AI Product Architect',
    description: 'Focuses on responsive design implementations, React Hook Forms, and Drizzle query setups.',
    icon: Briefcase,
  },
];

const SCANNING_STEPS = [
  'Initializing personalization pipeline...',
  'Parsing recruiter hiring requirements...',
  'Running semantic match vectors...',
  'Weighting project match coefficients...',
  'Optimizing skills radar priorities...',
  'Formulating resume PDF redirects...',
  'Complete. Optimization ready to deploy.'
];

export function RecruiterControl() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'presets' | 'ai'>('ai');
  const [company, setCompany] = React.useState('');
  const [email, setEmail] = React.useState('');
  
  // AI-form states
  const [aiRole, setAiRole] = React.useState('');
  const [aiCompany, setAiCompany] = React.useState('');
  const [aiSkills, setAiSkills] = React.useState('');
  const [aiGoal, setAiGoal] = React.useState('');
  
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiStepIndex, setAiStepIndex] = React.useState(0);
  const [recommendation, setRecommendation] = React.useState<RecruiterPersonalization | null>(null);

  const {
    activeRole,
    recruiterCompany,
    recruiterEmail,
    isCustomized,
    recruiterDrawerOpen,
    customPersonalization,
    setActiveRole,
    setRecruiterDetails,
    setCustomPersonalization,
    setRecruiterDrawerOpen,
    resetCustomization,
  } = useRecruiterStore();

  // Populate local fields if state already has details
  React.useEffect(() => {
    if (recruiterCompany) {
      setCompany(recruiterCompany);
      setAiCompany(recruiterCompany);
    }
    if (recruiterEmail) setEmail(recruiterEmail);
  }, [recruiterCompany, recruiterEmail]);

  // Animate loading step strings
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (aiLoading) {
      setAiStepIndex(0);
      interval = setInterval(() => {
        setAiStepIndex((prev) => {
          if (prev < SCANNING_STEPS.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [aiLoading]);

  const handleRoleSelect = (role: RecruiterRole) => {
    setActiveRole(role);
    toast.success(`Theme and project catalog updated to match preset role.`);
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;

    try {
      const res = await fetch('/api/recruiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, email, roleInterest: activeRole }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        setRecruiterDetails(company, email);
        toast.success(`Welcome, ${company}! Theme adjusted to match ${activeRole} presets.`);
      } else {
        setRecruiterDetails(company, email);
        toast.info(`Welcome, ${company}! Settings saved locally.`);
      }
    } catch (err) {
      console.error(err);
      setRecruiterDetails(company, email);
      toast.info(`Welcome, ${company}! Custom layout applied locally.`);
    } finally {
      setRecruiterDrawerOpen(false);
    }
  };

  const handleAiTailorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiRole.trim() || !aiCompany.trim()) return;

    setAiLoading(true);
    setRecommendation(null);
    try {
      const res = await fetch('/api/recruiter/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: aiRole,
          company: aiCompany,
          skills: aiSkills,
          goal: aiGoal,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // Artificially wait for the last loading step to complete for a premium UX
        await new Promise((resolve) => setTimeout(resolve, 800));
        setRecommendation(data);
        toast.success('AI Optimization Complete! Preview details below.');
      } else {
        toast.error('AI Matchmaking failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Connection delay. Try preset filters.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAiPersonalization = () => {
    if (!recommendation) return;
    setCustomPersonalization(recommendation);
    setRecruiterDrawerOpen(false);
    toast.success(`Custom portfolio optimization applied for ${recommendation.company}!`);
  };

  return (
    <Sheet open={recruiterDrawerOpen} onOpenChange={setRecruiterDrawerOpen}>
      <SheetTrigger
        render={
          <Button
            variant={isCustomized ? 'default' : 'outline'}
            size="sm"
            className={`gap-2 h-9 rounded-lg cursor-pointer font-medium transition-all ${
              isCustomized
                ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] border-transparent'
                : 'border-border'
            }`}
          />
        }
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>{isCustomized ? 'Personalized' : 'Customize Mode'}</span>
      </SheetTrigger>
      
      <SheetContent className="w-[92vw] sm:max-w-md border-border bg-card overflow-y-auto flex flex-col h-full p-6">
        <SheetHeader className="text-left flex-none">
          <SheetTitle className="flex items-center gap-2 text-xl font-heading">
            <Sparkles className="h-5 w-5 text-violet-500" />
            Personalize Interface
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground leading-relaxed">
            Tailor portfolio themes, highlights, and resume indexes using preset options or custom AI matching logic.
          </SheetDescription>
        </SheetHeader>

        {/* Tab triggers */}
        <div className="flex bg-muted/60 p-0.5 rounded-lg border border-border/40 mt-4 flex-none">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 flex justify-center items-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-card text-foreground shadow-xs border border-border/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Bot className="h-3.5 w-3.5" />
            AI Matchmaker
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex justify-center items-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'bg-card text-foreground shadow-xs border border-border/20'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Preset Roles
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <AnimatePresence mode="wait">
            {activeTab === 'ai' ? (
              <motion.div
                key="ai-match"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 pt-2"
              >
                {!recommendation && !aiLoading && (
                  <form onSubmit={handleAiTailorSubmit} className="space-y-3.5">
                    <div className="space-y-1">
                      <label htmlFor="ai-company" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        Your Company
                      </label>
                      <Input
                        id="ai-company"
                        placeholder="e.g. OpenAI, Stripe, Linear"
                        required
                        value={aiCompany}
                        onChange={(e) => setAiCompany(e.target.value)}
                        className="bg-muted/40 border-border h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ai-role" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        Role / Title
                      </label>
                      <Input
                        id="ai-role"
                        placeholder="e.g. Staff MLOps Engineer"
                        required
                        value={aiRole}
                        onChange={(e) => setAiRole(e.target.value)}
                        className="bg-muted/40 border-border h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ai-skills" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        Required Skills (Optional)
                      </label>
                      <Input
                        id="ai-skills"
                        placeholder="e.g. PyTorch, Docker, Kubernetes"
                        value={aiSkills}
                        onChange={(e) => setAiSkills(e.target.value)}
                        className="bg-muted/40 border-border h-9 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ai-goal" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        Hiring Goal (Optional)
                      </label>
                      <Textarea
                        id="ai-goal"
                        placeholder="e.g. Building low-latency vision deployment pipelines on Kubernetes cluster nodes."
                        rows={3}
                        value={aiGoal}
                        onChange={(e) => setAiGoal(e.target.value)}
                        className="bg-muted/40 border-border text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer h-9 text-xs font-bold shadow-[0_0_12px_rgba(124,58,237,0.15)] flex gap-1.5 justify-center items-center"
                    >
                      <Sparkles className="h-4 w-4" />
                      Optimize Layout using AI
                    </Button>
                  </form>
                )}

                {/* AI loading logs visualizer */}
                {aiLoading && (
                  <div className="border border-border/80 rounded-xl bg-black/40 p-4 space-y-3 font-mono text-[10px] text-zinc-300 min-h-[180px] flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 border-b border-border/30 pb-2 flex-none">
                      <Terminal className="h-3.5 w-3.5 text-violet-400" />
                      <span className="text-muted-foreground uppercase tracking-widest text-[9px]">Tailoring System Logs</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5 text-violet-500 animate-spin" />
                        <span className="text-zinc-100">{SCANNING_STEPS[aiStepIndex]}</span>
                      </div>
                      <div className="w-full bg-muted/40 rounded-full h-1">
                        <div
                          className="bg-violet-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${((aiStepIndex + 1) / SCANNING_STEPS.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Before & After matrix optimization view */}
                {recommendation && !aiLoading && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                        Tailoring Matrix Preview
                      </span>
                      <div className="border border-border rounded-xl overflow-hidden bg-muted/10">
                        {/* Headers */}
                        <div className="grid grid-cols-2 text-center text-[10px] font-bold uppercase tracking-wider py-1.5 bg-muted/30 border-b border-border">
                          <div className="text-muted-foreground flex justify-center items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Before (Default)
                          </div>
                          <div className="text-violet-400 flex justify-center items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            After (AI-Optimized)
                          </div>
                        </div>

                        {/* Comparative content */}
                        <div className="grid grid-cols-2 divide-x divide-border p-4 gap-3 text-xs leading-relaxed">
                          {/* Before */}
                          <div className="space-y-3.5 text-muted-foreground">
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground">Standard Portfolio</p>
                              <p className="text-[10px]">Static layout hierarchy</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground">Generic Index</p>
                              <p className="text-[10px]">Highlighting all case studies</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground">Standard Skills</p>
                              <p className="text-[10px]">All toolsets represented equally</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground">General Resume</p>
                              <p className="text-[10px]">Download generic resume</p>
                            </div>
                          </div>

                          {/* After */}
                          <div className="space-y-3.5 pl-3 text-zinc-300">
                            <div className="space-y-0.5">
                              <p className="font-bold text-foreground truncate">{recommendation.role}</p>
                              <p className="text-[10px] text-violet-400 truncate">Tailored for {recommendation.company}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-zinc-100">Dynamic Spotlight</p>
                              <p className="text-[10px] text-violet-400 font-medium truncate">
                                Proj: {recommendation.highlightedProjects.slice(0, 2).join(', ')}
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-zinc-100">Prioritized Stack</p>
                              <p className="text-[10px] text-violet-400 font-medium truncate">
                                {recommendation.prioritizedSkills.slice(0, 3).join(', ')}
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-zinc-100">Custom Resume</p>
                              <p className="text-[10px] text-violet-400 font-medium uppercase truncate">
                                {recommendation.resumeVersion} PDF
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleApplyAiPersonalization}
                        className="flex-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer h-9 text-xs font-semibold"
                      >
                        Deploy AI Layout
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setRecommendation(null)}
                        className="border-border rounded-lg cursor-pointer h-9 text-xs"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="presets-match"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 pt-2"
              >
                {/* Role profiles selection */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    Target Hiring Profile
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {roleOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = activeRole === opt.value && !customPersonalization;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleRoleSelect(opt.value)}
                          className={`flex items-start gap-3 p-3.5 rounded-lg border text-left cursor-pointer transition-all hover:bg-accent/40 ${
                            isSelected
                              ? 'border-violet-500/50 bg-violet-500/5 shadow-[0_0_12px_rgba(124,58,237,0.05)]'
                              : 'border-border bg-transparent'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-md mt-0.5 ${
                              isSelected
                                ? 'bg-violet-500/10 text-violet-400'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {opt.title}
                              </span>
                              {isSelected && <Check className="h-4 w-4 text-violet-400" />}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {opt.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preset saving details */}
                <form onSubmit={handleSaveDetails} className="space-y-4 pt-4 border-t border-border/50">
                  <div className="space-y-1">
                    <label htmlFor="company" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      Your Company / Team (Optional)
                    </label>
                    <Input
                      id="company"
                      placeholder="e.g. OpenAI, Google, Stripe"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-muted/40 border-border h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="recruiter-email" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      Work Email (Optional)
                    </label>
                    <Input
                      id="recruiter-email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/40 border-border h-9 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!company.trim()}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer h-9 text-xs font-semibold"
                  >
                    Save & Personalize Presets
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Reset options at the bottom */}
        {isCustomized && (
          <div className="pt-4 border-t border-border flex-none">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetCustomization();
                setCompany('');
                setEmail('');
                setAiCompany('');
                setAiRole('');
                setAiSkills('');
                setAiGoal('');
                setRecommendation(null);
                toast.info('Portfolio layout restored to default view.');
              }}
              className="w-full border-border rounded-lg cursor-pointer h-9 text-xs font-medium text-muted-foreground hover:text-foreground flex gap-1.5 justify-center items-center"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Personalization
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
