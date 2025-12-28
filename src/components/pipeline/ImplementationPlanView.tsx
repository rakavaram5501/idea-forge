import { ImplementationPlan, SolutionOption } from '@/types/pipeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Calendar, Users, AlertTriangle, Shield, 
  Zap, Code, Database, Cloud, CheckCircle2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImplementationPlanViewProps {
  plan: ImplementationPlan;
  solution: SolutionOption;
  onApprove: () => void;
  onReject: () => void;
}

export function ImplementationPlanView({ plan, solution, onApprove, onReject }: ImplementationPlanViewProps) {
  const totalWeeks = plan.phases.reduce((sum, phase) => sum + phase.timeline_weeks, 0);
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
          <Calendar className="w-4 h-4" />
          Stage 6: Implementation Planning
        </div>
        <h2 className="text-2xl font-bold mb-2">Implementation Plan</h2>
        <p className="text-muted-foreground">
          Detailed roadmap for building: <span className="text-foreground font-medium">{solution.title}</span>
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-2xl font-bold font-mono">{totalWeeks}</span>
          <span className="text-sm text-muted-foreground">Weeks Total</span>
        </div>
        <div className="stat-card">
          <Code className="w-5 h-5 text-secondary" />
          <span className="text-2xl font-bold font-mono">{plan.phases.length}</span>
          <span className="text-sm text-muted-foreground">Phases</span>
        </div>
        <div className="stat-card">
          <Users className="w-5 h-5 text-success" />
          <span className="text-2xl font-bold font-mono">
            {new Set(plan.phases.flatMap(p => p.team_roles)).size}
          </span>
          <span className="text-sm text-muted-foreground">Roles Needed</span>
        </div>
        <div className="stat-card">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <span className="text-2xl font-bold font-mono">
            {plan.phases.reduce((sum, p) => sum + p.risks.length, 0)}
          </span>
          <span className="text-sm text-muted-foreground">Risks Identified</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card-elevated p-6">
        <h3 className="text-lg font-semibold mb-6">Project Timeline</h3>
        
        <div className="space-y-6">
          {plan.phases.map((phase, index) => (
            <div 
              key={phase.phase_id}
              className="relative pl-8 pb-6 border-l-2 border-muted last:border-l-0 last:pb-0"
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-br from-primary to-secondary" />
              
              <div className="glass-card p-5 ml-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="stage3">{phase.phase_id}</Badge>
                      <span className="text-sm text-muted-foreground font-mono">
                        {phase.timeline_weeks} weeks
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold">{phase.name}</h4>
                  </div>
                </div>

                {/* Goals */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">Goals</h5>
                  <ul className="space-y-1">
                    {phase.goals.map((goal, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestones */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">Milestones</h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.milestones.map((milestone, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {milestone}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Team */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">Team Roles</h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.team_roles.map((role, i) => (
                      <Badge key={i} variant="muted" className="text-xs gap-1">
                        <Users className="w-3 h-3" />
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                {phase.risks.length > 0 && (
                  <div className="bg-warning/5 rounded-lg p-3 border border-warning/20">
                    <h5 className="text-sm font-medium text-warning mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Risks & Mitigations
                    </h5>
                    <ul className="space-y-2">
                      {phase.risks.map((risk, i) => (
                        <li key={i} className="text-sm">
                          <span className="text-muted-foreground">{risk.risk}</span>
                          <br />
                          <span className="text-success text-xs">→ {risk.mitigation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">Frontend</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {plan.tech_stack.frontend.map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">Backend</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {plan.tech_stack.backend.map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-success">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI/ML</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {plan.tech_stack.ai_ml.map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 text-warning">
              <Cloud className="w-4 h-4" />
              <span className="text-sm font-medium">Tooling</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {plan.tech_stack.tooling.map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Non-functional requirements */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Non-Functional Requirements</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-destructive">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Security & Compliance</span>
            </div>
            <ul className="space-y-2">
              {plan.non_functional.security.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Performance</span>
            </div>
            <ul className="space-y-2">
              {plan.non_functional.performance.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3 text-secondary">
              <Users className="w-4 h-4" />
              <span className="font-medium">Accessibility</span>
            </div>
            <ul className="space-y-2">
              {plan.non_functional.accessibility.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Approval section */}
      <div className="glass-card-elevated p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Ready for Approval</h3>
        <p className="text-muted-foreground mb-6">
          Review the implementation plan above. Approve to proceed to codebase scaffolding, or reject to revise.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={onReject} variant="outline" size="lg">
            Request Revisions
          </Button>
          <Button onClick={onApprove} variant="success" size="lg">
            Approve Plan
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
