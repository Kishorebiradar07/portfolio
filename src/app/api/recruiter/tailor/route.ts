import { NextResponse } from 'next/server';
import { db } from '@/db';
import { recruiters } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, company, skills, goal } = body;

    if (!role || !company) {
      return NextResponse.json({ error: 'Role and Company are required' }, { status: 400 });
    }

    const skillsArray = typeof skills === 'string' 
      ? skills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (skills || []);

    const queryLower = `${role} ${skillsArray.join(' ')} ${goal || ''}`.toLowerCase();
    
    let recommendation;

    const isOpenAIConfigured = 
      process.env.OPENAI_API_KEY && 
      !process.env.OPENAI_API_KEY.includes('placeholder') &&
      process.env.OPENAI_API_KEY.startsWith('sk-');

    if (isOpenAIConfigured) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are an expert AI talent recruiter optimizer. Given a recruiter's hiring request, analyze the candidate's three major projects:
1. "IntelliDepth System" (slug: "intellidepth") - Joint multi-exit ResNet classifier, temperature scaling, Expected Calibration Error (ECE) reduction. Perfect for deep learning, PyTorch, vision, and core algorithm research.
2. "AutoRAG" (slug: "auto-rag") - Semantic search database indexing, pgvector, HNSW indexing in Supabase PostgreSQL. Great for LLM engineering, retrieval, database optimization, and NLP.
3. "FlowNet" (slug: "flow-net") - MLOps orchestrator, Kubernetes scheduling, Prometheus telemetry. Ideal for platform, infrastructure, MLOps, and docker environments.

Generate a JSON object recommending which assets to highlight:
{
  "role": string (job role),
  "company": string (company name),
  "skills": string[] (skills parsed),
  "goal": string (goal parsed),
  "highlightedProjects": string[] (sort matching slugs: "intellidepth", "auto-rag", "flow-net"),
  "prioritizedSkills": string[] (recommend top 4 target skills from the candidate's stack),
  "hiddenSections": string[] (recommend layout parts to hide if brevity is needed, e.g., ["blog"] if they want highly targeted resumes),
  "resumeVersion": "mlops" | "research" | "nlp" | "general" (pick best fit)
}`,
              },
              {
                role: 'user',
                content: `Analyze this profile:
- Role: ${role}
- Company: ${company}
- Key Skills: ${skillsArray.join(', ')}
- Goal: ${goal || 'Not specified'}`,
              },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        });

        const data = await res.json();
        if (res.ok && data.choices?.[0]?.message?.content) {
          recommendation = JSON.parse(data.choices[0].message.content);
        }
      } catch (err) {
        console.error('OpenAI tailoring API failed, resorting to static matching matcher', err);
      }
    }

    // Dynamic fallback matcher if OpenAI is bypassed or offline
    if (!recommendation) {
      let highlightedProjects: string[] = [];
      let prioritizedSkills: string[] = [];
      let resumeVersion: 'mlops' | 'research' | 'nlp' | 'general' = 'general';
      let hiddenSections: string[] = [];

      // MLOps / Platform / Cloud profile matching
      if (
        queryLower.includes('infra') ||
        queryLower.includes('ops') ||
        queryLower.includes('platform') ||
        queryLower.includes('k8s') ||
        queryLower.includes('kubernetes') ||
        queryLower.includes('docker') ||
        queryLower.includes('cloud') ||
        queryLower.includes('pipeline') ||
        queryLower.includes('deploy')
      ) {
        highlightedProjects = ['flow-net', 'auto-rag', 'intellidepth'];
        prioritizedSkills = ['Kubernetes', 'Docker', 'Prometheus', 'Go', 'Python'];
        resumeVersion = 'mlops';
        hiddenSections = ['blog']; // Hide blog to keep infra focus tight
      }
      // NLP / LLM / Search matching
      else if (
        queryLower.includes('llm') ||
        queryLower.includes('rag') ||
        queryLower.includes('search') ||
        queryLower.includes('nlp') ||
        queryLower.includes('chat') ||
        queryLower.includes('gpt') ||
        queryLower.includes('vector') ||
        queryLower.includes('retrieve')
      ) {
        highlightedProjects = ['auto-rag', 'intellidepth', 'flow-net'];
        prioritizedSkills = ['pgvector', 'HNSW', 'LangChain', 'Python', 'Supabase'];
        resumeVersion = 'nlp';
        hiddenSections = ['experience']; // Hide experience if they want a direct project showcase
      }
      // Deep Learning / CV / Research matching
      else if (
        queryLower.includes('research') ||
        queryLower.includes('cv') ||
        queryLower.includes('vision') ||
        queryLower.includes('calibration') ||
        queryLower.includes('pytorch') ||
        queryLower.includes('deep learning') ||
        queryLower.includes('model') ||
        queryLower.includes('train')
      ) {
        highlightedProjects = ['intellidepth', 'flow-net', 'auto-rag'];
        prioritizedSkills = ['PyTorch', 'ResNet', 'Calibration (ECE)', 'Python', 'C++'];
        resumeVersion = 'research';
      }
      // Generalist fallback
      else {
        highlightedProjects = ['intellidepth', 'auto-rag', 'flow-net'];
        prioritizedSkills = ['PyTorch', 'Kubernetes', 'pgvector', 'Python'];
        resumeVersion = 'general';
      }

      recommendation = {
        role,
        company,
        skills: skillsArray,
        goal: goal || '',
        highlightedProjects,
        prioritizedSkills,
        hiddenSections,
        resumeVersion,
      };
    }

    // Optional: Log recruiter customization session in DB
    try {
      if (process.env.DATABASE_URL) {
        await db.insert(recruiters).values({
          company,
          email: null,
          roleInterest: recommendation.resumeVersion,
        });
      }
    } catch (dbErr) {
      console.warn('Could not log custom customization session in database', dbErr);
    }

    return NextResponse.json(recommendation);
  } catch (err) {
    console.error('Tailoring route failed', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
