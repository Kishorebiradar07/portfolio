'use client';

import * as React from 'react';
import { Send, Sparkles, X, CornerDownLeft, Bot, MessageSquare } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRecruiterStore } from '@/store/useRecruiterStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  'How does IntelliDepth reduce latency?',
  'What is the retrieval speed of AutoRAG?',
  'What ML certifications does he hold?',
];

export function AIAssistantDrawer() {
  const { assistantOpen, setAssistantOpen } = useRecruiterStore();
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am your AI Recruiter Assistant. I have indexed the candidate's complete resume, research files, and case study metrics. Ask me any technical questions about his engineering capabilities!",
    },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat when messages change
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollArea = scrollContainerRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (!res.ok) throw new Error('API server returned error');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader interface in response');

      // Append empty assistant message to fill up during streaming
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let assistantResponse = '';
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunkStr = decoder.decode(value);
          const lines = chunkStr.split('\n').filter((l) => l.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: [DONE]')) {
              done = true;
              break;
            }
            if (line.startsWith('data: ')) {
              try {
                const dataJson = JSON.parse(line.slice(6));
                const content = dataJson.choices[0]?.delta?.content || '';
                assistantResponse += content;

                // Update last assistant message in place
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last && last.role === 'assistant') {
                    last.content = assistantResponse;
                  }
                  return updated;
                });
              } catch (e) {
                // Ignore parse errors on partial streams
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to query assistant chat API:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection timed out. Please verify local server is running.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
      <SheetContent className="w-[92vw] sm:max-w-md border-border bg-card flex flex-col p-0">
        {/* Header bar */}
        <SheetHeader className="p-5 border-b border-border flex-none flex flex-row items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-violet-500" />
            <div>
              <SheetTitle className="text-sm font-bold flex items-center gap-1.5">
                <span>AI Assistant</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </SheetTitle>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Powered by RAG Knowledge Indexing
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Chat Area */}
        <ScrollArea ref={scrollContainerRef} className="flex-1 p-5 space-y-4">
          <div className="space-y-4 pb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg h-fit ${
                    msg.role === 'user'
                      ? 'bg-violet-600/10 text-violet-400'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.role === 'user' ? <MessageSquare className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                
                <div
                  className={`rounded-xl p-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-muted/40 border border-border text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="p-1.5 rounded-lg h-fit bg-muted text-muted-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-xl p-3.5 text-xs bg-muted/40 border border-border flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce delay-200" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce delay-300" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestion tags list & Chat Input Form */}
        <div className="p-4 border-t border-border bg-muted/10 flex-none space-y-3">
          {messages.length === 1 && (
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">
                Suggested Queries
              </span>
              <div className="flex flex-col gap-1.5">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-left text-[10px] p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all cursor-pointer font-medium"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden px-3 focus-within:border-violet-500/50 transition-colors"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about GPA, deployments..."
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 shadow-none text-xs h-10 px-0"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || loading}
              className="h-7 w-7 rounded-md bg-violet-600 hover:bg-violet-500 text-white cursor-pointer ml-2"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
