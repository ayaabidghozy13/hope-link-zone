
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wind, Play, Pause, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BreathingActivityProps {
  duration: number; // in minutes
  onComplete: () => void;
}

const BreathingActivity: React.FC<BreathingActivityProps> = ({ duration, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timer, setTimer] = useState(0);
  const { toast } = useToast();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimeRef = useRef(0);
  const totalDuration = duration * 60 * 1000; // Convert minutes to milliseconds
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const startBreathing = () => {
    setIsActive(true);
    
    intervalRef.current = setInterval(() => {
      totalTimeRef.current += 100; // Increment by 100ms
      
      // Check if the total duration has been reached
      if (totalTimeRef.current >= totalDuration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      
      setTimer(prevTimer => {
        const newTimer = prevTimer + 100;
        
        // Phase transitions based on box breathing (4-4-4-4)
        if (currentPhase === 'inhale' && newTimer >= 4000) {
          setCurrentPhase('hold1');
          return 0;
        } else if (currentPhase === 'hold1' && newTimer >= 4000) {
          setCurrentPhase('exhale');
          return 0;
        } else if (currentPhase === 'exhale' && newTimer >= 4000) {
          setCurrentPhase('hold2');
          return 0;
        } else if (currentPhase === 'hold2' && newTimer >= 4000) {
          setCurrentPhase('inhale');
          return 0;
        }
        
        return newTimer;
      });
    }, 100);
  };
  
  const pauseBreathing = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
  };
  
  const handleComplete = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    toast({
      title: "Breathing exercise completed",
      description: `Great job! You've completed your ${duration}-minute breathing exercise.`,
    });
    onComplete();
  };
  
  // Calculate the circle size based on the current phase
  const getCircleSize = () => {
    const baseSize = 100; // Base size in pixels
    
    if (currentPhase === 'inhale') {
      // During inhale, grow from 60% to 100%
      const progress = Math.min(timer / 4000, 1);
      return baseSize * (0.6 + progress * 0.4);
    } else if (currentPhase === 'exhale') {
      // During exhale, shrink from 100% to 60%
      const progress = Math.min(timer / 4000, 1);
      return baseSize * (1 - progress * 0.4);
    }
    
    // For hold phases, maintain size
    return currentPhase === 'hold1' ? baseSize : baseSize * 0.6;
  };
  
  const getInstructions = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe in slowly through your nose...';
      case 'hold1':
        return 'Hold your breath...';
      case 'exhale':
        return 'Exhale slowly through your mouth...';
      case 'hold2':
        return 'Hold your breath...';
      default:
        return 'Get ready to begin...';
    }
  };
  
  const circleSize = getCircleSize();
  const instructions = getInstructions();
  
  return (
    <Card className="p-6 bg-gradient-to-r from-hopelink-primary/10 to-hopelink-accent/10">
      <div className="flex flex-col items-center gap-4">
        <div 
          style={{ 
            height: `${circleSize}px`, 
            width: `${circleSize}px`,
            transition: 'all 0.5s ease-in-out',
          }} 
          className="rounded-full bg-hopelink-primary/20 flex items-center justify-center mb-4 border-4 border-hopelink-primary/30"
        >
          <Wind size={32} className="text-hopelink-primary" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium">{instructions}</h3>
          {isActive && (
            <p className="text-sm text-muted-foreground">
              {Math.floor(totalTimeRef.current / 1000)} seconds of {duration * 60} seconds
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          {!isActive ? (
            <Button onClick={startBreathing} className="hover-scale flex gap-2">
              <Play size={16} />
              Start Breathing
            </Button>
          ) : (
            <>
              <Button onClick={pauseBreathing} variant="outline" className="hover-scale flex gap-2">
                <Pause size={16} />
                Pause
              </Button>
              <Button onClick={handleComplete} className="hover-scale flex gap-2 bg-hopelink-accent hover:bg-hopelink-accent/90">
                <CheckCircle size={16} />
                Complete
              </Button>
            </>
          )}
        </div>
        
        <div className="text-center text-sm text-muted-foreground max-w-sm">
          <p>Box breathing technique: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds, and repeat.</p>
        </div>
      </div>
    </Card>
  );
};

export default BreathingActivity;
