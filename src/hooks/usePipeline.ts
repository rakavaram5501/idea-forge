import { useState, useCallback } from 'react';
import { 
  PipelineState, StageStatus, Subreddit, Issue, 
  ProblemSummary, SolutionOption, ImplementationPlan, Approval, AuditLog 
} from '@/types/pipeline';
import { 
  mockSubreddits, mockIssues, mockProblemSummary, 
  mockSolutions, mockImplementationPlan, mockAuditLog 
} from '@/data/mockData';

const initialStages = [
  { id: 1, name: 'Topic Curation', status: 'in_progress' as StageStatus },
  { id: 2, name: 'Issue Extraction', status: 'pending' as StageStatus },
  { id: 3, name: 'Problem Summary', status: 'pending' as StageStatus },
  { id: 4, name: 'Issue Selection', status: 'pending' as StageStatus },
  { id: 5, name: 'Solution Ideation', status: 'pending' as StageStatus },
  { id: 6, name: 'Implementation', status: 'pending' as StageStatus },
  { id: 7, name: 'Approval', status: 'pending' as StageStatus },
  { id: 8, name: 'Scaffolding', status: 'pending' as StageStatus },
  { id: 9, name: 'Workflow', status: 'pending' as StageStatus },
  { id: 10, name: 'Audit', status: 'pending' as StageStatus },
];

export function usePipeline() {
  const [state, setState] = useState<PipelineState>({
    topic: '',
    currentStage: 1,
    stages: initialStages,
    subreddits: [],
    issues: [],
    problemSummary: [],
    solutions: [],
    auditLog: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const addAuditLog = useCallback((stage: number, action: string, details: Record<string, unknown> = {}) => {
    const log: AuditLog = {
      log_id: `LOG-${Date.now()}`,
      stage,
      action,
      timestamp: new Date().toISOString(),
      user_id: 'user-001',
      details,
    };
    setState(prev => ({
      ...prev,
      auditLog: [...prev.auditLog, log],
    }));
  }, []);

  const updateStageStatus = useCallback((stageId: number, status: StageStatus) => {
    setState(prev => ({
      ...prev,
      stages: prev.stages.map(s => 
        s.id === stageId ? { ...s, status } : s
      ),
    }));
  }, []);

  const goToStage = useCallback((stageId: number) => {
    setState(prev => ({
      ...prev,
      currentStage: stageId,
    }));
  }, []);

  const submitTopic = useCallback(async (topic: string) => {
    setIsLoading(true);
    addAuditLog(1, 'Topic submitted', { topic });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setState(prev => ({
      ...prev,
      topic,
      subreddits: mockSubreddits,
      stages: prev.stages.map(s => 
        s.id === 1 ? { ...s, status: 'completed' } : s
      ),
    }));
    
    addAuditLog(1, 'Subreddits curated', { count: mockSubreddits.length });
    setIsLoading(false);
  }, [addAuditLog]);

  const proceedToExtraction = useCallback(async () => {
    setIsLoading(true);
    updateStageStatus(2, 'in_progress');
    goToStage(2);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setState(prev => ({
      ...prev,
      issues: mockIssues,
      stages: prev.stages.map(s => 
        s.id === 2 ? { ...s, status: 'completed' } : s
      ),
    }));
    
    addAuditLog(2, 'Issues extracted', { count: mockIssues.length });
    setIsLoading(false);
  }, [updateStageStatus, goToStage, addAuditLog]);

  const proceedToSummary = useCallback(async () => {
    setIsLoading(true);
    updateStageStatus(3, 'in_progress');
    goToStage(3);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setState(prev => ({
      ...prev,
      problemSummary: mockProblemSummary,
      stages: prev.stages.map(s => 
        s.id === 3 ? { ...s, status: 'completed' } : 
        s.id === 4 ? { ...s, status: 'in_progress' } : s
      ),
      currentStage: 4,
    }));
    
    addAuditLog(3, 'Problem summary generated', { themes: mockProblemSummary.length });
    setIsLoading(false);
  }, [updateStageStatus, goToStage, addAuditLog]);

  const selectProblem = useCallback(async (problem: ProblemSummary) => {
    setIsLoading(true);
    const relatedIssue = state.issues.find(i => problem.related_issues.includes(i.issue_id));
    
    setState(prev => ({
      ...prev,
      selectedIssue: relatedIssue,
      stages: prev.stages.map(s => 
        s.id === 4 ? { ...s, status: 'completed' } : 
        s.id === 5 ? { ...s, status: 'in_progress' } : s
      ),
      currentStage: 5,
    }));
    
    addAuditLog(4, 'Problem selected', { 
      theme_id: problem.theme_id, 
      issue_id: relatedIssue?.issue_id 
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setState(prev => ({
      ...prev,
      solutions: mockSolutions,
    }));
    
    addAuditLog(5, 'Solutions generated', { count: mockSolutions.length });
    setIsLoading(false);
  }, [state.issues, addAuditLog]);

  const selectSolution = useCallback(async (solution: SolutionOption) => {
    setIsLoading(true);
    
    setState(prev => ({
      ...prev,
      selectedSolution: solution,
      stages: prev.stages.map(s => 
        s.id === 5 ? { ...s, status: 'completed' } : 
        s.id === 6 ? { ...s, status: 'in_progress' } : s
      ),
      currentStage: 6,
    }));
    
    addAuditLog(5, 'Solution selected', { option_id: solution.option_id });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setState(prev => ({
      ...prev,
      implementationPlan: mockImplementationPlan,
    }));
    
    addAuditLog(6, 'Implementation plan created', { 
      plan_id: mockImplementationPlan.plan_id,
      phases: mockImplementationPlan.phases.length 
    });
    setIsLoading(false);
  }, [addAuditLog]);

  const approvePlan = useCallback(() => {
    const approval: Approval = {
      approval_id: `APR-${Date.now()}`,
      plan_id: state.implementationPlan?.plan_id || '',
      status: 'approved',
      approver_id: 'user-001',
      timestamp: new Date().toISOString(),
    };
    
    setState(prev => ({
      ...prev,
      approval,
      stages: prev.stages.map(s => 
        s.id === 6 ? { ...s, status: 'completed' } : 
        s.id === 7 ? { ...s, status: 'completed' } : s
      ),
      currentStage: 7,
    }));
    
    addAuditLog(7, 'Plan approved', { approval_id: approval.approval_id });
  }, [state.implementationPlan, addAuditLog]);

  const rejectPlan = useCallback(() => {
    const approval: Approval = {
      approval_id: `APR-${Date.now()}`,
      plan_id: state.implementationPlan?.plan_id || '',
      status: 'revisions_needed',
      approver_id: 'user-001',
      timestamp: new Date().toISOString(),
      feedback: 'Requires additional review',
    };
    
    setState(prev => ({
      ...prev,
      approval,
    }));
    
    addAuditLog(7, 'Plan revision requested', { approval_id: approval.approval_id });
  }, [state.implementationPlan, addAuditLog]);

  const proceedToScaffolding = useCallback(() => {
    setState(prev => ({
      ...prev,
      stages: prev.stages.map(s => 
        s.id === 8 ? { ...s, status: 'in_progress' } : s
      ),
      currentStage: 8,
    }));
    
    addAuditLog(8, 'Scaffolding initiated', {});
  }, [addAuditLog]);

  return {
    state,
    isLoading,
    submitTopic,
    proceedToExtraction,
    proceedToSummary,
    selectProblem,
    selectSolution,
    approvePlan,
    rejectPlan,
    proceedToScaffolding,
    goToStage,
  };
}
