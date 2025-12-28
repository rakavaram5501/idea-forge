import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, Settings, HelpCircle, Maximize2, 
  Activity, Zap 
} from 'lucide-react';

interface HeaderProps {
  topic?: string;
  currentStage: number;
}

const stageNames: Record<number, string> = {
  1: 'Topic Curation',
  2: 'Issue Extraction',
  3: 'Problem Summary',
  4: 'Issue Selection',
  5: 'Solution Ideation',
  6: 'Implementation Planning',
  7: 'Human Approval',
  8: 'Codebase Scaffolding',
  9: 'Workflow Framework',
  10: 'Best Practices Audit',
};

export function Header({ topic, currentStage }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant={`stage${currentStage}` as any} className="text-xs font-mono">
              Stage {currentStage}
            </Badge>
            <h2 className="font-semibold">{stageNames[currentStage]}</h2>
          </div>
          {topic && (
            <p className="text-sm text-muted-foreground mt-0.5">
              Topic: <span className="text-foreground">{topic}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs">
          <Activity className="w-3 h-3" />
          <span>Pipeline Active</span>
        </div>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
