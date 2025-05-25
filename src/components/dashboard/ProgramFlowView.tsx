
import React, { useState, useCallback } from 'react';
import { ReactFlow, Node, Edge, Controls, Background, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Activity, Program } from '@/types';
import { CheckCircle, Lock, Play, Headphones, PenTool, Wind, MapPin } from 'lucide-react';
import VideoActivity from '@/components/activities/VideoActivity';
import AudioActivity from '@/components/activities/AudioActivity';
import JournalActivity from '@/components/activities/JournalActivity';
import BreathingActivity from '@/components/activities/BreathingActivity';
import WalkActivity from '@/components/activities/WalkActivity';

interface ProgramFlowViewProps {
  program: Program;
  onMarkComplete: (activityId: string) => void;
}

interface ActivityNodeData {
  activity: Activity;
  onActivityClick: (activity: Activity) => void;
}

const ActivityNode: React.FC<{ data: ActivityNodeData }> = ({ data }) => {
  const { activity, onActivityClick } = data;
  
  const getIcon = () => {
    switch (activity.type) {
      case 'video': return <Play size={16} />;
      case 'audio': return <Headphones size={16} />;
      case 'journal': return <PenTool size={16} />;
      case 'breathing': return <Wind size={16} />;
      case 'walk': return <MapPin size={16} />;
      default: return <Play size={16} />;
    }
  };

  const isUnlocked = !activity.position || activity.completed || activity.order === 1;

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Card 
        className={`min-w-[200px] cursor-pointer transition-all hover:shadow-md ${
          activity.completed ? 'bg-green-50 border-green-200' : 
          !isUnlocked ? 'bg-gray-50 border-gray-200 opacity-60' : 
          'bg-white border-hopelink-primary/20 hover:border-hopelink-primary'
        }`}
        onClick={() => isUnlocked && onActivityClick(activity)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <CardTitle className="text-sm">{activity.title}</CardTitle>
            </div>
            {activity.completed ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : !isUnlocked ? (
              <Lock className="text-gray-400" size={16} />
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-xs line-clamp-2">
            {activity.description}
          </CardDescription>
          <Badge variant={activity.completed ? "default" : "secondary"} className="mt-2 text-xs">
            {activity.completed ? "Completed" : !isUnlocked ? "Locked" : "Available"}
          </Badge>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

const nodeTypes = {
  activity: ActivityNode,
};

const ProgramFlowView: React.FC<ProgramFlowViewProps> = ({ program, onMarkComplete }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleActivityClick = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
    setSheetOpen(true);
  }, []);

  const handleActivityComplete = useCallback((activityId: string) => {
    onMarkComplete(activityId);
    setSheetOpen(false);
    setSelectedActivity(null);
  }, [onMarkComplete]);

  // Convert activities to nodes
  const nodes: Node[] = program.activities.map((activity, index) => ({
    id: activity.id,
    type: 'activity',
    position: activity.position || { x: (index % 3) * 250, y: Math.floor(index / 3) * 200 },
    data: {
      activity,
      onActivityClick: handleActivityClick,
    },
  }));

  // Create edges based on activity order
  const edges: Edge[] = [];
  for (let i = 0; i < program.activities.length - 1; i++) {
    edges.push({
      id: `e${i}-${i+1}`,
      source: program.activities[i].id,
      target: program.activities[i + 1].id,
      type: 'smoothstep',
      animated: !program.activities[i].completed,
    });
  }

  const renderActivityContent = () => {
    if (!selectedActivity) return null;

    const commonProps = {
      onComplete: () => handleActivityComplete(selectedActivity.id),
    };

    switch (selectedActivity.type) {
      case 'video':
        return <VideoActivity {...commonProps} />;
      case 'audio':
        return <AudioActivity {...commonProps} />;
      case 'journal':
        return <JournalActivity activityId={selectedActivity.id} {...commonProps} />;
      case 'breathing':
        return <BreathingActivity duration={selectedActivity.duration || 5} {...commonProps} />;
      case 'walk':
        return <WalkActivity duration={selectedActivity.duration || 10} {...commonProps} />;
      default:
        return <div>Activity type not supported</div>;
    }
  };

  return (
    <div className="h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls />
        <Background />
      </ReactFlow>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>{selectedActivity?.title}</SheetTitle>
            <SheetDescription>{selectedActivity?.description}</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {renderActivityContent()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProgramFlowView;
