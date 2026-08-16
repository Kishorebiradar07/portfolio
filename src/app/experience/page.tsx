import { GraduationCap, Trophy, Award, Calendar } from 'lucide-react';

const educationTimeline = [
  {
    date: '2023 - 2027',
    title: 'B.E. in Artificial Intelligence & Machine Learning',
    subtitle: 'Sai Vidya Institute of Technology, Bangalore',
    desc: 'Undergraduate study focusing on foundational computer science, machine learning models, and deep architectures. Current CGPA: 8.4.',
  },
  {
    date: '2021 - 2023',
    title: 'SC Gurukula PU College, Karadyal, Bhalki',
    subtitle: 'Class XII (Karnataka State Board)',
    desc: 'Completed pre-university education with a percentage of 75.16%.',
  },
  {
    date: '2021',
    title: 'St. Mark The High School, Hyderabad',
    subtitle: 'Class X (State Board)',
    desc: 'Completed secondary education with a CGPA of 9.5.',
  },
];

const hackathonsTimeline = [
  {
    date: 'April 9–11, 2026',
    title: 'HackVerse Hackathon',
    subtitle: 'Sai Vidya Institute of Technology',
    desc: 'Participated in the hackathon, collaborating to design, build, and pitch a prototype software solution.',
  },
  {
    date: 'April 2026',
    title: 'Gemma: Bengaluru AI Sprint',
    subtitle: 'Google Build with Gemma Initiative',
    desc: 'National-level AI Hackathon. Participated under Team TraceX, leveraging Gemma open models.',
  },
];

const certificationsTimeline = [
  {
    date: 'Jan–Apr 2026',
    title: 'Foundations of Deep Learning: Concepts and Applications',
    subtitle: 'IISc Bangalore / NPTEL',
    desc: '12-week comprehensive coursework covering deep learning architectures. Score: 54%. Status: Certified.',
  },
  {
    date: 'December 14, 2025',
    title: 'AI Literacy',
    subtitle: 'IBM SkillsBuild',
    desc: 'Verified understanding of basic AI workflows and prompt patterns.',
  },
  {
    date: 'November 30, 2025',
    title: 'Generative AI Foundations - Training Badge',
    subtitle: 'AWS Academy',
    desc: '12-hour training course covering foundation models and prompt engineering.',
  },
  {
    date: 'August 20, 2025',
    title: 'Artificial Intelligence Fundamentals',
    subtitle: 'IBM SkillsBuild',
    desc: 'Verified understanding of artificial intelligence structures and algorithms.',
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
      
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Chronology & Activities
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Academic Journey & Activities
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An overview of your academic background, hackathon participation, and verified learning credentials.
        </p>
      </section>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-8 border-t border-white/[0.04]">
        
        {/* Column 1: Education */}
        <div className="space-y-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <GraduationCap className="h-4.5 w-4.5 text-violet-400" />
            <span>Education Timeline</span>
          </h2>
          <div className="space-y-6">
            {educationTimeline.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-violet-500/20 hover:bg-white/[0.02] transition-all space-y-3"
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/10">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-violet-400/80 mt-0.5">{item.subtitle}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Hackathons */}
        <div className="space-y-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Trophy className="h-4.5 w-4.5 text-violet-400" />
            <span>Hackathons & Activities</span>
          </h2>
          <div className="space-y-6">
            {hackathonsTimeline.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-violet-500/20 hover:bg-white/[0.02] transition-all space-y-3"
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/10">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-violet-400/80 mt-0.5">{item.subtitle}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Certifications */}
        <div className="space-y-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-white/[0.04] pb-3">
            <Award className="h-4.5 w-4.5 text-violet-400" />
            <span>Certifications & Badges</span>
          </h2>
          <div className="space-y-6">
            {certificationsTimeline.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-violet-500/20 hover:bg-white/[0.02] transition-all space-y-3"
              >
                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/10">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                  <p className="text-xs text-violet-400/80 mt-0.5">{item.subtitle}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
