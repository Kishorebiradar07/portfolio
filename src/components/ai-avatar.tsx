'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  X,
  Send,
  FileDown,
  Calendar,
  Sparkles,
  User,
  Bot,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  sender: 'ai' | 'user';
  text: React.ReactNode;
}

export function AiAvatar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState('');
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi, I'm Kishore's AI assistant. Ask me anything about his credentials, ECE projects, or hiring availability!",
    },
  ]);

  // Handle predefined queries (RAG structure)
  const handleQuery = (query: string) => {
    // Add user question message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);

    setIsSpeaking(true);
    setTimeout(() => {
      let response: React.ReactNode = '';

      const q = query.toLowerCase();
      if (q.includes('intellidepth')) {
        response = (
          <div className="space-y-1.5 leading-relaxed text-xs">
            <p>
              <strong>IntelliDepth</strong> is Kishore's major ECE graduation project: a confidence-calibrated multi-exit ResNet-56 classifier built in PyTorch.
            </p>
            <p>
              ✓ Saves **58.45% compute** (FLOPs) on CIFAR-100 test sets.<br />
              ✓ ECE error lowered to **0.024** via L-BFGS temperature scaling.
            </p>
            <a
              href="/projects/intellidepth"
              className="text-violet-400 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-0.5 mt-1 hover:underline"
            >
              View Case Study <Sparkles className="h-3 w-3" />
            </a>
          </div>
        );
      } else if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
        response = (
          <div className="space-y-1 leading-relaxed text-xs">
            <p>You can download Kishore's optimized CV / Resume directly here:</p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] uppercase tracking-wider mt-1 shadow-sm cursor-pointer"
            >
              <FileDown className="h-3.5 w-3.5" /> Download PDF Resume
            </a>
          </div>
        );
      } else if (q.includes('schedule') || q.includes('interview') || q.includes('hire')) {
        response = (
          <div className="space-y-1 leading-relaxed text-xs">
            <p>Sure, schedule a technical interview slot directly on his booking calendar:</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] uppercase tracking-wider mt-1 shadow-sm cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" /> Book Interview Slot
            </a>
          </div>
        );
      } else if (q.includes('emotion-detection') || q.includes('emotion') || q.includes('facial')) {
        response = (
          <div className="space-y-1.5 leading-relaxed text-xs">
            <p>
              <strong>Emotion Detection System</strong> is a facial expression classifier built on an optimized CNN backbone in PyTorch.
            </p>
            <p>
              ✓ Accuracy rate of **93.4%**.<br />
              ✓ Inference speeds under **18ms** per frame.
            </p>
            <a
              href="/projects/emotion-detection"
              className="text-violet-400 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-0.5 mt-1 hover:underline"
            >
              View Case Study <Sparkles className="h-3 w-3" />
            </a>
          </div>
        );
      } else if (q.includes('advisor') || q.includes('business') || q.includes('advisor')) {
        response = (
          <div className="space-y-1.5 leading-relaxed text-xs">
            <p>
              <strong>AI Business Advisor</strong> parses business reports to generate financial audits and recommendations.
            </p>
            <p>
              ✓ Prompt structural maps yield **95.2% accuracy**.<br />
              ✓ Context pipelines answer in **1.2 seconds**.
            </p>
            <a
              href="/projects/ai-business-advisor"
              className="text-violet-400 font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-0.5 mt-1 hover:underline"
            >
              View Case Study <Sparkles className="h-3 w-3" />
            </a>
          </div>
        );
      } else if (q.includes('skills') || q.includes('tech') || q.includes('know')) {
        response = (
          <div className="space-y-1 leading-relaxed text-xs">
            <p>Kishore specializes in:</p>
            <p>
              • **AI & ML**: PyTorch, Model Calibration (ECE), ResNet, CNNs.<br />
              • **NLP & CV**: OpenCV, TF-IDF Vectorizers, Text Classification.<br />
              • **Ops & Web**: Python, Docker, Next.js, Git, pgvector.
            </p>
          </div>
        );
      } else {
        response = (
          <div className="space-y-1 leading-relaxed text-xs">
            <p>
              Kishore is a final-year ECE student at Sai Vidya Institute of Technology specializing in **Deep Learning optimizations** (PyTorch) and **NLP applications**.
            </p>
            <p>
              Try asking: "Tell me about IntelliDepth", "Download his resume", or "Schedule an interview".
            </p>
          </div>
        );
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: response }]);
      setIsSpeaking(false);
    }, 850);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const msg = inputVal;
    setInputVal('');
    handleQuery(msg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* ── EXPANDED CHAT PANEL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[320px] sm:w-[360px] h-[480px] bg-card/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/60 bg-muted/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-violet-400" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-card" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-foreground block">Kishore's Assistant</span>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-mono">Knowledge Base RAG</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled);
                    toast.success(voiceEnabled ? 'Voice output disabled.' : 'Voice output enabled (synthesizer logs ready).');
                  }}
                  className={cn(
                    "p-1.5 rounded-lg border border-border/40 hover:bg-muted text-muted-foreground transition-all cursor-pointer",
                    voiceEnabled ? "text-violet-400 border-violet-500/20 bg-violet-500/5" : ""
                  )}
                  aria-label="Toggle voice output mode"
                >
                  {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Close assistant"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto leading-relaxed scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-2.5 items-start text-xs max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-[10px]",
                    msg.sender === 'user' ? "bg-muted text-foreground" : "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  )}>
                    {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-left border",
                    msg.sender === 'user' ? "bg-muted/40 border-border/60 rounded-tr-none text-foreground" : "bg-card border-border/80 rounded-tl-none text-muted-foreground"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* suggestions list */}
            <div className="p-3 border-t border-border/40 bg-muted/10 space-y-1.5">
              <div className="text-[8px] uppercase tracking-widest text-muted-foreground font-mono px-1">Suggested Inquiries</div>
              <div className="flex flex-wrap gap-1">
                {[
                  'Tell me about IntelliDepth',
                  'Download Resume',
                  'Schedule Interview',
                  'What is Emotion Detection?',
                ].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleQuery(sug)}
                    className="px-2.5 py-1 text-[9px] font-medium border border-border/60 hover:border-violet-500/30 rounded-lg bg-card text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice visemes visualizer placeholder */}
            {voiceEnabled && (
              <div className="px-4 py-2 border-t border-border/40 bg-violet-500/[0.02] flex items-center justify-between">
                <div className="flex gap-1 items-center h-4">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isSpeaking ? {
                        height: [4, 16, 4],
                      } : {
                        height: [4, 6, 4],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }}
                      className="w-0.5 rounded-full bg-violet-400"
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                  {isSpeaking ? "Synthesizing visemes..." : "Voice mode idle"}
                </span>
              </div>
            )}

            {/* Input field */}
            <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2 bg-muted/20">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask assistant anything..."
                className="flex-1 bg-muted/30 border border-border/80 rounded-xl px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500"
              />
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. FLOATING AI AVATAR TRIGGER ───────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group border border-violet-500/30 bg-card rounded-full p-3.5 shadow-2xl flex items-center justify-center cursor-pointer overflow-visible"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -3, 1, -2, 0],
          x: [0, 1.5, -1, 0.5, 0],
          rotate: [0, 1.5, -1, 0.5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Holographic Concentric breathing rings */}
        <motion.div
          className="absolute -inset-1 rounded-full border border-violet-500/20"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -inset-2.5 rounded-full border border-violet-500/10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Breathing inner orb visual */}
        <motion.div
          className="absolute inset-0.5 rounded-full bg-violet-500/5 filter blur-xs"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Dynamic blinking visual dot inside orb */}
        <div className="relative">
          <MessageSquare className="h-5 w-5 text-violet-400" />
          <motion.div
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-violet-400"
            animate={{
              scaleY: [1, 1, 0.1, 1, 1], // Blink simulation
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.button>

    </div>
  );
}
