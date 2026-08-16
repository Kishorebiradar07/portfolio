import { SkillsMatrix } from '@/components/skills-matrix';
import { Award, GraduationCap, Trophy } from 'lucide-react';

const credentials = {
  certificates: [
    { title: 'IBM SkillsBuild - Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild', date: 'Aug 2025' },
    { title: 'AWS Academy Graduate - Generative AI Foundations', issuer: 'AWS Academy', date: 'Nov 2025' },
    { title: 'IBM SkillsBuild - AI Literacy', issuer: 'IBM SkillsBuild', date: 'Dec 2025' },
    { title: 'NPTEL - Foundations of Deep Learning (Score: 54%)', issuer: 'IISc Bangalore / NPTEL', date: 'Jan-Apr 2026' },
  ],
  achievements: [
    { title: 'Participant - HackVerse Hackathon', desc: 'Participated in the HackVerse Hackathon at Sai Vidya Institute of Technology, demonstrating team-based software innovation.', date: 'Apr 2026' },
    { title: 'Participant - Gemma: Bengaluru AI Sprint', desc: 'Participated under team name TraceX in the Google Build with Gemma national AI hackathon.', date: 'Apr 2026' },
  ],
  education: {
    degree: 'B.E. in Artificial Intelligence and Machine Learning',
    spec: '2027 Batch',
    institution: 'Sai Vidya Institute of Technology, Bangalore',
    dates: '2023 - 2027',
    gpa: '8.4 CGPA',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 w-full">
      {/* Intro section */}
      <section className="max-w-3xl space-y-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            About the Candidate
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
            Building Practical Intelligent Systems & Software Applications
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I am Kishore Biradar, a 2027 AI & Machine Learning engineering student at Sai Vidya Institute of Technology who enjoys building practical intelligent systems and exploring AI/ML, while developing strong programming and problem-solving skills.
        </p>
      </section>

      {/* Skills Radar Matrix Section */}
      <section className="pt-8 border-t border-border">
        <SkillsMatrix />
      </section>

      {/* Credentials Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
        
        {/* Education Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-violet-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Education
            </h3>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">{credentials.education.degree}</h4>
              <p className="text-xs text-violet-400 mt-0.5">{credentials.education.spec}</p>
              <p className="text-xs text-muted-foreground mt-1">{credentials.education.institution}</p>
            </div>
            <div className="flex justify-between items-center text-xs pt-4 border-t border-border/50">
              <span className="text-muted-foreground">{credentials.education.dates}</span>
              <span className="font-mono font-bold text-foreground">GPA: {credentials.education.gpa}</span>
            </div>
          </div>
        </div>

        {/* Certificates Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-violet-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Certifications
            </h3>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card divide-y divide-border/50">
            {credentials.certificates.map((cert, idx) => (
              <div key={idx} className={`py-3 first:pt-0 last:pb-0`}>
                <h4 className="text-xs font-bold text-foreground">{cert.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1">
                  <span>{cert.issuer}</span>
                  <span className="font-mono">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-violet-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Milestones
            </h3>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card divide-y divide-border/50">
            {credentials.achievements.map((ach, idx) => (
              <div key={idx} className={`py-3 first:pt-0 last:pb-0 space-y-1`}>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-foreground leading-normal">{ach.title}</h4>
                  <span className="text-[10px] text-muted-foreground font-mono mt-0.5">{ach.date}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
