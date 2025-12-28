import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TopicInput } from '@/components/pipeline/TopicInput';
import { SubredditList } from '@/components/pipeline/SubredditList';
import { IssuesList } from '@/components/pipeline/IssuesList';
import { ProblemSummaryView } from '@/components/pipeline/ProblemSummaryView';
import { SolutionIdeation } from '@/components/pipeline/SolutionIdeation';
import { ImplementationPlanView } from '@/components/pipeline/ImplementationPlanView';
import { ApprovalView } from '@/components/pipeline/ApprovalView';
import { AuditLogView } from '@/components/pipeline/AuditLogView';
import { usePipeline } from '@/hooks/usePipeline';
import { Badge } from '@/components/ui/badge';
import { Rocket, Construction } from 'lucide-react';

const Index = () => {
  const {
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
  } = usePipeline();

  const renderStageContent = () => {
    switch (state.currentStage) {
      case 1:
        if (state.subreddits.length === 0) {
          return <TopicInput onSubmit={submitTopic} isLoading={isLoading} />;
        }
        return (
          <SubredditList 
            subreddits={state.subreddits} 
            onContinue={proceedToExtraction} 
          />
        );
      
      case 2:
        if (isLoading || state.issues.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Extracting issues from subreddits...</p>
            </div>
          );
        }
        return (
          <IssuesList 
            issues={state.issues} 
            onContinue={proceedToSummary} 
          />
        );
      
      case 3:
      case 4:
        if (state.problemSummary.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Generating problem summary...</p>
            </div>
          );
        }
        return (
          <ProblemSummaryView 
            problems={state.problemSummary}
            issues={state.issues}
            onSelect={selectProblem}
          />
        );
      
      case 5:
        if (!state.selectedIssue || state.solutions.length === 0) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-success/30 border-t-success rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Generating solution options...</p>
            </div>
          );
        }
        return (
          <SolutionIdeation 
            selectedProblem={state.problemSummary.find(p => 
              p.related_issues.includes(state.selectedIssue?.issue_id || '')
            )!}
            solutions={state.solutions}
            onSelect={selectSolution}
          />
        );
      
      case 6:
        if (!state.implementationPlan) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-warning/30 border-t-warning rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Creating implementation plan...</p>
            </div>
          );
        }
        return (
          <ImplementationPlanView 
            plan={state.implementationPlan}
            solution={state.selectedSolution!}
            onApprove={approvePlan}
            onReject={rejectPlan}
          />
        );
      
      case 7:
        if (!state.approval || !state.implementationPlan) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground">Awaiting approval...</p>
            </div>
          );
        }
        return (
          <ApprovalView 
            approval={state.approval}
            plan={state.implementationPlan}
            solution={state.selectedSolution!}
            onProceed={proceedToScaffolding}
          />
        );
      
      case 8:
      case 9:
      case 10:
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="p-6 rounded-full bg-primary/10 mb-6">
              <Construction className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Stages 8-10 (Codebase Scaffolding, Workflow Framework, and Best Practices Audit) 
              are being developed. The pipeline will generate a complete GitHub repository 
              with full-stack code.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="stage8" className="gap-1">
                <Rocket className="w-3 h-3" />
                Development in Progress
              </Badge>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        stages={state.stages}
        currentStage={state.currentStage}
        onStageClick={goToStage}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header topic={state.topic} currentStage={state.currentStage} />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto p-8">
            {renderStageContent()}
          </div>
        </main>
      </div>

      {/* Audit log sidebar (collapsible) */}
      {state.auditLog.length > 0 && (
        <div className="w-80 border-l border-border bg-card/30 hidden xl:block">
          <div className="p-4">
            <AuditLogView logs={state.auditLog} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
