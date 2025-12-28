import { cn } from '@/lib/utils';
import { StageStatus } from '@/types/pipeline';
import { 
  Search, FileSearch, FileText, MousePointer, Lightbulb, 
  Calendar, CheckCircle, GitBranch, Workflow, Shield,
  ChevronRight
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  status: StageStatus;
}

interface SidebarProps {
  stages: Stage[];
  currentStage: number;
  onStageClick: (stageId: number) => void;
}

const stageIcons: Record<number, React.ComponentType<any>> = {
  1: Search,
  2: FileSearch,
  3: FileText,
  4: MousePointer,
  5: Lightbulb,
  6: Calendar,
  7: CheckCircle,
  8: GitBranch,
  9: Workflow,
  10: Shield,
};

const stageDescriptions: Record<number, string> = {
  1: 'Find relevant subreddits',
  2: 'Extract user issues',
  3: 'Summarize problems',
  4: 'Select issue to solve',
  5: 'Generate solutions',
  6: 'Plan implementation',
  7: 'Approve the plan',
  8: 'Generate codebase',
  9: 'Setup workflow',
  10: 'Security audit',
};

export function Sidebar({ stages, currentStage, onStageClick }: SidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0 border-r border-border bg-card/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Workflow className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Discovery</h1>
            <p className="text-xs text-muted-foreground">Product Pipeline</p>
          </div>
        </div>
      </div>

      {/* Stage navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-auto">
        {stages.map((stage) => {
          const Icon = stageIcons[stage.id];
          const isActive = stage.id === currentStage;
          const isCompleted = stage.status === 'completed';
          const isAccessible = stage.id <= currentStage || isCompleted;

          return (
            <button
              key={stage.id}
              onClick={() => isAccessible && onStageClick(stage.id)}
              disabled={!isAccessible}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                isActive 
                  ? "bg-primary/10 border border-primary/30" 
                  : isCompleted
                    ? "hover:bg-muted/50"
                    : isAccessible
                      ? "hover:bg-muted/30"
                      : "opacity-40 cursor-not-allowed"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : isCompleted
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-mono",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {stage.id.toString().padStart(2, '0')}
                  </span>
                  <span className={cn(
                    "font-medium text-sm truncate",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {stage.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {stageDescriptions[stage.id]}
                </p>
              </div>

              {isActive && (
                <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Stage {currentStage} of 10
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${(currentStage / 10) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
