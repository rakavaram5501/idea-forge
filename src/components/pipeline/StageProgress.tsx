import { cn } from '@/lib/utils';
import { Check, Circle, Play, Lock } from 'lucide-react';
import { StageStatus } from '@/types/pipeline';

interface Stage {
  id: number;
  name: string;
  status: StageStatus;
}

interface StageProgressProps {
  stages: Stage[];
  currentStage: number;
  onStageClick: (stageId: number) => void;
}

const stageColors: Record<number, string> = {
  1: 'from-stage-1 to-stage-1',
  2: 'from-stage-2 to-stage-2',
  3: 'from-stage-3 to-stage-3',
  4: 'from-stage-4 to-stage-4',
  5: 'from-stage-5 to-stage-5',
  6: 'from-stage-6 to-stage-6',
  7: 'from-stage-7 to-stage-7',
  8: 'from-stage-8 to-stage-8',
  9: 'from-stage-9 to-stage-9',
  10: 'from-stage-10 to-stage-10',
};

export function StageProgress({ stages, currentStage, onStageClick }: StageProgressProps) {
  const getStatusIcon = (status: StageStatus, isActive: boolean) => {
    switch (status) {
      case 'completed':
        return <Check className="w-3 h-3" />;
      case 'in_progress':
        return <Play className="w-3 h-3" />;
      case 'blocked':
        return <Lock className="w-3 h-3" />;
      default:
        return <Circle className="w-3 h-3" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Pipeline Progress
        </h3>
        <span className="text-sm font-mono text-primary">
          Stage {currentStage}/10
        </span>
      </div>
      
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted rounded-full" />
        
        {/* Active progress line */}
        <div 
          className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
          style={{ width: `calc(${((currentStage - 1) / 9) * 100}% - 32px)` }}
        />
        
        {/* Stage nodes */}
        <div className="relative flex justify-between">
          {stages.map((stage) => {
            const isActive = stage.id === currentStage;
            const isCompleted = stage.status === 'completed';
            const isAccessible = stage.id <= currentStage || isCompleted;
            
            return (
              <button
                key={stage.id}
                onClick={() => isAccessible && onStageClick(stage.id)}
                disabled={!isAccessible}
                className={cn(
                  "flex flex-col items-center gap-2 transition-all duration-200",
                  isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
              >
                {/* Node */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    "border-2",
                    isActive && "ring-4 ring-primary/30 scale-110",
                    isCompleted 
                      ? `bg-gradient-to-br ${stageColors[stage.id]} border-transparent text-background` 
                      : isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-mono font-bold">{stage.id}</span>
                  )}
                </div>
                
                {/* Label - only show for first, last, and current */}
                {(stage.id === 1 || stage.id === 10 || isActive) && (
                  <span 
                    className={cn(
                      "text-xs font-medium max-w-[60px] text-center leading-tight",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {stage.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
