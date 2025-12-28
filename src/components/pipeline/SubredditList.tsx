import { Subreddit } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';

interface SubredditListProps {
  subreddits: Subreddit[];
  onContinue: () => void;
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{(score * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
          style={{ width: `${score * 100}%` }}
        />
      </div>
    </div>
  );
}

export function SubredditList({ subreddits, onContinue }: SubredditListProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Curated Subreddits</h2>
          <p className="text-muted-foreground mt-1">
            Found {subreddits.length} relevant communities for analysis
          </p>
        </div>
        <Button onClick={onContinue} variant="gradient">
          Continue to Extraction
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {subreddits.map((subreddit, index) => (
          <div 
            key={subreddit.subreddit_name}
            className="glass-card p-5 hover:border-primary/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Left: Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <a
                    href={subreddit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    {subreddit.subreddit_name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {subreddit.justification}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {subreddit.typical_post_topics.map((topic) => (
                    <Badge key={topic} variant="muted" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Right: Scores */}
              <div className="w-40 space-y-3 flex-shrink-0">
                <ScoreBar score={subreddit.relevance_score} label="Relevance" />
                <ScoreBar score={subreddit.recent_activity_score} label="Activity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue} variant="gradient" size="lg">
          Proceed to Issue Extraction
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
