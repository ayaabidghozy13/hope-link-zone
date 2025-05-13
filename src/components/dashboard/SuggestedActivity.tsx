
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Music, Edit, Clock, Wind, ArrowRight } from 'lucide-react';
import { ActivityType, SuggestedActivity as SuggestedActivityType } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SuggestedActivityProps {
  activity: SuggestedActivityType;
  onSelect: () => void;
}

const SuggestedActivity: React.FC<SuggestedActivityProps> = ({ activity, onSelect }) => {
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

  return (
    <Card className="shadow-sm hover-scale">
      <CardHeader className="pb-2">
        <CardTitle className="text-hopelink-primary flex items-center gap-2 text-base">
          Today's Suggested Activity
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-2 py-0 h-6 flex items-center gap-1">
            {getIcon(activity.type)}
            <span>{getTypeLabel(activity.type)}</span>
          </Badge>
          <Badge variant="outline">{activity.duration} min</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <h3 className="font-medium">{activity.title}</h3>
        <CardDescription className="mt-1">{activity.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          className="w-full hover-scale"
          variant="outline"
        >
          Start Activity
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuggestedActivity;
