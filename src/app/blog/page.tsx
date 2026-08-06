import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'ece-calibration-explained',
    title: 'Understanding Expected Calibration Error (ECE) in Neural Classifiers',
    excerpt: 'Modern neural networks are accurate but highly overconfident. Learn how to formulate ECE and apply post-hoc temperature scaling to calibrate confidence.',
    date: 'Oct 14, 2025',
    readTime: '6 min read',
    tags: ['Deep Learning', 'PyTorch', 'Calibration'],
  },
  {
    slug: 'pgvector-hnsw-optimization',
    title: 'Optimizing pgvector HNSW Indexing for Low-Latency RAG Search',
    excerpt: 'A deep dive into index configurations, cosine distance matching, parent-child chunk strategies, and scaling vector dimensions in Supabase.',
    date: 'Aug 28, 2025',
    readTime: '8 min read',
    tags: ['PostgreSQL', 'pgvector', 'RAG', 'Vector Search'],
  },
  {
    slug: 'multi-exit-resnet-serving',
    title: 'Serving Multi-Exit ResNet Models with Early-Exit Threshold Policies',
    excerpt: 'How we can attach intermediate exit nodes to ResNets, train them jointly, and set inference confidence gates to skip heavy convolutions.',
    date: 'Jul 04, 2025',
    readTime: '10 min read',
    tags: ['PyTorch', 'Optimization', 'Model serving'],
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 w-full">
      <section className="max-w-3xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400">
            Technical Blog
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
            Engineering Writeups & Research
          </h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Deep-dives into ML infrastructure, mathematical neural network calibration formulas, and database vector indexing optimizations.
        </p>
      </section>

      {/* Grid of articles */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-border">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col border border-border bg-card hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.02)] transition-all rounded-xl p-6 group h-full"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-violet-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-400 group-hover:text-violet-300 transition-colors">
                <span>Read</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
