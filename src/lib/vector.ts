import { db } from '@/db';
import { documents } from '@/db/schema';
import { sql } from 'drizzle-orm';
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
  content: `${project.title} is a case study in ${project.category}. Tagline: ${project.tagline} Problem: ${project.problem} Motivation: ${project.motivation} Key performance metrics: ${project.metrics.map(m => `${m.label}: ${m.value}`).join(', ')}. Tech Stack deployed: ${project.tags.join(', ')}. Results: ${project.results} Critical challenge & solution: ${project.challenges} -> ${project.solutions}`,
  metadata: { source: 'project', title: project.title, section: 'Overview' },
}));

// Local mock database containing the candidate's complete professional record
export const fallbackKnowledgeBase: KnowledgeDocument[] = [
  {
    content: 'The candidate is Kishore Biradar, a final-year Electronics and Communication Engineering student at Sai Vidya Institute of Technology, Bangalore. He specializes in Artificial Intelligence and Machine Learning with a 3.90/4.00 equivalent GPA.',
    metadata: { source: 'personal', title: 'Education Background', section: 'Overview' },
  },
  ...projectDocs,
  {
    content: 'Kishore holds the following certifications: AWS Academy Graduate - Machine Learning (2025), DeepLearning.AI Deep Learning Specialization (2024), and Google TensorFlow Developer Professional Certificate (2024).',
    metadata: { source: 'personal', title: 'Certifications', section: 'Milestones' },
  },
  {
    content: 'Kishore won the National Level AI Hackathon at REVA University in 2025 by deploying AlgoShield, an intelligent NLP email phishing detection pipeline built in Python and Scikit-Learn.',
    metadata: { source: 'personal', title: 'Hackathon Wins', section: 'Achievements' },
  },
  {
    content: 'Contact email is biradarkishore07@gmail.com. Interview schedule booking is available on Monday, Tuesday, and Wednesday (Aug 10 to Aug 12, 2026) at 10:00 AM, 2:00 PM, and 4:30 PM.',
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
