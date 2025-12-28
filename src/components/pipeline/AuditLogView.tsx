import { AuditLog } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, User, FileText } from 'lucide-react';

interface AuditLogViewProps {
  logs: AuditLog[];
}

export function AuditLogView({ logs }: AuditLogViewProps) {
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="glass-card p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-primary" />
        <h3 className="font-semibold">Audit Log</h3>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {sortedLogs.map((log) => (
            <div 
              key={log.log_id}
              className="p-3 rounded-lg bg-muted/50 border border-border/50 text-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant={`stage${log.stage}` as any} 
                  className="text-xs"
                >
                  Stage {log.stage}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="font-medium mb-1">{log.action}</p>
              {log.user_id && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {log.user_id}
                </p>
              )}
              {Object.keys(log.details).length > 0 && (
                <pre className="text-xs text-muted-foreground mt-2 font-mono bg-background/50 p-2 rounded overflow-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
