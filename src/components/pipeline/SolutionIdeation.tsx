import { SolutionOption, ProblemSummary } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Target, Gauge, Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SolutionIdeationProps {
  selectedProblem: ProblemSummary;
  solutions: SolutionOption[];
  onSelect: (solution: SolutionOption) => void;
}

const feasibilityLabels = {
  easy: { label: 'Easy', color: 'text-success' },
  moderate: { label: 'Moderate', color: 'text-warning' },
  complex: { label: 'Complex', color: 'text-destructive' },
  proven: { label: 'Proven', color: 'text-success' },
  emerging: { label: 'Emerging', color: 'text-warning' },
  experimental: { label: 'Experimental', color: 'text-destructive' },
};

export function SolutionIdeation({ selectedProblem, solutions, onSelect }: SolutionIdeationProps) {
  const sortedSolutions = [...solutions].sort((a, b) => (a.rank || 99) - (b.rank || 99));
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Context header */}
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="p-2 rounded-lg bg-secondary/20">
          <Target className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Solving for:</span>
          <h3 className="font-semibold">{selectedProblem.theme_title}</h3>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
          <Lightbulb className="w-4 h-4" />
          Stage 5: Solution Ideation
        </div>
        <h2 className="text-2xl font-bold mb-2">Solution Options</h2>
        <p className="text-muted-foreground">
          Explore potential solutions ranked by fit and feasibility. Select one to generate an implementation plan.
        </p>
      </div>

      {/* Solution cards */}
      <div className="space-y-6">
        {sortedSolutions.map((solution, index) => {
          const isRecommended = solution.rank === 1;
          
          return (
            <div 
              key={solution.option_id}
              className={cn(
                "glass-card p-6 transition-all duration-200 hover:border-primary/50 animate-slide-up",
                isRecommended && "ring-2 ring-primary/30 border-primary/50"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono",
                    isRecommended 
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {solution.rank || index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {solution.option_id}
                      </span>
                      {isRecommended && (
                        <Badge variant="default" className="gap-1">
                          <Star className="w-3 h-3" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{solution.title}</h3>
                  </div>
                </div>
                <Button onClick={() => onSelect(solution)} variant={isRecommended ? "gradient" : "outline"}>
                  Select
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-muted-foreground mb-4">
                {solution.description}
              </p>

              {/* Value proposition */}
              <div className="bg-primary/5 rounded-lg p-4 mb-4 border-l-2 border-primary">
                <span className="text-xs uppercase tracking-wider text-primary font-medium">Value Proposition</span>
                <p className="text-foreground mt-1">{solution.value_proposition}</p>
              </div>

              {/* Features grid */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Core Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {solution.core_features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success metrics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Success Metrics</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.success_metrics.map((metric, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      <Gauge className="w-3 h-3 mr-1" />
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Feasibility */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <div>
                  <span className="text-xs text-muted-foreground">Technical</span>
                  <p className={cn("text-sm font-medium", feasibilityLabels[solution.feasibility.technical].color)}>
                    {feasibilityLabels[solution.feasibility.technical].label}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Market</span>
                  <p className={cn("text-sm font-medium", feasibilityLabels[solution.feasibility.market].color)}>
                    {feasibilityLabels[solution.feasibility.market].label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
