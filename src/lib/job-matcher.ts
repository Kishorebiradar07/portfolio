import { resumeData } from './resume-data';
import { projectsData } from './projects';

export interface JobMatcherOutput {
  score: number;
  strongMatches: string[];
  partialMatches: string[];
  missingSkills: string[];
  relevantProjects: string[];
  recommendedVersion: 'AI Engineer' | 'Full-Stack Developer' | 'General ML Specialist';
}

// Comprehensive glossary of technical keywords to inspect
const TECH_GLOSSARY = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Next.js', 'React', 'TypeScript', 
  'Tailwind CSS', 'Docker', 'AWS', 'PostgreSQL', 'SQL', 'LLMs', 'LLM', 'FastAPI', 
  'Git', 'pgvector', 'Drizzle ORM', 'Supabase', 'SageMaker', 'Kubernetes', 
  'CI/CD', 'Rust', 'C++', 'Go', 'Java', 'GCP', 'Azure', 'Linux', 'Scikit-Learn',
  'Random Forest', 'Platt Scaling', 'Temperature Scaling', 'Model Calibration'
];

/**
 * Rules-based Job Description scanning service.
 * Structured asynchronously to facilitate swapping with LLM API requests later.
 */
export async function matchJobDescription(jobDescription: string): Promise<JobMatcherOutput> {
  const normalizedJD = jobDescription.toLowerCase();
  
  // Extract Kishore's demonstrated skills
  const kishoreSkills = resumeData.skills.flatMap(s => s.keywords);
  
  const strongMatches: string[] = [];
  const partialMatches: string[] = [];
  const missingSkills: string[] = [];

  // Scrape JD against technical glossary
  TECH_GLOSSARY.forEach((tech) => {
    const techLower = tech.toLowerCase();
    
    // Check if the technology is mentioned in the job description
    const isMentionedInJD = normalizedJD.includes(techLower) || 
      (techLower === 'llms' && normalizedJD.includes('llm')) ||
      (techLower === 'llm' && normalizedJD.includes('llms'));

    if (isMentionedInJD) {
      // Check if Kishore has demonstrated this skill
      const hasSkill = kishoreSkills.some(s => s.toLowerCase() === techLower ||
        (techLower === 'llm' && s.toLowerCase() === 'llms') ||
        (techLower === 'llms' && s.toLowerCase() === 'llm')
      );

      if (hasSkill) {
        // Classify as Strong if it is in his AI/ML/CV/Frontend core categories
        const isCore = ['pytorch', 'python', 'opencv', 'tensorflow', 'model calibration (ece)', 'scikit-learn'].includes(techLower);
        if (isCore) {
          strongMatches.push(tech);
        } else {
          partialMatches.push(tech);
        }
      } else {
        missingSkills.push(tech);
      }
    }
  });

  // Calculate Match Score
  const totalSkillsNeeded = strongMatches.length + partialMatches.length + missingSkills.length;
  let score = 0;
  if (totalSkillsNeeded > 0) {
    const weightedMatched = strongMatches.length * 1.0 + partialMatches.length * 0.6;
    score = Math.round((weightedMatched / totalSkillsNeeded) * 100);
  }

  // Suggest relevant projects based on keyword overlaps
  const relevantProjects: string[] = [];
  projectsData.forEach((project) => {
    const projectTags = project.tags.map(t => t.toLowerCase());
    const overlaps = projectTags.some(tag => normalizedJD.includes(tag));
    if (overlaps) {
      relevantProjects.push(project.title);
    }
  });

  // Recommend CV version focus
  let recommendedVersion: 'AI Engineer' | 'Full-Stack Developer' | 'General ML Specialist' = 'General ML Specialist';
  const hasAiKeywords = normalizedJD.includes('pytorch') || normalizedJD.includes('calibration') || normalizedJD.includes('vision') || normalizedJD.includes('resnet');
  const hasWebKeywords = normalizedJD.includes('next.js') || normalizedJD.includes('react') || normalizedJD.includes('frontend') || normalizedJD.includes('typescript');

  if (hasAiKeywords && !hasWebKeywords) {
    recommendedVersion = 'AI Engineer';
  } else if (hasWebKeywords && !hasAiKeywords) {
    recommendedVersion = 'Full-Stack Developer';
  } else if (hasAiKeywords && hasWebKeywords) {
    recommendedVersion = 'AI Engineer'; // default priority
  }

  return {
    score,
    strongMatches,
    partialMatches,
    missingSkills,
    relevantProjects,
    recommendedVersion
  };
}
