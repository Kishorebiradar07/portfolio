'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  User,
  FolderGit,
  Calendar,
  Search,
  Briefcase,
  Award,
  Trophy,
  BookOpen,
  Code,
  Brain,
  Mail,
  GraduationCap,
} from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { useRecruiterStore } from '@/store/useRecruiterStore';
import { toast } from 'sonner';

// ─── Searchable content index ──────────────────────────────────────────────
// Each entry defines: what label to show, keywords (for cmdk fuzzy matching),
// an icon, and what action to take when selected.
interface SearchEntry {
  id: string;
  label: string;
  sublabel?: string;
  group: string;
  keywords: string;
  icon: React.ElementType;
  action: (router: ReturnType<typeof useRouter>, helpers: Helpers) => void;
  href?: string;
}

interface Helpers {
  toggleAssistant: () => void;
  close: () => void;
}

const SEARCH_INDEX: SearchEntry[] = [
  // ── AI Assistant ──────────────────────────────────────────────────────────
  {
    id: 'ai-assistant',
    label: 'Ask AI Recruiter Assistant',
    sublabel: 'Chat with the portfolio AI',
    group: 'Quick Actions',
    keywords: 'ai assistant chat recruiter help ask question',
    icon: Sparkles,
    action: (_, { toggleAssistant }) => toggleAssistant(),
  },

  // ── Pages ─────────────────────────────────────────────────────────────────
  {
    id: 'about',
    label: 'About',
    sublabel: 'Background, skills & education',
    group: 'Pages',
    keywords: 'about kishore biradar developer profile background who',
    icon: User,
    href: '/about',
    action: (router) => router.push('/about'),
  },
  {
    id: 'projects',
    label: 'Projects',
    sublabel: 'ML case studies & builds',
    group: 'Pages',
    keywords: 'projects case studies builds work portfolio ml ai',
    icon: FolderGit,
    href: '/projects',
    action: (router) => router.push('/projects'),
  },
  {
    id: 'experience',
    label: 'Experience & Activities',
    sublabel: 'Hackathons, education timeline',
    group: 'Pages',
    keywords: 'experience activities journey hackathon timeline education',
    icon: Briefcase,
    href: '/experience',
    action: (router) => router.push('/experience'),
  },
  {
    id: 'contact',
    label: 'Contact Kishore',
    sublabel: 'Send a message or reach out',
    group: 'Pages',
    keywords: 'contact email reach out message',
    icon: Calendar,
    href: '/contact',
    action: (router) => router.push('/contact'),
  },
  {
    id: 'resume',
    label: 'Resume',
    sublabel: 'Download PDF resume',
    group: 'Pages',
    keywords: 'resume cv download pdf',
    icon: BookOpen,
    href: '/resume',
    action: (router) => router.push('/resume'),
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: 'intellidepth',
    label: 'IntelliDepth Adaptive Inference',
    sublabel: 'Multi-exit ResNet-56 · In Progress',
    group: 'Projects',
    keywords: 'intellidepth adaptive inference early exit resnet calibration ece temperature scaling cifar pytorch deep learning',
    icon: Brain,
    action: () => {
      toast.info("The detailed case study for this project isn't published yet.");
    },
  },
  {
    id: 'emotion-detection',
    label: 'Facial & Vocal Emotion Detection',
    sublabel: 'FaceNet + LSTM fusion · Completed',
    group: 'Projects',
    keywords: 'emotion detection facial vocal facenet lstm rnn multimodal opencv feature fusion completed',
    icon: Brain,
    action: () => {
      toast.info("The detailed case study for this project isn't published yet.");
    },
  },
  {
    id: 'ai-business-advisor',
    label: 'AI Business Advisor',
    sublabel: 'OpenAI + Next.js prototype',
    group: 'Projects',
    keywords: 'ai business advisor openai nextjs prototype nlp zustand prompt engineering',
    icon: Brain,
    action: () => {
      toast.info("The detailed case study for this project isn't published yet.");
    },
  },

  // ── Skills ────────────────────────────────────────────────────────────────
  {
    id: 'skills-aiml',
    label: 'AI & Machine Learning Skills',
    sublabel: 'PyTorch, FaceNet, RNN, LSTM, Calibration…',
    group: 'Skills',
    keywords: 'skills ai machine learning pytorch tensorflow facenet rnn lstm fcn calibration model',
    icon: Code,
    href: '/about',
    action: (router) => router.push('/about'),
  },
  {
    id: 'skills-programming',
    label: 'Programming Skills',
    sublabel: 'Python, C, JavaScript, TypeScript…',
    group: 'Skills',
    keywords: 'python c javascript typescript html css dsa data structures algorithms programming',
    icon: Code,
    href: '/about',
    action: (router) => router.push('/about'),
  },
  {
    id: 'skills-frontend',
    label: 'Frontend & Backend Skills',
    sublabel: 'Next.js, React, Node.js, FastAPI…',
    group: 'Skills',
    keywords: 'nextjs react nodejs fastapi tailwind zustand frontend backend fullstack',
    icon: Code,
    href: '/about',
    action: (router) => router.push('/about'),
  },
  {
    id: 'skills-databases',
    label: 'Databases & Tools',
    sublabel: 'PostgreSQL, Supabase, Docker, Git…',
    group: 'Skills',
    keywords: 'postgresql supabase drizzle docker git github databases tools',
    icon: Code,
    href: '/about',
    action: (router) => router.push('/about'),
  },

  // ── Credentials & Certifications ──────────────────────────────────────────
  {
    id: 'cert-ibm-fundamentals',
    label: 'IBM AI Fundamentals',
    sublabel: 'IBM SkillsBuild · Aug 2025',
    group: 'Credentials',
    keywords: 'ibm skillsbuild ai fundamentals certification credential 2025',
    icon: Award,
    action: (router) => router.push('/#credentials'),
  },
  {
    id: 'cert-aws-genai',
    label: 'AWS Generative AI Foundations',
    sublabel: 'AWS Academy Badge · Nov 2025',
    group: 'Credentials',
    keywords: 'aws academy generative ai foundations badge 2025 cloud',
    icon: Award,
    action: (router) => router.push('/#credentials'),
  },
  {
    id: 'cert-ibm-literacy',
    label: 'IBM AI Literacy',
    sublabel: 'IBM SkillsBuild · Dec 2025',
    group: 'Credentials',
    keywords: 'ibm skillsbuild ai literacy certification 2025',
    icon: Award,
    action: (router) => router.push('/#credentials'),
  },
  {
    id: 'cert-nptel',
    label: 'NPTEL Deep Learning',
    sublabel: 'IISc Bangalore · Jan–Apr 2026 · Score 54%',
    group: 'Credentials',
    keywords: 'nptel deep learning foundations isc bangalore swayam certification 2026 score',
    icon: Award,
    action: (router) => router.push('/#credentials'),
  },

  // ── Hackathons ────────────────────────────────────────────────────────────
  {
    id: 'hackverse',
    label: 'HackVerse Hackathon',
    sublabel: 'SVIT · Apr 9–11, 2026 · Participant',
    group: 'Hackathons & Activities',
    keywords: 'hackverse hackathon participant svit sai vidya 2026 april',
    icon: Trophy,
    href: '/experience',
    action: (router) => router.push('/experience'),
  },
  {
    id: 'gemma-sprint',
    label: 'Gemma: Bengaluru AI Sprint',
    sublabel: 'Google Build with Gemma · Team TraceX · Apr 2026',
    group: 'Hackathons & Activities',
    keywords: 'gemma bengaluru ai sprint google build tracex team hackathon 2026',
    icon: Trophy,
    href: '/experience',
    action: (router) => router.push('/experience'),
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: 'education-svit',
    label: 'B.E. AI & Machine Learning — SVIT',
    sublabel: 'Sai Vidya Institute of Technology · 2023–2027 · CGPA 8.4',
    group: 'Education',
    keywords: 'education be btech svit sai vidya institute technology bangalore aiml ai ml cgpa 8.4 2027 undergraduate',
    icon: GraduationCap,
    href: '/about',
    action: (router) => router.push('/about'),
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    id: 'contact-email',
    label: 'Email Kishore',
    sublabel: 'biradarkishore07@gmail.com',
    group: 'Contact',
    keywords: 'email contact gmail biradarkishore07',
    icon: Mail,
    action: () => {
      window.location.href = 'mailto:biradarkishore07@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Kishore%20Biradar';
    },
  },
  {
    id: 'contact-github',
    label: 'GitHub Profile',
    sublabel: 'github.com/Kishorebiradar07',
    group: 'Contact',
    keywords: 'github profile kishorebiradar07 code repository',
    icon: FolderGit,
    action: () => {
      window.open('https://github.com/Kishorebiradar07', '_blank', 'noreferrer');
    },
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn Profile',
    sublabel: 'linkedin.com/in/kishore-biradar-366126252',
    group: 'Contact',
    keywords: 'linkedin profile professional network kishore biradar',
    icon: User,
    action: () => {
      window.open('https://www.linkedin.com/in/kishore-biradar-366126252', '_blank', 'noreferrer');
    },
  },
];

// Group entries by their group label
const GROUPS = Array.from(new Set(SEARCH_INDEX.map((e) => e.group)));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggleAssistant = useRecruiterStore((state) => state.toggleAssistant);

  // Ctrl/Cmd + K to open
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const helpers: Helpers = React.useMemo(
    () => ({ toggleAssistant, close: () => setOpen(false) }),
    [toggleAssistant]
  );

  const runEntry = React.useCallback(
    (entry: SearchEntry) => {
      setOpen(false);
      // Small timeout so the dialog closes before navigation
      setTimeout(() => entry.action(router, helpers), 50);
    },
    [router, helpers]
  );

  return (
    <>
      {/* Trigger button */}
      <button
        id="search-portfolio-btn"
        onClick={() => setOpen(true)}
        aria-label="Search portfolio"
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-border bg-card hover:bg-accent rounded-lg cursor-pointer transition-colors"
      >
        <Search className="h-3 w-3" />
        <span className="hidden sm:inline-block">Search portfolio...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search dialog — Command root is provided inside CommandDialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Portfolio"
        description="Search projects, skills, credentials, hackathons and more."
      >
        <CommandInput placeholder="Search portfolio..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {GROUPS.map((group) => {
            const entries = SEARCH_INDEX.filter((e) => e.group === group);
            return (
              <CommandGroup key={group} heading={group}>
                {entries.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <CommandItem
                      key={entry.id}
                      value={`${entry.label} ${entry.sublabel ?? ''} ${entry.keywords}`}
                      onSelect={() => runEntry(entry)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{entry.label}</span>
                        {entry.sublabel && (
                          <span className="text-[10px] text-muted-foreground truncate">
                            {entry.sublabel}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
