import { Approval, ImplementationPlan, SolutionOption } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, XCircle, Clock, ArrowRight, 
  Rocket, GitBranch, FileCode, FolderTree 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalViewProps {
  approval: Approval;
  plan: ImplementationPlan;
  solution: SolutionOption;
  onProceed: () => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
    label: 'Pending Review',
  },
  approved: {
    icon: CheckCircle2,
    color: 'text-success',
    bg: 'bg-success/10',
    label: 'Approved',
  },
  rejected: {
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    label: 'Rejected',
  },
  revisions_needed: {
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
    label: 'Revisions Needed',
  },
};

export function ApprovalView({ approval, plan, solution, onProceed }: ApprovalViewProps) {
  const config = statusConfig[approval.status];
  const Icon = config.icon;

  const repoStructure = [
    { type: 'folder', name: 'src', children: [
      { type: 'folder', name: 'components', children: [
        { type: 'file', name: 'Dashboard.tsx' },
        { type: 'file', name: 'MeetingCard.tsx' },
        { type: 'file', name: 'ActionItems.tsx' },
      ]},
      { type: 'folder', name: 'api', children: [
        { type: 'file', name: 'meetings.ts' },
        { type: 'file', name: 'transcription.ts' },
      ]},
      { type: 'folder', name: 'lib', children: [
        { type: 'file', name: 'ai.ts' },
        { type: 'file', name: 'integrations.ts' },
      ]},
    ]},
    { type: 'folder', name: 'supabase', children: [
      { type: 'folder', name: 'functions', children: [
        { type: 'file', name: 'transcribe/index.ts' },
        { type: 'file', name: 'summarize/index.ts' },
      ]},
      { type: 'folder', name: 'migrations', children: [
        { type: 'file', name: '001_initial.sql' },
      ]},
    ]},
    { type: 'file', name: 'README.md' },
    { type: 'file', name: 'package.json' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Status banner */}
      <div className={cn(
        "glass-card-elevated p-8 text-center",
        config.bg
      )}>
        <div className={cn(
          "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
          config.bg
        )}>
          <Icon className={cn("w-8 h-8", config.color)} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Plan {config.label}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {approval.status === 'approved' 
            ? "Your implementation plan has been approved. You can now proceed to generate the codebase scaffold."
            : approval.status === 'rejected'
              ? "The plan requires revisions. Please review the feedback and update the plan."
              : "Awaiting review of the implementation plan."
          }
        </p>
        {approval.timestamp && (
          <p className="text-sm text-muted-foreground mt-4">
            {approval.status === 'approved' ? 'Approved' : 'Updated'} on {new Date(approval.timestamp).toLocaleString()}
          </p>
        )}
      </div>

      {approval.status === 'approved' && (
        <>
          {/* What's next */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Rocket className="w-4 h-4" />
              Stage 8: Codebase Scaffolding
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to Generate Codebase</h2>
            <p className="text-muted-foreground">
              We'll create a complete project scaffold with frontend, backend, AI integrations, and tooling.
            </p>
          </div>

          {/* Preview */}
          <div className="grid grid-cols-2 gap-6">
            {/* Repository structure */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderTree className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Repository Structure</h3>
              </div>
              <div className="font-mono text-sm space-y-1 bg-muted/50 rounded-lg p-4">
                {repoStructure.map((item, i) => (
                  <TreeItem key={i} item={item} depth={0} />
                ))}
              </div>
            </div>

            {/* Features to generate */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileCode className="w-5 h-5 text-secondary" />
                <h3 className="text-lg font-semibold">Generated Features</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: '🎨', label: 'React + TypeScript frontend with TailwindCSS' },
                  { icon: '⚡', label: 'Supabase backend with PostgreSQL' },
                  { icon: '🤖', label: 'AI integration via Edge Functions' },
                  { icon: '🔗', label: 'Integration connectors (Zoom, Slack)' },
                  { icon: '🔐', label: 'Authentication scaffolding' },
                  { icon: '📊', label: 'Database migrations and types' },
                  { icon: '🧪', label: 'Test scaffolding' },
                  { icon: '📚', label: 'Documentation and README' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div className="flex justify-center">
            <Button onClick={onProceed} variant="gradient" size="xl" className="gap-2">
              <GitBranch className="w-5 h-5" />
              Generate Codebase Scaffold
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function TreeItem({ item, depth }: { item: any; depth: number }) {
  const indent = depth * 16;
  
  return (
    <div>
      <div 
        className="flex items-center gap-2 py-0.5 hover:bg-muted rounded px-1"
        style={{ paddingLeft: indent }}
      >
        {item.type === 'folder' ? (
          <span className="text-warning">📁</span>
        ) : (
          <span className="text-primary">📄</span>
        )}
        <span className={item.type === 'folder' ? 'text-warning' : 'text-muted-foreground'}>
          {item.name}
        </span>
      </div>
      {item.children?.map((child: any, i: number) => (
        <TreeItem key={i} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}
