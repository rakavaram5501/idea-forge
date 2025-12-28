import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

const suggestions = [
  'Remote work productivity tools',
  'Eco-friendly packaging solutions',
  'Personal finance automation',
  'Mental health apps for teens',
  'Sustainable fashion marketplace',
];

export function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Stage 1: Topic Curation
        </div>
        <h1 className="text-4xl font-bold gradient-text">
          What problem space interests you?
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Enter a topic to discover real user pain points from Reddit communities. 
          We'll analyze discussions, extract issues, and help you find product opportunities.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., remote work productivity tools"
            className="pl-12 pr-32 h-14 text-lg bg-card border-border/50 focus:border-primary transition-colors"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            variant="gradient"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Analyze
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground mb-3">Try these suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setTopic(suggestion)}
              className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
