export interface ResumeDetails {
  personal: {
    name: string;
    role: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    phone: string;
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
    role: 'AI & Machine Learning Engineer',
    email: 'biradarkishore07@gmail.com',
    github: 'https://github.com/Kishorebiradar07',
    linkedin: 'https://www.linkedin.com/in/kishore-biradar-366126252',
    location: 'Bangalore, India',
    phone: '+91 9353311721',
    summary: 'A 2027 AI & Machine Learning engineering student who enjoys building practical intelligent systems and exploring AI/ML, while developing strong programming and problem-solving skills.',
  },
  education: [
    {
      degree: 'B.E. in Artificial Intelligence and Machine Learning',
      spec: 'Undergraduate Program',
      institution: 'Sai Vidya Institute of Technology, Bangalore',
      dates: '2023 - 2027',
      gpa: '8.4 CGPA',
    },
    {
      degree: 'State Board – Class XII',
      spec: 'Pre-University Education',
      institution: 'SC Gurukula PU College, Karadyal, Bhalki',
      dates: '2021 - 2023',
      gpa: '75.16%',
    },
    {
      degree: 'State Board – Class X',
      spec: 'Secondary School Certification',
      institution: 'St. Mark The High School, Hyderabad',
      dates: '2021',
      gpa: '9.5 CGPA',
    },
  ],
  experience: [], // No formal professional experience listed in resume; projects and hackathons handled separately
  projects: [
    {
      title: 'Facial and Vocal Emotion Detection',
      role: 'Developer',
      summary: 'Multimodal emotion detection system leveraging facial feature mappings and vocal sequence learning models.',
      highlights: [
        'Integrated FaceNet for facial emotion recognition',
        'Implemented RNN and LSTM networks for vocal emotion detection',
        'Engineered feature-level fusion using Fully Connected Networks (FCN)',
        'Collected live datasets for training and testing',
      ],
    },
    {
      title: 'IntelliDepth Adaptive Inference',
      role: 'ML Developer (In Progress)',
      summary: 'Dynamic early-exit classifier on ResNet-56 backbones calibrated using L-BFGS temperature scaling.',
      highlights: [
        'Adaptive exit stopping policy based on confidence scores',
        'Joint multi-exit network backpropagation gradient schedules',
        'Calibrated exits using L-BFGS scaling to reduce Expected Calibration Error',
      ],
    },
    {
      title: 'AI Business Advisor',
      role: 'Prototype Developer',
      summary: 'Intelligent business consultation dashboard parsing local financial sheets and documents.',
      highlights: [
        'OpenAI API integration for consultation responses',
        'Prompt template modeling to yield structured JSON response schemas',
        'Implemented state storage handles using Zustand',
      ],
    },
  ],
  certifications: [
    {
      title: 'IBM SkillsBuild - Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      date: 'August 20, 2025',
    },
    {
      title: 'AWS Academy Graduate - Generative AI Foundations - Training Badge',
      issuer: 'AWS Academy',
      date: 'November 30, 2025',
    },
    {
      title: 'IBM SkillsBuild - AI Literacy',
      issuer: 'IBM SkillsBuild',
      date: 'December 14, 2025',
    },
    {
      title: 'Foundations of Deep Learning: Concepts and Applications (Score: 54%)',
      issuer: 'IISc Bangalore / NPTEL',
      date: 'Jan–Apr 2026',
    },
  ],
  achievements: [
    {
      title: 'Participant - HackVerse Hackathon',
      desc: 'Participated in the HackVerse Hackathon at Sai Vidya Institute of Technology, Bangalore.',
      date: 'April 9–11, 2026',
    },
    {
      title: 'Participant - Gemma: Bengaluru AI Sprint',
      desc: 'Participated in Google Build with Gemma initiative national-level AI hackathon under team TraceX.',
      date: 'April 2026',
    },
  ],
  skills: [
    {
      category: 'AI & Machine Learning',
      keywords: ['FaceNet', 'RNN', 'LSTM', 'Fully Connected Networks (FCN)', 'PyTorch', 'TensorFlow', 'Model Calibration'],
    },
    {
      category: 'Programming & Concepts',
      keywords: ['C', 'Python', 'JavaScript', 'HTML', 'CSS', 'Data Structures & Algorithms using C'],
    },
    {
      category: 'Frontend & Backend',
      keywords: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React', 'Node.js', 'FastAPI'],
    },
    {
      category: 'Databases & Tools',
      keywords: ['PostgreSQL', 'Supabase', 'Drizzle ORM', 'Git', 'GitHub', 'Docker'],
    },
  ],
};
