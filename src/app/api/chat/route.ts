import { NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/vector';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No message history provided.' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    // 1. Fetch relevant RAG context
    const contextDocs = await searchKnowledge(lastUserMessage, 2);
    const contextText = contextDocs
      .map((doc) => `[Source: ${doc.metadata.title}] - ${doc.content}`)
      .join('\n');

    // 2. Check if OpenAI API Key is configured for live LLM routing
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                content: `You are the AI Recruiter Assistant representing the candidate. Your goal is to answer recruiters questions about the candidate's skills, qualifications, and projects. Use the following candidate database context to ground your answer. Be professional, concise, and focused on helping the recruiter assess the candidate's software engineering capabilities. If the context doesn't contain the answer, politely say you don't know or suggest contacting the developer.
                
                CONTEXT:
                ${contextText}`,
              },
              ...messages,
            ],
            stream: true,
          }),
        });

        if (response.ok) {
          // Stream raw completion tokens directly back to the client
          return new Response(response.body, {
            headers: {
              'Content-Type': 'text/event-stream; charset=utf-8',
              'Cache-Control': 'no-cache',
              Connection: 'keep-alive',
            },
          });
        }
      } catch (err) {
        console.warn('OpenAI query failed, falling back to local model', err);
      }
    }

    // 3. Smart local streaming fallback
    const queryLower = lastUserMessage.toLowerCase();
    let responseText = '';

    if (queryLower.includes('latency') || queryLower.includes('exit') || queryLower.includes('resnet') || queryLower.includes('intellidepth')) {
      responseText = `Based on the candidate's case studies, the **IntelliDepth Deep Learning System** implements a joint multi-exit ResNet classifier. 
      
Intermediate classifiers are branched directly from intermediate convolutional blocks. Simple images exit early at early layers, bypassing downstream operations to reduce latency by **42%**. 

To prevent miscalibrated predictions, the model serving pipeline applies post-hoc **temperature scaling**, optimizing logits outputs to reach an Expected Calibration Error (ECE) of **0.024** (retaining 98.6% baseline accuracy).`;
    } else if (queryLower.includes('vector') || queryLower.includes('rag') || queryLower.includes('supabase') || queryLower.includes('database') || queryLower.includes('search')) {
      responseText = `The candidate engineered **AutoRAG**, a semantic search vector database engine using **pgvector** and HNSW indexes in Supabase PostgreSQL. 

The pipeline uses parent-child overlap strategies to process large documents, avoiding semantic boundary truncation. At retrieval time, the system uses cosine similarity, passing the top-k matches to a **BGE Reranker** cross-encoder model to boost relevancy. 

Benchmark results show a **94.2% retrieval recall** with an average search latency of **38ms**.`;
    } else if (queryLower.includes('kubernetes') || queryLower.includes('k8s') || queryLower.includes('docker') || queryLower.includes('ops') || queryLower.includes('flownet')) {
      responseText = `The candidate built **FlowNet**, a Kubernetes-native ML training pipeline orchestrator. 

It handles automated container compilation, cluster resources mapping, and sidecar volume logging. Telemery telemetry is scraped by Prometheus and projected on a custom developer dashboard. 

The system achieves **99.9% failure recovery** via auto-rescheduling training loops and increases training pipeline job throughput by **68%**.`;
    } else if (queryLower.includes('gpa') || queryLower.includes('education') || queryLower.includes('academic') || queryLower.includes('gpa')) {
      responseText = `The candidate is in his final year of a Bachelor of Science in Computer Science, specializing in Artificial Intelligence & Machine Learning. He holds a Cumulative GPA of **3.90 / 4.00**, has been named to the Dean's List for 4 semesters, and is a co-author of a deep learning calibration workshop paper.`;
    } else {
      responseText = `Hello! I am the candidate's AI Recruiter Assistant. I have vector access to his resume, projects, and credentials. 

Based on my knowledge base, here are his main capabilities:
• **Machine Learning Serving**: Multi-exit ResNet classifiers with temperature scaling calibration (**IntelliDepth**).
• **Vector Databases**: Supabase, pgvector, HNSW indexing, parent-child chunk RAG pipelines (**AutoRAG**).
• **ML Infrastructure**: Kubernetes orchestrations, Prometheus scrapes, sidecar container logs (**FlowNet**).
• **Full Stack Dev**: Next.js App Router, TypeScript, Drizzle ORM.

You can ask me specific questions like:
* "How does IntelliDepth reduce latency?"
* "What is the retrieval speed of AutoRAG?"
* "What are his certifications?"`;
    }

    // Stream responseText back word-by-word
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + ' ';
          // Format as OpenAI stream chunk to keep UI integration standard
          const sseEvent = `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`;
          controller.enqueue(encoder.encode(sseEvent));
          // Small delay to simulate network latency and model generation
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json({ error: 'Internal server error during chat' }, { status: 500 });
  }
}
