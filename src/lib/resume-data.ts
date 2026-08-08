export interface ResumeDetails {
  personal: {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    phone: string; // Left as TODO indicator as requested to prevent fabrication
    summary: string;
  };
  education: {
    degree: string;
    spec: string;
    institution: string;
    dates: string;
    gpa: string;
  }[];
  experience: {
    role: string;
    company: string;
    location: string;
    duration: string;
    bullets: string[];
  }[];
  projects: {
    title: string;
    role: string;
    summary: string;
    highlights: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
  }[];
  achievements: {
    title: string;
    desc: string;
    date: string;
  }[];
  skills: {
    category: string;
    keywords: string[];
  }[];
}

export const resumeData: ResumeDetails = {
  personal: {
    name: 'Kishore Biradar',
    role: 'Applied AI & ECE Engineer',
    email: 'biradarkishore07@gmail.com',
    github: 'https://github.com/biradarkishore07',
    linkedin: 'https://linkedin.com',
    location: 'Bangalore, India',
    phone: 'TODO: Provide Phone Number',
    summary: 'Final-year Electronics & Communication Engineering student at Sai Vidya Institute of Technology specializing in deep learning optimization, model calibration (ECE Expected Calibration Error scaling), and low-latency edge AI system engineering.',
  },
  education: [
    {
      degree: 'Bachelor of Engineering in ECE',
      spec: 'Specialization in Artificial Intelligence & Machine Learning',
      institution: 'Sai Vidya Institute of Technology, Bangalore',
      dates: '2022 - 2026',
      gpa: '3.90 / 4.00 equivalent',
    },
  ],
  experience: [
    {
      role: 'Machine Learning Engineering Intern',
      company: 'NeuralFlow AI',
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
  ],
  projects: [
    {
      title: 'IntelliDepth Adaptive Inference',
      role: 'ResNet Calibration Architect',
      summary: 'Dynamic early-exit classification system on ResNet-56 backbones calibrated using L-BFGS temperature scaling.',
      highlights: [
        'Decreased Expected Calibration Error (ECE) to 0.024.',
        'Saved an average of 58.45% FLOP compute costs.',
        'Achieved 10.03% adaptive validation accuracy on CIFAR-100 datasets.',
      ],
    },
    {
      title: 'Emotion Detection System',
      role: 'Computer Vision Engineer',
      summary: 'Facial recognition expression classifier optimizing PyTorch CNN models for high frame rate execution.',
      highlights: [
        'Optimized custom model weights down to a 12MB footprint.',
        'Attained facial categorization accuracy of 93.4%.',
        'Reduced frame classification inference latency below 18ms.',
      ],
    },
    {
      title: 'AI Business Advisor',
      role: 'Full-Stack Developer',
      summary: 'Automated consultation pipeline querying OpenAI API endpoints and indexing document inputs.',
      highlights: [
        'Prompt mapping templates yielded a 95.2% calculation accuracy.',
        'Structured context channels answering queries in 1.2 seconds.',
      ],
    },
  ],
  certifications: [
    {
      title: 'AWS Academy Graduate - Machine Learning',
      issuer: 'Amazon Web Services',
      date: '2025',
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      date: '2024',
    },
    {
      title: 'Google TensorFlow Developer Professional Certificate',
      issuer: 'Google (Coursera)',
      date: '2024',
    },
  ],
  achievements: [
    {
      title: 'Winner - National Level AI Hackathon',
      desc: 'AlgoShield email phishing classifier using NLP, TF-IDF vectorization, and sender DKIM validators at REVA University.',
      date: '2025',
    },
    {
      title: 'Academic Excellence Scholar',
      desc: 'Maintained a 3.90/4.00 CGPA equivalent in Electronics and Communication Engineering.',
      date: '2022 - 2026',
    },
  ],
  skills: [
    {
      category: 'AI Engineering & ML',
      keywords: ['PyTorch', 'TensorFlow', 'Model Calibration (ECE)', 'L-BFGS Optimization', 'Platt Scaling', 'Temperature Scaling', 'Random Forest', 'Scikit-Learn'],
    },
    {
      category: 'Computer Vision & NLP',
      keywords: ['OpenCV', 'Image Preprocessing', 'Feature Extraction', 'TF-IDF Vectorizers', 'Text Classification', 'NLTK', 'Tokenization'],
    },
    {
      category: 'Frontend & Backend',
      keywords: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'FastAPI', 'REST APIs', 'Zod Schema'],
    },
    {
      category: 'DevOps & Databases',
      keywords: ['Docker Containers', 'Git & GitHub', 'CLI Scripting', 'Linux OS', 'PostgreSQL', 'Supabase', 'pgvector Store', 'Drizzle ORM', 'AWS SageMaker'],
    },
  ],
};
