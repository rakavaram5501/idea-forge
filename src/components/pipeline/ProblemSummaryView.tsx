import { ProblemSummary, Issue } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemSummaryViewProps {
  problems: ProblemSummary[];
  issues: Issue[];
  onSelect: (problem: ProblemSummary) => void;
}

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    badge: 'destructive' as const,
  },
  medium: {
    icon: AlertCircle,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    badge: 'warning' as const,
  },
  low: {
    icon: Info,
    color: 'text-muted-foreground',
    bg: 'bg-muted/50',
    border: 'border-border',
    badge: 'muted' as const,
  },
};

export function ProblemSummaryView({ problems, issues, onSelect }: ProblemSummaryViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
          <Check className="w-4 h-4" />
          Stage 4: Issue Selection
        </div>
        <h2 className="text-2xl font-bold mb-2">Select a Problem to Solve</h2>
        <p className="text-muted-foreground">
          Based on our analysis, here are the key problem themes. Select one to explore solution options.
        </p>
      </div>

      {/* Executive summary */}
      <div className="glass-card-elevated p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
        <p className="text-muted-foreground leading-relaxed">
          Analysis of {issues.length} issues across multiple communities reveals {problems.length} core problem themes. 
          The most pressing challenges center around <span className="text-foreground font-medium">information fragmentation</span> and 
          <span className="text-foreground font-medium"> async communication</span>, with high frequency mentions and strong negative sentiment. 
          These represent significant market opportunities for tooling solutions.
        </p>
      </div>

      {/* Problem cards */}
      <div className="grid gap-4">
        {problems.map((problem, index) => {
          const config = priorityConfig[problem.priority];
          const Icon = config.icon;
          const relatedIssueDetails = issues.filter(i => problem.related_issues.includes(i.issue_id));
          
          return (
            <button
              key={problem.theme_id}
              onClick={() => onSelect(problem)}
              className={cn(
                "glass-card p-6 text-left transition-all duration-200 hover:scale-[1.01] hover:border-primary/50 group animate-slide-up",
                config.border
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Priority indicator */}
                <div className={cn("p-3 rounded-xl", config.bg)}>
                  <Icon className={cn("w-6 h-6", config.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {problem.theme_id}
                    </span>
                    <Badge variant={config.badge}>
                      {problem.priority} priority
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {problem.theme_title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {problem.justification}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Based on {relatedIssueDetails.length} related issues
                    </span>
                    <div className="flex gap-1.5">
                      {relatedIssueDetails.slice(0, 3).map(issue => (
                        <Badge key={issue.issue_id} variant="outline" className="text-xs">
                          {issue.issue_id}
                        </Badge>
                      ))}
                      {relatedIssueDetails.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{relatedIssueDetails.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
