export interface Subreddit {
  subreddit_name: string;
  url: string;
  relevance_score: number;
  typical_post_topics: string[];
  recent_activity_score: number;
  justification: string;
}

export interface Issue {
  issue_id: string;
  source_subreddit: string;
  issue_title: string;
  issue_description: string;
  evidence_snippet: string;
  tags: string[];
  extraction_date: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  frequency?: number;
}

export interface ProblemSummary {
  theme_id: string;
  theme_title: string;
  justification: string;
  related_issues: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface SolutionOption {
  option_id: string;
  title: string;
  description: string;
  value_proposition: string;
  core_features: string[];
  success_metrics: string[];
  feasibility: {
    technical: 'easy' | 'moderate' | 'complex';
    market: 'proven' | 'emerging' | 'experimental';
  };
  rank?: number;
}

export interface ImplementationPhase {
  phase_id: string;
  name: string;
  goals: string[];
  milestones: string[];
  team_roles: string[];
  timeline_weeks: number;
  risks: { risk: string; mitigation: string }[];
}

export interface ImplementationPlan {
  plan_id: string;
  solution_id: string;
  phases: ImplementationPhase[];
  tech_stack: {
    frontend: string[];
    backend: string[];
    ai_ml: string[];
    tooling: string[];
  };
  architecture: string;
  data_model: string;
  non_functional: {
    security: string[];
    performance: string[];
    accessibility: string[];
  };
}

export interface Approval {
  approval_id: string;
  plan_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'revisions_needed';
  approver_id?: string;
  timestamp?: string;
  feedback?: string;
}

export interface AuditLog {
  log_id: string;
  stage: number;
  action: string;
  timestamp: string;
  user_id?: string;
  details: Record<string, unknown>;
}

export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';

export interface PipelineState {
  topic: string;
  currentStage: number;
  stages: {
    id: number;
    name: string;
    status: StageStatus;
    data?: unknown;
  }[];
  subreddits: Subreddit[];
  issues: Issue[];
  problemSummary: ProblemSummary[];
  selectedIssue?: Issue;
  solutions: SolutionOption[];
  selectedSolution?: SolutionOption;
  implementationPlan?: ImplementationPlan;
  approval?: Approval;
  auditLog: AuditLog[];
}
