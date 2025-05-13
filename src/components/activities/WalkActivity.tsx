
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Play, Pause, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalkActivityProps {
  duration: number; // in minutes
  onComplete: () => void;
}

const WalkActivity: React.FC<WalkActivityProps> = ({ duration, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const { toast } = useToast();
  
  const totalSeconds = duration * 60;
  const progressPercentage = (time / totalSeconds) * 100;
  
  const countRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countRef.current) clearInterval(countRef.current);
    };
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handlePause = () => {
    if (countRef.current) clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handleComplete = () => {
    if (countRef.current) clearInterval(countRef.current);
    toast({
      title: "Walk completed",
      description: `Great job! You've completed your ${duration}-minute walking activity.`,
    });
    onComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-hopelink-primary/10 to-hopelink-accent/10">
      <div className="flex flex-col items-center gap-4">
        <div className="h-24 w-24 rounded-full bg-hopelink-primary/20 flex items-center justify-center">
          <Clock size={48} className="text-hopelink-primary" />
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold">{formatTime(time)}</h3>
          <p className="text-sm text-muted-foreground">of {duration} minutes</p>
        </div>
        
        <Progress value={progressPercentage} className="w-full h-2" />
        
        <div className="flex items-center gap-4">
          {!isActive && !isPaused && (
            <Button onClick={handleStart} className="hover-scale flex gap-2">
              <Play size={16} />
              Start Walking
            </Button>
          )}
          
          {isActive && !isPaused && (
            <>
              <Button onClick={handlePause} variant="outline" className="hover-scale flex gap-2">
                <Pause size={16} />
                Pause
              </Button>
              <Button onClick={handleComplete} className="hover-scale flex gap-2 bg-hopelink-accent hover:bg-hopelink-accent/90">
                <CheckCircle size={16} />
                Complete
              </Button>
            </>
          )}
          
          {isPaused && (
            <>
              <Button onClick={handleResume} variant="outline" className="hover-scale flex gap-2">
                <Play size={16} />
                Resume
              </Button>
              <Button onClick={handleComplete} className="hover-scale flex gap-2 bg-hopelink-accent hover:bg-hopelink-accent/90">
                <CheckCircle size={16} />
                Complete
              </Button>
            </>
          )}
        </div>
        
        <div className="text-center text-sm text-muted-foreground max-w-sm">
          <p>Take a mindful walk, paying attention to each step and your surroundings. Notice how your body feels as you move.</p>
        </div>
      </div>
    </Card>
  );
};

export default WalkActivity;
