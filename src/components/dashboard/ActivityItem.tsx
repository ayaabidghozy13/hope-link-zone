
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Music, Edit, Clock, Wind } from 'lucide-react';
import { ActivityType, Activity } from '@/types';
import { Badge } from '@/components/ui/badge';
import VideoActivity from '../activities/VideoActivity';
import AudioActivity from '../activities/AudioActivity';
import JournalActivity from '../activities/JournalActivity';
import WalkActivity from '../activities/WalkActivity';
import BreathingActivity from '../activities/BreathingActivity';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ActivityItemProps {
  activity: Activity;
  onMarkComplete: (activityId: string) => void;
  disabled?: boolean;
  showCompleteButton?: boolean;
}

const ActivityItem = ({ 
  activity, 
  onMarkComplete, 
  disabled = false,
  showCompleteButton = true 
}: ActivityItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'video':
        return <Video size={16} />;
      case 'audio':
        return <Music size={16} />;
      case 'journal':
        return <Edit size={16} />;
      case 'walk':
        return <Clock size={16} />;
      case 'breathing':
        return <Wind size={16} />;
      default:
        return null;
    }
  };
  
  const getTypeLabel = (type: ActivityType) => {
    switch (type) {
      case 'video':
        return 'Watch Video';
      case 'audio':
        return 'Listen to Audio';
      case 'journal':
        return 'Journal Entry';
      case 'walk':
        return 'Walking Activity';
      case 'breathing':
        return 'Breathing Exercise';
      default:
        return 'Activity';
    }
  };

  const renderActivityContent = () => {
    switch (activity.type) {
      case 'video':
        return <VideoActivity activityContent={activity.content} />;
      case 'audio':
        return <AudioActivity activityContent={activity.content} />;
      case 'journal':
        return <JournalActivity activityId={activity.id} onComplete={() => onMarkComplete(activity.id)} />;
      case 'walk':
        return <WalkActivity duration={activity.duration || 15} onComplete={() => onMarkComplete(activity.id)} />;
      case 'breathing':
        return <BreathingActivity duration={activity.duration || 5} onComplete={() => onMarkComplete(activity.id)} />;
      default:
        return <div>Activity content not available</div>;
    }
  };

  return (
    <Card className={`shadow-sm hopelink-transition ${activity.completed ? 'bg-muted/30' : ''} ${disabled ? 'opacity-60' : ''}`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-0 h-6 flex items-center gap-1">
                  {getIcon(activity.type)}
                  <span>{getTypeLabel(activity.type)}</span>
                </Badge>
                {activity.completed && (
                  <Badge variant="default" className="bg-hopelink-accent">Completed</Badge>
                )}
                {disabled && !activity.completed && (
                  <Badge variant="outline">Locked</Badge>
                )}
              </div>
              <CardTitle className="text-base mt-2">{activity.title}</CardTitle>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? "Hide Details" : "Show Details"}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CardDescription className="mt-1">{activity.description}</CardDescription>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="rounded-md overflow-hidden">
              {renderActivityContent()}
            </div>
          </CardContent>
        </CollapsibleContent>
        
        <CardFooter className="pt-2">
          {!activity.completed && showCompleteButton && (
            <Button 
              onClick={() => onMarkComplete(activity.id)} 
              disabled={disabled}
              className="w-full hover-scale"
            >
              Mark as Complete
            </Button>
          )}
        </CardFooter>
      </Collapsible>
    </Card>
  );
};

export default ActivityItem;
