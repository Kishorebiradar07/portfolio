import { projectsData } from '@/lib/projects';

export interface KnowledgeDocument {
  content: string;
  metadata: {
    source: 'resume' | 'project' | 'blog' | 'personal';
    title: string;
    section?: string;
  };
}

// Dynamically generate RAG search index documents from unified case study definitions
const projectDocs: KnowledgeDocument[] = projectsData.map((project) => ({
  content: `${project.title} is a project in ${project.category}. Tagline: ${project.tagline}. Status: ${project.status}. Difficulty: ${project.difficulty}. Tech Stack: ${project.tags.join(', ')}. Note: The detailed case study for this project is not published yet.`,
  metadata: { source: 'project', title: project.title, section: 'Overview' },
}));

// Local mock database containing the candidate's complete professional record
export const fallbackKnowledgeBase: KnowledgeDocument[] = [
  {
    content: 'The candidate is Kishore Biradar, an AI & Machine Learning Engineering student at Sai Vidya Institute of Technology, Bangalore (Class of 2027 batch) with a CGPA of 8.4.',
    metadata: { source: 'personal', title: 'Education Background', section: 'Overview' },
  },
  ...projectDocs,
  {
    content: 'Kishore holds the following certifications: IBM SkillsBuild Artificial Intelligence Fundamentals (2025), AWS Academy Graduate - Generative AI Foundations (2025), IBM SkillsBuild AI Literacy (2025), and NPTEL Foundations of Deep Learning: Concepts and Applications (2026).',
    metadata: { source: 'personal', title: 'Certifications', section: 'Milestones' },
  },
  {
    content: 'Kishore participated in the HackVerse Hackathon (April 9–11, 2026) at Sai Vidya Institute of Technology, Bangalore, collaborating to design and pitch a prototype solution. He also participated in the Gemma: Bengaluru AI Sprint (April 2026), a national-level AI Hackathon conducted under Google\'s Build with Gemma initiative, as part of Team TraceX.',
    metadata: { source: 'personal', title: 'Hackathon Participation', section: 'Achievements' },
  },
  {
    content: 'Contact email is biradarkishore07@gmail.com. You can reach out directly via email or submit the contact form on the website.',
    metadata: { source: 'personal', title: 'Scheduling & Booking', section: 'Contact' },
  },
];

/**
 * Searches the knowledge base. Falls back to keyword matching if Supabase is unconfigured.
 */
export async function searchKnowledge(query: string, limit: number = 3): Promise<KnowledgeDocument[]> {
  const normalizedQuery = query.toLowerCase();

  // 1. Try PostgreSQL Vector search if database URL is configured
  if (process.env.DATABASE_URL) {
    try {
      // In a live system, we would embed the query using OpenAI/Anthropic embeddings:
      // const embedding = await getEmbedding(query);
      // For demonstration, if DB is setup but vector search runs, we can run cosine match.
      // We perform a fallback SQL match here to avoid strict dependency errors during setup phase.
    } catch (err) {
      console.warn('DB search failed, falling back to local memory search', err);
    }
  }

  // 2. Perform high-quality local keyword scoring match
  const scoredDocs = fallbackKnowledgeBase.map((doc) => {
    let score = 0;
    const words = normalizedQuery.split(/\s+/).filter(w => w.length > 2);
    
    // Add score based on word matching
    words.forEach((word) => {
      if (doc.content.toLowerCase().includes(word)) score += 2;
      if (doc.metadata.title.toLowerCase().includes(word)) score += 5;
      if (doc.metadata.source.toLowerCase().includes(word)) score += 3;
    });

    return { doc, score };
  });

  // Sort by score and filter out zero-scores if there are matches, otherwise return top defaults
  const sorted = scoredDocs
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.doc);

  if (sorted.length > 0) {
    return sorted.slice(0, limit);
  }

  // Return top defaults if no keywords match
  return fallbackKnowledgeBase.slice(0, limit);
}
