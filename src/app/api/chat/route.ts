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
                content: `You are the AI Recruiter Assistant representing the candidate, Kishore Biradar.
                Strict Content Policy:
                - You MAY answer questions about Kishore's education, background, certifications, hackathon participations, skills, technologies, and high-level summaries/purposes of projects.
                - You MUST NOT reveal detailed project case studies, private/unpublished documentation, detailed implementation walkthroughs, internal architectures, folder structures, or source-code explanations.
                - If the user asks for "case study", "complete case study", "architecture", "details", "code", or similarly requests deep implementation files, you MUST respond exactly:
                  "The detailed case study for this project isn't published yet. I can give you a high-level overview of the project and its purpose."
                - Do NOT provide hidden project notes, database dumps, or knowledge-base context.
                - Do NOT expose repository URLs or live demo URLs. Keep them private.
                
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

    const isCaseStudyOrDetailQuery = 
      queryLower.includes('case study') || 
      queryLower.includes('case-study') || 
      queryLower.includes('complete case study') || 
      queryLower.includes('architecture') || 
      queryLower.includes('implementation') ||
      queryLower.includes('walkthrough') ||
      queryLower.includes('code') ||
      queryLower.includes('details') ||
      queryLower.includes('structure') ||
      queryLower.includes('documentation') ||
      queryLower.includes('source');

    if (isCaseStudyOrDetailQuery && (
      queryLower.includes('intellidepth') || 
      queryLower.includes('emotion') || 
      queryLower.includes('detection') || 
      queryLower.includes('advisor') || 
      queryLower.includes('business')
    )) {
      responseText = "The detailed case study for this project isn't published yet. I can give you a high-level overview of the project and its purpose.";
    } else if (queryLower.includes('latency') || queryLower.includes('exit') || queryLower.includes('resnet') || queryLower.includes('intellidepth')) {
      responseText = `IntelliDepth is a deep learning research project mapping joint multi-exit ResNet classifiers for adaptive inference. The project aims to dynamically adjust neural network execution latency depending on sample complexity, utilizing model calibration techniques to maintain reliable confidence scores.`;
    } else if (queryLower.includes('emotion') || queryLower.includes('detection') || queryLower.includes('facial') || queryLower.includes('expression')) {
      responseText = `The Facial and Vocal Emotion Detection project is a multimodal classification system that uses deep feature representations (FaceNet for facial video frames and RNN/LSTM backbones for speech audio sequences) to classify human emotional states.`;
    } else if (queryLower.includes('advisor') || queryLower.includes('business') || queryLower.includes('openai') || queryLower.includes('gpt')) {
      responseText = `The AI Business Advisor is an NLP prototype that leverages OpenAI API structures inside a Next.js framework to analyze business documents and retrieve formatted insights.`;
    } else if (queryLower.includes('gpa') || queryLower.includes('education') || queryLower.includes('academic') || queryLower.includes('college')) {
      responseText = `Kishore is a Computer Science and Engineering (AI & ML) final-year undergraduate student at Sai Vidya Institute of Technology, Bangalore (2023–2027 batch) with a CGPA of 8.4.`;
    } else {
      responseText = `Hello! I am Kishore's AI Recruiter Assistant. I have local access to his credentials, academic records, and projects. 

Based on my knowledge base, here are his projects:
• **Facial and Vocal Emotion Detection**: Multimodal FaceNet and LSTM emotion recognition classifier.
• **IntelliDepth**: Joint multi-exit ResNet-56 image classifier calibrated via L-BFGS temperature scaling (Status: In Progress).
• **AI Business Advisor**: Financial document auditing platform prototype using Next.js and the OpenAI API.

You can ask me questions like:
* "What is his academic background?"
* "How does his emotion detection project work?"
* "What is the status of IntelliDepth?"`;
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
