
import React from 'react';
import { Card } from '@/components/ui/card';
import { Music, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioActivityProps {
  activityContent: string;
}

const AudioActivity: React.FC<AudioActivityProps> = ({ activityContent }) => {
  // In a real application, you would use the audio element and handle playback state
  // This is a simplified visual representation
  return (
    <Card className="p-6 bg-gradient-to-r from-hopelink-primary/10 to-hopelink-accent/10">
      <div className="flex flex-col items-center gap-4">
        <div className="h-24 w-24 rounded-full bg-hopelink-primary flex items-center justify-center animate-pulse-slow">
          <Music size={48} className="text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-medium">Guided Relaxation</h3>
          <p className="text-sm text-muted-foreground">10:00 minutes</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-hopelink-primary transition-colors">
            <SkipBack size={24} />
          </button>
          <button className="h-12 w-12 rounded-full bg-hopelink-primary text-white flex items-center justify-center hover:bg-hopelink-primary/90 transition-colors">
            <Play size={24} />
          </button>
          <button className="text-muted-foreground hover:text-hopelink-primary transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div className="bg-hopelink-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="w-full flex justify-between text-xs text-muted-foreground">
          <span>4:30</span>
          <span>10:00</span>
        </div>
      </div>
    </Card>
  );
};

export default AudioActivity;
