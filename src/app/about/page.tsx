import { SkillsMatrix } from '@/components/skills-matrix';
import { Award, GraduationCap, Trophy, Sparkles } from 'lucide-react';

const credentials = {
  certificates: [
    { title: 'AWS Academy Graduate - Machine Learning', issuer: 'Amazon Web Services', date: '2025' },
    { title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2024' },
    { title: 'Google TensorFlow Developer Professional Certificate', issuer: 'Google (Coursera)', date: '2024' },
  ],
  achievements: [
    { title: 'Winner - National Level AI Hackathon', desc: 'AlgoShield email phishing classifier using NLP & meta flags at REVA University.', date: '2025' },
    { title: 'Academic Excellence Scholar', desc: 'Maintained 3.90 GPA/CGPA equivalent in Electronics and Communication Engineering.', date: '2022 - 2026' },
    { title: 'IntelliDepth ResNet Architect', desc: 'Successfully designed confidence-calibrated adaptive inference early exit layers.', date: '2026' },
  ],
  education: {
    degree: 'Bachelor of Engineering in ECE',
    spec: 'Specialization in Artificial Intelligence & Machine Learning',
    institution: 'Sai Vidya Institute of Technology, Bangalore',
    dates: '2022 - 2026',
    gpa: '3.90 / 4.00 equivalent',
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
            Bridging Electronics, Machine Learning & Embedded Intelligence
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I am Kishore Biradar, a final-year Electronics and Communication Engineering student at Sai Vidya Institute of Technology, specializing in Applied AI and Machine Learning. My engineering philosophy centers on optimization—specifically, making deep learning models faster, more confidence-calibrated, and computationally cheaper to serve on resource-constrained edge hardware.
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
