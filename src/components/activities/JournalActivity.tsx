
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface JournalActivityProps {
  activityId: string;
  onComplete: () => void;
}

const JournalActivity: React.FC<JournalActivityProps> = ({ activityId, onComplete }) => {
  const [journalEntry, setJournalEntry] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (journalEntry.trim().length < 10) {
      toast({
        title: "Journal entry too short",
        description: "Please write at least a few sentences to reflect on your thoughts and feelings.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, save the journal entry to a database
    console.log("Journal entry saved:", journalEntry);
    toast({
      title: "Journal saved",
      description: "Your thoughts have been recorded successfully.",
    });
    onComplete();
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-hopelink-primary/5 to-hopelink-accent/5">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Record Your Thoughts</h3>
          <p className="text-sm text-muted-foreground">
            Write about how you're feeling, what you're thinking, or any insights you've had today.
            There are no right or wrong answers - this is your personal space for reflection.
          </p>
        </div>
        
        <Textarea 
          placeholder="Begin your journal entry here..." 
          className="min-h-[150px]"
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
        />
        
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="hover-scale">
            Save Journal Entry
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JournalActivity;
