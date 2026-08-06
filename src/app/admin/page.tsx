import Link from 'next/link';
import { db } from '@/db';
import { recruiters, feedback, messages } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, MessageSquare, Star, Settings2, Shield } from 'lucide-react';

export const revalidate = 0; // Disable server rendering cache to load live telemetry

async function fetchTelemetryData() {
  // If database is not configured (local developer setup), return mock stats
  if (!process.env.DATABASE_URL) {
    return {
      recruitersLog: [
        { id: '1', company: 'OpenAI', email: 'recruiter@openai.com', roleInterest: 'nlp', createdAt: new Date() },
        { id: '2', company: 'Vercel', email: 'hiring@vercel.com', roleInterest: 'fullstack-ai', createdAt: new Date() },
        { id: '3', company: 'Linear', email: 'careers@linear.app', roleInterest: 'mlops', createdAt: new Date() },
      ],
      feedbackLog: [
        { id: '1', rating: 5, message: 'From: Jane (Stripe) - Message: Exceptional UX! Recruiter Mode is a game changer.', createdAt: new Date() },
        { id: '2', rating: 5, message: 'From: John (Google) - Message: Loved testing the multi-exit early exit demo.', createdAt: new Date() },
      ],
      stats: {
        totalSessions: 14,
        avgRating: 5.0,
        chatTurns: 48,
      },
    };
  }

  try {
    const recruitersLog = await db.select().from(recruiters).orderBy(desc(recruiters.createdAt)).limit(10);
    const feedbackLog = await db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(10);
    const allFeedback = await db.select().from(feedback);
    const allMessages = await db.select().from(messages);

    const totalSessions = recruitersLog.length;
    const chatTurns = allMessages.length;
    const avgRating = allFeedback.length > 0 
      ? Number((allFeedback.reduce((acc, curr) => acc + curr.rating, 0) / allFeedback.length).toFixed(1)) 
      : 5.0;

    return {
      recruitersLog,
      feedbackLog,
      stats: {
        totalSessions,
        avgRating,
        chatTurns,
      },
    };
  } catch (err) {
    console.error('Failed to query database for admin metrics', err);
    return { recruitersLog: [], feedbackLog: [], stats: { totalSessions: 0, avgRating: 5.0, chatTurns: 0 } };
  }
}

export default async function AdminDashboardPage() {
  const { recruitersLog, feedbackLog, stats } = await fetchTelemetryData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground group mb-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Site</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-violet-500" />
            <span>Telemetry & Analytics</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Administrative overview of recruiter sessions and feedback logs.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Customized Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-foreground">{stats.totalSessions}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Unique recruiter profiles logged</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Average Feedback Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-foreground">{stats.avgRating} / 5.0</div>
            <p className="text-[10px] text-muted-foreground mt-1">User experience rating score</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Assistant Chat Queries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-foreground">{stats.chatTurns}</div>
            <p className="text-[10px] text-muted-foreground mt-1">Total chat turns stream parsed</p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recruiter customization logs (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-violet-400" />
            <span>Personalization Audits</span>
          </h2>
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="divide-y divide-border/50">
              {recruitersLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 bg-muted/5">
                  <div className="p-3 rounded-full bg-muted/10 text-muted-foreground border border-border/40">
                    <Users className="h-6 w-6 text-violet-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground">No Telemetry Logged</h4>
                    <p className="text-[10px] text-muted-foreground max-w-xs leading-relaxed">
                      Recruiter customization logs will register here once visitors personalize the portfolio interfaces.
                    </p>
                  </div>
                </div>
              ) : (
                recruitersLog.map((log) => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-muted/10 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{log.company}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{log.email || 'Anonymous Recruiter'}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-widest">
                        {log.roleInterest}
                      </span>
                      <p className="text-[9px] text-muted-foreground">{new Date(log.createdAt).toISOString().split('T')[0]}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Feedback logs list (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <Star className="h-4 w-4 text-violet-400" />
            <span>Recruiter Comments</span>
          </h2>
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="divide-y divide-border/50">
              {feedbackLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 bg-muted/5">
                  <div className="p-3 rounded-full bg-muted/10 text-muted-foreground border border-border/40">
                    <Star className="h-6 w-6 text-violet-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground">No Feedback Left Yet</h4>
                    <p className="text-[10px] text-muted-foreground max-w-xs leading-relaxed">
                      Recruiter comments and ratings submitted via the schedule form will log here.
                    </p>
                  </div>
                </div>
              ) : (
                feedbackLog.map((fb) => (
                  <div key={fb.id} className="p-4 space-y-2 hover:bg-muted/10 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-3 w-3 ${
                              s <= fb.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] text-muted-foreground">{new Date(fb.createdAt).toISOString().split('T')[0]}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {fb.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
