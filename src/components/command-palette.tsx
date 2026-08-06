'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  User,
  FolderGit,
  Terminal,
  Calendar,
  Search,
  BookOpen,
  Briefcase,
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

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const toggleAssistant = useRecruiterStore((state) => state.toggleAssistant);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-border bg-card hover:bg-accent rounded-lg cursor-pointer transition-colors"
      >
        <Search className="h-3 w-3" />
        <span className="hidden sm:inline-block">Search portfolio...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => runCommand(() => toggleAssistant())}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-violet-500" />
              <span>Ask AI Recruiter Assistant</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/projects'))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FolderGit className="h-4 w-4" />
              <span>Browse ML Case Studies</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/about'))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="h-4 w-4" />
              <span>About Developer</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Sections">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/experience'))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="h-4 w-4" />
              <span>Experience & Journey</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/blog'))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Technical Deep-Dives</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/contact'))}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Interview / Contact</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
