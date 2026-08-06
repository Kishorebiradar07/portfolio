import { Briefcase, GraduationCap, Trophy, Code2, Calendar } from 'lucide-react';

const workExperience = [
  {
    role: 'Machine Learning Engineering Intern',
    company: 'NeuralFlow AI (ML Serving Startup)',
    location: 'Remote',
    duration: 'Jun 2025 - Aug 2025',
    bullets: [
      'Configured PyTorch serving models inside Docker images, reducing Triton host container footprint by 18%.',
      'Developed custom data loaders and validation scripts for automated hyperparameter optimization loops.',
      'Created low-latency FastAPI inference routes supporting concurrent image classifications.',
    ],
  },
  {
    role: 'Undergraduate Research Assistant',
    company: 'CS Deep Learning Laboratory',
    location: 'On-Campus',
    duration: 'Sep 2024 - Present',
    bullets: [
      'Contributed benchmark evaluations for joint multi-exit ResNet classifiers, testing reliability under shifted datasets.',
      'Assisted in implementing Platt scaling and temperature scaling calibration algorithms.',
      'Documented metric analysis reports, co-authoring a workshop paper on model calibration reliability.',
    ],
  },
];

const timelineMilestones = [
  {
    date: 'Dec 2025',
    title: 'HackAI Hackathon Winner',
    desc: 'Led a team of 3 to secure 1st place in AI track by building a calibrated Serves routing system.',
    icon: Trophy,
  },
  {
    date: 'Jun 2025',
    title: 'Joined NeuralFlow AI',
    desc: 'Started as a ML engineering intern focusing on Docker pipelines and API endpoints.',
    icon: Briefcase,
  },
  {
    date: 'Sep 2024',
    title: 'Research Appointment',
    desc: 'Began working under CS department faculty on neural network calibration and exit architectures.',
    icon: Code2,
  },
  {
    date: 'Sep 2022',
    title: 'CS Enrollment',
    desc: 'Began Computer Science degree program with specialization focus on Machine Learning.',
    icon: GraduationCap,
  },
];

export default function ExperiencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Professional Experience
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Career Journey & Milestones
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A record of professional internships, academic research appointments, and key engineering milestones.
        </p>
      </section>

      {/* Grid of Work Experience & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-border">
        {/* Work experience list */}
        <div className="lg:col-span-7 space-y-8">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-violet-400" />
            <span>Employment Record</span>
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-border bg-card space-y-4 hover:border-violet-500/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{exp.role}</h3>
                    <p className="text-xs text-violet-400 mt-0.5">{exp.company} — {exp.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 bg-muted px-2.5 py-1 rounded-md w-fit">
                    <Calendar className="h-3 w-3" />
                    {exp.duration}
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline milestones */}
        <div className="lg:col-span-5 space-y-8">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-violet-400" />
            <span>Interactive Timeline</span>
          </h2>
          <div className="relative pl-6 border-l border-border space-y-8 ml-2">
            {timelineMilestones.map((mile, idx) => {
              const Icon = mile.icon;
              return (
                <div key={idx} className="relative space-y-1.5">
                  {/* Circle icon marker */}
                  <div className="absolute -left-[35px] top-0 p-1.5 rounded-full border border-border bg-card text-violet-400">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-violet-400 bg-violet-500/5 px-2 py-0.5 rounded border border-violet-500/10">
                    {mile.date}
                  </span>
                  <h4 className="text-xs font-bold text-foreground pt-1">{mile.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mile.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
