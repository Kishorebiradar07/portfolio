import { create } from 'zustand';

export type RecruiterRole = 'default' | 'mlops' | 'fullstack-ai' | 'research' | 'nlp';

export interface RecruiterPersonalization {
  role: string;
  company: string;
  skills: string[];
  goal: string;
  highlightedProjects: string[]; // slugs of projects to highlight
  prioritizedSkills: string[];
  hiddenSections: string[]; // sections to hide, e.g. ['blog', 'experience']
  resumeVersion: 'general' | 'mlops' | 'research' | 'nlp';
}

interface RecruiterState {
  activeRole: RecruiterRole;
  recruiterCompany: string | null;
  recruiterEmail: string | null;
  isCustomized: boolean;
  assistantOpen: boolean;
  recruiterDrawerOpen: boolean;
  customPersonalization: RecruiterPersonalization | null;
  setActiveRole: (role: RecruiterRole) => void;
  setRecruiterDetails: (company: string, email: string | null) => void;
  setCustomPersonalization: (personalization: RecruiterPersonalization | null) => void;
  toggleAssistant: () => void;
  setAssistantOpen: (open: boolean) => void;
  setRecruiterDrawerOpen: (open: boolean) => void;
  resetCustomization: () => void;
}

export const useRecruiterStore = create<RecruiterState>((set) => ({
  activeRole: 'default',
  recruiterCompany: null,
  recruiterEmail: null,
  isCustomized: false,
  assistantOpen: false,
  recruiterDrawerOpen: false,
  customPersonalization: null,
  setActiveRole: (role) =>
    set(() => ({
      activeRole: role,
      isCustomized: role !== 'default',
      // Clear custom personalization if preset roles are toggled
      customPersonalization: null,
    })),
  setRecruiterDetails: (company, email) =>
    set(() => ({
      recruiterCompany: company,
      recruiterEmail: email,
    })),
  setCustomPersonalization: (personalization) =>
    set(() => ({
      customPersonalization: personalization,
      isCustomized: !!personalization,
      // Bind custom role to closest preset if available
      activeRole: personalization
        ? (personalization.resumeVersion as RecruiterRole)
        : 'default',
      recruiterCompany: personalization ? personalization.company : null,
    })),
  toggleAssistant: () =>
    set((state) => ({
      assistantOpen: !state.assistantOpen,
    })),
  setAssistantOpen: (open) =>
    set(() => ({
      assistantOpen: open,
    })),
  setRecruiterDrawerOpen: (open) =>
    set(() => ({
      recruiterDrawerOpen: open,
    })),
  resetCustomization: () =>
    set(() => ({
      activeRole: 'default',
      isCustomized: false,
      recruiterCompany: null,
      recruiterEmail: null,
      customPersonalization: null,
      recruiterDrawerOpen: false,
    })),
}));
