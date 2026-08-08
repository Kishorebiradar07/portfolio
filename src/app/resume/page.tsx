'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  FileDown,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  Sliders,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { resumeData } from '@/lib/resume-data';
import { matchJobDescription, JobMatcherOutput } from '@/lib/job-matcher';
import { toast } from 'sonner';

export default function ResumePage() {
  const [activeTab, setActiveTab] = React.useState<'view' | 'match'>('view');
  const [jobDescription, setJobDescription] = React.useState('');
  const [matchResult, setMatchResult] = React.useState<JobMatcherOutput | null>(null);
  const [isMatching, setIsMatching] = React.useState(false);

  // Trigger matching engine
  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description.');
      return;
    }
    setIsMatching(true);
    try {
      const result = await matchJobDescription(jobDescription);
      setMatchResult(result);
      toast.success('Profile analysis completed successfully!');
    } catch (err) {
      toast.error('Failed to analyze job description.');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 w-full min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6 text-left">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Recruiter Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Resume & Job Matcher
          </h1>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-muted/40 border border-border p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('view')}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer",
              activeTab === 'view' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            View Resume
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={cn(
              "px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer",
              activeTab === 'match' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Match My Profile
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-12 w-full">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: VIEW RESUME */}
            {activeTab === 'view' && (
              <motion.div
                key="resume-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Resume Header Panel */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/20 border border-border p-4 rounded-xl text-left">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-violet-400" />
                    <div>
                      <h2 className="text-sm font-bold text-foreground">ATS-Friendly Document Format</h2>
                      <p className="text-[10px] text-muted-foreground">Standard black & white styling optimized for parsers</p>
                    </div>
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:outline-none cursor-pointer"
                  >
                    <FileDown className="h-4 w-4" />
                    <span>Download PDF</span>
                  </a>
                </div>

                {/* ATS Canvas sheet wrapper */}
                <div className="w-full bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-12 text-left font-sans text-foreground max-w-4xl mx-auto space-y-8 select-text">
                  
                  {/* Candidate Identity */}
                  <div className="text-center space-y-2 border-b border-border/80 pb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight">{resumeData.personal.name}</h1>
                    <p className="text-sm font-semibold text-violet-400 font-mono tracking-wide">{resumeData.personal.role}</p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" /> {resumeData.personal.email}
                      </span>
                      <span>•</span>
                      <span>{resumeData.personal.location}</span>
                      <span>•</span>
                      <span className="text-amber-500/80 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                        {resumeData.personal.phone}
                      </span>
                    </div>

                    <div className="flex justify-center gap-4 pt-2">
                      <a href={resumeData.personal.github} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono hover:underline">
                        <Github className="h-3 w-3" /> github
                      </a>
                      <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono hover:underline">
                        <Linkedin className="h-3 w-3" /> linkedin
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Professional Summary</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{resumeData.personal.summary}</p>
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Education</h3>
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-xs font-bold text-foreground">{edu.degree}</h4>
                            <p className="text-[11px] text-violet-400">{edu.spec}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground font-mono">{edu.dates}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                          <span>{edu.institution}</span>
                          <span className="font-bold text-foreground">GPA: {edu.gpa}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Technical Expertise</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-3">
                      {resumeData.skills.map((skillGroup, idx) => (
                        <div key={idx} className="space-y-1">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">{skillGroup.category}</h4>
                          <p className="text-xs text-foreground leading-normal">{skillGroup.keywords.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Employment History</h3>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="text-xs font-bold text-foreground">{exp.role}</h4>
                              <p className="text-[11px] text-violet-400">{exp.company} — {exp.location}</p>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">{exp.duration}</span>
                          </div>
                          <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-muted-foreground leading-relaxed">
                            {exp.bullets.map((bullet, bulletIdx) => (
                              <li key={bulletIdx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects details */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Engineering Projects</h3>
                    <div className="space-y-4">
                      {resumeData.projects.map((proj, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-foreground">{proj.title}</h4>
                            <span className="text-[10px] text-violet-400 font-mono">{proj.role}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1.5">{proj.summary}</p>
                          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-muted-foreground/80 leading-relaxed">
                            {proj.highlights.map((highlight, highlightIdx) => (
                              <li key={highlightIdx}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Certifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/40 pt-3">
                      {resumeData.certifications.map((cert, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <h4 className="text-xs font-bold text-foreground leading-tight">{cert.title}</h4>
                          <p className="text-[10px] text-muted-foreground">{cert.issuer} ({cert.date})</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-violet-400 font-mono">Achievements & Milestones</h3>
                    <div className="space-y-3 border-t border-border/40 pt-3">
                      {resumeData.achievements.map((ach, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-foreground">{ach.title}</h4>
                            <span className="text-[10px] text-muted-foreground font-mono">{ach.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{ach.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 2: JOB MATCHER */}
            {activeTab === 'match' && (
              <motion.div
                key="resume-matcher"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
              >
                {/* Input Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-4">
                    <div>
                      <h2 className="text-base font-bold text-foreground">Paste Job Specification</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Our scanner will check Kishore's ECE optimization research, core PyTorch assets, and full-stack tags against job requirements.
                      </p>
                    </div>

                    <form onSubmit={handleMatch} className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="jd-textarea" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                          Job Description Text
                        </label>
                        <textarea
                          id="jd-textarea"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Example: Looking for an AI Engineer with Python, PyTorch, Computer Vision, and LLM experience..."
                          className="w-full h-64 bg-muted/20 border border-border/80 focus:border-violet-500 rounded-xl p-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-sans leading-relaxed"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isMatching}
                        className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold h-11 transition-all duration-300 cursor-pointer shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                      >
                        {isMatching ? 'Analyzing keywords...' : 'Match My Profile'}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Match Results Column */}
                <div className="lg:col-span-6 space-y-6">
                  {matchResult ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-6"
                    >
                      {/* Score header */}
                      <div className="flex items-center justify-between border-b border-border/60 pb-4">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">Analysis Results</h3>
                          <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-mono">Local Keyword Matcher</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-violet-400">{matchResult.score}%</div>
                          <span className="text-[8px] text-muted-foreground uppercase block font-mono">MATCH SCORE</span>
                        </div>
                      </div>

                      {/* Recommend Version badge */}
                      <div className="p-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.02] flex items-center justify-between">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-violet-400 font-mono font-bold block">Recommended Person Version</span>
                          <span className="text-xs font-bold text-foreground mt-0.5 block">{matchResult.recommendedVersion}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px] uppercase border-violet-500/20 text-violet-400 font-mono bg-violet-500/5 py-1 px-2.5">
                          High Fit
                        </Badge>
                      </div>

                      {/* Matching parameters columns */}
                      <div className="space-y-4">
                        
                        {/* Strong Matches */}
                        {matchResult.strongMatches.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 font-mono block">Strong Matches (Demonstrated)</span>
                            <div className="flex flex-wrap gap-1.5">
                              {matchResult.strongMatches.map((m) => (
                                <Badge key={m} variant="secondary" className="bg-emerald-500/10 border-emerald-500/10 text-emerald-400 text-[9px] font-mono font-normal">
                                  ✓ {m}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Partial Matches */}
                        {matchResult.partialMatches.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-violet-400 font-mono block">Partial Matches (Mentioned)</span>
                            <div className="flex flex-wrap gap-1.5">
                              {matchResult.partialMatches.map((m) => (
                                <Badge key={m} variant="secondary" className="bg-violet-500/10 border-violet-500/10 text-violet-400 text-[9px] font-mono font-normal">
                                  {m}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Missing Skills */}
                        {matchResult.missingSkills.length > 0 ? (
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 font-mono block">Missing / Not Demonstrated</span>
                            <div className="flex flex-wrap gap-1.5">
                              {matchResult.missingSkills.map((m) => (
                                <Badge key={m} variant="secondary" className="bg-amber-500/10 border-amber-500/10 text-amber-500 text-[9px] font-mono font-normal">
                                  ✗ {m}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                            <CheckCircle className="h-4 w-4" /> All required glossary keywords matching!
                          </div>
                        )}

                        {/* Relevant Projects list */}
                        {matchResult.relevantProjects.length > 0 && (
                          <div className="space-y-2 border-t border-border/40 pt-4">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground font-mono block">Relevant Case Projects</span>
                            <div className="space-y-1.5">
                              {matchResult.relevantProjects.map((p) => (
                                <div key={p} className="flex justify-between items-center text-xs p-2.5 rounded-lg border border-border/60 bg-muted/10">
                                  <span className="font-semibold text-foreground">{p}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-violet-400" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Future AI notification disclaimer */}
                      <div className="p-3 border border-border/60 bg-muted/10 rounded-xl text-[10px] text-muted-foreground leading-normal flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Architecture Notice</strong>: This match is calculated on a localized service interface using token indexing (100% private). LLM connections (OpenAI/Anthropic APIs) can be enabled inside the modular `src/lib/job-matcher.ts` helper asynchronously.
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full min-h-[350px] border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-muted/[0.02]">
                      <HelpCircle className="h-8 w-8 text-zinc-600 mb-2" />
                      <h3 className="text-xs font-bold text-foreground">Waiting for Job Specification</h3>
                      <p className="text-[10px] text-muted-foreground max-w-xs mt-1 leading-normal">
                        Submit a job description on the left panel to trigger match metrics and resume alignment.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
