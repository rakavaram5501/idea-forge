import { Issue } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Calendar, ArrowRight, Quote } from 'lucide-react';

interface IssuesListProps {
  issues: Issue[];
  onContinue: () => void;
}

const sentimentColors = {
  positive: 'success',
  neutral: 'muted',
  negative: 'destructive',
} as const;

export function IssuesList({ issues, onContinue }: IssuesListProps) {
  const totalFrequency = issues.reduce((sum, issue) => sum + (issue.frequency || 0), 0);
  const topTags = [...new Set(issues.flatMap(i => i.tags))].slice(0, 8);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Extracted Issues</h2>
          <p className="text-muted-foreground mt-1">
            {issues.length} issues identified from {new Set(issues.map(i => i.source_subreddit)).size} subreddits
          </p>
        </div>
        <Button onClick={onContinue} variant="gradient">
          View Summary
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card">
          <span className="text-muted-foreground text-sm">Total Mentions</span>
          <span className="text-2xl font-bold font-mono">{totalFrequency}</span>
        </div>
        <div className="stat-card">
          <span className="text-muted-foreground text-sm">Sentiment</span>
          <div className="flex gap-2">
            <Badge variant="destructive" className="text-xs">
              {issues.filter(i => i.sentiment === 'negative').length} negative
            </Badge>
            <Badge variant="muted" className="text-xs">
              {issues.filter(i => i.sentiment === 'neutral').length} neutral
            </Badge>
          </div>
        </div>
        <div className="stat-card">
          <span className="text-muted-foreground text-sm">Top Tags</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {topTags.slice(0, 4).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div 
            key={issue.issue_id}
            className="glass-card p-5 hover:border-primary/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{issue.issue_id}</span>
                  <Badge variant={sentimentColors[issue.sentiment || 'neutral']}>
                    {issue.sentiment}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">{issue.issue_title}</h3>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-mono">{issue.frequency}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              {issue.issue_description}
            </p>

            {/* Evidence quote */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4 border-l-2 border-primary">
              <Quote className="w-4 h-4 text-primary mb-2" />
              <p className="text-sm italic text-foreground/80">
                {issue.evidence_snippet}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {issue.tags.map((tag) => (
                  <Badge key={tag} variant="muted" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {issue.source_subreddit}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {issue.extraction_date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue} variant="gradient" size="lg">
          Generate Problem Summary
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
