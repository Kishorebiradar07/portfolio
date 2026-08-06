'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { useRecruiterStore } from '@/store/useRecruiterStore';

export function RecruiterStickyPill() {
  const { isCustomized, recruiterDrawerOpen, setRecruiterDrawerOpen } = useRecruiterStore();

  const shouldShow = !isCustomized && !recruiterDrawerOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={() => setRecruiterDrawerOpen(true)}
          className="fixed bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-lg shadow-violet-500/20 border border-violet-500/30 cursor-pointer transition-all hover:scale-105"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Hiring? Customize this site</span>
          <Sparkles className="h-3 w-3 text-violet-200 animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
